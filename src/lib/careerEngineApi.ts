import { supabase } from "@/integrations/supabase/client";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { resetSeed } from "@/data/careerEngineSampler";
import { retryWithBackoff } from "@/lib/retryWithBackoff";
import { submitLeadEndpoint } from "@/lib/leads.functions";

type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

const SESSION_KEY = "ce_session_id";
const SESSION_TOKEN_KEY = "ce_session_token";
const LEAD_KEY = "ce_lead_id";
const ANSWERS_KEY = "ce_answers";
const RESULT_KEY = "ce_result";
const PROFILE_KEY = "ce_profile";
const ATTEMPT_KEY = "ce_attempt_id";
const STARTED_AT_KEY = "ce_attempt_started_at";
const CLIENT_FP_KEY = "ce_client_fp";

// ──────────────────────────────────────────────
// Resume + expiration
// Persist a snapshot of the in-flight attempt to localStorage so the user
// can refresh, close the tab, or come back later (within the TTL) and
// pick up where they left off. sessionStorage alone dies with the tab.
// ──────────────────────────────────────────────
export const CE_ATTEMPT_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const LS_SNAPSHOT_KEY = "ce_snapshot_v1";
const EXPIRED_NOTICE_KEY = "ce_expired_notice";

const PERSIST_KEYS = [
  SESSION_KEY,
  SESSION_TOKEN_KEY,
  LEAD_KEY,
  ANSWERS_KEY,
  RESULT_KEY,
  PROFILE_KEY,
  ATTEMPT_KEY,
  STARTED_AT_KEY,
] as const;

export function persistCareerEngineSnapshot(): void {
  if (typeof window === "undefined") return;
  try {
    const snap: Record<string, string> = { _savedAt: String(Date.now()) };
    let any = false;
    for (const k of PERSIST_KEYS) {
      const v = sessionStorage.getItem(k);
      if (v != null) {
        snap[k] = v;
        any = true;
      }
    }
    if (!any) {
      localStorage.removeItem(LS_SNAPSHOT_KEY);
      return;
    }
    localStorage.setItem(LS_SNAPSHOT_KEY, JSON.stringify(snap));
  } catch {
    /* ignore */
  }
}

function clearSnapshot(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LS_SNAPSHOT_KEY);
  } catch {
    /* ignore */
  }
}

function hasCompletedResult(raw: string | null | undefined): boolean {
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    return !!(parsed && typeof parsed === "object" && "archetypeId" in parsed);
  } catch {
    return false;
  }
}

/**
 * Restore the persisted attempt snapshot from localStorage into sessionStorage
 * (no-op if sessionStorage already has an active attempt). Returns whether
 * anything was restored and whether the snapshot was expired (and thus
 * discarded).
 */
export function hydrateCareerEngineSnapshot(): { restored: boolean; expired: boolean } {
  if (typeof window === "undefined") return { restored: false, expired: false };
  const sessionHasAttempt = !!sessionStorage.getItem(ATTEMPT_KEY);
  if (hasCompletedResult(sessionStorage.getItem(RESULT_KEY)))
    return { restored: false, expired: false };
  try {
    const raw = localStorage.getItem(LS_SNAPSHOT_KEY);
    if (!raw) return { restored: false, expired: false };
    const snap = JSON.parse(raw) as Record<string, string> | null;
    if (!snap) return { restored: false, expired: false };
    const completedResult = hasCompletedResult(snap[RESULT_KEY]);
    if (sessionHasAttempt && !completedResult) return { restored: false, expired: false };
    const anchorRaw = snap[STARTED_AT_KEY] ?? snap._savedAt;
    const anchor = Number(anchorRaw);
    if (!completedResult && (!Number.isFinite(anchor) || anchor <= 0)) {
      clearSnapshot();
      return { restored: false, expired: false };
    }
    if (!completedResult && Date.now() - anchor > CE_ATTEMPT_TTL_MS) {
      clearSnapshot();
      try {
        sessionStorage.setItem(EXPIRED_NOTICE_KEY, "1");
      } catch {
        /* ignore */
      }
      return { restored: false, expired: true };
    }
    for (const k of PERSIST_KEYS) {
      if (snap[k] != null) sessionStorage.setItem(k, snap[k]);
    }
    return { restored: true, expired: false };
  } catch {
    return { restored: false, expired: false };
  }
}

