/**
 * ACRI Assessment State Machine
 *
 * RULE: Only transition functions exported from this module may change
 * the assessment phase. No component writes `phase` directly.
 *
 * The terminal (AcriAssessmentTerminal) is the orchestrator.
 * All other components fire events upward; the terminal calls these
 * transition functions and updates session state.
 */

// ─── Phase Enum ───────────────────────────────────────────────────────────────

export type AssessmentPhase =
  | "NOT_STARTED"
  | "READY"
  | "ACTIVE"
  | "SAVING"
  | "SAVED"
  | "REVIEW"
  | "SUBMITTING"
  | "SUBMITTED"
  | "PROCESSING_RESULT"
  | "RESULT_READY"
  | "NETWORK_LOST"
  | "RECOVERING"
  | "SESSION_EXPIRED"
  | "ERROR";

// ─── Transition Guards ────────────────────────────────────────────────────────

/**
 * Valid transitions map.
 * A phase may only move to one of its listed successors.
 */
export const VALID_TRANSITIONS: Record<AssessmentPhase, AssessmentPhase[]> = {
  NOT_STARTED:       ["READY"],
  READY:             ["ACTIVE"],
  ACTIVE:            ["SAVING", "REVIEW", "NETWORK_LOST", "SESSION_EXPIRED", "ERROR"],
  SAVING:            ["SAVED", "NETWORK_LOST", "ERROR"],
  SAVED:             ["ACTIVE"],
  REVIEW:            ["ACTIVE", "SUBMITTING"],
  SUBMITTING:        ["SUBMITTED", "NETWORK_LOST", "ERROR"],
  SUBMITTED:         ["PROCESSING_RESULT"],
  PROCESSING_RESULT: ["RESULT_READY", "ERROR"],
  RESULT_READY:      [],
  NETWORK_LOST:      ["RECOVERING", "SESSION_EXPIRED"],
  RECOVERING:        ["ACTIVE", "ERROR"],
  SESSION_EXPIRED:   [],
  ERROR:             [],
};

// ─── Transition Functions ────────────────────────────────────────────────────

export interface PhaseTransitionResult {
  success: boolean;
  nextPhase: AssessmentPhase;
  error?: string;
}

/**
 * Attempt a phase transition. Returns the new phase if valid,
 * or the current phase with an error if the transition is not allowed.
 */
export function transitionPhase(
  current: AssessmentPhase,
  next: AssessmentPhase,
): PhaseTransitionResult {
  const allowed = VALID_TRANSITIONS[current];
  if (!allowed.includes(next)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[ACRI StateMachine] Invalid transition: ${current} → ${next}. ` +
          `Allowed from ${current}: [${allowed.join(", ")}]`,
      );
    }
    return { success: false, nextPhase: current, error: `Invalid transition: ${current} → ${next}` };
  }
  return { success: true, nextPhase: next };
}

// ─── Named Transition Helpers ─────────────────────────────────────────────────

/** User clicks Start after briefing screen */
export function beginAssessment(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "ACTIVE").nextPhase;
}

/** Candidate submits an answer → autosave begins */
export function beginSave(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "SAVING").nextPhase;
}

/** Save completed successfully */
export function completeSave(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "SAVED").nextPhase;
}

/** After SAVED → resume active assessment */
export function resumeActive(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "ACTIVE").nextPhase;
}

/** Candidate clicks Submit → opens review screen */
export function openReview(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "REVIEW").nextPhase;
}

/** Candidate returns from review back to question */
export function closeReview(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "ACTIVE").nextPhase;
}

/** Candidate confirms submission from review screen */
export function confirmSubmit(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "SUBMITTING").nextPhase;
}

/** Submission received by system */
export function acknowledgeSubmission(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "SUBMITTED").nextPhase;
}

/** Scoring engine begins processing */
export function beginProcessing(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "PROCESSING_RESULT").nextPhase;
}

/** Result is ready to display */
export function resultReady(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "RESULT_READY").nextPhase;
}

/** Network connection lost */
export function networkLost(current: AssessmentPhase): AssessmentPhase {
  const result = transitionPhase(current, "NETWORK_LOST");
  if (!result.success) {
    // Network can be lost from any ACTIVE-adjacent state — coerce safely
    return "NETWORK_LOST";
  }
  return result.nextPhase;
}

/** Network reconnected — attempt recovery */
export function beginRecovery(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "RECOVERING").nextPhase;
}

/** Recovery succeeded — resume active */
export function recoverySucceeded(current: AssessmentPhase): AssessmentPhase {
  return transitionPhase(current, "ACTIVE").nextPhase;
}

/** Session expired (timeout or token expiry) */
export function sessionExpired(current: AssessmentPhase): AssessmentPhase {
  const result = transitionPhase(current, "SESSION_EXPIRED");
  if (!result.success) return "SESSION_EXPIRED";
  return result.nextPhase;
}

/** Unrecoverable error */
export function fatalError(current: AssessmentPhase): AssessmentPhase {
  return "ERROR";
}

// ─── Phase Derived Helpers ────────────────────────────────────────────────────

/** True when the candidate is in an actively answering state */
export function isAssessmentActive(phase: AssessmentPhase): boolean {
  return phase === "ACTIVE" || phase === "SAVING" || phase === "SAVED";
}

/** True when the assessment is complete (no more input accepted) */
export function isAssessmentComplete(phase: AssessmentPhase): boolean {
  return (
    phase === "SUBMITTING" ||
    phase === "SUBMITTED" ||
    phase === "PROCESSING_RESULT" ||
    phase === "RESULT_READY"
  );
}

/** True when timer should count down */
export function shouldTimerRun(phase: AssessmentPhase): boolean {
  return isAssessmentActive(phase) || phase === "REVIEW";
}

/** True when autosave indicator should show */
export function showAutosaveIndicator(phase: AssessmentPhase): boolean {
  return phase === "SAVING" || phase === "SAVED" || phase === "NETWORK_LOST";
}
