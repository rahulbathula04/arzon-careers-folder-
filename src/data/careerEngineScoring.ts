import type { ArchetypeId, Question, QuestionKind, Trait } from "./careerEngineQuestions";
import { QUESTIONS } from "./careerEngineQuestions";

// ─────────────────────────────────────────────
// Public types (kept stable - DB + result page depend on these)
// ─────────────────────────────────────────────

export interface PathRef {
  slug: string;
  title: string;
  salary: string;
}

export interface Archetype {
  id: ArchetypeId;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  topPaths: PathRef[];
  pathSlug: "pharma" | "tech" | "business";
  needs: string[];
  dealbreakers: string[];
}

export type RiskAlert = { level: "info" | "warn"; text: string };

export type ConfidenceBand = "highly_recommended" | "recommended" | "two_strong" | "exploratory";

export interface ArchetypeScore {
  id: ArchetypeId;
  archetype: Archetype;
  fit: number; // 0–100
}

export interface AnswerEvidence {
  questionId: string;
  kind: QuestionKind;
  prompt: string;
  chosenValue: string;
  chosenLabel: string;
  traitImpacts: { trait: Trait; delta: number }[];
  pathImpacts: { slug: string; title: string; delta: number }[];
  topArchetypeImpact: number;
  note?: string;
}

export interface ResultEvidence {
  summary: string;
  topDrivers: AnswerEvidence[];
  watchOuts: AnswerEvidence[];
  pathDrivers: Record<string, AnswerEvidence[]>;
  tieBreakers: string[];
  scoring: {
    answered: number;
    assessmentSize: number;
    topGap: number;
    topPathFits: { slug: string; title: string; fit: number }[];
  };
}

export interface ResultMeta {
  attemptId?: string | null;
  sessionId?: string | null;
  leadId?: string | null;
  assessmentSeed?: string | null;
  questionIds?: string[];
  answeredQuestionIds?: string[];
  createdAt?: string;
}

export interface AIAnalysisResult {
  skillGaps: string[];
  studyPlan: { week: number; focus: string; description: string }[];
  estimatedSalary: string;
  industryReadiness: number;
}

export interface CareerEngineResult {
  archetypeId: ArchetypeId;
  archetype: Archetype;
  fitScore: number;
  confidence: number;
  confidenceBand: ConfidenceBand;
  ranking: ArchetypeScore[];
  notFit: ArchetypeScore;
  notFitReasons: string[];
  microAccuracy: number;
  breakdown: {
    aptitude: number;
    interest: number;
    background: number;
    commitment: number;
  };
  risks: RiskAlert[];
  traitScores: Record<Trait, number>;
  evidence: ResultEvidence;
  resultMeta?: ResultMeta;
  aiAnalysis?: AIAnalysisResult;
  /** Captured profile answers - surfaced so the result UI can adapt copy by stream/course. */
  profile?: {
    course?: string;
    stream?: string;
    year?: string;
  };
}

// ─────────────────────────────────────────────
// Path catalogue (single source of truth for the 7 trainable paths)
// ─────────────────────────────────────────────

export interface PathDef extends PathRef {
  /** Trait weights used to score the path against a candidate. */
  weights: Partial<Record<Trait, number>>;
  /** Hard requirements; failing one heavily penalises the path. */
  hard?: { trait: Trait; min: number; penalty: number }[];
  /** Answer-driven bonuses (e.g. "shipped" projects → AI bonus). */
  bonuses?: { id: string; value: string; bonus: number }[];
  /** Description for the result page. */
  blurb: string;
}

