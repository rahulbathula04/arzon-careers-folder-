import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "arzon:reduce-motion";
const CLASS_NAME = "reduce-motion";

type Pref = "on" | "off" | "system";

function readStored(): Pref {
  if (typeof window === "undefined") return "system";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "on" || v === "off" ? v : "system";
}

function systemPrefers(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Returns the resolved boolean (system or user override). */
export function resolveReducedMotion(pref: Pref): boolean {
  if (pref === "on") return true;
  if (pref === "off") return false;
  return systemPrefers();
}

function apply(reduced: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle(CLASS_NAME, reduced);
}

/**
 * Hook + setter for the global reduced-motion preference.
 * Persists user override (on/off/system) and toggles `html.reduce-motion`.
 */
export function useReducedMotion() {
  const [pref, setPref] = useState<Pref>(() => readStored());
  const [reduced, setReduced] = useState<boolean>(() => resolveReducedMotion(readStored()));

  // Apply + listen to system changes when in "system" mode.
  useEffect(() => {
    const next = resolveReducedMotion(pref);
    setReduced(next);
    apply(next);
    if (pref !== "system") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      const r = resolveReducedMotion("system");
      setReduced(r);
      apply(r);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [pref]);

  // Cross-tab sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setPref(readStored());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setPreference = useCallback((next: Pref) => {
    if (next === "system") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, next);
    setPref(next);
  }, []);

  const toggle = useCallback(() => {
    setPreference(reduced ? "off" : "on");
  }, [reduced, setPreference]);

  return { pref, reduced, setPreference, toggle };
}

/**
 * Inline script that runs before paint to set `html.reduce-motion`
 * based on stored preference (or system default). Prevents a flash
 * of animated content for users who disabled motion.
 */
export const REDUCED_MOTION_BOOT_SCRIPT = `(function(){try{var k='${STORAGE_KEY}';var v=localStorage.getItem(k);var r=v==='on'?true:v==='off'?false:(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);if(r)document.documentElement.classList.add('${CLASS_NAME}');}catch(e){}})();`;

/**
 * Synchronous read for non-React modules (hooks like useCounter/useTilt).
 * Reads the resolved state from the `html.reduce-motion` class, which is
 * applied pre-hydration by REDUCED_MOTION_BOOT_SCRIPT and kept in sync
 * by useReducedMotion.
 */
export function isReducedMotion(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains(CLASS_NAME);
}
