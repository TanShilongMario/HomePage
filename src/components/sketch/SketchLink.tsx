"use client";

import Link from "next/link";
import { useId, useMemo } from "react";
import { SketchButtonFrame } from "./SketchButtonFrame";
import styles from "./SketchButton.module.css";
import {
  createSketchButtonVariant,
  sketchVariantToStyle,
  SKETCH_BUTTON_NEUTRAL_VARIANT,
  type SketchButtonSize,
} from "./sketchButtonVariant";

export interface SketchLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  size?: SketchButtonSize;
  seed?: string;
  randomize?: boolean;
}

/** Same hand-drawn frame as SketchButton, rendered as a link. */
export function SketchLink({
  children,
  className,
  size = "md",
  seed,
  randomize = true,
  style,
  ...props
}: SketchLinkProps) {
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
    <Link
      data-size={size}
      className={[styles.sketchButton, styles.sketchLink, className].filter(Boolean).join(" ")}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      <SketchButtonFrame />
      <span className={styles.label}>{children}</span>
    </Link>
  );
}
