import type { WanderCharacterDefinition } from "./types";
import { DEFAULT_WALK_CYCLE } from "./types";

export const WALKING1_CHARACTER: WanderCharacterDefinition = {
  id: "walking1",
  frames: [
    "/assets/svg/Walking1_1.svg",
    "/assets/svg/Walking1_2.svg",
    "/assets/svg/Walking1_3.svg",
    "/assets/svg/Walking1_4.svg",
  ],
  walkCycle: DEFAULT_WALK_CYCLE,
  nativeWidth: 86,
  nativeHeight: 132,
  footInsetRatio: 4.5 / 132,
};

/** 预留：后续可在此注册 walking2 / walking3 */
export const WANDER_CHARACTERS = {
  walking1: WALKING1_CHARACTER,
} as const;

export type WanderCharacterId = keyof typeof WANDER_CHARACTERS;