export function isAttemptExpired(): boolean {
  if (typeof window === "undefined") return false;
  if (hasCompletedResult(sessionStorage.getItem(RESULT_KEY))) return false;
  const v = sessionStorage.getItem(STARTED_AT_KEY);
  if (!v) return false;
  const n = Number(v);
  if (!Number.isFinite(n) || n <= 0) return false;
  return Date.now() - n > CE_ATTEMPT_TTL_MS;
}

export function hasResumableAttempt(): boolean {
  if (typeof window === "undefined") return false;
  if (isAttemptExpired()) return false;
  if (sessionStorage.getItem(RESULT_KEY)) return false;
  if (!sessionStorage.getItem(PROFILE_KEY)) return false;
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return !!parsed && typeof parsed === "object" && Object.keys(parsed).length > 0;
  } catch {
    return false;
  }
}

export function consumeExpiredNotice(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const v = sessionStorage.getItem(EXPIRED_NOTICE_KEY);
    if (v) sessionStorage.removeItem(EXPIRED_NOTICE_KEY);
    return !!v;
  } catch {
    return false;
  }
}

function getClientFingerprint(): string | null {
  if (typeof window === "undefined") return null;
  let fp = localStorage.getItem(CLIENT_FP_KEY);
  if (!fp) {
    fp =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    try {
      localStorage.setItem(CLIENT_FP_KEY, fp);
    } catch {
      /* ignore */
    }
  }
  return fp;
}

// ──────────────────────────────────────────────
// Transient-failure retry wrapper for Supabase RPCs.
// Supabase-js does NOT throw on network failures - it returns
// `{ data: null, error: { message: "Failed to fetch" } }`. So the standard
// `isNetworkError` (which checks TypeError) misses it. We treat any error
// whose message looks network-shaped as retryable, and stop after 3 tries.
// ──────────────────────────────────────────────
function isTransientCareerEngineError(err: unknown): boolean {
  const raw = (err instanceof Error ? err.message : typeof err === "string" ? err : "") || "";
  const msg = raw.toLowerCase();
  if (!msg) return true; // empty-message TypeError on offline
  return (
    msg.includes("failed to fetch") ||
    msg.includes("load failed") ||
    msg.includes("networkerror") ||
    msg.includes("network error") ||
    msg.includes("network request") ||
    msg.includes("timeout") ||
    msg.includes("timed out") ||
    msg.includes("aborted") ||
    msg.includes("offline") ||
    msg.includes("fetch")
  );
}

async function rpcWithRetry<T>(label: string, op: () => Promise<T>): Promise<T> {
  const result = await retryWithBackoff(op, {
    label,
    maxAttempts: 3,
    baseDelayMs: 400,
    maxDelayMs: 2000,
    maxJitterMs: 200,
    isRetryable: isTransientCareerEngineError,
  });
  if (result.ok) return result.value as T;
  throw result.error instanceof Error
    ? result.error
    : new Error(String(result.error ?? label + " failed"));
}

// ──────────────────────────────────────────────
// Local profile (basic details collected pre-test)
// ──────────────────────────────────────────────

export interface CareerEngineProfile {
  name: string;
  phone: string; // 10 digits, no +91
  email: string;
  whatsappOptin: boolean;
}

export function getProfile(): CareerEngineProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as CareerEngineProfile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: CareerEngineProfile) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  persistCareerEngineSnapshot();
}

// ──────────────────────────────────────────────
// Reset
// ──────────────────────────────────────────────

