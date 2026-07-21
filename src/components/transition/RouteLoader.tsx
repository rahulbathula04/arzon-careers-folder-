import { useEffect, useRef, useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { SpaceLoader } from "./SpaceLoader";
import { isReducedMotion } from "@/hooks/useReducedMotion";

const MIN_VISIBLE_MS = 600;
const MAX_VISIBLE_MS = 6000;
const DEBUG = false; // on-screen + console diagnostics for the loader (dev only)
const dlog = (...args: unknown[]) => {
  if (DEBUG && typeof console !== "undefined") console.log("[RouteLoader]", ...args);
};

export function RouteLoader() {
  const status = useRouterState({ select: (s) => s.status });
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [lastEvent, setLastEvent] = useState<string>("(none)");
  const [eventCount, setEventCount] = useState(0);
  const shownAtRef = useRef<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dev-only beacon: register that <RouteLoader /> is mounted so a sibling
  // <RouteLoaderPresenceCheck /> can warn loudly if it ever goes missing.
  useEffect(() => {
    if (!import.meta.env.DEV || typeof window === "undefined") return;
    const w = window as unknown as {
      __ROUTE_LOADER_COUNT__?: number;
      __ROUTE_LOADER_MOUNTED__?: boolean;
    };
    w.__ROUTE_LOADER_COUNT__ = (w.__ROUTE_LOADER_COUNT__ ?? 0) + 1;
    w.__ROUTE_LOADER_MOUNTED__ = true;
    return () => {
      w.__ROUTE_LOADER_COUNT__ = Math.max(0, (w.__ROUTE_LOADER_COUNT__ ?? 1) - 1);
      if ((w.__ROUTE_LOADER_COUNT__ ?? 0) === 0) w.__ROUTE_LOADER_MOUNTED__ = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const pending = status === "pending" || isLoading;
    dlog("router state →", { status, isLoading, pending, visible });
    if (pending) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      if (!visible) {
        shownAtRef.current = Date.now();
        dlog("show via router state");
      }
      setVisible(true);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
      maxTimerRef.current = setTimeout(() => setVisible(false), MAX_VISIBLE_MS);
    } else if (visible) {
      const elapsed = shownAtRef.current ? Date.now() - shownAtRef.current : MIN_VISIBLE_MS;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      dlog("schedule hide via router state", { elapsed, wait });
      hideTimerRef.current = setTimeout(() => setVisible(false), wait);
    }
  }, [status, isLoading, visible]);

  // Also trigger on intent-to-navigate (covers instant client-side links
  // where the router never enters a pending state).
  useEffect(() => {
    const unsub = router.subscribe("onBeforeNavigate", (e) => {
      dlog("onBeforeNavigate", e);
      setLastEvent("onBeforeNavigate");
      setEventCount((n) => n + 1);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      shownAtRef.current = Date.now();
      setVisible(true);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
      maxTimerRef.current = setTimeout(() => setVisible(false), MAX_VISIBLE_MS);
    });
    const unsub2 = router.subscribe("onResolved", (e) => {
      dlog("onResolved", e);
      setLastEvent("onResolved");
      setEventCount((n) => n + 1);
      const elapsed = shownAtRef.current ? Date.now() - shownAtRef.current : MIN_VISIBLE_MS;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setVisible(false), wait);
    });
    return () => {
      unsub();
      unsub2();
    };
  }, [router]);

  useEffect(
    () => () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
    },
    [],
  );

  // Cycle phrases while visible.
  useEffect(() => {
    if (!visible || reducedMotion || isReducedMotion()) return;
    const id = setInterval(() => setPhraseIndex((i) => i + 1), 1200);
    return () => clearInterval(id);
  }, [visible, reducedMotion]);

  useEffect(() => {
    dlog("visible →", visible);
  }, [visible]);

  return (
    <>
      <SpaceLoader visible={visible} reducedMotion={reducedMotion} phraseIndex={phraseIndex} />
      {DEBUG && (
        <div
          className="pointer-events-none fixed bottom-2 left-2 z-[200] rounded-md border border-white/20 bg-black/80 px-2 py-1 font-mono text-micro leading-tight text-white shadow-lg"
          aria-hidden
        >
          <div>loader: {visible ? "VISIBLE" : "hidden"}</div>
          <div>
            status: {status} · isLoading: {String(isLoading)}
          </div>
          <div>
            last: {lastEvent} (#{eventCount})
          </div>
        </div>
      )}
    </>
  );
}
