import { Share2, Award, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
  onShareClick: () => void;
  onScrollToCertificate: () => void;
  onRetake: () => void;
}

export function ResultHero({
  result,
  candidateName,
  onShareClick,
  onScrollToCertificate,
  onRetake,
}: Props) {
  const roleName = result.archetype?.name ?? "Recommended Career Identity";
  const fitScore = Math.max(0, Math.min(100, Math.round(result.fitScore)));
  const confidence = result.confidenceBand === "highly_recommended"
    ? "High Confidence Alignment"
    : result.confidenceBand === "two_strong"
      ? "Multi-Domain Fit"
      : "Diagnostic Fit Estimate";

  // Derive top 3 trait signals
  const traits = Object.entries(result.traitScores ?? {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([t]) => {
      const labels: Record<string, string> = {
        detail: "Precision Detail",
        logic: "Analytical Logic",
        writing: "Scientific Writing",
        compliance: "Regulatory Rigor",
        language: "Communication",
        data: "Data Interpretation",
        empathy: "Patient Safety",
        sales: "Systems Influence",
        screen: "Deep Focus",
        tech: "Technical Aptitude",
      };
      return labels[t] ?? t;
    });

  // Calculate SVG stroke parameters for 120x120 viewBox, r=48 (Circumference ~ 301.6)
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fitScore / 100) * circumference;

  return (
    <section className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white tone-light card-light p-4 sm:p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.06),0_28px_64px_-12px_rgba(7,26,74,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] transition-all">
      {/* Background Subtle Institutional Ambient Glow Accent */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-blue-100/40 via-indigo-50/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-gradient-to-tr from-sky-50/40 via-emerald-50/20 to-transparent blur-3xl" />

      {/* Top Header Row with Eyebrow and Retake Action */}
      <div className="relative flex items-center justify-between gap-2 border-b border-slate-100/90 pb-3.5 sm:pb-5">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200/80 bg-blue-50/70 px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-blue-700 shadow-2xs">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-blue-600" />
            </span>
            <span>CAREER-FIT REPORT</span>
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-slate-600 shadow-2xs">
            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600" />
            <span>{confidence}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onRetake}
          className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-xs px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-2xs hover:shadow-xs active:scale-[0.97] transition-all cursor-pointer shrink-0"
        >
          <RotateCcw className="h-3 w-3 text-slate-400 group-hover:text-slate-600 group-hover:-rotate-45 transition-transform duration-300" />
          <span>Retake</span>
        </button>
      </div>

      {/* Main Identity Presentation */}
      <div className="relative mt-4 sm:mt-8 flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-8 lg:gap-10">
        {/* Apple-grade Score Radial Ring */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="relative grid h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 place-items-center rounded-full p-2 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 border border-slate-200/80 shadow-[0_4px_20px_rgba(7,26,74,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.02)]">
            <svg className="absolute inset-0 h-full w-full -rotate-90 p-1" viewBox="0 0 120 120">
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#E8EDF5"
                strokeWidth="8"
              />
              {/* Active Multi-Stop Gradient Arc with Glow */}
              <defs>
                <linearGradient id="scoreRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.25" />
                </filter>
              </defs>
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="url(#scoreRingGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                filter="url(#ringGlow)"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Centered Typography: Balanced Vertical Hierarchy without Any Clipping */}
            <div className="relative flex flex-col items-center justify-center text-center z-10 select-none">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-blue-600/90 leading-none">
                Role Fit
              </span>
              <span className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#081F38] leading-none my-0.5 sm:my-1">
                {fitScore}%
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-[0.12em] text-slate-400 leading-none">
                {fitScore >= 80 ? "Exemplary" : "Validated"}
              </span>
            </div>
          </div>
        </div>

        {/* Identity Details */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          {/* Candidate Match Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200/80 bg-slate-100/70 backdrop-blur-xs px-2.5 sm:px-3 py-0.5 sm:py-1 shadow-2xs">
            <span className="text-sm sm:text-base leading-none" role="img" aria-label="Identity emoji">
              {result.archetype?.emoji ?? "🎯"}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-slate-700">
              {candidateName ? `${candidateName}'s Primary Match` : "Primary Archetype Match"}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
          </div>

          <h1 className="mt-2 sm:mt-3 font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#081F38] leading-[1.12]">
            {roleName}
          </h1>

          {result.archetype?.tagline && (
            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm md:text-base font-serif italic text-blue-800/90 font-medium tracking-tight">
              &ldquo;{result.archetype.tagline}&rdquo;
            </p>
          )}

          <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 font-sans leading-relaxed max-w-2xl font-normal">
            {result.archetype?.description ??
              "Your diagnostic signals reveal strong inherent alignment with this clinical career direction."}
          </p>

          {/* Primary Signals Chips */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.12em] text-slate-400 mr-1">
              Signals:
            </span>
            {traits.map((trait) => (
              <span
                key={trait}
                className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-blue-300 hover:bg-blue-50/40 hover:text-blue-900 transition-all cursor-default"
              >
                <Sparkles className="h-3 w-3 text-blue-600 shrink-0" />
                <span>{trait}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Action Bar */}
      <div className="relative mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100/90 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
        <button
          type="button"
          onClick={onShareClick}
          className="group relative inline-flex min-h-11 sm:min-h-12 items-center justify-center gap-2 rounded-full bg-[#081F38] px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_6px_20px_-2px_rgba(8,31,56,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#0D2E54] hover:shadow-[0_8px_24px_-2px_rgba(8,31,56,0.4)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto cursor-pointer"
        >
          <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span>Share My Career Identity</span>
        </button>

        <button
          type="button"
          onClick={onScrollToCertificate}
          className="group inline-flex min-h-11 sm:min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] hover:bg-[#E0EEFD] hover:border-[#B5D3FB] px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold !text-[#1557D6] shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-xs transition-all duration-200 active:scale-[0.98] w-full sm:w-auto cursor-pointer"
        >
          <Award className="h-4 w-4 !text-[#1557D6] transition-transform group-hover:scale-110" />
          <span className="!text-[#1557D6]">View Assessment Record</span>
        </button>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 ml-auto select-none">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span className="tracking-wide">ACRI VERIFIED DOSSIER</span>
        </div>
      </div>
    </section>
  );
}
