import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

interface AcriClosingSectionProps {
  onOpenVideo?: () => void;
}

export function AcriClosingSection({ onOpenVideo }: AcriClosingSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#07241A] py-16 lg:py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Find Out Where You Stand?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-xl">
              Take the AI assessment now and get your personalized ACRI score — free.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/career-engine/test"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white tone-light px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1325] hover:bg-emerald-50 transition-colors shadow-lg active:scale-[0.99]"
              >
                <span>Take Free Assessment</span>
                <ArrowRight className="h-4 w-4 text-emerald-700" />
              </Link>

              <button
                type="button"
                onClick={onOpenVideo}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-600/60 bg-emerald-950/40 px-5 py-3.5 text-xs font-bold text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Frosted Metric Boxes */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/40 p-4 sm:p-5 text-center backdrop-blur-xs">
              <div className="font-sans text-lg sm:text-xl font-extrabold text-white">10 Minutes</div>
              <div className="mt-1 text-[11px] text-emerald-200/70 font-medium">To get started</div>
            </div>
            <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/40 p-4 sm:p-5 text-center backdrop-blur-xs">
              <div className="font-sans text-lg sm:text-xl font-extrabold text-white">100% Free</div>
              <div className="mt-1 text-[11px] text-emerald-200/70 font-medium">No hidden charges</div>
            </div>
            <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/40 p-4 sm:p-5 text-center backdrop-blur-xs">
              <div className="font-sans text-lg sm:text-xl font-extrabold text-white">30 Minutes</div>
              <div className="mt-1 text-[11px] text-emerald-200/70 font-medium">Get your results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
