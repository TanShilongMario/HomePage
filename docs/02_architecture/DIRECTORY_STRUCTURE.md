# Directory Structure — Creative Exhibition Homepage

> 当前为**规划目录**，仅含说明性 README / `.gitkeep`，不含实现代码。  
> 实现阶段按页填充。

---

## 根目录一览

```
MY Home Page/
├── README.md                          # 项目总览与本地开发入口（待脚手架阶段补充）
├── package.json                       # [待创建] 依赖与脚本
├── next.config.ts                     # [待创建] Next 配置
├── tsconfig.json                      # [待创建]
├── .gitignore                         # [待创建]
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
├── layout/
│   ├── ExhibitShell.tsx    # 展区通用外壳（标题、回票、下一区）
│   └── PageTransition.tsx  # 路由转场
├── ticket/
│   ├── TicketNav.tsx       # 票面导航
│   ├── StampSlot.tsx       # 章槽位
│   └── StampAnimation.tsx  # 盖章动效
├── hero/
│   ├── HeroWelcome.tsx
│   ├── TakeTicketButton.tsx
│   └── HandTicketAnimation.tsx  # 手 SVG + 出票
├── sketch/                 # 手绘风基础控件（按你的规范逐页添加）
│   ├── SketchButton.tsx
│   ├── SketchFrame.tsx
│   └── SketchTitle.tsx
├── about/
├── art/
│   ├── GalleryGrid.tsx
│   └── GalleryLightbox.tsx
├── vibe/
│   └── VibeProjectCard.tsx
├── articles/
│   ├── ArticleList.tsx
│   └── ArticleCard.tsx
└── ending/
    └── StampRecap.tsx
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
