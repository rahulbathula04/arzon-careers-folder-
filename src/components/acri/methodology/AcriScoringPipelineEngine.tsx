import { useState } from "react";
import {
  FileText,
  Sliders,
  Layers,
  Calculator,
  Award,
  ChevronRight,
  Info,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface PipelineStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: typeof FileText;
  formula: string;
  inputDescription: string;
  processingLogic: string;
  outputDescription: string;
  clinicalSignificance: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "step1",
    stepNumber: "01",
    title: "Raw Assessment Capture",
    subtitle: "40 calibrated multi-format items",
    badge: "INPUT LAYER",
    icon: FileText,
    formula: "X_i ∈ {1..5, Binary, Text} for i = 1..40",
    inputDescription:
      "20 clinical case vignettes (source document triage, MedDRA term matching), 12 situational judgment items (prioritization under pressure), and 8 regulatory knowledge items.",
    processingLogic:
      "Captures candidate selections along with response latency to detect rapid-guessing vs deliberate clinical analysis.",
    outputDescription:
      "Unprocessed response vector containing raw item scores across 13 core psychological and technical traits.",
    clinicalSignificance:
      "Prevents rote memorization by measuring decision-making in realistic, noisy clinical scenarios.",
  },
  {
    id: "step2",
    stepNumber: "02",
    title: "Trait Signal Normalization",
    subtitle: "Min-Max scaling & Bayesian priors",
    badge: "CALIBRATION LAYER",
    icon: Sliders,
    formula: "T_t = 100 × (R_t - R_min) / (R_max - R_min)",
    inputDescription: "Raw point tallies mapped to 13 discrete clinical traits (e.g., detail, compliance, logic, writing).",
    processingLogic:
      "Normalizes raw scores into standardized 0–100 trait signals. Applies item-difficulty adjustments based on empirical performance across 10,000+ candidate attempts.",
    outputDescription:
      "Standardized 13-dimensional trait vector with uniform variance and calibrated psychometric distribution.",
    clinicalSignificance:
      "Ensures that challenging items (e.g. subtle dechallenge logic) carry appropriate statistical weight relative to basic recall questions.",
  },
  {
    id: "step3",
    stepNumber: "03",
    title: "Competency Dimension Synthesis",
    subtitle: "Conserved 1.0 weight projection",
    badge: "PROJECTION LAYER",
    icon: Layers,
    formula: "D_j = ∑ (w_jt × T_t) / ∑ w_jt  where ∑ w_jt = 1.0",
    inputDescription: "13 normalized trait scores mapped through the authoritative TRAIT_TO_ACRI matrix.",
    processingLogic:
      "Maps traits into the 5 core occupational dimensions. Each trait's influence sums strictly to 1.0 across dimensions to prevent score inflation.",
    outputDescription:
      "Five independent 0–100 dimension scores: Operational Reasoning, Communication, Documentation, Workflow, Domain Knowledge.",
    clinicalSignificance:
      "Translates abstract psychometric traits into actionable operational competencies recognized by healthcare employers and CROs.",
  },
  {
    id: "step4",
    stepNumber: "04",
    title: "Composite Index & Hard Gates",
    subtitle: "Weighted aggregation + critical fail-safes",
    badge: "EVALUATION LAYER",
    icon: Calculator,
    formula: "ACRI = ∑ (W_j × D_j)  subject to Gate_k ≥ Threshold_k",
    inputDescription: "5 dimension scores evaluated alongside 3 critical hard-gate fail-safes (ICSR validity, 15-day timelines, triage).",
    processingLogic:
      "Computes the weighted aggregate index. Then validates performance against zero-tolerance regulatory gates. If a critical gate fails, readiness is restricted.",
    outputDescription:
      "Unified 0–100 ACRI Composite Score with individual gate pass/fail verification flags.",
    clinicalSignificance:
      "A candidate with high overall aptitude cannot pass if they fail basic patient safety or regulatory reporting deadlines.",
  },
  {
    id: "step5",
    stepNumber: "05",
    title: "Readiness Band & Credential",
    subtitle: "Occupational tier & cryptographic proof",
    badge: "OUTPUT LAYER",
    icon: Award,
    formula: "Band = f(ACRI, Gate_status) → {Industry Ready, Near Ready, Foundation}",
    inputDescription: "Composite score, gate status, and 9-competency radar profile.",
    processingLogic:
      "Assigns candidate to one of 3 occupational readiness bands. Candidates achieving ≥ 80% without gate failures receive the official ACRI Credential.",
    outputDescription:
      "Verifiable executive credential, 300-DPI archival certificate, cryptographic SHA-256 ledger digest, and candidate intelligence dossier.",
    clinicalSignificance:
      "Provides hiring managers with a definitive, audit-ready signal of candidate Day-1 operational capability.",
  },
];

