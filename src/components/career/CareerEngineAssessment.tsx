import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { buildAssessment } from "@/data/careerEngineSampler";
import { adaptiveOrderedVisible } from "@/data/careerEngineAdaptive";
import type { Question } from "@/data/careerEngineQuestions";
import { computeResult, isAdaptiveConfident } from "@/data/careerEngineScoring";
import {
  finalizeLead,
  getAttemptId,
  getLeadId,
  getOrCreateSeed,
  getProfile,
  getSessionId,
  recordAnswer,
  saveAnswers,
} from "@/lib/careerEngineApi";
import {
  answerQuestion,
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

  const assessment = useMemo(() => buildAssessment(getOrCreateSeed()), []);

  useEffect(() => {
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
              const leadId = getLeadId();
              if (leadId) await finalizeLead({ leadId, result });
              navigate({ to: "/career-engine/result" });
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
    const sessionId = getSessionId();
    if (sessionId) void recordAnswer(sessionId, current.id, value);

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
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--arzon-blue-700)]">
              {kindLabel(current.kind)}
            </p>
            <p className="mt-1 text-sm text-[var(--arzon-ink-muted)]">
              Question {currentIndex + 1} of {visible.length}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--arzon-surface-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--arzon-ink-soft)]">
            <Clock className="h-3.5 w-3.5" />
            {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
          </span>
        </div>

        <div className="rounded-2xl border border-[var(--arzon-border)] bg-white p-5 shadow-sm sm:p-8">
          <h1 className="max-w-3xl text-2xl font-bold leading-tight text-[var(--arzon-ink)] sm:text-3xl">
            {current.prompt}
          </h1>

          {current.scenario && (
            <div className="mt-5 rounded-xl bg-[var(--arzon-surface-subtle)] p-4 text-sm leading-6 text-[var(--arzon-ink-soft)]">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--arzon-ink-muted)]">
                Scenario
              </p>
              {current.scenario}
            </div>
          )}

          {current.helper && (
            <p className="mt-4 text-sm leading-6 text-[var(--arzon-ink-muted)]">{current.helper}</p>
          )}

          {current.inputType === "text" ? (
            <TextAnswer question={current} value={answers[current.id] ?? ""} onSubmit={choose} />
          ) : current.inputType === "candidate_info" ? (
            <div className="mt-6 rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4 text-sm text-[var(--arzon-ink-soft)]">
              Your name and contact details were already captured. We’ll attach the report to this assessment.
              <button
                type="button"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-xl bg-[var(--arzon-navy-950)] text-sm font-semibold text-white"
                onClick={() => choose(profile.name)}
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {current.options.map((option, index) => {
                const selected = answers[current.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose(option.value)}
                    className={`flex min-h-14 w-full items-start gap-3 rounded-xl border p-4 text-left transition ${selected ? "border-[var(--arzon-blue-700)] bg-[var(--arzon-blue-100)]" : "border-[var(--arzon-border)] bg-white hover:border-[var(--arzon-blue-700)]/40 hover:bg-[var(--arzon-surface-subtle)]"}`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${selected ? "bg-[var(--arzon-blue-700)] text-white" : "bg-[var(--arzon-surface-subtle)] text-[var(--arzon-ink-soft)]"}`}>
                      {selected ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm leading-5 text-[var(--arzon-ink)]">{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-7 flex items-center justify-between border-t border-[var(--arzon-border)] pt-5">
            <button
              type="button"
              onClick={goPrevious}
              disabled={!visible.slice(0, currentIndex).some((q) => Boolean(answers[q.id]))}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--arzon-border)] px-4 text-sm font-semibold text-[var(--arzon-ink-soft)] disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </button>
            <p className="text-xs text-[var(--arzon-ink-muted)]">{percent}% complete</p>
          </div>
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
  return (
    <main className="min-h-screen bg-[var(--arzon-surface)] text-[var(--arzon-ink)]">
      <header className="sticky top-0 z-20 border-b border-[var(--arzon-border)] bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold">Arzon Career Assessment</p>
              <p className="text-xs text-[var(--arzon-ink-muted)]">{answered} of {total} answered</p>
            </div>
            <span className="text-xs font-semibold text-[var(--arzon-ink-soft)]">About 10 min</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--arzon-blue-100)]">
            <div className="h-full rounded-full bg-[var(--arzon-blue-700)] transition-all" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">{children}</div>
      <footer className="mx-auto flex max-w-3xl items-center gap-2 px-4 pb-8 text-xs text-[var(--arzon-ink-muted)]">
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
    <div className="rounded-2xl border border-[var(--arzon-border)] bg-white p-6 text-center shadow-sm sm:p-10">
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
