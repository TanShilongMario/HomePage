"use client";

/**
 * 手绘企鹅 → 金属企鹅探照灯 + 眼睛跟随。
 * 当前未挂载于 Hero；其他页面可直接引入本组件。
 */
import { useEffect, useRef, useState } from "react";
import styles from "./PenguinSpotlight.module.css";
import {
  getEyeCenter,
  getPupilOffset,
  PENGUIN_ART,
  type PupilOffset,
} from "./penguinEyes";

const SPOTLIGHT_RADIUS = 140;
const NEARBY_PADDING = 120;

interface PenguinSpotlightProps {
  mouse: { x: number; y: number } | null;
  enabled?: boolean;
}

interface EyeLayout {
  scale: number;
  pupils: Record<"left" | "right", PupilOffset>;
}

const DEFAULT_EYE_LAYOUT: EyeLayout = {
  scale: 1,
  pupils: {
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  },
};

export function PenguinSpotlight({ mouse, enabled = true }: PenguinSpotlightProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });
  const [eyeLayout, setEyeLayout] = useState<EyeLayout>(DEFAULT_EYE_LAYOUT);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const updateLayout = () => {
      const rect = wrap.getBoundingClientRect();
      const scale = rect.height / PENGUIN_ART.height;

      if (!enabled || !mouse) {
        setEyeLayout({
          scale,
          pupils: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
        });
        return;
      }

      const localMouseX = mouse.x - rect.left;
      const localMouseY = mouse.y - rect.top;

      const pupils = Object.fromEntries(
        PENGUIN_ART.eyes.map((eye) => {
          const center = getEyeCenter(eye.x, eye.y, scale);
          const offset = getPupilOffset(localMouseX, localMouseY, center.x, center.y, scale);
          return [eye.id, offset];
        }),
      ) as Record<"left" | "right", PupilOffset>;

      setEyeLayout({ scale, pupils });
    };

    updateLayout();

    const observer = new ResizeObserver(updateLayout);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [mouse, enabled]);

  useEffect(() => {
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
  }, [mouse, enabled]);

  const spotlightAt = mask.active ? `${mask.x}px ${mask.y}px` : "-999px -999px";
  const { scale, pupils } = eyeLayout;

  const handMaskStyle = mask.active
    ? ({
        WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spotlightAt}, transparent 0%, transparent 52%, black 100%)`,
        maskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spotlightAt}, transparent 0%, transparent 52%, black 100%)`,
      } as React.CSSProperties)
    : undefined;

  const handBlurMaskStyle = mask.active
    ? ({
        WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spotlightAt}, black 0%, transparent 72%)`,
        maskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spotlightAt}, black 0%, transparent 72%)`,
      } as React.CSSProperties)
    : undefined;

  const metalMaskStyle = mask.active
    ? ({
        WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spotlightAt}, #000 0%, transparent 100%)`,
        maskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spotlightAt}, #000 0%, transparent 100%)`,
      } as React.CSSProperties)
    : ({
        WebkitMaskImage: "radial-gradient(circle 0px at -999px -999px, transparent, transparent)",
        maskImage: "radial-gradient(circle 0px at -999px -999px, transparent, transparent)",
      } as React.CSSProperties);

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <div className={styles.handLayer}>
        <img
          className={styles.handImage}
          src="/assets/textures/Penguin_handdrawing.png"
          alt=""
          width={992}
          height={1325}
          draggable={false}
          style={handMaskStyle}
        />

        {mask.active && (
          <img
            className={styles.handBlur}
            src="/assets/textures/Penguin_handdrawing.png"
            alt=""
            width={992}
            height={1325}
            draggable={false}
            style={handBlurMaskStyle}
          />
        )}
      </div>

      <div className={styles.metalReveal} style={metalMaskStyle} aria-hidden={!mask.active}>
        <img
          className={styles.metalImage}
          src="/assets/textures/Penguin_Metal.png"
          alt=""
          width={992}
          height={1325}
          draggable={false}
        />
      </div>

      <div className={styles.eyesLayer}>
        {PENGUIN_ART.eyes.map((eye) => (
          <div
            key={eye.id}
            className={styles.eyeSocket}
            style={{
              left: eye.x * scale,
              top: eye.y * scale,
              width: PENGUIN_ART.eyeSize * scale,
              height: PENGUIN_ART.eyeSize * scale,
            }}
          >
            <div className={styles.eyeWhite} />
            <div
              className={styles.pupil}
              style={{
                width: PENGUIN_ART.pupilSize * scale,
                height: PENGUIN_ART.pupilSize * scale,
                transform: `translate(calc(-50% + ${pupils[eye.id].x}px), calc(-50% + ${pupils[eye.id].y}px))`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
