"use client";

import { useId, useMemo } from "react";
import { SketchButtonFrame } from "./SketchButtonFrame";
import styles from "./SketchButton.module.css";
import {
  createSketchButtonVariant,
  sketchVariantToStyle,
  SKETCH_BUTTON_NEUTRAL_VARIANT,
  type SketchButtonSize,
} from "./sketchButtonVariant";

export interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** sm | md | lg — default md */
  size?: SketchButtonSize;
  /** Optional stable seed. Falls back to React useId(). */
  seed?: string;
  /** Enable hand-drawn jitter. Default true. */
  randomize?: boolean;
}

export function SketchButton({
  children,
  className,
  size = "md",
  seed,
  randomize = true,
  style,
  type = "button",
  ...props
}: SketchButtonProps) {
  const reactId = useId();
  const variantSeed = seed ?? reactId;

  const variantStyle = useMemo(
    () =>
      randomize
        ? sketchVariantToStyle(createSketchButtonVariant(variantSeed))
        : sketchVariantToStyle(SKETCH_BUTTON_NEUTRAL_VARIANT),
    [randomize, variantSeed],
  );

  return (
    <button
      type={type}
      data-size={size}
      className={[styles.sketchButton, className].filter(Boolean).join(" ")}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      <SketchButtonFrame />
      <span className={styles.label}>{children}</span>
    </button>
  );
}
