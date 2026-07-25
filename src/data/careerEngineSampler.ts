import { QUESTIONS, type Question, type QuestionKind, type Stream } from "./careerEngineQuestions";

/**
 * Career Engine sampler.
 *
 * Each session draws a deterministic 40-question subset from QUESTIONS so:
 *  - Every new session sees a different assessment.
 *  - The same session reloading sees the SAME assessment (no shuffling
 *    questions out from under a user mid-test).
 *
 * Composition (40 total):
 *   profile     5   (always shown, fixed order — needed for branching)
 *   scenario   14
 *   behaviour   8
 *   micro       6
 *   lifestyle   4
 *   commitment  3
 */

/** Single source of truth for per-kind question quotas. */
export const QUOTAS: Record<QuestionKind, number> = {
  profile: 7,
  scenario: 14,
  behaviour: 8,
  micro: 6,
  lifestyle: 4,
  commitment: 3,
};

export const TARGET_TOTAL = 42;

/** Floor below which `visible` should never drop after branching. */
export const VISIBLE_FLOOR = 38;

/**
 * Adaptive branching thresholds.
 *
 * The full assessment is 40 questions. We keep the profile (5) and commitment
 * (3) blocks as ANCHORS — they are always shown, regardless of confidence,
 * because they drive lead routing and can't be inferred from trait scores.
 *
 * The remaining 32 "pool" questions (scenario / behaviour / micro / lifestyle)
 * are where adaptive cutoff applies. Once a candidate has answered at least
 * `ADAPTIVE_MIN_POOL_ANSWERS` pool questions AND the scoring engine reports
 * a confident dominant path, the rest of the pool is dropped and the user
 * proceeds straight to the commitment anchor block. Ambiguous candidates see
 * the full 40.
 *
 * Floor: a confident adaptive run still shows at least
 * `ADAPTIVE_MIN_VISIBLE` questions (profile 5 + pool 14 + commitment 3 = 22).
 */
export const ADAPTIVE_MIN_POOL_ANSWERS = 14;
export const ADAPTIVE_MIN_VISIBLE = 22;

export class SamplerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SamplerError";
  }
}

/** xmur3 string hash → 32-bit seed for the PRNG. */
function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

/** mulberry32 PRNG — fast, deterministic, good distribution for shuffles. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function rngFor(seed: string, salt: string): () => number {
  const h = xmur3(`${seed}::${salt}`);
  return mulberry32(h());
}

/** Profile questions in the order they appear in the bank. */
function profileQuestions(): Question[] {
  return QUESTIONS.filter((q) => q.kind === "profile");
}

/**
 * A pool question is eligible for a stream if it has no `streams` allow-list
 * (universal) OR the user's stream is in the list. Profile / commitment
 * anchors are always eligible — they should never be stream-gated since
 * they drive lead routing and can't be inferred.
 */
function isEligibleForStream(q: Question, stream: Stream | null): boolean {
  if (!q.streams || q.streams.length === 0) return true;
  if (!stream) return true; // before stream is known, keep universal pool
  return q.streams.includes(stream);
}

/**
 * Build a deterministic, dedup-checked 40-question assessment for the given
 * seed. Throws SamplerError if the bank cannot satisfy the quotas — we want
 * loud failure in dev/CI rather than silently shipping a short test.
 *
 * When `stream` is provided, each non-profile pool is filtered to questions
 * eligible for that stream (universal + matches). If the filtered pool can't
 * meet the quota for some reason, we fall back to the unfiltered pool for
 * that kind so we never ship a short test.
 */
export function buildAssessment(seed: string, stream?: Stream | null): Question[] {
  const seen = new Set<string>();
  const picked: Question[] = [];
  const activeStream: Stream | null = stream ?? null;

  // Profile is fixed (needed for branching).
  for (const q of profileQuestions()) {
    if (seen.has(q.id)) {
      throw new SamplerError(`Duplicate question id in bank: ${q.id}`);
    }
    seen.add(q.id);
    picked.push(q);
  }

  if (picked.length !== QUOTAS.profile) {
    throw new SamplerError(`profile pool has ${picked.length}, need ${QUOTAS.profile}`);
  }

  (Object.keys(QUOTAS) as QuestionKind[])
    .filter((k) => k !== "profile")
    .forEach((kind) => {
      const want = QUOTAS[kind];
      const fullPool = QUESTIONS.filter((q) => q.kind === kind);
      if (fullPool.length < want) {
        throw new SamplerError(`${kind} pool has ${fullPool.length}, need ${want}`);
      }
      const filtered = fullPool.filter((q) => isEligibleForStream(q, activeStream));
      // Use the stream-filtered pool when it can satisfy the quota,
      // otherwise fall back to the full pool so we never ship a short test.
      const usable = filtered.length >= want ? filtered : fullPool;
      const salt = activeStream ? `${kind}::${activeStream}` : kind;
      const ordered = shuffle(usable, rngFor(seed, salt)).slice(0, want);
      for (const q of ordered) {
        if (seen.has(q.id)) {
          throw new SamplerError(`Duplicate question id picked across kinds: ${q.id}`);
        }
        seen.add(q.id);
        picked.push(q);
      }
    });

  // Final invariants — last-line-of-defence.
  const v = validateAssessment(picked);
  if (!v.ok) {
    throw new SamplerError(
      `Assessment failed validation: total=${v.total} duplicates=${v.duplicates.join(",") || "none"} perKind=${JSON.stringify(v.perKind)}`,
    );
  }

  return picked;
}

