"use client";

import { useCallback, useState } from "react";
import { Button1 } from "@/components/sketch/Button1";
import { SketchWobbleLine } from "@/components/sketch/SketchWobbleLine";
import { CreativeSpotlight } from "@/components/hero/CreativeSpotlight";
import { ForewordIntro, SocialLinks } from "@/components/foreword";
import { PlantForeground } from "@/components/foreground";
import { AIGCGalleryStage } from "@/components/gallery";
import { ConstructionRoomStage } from "@/components/rooms";
import { ExhibitionTicket, type ExhibitionHallId } from "@/components/ticket";
import type { IntroductionContent } from "@/lib/foreword/loadIntroduction";
import type { ExhibitionFlow } from "@/components/hero/useExhibitionFlow";
import styles from "./HeroMobile.module.css";

interface HeroMobileProps {
  introduction: IntroductionContent;
  flow: ExhibitionFlow;
}

export function HeroMobile({ introduction, flow }: HeroMobileProps) {
  const [ticketPickupOpen, setTicketPickupOpen] = useState(false);

  const {
    phase,
    isForewordEntering,
    ticketIssuedAt,
    isTicketTearing,
    isTicketTorn,
    isPassStamped,
    ticketTaken,
    showExhibitHorizon,
    showForewordContent,
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

  const showWelcomeBlock = phase === "welcome" || phase === "ticket";
  const showTicketPage = ticketTaken && ticketIssuedAt && !showExhibitHorizon;

  const toggleTicketPickup = useCallback(() => {
    setTicketPickupOpen((open) => !open);
  }, []);

  const closeTicketPickup = useCallback(() => {
    setTicketPickupOpen(false);
  }, []);

  const onHallSelectFromPickup = useCallback(
    (hall: ExhibitionHallId) => {
      handleHallSelect(hall);
      setTicketPickupOpen(false);
    },
    [handleHallSelect],
  );

  return (
    <main className={styles.hero} data-phase={phase} data-layout="mobile">
      {showWelcomeBlock && (
        <>
          <section
            className={[
              styles.welcomeBlock,
              ticketTaken ? styles.welcomeExit : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-labelledby="hero-title-mobile"
            aria-hidden={ticketTaken}
          >
            <h1 id="hero-title-mobile" className={styles.title}>
              <span className={styles.titleLine}>Welcome to</span>
              <span className={styles.titleLine}>
                My <CreativeSpotlight mouse={null} enabled={!ticketTaken} mode="always" />
              </span>
              <span className={styles.titleLine}>World</span>
            </h1>
          </section>
          {!ticketTaken && (
            <div className={styles.ctaWrap}>
              <Button1 size="lg" onClick={handleTakeTicket} className={styles.takeTicketButton}>
                Take the ticket
              </Button1>
            </div>
          )}
        </>
      )}

      {showTicketPage && (
        <div className={styles.ticketStage} aria-live="polite">
          <p className={styles.sliceCue} hidden={!sliceEnabled}>
            Slice to enter
          </p>
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
            className={styles.fullTicket}
          />
        </div>
      )}

      {showExhibitHorizon && (
        <section
          className={styles.exhibitStage}
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
                className={styles.introPanel}
              />
              <div className={styles.forewordAside}>
                <SocialLinks visible={!isForewordEntering} entering={isForewordEntering} />
              </div>
            </div>
          )}

          <div
            className={[
              styles.horizon,
              isForewordEntering ? styles.horizonEnter : undefined,
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
            <div className={styles.lineWrap}>
              <SketchWobbleLine seed={0.37} />
            </div>
          </div>

          <PlantForeground
            mouse={null}
            room={plantRoom}
            entering={isForewordEntering}
            traveling={isRoomTransitioning}
            compact
          />

          <nav className={styles.tabBar} aria-label="Exhibition navigation">
            <button
              type="button"
              className={styles.tabButton}
              onClick={handlePreviousRoom}
              disabled={!canGoPrevious || isRoomTransitioning || isForewordEntering}
              aria-label="Previous exhibition"
            >
              <img
                className={`${styles.tabArrow} ${styles.tabArrowLeft}`}
                src="/assets/svg/Arrow_Down.svg"
                alt=""
                width={112}
                height={157}
                draggable={false}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className={[
                styles.tabButton,
                styles.tabTicket,
                ticketPickupOpen ? styles.tabTicketActive : undefined,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={toggleTicketPickup}
              aria-pressed={ticketPickupOpen}
              aria-label={ticketPickupOpen ? "Put ticket away" : "Hold up ticket"}
            >
              <img
                className={styles.tabTicketIcon}
                src="/assets/svg/TicketTop.svg"
                alt=""
                width={48}
                height={103}
                draggable={false}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className={styles.tabButton}
              onClick={handleNextRoom}
              disabled={!canGoNext || isRoomTransitioning || isForewordEntering}
              aria-label="Next exhibition"
            >
              <img
                className={`${styles.tabArrow} ${styles.tabArrowRight}`}
                src="/assets/svg/Arrow_Down.svg"
                alt=""
                width={112}
                height={157}
                draggable={false}
                aria-hidden="true"
              />
            </button>
          </nav>
        </section>
      )}

      {ticketPickupOpen && ticketIssuedAt && showExhibitHorizon && (
        <div className={styles.pickupLayer} role="dialog" aria-label="Exhibition ticket">
          <button
            type="button"
            className={styles.pickupBackdrop}
            aria-label="Close ticket"
            onClick={closeTicketPickup}
          />
          <div className={styles.pickupTicketWrap}>
            <ExhibitionTicket
              issuedAt={ticketIssuedAt}
              visitedHalls={visitedHalls}
              enabledHalls={enabledHalls}
              isTearing={false}
              isTorn={isTicketTorn}
              passStamped={isPassStamped}
              onHallSelect={onHallSelectFromPickup}
              className={styles.pickupTicket}
            />
          </div>
        </div>
      )}
    </main>
  );
}
