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
    title: "Gym Girl",
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
    title: "Yu Chuan",
    image: {
      src: "/assets/AIGCArtwork/Yu_Chuan.png",
      alt: "A vertical AIGC character artwork titled Yu Chuan",
      width: 928,
      height: 1232,
    },
    description: {
      prompt:
        "[占位] An atmospheric eastern-fantasy portrait, layered fabric, misty light, subtle texture, poetic cinematic framing.",
      concept:
        "[占位] 从传统意象出发，但避免直接复刻古典画面，希望人物更像来自一个尚未写完的世界。",
    },
    tags: ["Fantasy", "Portrait", "Atmosphere"],
    year: 2026,
    tools: ["AIGC"],
    series: "Character Studies",
  },
  {
    id: "remote-study-one",
    title: "Remote Study 01",
    image: {
      src: "https://s3.bmp.ovh/2026/05/06/DLtOVgSJ.png",
      alt: "An AIGC artwork hosted on the external image library",
    },
    description: {
      prompt:
        "[占位] 请在这里填写这张作品真正使用的提示词；字段支持中英文和较长文本。",
      concept:
        "[占位] 请在这里补充作品的创作动机、希望解决的问题，或生成过程中值得记录的选择。",
    },
    tags: ["Remote", "Experiment"],
    year: 2026,
    tools: ["AIGC"],
  },
  {
    id: "remote-study-two",
    title: "Remote Study 02",
    image: {
      src: "https://s3.bmp.ovh/2026/02/10/me6R7idD.png",
      alt: "A second AIGC artwork hosted on the external image library",
    },
    description: {
      prompt:
        "[占位] 请替换为该作品的核心提示词。作品集只做阅读展示，因此不会提供复制按钮。",
      concept:
        "[占位] 请描述构图、色彩、叙事或工作流上的实验重点，后续也可以增加新的说明字段。",
    },
    tags: ["Remote", "Visual Study"],
    year: 2026,
    tools: ["AIGC"],
  },
];
