function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  try {
    const w2 = window;
    if (w2.__ga_debug === void 0) {
      const qs = new URLSearchParams(window.location.search);
      w2.__ga_debug = qs.get("debug_ga") === "1" || typeof localStorage !== "undefined" && localStorage.getItem("debug_ga") === "1";
    }
    if (w2.__ga_debug) {
      console.log("[GA4]", name, params);
    }
  } catch {
  }
  return;
}
export {
  trackEvent as t
};
