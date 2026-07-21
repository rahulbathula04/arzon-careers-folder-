import { track, getAnonId, type TrackProps } from "@/lib/track";
import { trackEvent } from "@/lib/analytics.functions";
import { retryWithBackoff } from "@/lib/retryWithBackoff";
import { getAttributionProps, getAttributionUtmSource } from "@/lib/attribution";
import { z } from "zod";

/**
 * Runtime schema validation for analytics event payloads.
 *
 * Why: TypeScript only catches mismatches at the call site. A stale or
 * miswired caller can still ship `undefined`/wrong-typed values into
 * `track()`. Once it lands in `analytics_events.props` we lose the ability
 * to compute funnel conversion correctly.
 *
 * Policy: validate, then drop on failure. Analytics MUST NOT throw into
 * the UI. Failures are logged via `console.warn` so they show up in dev
 * + Sentry-like aggregators without breaking the user flow.
 */
function safeEmit<T>(
  eventName: string,
  schema: z.ZodType<T>,
  args: unknown,
  emit: (parsed: T) => void,
): void {
  const result = schema.safeParse(args);
  if (!result.success) {
    if (typeof console !== "undefined") {
      console.warn(
        `[analytics] dropped ${eventName}: invalid payload`,
        result.error.flatten().fieldErrors,
      );
    }
    return;
  }
  try {
    emit(result.data);
  } catch (err) {
    if (typeof console !== "undefined") {
      console.warn(`[analytics] emit threw for ${eventName}`, err);
    }
  }
}

// ── Shared field shapes ────────────────────────────────────────────────
const NullableId = z.string().min(1).max(128).nullable().optional();
const Slug = z
  .string()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9-]+$/, "lowercase slug");
const TrackTag = z.enum(["flagship", "secondary"]);
const TrackSource = z.enum(["card", "hero_cta", "compare"]);
const Score0to100 = z.number().finite().min(0).max(100);
const BandId = z.enum(["foundation", "developing", "industry_ready"]);

/**
 * Typed wrappers around `track()` for the Career Engine funnel so call sites
 * stay readable and event names + props don't drift.
 *
 * All events land in the `analytics_events` table via the trackEvent server
 * function. Use these instead of calling `track()` directly inside the
 * career-engine flow.
 */

interface EvidenceImpact {
  question_id: string;
  chosen: string;
  delta: number;
}

export function trackAttemptStarted(args: {
  sessionId: string | null;
  attemptId: string | null;
  seed?: string | null;
  stream?: string | null;
}) {
  track("ce_attempt_started", {
    session_id: args.sessionId,
    props: {
      attempt_id: args.attemptId,
      seed: args.seed ?? null,
      stream: args.stream ?? null,
    },
  });
}

export function trackQuestionViewed(args: {
  sessionId: string | null;
  attemptId: string | null;
  questionId: string;
  kind: string;
  index: number;
  total: number;
}) {
  track("ce_question_viewed", {
    session_id: args.sessionId,
    props: {
      attempt_id: args.attemptId,
      question_id: args.questionId,
      kind: args.kind,
      index: args.index,
      total: args.total,
    },
  });
}

export function trackQuestionAnswered(args: {
  sessionId: string | null;
  attemptId: string | null;
  questionId: string;
  kind: string;
  value: string;
  index: number;
  total: number;
  latencyMs: number;
}) {
  track("ce_question_answered", {
    session_id: args.sessionId,
    props: {
      attempt_id: args.attemptId,
      question_id: args.questionId,
      kind: args.kind,
      value: args.value,
      index: args.index,
      total: args.total,
      latency_ms: args.latencyMs,
    },
  });
}

export function trackAttemptSubmitted(args: {
  sessionId: string | null;
  leadId: string | null;
  attemptId: string | null;
  seed?: string | null;
  answered: number;
  elapsedMs: number;
}) {
  track("ce_attempt_submitted", {
    session_id: args.sessionId,
    lead_id: args.leadId,
    props: {
      attempt_id: args.attemptId,
      seed: args.seed ?? null,
      answered: args.answered,
      elapsed_ms: args.elapsedMs,
    },
  });
}

export function trackAttemptOutcome(args: {
  leadId: string | null;
  attemptId: string | null;
  archetype: string;
  fitScore: number;
  confidence: number;
  confidenceBand: string;
  topPath?: string | null;
  topEvidence: EvidenceImpact[];
}) {
  const payload = {
    lead_id: args.leadId,
    props: {
      attempt_id: args.attemptId,
      archetype: args.archetype,
      fit_score: args.fitScore,
      confidence: args.confidence,
      confidence_band: args.confidenceBand,
      top_path: args.topPath ?? null,
      top_evidence: args.topEvidence,
    },
  };
  // Fire-and-forget. The retry helper retries ONLY on network errors so we
  // never duplicate analytics on logical failures (e.g. validation 400).
  void retryWithBackoff(() => sendTrackedEvent("ce_attempt_outcome", payload), {
    label: "ce_attempt_outcome",
    maxAttempts: 4,
    baseDelayMs: 500,
    maxDelayMs: 8_000,
    maxJitterMs: 250,
  }).then((res) => {
    if (!res.ok) {
      try {
        console.error("[careerEngineAnalytics] ce_attempt_outcome failed", {
          attempts: res.attempts,
          attempt_id: args.attemptId,
          lead_id: args.leadId,
        });
      } catch {
        /* noop */
      }
    }
  });
}

/**
 * Calls the analytics server function directly so network errors propagate
 * to the retry helper. Mirrors the payload shape built by `track()` but
 * without the swallow-everything wrapper.
 */
