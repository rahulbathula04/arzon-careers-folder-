import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Layers,
  Brain,
  ShieldCheck,
  FileText,
  RotateCcw,
  ArrowRight,
  Download,
  Share2,
} from "lucide-react";
import {
  evaluateCandidatePortfolio,
  type CandidateSubmission,
  type AiAssessmentResult,
  type AcriDimensionKey,
} from "@/lib/aiAssessmentEngine";

interface CandidateAiScorecardProps {
  initialSubmission?: CandidateSubmission;
  showControls?: boolean;
  className?: string;
}

export function CandidateAiScorecard({
  initialSubmission = {
    candidateName: "Rahul Bathula",
    qualification: "B.Pharm / M.Pharm (Life Sciences)",
    targetTrack: "Pharmacovigilance (Drug Safety)",
    pvScore: 92,
    codingScore: 88,
    cdmScore: 90,
    sasScore: 85,
    regWritingScore: 86,
  },
  showControls = true,
  className = "",
}: CandidateAiScorecardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [submission, setSubmission] = useState<CandidateSubmission>(initialSubmission);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<"scorecard" | "simulator">("scorecard");

  const result: AiAssessmentResult = evaluateCandidatePortfolio(submission);

  const dimensionIcons: Record<AcriDimensionKey, typeof FileCode2> = {
    pharmacovigilanceArgus: FileText,
    medicalCodingCpc: FileCode2,
    clinicalDataManagement: Layers,
    clinicalSasCdisc: Brain,
    regulatoryMedicalWriting: ShieldCheck,
  };

  const handleSimulateScan = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className={`rounded-3xl border border-slate-800 bg-[#0B132B] text-slate-100 p-6 sm:p-8 shadow-2xl overflow-hidden ${className}`}>
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <Sparkles className="h-5 w-5 motion-safe:animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Automated AI Portfolio & ACRI Scorecard
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Evaluated on {new Date(result.evaluatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        {showControls && (
          <div className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 p-1">
            <button
              onClick={() => setActiveTab("scorecard")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeTab === "scorecard"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Scorecard View
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeTab === "simulator"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Interactive Simulator
            </button>
          </div>
        )}
      </div>

      {/* Main Content View */}
      {activeTab === "scorecard" ? (
        <div className="mt-6 space-y-8">
          {/* Main Score Hero Card */}
          <div className="grid gap-6 md:grid-cols-12 items-center rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            {/* Score Radial Indicator */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-slate-800">
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="stroke-slate-800 fill-none"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="fill-none"
                    stroke={result.tierColor}
                    strokeWidth="10"
                    strokeDasharray="314.159"
                    initial={{ strokeDashoffset: 314.159 }}
                    animate={{
                      strokeDashoffset: 314.159 - (314.159 * result.overallAcriScore) / 100,
                    }}
                    transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-4xl font-bold text-white tracking-tight">
                    {result.overallAcriScore}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    / 100 ACRI
                  </span>
                </div>
              </div>

              {/* Tier Badge */}
              <div
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold font-mono tracking-wide"
                style={{
                  color: result.tierColor,
                  borderColor: `${result.tierColor}40`,
                  backgroundColor: `${result.tierColor}15`,
                }}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {result.tierLabel}
              </div>
            </div>

            {/* Summary & Highlights */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                  Automated AI Evaluation Summary
                </p>
                <p className="mt-1 text-sm text-slate-200 leading-relaxed font-sans">
                  {result.automatedSummary}
                </p>
              </div>

              {/* Strengths & Improvements List */}
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Key Strengths
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 font-sans">
                    {result.topStrengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        • {str}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> Improvement Flags
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 font-sans">
                    {result.improvementFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        • {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Core Dimensions Breakdown */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              5 Enterprise Dimension Scores
            </h4>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(Object.keys(result.dimensions) as AcriDimensionKey[]).map((dimKey) => {
                const dim = result.dimensions[dimKey];
                const IconComponent = dimensionIcons[dimKey];

                return (
                  <div
                    key={dimKey}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-700 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold font-sans text-slate-200 truncate">
                          {dim.label}
                        </span>
                      </div>
                      <span className="font-mono text-sm font-bold text-white">
                        {dim.score}/100
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${dim.score}%` }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-normal font-sans">
                      {dim.feedback}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateScan}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-bold font-sans transition-all disabled:opacity-50"
              >
                <Sparkles className={`h-4 w-4 ${isSimulating ? "motion-safe:animate-spin" : ""}`} />
                {isSimulating ? "Re-evaluating AI Portfolio..." : "Run AI Portfolio Re-Scan"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert("Verification Scorecard exported to PDF successfully.")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 text-xs font-semibold transition-all"
              >
                <Download className="h-3.5 w-3.5 text-blue-400" /> Export PDF
              </button>
              <button
                onClick={() => alert("Shareable Partner Link copied to clipboard.")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 text-xs font-semibold transition-all"
              >
                <Share2 className="h-3.5 w-3.5 text-emerald-400" /> Share Verification
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Interactive Simulator View */
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs text-blue-300">
            💡 Adjust candidate portfolio metrics below to observe real-time ACRI scoring, dimension breakdowns, and tier placement shifts calibrated for Healthcare GCCs.
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Input Sliders */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                Healthcare Domain Competencies
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-mono mb-1 text-slate-300">
                    <span>Pharmacovigilance (Oracle Argus)</span>
                    <span className="font-bold text-blue-400">{submission.pvScore ?? 85}/100</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={submission.pvScore ?? 85}
                    onChange={(e) => setSubmission({ ...submission, pvScore: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono mb-1 text-slate-300">
                    <span>Medical Coding (CPC & ICD-10)</span>
                    <span className="font-bold text-blue-400">{submission.codingScore ?? 80}/100</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={submission.codingScore ?? 80}
                    onChange={(e) => setSubmission({ ...submission, codingScore: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono mb-1 text-slate-300">
                    <span>Clinical Data Management (RAVE)</span>
                    <span className="font-bold text-blue-400">{submission.cdmScore ?? 80}/100</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={submission.cdmScore ?? 80}
                    onChange={(e) => setSubmission({ ...submission, cdmScore: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono mb-1 text-slate-300">
                    <span>Clinical SAS & CDISC SDTM</span>
                    <span className="font-bold text-blue-400">{submission.sasScore ?? 75}/100</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={submission.sasScore ?? 75}
                    onChange={(e) => setSubmission({ ...submission, sasScore: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono mb-1 text-slate-300">
                    <span>Regulatory Affairs & Medical Writing</span>
                    <span className="font-bold text-blue-400">{submission.regWritingScore ?? 80}/100</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={submission.regWritingScore ?? 80}
                    onChange={(e) => setSubmission({ ...submission, regWritingScore: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={() => setSubmission(initialSubmission)}
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Parameters
              </button>
            </div>

            {/* Live Result Output */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Calculated Result
                </span>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-serif text-5xl font-bold text-white">
                    {result.overallAcriScore}
                  </span>
                  <span className="font-mono text-xs text-slate-400">/ 100 ACRI</span>
                </div>

                <div className="mt-3">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono"
                    style={{
                      color: result.tierColor,
                      backgroundColor: `${result.tierColor}20`,
                      borderColor: `${result.tierColor}40`,
                    }}
                  >
                    {result.tierLabel}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("scorecard")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-2 text-xs font-bold font-sans transition-all"
              >
                View Complete Score Breakdown <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
