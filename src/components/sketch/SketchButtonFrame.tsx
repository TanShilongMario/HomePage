import {
  SKETCH_BUTTON_FRAME_PATH,
  SKETCH_BUTTON_FRAME_VIEWBOX,
} from "./sketchButtonFramePath";
import styles from "./SketchButton.module.css";

interface SketchButtonFrameProps {
  className?: string;
}

export function SketchButtonFrame({ className }: SketchButtonFrameProps) {
  return (
    <svg
      className={[styles.cornerFrame, className].filter(Boolean).join(" ")}
      viewBox={SKETCH_BUTTON_FRAME_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="currentColor" d={SKETCH_BUTTON_FRAME_PATH} />
    </svg>
  );
}
