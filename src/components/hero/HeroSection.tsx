"use client";

import type { IntroductionContent } from "@/lib/foreword/loadIntroduction";
import { HeroDesktop } from "@/components/hero/HeroDesktop";
import { HeroMobile } from "@/components/hero/HeroMobile";
import { useExhibitionFlow } from "@/components/hero/useExhibitionFlow";
import { useMediaQuery } from "@/components/hero/useMediaQuery";

interface HeroSectionProps {
  introduction: IntroductionContent;
}

export function HeroSection({ introduction }: HeroSectionProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const flow = useExhibitionFlow();

  if (isMobile === null) {
    return <main style={{ minHeight: "100dvh" }} aria-busy="true" />;
  }

  if (isMobile) {
    return <HeroMobile introduction={introduction} flow={flow} />;
  }

  return <HeroDesktop introduction={introduction} flow={flow} />;
}
