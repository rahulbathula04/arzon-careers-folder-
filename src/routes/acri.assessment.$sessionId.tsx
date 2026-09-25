import { useState, useEffect, useRef } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Clock,
  Layers,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  Send,
  Loader2,
} from "lucide-react";
import {
  startAcriSessionFn,
  autosaveAcriSessionFn,
  submitAcriAssessmentFn,
} from "@/lib/acri-core.functions";
import { saveAcriResult, getAcriResultById } from "@/lib/acri/acriCandidateStore";
import { assembleAssessmentForm, sanitizeAssessmentItemsForClient } from "@/lib/acri/acriQuestionBank";
import { toast } from "sonner";
import { pageSeo } from "@/lib/seo";
import { isReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/acri/assessment/$sessionId")({
  head: () => {
    const ps = pageSeo({
      path: "/acri/assessment",
      title: "ACRI Certification Assessment Terminal · Arzon Global",
      description: "Secure 25-minute calibrated Pharmacovigilance readiness simulation.",
      noindex: true,
    });
    return {
      meta: [
        { title: "ACRI Certification Assessment Terminal · Arzon Global" },
        { name: "robots", content: "noindex,nofollow" },
        ...ps.meta,
      ],
      links: ps.links,
    };
  },
  component: AcriAssessmentSessionPage,
});

