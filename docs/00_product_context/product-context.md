# Product Context — Creative Exhibition Homepage

> 个人创意展览式主页的产品上下文。PRD 与架构文档均引用本文件。

---

## 1. 产品 Identity

| 字段 | 内容 |
|---|---|
| 产品名称 | Creative Exhibition Homepage（个人创意世界主页） |
| 产品代号 | CEH |
| 一句话定位 | 以「参观展览」为隐喻的手绘风、多页面互动个人主页 |
| 目标用户 | 访客（潜在合作者、读者、艺术/技术社区）；站点所有者（本人） |
| 硬件/形态 | Web 端优先；桌面与移动端浏览器；部署于 Vercel + 自定义域名 |

---

## 2. 术语表

| 术语 | 定义 | 禁用别名 |
|---|---|---|
| 展区（Exhibit） | 站点内一个独立主题页面，类比美术馆中的一个展厅 | 页面、Tab |
| 票（Ticket） | 开屏交互后出现的导航载体，承载各展区入口与参观进度 | 菜单、Nav |
| 盖章（Stamp） | 访客完成某展区浏览后获得的视觉标记，记录在票或护照上 | Badge、成就 |
| 扉页（Foreword） | About Me 入口页，展览正式开始前的「前言」 | 关于页 |
| Vibe Coding | 展示 vibe coding 风格作品与外链的展区 | 项目页 |
| 开屏 Hero | 首屏欢迎页，文案「Welcome to my creative world」 | Landing |
| Ending | 展览结束页，收尾与告别 | Footer 页 |

---

## 3. 全局约束

| 约束 | 说明 |
|---|---|
| 部署 | GitHub 仓库 + Vercel 自动部署；支持绑定用户自有域名 |
| 美术风格 | 可爱手绘风：粗糙手写字体、歪歪扭扭按钮、纸质感；具体控件由设计稿驱动 |
| 技术候选 | Canvas 2D（手绘 UI/动画）、Three.js（可选 3D 场景）；具体用法按页决策 |
| 内容节奏 | **逐页迭代**：先后文档与结构，再按页实现；美术资源由用户提供 |
| 性能 | 首屏可感知加载 < 3s（P90，良好网络）；WebGL 场景需降级策略 |
| 无障碍 | 核心导航与内容需键盘可达；动画尊重 `prefers-reduced-motion` |
| 隐私 | 无登录 MVP；埋点可选且需告知（若启用） |

---

## 4. 架构要点

- **前端 SPA/MPA 混合**：展览动线偏 SPA 体验（转场连贯），文章详情可 SSG/SSR 利于 SEO。
- **推荐栈**：Next.js（App Router）+ TypeScript + Vercel；内容层 MDX 管理文章。
- **渲染分层**：DOM（内容与 SEO）+ Canvas 2D（手绘控件/票据动画）+ Three.js（按需、独立 Scene）。
- **状态**：参观进度（已访问展区、盖章）存 `localStorage`；无后端 MVP。
- **资源**：SVG 手绘元素、自定义字体、纸纹/印章纹理放 `public/assets`。

---

## 5. 体验原则

- **展览叙事**：用户是「观众」，不是「点击菜单的用户」；动线有起承转合（Hero → 取票 → 参观 → Ending）。
- **触感优先**：按钮、边框、文字都应有「手绘不完美」的温度，避免默认 UI 组件库观感。
- **渐进披露**：票/导航在 Hero 交互后才揭示，而非一上来展示传统导航栏。
- **可收集感**：每看完一个展区获得盖章，强化逛完整个展览的动机。
- **内容为王**：AIGC 艺术、Vibe 作品、文章是各展区核心，动效服务于内容而非喧宾夺主。

---

## 6. 治理文档索引

| 文档 | 路径 |
|---|---|
| 产品 PRD | `docs/01_prd/IN-HOME-001_creative-exhibition-homepage.md` |
| 技术架构 | `docs/02_architecture/ARCHITECTURE.md` |
| 目录说明 | `docs/02_architecture/DIRECTORY_STRUCTURE.md` |

---

## 7. 展区与内容（功能相关上下文）

| 展区 | 路由（建议） | 核心内容 | 备注 |
|---|---|---|---|
| Hero 开屏 | `/` | Welcome 文案、「Take the ticket」CTA、取票动画 | 站点入口 |
| 票/导航 | `/ticket` 或 Hero 内嵌 | 各展区入口、盖章展示 | 可与 Hero 同页过渡 |
| 扉页 About | `/about` | 自我介绍、自媒体链接（可选） | 展览前言 |
| AIGC 艺术 | `/art` | AIGC 作品画廊 | 视觉重点展区 |
| Vibe Coding | `/vibe` | Vibe 作品列表与外链 | 技术创意展示 |
| 文章列表 | `/articles` | 文章索引、自媒体入口 | 可与扉页互链 |
| 文章详情 | `/articles/[slug]` | 单篇正文 | MDX/SSG |
| Ending | `/ending` | 结束语、回顾、再访入口 | 展览收尾 |

---

## 8. 参考与竞品

| 类型 | 参考方向 |
|---|---|
| 叙事结构 | 单页展览式个人站、Awwwards 叙事类 Portfolio |
| 视觉 | 手绘/撕纸/邮票/博物馆导览册 |
| 交互 | 取票、盖章、护照式进度（具体视觉待设计稿） |

---

## 9. 已知风险

| 风险 | 缓解 |
|---|---|
| Canvas/WebGL 移动端性能 | 按页启用；提供静态降级层 |
| 手绘资源工作量大 | 逐页交付 SVG/PNG；组件参数化复用 |
| 展览动线过长导致跳出 | 票上进度可见；Ending 前可短链回 Hero |
| 文章 SEO | 文章路由 SSR/SSG，与 Canvas 装饰层分离 |
