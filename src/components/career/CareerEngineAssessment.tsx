import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Sun,
  Moon,
  Shield,
  ShieldCheck,
  BookOpen,
  Flag,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  Target,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ArzonLogo } from "@/components/acri/ArzonLogo";
import { useNavigate } from "@tanstack/react-router";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import {
  DRUG_SAFETY_DIAGNOSTIC_QUESTIONS,
  type DsaDiagnosticQuestion,
  getDrugSafetyAssessmentQuestions,
} from "@/data/drugSafetyDiagnosticQuestions";
import { computeResult } from "@/data/careerEngineScoring";
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
  cacheResult,
  getOrInitAttemptStartedAt,
  loadSavedAnswers,
} from "@/lib/careerEngineRunner";

const MAX_MINUTES = 30;

const CLUSTERS = [
  { id: 0, label: "Q 1–10", range: [0, 9] as const, title: "PV Fundamentals & ICSR" },
  { id: 1, label: "Q 11–20", range: [10, 19] as const, title: "Day 0 & Seriousness" },
  { id: 2, label: "Q 21–30", range: [20, 29] as const, title: "MedDRA & Special Cases" },
  { id: 3, label: "Q 31–40", range: [30, 39] as const, title: "Narratives & Causality" },
];

export function CareerEngineAssessment() {
  const navigate = useNavigate();
  const profile = getProfile();

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const loaded = loadSavedAnswers();
    if (profile?.college && !loaded.college_name) {
      loaded.college_name = profile.college;
      loaded.college = profile.college;
    }
    return loaded;
  });

  const questions: DsaDiagnosticQuestion[] = DRUG_SAFETY_DIAGNOSTIC_QUESTIONS;

  // Determine starting index: first unanswered question, or 0
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const loaded = loadSavedAnswers();
    const firstUnanswered = questions.findIndex((q) => !loaded[q.id]);
    return firstUnanswered >= 0 ? firstUnanswered : 0;
  });

  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [startedAt] = useState(() => getOrInitAttemptStartedAt());
  const [now, setNow] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompletedView, setIsCompletedView] = useState(false);
  const [activeClusterTab, setActiveClusterTab] = useState<number>(() => Math.floor(currentIndex / 10));
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  const [theme, setTheme] = useState<"studio" | "midnight">(() => {
    try {
      const saved = localStorage.getItem("arzon_dsa_theme");
      if (saved === "midnight" || saved === "studio") return saved;
    } catch {
      // ignore
    }
    return "studio";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "studio" ? "midnight" : "studio";
      try {
        localStorage.setItem("arzon_dsa_theme", next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isDark = theme === "midnight";

  // Sync cluster tab whenever current question advances
  useEffect(() => {
    setActiveClusterTab(Math.floor(currentIndex / 10));
  }, [currentIndex]);

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

  const assessmentQuestions = useMemo(() => {
    return getDrugSafetyAssessmentQuestions();
  }, []);

  // Update timer every second (or low-frequency when reduced motion is preferred)
  useEffect(() => {
    const intervalMs = isReducedMotion() ? 10_000 : 1000;
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, []);

  const elapsedSecs = Math.max(0, Math.floor((now - startedAt) / 1000));
  const totalLimitSecs = MAX_MINUTES * 60;
  const remainingSecsTotal = Math.max(0, totalLimitSecs - elapsedSecs);
  const remainingMins = Math.floor(remainingSecsTotal / 60);
  const remainingSecs = String(remainingSecsTotal % 60).padStart(2, "0");

  const currentQ = questions[currentIndex] || questions[0];
  const answeredCount = Object.keys(answers).filter((k) =>
    questions.some((q) => q.id === k),
  ).length;
  const percent = Math.round((answeredCount / questions.length) * 100);

  const chooseOption = useCallback(
    (optionId: "A" | "B" | "C" | "D") => {
      const updated = { ...answers, [currentQ.id]: optionId };
      setAnswers(updated);
      saveAnswers(updated);

      pendingAnswersRef.current.push({ questionId: currentQ.id, answer: optionId });
      if (pendingAnswersRef.current.length >= 2) {
        void flushPendingAnswers();
      }

      // Smooth auto-advance to next question if not at end
      if (currentIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
        }, 180);
      } else {
        // If on last question and all answered, show completion review
        const allAnsweredNow = questions.every((q) => q.id === currentQ.id || Boolean(updated[q.id]));
        if (allAnsweredNow) {
          setTimeout(() => {
            setIsCompletedView(true);
          }, 240);
        }
      }
    },
    [answers, currentQ.id, currentIndex, questions],
  );

  const toggleFlag = () => {
    setFlagged((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompletedView(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation support ([1-4] or [A-D], Enter/Right, Left, F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompletedView || submitting) return;

      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      const key = e.key.toUpperCase();
      if (key === "1" || key === "A") {
        e.preventDefault();
        chooseOption("A");
      } else if (key === "2" || key === "B") {
        e.preventDefault();
        chooseOption("B");
      } else if (key === "3" || key === "C") {
        e.preventDefault();
        chooseOption("C");
      } else if (key === "4" || key === "D") {
        e.preventDefault();
        chooseOption("D");
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (key === "F") {
        e.preventDefault();
        toggleFlag();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chooseOption, currentIndex, isCompletedView, submitting]);

  const handleSubmitDiagnostic = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const finalAnswers = {
        ...answers,
        ...(profile?.college ? { college_name: profile.college, college: profile.college } : {}),
        stream: "BiPC",
        course: profile?.qualification ?? "B.Pharm",
        year: profile?.graduationYear ?? "2026",
      };

      const result = computeResult(finalAnswers, {
        questions: assessmentQuestions,
        meta: {
          attemptId: getAttemptId() ?? `att_${Date.now()}`,
          createdAt: new Date().toISOString(),
        },
      });

      await flushPendingAnswers();
      cacheResult(result);

      const leadId = getLeadId();
      if (leadId) {
        try {
          await finalizeLead({ leadId, result, answers: finalAnswers });
        } catch (e) {
          console.warn("Finalize lead warning (cached locally):", e);
        }
      }

      navigate({
        to: "/career-engine/result",
        search: leadId && !leadId.startsWith("lead_local_") ? { id: leadId } : undefined,
      });
    } catch (err) {
      console.error("Diagnostic submission error:", err);
      setError("Unable to submit diagnostic right now. Please try again.");
      setSubmitting(false);
    }
  };

  // Completion review screen before scoring
  if (isCompletedView) {
    return (
      <main
        className={`h-[100dvh] max-h-[100dvh] w-full flex items-center justify-center p-4 font-sans select-none overflow-hidden relative transition-colors duration-300 ${
          isDark
            ? "bg-[#050E1D] text-slate-100"
            : "bg-gradient-to-br from-[#EAEFF5] via-[#F1F5F9] to-[#E5ECF4] text-[#081F38]"
        }`}
      >
        <div
          className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 text-center transition-all ${
            isDark
              ? "border-blue-500/20 bg-[#0B1E38]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              : "border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-[0_16px_40px_rgba(8,31,56,0.08)]"
          }`}
        >
          <div
            className={`mx-auto h-14 w-14 rounded-2xl flex items-center justify-center shadow-2xs mb-4 ${
              isDark
                ? "bg-blue-950/80 border border-blue-500/40 text-blue-400"
                : "bg-blue-50 border border-blue-200 text-blue-700"
            }`}
          >
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-1 ${
              isDark ? "text-blue-400" : "text-blue-700"
            }`}
          >
            SIMULATION COMPLETE
          </span>
          <h1
            className={`text-xl sm:text-2xl font-bold font-sans tracking-tight ${
              isDark ? "text-white" : "text-[#081F38]"
            }`}
          >
            40 Casework Dilemmas Completed
          </h1>
          <p
            className={`mt-2 text-xs leading-relaxed font-sans max-w-md mx-auto ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Your responses have been recorded and cross-referenced with ICH E2A/E2D, EMA GVP VI, and MedDRA standards. Ready to generate your Technical Interview Diagnostic Scorecard?
          </p>

          <div
            className={`my-5 rounded-2xl border p-3.5 text-xs flex items-center justify-around font-mono ${
              isDark
                ? "bg-[#071629] border-blue-900/60 text-slate-200"
                : "bg-slate-50 border-slate-200/80 text-slate-700"
            }`}
          >
            <div>
              <span className={`text-[10px] uppercase block font-bold ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                Answered
              </span>
              <strong className={`text-sm ${isDark ? "text-white" : "text-[#081F38]"}`}>
                {answeredCount} / 40
              </strong>
            </div>
            <div className={`h-6 w-px ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />
            <div>
              <span className={`text-[10px] uppercase block font-bold ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                Target Role
              </span>
              <strong className={`text-sm ${isDark ? "text-blue-400" : "text-blue-700"}`}>
                Drug Safety Assoc
              </strong>
            </div>
            <div className={`h-6 w-px ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />
            <div>
              <span className={`text-[10px] uppercase block font-bold ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                Time Taken
              </span>
              <strong className={`text-sm ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                {30 - remainingMins}m
              </strong>
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-xl bg-rose-50 p-2.5 text-xs text-rose-700 font-semibold border border-rose-200">
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsCompletedView(false)}
              className={`w-full sm:w-1/3 py-3 px-4 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                isDark
                  ? "border-blue-500/30 bg-[#091B33] hover:bg-[#0E2545] text-slate-200"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
              }`}
            >
              Review Answers
            </button>
            <button
              type="button"
              onClick={handleSubmitDiagnostic}
              disabled={submitting}
              className={`w-full sm:w-2/3 py-3 px-5 rounded-2xl text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30"
                  : "bg-[#081F38] hover:bg-blue-700 shadow-[0_4px_14px_rgba(8,31,56,0.18)]"
              }`}
            >
              <span>{submitting ? "Scoring Responses…" : "Generate Diagnostic Scorecard"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    );
  }

  const selectedAnswer = answers[currentQ.id];
  const isFlagged = Boolean(flagged[currentQ.id]);

  return (
    <main
      className={`h-[100dvh] max-h-[100dvh] w-full flex flex-col font-sans select-none overflow-hidden relative transition-colors duration-300 ${
        isDark
          ? "bg-[#050E1D] text-slate-100"
          : "bg-gradient-to-br from-[#EAEFF5] via-[#F1F5F9] to-[#E5ECF4] text-[#081F38]"
      }`}
    >
      {/* Subtle Atmospheric Radial Glow (Eliminates Plain White) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 pointer-events-none -z-10 blur-3xl transition-opacity duration-500 ${
          isDark
            ? "bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent"
            : "bg-gradient-to-b from-blue-300/25 via-indigo-200/20 to-transparent"
        }`}
      />

      {/* ── TOP FROSTED COMPACT HEADER (Height: 52px) ─────────────────────────── */}
      <header
        className={`h-[52px] shrink-0 border-b px-3 sm:px-6 flex items-center justify-between gap-3 z-10 transition-colors duration-200 ${
          isDark
            ? "border-blue-500/20 bg-[#071426]/90 backdrop-blur-2xl text-slate-100"
            : "border-slate-200/90 bg-white/85 backdrop-blur-2xl text-[#081F38] shadow-xs"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <ArzonLogo variant={isDark ? "dark" : "light"} size="sm" />
          <span className={`hidden md:inline h-4 w-px ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold truncate">
            <span className={isDark ? "text-slate-200" : "text-[#081F38]"}>Clinical Interview Diagnostic</span>
            <span className={isDark ? "text-slate-600" : "text-slate-300"}>·</span>
            <span className={`font-mono text-[11px] font-bold ${isDark ? "text-blue-400" : "text-blue-700"}`}>
              Drug Safety Associate
            </span>
          </div>
        </div>

        {/* Center: Apple-Style Progress Capsule */}
        <div className="flex items-center gap-2.5">
          <span className={`text-xs font-mono font-bold ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Q <strong className={isDark ? "text-white" : "text-[#081F38]"}>{currentIndex + 1}</strong>
            <span className={isDark ? "text-slate-500" : "text-slate-400"}>/{questions.length}</span>
          </span>
          <div
            className={`w-20 sm:w-36 h-1.5 rounded-full overflow-hidden border ${
              isDark ? "bg-slate-800 border-slate-700/60" : "bg-slate-200/70 border-slate-300/60"
            }`}
          >
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className={`hidden md:inline text-[11px] font-mono font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {answeredCount}/{questions.length} Answered
          </span>
        </div>

        {/* Right: Theme Switcher, Timer & Flag Action */}
        <div className="flex items-center gap-2">
          {/* Apple Theme Switcher (Studio Light vs Midnight Console) */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? "Switch to Studio Light Theme" : "Switch to Midnight Console Theme"}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer shadow-xs ${
              isDark
                ? "border-blue-500/30 bg-[#0E2442] hover:bg-[#132D52] text-blue-200"
                : "border-slate-200 bg-white hover:bg-slate-100 text-slate-700"
            }`}
          >
            {isDark ? (
              <>
                <Moon className="h-3.5 w-3.5 text-blue-400" />
                <span className="hidden min-[480px]:inline">Midnight</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                <span className="hidden min-[480px]:inline">Studio</span>
              </>
            )}
          </button>

          <span
            className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-mono font-bold ${
              isDark
                ? "border-blue-500/30 bg-[#0B1E38] text-blue-200"
                : "border-slate-200 bg-white text-slate-700 shadow-2xs"
            }`}
          >
            <Clock className={`h-3 w-3 shrink-0 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
            <span>
              {remainingMins}:{remainingSecs}
            </span>
          </span>

          <button
            type="button"
            onClick={toggleFlag}
            title={isFlagged ? "Flagged for review" : "Flag this question"}
            className={`h-8 w-8 rounded-xl border flex items-center justify-center transition cursor-pointer ${
              isFlagged
                ? "bg-amber-50 border-amber-300 text-amber-600"
                : isDark
                ? "border-blue-900/60 bg-[#0B1E38] text-slate-400 hover:text-slate-200"
                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 shadow-2xs"
            }`}
          >
            <Flag className="h-3.5 w-3.5" fill={isFlagged ? "currentColor" : "none"} />
          </button>
        </div>
      </header>

      {/* ── DESKTOP SPLIT VIEWPORT WORKBENCH (Desktop: >= 1024px) ─────────────── */}
      <div className="hidden lg:grid flex-1 min-h-0 grid-cols-12 gap-5 px-6 py-3.5 max-w-7xl mx-auto w-full items-stretch overflow-hidden">
        {/* Left Panel: Electronic Safety Case File (eSafety Dossier) */}
        <div
          className={`col-span-6 flex flex-col justify-between h-full min-h-0 rounded-3xl border overflow-hidden transition-all ${
            isDark
              ? "bg-[#0B1E38]/90 backdrop-blur-2xl border-blue-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              : "bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-[0_16px_40px_rgba(8,31,56,0.06),_0_2px_8px_rgba(8,31,56,0.03)]"
          }`}
        >
          {/* Dossier Header Bar */}
          <div
            className={`px-5 py-3 border-b flex items-center justify-between shrink-0 ${
              isDark ? "bg-[#071629]/70 border-blue-900/50" : "bg-slate-50/80 border-slate-200/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${isDark ? "bg-blue-400" : "bg-blue-600"} motion-safe:animate-pulse`} />
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                  isDark ? "text-blue-300" : "text-slate-600"
                }`}
              >
                ICSR INTAKE DOSSIER · CASE #{String(currentQ.number).padStart(2, "0")} OF 40
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isDark
                    ? "bg-blue-950/80 border border-blue-500/30 text-blue-300"
                    : "bg-blue-50 border border-blue-200/80 text-blue-700"
                }`}
              >
                <BookOpen className="h-2.5 w-2.5" />
                {currentQ.competencyTitle}
              </span>
              {isFlagged && (
                <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  <Flag className="h-2.5 w-2.5" fill="currentColor" /> Flagged
                </span>
              )}
            </div>
          </div>

          {/* Main Scrollable Dossier Content */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-3.5">
            {/* Dilemma Prompt */}
            <div>
              <span
                className={`text-[9.5px] font-mono font-bold uppercase tracking-widest block mb-1 ${
                  isDark ? "text-blue-400/80" : "text-slate-400"
                }`}
              >
                TECHNICAL INTERVIEW DILEMMA
              </span>
              <h2
                className={`text-base xl:text-[17px] font-bold font-sans leading-snug tracking-tight ${
                  isDark ? "text-white" : "text-[#081F38]"
                }`}
              >
                {currentQ.prompt}
              </h2>
            </div>

            {/* Dossier Clinical Scenario Card */}
            <div
              className={`rounded-2xl border p-4 shadow-inner border-l-4 transition-colors ${
                isDark
                  ? "bg-[#07162B] border-blue-900/60 border-l-blue-400 text-slate-200"
                  : "bg-gradient-to-b from-slate-100/90 to-slate-50/70 border-slate-200/90 border-l-blue-600 text-slate-800"
              }`}
            >
              <div
                className={`flex items-center justify-between gap-2 pb-2 mb-2 border-b ${
                  isDark ? "border-blue-900/40" : "border-slate-200/60"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <FileText className={`h-3.5 w-3.5 shrink-0 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isDark ? "text-blue-300" : "text-slate-700"
                    }`}
                  >
                    Investigator Source Report (eCRF Extract)
                  </span>
                </div>
                <span className={`text-[9.5px] font-mono font-bold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Case {currentQ.number.toString().padStart(2, "0")} · 40
                </span>
              </div>
              <p className="text-xs xl:text-[13px] leading-relaxed font-sans font-normal">
                {currentQ.scenario}
              </p>
            </div>

            {/* Interview Triage Focus & Recruiter Insight (Fills the dead void with real intelligence!) */}
            <div
              className={`rounded-2xl border p-3.5 space-y-1.5 transition-colors ${
                isDark
                  ? "bg-blue-950/40 border border-blue-500/30 text-blue-100"
                  : "bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-blue-50/30 border-blue-200/80 text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isDark ? "text-blue-300" : "text-blue-800"
                  }`}
                >
                  <Target className={`h-3 w-3 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                  Interview Triage Mandate
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isDark
                      ? "bg-blue-900/60 text-blue-300 border border-blue-700/50"
                      : "bg-blue-100/70 text-blue-700"
                  }`}
                >
                  {currentQ.topic}
                </span>
              </div>
              <p className={`text-[11px] xl:text-xs leading-relaxed font-sans ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {currentQ.recruiterInsight}
              </p>
            </div>
          </div>

          {/* Dossier Regulatory Compliance Footer (NO TEXT COLLISION!) */}
          <div
            className={`px-5 py-2.5 border-t flex items-center justify-between text-[11px] font-mono shrink-0 ${
              isDark
                ? "bg-[#071629]/80 border-blue-900/50 text-slate-400"
                : "bg-slate-50/80 border-slate-200/70 text-slate-500"
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0 pr-2">
              <ShieldCheck className={`h-3.5 w-3.5 shrink-0 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              <span className="truncate">
                Regulatory Standard:{" "}
                <strong className={`font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                  {currentQ.guidelineReference}
                </strong>
              </span>
            </div>
            <span
              className={`text-[10px] font-mono font-semibold shrink-0 whitespace-nowrap ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              ICH/GVP Casework
            </span>
          </div>
        </div>

        {/* Right Panel: Tactile Apple Pro Decision Console */}
        <div
          className={`col-span-6 flex flex-col justify-between h-full min-h-0 rounded-3xl border overflow-hidden transition-all ${
            isDark
              ? "bg-[#0B1E38]/90 backdrop-blur-2xl border-blue-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              : "bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-[0_16px_40px_rgba(8,31,56,0.06),_0_2px_8px_rgba(8,31,56,0.03)]"
          }`}
        >
          {/* Header */}
          <div
            className={`px-5 py-3 border-b flex items-center justify-between shrink-0 ${
              isDark ? "bg-[#071629]/70 border-blue-900/50 text-slate-400" : "bg-slate-50/80 border-slate-200/70 text-slate-500"
            }`}
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Shield className={`h-3 w-3 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              SELECT EXPECTED REGULATORY ACTION
            </span>
            <span className="text-[10px] font-mono">
              Shortcuts:{" "}
              <kbd
                className={`px-1 py-0.5 rounded border font-bold ${
                  isDark
                    ? "bg-[#051122] border-blue-900/60 text-blue-300"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                1–4
              </kbd>{" "}
              or{" "}
              <kbd
                className={`px-1 py-0.5 rounded border font-bold ${
                  isDark
                    ? "bg-[#051122] border-blue-900/60 text-blue-300"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                A–D
              </kbd>
            </span>
          </div>

          {/* The 4 Decision Option Cards (tactile, Apple Pro squircle cards) */}
          <div className="flex-1 min-h-0 flex flex-col justify-between gap-2.5 p-4 xl:p-5 overflow-y-auto">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswer === opt.id;
              const cleanText = opt.text.replace(/^Option\s+[A-D]:\s*/i, "");

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => chooseOption(opt.id)}
                  className={`group w-full text-left rounded-2xl border p-3.5 xl:p-4 flex items-start gap-3.5 transition-all duration-150 cursor-pointer select-none active:scale-[0.99] ${
                    isSelected
                      ? isDark
                        ? "border-2 border-blue-400 bg-blue-600/20 shadow-[0_0_24px_rgba(37,99,235,0.35)] ring-4 ring-blue-500/20 text-white"
                        : "border-2 border-blue-600 bg-gradient-to-r from-blue-50 via-indigo-50/40 to-blue-50/80 shadow-[0_4px_16px_rgba(37,99,235,0.18)] ring-4 ring-blue-600/15 text-[#081F38]"
                      : isDark
                      ? "border-blue-900/50 bg-[#091B33] hover:border-blue-400/60 hover:bg-[#0E2545] text-slate-200 shadow-sm"
                      : "border-slate-200/90 bg-white hover:border-blue-400 hover:bg-slate-50/90 text-slate-800 shadow-[0_2px_8px_rgba(8,31,56,0.04)] hover:shadow-md"
                  }`}
                >
                  {/* Avatar Pill */}
                  <span
                    className={`h-7 w-7 xl:h-8 xl:w-8 rounded-xl text-xs font-mono font-bold shrink-0 flex items-center justify-center transition-all ${
                      isSelected
                        ? isDark
                          ? "bg-blue-500 text-white shadow-xs"
                          : "bg-blue-600 text-white shadow-xs"
                        : isDark
                        ? "bg-[#051122] text-blue-300 border border-blue-800/60 group-hover:border-blue-500/60"
                        : "bg-[#081F38] text-white group-hover:bg-blue-700"
                    }`}
                  >
                    {isSelected ? <Check className="h-4 w-4" /> : opt.id}
                  </span>

                  {/* Option Text */}
                  <span
                    className={`text-xs xl:text-[13px] font-medium leading-snug pt-0.5 flex-1 ${
                      isSelected
                        ? isDark
                          ? "text-white font-semibold"
                          : "text-[#081F38] font-bold"
                        : isDark
                        ? "text-slate-200 group-hover:text-white"
                        : "text-slate-800 group-hover:text-slate-950"
                    }`}
                  >
                    {cleanText}
                  </span>

                  {/* Right Indicator: Key hint or Selected pill (NO DUPLICATE LETTER BADGE!) */}
                  <span
                    className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md transition-all shrink-0 ${
                      isSelected
                        ? isDark
                          ? "text-blue-300 bg-blue-900/60 font-bold border border-blue-500/40"
                          : "text-blue-700 bg-blue-100 font-bold"
                        : isDark
                        ? "text-slate-400 bg-[#051122] border border-blue-900/40 group-hover:text-slate-200"
                        : "text-slate-500 bg-slate-100 border border-slate-200 group-hover:text-slate-700"
                    }`}
                  >
                    {isSelected ? "Selected ✓" : `Key ${idx + 1}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Decision Console Footer */}
          <div
            className={`px-5 py-2.5 border-t flex items-center justify-between text-[11px] font-mono shrink-0 ${
              isDark
                ? "bg-[#071629]/80 border-blue-900/50 text-slate-400"
                : "bg-slate-50/80 border-slate-200/70 text-slate-400"
            }`}
          >
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Click choice or press{" "}
              <kbd
                className={`px-1 py-0.5 rounded border font-bold text-[10px] ${
                  isDark
                    ? "bg-[#051122] border-blue-900/60 text-blue-300"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                Enter ↵
              </kbd>
            </span>
            <span className={`font-bold flex items-center gap-1 ${isDark ? "text-blue-400" : "text-blue-700"}`}>
              {selectedAnswer ? (
                <>
                  <CheckCircle2 className={`h-3.5 w-3.5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                  <span>Option {selectedAnswer} Selected</span>
                </>
              ) : (
                <span className={isDark ? "text-slate-500 font-normal" : "text-slate-400 font-normal"}>
                  Awaiting Casework Decision
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* ── MOBILE SCROLLABLE WORKBENCH (Mobile / Small Tablet: < 1024px) ──────── */}
      <div className="lg:hidden flex-1 min-h-0 overflow-y-auto p-3.5 space-y-3">
        {/* Dossier Metadata & Eyebrow */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9.5px] font-mono font-bold uppercase tracking-wider truncate ${
              isDark
                ? "bg-blue-950/80 border border-blue-500/30 text-blue-300"
                : "bg-blue-50 border border-blue-200/80 text-blue-700"
            }`}
          >
            <BookOpen className="h-2.5 w-2.5" />
            {currentQ.competencyTitle}
          </span>
          <span className={`text-[10px] font-mono font-bold shrink-0 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Case #{String(currentQ.number).padStart(2, "0")} of 40
          </span>
        </div>

        {/* Dilemma Prompt */}
        <h2 className={`text-[15px] font-bold font-sans leading-snug ${isDark ? "text-white" : "text-[#081F38]"}`}>
          {currentQ.prompt}
        </h2>

        {/* Clinical Scenario Box */}
        <div
          className={`rounded-2xl border p-3.5 text-xs leading-relaxed font-sans shadow-2xs border-l-4 ${
            isDark
              ? "bg-[#07162B] border-blue-900/60 border-l-blue-400 text-slate-200"
              : "bg-gradient-to-b from-slate-100/90 to-slate-50/70 border-slate-200/90 border-l-blue-600 text-slate-800"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b ${
              isDark ? "border-blue-900/40" : "border-slate-200/60"
            }`}
          >
            <span
              className={`text-[9.5px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                isDark ? "text-blue-300" : "text-slate-700"
              }`}
            >
              <FileText className={`h-3 w-3 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              Source Narrative (eCRF)
            </span>
            <span className={`text-[9px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              ICH GCP E6(R2)
            </span>
          </div>
          <p className="font-normal">{currentQ.scenario}</p>
        </div>

        {/* Interview Triage Mandate */}
        <div
          className={`rounded-2xl border p-3 space-y-1 ${
            isDark
              ? "bg-blue-950/40 border-blue-500/30 text-blue-100"
              : "bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-blue-50/30 border-blue-200/80 text-slate-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-[9.5px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                isDark ? "text-blue-300" : "text-blue-800"
              }`}
            >
              <Target className={`h-3 w-3 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              Triage Mandate
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                isDark
                  ? "bg-blue-900/60 text-blue-300 border border-blue-700/50"
                  : "bg-blue-100/70 text-blue-700"
              }`}
            >
              {currentQ.topic}
            </span>
          </div>
          <p className={`text-[11px] leading-relaxed font-sans ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {currentQ.recruiterInsight}
          </p>
        </div>

        {/* Instruction label */}
        <div className="flex items-center justify-between pt-1">
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-400"}`}>
            Select Expected Action:
          </span>
          <span className={`text-[9.5px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            Single Choice
          </span>
        </div>

        {/* 4 Touch options */}
        <div className="space-y-2 pb-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswer === opt.id;
            const cleanText = opt.text.replace(/^Option\s+[A-D]:\s*/i, "");

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => chooseOption(opt.id)}
                className={`w-full text-left rounded-2xl border p-3.5 min-h-[52px] flex items-start gap-3 transition-all active:scale-[0.98] cursor-pointer touch-manipulation ${
                  isSelected
                    ? isDark
                      ? "border-2 border-blue-400 bg-blue-600/20 text-white ring-2 ring-blue-500/20 shadow-xs"
                      : "border-2 border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20 text-[#081F38] shadow-xs"
                    : isDark
                    ? "border-blue-900/50 bg-[#091B33] text-slate-200 hover:border-blue-800"
                    : "border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800"
                }`}
              >
                <span
                  className={`h-6 w-6 rounded-lg text-xs font-mono font-bold shrink-0 flex items-center justify-center mt-0.5 ${
                    isSelected
                      ? isDark
                        ? "bg-blue-500 text-white"
                        : "bg-blue-600 text-white"
                      : isDark
                      ? "bg-[#051122] text-blue-300 border border-blue-800/60"
                      : "bg-[#081F38] text-white"
                  }`}
                >
                  {isSelected ? <Check className="h-3.5 w-3.5" /> : opt.id}
                </span>
                <span className="text-[13px] sm:text-xs font-medium leading-relaxed flex-1">
                  {cleanText}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM DOCKED CONTROLS & PALETTE ─────────────────────────────────── */}
      <footer
        className={`min-h-[56px] shrink-0 border-t px-3.5 sm:px-6 py-2 flex items-center justify-between gap-2.5 z-10 transition-colors ${
          isDark
            ? "border-blue-500/20 bg-[#071426]/95 backdrop-blur-2xl text-slate-200"
            : "border-slate-200/90 bg-white/95 backdrop-blur-2xl text-slate-700 shadow-xs"
        }`}
        style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom, 8px))" }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer shrink-0 disabled:opacity-30 disabled:pointer-events-none ${
            isDark
              ? "border-blue-900/60 bg-[#091B33] hover:bg-[#0E2545] text-slate-200"
              : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
          }`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Desktop & Tablet: Clustered 40-Question Navigator */}
        <div className="hidden sm:flex items-center gap-2.5 justify-center flex-1 max-w-2xl">
          {/* Cluster Selector Tabs */}
          <div
            className={`inline-flex items-center p-1 rounded-xl text-[10px] font-mono font-bold shrink-0 shadow-inner ${
              isDark ? "bg-[#051122] border border-blue-900/60" : "bg-slate-100 border border-slate-200/80"
            }`}
          >
            {CLUSTERS.map((c) => {
              const isSelected = activeClusterTab === c.id;
              const answeredInCluster = questions
                .slice(c.range[0], c.range[1] + 1)
                .filter((q) => Boolean(answers[q.id])).length;
              const allAnswered = answeredInCluster === 10;

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveClusterTab(c.id)}
                  title={`${c.title} (${answeredInCluster}/10 Answered)`}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? isDark
                        ? "bg-blue-600 text-white font-extrabold shadow-sm"
                        : "bg-white text-[#081F38] shadow-2xs font-extrabold"
                      : isDark
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span>{c.label}</span>
                  {allAnswered ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  ) : answeredInCluster > 0 ? (
                    <span className={`text-[9px] font-semibold ${isDark ? "text-blue-300" : "text-blue-600"}`}>
                      {answeredInCluster}/10
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <span className={`h-4 w-px shrink-0 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

          {/* 10 Dots for Active Cluster */}
          <div className="flex items-center gap-1 shrink-0">
            {questions
              .slice(CLUSTERS[activeClusterTab].range[0], CLUSTERS[activeClusterTab].range[1] + 1)
              .map((q, localIdx) => {
                const globalIdx = CLUSTERS[activeClusterTab].range[0] + localIdx;
                const isCur = globalIdx === currentIndex;
                const isAns = Boolean(answers[q.id]);
                const isFlg = Boolean(flagged[q.id]);

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(globalIdx)}
                    title={`Question ${globalIdx + 1}${isAns ? " (Answered)" : ""}${isFlg ? " (Flagged)" : ""}`}
                    className={`h-7 w-7 rounded-lg text-[10.5px] font-mono font-bold shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                      isCur
                        ? isDark
                          ? "bg-white text-[#081F38] ring-2 ring-blue-400 shadow-md"
                          : "bg-[#081F38] text-white ring-2 ring-blue-500 shadow-xs"
                        : isFlg
                        ? isDark
                          ? "bg-amber-900/60 text-amber-100 border border-amber-600/60"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                        : isAns
                        ? isDark
                          ? "bg-blue-900/70 text-blue-200 border border-blue-700/60"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                        : isDark
                        ? "bg-[#0B1E38] text-slate-400 hover:bg-[#102B4E]"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {globalIdx + 1}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Mobile: Question Drawer Launcher */}
        <div className="sm:hidden flex items-center">
          <button
            type="button"
            onClick={() => setShowMobileDrawer(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
              isDark
                ? "border-blue-900/60 bg-[#091B33] text-slate-200"
                : "border-slate-200 bg-slate-50 text-slate-700"
            }`}
          >
            <span>Q {currentIndex + 1} / {questions.length}</span>
            <span className={`text-[10px] font-bold ${isDark ? "text-blue-400" : "text-blue-700"}`}>
              ({answeredCount} ans) ▾
            </span>
          </button>
        </div>

        {/* Next / Submit Button */}
        {currentIndex < questions.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 ${
              selectedAnswer
                ? isDark
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
                  : "bg-[#081F38] hover:bg-blue-700 text-white"
                : isDark
                ? "bg-[#091B33] hover:bg-[#0E2545] text-slate-300 border border-blue-900/60"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            <span>Next</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsCompletedView(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
          >
            <span>Review &amp; Finish</span>
            <CheckCircle2 className="h-3.5 w-3.5" />
          </button>
        )}
      </footer>

      {/* ── MOBILE 40-QUESTION PALETTE DRAWER (Apple iOS Sheet) ─────────────── */}
      {showMobileDrawer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end">
          <div
            className={`rounded-t-[32px] max-h-[82vh] flex flex-col overflow-hidden p-5 space-y-3.5 shadow-2xl ${
              isDark ? "bg-[#071629] border-t border-blue-500/20 text-slate-100" : "bg-white text-[#081F38]"
            }`}
          >
            {/* iOS Drag Handle */}
            <div className={`w-12 h-1.5 rounded-full mx-auto -mt-1 mb-1 ${isDark ? "bg-slate-700" : "bg-slate-300"}`} />

            <div className={`flex items-center justify-between border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                  Question Overview
                </span>
                <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-[#081F38]"}`}>
                  40 Clinical Interview Dilemmas
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMobileDrawer(false)}
                className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${
                  isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 py-1">
              {CLUSTERS.map((c) => {
                const clusterQs = questions.slice(c.range[0], c.range[1] + 1);
                return (
                  <div key={c.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                        {c.label} · {c.title}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {clusterQs.map((q, localIdx) => {
                        const globalIdx = c.range[0] + localIdx;
                        const isCur = globalIdx === currentIndex;
                        const isAns = Boolean(answers[q.id]);
                        const isFlg = Boolean(flagged[q.id]);

                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => {
                              setCurrentIndex(globalIdx);
                              setShowMobileDrawer(false);
                            }}
                            className={`h-9 rounded-xl text-xs font-mono font-bold flex items-center justify-center transition-all ${
                              isCur
                                ? isDark
                                  ? "bg-white text-[#081F38] ring-2 ring-blue-400 shadow-sm"
                                  : "bg-[#081F38] text-white ring-2 ring-blue-500 shadow-sm"
                                : isFlg
                                ? isDark
                                  ? "bg-amber-900/60 text-amber-100 border border-amber-600/60"
                                  : "bg-amber-100 text-amber-900 border border-amber-300"
                                : isAns
                                ? isDark
                                  ? "bg-blue-900/70 text-blue-200 border border-blue-700/60"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                                : isDark
                                ? "bg-[#0B1E38] text-slate-400"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {globalIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`pt-2 border-t flex items-center justify-between text-xs font-mono ${isDark ? "border-slate-800 text-slate-400" : "border-slate-100 text-slate-500"}`}>
              <span>{answeredCount} of 40 Answered</span>
              <button
                type="button"
                onClick={() => setShowMobileDrawer(false)}
                className={`px-4 py-1.5 rounded-xl font-bold ${isDark ? "bg-blue-600 text-white" : "bg-[#081F38] text-white"}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