export function resetCareerEngineState() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(LEAD_KEY);
  sessionStorage.removeItem(ANSWERS_KEY);
  sessionStorage.removeItem(RESULT_KEY);
  sessionStorage.removeItem(PROFILE_KEY);
  sessionStorage.removeItem(ATTEMPT_KEY);
  sessionStorage.removeItem(STARTED_AT_KEY);
  clearSnapshot();
}

/**
 * Clear in-flight test state (answers, result, lead, session) but keep the
 * saved profile so the start form stays pre-filled. Call this before a new
 * attempt so the user gets a genuinely fresh test.
 */
export function clearAttemptState() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(LEAD_KEY);
  sessionStorage.removeItem(ANSWERS_KEY);
  sessionStorage.removeItem(RESULT_KEY);
  sessionStorage.removeItem(ATTEMPT_KEY);
  sessionStorage.removeItem(STARTED_AT_KEY);
  persistCareerEngineSnapshot();
}

function freshId(prefix: string): string {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${id}`;
}

export function getAttemptId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ATTEMPT_KEY);
}

export function startFreshAttempt(opts: { preserveProfile?: boolean } = {}): string | null {
  if (typeof window === "undefined") return null;
  const profile = opts.preserveProfile === false ? null : sessionStorage.getItem(PROFILE_KEY);
  resetCareerEngineState();
  if (profile) sessionStorage.setItem(PROFILE_KEY, profile);
  resetSeed();
  const attemptId = freshId("attempt");
  sessionStorage.setItem(ATTEMPT_KEY, attemptId);
  Object.keys(sessionStorage)
    .filter((k) => k.startsWith("ce_quiz_completed_"))
    .forEach((k) => sessionStorage.removeItem(k));
  persistCareerEngineSnapshot();
  return attemptId;
}

// ──────────────────────────────────────────────
// Read-only accessors
// ──────────────────────────────────────────────

export function getSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_KEY);
}
export function getSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
}
function requireToken(): string {
  const t = getSessionToken();
  if (!t) throw new Error("session auth required");
  return t;
}
export function getLeadId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(LEAD_KEY);
}

// ──────────────────────────────────────────────
// Humanize backend errors so toasts are friendly
// ──────────────────────────────────────────────

export function humanizeCareerEngineError(err: unknown, fallback: string): string {
  const raw = (err instanceof Error ? err.message : typeof err === "string" ? err : "") || "";
  const msg = raw.toLowerCase();

  if (!msg) return fallback;

  if (msg.includes("invalid name")) return "Please enter your full name (2–80 characters).";
  if (msg.includes("invalid phone")) return "Please enter a valid 10-digit mobile number.";
  if (msg.includes("invalid email")) return "Please enter a valid email address.";
  if (msg.includes("hidden field") || msg.includes("autofill")) {
    return "Your browser autofilled a hidden field. Please refresh the page and try again.";
  }
  if (msg.includes("invalid question") || msg.includes("invalid answer")) {
    return "We couldn't save that answer. Please try again.";
  }
  if (msg.includes("session_id required"))
    return "Your session expired. Please refresh and try again.";
  if (msg.includes("lead_id required"))
    return "We lost track of your submission. Please refresh and try again.";
  if (msg.includes("permission denied") || msg.includes("not allowed") || msg.includes("rls")) {
    return "We couldn't reach the server. Please refresh and try again.";
  }
  if (
    msg.includes("failed to fetch") ||
    msg.includes("networkerror") ||
    msg.includes("network error") ||
    msg.includes("timeout") ||
    msg.includes("offline")
  ) {
    return "Network issue - please check your connection and try again.";
  }
  if (msg.includes("rate") && msg.includes("limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  // Surface short, readable backend messages directly; otherwise fall back.
  if (raw.length <= 140) return raw;
  return fallback;
}

// ──────────────────────────────────────────────
// Session + answers
// ──────────────────────────────────────────────

export async function startSession(stream?: string, opts: { honeypot?: string } = {}) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : null;
  const device = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
  const utm =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("utm_source")
      : null;

  try {
    const data = await rpcWithRetry("ce_start_session", async () => {
      const { data, error } = await supabase.rpc("ce_start_session", {
        p_stream: stream ?? undefined,
        p_device: device ?? undefined,
        p_utm_source: utm ?? undefined,
        p_user_agent: ua ?? undefined,
        p_honeypot: opts.honeypot ?? undefined,
        p_client_fp: getClientFingerprint() ?? undefined,
      });
      if (error) throw new Error(error.message || "ce_start_session failed");
      return data;
    });
    const row = Array.isArray(data)
      ? data[0]
      : (data as { session_id: string; session_token: string } | null);
    if (!row) throw new Error("session start failed");
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, row.session_id);
      sessionStorage.setItem(SESSION_TOKEN_KEY, row.session_token);
      persistCareerEngineSnapshot();
    }
    return row.session_id;
  } catch (err) {
    // Network / Supabase fallback handling
    console.warn("ce_start_session network fallback active", err);
    const fallbackId = `sess_local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const fallbackTok = `tok_local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, fallbackId);
      sessionStorage.setItem(SESSION_TOKEN_KEY, fallbackTok);
      persistCareerEngineSnapshot();
    }
    return fallbackId;
  }
}

export function saveAnswers(answers: Record<string, string>) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  persistCareerEngineSnapshot();
}

export function saveResult(result: CareerEngineResult) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
  persistCareerEngineSnapshot();
}

export async function recordAnswer(sessionId: string, questionId: string, answer: string) {
  try {
    const tok = getSessionToken();
    if (!tok || tok.startsWith("tok_local_")) return;
    await rpcWithRetry("ce_record_answer", async () => {
      const { error } = await supabase.rpc("ce_record_answer", {
        p_session_id: sessionId,
        p_question_id: questionId,
        p_answer: answer,
        p_session_token: tok,
      });
      if (error) throw new Error(error.message || "ce_record_answer failed");
    });
  } catch (err) {
    console.warn("ce_record_answer fallback active", err);
  }
}

// ──────────────────────────────────────────────
// Early lead - captured BEFORE the test starts
// ──────────────────────────────────────────────

export async function createLeadEarly(args: {
  sessionId: string;
  name: string;
  phone: string; // 10 digits
  email: string;
  whatsappOptin: boolean;
}) {
  try {
    const tok = getSessionToken();
    if (!tok || tok.startsWith("tok_local_")) throw new Error("Local session fallback active");
    const data = await rpcWithRetry("ce_create_lead_early", async () => {
      const { data, error } = await supabase.rpc("ce_create_lead_early", {
        p_session_id: args.sessionId,
        p_name: args.name,
        p_phone: `91${args.phone}`,
        p_email: args.email,
        p_whatsapp_optin: args.whatsappOptin,
        p_session_token: tok,
      });
      if (error) throw new Error(error.message || "Could not create lead");
      return data;
    });
    if (typeof window !== "undefined" && data) {
      sessionStorage.setItem(LEAD_KEY, data as string);
      persistCareerEngineSnapshot();
    }
    return data as string;
  } catch (err) {
    console.warn("ce_create_lead_early fallback active", err);
    const fallbackLeadId = `lead_local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(LEAD_KEY, fallbackLeadId);
      persistCareerEngineSnapshot();
    }
    return fallbackLeadId;
  }
}

