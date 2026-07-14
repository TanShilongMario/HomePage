"use client";

import { Button1Frame } from "./Button1Frame";
import styles from "./Button1.module.css";
import type { SketchSvgButtonVariant } from "./sketchButtonFrames";

export type Button1Size = "sm" | "md" | "lg";

export interface Button1Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: Button1Size;
  variant?: SketchSvgButtonVariant;
  shape?: "wide" | "square";
}

export function Button1({
  children,
  className,
  size = "md",
  variant = 1,
  shape = "wide",
  type = "button",
  ...props
}: Button1Props) {
  return (
    <button
      type={type}
      data-size={size}
      data-shape={shape}
      className={[styles.button1, className].filter(Boolean).join(" ")}
      {...props}
    >
      <Button1Frame variant={variant} />
      <span className={styles.label}>{children}</span>
    </button>
  );
}
