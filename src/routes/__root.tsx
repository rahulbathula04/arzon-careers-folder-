import { useEffect, useLayoutEffect, useRef } from "react";
import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import appCss from "../styles.css?url";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
if (import.meta.env.DEV) {
  // Dev-only: logs to the browser console whenever Vite pushes a CSS HMR update.
  import("../lib/dev/css-hmr-probe");
}
import { DarkBackdrop } from "../components/courses/DarkBackdrop";
import {
  LINKS,
  SITE,
  absUrl,
  ADDRESS,
  COUNSELLOR_PHONE_DISPLAY,
} from "../components/landing/constants";
import { ThumbnailOverridesProvider } from "../lib/ThumbnailOverridesProvider";
import { MobileWhatsAppFAB } from "../components/landing/MobileWhatsAppFAB";
import { RouteLoader } from "../components/transition/RouteLoader";
import { RouteLoaderPresenceCheck } from "../components/transition/RouteLoaderPresenceCheck";
import { GlobalErrorFallback } from "../components/common/GlobalErrorFallback";
import { Nav } from "../components/landing/Nav";
import { PageTransition } from "../components/motion/PageTransition";
import { NavSectionsProvider } from "../components/landing/NavSectionsContext";
import { resetScrollRoot } from "../lib/scroll";
import { track } from "../lib/track";
import { installSsrErrorListeners, reportSsrError } from "../lib/ssrErrorReporter";
import { installRlsIncidentInterceptor } from "../lib/rlsIncidentReporter";
import { resolveApplySurface, resolveApplyProgrammeSlug } from "../lib/applyTracking";
import { getAssignedVariant } from "../lib/abTest";
import { REDUCED_MOTION_BOOT_SCRIPT } from "../hooks/useReducedMotion";
import { THEME_BOOT_SCRIPT } from "../hooks/useTheme";
import { GA4_ID, GSC_TOKEN, ga4BootScript, trackPageView } from "../lib/analytics";
import { initSentry, setSentryRoute } from "../lib/sentry";
import { organizationReviewsSchema } from "../lib/jsonLd";
import { REVIEWS, AGGREGATE_RATING } from "../data/reviews";
import { KEYWORD_BANK_TERMS } from "../data/keywordBank";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-app items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="h-display">404</h1>
        <h2 className="h-section mt-4">Page not found</h2>
        <p className="mt-2 text-sm text-white/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

import { getRootHead } from "../lib/seo/rootHead";

