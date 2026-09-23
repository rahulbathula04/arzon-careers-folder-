/**
 * ACRI Versioning Constants
 *
 * Bump rules:
 * - assessmentVersion:          any change to competency weights, thresholds, or item bank
 * - resultSchemaVersion:        any change to AcriResultSnapshot shape
 * - certificateTemplateVersion: any change to certificate visual layout
 *
 * Old credentials remain verifiable because the verify route reads from the
 * immutable result snapshot stored at time of completion, not by re-running
 * the current scoring engine.
 */

export interface AcriStandardVersion {
  /** Assessment identifier — fixed for this product */
  assessmentId: "ACRI-PV";
  /** Human-readable version label shown on certificate and result */
  version: string;
  /** Bumped when AcriResultSnapshot interface shape changes */
  resultSchemaVersion: string;
  /** Bumped when certificate visual template changes */
  certificateTemplateVersion: string;
  /** ISO 8601 release date */
  releasedAt: string;
  /** Size of the active item bank */
  itemBankSize: number;
  /** Number of measured competencies */
  competencyCount: number;
  /** Role this battery evaluates */
  targetRole: string;
}

export const CURRENT_ACRI_VERSION: AcriStandardVersion = {
  assessmentId: "ACRI-PV",
  version: "v1.0",
  resultSchemaVersion: "v1",
  certificateTemplateVersion: "v1",
  releasedAt: "2026-01-01T00:00:00Z",
  itemBankSize: 12,
  competencyCount: 9,
  targetRole: "Pharmacovigilance Associate",
};
