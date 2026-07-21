import type { AIGCArtwork } from "./artworks";

/**
 * 从 Prompt Fill 作品库筛选出的个人作品。
 * 仅收录作者为 tanshilong 的条目，并已将模板变量按 selections 展开。
 */
export const IMPORTED_AIGC_ARTWORKS: readonly AIGCArtwork[] = [
  {
    "id": "fashion",
    "sourceTemplateId": "tpl_fashion",
    "title": "时尚情绪板插画",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2025/12/08/4d9f92ccb4113fdd.jpg",
      "alt": "时尚情绪板插画 AIGC artwork"
    },
    "description": {
      "prompt": "### Fashion Illustration Moodboard (时尚插画情绪板)\n一张9:16竖屏的高级时尚插画情绪板，模拟平板扫描效果。\n\n**背景:** 纯手绘的奶油色水彩晕染纸张，带有淡淡的粉色网格。\n**视觉核心:** 数张具有明显白色模切宽边和柔和投影的亮面乙烯基贴纸。\n\n**贴纸内容:**\n- **中央:** 【sticker_core】，光线明亮。\n- **左侧:** 【fashion_deconstruct】。\n- **右下角:** 关键的隐藏层贴纸：一套折叠整齐的内衣，展现细腻纹理。\n- **互动元素:** 一只穿着粉色系、与用户服装呼应的 【toy_companion】 正趴在一个手绘对话框上。\n\n**装饰细节:** 周围装饰着蜡笔质感的 【sticker_decor】 和潦草的中文书法标注OOTD。\n**注意:** 画面中绝无任何人手、笔或物理桌面背景，纯粹的平面艺术插画。",
      "concept": "把服装、材质、配色和人物姿态并置，让设计过程本身成为一张完整的视觉作品。"
    },
    "tags": [
      "人物",
      "创意",
      "卡通"
    ],
    "year": 2025,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "classic-scene",
    "sourceTemplateId": "tpl_classic_scene",
    "title": "经典场景微缩复刻",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2025/12/10/1eac697f5a438542.jpg",
      "alt": "经典场景微缩复刻 AIGC artwork"
    },
    "description": {
      "prompt": "### 经典场景微缩复刻\n\n展示一个精致的、微缩 3D 卡通风格的千与千寻场景，采用清晰的 45° 俯视等轴侧视角（Isometric view）。\n\n**核心构图：** 将主体最经典的形象突出地置于中心。自动搭配比例适宜的关键元素图标、象征性物品、迷人的小角色以及能诠释主体故事的道具。整体布局应当充满趣味且紧凑聚集，宛如一套高端的玩具盲盒套装。\n\n**渲染与材质：** 采用Octane Render 和 Cinema 4D风格进行渲染。建模必须精细、圆润流畅且质感丰富。使用逼真的 PBR 材质：混合用于有机形态的柔和哑光粘土、用于水体/玻璃元素的光泽树脂，以及用于结构组件的光滑 PVC 材质。着重表现具有触感、“看起来手感很好”的纹理细节。\n\n**灯光与氛围：** 采用柔和、逼真的摄影棚布光配合全局光照（Global Illumination）。利用柔和的阴影营造出温暖、舒适且充满魔力的氛围。\n\n**布局：** 保持干净、极简的布局，使用与主体配色相协调的纯色背景。\n\n**文字：** 在顶部中央，使用巨大的、圆润的 3D 字体醒目地展示主体名称，使其轻微悬浮于场景上方。",
      "concept": "用微缩模型重新搭建熟悉的电影记忆，让宏大的叙事变成可以被捧在手中的小世界。"
    },
    "tags": [
      "卡通",
      "创意",
      "游戏"
    ],
    "year": 2025,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "industrial-design",
    "sourceTemplateId": "tpl_industrial_design",
    "title": "设计大师的产品设计",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2025/12/17/7dbe43ae66b1a78c.jpg",
      "alt": "设计大师的产品设计 AIGC artwork"
    },
    "description": {
      "prompt": "### 目标\n设计一个顶级的工业设计产品介绍页，使用极简的宣传页风格；需要深刻理解该设计师的设计理念、设计风格，并将这种设计理解完全融入到设计产品的工业设计与展示页面中\n\n### 内容\n- **设计师：** Jonathan Ive (Jony Ive)\n- **产品：** 无人机\n\n### 画面\n- **设计师介绍：**\n约占整个画面非常少的部分，包括设计师的介绍（极具氛围感的头像）与设计师对于这个产品的设计思路与设计理解，以及设计师的签名。\n- **画面核心内容：**\n占整个画面的80%或更多用于呈现产品本身，一个完全符合设计师自己设计风格与设计方法的顶级产品设计图（一个完整的单张产品效果的呈现），基于工业成品设计成果使用不同的构图。整体配色需要与设计师的风格与产品内容完全相符\n- **构图：**\n最终构图：3:4竖构图 \n整体排版主次分明，规整，极具格调与设计特色",
      "concept": "尝试把设计师的个人语言迁移到陌生产品中，观察风格是否能脱离原作品独立成立。"
    },
    "tags": [
      "产品",
      "创意",
      "图表"
    ],
    "year": 2025,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "raindrop-art",
    "sourceTemplateId": "tpl_raindrop_art",
    "title": "雨滴定格艺术",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2025/12/19/6b6e14845635b168.jpg",
      "alt": "雨滴定格艺术 AIGC artwork"
    },
    "description": {
      "prompt": "### Raindrop Art (雨滴定格艺术)\n\n**核心表现:**\n捕捉了雨滴落入水面的瞬间，雨滴打落在水面上，飞溅的水珠在空中形成一个抽象的 芭蕾舞者。\n\n**艺术视觉:**\n水滴构成的结果相对比较概念化，更遵从水滴溅落形成的动态感，但能从动作或神态中感受到其表达的艺术视觉。画面将雨水与自然交互的微妙之美的定格艺术作品，动感与优雅交融，呈现出诗意的视觉表达。\n\n**环境背景:**\n背景是朦胧的雨景。\n\n**规格:**\n3:4竖构图",
      "concept": "将稍纵即逝的水滴冻结成雕塑，探索摄影瞬间与生成式想象之间的边界。"
    },
    "tags": [
      "摄影",
      "创意"
    ],
    "year": 2025,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "street-self-dialogue",
    "sourceTemplateId": "tpl_street_self_dialogue",
    "title": "街头的自我对话",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2025/12/25/fd3cbc98f5afa970.png",
      "alt": "街头的自我对话 AIGC artwork"
    },
    "description": {
      "prompt": "### 街头的自我“对话”\n\n1. **核心主题与风格：** 一张具有深刻故事性和极佳摄影质感的街头摄影人像作品，捕捉“自我对话”的哲学瞬间。采用自然光影，呈现电影级叙事感和动态模糊艺术效果。\n2. **场景与背景地点：** 纽约摩天大楼群。时间与光影：夕阳余晖。光线聚焦于中心人物。氛围：忙碌、疏离，充满动态与静谧的对比。\n3. **核心人物描述位置与状态：** 位于画面正中央，静止站立，神态若有所思或平静凝视镜头，与周围环境的匆忙形成鲜明对比。着装：黑色修身西装，面部与上传图片高度一致\n4. **周边人群描述（关键叙事元素）身份与着装：** 所有路过行人都是核心人物的“不同自我”，身着代表其社会角色的服装：周围人物面部需要保持与上传图片的高度一致，众多不同着装的“我”在核心人物周围穿梭，周边人物快速移动，产生了较大的动态模糊，周边人物全部有移动产生的残影，极大的动态模糊和视觉残留，与核心人物的静态形成了鲜明对比，周边人物与核心人物都是一样的面孔和人物，不要添加其他无关人物，周边人物需要与核心人物有准确的前后关系。\n5. **摄影技术与构图镜头与景深：** 85mm, f/1.8，偏向与人物特写，较大的景深。核心人物面部和上身清晰锐利，前景和背景（包括动态模糊的人群和街头环境）适度虚化。半身像为主构图：中心构图，核心人物类似半身像，处画面中心较大位置。相机视角稍稍高出人物并微微向下俯视，只有核心人物抬头看向镜头，3:4竖构图。\n6. **画质与色调：** 高分辨率，细腻的胶片质感，轻微颗粒感。色调以暖橙色和深蓝色阴影为主，色彩鲜明但有层次。\n7. **情绪与故事：** 传递出孤独、内省、身份多元性与内心对话的复杂情感。画面在动态中凝结了一个安静的哲学瞬间",
      "concept": "让同一个人的不同状态同时出现在街角，把内心独白转化为可见的空间叙事。"
    },
    "tags": [
      "人物",
      "摄影",
      "创意"
    ],
    "year": 2025,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "wooden-art-xmas",
    "sourceTemplateId": "tpl_wooden_art_xmas",
    "title": "木质层叠艺术",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2025/12/26/3170b82b79a7801e.jpeg",
      "alt": "木质层叠艺术 AIGC artwork"
    },
    "description": {
      "prompt": "### 激光切割木质层叠艺术 (Wood Art & Xmas)\n一件通过激光切割工艺制作的、细节丰富的多层木质艺术品插画。\n\n**视觉风格:**\n- **工艺:** 激光切割木质面板艺术，包含大量精细的层叠结构。\n- **艺术风格:** 抽象艺术，每一层都拥有不同的互补色彩。\n- **主题:** 艺术品主题为 抽象圣诞树，融合了几何图形与丰富的材质纹理，展现大师级水准。\n\n**摄影与呈现:**\n- **风格:** 顶级产品促销摄影风格，强调深度感与木质纤维的真实触感。\n- **美学:** 专业的商业摄影构图，利用光影勾勒出每一层木板的边缘，画面干净且极具格调。\n\n**规格:**\n- **画幅:** 3:4竖构图",
      "concept": "借助层叠木片把平面图案转化为可触摸的景深，让数字图像保留手工制作的温度。"
    },
    "tags": [
      "产品",
      "创意",
      "摄影"
    ],
    "year": 2025,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "character-sheet-art",
    "sourceTemplateId": "tpl_character_sheet_art",
    "title": "角色设定稿",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2026/01/04/d530d1e38098944e.png",
      "alt": "角色设定稿 AIGC artwork"
    },
    "description": {
      "prompt": "### 角色设定稿 (Character Sheet)\n**核心内容:** 角色设定稿，基于 创作一个原创人物。\n\n**构图:** 多角度视角 (Multiple angles)，丰富的表情变化 (Expressive facial variations)。\n\n**媒介:** 毛笔。\n\n**背景:** 极简纯色背景。\n\n**风格:** 手绘漫画风格，线条利落 (Sharp linework)。\n\n**色彩:** 柔和淡彩色 (Soft pastel color palette)，高对比度 (High contrast)。",
      "concept": "不只生成一张漂亮人物，而是测试同一角色在多视角、动作与情绪中的一致性，把单张图推进为可继续发展的设定系统。"
    },
    "tags": [
      "人物",
      "创意"
    ],
    "year": 2026,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "underwater-caustics",
    "sourceTemplateId": "tpl_underwater_caustics",
    "title": "水下焦散人像摄影",
    "image": {
      "src": "https://s41.ax1x.com/2026/01/05/pZdAL9K.jpg",
      "alt": "水下焦散人像摄影 AIGC artwork"
    },
    "description": {
      "prompt": "### 创意水下摄影：焦散之美 (Underwater Caustics)\n\n**主体设定:**\n使用上传图片中的人物作为女性，严格保持面部特征的一致性。\n人物穿着一件白色衬衫与内衣，由于在水下浸湿，衣物呈现出若隐若现的半透明质感。\n\n**动作与场景:**\n人物沉浸在深青色透明水下的透明水下，姿态舒展，微微抬头仰望上方。\n身体周围环绕着许多许多银色小鱼，营造出自然的生态律动感。\n\n**光影艺术 (Caustics):**\n核心视觉效果为强烈的**焦散光影（Caustics）**：阳光穿过起伏的水面，在人物的面部和衣服上投射出波动的金色光纹。\n光线在水中形成明显的**丁达尔效应 (Tyndall Effect)**，光柱从水面直插水底，增强空间深度。\n\n**氛围与画质:**\n- **氛围:** 梦幻、超现实、静谧、电影质感。\n- **画质:** 照片级真实，8K分辨率，极高细节，捕捉每一处水花和气泡。\n\n**规格:**\n- **画幅:** 3:4竖构图",
      "concept": "用水面折射替代传统影棚布光，让光本身成为人物造型的一部分。"
    },
    "tags": [
      "人物",
      "摄影",
      "创意"
    ],
    "year": 2026,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "chinese-new-year-poster",
    "sourceTemplateId": "tpl_chinese_new_year_poster",
    "title": "中国新年时尚海报",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2026/01/09/83205df357ad8c1c.jpg",
      "alt": "中国新年时尚海报 AIGC artwork"
    },
    "description": {
      "prompt": "### 中国新年时尚海报\n\n一张现代时尚感的中国新年海报，融合高端时尚摄影与传统节日元素，极具视觉冲击力和艺术美感。\n\n**核心主体：**\n创作一个原创人物，面部和颈部极致特写，文艺青年骑着白马优雅而富有力量地冲向屏幕，呈现出即将跃出取景框的瞬间动态。这是一位普通的中国人，穿着精心设计的古典红色汉服，色彩为暗红色，面部表情自然亲切而富有生活气息，妆容精致淡雅，发型柔美自然，颈部线条优美修长。人物嘴里轻轻叼着一个精致的中国红包，增添节日趣味和喜庆氛围。\n\n**构图与摄影：**\n- 超近距离的面部和颈部特写，人物几乎填满整个画面\n- 极浅景深让背景柔化模糊，形成美丽的光斑效果\n- 精准控制的动态模糊，马尾和发丝轻柔飘动，展现优雅动感\n- 人物和马仿佛要跃出取景框，突破画面边界，带来强烈的视觉冲击\n- 高端时尚摄影的布光技巧，完美轮廓光勾勒人物轮廓和颈部线条\n- 时尚杂志级别的精修质感，皮肤光滑细腻，五官立体精致，颈部优美\n- 荷兰角构图，增强现代时尚感和动态张力\n\n**细节刻画：**\n- 面部细节：完美妆容，皮肤细腻光滑，眼神明亮有神，嘴角的红包增添俏皮感\n- 红包细节：精致的中国红包，金色吉祥图案，轻微反光质感\n- 服装质感：高级面料质感，精致工艺细节，剪裁合体\n- 马匹细节：干净整洁，皮毛健康光泽，鬃毛柔顺飘逸\n- 光影效果：高级时尚布光，层次丰富，色彩精致饱满，红包上的金色图案闪烁\n\n**背景与氛围：**\n- 真实感的广袤草原背景，极具纵深感和空间感\n- 天空呈现壮丽的红色夕阳，晚霞染红整个天际，营造浪漫氛围\n- 夕阳的暖色调光辉洒在人物和马匹身上，形成金色轮廓光\n- 背景虚化处理，草原与红色天空的交界线柔和自然\n- 整体色调为温暖优雅的橙红色调，营造时尚而喜庆的视觉冲击力\n\n**摄影风格：**\n- 极具艺术吸引力的顶级时尚摄影，富士胶片魅力\n- Fujicolor Velvia风格，色彩浓郁饱满，对比度适中偏柔\n- 轻微的胶片颗粒质感，增添高端复古艺术气息\n- 时尚杂志级景深控制，主体清晰突出，背景柔美虚化\n- 光线层次丰富，暗部和亮部细节保留完整\n- 具有强烈的时尚美感和视觉吸引力\n\n**摄影规格：**\n2:3竖构图\n高分辨率，时尚海报级品质，Fuji胶片摄影风格",
      "concept": "把传统节庆符号放进时尚编辑语境，寻找年味与当代视觉之间更克制的平衡。"
    },
    "tags": [
      "创意",
      "人物",
      "时尚",
      "节日"
    ],
    "year": 2026,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "interior-rendering",
    "sourceTemplateId": "tpl_interior_rendering",
    "title": "室内设计真实渲染",
    "image": {
      "src": "https://s3.bmp.ovh/imgs/2026/01/18/df7ed03d64db5339.jpg",
      "alt": "室内设计真实渲染 AIGC artwork"
    },
    "description": {
      "prompt": "### 室内设计真实渲染\n\n保持原图视角和墙体结构，生成室内 客厅 真实渲染图。进行合理的室内家具布置与材质搭配，为室内天花板、墙面、地板分别赋予材质，整体呈现 现代轻奢风格。房间内外均进行真实感渲染。\n\n包括 沙发、地毯、茶几、电视，材质质感逼真，自然光线。整体画面呈现出专业建筑摄影的光线效果，具备 4K超高清分辨率 的图像细节。\n\n**材质细节**:\n- 天花板：白色乳胶漆平顶\n- 墙面：白色乳胶漆墙面\n- 地板：浅灰色大理石地砖",
      "concept": "测试生成式图像是否真正理解空间、材质和光线，而不仅是在拼接漂亮的室内元素。"
    },
    "tags": [
      "建筑",
      "创意"
    ],
    "year": 2026,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "sketch-reality-comparison",
    "sourceTemplateId": "tpl_sketch_reality_comparison",
    "title": "手绘速写与实景对比",
    "image": {
      "src": "https://s3.bmp.ovh/2026/02/06/hbxQtfml.jpg",
      "alt": "手绘速写与实景对比 AIGC artwork"
    },
    "description": {
      "prompt": "### 手绘速写与实景对比\n\n刚刚画完速写，把画纸和实景放在一起拍摄，展示\"看我画得多像\"的效果。\n\n**核心场景：**\n一个人手持刚刚完成的速写作品，画纸旁边就是画中所描绘的真实场景。两者并排同框，形成强烈的视觉对比——左边是真实的建筑或场景，右边是手中的速写画作。画纸内容必须与实景完美对应，展现出高超的绘画技巧和观察力。\n\n**构图布局：**\n- 手绘画作：手持画纸，位于画面一侧（右侧或左侧均可），清晰展示完整的速写作品\n- 真实场景：画纸旁边就是画中描绘的真实场景，两者在同一画面中\n- 速写风格：采用 铅笔素描风格，展现手绘的艺术质感\n- 分离展示：画纸和实景是两个独立的部分，不是融合叠加，而是物理分离的对比展示\n\n**视觉效果：**\n- 手绘部分：清晰的线条、流畅的笔触、完整的构图，展现速写的艺术魅力\n- 实景部分：真实的场景细节、自然的光影、丰富的色彩，与手绘形成呼应\n- 对比效果：观众可以清楚地看到速写与实景的相似度，感受到\"画得真像\"的赞叹\n- 整体氛围：自然真实的拍摄感，带有轻微的颗粒感和胶片质感，像是艺术家完成作品后的纪念照片\n\n**情感表达：**\n这不是融合特效，而是真实的对比展示——艺术家站在自己刚刚描绘的场景前，举起画纸与实景合影，展现对场景的观察和再现能力。",
      "concept": "将手绘和真实场景并置，讨论建筑观察、记忆与再现之间的关系。"
    },
    "tags": [
      "建筑",
      "创意",
      "摄影"
    ],
    "year": 2026,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "skincare-fantasy-ad",
    "sourceTemplateId": "tpl_skincare_fantasy_ad",
    "title": "护肤品奇幻广告",
    "image": {
      "src": "https://s3.bmp.ovh/2026/03/17/IBad9qh6.jpg",
      "alt": "护肤品奇幻广告 AIGC artwork"
    },
    "description": {
      "prompt": "超现实奢华护肤品广告照片，倾斜的巨大精华滴管瓶漂浮在柔软白云上方，瓶身为粉桃色的玻璃材质，瓶内产品呈新鲜凝结水珠状，瓶身在空中微微倾斜。一位时尚年轻女性面容平静自然，坐在瓶盖上，身穿优雅飘逸的连衣裙，裙摆随风轻柔飘动。成熟桃子和桃子切片在空中漂浮。梦幻奇妙的护肤品广告美学，明亮清澈的蓝天背景，玻璃瓶身呈现光泽反射，超写实商业产品摄影，柔和电影级阳光带来清晰高光，使用佳能EOS R5拍摄，50mm f/1.8镜头，粉桃色和天蓝色调色板",
      "concept": "把产品放大到建筑尺度，让商业摄影转化为一个可以进入的超现实场景。"
    },
    "tags": [
      "产品",
      "创意",
      "奇幻"
    ],
    "year": 2026,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "creative-container",
    "sourceTemplateId": "tpl_creative_container",
    "title": "创意容器·微观世界",
    "image": {
      "src": "https://s3.bmp.ovh/2026/04/07/YhFhh6t3.jpg",
      "alt": "创意容器·微观世界 AIGC artwork"
    },
    "description": {
      "prompt": "### 创意容器摄影\n\n透明的750ml玻璃酒瓶，横截面视图，内部展示来自特兰西瓦尼亚葡萄园的微观世界景观，清晨阳光投下柔和阴影，超写实主义，复杂细节，景深效果，真实玻璃反射，自然窗光，工作室背景。",
      "concept": "把玻璃容器看作一块透明的地理剖面，在有限体积中保存一整个微观世界。"
    },
    "tags": [
      "产品",
      "摄影",
      "创意",
      "容器"
    ],
    "year": 2026,
    "tools": [
      "Nano Banana Pro"
    ],
    "author": "tanshilong"
  },
  {
    "id": "gacha-card-set",
    "sourceTemplateId": "tpl_gacha_card_set",
    "title": "国风抽卡套卡设定",
    "image": {
      "src": "https://s3.bmp.ovh/2026/04/19/jZAGAbk8.jpg",
      "alt": "国风抽卡套卡设定 AIGC artwork"
    },
    "description": {
      "prompt": "为「中国古代诗人」设计一套高阶手游抽卡/套卡展示图：新中式华贵风格，深色底、鎏金纹样与书法标题。须包含 SSR / SR / R 三档稀有度展示（小卡阵 + 色条区分），中心为重点卡大画幅立绘；含单卡卡面设计、人物简介、属性或战力数值、主动/被动/觉醒等技能图标与较详细中文说明、羁绊与阵容推荐示例。SSR 稀有卡边框与高光需有镭射/全息/粒子等高级质感。整体排版层级清晰，像真实游戏卡面设定页，简体中文为主。",
      "concept": "用游戏抽卡的视觉系统重新组织传统人物，让文化元素变得连续、可收集且具有角色关系。"
    },
    "tags": [
      "创意",
      "游戏",
      "卡通"
    ],
    "year": 2026,
    "tools": [
      "GPT-image-2"
    ],
    "author": "tanshilong"
  },
  {
    "id": "heritage-building-deconstruction",
    "sourceTemplateId": "tpl_heritage_building_deconstruction",
    "title": "中式地标建筑拆解图",
    "image": {
      "src": "https://s3.bmp.ovh/2026/04/21/JCPtpHEd.jpg",
      "alt": "中式地标建筑拆解图 AIGC artwork"
    },
    "description": {
      "prompt": "生成一个天坛的建筑拆解图，有详细的说明，中式美学风格",
      "concept": "通过爆炸图拆解传统建筑，把隐藏在屋檐、构件和秩序中的空间逻辑显露出来。"
    },
    "tags": [
      "建筑",
      "创意",
      "图表"
    ],
    "year": 2026,
    "tools": [
      "GPT-image-2"
    ],
    "author": "tanshilong"
  },
  {
    "id": "retro-skeuomorphic-icons",
    "sourceTemplateId": "tpl_retro_skeuomorphic_icons",
    "title": "复古拟物化设备图标",
    "image": {
      "src": "https://s3.bmp.ovh/2026/04/21/8H5POly2.jpg",
      "alt": "复古拟物化设备图标 AIGC artwork"
    },
    "description": {
      "prompt": "生成一组复古拟物化风格的老式电子设备图标，图中配有图标名称。",
      "concept": "回到界面仍强调材质和触感的时代，重新思考数字图标是否也能拥有物理记忆。"
    },
    "tags": [
      "创意",
      "产品",
      "摄影"
    ],
    "year": 2026,
    "tools": [
      "GPT-image-2"
    ],
    "author": "tanshilong"
  },
  {
    "id": "apple-event-bento",
    "sourceTemplateId": "tpl_apple_event_bento",
    "title": "苹果风格 BentoCard 发布会单页",
    "image": {
      "src": "https://s3.bmp.ovh/2026/04/24/loHTJhoH.png",
      "alt": "苹果风格 BentoCard 发布会单页 AIGC artwork"
    },
    "description": {
      "prompt": "生成一页苹果风格的发布会图片，以BentoCard形式呈现最新一代的3.5寸软盘的宣传页",
      "concept": "用卡片化的信息结构组织发布会内容，让复杂参数像一套产品系统一样被快速理解。"
    },
    "tags": [
      "产品",
      "创意",
      "图表"
    ],
    "year": 2026,
    "tools": [
      "GPT-image-2"
    ],
    "author": "tanshilong"
  },
  {
    "id": "big-isometric-white-arch",
    "sourceTemplateId": "tpl_big_isometric_white_arch",
    "title": "BIG 风等距建筑白模分析图",
    "image": {
      "src": "https://s3.bmp.ovh/2026/05/06/kyB1kgmL.png",
      "alt": "BIG 风等距建筑白模分析图 AIGC artwork"
    },
    "description": {
      "prompt": "生成一张等距轴测视角的古根海姆博物馆的概念建筑白模渲染图\n使用简化的白模搭配极简化的周边环境，参考BIG事务所经典的分析图表达风格\n使用AO效果和细线轮廓描边\n整体风格清新自然，无任何文字\n使用饱和度较低的色彩为周边环境填色，如道路浅灰，植物浅绿，建筑保持白色\n画幅比例：3:4竖构图。",
      "concept": "用等距白模消除材质干扰，把复杂建筑还原为体量、路径和概念推演。"
    },
    "tags": [
      "建筑",
      "图表",
      "创意"
    ],
    "year": 2026,
    "tools": [
      "GPT-image-2"
    ],
    "author": "tanshilong"
  },
  {
    "id": "iconic-architecture-art-poster",
    "sourceTemplateId": "tpl_iconic_architecture_art_poster",
    "title": "建筑哲学艺术海报",
    "image": {
      "src": "https://s3.bmp.ovh/2026/05/06/DLtOVgSJ.png",
      "alt": "建筑哲学艺术海报 AIGC artwork"
    },
    "description": {
      "prompt": "以知名建筑「范斯沃斯住宅（密斯·凡·德罗）」为场景，制作一个高端的「极简主义」海报。\n海报中心是建筑的插画形式表达；背景为一个英文单词，以巨大加粗的英文字体排布，气质需与建筑相匹配；周边配以描述该建筑设计哲学的小字排版。\n整体以一种极其高端的当代艺术海报形式呈现。\n用色搭配克制不张扬：色面与线条可呼应建筑构件，亦可作为建筑整体向外的一部分延展。",
      "concept": "让建筑不仅作为海报主体，也参与文字、留白和构图关系，形成一套统一的平面秩序。"
    },
    "tags": [
      "建筑",
      "创意",
      "图表"
    ],
    "year": 2026,
    "tools": [
      "GPT-image-2"
    ],
    "author": "tanshilong"
  },
  {
    "id": "lego-landmark-street-film",
    "sourceTemplateId": "tpl_lego_landmark_street_film",
    "title": "乐高巨砖地标街拍",
    "image": {
      "src": "https://s3.bmp.ovh/2026/05/09/SShOX699.png",
      "alt": "乐高巨砖地标街拍 AIGC artwork"
    },
    "description": {
      "prompt": "创作一张极具创意的图片：一张经典建筑的街拍图，模拟行人在街上拍摄的建筑照片，但要具备建筑可视化的构图与美感。形成反差的是，主体建筑由巨大的乐高块构建而成——就像经典乐高颗粒以与真实世界相融的尺度巨兽化存在，凸点与拼缝清晰可读。核心建筑为「伦敦劳埃德大厦（理查·罗杰斯）」。拍摄风格：90年代经典街拍质感，FujiFilm 胶片感：细腻颗粒、略褪色与柔和对比，阴天漫射自然光。",
      "concept": "用巨型乐高构件介入真实街道，通过尺度错位重新发现熟悉建筑的结构特征。"
    },
    "tags": [
      "建筑",
      "摄影",
      "创意"
    ],
    "year": 2026,
    "tools": [
      "GPT-image-2"
    ],
    "author": "tanshilong"
  }
];

