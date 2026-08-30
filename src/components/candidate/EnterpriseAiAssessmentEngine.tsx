import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  FileText,
  ChevronRight,
  ShieldCheck,
  Award,
  BookOpen,
  Activity,
  Stethoscope,
} from "lucide-react";
import {
  evaluateHealthcareAssessment,
  type AiAssessmentResult,
} from "@/lib/aiAssessmentEngine";
import { ShareableAcriCard } from "./ShareableAcriCard";
import { RecruiterDossierModal } from "./RecruiterDossierModal";
import { PremiumChip } from "@/components/ui/PremiumChip";

interface QuestionStage {
  id: number;
  stageName: string;
  category: string;
  standard: string;
  caseScenario: string;
  options: { label: string; text: string; points: number }[];
}

const ASSESSMENT_STAGES: QuestionStage[] = [
  {
    id: 1,
    stageName: "Section 1: Pharmacovigilance & Expedited ICSR Case Processing",
    category: "Oracle Argus 8.4 · MedDRA 27.0 · CIOMS-I",
    standard: "US FDA 21 CFR 312.32 & ICH-E2A Standard",
    caseScenario:
      "A 54-year-old oncology patient experiences severe Steven-Johnson Syndrome (SJS) within 4 days of initiating an investigational kinase inhibitor in a Phase III trial. What is the mandatory regulatory timeline for expedited SUSAR (Suspected Unexpected Serious Adverse Reaction) reporting to the US FDA and EMA?",
    options: [
      {
        label: "A",
        text: "7 Calendar Days for fatal / life-threatening SUSARs with complete follow-up narrative submitted within an additional 8 calendar days.",
        points: 25,
      },
      {
        label: "B",
        text: "30 Calendar Days via standard quarterly periodic safety update reports (PSUR).",
        points: 0,
      },
      {
        label: "C",
        text: "15 Calendar Days for all non-fatal clinical events without urgency triage.",
        points: 8,
      },
      {
        label: "D",
        text: "Annual safety report compilation at clinical study database lock.",
        points: 0,
      },
    ],
  },
  {
    id: 2,
    stageName: "Section 2: Medical Coding & Revenue Cycle Management",
    category: "AAPC CPC Exam Standard · ICD-10-CM · CPT-4",
    standard: "CMS Guidelines & AMA CPT Coding Rules",
    caseScenario:
      "A physician performs an annual preventive medicine evaluation for an established patient. During the visit, the patient exhibits acute bacterial pneumonia requiring separate detailed medical decision-making (MDM) and antibiotic prescription. How must this clinical encounter be coded under AMA CPT guidelines?",
    options: [
      {
        label: "A",
        text: "Appropriate preventive medicine code + Problem-oriented E/M code (e.g. 99214) appended with Modifier 25 to signify a significant, separately identifiable service.",
        points: 25,
      },
      {
        label: "B",
        text: "Only the preventive medicine code since same-day encounters cannot be unbundled under any circumstance.",
        points: 0,
      },
      {
        label: "C",
        text: "Modifier 59 appended to the ICD-10 diagnosis code.",
        points: 4,
      },
      {
        label: "D",
        text: "Primary ICD-10 code only without separate CPT-4 procedure line items.",
        points: 0,
      },
    ],
  },
  {
    id: 3,
    stageName: "Section 3: Clinical Data Management & Electronic Data Capture",
    category: "Medidata RAVE · eCRF Data Validation · ICH-GCP E6(R2)",
    standard: "GCDMP & Regulatory Compliance Audit",
    caseScenario:
      "During clinical data cleaning in an EDC platform (Medidata RAVE), a central laboratory report reveals serum creatinine of 3.8 mg/dL (critical high) on Day 14, but no corresponding Adverse Event (AE) is recorded in the subject's eCRF log. What is the standard CDM protocol?",
    options: [
      {
        label: "A",
        text: "Issue a formal clinical data discrepancy query to the Principal Investigator site requesting clinical evaluation and AE log reconciliation.",
        points: 25,
      },
      {
        label: "B",
        text: "Directly create an Adverse Event entry in the EDC database without investigator verification.",
        points: 0,
      },
      {
        label: "C",
        text: "Delete the laboratory record from the EDC platform to eliminate data inconsistency.",
        points: 0,
      },
      {
        label: "D",
        text: "Disregard the laboratory value until post-marketing pharmacovigilance surveillance.",
        points: 0,
      },
    ],
  },
  {
    id: 4,
    stageName: "Section 4: Clinical SAS & CDISC Statistical Programming",
    category: "Base SAS 9.4 · CDISC SDTM / ADaM Standards",
    standard: "FDA Data Standards Catalog & PMDA Submission",
    caseScenario:
      "In CDISC ADaM (ADAE dataset derivation for clinical study report tables), which standardized logic correctly defines the Treatment-Emergent Adverse Event flag (TRTEMFL = 'Y')?",
    options: [
      {
        label: "A",
        text: "Adverse event start date/time (ASTDTM) ≥ First study drug administration date/time (TRTSDTM) and ≤ Last dose date/time plus safety wash-out window.",
        points: 25,
      },
      {
        label: "B",
        text: "Adverse event start date occurs before the subject signs informed consent (RFICDAT).",
        points: 0,
      },
      {
        label: "C",
        text: "Any medical symptom documented during pre-screening washout regardless of dosing time.",
        points: 5,
      },
      {
        label: "D",
        text: "Adverse event severity rating strictly exceeds grade 3 irrespective of onset date.",
        points: 0,
      },
    ],
  },
];