export const PATHS: Record<string, PathDef> = {
  "medical-coding": {
    slug: "medical-coding",
    title: "Medical Coding",
    salary: "₹3 – 6 LPA",
    blurb:
      "ICD-10 / CPT coding work for US/EU payers. Desk job, high accuracy, US night shift common.",
    weights: { detail: 6, compliance: 3, screen: 3, logic: 1.5, language: 1 },
    hard: [
      { trait: "screen", min: 0, penalty: 25 },
      { trait: "detail", min: 0, penalty: 18 },
    ],
  },
  pharmacovigilance: {
    slug: "pharmacovigilance",
    title: "Pharmacovigilance",
    salary: "₹3.5 – 7 LPA",
    blurb: "Catch and report adverse drug events. Heavy English reading, careful documentation.",
    weights: { empathy: 3.5, detail: 3, language: 3, writing: 2.5, compliance: 2, patient: 2 },
    hard: [
      { trait: "language", min: 0, penalty: 22 },
      { trait: "empathy", min: 0, penalty: 12 },
    ],
  },
  "clinical-data-management": {
    slug: "clinical-data-management",
    title: "Clinical Data Management",
    salary: "₹4 – 8 LPA",
    blurb: "Own the data behind a clinical trial - clean, query, lock. EDC tools daily.",
    weights: { data: 5, detail: 3, logic: 2.5, screen: 2, compliance: 2, tech: 1 },
    hard: [
      { trait: "data", min: 0, penalty: 20 },
      { trait: "detail", min: 0, penalty: 12 },
    ],
  },
  "regulatory-affairs": {
    slug: "regulatory-affairs",
    title: "Regulatory Affairs",
    salary: "₹4 – 9 LPA",
    blurb: "Build the dossier between drug and regulator. Long documents, high compliance bar.",
    weights: { compliance: 5, writing: 4, language: 4, detail: 2, pressure: 1 },
    hard: [
      { trait: "compliance", min: 0, penalty: 25 },
      { trait: "language", min: 0, penalty: 20 },
      { trait: "writing", min: -1, penalty: 12 },
    ],
  },
  "sas-clinical": {
    slug: "sas-clinical",
    title: "SAS Programming (Clinical)",
    salary: "₹4.5 – 10 LPA",
    blurb:
      "Programme the analyses behind clinical trial submissions. Logic + data + a real shipping habit.",
    weights: { logic: 4, tech: 4, data: 4, detail: 2, screen: 1.5 },
    hard: [
      { trait: "logic", min: 0, penalty: 18 },
      { trait: "tech", min: -1, penalty: 14 },
    ],
  },
  "ai-intelligence": {
    slug: "ai-intelligence",
    title: "AI in Healthcare",
    salary: "₹6 – 14 LPA",
    blurb: "Build AI tools for clinical, payer or pharma workflows. Highest pay, steepest curve.",
    weights: { tech: 6, logic: 4, data: 2, screen: 1.5 },
    hard: [
      { trait: "tech", min: 0, penalty: 28 },
      { trait: "logic", min: 0, penalty: 14 },
    ],
    bonuses: [
      { id: "built_anything", value: "shipped", bonus: 8 },
      { id: "built_anything", value: "finished", bonus: 4 },
      { id: "git_use", value: "use", bonus: 4 },
      { id: "ai_relation", value: "build", bonus: 4 },
    ],
  },
  "clinical-saas": {
    slug: "clinical-saas",
    title: "Clinical SaaS Programme",
    salary: "₹6 – 12 LPA",
    blurb: "Customer-facing roles in clinical SaaS - sales, success, ops. People + systems hybrid.",
    weights: { sales: 5, pressure: 3, empathy: 1.5, compliance: 1.5, patient: 1, tech: 1 },
    hard: [
      { trait: "sales", min: 0, penalty: 22 },
      { trait: "pressure", min: -1, penalty: 12 },
    ],
    bonuses: [
      { id: "led_anything", value: "many", bonus: 6 },
      { id: "led_anything", value: "once", bonus: 3 },
      { id: "small_money", value: "regular", bonus: 4 },
    ],
  },
};

// ─────────────────────────────────────────────
// Domain expansion - 4-domain career engine.
// New cross-domain paths so Engineering, Commerce/BBA, Agriculture and
// Arts students see legitimate, hireable Indian roles instead of being
// routed into pharma lanes by default.
// ─────────────────────────────────────────────

PATHS["software-engineer"] = {
  slug: "software-engineer",
  title: "Software Engineer (Product / Backend)",
  salary: "₹6 – 14 LPA",
  blurb:
    "Build product backends and APIs. Indian product co's pay 2-3x service co's. Strongest demand for B.Tech / B.E.",
  weights: { tech: 6, logic: 4, data: 1.5, screen: 1, detail: 1 },
  hard: [
    { trait: "tech", min: 0, penalty: 26 },
    { trait: "logic", min: 0, penalty: 14 },
  ],
  bonuses: [
    { id: "built_anything", value: "shipped", bonus: 8 },
    { id: "built_anything", value: "finished", bonus: 4 },
    { id: "git_use", value: "use", bonus: 4 },
  ],
};

PATHS["business-analyst"] = {
  slug: "business-analyst",
  title: "Business Analyst / Data Analyst",
  salary: "₹5 – 10 LPA",
  blurb:
    "Bridge between business and data. SQL + Excel + storytelling. Hires B.Com / BBA / Economics graduates.",
  weights: { data: 5, logic: 3, writing: 2, sales: 2, screen: 1, detail: 1 },
  hard: [
    { trait: "data", min: 0, penalty: 18 },
    { trait: "logic", min: -1, penalty: 10 },
  ],
};

PATHS["b2b-saas-sales"] = {
  slug: "b2b-saas-sales",
  title: "B2B SaaS Sales / Customer Success",
  salary: "₹5 – 11 LPA + variable",
  blurb:
    "Quota-carrying inside sales / CSM at Indian SaaS. BBA / Arts / Commerce friendly. Variable pay scales fast.",
  weights: { sales: 6, pressure: 3, empathy: 2, language: 1.5, writing: 1 },
  hard: [
    { trait: "sales", min: 0, penalty: 24 },
    { trait: "pressure", min: -1, penalty: 10 },
  ],
  bonuses: [
    { id: "led_anything", value: "many", bonus: 6 },
    { id: "led_anything", value: "once", bonus: 3 },
    { id: "small_money", value: "regular", bonus: 4 },
  ],
};

PATHS["agri-tech-ops"] = {
  slug: "agri-tech-ops",
  title: "Agri-Tech Product Operations",
  salary: "₹4 – 9 LPA",
  blurb:
    "Field-aware product/ops at Indian agri-tech (DeHaat, Ninjacart, Cropin). Combines crop knowledge with data + sales.",
  weights: { sales: 3, data: 3, lab: 3, compliance: 2, tech: 1.5, pressure: 1, empathy: 1 },
  hard: [{ trait: "sales", min: -1, penalty: 8 }],
};

/**
 * Domain → eligible paths matrix. Cross-domain paths are softly capped
 * (max fit ~48) unless the trait evidence is overwhelming. This is what
 * prevents a BBA / Agri / Engg student from seeing a pharma path as their
 * top match purely on trait spillover.
 */
