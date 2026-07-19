export type PlantDepth = "far" | "middle" | "near";
export type PlantAssetId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface PlantVisualPreset {
  depth: PlantDepth;
  maxSwayDeg: number;
  forewordBlur: string;
  galleryBlur: string;
  travelBlur: string;
}

export interface PlantLayoutItem extends PlantVisualPreset {
  id: string;
  assetId: PlantAssetId;
  left: string;
  width: string;
  bottom: string;
  zIndex: number;
  galleryX: string;
  galleryY: string;
  galleryScale: number;
}

type PlantPosition = Pick<
  PlantLayoutItem,
  | "left"
  | "width"
  | "bottom"
  | "zIndex"
  | "galleryX"
  | "galleryY"
  | "galleryScale"
> &
  Partial<PlantVisualPreset>;

const VISUAL_PRESETS: Record<PlantAssetId, PlantVisualPreset> = {
  1: {
    depth: "near",
    maxSwayDeg: 4.8,
    forewordBlur: "4.2px",
    galleryBlur: "5.2px",
    travelBlur: "1.2px",
  },
  2: {
    depth: "middle",
    maxSwayDeg: 3.4,
    forewordBlur: "2.2px",
    galleryBlur: "2.8px",
    travelBlur: "0.7px",
  },
  3: {
    depth: "near",
    maxSwayDeg: 5.2,
    forewordBlur: "3.6px",
    galleryBlur: "4.4px",
    travelBlur: "1.1px",
  },
  4: {
    depth: "far",
    maxSwayDeg: 2.2,
    forewordBlur: "1.25px",
    galleryBlur: "1.5px",
    travelBlur: "0.4px",
  },
  5: {
    depth: "middle",
    maxSwayDeg: 3.2,
    forewordBlur: "2px",
    galleryBlur: "2.5px",
    travelBlur: "0.65px",
  },
  6: {
    depth: "near",
    maxSwayDeg: 5.5,
    forewordBlur: "4px",
    galleryBlur: "5px",
    travelBlur: "1.2px",
  },
  7: {
    depth: "near",
    maxSwayDeg: 5.8,
    forewordBlur: "4.6px",
    galleryBlur: "5.8px",
    travelBlur: "1.4px",
  },
  8: {
    depth: "far",
    maxSwayDeg: 2.4,
    forewordBlur: "1.4px",
    galleryBlur: "1.7px",
    travelBlur: "0.45px",
  },
  9: {
    depth: "middle",
    maxSwayDeg: 3.5,
    forewordBlur: "2.1px",
    galleryBlur: "2.7px",
    travelBlur: "0.7px",
  },
  10: {
    depth: "far",
    maxSwayDeg: 2.1,
    forewordBlur: "1px",
    galleryBlur: "1.3px",
    travelBlur: "0.35px",
  },
};

function plant(
  id: string,
  assetId: PlantAssetId,
  position: PlantPosition,
): PlantLayoutItem {
  return {
    id,
    assetId,
    ...VISUAL_PRESETS[assetId],
    ...position,
  };
}

/**
 * 1–10 是从左到右的主序列；b / c 后缀实例穿插在主序列间隙。
 * 主序列 Plant 3 / 6 / 7 仍处于最高遮挡层，重复实例用于补足前景密度。
 */
