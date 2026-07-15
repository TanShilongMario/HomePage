export interface WanderCharacterDefinition {
  id: string;
  frames: readonly string[];
  /** 行走帧序列，默认 1-2-3-4-3-2-1 → [0,1,2,3,2,1] */
  walkCycle?: readonly number[];
  nativeWidth: number;
  nativeHeight: number;
  /** SVG 底部留白占 nativeHeight 的比例，用于脚底贴齐地平线 */
  footInsetRatio?: number;
}

export interface WanderBounds {
  width: number;
  height: number;
}

export interface WanderRuntimeOptions {
  /** 行走速度 px/s */
  speed?: number;
  /** 切换行走帧间隔 ms */
  frameIntervalMs?: number;
  /** 停留最短 ms */
  idleMinMs?: number;
  /** 停留最长 ms */
  idleMaxMs?: number;
  /** 每次决策停留的概率 */
  idleChance?: number;
  /** 单次行走最短距离 px */
  minWalkPx?: number;
  /** 单次行走最短距离占可活动宽度的比例 */
  minWalkFrac?: number;
  /** 单次行走最远距离占可活动宽度的比例 */
  maxWalkFrac?: number;
  /** 沿用上一行走方向的概率，减少左右抖动 */
  continueDirectionBias?: number;
  /** 初始水平位置占可活动宽度的比例（0–1） */
  initialXFrac?: number;
}

export const DEFAULT_WALK_CYCLE = [0, 1, 2, 3, 2, 1] as const;
