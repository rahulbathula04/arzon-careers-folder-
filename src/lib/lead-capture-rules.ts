/**
 * Arzon Student Acquisition Rules Engine
 * 
 * Doctrine: "Acquire students without torturing them."
 * Rules:
 *  1. Zero Redundancy: Never prompt a student who has already provided their contact info or claimed a guide.
 *  2. Quiet Zones: Never prompt on focus-critical routes (assessments, exams, tests, admin, checkout).
 *  3. Session Courtesy: Maximum 1 prompt per visit/session.
 *  4. Respectful Dismissal: If a user clicks close, do not nag them again for 7 days.
 *  5. Dwell & Depth: Only prompt after real engagement (minimum 8s dwell + 50% scroll depth).
 */

const STORAGE_KEYS = {
  CLAIMED: "arzon_lead_magnet_claimed",
  STUDENT_CAPTURED: "arzon_student_lead_captured",
  ACRI_PROFILE: "arzon_acri_candidate_profile",
  LEGACY_PROFILE: "arzon_candidate_profile",
  USER_EMAIL: "arzon_user_email",
  STARTER_KIT_CLAIMED: "arzon_starter_kit_claimed",
  DISMISSED_UNTIL: "arzon_lead_magnet_dismissed_until",
  SESSION_SHOWN: "arzon_lead_magnet_shown_visit",
} as const;

const DISMISSAL_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Checks if the student has ALREADY converted on this device.
 * If true, any lead magnet or capture popup MUST remain permanently silent.
 */
export function hasStudentAlreadyConverted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // 1. Explicit claim flags
    if (localStorage.getItem(STORAGE_KEYS.CLAIMED) === "true") return true;
    if (localStorage.getItem(STORAGE_KEYS.STUDENT_CAPTURED) === "true") return true;
    if (localStorage.getItem(STORAGE_KEYS.STARTER_KIT_CLAIMED) === "true") return true;

    // 2. Candidate profile already stored from previous submission
    const acriProfile = localStorage.getItem(STORAGE_KEYS.ACRI_PROFILE);
    if (acriProfile && acriProfile !== "null" && acriProfile !== "{}") {
      try {
        const parsed = JSON.parse(acriProfile);
        if (parsed?.email || parsed?.mobile || parsed?.fullName) return true;
      } catch {
        return true;
      }
    }

    const legacyProfile = localStorage.getItem(STORAGE_KEYS.LEGACY_PROFILE);
    if (legacyProfile && legacyProfile !== "null") return true;

    // 3. User email stored
    if (localStorage.getItem(STORAGE_KEYS.USER_EMAIL)) return true;

    // 4. Session profile check
    const sessionProfile = sessionStorage.getItem(STORAGE_KEYS.ACRI_PROFILE);
    if (sessionProfile && sessionProfile !== "null") return true;
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

  // Rule 1: Zero Redundancy - Already converted?
  if (hasStudentAlreadyConverted()) {
    return false;
  }

  // Rule 2: Quiet Zones - Never interrupt on test, admin, or assessment pages
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/career-engine/test") ||
    pathname.startsWith("/acri/assessment") ||
    pathname.startsWith("/acri/test") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/test")
  ) {
    return false;
  }

  try {
    // Rule 3: Session Courtesy - Already shown or dismissed in this session?
    if (sessionStorage.getItem(STORAGE_KEYS.SESSION_SHOWN)) {
      return false;
    }

    // Rule 4: Respectful Dismissal - Dismissed within 7 days?
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
 * Enforces a 7-day cooldown so we do not bother them again.
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
