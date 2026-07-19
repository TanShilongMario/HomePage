"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
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

/** 固定画框、循环作品、说明浮窗与沉浸查看共同组成 AIGC 展馆。 */
export function AIGCGalleryStage({ active = false, exiting = false }: AIGCGalleryStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [immersiveOpen, setImmersiveOpen] = useState(false);
  const [failedArtworkId, setFailedArtworkId] = useState<string | null>(null);
  const [imageAttempt, setImageAttempt] = useState(0);
  const infoId = useId();
  const artwork = AIGC_ARTWORKS[activeIndex];

  const closeImmersive = useCallback(() => setImmersiveOpen(false), []);

  const moveArtwork = (direction: -1 | 1) => {
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

  const description = artwork.description;
  const hasMetadata = artwork.tools?.length || artwork.year;

  return (
    <div className={styles.stage}>
      <h1 className={[styles.galleryTitle, exiting ? styles.galleryTitleExit : undefined].filter(Boolean).join(" ")}>
        AIGC Gallery
      </h1>

      <div className={[styles.cluster, exiting ? styles.clusterExit : undefined].filter(Boolean).join(" ")}>
        <div className={styles.frame}>
          <div className={styles.frameContent}>
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
          data-open={infoOpen}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setInfoOpen(false);
          }}
        >
          <button
            type="button"
            className={styles.instructionButton}
            onClick={() => setInfoOpen((open) => !open)}
            aria-label={`Show information for ${artwork.title}`}
            aria-expanded={infoOpen}
            aria-controls={infoId}
          >
            <img
              src="/assets/svg/InstructionFrame.svg"
              alt=""
              width={89}
              height={88}
              draggable={false}
              aria-hidden="true"
            />
          </button>

          <aside id={infoId} className={styles.infoPopover} aria-label="Artwork information">
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
                {artwork.year && <><dt>Year</dt><dd>{artwork.year}</dd></>}
                {artwork.tools?.length && <><dt>Tools</dt><dd>{artwork.tools.join(" · ")}</dd></>}
              </dl>
            )}
          </aside>
        </div>

        <nav className={styles.artworkNavigation} aria-label="Artwork navigation">
          <button type="button" onClick={() => moveArtwork(-1)} aria-label="Previous artwork">←</button>
          <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(AIGC_ARTWORKS.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => moveArtwork(1)} aria-label="Next artwork">→</button>
        </nav>
      </div>

      {immersiveOpen && <ImmersiveArtwork artwork={artwork} onClose={closeImmersive} />}
    </div>
  );
}
