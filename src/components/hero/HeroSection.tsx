"use client";

import { useCallback, useState } from "react";
import { Button1 } from "@/components/sketch/Button1";
import { SketchWobbleLine } from "@/components/sketch/SketchWobbleLine";
import { WanderingCrowd } from "@/components/wander";
import { CreativeSpotlight } from "@/components/hero/CreativeSpotlight";
import { ForewordIntro, SocialLinks } from "@/components/foreword";
import { PlantForeground, type PlantRoom } from "@/components/foreground";
import { AIGCGalleryStage } from "@/components/gallery";
import { ExhibitDoorNav } from "@/components/navigation";
import { ConstructionRoomStage } from "@/components/rooms";
import { ExhibitionTicket, type ExhibitionHallId } from "@/components/ticket";
import type { IntroductionContent } from "@/lib/foreword/loadIntroduction";
import styles from "./HeroSection.module.css";

type ExhibitionRoom = "foreword" | "gallery" | "vibe" | "ending";
type ExhibitionPhase = "welcome" | "ticket" | ExhibitionRoom;

/** 与 forewordHorizonEnter 一致：0.28s delay + 0.72s duration */
const FOREWORD_ENTER_MS = 1000;
const TICKET_TEAR_MS = 720;
const PASS_STAMP_HOLD_MS = 520;
const ROOM_TRANSITION_MS = 480;
const FOREWORD_RETURN_MS = 480;

interface RoomTransition {
  direction: "forward" | "backward";
  target: ExhibitionRoom;
}

const EXHIBITION_ROOMS: readonly ExhibitionRoom[] = ["foreword", "gallery", "vibe", "ending"];
const EXHIBITION_HALLS: readonly ExhibitionHallId[] = ["welcome", "aigc", "vibe", "ending"];

const ROOM_TO_HALL: Record<ExhibitionRoom, ExhibitionHallId> = {
  foreword: "welcome",
  gallery: "aigc",
  vibe: "vibe",
  ending: "ending",
};

const HALL_TO_ROOM: Record<ExhibitionHallId, ExhibitionRoom> = {
  welcome: "foreword",
  aigc: "gallery",
  vibe: "vibe",
  ending: "ending",
};

function isExhibitionRoom(phase: ExhibitionPhase): phase is ExhibitionRoom {
  return EXHIBITION_ROOMS.includes(phase as ExhibitionRoom);
}

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
  const [roomTransition, setRoomTransition] = useState<RoomTransition | null>(null);
  const [isForewordReturning, setIsForewordReturning] = useState(false);
  const [visitedRooms, setVisitedRooms] = useState<ReadonlySet<ExhibitionRoom>>(
    () => new Set(),
  );

  const ticketTaken = phase !== "welcome";
  const showWelcome = phase === "welcome" || phase === "ticket" || isForewordEntering;
  const showEntry = phase === "ticket" && !isForewordEntering && !isEntrySequenceRunning;
  const showExhibitHorizon = isExhibitionRoom(phase) || isForewordEntering;
  const showForewordContent = phase === "foreword" || isForewordEntering;
  const ticketPinned = showExhibitHorizon || isEntrySequenceRunning;
  const isRoomTransitioning = roomTransition !== null;
  const currentRoom = isExhibitionRoom(phase) ? phase : null;
  const currentRoomIndex = currentRoom ? EXHIBITION_ROOMS.indexOf(currentRoom) : -1;
  const plantRoom: PlantRoom = roomTransition?.target ?? currentRoom ?? "foreword";
  const enabledHalls: readonly ExhibitionHallId[] =
    currentRoom || isForewordEntering ? EXHIBITION_HALLS : ["welcome"];
  const visitedHalls = EXHIBITION_ROOMS.filter((room) => visitedRooms.has(room)).map(
    (room) => ROOM_TO_HALL[room],
  );

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
          setVisitedRooms(new Set(["foreword"]));
          setIsForewordEntering(false);
          setIsEntrySequenceRunning(false);
        }, FOREWORD_ENTER_MS);
      }, PASS_STAMP_HOLD_MS);
    }, TICKET_TEAR_MS);
  }, [phase, isForewordEntering, isEntrySequenceRunning]);

  const navigateToRoom = useCallback(
    (target: ExhibitionRoom) => {
      if (!isExhibitionRoom(phase) || phase === target || roomTransition) return;

      const direction =
        EXHIBITION_ROOMS.indexOf(target) > EXHIBITION_ROOMS.indexOf(phase)
          ? "forward"
          : "backward";
      setRoomTransition({ direction, target });

      window.setTimeout(() => {
        setPhase(target);
        setVisitedRooms((previous) => {
          const next = new Set(previous);
          next.add(target);
          return next;
        });
        setRoomTransition(null);

        if (target === "foreword") {
          setIsForewordReturning(true);
          window.setTimeout(() => setIsForewordReturning(false), FOREWORD_RETURN_MS);
        }
      }, ROOM_TRANSITION_MS);
    },
    [phase, roomTransition],
  );

  const handleHallSelect = useCallback(
    (hall: ExhibitionHallId) => {
      if (phase === "ticket" && hall === "welcome") {
        handleEntry();
        return;
      }
      navigateToRoom(HALL_TO_ROOM[hall]);
    },
    [handleEntry, navigateToRoom, phase],
  );

  const handlePreviousRoom = useCallback(() => {
    if (currentRoomIndex > 0) navigateToRoom(EXHIBITION_ROOMS[currentRoomIndex - 1]!);
  }, [currentRoomIndex, navigateToRoom]);

  const handleNextRoom = useCallback(() => {
    if (currentRoomIndex >= 0 && currentRoomIndex < EXHIBITION_ROOMS.length - 1) {
      navigateToRoom(EXHIBITION_ROOMS[currentRoomIndex + 1]!);
    }
  }, [currentRoomIndex, navigateToRoom]);

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
                roomTransition && phase === "foreword" ? styles.forewordContentExit : undefined,
                isForewordReturning ? styles.forewordContentReturn : undefined,
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
                canGoPrevious={currentRoomIndex > 0}
                canGoNext={currentRoomIndex >= 0 && currentRoomIndex < EXHIBITION_ROOMS.length - 1}
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