// ──────────────────────────────────────────────
// Finalise lead - patch with archetype + result after test
// ──────────────────────────────────────────────

export async function finalizeLead(args: { leadId: string; result: CareerEngineResult }) {
  try {
    const tok = getSessionToken();
    if (!tok || tok.startsWith("tok_local_") || args.leadId.startsWith("lead_local_")) return;
    await rpcWithRetry("ce_finalize_lead", async () => {
      const { error } = await supabase.rpc("ce_finalize_lead", {
        p_lead_id: args.leadId,
        p_archetype: args.result.archetypeId,
        p_top_paths: args.result.archetype.topPaths as unknown as Json,
        p_fit_score: args.result.fitScore,
        p_result_payload: {
          breakdown: args.result.breakdown,
          risks: args.result.risks,
          traitScores: args.result.traitScores,
          confidence: args.result.confidence,
          confidenceBand: args.result.confidenceBand,
          microAccuracy: args.result.microAccuracy,
          ranking: args.result.ranking.map((r) => ({ id: r.id, fit: r.fit })),
          notFit: { id: args.result.notFit.id, fit: args.result.notFit.fit },
          notFitReasons: args.result.notFitReasons,
          evidence: args.result.evidence,
          resultMeta: args.result.resultMeta,
          aiAnalysis: args.result.aiAnalysis,
          archetype: {
            name: args.result.archetype.name,
            tagline: args.result.archetype.tagline,
            emoji: args.result.archetype.emoji,
            pathSlug: args.result.archetype.pathSlug,
          },
        } as unknown as Json,
        p_session_token: tok,
      });
      if (error) throw new Error(error.message || "Could not save result");
    });
    // Fire-and-forget admin notification email
    try {
      void fetch("/api/public/career-engine-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: args.leadId }),
        keepalive: true,
      });
    } catch (e) {
      console.warn("career-engine-notify trigger failed", e);
    }
  } catch (err) {
    console.warn("ce_finalize_lead fallback active", err);
  }
}

