import { HeroSection } from "@/components/hero/HeroSection";
import { loadIntroduction } from "@/lib/foreword/loadIntroduction";

export default function HomePage() {
  const introduction = loadIntroduction();
  return <HeroSection introduction={introduction} />;
}
