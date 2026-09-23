/**
 * ACRI Internal Assessment Analytics
 *
 * CRITICAL: This type is for INTERNAL USE ONLY.
 * Do NOT expose AcriInternalMetrics to candidate-facing components,
 * result pages, certificate, share cards, or verification pages.
 *
 * Internal data is:
 * - Used for assessment integrity validation
 * - Used for admin analytics dashboards
 * - Stored separately from AcriCandidateResult
 * - Never included in the result snapshot sent to the candidate
 *
 * Critical gate results (ICSR validity, expedited timelines, safety triage)
 * live here — NOT in the candidate classification. The candidate's readiness
 * state is determined solely by composite score via getAcriReadinessState().
 */

// ─── Item-Level Analytics ─────────────────────────────────────────────────────

export interface AcriItemAnalytic {
  itemId: string;
  competencyId: string;
  response: unknown;
  /** True if response matched the correct answer / rubric threshold */
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
  /** ms spent on this item before answering */
  timeSpentMs: number;
  /** Whether candidate flagged this item for review */
  flagged: boolean;
  /** Unix timestamp (ms) when answer was first recorded */
  answeredAt: number;
}

// ─── Gate Result Analytics ────────────────────────────────────────────────────

/**
 * Internal gate results — NOT shown to candidate.
 * Used by admin analytics and future audit trails.
 */
export interface AcriGateAnalytic {
  gateId: string;
  gateName: string;
  dimensionCode: string;
  dimensionScore: number;
  minRequired: number;
  passed: boolean;
  /** Remediation path if failed (admin use only) */
  remediationPath?: string;
}

// ─── Integrity Event ──────────────────────────────────────────────────────────

export type AcriIntegrityEventType =
  | "tab_blur"
  | "tab_focus"
  | "paste_detected"
  | "rapid_succession_answer"
  | "session_resume"
  | "network_interruption"
  | "time_warning_shown"
  | "time_critical_shown"
  | "review_opened"
  | "review_closed";

export interface AcriIntegrityEvent {
  type: AcriIntegrityEventType;
  timestamp: number; // Unix ms
  metadata?: Record<string, unknown>;
}

// ─── Full Internal Metrics ────────────────────────────────────────────────────

export interface AcriInternalMetrics {
  attemptId: string;
  sessionId: string;
  assessmentVersion: string;
  assessmentMode: "certified" | "practice";
  startedAt: number;
  submittedAt: number;
  totalTimeSpentMs: number;

  /** Per-item analytics */
  itemAnalytics: AcriItemAnalytic[];

  /** Gate results — INTERNAL ONLY, never exposed to candidate */
  gateResults: AcriGateAnalytic[];

  /** Integrity event log */
  integrityEvents: AcriIntegrityEvent[];

  /** Raw response timestamps: itemId → unix ms of last answer change */
  responseTimestamps: Record<string, number>;
}
