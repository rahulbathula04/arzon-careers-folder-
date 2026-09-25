/**
 * ACRI Candidate Invitation & Access Code Engine
 *
 * Manages the 100 invitation-only cohort seats for the ACRI assessment.
 * Both Practice and Certification modes require a valid, non-exhausted
 * invitation code issued by Arzon Global administrators.
 */

export type AcriInviteStatus = "available" | "active" | "completed" | "revoked";

export interface AcriInvitationCode {
  code: string;
  slotNumber: number;
  status: AcriInviteStatus;
  allowedMode: "both" | "certified" | "practice";
  assignedCandidateName?: string;
  assignedCandidateEmail?: string;
  redeemedAt?: string;
  completedAt?: string;
  score?: number;
  readinessBand?: string;
  notes?: string;
}

const STORAGE_KEY = "arzon_acri_100_invitation_codes_v1";

/**
 * Deterministically generates the 100 official ACRI cohort invitation codes
 * Format: ARZON-ACRI-001 through ARZON-ACRI-100
 */
export function generateDefault100Codes(): AcriInvitationCode[] {
  const codes: AcriInvitationCode[] = [];
  
  // A few realistic pre-seeded simulated candidates to demonstrate active/completed states in admin
  const preSeedStatus: Record<number, { status: AcriInviteStatus; name?: string; email?: string; score?: number; band?: string }> = {
    1: { status: "completed", name: "Ananya Sharma", email: "ananya.sharma@example.com", score: 92, band: "Industry Ready" },
    2: { status: "completed", name: "Rahul Verma", email: "rahul.verma@example.com", score: 86, band: "Industry Ready" },
    3: { status: "active", name: "Priya Patel", email: "priya.p@example.com" },
    4: { status: "active", name: "Vikram Malhotra", email: "vikram.m@example.com" },
  };

  for (let i = 1; i <= 100; i++) {
    const pad = i.toString().padStart(3, "0");
    const code = `ARZON-ACRI-${pad}`;
    const seeded = preSeedStatus[i];

    if (seeded) {
      codes.push({
        code,
        slotNumber: i,
        status: seeded.status,
        allowedMode: "both",
        assignedCandidateName: seeded.name,
        assignedCandidateEmail: seeded.email,
        redeemedAt: new Date(Date.now() - (105 - i) * 3600000).toISOString(),
        completedAt: seeded.score ? new Date().toISOString() : undefined,
        score: seeded.score,
        readinessBand: seeded.band,
        notes: `Official Cohort 2026 seat #${i}`,
      });
    } else {
      codes.push({
        code,
        slotNumber: i,
        status: "available",
        allowedMode: "both",
        notes: `Official Cohort 2026 seat #${i}`,
      });
    }
  }

  return codes;
}

/**
 * Loads all 100 invitation codes from storage (or creates default list if first run)
 */
export function getAcriInvitationCodes(): AcriInvitationCode[] {
  if (typeof window === "undefined") {
    return generateDefault100Codes();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = generateDefault100Codes();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // fallback
  }

  const fresh = generateDefault100Codes();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch {}
  return fresh;
}

/**
 * Saves updated codes list
 */
export function saveAcriInvitationCodes(codes: AcriInvitationCode[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
    // Trigger custom event so any open assessment or admin tabs can sync
    window.dispatchEvent(new CustomEvent("arzon:acri:codes-updated"));
  } catch (err) {
    console.error("Failed to save ACRI invitation codes:", err);
  }
}

/**
 * Validates whether an entered code exists and is eligible for testing
 */
export function validateAcriCode(inputCode: string): {
  isValid: boolean;
  codeObj?: AcriInvitationCode;
  errorMessage?: string;
} {
  const clean = (inputCode || "").trim().toUpperCase();
  if (!clean) {
    return { isValid: false, errorMessage: "Please enter your ACRI invitation code." };
  }

  const allCodes = getAcriInvitationCodes();
  const found = allCodes.find((c) => c.code.toUpperCase() === clean);

  if (!found) {
    return {
      isValid: false,
      errorMessage: `Invitation code "${clean}" not recognized. Please check your invitation email or contact your Arzon coordinator.`,
    };
  }

  if (found.status === "revoked") {
    return {
      isValid: false,
      errorMessage: "This invitation code has been revoked by the administrator.",
    };
  }

  if (found.status === "completed") {
    return {
      isValid: false,
      errorMessage: `This invitation code (${found.code}) has already completed the assessment with score ${found.score ?? "--"}/100. Each invitation is single-use.`,
    };
  }

  return { isValid: true, codeObj: found };
}

/**
 * Marks code as actively redeemed by candidate
 */
export function redeemAcriCode(
  code: string,
  candidateName?: string,
  candidateEmail?: string
): AcriInvitationCode | null {
  const allCodes = getAcriInvitationCodes();
  const index = allCodes.findIndex((c) => c.code.toUpperCase() === code.trim().toUpperCase());
  if (index === -1) return null;

  allCodes[index] = {
    ...allCodes[index],
    status: "active",
    redeemedAt: allCodes[index].redeemedAt || new Date().toISOString(),
    assignedCandidateName: candidateName || allCodes[index].assignedCandidateName || "Candidate",
    assignedCandidateEmail: candidateEmail || allCodes[index].assignedCandidateEmail,
  };

  saveAcriInvitationCodes(allCodes);
  return allCodes[index];
}

/**
 * Marks code as completed with final assessment score
 */
export function recordAcriAssessmentCompletion(
  code: string,
  score: number,
  readinessBand: string
): void {
  const allCodes = getAcriInvitationCodes();
  const index = allCodes.findIndex((c) => c.code.toUpperCase() === code.trim().toUpperCase());
  if (index === -1) return;

  allCodes[index] = {
    ...allCodes[index],
    status: "completed",
    completedAt: new Date().toISOString(),
    score,
    readinessBand,
  };

  saveAcriInvitationCodes(allCodes);
}

/**
 * Resets all 100 codes back to fresh initial state
 */
export function resetAcriCodes(): AcriInvitationCode[] {
  const fresh = generateDefault100Codes();
  saveAcriInvitationCodes(fresh);
  return fresh;
}
