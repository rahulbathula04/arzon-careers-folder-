import { Activity, ShieldCheck, Search, FileText, Brain, Clock, Zap, CheckCircle2 } from "lucide-react";
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
      icon: ShieldCheck,
    },
    {
      key: "detail",
      label: "Precision & Discrepancy Detection",
      description: "Ability to catch micro-omissions in medical narratives and EDC tables",
      score: getTraitPct("detail", 84),
      icon: Search,
    },
    {
      key: "writing",
      label: "Technical & Medical Communication",
      description: "Concise, medically sound narrative drafting without subjective bias",
      score: getTraitPct("writing", 79),
      icon: FileText,
    },
    {
      key: "logic",
      label: "Causal Reasoning & Analysis",
      description: "Distinguishing correlation from drug-event causality using WHO/Naranjo logic",
      score: getTraitPct("logic", 82),
      icon: Brain,
    },
    {
      key: "screen",
      label: "Cognitive Focus & Screen Stamina",
      description: "Sustained accuracy during intensive workstation data verification",
      score: getTraitPct("screen", 76),
      icon: Clock,
    },
    {
      key: "pressure",
      label: "Critical Timeline Management",
      description: "Meeting expedited 7-day and 15-day regulatory submission deadlines",
      score: getTraitPct("pressure", 78),
      icon: Zap,
    },
  ];

  const averageAptitude = Math.round(
    capabilities.reduce((sum, c) => sum + c.score, 0) / capabilities.length,
  );

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-6 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.06),inset_0_1px_0_rgba(255,255,255,0.95)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 shadow-2xs flex items-center justify-center text-blue-600 shrink-0">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-blue-700 mb-1 shadow-2xs">
              <span>ROLE READINESS MATRIX · 6 VECTORS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#081F38]">
              Your Capability Profile
            </h2>
          </div>
        </div>

        {/* Overall Aptitude Stat Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-slate-50 border border-slate-200/90 px-4 py-2.5 rounded-2xl shadow-2xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <div>
            <p className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
              Composite Aptitude
            </p>
            <p className="text-base font-bold font-mono text-[#081F38]">
              {averageAptitude}% Overall Benchmark
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-2xl font-normal font-sans">
        These capability vectors reflect your natural decision-making style, attention distribution, and risk orientation compared against clinical benchmark baselines across 42 diagnostic responses.
      </p>

      {/* Progress Bars Grid */}
      <div className="mt-7 space-y-4 sm:space-y-5">
        {capabilities.map((cap) => {
          const isDistinction = cap.score >= 85;
          const isProficient = cap.score >= 75;
          const Icon = cap.icon;

          return (
            <div
              key={cap.key}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/40 hover:border-slate-300 transition-all shadow-2xs group"
            >
              <div className="flex items-start justify-between gap-4 mb-2.5">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-[#081F38] font-sans group-hover:text-blue-700 transition-colors">
                      {cap.label}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-sans leading-normal">
                      {cap.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-base font-bold text-[#081F38]">
                    {cap.score}%
                  </span>
                  <span
                    className={`block text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mt-0.5 text-center ${
                      isDistinction
                        ? "text-emerald-800 bg-emerald-50 border border-emerald-200/80"
                        : isProficient
                          ? "text-blue-700 bg-blue-50 border border-blue-200/80"
                          : "text-amber-800 bg-amber-50 border border-amber-200/80"
                    }`}
                  >
                    {isDistinction ? "Distinction" : isProficient ? "Proficient" : "Foundational"}
                  </span>
                </div>
              </div>

              {/* High-Definition Track Bar */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-1000 ease-out shadow-xs"
                  style={{ width: `${cap.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
