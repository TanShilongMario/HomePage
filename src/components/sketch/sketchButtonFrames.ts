export type SketchSvgButtonVariant = 1 | 2 | 3 | 4;

export const SKETCH_BUTTON_FRAMES: Record<
  SketchSvgButtonVariant,
  { src: string; width: number; height: number }
> = {
  1: { src: "/assets/svg/Button1.svg", width: 361, height: 171 },
  2: { src: "/assets/svg/Button2.svg", width: 134, height: 134 },
  3: { src: "/assets/svg/Button3.svg", width: 134, height: 134 },
  4: { src: "/assets/svg/Button4.svg", width: 134, height: 134 },
};

export const LANG_TOGGLE_VARIANT: SketchSvgButtonVariant = 1;
