import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { bh as captureAttribution, P as getAttemptId, j as trackCEFunnelStep, T as getSessionId, i as isAttemptExpired, r as resetCareerEngineState, N as hasResumableAttempt, O as startFreshAttempt, bi as buildAssessment, bj as getOrCreateSeed, bk as lockSeed, bl as SamplerError, bm as validateAssessment, bn as ADAPTIVE_MIN_VISIBLE, bo as trackQuestionViewed, k as CareerShell, Y as createLeadEarly, bp as StartFreshButton, bq as reproducerUrl, br as TARGET_TOTAL, bs as QUOTAS, bd as adaptiveVisibleFromAssessment, be as ADAPTIVE_MIN_POOL_ANSWERS, t as track, p as persistCareerEngineSnapshot, c as cn, U as startSession, a2 as recordAnswer, bt as trackQuestionAnswered, bf as _debugScore, bg as isAdaptiveConfident, a3 as getLeadId, M as getProfile, a1 as computeResult, bu as trackAttemptSubmitted, bv as finalizeLead, a6 as humanizeCareerEngineError } from "./router-CvdLERTV.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { bn as CircleQuestionMark, q as ArrowRight, a6 as ArrowLeft, Z as Check, ar as Copy, m as ShieldCheck } from "../_libs/lucide-react.mjs";
import { p as objectType, B as anyType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-CMxFZmfM.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-CGVBerDj.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./moments.types-CDdnLKsa.mjs";
import "./enrolment.functions-Cs_77DUe.mjs";
import "./enrolmentTiers-CKOrj6Lb.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/workflow__serde.mjs";
import "../_libs/ai-sdk__openai.mjs";
import "../_libs/lovable.dev__webhooks-js.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./client.server-DUn3rRvm.mjs";
import "./redis.server-jD5sLB4g.mjs";
import "../_libs/react-email__render.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__text.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__button.mjs";
import "../_libs/react-email__hr.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const inputSchema = objectType({
  result: anyType()
});
const getAIAnalysis = createServerFn({
  method: "POST"
}).inputValidator((i) => inputSchema.parse(i)).handler(createSsrRpc("2b58fc143e4566caf1db41d0aa6b96dbd639bb3239f584670d85cdd05d164b89"));
function targetDifficulty(microPct, microAnswered) {
  if (microAnswered < 1) return null;
  if (microPct >= 80) return "hard";
  if (microPct >= 50) return "medium";
  return "easy";
}
const DIFF_RANK = {
  easy: 0,
  medium: 1,
  hard: 2
};
function difficultyDistance(a, b) {
  const da = DIFF_RANK[a ?? "medium"];
  const db = DIFF_RANK[b ?? "medium"];
  return Math.abs(da - db);
}
const isAnchor = (q) => q.kind === "profile" || q.kind === "commitment";
function deriveSignals(answers) {
  let leaders = [];
  const laggards = /* @__PURE__ */ new Set();
  let target = null;
  try {
    const dbg = _debugScore(answers);
    const ranked = dbg.paths.map((p) => p.slug);
    leaders = ranked.slice(0, 2);
    ranked.slice(Math.ceil(ranked.length / 2)).forEach((slug) => laggards.add(slug));
    target = targetDifficulty(dbg.microPct, dbg.tally.microTotal);
  } catch {
    leaders = [];
    target = null;
  }
  return { leaders, laggards, target };
}
function priorityScore(q, signals) {
  let score = 0;
  if (q.paths && q.paths.length) {
    if (signals.leaders[0] && q.paths.includes(signals.leaders[0])) score += 3;
    if (signals.leaders[1] && q.paths.includes(signals.leaders[1])) score += 1.5;
    if (q.paths.every((p) => signals.laggards.has(p))) score -= 1.5;
  }
  if (q.kind === "micro" && signals.target) {
    const dist = difficultyDistance(q.difficulty, signals.target);
    if (dist === 0)
      score += 2;
    else if (dist === 1)
      score += 0.5;
    else score -= 1.5;
  }
  return score;
}
function adaptiveOrderedVisible(assessment, answers, isConfident) {
  const visible = adaptiveVisibleFromAssessment(assessment, answers, isConfident);
  const poolAnswered = visible.filter((q) => !isAnchor(q) && answers[q.id]).length;
  if (poolAnswered < Math.min(4, ADAPTIVE_MIN_POOL_ANSWERS)) return visible;
  const signals = deriveSignals(answers);
  if (!signals.leaders.length && !signals.target) return visible;
  const flexibleSlots = [];
  const flexibleQs = [];
  visible.forEach((q, i) => {
    if (!isAnchor(q) && !answers[q.id]) {
      flexibleSlots.push(i);
      flexibleQs.push({ q, originalIndex: i });
    }
  });
  if (flexibleQs.length <= 1) return visible;
  const ranked = flexibleQs.map((entry) => ({ ...entry, score: priorityScore(entry.q, signals) })).sort(
    (a, b) => b.score - a.score || a.originalIndex - b.originalIndex
    // stable
  );
  const out = visible.slice();
  flexibleSlots.forEach((slot, i) => {
    out[slot] = ranked[i].q;
  });
  return out;
}
const KIND_META = {
  profile: {
    chip: "Quick context",
    why: "Helps us tailor the rest of your test to your background.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold"
  },
  scenario: {
    chip: "Real shift situation",
    why: "Tests how you'd actually decide on the job, under realistic pressure.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold"
  },
  behaviour: {
    chip: "How you work",
    why: "Maps your natural working style — no right or wrong answer.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold"
  },
  micro: {
    chip: "Mini skill check",
    why: "A quick aptitude probe — has a correct answer, but it's a tiny slice of overall fit.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold"
  },
  lifestyle: {
    chip: "Your life fit",
    why: "Checks whether the day-to-day rhythm of this path matches how you want to live.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold"
  },
  commitment: {
    chip: "Reality check",
    why: "An honesty check — this filters paths that look glamorous but won't actually suit you.",
    ring: "border-sky-500/30 bg-sky-500/10",
    text: "text-sky-300 font-semibold"
  }
};
function questionMeasures(question) {
  if (question.measures) return question.measures;
  switch (question.kind) {
    case "profile":
      return "Background context — used to tailor the rest of your test.";
    case "scenario":
      return "Measures how you'd actually decide on the job, under real-world tradeoffs.";
    case "behaviour":
      return "Measures your natural working style — there is no right answer.";
    case "micro":
      return "A short aptitude probe with one correct answer. Diagnostic only.";
    case "lifestyle":
      return "Measures whether the day-to-day rhythm of this path fits how you want to live.";
    case "commitment":
      return "Honesty check — filters paths that look glamorous but won't suit you.";
    default:
      return "";
  }
}
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const ANSWERS_KEY = "ce_answers";
const RESULT_KEY = "ce_result";
const STARTED_AT_KEY = "ce_attempt_started_at";
function loadSavedAnswers() {
  if (typeof window === "undefined") return {};
  try {
    const saved = JSON.parse(sessionStorage.getItem(ANSWERS_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}
function saveAnswers(answers) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  sessionStorage.removeItem(RESULT_KEY);
  persistCareerEngineSnapshot();
}
function answerQuestion(args) {
  const answers = { ...args.currentAnswers, [args.currentQuestion.id]: args.value };
  const visible = adaptiveOrderedVisible(args.assessment, answers, isAdaptiveConfident);
  const currentPos = visible.findIndex((x) => x.id === args.currentQuestion.id);
  return {
    answers,
    nextIndex: currentPos === -1 ? visible.length : currentPos + 1,
    complete: currentPos === -1 || currentPos + 1 >= visible.length
  };
}
function cacheResult(result) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
  persistCareerEngineSnapshot();
}
function cachedResultMatches(activeAttemptId, activeSeed) {
  if (typeof window === "undefined") return false;
  try {
    const cached = JSON.parse(sessionStorage.getItem(RESULT_KEY) || "null");
    if (!cached?.archetypeId) return false;
    const meta = cached.resultMeta ?? {};
    return Boolean(
      (!activeAttemptId || meta.attemptId === activeAttemptId) && (!activeSeed || meta.assessmentSeed === activeSeed)
    );
  } catch {
    return false;
  }
}
function getOrInitAttemptStartedAt() {
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
function getAttemptStartedAt() {
  if (typeof window === "undefined") return null;
  const v = sessionStorage.getItem(STARTED_AT_KEY);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function CinematicProcessing() {
  const [step, setStep] = reactExports.useState(0);
  const steps = ["Compiling matrix of 40 behavioral data points...", "Scanning 13 core cognitive and domain traits...", "Evaluating match against 6 industry pathways...", "Calibrating Confidence Band...", "Finalising Career Fit Engine Report..."];
  reactExports.useEffect(() => {
    if (step < steps.length - 1) {
      const timer = setTimeout(() => setStep((s) => s + 1), 600);
      return () => clearTimeout(timer);
    }
  }, [step]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CareerShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-24 w-24 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-4 border-white/10 border-t-sky-400 motion-safe:animate-spin shadow-[0_0_15px_rgba(56,189,248,0.5)]", style: {
        animationDuration: "1s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded-full border-4 border-white/5 border-l-brand-gold motion-safe:animate-spin", style: {
        animationDuration: "1.5s",
        animationDirection: "reverse"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-sky-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        opacity: [0.5, 1, 0.5]
      }, transition: {
        duration: 1,
        repeat: Infinity
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-white mb-6", children: "Algorithmic Analysis in Progress" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm mx-auto bg-black/40 rounded-xl border border-white/10 p-4 font-mono text-left", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 5
    }, animate: {
      opacity: i <= step ? 1 : 0.3,
      color: i < step ? "#7fb0d8" : i === step ? "#ffffff" : "#475569"
    }, className: "text-[11px] sm:text-xs mb-2 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: i < step ? "✓" : i === step ? "►" : "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s })
    ] }, i)) })
  ] }) });
}
function TestPage() {
  const navigate = useNavigate();
  const runAIAnalysis = useServerFn(getAIAnalysis);
  const [answers, setAnswers] = reactExports.useState({});
  const [idx, setIdx] = reactExports.useState(0);
  const [sessionId, setSessionId] = reactExports.useState(null);
  const [seed, setSeed] = reactExports.useState("ssr");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const startedRef = reactExports.useRef(false);
  const finalisedRef = reactExports.useRef(false);
  const advancingRef = reactExports.useRef(false);
  const timeoutFiredRef = reactExports.useRef(false);
  const [debugOpen, setDebugOpen] = reactExports.useState(false);
  const [whyOpen, setWhyOpen] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(null);
  const [elapsedMs, setElapsedMs] = reactExports.useState(0);
  const questionViewAtRef = reactExports.useRef(0);
  const lastTrackedQRef = reactExports.useRef(null);
  const hasRestoredRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const qs = new URLSearchParams(window.location.search);
    if (qs.get("debug") === "1" || window.localStorage.getItem("ce_debug") === "1") {
      setDebugOpen(true);
    }
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      captureAttribution();
    } catch {
    }
    try {
      const key = `ce_test_viewed_${getAttemptId() ?? "anon"}`;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        trackCEFunnelStep({
          step: "test",
          sessionId: getSessionId(),
          attemptId: getAttemptId()
        });
      }
    } catch {
    }
    if (isAttemptExpired()) {
      resetCareerEngineState();
      toast.message("Your previous attempt expired", {
        description: "Please start fresh, your progress was over 2 hours old."
      });
      window.location.href = "/career-engine";
      return;
    }
    if (!hasResumableAttempt()) {
      startFreshAttempt({
        preserveProfile: true
      });
    }
    const saved = loadSavedAnswers();
    if (Object.keys(saved).length) {
      setAnswers(saved);
      const assessment2 = buildAssessment(getOrCreateSeed(getSessionId() ?? ""), saved.stream ?? null);
      const visible2 = adaptiveOrderedVisible(assessment2, saved, isAdaptiveConfident);
      setIdx(Math.min(visible2.length, Math.max(0, Object.keys(saved).length)));
    }
    hasRestoredRef.current = true;
    const sid = getSessionId();
    setSessionId(sid);
    const s = getOrCreateSeed(sid);
    lockSeed(s);
    if (!cachedResultMatches(getAttemptId(), s)) sessionStorage.removeItem("ce_result");
    setSeed(s);
  }, []);
  const built = reactExports.useMemo(() => {
    try {
      const stream = answers.stream ?? null;
      const qs = buildAssessment(seed, stream);
      return {
        qs,
        error: null
      };
    } catch (e) {
      const msg = e instanceof SamplerError ? e.message : "Unknown sampler error";
      console.error("[career-engine] sampler failed", e);
      return {
        qs: [],
        error: msg
      };
    }
  }, [seed, answers.stream]);
  const assessment = built.qs;
  const validation = reactExports.useMemo(() => validateAssessment(assessment), [assessment]);
  const visible = reactExports.useMemo(() => adaptiveOrderedVisible(assessment, answers, isAdaptiveConfident), [assessment, answers]);
  reactExports.useEffect(() => {
    if (visible.length > 0 && visible.length < ADAPTIVE_MIN_VISIBLE) {
      console.warn(`[career-engine] visible=${visible.length} fell below adaptive floor ${ADAPTIVE_MIN_VISIBLE}`);
    }
  }, [visible.length]);
  const safeIdx = Math.min(idx, visible.length - 1);
  const q = visible[safeIdx];
  reactExports.useEffect(() => {
    setWhyOpen(false);
  }, [q?.id]);
  const pct = Math.min(100, Math.round((safeIdx + 1) / Math.max(1, visible.length) * 100));
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (submitting) return;
    const startedAt = getAttemptStartedAt();
    if (!startedAt) return;
    const TIMEOUT_MS = 30 * 6e4;
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
              total: visible.length
            },
            dedupeKey: `test_timeout:${getAttemptId() ?? "anon"}`
          });
        } catch {
        }
      }
    };
    tick();
    const i = window.setInterval(tick, 1e3);
    return () => window.clearInterval(i);
  }, [submitting, q?.id, sessionId, answers, safeIdx, visible.length]);
  reactExports.useEffect(() => {
    if (!q) return;
    if (lastTrackedQRef.current === q.id) return;
    lastTrackedQRef.current = q.id;
    questionViewAtRef.current = Date.now();
    getOrInitAttemptStartedAt();
    trackQuestionViewed({
      sessionId: sessionId ?? getSessionId(),
      attemptId: getAttemptId(),
      questionId: q.id,
      kind: q.kind ?? "unknown",
      index: safeIdx,
      total: visible.length
    });
  }, [hasRestoredRef, safeIdx, visible.length, built.qs]);
  reactExports.useEffect(() => {
    if (!q || submitting || debugOpen) return;
    const handleKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num > 0 && num <= q.options.length) {
        e.preventDefault();
        select(q.options[num - 1].value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [q, submitting, debugOpen]);
  const finishTest = async (finalAnswers) => {
    if (finalisedRef.current) return;
    finalisedRef.current = true;
    setSubmitting(true);
    try {
      track("quiz_completed", {
        session_id: sessionId ?? getSessionId() ?? null,
        props: {
          answered: Object.keys(finalAnswers).length,
          stream: finalAnswers.stream ?? null
        }
      });
    } catch {
    }
    let leadId = getLeadId();
    const profile = getProfile();
    let sid = sessionId ?? getSessionId();
    const result = computeResult(finalAnswers, {
      questions: assessment,
      meta: {
        attemptId: getAttemptId(),
        sessionId: sid,
        leadId,
        assessmentSeed: seed
      }
    });
    cacheResult(result);
    const startedAt = getAttemptStartedAt() ?? Date.now();
    trackAttemptSubmitted({
      sessionId: sid,
      leadId,
      attemptId: getAttemptId(),
      seed,
      answered: Object.keys(finalAnswers).length,
      elapsedMs: Math.max(0, Date.now() - startedAt)
    });
    try {
      if (!sid) sid = await startSession(finalAnswers.stream);
      if (!leadId && profile && sid) {
        leadId = await createLeadEarly({
          sessionId: sid,
          name: profile.name,
          phone: profile.phone,
          email: profile.email,
          whatsappOptin: profile.whatsappOptin
        });
        result.resultMeta = {
          ...result.resultMeta,
          leadId
        };
      }
      try {
        const aiRes = await runAIAnalysis({
          data: {
            result
          }
        });
        if (aiRes.ok && aiRes.analysis) {
          result.aiAnalysis = aiRes.analysis;
        }
      } catch (aiErr) {
        console.warn("AI generation failed, skipping", aiErr);
      }
      if (leadId) {
        cacheResult(result);
        await finalizeLead({
          leadId,
          result
        });
      }
    } catch (err) {
      console.error("finalize failed", err);
      toast.error(humanizeCareerEngineError(err, "We couldn't save your result, but you can still view it."), {
        action: {
          label: "Retry",
          onClick: () => {
            finalisedRef.current = false;
            void finishTest(finalAnswers);
          }
        }
      });
    }
    if (!profile || !leadId) {
      navigate({
        to: "/career-engine/lead"
      }).catch(() => {
        window.location.href = "/career-engine/lead";
      });
      return;
    }
    navigate({
      to: "/career-engine/result",
      search: {
        id: leadId
      }
    }).catch(() => {
      window.location.href = `/career-engine/result?id=${leadId}`;
    });
  };
  const select = async (value) => {
    if (advancingRef.current || submitting) return;
    advancingRef.current = true;
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(8);
    } catch {
    }
    const currentQ = q;
    const step = answerQuestion({
      assessment,
      currentQuestion: currentQ,
      currentAnswers: answers,
      value
    });
    const next = step.answers;
    setAnswers(next);
    saveAnswers(next);
    getOrInitAttemptStartedAt();
    let sid = sessionId;
    if (!sid && !startedRef.current) {
      startedRef.current = true;
      try {
        if (typeof window !== "undefined") {
          const key = `ce_quiz_started_${getAttemptId() ?? "anon"}`;
          if (!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, "1");
            track("quiz_started", {
              props: {
                first_question_id: currentQ.id,
                stream: currentQ.id === "stream" ? value : null
              }
            });
          }
        }
      } catch {
      }
      try {
        sid = await startSession(currentQ.id === "stream" ? value : void 0);
        setSessionId(sid);
      } catch (e) {
        console.error("session start failed", e);
      }
    }
    if (sid) {
      recordAnswer(sid, currentQ.id, value).catch((e) => console.error("answer save failed", e));
    }
    const latencyMs = questionViewAtRef.current ? Math.max(0, Date.now() - questionViewAtRef.current) : 0;
    trackQuestionAnswered({
      sessionId: sid,
      attemptId: getAttemptId(),
      questionId: currentQ.id,
      kind: currentQ.kind ?? "unknown",
      value,
      index: safeIdx,
      total: visible.length,
      latencyMs
    });
    if (step.complete) {
      void finishTest(next);
      return;
    }
    setIdx(step.nextIndex);
    setTimeout(() => {
      advancingRef.current = false;
    }, 0);
  };
  if (!q) {
    if (built.error) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CareerShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-rose-400/30 bg-rose-400/[0.06] p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-grotesk text-lg font-bold text-white", children: "We hit a snag preparing your test." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/70", children: "Tap below to draw a fresh assessment, your profile is saved." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          startFreshAttempt({
            preserveProfile: true
          });
          if (typeof window !== "undefined") window.location.reload();
        }, className: "btn btn-primary mt-5", children: "Retry the test" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-mono text-micro uppercase tracking-[0.18em] text-rose-200/70", children: built.error })
      ] }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CareerShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 motion-safe:animate-pulse rounded bg-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-12 motion-safe:animate-pulse rounded-full bg-white/10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-6 w-3/4 motion-safe:animate-pulse rounded bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-6 w-1/2 motion-safe:animate-pulse rounded bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-4 w-1/3 motion-safe:animate-pulse rounded bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-full motion-safe:animate-pulse rounded-2xl bg-white/[0.04]" }, i)) })
    ] }) });
  }
  if (submitting) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CinematicProcessing, {});
  }
  const back = () => {
    if (safeIdx === 0) return;
    setIdx(safeIdx - 1);
  };
  const meta = KIND_META[q.kind];
  const kindOrder = reactExports.useMemo(() => {
    const seen = [];
    for (const vq of visible) {
      const k = vq.kind ?? "unknown";
      if (!seen.includes(k)) seen.push(k);
    }
    return seen;
  }, [visible]);
  const halfwayIdx = Math.max(1, Math.floor(visible.length / 2)) - 1;
  const isHalfway = visible.length >= 10 && safeIdx === halfwayIdx;
  const fmt = (ms) => {
    const s = Math.max(0, Math.round(ms / 1e3));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem.toString().padStart(2, "0")}`;
  };
  const copy = (key, value) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied((c) => c === key ? null : c), 1400);
    }).catch(() => {
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CareerShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 sm:mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-slate-200 sm:text-micro", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 font-bold text-sky-400", children: [
          "Q ",
          safeIdx + 1,
          "/",
          visible.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", "aria-hidden": true, children: Array.from({
          length: visible.length
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-[3px] flex-1 rounded-full transition-all duration-300 ${i < safeIdx ? "bg-sky-500" : i === safeIdx ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,1)]" : "bg-white/15"}` }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 tabular-nums font-bold text-sky-400", children: fmt(elapsedMs) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "sr-only" }),
      kindOrder.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex items-center gap-1.5", children: kindOrder.map((k) => {
        const inSection = visible.filter((vq) => (vq.kind ?? "unknown") === k);
        const done = inSection.filter((vq) => answers[vq.id]).length;
        const total = inSection.length;
        const isCurrent = (q.kind ?? "unknown") === k;
        const filled = total > 0 ? done / total : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `group relative h-1.5 flex-1 overflow-hidden rounded-full ${isCurrent ? "bg-white/20 border border-sky-400/30" : "bg-white/10"}`, title: `${k}: ${done}/${total}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full transition-all duration-500 ${isCurrent ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" : "bg-white/50"}`, style: {
          width: `${Math.round(filled * 100)}%`
        } }) }, k);
      }) }) : null
    ] }),
    isHalfway ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 rounded-xl border border-sky-400/40 bg-sky-500/10 px-3 py-2 text-center shadow-[0_0_15px_rgba(56,189,248,0.15)] motion-safe:animate-[fade-in_400ms_ease-out]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky-300", children: "Halfway · You're answering more decisively than most test-takers." }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      x: 20
    }, animate: {
      opacity: 1,
      x: 0
    }, exit: {
      opacity: 0,
      x: -20
    }, transition: {
      duration: 0.3,
      ease: "easeOut"
    }, className: "relative overflow-hidden rounded-2xl border border-white/20 bg-black/90 p-4 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.95)] ring-1 ring-sky-500/20 backdrop-blur-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.22),transparent_70%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-2.5 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300 bg-sky-500/15 border border-sky-500/30 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.15)]", children: meta.chip }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setWhyOpen((v) => !v), className: "inline-flex h-6 items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-300 transition hover:bg-sky-500/20 hover:border-sky-400", "aria-expanded": whyOpen, "aria-label": "Why this question", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-3 w-3 text-sky-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Why" })
        ] })
      ] }),
      whyOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mb-3 rounded-xl border border-sky-500/30 bg-black/60 px-3.5 py-2 text-xs sm:text-sm leading-relaxed text-slate-200 shadow-inner", children: meta.why }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "relative text-balance font-grotesk text-lg font-bold leading-snug tracking-tight text-white sm:text-xl lg:text-2xl", children: q.prompt }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-sky-400", children: "Measures" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-medium text-slate-200", children: questionMeasures(q) })
      ] }),
      q.helper ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-2 text-xs sm:text-sm leading-relaxed text-slate-200 font-medium", children: q.helper }) : null,
      q.scenario ? /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "relative mt-3 whitespace-pre-wrap rounded-xl border border-white/20 bg-black/80 p-3 font-mono text-xs leading-relaxed text-slate-100 shadow-inner", children: q.scenario }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-3.5", children: q.inputType === "text" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: answers[q.id] || "", onChange: (e) => setAnswers((prev) => ({
          ...prev,
          [q.id]: e.target.value
        })), placeholder: q.placeholder || "Type your response...", className: "w-full rounded-xl border border-white/20 bg-[#0D1322] px-4 py-3 text-sm font-medium text-white placeholder-slate-400 shadow-inner focus:border-sky-400 focus:bg-[#0D1322] focus:text-white focus-ring-sky" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: !answers[q.id]?.trim(), onClick: () => select(answers[q.id]), className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] transition hover:bg-sky-400 disabled:opacity-40 focus-ring-sky", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save & Continue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }) : q.inputType === "candidate_info" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-xl border border-white/20 bg-[#0D1322]/90 p-4 shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1", children: [
            "Full Name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: answers.candidate_name || "", onChange: (e) => setAnswers((prev) => ({
            ...prev,
            candidate_name: e.target.value
          })), placeholder: "e.g. Rahul Sharma", className: "w-full rounded-lg border border-white/20 bg-[#0D1322] px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:border-sky-400 focus:bg-[#0D1322] focus:text-white focus-ring-sky" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1", children: [
              "Mobile / WhatsApp ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", value: answers.candidate_phone || "", onChange: (e) => setAnswers((prev) => ({
              ...prev,
              candidate_phone: e.target.value.replace(/\D/g, "").slice(0, 10)
            })), placeholder: "10-digit mobile number", className: "w-full rounded-lg border border-white/20 bg-[#0D1322] px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:border-sky-400 focus:bg-[#0D1322] focus:text-white focus-ring-sky" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1", children: [
              "Email Address ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: answers.candidate_email || "", onChange: (e) => setAnswers((prev) => ({
              ...prev,
              candidate_email: e.target.value
            })), placeholder: "name@example.com", className: "w-full rounded-lg border border-white/20 bg-[#0D1322] px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:border-sky-400 focus:bg-[#0D1322] focus:text-white focus-ring-sky" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: !answers.candidate_name?.trim() || (answers.candidate_phone || "").length < 10 || !answers.candidate_email?.includes("@"), onClick: () => {
          const summaryVal = `${answers.candidate_name} | ${answers.candidate_phone} | ${answers.candidate_email}`;
          if (sessionId && answers.candidate_name && answers.candidate_phone && answers.candidate_email) {
            void createLeadEarly({
              sessionId,
              name: answers.candidate_name,
              phone: answers.candidate_phone,
              email: answers.candidate_email,
              whatsappOptin: true
            }).catch(() => {
            });
          }
          select(summaryVal);
        }, className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] transition hover:bg-sky-400 disabled:opacity-40 focus-ring-sky", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Profile Details & Continue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:gap-2.5", children: q.options.map((opt, i) => {
        const selected = answers[q.id] === opt.value;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => select(opt.value), className: `group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 sm:py-3 text-left text-sm sm:text-base font-medium leading-snug transition-all duration-200 relative overflow-hidden focus-ring-sky ${selected ? "border-sky-400 bg-sky-500/20 text-white shadow-[0_0_25px_rgba(56,189,248,0.35)] scale-[0.985]" : "border-white/15 bg-[#0D1322]/90 text-slate-100 hover:border-sky-400/60 hover:bg-[#111A2E] hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]"}`, children: [
          selected && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layoutId: "selected-glow", className: "absolute inset-0 bg-gradient-to-r from-sky-400/20 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex items-center justify-center h-6 w-6 rounded-md border transition-colors font-mono text-[11px] font-bold shrink-0 ${selected ? "border-sky-400 bg-sky-500/30 text-sky-200 shadow-sm" : "border-white/20 bg-white/10 text-slate-300 group-hover:border-sky-400/60 group-hover:bg-sky-500/20 group-hover:text-sky-300"}`, children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 font-medium text-white", children: opt.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `h-4 w-4 shrink-0 transition-transform duration-200 z-10 ${selected ? "text-sky-400 translate-x-0.5" : "text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1"}` })
        ] }, opt.value);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-4 text-center font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-300", children: "NO RIGHT ANSWERS · 13 TRAITS · 6 ROLE TRACKS" })
    ] }, q.id) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: back, disabled: safeIdx === 0, className: "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/10 hover:border-sky-400/50 disabled:opacity-30 focus-ring-sky", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3 text-sky-400" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] font-bold uppercase tracking-wider text-sky-400", children: [
        Math.max(0, visible.length - safeIdx - 1),
        " QUESTIONS LEFT"
      ] })
    ] }),
    safeIdx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StartFreshButton, {}) }),
    debugOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
      setDebugOpen(false);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("ce_debug", "0");
      }
    }, className: "font-mono text-micro uppercase tracking-[0.18em] text-white/60 hover:text-white", children: "Hide debug" }) }) : null,
    debugOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.04] p-4 font-mono text-micro leading-relaxed text-amber-100/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between text-micro uppercase tracking-[0.2em] text-amber-300/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Debug · Career Engine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "idx ",
          safeIdx,
          " / ",
          visible.length - 1
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-[120px_1fr] gap-x-3 gap-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "current q.id" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white", children: q.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "q.kind" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white", children: q.kind ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "idx (raw)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white", children: idx }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "safeIdx" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white", children: safeIdx }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "visible.length" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: visible.length < ADAPTIVE_MIN_VISIBLE ? "text-rose-300" : "text-white", children: [
          visible.length,
          " / ",
          assessment.length,
          visible.length < ADAPTIVE_MIN_VISIBLE ? ` (below adaptive floor ${ADAPTIVE_MIN_VISIBLE})` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "sessionId" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "break-all text-white", children: sessionId ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "seed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "break-all text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => copy("seed", seed), className: "inline-flex items-center gap-1 hover:text-amber-200", title: "Copy seed", children: [
          seed,
          copied === "seed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-eyebrow" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3 opacity-60" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "reproduce url" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "break-all text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => copy("url", reproducerUrl(seed)), className: "inline-flex items-center gap-1 text-left hover:text-amber-200", title: "Copy reproducer URL", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-all", children: reproducerUrl(seed) }),
          copied === "url" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 shrink-0 text-eyebrow" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3 shrink-0 opacity-60" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "target total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white", children: TARGET_TOTAL }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "quotas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white", children: Object.keys(QUOTAS).map((k) => `${k} ${QUOTAS[k]}`).join(" · ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "actual" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: validation.perKindOk ? "text-eyebrow" : "text-rose-300", children: [
          Object.keys(QUOTAS).map((k) => `${k} ${validation.perKind[k] ?? 0}`).join(" · "),
          validation.perKindOk ? " ✓" : " ✗"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "total ok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: validation.totalOk ? "text-eyebrow" : "text-rose-300", children: [
          validation.total,
          " ",
          validation.totalOk ? "✓" : `✗ (need ${TARGET_TOTAL})`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "duplicates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: validation.noDuplicates ? "text-eyebrow" : "text-rose-300", children: validation.noDuplicates ? "none ✓" : validation.duplicates.join(", ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "submitting" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white", children: String(submitting) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-amber-300/70", children: "advancing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white", children: String(advancingRef.current) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-micro uppercase tracking-[0.2em] text-amber-300/70", children: [
        "Visible questions (",
        visible.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-1 max-h-40 overflow-auto rounded border border-white/10 bg-[#0a0c10]/40 p-2 text-micro", children: visible.map((vq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: i === safeIdx ? "text-amber-300" : "text-white/70", children: [
        i.toString().padStart(2, "0"),
        " · ",
        vq.id,
        answers[vq.id] ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-eyebrow/80", children: [
          " = ",
          answers[vq.id]
        ] }) : null
      ] }, vq.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-micro uppercase tracking-[0.2em] text-amber-300/70", children: [
        "Answers (",
        Object.keys(answers).length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-1 max-h-32 overflow-auto rounded border border-white/10 bg-[#0a0c10]/40 p-2 text-micro text-white/80", children: JSON.stringify(answers, null, 2) })
    ] }) : null
  ] });
}
export {
  TestPage as component
};
