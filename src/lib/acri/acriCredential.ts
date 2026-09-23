/**
 * ACRI Credential System
 *
 * Credential IDs are generated once at assessment completion and are
 * stable identifiers that point to the immutable result snapshot.
 *
 * Credential ID format: AZ-ACRI-XXXXXX (6 char alphanumeric suffix)
 * Snapshot ID format:   AZ-SNAP-XXXXXXXX (8 char alphanumeric suffix)
 *
 * Only "certified" mode completions with readinessState === "industry_ready"
 * generate a credential. Practice mode completions do not.
 */

import type { AcriReadinessState } from "./acriReadiness";

// ─── Credential Status ────────────────────────────────────────────────────────

export type AcriCredentialStatus = "active" | "revoked" | "superseded" | "expired";

// ─── Credential Record ────────────────────────────────────────────────────────

export interface AcriCredential {
  credentialId: string;         // AZ-ACRI-XXXXXX
  snapshotId: string;           // AZ-SNAP-XXXXXXXX
  holderDisplayName: string;    // candidate-controlled display name
  role: string;
  score: number;
  readinessState: AcriReadinessState;
  assessmentVersion: string;    // e.g. "v1.0"
  certificateTemplateVersion: string;
  issuedAt: string;             // ISO 8601
  expiresAt: string | null;     // null = does not expire (current policy)
  status: AcriCredentialStatus;
  verificationUrl: string;      // https://arzon.global/verify?id=CREDENTIAL_ID
}

// ─── ID Generators ───────────────────────────────────────────────────────────

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I ambiguity

function randomSegment(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return result;
}

/**
 * Generate a stable credential ID.
 * Format: AZ-ACRI-XXXXXX
 * Only call once per completed certified attempt.
 */
export function generateCredentialId(): string {
  return `AZ-ACRI-${randomSegment(6)}`;
}

/**
 * Generate a snapshot ID (internal reference to the immutable result record).
 * Format: AZ-SNAP-XXXXXXXX
 */
export function generateSnapshotId(): string {
  return `AZ-SNAP-${randomSegment(8)}`;
}

/**
 * Generate an attempt ID (bound to one assessment session).
 * Format: ATT-XXXXXXXX
 */
export function generateAttemptId(): string {
  return `ATT-${randomSegment(8)}`;
}

// ─── URL Builder ─────────────────────────────────────────────────────────────

/**
 * Build the public verification URL for a credential.
 * The QR code on the certificate and result card must encode this URL.
 */
export function buildVerificationUrl(credentialId: string): string {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://arzon.global";
  return `${base}/verify?id=${credentialId}`;
}

// ─── Credential Creation ─────────────────────────────────────────────────────

export interface CreateCredentialInput {
  holderDisplayName: string;
  role: string;
  score: number;
  readinessState: AcriReadinessState;
  assessmentVersion: string;
  certificateTemplateVersion: string;
  snapshotId: string;
}

/**
 * Create a new credential record.
 * Only call when mode === "certified" and readinessState === "industry_ready".
 */
export function createCredential(input: CreateCredentialInput): AcriCredential {
  const credentialId = generateCredentialId();
  const verificationUrl = buildVerificationUrl(credentialId);
  return {
    credentialId,
    snapshotId: input.snapshotId,
    holderDisplayName: input.holderDisplayName,
    role: input.role,
    score: input.score,
    readinessState: input.readinessState,
    assessmentVersion: input.assessmentVersion,
    certificateTemplateVersion: input.certificateTemplateVersion,
    issuedAt: new Date().toISOString(),
    expiresAt: null, // does not expire under current policy
    status: "active",
    verificationUrl,
  };
}

// ─── Verification Helpers ─────────────────────────────────────────────────────

/** Regex pattern for valid ACRI credential IDs */
export const ACRI_CREDENTIAL_PATTERN = /^AZ-ACRI-[A-Z2-9]{6}$/;

export function isAcriCredentialId(id: string): boolean {
  return ACRI_CREDENTIAL_PATTERN.test(id.toUpperCase().trim());
}

export type CredentialVerifyState =
  | "valid_active"
  | "valid_revoked"
  | "valid_superseded"
  | "not_found"
  | "invalid_format";

export function classifyCredentialId(id: string): "acri" | "generic" | "invalid" {
  const normalized = id.toUpperCase().trim();
  if (isAcriCredentialId(normalized)) return "acri";
  if (/^(AG|AZ|CERT)-[A-Z0-9]{4,}/.test(normalized)) return "generic";
  return "invalid";
}
