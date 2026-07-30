import { useEffect, useRef } from "react";
import { track } from "@/lib/track";

/**
 * Instruments four "is the user looking for something we removed?" signals
 * for the home page:
 *
 *  1. `home_domain_grid_search_signal` - fired when the URL hash/query
 *     matches the legacy "Pick your domain" anchors (`#domains`,
 *     `#pick-your-domain`, `?section=domains`). We also smooth-scroll to
 *     the surviving `#programmes` section so bookmarks/share-links don't
 *     dead-end.
 *  2. `home_scroll_depth` - fired once per session at 25/50/75/90% page
 *     depth.
 *  3. `home_search_keypress` - fires when the user opens find-in-page
 *     (Ctrl/Cmd+F or `/`). Logs the *fact* a find was triggered; never
 *     reads keystrokes or query text.
 *  4. `home_dwell_no_cta` - fired on page hide if the user has been on
 *     the page ≥ 60 s and has not clicked any Apply CTA.
 *
 * All events also carry `props.release = "post-domain-grid-removal"` so
 * the funnel dashboard can split before/after the removal.
 */
const RELEASE_TAG = "post-domain-grid-removal";
const REMOVED_ANCHORS = new Set(["domains", "pick-your-domain", "pick-domain", "domain-grid"]);

export function useHomeSearchSignals(opts: { path: string } = { path: "/" }) {
  const { path } = opts;
  const ctaClicked = useRef(false);
  const mountedAt = useRef(Date.now());

  // 1. Removed-section anchor / query catcher + smooth-scroll rescue.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "").toLowerCase();
    const section = new URL(window.location.href).searchParams.get("section")?.toLowerCase() ?? "";
    const matchKind = REMOVED_ANCHORS.has(hash)
      ? "hash"
      : REMOVED_ANCHORS.has(section)
        ? "query"
        : null;
    if (!matchKind) return;
    track("home_domain_grid_search_signal", {
      props: {
        path,
        match_kind: matchKind,
        raw: matchKind === "hash" ? hash : section,
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
        release: RELEASE_TAG,
      },
    });
    // Smooth-scroll rescue: try the surviving Programmes section.
    const target =
      document.getElementById("programmes") ?? document.getElementById("bento-programmes");
    if (target) {
      // Defer one frame so the page has laid out.
      requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [path]);

  // 2. Scroll-depth markers.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fired = new Set<number>();
    const compute = () => {
      const doc = document.documentElement;
      const total = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.round((window.scrollY / total) * 100));
      for (const mark of [25, 50, 75, 90]) {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track("home_scroll_depth", {
            props: { path, depth: mark, release: RELEASE_TAG },
          });
        }
      }
    };
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        compute();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  // 3. Find-in-page detection (Ctrl/Cmd+F or `/` shortcut).
  useEffect(() => {
    if (typeof window === "undefined") return;
    let lastFired = 0;
    const onKey = (e: KeyboardEvent) => {
      const isFindCombo = (e.key === "f" || e.key === "F") && (e.ctrlKey || e.metaKey);
      const isSlash =
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement);
      if (!isFindCombo && !isSlash) return;
      const now = Date.now();
      if (now - lastFired < 10_000) return; // throttle: once per 10s
      lastFired = now;
      track("home_search_keypress", {
        props: { path, kind: isFindCombo ? "find-combo" : "slash", release: RELEASE_TAG },
      });
    };
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [path]);

  // 4. Track Apply-CTA clicks so the dwell-no-CTA signal stays honest.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest(
        "a[href*='/apply']",
      ) as HTMLAnchorElement | null;
      if (!a) return;
      ctaClicked.current = true;
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // 5. Dwell-no-CTA on page hide.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onHide = () => {
      if (ctaClicked.current) return;
      const dwellMs = Date.now() - mountedAt.current;
      if (dwellMs < 60_000) return;
      track("home_dwell_no_cta", {
        props: { path, dwell_ms: dwellMs, release: RELEASE_TAG },
      });
    };
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") onHide();
    });
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
    };
  }, [path]);
}