export const PLANT_LAYOUT: readonly PlantLayoutItem[] = [
  plant("1", 1, {
    left: "-7%", width: "clamp(13rem, 22.5vw, 26rem)", bottom: "-38%", zIndex: 18,
    galleryX: "-36px", galleryY: "-5px", galleryScale: 1.045,
  }),
  plant("4b", 4, {
    left: "1%", width: "clamp(4.8rem, 6.8vw, 8rem)", bottom: "-8%", zIndex: 6,
    galleryX: "-12px", galleryY: "2px", galleryScale: 1.012,
  }),
  plant("2", 2, {
    left: "7%", width: "clamp(8rem, 13.6vw, 16rem)", bottom: "-17%", zIndex: 10,
    galleryX: "-24px", galleryY: "2px", galleryScale: 1.025,
  }),
  plant("4c", 4, {
    left: "9.5%", width: "clamp(4.4rem, 6.4vw, 7.6rem)", bottom: "-24%", zIndex: 8,
    galleryX: "-15px", galleryY: "3px", galleryScale: 1.014,
    depth: "far", maxSwayDeg: 2.1, forewordBlur: "1.15px", galleryBlur: "1.45px",
  }),
  plant("7b", 7, {
    left: "12%", width: "clamp(5.6rem, 7.8vw, 9.2rem)", bottom: "-27%", zIndex: 24,
    galleryX: "-25px", galleryY: "-4px", galleryScale: 1.04,
    depth: "middle", maxSwayDeg: 4.1, forewordBlur: "2.4px", galleryBlur: "3px",
  }),
  plant("3", 3, {
    left: "18%", width: "clamp(5.6rem, 8.8vw, 10.4rem)", bottom: "-12%", zIndex: 43,
    galleryX: "-28px", galleryY: "-8px", galleryScale: 1.04,
  }),
  plant("2b", 2, {
    left: "23%", width: "clamp(6.2rem, 10.5vw, 12.5rem)", bottom: "-21%", zIndex: 7,
    galleryX: "-15px", galleryY: "3px", galleryScale: 1.018,
    depth: "far", maxSwayDeg: 2.2, forewordBlur: "1.1px", galleryBlur: "1.4px",
  }),
  plant("9c", 9, {
    left: "26%", width: "clamp(4.8rem, 7vw, 8.4rem)", bottom: "-16%", zIndex: 19,
    galleryX: "-13px", galleryY: "-2px", galleryScale: 1.02,
    depth: "middle", maxSwayDeg: 3.2, forewordBlur: "2.2px", galleryBlur: "2.75px",
  }),
  plant("4", 4, {
    left: "29%", width: "clamp(6rem, 8.6vw, 10.2rem)", bottom: "-18%", zIndex: 13,
    galleryX: "-12px", galleryY: "3px", galleryScale: 1.012,
  }),
  plant("8b", 8, {
    left: "34%", width: "clamp(5rem, 7.2vw, 8.6rem)", bottom: "-9%", zIndex: 22,
    galleryX: "-9px", galleryY: "-3px", galleryScale: 1.02,
    depth: "middle", maxSwayDeg: 3.1, forewordBlur: "2.2px", galleryBlur: "2.7px",
  }),
  plant("5", 5, {
    left: "39%", width: "clamp(7.5rem, 12.8vw, 15.2rem)", bottom: "-15%", zIndex: 9,
    galleryX: "-7px", galleryY: "-2px", galleryScale: 1.02,
  }),
  plant("3b", 3, {
    left: "45%", width: "clamp(4.8rem, 7.2vw, 8.6rem)", bottom: "-6%", zIndex: 27,
    galleryX: "-5px", galleryY: "-5px", galleryScale: 1.03,
    depth: "middle", maxSwayDeg: 3.9, forewordBlur: "2.3px", galleryBlur: "2.9px",
  }),
  plant("6", 6, {
    left: "50%", width: "clamp(6rem, 9vw, 10.8rem)", bottom: "-28%", zIndex: 44,
    galleryX: "12px", galleryY: "-9px", galleryScale: 1.045,
  }),
  plant("6c", 6, {
    left: "53.5%", width: "clamp(4.8rem, 6.8vw, 8.2rem)", bottom: "-36%", zIndex: 17,
    galleryX: "9px", galleryY: "2px", galleryScale: 1.02,
    depth: "middle", maxSwayDeg: 3.7, forewordBlur: "2.45px", galleryBlur: "3px",
  }),
  plant("10b", 10, {
    left: "56%", width: "clamp(4.8rem, 7vw, 8.4rem)", bottom: "-12%", zIndex: 12,
    galleryX: "8px", galleryY: "2px", galleryScale: 1.012,
  }),
  plant("7", 7, {
    left: "61%", width: "clamp(6.2rem, 9.2vw, 11rem)", bottom: "-31%", zIndex: 45,
    galleryX: "27px", galleryY: "-5px", galleryScale: 1.05,
  }),
  plant("5b", 5, {
    left: "67%", width: "clamp(6rem, 10vw, 12rem)", bottom: "-22%", zIndex: 7,
    galleryX: "13px", galleryY: "3px", galleryScale: 1.016,
    depth: "far", maxSwayDeg: 2.1, forewordBlur: "1.15px", galleryBlur: "1.45px",
  }),
  plant("3c", 3, {
    left: "69.5%", width: "clamp(4.4rem, 6.4vw, 7.6rem)", bottom: "-21%", zIndex: 12,
    galleryX: "15px", galleryY: "2px", galleryScale: 1.016,
    depth: "far", maxSwayDeg: 2.3, forewordBlur: "1.2px", galleryBlur: "1.5px",
  }),
  plant("8", 8, {
    left: "72%", width: "clamp(5.6rem, 8vw, 9.6rem)", bottom: "-17%", zIndex: 14,
    galleryX: "12px", galleryY: "3px", galleryScale: 1.014,
  }),
  plant("1b", 1, {
    left: "77%", width: "clamp(8rem, 13vw, 15.5rem)", bottom: "-35%", zIndex: 20,
    galleryX: "28px", galleryY: "-3px", galleryScale: 1.035,
    depth: "middle", maxSwayDeg: 3.8, forewordBlur: "2.6px", galleryBlur: "3.3px",
  }),
  plant("9", 9, {
    left: "82%", width: "clamp(5.6rem, 8.8vw, 10.4rem)", bottom: "-12%", zIndex: 16,
    galleryX: "24px", galleryY: "-3px", galleryScale: 1.025,
  }),
  plant("6b", 6, {
    left: "87%", width: "clamp(5.2rem, 7.6vw, 9rem)", bottom: "-22%", zIndex: 25,
    galleryX: "26px", galleryY: "-5px", galleryScale: 1.03,
    depth: "middle", maxSwayDeg: 4.1, forewordBlur: "2.5px", galleryBlur: "3.1px",
  }),
  plant("10c", 10, {
    left: "89.5%", width: "clamp(4.5rem, 6.5vw, 7.8rem)", bottom: "-25%", zIndex: 9,
    galleryX: "29px", galleryY: "3px", galleryScale: 1.014,
    depth: "far", maxSwayDeg: 2, forewordBlur: "1.05px", galleryBlur: "1.35px",
  }),
  plant("10", 10, {
    left: "92%", width: "clamp(5.6rem, 8vw, 9.6rem)", bottom: "-18%", zIndex: 11,
    galleryX: "32px", galleryY: "4px", galleryScale: 1.012,
  }),
  plant("9b", 9, {
    left: "97%", width: "clamp(4.8rem, 7vw, 8.4rem)", bottom: "-10%", zIndex: 8,
    galleryX: "38px", galleryY: "2px", galleryScale: 1.015,
    depth: "far", maxSwayDeg: 2.1, forewordBlur: "1.1px", galleryBlur: "1.35px",
  }),
];
