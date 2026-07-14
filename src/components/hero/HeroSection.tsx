"use client";

import { useCallback, useState } from "react";
import { SketchButton } from "@/components/sketch/SketchButton";
import { SketchWobbleLine } from "@/components/sketch/SketchWobbleLine";
import { WanderingCharacter } from "@/components/wander";
import { CreativeSpotlight } from "@/components/hero/CreativeSpotlight";
// Hero 页暂不展示企鹅探照灯；组件保留供其他页面复用 → PenguinSpotlight.tsx
// import { PenguinSpotlight } from "@/components/hero/PenguinSpotlight";
import styles from "./HeroSection.module.css";

type ExhibitionPhase = "welcome" | "ticket" | "foreword";

/** 与 forewordHorizonEnter 一致：0.28s delay + 0.72s duration */
const FOREWORD_ENTER_MS = 1000;

export function HeroSection() {
  const [phase, setPhase] = useState<ExhibitionPhase>("welcome");
  const [isForewordEntering, setIsForewordEntering] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const ticketTaken = phase !== "welcome";
  const showWelcome = phase !== "foreword" || isForewordEntering;
  const showEntry = phase === "ticket" && !isForewordEntering;
  const showForewordLine = phase === "foreword" || isForewordEntering;
  const ticketPinned = phase === "foreword" || isForewordEntering;

  const handleTakeTicket = useCallback(() => {
    if (ticketTaken) return;
    setPhase("ticket");
  }, [ticketTaken]);

  const handleEntry = useCallback(() => {
    if (phase !== "ticket" || isForewordEntering) return;
    setIsForewordEntering(true);

    window.setTimeout(() => {
      setPhase("foreword");
      setIsForewordEntering(false);
    }, FOREWORD_ENTER_MS);
  }, [phase, isForewordEntering]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMouse({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse(null);
  }, []);

  const welcomeClassName = [
    styles.welcomeBlock,
    isForewordEntering ? styles.welcomeExit : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main
      className={styles.hero}
      data-phase={phase}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {showWelcome && (
        <section className={welcomeClassName} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>Welcome to</span>
            <span className={styles.titleLine}>
              My <CreativeSpotlight mouse={mouse} enabled={!isForewordEntering} />
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
      )}

      {ticketTaken && (
        <>
          <div
            className={[
              styles.deliveryGroup,
              ticketPinned ? styles.deliveryGroupPinned : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-live="polite"
          >
            <div className={styles.ticketPlaceholder} aria-label="展览门票" />
          </div>
          {phase === "ticket" && !isForewordEntering && (
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
          )}
        </>
      )}

      {showEntry && (
        <div className={styles.entryWrap}>
          <div className={styles.entryStack}>
            <SketchButton size="lg" className={styles.entryButton} onClick={handleEntry}>
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

      {showForewordLine && (
        <section className={styles.forewordStage} aria-label="扉页">
          <div
            className={[
              styles.forewordHorizon,
              isForewordEntering ? styles.forewordHorizonEnter : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={styles.forewordWalkZone}>
              <WanderingCharacter characterId="walking1" enabled={showForewordLine && !isForewordEntering} />
            </div>
            <div className={styles.forewordLineWrap}>
              <SketchWobbleLine seed={0.37} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
