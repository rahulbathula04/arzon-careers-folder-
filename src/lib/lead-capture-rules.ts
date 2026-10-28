/**
 * Arzon Student Acquisition Rules Engine
 * 
 * Doctrine: "Any page across the website, one active time only. If undone/dismissed, it's done for the session."
 * Rules:
 *  1. Universal Route Availability: Available across ANY page on the website (not just assessment or home).
 *  2. Quiet Zones: Never prompt on focus-critical active exam simulation terminals (/career-engine/test, /acri/test) or admin.
 *  3. One Active Time, One Time Only: Once shown and dismissed (undone) or converted, it is done for that active browsing session.
 *  4. Instant Debug Bypass: URL parameter `?leadmagnet=1` forces preview regardless of session state.
 */

export const STORAGE_KEYS = {
  CLAIMED: "arzon_lead_magnet_claimed",
  STUDENT_CAPTURED: "arzon_student_lead_captured",
  ACRI_PROFILE: "arzon_acri_candidate_profile",
  USER_EMAIL: "arzon_user_email",
  STARTER_KIT_CLAIMED: "arzon_starter_kit_claimed",
  SESSION_DONE: "arzon_lead_magnet_session_done",
} as const;

/**
 * Remove legacy lockout keys from previous builds so users are never stuck in multi-day lockouts.
 */
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem("arzon_lead_magnet_dismissed_until");
    sessionStorage.removeItem("arzon_lead_magnet_shown_visit");
  } catch {}
}

/**
 * Checks if debug/testing mode is active via URL query parameters, hash, or window flag.
 * Supports: ?debug, ?popup, ?leadmagnet, ?preview, ?guide, #debug, #popup
 */
export function isDebugModeActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if ((window as any).__FORCE_LEAD_MAGNET__ === true) return true;
    const search = (window.location.search || "").toLowerCase();
    const hash = (window.location.hash || "").toLowerCase();
    return (
      search.includes("leadmagnet") ||
      search.includes("debug") ||
      search.includes("popup") ||
      search.includes("preview") ||
      search.includes("guide") ||
      hash.includes("leadmagnet") ||
      hash.includes("popup") ||
      hash.includes("debug")
    );
  } catch {
    return false;
  }
}

/**
 * Checks if the student has claimed this lead magnet.
 */
export function hasStudentAlreadyConverted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (isDebugModeActive()) {
      return false;
    }
    return localStorage.getItem(STORAGE_KEYS.CLAIMED) === "true";
  } catch {
    return false;
  }
}

/**
 * Evaluates whether the lead magnet is eligible to be shown right now.
 * Available on ANY page, but ONE ACTIVE TIME ONLY per session (if undone/dismissed, it's done).
 */
export function isEligibleForLeadCapture(pathname: string): boolean {
  if (typeof window === "undefined") return false;

  // Immediate preview/debug bypass for testing across any route
  if (isDebugModeActive()) {
    return true;
  }

  // Quiet Zones: Never interrupt on active test terminal (/career-engine/test, /acri/test) or admin
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/career-engine/test") ||
    pathname.startsWith("/acri/test")
  ) {
    return false;
  }

  // Doctrine: "Any page across the website, but one active time only per session. If undo/dismissed, it's done."
  // For each NEW session, sessionStorage is empty, so the user receives the pop-up when crossing Section 2.
  // Once dismissed (undone) or converted within this active session, it remains done for the rest of the session.
  try {
    if (sessionStorage.getItem(STORAGE_KEYS.SESSION_DONE)) {
      return false;
    }
  } catch {
    return false;
  }

  // Eligible on ANY page across the platform
  return true;
}

/**
 * Call when a student successfully submits their details.
 * Marks done for this session and permanent on device.
 */
export function markLeadAsConverted(profile: {
  fullName: string;
  email: string;
  mobile: string;
  qualification?: string;
}) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEYS.SESSION_DONE, "claimed");
    localStorage.setItem(STORAGE_KEYS.CLAIMED, "true");
    localStorage.setItem(STORAGE_KEYS.STUDENT_CAPTURED, "true");
    localStorage.setItem(STORAGE_KEYS.STARTER_KIT_CLAIMED, "true");
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, profile.email);
    localStorage.setItem(
      STORAGE_KEYS.ACRI_PROFILE,
      JSON.stringify({
        ...profile,
        consentedAt: new Date().toISOString(),
        legalConsentAccepted: true,
      })
    );
  } catch (err) {
    console.warn("[leadCaptureRules] storage mark error:", err);
  }
}

/**
 * Call when a student clicks X, backdrop, or "Not now".
 * "if its undo its done": marks it as done for this active browsing session.
 */
export function markLeadAsDismissed() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEYS.SESSION_DONE, "dismissed");
  } catch (err) {
    console.warn("[leadCaptureRules] storage dismiss error:", err);
  }
}

/**
 * Developer and testing helpers on window object.
 */
if (typeof window !== "undefined") {
  (window as any).__resetLeadCapture = () => {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_DONE);
    localStorage.removeItem(STORAGE_KEYS.CLAIMED);
    localStorage.removeItem(STORAGE_KEYS.STUDENT_CAPTURED);
    localStorage.removeItem(STORAGE_KEYS.STARTER_KIT_CLAIMED);
    (window as any).__FORCE_LEAD_MAGNET__ = false;
    window.dispatchEvent(new CustomEvent("arzon:reset-lead-magnet"));
    console.log("[Arzon Lead Magnet] Active session reset. Ready to trigger on Section 2.");
  };

  (window as any).__resetLeadMagnet = (window as any).__resetLeadCapture;

  (window as any).__openLeadMagnet = () => {
    (window as any).__FORCE_LEAD_MAGNET__ = true;
    window.dispatchEvent(new CustomEvent("arzon:open-lead-magnet"));
    console.log("[Arzon Lead Magnet] Force opened via window.__openLeadMagnet()");
  };

  (window as any).__debugLeadMagnet = () => {
    console.log("[Arzon Lead Magnet Diagnostics]", {
      pathname: window.location.pathname,
      search: window.location.search,
      sessionDone: sessionStorage.getItem(STORAGE_KEYS.SESSION_DONE),
      isClaimed: localStorage.getItem(STORAGE_KEYS.CLAIMED),
      isDebugActive: isDebugModeActive(),
      isEligible: isEligibleForLeadCapture(window.location.pathname),
    });
  };
}
