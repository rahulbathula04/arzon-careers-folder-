import { useEffect, useState } from "react";
import { isReducedMotion } from "./useReducedMotion";

/**
 * Animated number counter; starts when `start` flips to true.
 * If the user has reduced motion enabled (system or in-app toggle),
 * the value snaps to the target immediately — no animation frames.
 */
export function useCounter(target: number, start: boolean, durationMs = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (isReducedMotion()) {
      setV(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, durationMs]);
  return v;
}
