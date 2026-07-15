"use client";

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
                >
                  {icon}
                </button>
              )}
              {link.qrSrc && (
                <span className={styles.qrPopover} role="tooltip">
                  <img src={link.qrSrc} alt={`${link.label}二维码`} draggable={false} />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
