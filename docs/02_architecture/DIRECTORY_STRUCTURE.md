# Directory Structure — Creative Exhibition Homepage

> 根目录 **`MY_Home_Page`**（`D:\MyCode\MY_Home_Page`）。  
> Hero 页 MVP 已实现；其余目录多为规划占位，按页迭代填充。

---

## 根目录一览

```
MY_Home_Page/
├── README.md                          # 项目总览与本地开发入口
├── package.json                       # 依赖与脚本
├── package-lock.json
├── next.config.ts                     # Next 配置（固定 workspace root）
├── tsconfig.json
├── .gitignore
├── scripts/
│   ├── clean-next.mjs                 # 清理 .next 缓存（dev:clean / clean）
│   └── dev.mjs                        # 开发服务器（3001 起自动递增端口）
├── vercel.json                        # [可选] Vercel 重定向/头
│
├── docs/                              # 文档（已建）
│   ├── 00_product_context/
│   ├── 01_prd/
│   └── 02_architecture/
│
├── public/                            # 静态资源
│   └── assets/
│       ├── fonts/                     # 手写字体 woff2
│       ├── textures/                  # 纸纹、票根、印章
│       ├── svg/                       # 独立 SVG 资源
│       ├── gallery/                   # AIGC 作品图
│       └── vibe/                      # Vibe 缩略图
│
├── content/                           # 内容源（构建时读取）
│   ├── articles/                      # *.mdx 文章
│   ├── gallery/                       # manifest.json + 元数据
│   └── vibe/                          # projects.json
│
└── src/
    ├── app/                           # Next.js App Router 页面
    ├── components/                    # UI 组件
    ├── canvas/                        # Canvas 2D 层
    ├── three/                         # Three.js 场景
    ├── lib/                           # 领域逻辑与工具
    ├── hooks/                         # React hooks
    ├── styles/                        # 全局样式与设计令牌
    └── types/                         # 共享 TypeScript 类型
```

---

## `src/app/` — 路由

```
src/app/
├── layout.tsx              # 根布局：字体、纸纹背景、进度 Provider
├── page.tsx                # Hero 开屏
├── about/
│   └── page.tsx            # 扉页
├── art/
│   └── page.tsx            # AIGC 艺术
├── vibe/
│   └── page.tsx            # Vibe Coding
├── articles/
│   ├── page.tsx            # 文章列表
│   └── [slug]/
│       └── page.tsx        # 文章详情
├── ending/
│   └── page.tsx            # Ending
├── not-found.tsx           # 手绘风 404
└── globals.css             # 全局样式入口
```

---

## `src/components/` — 组件

```
src/components/
├── README.md
├── hero/                              # [已实现] Hero 开屏
│   ├── HeroSection.tsx                # 主交互：取票 → Entry → 扉页转场
│   ├── CreativeSpotlight.tsx          # Creative 金属探照灯
│   ├── PenguinSpotlight.tsx           # 企鹅探照灯（保留，Hero 暂未启用）
│   └── *.module.css
├── sketch/                            # [已实现] 手绘风基础控件
│   ├── SketchButton.tsx
│   ├── SketchButtonFrame.tsx
│   ├── SketchLink.tsx
│   ├── SketchThoughtBubble.tsx
│   ├── SketchWobbleLine.tsx
│   └── *.module.css
├── wander/                            # [已实现] 随机行走小人
│   ├── WanderingCharacter.tsx
│   ├── useWanderingCharacter.ts
│   ├── characters.ts
│   └── *.module.css
├── layout/                            # [规划]
│   ├── ExhibitShell.tsx
│   └── PageTransition.tsx
├── ticket/                            # [规划]
├── about/                             # [规划]
├── art/                               # [规划]
├── vibe/                              # [规划]
├── articles/                          # [规划]
└── ending/                            # [规划]
```

---

## `src/canvas/` — Canvas 2D