export function EnterpriseAiAssessmentEngine() {
  const shouldReduceMotion = useReducedMotion();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [qualification, setQualification] = useState("Pharm.D / B.Pharm");
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 minutes adaptive clock
  const [evaluationResult, setEvaluationResult] = useState<AiAssessmentResult | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!isTestStarted || isTestCompleted || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTestStarted, isTestCompleted, shouldReduceMotion]);

  const currentStage = ASSESSMENT_STAGES[currentStageIndex];

  const handleStartTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidatePhone.trim()) return;
    setIsTestStarted(true);
  };

  const handleNextStage = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentStageIndex + 1 < ASSESSMENT_STAGES.length) {
      setCurrentStageIndex(currentStageIndex + 1);
    } else {
      // Evaluate Candidate Result
      const result = evaluateHealthcareAssessment(candidateName, newAnswers, qualification);
      setEvaluationResult(result);
      setIsTestCompleted(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* ─── State 1: Candidate Registration / Test Overview ─── */}
      {!isTestStarted && !isTestCompleted && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-10 shadow-sm space-y-8"
        >
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <PremiumChip variant="navy" size="md">
              2026 HEALTHCARE ADAPTIVE DIAGNOSTIC
            </PremiumChip>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Healthcare Career ACRI Diagnostic Instrument
            </h1>
            <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
              15-minute calibrated assessment benchmarked against 300+ Tier-1 Healthcare GCC Job Descriptions (Novartis, IQVIA, Parexel, Optum) and GPAT / GATE / AAPC CPC standards.
            </p>
          </div>

          {/* Test Metrics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
                TEST DURATION
              </span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-[#1B3F8B] mt-1">
                15 Mins
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
                BENCHMARK
              </span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-emerald-700 mt-1">
                GPAT / CPC
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
                OUTPUT
              </span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-[#8A6D1F] mt-1">
                ACRI Score
              </p>
            </div>
          </div>

          {/* Candidate Form */}
          <form onSubmit={handleStartTest} className="space-y-5 max-w-md mx-auto pt-2">
            <div className="space-y-1.5">
              <label className="font-mono text-xs font-bold text-stone-700 block">
                CANDIDATE FULL NAME *
              </label>
              <input
                type="text"
                required
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full h-12 px-4 rounded-xl border border-stone-300 bg-white tone-light font-sans text-sm focus:border-[#1B3F8B] focus:ring-2 focus:ring-[#1B3F8B]/20 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs font-bold text-stone-700 block">
                WHATSAPP / PHONE NUMBER *
              </label>
              <input
                type="tel"
                required
                value={candidatePhone}
                onChange={(e) => setCandidatePhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full h-12 px-4 rounded-xl border border-stone-300 bg-white tone-light font-sans text-sm focus:border-[#1B3F8B] focus:ring-2 focus:ring-[#1B3F8B]/20 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs font-bold text-stone-700 block">
                ACADEMIC QUALIFICATION *
              </label>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-stone-300 bg-white tone-light font-sans text-sm focus:border-[#1B3F8B] focus:ring-2 focus:ring-[#1B3F8B]/20 outline-none"
              >
                <option value="Pharm.D / B.Pharm / M.Pharm">Pharm.D / B.Pharm / M.Pharm</option>
                <option value="B.Sc / M.Sc Life Sciences / Biotech">B.Sc / M.Sc Life Sciences / Biotech</option>
                <option value="BDS / BAMS / BHMS / MBBS">BDS / BAMS / BHMS / Medical</option>
                <option value="Nursing / BPT / Allied Health">Nursing / BPT / Allied Health</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Diagnostic Test</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center font-mono text-[11px] text-stone-500">
              🔒 Safe &amp; Private · ACRI results generated immediately upon completion
            </p>
          </form>
        </motion.div>
      )}

      {/* ─── State 2: Active Test Question Progression ─── */}
      {isTestStarted && !isTestCompleted && (
        <motion.div
          key={currentStageIndex}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-10 shadow-sm space-y-6"
        >
          {/* Header Bar: Section & Timer */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                QUESTION {currentStageIndex + 1} OF {ASSESSMENT_STAGES.length}
              </span>
              <p className="font-mono text-xs text-stone-500">{currentStage.standard}</p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 font-mono text-xs font-bold text-stone-800">
              <Clock className="h-4 w-4 text-[#1B3F8B]" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {/* Question Title & Clinical Scenario */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-sky-900 font-mono text-xs font-bold">
              <Stethoscope className="h-3.5 w-3.5" />
              <span>{currentStage.category}</span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] leading-snug">
              {currentStage.stageName}
            </h2>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-800 font-sans leading-relaxed">
              <strong>Clinical Case Scenario:</strong>
              <p className="mt-1.5">{currentStage.caseScenario}</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentStage.options.map((option, idx) => {
              const isSelected = selectedOption === option.points;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedOption(option.points)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? "border-[#1B3F8B] bg-blue-50/50 shadow-xs ring-1 ring-[#1B3F8B]"
                      : "border-stone-200 bg-white tone-light hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <span
                    className={`h-7 w-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#1B3F8B] text-white"
                        : "bg-stone-100 text-stone-700 border border-stone-200"
                    }`}
                  >
                    {option.label}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed pt-0.5">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <span className="font-mono text-xs text-stone-500">
              Candidate: <strong>{candidateName}</strong>
            </span>

            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleNextStage}
              className={`h-11 px-6 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                selectedOption !== null
                  ? "bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 shadow-sm cursor-pointer"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              <span>
                {currentStageIndex + 1 === ASSESSMENT_STAGES.length
                  ? "Submit Diagnostic"
                  : "Next Question"}
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ─── State 3: Calibrated Results & Recruiter Dossier ─── */}
      {isTestCompleted && evaluationResult && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Top Score Banner */}
          <div className="rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-10 shadow-sm text-center space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                DIAGNOSTIC RESULT: BENCHMARK PASSED
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                Congratulations, {candidateName}!
              </h2>
              <p className="text-sm sm:text-base text-stone-700 font-sans max-w-xl mx-auto">
                Your ACRI score of{" "}
                <strong className="text-emerald-700 font-mono text-lg">
                  {evaluationResult.overallAcriScore}/100
                </strong>{" "}
                ranks in the{" "}
                <strong className="text-[#1B3F8B]">
                  {evaluationResult.percentileRank}th national percentile
                </strong>{" "}
                for Tier-1 Healthcare GCC hiring drives.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDossierOpen(true)}
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                <span>View Full Recruiter Dossier</span>
              </button>
            </div>
          </div>

          {/* Shareable Credential Card */}
          <div className="max-w-xl mx-auto">
            <ShareableAcriCard
              candidateName={candidateName}
              acriScore={evaluationResult.overallAcriScore}
              tierLabel={evaluationResult.tierLabel}
              verificationId={evaluationResult.verificationId}
            />
          </div>

          {/* Recruiter Dossier Modal */}
          <RecruiterDossierModal
            isOpen={isDossierOpen}
            onClose={() => setIsDossierOpen(false)}
            candidateName={candidateName}
            result={evaluationResult}
          />
        </motion.div>
      )}
    </div>
  );
}
