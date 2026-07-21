/**
 * Per-slug SEO overlay for course landing pages. Injects the high-intent
 * target keyword (city, "course", "internship") into <title>, meta
 * description and an H1 hint without changing the underlying course data.
 *
 * Keep titles ≤60 chars and descriptions ≤155 chars (Google truncation).
 */
export interface CourseSeoBoost {
  /** Full <title>. ≤60 chars. Includes the primary target keyword. */
  title: string;
  /** <meta description>. ≤155 chars. Includes the keyword + 1 differentiator. */
  description: string;
  /** Optional H1 override displayed at the top of the course hero. */
  h1?: string;
  /** Long-tail keywords used in hidden semantic copy and meta keywords. */
  keywords: string[];
}

/**
 * Indexed by course slug. Only slugs we're actively ranking for live here —
 * other courses fall back to the auto-generated title/description.
 */
export const COURSE_SEO_BOOST: Record<string, CourseSeoBoost> = {
  pharmacovigilance: {
    title: "Pharmacovigilance Course in Hyderabad · Arzon Global",
    description:
      "Pharmacovigilance internship & course with Argus, MedDRA, ICSR cases and an ISO-aligned verifiable certificate. 12-week cohort. Hyderabad + online.",
    h1: "Pharmacovigilance Course & Internship in Hyderabad",
    keywords: [
      "pharmacovigilance internship",
      "pharmacovigilance course in Hyderabad",
      "best pharmacovigilance training institute in India",
      "pharmacovigilance jobs in Hyderabad",
      "Argus Safety training",
      "ICSR case processing course",
    ],
  },
  "medical-coding": {
    title: "Medical Coding Course in Hyderabad · CPC Prep · Arzon",
    description:
      "Medical coding internship covering ICD-10-CM, CPT, HCPCS and CPC exam prep. 12-week cohort, capstone audit, verifiable certificate. Hyderabad + online.",
    h1: "Medical Coding Course & Internship in Hyderabad (CPC Prep)",
    keywords: [
      "medical coding internship",
      "medical coding course in Hyderabad",
      "medical coding jobs for freshers",
      "medical coding salary in India",
      "CPC certification training",
      "ICD-10-CM and CPT coding course",
    ],
  },
  "clinical-data-management": {
    title: "Clinical Data Management Course · Rave / Veeva · Arzon",
    description:
      "Clinical data management internship with Medidata Rave, Veeva, CDASH and SDTM exposure. 12-week cohort, real study build, verifiable certificate.",
    h1: "Clinical Data Management Course & Internship (Rave / Veeva)",
    keywords: [
      "clinical data management internship",
      "clinical data management course",
      "clinical data management jobs in Bangalore",
      "Medidata Rave training",
      "Veeva clinical data course",
      "CDISC SDTM training India",
    ],
  },
  "regulatory-affairs": {
    title: "Regulatory Affairs Course India · eCTD · Arzon Global",
    description:
      "Pharmaceutical regulatory affairs course covering FDA, EMA, CDSCO pathways and eCTD dossier building. 12-week cohort with verifiable certificate.",
    h1: "Pharmaceutical Regulatory Affairs Course (India)",
    keywords: [
      "regulatory affairs course India",
      "pharmaceutical regulatory affairs training",
      "eCTD dossier course",
      "regulatory affairs jobs for freshers",
    ],
  },
  "sas-clinical": {
    title: "SAS Clinical Programming Course · SDTM/ADaM · Arzon",
    description:
      "SAS clinical programming course with Base SAS, macros, SDTM, ADaM and TLF authoring for clinical submissions. 12-week cohort, verifiable certificate.",
    h1: "SAS Clinical Programming Course (SDTM, ADaM, TLF)",
    keywords: [
      "SAS clinical programming course",
      "SDTM ADaM training",
      "SAS programmer course India",
    ],
  },
};
