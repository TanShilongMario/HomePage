# Sketch Controls

Hand-drawn reusable UI controls with stable per-instance randomness.

## SketchButton

```tsx
import { SketchButton } from "@/components/sketch";

<SketchButton size="md" onClick={...}>
  Take the ticket
</SketchButton>
```

### Props

| Prop | Type | Default | 说明 |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 尺寸变体 |
| `seed` | `string` | `useId()` | 固定随机种子，同 seed 外观一致 |
| `randomize` | `boolean` | `true` | 是否启用手绘抖动 |

每个按钮实例会稳定随机：整体旋转、hover/active 角度、边框 inset、边框缩放、文字微 skew。

## SketchLink

与按钮同款边框，用于外链或站内跳转：

```tsx
import { SketchLink } from "@/components/sketch";

<SketchLink href="/about" size="sm">About</SketchLink>
```

## 文件

- `SketchButton.tsx` — 按钮控件
- `SketchLink.tsx` — 链接控件
- `SketchButtonFrame.tsx` — SVG 边框
- `sketchButtonFramePath.ts` — 边框 path 常量
- `sketchButtonVariant.ts` — 随机变体生成
