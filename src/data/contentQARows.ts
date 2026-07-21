/**
 * 70/20/10 content rebalance checklist rows. Mirrors the per-page
 * audit in docs/70-20-10-audit.md. Reviewers tick each row off on the
 * Content QA page before a deployment is promoted.
 */
export type Bucket = "desire" | "proof" | "sell" | "rescue";

export type QARow = {
  page: string;
  sectionId: string;
  label: string;
  bucket: Bucket;
  action: "added" | "trimmed" | "kept" | "rescue";
  notes?: string;
};

export const CONTENT_QA_ROWS: QARow[] = [
  // ───── Home ( / ) ─────
  {
    page: "/",
    sectionId: "hero",
    label: "Hero (kept) — primary deployment-ready promise + Apply CTA",
    bucket: "sell",
    action: "kept",
  },
  {
    page: "/",
    sectionId: "day-in-the-life",
    label: "Day-in-the-life strip (added)",
    bucket: "desire",
    action: "added",
  },
  {
    page: "/",
    sectionId: "bento-programmes",
    label: "Bento programmes (kept) — anchor #programmes",
    bucket: "desire",
    action: "kept",
  },
  {
    page: "/",
    sectionId: "domain-grid-removed",
    label: "Pick-your-domain grid (removed)",
    bucket: "sell",
    action: "trimmed",
  },
  {
    page: "/",
    sectionId: "scroll-rescue",
    label: "Legacy /#domains → /#programmes scroll rescue",
    bucket: "rescue",
    action: "rescue",
    notes: "Verify analytics event home_domain_grid_search_signal fires.",
  },
  {
    page: "/",
    sectionId: "recruiter-band",
    label: "Recruiter band (kept) — IQVIA / Cognizant / Parexel",
    bucket: "proof",
    action: "kept",
  },

  // ───── Courses ( /courses ) ─────
  {
    page: "/courses",
    sectionId: "tools-you-touch",
    label: "Tools-you-touch strip (added) — Argus, MedDRA, etc.",
    bucket: "desire",
    action: "added",
  },
  {
    page: "/courses",
    sectionId: "recruiter-quote",
    label: "Recruiter quote strip (added)",
    bucket: "proof",
    action: "added",
  },
  {
    page: "/courses",
    sectionId: "courses-grid",
    label: "Courses grid (kept)",
    bucket: "desire",
    action: "kept",
  },
  {
    page: "/courses",
    sectionId: "duplicate-apply",
    label: "Duplicate Apply blocks (trimmed) — cap 3 per page",
    bucket: "sell",
    action: "trimmed",
  },
];
