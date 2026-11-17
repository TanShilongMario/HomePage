"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "@/components/hero/useMediaQuery";
import { renderPromptMarkdown } from "@/lib/markdown/renderMarkdown";
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

  const prompt = artwork.description?.prompt;

  return createPortal(
    <div className={styles.immersiveOverlay} role="dialog" aria-modal="true" aria-label={`${artwork.title} immersive view`}>
      <img className={styles.immersiveAmbient} src={artwork.image.src} alt="" referrerPolicy="no-referrer" draggable={false} aria-hidden="true" />
      <button
        ref={exitButtonRef}
        type="button"
        className={styles.immersiveExit}
        onClick={onClose}
        aria-label="Exit immersive view"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div className={styles.immersiveStack}>
        <div className={styles.immersiveFocus}>
          {AMBIENT_BLOBS.map((blob) => (
            <img
              key={blob}
              className={`${styles.immersiveBlob} ${styles[blob]}`}
              src={artwork.image.src}
              alt=""
              referrerPolicy="no-referrer"
              draggable={false}
              aria-hidden="true"
            />
          ))}
          <img
            className={styles.immersiveImage}
            src={artwork.image.src}
            alt={artwork.image.alt}
            width={artwork.image.width}
            height={artwork.image.height}
            referrerPolicy="no-referrer"
            draggable={false}
          />
        </div>
        {prompt && <AutoScrollPrompt text={prompt} />}
      </div>
    </div>,
    document.body,
  );
}

const AMBIENT_BLOBS = ["blobBase", "blobA", "blobB", "blobC", "blobD"] as const;
const PROMPT_SCROLL_PX_PER_SECOND = 26;
const PROMPT_START_DELAY_MS = 500;
const PROMPT_EDGE_PAUSE_MS = 1600;

