"use client";

import { useMemo, useState } from "react";
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

  const { title, html } = useMemo(() => {
    const source = content[locale];
    const titleMatch = source.match(/^#\s+(.+)(?:\r?\n|$)/);

    return {
      title: titleMatch?.[1] ?? "",
      html: renderMarkdown(titleMatch ? source.slice(titleMatch[0].length) : source),
    };
  }, [content, locale]);

  const panelClassName = [
    styles.panel,
    visible ? styles.panelVisible : undefined,
    entering ? styles.panelEntering : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={panelClassName}
      lang={locale === "zh" ? "zh-CN" : "en"}
      aria-label={locale === "zh" ? "展馆介绍" : "Gallery introduction"}
    >
      {title && <h1 className={styles.title}>{title}</h1>}
      <HandDrawnRect seed="foreword-introduction-panel" />
      <div
        className={styles.body}
        lang={locale === "zh" ? "zh-CN" : "en"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button
        type="button"
        className={styles.langToggle}
        onClick={() => setLocale((prev) => (prev === "zh" ? "en" : "zh"))}
        aria-label={locale === "zh" ? "Switch to English" : "切换为中文"}
      >
        <img src="/assets/svg/Translate.svg" alt="" width={107} height={106} draggable={false} />
      </button>
    </article>
  );
}