export type Domain = "healthcare" | "tech" | "business" | "agri" | "comm-services";

const COURSE_TO_DOMAIN: Record<string, Domain> = {
  pharma: "healthcare",
  lifesci: "healthcare",
  med: "healthcare",
  engg: "tech",
  comm: "business",
  agri: "agri",
  arts: "comm-services",
};

const DOMAIN_PATHS: Record<Domain, string[]> = {
  healthcare: [
    "medical-coding",
    "pharmacovigilance",
    "clinical-data-management",
    "regulatory-affairs",
    "sas-clinical",
  ],
  tech: ["software-engineer", "ai-intelligence", "sas-clinical", "business-analyst"],
  business: ["b2b-saas-sales", "clinical-saas", "business-analyst", "regulatory-affairs"],
  agri: ["agri-tech-ops", "business-analyst", "b2b-saas-sales"],
  "comm-services": ["b2b-saas-sales", "clinical-saas", "pharmacovigilance"],
};

const CROSS_DOMAIN_CAP = 42;

// ─────────────────────────────────────────────
// Archetype catalogue (presentation layer - paths are derived dynamically)
// ─────────────────────────────────────────────

const path = (slug: string): PathRef => {
  const p = PATHS[slug];
  return { slug: p.slug, title: p.title, salary: p.salary };
};

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  coder: {
    id: "coder",
    name: "The Detail-Driven Coder",
    tagline: "Patience for codes, eye for accuracy.",
    description:
      "You like rules, patterns and getting things exactly right. Medical Coding rewards exactly that, and demand in India is strong.",
    emoji: "🩺",
    pathSlug: "pharma",
    needs: ["High screen tolerance", "Strong attention to detail", "Comfort with repetition"],
    dealbreakers: ["Low screen tolerance", "Dislikes repetitive desk work"],
    topPaths: [path("medical-coding"), path("clinical-data-management"), path("pharmacovigilance")],
  },
  sentinel: {
    id: "sentinel",
    name: "The Patient-Safety Sentinel",
    tagline: "Your job: catch what others miss.",
    description:
      "You read carefully, write clearly and feel responsibility for patient outcomes. Pharmacovigilance is built around people like you.",
    emoji: "🛡️",
    pathSlug: "pharma",
    needs: ["Careful English reading", "Empathy for patient safety", "Documentation discipline"],
    dealbreakers: ["Weak English reading", "Low empathy / patient-care interest"],
    topPaths: [path("pharmacovigilance"), path("clinical-data-management"), path("medical-coding")],
  },
  data_storyteller: {
    id: "data_storyteller",
    name: "The Data Storyteller",
    tagline: "You see the pattern in the noise.",
    description:
      "You're comfortable with numbers and you can explain them. Clinical Data Management and SAS pay well and never have empty seats.",
    emoji: "📊",
    pathSlug: "tech",
    needs: ["Comfort with spreadsheets/data", "Logical reasoning", "Screen stamina"],
    dealbreakers: ["Avoids numbers / spreadsheets", "Low logic micro-task accuracy"],
    topPaths: [path("clinical-data-management"), path("sas-clinical"), path("ai-intelligence")],
  },
  regulatory_architect: {
    id: "regulatory_architect",
    name: "The Regulatory Architect",
    tagline: "You build the wall between drug and danger.",
    description:
      "Long documents don't scare you. You like rules, you like writing, you like being the person who gets the submission right.",
    emoji: "📜",
    pathSlug: "pharma",
    needs: ["Strong English writing", "High compliance mindset", "Tolerance for long documents"],
    dealbreakers: ["Pushes back on rules", "Avoids long-form reading"],
    topPaths: [
      path("regulatory-affairs"),
      path("pharmacovigilance"),
      path("clinical-data-management"),
    ],
  },
  operator: {
    id: "operator",
    name: "The Healthcare Operator",
    tagline: "You make systems run.",
    description:
      "You're a people-person with a head for systems. Healthcare needs operators, sales leaders and account managers - high pay, fast growth.",
    emoji: "💼",
    pathSlug: "business",
    needs: ["Comfort talking to strangers", "Pressure tolerance", "Has organised people before"],
    dealbreakers: ["Drained by phone calls", "Has never led anything"],
    topPaths: [path("clinical-saas"), path("regulatory-affairs"), path("pharmacovigilance")],
  },
  ai_builder: {
    id: "ai_builder",
    name: "The AI-Healthcare Builder",
    tagline: "Build the next generation of medical tools.",
    description:
      "You like building, you're curious about AI, and you're comfortable with logic. AI in Healthcare is the highest-paid track we offer.",
    emoji: "🤖",
    pathSlug: "tech",
    needs: ["Has shipped or built something", "Strong logic puzzle accuracy", "Daily AI tool use"],
    dealbreakers: ["Has never built anything technical", "Low logic/pattern reasoning"],
    topPaths: [path("ai-intelligence"), path("clinical-saas"), path("sas-clinical")],
  },
};

/** Map each archetype to the 1–2 paths it owns most strongly. */
const ARCHETYPE_PRIMARY_PATHS: Record<ArchetypeId, string[]> = {
  coder: ["medical-coding"],
  sentinel: ["pharmacovigilance"],
  data_storyteller: ["clinical-data-management", "sas-clinical"],
  regulatory_architect: ["regulatory-affairs"],
  operator: ["clinical-saas"],
  ai_builder: ["ai-intelligence"],
};

