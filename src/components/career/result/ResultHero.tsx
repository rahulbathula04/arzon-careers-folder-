import { type CSSProperties } from "react";
import { Share2, Award, RotateCcw, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
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
      : "Verified Aptitude Fit";

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

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-10 shadow-sm transition-all">
      {/* Background Subtle Institutional Grid Accent */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#EEF6FF]/60 blur-3xl" />

      {/* Top Header Row with Eyebrow and Retake Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4EAF2] pb-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1557D6]">
            <span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />
            <span>OFFICIAL CAREER IDENTITY REPORT</span>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-[#69758A]">·</span>
          <span className="text-xs font-medium text-[#69758A]">
            {confidence}
          </span>
        </div>

        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E4EAF2] bg-white tone-light px-3.5 py-1.5 text-xs font-semibold text-[#3F4A60] hover:bg-slate-50 hover:text-[#071A4A] transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-3 w-3 text-[#69758A]" />
          <span>Retake Diagnostic</span>
        </button>
      </div>

      {/* Main Identity Presentation */}
      <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
        {/* Score Radial Ring */}
        <div className="shrink-0 flex items-center gap-6 sm:gap-8">
          <div
            className="relative grid h-28 w-28 sm:h-32 sm:w-32 place-items-center rounded-full bg-[#FAFBFD] border-4 border-[#EEF6FF] shadow-inner"
            style={
              {
                background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#1557D6 ${fitScore}%, #E4EAF2 0)`,
              } as CSSProperties
            }
          >
            <div className="text-center">
              <span className="block font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#071A4A]">
                {fitScore}%
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1557D6]">
                Role Fit
              </span>
            </div>
          </div>
        </div>

        {/* Identity Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="Identity emoji">
              {result.archetype?.emoji ?? "🎯"}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#1557D6] font-bold">
              {candidateName ? `${candidateName}'s Primary Match` : "Your Archetype Match"}
            </span>
          </div>

          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A4A] leading-[1.15]">
            {roleName}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-[#3F4A60] font-sans leading-relaxed max-w-2xl">
            {result.archetype?.description ??
              "Your diagnostic signals reveal strong inherent alignment with this clinical career direction."}
          </p>

          {/* Top Capability Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#69758A] mr-1">Primary Signals:</span>
            {traits.map((trait) => (
              <span
                key={trait}
                className="inline-flex items-center gap-1 rounded-md border border-[#E4EAF2] bg-[#FAFBFD] px-2.5 py-1 text-xs font-medium text-[#071A4A]"
              >
                <Sparkles className="h-3 w-3 text-[#1557D6]" />
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Action Bar */}
      <div className="mt-8 pt-6 border-t border-[#E4EAF2] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="button"
          onClick={onShareClick}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] transition-all transform active:scale-95 w-full sm:w-auto"
        >
          <Share2 className="h-4 w-4" />
          <span>Share My Career Identity</span>
        </button>

        <button
          type="button"
          onClick={onScrollToCertificate}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-6 py-3.5 text-sm font-bold text-[#1557D6] hover:bg-[#E0EEFD] transition-all w-full sm:w-auto"
        >
          <Award className="h-4 w-4" />
          <span>Claim Official Certificate (Free)</span>
        </button>
      </div>
    </section>
  );
}
