/**
 * Arzon Careers V2 public information architecture.
 * Marketing pages can be broad for SEO, but the user-facing hierarchy stays small.
 */

export type ArzonPrimaryNavItem =
  | "careers"
  | "programmes"
  | "intelligence"
  | "institutions"
  | "why"
  | "about";

export const ARZON_PRIMARY_NAV: ReadonlyArray<{
  key: ArzonPrimaryNavItem;
  label: string;
  description: string;
}> = [
  { key: "careers", label: "Careers", description: "Explore healthcare roles and career paths." },
  { key: "programmes", label: "Programmes", description: "Build skills and evidence for a target role." },
  { key: "intelligence", label: "Career Intelligence", description: "Use jobs, salary, research and readiness tools." },
  { key: "institutions", label: "For Institutions", description: "College and employer partnership paths." },
  { key: "why", label: "Why Arzon", description: "Evidence, methodology, credentials and outcomes." },
  { key: "about", label: "About", description: "Who Arzon is and how the platform works." },
];

export const ARZON_CORE_CAREERS = [
  { label: "Pharmacovigilance", href: "/industry/pharmacovigilance" },
  { label: "Medical Coding", href: "/industry/medical-coding" },
  { label: "Clinical Data Management", href: "/industry/clinical-data-management" },
  { label: "Clinical Research", href: "/industry/clinical-research" },
  { label: "Regulatory Affairs", href: "/industry/regulatory-affairs" },
  { label: "Medical Writing", href: "/industry/medical-writing" },
] as const;

export const ARZON_CORE_PROGRAMME_SLUGS = [
  "pharmacovigilance",
  "medical-coding",
  "clinical-data-management",
  "sas-clinical",
  "regulatory-affairs",
  "clinical-saas",
  "healthcare-rcm",
  "digital-health-fhir",
  "medical-writing",
  "bioinformatics",
  "ai-intelligence",
] as const;

export const ARZON_PROGRAMME_LINKS = [
  { label: "Role Readiness Programmes", href: "/courses" },
  { label: "Compare Programmes", href: "/courses/compare" },
  { label: "Upcoming Cohorts", href: "/cohorts" },
  { label: "Career Readiness Assessment", href: "/career-engine" },
] as const;

export const ARZON_INTELLIGENCE_LINKS = [
  { label: "Career Diagnostic", href: "/career-engine" },
  { label: "Healthcare Jobs", href: "/healthcare-jobs-for-freshers" },
  { label: "Salaries", href: "/industry/salaries" },
  { label: "Employers", href: "/industry/employers" },
  { label: "JD Skill Analyzer", href: "/tools/skill-gap-analyzer" },
  { label: "Research", href: "/research" },
] as const;

export const ARZON_INSTITUTION_LINKS = [
  { label: "For Colleges", href: "/tpos" },
  { label: "For Employers", href: "/recruiters" },
] as const;

export const ARZON_WHY_LINKS = [
  { label: "How Arzon Works", href: "/why-arzon" },
  { label: "Methodology", href: "/acri/methodology" },
  { label: "Readiness Assessment", href: "/acri" },
  { label: "Certificate Verification", href: "/verify" },
] as const;

/**
 * Legacy surfaces are kept for SEO or continuity, but they must not become
 * primary navigation destinations in V2.
 */
export const ARZON_LEGACY_SURFACES = [
  "/proof",
  "/proof-methodology",
  "/credibility",
  "/trust-report",
  "/deployment-model",
  "/republic",
  "/internships",
  "/enrol",
] as const;
