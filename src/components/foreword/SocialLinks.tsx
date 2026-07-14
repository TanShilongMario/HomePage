"use client";

import { SketchSvgLink } from "@/components/sketch/SketchSvgLink";
import { SOCIAL_LINKS } from "./types";
import styles from "./SocialLinks.module.css";

interface SocialLinksProps {
  visible?: boolean;
  entering?: boolean;
}

export function SocialLinks({ visible = true, entering = false }: SocialLinksProps) {
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
        {SOCIAL_LINKS.map((link) => (
          <li key={link.id}>
            <SketchSvgLink
              href={link.href}
              variant={link.buttonVariant}
              className={styles.link}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              title={link.label}
            >
              {link.iconSrc ? (
                <img src={link.iconSrc} alt="" className={styles.icon} width={28} height={28} draggable={false} />
              ) : (
                <span className={styles.placeholder} aria-hidden="true">
                  {link.shortLabel}
                </span>
              )}
            </SketchSvgLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
