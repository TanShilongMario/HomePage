declare module "https://sticker.oooo.so/embed/sticker-forge.es.js" {
  import type { StickerForgeModule } from "@/components/sticker/stickerForgeTypes";
  const mod: StickerForgeModule;
  export = mod;
  export as namespace StickerForge;
}
