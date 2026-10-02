import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Sparkles } from "lucide-react";
import { ArzonLogo } from "@/components/acri/ArzonLogo";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
  shareUrl: string;
}

export const CareerIdentityCard = forwardRef<HTMLDivElement, Props>(
  ({ result, candidateName, shareUrl }, ref) => {
    const roleName = result.archetype?.name ?? "Healthcare Specialist";
    const fitScore = Math.round(result.fitScore);

    const traits = Object.entries(result.traitScores ?? {})
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([t]) => {
        const labels: Record<string, string> = {
          detail: "Precision",
          logic: "Logic",
          writing: "Medical Writing",
          compliance: "Compliance",
          language: "Communication",
          data: "Data Analysis",
          empathy: "Patient Safety",
          sales: "Leadership",
          screen: "Deep Focus",
          tech: "Tech Aptitude",
        };
        return labels[t] ?? t;
      });

    return (
      <div
        ref={ref}
        id="career-identity-card"
        className="relative w-full max-w-[420px] aspect-[9/16] bg-[#070D1E] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-2 border-[#1557D6]/40 overflow-hidden font-sans select-none mx-auto"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 10%, rgba(21, 87, 214, 0.3), transparent 60%), radial-gradient(circle at 50% 90%, rgba(7, 26, 74, 0.8), transparent 70%)",
        }}
      >
        {/* Background Decorative Rings */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full border border-white/10" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <ArzonLogo variant="dark" size="sm" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
            CAREER IDENTITY
          </span>
        </div>

        {/* Center Identity */}
        <div className="relative z-10 my-auto text-center py-4">
          <div className="text-4xl sm:text-5xl mb-3" role="img" aria-label="Identity emoji">
            {result.archetype?.emoji ?? "🛡️"}
          </div>

          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block">
            {candidateName ? `${candidateName}'s Identity` : "DIAGNOSTIC ARCHETYPE"}
          </span>

          <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            {roleName}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#1557D6] bg-[#1557D6]/20 px-4 py-1.5 shadow-sm">
            <span className="font-serif text-xl sm:text-2xl font-bold text-white">
              {fitScore}%
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#EEF6FF]">
              Role Fit
            </span>
          </div>

          {/* Strongest Signals */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5">
            {traits.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-200"
              >
                <Sparkles className="h-2.5 w-2.5 text-[#1557D6]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Challenge & QR */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] block">
              WHICH ONE ARE YOU?
            </span>
            <span className="text-[11px] font-semibold text-white block mt-0.5">
              Take the 6-min diagnostic
            </span>
            <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
              arzoncareers.in/career-engine
            </span>
          </div>

          <div className="bg-white p-1.5 rounded-xl shrink-0 shadow-md">
            <QRCodeSVG value={shareUrl} size={54} level="M" />
          </div>
        </div>
      </div>
    );
  },
);
CareerIdentityCard.displayName = "CareerIdentityCard";
