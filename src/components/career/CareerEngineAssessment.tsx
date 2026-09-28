import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { Input } from "@/components/ui/input";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { getProfile } from "@/lib/careerEngineApi";
import {
  getAttemptId,
  getLeadId,
  getSessionId,
  getSessionToken,
  loadSavedAnswers,
  persistCareerEngineSnapshot,
  recordAnswer,
  saveAnswers,
  saveResult,
  finalizeLead,
} from "@/lib/careerEngineApi";
import { computeResult, isAdaptiveConfident } from "@/data/careerEngineScoring";
import type { Question } from "@/data/careerEngineQuestions";
import { buildAssessment, adaptiveVisibleFromAssessment } from "@/data/careerEngineSampler";
import { adaptiveOrderedVisible } from "@/data/careerEngineAdaptive";
import { toast } from "sonner";

function makeSeed(): string {
  if (typeof window === "undefined") return "career-engine-preview";
  return (
    getAttemptId() ||
    getSessionId() ||
    window.localStorage.getItem("ce_snapshot_v1") ||
    `ce_${Date.now()}`
  );
}

function questionAnswered(q: Question, answers: Record<string, string>): boolean {
  const value = answers[q.id];
  return typeof value === "string" && value.trim().length > 0;
}

export function CareerEngineAssessment() {
  const navigate = useNavigate();
  const profile = getProfile();
  const seed = useMemo(makeSeed, []);
  const assessment = useMemo(() => buildAssessment(seed), [seed]);

  const [answers, setAnswers] = useState<Record<string, string>>(() => loadSavedAnswers());
  const [index, setIndex] = useState(0);
  const [textValue, setTextValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const visible = useMemo(
    () => adaptiveOrderedVisible(assessment, answers, isAdaptiveConfident),
    [assessment, answers],
  );

  useEffect(() => {
    if (!profile) {
      navigate({ to: "/career-engine/start" }).catch(() => {
        window.location.href = "/career-engine/start";
      });
    }
  }, [navigate, profile]);

  useEffect(() => {
    setIndex((current) => Math.min(current, Math.max(0, visible.length - 1)));
  }, [visible.length]);

  const current = visible[index];

  useEffect(() => {
    if (!current) return;
    setTextValue(answers[current.id] ?? "");
    setSubmitError(null);
  }, [current?.id, answers]);

  useEffect(() => {
    // The start page already collected contact details. Treat the internal
    // candidate_info anchor as satisfied so it does not ask for PII twice.
    if (!profile || answers.candidate_info) return;
    const next = { ...answers, candidate_info: "provided" };
    setAnswers(next);
    saveAnswers(next);
  }, [profile]);

  const answeredCount = Object.keys(answers).filter((key) =>
    visible.some((q) => q.id === key),
  ).length;
  const progress = Math.round(((index + 1) / Math.max(1, visible.length)) * 100);
  const sectionLabel =
    current?.kind === "profile"
      ? "PROFILE"
      : current?.kind === "scenario"
        ? "SCENARIO"
        : current?.kind === "behaviour"
          ? "WORK STYLE"
          : current?.kind === "micro"
            ? "ACCURACY"
            : current?.kind === "lifestyle"
              ? "WORK PREFERENCES"
              : "READINESS";

  if (!profile || !current) {
    return (
      <CareerShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <AiThinkingLoader label="Loading your assessment..." size="lg" />
        </div>
      </CareerShell>
    );
  }

  const selectAnswer = async (value: string) => {
    if (submitting) return;
    const nextAnswers = { ...answers, [current.id]: value };
    setAnswers(nextAnswers);
    saveAnswers(nextAnswers);

    const sessionId = getSessionId();
    if (sessionId) {
      void recordAnswer(sessionId, current.id, value);
    }
  };

  const finishAssessment = async (finalAnswers: Record<string, string>) => {
    const leadId = getLeadId();
    const sessionToken = getSessionToken();
    const sessionId = getSessionId();

    if (!leadId || !sessionToken || !sessionId) {
      setSubmitError("Your assessment session expired. Please start the assessment again.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const result = computeResult(finalAnswers, {
        questions: assessment,
        meta: {
          attemptId: getAttemptId(),
          sessionId,
          leadId,
          assessmentSeed: seed,
          questionIds: assessment.map((q) => q.id),
          answeredQuestionIds: Object.keys(finalAnswers),
          createdAt: new Date().toISOString(),
        },
      });

      result.profile = {
        ...(result.profile || {}),
        name: profile.name,
        stream: finalAnswers.stream,
        course: finalAnswers.course,
        year: finalAnswers.year,
      };

      saveAnswers(finalAnswers);
      saveResult(result);
      persistCareerEngineSnapshot();

      const persisted = await finalizeLead({ leadId, result });
      if (!persisted) {
        setSubmitError("We calculated your report, but could not save it to your session. Please try again.");
        return;
      }

      navigate({ to: "/career-engine/result", search: { id: leadId } }).catch(() => {
        window.location.href = `/career-engine/result?id=${leadId}`;
      });
    } catch (error) {
      console.error("Career Engine report generation failed", error);
      setSubmitError("We could not generate your report. Please try the final step again.");
      toast.error("Report generation failed. Your answers are still saved.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (!current) return;

    let value = answers[current.id] ?? "";
    if (current.inputType === "text") value = textValue.trim();
    if (current.inputType === "candidate_info") value = "provided";

    if (current.required !== false && !value) {
      toast.error("Please answer this question before continuing.");
      return;
    }

    const nextAnswers = { ...answers, [current.id]: value };
    setAnswers(nextAnswers);
    saveAnswers(nextAnswers);

    const sessionId = getSessionId();
    if (sessionId) void recordAnswer(sessionId, current.id, value);

    if (index >= visible.length - 1) {
      await finishAssessment(nextAnswers);
      return;
    }

    setIndex((currentIndex) => currentIndex + 1);
  };

  const handleBack = () => {
    if (index > 0 && !submitting) setIndex((currentIndex) => currentIndex - 1);
  };

  return (
    <CareerShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="grid gap-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--arzon-ink-muted)] sm:grid-cols-5">
          <span>{visible.length} QUESTIONS</span>
          <span>~6 MINUTES</span>
          <span>13 TRAITS</span>
          <span>6+ PATHS</span>
          <span>ROLE READINESS SIGNAL</span>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["ROLE FIT", "fit"],
            ["WORK STYLE", "style"],
            ["READINESS", "readiness"],
          ].map(([label, key]) => (
            <div
              key={key}
              className="rounded-2xl border border-[var(--arzon-border)] bg-white px-5 py-4 text-center shadow-xs"
            >
              <Lock className="mx-auto h-4 w-4 text-[var(--arzon-ink-muted)]" />
              <p className="mt-2 font-mono text-[10px] font-bold tracking-[0.18em] text-[var(--arzon-ink-soft)]">
                {label}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[var(--arzon-ink-muted)]">
                LOCKED
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-[var(--arzon-border)] bg-white p-5 shadow-xs sm:p-8">
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--arzon-ink-soft)]">
            <span>QUESTION {index + 1} OF {visible.length}</span>
            <span>{answeredCount} ANSWERED</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--arzon-blue-100)]">
            <div
              className="h-full rounded-full bg-[var(--arzon-navy-950)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--arzon-ink-soft)]">
                <ShieldCheck className="h-3.5 w-3.5" />
                {sectionLabel}
              </div>

              <h1 className="font-serif text-2xl font-bold leading-tight tracking-tight text-[var(--arzon-ink)] sm:text-3xl">
                {current.prompt}
              </h1>

              {current.scenario ? (
                <div className="mt-5 rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4 text-sm leading-relaxed text-[var(--arzon-ink-soft)]">
                  {current.scenario}
                </div>
              ) : null}

              {current.helper ? (
                <p className="mt-3 text-sm leading-relaxed text-[var(--arzon-ink-muted)]">
                  {current.helper}
                </p>
              ) : null}

              {current.inputType === "candidate_info" ? (
                <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Your contact details are already saved.
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {profile.name} · {profile.email}
                  </p>
                  <button
                    type="button"
                    onClick={() => void handleNext()}
                    disabled={submitting}
                    className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--arzon-navy-950)] px-5 text-sm font-bold text-white"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : current.inputType === "text" ? (
                <Input
                  value={textValue}
                  onChange={(event) => setTextValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") void handleNext();
                  }}
                  placeholder={current.placeholder || "Type your answer"}
                  className="mt-6 h-12 rounded-xl border-stone-300 bg-white"
                />
              ) : (
                <div className="mt-6 grid gap-3">
                  {current.options.map((option) => {
                    const selected = answers[current.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={submitting}
                        onClick={() => void selectAnswer(option.value)}
                        className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition-colors ${
                          selected
                            ? "border-[var(--arzon-navy-950)] bg-[var(--arzon-navy-950)] text-white"
                            : "border-[var(--arzon-border)] bg-white text-[var(--arzon-ink)] hover:border-[#1B3F8B] hover:bg-[var(--arzon-surface-subtle)]"
                        }`}
                      >
                        <span className="flex items-start gap-3">
                          <span className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border ${
                            selected ? "border-white bg-white" : "border-stone-300"
                          }`}>
                            {selected ? <span className="m-1 block h-2 w-2 rounded-full bg-[var(--arzon-navy-950)]" /> : null}
                          </span>
                          <span>{option.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {submitError ? (
                <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                  {submitError}
                </div>
              ) : null}

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={index === 0 || submitting}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 text-sm font-bold text-[var(--arzon-ink-soft)] disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {current.inputType !== "candidate_info" ? (
                  <button
                    type="button"
                    onClick={() => void handleNext()}
                    disabled={submitting}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--arzon-navy-950)] px-6 text-sm font-bold text-white disabled:opacity-60"
                  >
                    {submitting ? (
                      <AiThinkingLoader label="Generating..." size="sm" textClassName="text-white" />
                    ) : (
                      <>
                        {index === visible.length - 1 ? "Generate my career report" : "Continue"}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            </div>

            <aside className="hidden rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5 lg:block">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--arzon-ink-muted)]">
                YOUR ANSWERS
              </p>
              <div className="mt-4 space-y-3">
                {["Role fit", "Work style", "Skill signals", "Readiness"].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[var(--arzon-ink-soft)]">
                    {i < 2 && answeredCount > i ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border border-stone-300" />
                    )}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs leading-relaxed text-[var(--arzon-ink-muted)]">
                Your answers are used to calculate role fit, work-style signals, skill gaps and recommended next steps.
              </p>
            </aside>
          </div>
        </div>

        <p className="flex items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-wider text-[var(--arzon-ink-muted)]">
          <ShieldCheck className="h-3.5 w-3.5" /> Private · Your answers are used to generate your assessment
        </p>
      </div>
    </CareerShell>
  );
}
