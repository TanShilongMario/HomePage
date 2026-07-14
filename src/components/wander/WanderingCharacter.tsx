"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SketchThoughtBubble } from "@/components/sketch/SketchThoughtBubble";
import { WANDER_CHARACTERS, type WanderCharacterId } from "./characters";
import styles from "./WanderingCharacter.module.css";
import type { WanderRuntimeOptions } from "./types";
import { useWanderingCharacter } from "./useWanderingCharacter";

interface WanderingCharacterProps {
  characterId: WanderCharacterId;
  enabled?: boolean;
  className?: string;
  /** 预留：点击人物（如对话气泡） */
  onCharacterClick?: (characterId: WanderCharacterId) => void;
  options?: WanderRuntimeOptions;
}

export function WanderingCharacter({
  characterId,
  enabled = true,
  className,
  onCharacterClick,
  options,
}: WanderingCharacterProps) {
  const character = WANDER_CHARACTERS[characterId];
  const zoneRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLButtonElement>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const measureBounds = useCallback(() => {
    const zone = zoneRef.current;
    const characterEl = characterRef.current;
    if (!zone) return;

    setBounds({
      width: zone.clientWidth,
      height: characterEl?.offsetHeight ?? zone.clientHeight,
    });
  }, []);

  useEffect(() => {
    measureBounds();
    const zone = zoneRef.current;
    const characterEl = characterRef.current;
    if (!zone) return;

    const observer = new ResizeObserver(measureBounds);
    observer.observe(zone);
    if (characterEl) observer.observe(characterEl);
    return () => observer.disconnect();
  }, [measureBounds, enabled]);

  const { x, facingLeft, frameIndex, isMoving, isPositionReady } = useWanderingCharacter({
    character,
    enabled: enabled && bounds.width > 0,
    bounds,
    options,
  });

  const charWidth =
    bounds.height > 0
      ? bounds.height * (character.nativeWidth / character.nativeHeight)
      : character.nativeWidth;
  const frameSrc = character.frames[frameIndex] ?? character.frames[0];
  const footInset =
    (character.footInsetRatio ?? 0) * (bounds.height > 0 ? bounds.height : character.nativeHeight);
  const translateX = facingLeft ? x + charWidth : x;
  const showThought = isPositionReady && enabled && !isMoving;

  return (
    <div ref={zoneRef} className={[styles.zone, className].filter(Boolean).join(" ")}>
      <div
        className={styles.characterAnchor}
        style={{
          width: charWidth,
          bottom: footInset > 0 ? `-${footInset}px` : undefined,
          transform: `translateX(${translateX}px)`,
          visibility: isPositionReady ? "visible" : "hidden",
        }}
      >
        {showThought && (
          <SketchThoughtBubble seed={characterId} className={styles.thoughtBubble} />
        )}
        <button
          ref={characterRef}
          type="button"
          className={styles.character}
          style={{ transform: facingLeft ? "scaleX(-1)" : undefined }}
          onClick={onCharacterClick ? () => onCharacterClick(characterId) : undefined}
          aria-label={isMoving ? "正在散步的小人" : "正在思考的小人"}
          data-moving={isMoving ? "true" : "false"}
        >
          <img
            className={styles.sprite}
            src={frameSrc}
            alt=""
            width={character.nativeWidth}
            height={character.nativeHeight}
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
