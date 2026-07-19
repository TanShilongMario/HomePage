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
}

export const AIGC_ARTWORKS: readonly AIGCArtwork[] = [
  {
    id: "gym-girl",
    title: "健身房的小姐姐",
    image: {
      src: "/assets/AIGCArtwork/Gym_Girl.png",
      alt: "A vertical AIGC portrait titled Gym Girl",
      width: 928,
      height: 1232,
    },
    description: {
      prompt:
        "Fitness Selfie Scene Core Atmosphere: A raw, candid mirror selfie snapshot taken in a busy gym with an on-camera flash firing. Subject: A young pretty Chinese Jiangnan woman with a wanghong face and gentle Eastern charm, with Healthy athletic build. She is in a Half-squat pose, turned sideways to mirror, turned sideways to the mirror, holding a smartphone. Clothing & Appearance: Wearing Sports skirt, tight and form-fitting. Hair is Hair disheveled and damp with sweat, and cheeks are flushed red, showing clear signs of a recent workout. Facial Expression: Cheeks flushed red, dreamy and slightly unfocused eyes Scene Details: Busy gym with mirrors and equipment visible Selfie Style: Raw, authentic mirror selfie Technical Effects: The photo has noticeable On-camera flash firing, creating an authentic, unposed daily life atmosphere. Specifications",
      concept:
        "谁不喜欢好看的小姐姐呢？",
    },
    tags: ["Portrait", "Cinematic", "Character"],
    year: 2026,
    tools: ["MidJourney"],
    series: "Character Studies",
    featured: true,
  },
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
    id: "remote-study-one",
    title: "Master Poster",
    image: {
      src: "https://s3.bmp.ovh/2026/05/06/DLtOVgSJ.png",
      alt: "An AIGC artwork hosted on the external image library",
    },
    description: {
      prompt:
        "以知名建筑「范斯沃斯住宅」为场景，制作一个高端的极简主义的海报 海报中心是建筑的插画形式的表达，背景是一个单词，以巨大加粗的设计风格描述的英文字体，需要与建筑相匹配，周边是一些小字，用于描述建筑的设计哲学 整体以一种极其高端的艺术海报形式呈现 用色搭配克制不张扬，与建筑有一些搭配组合，例如恰好构成了建筑的一些构件或作为建筑的整体向外的一部分延展",
      concept:
        "当AI的审美与思考已经可以超越80%的人类，那我们就让它自行发挥吧",
    },
    tags: ["Remote", "Experiment"],
    year: 2026,
    tools: ["GPT-image-2"],
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