export interface AssessmentValidation {
  ok: boolean;
  total: number;
  perKind: Record<QuestionKind, number>;
  duplicates: string[];
  perKindOk: boolean;
  totalOk: boolean;
  noDuplicates: boolean;
}

/** Validate a sampled assessment matches QUOTAS exactly with no duplicates. */
export function validateAssessment(qs: Question[]): AssessmentValidation {
  const perKind = {
    profile: 0,
    scenario: 0,
    behaviour: 0,
    micro: 0,
    lifestyle: 0,
    commitment: 0,
  } as Record<QuestionKind, number>;
  const counts: Record<string, number> = {};
  for (const q of qs) {
    perKind[q.kind] = (perKind[q.kind] ?? 0) + 1;
    counts[q.id] = (counts[q.id] ?? 0) + 1;
  }
  const duplicates = Object.keys(counts).filter((id) => counts[id] > 1);
  const totalOk = qs.length === TARGET_TOTAL;
  const noDuplicates = duplicates.length === 0;
  const perKindOk = (Object.keys(QUOTAS) as QuestionKind[]).every((k) => perKind[k] === QUOTAS[k]);
  return {
    ok: totalOk && noDuplicates && perKindOk,
    total: qs.length,
    perKind,
    duplicates,
    perKindOk,
    totalOk,
    noDuplicates,
  };
}

/**
 * Apply the same showIf branching rule to a pre-sampled list. We do this on
 * each render so that an answer to (e.g.) `stream` can hide stream-specific
 * follow-ups in the sampled set without changing which 40 were drawn.
 */
export function visibleFromAssessment(
  assessment: Question[],
  answers: Record<string, string>,
): Question[] {
  return assessment.filter((q) => !q.showIf || q.showIf(answers));
}

/**
 * Adaptive visible list. Wraps `visibleFromAssessment` and additionally
 * truncates the optional pool when a confidence predicate fires.
 *
 * The predicate is injected so this module stays free of a scoring
 * dependency. `isAdaptiveConfident` from `careerEngineScoring` is the
 * canonical implementation.
 */
export function adaptiveVisibleFromAssessment(
  assessment: Question[],
  answers: Record<string, string>,
  isConfident: (answers: Record<string, string>) => boolean,
): Question[] {
  const visible = visibleFromAssessment(assessment, answers);
  const isAnchor = (q: Question) => q.kind === "profile" || q.kind === "commitment";
  const poolAnswered = visible.filter((q) => !isAnchor(q) && answers[q.id]).length;
  if (poolAnswered < ADAPTIVE_MIN_POOL_ANSWERS) return visible;
  if (!isConfident(answers)) return visible;
  // Keep every anchor and every pool question already answered; drop the rest.
  const truncated = visible.filter((q) => isAnchor(q) || Boolean(answers[q.id]));
  if (truncated.length < ADAPTIVE_MIN_VISIBLE) return visible;
  return truncated;
}

const SEED_KEY = "ce_seed";
const SEED_LOCK_KEY = "ce_seed_locked";

/**
 * Stable per-browser seed. Order of preference:
 *   1. ?seed= URL param (lets us reproduce a user's exact set on demand)
 *   2. Lock written by a previous buildAssessment call (so a sessionId
 *      arriving mid-test doesn't reshuffle questions)
 *   3. The DB sessionId once one exists
 *   4. Existing localStorage seed
 *   5. A new crypto.randomUUID() persisted to localStorage
 */
export function getOrCreateSeed(sessionId: string | null): string {
  if (typeof window === "undefined") return "ssr";

  // 1. URL override
  try {
    const qs = new URLSearchParams(window.location.search);
    const fromUrl = qs.get("seed");
    if (fromUrl) {
      window.localStorage.setItem(SEED_KEY, fromUrl);
      window.localStorage.setItem(SEED_LOCK_KEY, fromUrl);
      return fromUrl;
    }
  } catch {
    /* noop */
  }

  // 2. Existing lock — never reshuffle once a test is in flight
  const locked = window.localStorage.getItem(SEED_LOCK_KEY);
  if (locked) return locked;

  // 3. DB sessionId
  if (sessionId) {
    window.localStorage.setItem(SEED_KEY, sessionId);
    return sessionId;
  }

  // 4 / 5. Cached or fresh UUID
  let seed = window.localStorage.getItem(SEED_KEY);
  if (!seed) {
    seed =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `seed_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SEED_KEY, seed);
  }
  return seed;
}

/** Lock the active seed so subsequent calls can't drift away from it. */
export function lockSeed(seed: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SEED_LOCK_KEY, seed);
}

/** Wipe seed + lock so the next test draws a brand-new 40. */
export function resetSeed(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SEED_KEY);
  window.localStorage.removeItem(SEED_LOCK_KEY);
  // Legacy sessionStorage cleanup
  try {
    window.sessionStorage.removeItem(SEED_KEY);
  } catch {
    /* noop */
  }
}

/** Build a shareable URL that reproduces a given seed's exact 40 questions. */
export function reproducerUrl(seed: string): string {
  if (typeof window === "undefined") return `/career-engine/test?seed=${seed}`;
  const u = new URL(window.location.href);
  u.searchParams.set("seed", seed);
  return u.toString();
}
