"use client";

import { useCallback, useState } from "react";
import { Button1 } from "@/components/sketch/Button1";
import { SketchWobbleLine } from "@/components/sketch/SketchWobbleLine";
import { WanderingCrowd } from "@/components/wander";
import { CreativeSpotlight } from "@/components/hero/CreativeSpotlight";
import { PenguinSpotlight } from "@/components/hero/PenguinSpotlight";
import { ForewordIntro, SocialLinks } from "@/components/foreword";
import { ExhibitionTicket } from "@/components/ticket";
import type { IntroductionContent } from "@/lib/foreword/loadIntroduction";
import styles from "./HeroSection.module.css";

type ExhibitionPhase = "welcome" | "ticket" | "foreword";

/** 与 forewordHorizonEnter 一致：0.28s delay + 0.72s duration */
const FOREWORD_ENTER_MS = 1000;
const TICKET_TEAR_MS = 720;
const PASS_STAMP_HOLD_MS = 520;

interface HeroSectionProps {
  introduction: IntroductionContent;
}

export function HeroSection({ introduction }: HeroSectionProps) {
  const [phase, setPhase] = useState<ExhibitionPhase>("welcome");
  const [isForewordEntering, setIsForewordEntering] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [ticketIssuedAt, setTicketIssuedAt] = useState<Date | null>(null);
  const [isEntrySequenceRunning, setIsEntrySequenceRunning] = useState(false);
  const [isTicketTearing, setIsTicketTearing] = useState(false);
  const [isTicketTorn, setIsTicketTorn] = useState(false);
  const [isPassStamped, setIsPassStamped] = useState(false);

  const ticketTaken = phase !== "welcome";
  const showWelcome = phase !== "foreword" || isForewordEntering;
  const showEntry = phase === "ticket" && !isForewordEntering && !isEntrySequenceRunning;
  const showForewordLine = phase === "foreword" || isForewordEntering;
  const ticketPinned = phase === "foreword" || isForewordEntering || isEntrySequenceRunning;

  const handleTakeTicket = useCallback(() => {
    if (ticketTaken) return;
    setTicketIssuedAt(new Date());
    setPhase("ticket");
  }, [ticketTaken]);

  const handleEntry = useCallback(() => {
    if (phase !== "ticket" || isForewordEntering || isEntrySequenceRunning) return;
    setIsEntrySequenceRunning(true);
    setIsTicketTearing(true);

    window.setTimeout(() => {
      setIsTicketTearing(false);
      setIsTicketTorn(true);
      setIsPassStamped(true);

      window.setTimeout(() => {
        setIsForewordEntering(true);

        window.setTimeout(() => {
          setPhase("foreword");
          setIsForewordEntering(false);
          setIsEntrySequenceRunning(false);
        }, FOREWORD_ENTER_MS);
      }, PASS_STAMP_HOLD_MS);
    }, TICKET_TEAR_MS);
  }, [phase, isForewordEntering, isEntrySequenceRunning]);

  const handleWelcomeSelect = useCallback(() => {
    if (phase === "ticket") {
      handleEntry();
    }
  }, [handleEntry, phase]);

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
        <>
          <section className={welcomeClassName} aria-labelledby="hero-title">
            <h1 id="hero-title" className={styles.title}>
              <span className={styles.titleLine}>Welcome to</span>
              <span className={styles.titleLine}>
                My <CreativeSpotlight mouse={mouse} enabled={!isForewordEntering} />
              </span>
              <span className={styles.titleLine}>World</span>
            </h1>
          </section>
          <div className={styles.ctaWrap}>
            <Button1
              size="lg"
              onClick={handleTakeTicket}
              aria-expanded={ticketTaken}
              aria-hidden={ticketTaken}
              tabIndex={ticketTaken ? -1 : undefined}
              className={[
                styles.takeTicketButton,
                ticketTaken ? styles.ctaHidden : undefined,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              Take the ticket
            </Button1>
          </div>
        </>
      )}

      {ticketTaken && (
        <>
          <div
            className={[
              styles.deliveryGroup,
              ticketPinned ? styles.deliveryGroupPinned : undefined,
              showForewordLine ? styles.deliveryGroupForewordAlign : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-live="polite"
          >
            {ticketIssuedAt && (
              <ExhibitionTicket
                issuedAt={ticketIssuedAt}
                welcomeVisited={phase === "foreword"}
                isTearing={isTicketTearing}
                isTorn={isTicketTorn}
                passStamped={isPassStamped}
                onWelcomeSelect={handleWelcomeSelect}
                className={styles.exhibitionTicket}
              />
            )}
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
            <Button1 size="lg" className={styles.entryButton} onClick={handleEntry}>
              Entry
            </Button1>
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
              styles.forewordContent,
              isForewordEntering ? styles.forewordContentEnter : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <ForewordIntro
              content={introduction}
              visible={!isForewordEntering}
              entering={isForewordEntering}
            />
            <div className={styles.forewordAside}>
              <SocialLinks visible={!isForewordEntering} entering={isForewordEntering} />
              <div className={styles.forewordNext}>
                <Button1
                  size="lg"
                  className={[styles.entryButton, styles.forewordNextButton].join(" ")}
                >
                  Next
                </Button1>
              </div>
            </div>
          </div>

          <div
            className={[
              styles.forewordHorizon,
              isForewordEntering ? styles.forewordHorizonEnter : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={styles.forewordWalkZone}>
              <div className={styles.forewordWanderArea}>
                <WanderingCrowd enabled={showForewordLine && !isForewordEntering} />
              </div>
              <div className={styles.forewordPenguin}>
                <PenguinSpotlight mouse={mouse} enabled={showForewordLine && !isForewordEntering} />
              </div>
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
