"use client";

import { useEffect, useRef, useState } from "react";
import type { WanderBounds, WanderCharacterDefinition, WanderRuntimeOptions } from "./types";
import { DEFAULT_WALK_CYCLE } from "./types";

interface UseWanderingCharacterOptions {
  character: WanderCharacterDefinition;
  /** 是否开始随机行走；位置会在 bounds 就绪时先初始化 */
  enabled: boolean;
  bounds: WanderBounds;
  options?: WanderRuntimeOptions;
}

interface WanderState {
  x: number;
  facingLeft: boolean;
  frameIndex: number;
  isMoving: boolean;
  isPositionReady: boolean;
}

type WanderDirection = "left" | "right";

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function computeMaxX(bounds: WanderBounds, character: WanderCharacterDefinition) {
  const charWidth = bounds.height * (character.nativeWidth / character.nativeHeight);
  return {
    charWidth,
    maxX: Math.max(0, bounds.width - charWidth),
  };
}

function computeMinWalk(maxX: number, options?: WanderRuntimeOptions) {
  const minPx = options?.minWalkPx ?? 56;
  const minFrac = options?.minWalkFrac ?? 0.1;
  return Math.max(minPx, maxX * minFrac);
}

function pickInitialX(maxX: number) {
  return randomBetween(0, Math.max(0, maxX));
}

function pickWalkDistance(minWalk: number, maxX: number, options?: WanderRuntimeOptions) {
  const maxFrac = options?.maxWalkFrac ?? 0.38;
  const upper = Math.max(minWalk, maxX * maxFrac);
  return randomBetween(minWalk, upper);
}

function chooseNextBehavior(
  x: number,
  maxX: number,
  minWalk: number,
  lastDirection: WanderDirection | null,
  options?: WanderRuntimeOptions,
): "idle" | WanderDirection {
  const roomLeft = x;
  const roomRight = maxX - x;
  const canLeft = roomLeft >= minWalk;
  const canRight = roomRight >= minWalk;

  if (!canLeft && !canRight) {
    return "idle";
  }

  const idleChance = options?.idleChance ?? 0.34;
  if (Math.random() < idleChance) {
    return "idle";
  }

  const choices: WanderDirection[] = [];
  if (canLeft) choices.push("left");
  if (canRight) choices.push("right");

  if (choices.length === 1) {
    return choices[0]!;
  }

  // 减少左右抖动：更倾向沿用上一段行走方向，或朝空间更大的方向走
  const continueBias = options?.continueDirectionBias ?? 0.62;
  if (lastDirection && choices.includes(lastDirection) && Math.random() < continueBias) {
    return lastDirection;
  }

  const leftWeight = canLeft ? roomLeft + minWalk : 0;
  const rightWeight = canRight ? roomRight + minWalk : 0;
  const total = leftWeight + rightWeight;
  return Math.random() * total < leftWeight ? "left" : "right";
}

export function useWanderingCharacter({
  character,
  enabled,
  bounds,
  options,
}: UseWanderingCharacterOptions): WanderState {
  const speed = options?.speed ?? 72;
  const frameIntervalMs = options?.frameIntervalMs ?? 115;
  const idleMinMs = options?.idleMinMs ?? 1400;
  const idleMaxMs = options?.idleMaxMs ?? 3800;

  const walkCycle = character.walkCycle ?? DEFAULT_WALK_CYCLE;

  const [state, setState] = useState<WanderState>({
    x: 0,
    facingLeft: false,
    frameIndex: walkCycle[0] ?? 0,
    isMoving: false,
    isPositionReady: false,
  });

  const runtimeRef = useRef({
    x: 0,
    targetX: 0,
    facingLeft: false,
    isMoving: false,
    cycleIndex: 0,
    frameIndex: walkCycle[0] ?? 0,
    frameElapsed: 0,
    idleUntil: 0,
    maxX: 0,
    lastDirection: null as WanderDirection | null,
    positionReady: false,
  });

  // bounds 就绪时先落位，避免入场结束后从 x=0 闪现
  useEffect(() => {
    if (bounds.width <= 0 || bounds.height <= 0) return;

    const { maxX } = computeMaxX(bounds, character);
    const runtime = runtimeRef.current;
    runtime.maxX = maxX;

    if (!runtime.positionReady) {
      runtime.x = pickInitialX(maxX);
      runtime.targetX = runtime.x;
      runtime.positionReady = true;
      setState((prev) => ({
        ...prev,
        x: runtime.x,
        facingLeft: runtime.facingLeft,
        frameIndex: runtime.frameIndex,
        isMoving: false,
        isPositionReady: true,
      }));
      return;
    }

    runtime.x = Math.min(runtime.x, maxX);
    runtime.targetX = Math.min(runtime.targetX, maxX);
    setState((prev) => ({ ...prev, x: runtime.x, isPositionReady: true }));
  }, [bounds.width, bounds.height, character]);

  useEffect(() => {
    if (!enabled || bounds.width <= 0 || bounds.height <= 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { maxX } = computeMaxX(bounds, character);
    const minWalk = computeMinWalk(maxX, options);

    const runtime = runtimeRef.current;
    runtime.maxX = maxX;

    if (runtime.idleUntil === 0) {
      runtime.idleUntil = performance.now() + randomBetween(idleMinMs, idleMaxMs);
    }

    if (prefersReducedMotion) {
      return;
    }

    let rafId = 0;
    let lastTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(48, now - lastTs);
      lastTs = now;

      if (!runtime.isMoving && now >= runtime.idleUntil) {
        const behavior = chooseNextBehavior(
          runtime.x,
          maxX,
          minWalk,
          runtime.lastDirection,
          options,
        );

        if (behavior === "idle") {
          runtime.idleUntil = now + randomBetween(idleMinMs, idleMaxMs);
        } else {
          const distance = pickWalkDistance(minWalk, maxX, options);
          const nextTarget =
            behavior === "left"
              ? Math.max(0, runtime.x - distance)
              : Math.min(maxX, runtime.x + distance);

          if (Math.abs(nextTarget - runtime.x) >= minWalk * 0.85) {
            runtime.targetX = nextTarget;
            runtime.facingLeft = behavior === "left";
            runtime.lastDirection = behavior;
            runtime.isMoving = true;
            runtime.cycleIndex = 0;
            runtime.frameElapsed = 0;
          } else {
            runtime.idleUntil = now + randomBetween(idleMinMs, idleMaxMs);
          }
        }
      }

      if (runtime.isMoving) {
        const delta = (speed * dt) / 1000;
        const distance = runtime.targetX - runtime.x;

        if (Math.abs(distance) <= delta) {
          runtime.x = runtime.targetX;
          runtime.isMoving = false;
          runtime.idleUntil = now + randomBetween(idleMinMs, idleMaxMs);
        } else {
          runtime.x += Math.sign(distance) * delta;
        }

        runtime.frameElapsed += dt;
        if (runtime.frameElapsed >= frameIntervalMs) {
          runtime.frameElapsed = 0;
          runtime.cycleIndex = (runtime.cycleIndex + 1) % walkCycle.length;
          runtime.frameIndex = walkCycle[runtime.cycleIndex] ?? 0;
        }
      }

      setState({
        x: runtime.x,
        facingLeft: runtime.facingLeft,
        frameIndex: runtime.frameIndex,
        isMoving: runtime.isMoving,
        isPositionReady: true,
      });

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [
    enabled,
    bounds.width,
    bounds.height,
    character,
    frameIntervalMs,
    idleMaxMs,
    idleMinMs,
    options,
    speed,
    walkCycle,
  ]);

  return state;
}
