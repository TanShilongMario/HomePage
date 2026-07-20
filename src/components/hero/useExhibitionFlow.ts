"use client";

import { useCallback, useState } from "react";
import type { ExhibitionHallId } from "@/components/ticket";
import type { PlantRoom } from "@/components/foreground";

export type ExhibitionRoom = "foreword" | "gallery" | "vibe" | "ending";
export type ExhibitionPhase = "welcome" | "ticket" | ExhibitionRoom;

/** 与 forewordHorizonEnter 一致：0.28s delay + 0.72s duration */
export const FOREWORD_ENTER_MS = 1000;
export const TICKET_TEAR_MS = 720;
export const PASS_STAMP_HOLD_MS = 520;
export const ROOM_TRANSITION_MS = 480;
export const FOREWORD_RETURN_MS = 480;
/** 桌面 Slice 引导出现，对齐原 Entry reveal delay */
export const SLICE_HINT_DELAY_MS = 2900;

export interface RoomTransition {
  direction: "forward" | "backward";
  target: ExhibitionRoom;
}

export const EXHIBITION_ROOMS: readonly ExhibitionRoom[] = [
  "foreword",
  "gallery",
  "vibe",
  "ending",
];
export const EXHIBITION_HALLS: readonly ExhibitionHallId[] = [
  "welcome",
  "aigc",
  "vibe",
  "ending",
];

export const ROOM_TO_HALL: Record<ExhibitionRoom, ExhibitionHallId> = {
  foreword: "welcome",
  gallery: "aigc",
  vibe: "vibe",
  ending: "ending",
};

export const HALL_TO_ROOM: Record<ExhibitionHallId, ExhibitionRoom> = {
  welcome: "foreword",
  aigc: "gallery",
  vibe: "vibe",
  ending: "ending",
};

export function isExhibitionRoom(phase: ExhibitionPhase): phase is ExhibitionRoom {
  return EXHIBITION_ROOMS.includes(phase as ExhibitionRoom);
}

export function useExhibitionFlow() {
  const [phase, setPhase] = useState<ExhibitionPhase>("welcome");
  const [isForewordEntering, setIsForewordEntering] = useState(false);
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
  const showExhibitHorizon = isExhibitionRoom(phase) || isForewordEntering;
  const showForewordContent = phase === "foreword" || isForewordEntering;
  const ticketPinned = showExhibitHorizon || isEntrySequenceRunning;
  const isRoomTransitioning = roomTransition !== null;
  const currentRoom = isExhibitionRoom(phase) ? phase : null;
  const currentRoomIndex = currentRoom ? EXHIBITION_ROOMS.indexOf(currentRoom) : -1;
  const plantRoom: PlantRoom = roomTransition?.target ?? currentRoom ?? "foreword";
  const sliceEnabled =
    phase === "ticket" && !isForewordEntering && !isEntrySequenceRunning;
  const enabledHalls: readonly ExhibitionHallId[] =
    currentRoom || isForewordEntering ? EXHIBITION_HALLS : [];
  const visitedHalls = EXHIBITION_ROOMS.filter((room) => visitedRooms.has(room)).map(
    (room) => ROOM_TO_HALL[room],
  );
  const canGoPrevious = currentRoomIndex > 0;
  const canGoNext =
    currentRoomIndex >= 0 && currentRoomIndex < EXHIBITION_ROOMS.length - 1;

  const handleTakeTicket = useCallback(() => {
    if (ticketTaken) return;
    setTicketIssuedAt(new Date());
    setPhase("ticket");
  }, [ticketTaken]);

  const startEntrySequence = useCallback(() => {
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
      if (!isExhibitionRoom(phase) && !isForewordEntering) return;
      navigateToRoom(HALL_TO_ROOM[hall]);
    },
    [isForewordEntering, navigateToRoom, phase],
  );

  const handlePreviousRoom = useCallback(() => {
    if (currentRoomIndex > 0) navigateToRoom(EXHIBITION_ROOMS[currentRoomIndex - 1]!);
  }, [currentRoomIndex, navigateToRoom]);

  const handleNextRoom = useCallback(() => {
    if (currentRoomIndex >= 0 && currentRoomIndex < EXHIBITION_ROOMS.length - 1) {
      navigateToRoom(EXHIBITION_ROOMS[currentRoomIndex + 1]!);
    }
  }, [currentRoomIndex, navigateToRoom]);

  return {
    phase,
    isForewordEntering,
    ticketIssuedAt,
    isEntrySequenceRunning,
    isTicketTearing,
    isTicketTorn,
    isPassStamped,
    roomTransition,
    isForewordReturning,
    ticketTaken,
    showWelcome,
    showExhibitHorizon,
    showForewordContent,
    ticketPinned,
    isRoomTransitioning,
    currentRoom,
    currentRoomIndex,
    plantRoom,
    sliceEnabled,
    enabledHalls,
    visitedHalls,
    canGoPrevious,
    canGoNext,
    handleTakeTicket,
    startEntrySequence,
    navigateToRoom,
    handleHallSelect,
    handlePreviousRoom,
    handleNextRoom,
  };
}

export type ExhibitionFlow = ReturnType<typeof useExhibitionFlow>;
