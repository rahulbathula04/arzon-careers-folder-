import { useCallback, useRef } from "react";
import { isReducedMotion } from "./useReducedMotion";

/**
 * Cursor-follow parallax + uneven hand-tuned tilt.
 *
 * Drives three CSS custom properties on the target element:
 *   --mx       normalized cursor X in [-1, 1] (left → right)
 *   --my       normalized cursor Y in [-1, 1] (top  → bottom)
 *   --hover    0 when idle, 1 while hovered (smooth interp via CSS easing)
 *
 * A per-instance `--seed` (set via inline style by the consumer) introduces a
 * tiny asymmetry so two adjacent cards never rotate by the exact same amount.
 * This keeps the motion feeling hand-tuned rather than mechanical.
 */
export function useTilt<T extends HTMLElement = HTMLElement>() {
  const raf = useRef<number | null>(null);
  const target = useRef<T | null>(null);

  const onMove = useCallback((e: React.PointerEvent<T>) => {
    if (isReducedMotion()) return;
    const el = e.currentTarget;
    target.current = el;
    const rect = el.getBoundingClientRect();
    // Normalize to [-1, 1] — clamp guards against pointer leaving on fast moves
    const mx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
    const my = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    });
  }, []);

  const onEnter = useCallback((e: React.PointerEvent<T>) => {
    if (isReducedMotion()) return;
    e.currentTarget.style.setProperty("--hover", "1");
  }, []);

  const onLeave = useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.setProperty("--hover", "0");
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  }, []);

  return {
    onPointerMove: onMove,
    onPointerEnter: onEnter,
    onPointerLeave: onLeave,
  };
}

/**
 * Deterministic [-1, 1] seed from a string (e.g. course slug).
 * Used to vary tilt direction per card without randomness on each render.
 */
export function tiltSeed(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  // map to [-1, 1] with ~0.07 step granularity
  return (h % 200) / 100 - 1;
}
