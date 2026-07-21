import type { ExhibitionHallId } from "@/components/ticket";
import type { StickerOptions, StickerSource, StickerTextSource } from "./stickerForgeTypes";

const STICKER_FONT = "Arial Rounded MT Bold, Arial Black, sans-serif";

const BASE_PEEL = {
  radius: 0.16,
  stiffness: 0.59,
  grabWidth: 18,
  maxAngle: 3.55,
  release: "snap" as const,
};

const BASE_SHADOW = {
  opacity: 0.14,
  blur: 13,
  distance: 14,
  angle: 42,
  color: "#191823",
};

const BASE_BACK = {
  color: "#f7f5f2",
  gloss: 0.7,
  roughness: 0.3,
};

/** 入场主贴纸：Pass / Corner museum（加大字号） */
export const PASS_STICKER_SOURCE: StickerTextSource = {
  type: "text",
  text: "Pass\nCorner museum",
  fontFamily: STICKER_FONT,
  fontWeight: 900,
  color: "#a95b67",
  richText: {
    blocks: [
      {
        align: "center",
        lineHeight: 1.12,
        runs: [
          {
            text: "Pass",
            color: "rgb(43, 37, 32)",
            fontSize: 42,
            fontWeight: 900,
            underline: false,
          },
        ],
      },
      {
        align: "center",
        lineHeight: 0.9,
        runs: [
          {
            text: "Corner museum",
            color: "rgb(196, 92, 74)",
            fontSize: 14,
            fontWeight: 600,
            underline: false,
          },
        ],
      },
    ],
  },
};

export const PASS_STICKER_OPTIONS: StickerOptions = {
  outline: { width: 26, color: "#f4f1ec" },
  shadow: { ...BASE_SHADOW, blur: 16, distance: 18 },
  peel: { ...BASE_PEEL, grabWidth: 24 },
  sound: { enabled: true, volume: 0.5 },
  back: BASE_BACK,
  /* 布局层已有 CSS rotate，这里只保留轻微自身倾斜 */
  tilt: -3,
  wind: 0.4,
  quality: "high",
};

export interface HallStickerPreset {
  source: StickerSource;
  options: StickerOptions;
  rotateDeg: number;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** 圆形底 SVG：透明外缘 + 实心圆，便于贴纸按圆形模切放大 */
function circularHallSvg(
  line1: string,
  line2: string,
  fill: string,
  ink: string,
  accent: string,
): string {
  const a = escapeXml(line1);
  const b = escapeXml(line2);
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <circle cx="80" cy="80" r="74" fill="${fill}"/>
  <circle cx="80" cy="80" r="66" fill="none" stroke="${accent}" stroke-width="2.4" opacity="0.55"/>
  <text x="80" y="74" text-anchor="middle" dominant-baseline="middle"
    font-family="${STICKER_FONT}" font-size="28" font-weight="900" fill="${ink}">${a}</text>
  <text x="80" y="102" text-anchor="middle" dominant-baseline="middle"
    font-family="${STICKER_FONT}" font-size="11" font-weight="600" fill="${accent}"
    letter-spacing="0.04em">${b}</text>
</svg>`.trim();
}

function hallSticker(
  line1: string,
  line2: string,
  fill: string,
  ink: string,
  accent: string,
  rotateDeg: number,
): HallStickerPreset {
  return {
    rotateDeg,
    source: {
      type: "svg",
      svg: circularHallSvg(line1, line2, fill, ink, accent),
    },
    options: {
      outline: { width: 12, color: "#f7f5f2" },
      shadow: { ...BASE_SHADOW, opacity: 0.16, blur: 10, distance: 10 },
      /* 收窄可撕边缘，减少贴纸外围误触 */
      peel: { ...BASE_PEEL, grabWidth: 8, radius: 0.12 },
      sound: { enabled: false, volume: 0 },
      back: BASE_BACK,
      tilt: rotateDeg,
      wind: 0.22,
      quality: "medium",
    },
  };
}

/** 各展馆到访圆贴：贴在票底空白区，不跟厅名行绑定 */
export const HALL_STICKER_PRESETS: Record<ExhibitionHallId, HallStickerPreset> = {
  welcome: hallSticker("HELLO", "WELCOME", "#f3d6cf", "#2b2520", "#c45c4a", -12),
  aigc: hallSticker("SEEN", "AIGC", "#d5e6e1", "#1f2e2a", "#3d7a6a", 9),
  vibe: hallSticker("SHIPPED", "VIBE", "#f0dfc8", "#2b2520", "#c4783a", -7),
  notes: hallSticker("NOTED", "CORNER", "#d8e0e4", "#1e2a30", "#4a6670", 13),
  ending: hallSticker("FIN?", "ENDING", "#ecd4d4", "#2b2520", "#8b3a3a", -16),
};

/** 底部贴纸区展示顺序（按参观动线） */
export const HALL_STICKER_ORDER: readonly ExhibitionHallId[] = [
  "welcome",
  "aigc",
  "vibe",
  "notes",
  "ending",
];
