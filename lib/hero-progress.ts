type ProgressListener = (revealProgress: number) => void;

const listeners = new Set<ProgressListener>();

export function subscribeHeroProgress(fn: ProgressListener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function emitHeroProgress(p: number) {
  listeners.forEach((fn) => fn(p));
}

export function easeOutCubic(t: number) {
  const clamped = Math.max(0, Math.min(t, 1));
  return 1 - Math.pow(1 - clamped, 3);
}

export function revealInRange(p: number, start: number, end: number) {
  return easeOutCubic((p - start) / (end - start));
}
