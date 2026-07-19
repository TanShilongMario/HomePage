"use client";

import { Button1 } from "@/components/sketch/Button1";
import styles from "./ExhibitDoorNav.module.css";

interface ExhibitDoorNavProps {
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  transitioning?: boolean;
}

/** 各展馆共用的常驻门导航；页面内容切换时不要为它设置 key。 */
export function ExhibitDoorNav({
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  transitioning = false,
}: ExhibitDoorNavProps) {
  const previousDisabled = transitioning || !canGoPrevious;
  const nextDisabled = transitioning || !canGoNext;

  return (
    <nav className={styles.door} aria-label="Exhibition navigation">
      <img
        className={styles.doorArtwork}
        src="/assets/svg/Door.svg"
        alt=""
        width={232}
        height={311}
        draggable={false}
        aria-hidden="true"
      />
      <div className={styles.controls}>
        <Button1
          size="sm"
          shape="square"
          variant={2}
          className={styles.control}
          onClick={onPrevious}
          disabled={previousDisabled}
          aria-label="Previous exhibition"
        >
          <img
            className={`${styles.arrow} ${styles.arrowLeft}`}
            src="/assets/svg/Arrow_Down.svg"
            alt=""
            width={112}
            height={157}
            draggable={false}
            aria-hidden="true"
          />
        </Button1>
        <Button1
          size="sm"
          shape="square"
          variant={3}
          className={styles.control}
          onClick={onNext}
          disabled={nextDisabled}
          aria-label="Next exhibition"
        >
          <img
            className={`${styles.arrow} ${styles.arrowRight}`}
            src="/assets/svg/Arrow_Down.svg"
            alt=""
            width={112}
            height={157}
            draggable={false}
            aria-hidden="true"
          />
        </Button1>
      </div>
    </nav>
  );
}
