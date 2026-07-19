/**
 * 画廊的低优先级图片预取队列。
 *
 * - 同一时间只请求一张相邻作品，避免快速切换时形成请求尖峰。
 * - 新的相邻列表会替换尚未开始的旧任务，只服务当前作品附近的内容。
 * - 成功地址会去重；失败地址进入短暂冷却，不做自动重试轰炸。
 */

const loadedSources = new Set<string>();
const failedAt = new Map<string, number>();

const FAILURE_COOLDOWN_MS = 60_000;

let pendingSources: string[] = [];
let activeSource: string | null = null;

function canPreload(source: string) {
  const lastFailure = failedAt.get(source);

  return (
    source.length > 0 &&
    source !== activeSource &&
    !loadedSources.has(source) &&
    (!lastFailure || Date.now() - lastFailure >= FAILURE_COOLDOWN_MS)
  );
}

function runNextPreload() {
  if (typeof window === "undefined" || activeSource) return;

  const source = pendingSources.shift();
  if (!source) return;

  activeSource = source;
  const image = new Image();
  image.decoding = "async";
  image.fetchPriority = "low";
  image.referrerPolicy = "no-referrer";

  const finish = (loaded: boolean) => {
    if (loaded) {
      loadedSources.add(source);
      failedAt.delete(source);
    } else {
      failedAt.set(source, Date.now());
    }

    activeSource = null;
    runNextPreload();
  };

  image.onload = () => finish(true);
  image.onerror = () => finish(false);
  image.src = source;
}

/** 用当前作品真正显示成功后计算出的相邻地址，替换待执行队列。 */
export function queueAdjacentArtworkImages(sources: readonly string[]) {
  const uniqueSources = [...new Set(sources)].filter(canPreload);
  pendingSources = uniqueSources;
  runNextPreload();
}

/** 离开展馆时丢弃尚未开始的预取；正在进行的单个请求会自然结束。 */
export function clearAdjacentArtworkQueue() {
  pendingSources = [];
}

/** 当前作品已由页面加载，无需再次把它加入后台预取。 */
export function markArtworkImageLoaded(source: string) {
  loadedSources.add(source);
  failedAt.delete(source);
}
