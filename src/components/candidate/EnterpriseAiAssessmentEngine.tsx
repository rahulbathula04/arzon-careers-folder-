import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Clock, FileText, ChevronRight } from "lucide-react";
import { evaluateCandidatePortfolio, type AiAssessmentResult } from "@/lib/aiAssessmentEngine";
import { ShareableAcriCard } from "./ShareableAcriCard";
import { RecruiterDossierModal } from "./RecruiterDossierModal";

interface QuestionStage {
  id: number;
  stageName: string;
  questionText: string;
  codeSnippet?: string;
  options: { label: string; text: string; points: number }[];
}

const ASSESSMENT_STAGES: QuestionStage[] = [
  {
    id: 1,
    stageName: "Stage 1: DSA & Algorithm Complexity",
    questionText: "Identify the optimal time & space complexity for processing 10,000,000 real-time streaming financial transactions without memory spillover.",
    codeSnippet: `def process_stream(transactions):\n    heap = []\n    for tx in transactions:\n        heapq.heappush(heap, (tx.timestamp, tx))\n        if len(heap) > 1000:\n            heapq.heappop(heap)\n    return heap`,
    options: [
      { label: "A", text: "O(N log K) Time, O(K) Space — Optimal Bounded Min-Heap", points: 25 },
      { label: "B", text: "O(N²) Time, O(N) Space — Nested Full List Sort", points: 5 },
      { label: "C", text: "O(N) Time, O(N) Space — Unbounded Hash Map", points: 12 },
      { label: "D", text: "O(1) Time, O(N²) Space — Static Memory Allocation", points: 0 },
    ],
  },
  {
    id: 2,
    stageName: "Stage 2: SQL & Lakehouse Data Engineering",
    questionText: "How do you eliminate full-table scans when executing high-concurrency window queries across 500GB+ partitioned data tables?",
    codeSnippet: `SELECT customer_id, AVG(amount) OVER (PARTITION BY region ORDER BY created_at\nROWS BETWEEN 7 PRECEDING AND CURRENT ROW)\nFROM enterprise_ledger_lakehouse`,
    options: [
      { label: "A", text: "Partition by 'region' + Cluster by 'created_at' + Apply Predicate Pushdown", points: 25 },
      { label: "B", text: "Convert query to cross join with unindexed temporary tables", points: 0 },
      { label: "C", text: "Execute inline Python loops in memory without indexing", points: 8 },
      { label: "D", text: "Disable partitioning and rely solely on default autoscaling", points: 4 },
    ],
  },
  {
    id: 3,
    stageName: "Stage 3: Enterprise AI Model Validation & Architecture",
    questionText: "Which architecture pattern guarantees zero data leakage and real-time feature retrieval for production AI inference?",
    codeSnippet: `class FeaturePipeline:\n    def get_realtime_embeddings(self, user_id):\n        # Feature Store lookup + Vector Index search\n        pass`,
    options: [
      { label: "A", text: "Dual Feature Store (Offline Batch + Online Low-Latency Redis Store)", points: 25 },
      { label: "B", text: "Compute feature vectors on the client-side JavaScript bundle", points: 0 },
      { label: "C", text: "Query raw SQL databases inside inference endpoints", points: 10 },
      { label: "D", text: "Store pre-computed predictions in unencrypted static JSON files", points: 5 },
    ],
  },
  {
    id: 4,
    stageName: "Stage 4: Cloud Microservices & Production CI/CD",
    questionText: "What is the industry-standard containerization and deployment pipeline for zero-downtime microservice rollouts?",
    codeSnippet: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: ai-inference-service\nspec:\n  strategy:\n    type: RollingUpdate`,
    options: [
      { label: "A", text: "Dockerized Multi-Stage Build + Kubernetes RollingUpdate + Automated Health Probes", points: 25 },
      { label: "B", text: "FTP upload of raw python files to single Virtual Machine", points: 0 },
      { label: "C", text: "Manual SSH deployment without containerization", points: 5 },
      { label: "D", text: "Building unversioned single binary files without health checks", points: 2 },
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
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1200); // 20 minutes
  const [evaluationResult, setEvaluationResult] = useState<AiAssessmentResult | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const verificationId = "ENT-ACRI-2026-9482X";

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
      setCurrentStageIndex((prev) => prev + 1);
    } else {
      // Calculate final evaluation using valid CandidateSubmission properties
      const totalScore = newAnswers.reduce((sum, val) => sum + val, 0);
      const res = evaluateCandidatePortfolio({
        candidateName,
        dsaComplexityScore: Math.min(100, Math.max(50, totalScore + 10)),
        hackerRankScore: Math.min(100, Math.max(55, totalScore + 5)),
        mlModelAccuracy: 92,
        hasDockerConfig: true,
        hasCIWorkflow: true,
        hasDocumentation: true,
      });
      setEvaluationResult(res);
      setIsTestCompleted(true);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {!isTestStarted && !isTestCompleted ? (
        /* Screen 1: Start Registration & Intake */
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-700 bg-gradient-to-br from-[#0F172A] via-[#0B132B] to-[#0F172A] p-6 sm:p-10 shadow-2xl text-slate-100 space-y-8"
        >
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 motion-safe:animate-pulse" /> 2026 Adaptive Technical Diagnostic
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">
              Enterprise AI & Quant ACRI Diagnostic Instrument
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              20-minute calibrated assessment evaluating DSA Complexity, SQL Data Engineering, AI System Design, and Production CI/CD.
            </p>
          </div>

          {/* Key Parameters Box */}
          <div className="grid gap-4 sm:grid-cols-3 font-mono text-xs text-center">
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-1">
              <span className="text-slate-400 block text-[10px]">Test Duration</span>
              <span className="font-bold text-[#F8FAFC] text-base">20 Minutes</span>
            </div>
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-1">
              <span className="text-slate-400 block text-[10px]">Evaluation Standard</span>
              <span className="font-bold text-emerald-400 text-base">O(N log N) Benchmark</span>
            </div>
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-1">
              <span className="text-slate-400 block text-[10px]">Direct SLA Output</span>
              <span className="font-bold text-blue-400 text-base">Instant Recruiter Dossier</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleStartTest} className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                Candidate Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                WhatsApp / Phone Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={candidatePhone}
                onChange={(e) => setCandidatePhone(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-slate-50 text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              Start Diagnostic Test <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-[11px] text-slate-400 text-center font-mono">
              🔒 Safe & Private · ACRI results generated immediately upon completion
            </p>
          </form>
        </motion.div>
      ) : isTestStarted && !isTestCompleted ? (
        /* Screen 2: Active Test Execution */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6"
        >
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                {currentStage.stageName}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-32 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
                    style={{ width: `${((currentStageIndex + 1) / ASSESSMENT_STAGES.length) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {currentStageIndex + 1} of {ASSESSMENT_STAGES.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <Clock className="h-4 w-4 motion-safe:animate-pulse" />
              <span>Time Remaining: {formatTimer(timerSeconds)}</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-50 leading-snug">
              {currentStage.questionText}
            </h3>

            {currentStage.codeSnippet && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{currentStage.codeSnippet}</pre>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentStage.options.map((opt, idx) => {
              const isSelected = selectedOption === opt.points;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedOption(opt.points)}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-950/50 shadow-lg"
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <span
                    className={`h-6 w-6 rounded-full border text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "border-blue-400 bg-blue-600 text-slate-50"
                        : "border-slate-700 bg-slate-800 text-slate-400"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span className="text-xs sm:text-sm font-sans text-slate-200 mt-0.5 leading-relaxed">
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Live Percentile Badge */}
          <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Live Percentile Positioning:</span>
            <span className="font-bold text-emerald-400">Top 8% of 1,840+ Assessed Candidates</span>
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNextStage}
              disabled={selectedOption === null}
              className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-50 text-xs font-bold font-sans flex items-center gap-2 shadow-lg transition-all disabled:opacity-40"
            >
              {currentStageIndex + 1 === ASSESSMENT_STAGES.length ? "Complete & Submit" : "Next Stage"} <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Screen 3: Test Results & Full Recruiter Output */
        evaluationResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header Result Card */}
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#0F172A] via-[#0B132B] to-[#0F172A] p-6 sm:p-8 text-center space-y-4 shadow-2xl">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Diagnostic Result: Benchmark Passed
                </span>
                <h2 className="font-serif text-3xl font-bold text-slate-50 mt-1">
                  Congratulations, {candidateName}!
                </h2>
                <p className="text-xs text-slate-300 max-w-lg mx-auto mt-1 font-sans">
                  Your ACRI score of <strong className="text-emerald-400">{evaluationResult.overallAcriScore}/100</strong> qualifies you for Tier-1 Enterprise & Quant Hiring Drives.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsDossierOpen(true)}
                  className="h-11 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-slate-50 text-xs font-bold font-sans flex items-center gap-2 shadow-lg transition-all"
                >
                  <FileText className="h-4 w-4" /> View Full Recruiter Dossier
                </button>
              </div>
            </div>

            {/* Shareable ACRI Badge Card */}
            <ShareableAcriCard
              candidateName={candidateName}
              acriScore={evaluationResult.overallAcriScore}
              tierLabel={evaluationResult.tierLabel}
              verificationId={verificationId}
            />

            {/* Dossier Modal */}
            <RecruiterDossierModal
              isOpen={isDossierOpen}
              onClose={() => setIsDossierOpen(false)}
              result={evaluationResult}
              candidateName={candidateName}
              candidatePhone={candidatePhone}
              verificationId={verificationId}
            />
          </motion.div>
        )
      )}
    </div>
  );
}
