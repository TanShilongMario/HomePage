"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "@/components/hero/useMediaQuery";
import {
  clearAdjacentArtworkQueue,
  markArtworkImageLoaded,
  queueAdjacentArtworkImages,
} from "./artworkImagePreloader";
import { AIGC_ARTWORKS, type AIGCArtwork } from "./artworks";
import styles from "./AIGCGalleryStage.module.css";

interface AIGCGalleryStageProps {
  active?: boolean;
  exiting?: boolean;
}

interface ImmersiveArtworkProps {
  artwork: AIGCArtwork;
  onClose: () => void;
}

function ImmersiveArtwork({ artwork, onClose }: ImmersiveArtworkProps) {
  const exitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    exitButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        exitButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.classList.add(styles.immersiveCardTilting);
    card.style.setProperty("--tilt-x", `${(-normalizedY * 7).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(normalizedX * 7).toFixed(2)}deg`);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.classList.remove(styles.immersiveCardTilting);
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  return createPortal(
    <div className={styles.immersiveOverlay} role="dialog" aria-modal="true" aria-label={`${artwork.title} immersive view`}>
      <button
        ref={exitButtonRef}
        type="button"
        className={styles.immersiveExit}
        onClick={onClose}
        aria-label="Exit immersive view"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div
        className={styles.immersiveCard}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <img
          src={artwork.image.src}
          alt={artwork.image.alt}
          width={artwork.image.width}
          height={artwork.image.height}
          referrerPolicy="no-referrer"
          draggable={false}
        />
      </div>
    </div>,
    document.body,
  );
}

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function ArtworkInfoBody({ artwork }: { artwork: AIGCArtwork }) {
  const description = artwork.description;
  const hasMetadata = Boolean(artwork.tools?.length || artwork.year);

  return (
    <>
      <p className={styles.infoEyebrow}>Artwork note</p>
      <h2>{artwork.title}</h2>
      {description?.prompt && (
        <section>
          <h3>Prompt</h3>
          <p>{description.prompt}</p>
        </section>
      )}
      {description?.concept && (
        <section>
          <h3>Creative idea</h3>
          <p>{description.concept}</p>
        </section>
      )}
      {hasMetadata && (
        <dl className={styles.metadata}>
          {artwork.year && (
            <>
              <dt>Year</dt>
              <dd>{artwork.year}</dd>
            </>
          )}
          {artwork.tools?.length ? (
            <>
              <dt>Tools</dt>
              <dd>{artwork.tools.join(" · ")}</dd>
            </>
          ) : null}
        </dl>
      )}
    </>
  );
}

