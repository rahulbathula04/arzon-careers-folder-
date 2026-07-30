import type { Question, QuestionOption, Trait } from "./careerEngineQuestions";

/**
 * Plain-English label for each trait used in the assessment. Used to render
 * the "what this answer signals" microcopy on the test page.
 */
export const TRAIT_LABEL: Record<Trait, string> = {
  detail: "attention to detail",
  logic: "structured reasoning",
  language: "English comprehension",
  screen: "screen-work tolerance",
  patient: "patience with people",
  data: "data fluency",
  writing: "writing clarity",
  sales: "people / persuasion energy",
  compliance: "rule-following / regulatory mindset",
  tech: "technical / coding aptitude",
  lab: "lab / wet-science instinct",
  empathy: "empathy",
  pressure: "pressure tolerance",
};

/**
 * Career paths each trait typically nudges a candidate toward. Kept short -
 * the goal is to give the student a directional hint, not a verdict.
 */
const TRAIT_PATHS: Record<Trait, string[]> = {
  detail: ["Pharmacovigilance", "Regulatory Affairs", "QA"],
  compliance: ["Regulatory Affairs", "QA", "Pharmacovigilance"],
  logic: ["Clinical SAS", "Health-tech engineering"],
  language: ["Medical writing", "Regulatory writing"],
  screen: ["Pharmacovigilance", "Clinical SAS"],
  patient: ["Clinical research coordination", "Patient-facing care"],
  data: ["Clinical SAS", "Real-world evidence / Analytics"],
  writing: ["Medical writing", "Regulatory writing"],
  sales: ["Medical affairs", "Client services", "Business development"],
  tech: ["Health-tech engineering", "AI builder", "Clinical SAS"],
  lab: ["Bioanalytical lab", "Clinical lab"],
  empathy: ["Clinical research coordination", "Patient-facing care"],
  pressure: ["Clinical operations", "Site management"],
};

export interface OptionInsight {
  /** Top positive trait signals from this option (max 3). */
  positives: Array<{ trait: Trait; weight: number; label: string }>;
  /** Top negative trait signals from this option (max 2). */
  negatives: Array<{ trait: Trait; weight: number; label: string }>;
  /** Career paths this answer nudges toward (deduped, max 3). */
  paths: string[];
  /** Final one-line reveal sentence rendered above the trait chips. */
  reveal: string;
  /** True when the option carries no scoring signal (pure profile / context). */
  neutral: boolean;
  /** Micro-task feedback when applicable. */
  micro?: { correct: boolean; note: string };
}

function topByAbs(weights: Partial<Record<Trait, number>>) {
  const entries = Object.entries(weights) as Array<[Trait, number]>;
  return entries
    .filter(([, v]) => typeof v === "number" && v !== 0)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
}

/**
 * Build a transparent explanation for a single selected option. Pure function:
 * no side effects, no React. Safe to call during render.
 */
export function deriveOptionInsight(question: Question, option: QuestionOption): OptionInsight {
  const weights = option.weights ?? {};
  const ranked = topByAbs(weights);
  const positives = ranked
    .filter(([, v]) => v > 0)
    .slice(0, 3)
    .map(([trait, weight]) => ({ trait, weight, label: TRAIT_LABEL[trait] }));
  const negatives = ranked
    .filter(([, v]) => v < 0)
    .slice(0, 2)
    .map(([trait, weight]) => ({ trait, weight, label: TRAIT_LABEL[trait] }));

  // Paths: prefer question.paths, else union of top positive traits' paths.
  const fromTraits: string[] = positives.flatMap((p) => TRAIT_PATHS[p.trait] ?? []);
  const merged = [...(question.paths ?? []), ...fromTraits];
  const paths = Array.from(new Set(merged)).slice(0, 3);

  const neutral = positives.length === 0 && negatives.length === 0 && option.correct === undefined;

  // Micro-task feedback (only when the question explicitly marks correct on
  // at least one option - i.e. it's a real skill check).
  let micro: OptionInsight["micro"] | undefined;
  if (question.kind === "micro" && typeof option.correct === "boolean") {
    micro = option.correct
      ? {
          correct: true,
          note: "Correct - this is the kind of pattern-spotting the role actually demands.",
        }
      : {
          correct: false,
          note: "Off this time - not disqualifying. It just tells us where the bootcamp needs to rebuild a skill.",
        };
  }

  // Compose reveal sentence.
  let reveal = option.reveals ?? "";
  if (!reveal) {
    if (neutral) {
      reveal = "Context only - this answer tailors the rest of the test but doesn't score.";
    } else if (positives.length === 0 && negatives.length > 0) {
      reveal = `You're signalling away from ${negatives.map((n) => n.label).join(" and ")}. We'll route you to paths that don't depend on it.`;
    } else {
      const posPart = positives.length
        ? `You're signalling ${positives.map((p) => p.label).join(", ")}`
        : "";
      const negPart = negatives.length
        ? ` and away from ${negatives.map((n) => n.label).join(" and ")}`
        : "";
      const pathPart = paths.length ? `. Typical fit: ${paths.join(", ")}.` : ".";
      reveal = `${posPart}${negPart}${pathPart}`.trim();
    }
  }

  return { positives, negatives, paths, reveal, neutral, micro };
}

/**
 * One-line "what this question measures" string. Falls back to a sensible
 * default per question kind when no explicit `measures` was authored.
 */
export function questionMeasures(question: Question): string {
  if (question.measures) return question.measures;
  switch (question.kind) {
    case "profile":
      return "Background context - used to tailor the rest of your test.";
    case "scenario":
      return "Measures how you'd actually decide on the job, under real-world tradeoffs.";
    case "behaviour":
      return "Measures your natural working style - there is no right answer.";
    case "micro":
      return "A short aptitude probe with one correct answer. Diagnostic only.";
    case "lifestyle":
      return "Measures whether the day-to-day rhythm of this path fits how you want to live.";
    case "commitment":
      return "Honesty check - filters paths that look glamorous but won't suit you.";
    default:
      return "";
  }
}
