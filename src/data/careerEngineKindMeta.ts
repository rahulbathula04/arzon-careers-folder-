import type { QuestionKind } from "./careerEngineQuestions";

/**
 * Per-kind UI copy + theming. Kept here so every question card can show the
 * student *why* it's being asked — building trust that this is a real
 * assessment, not a personality quiz.
 */
export interface KindMeta {
  chip: string; // short label rendered as a chip on the card
  why: string; // one-sentence "why this question" explainer
  ring: string; // tailwind classes for the chip border + bg
  text: string; // tailwind class for chip text colour
}

export const KIND_META: Record<QuestionKind, KindMeta> = {
  profile: {
    chip: "Quick context",
    why: "Helps us tailor the rest of your test to your background.",
    ring: "border-white/15 bg-white/[0.04]",
    text: "text-white/70",
  },
  scenario: {
    chip: "Real shift situation",
    why: "Tests how you'd actually decide on the job, under realistic pressure.",
    ring: "border-sky-300/30 bg-sky-300/10",
    text: "text-sky-200",
  },
  behaviour: {
    chip: "How you work",
    why: "Maps your natural working style — no right or wrong answer.",
    ring: "border-violet-300/30 bg-violet-300/10",
    text: "text-violet-200",
  },
  micro: {
    chip: "Mini skill check",
    why: "A quick aptitude probe — has a correct answer, but it's a tiny slice of overall fit.",
    ring: "border-primary-glow/30 bg-primary/10",
    text: "text-primary-glow",
  },
  lifestyle: {
    chip: "Your life fit",
    why: "Checks whether the day-to-day rhythm of this path matches how you want to live.",
    ring: "border-blue-300/30 bg-blue-300/10",
    text: "text-blue-200",
  },
  commitment: {
    chip: "Reality check",
    why: "An honesty check — this filters paths that look glamorous but won't actually suit you.",
    ring: "border-amber-300/30 bg-amber-300/10",
    text: "text-amber-200",
  },
};
