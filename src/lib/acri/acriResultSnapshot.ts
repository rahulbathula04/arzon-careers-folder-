/**
 * ACRI Immutable Result Snapshot
 *
 * A result snapshot is created ONCE at assessment completion and is
 * never recalculated. The verification page reads from this snapshot.
 *
 * RULE: Old credentials must remain verifiable even after the scoring
 * engine, competency weights, or thresholds change. The snapshot is
 * the permanent record of what was measured and when.
 *
 * Storage:
 * - Client-side: stored in localStorage under ACRI_SNAPSHOT_KEY
 * - Future: persisted to Supabase for permanent credential verification
 *
 * Privacy:
 * - candidateDisplayName is candidate-controlled
 * - No private identifying data beyond what the candidate explicitly shared
 * - The public verification page shows only: role, score, readinessState,
 *   assessmentVersion, completedAt, credentialId, and competency names+status
 */

import type { AcriReadinessState } from "./acriReadiness";
import type { AcriCompetencyResult } from "@/data/acri/acriResultContracts";
import type { AcriCredential } from "./acriCredential";
import { generateSnapshotId } from "./acriCredential";

// ─── Snapshot Type ────────────────────────────────────────────────────────────

export interface AcriResultSnapshot {
  // Identity
  snapshotId: string;           // AZ-SNAP-XXXXXXXX
  attemptId: string;
  assessmentId: "ACRI-PV";
  assessmentVersion: string;    // "v1.0" at time of completion
  resultSchemaVersion: string;  // "v1" — bumped on schema changes

  // Candidate
  candidateDisplayName: string; // candidate-controlled
  candidateId?: string;         // only if authenticated

  // Score & Classification — IMMUTABLE
  compositeScore: number;
  readinessState: AcriReadinessState;
  role: string;
  assessmentMode: "certified" | "practice";

  // Competencies — frozen at time of completion
  competencies: AcriCompetencyResult[];
  strengths: { id: string; name: string; score: number }[];
  developmentAreas: { id: string; name: string; score: number; gap: number }[];

  // Credential
  credentialId: string | null;  // null for practice mode or below 80
  verificationUrl: string | null;
  credentialStatus: AcriCredential["status"] | null;

  // Timestamps
  completedAt: string;          // ISO 8601
  snapshotCreatedAt: string;    // ISO 8601
}

// ─── Snapshot Creation ────────────────────────────────────────────────────────

export interface CreateSnapshotInput {
  attemptId: string;
  assessmentVersion: string;
  resultSchemaVersion: string;
  candidateDisplayName: string;
  candidateId?: string;
  compositeScore: number;
  readinessState: AcriReadinessState;
  role: string;
  assessmentMode: "certified" | "practice";
  competencies: AcriCompetencyResult[];
  strengths: { id: string; name: string; score: number }[];
  developmentAreas: { id: string; name: string; score: number; gap: number }[];
  credentialId: string | null;
  verificationUrl: string | null;
  credentialStatus: AcriCredential["status"] | null;
}

export function createResultSnapshot(input: CreateSnapshotInput): AcriResultSnapshot {
  const now = new Date().toISOString();
  return {
    snapshotId: generateSnapshotId(),
    attemptId: input.attemptId,
    assessmentId: "ACRI-PV",
    assessmentVersion: input.assessmentVersion,
    resultSchemaVersion: input.resultSchemaVersion,
    candidateDisplayName: input.candidateDisplayName,
    candidateId: input.candidateId,
    compositeScore: input.compositeScore,
    readinessState: input.readinessState,
    role: input.role,
    assessmentMode: input.assessmentMode,
    competencies: input.competencies,
    strengths: input.strengths,
    developmentAreas: input.developmentAreas,
    credentialId: input.credentialId,
    verificationUrl: input.verificationUrl,
    credentialStatus: input.credentialStatus,
    completedAt: now,
    snapshotCreatedAt: now,
  };
}

// ─── Snapshot Storage (client-side, localStorage) ─────────────────────────────

const SNAPSHOT_KEY = "acri_result_snapshot_v1";

export function saveSnapshot(snapshot: AcriResultSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
    sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore quota errors
  }
}

export function loadSnapshot(): AcriResultSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      sessionStorage.getItem(SNAPSHOT_KEY) || localStorage.getItem(SNAPSHOT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AcriResultSnapshot;
  } catch {
    return null;
  }
}

export function clearSnapshot(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SNAPSHOT_KEY);
    localStorage.removeItem(SNAPSHOT_KEY);
  } catch {
    // ignore
  }
}

// ─── Snapshot → Public Verification Data (privacy-filtered) ──────────────────

/**
 * Extract only the data appropriate for the public verification page.
 * Never expose candidateId or other private fields.
 */
export interface AcriPublicVerification {
  credentialId: string;
  holderDisplayName: string;    // candidate-controlled display name
  role: string;
  compositeScore: number;
  readinessState: AcriReadinessState;
  assessmentVersion: string;
  completedAt: string;
  credentialStatus: AcriCredential["status"];
  /** Only competency names and pass/fail status — no raw scores on public page */
  verifiedCompetencies: { name: string; meetsThreshold: boolean }[];
}

export function extractPublicVerification(
  snapshot: AcriResultSnapshot,
): AcriPublicVerification | null {
  if (!snapshot.credentialId || !snapshot.credentialStatus) return null;
  return {
    credentialId: snapshot.credentialId,
    holderDisplayName: snapshot.candidateDisplayName,
    role: snapshot.role,
    compositeScore: snapshot.compositeScore,
    readinessState: snapshot.readinessState,
    assessmentVersion: snapshot.assessmentVersion,
    completedAt: snapshot.completedAt,
    credentialStatus: snapshot.credentialStatus,
    verifiedCompetencies: snapshot.competencies.map((c) => ({
      name: c.name,
      meetsThreshold: c.meetsThreshold,
    })),
  };
}