```
src/canvas/
├── README.md
├── core/
│   ├── CanvasLayer.tsx     # 挂载点：resize、dpr、raf
│   └── useCanvasLoop.ts
├── drawables/              # 可绘制单元（路径、票据、章）
│   ├── HandDrawable.ts
│   └── TicketDrawable.ts
└── zones/                  # 页面专属 canvas 逻辑
    ├── hero/
    └── art/
```

---

## `src/three/` — Three.js（按需）

```
src/three/
├── README.md
├── core/
│   ├── ThreeStage.tsx      # R3F Canvas  wrapper
│   └── useWebGLSupport.ts
└── scenes/
    ├── HeroParticles.tsx   # [可选]
    ├── ArtWall.tsx         # [可选]
    └── EndingSpotlight.tsx # [可选]
```

---

## `src/lib/` — 领域与工具

```
src/lib/
├── exhibition/
│   ├── zones.ts            # 展区注册表与顺序
│   ├── stamps.ts           # 章规则
│   ├── progress.ts         # localStorage 读写
│   └── storyline.ts        # 动线辅助（下一展区）
├── content/
│   ├── loadArticles.ts
│   ├── loadGallery.ts
│   └── loadVibeProjects.ts
├── motion/
│   └── easings.ts
└── analytics/
    └── track.ts            # 埋点占位
```

---

## `src/hooks/`

```
src/hooks/
├── useExhibitionProgress.ts
├── useStampTrigger.ts
└── usePrefersReducedMotion.ts
```

---

## `src/styles/`

```
src/styles/
├── tokens.css              # 设计令牌 CSS Variables
├── typography.css          # 手写/正文字体栈
└── textures.css            # 纸纹 background 工具类
```

---

## `src/types/`

```
src/types/
├── exhibition.ts           # ZoneId, Progress, StampRule
├── content.ts              # Article, GalleryItem, VibeProject
└── canvas.ts
```

---

## `content/` 示例（占位）

```
content/
├── articles/
│   └── .gitkeep            # 首篇样例 MDX 实现阶段添加
├── gallery/
│   └── manifest.json       # [待创建] 作品清单
└── vibe/
    └── projects.json       # [待创建] 项目清单
```

---

## 文档与资源工作流

| 阶段 | 你提供 | 落入目录 |
|---|---|---|
| 控件规范 | 按钮/手/票绘制说明或 SVG | `src/components/sketch/`、`src/canvas/drawables/` |
| 视觉稿 | Figma/PNG/PDF | `docs/03_design/`（建议后续建） |
| 字体 | woff2 | `public/assets/fonts/` |
| 纹理 | 纸纹、票图 | `public/assets/textures/` |
| 作品 | 图片 + 文案 | `public/assets/gallery/` + `content/gallery/` |
| 文章 | MDX | `content/articles/` |

---

## 建议后续新增

```
docs/
└── 03_design/              # 设计稿、控件规范、色板
    ├── controls/           # 逐控件绘制说明
    └── mockups/            # 页面 mockup
```

---

## 本地开发稳定性

`D:\MyCode` 下存在父级 `package-lock.json`（空壳 lockfile），Next.js 15 会向上扫描 lockfile 推断 workspace root，导致：

- 启动时出现 *multiple lockfiles* 警告
- webpack / Turbopack HMR 偶发 `__webpack_modules__ is not a function`
- React Client Manifest 找不到客户端组件

**已采取的防护**（`next.config.ts`）：

| 配置项 | 作用 |
|---|---|
| `outputFileTracingRoot` | 固定 webpack 构建与文件追踪根目录 |
| `turbopack.root` | 固定 Turbopack 根目录（与上项保持一致） |
| `reactStrictMode` | 开发期尽早暴露副作用问题 |

**日常排障**：

```bash
npm run dev          # 正常开发（3001 起自动递增可用端口）
npm run dev:clean    # 清 .next 缓存后启动（HMR 异常时优先试这个）
npm run clean        # 仅清理 .next
```

若仍异常：停掉 dev → `npm run dev:clean` → 浏览器硬刷新（Ctrl+Shift+R）。