// ─────────────────────────────────────────────
// Trait tally + micro-task accuracy + answer coverage normalisation
// ─────────────────────────────────────────────

const TRAITS: Trait[] = [
  "detail",
  "logic",
  "language",
  "screen",
  "patient",
  "data",
  "writing",
  "sales",
  "compliance",
  "tech",
  "lab",
  "empathy",
  "pressure",
];

function emptyTraits(): Record<Trait, number> {
  return TRAITS.reduce((acc, t) => ((acc[t] = 0), acc), {} as Record<Trait, number>);
}

interface Tally {
  raw: Record<Trait, number>;
  /** Normalised so each trait is roughly comparable across different sampled assessments. */
  norm: Record<Trait, number>;
  microTotal: number;
  microCorrect: number;
  answered: number;
}

/** Maximum positive weight available per trait across the entire bank (used to normalise). */
const MAX_PER_TRAIT: Record<Trait, number> = (() => {
  const m = emptyTraits();
  for (const q of QUESTIONS) {
    const best: Record<Trait, number> = emptyTraits();
    for (const opt of q.options) {
      if (!opt.weights) continue;
      for (const t of TRAITS) {
        const v = opt.weights[t] ?? 0;
        if (v > best[t]) best[t] = v;
      }
    }
    for (const t of TRAITS) m[t] += best[t];
  }
  // Avoid divide-by-zero
  for (const t of TRAITS) if (m[t] <= 0) m[t] = 1;
  return m;
})();

function tally(answers: Record<string, string>): Tally {
  const raw = emptyTraits();
  let microTotal = 0;
  let microCorrect = 0;
  let answered = 0;
  for (const q of QUESTIONS) {
    const v = answers[q.id];
    if (!v) continue;
    answered++;
    const opt = q.options.find((o) => o.value === v);
    if (!opt) continue;
    if (opt.weights) {
      for (const t of TRAITS) {
        raw[t] += opt.weights[t] ?? 0;
      }
    }
    if (q.kind === "micro") {
      microTotal += 1;
      if (opt.correct) microCorrect += 1;
    }
  }
  // Normalise to a comparable -10..+10 range per trait, regardless of which 40 questions were drawn.
  const norm = emptyTraits();
  for (const t of TRAITS) {
    norm[t] = clamp((raw[t] / MAX_PER_TRAIT[t]) * 10, -10, 10);
  }
  return { raw, norm, microTotal, microCorrect, answered };
}

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)));

// ─────────────────────────────────────────────
// Path-level scoring (this is what makes outcomes scale + differentiate)
// ─────────────────────────────────────────────

interface PathScore {
  slug: string;
  path: PathDef;
  fit: number;
  reasons: string[];
}

function pathImpactForAnswer(pdef: PathDef, q: Question, chosen: string): number {
  const opt = q.options.find((o) => o.value === chosen);
  if (!opt) return 0;
  const weighted = Object.entries(pdef.weights).reduce((sum, [trait, pathWeight]) => {
    return sum + (opt.weights?.[trait as Trait] ?? 0) * (pathWeight ?? 0);
  }, 0);
  const bonus =
    pdef.bonuses?.reduce(
      (sum, b) => sum + (b.id === q.id && b.value === chosen ? b.bonus : 0),
      0,
    ) ?? 0;
  return Math.round((weighted + bonus) * 10) / 10;
}

function archetypeImpactFromPaths(
  id: ArchetypeId,
  pathImpacts: AnswerEvidence["pathImpacts"],
): number {
  const owned = new Set(ARCHETYPE_PRIMARY_PATHS[id]);
  return (
    Math.round(pathImpacts.reduce((sum, p) => sum + (owned.has(p.slug) ? p.delta : 0), 0) * 10) / 10
  );
}

