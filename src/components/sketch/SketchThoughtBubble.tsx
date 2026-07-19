"use client";

import { useEffect, useState } from "react";
import styles from "./SketchThoughtBubble.module.css";

export type SketchThoughtBubbleVariant = "thinking" | "alert";
export type SketchThoughtBubbleSize = "md" | "lg";

interface SketchThoughtBubbleProps {
  className?: string;
  /** 稳定复现的手绘抖动相位 */
  seed?: number | string;
  variant?: SketchThoughtBubbleVariant;
  size?: SketchThoughtBubbleSize;
  /** 父级已水平镜像时，单独把文字反镜像以保持可读 */
  labelCounterMirrored?: boolean;
  /** 自定义短句；未传时 thinking 使用点号动画、alert 使用感叹号 */
  label?: string;
}

const THINKING_FRAMES = [".", "..", "...", "..", "."] as const;
const FRAME_MS = 420;

function hashSeed(input: string): number {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function seedUnit(seed: number | string | undefined) {
  if (typeof seed === "number") return seed % 1;
  return (hashSeed(seed ?? "thought") % 1000) / 1000;
}

/** 歪歪扭扭的思考气泡；thinking 为点号循环，alert 为感叹号 */
export function SketchThoughtBubble({
  className,
  seed = "thought",
  variant = "thinking",
  size = "md",
  labelCounterMirrored = false,
  label: customLabel,
}: SketchThoughtBubbleProps) {
  const unit = seedUnit(seed);
  const wobble = unit * 5 - 2.5;
  const tilt = unit * 7 - 3.5;
  const frameOffset = Math.floor(unit * THINKING_FRAMES.length);

  const [frameIndex, setFrameIndex] = useState(frameOffset);

  useEffect(() => {
    if (variant === "alert") {
      setFrameIndex(2);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setFrameIndex(2);
      return;
    }

    const timerId = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % THINKING_FRAMES.length);
    }, FRAME_MS);

    return () => window.clearInterval(timerId);
  }, [variant]);

  const bubblePath = `M ${14 + wobble * 0.2} ${10 - wobble * 0.15}
    C ${8 + wobble * 0.3} ${5 - wobble * 0.2}, ${58 + wobble * 0.15} ${3 + wobble * 0.25}, ${62 - wobble * 0.1} ${11 + wobble * 0.2}
    C ${68 - wobble * 0.2} ${17 + wobble * 0.15}, ${66 + wobble * 0.1} ${31 - wobble * 0.2}, ${58 - wobble * 0.15} ${34 + wobble * 0.1}
    C ${44 + wobble * 0.2} ${38 - wobble * 0.15}, ${18 - wobble * 0.1} ${36 + wobble * 0.2}, ${12 + wobble * 0.15} ${27 - wobble * 0.1}
    C ${7 + wobble * 0.1} ${19 + wobble * 0.15}, ${9 - wobble * 0.2} ${12 - wobble * 0.1}, ${14 + wobble * 0.2} ${10 - wobble * 0.15}
    Z`;

  const label = customLabel ?? (variant === "alert" ? "!" : THINKING_FRAMES[frameIndex]);
  const bubbleWidth = `${Math.min(10, Math.max(size === "lg" ? 4.2 : 3.2, 2.5 + label.length * 0.48))}rem`;

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={{
        ["--thought-tilt" as string]: `${tilt}deg`,
        ["--thought-width" as string]: bubbleWidth,
      }}
      data-size={size}
      data-variant={variant}
      data-label-counter-mirrored={labelCounterMirrored ? "true" : undefined}
      data-custom-label={customLabel ? "true" : undefined}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 72 40"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.bubble}
          d={bubblePath}
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className={styles.label} aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
