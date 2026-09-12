/**
 * Arzon Global & Arzon Careers · Internal Claims & Evidence Governance Register.
 *
 * Enforces strict evidence auditing across all marketing copy, positioning,
 * and statistical statements on the platform.
 */

export interface ClaimItem {
  id: string;
  claimText: string;
  category: "research_dataset" | "certification" | "curriculum" | "internship" | "employability";
  evidenceStatus: "verified_empirical" | "verified_system" | "in_review";
  evidenceSource: string;
  verificationUrl?: string;
  methodologySummary: string;
}

export const CLAIMS_REGISTER: ClaimItem[] = [
  {
    id: "jd-analysis-300",
    claimText: "Syllabus derived from direct analysis of 300+ entry-level healthcare and life science job descriptions.",
    category: "research_dataset",
    evidenceStatus: "verified_empirical",
    evidenceSource: "Arzon Career Intelligence Empirical JD Scraping & Competency Extraction System (2025–2026)",
    verificationUrl: "/research/2026-hyderabad-healthcare-training-living-cost-report",
    methodologySummary: "Analyzed 300+ public job descriptions across Hyderabad, Bengaluru, Chennai, and Mumbai GCC hubs to extract mandatory software tools, coding guidelines, and entry competencies."
  },
  {
    id: "iso-9001-certification",
    claimText: "ISO 9001:2015 Quality Management System Verifiable Credentials.",
    category: "certification",
    evidenceStatus: "verified_system",
    evidenceSource: "ISO 9001 Certified Training & Quality Management Framework",
    verificationUrl: "/verify",
    methodologySummary: "All capstone internship certificates carry QR verification codes linked directly to the public cryptographic verification portal at arzoncareers.in/verify."
  },
  {
    id: "mercer-mettl-employability",
    claimText: "Mercer | Mettl 2025 Graduate Employability Benchmark: 42.6% overall employability among Indian graduates.",
    category: "employability",
    evidenceStatus: "verified_empirical",
    evidenceSource: "Mercer | Mettl India Graduate Employability Report 2025 (1M+ students evaluated across 2,700+ campuses)",
    verificationUrl: "/research",
    methodologySummary: "Highlights the gap between academic qualifications and industry role-readiness, establishing the core rationale for practical software tool preparation."
  },
  {
    id: "12-week-role-training",
    claimText: "12-Week Blended Preparation & Applied Capstone Internship.",
    category: "curriculum",
    evidenceStatus: "verified_system",
    evidenceSource: "Arzon Standard 12-Week Role Training System",
    verificationUrl: "/training",
    methodologySummary: "Combines 8 weeks of blended software tool mastery (Oracle Argus, ICD-10, Medidata RAVE, SAS) with 4 weeks of applied capstone project execution."
  }
];

export function getVerifiedClaim(claimId: string): ClaimItem | undefined {
  return CLAIMS_REGISTER.find(c => c.id === claimId);
}