function scorePath(
  pdef: PathDef,
  norm: Record<Trait, number>,
  answers: Record<string, string>,
  microPct: number,
): PathScore {
  let score = 35;
  // Positive evidence
  for (const [t, w] of Object.entries(pdef.weights) as [Trait, number][]) {
    score += norm[t] * w;
  }
  // Hard requirements
  if (pdef.hard) {
    for (const h of pdef.hard) {
      if (norm[h.trait] < h.min) score -= h.penalty;
    }
  }
  // Bonuses (answer-driven)
  if (pdef.bonuses) {
    for (const b of pdef.bonuses) {
      if (answers[b.id] === b.value) score += b.bonus;
    }
  }
  // Micro accuracy nudges aptitude-heavy paths up/down
  const microWeight = pdef.weights.logic ?? pdef.weights.detail ?? 0;
  if (microWeight > 0 && microPct > 0) {
    score += (microPct - 50) * 0.05 * (microWeight / 4);
  }
  // Profile fit nudges
  if (answers.course === "pharma" || answers.course === "lifesci" || answers.course === "med") {
    if (pdef.slug !== "ai-intelligence" && pdef.slug !== "clinical-saas") score += 3;
  }
  if (
    answers.course === "engg" &&
    (pdef.slug === "ai-intelligence" || pdef.slug === "sas-clinical")
  ) {
    score += 5;
  }
  // Engineering & Tech - the new dedicated lane. Software is the default
  // primary; AI / SAS / Business Analyst are legitimate adjacencies.
  if (answers.course === "engg") {
    if (pdef.slug === "software-engineer") score += 12;
    if (pdef.slug === "business-analyst") score += 4;
    if (pdef.slug === "ai-intelligence") score += 4; // stacks with line above
    if (pdef.slug === "medical-coding" || pdef.slug === "pharmacovigilance") score -= 4;
  }
  // Agriculture & Allied - agri-tech is the primary lane.
  if (answers.course === "agri") {
    if (pdef.slug === "agri-tech-ops") score += 14;
    if (pdef.slug === "business-analyst") score += 5;
    if (pdef.slug === "b2b-saas-sales") score += 4;
    if (pdef.slug === "regulatory-affairs") score += 2; // food-safety adjacency
    if (pdef.slug === "ai-intelligence" || pdef.slug === "sas-clinical") score -= 4;
    if (pdef.slug === "medical-coding" || pdef.slug === "pharmacovigilance") score -= 5;
    if (pdef.slug === "clinical-data-management") score -= 3;
  }
  // Commerce / BBA - Clinical SaaS is the deliberate primary lane; RA + CDM are
  // legitimate business-side adjacencies. Suppress tech-heavy paths so the
  // engine doesn't surface AI/SAS as a "secondary track" for a candidate
  // with no tech signal - that's what makes the result feel un-genuine.
  if (answers.course === "comm") {
    if (pdef.slug === "b2b-saas-sales") score += 12;
    if (pdef.slug === "business-analyst") score += 8;
    if (pdef.slug === "clinical-saas") score += 6;
    if (pdef.slug === "regulatory-affairs") score += 1;
    if (pdef.slug === "ai-intelligence" || pdef.slug === "sas-clinical") score -= 3;
    if (pdef.slug === "software-engineer") score -= 4;
    if (pdef.slug === "medical-coding") score -= 3;
    if (pdef.slug === "pharmacovigilance") score -= 2;
  }
  // Arts / Humanities - operator + sentinel paths fit communication-heavy candidates.
  if (answers.course === "arts") {
    if (pdef.slug === "b2b-saas-sales") score += 10;
    if (pdef.slug === "clinical-saas") score += 6;
    if (pdef.slug === "pharmacovigilance") score += 4;
    if (pdef.slug === "regulatory-affairs") score += 3;
    if (pdef.slug === "ai-intelligence" || pdef.slug === "sas-clinical") score -= 4;
    if (pdef.slug === "software-engineer") score -= 6;
    if (pdef.slug === "medical-coding") score -= 2;
  }

  // Domain matrix cap - softly cap any path that doesn't belong to the
  // candidate's domain so cross-domain spillover can't outrank the real
  // lane. Healthcare students keep the full 7 pharma paths uncapped.
  const domain = COURSE_TO_DOMAIN[answers.course];
  if (domain && !DOMAIN_PATHS[domain].includes(pdef.slug)) {
    score = Math.min(score, CROSS_DOMAIN_CAP);
  }

  // Reasons (top 3 strongest weighted contributions)
  const contribs: { trait: Trait; impact: number }[] = (
    Object.entries(pdef.weights) as [Trait, number][]
  )
    .map(([t, w]) => ({ trait: t, impact: norm[t] * w }))
    .sort((a, b) => b.impact - a.impact);
  const reasons = contribs
    .filter((c) => c.impact > 0)
    .slice(0, 3)
    .map((c) => `Strong ${c.trait}`);

  return { slug: pdef.slug, path: pdef, fit: clamp(score), reasons };
}

// ─────────────────────────────────────────────
// Archetype scoring (built on top of path scoring)
// ─────────────────────────────────────────────

function archetypeFitFromPaths(id: ArchetypeId, pathScores: Record<string, PathScore>): number {
  const owned = ARCHETYPE_PRIMARY_PATHS[id];
  // Mix: 70% best owned path, 30% second-owned or arch-aligned average.
  const ownedScores = owned.map((s) => pathScores[s].fit).sort((a, b) => b - a);
  const top = ownedScores[0] ?? 0;
  const second = ownedScores[1] ?? top;
  return clamp(top * 0.7 + second * 0.3);
}

// ─────────────────────────────────────────────
// Confidence
// ─────────────────────────────────────────────

function confidenceBand(gap: number, microPct: number): ConfidenceBand {
  if (gap >= 18 && microPct >= 60) return "highly_recommended";
  if (gap >= 10) return "recommended";
  if (gap >= 4) return "two_strong";
  return "exploratory";
}

// ─────────────────────────────────────────────
// Sub-scores (kept for the existing UI bars)
// ─────────────────────────────────────────────

