import { useState } from "react";
import { Compass, ArrowRight, CheckCircle2, Sparkles, RefreshCw } from "lucide-react";
import { track } from "@/lib/track";

interface CareerFitResult {
  roleTitle: string;
  matchReason: string;
  recommendedFocus: string;
  dayToDaySnippet: string;
}

const BACKGROUND_OPTIONS = [
  "B.Pharm",
  "M.Pharm",
  "Pharm.D",
  "B.Sc / Biotechnology",
  "Other Healthcare",
];

const STAGE_OPTIONS = [
  "Current Student",
  "0 – 1 Year Experience",
  "1 – 3 Years Experience",
  "3+ Years Experience",
];

const INTEREST_OPTIONS = [
  "Drug Safety (PV)",
  "Clinical Research (CR)",
  "Medical Coding",
  "Healthcare Operations",
  "Not Sure Yet",
];

interface Props {
  onSelectRole: (role: string, background: string) => void;
}

export function InteractiveCareerFitTool({ onSelectRole }: Props) {
  const [background, setBackground] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [interest, setInterest] = useState<string>("");

  const calculateRecommendation = (): CareerFitResult => {
    if (interest === "Drug Safety (PV)" || (background.includes("Pharm") && interest === "Not Sure Yet")) {
      return {
        roleTitle: "Pharmacovigilance (Drug Safety Associate)",
        matchReason:
          "Your pharmacology knowledge aligns directly with adverse drug event triage, ICH-E2A seriousness criteria, and ICSR regulatory reporting.",
        recommendedFocus: "Oracle Argus Safety workflows, MedDRA 27.0 coding, and expedited 15-day reporting.",
        dayToDaySnippet: "Evaluating post-marketing adverse reaction reports, verifying clinical validity, and authoring narrative summaries.",
      };
    }

    if (interest === "Clinical Research (CR)" || background.includes("Biotechnology")) {
      return {
        roleTitle: "Clinical Research & Data Coordination",
        matchReason:
          "Your life sciences grounding fits trial protocol compliance, patient safety oversight, and electronic data capture (EDC).",
        recommendedFocus: "GCP (Good Clinical Practice), clinical trial phases, and study master file auditing.",
        dayToDaySnippet: "Monitoring clinical trial documentation, site coordination, and regulatory investigator binders.",
      };
    }

    if (interest === "Medical Coding") {
      return {
        roleTitle: "Medical Coding & Revenue Operations",
        matchReason:
          "Fits individuals interested in structured medical terminology, clinical anatomy mapping, and healthcare billing protocols.",
        recommendedFocus: "ICD-10-CM, CPT, and HCPCS classification systems.",
        dayToDaySnippet: "Reviewing doctor charts and assigning standardized alphanumeric codes for international healthcare reimbursement.",
      };
    }

    return {
      roleTitle: "Healthcare Clinical Operations & Compliance",
      matchReason:
        "A versatile entry pathway connecting healthcare graduates with corporate compliance, medical documentation, and quality management.",
      recommendedFocus: "Healthcare data management, regulatory fundamentals, and clinical quality oversight.",
      dayToDaySnippet: "Coordinating cross-functional healthcare deliverables, audit readiness, and standard operating procedures.",
    };
  };

  const isComplete = Boolean(background && stage && interest);
  const result = isComplete ? calculateRecommendation() : null;

  const handleReset = () => {
    setBackground("");
    setStage("");
    setInterest("");
  };

  const handleAction = () => {
    if (!result) return;
    track("career_tool_completed", {
      background,
      stage,
      interest,
      recommended_role: result.roleTitle,
    });
    onSelectRole(result.roleTitle, background);
  };

  return (
    <div className="w-full rounded-2xl border border-stone-200 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xl">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1B3F8B] text-[11px] font-mono font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Career Exploration Tool
            </span>
            <span className="text-[11px] text-stone-400 font-sans italic">
              Directional guidance · Not psychometric testing
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-sans mt-2">
            Not Sure Which Healthcare Career Fits You?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
            Tap 3 quick details to see where your background creates the strongest industry leverage.
          </p>
        </div>

        {isComplete && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-mono transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Choices
          </button>
        )}
      </div>

      {/* 3-Step Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Step 1: Background */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center text-[10px]">1</span>
            Your Background
          </label>
          <div className="flex flex-col gap-2">
            {BACKGROUND_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setBackground(opt)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-sans transition-all cursor-pointer flex items-center justify-between ${
                  background === opt
                    ? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"
                    : "bg-stone-50/80 hover:bg-stone-100 text-stone-800 border-stone-200"
                }`}
              >
                <span>{opt}</span>
                {background === opt && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Stage */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center text-[10px]">2</span>
            Current Stage
          </label>
          <div className="flex flex-col gap-2">
            {STAGE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setStage(opt)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-sans transition-all cursor-pointer flex items-center justify-between ${
                  stage === opt
                    ? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"
                    : "bg-stone-50/80 hover:bg-stone-100 text-stone-800 border-stone-200"
                }`}
              >
                <span>{opt}</span>
                {stage === opt && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Interest */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center text-[10px]">3</span>
            Area of Interest
          </label>
          <div className="flex flex-col gap-2">
            {INTEREST_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setInterest(opt)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-sans transition-all cursor-pointer flex items-center justify-between ${
                  interest === opt
                    ? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"
                    : "bg-stone-50/80 hover:bg-stone-100 text-stone-800 border-stone-200"
                }`}
              >
                <span>{opt}</span>
                {interest === opt && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card Output */}
      {result ? (
        <div className="mt-8 rounded-xl bg-gradient-to-br from-blue-50/60 via-slate-50/80 to-emerald-50/40 border border-blue-200/70 p-5 sm:p-6 transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1B3F8B] uppercase">
            <Sparkles className="w-4 h-4 text-[#1B3F8B]" />
            Directional Exploration Match
          </div>

          <h4 className="text-lg sm:text-xl font-bold text-stone-900 font-sans mt-2">
            Based on your background, <span className="text-[#1B3F8B]">{result.roleTitle}</span> is worth exploring.
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs font-sans text-stone-700">
            <div className="bg-white/90 p-3 rounded-lg border border-stone-200/80">
              <span className="font-bold text-stone-900 block mb-1">Why this fits:</span>
              <p>{result.matchReason}</p>
            </div>
            <div className="bg-white/90 p-3 rounded-lg border border-stone-200/80">
              <span className="font-bold text-stone-900 block mb-1">Key skills needed:</span>
              <p>{result.recommendedFocus}</p>
            </div>
            <div className="bg-white/90 p-3 rounded-lg border border-stone-200/80">
              <span className="font-bold text-stone-900 block mb-1">Day-to-day work:</span>
              <p>{result.dayToDaySnippet}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-blue-200/50">
            <p className="text-xs text-stone-600 font-sans">
              Join the free live workshop to understand this career path and its exact technical requirements in detail.
            </p>
            <button
              type="button"
              onClick={handleAction}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group shrink-0"
            >
              <span>Reserve My Free Seat</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center py-4 bg-stone-50 rounded-xl border border-dashed border-stone-200 text-xs text-stone-500 font-sans">
          Select your background, stage, and interest above to generate your directional career match.
        </div>
      )}
    </div>
  );
}
