"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CreativeSpotlight.module.css";

const SPOTLIGHT_RADIUS = 110;
const NEARBY_PADDING = 96;

interface CreativeSpotlightProps {
  mouse: { x: number; y: number } | null;
  enabled?: boolean;
  /** spotlight: 鼠标靠近才露金属；always: 常显金属呼吸（移动端） */
  mode?: "spotlight" | "always";
}

export function CreativeSpotlight({
  mouse,
  enabled = true,
  mode = "spotlight",
}: CreativeSpotlightProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [mask, setMask] = useState<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });

  useEffect(() => {
    if (mode === "always") {
      setMask((prev) => ({ ...prev, active: enabled }));
      return;
    }

    if (!enabled || !mouse || !wrapRef.current) {
      setMask((prev) => ({ ...prev, active: false }));
      return;
    }

    const rect = wrapRef.current.getBoundingClientRect();
    const withinX = mouse.x >= rect.left - NEARBY_PADDING && mouse.x <= rect.right + NEARBY_PADDING;
    const withinY = mouse.y >= rect.top - NEARBY_PADDING && mouse.y <= rect.bottom + NEARBY_PADDING;
    const active = withinX && withinY;

    setMask({
      x: mouse.x - rect.left,
      y: mouse.y - rect.top,
      active,
    });
  }, [mouse, enabled, mode]);

  const maskStyle =
    mode === "always"
      ? undefined
      : mask.active
        ? ({
            WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${mask.x}px ${mask.y}px, #000 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${mask.x}px ${mask.y}px, #000 0%, transparent 100%)`,
          } as React.CSSProperties)
        : ({
            WebkitMaskImage: "radial-gradient(circle 0px at -999px -999px, transparent, transparent)",
            maskImage: "radial-gradient(circle 0px at -999px -999px, transparent, transparent)",
          } as React.CSSProperties);

  return (
    <span
      ref={wrapRef}
      className={[styles.wrap, mode === "always" ? styles.wrapAlways : undefined]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.placeholder} aria-hidden="true">
        Creative
      </span>
      <span
        className={[
          styles.revealLayer,
          mode === "always" ? styles.revealLayerAlways : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
        style={maskStyle}
        aria-hidden={mode === "always" ? !enabled : !mask.active}
      >
        <span className={styles.creativeMetal}>Creative</span>
      </span>
      <span className={styles.srOnly}>Creative</span>
    </span>
  );
}
