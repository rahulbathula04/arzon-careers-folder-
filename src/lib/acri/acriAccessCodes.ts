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
  assignedCandidateMobile?: string;
  qualification?: string;
  college?: string;
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
  // Legacy UI cache only. Certification authorization is server-side in
  // public.acri_invitations and must never depend on localStorage.
  return Array.from({ length: 100 }, (_, index) => {
    const slotNumber = index + 1;
    return {
      code: `UNISSUED-${slotNumber.toString().padStart(3, "0")}`,
      slotNumber,
      status: "available" as AcriInviteStatus,
      allowedMode: "certified" as const,
      notes: "Legacy display placeholder. Not a valid assessment credential.",
    };
  });
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
    const parsed: AcriInvitationCode[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Legacy cache contains no candidate PII.\n      return parsed;
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
 * Allocates the next available unassigned code to an applicant
 */
export function allocateNextAvailableAcriCode(candidate: {
  fullName: string;
  email: string;
  mobile?: string;
  qualification?: string;
  collegeUniversity?: string;
  notes?: string;
}): AcriInvitationCode | null {
  const allCodes = getAcriInvitationCodes();
  const existing = allCodes.find(
    (c) => c.assignedCandidateEmail?.toLowerCase() === candidate.email.trim().toLowerCase()
  );
  if (existing) return existing;

  const availableIndex = allCodes.findIndex((c) => c.status === "available");
  if (availableIndex === -1) return null;

  const qualInfo = [candidate.qualification, candidate.collegeUniversity].filter(Boolean).join(" · ");
  const mobileInfo = candidate.mobile ? `Mobile: ${candidate.mobile}` : "";
  const combinedNotes = [mobileInfo, qualInfo, candidate.notes].filter(Boolean).join(" | ");

  allCodes[availableIndex] = {
    ...allCodes[availableIndex],
    status: "active",
    assignedCandidateName: candidate.fullName.trim(),
    assignedCandidateEmail: candidate.email.trim(),
    assignedCandidateMobile: candidate.mobile?.trim(),
    redeemedAt: new Date().toISOString(),
    notes: combinedNotes || allCodes[availableIndex].notes,
  };

  saveAcriInvitationCodes(allCodes);
  return allCodes[availableIndex];
}

/**
 * Assigns a specific seat slot number to a candidate
 */
export function assignCandidateToSeat(
  slotNumber: number,
  candidate: { fullName: string; email: string; mobile?: string }
): AcriInvitationCode | null {
  const allCodes = getAcriInvitationCodes();
  const index = allCodes.findIndex((c) => c.slotNumber === slotNumber);
  if (index === -1) return null;

  allCodes[index] = {
    ...allCodes[index],
    status: "active",
    assignedCandidateName: candidate.fullName.trim(),
    assignedCandidateEmail: candidate.email.trim(),
    redeemedAt: new Date().toISOString(),
    notes: candidate.mobile ? `Mobile: ${candidate.mobile}` : allCodes[index].notes,
  };

  saveAcriInvitationCodes(allCodes);
  return allCodes[index];
}

/**
 * Releases a seat back to available unassigned status
 */
export function releaseAcriSeat(slotNumber: number): AcriInvitationCode | null {
  const allCodes = getAcriInvitationCodes();
  const index = allCodes.findIndex((c) => c.slotNumber === slotNumber);
  if (index === -1) return null;

  allCodes[index] = {
    ...allCodes[index],
    status: "available",
    assignedCandidateName: undefined,
    assignedCandidateEmail: undefined,
    redeemedAt: undefined,
    completedAt: undefined,
    score: undefined,
    readinessBand: undefined,
  };

  saveAcriInvitationCodes(allCodes);
  return allCodes[index];
}

/**
 * Resets all 100 codes back to fresh initial state
 */
export function resetAcriCodes(): AcriInvitationCode[] {
  const fresh = generateDefault100Codes();
  saveAcriInvitationCodes(fresh);
  return fresh;
}

