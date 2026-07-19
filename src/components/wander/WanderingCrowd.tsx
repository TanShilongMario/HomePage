"use client";

import { WanderingCharacter } from "./WanderingCharacter";
import type { WanderCharacterId } from "./characters";
import type { WanderDialogueScene } from "./dialogues";
import styles from "./WanderingCrowd.module.css";

const FOREWORD_CROWD: ReadonlyArray<{
  id: WanderCharacterId;
  options: { initialXFrac: number };
}> = [
  { id: "walking1", options: { initialXFrac: 0.12 } },
  { id: "walking2", options: { initialXFrac: 0.46 } },
  { id: "walking3", options: { initialXFrac: 0.74 } },
];

interface WanderingCrowdProps {
  enabled?: boolean;
  className?: string;
  dialogueScene?: WanderDialogueScene;
}

export function WanderingCrowd({
  enabled = true,
  className,
  dialogueScene = "foreword",
}: WanderingCrowdProps) {
  return (
    <div className={[styles.crowd, className].filter(Boolean).join(" ")}>
      {FOREWORD_CROWD.map(({ id, options }) => (
        <WanderingCharacter
          key={id}
          characterId={id}
          enabled={enabled}
          options={options}
          dialogueScene={dialogueScene}
        />
      ))}
    </div>
  );
}
