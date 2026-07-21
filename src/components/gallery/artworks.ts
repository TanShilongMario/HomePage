import { IMPORTED_AIGC_ARTWORKS } from "./importedArtworks";

export interface AIGCArtworkImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AIGCArtworkDescription {
  prompt?: string;
  concept?: string;
}

/**
 * 画廊内容模型。除 id、title、image 外，其余字段均可按作品实际情况选填。
 * 维护方法见项目根目录 README 的「维护 AIGC Gallery」章节。
 */
export interface AIGCArtwork {
  id: string;
  title: string;
  image: AIGCArtworkImage;
  description?: AIGCArtworkDescription;
  tags?: readonly string[];
  year?: number;
  tools?: readonly string[];
  series?: string;
  featured?: boolean;
  author?: string;
  sourceTemplateId?: string;
}

const CORE_AIGC_ARTWORKS: readonly AIGCArtwork[] = [
  {
    id: "lego-car",
    title: "Lego Car",
    image: {
      src: "/assets/AIGCArtwork/Lego_car.png",
      alt: "A horizontal AIGC artwork featuring a toy-like Lego car",
      width: 1232,
      height: 928,
    },
    description: {
      prompt:
        "A red racing car made by LEGO bricks drifting on the road with hill, background is in motion blur.",
      concept:
        "高速摄影与玩具在一起碰撞",
    },
    tags: ["Product", "Playful", "Vehicle"],
    year: 2026,
    tools: ["GPT-image-2"],
    series: "Imaginary Objects",
  },
  {
    id: "yu-chuan",
    title: "玉河",
    image: {
      src: "/assets/AIGCArtwork/Yu_Chuan.png",
      alt: "A vertical AIGC character artwork titled Yu Chuan",
      width: 928,
      height: 1232,
    },
    description: {
      prompt:
        "微缩景观，特写镜头，抽象中式山水，东方美学意境，玻璃翡翠质感，金线描边，群山之上有一个中式极简亭子，一只小船在玉做的河中，简约风格设计，宣传册封面，产品级渲染效果",
      concept:
        "金丝玉带，传统中式美学的审美还是讲究！",
    },
    tags: ["Fantasy", "Portrait", "Atmosphere"],
    year: 2025,
    tools: ["MidJourney"],
    series: "Character Studies",
  },
  {
    id: "remote-study-two",
    title: "Chinese Ink",
    image: {
      src: "https://s3.bmp.ovh/2026/02/10/me6R7idD.png",
      alt: "A second AIGC artwork hosted on the external image library",
    },
    description: {
      prompt:
        "An old guy aniceint Chinese man holding a bamboos stick, Song Dysteny, focus on motion, ink line art, traditional Chinese inkpainting style, action movie camera, brush art, Black and White composition, breathtaking moment,",
      concept:
        "I really love Chinese ink style",
    },
    tags: ["Remote", "Visual Study"],
    year: 2026,
    tools: ["MidJourney"],
  },
];

/** 手工维护作品在前，Prompt Fill 筛选作品随后；数组顺序即画廊播放顺序。 */
export const AIGC_ARTWORKS: readonly AIGCArtwork[] = [
  ...CORE_AIGC_ARTWORKS,
  ...IMPORTED_AIGC_ARTWORKS,
];
