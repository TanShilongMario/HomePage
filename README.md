# Creative Exhibition Homepage

个人创意展览式主页 — 以「参观展览」为隐喻的手绘风多页面站点。

## 当前阶段

**Hero 页 MVP 可运行**（V0.1）— 已初始化 Next.js 脚手架，首屏含 Welcome、Take the ticket、手 SVG 出票动画与票面导航占位。

### 本地运行

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3001](http://localhost:3001)（默认端口 3001，避免与 3000 冲突）。

临时指定其他端口：`npm run dev -- -p 3002`

### 文档

| 文档 | 说明 |
|---|---|
| [产品上下文](docs/00_product_context/product-context.md) | 术语、约束、展区定义 |
| [PRD](docs/01_prd/IN-HOME-001_creative-exhibition-homepage.md) | 需求、动线、MVP 范围 |
| [技术架构](docs/02_architecture/ARCHITECTURE.md) | 选型、模块、状态设计 |
| [目录结构](docs/02_architecture/DIRECTORY_STRUCTURE.md) | 工程组织规划 |

## 展览动线（规划）

```
Hero 开屏 → Take the ticket → 票（导航）→ About → Art → Vibe → Articles → Ending
```

## 技术栈（规划）

- Next.js + TypeScript + Vercel
- Canvas 2D / SVG（手绘交互）
- Three.js（按需）
- MDX 文章

## 部署（规划）

GitHub 仓库 → Vercel 自动构建 → 绑定自定义域名

---

实现顺序：Hero + Ticket → 各展区逐页 → Ending → 部署调优。
