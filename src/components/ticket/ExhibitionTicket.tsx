"use client";

import { QRCodeSVG } from "qrcode.react";
import styles from "./ExhibitionTicket.module.css";

const QR_TARGET = "https://x.com/TanShilong";

export type ExhibitionHallId = "welcome" | "aigc" | "vibe" | "ending";

interface ExhibitionTicketProps {
  issuedAt: Date;
  visitedHalls?: readonly ExhibitionHallId[];
  enabledHalls?: readonly ExhibitionHallId[];
  isTearing?: boolean;
  isTorn?: boolean;
  passStamped?: boolean;
  onHallSelect?: (hall: ExhibitionHallId) => void;
  className?: string;
}

interface HallItem {
  id: ExhibitionHallId;
  title: string;
  subtitle: string;
}

const HALLS: HallItem[] = [
  {
    id: "welcome",
    title: "Welcome House",
    subtitle: "About me",
  },
  {
    id: "aigc",
    title: "AIGC Gallery",
    subtitle: "Some awesome artworks",
  },
  {
    id: "vibe",
    title: "Vibe Coding Room",
    subtitle: "Magic tool for magic tools",
  },
  {
    id: "ending",
    title: "Ending Show",
    subtitle: "Is it real ending?",
  },
];

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function formatIssuedAt(date: Date): string {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join(".") + ` ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function createTicketNumber(date: Date): string {
  return `CEH-${String(date.getFullYear()).slice(-2)}${pad(date.getMonth() + 1)}${pad(
    date.getDate(),
  )}-${pad(date.getHours())}${pad(date.getMinutes())}`;
}

export function ExhibitionTicket({
  issuedAt,
  visitedHalls = [],
  enabledHalls = ["welcome"],
  isTearing = false,
  isTorn = false,
  passStamped = false,
  onHallSelect,
  className,
}: ExhibitionTicketProps) {
  const issuedLabel = formatIssuedAt(issuedAt);
  const ticketNumber = createTicketNumber(issuedAt);

  return (
    <article
      className={[styles.ticket, className].filter(Boolean).join(" ")}
      aria-label={`Creative Exhibition ticket, issued ${issuedLabel}`}
    >
      <section className={styles.ticketTop}>
        <img
          className={styles.paperShape}
          src="/assets/svg/TicketTop.svg"
          alt=""
          width={300}
          height={644}
          draggable={false}
          aria-hidden="true"
        />

        <div className={styles.topContent}>
          <header className={styles.header}>
            <p className={styles.admit}>ADMIT ONE · ONLINE EXHIBITION</p>
            <h2 className={styles.title}>
              <span>Welcome to</span>
              <span>
                My <span className={styles.metalWord}>Creative</span>
              </span>
              <span>World</span>
            </h2>
            <p className={styles.byline}>Made by Corner Studio</p>
          </header>

          <div className={styles.divider} aria-hidden="true" />

          <dl className={styles.issueData}>
            <div>
              <dt>Date</dt>
              <dd>
                <time dateTime={issuedAt.toISOString()}>{issuedLabel}</time>
              </dd>
            </div>
            <div>
              <dt>Ticket</dt>
              <dd>{ticketNumber}</dd>
            </div>
          </dl>

          <nav className={styles.halls} aria-label="Exhibition halls">
            <p className={styles.sectionLabel}>Exhibition Hall</p>
            <ol>
              {HALLS.map((hall, index) => {
                const visited = visitedHalls.includes(hall.id);
                const enabled = enabledHalls.includes(hall.id);
                return (
                  <li key={hall.id}>
                    <button
                      type="button"
                      className={styles.hallButton}
                      onClick={enabled ? () => onHallSelect?.(hall.id) : undefined}
                      aria-disabled={!enabled}
                    >
                      <span className={styles.hallIndex}>{pad(index + 1)}</span>
                      <span className={styles.hallCopy}>
                        <strong>{hall.title}</strong>
                        <small>{hall.subtitle}</small>
                      </span>
                      {visited && <span className={styles.smallStamp}>VISITED</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <footer className={styles.topMeta}>
            <span>ARCHITECTURE · DESIGN · AI · VIBE CODING</span>
            <span>NO PRESCRIBED ROUTE</span>
          </footer>
        </div>

        {passStamped && (
          <div className={styles.passStamp} aria-label="Cleared to wander">
            <span>WANDER</span>
            <small>ADMITTED · CORNER STUDIO</small>
          </div>
        )}
      </section>

      <section
        className={[
          styles.ticketBottom,
          isTearing ? styles.ticketBottomTearing : undefined,
          isTorn ? styles.ticketBottomTorn : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="Ticket stub"
      >
        <img
          className={styles.paperShape}
          src="/assets/svg/TicketBottom.svg"
          alt=""
          width={300}
          height={176}
          draggable={false}
          aria-hidden="true"
        />
        <div className={styles.perforation} aria-hidden="true" />

        <div className={styles.stubContent}>
          <div className={styles.qrWrap}>
            <QRCodeSVG
              value={QR_TARGET}
              level="M"
              bgColor="transparent"
              fgColor="#171717"
              title="QR code linking to TanShilong on X"
            />
          </div>
          <div className={styles.stubCopy}>
            <strong>SCAN TO VISIT</strong>
            <span>X / @TanShilong</span>
            <span className={styles.stubUrl}>x.com/TanShilong</span>
            <span className={styles.stubNumber}>{ticketNumber}</span>
          </div>
        </div>
      </section>
    </article>
  );
}
