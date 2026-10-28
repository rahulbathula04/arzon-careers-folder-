/**
 * Arzon Student Acquisition Rules Engine
 * 
 * Rules:
 *  1. Immediate Section 2 Trigger: Every user (1st time or returning) crossing Section 2 gets the 2026 Recruiter Playbook offer.
 *  2. Quiet Zones: Never prompt on focus-critical test execution, exams, checkout, or admin terminals.
 *  3. In-View Courtesy: If dismissed during the current view, stay closed until next navigation or reload.
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

/**
 * Clean up any legacy suppression keys on startup so returning users and testers are never blocked.
 */
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem(STORAGE_KEYS.DISMISSED_UNTIL);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_SHOWN);
  } catch {}
}

/**
 * Check if candidate profile is saved for pre-filling (does not block modal).
 */
export function hasStudentAlreadyConverted(): boolean {
  // Always return false so first-time and returning visitors alike receive the prompt
  return false;
}

/**
 * Evaluates whether the lead magnet is eligible to be shown on the current route.
 */
export function isEligibleForLeadCapture(pathname: string): boolean {
  if (typeof window === "undefined") return false;

  // Quiet Zones: Never interrupt on active test terminal, checkout, or admin pages
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

  // Active for every user across all public marketing and career pages
  return true;
}

/**
 * Call when a student successfully submits their details.
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
  } catch (err) {
    console.warn("[leadCaptureRules] storage mark error:", err);
  }
}

/**
 * Call when a student clicks X or "Not now".
 */
export function markLeadAsDismissed() {
  // In-memory dismissal only for the active route view
}

/**
 * Developer helper.
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
