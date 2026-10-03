import { useState } from "react";
import { AlertCircle, CheckCircle2, ArrowRight, Compass, ShieldAlert, Sparkles } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

const OPTIMIZATION_GOALS = [
  { id: "fastest_entry", label: "Fastest Entry into Healthcare Industry", focus: "Prioritizes immediate hiring volume (Medical Coding / PV Intake)" },
  { id: "clinical_data", label: "Clinical & Trial Data Focus", focus: "Prioritizes EDC platforms, query management & clinical trial data" },
  { id: "regulatory", label: "Regulatory & Global Compliance", focus: "Prioritizes dossier assembly, eCTD publishing & FDA submission" },
  { id: "technical_growth", label: "Highest Long-Term Technical Pay", focus: "Prioritizes SAS programming, CDISC SDTM/ADaM & Clinical AI" },
];

export function CompetencyGapCard({ result }: Props) {
  const [selectedGoal, setSelectedGoal] = useState("fastest_entry");
  const topPillarKey = result.archetype?.topPaths?.[0]?.slug ?? "pharmacovigilance";
  const pillarInfo = result.pillarResults?.[topPillarKey];

  const candidateGaps = pillarInfo?.gaps?.length
    ? pillarInfo.gaps
    : [
        "Structured MedDRA / ICD-10 Coding Guidelines",
        "Enterprise Database Navigation (Argus / Medidata Rave)",
        "Audit-Defensible Narrative & Discrepancy Writing",
      ];

  return (
    <section className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAF2] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
              GAP ENGINE & OPTIMIZER
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A4A] mt-1">
            Competency Gap & Career Optimization
          </h2>
        </div>
      </div>

      <p className="text-sm text-[#3F4A60] leading-relaxed">
        Your diagnostic results separate your inherent working style from your current technical domain exposure. The gap analysis below highlights the specific operational competencies required to transition from <strong className="text-[#071A4A]">Training Opportunity</strong> to <strong className="text-[#071A4A]">Job-Ready Status</strong>.
      </p>

      {/* Target Goal Selector */}
      <div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Compass className="h-4 w-4 text-[#1557D6]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#071A4A]">
            What are you trying to optimize for?
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {OPTIMIZATION_GOALS.map((goal) => {
            const active = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setSelectedGoal(goal.id)}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  active
                    ? "border-[#1557D6] bg-white ring-1 ring-[#1557D6] shadow-xs"
                    : "border-[#E4EAF2] bg-white hover:border-[#D0E1FD]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#071A4A]">{goal.label}</span>
                  {active && <span className="h-2 w-2 rounded-full bg-[#1557D6]" />}
                </div>
                <span className="text-[11px] text-[#69758A] mt-1 leading-snug">{goal.focus}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Competency Gap Comparison Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Verified Strengths */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
          <div className="flex items-center gap-2 text-emerald-900 font-bold mb-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span className="text-sm">Verified Candidate Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-emerald-950">
            {result.evidence?.topDrivers?.slice(0, 4).map((driver, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>{driver.prompt} (Proven stance: {driver.chosenLabel})</span>
              </li>
            )) ?? [
              <li key="s1" className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>High attention to medical documentation detail</span>
              </li>
            ]}
          </ul>
        </div>

        {/* Priority Competency Gaps */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
          <div className="flex items-center gap-2 text-amber-900 font-bold mb-3">
            <ShieldAlert className="h-4 w-4 text-amber-600" />
            <span className="text-sm">Priority Competency Gaps to Close</span>
          </div>
          <ul className="space-y-2 text-xs text-amber-950">
            {candidateGaps.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span className="font-semibold">{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
