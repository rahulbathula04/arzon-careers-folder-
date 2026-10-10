/**
 * Organic acquisition registry.
 *
 * This is the canonical planning layer for SEO/GEO expansion. It intentionally
 * contains intent and URL patterns rather than thousands of generated pages.
 * A route should only be generated when its underlying data is real and the
 * resulting page adds information beyond a keyword substitution.
 */

export type SeoIntent =
  | "career"
  | "jobs"
  | "degree"
  | "eligibility"
  | "salary"
  | "employer"
  | "location"
  | "research"
  | "tool"
  | "comparison";

export interface SeoCluster {
  id: string;
  intent: SeoIntent;
  label: string;
  priority: "P0" | "P1" | "P2";
  seedTopics: readonly string[];
  urlPatterns: readonly string[];
  conversion: "career-engine" | "tool" | "research" | "programme";
}

export const SEO_GROWTH_CLUSTERS: readonly SeoCluster[] = [
  {
    id: "brand-trust",
    intent: "career",
    label: "Arzon Global brand verification & reviews",
    priority: "P0",
    seedTopics: [
      "arzon global careers",
      "arzon global is real or fake",
      "arzon global labs internship",
      "arzon global reviews",
      "arzon global lab",
      "arzon global photos",
      "arzon global is real or fake internship",
      "arzon global labs salary",
    ],
    urlPatterns: ["/why-arzon", "/reviews", "/internships", "/careers", "/verify", "/industry/salaries"],
    conversion: "career-engine",
  },
  {
    id: "career-role",
    intent: "career",
    label: "Healthcare career roles",
    priority: "P0",
    seedTopics: [
      "pharmacovigilance",
      "medical coding",
      "clinical data management",
      "clinical SAS",
      "regulatory affairs",
      "clinical research",
    ],
    urlPatterns: ["/roles/:role", "/careers/:degree"],
    conversion: "career-engine",
  },
  {
    id: "fresher-jobs",
    intent: "jobs",
    label: "Healthcare jobs for freshers",
    priority: "P0",
    seedTopics: [
      "healthcare jobs for freshers",
      "pharmacovigilance jobs for freshers",
      "medical coding jobs for freshers",
      "clinical research jobs for freshers",
    ],
    urlPatterns: ["/healthcare-jobs-for-freshers", "/industry/:role/:city"],
    conversion: "career-engine",
  },
  {
    id: "degree-careers",
    intent: "degree",
    label: "Degree to career pathways",
    priority: "P0",
    seedTopics: [
      "jobs after B.Pharm",
      "jobs after Pharm.D",
      "jobs after M.Pharm",
      "jobs after B.Sc life sciences",
      "jobs after M.Sc life sciences",
    ],
    urlPatterns: ["/degrees/:degree", "/careers/:degree"],
    conversion: "career-engine",
  },
  {
    id: "eligibility",
    intent: "eligibility",
    label: "Role and programme eligibility",
    priority: "P0",
    seedTopics: [
      "pharmacovigilance eligibility",
      "medical coding eligibility",
      "clinical data management eligibility",
      "regulatory affairs eligibility",
    ],
    urlPatterns: ["/roles/:role", "/degrees/:degree"],
    conversion: "career-engine",
  },
  {
    id: "salary",
    intent: "salary",
    label: "Healthcare salary intelligence",
    priority: "P1",
    seedTopics: [
      "pharmacovigilance salary India",
      "medical coder salary India",
      "clinical data associate salary",
      "clinical SAS programmer salary",
      "regulatory affairs salary",
    ],
    urlPatterns: ["/industry/salaries", "/industry/:role/:city"],
    conversion: "research",
  },
  {
    id: "employer",
    intent: "employer",
    label: "Employer and hiring intelligence",
    priority: "P1",
    seedTopics: [
      "companies hiring pharmacovigilance freshers",
      "medical coding companies",
      "clinical research companies",
      "healthcare employers Hyderabad",
    ],
    urlPatterns: ["/industry/employers", "/industry/:role/:city"],
    conversion: "career-engine",
  },
  {
    id: "location",
    intent: "location",
    label: "City career intelligence",
    priority: "P1",
    seedTopics: [
      "healthcare jobs Hyderabad",
      "pharmacovigilance jobs Hyderabad",
      "medical coding jobs Hyderabad",
      "clinical research jobs Bengaluru",
      "healthcare jobs Chennai",
      "healthcare jobs Pune",
    ],
    urlPatterns: ["/locations/:city", "/industry/:role/:city"],
    conversion: "career-engine",
  },
  {
    id: "research",
    intent: "research",
    label: "Original workforce intelligence",
    priority: "P0",
    seedTopics: [
      "pharmacovigilance job market",
      "medical coding job market",
      "clinical data job market",
      "healthcare skills demand",
      "healthcare JD analysis",
    ],
    urlPatterns: ["/resources/:report"],
    conversion: "research",
  },
  {
    id: "tools",
    intent: "tool",
    label: "Free career tools",
    priority: "P0",
    seedTopics: [
      "healthcare career finder",
      "career eligibility checker",
      "JD skill gap analyzer",
      "healthcare salary explorer",
      "career path finder",
    ],
    urlPatterns: ["/tools/:tool", "/career-engine"],
    conversion: "tool",
  },
  {
    id: "comparisons",
    intent: "comparison",
    label: "Career path comparisons",
    priority: "P1",
    seedTopics: [
      "pharmacovigilance vs medical coding",
      "clinical data management vs clinical SAS",
      "regulatory affairs vs pharmacovigilance",
    ],
    urlPatterns: ["/comparisons/:comparison"],
    conversion: "career-engine",
  },
] as const;

export const SEO_GROWTH_CITIES = [
  "hyderabad",
  "bengaluru",
  "chennai",
  "pune",
  "mumbai",
  "delhi-ncr",
  "ahmedabad",
  "kochi",
] as const;

export const SEO_GROWTH_GUARDRAILS = {
  requireUniqueData: true,
  requireOriginalAnalysis: true,
  allowDoorwayPages: false,
  allowSyntheticJobs: false,
  allowSyntheticReviews: false,
  allowUnsupportedEmployerClaims: false,
  allowKeywordStuffing: false,
} as const;
