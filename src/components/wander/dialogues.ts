export type WanderDialogueTrigger = "idle" | "click";

export interface WanderDialogueSet {
  idle: readonly string[];
  click: readonly string[];
}

/**
 * 各展馆的小人气泡文案。
 *
 * idle：小人停下来时随机出现；click：访客点击小人时出现。
 * 新展馆只需在这里增加一组配置，再把对应 key 传给 WanderingCrowd。
 */
export const WANDER_DIALOGUES = {
  foreword: {
    idle: [
      "...",
      "Interesting",
      "Wow",
      "Ph.D???",
      "Creative!",
      "Oh!",
      "Nice",
      "Hmm...",
      "Really?",
      "Cool",
      "I see",
      "Aha!",
      "Who is this?",
      "Tell me more",
      "So many ideas",
      "Impressive",
      "Wait...",
      "What a story",
    ],
    click: [
      "!",
      "Hey",
      "What's up?",
      "Hi!",
      "Hello",
      "Oh, hey!",
      "You found me",
      "Need something?",
      "I'm listening",
      "Nice to meet you",
      "Enjoy the show!",
      "Keep exploring",
    ],
  },
  aigcGallery: {
    idle: [
      "...",
      "AI?",
      "What prompt?",
      "Dreamy",
      "Surreal",
      "Look closer",
      "Generated?",
      "Nice colors",
      "Curious...",
      "How?",
      "Another world",
      "Is it real?",
    ],
    click: [
      "!",
      "Hey",
      "Found a favorite?",
      "Look again",
      "Zoom in!",
      "Art time",
      "Your turn",
      "Keep looking",
    ],
  },
  vibeCoding: {
    idle: [
      "...",
      "Building...",
      "Ship it?",
      "One more bug",
      "It works!",
      "Vibe check",
      "What stack?",
      "Compile...",
      "Almost ready",
      "Magic tools",
    ],
    click: [
      "!",
      "Hey, coder",
      "Still building",
      "Try again?",
      "No peeking!",
      "Come back soon",
    ],
  },
  notesFromCorner: {
    idle: [
      "...",
      "A new note",
      "Good thought",
      "Worth writing",
      "Read this",
      "From the corner",
      "One more idea",
      "Page by page",
    ],
    click: [
      "!",
      "Hey, reader",
      "Take a note",
      "Keep reading",
      "Thoughts?",
      "More soon",
    ],
  },
  endingShow: {
    idle: [
      "...",
      "The end?",
      "Not yet",
      "To be continued",
      "One more room",
      "See you soon",
      "Is it over?",
      "Under construction",
    ],
    click: [
      "!",
      "You made it",
      "Almost the end",
      "Come back later",
      "Thanks for visiting",
      "Keep wandering",
    ],
  },
} as const satisfies Record<string, WanderDialogueSet>;

export type WanderDialogueScene = keyof typeof WANDER_DIALOGUES;

export function pickWanderDialogue(
  scene: WanderDialogueScene,
  trigger: WanderDialogueTrigger,
  previous?: string,
): string {
  const choices: readonly string[] = WANDER_DIALOGUES[scene][trigger];
  if (choices.length === 1) return choices[0] ?? "...";

  const candidates = previous ? choices.filter((choice) => choice !== previous) : choices;
  return candidates[Math.floor(Math.random() * candidates.length)] ?? choices[0] ?? "...";
}
