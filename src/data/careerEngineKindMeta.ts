import type { QuestionKind } from "./careerEngineQuestions";

/**
 * Per-kind UI copy + theming. Kept here so every question card can show the
 * student *why* it's being asked - building trust that this is a real
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
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold",
  },
  scenario: {
    chip: "Real shift situation",
    why: "Tests how you'd actually decide on the job, under realistic pressure.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold",
  },
  behaviour: {
    chip: "How you work",
    why: "Maps your natural working style - no right or wrong answer.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold",
  },
  micro: {
    chip: "Mini skill check",
    why: "A quick aptitude probe - has a correct answer, but it's a tiny slice of overall fit.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold",
  },
  lifestyle: {
    chip: "Your life fit",
    why: "Checks whether the day-to-day rhythm of this path matches how you want to live.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold",
  },
  commitment: {
    chip: "Reality check",
    why: "An honesty check - this filters paths that look glamorous but won't actually suit you.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold",
  },
};