export const Route = createRootRoute({
  head: () => getRootHead(),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ({ error, reset }) => (
    <GlobalErrorFallback error={error} resetErrorBoundary={reset} />
  ),
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Apply persisted reduced-motion preference before paint to avoid a flash of animated UI. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: REDUCED_MOTION_BOOT_SCRIPT }}
        />
        {/* Apply persisted theme (light/dark) before paint to avoid FOUC. */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Install SSR hydration / serialization failure listeners once per mount.
  // Matches "Invariant failed", "$_TSR.router", Seroval errors, etc. and
  // logs them via the analytics_events table so the admin dashboard can
  // surface them on the "SSR errors" tab.
  useEffect(() => {
    installSsrErrorListeners();
    // Watch Supabase Data-API responses for "permission denied for function ..."
    // errors and log them into public.rls_incidents so the scheduled
    // check_rls_incidents() scanner can raise a Slack alert.
    installRlsIncidentInterceptor();
    // Fire-and-forget: no-op unless VITE_SENTRY_DSN is set AND @sentry/react is installed.
    void initSentry();
  }, []);
  // Per-route scroll memory. Browsers natively restore window.scrollY, but our
  // scroll happens inside #app-scroll-root, so we need to do it ourselves.
  // We key by history entry (state.key) so back/forward to the SAME pathname
  // visited twice keeps each visit's own scroll spot. Hash links bypass.
  const prevKeyRef = useRef<string | null>(null);

  // Helpers shared by both effects. Keep them outside so the effects agree
  // on the storage shape and the per-route key.
  // Storage shape: { [routeKey]: { top, left, rails: { [railKey]: number } } }

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.getElementById("app-scroll-root");
    if (!root) return;
    // Disable native restoration, we manage it for the inner scroller.
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        /* noop */
      }
    }
    const STORE_KEY = "__appScrollPos";
    type Entry = { top: number; left: number; rails?: Record<string, number> };
    type Store = Record<string, Entry>;
    const readStore = (): Store => {
      try {
        return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
      } catch {
        return {};
      }
    };
    const writeStore = (s: Store) => {
      try {
        sessionStorage.setItem(STORE_KEY, JSON.stringify(s));
      } catch {
        /* noop */
      }
    };
    const railKey = (el: HTMLElement): string | null => {
      const id = el.dataset.railId;
      if (id) return `rail:${id}`;
      if (import.meta.env?.DEV) {
        console.warn(
          "[scroll-restore] .scroll-rail is missing data-rail-id; its scroll position will not be persisted across navigations.",
          el,
        );
      }
      return null;
    };
    const collectRails = (): Record<string, number> => {
      const map: Record<string, number> = {};
      const rails = document.querySelectorAll<HTMLElement>(".scroll-rail");
      rails.forEach((el) => {
        const k = railKey(el);
        if (k) map[k] = el.scrollLeft;
      });
      return map;
    };
    const currentKey = (): string => {
      const st = window.history.state as { key?: string } | null;
      return (st && typeof st.key === "string" ? st.key : "") + "|" + window.location.pathname;
    };

    // On the very first mount there is no outgoing route to save, AND the
    // sessionStorage store may contain a stale entry keyed to `"|" + pathname`
    // from a previous tab where TanStack Router had not yet stamped
    // `history.state.key`. Restoring that stale entry is what caused fresh
    // page opens to land near the bottom of the page. Always reset on the
    // first mount, and only save the outgoing scroll position when we
    // actually have an outgoing key.
    const isFirstMount = prevKeyRef.current === null;
    if (prevKeyRef.current) {
      const store = readStore();
      store[prevKeyRef.current] = {
        top: root.scrollTop,
        left: root.scrollLeft,
        rails: collectRails(),
      };
      writeStore(store);
    }

    // 2) Restore (or reset) for the INCOMING route. Skip if URL has a #hash -
    //    that's an in-page anchor, let the anchor handler take it.
    const key = currentKey();
    prevKeyRef.current = key;
    if (window.location.hash) return;
    if (isFirstMount) {
      resetScrollRoot();
      return;
    }
    const saved = readStore()[key];
    if (saved && typeof saved === "object") {
      root.scrollTo({
        top: saved.top ?? 0,
        left: saved.left ?? 0,
        behavior: "instant" as ScrollBehavior,
      });
      // Rails mount asynchronously (Suspense / lazy chunks). Try a few times
      // over the next ~600ms before giving up.
      const targets = saved.rails || {};
      let attempts = 0;
      const restoreRails = () => {
        const rails = document.querySelectorAll<HTMLElement>(".scroll-rail");
        rails.forEach((el) => {
          const id = el.dataset.railId;
          if (!id) return;
          const want = targets[`rail:${id}`];
          if (typeof want === "number" && Math.abs(el.scrollLeft - want) > 1) {
            el.scrollTo({ left: want, top: 0, behavior: "instant" as ScrollBehavior });
          }
        });
        attempts++;
        if (attempts < 6) setTimeout(restoreRails, 100);
      };
      restoreRails();
    } else {
      resetScrollRoot();
    }
  }, [pathname]);

  // Continuously sync the active route's scroll position so a refresh or a
  // back-nav after scrolling lands in the right spot.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.getElementById("app-scroll-root");
    if (!root) return;
    // ──────────────────────────────────────────────────────────────────────
    // Hot path optimisations:
    //   • In-memory cache of the live entry; we never JSON.parse on each
    //     scroll event (parse only once on mount).
    //   • Per-target dirty tracking: a scroll event only marks ITS element
    //     as dirty, no DOM-wide querySelectorAll on every frame.
    //   • Single rAF in flight at a time; coalesces high-frequency wheel /
    //     touchmove streams to one write per frame.
    //   • Storage commit is debounced via requestIdleCallback (or 250ms
    //     fallback). The in-memory cache is what restoration reads after
    //     navigation, so the throttled commit is just for refresh / pagehide.
    // ──────────────────────────────────────────────────────────────────────
    type Entry = { top: number; left: number; rails: Record<string, number> };
    type Store = Record<string, Entry>;
    const STORE_KEY = "__appScrollPos";

    let store: Store;
    try {
      store = JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}") as Store;
    } catch {
      store = {};
    }

    const ensureEntry = (key: string): Entry => {
      let e = store[key];
      if (!e) {
        e = { top: 0, left: 0, rails: {} };
        store[key] = e;
      }
      if (!e.rails) e.rails = {};
      return e;
    };

    let rootDirty = false;
    const dirtyRails = new Set<HTMLElement>();
    let frame = 0;
    let commitHandle: number | undefined;
    let commitTimer: ReturnType<typeof setTimeout> | undefined;

    type IdleWin = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    const idleWin = window as IdleWin;

    const scheduleCommit = () => {
      if (commitHandle !== undefined || commitTimer) return;
      const run = () => {
        commitHandle = undefined;
        commitTimer = undefined;
        try {
          sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
        } catch {
          /* noop */
        }
      };
      if (idleWin.requestIdleCallback) {
        commitHandle = idleWin.requestIdleCallback(run, { timeout: 1000 });
      } else {
        commitTimer = setTimeout(run, 250);
      }
    };

    const flush = () => {
      frame = 0;
      const key = prevKeyRef.current;
      if (!key) {
        rootDirty = false;
        dirtyRails.clear();
        return;
      }
      const entry = ensureEntry(key);
      if (rootDirty) {
        entry.top = root.scrollTop;
        entry.left = root.scrollLeft;
        rootDirty = false;
      }
      if (dirtyRails.size) {
        for (const el of dirtyRails) {
          const id = el.dataset.railId;
          if (id) entry.rails[`rail:${id}`] = el.scrollLeft;
        }
        dirtyRails.clear();
      }
      scheduleCommit();
    };

    const queueFlush = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onRootScroll = () => {
      rootDirty = true;
      queueFlush();
    };
    root.addEventListener("scroll", onRootScroll, { passive: true });

    // Rail scrolls: capture-phase listener (scroll doesn't bubble), but we
    // filter to only `.scroll-rail` elements so unrelated overflow elements
    // (modals, dropdowns, etc.) don't churn the queue.
    const onRailScroll = (e: Event) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t === root) return; // already handled above
      if (!t.classList || !t.classList.contains("scroll-rail")) return;
      dirtyRails.add(t);
      queueFlush();
    };
    document.addEventListener("scroll", onRailScroll, { passive: true, capture: true });

    // Synchronous flush on pagehide so refresh / close persists the latest.
    const onPageHide = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      // Mark everything dirty so flush re-reads current values.
      rootDirty = true;
      document.querySelectorAll<HTMLElement>(".scroll-rail").forEach((el) => dirtyRails.add(el));
      flush();
      // Force synchronous write, bypass the idle scheduler.
      if (commitHandle !== undefined && idleWin.cancelIdleCallback)
        idleWin.cancelIdleCallback(commitHandle);
      if (commitTimer) clearTimeout(commitTimer);
      commitHandle = undefined;
      commitTimer = undefined;
      try {
        sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
      } catch {
        /* noop */
      }
    };
    window.addEventListener("pagehide", onPageHide);

    // Layout-change re-application: when the viewport resizes or any rail's
    // scrollWidth changes (lazy content arrives, fonts load, images decode),
    // the previously saved scrollLeft/scrollTop may now exceed scroll bounds
    // or fall slightly off. Re-clamp + re-apply the stored values so the
    // visible position stays anchored to what the user last saw.
    const reapply = () => {
      const key = prevKeyRef.current;
      if (!key) return;
      try {
        const saved = store[key];
        if (!saved) return;
        const maxTop = Math.max(0, root.scrollHeight - root.clientHeight);
        const maxLeft = Math.max(0, root.scrollWidth - root.clientWidth);
        const top = Math.min(saved.top ?? 0, maxTop);
        const left = Math.min(saved.left ?? 0, maxLeft);
        if (Math.abs(root.scrollTop - top) > 1 || Math.abs(root.scrollLeft - left) > 1) {
          root.scrollTo({ top, left, behavior: "instant" as ScrollBehavior });
        }
        const targets = saved.rails || {};
        document.querySelectorAll<HTMLElement>(".scroll-rail").forEach((el) => {
          const id = el.dataset.railId;
          if (!id) return;
          const want = targets[`rail:${id}`];
          if (typeof want !== "number") return;
          const max = Math.max(0, el.scrollWidth - el.clientWidth);
          const clamped = Math.min(want, max);
          if (Math.abs(el.scrollLeft - clamped) > 1) {
            el.scrollTo({ left: clamped, top: 0, behavior: "instant" as ScrollBehavior });
          }
        });
      } catch {
        /* noop */
      }
    };

    let reapplyRaf = 0;
    const queueReapply = () => {
      if (reapplyRaf) cancelAnimationFrame(reapplyRaf);
      reapplyRaf = requestAnimationFrame(() => {
        reapplyRaf = 0;
        reapply();
      });
    };

    // Window resize / orientation change.
    window.addEventListener("resize", queueReapply);
    window.addEventListener("orientationchange", queueReapply);

    // Observe layout changes on the scroll root and every rail. ResizeObserver
    // fires when scrollWidth/scrollHeight change because content mounted,
    // images decoded, fonts loaded, etc.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(queueReapply) : null;
    if (ro) ro.observe(root);
    const observeRails = () => {
      if (!ro) return;
      document.querySelectorAll<HTMLElement>(".scroll-rail").forEach((el) => {
        try {
          ro.observe(el);
        } catch {
          /* already observing */
        }
      });
    };
    observeRails();
    // Mutation observer to pick up rails added later (lazy / Suspense).
    const mo = new MutationObserver((muts) => {
      let added = false;
      for (const m of muts) {
        if (m.addedNodes.length) {
          added = true;
          break;
        }
      }
      if (added) {
        observeRails();
        queueReapply();
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", queueReapply);
      window.removeEventListener("orientationchange", queueReapply);
      if (ro) ro.disconnect();
      mo.disconnect();
      if (reapplyRaf) cancelAnimationFrame(reapplyRaf);
      root.removeEventListener("scroll", onRootScroll);
      document.removeEventListener("scroll", onRailScroll, true);
      window.removeEventListener("pagehide", onPageHide);
      if (frame) cancelAnimationFrame(frame);
      if (commitHandle !== undefined && idleWin.cancelIdleCallback)
        idleWin.cancelIdleCallback(commitHandle);
      if (commitTimer) clearTimeout(commitTimer);
    };
  }, []);
  useEffect(() => {
    // Defer analytics so it never competes with LCP/hydration frames.
    type IdleWin = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const w = typeof window !== "undefined" ? (window as IdleWin) : null;
    let h: number | undefined;
    let t: ReturnType<typeof setTimeout> | undefined;
    const fire = () => {
      track("page_view");
      // GA4 SPA page_view (no-op when GA4_ID isn't configured).
      trackPageView(pathname);
      // Tag Sentry's current scope so alerts can route by route path.
      setSentryRoute(pathname);
    };
    if (w?.requestIdleCallback) {
      h = w.requestIdleCallback(fire, { timeout: 3000 });
    } else {
      t = setTimeout(fire, 800);
    }
    return () => {
      if (h !== undefined && w && "cancelIdleCallback" in w) {
        (w as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(h);
      }
      if (t) clearTimeout(t);
    };
  }, [pathname]);
  // Global WhatsApp-click tracker. Catches every anchor pointing at wa.me
  // (covers the long tail of `waLink(...)` callsites we don't wrap with
  // <WhatsAppLink> directly). De-duped via a `data-wa-tracked` marker so
  // links wrapped in <WhatsAppLink> aren't double-counted.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a[href*='wa.me']") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.dataset.waTracked === "1") return;
      anchor.dataset.waTracked = "1";
      try {
        const source =
          anchor.dataset.waSource ??
          anchor.getAttribute("aria-label") ??
          anchor.textContent?.trim().slice(0, 48) ??
          "unlabelled";
        track("whatsapp_click", {
          props: { source, path: window.location.pathname, delegated: true },
        });
        // Stamp a click timestamp so the visibility-change listener can
        // decide whether returning to the tab counts as a confirmed
        // WhatsApp handoff (proxy for "message created in WA").
        try {
          window.sessionStorage.setItem(
            "wa_last_click",
            JSON.stringify({ t: Date.now(), source, fired: false }),
          );
        } catch {
          /* sessionStorage may be blocked */
        }
      } catch {
        /* never break the link */
      }
      // Allow re-tracking on subsequent clicks of the same anchor.
      setTimeout(() => {
        delete anchor.dataset.waTracked;
      }, 1500);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  // whatsapp_message_created proxy: when the tab regains visibility
  // within 10 minutes of a wa.me click, infer the user opened WhatsApp
  // and (most likely) sent the prefilled message. One event per click.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVis = () => {
      if (document.visibilityState !== "visible") return;
      try {
        const raw = window.sessionStorage.getItem("wa_last_click");
        if (!raw) return;
        const parsed = JSON.parse(raw) as { t: number; source: string; fired: boolean };
        if (parsed.fired) return;
        if (Date.now() - parsed.t > 10 * 60_000) return;
        track("whatsapp_message_created", {
          props: { source: parsed.source, latency_ms: Date.now() - parsed.t, proxy: "visibility" },
        });
        window.sessionStorage.setItem("wa_last_click", JSON.stringify({ ...parsed, fired: true }));
      } catch {
        /* never break navigation */
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  // Global Apply-CTA tracker. Catches every anchor pointing at /apply
  // (covers the long tail of CTAs across landing, course, industry, and
  // career-engine pages). Surface is resolved from the nearest
  // `data-apply-surface` annotation, falling back to the nearest landmark.
  // Programme slug is read from `data-programme-slug` or from `?programme=`
  // in the link's href.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a[href*='/apply']") as HTMLAnchorElement | null;
      if (!anchor) return;
      // Resolve only same-origin /apply links (skip mailto, tel, external).
      try {
        const u = new URL(anchor.href, window.location.origin);
        if (u.origin !== window.location.origin) return;
        if (!u.pathname.startsWith("/apply")) return;
      } catch {
        return;
      }
      if (anchor.dataset.applyTracked === "1") return;
      anchor.dataset.applyTracked = "1";
      try {
        const surface = resolveApplySurface(anchor);
        const programmeSlug = resolveApplyProgrammeSlug(anchor);
        const experimentVariant = getAssignedVariant("sticky_cta_placement");
        const applyCtaUrgency = getAssignedVariant("apply_cta_urgency");
        const heroHeadline = getAssignedVariant("hero_headline");
        const step1FieldOrder = getAssignedVariant("apply_step1_field_order");
        const step1CtaPlacement = getAssignedVariant("apply_step1_cta_placement");
        const step1ConfirmCopy = getAssignedVariant("apply_step1_confirm_copy");
        track("apply_cta_click", {
          program_slug: programmeSlug,
          props: {
            surface,
            path: window.location.pathname,
            delegated: true,
            funnel_step: "cta",
            experiment: "sticky_cta_placement",
            experiment_variant: experimentVariant,
            apply_cta_urgency_variant: applyCtaUrgency,
            hero_headline_variant: heroHeadline,
            apply_step1_field_order_variant: step1FieldOrder,
            apply_step1_cta_placement_variant: step1CtaPlacement,
            apply_step1_confirm_copy_variant: step1ConfirmCopy,
          },
        });
      } catch {
        /* never break the link */
      }
      setTimeout(() => {
        delete anchor.dataset.applyTracked;
      }, 1500);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  const hideMarketingNav =
    pathname.startsWith("/apply") ||
    pathname.startsWith("/career") ||
    pathname.startsWith("/learn") ||
    pathname.startsWith("/enrol") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/healthcare-career-workshop");
  return (
    <QueryClientProvider client={queryClient}>
      <ThumbnailOverridesProvider>
        <DarkBackdrop>
          <NavSectionsProvider>
            {/* Site-wide Aurora Waves ambient background. Fixed, behind content. */}
            <div className="aurora-bg" aria-hidden="true">
              <span />
            </div>
            {/* Skip to main content link - keyboard a11y. */}
            <a
              href="#app-scroll-root"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Skip to main content
            </a>
            {/* Focused-funnel routes render their own shell header
              (ApplyShell, CareerShell, PlayerLayout). Hiding the global
              marketing Nav prevents stacked double headers on those routes. */}
            <div
              id="app-scroll-root"
              tabIndex={-1}
              className="app-scroll-root"
              // Nav now scrolls inside the container, so the scroll root and
              // any `min-h-app` descendant always claim the full viewport.
              style={{ "--nav-h": "3.5rem" } as React.CSSProperties}
            >
              {!hideMarketingNav && <Nav />}
              <PageTransition pathname={pathname}>
                <Outlet />
              </PageTransition>
            </div>
            <MobileWhatsAppFAB />
            <RouteLoader />
            <RouteLoaderPresenceCheck />
            <Analytics />
            <SpeedInsights />
          </NavSectionsProvider>
        </DarkBackdrop>
      </ThumbnailOverridesProvider>
    </QueryClientProvider>
  );
}
