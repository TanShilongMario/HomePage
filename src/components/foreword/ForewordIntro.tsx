"use client";

import { useMemo, useState } from "react";
import { Button1 } from "@/components/sketch/Button1";
import { LANG_TOGGLE_VARIANT } from "@/components/sketch/sketchButtonFrames";
import type { IntroductionContent } from "@/lib/foreword/loadIntroduction";
import { renderMarkdown } from "@/lib/markdown/renderMarkdown";
import { HandDrawnRect } from "./HandDrawnRect";
import type { ForewordLocale } from "./types";
import styles from "./ForewordIntro.module.css";

interface ForewordIntroProps {
  content: IntroductionContent;
  visible?: boolean;
  entering?: boolean;
}

export function ForewordIntro({ content, visible = true, entering = false }: ForewordIntroProps) {
  const [locale, setLocale] = useState<ForewordLocale>("zh");

  const html = useMemo(() => renderMarkdown(content[locale]), [content, locale]);

  const toggleLabel = locale === "zh" ? "EN" : "中文";

  const panelClassName = [
    styles.panel,
    visible ? styles.panelVisible : undefined,
    entering ? styles.panelEntering : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={panelClassName} aria-label={locale === "zh" ? "展馆介绍" : "Gallery introduction"}>
      <HandDrawnRect seed="foreword-introduction-panel" />
      <div
        className={styles.body}
        lang={locale === "zh" ? "zh-CN" : "en"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className={styles.langToggle}>
        <Button1
          size="sm"
          variant={LANG_TOGGLE_VARIANT}
          onClick={() => setLocale((prev) => (prev === "zh" ? "en" : "zh"))}
          aria-label={locale === "zh" ? "Switch to English" : "切换为中文"}
        >
          {toggleLabel}
        </Button1>
      </div>
    </article>
  );
}
