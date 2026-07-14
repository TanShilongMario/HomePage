import styles from "./Button1.module.css";
import { SKETCH_BUTTON_FRAMES, type SketchSvgButtonVariant } from "./sketchButtonFrames";

interface Button1FrameProps {
  variant?: SketchSvgButtonVariant;
  className?: string;
}

export function Button1Frame({ variant = 1, className }: Button1FrameProps) {
  const frame = SKETCH_BUTTON_FRAMES[variant];

  return (
    <img
      className={[styles.frame, className].filter(Boolean).join(" ")}
      src={frame.src}
      alt=""
      width={frame.width}
      height={frame.height}
      draggable={false}
      aria-hidden="true"
    />
  );
}
