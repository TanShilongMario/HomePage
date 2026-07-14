# Creative Exhibition Homepage

个人创意展览式主页 — 以「参观展览」为隐喻的手绘风多页面站点。

## 当前阶段

**Hero 页 MVP 可运行**（V0.1）— 已初始化 Next.js 脚手架，首屏含 Welcome、Take the ticket、手 SVG 出票动画与票面导航占位。

### 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端里显示的地址（默认从 **3001** 起；若被占用会自动尝试 3002–3010）。

指定固定端口：`npm run dev -- -p 3002`（该端口仍被占用时会直接报错，不会递增）

### 开发排障

| 现象 | 处理 |
|---|---|
| HMR 报错、`__webpack_modules__ is not a function` | `npm run dev:clean`，然后硬刷新浏览器 |
| 启动提示 multiple lockfiles | 已在 `next.config.ts` 固定根目录；可忽略或确认父目录 `D:\MyCode\package-lock.json` 非本项目所需 |
| 端口被占用 | 默认自动递增到 3002–3010；或 `npm run dev -- -p 3002` 指定端口 |
| 左下角圆形 **N** | Next.js 开发模式指示器，上线后不会出现 |

项目根目录为 **`MY_Home_Page`**（`D:\MyCode\MY_Home_Page`），请勿使用带空格的旧路径。

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
