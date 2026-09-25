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
  /** Size of the active item bank battery */
  itemBankSize: number;
  /** Number of measured competencies */
  competencyCount: number;
  /** Role this battery evaluates */
  targetRole: string;
  /** Active regulatory guidelines governing this version */
  activeRegulations: string[];
}

export const CURRENT_ACRI_VERSION: AcriStandardVersion = {
  assessmentId: "ACRI-PV",
  version: "v1.1",
  resultSchemaVersion: "v2",
  certificateTemplateVersion: "v2",
  releasedAt: "2026-03-01T00:00:00Z",
  itemBankSize: 40,
  competencyCount: 9,
  targetRole: "Pharmacovigilance Associate",
  activeRegulations: [
    "ICH E2D(R1) Step 4 (2025)",
    "EMA GVP Module VI (Rev 2 + 2025 Updates)",
    "EMA GVP Module IX (Signal Management)",
    "CDSCO 2024 Guidance for Marketing Authorization Holders",
    "US FDA 21 CFR 314.80 (Postmarketing Reporting)",
    "MedDRA Term Selection: Points to Consider v27.0",
    "WHO-UMC Causality Assessment Table",
  ],
};

export const ACRI_PV_CURRENT_VERSION = CURRENT_ACRI_VERSION.version;

