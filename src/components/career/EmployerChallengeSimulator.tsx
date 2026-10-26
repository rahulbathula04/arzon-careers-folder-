import { useState, useMemo } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Building2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  FileText,
  Target,
  Check,
  HelpCircle,
  Play,
  X,
} from "lucide-react";
import {
  EMPLOYER_SCENARIO_QUESTIONS,
  type EmployerScenarioQuestion,
  type CompetencyDimensionKey,
} from "@/data/employerAssessmentBank";
import {
  EMPLOYER_WEIGHT_CONFIGS,
  type EmployerName,
  evaluateEmployerHiringReadiness,
} from "@/data/employerScoringEngine";
import { LIVE_EMPLOYER_OPENINGS } from "@/data/industry/liveEmployerOpenings";
import { CompanyBrandLogo } from "./result/CompanyLogos";
import { toast } from "sonner";

interface Props {
  initialEmployer?: EmployerName;
  onComplete?: (updatedAnswers: Record<string, string>) => void;
  onClose?: () => void;
}

export function EmployerChallengeSimulator({
  initialEmployer,
  onComplete,
  onClose,
}: Props) {
  const [selectedEmployer, setSelectedEmployer] = useState<EmployerName | "All">(
    initialEmployer ?? "All"
  );
  const [examMode, setExamMode] = useState<"practice" | "timed">("practice");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Filter questions based on selected employer
  const filteredQuestions = useMemo(() => {
    if (selectedEmployer === "All") {
      return EMPLOYER_SCENARIO_QUESTIONS;
    }
    return EMPLOYER_SCENARIO_QUESTIONS.filter((q) =>
      q.targetEmployers.includes(selectedEmployer)
    );
  }, [selectedEmployer]);

  const currentQuestion: EmployerScenarioQuestion | undefined =
    filteredQuestions[currentIndex] ?? filteredQuestions[0];

  const totalQuestions = filteredQuestions.length;
  const answeredCount = Object.keys(answers).filter((id) =>
    filteredQuestions.some((q) => q.id === id)
  ).length;

  const currentSelectedOptionId = currentQuestion ? answers[currentQuestion.id] : undefined;
  const currentSelectedOption = currentQuestion?.options.find(
    (o) => o.id === currentSelectedOptionId
  );

  // Select an option
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  // Next / Previous navigation
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      if (onComplete) {
        onComplete(answers);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    toast.info("Simulation reset. You can begin fresh.");
  };

  // Compute live readiness report based on scenario answers
  const simulatedReadiness = useMemo(() => {
    return evaluateEmployerHiringReadiness(answers, 75, 0.85);
  }, [answers]);

  // Dimension details
  const getDimensionIcon = (dim: CompetencyDimensionKey) => {
    switch (dim) {
      case "icsr_triage":
        return <FileText className="h-3.5 w-3.5 text-blue-600" />;
      case "seriousness_clocks":
        return <Clock className="h-3.5 w-3.5 text-amber-600" />;
      case "medical_coding":
        return <Layers className="h-3.5 w-3.5 text-indigo-600" />;
      case "clinical_narrative":
        return <Sparkles className="h-3.5 w-3.5 text-purple-600" />;
      case "gcp_data_integrity":
        return <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />;
    }
  };

  const activeCutoff =
    selectedEmployer !== "All"
      ? EMPLOYER_WEIGHT_CONFIGS[selectedEmployer]?.hiringBarCutoff ?? 70
      : 70;

  const activeTargetFit =
    selectedEmployer !== "All"
      ? simulatedReadiness.employerMatches.find((m) => m.employer === selectedEmployer)
      : null;

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_16px_48px_-8px_rgba(7,26,74,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 shadow-2xs">
              <Target className="h-3 w-3 text-blue-600" />
              <span>PHARMACOVIGILANCE PRACTICE</span>
            </span>
            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Practice scenarios
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#081F38]">
            Practice Pharmacovigilance Scenarios
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
            These educational scenarios are for practice and have not been verified as questions used by any named employer. Results indicate performance on this question set only, not interview outcomes or hiring eligibility.
          </p>
        </div>

        {/* Action Controls & Close */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-xs font-semibold text-slate-600 transition-colors cursor-pointer shadow-2xs"
            title="Reset Simulation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Close Simulator"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Track & Mode Switcher Pills */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        {/* Employer Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setSelectedEmployer("All");
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedEmployer === "All"
                ? "bg-[#081F38] text-white shadow-2xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Tracks ({EMPLOYER_SCENARIO_QUESTIONS.length})
          </button>
          {(["Novartis", "IQVIA", "Parexel", "Cognizant", "Accenture"] as EmployerName[]).map(
            (emp) => {
              const isSelected = selectedEmployer === emp;
              const count = EMPLOYER_SCENARIO_QUESTIONS.filter((q) =>
                q.targetEmployers.includes(emp)
              ).length;

              return (
                <button
                  key={emp}
                  type="button"
                  onClick={() => {
                    setSelectedEmployer(emp);
                    setCurrentIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <CompanyBrandLogo company={emp} className="h-3 w-auto invert brightness-0" />
                  <span>{emp}</span>
                  <span
                    className={`text-[9px] font-mono px-1 rounded-full ${
                      isSelected ? "bg-blue-700 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowFeedback(!showFeedback)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              showFeedback
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            <CheckCircle2 className="h-3 w-3" />
            <span>{showFeedback ? "Learning Feedback: ON" : "Learning Feedback: OFF"}</span>
          </button>
        </div>
      </div>

      {!isCompleted && currentQuestion ? (
        <div className="mt-5 space-y-5">
          {/* Progress Bar & Scenario Meta Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70 border border-slate-200/80 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-slate-500">
                Scenario {currentIndex + 1} of {totalQuestions}
              </span>
              <div className="h-1.5 w-24 sm:w-36 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 font-sans font-medium text-slate-700 shadow-2xs">
                {getDimensionIcon(currentQuestion.dimension)}
                <span>{currentQuestion.dimensionName}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold text-blue-700">
                {currentQuestion.code}
              </span>
            </div>
          </div>

          {/* Clinical Case Vignette Card */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/40 via-white to-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-mono text-[10px] font-bold uppercase">
                  {currentQuestion.clinicalVignette.sourceType}
                </span>
                <span className="text-xs text-slate-500 font-sans">
                  Target Panels: {currentQuestion.targetEmployers.join(" · ")}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {currentQuestion.regulatoryStandard}
              </span>
            </div>

            {/* Case Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs font-sans">
              <div>
                <strong className="text-slate-500 font-mono text-[10px] uppercase block">
                  Patient &amp; Presentation:
                </strong>
                <p className="text-[#081F38] mt-0.5">{currentQuestion.clinicalVignette.patientProfile}</p>
              </div>
              <div>
                <strong className="text-slate-500 font-mono text-[10px] uppercase block">
                  Suspect Product:
                </strong>
                <p className="text-[#081F38] font-semibold mt-0.5">
                  {currentQuestion.clinicalVignette.suspectProduct}
                </p>
              </div>
              <div className="sm:col-span-2">
                <strong className="text-slate-500 font-mono text-[10px] uppercase block">
                  Reported Event &amp; Clinical Details:
                </strong>
                <p className="text-slate-800 mt-0.5 leading-relaxed">
                  {currentQuestion.clinicalVignette.reportedEvent} —{" "}
                  {currentQuestion.clinicalVignette.timelineDetails}
                </p>
                {currentQuestion.clinicalVignette.labMarkers && (
                  <p className="mt-1 text-blue-800 font-mono text-[11px] bg-blue-50/70 p-1.5 rounded-lg border border-blue-200/60">
                    🔬 {currentQuestion.clinicalVignette.labMarkers}
                  </p>
                )}
              </div>
            </div>

            {/* Question Prompt */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <h4 className="text-sm sm:text-base font-bold text-[#081F38] font-sans">
                {currentQuestion.prompt}
              </h4>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, oIdx) => {
              const isSelected = currentSelectedOptionId === opt.id;
              const letter = String.fromCharCode(65 + oIdx);

              let optionStyle = "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50";
              if (isSelected) {
                if (showFeedback) {
                  optionStyle = opt.isCorrect
                    ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20"
                    : "border-rose-400 bg-rose-50/50 ring-2 ring-rose-400/20";
                } else {
                  optionStyle = "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-3.5 cursor-pointer shadow-2xs ${optionStyle}`}
                >
                  <span
                    className={`h-6 w-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? showFeedback
                          ? opt.isCorrect
                            ? "bg-emerald-600 text-white"
                            : "bg-rose-600 text-white"
                          : "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {letter}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-[#081F38] font-sans leading-relaxed">
                      {opt.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Instant Rationale & Disqualification Feedback (if feedback mode on & answered) */}
          {showFeedback && currentSelectedOption && (
            <div
              className={`p-4 rounded-2xl border text-xs font-sans leading-relaxed transition-all ${
                currentSelectedOption.isCorrect
                  ? "border-emerald-200 bg-emerald-50/70 text-emerald-950"
                  : "border-rose-200 bg-rose-50/70 text-rose-950"
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1.5">
                {currentSelectedOption.isCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-mono uppercase text-emerald-800 tracking-wider">
                      Correct Regulatory Decision (+100% Score)
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                    <span className="font-mono uppercase text-rose-800 tracking-wider">
                      Panel Elimination Risk Triggered
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1">{currentSelectedOption.rationale}</p>
              {currentSelectedOption.eliminationFeedback && (
                <p className="mt-2 pt-2 border-t border-rose-200/80 font-semibold text-rose-900">
                  ⚠️ Recruiter Warning: {currentSelectedOption.eliminationFeedback}
                </p>
              )}
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentIndex === 0
                  ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!currentSelectedOptionId}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                currentSelectedOptionId
                  ? "bg-[#081F38] hover:bg-[#0D2E54] text-white cursor-pointer active:scale-95"
                  : "opacity-40 cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >
              <span>{currentIndex === totalQuestions - 1 ? "Complete Simulation" : "Next Scenario"}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completion State */
        <div className="mt-6 p-6 sm:p-8 rounded-3xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/50 via-white to-white text-center space-y-6">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-2xs">
            <Award className="h-8 w-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
              SIMULATION COMPLETED · RECRUITER CALIBRATION UPDATED
            </span>
            <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#081F38] mt-3">
              Round 2 Technical Evaluation Results
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-xl mx-auto mt-1 leading-relaxed">
              Your responses have been processed through the Recruiter Fit Index scoring engine against verified hiring cutoffs.
            </p>
          </div>

          {/* Performance Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                Calibrated RFI Score
              </span>
              <p className="text-2xl font-mono font-extrabold text-blue-600 mt-1">
                {simulatedReadiness.overallReadinessScore}%
              </p>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Grade {simulatedReadiness.letterGrade} Candidate
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                Hiring Cutoff Bar
              </span>
              <p className="text-2xl font-mono font-extrabold text-slate-700 mt-1">
                {activeCutoff}%
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold font-sans mt-0.5">
                {simulatedReadiness.overallReadinessScore >= activeCutoff
                  ? `+${simulatedReadiness.overallReadinessScore - activeCutoff}% Above Benchmark`
                  : `${simulatedReadiness.overallReadinessScore - activeCutoff}% Below Cutoff`}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                Top Matched Sponsor
              </span>
              <p className="text-lg font-bold text-[#081F38] mt-1 truncate font-sans">
                {simulatedReadiness.topMatchedEmployer}
              </p>
              <p className="text-[11px] text-blue-700 font-medium font-sans mt-0.5">
                Interview Panel Cleared
              </p>
            </div>
          </div>

          {/* Retake & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retake Simulation</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#081F38] hover:bg-[#0D2E54] text-xs font-bold text-white shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <span>Return to Requisition Dossier</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
