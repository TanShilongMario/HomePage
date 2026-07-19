"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SketchThoughtBubble } from "@/components/sketch/SketchThoughtBubble";
import { WANDER_CHARACTERS, type WanderCharacterId } from "./characters";
import {
  pickWanderDialogue,
  type WanderDialogueScene,
} from "./dialogues";
import styles from "./WanderingCharacter.module.css";
import type { WanderRuntimeOptions } from "./types";
import { useWanderingCharacter } from "./useWanderingCharacter";

interface WanderingCharacterProps {
  characterId: WanderCharacterId;
  enabled?: boolean;
  className?: string;
  onCharacterClick?: (characterId: WanderCharacterId) => void;
  options?: WanderRuntimeOptions;
  dialogueScene?: WanderDialogueScene;
  /** 点击后冻结行走，与 options 分离以避免 effect 依赖抖动 */
  paused?: boolean;
}

export function WanderingCharacter({
  characterId,
  enabled = true,
  className,
  onCharacterClick,
  options,
  dialogueScene,
  paused = false,
}: WanderingCharacterProps) {
  const character = WANDER_CHARACTERS[characterId];
  const zoneRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLButtonElement>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [pinned, setPinned] = useState(false);
  const [idleDialogue, setIdleDialogue] = useState("...");
  const [clickDialogue, setClickDialogue] = useState("!");
  const wasMovingRef = useRef(false);
  const dialogueSceneRef = useRef(dialogueScene);
  const isPaused = paused || pinned;

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

  useEffect(() => {
    if (!enabled) {
      setPinned(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!pinned || !enabled) return;

    const resumeTimer = window.setTimeout(
      () => setPinned(false),
      2000 + Math.random() * 2000,
    );

    return () => window.clearTimeout(resumeTimer);
  }, [enabled, pinned]);

  const wanderOptions = useMemo(
    () => options,
    [
      options?.initialXFrac,
      options?.speed,
      options?.frameIntervalMs,
      options?.idleMinMs,
      options?.idleMaxMs,
      options?.idleChance,
      options?.minWalkPx,
      options?.minWalkFrac,
      options?.maxWalkFrac,
      options?.continueDirectionBias,
    ],
  );

  const { x, facingLeft, frameIndex, isMoving, isPositionReady } = useWanderingCharacter({
    character,
    enabled: enabled && bounds.width > 0,
    bounds,
    options: wanderOptions,
    paused: isPaused,
  });

  const charWidth =
    bounds.height > 0
      ? bounds.height * (character.nativeWidth / character.nativeHeight)
      : character.nativeWidth;
  const frameSrc = character.frames[frameIndex] ?? character.frames[0];
  const footInset =
    (character.footInsetRatio ?? 0) * (bounds.height > 0 ? bounds.height : character.nativeHeight);
  const translateX = facingLeft ? x + charWidth : x;
  const showIdleThought = isPositionReady && enabled && !isMoving && !isPaused;
  const showAlertBubble = isPositionReady && enabled && isPaused;

  useEffect(() => {
    if (!dialogueScene || dialogueSceneRef.current === dialogueScene) return;

    dialogueSceneRef.current = dialogueScene;
    setIdleDialogue(pickWanderDialogue(dialogueScene, "idle"));
    setClickDialogue(pickWanderDialogue(dialogueScene, "click"));
  }, [dialogueScene]);

  useEffect(() => {
    if (!dialogueScene || !isPositionReady || !enabled || isPaused) {
      wasMovingRef.current = isMoving;
      return;
    }

    if (!isMoving && (wasMovingRef.current || idleDialogue === "...")) {
      setIdleDialogue((current) => pickWanderDialogue(dialogueScene, "idle", current));
    }

    wasMovingRef.current = isMoving;
  }, [dialogueScene, enabled, idleDialogue, isMoving, isPaused, isPositionReady]);

  const handleClick = () => {
    setPinned((current) => {
      const nextPinned = !current;
      if (nextPinned && dialogueScene) {
        setClickDialogue((previous) => pickWanderDialogue(dialogueScene, "click", previous));
      }
      return nextPinned;
    });
    onCharacterClick?.(characterId);
  };

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
        <button
          ref={characterRef}
          type="button"
          className={styles.character}
          style={{ transform: facingLeft ? "scaleX(-1)" : undefined }}
          onClick={handleClick}
          aria-label={
            pinned
              ? "已停下的小人，再次点击继续行走"
              : isMoving
                ? "正在散步的小人，点击停下"
                : "正在思考的小人，点击停下"
          }
          aria-pressed={pinned}
          data-moving={isMoving ? "true" : "false"}
          data-pinned={pinned ? "true" : "false"}
        >
          {showAlertBubble && (
            <SketchThoughtBubble
              variant="alert"
              size="lg"
              seed={characterId}
              labelCounterMirrored={facingLeft}
              label={clickDialogue}
              className={styles.thoughtBubble}
            />
          )}
          {showIdleThought && (
            <SketchThoughtBubble
              variant="thinking"
              size="lg"
              seed={characterId}
              labelCounterMirrored={facingLeft}
              label={idleDialogue}
              className={styles.thoughtBubble}
            />
          )}
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
