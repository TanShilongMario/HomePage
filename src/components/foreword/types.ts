export type ForewordLocale = "zh" | "en";

export interface SocialLinkItem {
  id: string;
  label: string;
  iconSrc: string;
  href?: string;
  qrSrc?: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "wechat-personal",
    label: "个人微信",
    iconSrc: "/assets/svg/WeChat.svg",
    qrSrc: "/assets/textures/WeChatQR.JPG",
  },
  {
    id: "x",
    label: "X / @TanShilong",
    iconSrc: "/assets/svg/X.svg",
    href: "https://x.com/TanShilong",
  },
  {
    id: "github",
    label: "GitHub / TanShilongMario",
    iconSrc: "/assets/svg/Github.svg",
    href: "https://github.com/TanShilongMario",
  },
  {
    id: "email",
    label: "Email / tanshilong@gmail.com",
    iconSrc: "/assets/svg/Email.svg",
    href: "mailto:tanshilong@gmail.com",
  },
  {
    id: "wechat-public",
    label: "微信公众号",
    iconSrc: "/assets/svg/Public.svg",
    qrSrc: "/assets/textures/PublicQR.jpg",
  },
];
