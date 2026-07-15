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
  nativeWidth: 85,
  nativeHeight: 129,
  footInsetRatio: 4.5 / 129,
};

export const WALKING2_CHARACTER: WanderCharacterDefinition = {
  id: "walking2",
  frames: [
    "/assets/svg/Walking2_1.svg",
    "/assets/svg/Walking2_2.svg",
    "/assets/svg/Walking2_3.svg",
    "/assets/svg/Walking2_4.svg",
  ],
  walkCycle: DEFAULT_WALK_CYCLE,
  nativeWidth: 61,
  nativeHeight: 129,
  footInsetRatio: 4.5 / 129,
};

export const WALKING3_CHARACTER: WanderCharacterDefinition = {
  id: "walking3",
  frames: [
    "/assets/svg/Walking3_1.svg",
    "/assets/svg/Walking3_2.svg",
    "/assets/svg/Walking3_3.svg",
    "/assets/svg/Walking3_4.svg",
  ],
  walkCycle: DEFAULT_WALK_CYCLE,
  nativeWidth: 66,
  nativeHeight: 127,
  footInsetRatio: 4.5 / 127,
};

export const WANDER_CHARACTERS = {
  walking1: WALKING1_CHARACTER,
  walking2: WALKING2_CHARACTER,
  walking3: WALKING3_CHARACTER,
} as const;

export type WanderCharacterId = keyof typeof WANDER_CHARACTERS;
