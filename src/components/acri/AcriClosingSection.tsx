import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Clock, ShieldCheck, CheckCircle2, Award } from "lucide-react";

interface AcriClosingSectionProps {
  onOpenVideo?: () => void;
  onApplyClick?: () => void;
}

export function AcriClosingSection({ onOpenVideo, onApplyClick }: AcriClosingSectionProps) {
  const handleApply = (e: React.MouseEvent) => {
    if (onApplyClick) {
      e.preventDefault();
      onApplyClick();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#06382D] py-16 lg:py-24 text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>START YOUR CAREER INTELLIGENCE JOURNEY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to Find Out <br />
              <span className="text-emerald-300">Where You Stand?</span>
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-xl">
              Take the 25-minute assessment. Get your objective ACRI score. Build job-ready skills and get noticed by global healthcare employers.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/acri/pharmacovigilance-certification"
                search={{ apply: "true" }}
                onClick={handleApply}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white tone-light px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#06382D] hover:bg-emerald-50 transition-all shadow-lg active:scale-[0.99] cursor-pointer group"
              >
                <span>APPLY FOR AN ACRI INVITE →</span>
                <ArrowRight className="h-4 w-4 text-[#06382D] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/roles"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/50 px-5 py-4 text-sm font-semibold text-white hover:bg-emerald-900/60 transition-colors"
              >
                <span>EXPLORE PHARMACOVIGILANCE</span>
              </Link>

              <button
                type="button"
                onClick={onOpenVideo}
                className="inline-flex items-center justify-center gap-2 rounded-xl text-xs font-semibold text-emerald-200 hover:text-white transition-colors cursor-pointer px-3 py-2"
              >
                <Play className="h-3.5 w-3.5 fill-emerald-300 text-emerald-300" />
                <span>Watch Walkthrough</span>
              </button>
            </div>

            {/* Micro proof points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-emerald-200/80">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-400" /> 25 min duration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 100 Launch Invites (Cohort 01)
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-emerald-400" /> Instant verified scorecard
              </span>
            </div>
          </div>

          {/* Right Column: Visual with Student Photo & Handwritten Accent */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Handwritten Accent matching comp */}
            <div className="absolute -top-4 -left-4 sm:-left-8 z-30 flex items-center gap-1.5 transform -rotate-3">
              <span className="font-serif italic font-semibold text-xs sm:text-sm text-emerald-950 bg-emerald-200 px-3.5 py-1 rounded-full border border-emerald-300 shadow-md">
                Your Next Chapter Starts Here ↗
              </span>
            </div>

            <div className="relative w-full max-w-[340px] sm:max-w-[380px] overflow-hidden rounded-3xl border border-emerald-700/60 shadow-2xl">
              <img
                src="/images/pv-career-graduate.jpg"
                alt="Confident Indian pharmacy graduate in modern pharmaceutical research center"
                width={400}
                height={500}
                className="h-auto w-full object-cover aspect-4/5"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06382D] to-transparent pointer-events-none flex items-end p-5">
                <div className="text-white">
                  <p className="text-sm font-bold">Start your assessment today</p>
                  <p className="text-xs text-emerald-300 font-mono">Join 10,000+ evaluated healthcare graduates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-14 pt-8 border-t border-emerald-800/80 flex flex-wrap items-center justify-around gap-4 text-xs font-mono uppercase tracking-wider text-emerald-200/80">
          <span>10,000+ Students on Arzon</span>
          <span className="hidden sm:inline">·</span>
          <span>Launch Cohort 01 · 100 Invites</span>
          <span className="hidden sm:inline">·</span>
          <span>9 Evaluated Competencies</span>
          <span className="hidden sm:inline">·</span>
          <span>Verifiable ACRI Credential</span>
        </div>
      </div>
    </section>
  );
}
