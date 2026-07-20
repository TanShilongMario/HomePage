"use client";

import { useCallback, useState } from "react";
import { Button1 } from "@/components/sketch/Button1";
import { SketchWobbleLine } from "@/components/sketch/SketchWobbleLine";
import { WanderingCrowd } from "@/components/wander";
import { CreativeSpotlight } from "@/components/hero/CreativeSpotlight";
import { ForewordIntro, SocialLinks } from "@/components/foreword";
import { PlantForeground } from "@/components/foreground";
import { AIGCGalleryStage } from "@/components/gallery";
import { ExhibitDoorNav } from "@/components/navigation";
import { ConstructionRoomStage } from "@/components/rooms";
import { ExhibitionTicket } from "@/components/ticket";
import type { IntroductionContent } from "@/lib/foreword/loadIntroduction";
import type { ExhibitionFlow } from "@/components/hero/useExhibitionFlow";
import styles from "./HeroSection.module.css";

interface HeroDesktopProps {
  introduction: IntroductionContent;
  flow: ExhibitionFlow;
}

export function HeroDesktop({ introduction, flow }: HeroDesktopProps) {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const {
    phase,
    isForewordEntering,
    ticketIssuedAt,
    isTicketTearing,
    isTicketTorn,
    isPassStamped,
    ticketTaken,
    showWelcome,
    showExhibitHorizon,
    showForewordContent,
    ticketPinned,
    isRoomTransitioning,
    plantRoom,
    sliceEnabled,
    enabledHalls,
    visitedHalls,
    canGoPrevious,
    canGoNext,
    handleTakeTicket,
    startEntrySequence,
    handleHallSelect,
    handlePreviousRoom,
    handleNextRoom,
  } = flow;

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

  const showSliceHint = sliceEnabled;

  return (
    <main
      className={styles.hero}
      data-phase={phase}
      data-layout="desktop"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {showWelcome && (
        <>
          <section className={welcomeClassName} aria-labelledby="hero-title">
            <h1 id="hero-title" className={styles.title}>
              <span className={styles.titleLine}>Welcome to</span>
              <span className={styles.titleLine}>
                My{" "}
                <CreativeSpotlight
                  mouse={mouse}
                  enabled={!isForewordEntering}
                  mode="spotlight"
                />
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
              showExhibitHorizon ? styles.deliveryGroupForewordAlign : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-live="polite"
          >
            {ticketIssuedAt && (
              <ExhibitionTicket
                issuedAt={ticketIssuedAt}
                visitedHalls={visitedHalls}
                enabledHalls={enabledHalls}
                isTearing={isTicketTearing}
                isTorn={isTicketTorn}
                passStamped={isPassStamped}
                sliceEnabled={sliceEnabled}
                onSlice={startEntrySequence}
                onHallSelect={handleHallSelect}
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
          {showSliceHint && (
            <div className={styles.sliceHint} aria-hidden="true">
              <span className={styles.sliceHintLabel}>Slice to enter</span>
              <img
                className={styles.sliceHintArrow}
                src="/assets/svg/Arrow_Down.svg"
                alt=""
                width={112}
                height={157}
                draggable={false}
              />
            </div>
          )}
        </>
      )}

      {/* Entry 暂禁用；进场改为票齿孔 Slice。需要时取消注释并接 startEntrySequence。
      {phase === "ticket" && !isForewordEntering && !isEntrySequenceRunning && (
        <div className={styles.entryWrap}>
          <div className={styles.entryStack}>
            <Button1 size="lg" className={styles.entryButton} onClick={startEntrySequence}>
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
      */}

      {showExhibitHorizon && (
        <section
          className={styles.forewordStage}
          aria-label={
            phase === "gallery"
              ? "AIGC Gallery"
              : phase === "vibe"
                ? "Vibe Coding Room"
                : phase === "ending"
                  ? "Ending Show"
                  : "扉页"
          }
        >
          {showForewordContent && (
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
              </div>
            </div>
          )}

          <div
            className={[
              styles.forewordHorizon,
              isForewordEntering ? styles.forewordHorizonEnter : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <AIGCGalleryStage
              active={phase === "gallery"}
              exiting={phase === "gallery" && isRoomTransitioning}
            />
            <ConstructionRoomStage
              active={phase === "vibe"}
              title="Vibe Coding Room"
              exiting={phase === "vibe" && isRoomTransitioning}
            />
            <ConstructionRoomStage
              active={phase === "ending"}
              title="Ending Show"
              exiting={phase === "ending" && isRoomTransitioning}
            />
            <div className={styles.forewordWalkZone}>
              <ExhibitDoorNav
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
                onPrevious={handlePreviousRoom}
                onNext={handleNextRoom}
                transitioning={isRoomTransitioning || isForewordEntering}
              />
              <div className={styles.forewordWanderArea}>
                <WanderingCrowd
                  enabled={showExhibitHorizon && !isForewordEntering}
                  dialogueScene={
                    phase === "gallery"
                      ? "aigcGallery"
                      : phase === "vibe"
                        ? "vibeCoding"
                        : phase === "ending"
                          ? "endingShow"
                          : "foreword"
                  }
                />
              </div>
            </div>
            <div className={styles.forewordLineWrap}>
              <SketchWobbleLine seed={0.37} />
            </div>
          </div>
          <PlantForeground
            mouse={mouse}
            room={plantRoom}
            entering={isForewordEntering}
            traveling={isRoomTransitioning}
          />
        </section>
      )}
    </main>
  );
}
