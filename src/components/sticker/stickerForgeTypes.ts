/** Minimal typings for the sticker-forge CDN embed. */

export interface StickerRichTextRun {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number | string;
  underline?: boolean;
}

export interface StickerRichTextBlock {
  align?: "left" | "center" | "right";
  lineHeight?: number;
  runs: StickerRichTextRun[];
}

export interface StickerTextSource {
  type: "text";
  text: string;
  color?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  richText?: { blocks: StickerRichTextBlock[] };
}

export interface StickerSvgSource {
  type: "svg";
  /** Raw SVG markup；库内会做 sanitize */
  svg: string;
}

export type StickerSource = StickerTextSource | StickerSvgSource;

export interface StickerOptions {
  source?: StickerSource;
  outline?: { width?: number; color?: string };
  shadow?: {
    color?: string;
    opacity?: number;
    blur?: number;
    distance?: number;
    angle?: number;
  };
  peel?: {
    radius?: number;
    stiffness?: number;
    grabWidth?: number;
    maxAngle?: number;
    release?: "reset" | "stay" | "snap";
  };
  back?: { color?: string; gloss?: number; roughness?: number };
  sound?: { src?: string; volume?: number; enabled?: boolean };
  tilt?: number;
  wind?: number;
  quality?: "low" | "medium" | "high";
}

export interface StickerInstance {
  setSource(source: StickerSource): Promise<void>;
  setOptions(options: Partial<StickerOptions>): void;
  reset(): void;
  resize(): void;
  destroy(): void;
}

export interface StickerForgeModule {
  createSticker(
    target: HTMLElement | string,
    options?: StickerOptions,
  ): Promise<StickerInstance>;
  defineStickerForge?(tagName?: string): void;
}
