import styles from "./SketchWobbleLine.module.css";

interface SketchWobbleLineProps {
  className?: string;
  /** 0–1，手绘路径的随机相位（稳定复现） */
  seed?: number;
}

/** 歪歪扭扭的手绘横线，可用于扉页分隔等场景 */
export function SketchWobbleLine({ className, seed = 0.5 }: SketchWobbleLineProps) {
  const wobble = (seed % 1) * 4 - 2;

  return (
    <svg
      className={[styles.line, className].filter(Boolean).join(" ")}
      viewBox="0 0 1200 32"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className={styles.stroke}
        d={`M 8 ${16 + wobble * 0.3}
           C 140 ${8 + wobble}, 260 ${22 - wobble * 0.5}, 400 ${14 + wobble * 0.4}
           S 680 ${10 - wobble * 0.3}, 920 ${18 + wobble * 0.2}
           S 1080 ${12 + wobble * 0.5}, 1192 ${15 - wobble * 0.2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
