import styles from "./ConstructionRoomStage.module.css";

interface ConstructionRoomStageProps {
  active: boolean;
  title: string;
  exiting?: boolean;
}

/** 尚未布展的房间共用占位舞台；保留房间标题和完整展馆环境。 */
export function ConstructionRoomStage({
  active,
  title,
  exiting = false,
}: ConstructionRoomStageProps) {
  if (!active) return null;

  return (
    <div className={[styles.stage, exiting ? styles.stageExit : undefined].filter(Boolean).join(" ")}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.notice} role="status">
        <p lang="zh-CN">该展馆正在施工中...</p>
        <p lang="en">This gallery is under construction...</p>
      </div>
    </div>
  );
}
