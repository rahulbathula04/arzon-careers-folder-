import { useState } from "react";
import { CheckCircle2, Compass, ShieldAlert, Sparkles, ArrowRight, Target } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

const OPTIMIZATION_GOALS = [
  {
    id: "fastest_entry",
    label: "Fastest Entry into Healthcare Industry",
    focus: "Prioritizes immediate hiring volume (Medical Coding / PV Intake)",
    timeline: "30–60 Days",
  },
  {
    id: "clinical_data",
    label: "Clinical & Trial Data Focus",
    focus: "Prioritizes EDC platforms, query management & clinical trial data",
    timeline: "60–90 Days",
  },
  {
    id: "regulatory",
    label: "Regulatory & Global Compliance",
    focus: "Prioritizes dossier assembly, eCTD publishing & FDA submission",
    timeline: "90–120 Days",
  },
  {
    id: "technical_growth",
    label: "Highest Long-Term Technical Pay",
    focus: "Prioritizes SAS programming, CDISC SDTM/ADaM & Clinical AI",
    timeline: "90–120 Days",
  },
];

export function CompetencyGapCard({ result }: Props) {
  const [selectedGoal, setSelectedGoal] = useState("fastest_entry");
  const topPillarKey = result.archetype?.topPaths?.[0]?.slug ?? "pharmacovigilance";
  const pillarInfo = result.pillarResults?.[topPillarKey];

  const candidateGaps = pillarInfo?.gaps?.length
    ? pillarInfo.gaps
    : [
        "Standardized Medical Terminology & Clinical Coding Guidelines",
        "Enterprise Database Navigation (Safety & EDC Platforms)",
        "Audit-Defensible Narrative & Discrepancy Writing",
      ];

  // Derive human-readable strengths
  const verifiedStrengths = result.evidence?.topDrivers?.slice(0, 3).map((driver) => {
    const promptText = typeof driver === "object" && driver?.prompt ? driver.prompt : "";
    const titleText = (typeof driver === "object" && (driver?.chosenLabel || driver?.chosenValue))
      ? (driver.chosenLabel || driver.chosenValue)
      : (typeof driver === "string" ? driver : "Analytical Rigor");
    return {
      title: titleText,
      context: promptText.length > 70 ? `${promptText.slice(0, 70)}...` : (promptText || "Demonstrated alignment in diagnostic evaluation."),
    };
  }) ?? [
    { title: "Protocol Interpretation", context: "Evaluates clinical trial scenarios with rigorous compliance." },
    { title: "Data Precision", context: "Demonstrated sensitivity to medical discrepancies and data integrity." },
    { title: "Defensible Reasoning", context: "Prefers documented, evidence-backed clinical conclusions." },
  ];

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-4 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] space-y-6 w-full max-w-full min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/90 pb-5 sm:pb-6 w-full min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-blue-700 shadow-2xs">
              <Compass className="h-3.5 w-3.5 text-blue-600" />
              <span>GAP ENGINE &amp; OPTIMIZER</span>
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#081F38] mt-2">
            Competency Gap &amp; Career Optimization
          </h2>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed font-normal max-w-3xl font-sans">
        Your diagnostic results separate your inherent working style from your current technical domain exposure. The gap analysis below highlights the specific operational competencies required to transition from <strong className="text-[#081F38] font-semibold">Training Opportunity</strong> to <strong className="text-[#081F38] font-semibold">Job-Ready Status</strong>.
      </p>

      {/* Target Goal Selector */}
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-[#FAFBFD] p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.12em] text-[#081F38]">
              What are you trying to optimize for?
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Select to re-calibrate priority sequence</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {OPTIMIZATION_GOALS.map((goal) => {
            const active = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setSelectedGoal(goal.id)}
                className={`group flex flex-col justify-between text-left p-4.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  active
                    ? "border-blue-500/90 bg-gradient-to-br from-blue-50/80 via-indigo-50/30 to-white ring-1 ring-blue-500/20 shadow-[0_2px_12px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,1)]"
                    : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-2xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold font-sans ${active ? "text-blue-700" : "text-[#081F38]"}`}>
                      {goal.label}
                    </span>
                    <span
                      className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        active
                          ? "border-blue-600 bg-blue-600"
                          : "border-slate-300 bg-white group-hover:border-slate-400"
                      }`}
                    >
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-sans">{goal.focus}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100/90 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase tracking-wider">Target Pathway Velocity:</span>
                  <span className="font-bold text-slate-700">{goal.timeline}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Competency Gap Comparison Grid */}
      <div className="grid gap-4.5 md:grid-cols-2">
        {/* Verified Strengths */}
        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-emerald-50/20 to-white/70 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-900 font-bold mb-4">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
            <span className="text-sm sm:text-base font-serif tracking-tight">Verified Candidate Strengths</span>
          </div>
          <ul className="space-y-3 text-xs font-sans">
            {verifiedStrengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0 shadow-xs" />
                <div>
                  <strong className="text-emerald-950 font-semibold">{str.title}</strong>
                  <p className="text-emerald-900/80 text-[11px] mt-0.5">&ldquo;{str.context}&rdquo;</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Priority Competency Gaps */}
        <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-amber-50/20 to-white/70 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold mb-4">
            <ShieldAlert className="h-4.5 w-4.5 text-amber-600 shrink-0" />
            <span className="text-sm sm:text-base font-serif tracking-tight">Priority Competency Gaps to Close</span>
          </div>
          <ul className="space-y-3 text-xs font-sans">
            {candidateGaps.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0 shadow-xs" />
                <div>
                  <strong className="text-amber-950 font-semibold">{gap}</strong>
                  <p className="text-amber-900/80 text-[11px] mt-0.5">Required for day-1 unassisted production readiness</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