function AutoScrollPrompt({ text }: { text: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const html = useMemo(() => renderPromptMarkdown(text), [text]);
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = textRef.current;
    if (!viewport || !content) return;

    const measure = () => setOverflow(Math.max(0, viewport.scrollHeight - viewport.clientHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(content);
    return () => observer.disconnect();
  }, [html]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || overflow <= 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let position = viewport.scrollTop;
    let direction: 1 | -1 = 1;
    let pausedUntil = performance.now() + PROMPT_START_DELAY_MS;
    let lastTime = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const elapsed = (now - lastTime) / 1000;
      lastTime = now;

      if (hoveredRef.current) {
        position = viewport.scrollTop;
      } else if (now >= pausedUntil) {
        position += direction * PROMPT_SCROLL_PX_PER_SECOND * elapsed;
        if (position >= overflow || position <= 0) {
          position = Math.min(Math.max(position, 0), overflow);
          direction = position >= overflow ? -1 : 1;
          pausedUntil = now + PROMPT_EDGE_PAUSE_MS;
        }
        viewport.scrollTop = position;
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [overflow]);

  return (
    <div
      ref={viewportRef}
      className={styles.immersivePrompt}
      data-scrolling={overflow > 0 ? "true" : undefined}
      onPointerEnter={() => (hoveredRef.current = true)}
      onPointerLeave={() => (hoveredRef.current = false)}
    >
      <div ref={textRef} className={styles.immersivePromptBody} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
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
          <div
            className={styles.infoMarkdown}
            dangerouslySetInnerHTML={{ __html: renderPromptMarkdown(description.prompt) }}
          />
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

const LENS_DIAMETER = 340;
const LENS_HOVER_PADDING = 48;
/** 透镜中心的取样缩放：0.88 即中心约放大 1.14 倍，向外平滑回到 1 */
const LENS_CENTER_SAMPLE = 0.88;
const LENS_DISPLACEMENT_SCALE = 24;
const LENS_FILTER_ID = "gallery-lens-distortion";

/** 色散只出现在镜片外圈：从该半径比例开始逐渐增强 */
const LENS_DISPERSION_START = 0.62;
/** 外圈最大通道错位约为该值的一半（像素），红、绿通道反向偏移形成青/品红边 */
const LENS_DISPERSION_SCALE = 2.6;

type LensMapSample = (nx: number, ny: number, r2: number) => [number, number];

function createDisplacementMap(size: number, sample: LensMapSample) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const image = context.createImageData(size, size);
  const radius = size / 2;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x + 0.5 - radius) / radius;
      const ny = (y + 0.5 - radius) / radius;
      const [dx, dy] = sample(nx, ny, nx * nx + ny * ny);
      const offset = (y * size + x) * 4;
      image.data[offset] = Math.round((0.5 + dx) * 255);
      image.data[offset + 1] = Math.round((0.5 + dy) * 255);
      image.data[offset + 2] = 128;
      image.data[offset + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

/** 生成透镜所需的两张位移图：中心放大的主变形，以及只作用于外圈的色散方向 */
function createLensMaps(size: number) {
  const radius = size / 2;
  const magnify = createDisplacementMap(size, (nx, ny, r2) => {
    const factor = r2 < 1 ? LENS_CENTER_SAMPLE + (1 - LENS_CENTER_SAMPLE) * r2 - 1 : 0;
    return [(factor * nx * radius) / LENS_DISPLACEMENT_SCALE, (factor * ny * radius) / LENS_DISPLACEMENT_SCALE];
  });
  const dispersion = createDisplacementMap(size, (nx, ny, r2) => {
    const r = Math.sqrt(r2);
    if (r >= 1 || r <= LENS_DISPERSION_START) return [0, 0];
    const strength = ((r - LENS_DISPERSION_START) / (1 - LENS_DISPERSION_START)) ** 2;
    return [(nx / r) * strength * 0.5, (ny / r) * strength * 0.5];
  });
  return magnify && dispersion ? { magnify, dispersion } : null;
}

const LENS_FOLLOW = 0.32;
const LENS_PAN_FOLLOW = 0.14;

interface LensPointer {
  clientX: number;
  clientY: number;
  /** 指针在说明签上的归一化位置（0–1），决定透镜内文字的平移量 */
  x: number;
  y: number;
}

function MagnifierLens({
  artwork,
  pointerRef,
}: {
  artwork: AIGCArtwork;
  pointerRef: RefObject<LensPointer>;
}) {
  const lensRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lensMaps = useMemo(() => createLensMaps(LENS_DIAMETER), []);

  useEffect(() => {
    const lens = lensRef.current;
    const content = contentRef.current;
    if (!lens || !content) return;

    const start = pointerRef.current;
    const current = { clientX: start.clientX, clientY: start.clientY, x: start.x, y: start.y };
    let frame = 0;

    const step = () => {
      const target = pointerRef.current;
      current.clientX += (target.clientX - current.clientX) * LENS_FOLLOW;
      current.clientY += (target.clientY - current.clientY) * LENS_FOLLOW;
      current.x += (target.x - current.x) * LENS_PAN_FOLLOW;
      current.y += (target.y - current.y) * LENS_PAN_FOLLOW;

      const radius = LENS_DIAMETER / 2;
      const travelX = Math.max(0, content.offsetWidth - LENS_DIAMETER) + radius;
      const travelY = Math.max(0, content.offsetHeight - LENS_DIAMETER) + radius;
      const panX = (LENS_DIAMETER - content.offsetWidth) / 2 - (current.x - 0.5) * travelX;
      const panY = radius * 0.5 - current.y * travelY;

      lens.style.transform = `translate3d(${current.clientX - radius}px, ${current.clientY - radius}px, 0)`;
      lens.style.setProperty("--pan-x", `${panX.toFixed(1)}px`);
      lens.style.setProperty("--pan-y", `${panY.toFixed(1)}px`);
      frame = requestAnimationFrame(step);
    };

    step();
    return () => cancelAnimationFrame(frame);
  }, [pointerRef]);

  return createPortal(
    <div
      ref={lensRef}
      className={styles.lens}
      style={{ width: LENS_DIAMETER, height: LENS_DIAMETER }}
      aria-hidden="true"
    >
      {lensMaps && (
        <svg className={styles.lensFilterDefs} aria-hidden="true">
          <filter
            id={LENS_FILTER_ID}
            x="0"
            y="0"
            width={LENS_DIAMETER}
            height={LENS_DIAMETER}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={lensMaps.magnify}
              x="0"
              y="0"
              width={LENS_DIAMETER}
              height={LENS_DIAMETER}
              preserveAspectRatio="none"
              result="lensMap"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="lensMap"
              scale={LENS_DISPLACEMENT_SCALE}
              xChannelSelector="R"
              yChannelSelector="G"
              result="magnified"
            />
            <feImage
              href={lensMaps.dispersion}
              x="0"
              y="0"
              width={LENS_DIAMETER}
              height={LENS_DIAMETER}
              preserveAspectRatio="none"
              result="dispersionMap"
            />
            <feDisplacementMap
              in="magnified"
              in2="dispersionMap"
              scale={LENS_DISPERSION_SCALE}
              xChannelSelector="R"
              yChannelSelector="G"
              result="shiftedOut"
            />
            <feDisplacementMap
              in="magnified"
              in2="dispersionMap"
              scale={-LENS_DISPERSION_SCALE}
              xChannelSelector="R"
              yChannelSelector="G"
              result="shiftedIn"
            />
            <feColorMatrix in="shiftedOut" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="redChannel" />
            <feColorMatrix in="shiftedIn" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="greenChannel" />
            <feColorMatrix in="magnified" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blueChannel" />
            <feComposite in="redChannel" in2="greenChannel" operator="arithmetic" k2="1" k3="1" result="redGreen" />
            <feComposite in="redGreen" in2="blueChannel" operator="arithmetic" k2="1" k3="1" />
          </filter>
        </svg>
      )}
      <div className={styles.lensCaustic} />
      <div className={styles.lensGlass}>
        <div
          className={styles.lensDistort}
          style={lensMaps ? { filter: `url(#${LENS_FILTER_ID})` } : undefined}
        >
          <div ref={contentRef} className={styles.lensContent}>
            <ArtworkInfoBody artwork={artwork} />
          </div>
        </div>
      </div>
      <div className={styles.lensRim} />
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
  const canHoverPrecisely = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [lensActive, setLensActive] = useState(false);
  const lensPointerRef = useRef<LensPointer>({ clientX: 0, clientY: 0, x: 0.5, y: 0 });
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
  const useLens = !useInfoOverlay && canHoverPrecisely === true;

  const updateLensPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const width = bounds.width + LENS_HOVER_PADDING * 2;
    const height = bounds.height + LENS_HOVER_PADDING * 2;
    lensPointerRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      x: Math.min(1, Math.max(0, (event.clientX - bounds.left + LENS_HOVER_PADDING) / width)),
      y: Math.min(1, Math.max(0, (event.clientY - bounds.top + LENS_HOVER_PADDING) / height)),
    };
  };

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
          data-lens={useLens ? "true" : undefined}
          onBlur={(event) => {
            if (useInfoOverlay) return;
            if (!event.currentTarget.contains(event.relatedTarget)) setInfoOpen(false);
          }}
        >
          <button
            type="button"
            className={styles.instructionButton}
            onClick={() => {
              if (!useLens) setInfoOpen((open) => !open);
            }}
            onPointerEnter={(event) => {
              if (!useLens || event.pointerType !== "mouse" || infoOpen) return;
              updateLensPointer(event);
              setLensActive(true);
            }}
            onPointerMove={(event) => {
              if (lensActive) updateLensPointer(event);
            }}
            onPointerLeave={() => setLensActive(false)}
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

        <nav className={styles.artworkNavigation} aria-label="Artwork navigation">
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
            className={styles.artworkCounter}
            role="status"
            aria-live="polite"
            aria-label={`AIGC artwork ${activeIndex + 1} of ${AIGC_ARTWORKS.length}`}
          >
            <span aria-hidden="true">
              {activeIndex + 1} / {AIGC_ARTWORKS.length}
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

      {useLens && lensActive && !infoOpen && (
        <MagnifierLens artwork={artwork} pointerRef={lensPointerRef} />
      )}
      {immersiveOpen && <ImmersiveArtwork artwork={artwork} onClose={closeImmersive} />}
      {useInfoOverlay && infoOpen && (
        <InfoOverlay title={artwork.title} onClose={closeInfoOverlay}>
          <ArtworkInfoBody artwork={artwork} />
        </InfoOverlay>
      )}
    </div>
  );
}