function aptitudeScore(n: Record<Trait, number>, microPct: number): number {
  return clamp(50 + (n.detail + n.logic + n.language + n.data) * 2.2 + (microPct - 50) * 0.4);
}
function interestScore(n: Record<Trait, number>): number {
  return clamp(
    50 + (n.patient + n.writing + n.sales + n.tech + n.lab + n.compliance + n.empathy) * 1.4,
  );
}
function backgroundScore(a: Record<string, string>): number {
  const internship =
    a.internship === "paid"
      ? 35
      : a.internship === "paid_other"
        ? 22
        : a.internship === "unpaid"
          ? 18
          : 10;
  const english =
    a.english_self === "fluent"
      ? 28
      : a.english_self === "good"
        ? 20
        : a.english_self === "okay"
          ? 12
          : 4;
  const year = a.year && a.year !== "1" ? 22 : 12;
  const courseFit = a.course === "pharma" || a.course === "med" || a.course === "lifesci" ? 12 : 6;
  return clamp(internship + english + year + courseFit);
}
function commitmentScore(a: Record<string, string>): number {
  const hours =
    a.study_hours === "20p"
      ? 45
      : a.study_hours === "10_20"
        ? 35
        : a.study_hours === "5_10"
          ? 22
          : 8;
  const start = a.start_when === "now" ? 30 : a.start_when === "next" ? 22 : 10;
  const budget = a.budget === "30p" ? 22 : a.budget === "15_30" ? 16 : a.budget === "emi" ? 14 : 8;
  return clamp(hours + start + budget);
}

// ─────────────────────────────────────────────
// Risks
// ─────────────────────────────────────────────

function buildRisks(
  n: Record<Trait, number>,
  a: Record<string, string>,
  archetype: ArchetypeId,
  microPct: number,
): RiskAlert[] {
  const out: RiskAlert[] = [];
  if (archetype === "coder" && n.screen <= 0) {
    out.push({
      level: "warn",
      text: "Heads up: your screen tolerance is low. Pure coding work may burn you out - consider QA or audit roles.",
    });
  }
  if ((archetype === "sentinel" || archetype === "regulatory_architect") && n.language <= 0) {
    out.push({
      level: "warn",
      text: "English fluency strongly affects PV and Regulatory roles. We'll add a free English upgrade module.",
    });
  }
  if (archetype === "ai_builder" && a.built_anything === "no") {
    out.push({
      level: "info",
      text: "AI scored high but you've never built anything. Plan: a 4-week Python primer before the main programme.",
    });
  }
  if (archetype === "operator" && a.led_anything === "no") {
    out.push({
      level: "info",
      text: "Operator roles need leadership reps. We'll pair you with live client projects to build that muscle.",
    });
  }
  if (a.study_hours === "lt5") {
    out.push({
      level: "warn",
      text: "Under 5 hours/week is too light to keep up with the cohort. Aim for 8+.",
    });
  }
  if ((a.salary === "high" || a.salary === "vhigh") && a.year === "1") {
    out.push({
      level: "info",
      text: "₹6 LPA+ in year 1 is rare for freshers. Most reach this in 18–24 months.",
    });
  }
  if (microPct > 0 && microPct < 50) {
    out.push({
      level: "warn",
      text: "You scored below 50% on the mini skill-checks. We recommend our foundation track first.",
    });
  }
  return out;
}

// ─────────────────────────────────────────────
// "Not a fit" reasons - derived from normalised traits
// ─────────────────────────────────────────────

function notFitReasons(
  notFit: ArchetypeId,
  n: Record<Trait, number>,
  a: Record<string, string>,
): string[] {
  const r: string[] = [];
  switch (notFit) {
    case "coder":
      if (n.screen <= 0) r.push("Low tolerance for long screen sessions");
      if (n.detail <= 0) r.push("Repetitive accuracy work isn't your strength right now");
      if (a.wfh === "field") r.push("You prefer field work over a desk");
      break;
    case "sentinel":
      if (n.language <= 0) r.push("English reading at work-pace would be a bottleneck");
      if (n.empathy <= 0) r.push("Patient-safety roles need genuine concern for outcomes");
      if (n.writing <= 0) r.push("Daily narrative writing isn't where you shine");
      break;
    case "data_storyteller":
      if (n.data <= 0) r.push("Spreadsheets and data wrangling drain you");
      if (n.logic <= 0) r.push("Logic-heavy reasoning isn't your top strength");
      break;
    case "regulatory_architect":
      if (n.compliance <= 0) r.push("You push back on rules instead of working within them");
      if (n.writing <= 0) r.push("Long-form writing isn't enjoyable for you");
      if (n.language <= 0) r.push("Regulatory English is dense - your reading speed would suffer");
      break;
    case "operator":
      if (n.sales <= 0) r.push("Talking to strangers / phone calls drains you");
      if (a.led_anything === "no") r.push("You haven't led anything yet - this role needs reps");
      if (n.pressure <= 0) r.push("High-pressure, deadline-driven days don't suit you");
      break;
    case "ai_builder":
      if (n.tech <= 0) r.push("You haven't built anything technical yet");
      if (n.logic <= 0) r.push("Logic puzzle accuracy was below the bar");
      if (a.ai_relation === "rare") r.push("You rarely use AI tools - the curve would be steep");
      break;
  }
  if (r.length === 0) r.push("Just a softer match than your top fits - not a hard no.");
  return r;
}

function emptyEvidence(answered = 0, assessmentSize = 0): ResultEvidence {
  return {
    summary:
      "This result was calculated from your selected answers, weighted traits, path fit, micro-task accuracy and tie-breakers.",
    topDrivers: [],
    watchOuts: [],
    pathDrivers: {},
    tieBreakers: [],
    scoring: { answered, assessmentSize, topGap: 0, topPathFits: [] },
  };
}

