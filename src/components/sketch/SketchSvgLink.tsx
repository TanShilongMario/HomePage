"use client";

import { Button1Frame } from "./Button1Frame";
import styles from "./Button1.module.css";
import type { SketchSvgButtonVariant } from "./sketchButtonFrames";

export interface SketchSvgLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant: SketchSvgButtonVariant;
}

export function SketchSvgLink({
  children,
  className,
  variant,
  ...props
}: SketchSvgLinkProps) {
  return (
    <a
      data-shape="square"
      className={[styles.button1, styles.sketchLink, className].filter(Boolean).join(" ")}
      {...props}
    >
      <Button1Frame variant={variant} />
      <span className={styles.label}>{children}</span>
    </a>
  );
}
