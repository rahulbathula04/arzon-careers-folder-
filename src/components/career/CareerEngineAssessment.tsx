import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import { ArzonLogo } from "@/components/acri/ArzonLogo";
import { useNavigate } from "@tanstack/react-router";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { buildAssessment } from "@/data/careerEngineSampler";
import { adaptiveOrderedVisible } from "@/data/careerEngineAdaptive";
import type { Question } from "@/data/careerEngineQuestions";
import { getOrCreateSeed } from "@/data/careerEngineSampler";
import { computeResult, isAdaptiveConfident } from "@/data/careerEngineScoring";
import {
  finalizeLead,
  getAttemptId,
  getLeadId,
  getProfile,
  getSessionId,
  recordAnswersBatch,
  saveAnswers,
} from "@/lib/careerEngineApi";
import {
  answerQuestion,
  cacheResult,
  getOrInitAttemptStartedAt,
  loadSavedAnswers,
} from "@/lib/careerEngineRunner";

const MAX_MINUTES = 10;

export function CareerEngineAssessment() {
  const navigate = useNavigate();
  const profile = getProfile();
  const [answers, setAnswers] = useState<Record<string, string>>(() => loadSavedAnswers());
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [startedAt] = useState(() => getOrInitAttemptStartedAt());
  const [now, setNow] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pendingAnswersRef = useRef<Array<{ questionId: string; answer: string }>>([]);
  const flushingAnswersRef = useRef<Promise<void> | null>(null);

  const flushPendingAnswers = async () => {
    if (flushingAnswersRef.current) return flushingAnswersRef.current;
    const batch = pendingAnswersRef.current.splice(0);
    if (!batch.length) return;

    const promise = (async () => {
      const sessionId = getSessionId();
      if (!sessionId) {
        pendingAnswersRef.current.unshift(...batch);
        return;
      }

      const written = await recordAnswersBatch(sessionId, batch);
      if (written !== batch.length) {
        pendingAnswersRef.current.unshift(...batch);
      }
    })().finally(() => {
      flushingAnswersRef.current = null;
    });

    flushingAnswersRef.current = promise;
    return promise;
  };

  const assessment = useMemo(() => buildAssessment(getOrCreateSeed(getSessionId())), []);

  useEffect(() => {
    if (isReducedMotion()) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const visible = useMemo(
    () => adaptiveOrderedVisible(assessment, answers, isAdaptiveConfident),
    [assessment, answers],
  );

  const unanswered = visible.filter((q) => !answers[q.id]);
  const current =
    (currentId ? visible.find((q) => q.id === currentId && !answers[q.id]) : undefined) ??
    unanswered[0];
  const answeredCount = visible.length - unanswered.length;
  const percent = Math.round((answeredCount / Math.max(visible.length, 1)) * 100);
  const remaining = Math.max(0, MAX_MINUTES * 60 - Math.floor((Date.now() - startedAt) / 1000));

  if (!profile) {
    navigate({ to: "/career-engine/start" });
    return null;
  }

  if (!current) {
    return (
      <AssessmentShell percent={100} answered={answeredCount} total={visible.length} remaining={remaining}>
        <CompletionCard
          submitting={submitting}
          error={error}
          onSubmit={async () => {
            if (submitting) return;
            setSubmitting(true);
            setError(null);
            try {
              const result = computeResult(answers, {
                questions: assessment,
                meta: {
                  attemptId: getAttemptId() ?? `att_${Date.now()}`,
                  createdAt: new Date().toISOString(),
                },
              });
              saveAnswers(answers);

              // Final persistence is a single idempotent batch. The report is
              // already cached locally, so the database is never on the critical
              // path for displaying the result.
              const sessionId = getSessionId();
              if (sessionId) {
                await flushPendingAnswers();
                await recordAnswersBatch(
                  sessionId,
                  Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer })),
                );
              }

              // Cache the computed result before any network/database call.
              // The report must never depend on a successful redirect or RPC.
              cacheResult(result);

              const leadId = getLeadId();
              if (leadId) {
                try {
                  await finalizeLead({ leadId, result });
                } catch (finalizeError) {
                  // The result is already durable in the local recovery snapshot.
                  // The report page will retry server persistence in the background.
                  console.warn("Career report persistence deferred", finalizeError);
                }
              }

              navigate({
                to: "/career-engine/result",
                search: leadId && !leadId.startsWith("lead_local_") ? { id: leadId } : undefined,
              });
            } catch (e) {
              setError(e instanceof Error ? e.message : "We could not generate your result.");
              setSubmitting(false);
            }
          }}
        />
      </AssessmentShell>
    );
  }

  const currentIndex = visible.findIndex((q) => q.id === current.id);

  const choose = (value: string) => {
    const step = answerQuestion({
      assessment,
      currentQuestion: current,
      currentAnswers: answers,
      value,
    });
    setAnswers(step.answers);
    saveAnswers(step.answers);

    pendingAnswersRef.current.push({ questionId: current.id, answer: value });
    if (pendingAnswersRef.current.length >= 6) {
      void flushPendingAnswers();
    }

    if (step.complete) {
      setCurrentId(null);
      return;
    }

    const next = adaptiveOrderedVisible(assessment, step.answers, isAdaptiveConfident)
      .find((q) => !step.answers[q.id]);
    setCurrentId(next?.id ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrevious = () => {
    const previous = visible
      .slice(0, currentIndex)
      .reverse()
      .find((q) => Boolean(answers[q.id]));
    if (previous) {
      setCurrentId(previous.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AssessmentShell percent={percent} answered={answeredCount} total={visible.length} remaining={remaining}>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {kindLabel(current.kind)}
          </p>
          <p className="text-sm font-semibold text-slate-500">
            Question {currentIndex + 1} of {visible.length}
          </p>
        </div>

        <div className="arzon-ref-assessment-question mt-2">
          <h1 className="max-w-3xl text-xl font-bold leading-snug text-[#071A4A] sm:text-2xl">
            {current.prompt}
          </h1>

          {current.scenario && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 border border-slate-100">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Scenario
              </p>
              {current.scenario}
            </div>
          )}

          {current.helper && (
            <p className="mt-3 text-sm leading-6 text-slate-500">{current.helper}</p>
          )}
          
          <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Choose one
          </p>

          {current.inputType === "text" ? (
            <TextAnswer question={current} value={answers[current.id] ?? ""} onSubmit={choose} />
          ) : current.inputType === "candidate_info" ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Your name and contact details were already captured. We’ll attach the report to this assessment.
              <button
                type="button"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-xl bg-[#071A4A] text-sm font-semibold text-white"
                onClick={() => choose(profile.name)}
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="mt-2 space-y-2.5">
              {current.options.map((option, index) => {
                const selected = answers[current.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose(option.value)}
                    className={`flex min-h-[64px] w-full items-center gap-4 rounded-xl border p-3 text-left transition-all ${
                      selected 
                        ? "border-[#1B3F8B] bg-[#F4F7FB] ring-1 ring-[#1B3F8B]" 
                        : "border-slate-200 bg-white hover:border-[#1B3F8B]/50 hover:bg-slate-50"
                    }`}
                  >
                    <span 
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                        selected 
                          ? "bg-[#1B3F8B] text-white" 
                          : "bg-slate-100 text-[#071A4A]"
                      }`}
                    >
                      {selected ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + index)}
                    </span>
                    <span className={`text-sm font-semibold leading-5 ${selected ? "text-[#071A4A]" : "text-[#1A1A1A]"}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 border-t border-slate-100 pt-6">
            <p className="text-xs font-semibold text-slate-500">
              {currentIndex + 1} / {visible.length}
            </p>
            <div className="w-full max-w-[240px] h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div 
                className="h-full rounded-full bg-[#1B3F8B] transition-all duration-300" 
                style={{ width: `${percent}%` }} 
              />
            </div>
            <p className="text-[10px] text-slate-400">
              Your answers are saved automatically
            </p>
          </div>
          
          {currentIndex > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={goPrevious}
                className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
            </div>
          )}
        </div>
      </div>
    </AssessmentShell>
  );
}

function kindLabel(kind: Question["kind"]) {
  return {
    profile: "About you",
    scenario: "Work scenario",
    behaviour: "Work style",
    micro: "Accuracy check",
    lifestyle: "Work preferences",
    commitment: "Career goals",
  }[kind];
}

function AssessmentShell({ children, percent, answered, total, remaining }: { children: React.ReactNode; percent: number; answered: number; total: number; remaining: number }) {
  const steps = [
    ["Your interests", "What work excites you?"],
    ["Skills assessment", "Your current skills"],
    ["Career preferences", "Work, environment, location"],
    ["Get your results", "Personalised career plan"],
  ];
  const activeStep = percent >= 90 ? 4 : percent >= 60 ? 3 : percent >= 30 ? 2 : 1;

  return (
    <main className="arzon-ref-page arzon-ref-assessment arzon-ui-light min-h-[100dvh] flex flex-col bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="arzon-v2-container flex min-h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ArzonLogo variant="light" size="sm" />
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <span className="text-xs font-extrabold text-slate-700 sm:text-sm">Career Engine</span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-600">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-700" />
            Your answers are private
          </span>
        </div>
      </header>
      <header className="arzon-ref-assessment-progress">
        <div className="arzon-v2-container py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold">Career Engine</p>
              <p className="text-xs text-[var(--arzon-ink-muted)]">{answered} of {total} answered</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <Clock className="h-3.5 w-3.5" /> {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-blue-50">
            <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: percent + "%" }} />
          </div>
        </div>
      </header>

      <div className="arzon-ref-container arzon-ref-assessment-body">
        <div className="arzon-ref-assessment-grid">
          <aside className="arzon-ref-assessment-steps">
            <span className="arzon-ref-kicker-light">CAREER ENGINE</span>
            <h1 className="mt-3 text-xl font-extrabold tracking-tight">Find the right healthcare career for you.</h1>
            <p className="mt-2 text-xs leading-5 text-slate-600">Answer a small set of questions. Your result will explain the role paths worth exploring next.</p>
            <div className="mt-6 space-y-2">
              {steps.map(([title, body], index) => {
                const number = index + 1;
                const active = number === activeStep;
                const complete = number < activeStep;
                return (
                  <div key={title} className={["flex gap-3 rounded-lg p-3", active ? "bg-blue-50" : "bg-transparent"].join(" ")}>
                    <span className={["grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold", complete || active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"].join(" ")}>
                      {complete ? <Check className="h-4 w-4" /> : number}
                    </span>
                    <div>
                      <p className={["text-xs font-bold", active ? "text-blue-800" : "text-slate-700"].join(" ")}>{title}</p>
                      <p className="mt-0.5 text-[10px] leading-4 text-slate-500">{body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Progress</p>
              <p className="mt-1 text-sm font-extrabold text-slate-800">{percent}% complete</p>
            </div>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>

      <footer className="arzon-v2-container flex items-center gap-2 pb-8 text-xs text-[var(--arzon-ink-muted)]">
        <ShieldCheck className="h-4 w-4" /> Your answers are used to generate your career report.
      </footer>
    </main>
  );
}
function TextAnswer({ question, value, onSubmit }: { question: Question; value: string; onSubmit: (value: string) => void }) {
  const [draft, setDraft] = useState(value);
  return (
    <form
      className="mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (draft.trim()) onSubmit(draft.trim());
      }}
    >
      <input
        autoFocus
        required
        value={draft}
        placeholder={question.placeholder ?? "Type your answer"}
        onChange={(e) => setDraft(e.target.value)}
        className="h-12 w-full rounded-xl border border-[var(--arzon-border-strong)] bg-white px-4 text-sm text-[var(--arzon-ink)] outline-none focus:border-[var(--arzon-blue-700)] focus:ring-2 focus:ring-[var(--arzon-blue-100)]"
      />
      <button type="submit" className="mt-3 inline-flex h-11 items-center rounded-xl bg-[var(--arzon-navy-950)] px-5 text-sm font-semibold text-white">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </form>
  );
}

function CompletionCard({ submitting, onSubmit, error }: { submitting: boolean; onSubmit: () => void; error: string | null }) {
  return (
    <div className="arzon-ref-assessment-question arzon-ref-assessment-complete">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]">
        <Check className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-[var(--arzon-ink)]">Your answers are complete.</h1>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--arzon-ink-soft)]">
        We’ll calculate your role signals and prepare your career report. This is guidance, not a hiring or placement prediction.
      </p>
      {error && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--arzon-navy-950)] px-6 text-sm font-bold text-white disabled:opacity-50 sm:w-auto"
      >
        {submitting ? "Generating report…" : "Generate my career report"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}
