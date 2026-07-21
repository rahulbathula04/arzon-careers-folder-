import type { Question } from "@/data/careerEngineQuestions";
import { adaptiveOrderedVisible } from "@/data/careerEngineAdaptive";
import { isAdaptiveConfident } from "@/data/careerEngineScoring";
import { persistCareerEngineSnapshot } from "@/lib/careerEngineApi";

const ANSWERS_KEY = "ce_answers";
const RESULT_KEY = "ce_result";
const STARTED_AT_KEY = "ce_attempt_started_at";

export interface AnswerStep {
  answers: Record<string, string>;
  nextIndex: number;
  complete: boolean;
}

export function loadSavedAnswers(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const saved = JSON.parse(sessionStorage.getItem(ANSWERS_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

export function saveAnswers(answers: Record<string, string>): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  sessionStorage.removeItem(RESULT_KEY);
  persistCareerEngineSnapshot();
}

export function answerQuestion(args: {
  assessment: Question[];
  currentQuestion: Question;
  currentAnswers: Record<string, string>;
  value: string;
}): AnswerStep {
  const answers = { ...args.currentAnswers, [args.currentQuestion.id]: args.value };
  const visible = adaptiveOrderedVisible(args.assessment, answers, isAdaptiveConfident);
  const currentPos = visible.findIndex((x) => x.id === args.currentQuestion.id);
  return {
    answers,
    nextIndex: currentPos === -1 ? visible.length : currentPos + 1,
    complete: currentPos === -1 || currentPos + 1 >= visible.length,
  };
}

export function cacheResult(result: unknown): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
  persistCareerEngineSnapshot();
}

export function cachedResultMatches(
  activeAttemptId: string | null,
  activeSeed: string | null,
): boolean {
  if (typeof window === "undefined") return false;
  try {
    const cached = JSON.parse(sessionStorage.getItem(RESULT_KEY) || "null");
    if (!cached?.archetypeId) return false;
    const meta = cached.resultMeta ?? {};
    return Boolean(
      (!activeAttemptId || meta.attemptId === activeAttemptId) &&
      (!activeSeed || meta.assessmentSeed === activeSeed),
    );
  } catch {
    return false;
  }
}

/**
 * Lazily mark the attempt as started so the elapsed-time indicator survives
 * reloads. First call writes the current ISO timestamp; subsequent calls
 * return the existing one.
 */
export function getOrInitAttemptStartedAt(): number {
  if (typeof window === "undefined") return Date.now();
  const existing = sessionStorage.getItem(STARTED_AT_KEY);
  if (existing) {
    const n = Number(existing);
    if (Number.isFinite(n) && n > 0) return n;
  }
  const now = Date.now();
  sessionStorage.setItem(STARTED_AT_KEY, String(now));
  persistCareerEngineSnapshot();
  return now;
}

export function getAttemptStartedAt(): number | null {
  if (typeof window === "undefined") return null;
  const v = sessionStorage.getItem(STARTED_AT_KEY);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function clearAttemptTimer(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STARTED_AT_KEY);
}
