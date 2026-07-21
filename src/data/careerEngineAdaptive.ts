/**
 * Adaptive question ordering for the Career Engine.
 *
 * The sampler picks WHICH 40 questions a candidate sees (deterministic per
 * seed). This module re-ranks the *unanswered* portion of that visible set
 * after every answer so:
 *
 *   - candidates who lean strongly into a path see more questions that
 *     discriminate between THAT path and its closest competitor next, and
 *   - micro skill-check difficulty escalates / de-escalates with the
 *     candidate's running accuracy.
 *
 * Anchors (profile + commitment blocks) never move — they drive lead
 * routing and must run in a stable order. Already-answered questions never
 * move either (preserving the candidate's scroll history of decisions).
 *
 * The reordering is stable: when two unanswered questions tie on priority
 * we fall back to the sampler's original index, so the test does not jitter
 * between renders when nothing material has changed.
 */
import type { Question } from "./careerEngineQuestions";
import { ADAPTIVE_MIN_POOL_ANSWERS, adaptiveVisibleFromAssessment } from "./careerEngineSampler";
import { _debugScore } from "./careerEngineScoring";

/** Per-difficulty target ranges, keyed by current micro accuracy (0-100). */
function targetDifficulty(microPct: number, microAnswered: number): Question["difficulty"] | null {
  if (microAnswered < 1) return null; // no signal yet — leave order alone
  if (microPct >= 80) return "hard";
  if (microPct >= 50) return "medium";
  return "easy";
}

/** Distance between two difficulty bands, used to penalise far-off micro questions. */
const DIFF_RANK: Record<NonNullable<Question["difficulty"]>, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};
function difficultyDistance(a: Question["difficulty"], b: Question["difficulty"]): number {
  const da = DIFF_RANK[a ?? "medium"];
  const db = DIFF_RANK[b ?? "medium"];
  return Math.abs(da - db);
}

const isAnchor = (q: Question) => q.kind === "profile" || q.kind === "commitment";

interface AdaptiveSignals {
  leaders: string[]; // top 2 path slugs by current fit
  laggards: Set<string>; // path slugs in the bottom half
  target: Question["difficulty"] | null;
}

function deriveSignals(answers: Record<string, string>): AdaptiveSignals {
  let leaders: string[] = [];
  const laggards = new Set<string>();
  let target: Question["difficulty"] | null = null;
  try {
    const dbg = _debugScore(answers);
    const ranked = dbg.paths.map((p) => p.slug);
    leaders = ranked.slice(0, 2);
    // Anything in the bottom half is a laggard.
    ranked.slice(Math.ceil(ranked.length / 2)).forEach((slug) => laggards.add(slug));
    target = targetDifficulty(dbg.microPct, dbg.tally.microTotal);
  } catch {
    // _debugScore should never throw on partial input, but guard anyway:
    // fall back to leaving order unchanged.
    leaders = [];
    target = null;
  }
  return { leaders, laggards, target };
}

/** Higher score = surface this question sooner. */
function priorityScore(q: Question, signals: AdaptiveSignals): number {
  let score = 0;

  // Path relevance — boost discriminators for the current leaders.
  if (q.paths && q.paths.length) {
    if (signals.leaders[0] && q.paths.includes(signals.leaders[0])) score += 3;
    if (signals.leaders[1] && q.paths.includes(signals.leaders[1])) score += 1.5;
    // If EVERY tagged path is a clear laggard, the question can't change
    // the result much — push it down.
    if (q.paths.every((p) => signals.laggards.has(p))) score -= 1.5;
  }

  // Difficulty adaptation — only meaningful for micro skill-checks.
  if (q.kind === "micro" && signals.target) {
    const dist = difficultyDistance(q.difficulty, signals.target);
    if (dist === 0)
      score += 2; // bang on the right band
    else if (dist === 1)
      score += 0.5; // adjacent band — still OK
    else score -= 1.5; // wrong end of the difficulty range
  }

  return score;
}

/**
 * Public entry point. Returns the visible question list with anchors and
 * already-answered questions in their original slots, and the unanswered
 * non-anchor questions reordered by priority. Drop-in replacement for
 * `adaptiveVisibleFromAssessment`.
 */
export function adaptiveOrderedVisible(
  assessment: Question[],
  answers: Record<string, string>,
  isConfident: (answers: Record<string, string>) => boolean,
): Question[] {
  const visible = adaptiveVisibleFromAssessment(assessment, answers, isConfident);

  // We only reorder once the candidate has provided enough signal to make
  // adaptive ranking meaningful. Before that, original sampler order wins.
  const poolAnswered = visible.filter((q) => !isAnchor(q) && answers[q.id]).length;
  if (poolAnswered < Math.min(4, ADAPTIVE_MIN_POOL_ANSWERS)) return visible;

  const signals = deriveSignals(answers);
  if (!signals.leaders.length && !signals.target) return visible;

  // Partition: keep anchors + answered questions pinned to their slot index.
  // Reorder the *unanswered, non-anchor* questions by priority, then refill
  // the slots they originally occupied.
  const flexibleSlots: number[] = [];
  const flexibleQs: { q: Question; originalIndex: number }[] = [];
  visible.forEach((q, i) => {
    if (!isAnchor(q) && !answers[q.id]) {
      flexibleSlots.push(i);
      flexibleQs.push({ q, originalIndex: i });
    }
  });

  if (flexibleQs.length <= 1) return visible;

  const ranked = flexibleQs
    .map((entry) => ({ ...entry, score: priorityScore(entry.q, signals) }))
    .sort(
      (a, b) => b.score - a.score || a.originalIndex - b.originalIndex, // stable
    );

  const out = visible.slice();
  flexibleSlots.forEach((slot, i) => {
    out[slot] = ranked[i].q;
  });
  return out;
}
