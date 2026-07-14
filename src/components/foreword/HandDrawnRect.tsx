import styles from "./HandDrawnRect.module.css";

interface HandDrawnRectProps {
  seed?: string;
  className?: string;
}

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (const char of seed) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seed: string) {
  let state = hashSeed(seed) || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state);
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state);
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296;
  };
}

function offset(random: () => number, amount = 1): number {
  return Number(((random() - 0.5) * amount).toFixed(2));
}

/** Four independent wobbly strokes forming a rectangular frame. */
export function HandDrawnRect({ seed = "foreword-frame", className }: HandDrawnRectProps) {
  const random = createRandom(seed);
  const horizontalPath = (reverse = false) => {
    const start = reverse ? 99 : 1;
    const end = reverse ? 1 : 99;
    const first = reverse ? 68 : 32;
    const second = reverse ? 34 : 66;
    return `M${start} ${2 + offset(random, 1.4)} C${first} ${2 + offset(random, 2.6)} ${second} ${
      2 + offset(random, 2.6)
    } ${end} ${2 + offset(random, 1.4)}`;
  };
  const verticalPath = (reverse = false) => {
    const start = reverse ? 99 : 1;
    const end = reverse ? 1 : 99;
    const first = reverse ? 68 : 32;
    const second = reverse ? 34 : 66;
    return `M${2 + offset(random, 1.4)} ${start} C${2 + offset(random, 2.6)} ${first} ${
      2 + offset(random, 2.6)
    } ${second} ${2 + offset(random, 1.4)} ${end}`;
  };

  return (
    <span className={[styles.frame, className].filter(Boolean).join(" ")} aria-hidden="true">
      <svg className={styles.top} viewBox="0 0 100 4" preserveAspectRatio="none">
        <path d={horizontalPath()} />
      </svg>
      <svg className={styles.right} viewBox="0 0 4 100" preserveAspectRatio="none">
        <path d={verticalPath()} />
      </svg>
      <svg className={styles.bottom} viewBox="0 0 100 4" preserveAspectRatio="none">
        <path d={horizontalPath(true)} />
      </svg>
      <svg className={styles.left} viewBox="0 0 4 100" preserveAspectRatio="none">
        <path d={verticalPath(true)} />
      </svg>
    </span>
  );
}
