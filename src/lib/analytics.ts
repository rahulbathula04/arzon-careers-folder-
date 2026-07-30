/**
 * Lightweight GA4 + Google Search Console scaffolding.
 *
 * Both are env-gated so non-prod (and pre-launch) builds stay clean. To
 * activate in production set these in the deployment environment:
 *   - VITE_GA4_MEASUREMENT_ID  (e.g. "G-XXXXXXXX")
 *   - VITE_GSC_VERIFICATION    (the long token Google Search Console gives you)
 *
 * No tracking fires until the env vars are set. SPA navigations are
 * forwarded to GA4 from the router subscriber wired in __root.tsx.
 */

export const GA4_ID = (import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined) ?? "";

export const GSC_TOKEN = (import.meta.env.VITE_GSC_VERIFICATION as string | undefined) ?? "";

export function isAnalyticsEnabled(): boolean {
  return Boolean(GA4_ID);
}

/** Inline boot script - installs gtag.js and configures GA4 with SPA-safe defaults. */
export function ga4BootScript(id: string): string {
  return `(function(){try{
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${id}';document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=gtag;
    gtag('js',new Date());
    gtag('config','${id}',{send_page_view:false,anonymize_ip:true,transport_type:'beacon'});
  }catch(e){}})();`;
}

/** Fire a GA4 page_view for a SPA navigation. No-op if GA4 isn't loaded. */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: any[]) => void };
  if (!w.gtag || !GA4_ID) return;
  w.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
    send_to: GA4_ID,
  });
}

/**
 * Fire an arbitrary GA4 event. No-op if GA4 isn't loaded - safe to call
 * unconditionally from components.
 */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined> = {},
): void {
  if (typeof window === "undefined") return;
  // Debug mode: append `?debug_ga=1` (or set localStorage.debug_ga = "1") to
  // mirror every event into the console for GA4 DebugView validation without
  // shipping noise to production users.
  try {
    const w = window as unknown as { __ga_debug?: boolean };
    if (w.__ga_debug === undefined) {
      const qs = new URLSearchParams(window.location.search);
      w.__ga_debug =
        qs.get("debug_ga") === "1" ||
        (typeof localStorage !== "undefined" && localStorage.getItem("debug_ga") === "1");
    }
    if (w.__ga_debug) {
      console.log("[GA4]", name, params);
    }
  } catch {
    /* noop */
  }
  const w = window as unknown as { gtag?: (...args: any[]) => void };
  if (!w.gtag || !GA4_ID) return;
  w.gtag("event", name, {
    ...params,
    send_to: GA4_ID,
    debug_mode: (window as any).__ga_debug ? 1 : undefined,
  });
}
