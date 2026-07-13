/** 原图 992×1325 下的眼睛布局参数 */
export const PENGUIN_ART = {
  width: 992,
  height: 1325,
  eyeSize: 80,
  pupilSize: 22,
  eyes: [
    { id: "left" as const, x: 356, y: 261 },
    { id: "right" as const, x: 578, y: 261 },
  ],
};

const EYE_RADIUS = PENGUIN_ART.eyeSize / 2;
const PUPIL_RADIUS = PENGUIN_ART.pupilSize / 2;
const MAX_PUPIL_OFFSET = EYE_RADIUS - PUPIL_RADIUS;

export interface PupilOffset {
  x: number;
  y: number;
}

export function getEyeCenter(eyeX: number, eyeY: number, scale: number) {
  return {
    x: (eyeX + EYE_RADIUS) * scale,
    y: (eyeY + EYE_RADIUS) * scale,
  };
}

export function getPupilOffset(
  mouseLocalX: number,
  mouseLocalY: number,
  eyeCenterX: number,
  eyeCenterY: number,
  scale: number,
): PupilOffset {
  const dx = mouseLocalX - eyeCenterX;
  const dy = mouseLocalY - eyeCenterY;
  const dist = Math.hypot(dx, dy);
  const maxOffset = MAX_PUPIL_OFFSET * scale;

  if (dist === 0 || dist <= maxOffset) {
    return { x: dx, y: dy };
  }

  const ratio = maxOffset / dist;
  return { x: dx * ratio, y: dy * ratio };
}
