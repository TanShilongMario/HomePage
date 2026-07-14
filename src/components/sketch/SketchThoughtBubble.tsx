"use client";

import { useEffect, useState } from "react";
import styles from "./SketchThoughtBubble.module.css";

interface SketchThoughtBubbleProps {
  className?: string;
  /** 稳定复现的手绘抖动相位 */
  seed?: number | string;
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

/** 歪歪扭扭的思考气泡，点号按 . .. ... .. . 循环 */
export function SketchThoughtBubble({ className, seed = "thought" }: SketchThoughtBubbleProps) {
  const unit = seedUnit(seed);
  const wobble = unit * 5 - 2.5;
  const tilt = unit * 7 - 3.5;
  const frameOffset = Math.floor(unit * THINKING_FRAMES.length);

  const [frameIndex, setFrameIndex] = useState(frameOffset);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setFrameIndex(2);
      return;
    }

    const timerId = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % THINKING_FRAMES.length);
    }, FRAME_MS);

    return () => window.clearInterval(timerId);
  }, []);

  const bubblePath = `M ${14 + wobble * 0.2} ${11 - wobble * 0.15}
    C ${8 + wobble * 0.3} ${6 - wobble * 0.2}, ${58 + wobble * 0.15} ${4 + wobble * 0.25}, ${62 - wobble * 0.1} ${12 + wobble * 0.2}
    C ${68 - wobble * 0.2} ${18 + wobble * 0.15}, ${66 + wobble * 0.1} ${30 - wobble * 0.2}, ${58 - wobble * 0.15} ${33 + wobble * 0.1}
    C ${44 + wobble * 0.2} ${37 - wobble * 0.15}, ${18 - wobble * 0.1} ${35 + wobble * 0.2}, ${12 + wobble * 0.15} ${26 - wobble * 0.1}
    C ${7 + wobble * 0.1} ${18 + wobble * 0.15}, ${9 - wobble * 0.2} ${13 - wobble * 0.1}, ${14 + wobble * 0.2} ${11 - wobble * 0.15}
    Z`;

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={{ ["--thought-tilt" as string]: `${tilt}deg` }}
      aria-hidden="true"
    >
      <svg className={styles.svg} viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <circle
          className={styles.dot}
          cx={34 + wobble * 0.15}
          cy={41 + wobble * 0.1}
          r={3.2 + wobble * 0.05}
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          className={styles.dot}
          cx={36 - wobble * 0.1}
          cy={48 - wobble * 0.08}
          r={2.2 + wobble * 0.04}
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className={styles.label} aria-hidden="true">
        {THINKING_FRAMES[frameIndex]}
      </span>
    </div>
  );
}
