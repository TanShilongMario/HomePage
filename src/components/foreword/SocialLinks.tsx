"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "@/components/hero/useMediaQuery";
import { SOCIAL_LINKS, type SocialLinkItem } from "./types";
import styles from "./SocialLinks.module.css";

interface SocialLinksProps {
  visible?: boolean;
  entering?: boolean;
}

function QrOverlay({
  link,
  onClose,
}: {
  link: SocialLinkItem;
  onClose: () => void;
}) {
  const exitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    exitButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!link.qrSrc) return null;

  return createPortal(
    <div
      className={styles.qrOverlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${link.label}二维码`}
    >
      <button
        ref={exitButtonRef}
        type="button"
        className={styles.qrOverlayExit}
        onClick={onClose}
        aria-label="关闭二维码"
      >
        <span aria-hidden="true">×</span>
      </button>
      <button
        type="button"
        className={styles.qrOverlayBackdrop}
        aria-label="关闭二维码"
        onClick={onClose}
      />
      <div className={styles.qrOverlayCard}>
        <p className={styles.qrOverlayLabel}>{link.label}</p>
        <img src={link.qrSrc} alt={`${link.label}二维码`} draggable={false} />
      </div>
    </div>,
    document.body,
  );
}

export function SocialLinks({ visible = true, entering = false }: SocialLinksProps) {
  const isCompactLayout = useMediaQuery("(max-width: 768px)");
  const useQrOverlay = isCompactLayout === true;
  const [activeQrId, setActiveQrId] = useState<string | null>(null);

  const activeQrLink = SOCIAL_LINKS.find((link) => link.id === activeQrId && link.qrSrc);
  const closeQrOverlay = useCallback(() => setActiveQrId(null), []);

  const className = [
    styles.column,
    visible ? styles.columnVisible : undefined,
    entering ? styles.columnEntering : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={className} aria-label="自媒体链接">
      <ul className={styles.list}>
        {SOCIAL_LINKS.map((link) => {
          const icon = (
            <img
              src={link.iconSrc}
              alt=""
              className={styles.icon}
              width={88}
              height={75}
              draggable={false}
            />
          );

          return (
            <li key={link.id} className={styles.item}>
              {link.href ? (
                <a
                  href={link.href}
                  className={styles.control}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  {icon}
                </a>
              ) : (
                <button
                  type="button"
                  className={styles.control}
                  aria-label={`${link.label}二维码`}
                  title={link.label}
                  aria-expanded={useQrOverlay ? activeQrId === link.id : undefined}
                  onClick={
                    link.qrSrc && useQrOverlay
                      ? () => setActiveQrId((current) => (current === link.id ? null : link.id))
                      : undefined
                  }
                >
                  {icon}
                </button>
              )}
              {link.qrSrc && !useQrOverlay && (
                <span className={styles.qrPopover} role="tooltip">
                  <img src={link.qrSrc} alt={`${link.label}二维码`} draggable={false} />
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {useQrOverlay && activeQrLink && (
        <QrOverlay link={activeQrLink} onClose={closeQrOverlay} />
      )}
    </nav>
  );
}
