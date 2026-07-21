import type { StickerForgeModule } from "./stickerForgeTypes";

const STICKER_FORGE_URL = "https://sticker.oooo.so/embed/sticker-forge.es.js";

let loadPromise: Promise<StickerForgeModule> | null = null;

/** 单例加载 CDN embed；失败时拒绝，由调用方降级。 */
export function loadStickerForge(): Promise<StickerForgeModule> {
  if (!loadPromise) {
    loadPromise = import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      STICKER_FORGE_URL
    ).then((mod) => mod as StickerForgeModule);
  }
  return loadPromise;
}
