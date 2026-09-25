import { CheckCircle2, AlertCircle, Calendar, ArrowRight, Award } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface AcriResultRoadmapProps {
  onOpenSampleReport?: () => void;
}

export function AcriResultRoadmap({ onOpenSampleReport }: AcriResultRoadmapProps) {
  return (
    <section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Card: Your Result. A Clear Roadmap. */}
          <div className="card-light rounded-3xl border border-stone-200 bg-white p-7 sm:p-9 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
                AUDITABLE EVALUATION
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325] mt-1 mb-2">
                Your Result. A Clear Roadmap.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Get a detailed analysis of your strengths, gaps and exact next steps to become industry-ready.
              </p>

              {/* Ananya Profile Banner */}
              <div className="mt-6 rounded-2xl border border-stone-150 bg-[#FAF8F5] p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src="/images/avatar-ananya.jpg"
                    alt="Ananya Sharma - Pharmacovigilance Associate Candidate"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover border border-stone-300"
                  />
                  <div>
                    <h3 className="font-sans text-sm font-bold text-[#0B1325]">Hey, Ananya</h3>
                    <p className="text-xs text-stone-500 font-medium">Pharmacovigilance Associate</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Gold Rosette Badge */}
                  <div className="flex flex-col items-center justify-center rounded-full bg-amber-50 border border-amber-300 px-3 py-1 text-center shadow-2xs">
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-900">
                      INDUSTRY
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-900">
                      READY
                    </span>
                  </div>

                  {/* Radial Gauge */}
                  <div className="relative flex h-14 w-14 items-center justify-center">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" stroke="#E7E5E4" strokeWidth="3" fill="transparent" />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="#10B981"
                        strokeWidth="3"
                        strokeDasharray="100.5"
                        strokeDashoffset="18"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="font-sans text-xs font-black text-[#0B1325]">82</span>
                      <span className="block text-[8px] font-bold text-stone-400">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths & Areas to Improve Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
                    Strengths
                  </span>
                  <div className="space-y-1.5 text-xs font-semibold text-emerald-950">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Analytical Reasoning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Attention to Detail</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Scientific Understanding</span>
                    </div>
                  </div>
                </div>

                {/* Areas to Improve */}
                <div className="rounded-xl border border-rose-200/80 bg-rose-50/50 p-4 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-900 block">
                    Areas to Improve
                  </span>
                  <div className="space-y-1.5 text-xs font-semibold text-rose-950">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span>ICSR Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span>PV Documentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span>Case Narrative Writing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View Sample Report Button */}
            <div className="mt-8 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={onOpenSampleReport}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors cursor-pointer shadow-xs"
              >
                <span>View Sample Report</span>
                <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Right Card: Not Just a Score — A Career Plan */}
          <div className="card-light rounded-3xl border border-stone-200 bg-white p-7 sm:p-9 shadow-sm flex flex-col justify-between relative overflow-hidden">


            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
                STRUCTURED INTERNSHIP ROADMAP
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325] mt-1 mb-2">
                Not Just a Score — A Career Plan
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md">
                Based on your assessment, we create a personalized 12-week learning path with projects, tools, and mentorship.
              </p>

              {/* 3 Step Timeline */}
              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-150 bg-[#FAF8F5]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                      Weeks 1–4
                    </span>
                    <h3 className="font-sans text-sm font-bold text-[#0B1325]">
                      PV Fundamentals &amp; ICSR Processing
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      ICH guidelines, 4 minimum criteria, triage, and adverse event coding fundamentals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-150 bg-[#FAF8F5]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                      Weeks 5–8
                    </span>
                    <h3 className="font-sans text-sm font-bold text-[#0B1325]">
                      Medical Terminology &amp; MedDRA Coding
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Hands-on coding in Argus-like simulators, SOC/PT mapping, and case validity auditing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-150 bg-[#FAF8F5]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                      Weeks 9–12
                    </span>
                    <h3 className="font-sans text-sm font-bold text-[#0B1325]">
                      Case Narratives, Regulatory Reporting &amp; Real Projects
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      MedWatch 3500A, CIOMS I forms, expedited reporting deadlines, and live capstone audit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Learning Paths CTA */}
            <div className="mt-8 pt-4 border-t border-stone-100">
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors shadow-xs"
              >
                <span>Explore Learning Paths</span>
                <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