function buildEvidence(args: {
  answers: Record<string, string>;
  questions: Question[];
  topId: ArchetypeId;
  secondId: ArchetypeId;
  topFit: number;
  secondFit: number;
  pathRanking: PathScore[];
  microPct: number;
}): ResultEvidence {
  const evidence = args.questions.flatMap((q): AnswerEvidence[] => {
    const chosenValue = args.answers[q.id];
    if (!chosenValue) return [];
    const opt = q.options.find((o) => o.value === chosenValue);
    if (!opt) return [];

    const traitImpacts = Object.entries(opt.weights ?? {})
      .map(([trait, delta]) => ({ trait: trait as Trait, delta: delta ?? 0 }))
      .filter((x) => x.delta !== 0)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

    const pathImpacts = Object.values(PATHS)
      .map((p) => ({ slug: p.slug, title: p.title, delta: pathImpactForAnswer(p, q, chosenValue) }))
      .filter((x) => x.delta !== 0)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

    return [
      {
        questionId: q.id,
        kind: q.kind,
        prompt: q.prompt,
        chosenValue,
        chosenLabel: opt.label,
        traitImpacts,
        pathImpacts,
        topArchetypeImpact: archetypeImpactFromPaths(args.topId, pathImpacts),
        note:
          q.kind === "micro" && typeof opt.correct === "boolean"
            ? opt.correct
              ? "Correct mini skill-check answer"
              : "Missed mini skill-check answer"
            : undefined,
      },
    ];
  });

  const topDrivers = evidence
    .filter((e) => e.topArchetypeImpact > 0)
    .sort((a, b) => b.topArchetypeImpact - a.topArchetypeImpact)
    .slice(0, 6);
  const watchOuts = evidence
    .filter((e) => e.topArchetypeImpact < 0 || e.note?.startsWith("Missed"))
    .sort((a, b) => a.topArchetypeImpact - b.topArchetypeImpact)
    .slice(0, 4);
  const topPathFits = args.pathRanking
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, title: p.path.title, fit: p.fit }));
  const pathDrivers = Object.fromEntries(
    topPathFits.map((p) => [
      p.slug,
      evidence
        .filter((e) => e.pathImpacts.some((pi) => pi.slug === p.slug && pi.delta > 0))
        .sort(
          (a, b) =>
            (b.pathImpacts.find((pi) => pi.slug === p.slug)?.delta ?? 0) -
            (a.pathImpacts.find((pi) => pi.slug === p.slug)?.delta ?? 0),
        )
        .slice(0, 3),
    ]),
  );
  const tieBreakers = [
    args.topFit - args.secondFit <= 4
      ? `${ARCHETYPES[args.topId].name} narrowly beat ${ARCHETYPES[args.secondId].name} by ${args.topFit - args.secondFit} points.`
      : `${ARCHETYPES[args.topId].name} had a clear ${args.topFit - args.secondFit}-point lead over the next archetype.`,
    args.microPct > 0
      ? `Mini skill-check accuracy contributed ${args.microPct}% to aptitude-heavy paths.`
      : "No mini skill-check answers were available for this attempt.",
  ];

  return {
    summary: `${ARCHETYPES[args.topId].name} scored highest because your strongest answers pointed to ${
      topDrivers
        .slice(0, 3)
        .map((d) => d.traitImpacts[0]?.trait ?? d.kind)
        .join(", ") || "the required traits"
    }.`,
    topDrivers,
    watchOuts,
    pathDrivers,
    tieBreakers,
    scoring: {
      answered: Object.keys(args.answers).length,
      assessmentSize: args.questions.length,
      topGap: args.topFit - args.secondFit,
      topPathFits,
    },
  };
}

// ─────────────────────────────────────────────
// Main entry
// ─────────────────────────────────────────────

