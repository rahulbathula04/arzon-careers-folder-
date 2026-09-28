import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { Input } from "@/components/ui/input";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { getProfile } from "@/lib/careerEngineApi";
import {
  getAttemptId,
  getLeadId,
  getSessionId,
  getSessionToken,
  persistCareerEngineSnapshot,
  recordAnswer,
  saveResult,
  finalizeLead,
} from "@/lib/careerEngineApi";
import { computeResult, isAdaptiveConfident } from "@/data/careerEngineScoring";
import { buildAssessment } from "@/data/careerEngineSampler";
import { adaptiveOrderedVisible } from "@/data/careerEngineAdaptive";
import { loadSavedAnswers, saveAnswers } from "@/lib/careerEngineRunner";
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
      <div className="min-h-screen bg-gradient-to-br from-[#F4F8FF] via-[#FFFDF8] to-[#EEFFFA]">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700">
                <ShieldCheck className="h-3.5 w-3.5" /> ARZON CAREER ENGINE
              </span>
              <p className="mt-2 text-xs font-semibold text-slate-500">A short diagnostic to understand your career direction.</p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
              {visible.length} questions · about 6 minutes
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["ROLE FIT", "See which work patterns match you.", "bg-blue-600"],
              ["WORK STYLE", "Understand how you prefer to work.", "bg-teal-500"],
              ["READINESS", "See what to build next.", "bg-violet-500"],
            ].map(([label, body, colour]) => (
              <div key={label} className="relative overflow-hidden rounded-2xl border border-white bg-white p-5 shadow-sm">
                <div className={`absolute inset-x-0 top-0 h-1 ${colour}`} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-bold text-slate-800">{body}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Revealed in your report</p>
              </div>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_25px_70px_-30px_rgba(15,23,42,.35)]">
            <div className="grid lg:grid-cols-[1fr_280px]">
              <div className="p-5 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700">{sectionLabel}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">Question {index + 1} of {visible.length}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{answeredCount} answered</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-600 via-teal-500 to-violet-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-9">
                  <h1 className="max-w-3xl font-serif text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{current.prompt}</h1>
                  {current.scenario ? <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-sm leading-6 text-slate-700">{current.scenario}</div> : null}
                  {current.helper ? <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">{current.helper}</p> : null}

                  {current.inputType === "candidate_info" ? (
                    <div className="mt-7 rounded-2xl border border-teal-200 bg-teal-50 p-5">
                      <p className="text-sm font-bold text-slate-900">Your contact details are already saved.</p>
                      <p className="mt-2 text-sm text-slate-600">{profile.name} · {profile.email}</p>
                      <button type="button" onClick={() => void handleNext()} disabled={submitting} className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-[#102E5C] px-5 text-sm font-bold text-white">Continue <ArrowRight className="h-4 w-4" /></button>
                    </div>
                  ) : current.inputType === "text" ? (
                    <Input value={textValue} onChange={(e) => setTextValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void handleNext(); }} placeholder={current.placeholder || "Type your answer"} className="mt-7 h-13 rounded-2xl border-slate-300 bg-white px-4 text-base" />
                  ) : (
                    <div className="mt-7 grid gap-3">
                      {current.options.map((option, optionIndex) => {
                        const selected = answers[current.id] === option.value;
                        const accents = ["blue", "teal", "violet", "orange", "cyan"];
                        const accent = accents[optionIndex % accents.length];
                        return (
                          <button key={option.value} type="button" disabled={submitting} onClick={() => void selectAnswer(option.value)}
                            className={`group w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                              selected
                                ? "border-[#102E5C] bg-[#102E5C] text-white shadow-lg"
                                : "border-slate-200 bg-white text-slate-800 hover:border-blue-200"
                            }`}>
                            <span className="flex items-center gap-3">
                              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-black ${
                                selected ? "bg-white/15 text-white" :
                                accent === "blue" ? "bg-blue-50 text-blue-700" :
                                accent === "teal" ? "bg-teal-50 text-teal-700" :
                                accent === "violet" ? "bg-violet-50 text-violet-700" :
                                accent === "orange" ? "bg-orange-50 text-orange-700" : "bg-cyan-50 text-cyan-700"
                              }`}>{String.fromCharCode(65 + optionIndex)}</span>
                              <span className="text-sm font-bold sm:text-base">{option.label}</span>
                              {selected ? <CheckCircle2 className="ml-auto h-5 w-5 shrink-0" /> : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {submitError ? <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{submitError}</div> : null}

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button type="button" onClick={handleBack} disabled={index === 0 || submitting} className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-600 disabled:opacity-40"><ArrowLeft className="h-4 w-4" /> Back</button>
                    {current.inputType !== "candidate_info" ? <button type="button" onClick={() => void handleNext()} disabled={submitting} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#102E5C] px-6 text-sm font-bold text-white shadow-lg transition hover:bg-[#173F78] disabled:opacity-60">{submitting ? <AiThinkingLoader label="Generating..." size="sm" textClassName="text-white" /> : <>{index === visible.length - 1 ? "Generate my career report" : "Continue"} <ArrowRight className="h-4 w-4" /></>}</button> : null}
                  </div>
                </div>
              </div>

              <aside className="relative hidden overflow-hidden bg-[#102E5C] lg:block">
                <img src="/images/bpharm-female-graduate-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#102E5C]/80 via-[#102E5C]/85 to-[#071A4A]" />
                <div className="relative flex h-full flex-col justify-end p-7 text-white">
                  <span className="inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-100">YOUR REPORT</span>
                  <h2 className="mt-4 font-serif text-3xl font-bold">Know what fits before you commit.</h2>
                  <p className="mt-3 text-sm leading-6 text-blue-100">Your answers are used to generate role-fit signals, skill gaps and recommended next steps.</p>
                  <div className="mt-6 space-y-3 text-xs font-semibold text-white/85">
                    {["Role fit", "Work style", "Skill gaps", "Recommended next steps"].map((x) => <div key={x} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-300" />{x}</div>)}
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">Private assessment · Your answers are used only to generate your career report</p>
        </div>
      </div>
    </CareerShell>
  );
}
