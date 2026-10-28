/**
 * Arzon Student Acquisition Rules Engine
 * 
 * Doctrine: "Acquire students with high-value intelligence, without torturing them."
 * Rules:
 *  1. Zero Redundancy: Never prompt a student who has already claimed this specific playbook or starter kit.
 *  2. Quiet Zones: Never prompt on focus-critical routes (active test terminals, exams, admin, checkout).
 *  3. Session Courtesy: Maximum 1 prompt per visit/session, unless explicitly summoned via debug or CTA.
 *  4. Respectful Dismissal: If a user clicks close, respect their choice with a 24-hour cooldown.
 *  5. Dwell & Depth: Prompt after real engagement (350px scroll or section reading dwell).
 *  6. Instant Developer/Preview Bypass: Query param `?leadmagnet=1` forces the modal to show.
 */

export const STORAGE_KEYS = {
  CLAIMED: "arzon_lead_magnet_claimed",
  STUDENT_CAPTURED: "arzon_student_lead_captured",
  ACRI_PROFILE: "arzon_acri_candidate_profile",
  USER_EMAIL: "arzon_user_email",
  STARTER_KIT_CLAIMED: "arzon_starter_kit_claimed",
  DISMISSED_UNTIL: "arzon_lead_magnet_dismissed_until",
  SESSION_SHOWN: "arzon_lead_magnet_shown_visit",
} as const;

// 24-hour respectful cooldown (reduced from overly aggressive 7 days)
export const DISMISSAL_COOLDOWN_MS = 24 * 60 * 60 * 1000;

/**
 * Checks if the student has ALREADY claimed this specific lead magnet on this device.
 * If true, the lead magnet card remains silent.
 */
export function hasStudentAlreadyConverted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // Debug bypass
    if (window.location.search.includes("leadmagnet=1") || (window as any).__FORCE_LEAD_MAGNET__) {
      return false;
    }

    // 1. Explicit lead magnet claim flags
    if (localStorage.getItem(STORAGE_KEYS.CLAIMED) === "true") return true;
    if (localStorage.getItem(STORAGE_KEYS.STARTER_KIT_CLAIMED) === "true") return true;
    if (localStorage.getItem(STORAGE_KEYS.STUDENT_CAPTURED) === "true") return true;
  } catch {
    // In restricted storage environments, fail safe
  }
  return false;
}

/**
 * Evaluates whether the lead magnet is eligible to be shown right now.
 */
export function isEligibleForLeadCapture(pathname: string): boolean {
  if (typeof window === "undefined") return false;

  // Immediate preview bypass for developers, testing and link triggers
  if (
    window.location.search.includes("leadmagnet=1") ||
    window.location.search.includes("preview=leadmagnet") ||
    (window as any).__FORCE_LEAD_MAGNET__
  ) {
    return true;
  }

  // Rule 1: Zero Redundancy - Already converted for this lead magnet?
  if (hasStudentAlreadyConverted()) {
    return false;
  }

  // Rule 2: Quiet Zones - Never interrupt on test, admin, checkout or active simulation pages
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/career-engine/test") ||
    pathname.startsWith("/acri/assessment") ||
    pathname.startsWith("/acri/test") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/test") ||
    pathname.startsWith("/learn/")
  ) {
    return false;
  }

  try {
    // Rule 3: Session Courtesy - Already shown or dismissed in this session?
    if (sessionStorage.getItem(STORAGE_KEYS.SESSION_SHOWN)) {
      return false;
    }

    // Rule 4: Respectful Dismissal - Dismissed within 24 hours?
    const dismissedUntil = localStorage.getItem(STORAGE_KEYS.DISMISSED_UNTIL);
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}

/**
 * Call when a student successfully submits their details.
 * Permanently suppresses any further lead magnet popups.
 */
export function markLeadAsConverted(profile: {
  fullName: string;
  email: string;
  mobile: string;
  qualification?: string;
}) {
  if (typeof window === "undefined") return;
  try {
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
    sessionStorage.setItem(STORAGE_KEYS.SESSION_SHOWN, "claimed");
  } catch (err) {
    console.warn("[leadCaptureRules] storage mark error:", err);
  }
}

/**
 * Call when a student clicks X, backdrop, or "Not now".
 * Enforces a 24-hour cooldown so we do not bother them again today.
 */
export function markLeadAsDismissed() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEYS.SESSION_SHOWN, "dismissed");
    localStorage.setItem(
      STORAGE_KEYS.DISMISSED_UNTIL,
      (Date.now() + DISMISSAL_COOLDOWN_MS).toString()
    );
  } catch (err) {
    console.warn("[leadCaptureRules] storage dismiss error:", err);
  }
}

/**
 * Developer and testing reset helper.
 */
if (typeof window !== "undefined") {
  (window as any).__resetLeadCapture = () => {
    localStorage.removeItem(STORAGE_KEYS.CLAIMED);
    localStorage.removeItem(STORAGE_KEYS.STUDENT_CAPTURED);
    localStorage.removeItem(STORAGE_KEYS.STARTER_KIT_CLAIMED);
    localStorage.removeItem(STORAGE_KEYS.DISMISSED_UNTIL);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_SHOWN);
    console.log("[Arzon] Lead capture storage reset. Ready to trigger.");
  };
}