export function computeResult(
  answers: Record<string, string>,
  options: { questions?: Question[]; meta?: ResultMeta } = {},
): CareerEngineResult {
  const t = tally(answers);
  const microPct = t.microTotal === 0 ? 0 : Math.round((t.microCorrect / t.microTotal) * 100);

  // 1) Score every path independently
  const pathScores: Record<string, PathScore> = {};
  for (const slug of Object.keys(PATHS)) {
    pathScores[slug] = scorePath(PATHS[slug], t.norm, answers, microPct);
  }
  const pathRanking = Object.values(pathScores).sort((a, b) => b.fit - a.fit);

  // 2) Archetype fit derived from path fit
  const ranking: ArchetypeScore[] = (Object.keys(ARCHETYPES) as ArchetypeId[])
    .map((id) => ({
      id,
      archetype: ARCHETYPES[id],
      fit: archetypeFitFromPaths(id, pathScores),
    }))
    .sort((a, b) => b.fit - a.fit);

  // 3) Stream tie-breaker only if top 2 are within 2 points
  const stream = answers.stream;
  const STREAM_PRIORITY: Record<string, ArchetypeId[]> = {
    MPC: [
      "ai_builder",
      "data_storyteller",
      "coder",
      "regulatory_architect",
      "sentinel",
      "operator",
    ],
    BiPC: [
      "sentinel",
      "coder",
      "regulatory_architect",
      "data_storyteller",
      "ai_builder",
      "operator",
    ],
    Commerce: [
      "operator",
      "regulatory_architect",
      "data_storyteller",
      "coder",
      "sentinel",
      "ai_builder",
    ],
    Arts: [
      "operator",
      "sentinel",
      "regulatory_architect",
      "coder",
      "data_storyteller",
      "ai_builder",
    ],
  };
  if (Math.abs(ranking[0].fit - ranking[1].fit) <= 2 && STREAM_PRIORITY[stream]) {
    const order = STREAM_PRIORITY[stream];
    const top2 = [ranking[0].id, ranking[1].id];
    const preferred = order.find((id) => top2.includes(id));
    if (preferred && preferred !== ranking[0].id) {
      const i = ranking.findIndex((r) => r.id === preferred);
      [ranking[0], ranking[i]] = [ranking[i], ranking[0]];
    }
  }

  const top = ranking[0];
  const second = ranking[1];
  const gap = top.fit - second.fit;
  const confidence = clamp(40 + gap * 2.2 + (microPct - 50) * 0.18);
  const band = confidenceBand(gap, microPct);
  const notFit = ranking[ranking.length - 1];

  // 4) Build top 3 paths from PATH ranking, biased toward the winning archetype
  const archOwned = new Set(ARCHETYPE_PRIMARY_PATHS[top.id]);
  const sortedForUser = [...pathRanking].sort((a, b) => {
    const ba = archOwned.has(a.slug) ? 5 : 0;
    const bb = archOwned.has(b.slug) ? 5 : 0;
    return b.fit + bb - (a.fit + ba);
  });
  const topPathsForUser: PathRef[] = sortedForUser.slice(0, 3).map((p) => ({
    slug: p.path.slug,
    title: p.path.title,
    salary: p.path.salary,
  }));

  // Re-attach a personalised topPaths list onto the archetype clone so the result page renders dynamic order.
  const personalisedArch: Archetype = {
    ...top.archetype,
    topPaths: topPathsForUser,
  };

  const questionsForEvidence = options.questions?.length ? options.questions : QUESTIONS;
  const evidence = buildEvidence({
    answers,
    questions: questionsForEvidence,
    topId: top.id,
    secondId: second.id,
    topFit: top.fit,
    secondFit: second.fit,
    pathRanking,
    microPct,
  });

  return {
    archetypeId: top.id,
    archetype: personalisedArch,
    fitScore: top.fit,
    confidence,
    confidenceBand: band,
    ranking,
    notFit,
    notFitReasons: notFitReasons(notFit.id, t.norm, answers),
    microAccuracy: microPct,
    breakdown: {
      aptitude: aptitudeScore(t.norm, microPct),
      interest: interestScore(t.norm),
      background: backgroundScore(answers),
      commitment: commitmentScore(answers),
    },
    risks: buildRisks(t.norm, answers, top.id, microPct),
    traitScores: t.norm,
    evidence,
    profile: {
      course: answers.course,
      stream: answers.stream,
      year: answers.year,
    },
    resultMeta: {
      ...options.meta,
      questionIds: questionsForEvidence.map((q) => q.id),
      answeredQuestionIds: Object.keys(answers),
      createdAt: options.meta?.createdAt ?? new Date().toISOString(),
    },
  };
}

// Exposed for diagnostics / simulator
export function _debugScore(answers: Record<string, string>) {
  const t = tally(answers);
  const microPct = t.microTotal === 0 ? 0 : Math.round((t.microCorrect / t.microTotal) * 100);
  const paths = Object.keys(PATHS).map((slug) => scorePath(PATHS[slug], t.norm, answers, microPct));
  return { tally: t, microPct, paths: paths.sort((a, b) => b.fit - a.fit) };
}

// ─────────────────────────────────────────────
// Adaptive branching predicate
// ─────────────────────────────────────────────

/**
 * Cheap mid-test confidence check used by the sampler to decide whether the
 * remaining optional questions can be skipped. We deliberately use the same
 * path-scoring engine as the final result so the cutoff matches what the
 * candidate would have seen at the end.
 *
 * Returns true when:
 *   - the leading archetype beats the runner-up by ≥ ADAPTIVE_GAP, AND
 *   - the leading PATH beats the next path by ≥ ADAPTIVE_PATH_GAP, AND
 *   - micro skill-checks are either not applicable yet or ≥ 60% accurate.
 *
 * Threshold is intentionally conservative - false positives shorten the
 * test for the wrong candidate, so we err on the side of showing more.
 */
const ADAPTIVE_ARCH_GAP = 14;
const ADAPTIVE_PATH_GAP = 10;

export function isAdaptiveConfident(answers: Record<string, string>): boolean {
  const t = tally(answers);
  if (t.answered < 14) return false;
  const microPct = t.microTotal === 0 ? 0 : Math.round((t.microCorrect / t.microTotal) * 100);
  if (t.microTotal >= 2 && microPct < 60) return false;

  const pathScores: Record<string, PathScore> = {};
  for (const slug of Object.keys(PATHS)) {
    pathScores[slug] = scorePath(PATHS[slug], t.norm, answers, microPct);
  }
  const pathRanking = Object.values(pathScores).sort((a, b) => b.fit - a.fit);
  if (pathRanking.length < 2) return false;
  if (pathRanking[0].fit - pathRanking[1].fit < ADAPTIVE_PATH_GAP) return false;

  const archRanking = (Object.keys(ARCHETYPES) as ArchetypeId[])
    .map((id) => archetypeFitFromPaths(id, pathScores))
    .sort((a, b) => b - a);
  if (archRanking.length < 2) return false;
  return archRanking[0] - archRanking[1] >= ADAPTIVE_ARCH_GAP;
}