async function sendTrackedEvent(eventName: string, extra: TrackProps): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    if (navigator?.doNotTrack === "1") return;
  } catch {
    /* noop */
  }
  const url = new URL(window.location.href);
  const utm =
    url.searchParams.get("utm_source") ??
    url.searchParams.get("utm") ??
    getAttributionUtmSource() ??
    null;
  const attributionProps = getAttributionProps();
  await trackEvent({
    data: {
      event_name: eventName,
      anon_id: getAnonId(),
      session_id: extra.session_id ?? null,
      application_id: extra.application_id ?? null,
      lead_id: extra.lead_id ?? null,
      path: url.pathname + url.search,
      referrer: document.referrer || null,
      utm_source: utm,
      program_slug: extra.program_slug ?? null,
      cohort: extra.cohort ?? null,
      props: { ...attributionProps, ...(extra.props ?? {}) },
    },
  });
}

export function trackAttemptRetake(args: { previousAttemptId: string | null }) {
  track("ce_attempt_retake", {
    props: { previous_attempt_id: args.previousAttemptId },
  });
}

/**
 * Funnel-step pageview events. One per route mount in the Interested → Paid
 * journey. Use these (not the sampled `page_view`) to compute step-by-step
 * conversion in dashboards.
 *
 * Stage order:
 *   1. interested      → /career-engine landing
 *   2. lead_form       → /career-engine/start
 *   3. test            → /career-engine/test (attempt_started already covers)
 *   4. result          → /career-engine/result
 *   5. enrol           → /career-engine/enrol
 *   6. pay_clicked     → user tapped "Pay … & lock seat"
 *   7. razorpay_handoff (existing)
 */
export type CEFunnelStep = "interested" | "lead_form" | "test" | "result" | "enrol" | "pay_clicked";

export function trackCEFunnelStep(args: {
  step: CEFunnelStep;
  sessionId?: string | null;
  leadId?: string | null;
  attemptId?: string | null;
  extra?: Record<string, unknown>;
}) {
  track(`ce_${args.step}_viewed`, {
    session_id: args.sessionId ?? null,
    lead_id: args.leadId ?? null,
    props: {
      funnel_step: args.step,
      attempt_id: args.attemptId ?? null,
      ...(args.extra ?? {}),
    },
  });
}

export function trackCECtaClicked(args: {
  step: CEFunnelStep;
  target: string; // e.g. "start", "enrol", "pay"
  sessionId?: string | null;
  leadId?: string | null;
  attemptId?: string | null;
}) {
  track("ce_cta_clicked", {
    session_id: args.sessionId ?? null,
    lead_id: args.leadId ?? null,
    props: {
      funnel_step: args.step,
      target: args.target,
      attempt_id: args.attemptId ?? null,
    },
  });
}

export function trackAcriPreviewShown(args: {
  sessionId?: string | null;
  leadId?: string | null;
  attemptId?: string | null;
  archetype: string;
  overall: number;
  band: string;
  profile: Record<string, number>;
}) {
  track("acri_preview_shown", {
    session_id: args.sessionId ?? null,
    lead_id: args.leadId ?? null,
    props: {
      attempt_id: args.attemptId ?? null,
      archetype: args.archetype,
      overall: args.overall,
      band: args.band,
      ...args.profile,
    },
  });
}

export function trackAcriTrackClicked(args: {
  sessionId?: string | null;
  leadId?: string | null;
  attemptId?: string | null;
  trackSlug: string;
  trackTag: "flagship" | "secondary";
  source: "card" | "hero_cta" | "compare";
}) {
  safeEmit(
    "acri_track_clicked",
    z.object({
      sessionId: NullableId,
      leadId: NullableId,
      attemptId: NullableId,
      trackSlug: Slug,
      trackTag: TrackTag,
      source: TrackSource,
    }),
    args,
    (a) => {
      track("acri_track_clicked", {
        session_id: a.sessionId ?? null,
        lead_id: a.leadId ?? null,
        props: {
          attempt_id: a.attemptId ?? null,
          track_slug: a.trackSlug,
          track_tag: a.trackTag,
          source: a.source,
        },
      });
    },
  );
}

export function trackAcriPvCtaClicked(args: {
  sessionId?: string | null;
  leadId?: string | null;
  attemptId?: string | null;
  band: string;
  overall: number;
}) {
  safeEmit(
    "acri_pv_cta_clicked",
    z.object({
      sessionId: NullableId,
      leadId: NullableId,
      attemptId: NullableId,
      band: BandId,
      overall: Score0to100,
    }),
    args,
    (a) => {
      track("acri_pv_cta_clicked", {
        session_id: a.sessionId ?? null,
        lead_id: a.leadId ?? null,
        props: {
          attempt_id: a.attemptId ?? null,
          band: a.band,
          overall: a.overall,
        },
      });
    },
  );
}

export function trackCareerDirectionDetailViewed(args: {
  sessionId?: string | null;
  leadId?: string | null;
  attemptId?: string | null;
  archetype: string;
}) {
  safeEmit(
    "ce_career_direction_detail_viewed",
    z.object({
      sessionId: NullableId,
      leadId: NullableId,
      attemptId: NullableId,
      archetype: z
        .string()
        .min(1)
        .max(64)
        .regex(/^[a-z_]+$/),
    }),
    args,
    (a) => {
      track("ce_career_direction_detail_viewed", {
        session_id: a.sessionId ?? null,
        lead_id: a.leadId ?? null,
        props: {
          attempt_id: a.attemptId ?? null,
          archetype: a.archetype,
        },
      });
    },
  );
}
