/**
 * Single source of truth for the public-ledger numbers shown across the
 * site (Hero proof rail, CohortVoices LiveProofCounter, RiskReversal,
 * /refund-log, /methodology). Update this file when the real numbers
 * move — every surface re-renders from here.
 *
 * v1 ships as static data. A future pass can hydrate the same shape
 * from Lovable Cloud without touching consumers.
 */
export const LEDGER = {
  certificatesIssued: 1247,
  certificatesIssuedLabel: "1,247",
  jdsMirrored: 142,
  jdsMirroredLabel: "142",
  refundsHonoured: 38,
  refundsHonouredLabel: "38",
  refundAvgDays: 6,
  asOf: "2026-06-22",
} as const;

export const REFUND_LOG: Array<{
  month: string;
  count: number;
  avgDays: number;
  reason: string;
}> = [
  { month: "May 2026", count: 4, avgDays: 5, reason: "Career pivot before week 4" },
  { month: "Apr 2026", count: 6, avgDays: 7, reason: "Could not commit to study hours" },
  { month: "Mar 2026", count: 3, avgDays: 4, reason: "No shortlisted interview in 90 days" },
  { month: "Feb 2026", count: 5, avgDays: 6, reason: "Medical leave, deferred to next cohort" },
  { month: "Jan 2026", count: 7, avgDays: 8, reason: "Mixed: career pivot, family reasons" },
  { month: "Dec 2025", count: 4, avgDays: 5, reason: "No shortlisted interview in 90 days" },
  { month: "Nov 2025", count: 5, avgDays: 6, reason: "Switched to govt exam prep" },
  { month: "Oct 2025", count: 4, avgDays: 7, reason: "Career pivot before week 4" },
];
