import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface AcriHeroProps {
  onOpenVideo?: () => void;
}

export function AcriHero({ onOpenVideo }: AcriHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-10 pb-16 lg:pt-14 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            {/* Small Label / Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
              <span>KNOW · PREPARE · GET HIRED</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans text-4xl sm:text-5xl xl:text-[54px] font-extrabold tracking-tight text-[#0B1325] leading-[1.12]">
              Are You Industry-Ready for a Pharmacovigilance Career?
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Take an AI-powered assessment, get your readiness score, see your skill gaps, and build a clear path to high-paying healthcare roles.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/career-engine/test"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0B1325] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#1B3F8B] transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                <span>Take Free Assessment</span>
                <ArrowRight className="h-4 w-4 text-sky-400" />
              </Link>

              <button
                type="button"
                onClick={onOpenVideo}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-stone-300 bg-white tone-light px-5 py-3.5 text-sm font-bold text-stone-800 hover:bg-stone-50 hover:border-stone-400 transition-colors cursor-pointer shadow-2xs"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-stone-900">
                  <Play className="h-3 w-3 fill-stone-900 ml-0.5" />
                </div>
                <span>Watch 1 Min Video</span>
              </button>
            </div>

            {/* Microcopy Under CTAs */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1 text-xs font-medium text-stone-500">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-600" /> 10 min assessment
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> AI-powered
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Role-specific
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Personalized result
              </span>
            </div>

            {/* Metrics Row */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="font-sans text-2xl font-extrabold text-[#0B1325]">300K+</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Students on Arzon</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-extrabold text-[#0B1325]">14+</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Hiring Partners</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-extrabold text-[#0B1325]">4.8/5</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Student Rating</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-extrabold text-[#0B1325]">85%</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Shortlist Rate*</div>
              </div>
            </div>
            <p className="text-[10px] text-stone-500 italic">
              *Among certified candidates who demonstrated the ACRI Industry Ready standard.
            </p>
          </div>

          {/* Right Column: Visual Composition with Hero Student & Floating ACRI Card */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center">
            {/* Editorial Handwritten Annotation Top-Left */}
            <div className="absolute -top-4 left-4 sm:left-8 z-20 pointer-events-none rotate-[-4deg]">
              <span className="font-handwriting text-2xl sm:text-3xl text-stone-800 tracking-wide select-none drop-shadow-xs">
                Same You. Bigger Opportunities.
              </span>
            </div>

            {/* Editorial Handwritten Annotation Top-Right */}
            <div className="hidden xl:block absolute -top-2 -right-4 z-20 pointer-events-none rotate-[6deg]">
              <span className="font-handwriting text-xl sm:text-2xl text-stone-700 tracking-wide select-none">
                Skills today.<br />A Safer tomorrow.
              </span>
            </div>

            <div className="relative w-full max-w-[480px] lg:max-w-none grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Authentic Indian Student Photo */}
              <div className="sm:col-span-7 relative z-10">
                <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-md">
                  <img
                    src="/images/pv-student-hero.jpg"
                    alt="Indian female Pharm.D graduate preparing for Pharmacovigilance Associate career"
                    width={540}
                    height={720}
                    className="h-auto w-full object-cover aspect-3/4"
                    loading="eager"
                  />
                  {/* Subtle gradient vignette at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating ACRI Scorecard */}
              <div className="sm:col-span-5 sm:-ml-8 relative z-20">
                <div className="card-light rounded-2xl border border-stone-200 bg-white p-5 shadow-xl transition-transform duration-200 hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Your ACRI Score
                    </span>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  </div>

                  {/* Circular Score Gauge */}
                  <div className="my-4 flex flex-col items-center">
                    <div className="relative flex h-28 w-28 items-center justify-center">
                      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                        {/* Background track */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#E7E5E4"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        {/* Progress arc (82%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#10B981"
                          strokeWidth="8"
                          strokeDasharray="251.2"
                          strokeDashoffset="45.2"
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <div className="flex items-baseline">
                          <span className="font-sans text-3xl font-extrabold text-[#0B1325]">82</span>
                          <span className="text-xs font-semibold text-stone-500">/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <span>Industry Ready</span>
                    </div>
                    <div className="mt-1 text-[11px] font-medium text-stone-500">
                      Pharmacovigilance Associate
                    </div>
                  </div>

                  {/* Competency Breakdown */}
                  <div className="space-y-2 border-t border-stone-100 pt-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-stone-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> PV Knowledge
                      </span>
                      <span className="font-bold text-stone-900">86%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-stone-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Case Processing
                      </span>
                      <span className="font-bold text-stone-900">76%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-stone-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Analytical Reasoning
                      </span>
                      <span className="font-bold text-stone-900">84%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-stone-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Attention to Detail
                      </span>
                      <span className="font-bold text-stone-900">92%</span>
                    </div>
                  </div>

                  {/* Card Button */}
                  <div className="mt-4 pt-2">
                    <Link
                      to="/career-engine/start"
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0B1325] py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors"
                    >
                      <span>Take the Assessment</span>
                      <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                    </Link>
                  </div>

                  {/* Microcopy with clock */}
                  <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] text-stone-500">
                    <Clock className="h-3 w-3 text-emerald-600" />
                    <span>Get a personalised report in 10 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
