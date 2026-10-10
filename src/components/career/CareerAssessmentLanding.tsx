import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Clock,
  Compass,
  Database,
  FileCheck2,
  FileText,
  Heart,
  HelpCircle,
  Lightbulb,
  Shield,
  ShieldCheck,
  Stethoscope,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { ProductComparisonTable } from "@/components/career/ProductComparisonTable";
import { trackCEFunnelStep, trackCECtaClicked } from "@/lib/careerEngineAnalytics";
import { TARGET_TOTAL } from "@/data/careerEngineSampler";

export function CareerAssessmentLanding() {
  useEffect(() => {
    trackCEFunnelStep({ step: "interested" });
  }, []);

  const trackCta = (target: string) => () => {
    trackCECtaClicked({ step: "interested", target });
  };

  return (
    <CareerShell>
      <main className="pb-16 arzon-page-surface space-y-12 sm:space-y-16">
        {/* =========================================================================
            1. HERO SECTION (EXACT CLONE OF MOCKUP LEFT)
            ========================================================================= */}
        <section className="pt-4 sm:pt-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content (7 cols) */}
            <div className="lg:col-span-7">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6]">
                CAREER ASSESSMENT
              </span>

              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-bold tracking-tight text-[#071A4A] leading-[1.18]">
                Your degree opens doors. <br />
                <span className="text-[#1557D6]">Which one should you choose?</span>
              </h1>

              <p className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-[#3F4A60]">
                A free, personalised assessment to find the healthcare roles that fit your background,
                interests and strengths.
              </p>

              {/* Badges 2x2 Grid */}
              <div className="mt-6 grid grid-cols-2 gap-y-2.5 gap-x-4 max-w-md text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#1557D6] shrink-0" />
                  <span>Free assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#1557D6] shrink-0" />
                  <span>{TARGET_TOTAL} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-[#1557D6] shrink-0" />
                  <span>Personalised report</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1557D6] shrink-0" />
                  <span>About 6 minutes</span>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="mt-8">
                <Link
                  to="/career-engine/start"
                  onClick={trackCta("hero_start_assessment")}
                  className="arzon-button-primary inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-bold shadow-md hover:bg-[#1557D6] transition-all active:scale-[0.98]"
                >
                  Start My Free Career Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <p className="mt-3 text-[11px] text-slate-500">
                  No payment · No admin approval · Get your report instantly
                </p>
              </div>
            </div>

            {/* Right Hero Graphic with Student & Floating Cards (5 cols) */}
            <div className="lg:col-span-5 relative">
              {/* Handwritten pointer annotation */}
              <div className="absolute -top-6 right-8 hidden sm:flex items-center gap-1.5 text-slate-600 z-20">
                <span className="font-serif italic text-xs tracking-wide">Explore roles that fit you</span>
                <svg className="w-5 h-5 text-slate-500 transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

              <div className="relative mx-auto max-w-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white tone-light">
                <img
                  src="/images/career-assessment-student.jpg"
                  alt="Healthcare student taking career assessment"
                  className="w-full h-[360px] sm:h-[400px] object-cover object-top"
                />

                {/* Glassmorphic Floating Role Badges Layered Over Image */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between pointer-events-none">
                  {/* Top row badges */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/60 max-w-[170px] animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                          <Heart className="h-3.5 w-3.5 fill-pink-500" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#071A4A] leading-tight">Pharmacovigilance</p>
                          <p className="text-[10px] font-bold text-emerald-600">92% match</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/60 max-w-[170px] animate-in fade-in slide-in-from-top-2 duration-300 delay-100">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-blue-100 text-[#1557D6] flex items-center justify-center shrink-0">
                          <Database className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#071A4A] leading-tight">Clinical Data Mgmt</p>
                          <p className="text-[10px] font-bold text-emerald-600">84% match</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row badges */}
                  <div className="flex justify-between items-end gap-2">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/60 max-w-[160px] animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#071A4A] leading-tight">Medical Coding</p>
                          <p className="text-[10px] font-bold text-blue-600">78% match</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/60 max-w-[160px] animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                          <Shield className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#071A4A] leading-tight">Regulatory Affairs</p>
                          <p className="text-[10px] font-bold text-blue-600">71% match</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. FOUR FEATURE HIGHLIGHTS STRIP
            ========================================================================= */}
        <section className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-4 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="flex items-start gap-3 pt-3 sm:pt-0 sm:px-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#1557D6] flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Understand your fit</h3>
                <p className="text-[11px] text-slate-600 mt-0.5">See which roles match your background.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 sm:pt-0 sm:px-3">
              <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Compass className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Discover opportunities</h3>
                <p className="text-[11px] text-slate-600 mt-0.5">Explore real job paths in healthcare.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 sm:pt-0 sm:px-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <BarChart2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Identify skill gaps</h3>
                <p className="text-[11px] text-slate-600 mt-0.5">Know what to learn next.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 sm:pt-0 sm:px-3">
              <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Plan your next step</h3>
                <p className="text-[11px] text-slate-600 mt-0.5">Get a clear, personalised action plan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. HOW THE CAREER ASSESSMENT WORKS (4-STEP PROCESS)
            ========================================================================= */}
        <section>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">
              How the Career Assessment works
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              A simple 4-step process to get your personalised report.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs">
              <div className="h-8 w-8 rounded-full bg-pink-100 text-pink-600 font-mono font-bold text-xs flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Answer 42 questions</h3>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Share your background, interests and preferences.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs">
              <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-700 font-mono font-bold text-xs flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">We analyse your profile</h3>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Your responses are mapped to role-fit signals.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs">
              <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-600 font-mono font-bold text-xs flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Get your personalised report</h3>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                See your best-fit roles, strengths and skill gaps.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-mono font-bold text-xs flex items-center justify-center mb-3">
                4
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Plan your next steps</h3>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Explore learning paths, internships and resources.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. TWO-COLUMN SECTION: SAMPLE REPORT & EXPLORE ROLES
            ========================================================================= */}
        <section className="grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Sample Career Assessment Report (7 cols) */}
          <div className="lg:col-span-7">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#071A4A]">
              Sample Career Assessment Report
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">See what your result will look like.</p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white tone-light card-light p-4 sm:p-5 shadow-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Left Inner: Top Role Matches */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                  <span className="text-xs font-bold text-[#071A4A] block mb-2.5">Your Top Role Matches</span>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-800">Pharmacovigilance</span>
                        <span className="font-bold text-emerald-700">92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-800">Clinical Data Management</span>
                        <span className="font-bold text-emerald-700">84%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "84%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-800">Medical Coding</span>
                        <span className="font-bold text-blue-600">78%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-800">Regulatory Affairs</span>
                        <span className="font-bold text-blue-600">71%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "71%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-800">Medical Writing</span>
                        <span className="font-bold text-slate-600">63%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 rounded-full" style={{ width: "63%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Inner: Career Insights */}
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-2.5">
                    <span className="text-[11px] font-bold text-emerald-800 block mb-1">Strengths</span>
                    <ul className="text-[11px] text-slate-700 space-y-0.5">
                      <li>• Analytical thinking</li>
                      <li>• Attention to detail</li>
                      <li>• Scientific interest</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-2.5">
                    <span className="text-[11px] font-bold text-amber-800 block mb-1">Skill gaps</span>
                    <ul className="text-[11px] text-slate-700 space-y-0.5">
                      <li>• Regulatory knowledge</li>
                      <li>• Industry tools</li>
                      <li>• Real-world exposure</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-2.5">
                    <span className="text-[11px] font-bold text-blue-800 block mb-1">Recommended Next Steps</span>
                    <ul className="text-[10px] text-slate-700 space-y-0.5">
                      <li>• Explore <strong className="text-[#1557D6]">Pharmacovigilance</strong> role guide</li>
                      <li>• Consider practical scenario training</li>
                      <li>• Gain verified case study exposure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Explore Healthcare Careers (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#071A4A]">
                  Explore Healthcare Careers
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Discover the most in-demand roles.</p>
              </div>
              <Link to="/careers" className="text-xs font-bold text-[#1557D6] hover:underline">
                View all roles →
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/careers" className="rounded-xl border border-slate-200 bg-white tone-light card-light p-3.5 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                    <Heart className="h-3.5 w-3.5 fill-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#071A4A]">Pharmacovigilance</h3>
                    <p className="text-[10px] text-slate-500">Monitor drug safety</p>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-emerald-700">Salary: 4–8 LPA</p>
              </Link>

              <Link to="/careers" className="rounded-xl border border-slate-200 bg-white tone-light card-light p-3.5 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#071A4A]">Medical Coding</h3>
                    <p className="text-[10px] text-slate-500">Convert healthcare data</p>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-emerald-700">Salary: 3–6 LPA</p>
              </Link>

              <Link to="/careers" className="rounded-xl border border-slate-200 bg-white tone-light card-light p-3.5 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Database className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#071A4A]">Clinical Data Mgmt</h3>
                    <p className="text-[10px] text-slate-500">Manage clinical trial data</p>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-emerald-700">Salary: 4–8 LPA</p>
              </Link>

              <Link to="/careers" className="rounded-xl border border-slate-200 bg-white tone-light card-light p-3.5 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Shield className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#071A4A]">Regulatory Affairs</h3>
                    <p className="text-[10px] text-slate-500">Ensure compliance</p>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-emerald-700">Salary: 4–8 LPA</p>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. PRODUCT COMPARISON (SECTION 5 REQUIREMENT)
            ========================================================================= */}
        <section>
          <ProductComparisonTable activeProduct="assessment" />
        </section>

        {/* =========================================================================
            6. BOTTOM CONVERSION BANNER (EXACT CLONE)
            ========================================================================= */}
        <section className="rounded-3xl border border-[#D0E1FD] bg-gradient-to-r from-[#EEF6FF] via-[#F4F8FF] to-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">
                Make your next career decision with more clarity.
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#3F4A60]">
                Take the free assessment and get your personalised career report in minutes.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:items-end gap-2">
              <Link
                to="/career-engine/start"
                onClick={trackCta("footer_start_assessment")}
                className="arzon-button-primary inline-flex h-11 items-center justify-center rounded-full px-6 text-xs sm:text-sm font-bold shadow-md hover:bg-[#1557D6] transition-all"
              >
                Start My Free Career Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                <span>Free</span>
                <span>•</span>
                <span>No admin approval</span>
                <span>•</span>
                <span>Instant report</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </CareerShell>
  );
}
