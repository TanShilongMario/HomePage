"use client";

import { useCallback, useState } from "react";
import { SketchButton } from "@/components/sketch/SketchButton";
import { CreativeSpotlight } from "@/components/hero/CreativeSpotlight";
import { PenguinSpotlight } from "@/components/hero/PenguinSpotlight";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const [ticketTaken, setTicketTaken] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const handleTakeTicket = useCallback(() => {
    if (ticketTaken) return;
    setTicketTaken(true);
  }, [ticketTaken]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMouse({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse(null);
  }, []);

  return (
    <main
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <section className={styles.welcomeBlock} aria-labelledby="hero-title">
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.titleLine}>Welcome to</span>
          <span className={styles.titleLine}>
            My <CreativeSpotlight mouse={mouse} />
          </span>
          <span className={styles.titleLine}>World</span>
        </h1>

        <div className={styles.ctaWrap}>
          <SketchButton
            onClick={handleTakeTicket}
            aria-expanded={ticketTaken}
            aria-hidden={ticketTaken}
            tabIndex={ticketTaken ? -1 : undefined}
            className={ticketTaken ? styles.ctaHidden : undefined}
          >
            Take the ticket
          </SketchButton>
        </div>
      </section>

      <div className={styles.penguinStage} aria-hidden="true">
        <PenguinSpotlight mouse={mouse} />
      </div>

      {ticketTaken && (
        <>
          <div className={styles.deliveryGroup} aria-live="polite">
            <div className={styles.ticketPlaceholder} aria-label="展览门票" />
          </div>
          <div className={styles.handWrap} aria-hidden="true">
            <img
              className={styles.handImage}
              src="/assets/svg/Hand.svg"
              alt=""
              width={308}
              height={231}
              draggable={false}
            />
          </div>
        </>
      )}

      {ticketTaken && (
        <div className={styles.entryWrap}>
          <div className={styles.entryStack}>
            <SketchButton size="lg" className={styles.entryButton}>
              Entry
            </SketchButton>
            <img
              className={styles.entryArrow}
              src="/assets/svg/Arrow_Down.svg"
              alt=""
              width={112}
              height={157}
              draggable={false}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </main>
  );
}
