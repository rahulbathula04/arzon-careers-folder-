import type { AIRisk, Course } from "./courses";

/**
 * Honest per-course extras layered on top of the core Course data without
 * editing every entry. Fall back to safe defaults when a slug isn't listed.
 */
const RISK_BY_SLUG: Record<string, AIRisk> = {
  "medical-coding": "augmented",
  pharmacovigilance: "augmented",
  "clinical-data-management": "audit",
  "sas-clinical": "audit",
  "regulatory-affairs": "audit",
  nanoscience: "resistant",
  "ai-intelligence": "resistant",
  "machine-learning": "resistant",
  "ethical-hacking": "resistant",
  "full-stack": "augmented",
  "data-science": "augmented",
};

const RISK_LABEL: Record<AIRisk, string> = {
  augmented: "AI-augmented role",
  audit: "AI-audit role",
  resistant: "AI-resistant role",
};

const RISK_TONE: Record<AIRisk, string> = {
  augmented: "border-amber-500/60 bg-amber-500 text-[#1a1300]",
  audit: "border-sky-700/40 bg-sky-600 text-white",
  resistant: "border-sky-700/40 bg-sky-600 text-white",
};

export function getAIRisk(course: Course): AIRisk {
  return course.aiRisk ?? RISK_BY_SLUG[course.slug] ?? "augmented";
}

export function aiRiskMeta(risk: AIRisk) {
  return { label: RISK_LABEL[risk], tone: RISK_TONE[risk] };
}

/**
 * Derive a Year-1 → Year-3 salary band from the course's salary string
 * ("₹3 – 6 LPA"). Year-1 = lower bound, Year-3 = upper bound (rough proxy).
 */
export function getSalaryBand(course: Course): { y1: string; y3: string } {
  if (course.salaryYear1 && course.salaryYear3) {
    return { y1: course.salaryYear1, y3: course.salaryYear3 };
  }
  const m = course.jd.salary.match(/₹\s*([\d.]+)\s*[–\-]\s*([\d.]+)\s*LPA/i);
  if (!m) return { y1: course.jd.salary, y3: course.jd.salary };
  return { y1: `₹${m[1]} LPA`, y3: `₹${m[2]} LPA` };
}

/**
 * Last-batch placement denominator. Uses the course override if present,
 * otherwise falls back to the global Mar-2026 cohort number.
 */
export function getLastBatch(course: Course): { placed: number; total: number } {
  return course.lastBatch ?? { placed: 23, total: 28 };
}
