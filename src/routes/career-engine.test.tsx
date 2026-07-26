import type { Stream } from "@/data/careerEngineQuestions";
import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Loader2, HelpCircle, Copy, Check, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CareerShell } from "@/components/career/CareerShell";
import { StartFreshButton } from "@/components/career/StartFreshButton";
import { useServerFn } from "@tanstack/react-start";
import { getAIAnalysis } from "@/lib/careerEngine.functions";
import {
  buildAssessment,
  getOrCreateSeed,
  lockSeed,
  reproducerUrl,
  validateAssessment,
  QUOTAS,
  TARGET_TOTAL,
  ADAPTIVE_MIN_VISIBLE,
  SamplerError,
} from "@/data/careerEngineSampler";
import { adaptiveOrderedVisible } from "@/data/careerEngineAdaptive";
import { KIND_META } from "@/data/careerEngineKindMeta";
import { questionMeasures } from "@/data/careerEngineInsights";
import { computeResult, isAdaptiveConfident } from "@/data/careerEngineScoring";
import { Progress } from "@/components/ui/progress";
import {
  startSession,
  recordAnswer,
  getSessionId,
  getProfile,
  getLeadId,
  getAttemptId,
  createLeadEarly,
  finalizeLead,
  humanizeCareerEngineError,
  startFreshAttempt,
  isAttemptExpired,
  hasResumableAttempt,
  resetCareerEngineState,
} from "@/lib/careerEngineApi";
import {
  answerQuestion,
  cachedResultMatches,
  cacheResult,
  loadSavedAnswers,
  saveAnswers,
} from "@/lib/careerEngineRunner";
import { getOrInitAttemptStartedAt, getAttemptStartedAt } from "@/lib/careerEngineRunner";
import {
  trackAttemptSubmitted,
  trackQuestionAnswered,
  trackQuestionViewed,
} from "@/lib/careerEngineAnalytics";
import { trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
import { track } from "@/lib/track";
import { captureAttribution } from "@/lib/attribution";
import { toast } from "sonner";

function CinematicProcessing() {
  const [step, setStep] = useState(0);
  const steps = [
    "Compiling matrix of 40 behavioral data points...",
    "Scanning 13 core cognitive and domain traits...",
    "Evaluating match against 6 industry pathways...",
    "Calibrating Confidence Band...",
    "Finalising Career Fit Engine Report...",
  ];

  useEffect(() => {
    if (step < steps.length - 1) {
      const timer = setTimeout(() => setStep((s) => s + 1), 600);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <CareerShell>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative h-24 w-24 mb-8">
          <div
            className="absolute inset-0 rounded-full border-4 border-white/10 border-t-sky-400 motion-safe:animate-spin shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            style={{ animationDuration: "1s" }}
          />
          <div
            className="absolute inset-2 rounded-full border-4 border-white/5 border-l-brand-gold motion-safe:animate-spin"
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sky-400">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ShieldCheck className="h-6 w-6" />
            </motion.div>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-white mb-6">
          Algorithmic Analysis in Progress
        </h2>

        <div className="w-full max-w-sm mx-auto bg-black/40 rounded-xl border border-white/10 p-4 font-mono text-left">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{
                opacity: i <= step ? 1 : 0.3,
                color: i < step ? "#7fb0d8" : i === step ? "#ffffff" : "#475569",
              }}
              className="text-[11px] sm:text-xs mb-2 flex items-center gap-2"
            >
              <span className="shrink-0">{i < step ? "✓" : i === step ? "►" : "·"}</span>
              <span>{s}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </CareerShell>
  );
}

export const Route = createFileRoute("/career-engine/test")({
  // Open route: anyone can take the test. PII is collected on /lead *after*
  // they see value (their result). This is the "value-first" funnel.
  head: () => ({
    meta: [
      { title: "Career test. Arzon Career Engine" },
      { name: "description", content: "40 quick questions to find your healthcare career fit." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TestPage,
});

function TestPage() {
  const navigate = useNavigate();
  const runAIAnalysis = useServerFn(getAIAnalysis);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [idx, setIdx] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [seed, setSeed] = useState<string>("ssr");
  const [submitting, setSubmitting] = useState(false);
  const startedRef = useRef(false);
  const finalisedRef = useRef(false);
  const advancingRef = useRef(false);
  const timeoutFiredRef = useRef(false);
  const [debugOpen, setDebugOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const questionViewAtRef = useRef<number>(0);
  const lastTrackedQRef = useRef<string | null>(null);
  const hasRestoredRef = useRef(false);

  // Debug panel auto-opens with ?debug=1 or localStorage flag.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const qs = new URLSearchParams(window.location.search);
    if (qs.get("debug") === "1" || window.localStorage.getItem("ce_debug") === "1") {
      setDebugOpen(true);
    }
  }, []);

  // Client-side guard fallback (in case SSR slipped through) + restore.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Capture UTM/referrer at the first Career Engine entry. First-touch
    // wins; subsequent navigations don't overwrite the original source.
    try {
      captureAttribution();
    } catch {
      /* noop */
    }
    // Funnel step: /career-engine/test mounted. One per attempt.
    try {
      const key = `ce_test_viewed_${getAttemptId() ?? "anon"}`;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        trackCEFunnelStep({
          step: "test",
          sessionId: getSessionId(),
          attemptId: getAttemptId(),
        });
      }
    } catch {
      /* noop */
    }
    if (isAttemptExpired()) {
      resetCareerEngineState();
      toast.message("Your previous attempt expired", {
        description: "Please start fresh, your progress was over 2 hours old.",
      });
      window.location.href = "/career-engine";
      return;
    }
    // Anonymous-friendly: seed a fresh attempt if none is in progress.
    if (!hasResumableAttempt()) {
      startFreshAttempt({ preserveProfile: true });
    }
    const saved = loadSavedAnswers();
    if (Object.keys(saved).length) {
      setAnswers(saved);
      // Auto-jump to progress
      const assessment = buildAssessment(
        getOrCreateSeed(getSessionId() ?? ""),
        (saved.stream as Stream | undefined) ?? null,
      );
      const visible = adaptiveOrderedVisible(assessment, saved, isAdaptiveConfident);
      setIdx(Math.min(visible.length, Math.max(0, Object.keys(saved).length)));
    }
    hasRestoredRef.current = true;
    const sid = getSessionId();
    setSessionId(sid);
    const s = getOrCreateSeed(sid);
    lockSeed(s); // freeze for the rest of the test
    if (!cachedResultMatches(getAttemptId(), s)) sessionStorage.removeItem("ce_result");
    setSeed(s);
  }, []);

  const built = useMemo(() => {
    try {
      const stream = (answers.stream as Stream | undefined) ?? null;
      const qs = buildAssessment(seed, stream);
      return { qs, error: null as null | string };
    } catch (e) {
      const msg = e instanceof SamplerError ? e.message : "Unknown sampler error";

      console.error("[career-engine] sampler failed", e);
      return { qs: [] as ReturnType<typeof buildAssessment>, error: msg };
    }
  }, [seed, answers.stream]);
  const assessment = built.qs;
  const validation = useMemo(() => validateAssessment(assessment), [assessment]);
  const visible = useMemo(
    () => adaptiveOrderedVisible(assessment, answers, isAdaptiveConfident),
    [assessment, answers],
  );

  // Console warning if branching ever drops the test below the floor.
  useEffect(() => {
    if (visible.length > 0 && visible.length < ADAPTIVE_MIN_VISIBLE) {
      console.warn(
        `[career-engine] visible=${visible.length} fell below adaptive floor ${ADAPTIVE_MIN_VISIBLE}`,
      );
    }
  }, [visible.length]);

  // Reset "why this question" state when question changes.
  const safeIdx = Math.min(idx, visible.length - 1);
  const q = visible[safeIdx];
  useEffect(() => {
    setWhyOpen(false);
  }, [q?.id]);
  const pct = Math.min(100, Math.round(((safeIdx + 1) / Math.max(1, visible.length)) * 100));

  // Persistent elapsed-time tracker. Starts on first question view; survives reloads.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (submitting) return;
    const startedAt = getAttemptStartedAt();
    if (!startedAt) return;
    const TIMEOUT_MS = 30 * 60_000; // 30 minutes
    const tick = () => {
      const e = Date.now() - startedAt;
      setElapsedMs(e);
      if (!timeoutFiredRef.current && e > TIMEOUT_MS) {
        timeoutFiredRef.current = true;
        try {
          track("test_timeout", {
            session_id: sessionId ?? getSessionId() ?? null,
            props: {
              attempt_id: getAttemptId(),
              elapsed_ms: e,
              answered: Object.keys(answers).length,
              current_index: safeIdx,
              total: visible.length,
            },
            dedupeKey: `test_timeout:${getAttemptId() ?? "anon"}`,
          });
        } catch {
          /* noop */
        }
      }
    };
    tick();
    const i = window.setInterval(tick, 1000);
    return () => window.clearInterval(i);
  }, [submitting, q?.id, sessionId, answers, safeIdx, visible.length]);

  // Fire ce_question_viewed once per question, and stamp view-time for latency.
  useEffect(() => {
    if (!q) return;
    if (lastTrackedQRef.current === q.id) return;
    lastTrackedQRef.current = q.id;
    questionViewAtRef.current = Date.now();
    // Also lazily mark attempt started so the timer survives reloads.
    getOrInitAttemptStartedAt();
    trackQuestionViewed({
      sessionId: sessionId ?? getSessionId(),
      attemptId: getAttemptId(),
      questionId: q.id,
      kind: q.kind ?? "unknown",
      index: safeIdx,
      total: visible.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasRestoredRef, safeIdx, visible.length, built.qs]);

  // Power-User Keyboard Navigation (1, 2, 3, 4)
  useEffect(() => {
    if (!q || submitting || debugOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input (though there are none, it's good practice)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num > 0 && num <= q.options.length) {
        // Prevent default to avoid scrolling
        e.preventDefault();
        select(q.options[num - 1].value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [q, submitting, debugOpen]);

  const finishTest = async (finalAnswers: Record<string, string>) => {
    if (finalisedRef.current) return;
    finalisedRef.current = true;
    setSubmitting(true);
    try {
      track("quiz_completed", {
        session_id: sessionId ?? getSessionId() ?? null,
        props: {
          answered: Object.keys(finalAnswers).length,
          stream: finalAnswers.stream ?? null,
        },
      });
    } catch {
      /* noop */
    }

    // Ensure we have a lead row to patch. If /start failed to create one,
    // create it now using the saved profile.
    let leadId = getLeadId();
    const profile = getProfile();
    let sid = sessionId ?? getSessionId();

    const result = computeResult(finalAnswers, {
      questions: assessment,
      meta: {
        attemptId: getAttemptId(),
        sessionId: sid,
        leadId,
        assessmentSeed: seed,
      },
    });
    cacheResult(result);
    const startedAt = getAttemptStartedAt() ?? Date.now();
    trackAttemptSubmitted({
      sessionId: sid,
      leadId,
      attemptId: getAttemptId(),
      seed,
      answered: Object.keys(finalAnswers).length,
      elapsedMs: Math.max(0, Date.now() - startedAt),
    });

    try {
      if (!sid) sid = await startSession(finalAnswers.stream);
      if (!leadId && profile && sid) {
        leadId = await createLeadEarly({
          sessionId: sid,
          name: profile.name,
          phone: profile.phone,
          email: profile.email,
          whatsappOptin: profile.whatsappOptin,
        });
        result.resultMeta = { ...result.resultMeta, leadId };
      }

      // Generate AI skill gap analysis & study plan before saving
      try {
        const aiRes = await runAIAnalysis({ data: { result } });
        if (aiRes.ok && aiRes.analysis) {
          result.aiAnalysis = aiRes.analysis;
        }
      } catch (aiErr) {
        console.warn("AI generation failed, skipping", aiErr);
      }

      if (leadId) {
        cacheResult(result);
        await finalizeLead({ leadId, result });
      }
    } catch (err) {
      console.error("finalize failed", err);
      toast.error(
        humanizeCareerEngineError(err, "We couldn't save your result, but you can still view it."),
        {
          action: {
            label: "Retry",
            onClick: () => {
              finalisedRef.current = false;
              void finishTest(finalAnswers);
            },
          },
        },
      );
    }

    // Value-first funnel: if we don't have a profile yet (anonymous user
    // took the test straight from the landing page), collect PII on /lead
    // before showing the full result. The /lead page reads ce_result
    // from sessionStorage and finalises the lead itself.
    if (!profile || !leadId) {
      navigate({ to: "/career-engine/lead" }).catch(() => {
        window.location.href = "/career-engine/lead";
      });
      return;
    }

    navigate({
      to: "/career-engine/result",
      search: { id: leadId },
    }).catch(() => {
      window.location.href = `/career-engine/result?id=${leadId}`;
    });
  };

  const select = async (value: string) => {
    if (advancingRef.current || submitting) return;
    advancingRef.current = true;
    // Tactile feedback on supported devices (mobile only, desktop is a no-op).
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(8);
    } catch {
      /* noop */
    }
    const currentQ = q;
    const step = answerQuestion({
      assessment,
      currentQuestion: currentQ,
      currentAnswers: answers,
      value,
    });
    const next = step.answers;
    setAnswers(next);
    saveAnswers(next);
    // Make sure the attempt timer is anchored on first interaction.
    getOrInitAttemptStartedAt();

    // Lazily start the session on first answer (carries the stream).
    let sid = sessionId;
    if (!sid && !startedRef.current) {
      startedRef.current = true;
      // Fire the funnel-level `quiz_started` once per attempt (first answer).
      try {
        if (typeof window !== "undefined") {
          const key = `ce_quiz_started_${getAttemptId() ?? "anon"}`;
          if (!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, "1");
            track("quiz_started", {
              props: {
                first_question_id: currentQ.id,
                stream: currentQ.id === "stream" ? value : null,
              },
            });
          }
        }
      } catch {
        /* noop */
      }
      try {
        sid = await startSession(currentQ.id === "stream" ? value : undefined);
        setSessionId(sid);
      } catch (e) {
        console.error("session start failed", e);
      }
    }
    if (sid) {
      recordAnswer(sid, currentQ.id, value).catch((e) => console.error("answer save failed", e));
    }

    // Latency = time between question view and selection.
    const latencyMs = questionViewAtRef.current
      ? Math.max(0, Date.now() - questionViewAtRef.current)
      : 0;
    trackQuestionAnswered({
      sessionId: sid,
      attemptId: getAttemptId(),
      questionId: currentQ.id,
      kind: currentQ.kind ?? "unknown",
      value,
      index: safeIdx,
      total: visible.length,
      latencyMs,
    });

    // Advance or finish synchronously. Every selection auto-advances so
    // users are never asked to "confirm" or read a signalling panel — the
    // `advancingRef` above still absorbs rapid double-taps.
    if (step.complete) {
      void finishTest(next);
      return;
    }
    setIdx(step.nextIndex);
    // Release the lock on the next tick so React commits the new index first.
    setTimeout(() => {
      advancingRef.current = false;
    }, 0);
  };

  if (!q) {
    if (built.error) {
      return (
        <CareerShell>
          <div className="rounded-2xl border border-rose-400/30 bg-rose-400/[0.06] p-6 text-center">
            <p className="font-grotesk text-lg font-bold text-white">
              We hit a snag preparing your test.
            </p>
            <p className="mt-2 text-sm text-white/70">
              Tap below to draw a fresh assessment, your profile is saved.
            </p>
            <button
              type="button"
              onClick={() => {
                startFreshAttempt({ preserveProfile: true });
                if (typeof window !== "undefined") window.location.reload();
              }}
              className="btn btn-primary mt-5"
            >
              Retry the test
            </button>
            <p className="mt-3 font-mono text-micro uppercase tracking-[0.18em] text-rose-200/70">
              {built.error}
            </p>
          </div>
        </CareerShell>
      );
    }
    return (
      <CareerShell>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-3 w-16 motion-safe:animate-pulse rounded bg-white/10" />
            <div className="h-6 w-12 motion-safe:animate-pulse rounded-full bg-white/10" />
          </div>
          <div className="mt-4 h-6 w-3/4 motion-safe:animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-6 w-1/2 motion-safe:animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-4 w-1/3 motion-safe:animate-pulse rounded bg-white/10" />

          <div className="mt-8 grid gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 w-full motion-safe:animate-pulse rounded-2xl bg-white/[0.04]"
              />
            ))}
          </div>
        </div>
      </CareerShell>
    );
  }

  if (submitting) {
    return <CinematicProcessing />;
  }

  const back = () => {
    if (safeIdx === 0) return;
    setIdx(safeIdx - 1);
  };

  const meta = KIND_META[q.kind];

  // Segmented dot row, shows progress through each question kind.
  const kindOrder = useMemo(() => {
    const seen: string[] = [];
    for (const vq of visible) {
      const k = vq.kind ?? "unknown";
      if (!seen.includes(k)) seen.push(k);
    }
    return seen;
  }, [visible]);
  // Halfway encouragement pill (only at the midpoint, single question)
  const halfwayIdx = Math.max(1, Math.floor(visible.length / 2)) - 1;
  const isHalfway = visible.length >= 10 && safeIdx === halfwayIdx;

  const fmt = (ms: number) => {
    const s = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem.toString().padStart(2, "0")}`;
  };

  const copy = (key: string, value: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(key);
        setTimeout(() => setCopied((c) => (c === key ? null : c)), 1400);
      })
      .catch(() => {
        /* noop */
      });
  };

  return (
    <CareerShell>
      {/* Premium progress rail — pitch black + electric light blue */}
      <div className="mb-4 sm:mb-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-slate-200 sm:text-micro">
          <span className="shrink-0 font-bold text-sky-400">
            Q {safeIdx + 1}/{visible.length}
          </span>
          <div className="flex items-center gap-1.5" aria-hidden>
            {Array.from({ length: visible.length }).map((_, i) => (
              <span
                key={i}
                className={`h-[4px] flex-1 rounded-full transition-all duration-300 ${
                  i < safeIdx
                    ? "bg-sky-500"
                    : i === safeIdx
                      ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,1)]"
                      : "bg-white/15"
                }`}
              />
            ))}
          </div>
          <span className="shrink-0 tabular-nums font-bold text-sky-400">{fmt(elapsedMs)}</span>
        </div>
        <Progress value={pct} className="sr-only" />
        {kindOrder.length > 1 ? (
          <div className="mt-2.5 flex items-center gap-1.5 sm:mt-3">
            {kindOrder.map((k) => {
              const inSection = visible.filter((vq) => (vq.kind ?? "unknown") === k);
              const done = inSection.filter((vq) => answers[vq.id]).length;
              const total = inSection.length;
              const isCurrent = (q.kind ?? "unknown") === k;
              const filled = total > 0 ? done / total : 0;
              return (
                <div
                  key={k}
                  className={`group relative h-1.5 flex-1 overflow-hidden rounded-full ${
                    isCurrent ? "bg-white/20 border border-sky-400/30" : "bg-white/10"
                  }`}
                  title={`${k}: ${done}/${total}`}
                >
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCurrent ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" : "bg-white/50"
                    }`}
                    style={{ width: `${Math.round(filled * 100)}%` }}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {isHalfway ? (
        <div className="mb-3 rounded-2xl border border-sky-400/40 bg-sky-500/10 px-4 py-3 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)] motion-safe:animate-[fade-in_400ms_ease-out]">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
            Halfway · You're answering more decisively than most test-takers.
          </p>
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/20 bg-black/90 p-6 shadow-[0_0_60px_rgba(0,0,0,0.95)] ring-1 ring-sky-500/20 backdrop-blur-2xl sm:p-9"
        >
          {/* Electric Light Blue Top Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.22),transparent_70%)]"
          />

          {/* Eyebrow row */}
          <div className="relative mb-4 flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-sky-300 bg-sky-500/15 border border-sky-500/30 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.15)]">
              {meta.chip}
            </span>
            <button
              type="button"
              onClick={() => setWhyOpen((v) => !v)}
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sky-300 transition hover:bg-sky-500/20 hover:border-sky-400"
              aria-expanded={whyOpen}
              aria-label="Why this question"
            >
              <HelpCircle className="h-3.5 w-3.5 text-sky-400" />
              <span>Why</span>
            </button>
          </div>

          {whyOpen ? (
            <p className="relative mb-4 rounded-xl border border-sky-500/30 bg-black/60 px-4 py-3 text-sm leading-relaxed text-slate-200 shadow-inner">
              {meta.why}
            </p>
          ) : null}

          {/* Question title */}
          <h2 className="relative text-balance font-grotesk text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
            {q.prompt}
          </h2>

          {/* Meta strip */}
          <p className="relative mt-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-xs text-slate-300 sm:mt-3">
            <span className="font-mono font-bold uppercase tracking-[0.18em] text-sky-400">
              Measures
            </span>
            <span className="font-sans font-medium text-slate-200">{questionMeasures(q)}</span>
          </p>

          {q.helper ? (
            <p className="relative mt-3 text-sm leading-relaxed text-slate-200 font-medium">
              {q.helper}
            </p>
          ) : null}

          {q.scenario ? (
            <pre className="relative mt-4 whitespace-pre-wrap rounded-xl border border-white/20 bg-black/80 p-4 font-mono text-xs leading-relaxed text-slate-100 shadow-inner">
              {q.scenario}
            </pre>
          ) : null}

          {/* Input Questions or Options List */}
          <div className="relative mt-6">
            {q.inputType === "text" ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                  placeholder={q.placeholder || "Type your response..."}
                  className="w-full rounded-2xl border border-white/20 bg-black/90 px-5 py-4 text-base font-medium text-white placeholder-slate-400 shadow-inner focus:border-sky-400 focus-ring-sky"
                />
                <button
                  type="button"
                  disabled={!answers[q.id]?.trim()}
                  onClick={() => select(answers[q.id])}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(56,189,248,0.35)] transition hover:bg-sky-400 disabled:opacity-40 focus-ring-sky"
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : q.inputType === "candidate_info" ? (
              <div className="space-y-4 rounded-2xl border border-white/20 bg-black/90 p-5 sm:p-6 shadow-2xl">
                <div>
                  <label className="block text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={answers.candidate_name || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, candidate_name: e.target.value }))
                    }
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-white/20 bg-black px-4 py-3 text-sm font-medium text-white placeholder-slate-500 focus:border-sky-400 focus-ring-sky"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                      Mobile / WhatsApp <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={answers.candidate_phone || ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          candidate_phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        }))
                      }
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border border-white/20 bg-black px-4 py-3 text-sm font-medium text-white placeholder-slate-500 focus:border-sky-400 focus-ring-sky"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={answers.candidate_email || ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({ ...prev, candidate_email: e.target.value }))
                      }
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-white/20 bg-black px-4 py-3 text-sm font-medium text-white placeholder-slate-500 focus:border-sky-400 focus-ring-sky"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  disabled={
                    !answers.candidate_name?.trim() ||
                    (answers.candidate_phone || "").length < 10 ||
                    !answers.candidate_email?.includes("@")
                  }
                  onClick={() => {
                    const summaryVal = `${answers.candidate_name} | ${answers.candidate_phone} | ${answers.candidate_email}`;
                    if (
                      sessionId &&
                      answers.candidate_name &&
                      answers.candidate_phone &&
                      answers.candidate_email
                    ) {
                      void createLeadEarly({
                        sessionId,
                        name: answers.candidate_name,
                        phone: answers.candidate_phone,
                        email: answers.candidate_email,
                        whatsappOptin: true,
                      }).catch(() => {});
                    }
                    select(summaryVal);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(56,189,248,0.35)] transition hover:bg-sky-400 disabled:opacity-40 focus-ring-sky"
                >
                  <span>Save Profile Details & Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="grid gap-3">
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => select(opt.value)}
                      className={`group flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-base font-medium leading-snug transition-all duration-200 relative overflow-hidden focus-ring-sky ${
                        selected
                          ? "border-sky-400 bg-sky-500/20 text-white shadow-[0_0_30px_rgba(56,189,248,0.35)] scale-[0.98]"
                          : "border-white/15 bg-[#0D1322]/90 text-slate-100 hover:border-sky-400/60 hover:bg-[#111A2E] hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                      }`}
                    >
                      {selected && (
                        <motion.div
                          layoutId="selected-glow"
                          className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-transparent pointer-events-none"
                        />
                      )}
                      <div className="flex items-center gap-3.5 min-w-0 z-10">
                        <span
                          className={`flex items-center justify-center h-7 w-7 rounded-lg border transition-colors font-mono text-xs font-bold ${selected ? "border-sky-400 bg-sky-500/30 text-sky-200 shadow-sm" : "border-white/20 bg-white/10 text-slate-300 group-hover:border-sky-400/60 group-hover:bg-sky-500/20 group-hover:text-sky-300"}`}
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0 font-medium text-white">{opt.label}</span>
                      </div>
                      <ArrowRight
                        className={`h-4.5 w-4.5 shrink-0 transition-transform duration-200 z-10 ${selected ? "text-sky-400 translate-x-0.5" : "text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1"}`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <p className="relative mt-6 text-center font-mono text-xs font-bold uppercase tracking-[0.22em] text-slate-300 sm:mt-7">
            NO RIGHT ANSWERS · 13 TRAITS · 6 ROLE TRACKS
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between sm:mt-6">
        <button
          onClick={back}
          disabled={safeIdx === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10 hover:border-sky-400/50 disabled:opacity-30 focus-ring-sky"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-sky-400" /> Back
        </button>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400">
          {Math.max(0, visible.length - safeIdx - 1)} QUESTIONS LEFT
        </span>
      </div>

      {safeIdx > 0 && (
        <div className="mt-5 flex justify-center">
          <StartFreshButton />
        </div>
      )}

      {/* Debug toggle: only visible if already enabled via ?debug=1 or localStorage. */}
      {debugOpen ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setDebugOpen(false);
              if (typeof window !== "undefined") {
                window.localStorage.setItem("ce_debug", "0");
              }
            }}
            className="font-mono text-micro uppercase tracking-[0.18em] text-white/60 hover:text-white"
          >
            Hide debug
          </button>
        </div>
      ) : null}

      {debugOpen ? (
        <div className="mt-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.04] p-4 font-mono text-micro leading-relaxed text-amber-100/90">
          <div className="mb-2 flex items-center justify-between text-micro uppercase tracking-[0.2em] text-amber-300/80">
            <span>Debug · Career Engine</span>
            <span>
              idx {safeIdx} / {visible.length - 1}
            </span>
          </div>
          <dl className="grid grid-cols-[120px_1fr] gap-x-3 gap-y-1">
            <dt className="text-amber-300/70">current q.id</dt>
            <dd className="text-white">{q.id}</dd>
            <dt className="text-amber-300/70">q.kind</dt>
            <dd className="text-white">{q.kind ?? "—"}</dd>
            <dt className="text-amber-300/70">idx (raw)</dt>
            <dd className="text-white">{idx}</dd>
            <dt className="text-amber-300/70">safeIdx</dt>
            <dd className="text-white">{safeIdx}</dd>
            <dt className="text-amber-300/70">visible.length</dt>
            <dd className={visible.length < ADAPTIVE_MIN_VISIBLE ? "text-rose-300" : "text-white"}>
              {visible.length} / {assessment.length}
              {visible.length < ADAPTIVE_MIN_VISIBLE
                ? ` (below adaptive floor ${ADAPTIVE_MIN_VISIBLE})`
                : ""}
            </dd>
            <dt className="text-amber-300/70">sessionId</dt>
            <dd className="break-all text-white">{sessionId ?? "—"}</dd>
            <dt className="text-amber-300/70">seed</dt>
            <dd className="break-all text-white">
              <button
                type="button"
                onClick={() => copy("seed", seed)}
                className="inline-flex items-center gap-1 hover:text-amber-200"
                title="Copy seed"
              >
                {seed}
                {copied === "seed" ? (
                  <Check className="h-3 w-3 text-eyebrow" />
                ) : (
                  <Copy className="h-3 w-3 opacity-60" />
                )}
              </button>
            </dd>
            <dt className="text-amber-300/70">reproduce url</dt>
            <dd className="break-all text-white">
              <button
                type="button"
                onClick={() => copy("url", reproducerUrl(seed))}
                className="inline-flex items-center gap-1 text-left hover:text-amber-200"
                title="Copy reproducer URL"
              >
                <span className="break-all">{reproducerUrl(seed)}</span>
                {copied === "url" ? (
                  <Check className="h-3 w-3 shrink-0 text-eyebrow" />
                ) : (
                  <Copy className="h-3 w-3 shrink-0 opacity-60" />
                )}
              </button>
            </dd>
            <dt className="text-amber-300/70">target total</dt>
            <dd className="text-white">{TARGET_TOTAL}</dd>
            <dt className="text-amber-300/70">quotas</dt>
            <dd className="text-white">
              {(Object.keys(QUOTAS) as Array<keyof typeof QUOTAS>)
                .map((k) => `${k} ${QUOTAS[k]}`)
                .join(" · ")}
            </dd>
            <dt className="text-amber-300/70">actual</dt>
            <dd className={validation.perKindOk ? "text-eyebrow" : "text-rose-300"}>
              {(Object.keys(QUOTAS) as Array<keyof typeof QUOTAS>)
                .map((k) => `${k} ${validation.perKind[k] ?? 0}`)
                .join(" · ")}
              {validation.perKindOk ? " ✓" : " ✗"}
            </dd>
            <dt className="text-amber-300/70">total ok</dt>
            <dd className={validation.totalOk ? "text-eyebrow" : "text-rose-300"}>
              {validation.total} {validation.totalOk ? "✓" : `✗ (need ${TARGET_TOTAL})`}
            </dd>
            <dt className="text-amber-300/70">duplicates</dt>
            <dd className={validation.noDuplicates ? "text-eyebrow" : "text-rose-300"}>
              {validation.noDuplicates ? "none ✓" : validation.duplicates.join(", ")}
            </dd>
            <dt className="text-amber-300/70">submitting</dt>
            <dd className="text-white">{String(submitting)}</dd>
            <dt className="text-amber-300/70">advancing</dt>
            <dd className="text-white">{String(advancingRef.current)}</dd>
          </dl>

          <div className="mt-3 text-micro uppercase tracking-[0.2em] text-amber-300/70">
            Visible questions ({visible.length})
          </div>
          <ol className="mt-1 max-h-40 overflow-auto rounded border border-white/10 bg-[#0a0c10]/40 p-2 text-micro">
            {visible.map((vq, i) => (
              <li key={vq.id} className={i === safeIdx ? "text-amber-300" : "text-white/70"}>
                {i.toString().padStart(2, "0")} · {vq.id}
                {answers[vq.id] ? (
                  <span className="text-eyebrow/80"> = {answers[vq.id]}</span>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-3 text-micro uppercase tracking-[0.2em] text-amber-300/70">
            Answers ({Object.keys(answers).length})
          </div>
          <pre className="mt-1 max-h-32 overflow-auto rounded border border-white/10 bg-[#0a0c10]/40 p-2 text-micro text-white/80">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      ) : null}
    </CareerShell>
  );
}