// ──────────────────────────────────────────────
// Legacy: post-test lead form (kept as a safety fallback,
// in case the user reaches /lead manually).
// ──────────────────────────────────────────────

export async function submitLead(args: {
  sessionId: string;
  name: string;
  phone: string;
  email: string;
  whatsappOptin: boolean;
  result: CareerEngineResult;
}) {
  const resultPayload = {
    breakdown: args.result.breakdown,
    risks: args.result.risks,
    traitScores: args.result.traitScores,
    confidence: args.result.confidence,
    confidenceBand: args.result.confidenceBand,
    microAccuracy: args.result.microAccuracy,
    ranking: args.result.ranking.map((r) => ({ id: r.id, fit: r.fit })),
    notFit: { id: args.result.notFit.id, fit: args.result.notFit.fit },
    notFitReasons: args.result.notFitReasons,
    evidence: args.result.evidence,
    resultMeta: args.result.resultMeta,
    aiAnalysis: args.result.aiAnalysis,
    archetype: {
      name: args.result.archetype.name,
      tagline: args.result.archetype.tagline,
      emoji: args.result.archetype.emoji,
      pathSlug: args.result.archetype.pathSlug,
    },
  };

  try {
    const { data } = await submitLeadEndpoint({
      data: {
        sessionId: args.sessionId,
        name: args.name,
        phone: args.phone,
        email: args.email,
        whatsappOptin: args.whatsappOptin,
        resultPayload,
        archetypeId: args.result.archetypeId,
        fitScore: args.result.fitScore,
        topPaths: args.result.archetype.topPaths,
      },
    });

    if (!data) throw new Error("No data returned from submitLeadEndpoint");

    if (typeof window !== "undefined") sessionStorage.setItem(LEAD_KEY, data as string);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to submit lead");
  }
}

export async function getResult(leadId: string) {
  const { data, error } = await supabase.rpc("ce_get_result", { p_lead_id: leadId });
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

// ──────────────────────────────────────────────
// Cohort selection - captured on the enrol page
// before handing off to Razorpay.
// ──────────────────────────────────────────────

export async function setCohort(leadId: string, cohortId: string) {
  await rpcWithRetry("ce_set_cohort", async () => {
    const { error } = await supabase.rpc("ce_set_cohort", {
      p_lead_id: leadId,
      p_cohort_id: cohortId,
      p_session_token: requireToken(),
    });
    if (error) throw new Error(error.message || "Could not save cohort selection");
  });
}
