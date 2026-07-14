import type { SketchSvgButtonVariant } from "@/components/sketch/sketchButtonFrames";

export type ForewordLocale = "zh" | "en";

export interface SocialLinkItem {
  id: string;
  label: string;
  /** Placeholder label shown until custom icon is provided */
  shortLabel: string;
  href: string;
  /** Path under public/, e.g. /assets/icons/x.svg — null uses placeholder */
  iconSrc: string | null;
  buttonVariant: SketchSvgButtonVariant;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "x",
    label: "X",
    shortLabel: "X",
    href: "https://x.com/",
    iconSrc: null,
    buttonVariant: 2,
  },
  {
    id: "wechat-public",
    label: "微信公众号",
    shortLabel: "公",
    href: "#",
    iconSrc: null,
    buttonVariant: 3,
  },
  {
    id: "wechat-personal",
    label: "个人微信",
    shortLabel: "微",
    href: "#",
    iconSrc: null,
    buttonVariant: 4,
  },
  {
    id: "email",
    label: "Email",
    shortLabel: "@",
    href: "mailto:hello@example.com",
    iconSrc: null,
    buttonVariant: 2,
  },
  {
    id: "github",
    label: "GitHub",
    shortLabel: "GH",
    href: "https://github.com/",
    iconSrc: null,
    buttonVariant: 3,
  },
];
