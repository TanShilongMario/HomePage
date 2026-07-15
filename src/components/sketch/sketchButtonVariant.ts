import type { CSSProperties } from "react";

export type SketchButtonSize = "sm" | "md" | "lg";

export interface SketchButtonVariant {
  rotation: number;
  hoverRotation: number;
  activeRotation: number;
  frameScaleX: number;
  frameScaleY: number;
  frameInsetTop: string;
  frameInsetRight: string;
  frameInsetBottom: string;
  frameInsetLeft: string;
  labelSkew: number;
}

function hashSeed(input: string): number {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function createSeededRandom(seed: number) {
  let state = seed || 1;

  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function randomBetween(random: () => number, min: number, max: number) {
  return min + random() * (max - min);
}

/** Stable per-seed hand-drawn jitter for one button instance. */
export function createSketchButtonVariant(seed: string): SketchButtonVariant {
  const random = createSeededRandom(hashSeed(seed));
  const rotation = randomBetween(random, -2.4, 2.4);

  return {
    rotation,
    hoverRotation: rotation + randomBetween(random, -1.2, 1.2),
    activeRotation: rotation + randomBetween(random, -0.8, 0.8),
    frameScaleX: randomBetween(random, 0.985, 1.015),
    frameScaleY: randomBetween(random, 0.985, 1.015),
    frameInsetTop: `${randomBetween(random, -12, -7)}%`,
    frameInsetRight: `${randomBetween(random, -5, -2)}%`,
    frameInsetBottom: `${randomBetween(random, -12, -7)}%`,
    frameInsetLeft: `${randomBetween(random, -5, -2)}%`,
    labelSkew: randomBetween(random, -1.2, 1.2),
  };
}

export function sketchVariantToStyle(variant: SketchButtonVariant): CSSProperties {
  return {
    ["--sketch-rotate" as string]: `${variant.rotation}deg`,
    ["--sketch-hover-rotate" as string]: `${variant.hoverRotation}deg`,
    ["--sketch-active-rotate" as string]: `${variant.activeRotation}deg`,
    ["--sketch-frame-scale-x" as string]: `${variant.frameScaleX}`,
    ["--sketch-frame-scale-y" as string]: `${variant.frameScaleY}`,
    ["--sketch-frame-inset-top" as string]: variant.frameInsetTop,
    ["--sketch-frame-inset-right" as string]: variant.frameInsetRight,
    ["--sketch-frame-inset-bottom" as string]: variant.frameInsetBottom,
    ["--sketch-frame-inset-left" as string]: variant.frameInsetLeft,
    ["--sketch-label-skew" as string]: `${variant.labelSkew}deg`,
  };
}

export const SKETCH_BUTTON_NEUTRAL_VARIANT = createSketchButtonVariant("sketch-button-neutral");
