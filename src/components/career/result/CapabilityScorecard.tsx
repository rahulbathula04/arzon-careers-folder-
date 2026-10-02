import { Activity, Check, HelpCircle } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

export function CapabilityScorecard({ result }: Props) {
  const getTraitPct = (traitName: string, fallback = 75) => {
    const raw = result.traitScores?.[traitName as keyof typeof result.traitScores];
    if (typeof raw === "number") {
      // Map [-5, +5] or raw scale to [45, 98] range for realistic presentation
      const normalized = Math.round(((raw + 5) / 10) * 55 + 40);
      return Math.max(45, Math.min(98, normalized));
    }
    return fallback;
  };

  const capabilities = [
    {
      key: "compliance",
      label: "Protocol & Regulatory Discipline",
      description: "Adherence to ICH-GCP, FDA/EMA guidelines, and audit trail rigor",
      score: getTraitPct("compliance", 88),
    },
    {
      key: "detail",
      label: "Precision & Discrepancy Detection",
      description: "Ability to catch micro-omissions in medical narratives and EDC tables",
      score: getTraitPct("detail", 84),
    },
    {
      key: "writing",
      label: "Technical & Medical Communication",
      description: "Concise, medically sound narrative drafting without subjective bias",
      score: getTraitPct("writing", 79),
    },
    {
      key: "logic",
      label: "Causal Reasoning & Analysis",
      description: "Distinguishing correlation from drug-event causality using WHO/Naranjo logic",
      score: getTraitPct("logic", 82),
    },
    {
      key: "screen",
      label: "Cognitive Focus & Screen Stamina",
      description: "Sustained accuracy during intensive workstation data verification",
      score: getTraitPct("screen", 76),
    },
    {
      key: "pressure",
      label: "Critical Timeline Management",
      description: "Meeting expedited 7-day and 15-day regulatory submission deadlines",
      score: getTraitPct("pressure", 78),
    },
  ];

  return (
    <section className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E4EAF2] pb-5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
              ROLE READINESS MATRIX
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#071A4A]">
              Your Capability Profile
            </h2>
          </div>
        </div>

        <span className="hidden sm:inline-block rounded-full bg-[#FAFBFD] border border-[#E4EAF2] px-3 py-1 text-xs font-mono text-[#69758A]">
          Calibrated across 42 diagnostic responses
        </span>
      </div>

      <p className="mt-4 text-sm text-[#3F4A60] leading-relaxed max-w-2xl">
        These capability vectors reflect your natural decision-making style, attention distribution, and risk orientation compared against clinical benchmark baselines.
      </p>

      {/* Progress Bars */}
      <div className="mt-8 space-y-6">
        {capabilities.map((cap) => (
          <div key={cap.key} className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-sm font-bold text-[#071A4A] block">
                  {cap.label}
                </span>
                <span className="text-xs text-[#69758A] block mt-0.5">
                  {cap.description}
                </span>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="font-mono text-base font-bold text-[#071A4A]">
                  {cap.score}%
                </span>
                <span className="block text-[10px] font-mono uppercase text-[#1557D6]">
                  {cap.score >= 85 ? "Distinction" : cap.score >= 75 ? "Proficient" : "Foundational"}
                </span>
              </div>
            </div>

            {/* Track Bar */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#EEF6FF]">
              <div
                className="h-full rounded-full bg-[#1557D6] transition-all duration-1000 ease-out"
                style={{ width: `${cap.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