function InfoOverlay({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const exitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    exitButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.infoOverlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} information`}
    >
      <button
        ref={exitButtonRef}
        type="button"
        className={styles.immersiveExit}
        onClick={onClose}
        aria-label="Close artwork information"
      >
        <span aria-hidden="true">×</span>
      </button>
      <button
        type="button"
        className={styles.infoOverlayBackdrop}
        aria-label="Close artwork information"
        onClick={onClose}
      />
      <div className={styles.infoOverlayCard}>{children}</div>
    </div>,
    document.body,
  );
}

/** 固定画框、循环作品、说明浮窗与沉浸查看共同组成 AIGC 展馆。 */
export function AIGCGalleryStage({ active = false, exiting = false }: AIGCGalleryStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [immersiveOpen, setImmersiveOpen] = useState(false);
  const [failedArtworkId, setFailedArtworkId] = useState<string | null>(null);
  const [imageAttempt, setImageAttempt] = useState(0);
  const [artworkDirection, setArtworkDirection] = useState<-1 | 1>(1);
  const infoId = useId();
  const isCompactLayout = useMediaQuery("(max-width: 768px)");
  const artwork = AIGC_ARTWORKS[activeIndex];

  const closeImmersive = useCallback(() => setImmersiveOpen(false), []);
  const closeInfoOverlay = useCallback(() => setInfoOpen(false), []);

  const moveArtwork = (direction: -1 | 1) => {
    setArtworkDirection(direction);
    setActiveIndex((current) => wrapIndex(current + direction, AIGC_ARTWORKS.length));
    setInfoOpen(false);
    setFailedArtworkId(null);
  };

  useEffect(() => {
    if (!active) clearAdjacentArtworkQueue();
  }, [active]);

  const handleArtworkLoaded = () => {
    if (!artwork) return;

    markArtworkImageLoaded(artwork.image.src);
    setFailedArtworkId(null);

    if (AIGC_ARTWORKS.length < 2) return;

    const previous = AIGC_ARTWORKS[wrapIndex(activeIndex - 1, AIGC_ARTWORKS.length)];
    const next = AIGC_ARTWORKS[wrapIndex(activeIndex + 1, AIGC_ARTWORKS.length)];

    // 下一张优先，随后才预取上一张；队列内部始终保持单并发。
    queueAdjacentArtworkImages([next.image.src, previous.image.src]);
  };

  const retryArtwork = () => {
    setFailedArtworkId(null);
    setImageAttempt((attempt) => attempt + 1);
  };

  if (!active || !artwork) return null;

  const useInfoOverlay = isCompactLayout === true;

  return (
    <div className={styles.stage} data-compact={useInfoOverlay ? "true" : undefined}>
      <h1 className={[styles.galleryTitle, exiting ? styles.galleryTitleExit : undefined].filter(Boolean).join(" ")}>
        AIGC Gallery
      </h1>

      <div className={[styles.cluster, exiting ? styles.clusterExit : undefined].filter(Boolean).join(" ")}>
        <div className={styles.frame}>
          <div
            className={styles.frameContent}
            data-direction={artworkDirection === 1 ? "next" : "previous"}
          >
            <img
              key={`backdrop-${artwork.id}-${imageAttempt}`}
              className={styles.artworkBackdrop}
              src={artwork.image.src}
              alt=""
              loading="eager"
              fetchPriority="low"
              referrerPolicy="no-referrer"
              draggable={false}
              aria-hidden="true"
            />
            <button
              type="button"
              className={styles.artworkButton}
              onClick={() => setImmersiveOpen(true)}
              aria-label={`Open ${artwork.title} in immersive view`}
            >
              <img
                key={`${artwork.id}-${imageAttempt}`}
                className={styles.artworkImage}
                src={artwork.image.src}
                alt={artwork.image.alt}
                width={artwork.image.width}
                height={artwork.image.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                referrerPolicy="no-referrer"
                draggable={false}
                onLoad={handleArtworkLoaded}
                onError={() => setFailedArtworkId(artwork.id)}
              />
            </button>

            {failedArtworkId === artwork.id && (
              <div className={styles.imageUnavailable} role="status">
                <p>Image is taking a break.</p>
                <span>图片暂时无法加载</span>
                <button type="button" onClick={retryArtwork}>Retry / 重试</button>
              </div>
            )}
          </div>

          <img
            className={styles.frameArtwork}
            src="/assets/svg/AIGCFrame.svg"
            alt=""
            width={643}
            height={644}
            draggable={false}
            aria-hidden="true"
          />
        </div>

        <div
          className={styles.instruction}
          data-open={!useInfoOverlay && infoOpen ? "true" : "false"}
          onBlur={(event) => {
            if (useInfoOverlay) return;
            if (!event.currentTarget.contains(event.relatedTarget)) setInfoOpen(false);
          }}
        >
          <button
            type="button"
            className={styles.instructionButton}
            onClick={() => setInfoOpen((open) => !open)}
            aria-label={`Show information for ${artwork.title}`}
            aria-expanded={infoOpen}
            aria-controls={useInfoOverlay ? undefined : infoId}
          >
            <img
              src="/assets/svg/InstructionFrame.svg"
              alt=""
              width={89}
              height={88}
              draggable={false}
              aria-hidden="true"
            />
            <span className={styles.instructionSkeleton} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </button>

          {!useInfoOverlay && (
            <aside id={infoId} className={styles.infoPopover} aria-label="Artwork information">
              <ArtworkInfoBody artwork={artwork} />
            </aside>
          )}
        </div>

        <nav
          className={styles.artworkNavigation}
          aria-label="Artwork navigation"
          style={
            {
              "--gallery-progress":
                AIGC_ARTWORKS.length > 1 ? activeIndex / (AIGC_ARTWORKS.length - 1) : 0,
            } as CSSProperties
          }
        >
          <span className={styles.galleryRail} aria-hidden="true" />
          <button
            type="button"
            className={`${styles.railPull} ${styles.railPullPrevious}`}
            onClick={() => moveArtwork(-1)}
            aria-label="Previous artwork"
          >
            <svg
              className={styles.railPullIcon}
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path d="M21 6.5L10.5 16.2L20.4 25.3" />
              <path className={styles.railPullEcho} d="M23.2 7.3L13 16L22.6 24.4" />
            </svg>
          </button>
          <span
            className={styles.accessionLabel}
            role="status"
            aria-live="polite"
            aria-label={`AIGC artwork ${activeIndex + 1} of ${AIGC_ARTWORKS.length}`}
          >
            <span aria-hidden="true">AIGC</span>
            <span className={styles.accessionDot} aria-hidden="true">·</span>
            <span aria-hidden="true">
              {String(activeIndex + 1).padStart(2, "0")} / {String(AIGC_ARTWORKS.length).padStart(2, "0")}
            </span>
          </span>
          <button
            type="button"
            className={`${styles.railPull} ${styles.railPullNext}`}
            onClick={() => moveArtwork(1)}
            aria-label="Next artwork"
          >
            <svg
              className={`${styles.railPullIcon} ${styles.railPullIconNext}`}
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path d="M21 6.5L10.5 16.2L20.4 25.3" />
              <path className={styles.railPullEcho} d="M23.2 7.3L13 16L22.6 24.4" />
            </svg>
          </button>
        </nav>
      </div>

      {immersiveOpen && <ImmersiveArtwork artwork={artwork} onClose={closeImmersive} />}
      {useInfoOverlay && infoOpen && (
        <InfoOverlay title={artwork.title} onClose={closeInfoOverlay}>
          <ArtworkInfoBody artwork={artwork} />
        </InfoOverlay>
      )}
    </div>
  );
}