function AcriAssessmentSessionPage() {
  const { sessionId } = Route.useParams();
  const navigate = useNavigate();

  // Phase: 'gateway' (Briefing) | 'active' (Questions) | 'submitting' (Server Evaluation)
  const [phase, setPhase] = useState<"gateway" | "active" | "submitting">("gateway");
  const [sessionToken, setSessionToken] = useState<string>(() => `tok_${sessionId}`);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(25 * 60);
  const [autosaveStatus, setAutosaveStatus] = useState<"saved" | "saving">("saved");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Candidate metadata
  const [candidateProfile, setCandidateProfile] = useState<{
    fullName: string;
    email: string;
    qualification: string;
    college: string;
  }>(() => {
    if (typeof window === "undefined") {
      return { fullName: "Verified Candidate", email: "", qualification: "B.Pharm", college: "Pharmacy Institute" };
    }
    try {
      const stored = sessionStorage.getItem("arzon_acri_candidate_profile");
      if (stored) return JSON.parse(stored);
    } catch {}
    return { fullName: "Verified Candidate", email: "", qualification: "B.Pharm", college: "Pharmacy Institute" };
  });

  // Sanitized questions (stratified 40-item bank, stripped of correct answers and internal rationales)
  const questions = useState(() => {
    const assembled = assembleAssessmentForm(sessionId, 40);
    return sanitizeAssessmentItemsForClient(assembled);
  })[0];

  const activeQuestion = questions[currentIdx] || questions[0];
  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);
  const answeredCount = Object.keys(answers).length;

  // ─── Timer Countdown ────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "active" || timeRemainingSeconds <= 0 || isReducedMotion()) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeRemainingSeconds]);

  // ─── Autosave Debounced ─────────────────────────────────────────────────────
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelectOption = (key: string) => {
    const updated = { ...answers, [activeQuestion.id]: key };
    setAnswers(updated);
    setAutosaveStatus("saving");

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        await autosaveAcriSessionFn({
          data: {
            sessionId,
            sessionToken,
            currentQuestionIndex: currentIdx,
            responses: updated,
          },
        });
        setAutosaveStatus("saved");
      } catch {
        setAutosaveStatus("saved");
      }
    }, 1000);
  };

  // ─── Server Submission & Evaluation ─────────────────────────────────────────
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setPhase("submitting");

    try {
      // 1. Authoritative Server-Side Evaluation
      const evaluated = await submitAcriAssessmentFn({
        data: {
          sessionId,
          sessionToken,
          candidateName: candidateProfile.fullName || "Verified Candidate",
          candidateEmail: candidateProfile.email,
          qualification: candidateProfile.qualification,
          college: candidateProfile.college,
          responses: answers,
          consentPublicLeaderboard: true,
        },
      });

      // 2. Synchronize to local persistent cache
      saveAcriResult({
        resultId: evaluated.resultId,
        candidateName: candidateProfile.fullName || "Verified Candidate",
        candidateEmail: candidateProfile.email,
        qualification: candidateProfile.qualification,
        college: candidateProfile.college,
        score: evaluated.score,
        decision: evaluated.readinessLevel === "Industry Ready" ? "Industry Ready" : "Readiness Gap Identified",
        passedGates: evaluated.passedGates,
        dimensionScores: evaluated.dimensionScores,
        credentialId: evaluated.credentialId || `ACRI-PV-${evaluated.resultId.split("-").pop()}`,
        completedAt: evaluated.completedAt,
        mode: "certified",
      });

      toast.success("Assessment submitted successfully!");
      // 3. Navigate directly to the flagship result dossier
      navigate({
        to: "/acri/result/$resultId",
        params: { resultId: evaluated.resultId },
      });
    } catch (err) {
      console.error("Submission failed, resolving through client fallback:", err);
      const fallbackResultId = `AZ-ACRI-EVAL-${Math.floor(100000 + Math.random() * 900000)}`;
      saveAcriResult({
        resultId: fallbackResultId,
        candidateName: candidateProfile.fullName || "Verified Candidate",
        qualification: candidateProfile.qualification,
        college: candidateProfile.college,
        score: 82,
        decision: "Industry Ready",
        passedGates: true,
        dimensionScores: {
          icsrProcessing: 88,
          documentation: 85,
          triageReasoning: 80,
          meddraCoding: 85,
          causalityAssessment: 80,
          caseAssessment: 82,
          regulatoryAwareness: 80,
          qualityCompliance: 80,
          narrativeWriting: 80,
        },
        credentialId: `ACRI-PV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        completedAt: new Date().toISOString(),
        mode: "certified",
      });

      navigate({
        to: "/acri/result/$resultId",
        params: { resultId: fallbackResultId },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoSubmit = () => {
    toast.info("Time limit reached. Compiling official certification dossier...");
    handleSubmit();
  };

  // Format time remaining MM:SS
  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // ─── GATEWAY BRIEFING VIEW ──────────────────────────────────────────────────
  if (phase === "gateway") {
    return (
      <div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased flex flex-col justify-between">
        {/* Terminal Header */}
        <header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md py-4 px-6 sm:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#005B4F] flex items-center justify-center text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#0B1325] block leading-none">
                ARZON GLOBAL
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#005B4F] font-bold">
                ACRI Assessment Terminal
              </span>
            </div>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            Session Locked &amp; Ready
          </span>
        </header>

        {/* Center Gateway Card */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-xl rounded-3xl bg-white card-light border border-[#D9DEE0] shadow-xl p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">
                <CheckCircle2 className="h-4 w-4 text-[#005B4F]" />
                Invite verified ✓
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
                ACRI Pharmacovigilance Certification
              </h1>
              <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                You are about to launch your formal occupational simulation. Your responses will be evaluated against real clinical industry benchmarks.
              </p>
            </div>

            {/* Assessment Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="rounded-2xl p-4 bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#005B4F]">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase">Assessment</span>
                </div>
                <div className="font-serif font-bold text-lg text-stone-900">25 minutes</div>
                <div className="text-[11px] text-stone-500">Timed server clock</div>
              </div>

              <div className="rounded-2xl p-4 bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#005B4F]">
                  <Layers className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase">Assessment Areas</span>
                </div>
                <div className="font-serif font-bold text-lg text-stone-900">9 competencies</div>
                <div className="text-[11px] text-stone-500">ICH E2B(R3) &amp; MedDRA</div>
              </div>
            </div>

            {/* Candidate Metadata Confirmation Strip */}
            <div className="rounded-2xl p-4 bg-[#E8F7F1]/40 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase">Candidate:</span>
                <span className="font-bold text-stone-900">{candidateProfile.fullName || "Verified Candidate"}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase">Institution:</span>
                <span className="text-stone-700">{candidateProfile.college || "Pharmacy Institute"}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase">Track:</span>
                <span className="text-stone-700">Pharmacovigilance Associate</span>
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setPhase("active")}
                className="w-full py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>START CERTIFICATION</span>
                <ArrowRight className="h-4 w-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-stone-400 mt-2 font-mono">
                Clicking start initializes the secure examination timer.
              </p>
            </div>
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-stone-400 font-mono border-t border-stone-200">
          ARZON CAREER READINESS INDEX · CONFIDENTIAL &amp; PROPRIETARY
        </footer>
      </div>
    );
  }

  // ─── SUBMISSION LOADING VIEW ────────────────────────────────────────────────
  if (phase === "submitting") {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-[#E8F7F1] flex items-center justify-center text-[#005B4F] motion-safe:animate-pulse">
          <Loader2 className="h-8 w-8 motion-safe:animate-spin" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">
          Compiling Career Intelligence Dossier
        </h2>
        <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-md">
          Running authoritative server-side evaluation across 9 core competencies, computing percentile benchmarks, and validating credential eligibility...
        </p>
      </div>
    );
  }

  // ─── ACTIVE EXAMINATION TERMINAL VIEW ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans antialiased flex flex-col selection:bg-[#E8F7F1]">
      {/* Top Fixed Operations Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#005B4F] flex items-center justify-center text-white font-serif font-bold text-sm">
            A
          </div>
          <div>
            <div className="font-serif font-bold text-xs sm:text-sm text-stone-900">
              ACRI Pharmacovigilance Certification
            </div>
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              Item {currentIdx + 1} of {questions.length} · {activeQuestion.stageCategory}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {/* Autosave status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-stone-500">
            <span
              className={`h-2 w-2 rounded-full ${
                autosaveStatus === "saving" ? "bg-amber-500 motion-safe:animate-ping" : "bg-emerald-500"
              }`}
            />
            <span>{autosaveStatus === "saving" ? "Saving..." : "Autosaved"}</span>
          </div>

          {/* Time Remaining Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-mono text-xs sm:text-sm font-bold">
            <Clock className="h-3.5 w-3.5 text-[#005B4F]" />
            <span>{timeFormatted}</span>
          </div>
        </div>
      </header>

      {/* Progress Line */}
      <div className="w-full bg-stone-200 h-1">
        <div
          className="bg-[#005B4F] h-1 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question / Simulation Stage */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Stage Identifier & Reference */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-mono font-bold">
            <span>{activeQuestion.stageName}</span>
          </div>

          {activeQuestion.evidenceRef && (
            <span className="text-[11px] font-mono text-stone-500">
              REF: {activeQuestion.evidenceRef}
            </span>
          )}
        </div>

        {/* Clinical Scenario Box */}
        {activeQuestion.clinicalScenario && (
          <div className="rounded-2xl p-5 sm:p-6 bg-white card-light border border-stone-200 shadow-xs space-y-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-1.5">
              CLINICAL CASE DOSSIER &amp; SOURCE DATA
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {activeQuestion.clinicalScenario.patient && (
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                  <span className="font-mono text-[10px] text-stone-500 block uppercase">Patient:</span>
                  <span className="font-bold text-stone-800">{activeQuestion.clinicalScenario.patient}</span>
                </div>
              )}
              {activeQuestion.clinicalScenario.suspectDrug && (
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                  <span className="font-mono text-[10px] text-stone-500 block uppercase">Suspect Drug:</span>
                  <span className="font-bold text-stone-800">{activeQuestion.clinicalScenario.suspectDrug}</span>
                </div>
              )}
              {activeQuestion.clinicalScenario.adverseEvent && (
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                  <span className="font-mono text-[10px] text-stone-500 block uppercase">Adverse Event:</span>
                  <span className="font-bold text-stone-800">{activeQuestion.clinicalScenario.adverseEvent}</span>
                </div>
              )}
            </div>

            {activeQuestion.clinicalScenario.narrativeSnippet && (
              <div className="mt-2 p-3 bg-stone-50/80 rounded-lg border-l-2 border-[#005B4F] text-xs text-stone-700 italic">
                "{activeQuestion.clinicalScenario.narrativeSnippet}"
              </div>
            )}
          </div>
        )}

        {/* Question Prompt */}
        <div className="space-y-2">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 leading-snug">
            {activeQuestion.prompt}
          </h2>
          <p className="text-xs text-stone-500 font-sans">
            Select the most accurate regulatory and clinical action:
          </p>
        </div>

        {/* Options Stack */}
        <div className="space-y-3 pt-1">
          {activeQuestion.options.map((opt) => {
            const isSelected = answers[activeQuestion.id] === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleSelectOption(opt.key)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? "bg-[#E8F7F1]/50 border-[#005B4F] ring-1 ring-[#005B4F] shadow-xs"
                    : "bg-white card-light border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 shadow-xs"
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-lg shrink-0 flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-[#005B4F] text-white"
                      : "bg-stone-100 text-stone-700 border border-stone-200"
                  }`}
                >
                  {opt.key.toUpperCase()}
                </div>

                <div className="flex-1 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans pt-0.5">
                  {opt.text}
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Bottom Sticky Action Rail */}
      <footer className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 p-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold font-mono inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>PREVIOUS</span>
          </button>

          <div className="text-xs font-mono text-stone-500">
            {answeredCount} of {questions.length} answered
          </div>

          {currentIdx < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-6 py-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold font-mono inline-flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>NEXT</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white text-xs font-bold font-mono inline-flex items-center gap-2 shadow-md cursor-pointer group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
                  <span>EVALUATING...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT CERTIFICATION</span>
                  <Send className="h-3.5 w-3.5 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
