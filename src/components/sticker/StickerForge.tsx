"use client";

import { useEffect, useRef, useState } from "react";
import { loadStickerForge } from "./loadStickerForge";
import type { StickerInstance, StickerOptions, StickerSource } from "./stickerForgeTypes";
import styles from "./StickerForge.module.css";

interface StickerForgeProps {
  source: StickerSource;
  options?: StickerOptions;
  className?: string;
  style?: React.CSSProperties;
  /** 无障碍标签；贴纸本身可交互撕揭 */
  "aria-label"?: string;
}

/**
 * 将 sticker-forge 挂到普通 DOM 节点；卸载时 destroy。
 * 加载失败时不渲染，避免破坏票面布局。
 */
export function StickerForge({
  source,
  options,
  className,
  style,
  "aria-label": ariaLabel,
}: StickerForgeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<StickerInstance | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;

    const mount = async () => {
      try {
        const api = await loadStickerForge();
        if (cancelled || !hostRef.current) return;

        const instance = await api.createSticker(host, {
          ...options,
          source,
        });
        if (cancelled) {
          instance.destroy();
          return;
        }
        instanceRef.current = instance;
        instance.resize();
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    void mount();

    const observer = new ResizeObserver(() => {
      instanceRef.current?.resize();
    });
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
    // 票面贴纸使用模块级常量预设，仅挂载一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (failed) return null;

  return (
    <div
      ref={hostRef}
      className={[styles.host, className].filter(Boolean).join(" ")}
      style={style}
      aria-label={ariaLabel}
      role="img"
    />
  );
}
