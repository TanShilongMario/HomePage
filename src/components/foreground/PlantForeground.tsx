"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { PLANT_LAYOUT, PLANT_LAYOUT_COMPACT_IDS, type PlantDepth } from "./plants";
import styles from "./PlantForeground.module.css";

export type PlantRoom = "foreword" | "gallery" | "vibe" | "ending";

interface PlantForegroundProps {
  mouse: { x: number; y: number } | null;
  room: PlantRoom;
  entering?: boolean;
  traveling?: boolean;
  /** 竖屏减少植株数量 */
  compact?: boolean;
}

type PlantStyle = CSSProperties & Record<`--${string}`, string | number>;

const INFLUENCE_RADIUS: Record<PlantDepth, number> = {
  far: 150,
  middle: 190,
  near: 240,
};

const HOVER_SHIFT: Record<PlantDepth, number> = {
  far: 2,
  middle: 4,
  near: 7,
};

const PLANT_LAYOUT_COMPACT = PLANT_LAYOUT.filter((plant) =>
  PLANT_LAYOUT_COMPACT_IDS.has(plant.id),
);

export function PlantForeground({
  mouse,
  room,
  entering = false,
  traveling = false,
  compact = false,
}: PlantForegroundProps) {
  const plantRefs = useRef<Array<HTMLDivElement | null>>([]);
  const plants = useMemo(
    () => (compact ? PLANT_LAYOUT_COMPACT : PLANT_LAYOUT),
    [compact],
  );

  useEffect(() => {
    let rafId = 0;

    rafId = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      plants.forEach((plant, index) => {
        const element = plantRefs.current[index];
        if (!element) return;

        let sway = 0;
        let shift = 0;

        if (mouse && !reduceMotion) {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height * 0.42;
          const dx = mouse.x - centerX;
          const dy = mouse.y - centerY;
          const radius = INFLUENCE_RADIUS[plant.depth];
          const influence = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
          const pushDirection = dx >= 0 ? -1 : 1;

          sway = pushDirection * influence * plant.maxSwayDeg;
          shift = pushDirection * influence * HOVER_SHIFT[plant.depth];
        }

        element.style.setProperty("--plant-sway", `${sway.toFixed(2)}deg`);
        element.style.setProperty("--plant-hover-x", `${shift.toFixed(2)}px`);
      });
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [mouse, plants]);

  return (
    <div
      className={[
        styles.foreground,
        entering ? styles.foregroundEntering : undefined,
        compact ? styles.foregroundCompact : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      data-room={room}
      data-traveling={traveling ? "true" : "false"}
      aria-hidden="true"
    >
      {plants.map((plant, index) => {
        const style: PlantStyle = {
          "--plant-left": plant.left,
          "--plant-width": plant.width,
          "--plant-bottom": plant.bottom,
          "--plant-z": plant.zIndex,
          "--gallery-x": plant.galleryX,
          "--gallery-y": plant.galleryY,
          "--gallery-scale": plant.galleryScale,
          "--foreword-blur": plant.forewordBlur,
          "--gallery-blur": plant.galleryBlur,
          "--travel-blur": plant.travelBlur,
          "--plant-sway": "0deg",
          "--plant-hover-x": "0px",
        };

        return (
          <div
            key={plant.id}
            ref={(element) => {
              plantRefs.current[index] = element;
            }}
            className={styles.plant}
            data-depth={plant.depth}
            style={style}
          >
            <div className={styles.sway}>
              <img
                src={`/assets/svg/Plant_${plant.assetId}.svg`}
                alt=""
                draggable={false}
                aria-hidden="true"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