export function AcriScoringPipelineEngine() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PIPELINE_STEPS[activeStepIndex];

  return (
    <div className="rounded-3xl border border-stone-200 bg-white card-light tone-light p-6 sm:p-8 shadow-xs">
      {/* ── Header: Title & Context ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F]">
              5-STAGE SCORING PIPELINE ARCHITECTURE
            </span>
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mt-1">
            From Raw Scenario Responses to Verified Credential
          </h3>
          <p className="font-sans text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            ACRI scoring is deterministic, criterion-referenced, and fully auditable. Click any stage below to inspect the mathematical transformations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl font-mono text-[11px] text-stone-600">
          <Info className="h-3.5 w-3.5 text-[#1B3F8B]" />
          <span>Criterion-Referenced Standard</span>
        </div>
      </div>

      {/* ── Interactive Horizontal Pipeline Track ── */}
      <div className="py-6 overflow-x-auto">
        <div className="flex items-stretch gap-2 sm:gap-3 min-w-[700px]">
          {PIPELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-1 text-left p-3.5 sm:p-4 rounded-2xl border transition-all relative ${
                  isActive
                    ? "bg-[#0B1325] text-white border-[#0B1325] shadow-md -translate-y-0.5"
                    : "bg-stone-50/70 hover:bg-stone-100/80 text-stone-800 border-stone-200"
                }`}
              >
                {/* Active Indicator Arrow */}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0B1325] rotate-45 pointer-events-none" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md ${
                      isActive
                        ? "bg-white/20 text-emerald-300"
                        : "bg-stone-200/80 text-stone-600"
                    }`}
                  >
                    STEP {step.stepNumber}
                  </span>
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-emerald-400" : "text-stone-400"
                    }`}
                  />
                </div>

                <div className="font-serif font-bold text-xs sm:text-sm line-clamp-1">
                  {step.title}
                </div>
                <div
                  className={`font-sans text-[11px] line-clamp-1 mt-0.5 ${
                    isActive ? "text-stone-300" : "text-stone-500"
                  }`}
                >
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Stage Deep Dive Inspection Panel ── */}
      <div className="mt-4 rounded-2xl border border-stone-200 bg-[#FAF9F6] p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
              {activeStep.stepNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-wider">
                  {activeStep.badge}
                </span>
                <span className="text-stone-300">·</span>
                <span className="font-sans text-xs text-stone-500">Stage {activeStepIndex + 1} of 5</span>
              </div>
              <h4 className="font-serif font-bold text-lg sm:text-xl text-stone-900">
                {activeStep.title}
              </h4>
            </div>
          </div>

          {/* Mathematical Formula Snippet */}
          <div className="px-3.5 py-2 rounded-xl bg-white tone-light border border-stone-200 font-mono text-[11px] text-stone-800 shadow-2xs self-start lg:self-auto">
            <span className="text-stone-400 mr-2">Formula:</span>
            <code className="text-[#1B3F8B] font-bold">{activeStep.formula}</code>
          </div>
        </div>

        {/* 4-Box Technical Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              INPUT SPECIFICATION
            </span>
            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              {activeStep.inputDescription}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              TRANSFORMATION LOGIC
            </span>
            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              {activeStep.processingLogic}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              OUTPUT ARTIFACT
            </span>
            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              {activeStep.outputDescription}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-1 border-l-4 border-l-[#005B4F]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#005B4F] block">
              CLINICAL &amp; OCCUPATIONAL RATIONALE
            </span>
            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              {activeStep.clinicalSignificance}
            </p>
          </div>
        </div>

        {/* Navigation Step Controls */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t border-stone-200 text-xs">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="px-3.5 py-1.5 rounded-lg border border-stone-300 bg-white tone-light hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-[11px] font-semibold text-stone-700 transition-colors"
          >
            ← Previous Stage
          </button>

          <span className="font-mono text-[11px] text-stone-500">
            Stage {activeStepIndex + 1} of {PIPELINE_STEPS.length}
          </span>

          <button
            onClick={() =>
              setActiveStepIndex((prev) =>
                Math.min(PIPELINE_STEPS.length - 1, prev + 1)
              )
            }
            disabled={activeStepIndex === PIPELINE_STEPS.length - 1}
            className="px-3.5 py-1.5 rounded-lg border border-stone-300 bg-white tone-light hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-[11px] font-semibold text-stone-700 transition-colors flex items-center gap-1"
          >
            <span>Next Stage</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
