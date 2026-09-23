/**
 * ACRI Result Contracts
 *
 * These interfaces define the data shape flowing from the scoring engine
 * through result components and into the credential system.
 *
 * IMPORTANT:
 * - These types are the UI layer contract — pure data, no business logic.
 * - All rendering components consume these types; they do not re-derive
 *   readiness state, scores, or credential IDs internally.
 * - readinessState is always derived via getAcriReadinessState() from
 *   acriReadiness.ts — never computed inline in a component.
 */

import type { AcriReadinessState } from "@/lib/acri/acriReadiness";

// ─── Single Competency Result ─────────────────────────────────────────────────

export interface AcriCompetencyResult {
  id: string;
  name: string;
  code: string;
  /** Score 0–100 */
  score: number;
  /** Minimum score required for Industry Ready classification */
  threshold: number;
  /** score >= threshold */
  meetsThreshold: boolean;
  /** Whether this competency is a critical operational gate */
  isCriticalGate: boolean;
  /** Derived classification for colour / icon selection */
  status: "above" | "at" | "below";
}

// ─── Strength / Development Summary ──────────────────────────────────────────

export interface AcriStrengthSummary {
  id: string;
  name: string;
  score: number;
  /** How far above the threshold (score - threshold) */
  surplusAboveThreshold: number;
  /** Short occupational behaviour description */
  behaviour: string;
}

export interface AcriDevelopmentSummary {
  id: string;
  name: string;
  score: number;
  /** Points needed to reach threshold (threshold - score) */
  gap: number;
  /** Recommended remediation path label */
  remediationPath: string;
}

// ─── Career Opportunity ───────────────────────────────────────────────────────

export interface AcriCareerOpportunity {
  role: string;
  note?: string;
}

// ─── Full Candidate-Facing Result ─────────────────────────────────────────────

/**
 * AcriCandidateResult is the complete data contract passed to all result
 * rendering components. It is produced once at assessment completion and
 * must not be recalculated from the current scoring engine after the fact.
 *
 * Internal gate and analytics data is NOT included here — see AcriInternalMetrics.
 */
export interface AcriCandidateResult {
  // Assessment metadata
  assessmentId: "ACRI-PV";
  assessmentVersion: string;
  resultSchemaVersion: string;
  role: string;
  assessmentMode: "certified" | "practice";
  completedAt: string; // ISO 8601

  // Score — single source of truth
  compositeScore: number; // 0–100

  // Readiness — derived via getAcriReadinessState(compositeScore)
  readinessState: AcriReadinessState;

  // Competency breakdown
  competencies: AcriCompetencyResult[];
  strengths: AcriStrengthSummary[];
  developmentAreas: AcriDevelopmentSummary[];

  // Tailored recommendations
  tailoredRemediation: string[];

  // Career opportunities (populated based on readiness state)
  careerOpportunities: AcriCareerOpportunity[];

  // Credential (only populated when mode === "certified" && readinessState === "industry_ready")
  credentialId: string | null;
  verificationUrl: string | null;

  // Snapshot reference for verification
  snapshotId: string;
}
