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

## 维护 AIGC Gallery

第三页的作品清单集中维护在：

```text
src/components/gallery/artworks.ts
src/components/gallery/importedArtworks.ts
```

`artworks.ts` 保存手工维护的核心作品并汇总最终播放列表；`importedArtworks.ts` 保存从 Prompt Fill 个人作品库筛选、展开变量后导入的作品。画廊同时支持放在仓库内的本地图片和 `https://` 图床图片。画框、说明浮窗、循环切换和沉浸查看会自动读取最终列表，新增作品时不需要修改画廊组件。

### 增加本地图片

1. 把图片放进 `public/assets/AIGCArtwork/`。
2. 打开 `src/components/gallery/artworks.ts`。
3. 在 `AIGC_ARTWORKS` 数组末尾增加一条作品数据。
4. `src` 从 `/assets/AIGCArtwork/` 开始填写，不要包含 `public`。

```ts
{
  id: "unique-artwork-id",
  title: "Artwork title",
  image: {
    src: "/assets/AIGCArtwork/My_New_Artwork.png",
    alt: "Describe what can be seen in this artwork",
    width: 1232,
    height: 928,
  },
  description: {
    prompt: "生成这张作品时使用的提示词",
    concept: "作品的创作思路、构图选择或实验目标",
  },
  tags: ["Architecture", "Surreal"],
  year: 2026,
  tools: ["Midjourney", "Photoshop"],
  series: "Series name",
  featured: false,
},
```

`width` 和 `height` 建议填写图片的原始像素尺寸，有助于浏览器预留正确比例；画廊会自动让横图和竖图在正方形衬底中完整居中，不会裁切。

### 增加图床图片

图床图片的数据结构相同，只需把 `src` 换成完整的 HTTPS 地址：

```ts
image: {
  src: "https://example.com/my-artwork.png",
  alt: "Describe what can be seen in this artwork",
},
```

远程图片可以不填写 `width` 和 `height`。重要作品建议使用可靠的长期图床或放回本地，避免图床防盗链、链接过期或服务不可用导致作品无法显示。

### 图片加载策略（约 50 张作品）

画廊允许每件作品只维护一个 `image.src`，不强制准备高清、低清两个版本。为了避免进入展馆时同时请求全部图片，组件采用邻近加载策略：

1. 进入展馆时只请求当前作品。
2. 当前作品显示成功后，后台依次预取下一张和上一张。
3. 后台预取最多同时进行一个请求；快速切换作品时，尚未开始的旧任务会被新的相邻任务替换。
4. 相同 URL 在当前会话中会去重；预取失败后有一分钟冷却时间，不会自动连续重试。
5. 当前图片失败时显示手动重试入口，不进行可能加重图床限流的无限自动重试。

这套策略限制的是请求并发，而不是作品总数。作品文字数据会一次加载，但图片只随浏览位置逐步加载。建议使用支持 CDN 缓存、HTTPS 和稳定外链的对象存储或正式图床，并避免给同一张图片 URL 添加每次都变化的查询参数，否则浏览器和 CDN 无法有效复用缓存。

### 字段规则

| 字段 | 必填 | 用途 |
|---|---:|---|
| `id` | 是 | 作品唯一标识；不可与其他作品重复 |
| `title` | 是 | 说明浮窗和无障碍标签中的作品名称 |
| `image.src` | 是 | 本地路径或完整 HTTPS 图床地址 |
| `image.alt` | 是 | 对画面内容的简短描述，不要写文件名 |
| `image.width/height` | 否 | 图片原始像素尺寸，本地图片建议填写 |
| `description.prompt` | 否 | 提示词或生成条件 |
| `description.concept` | 否 | 创作思路、过程与作品背景 |
| `tags` | 否 | 主题、媒介或视觉类型标签 |
| `year` | 否 | 创作年份 |
| `tools` | 否 | 使用的生成工具或后期工具 |
| `series` | 否 | 所属作品系列 |
| `featured` | 否 | 为未来的精选筛选预留，目前不改变排序 |
| `author` | 否 | 作品作者；外部作品库导入时建议保留 |
| `sourceTemplateId` | 否 | Prompt Fill 原模板 ID，方便追溯和去重 |

数组中的先后顺序就是画廊的播放顺序。左右按钮采用循环逻辑，因此最后一张之后会回到第一张。保存数据或替换同名图片后，开发服务会自动更新；通常刷新浏览器即可，不需要重启服务。

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
