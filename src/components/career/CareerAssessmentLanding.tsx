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
  BookOpen,
  Award,
  Layers,
  Sparkles,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { ProductComparisonTable } from "@/components/career/ProductComparisonTable";
import { trackCEFunnelStep, trackCECtaClicked } from "@/lib/careerEngineAnalytics";

export function CareerAssessmentLanding() {
  useEffect(() => {
    trackCEFunnelStep({ step: "interested" });
  }, []);

  const trackCta = (target: string) => () => {
    trackCECtaClicked({ step: "interested", target });
  };

  return (
    <CareerShell>
      <main className="pb-16 arzon-page-surface space-y-12 sm:space-y-16 selection:bg-blue-100 selection:text-blue-900">
        {/* =========================================================================
            1. APPLE-GRADE HERO SECTION
            ========================================================================= */}
        <section className="pt-2 sm:pt-6 relative">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-emerald-50/20 blur-3xl pointer-events-none -z-10" />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Apple-Style Minimal Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-white/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-mono font-bold tracking-wider text-blue-700 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-blue-600 motion-safe:animate-pulse" />
                <span>2026 CRO CLINICAL INTERVIEW STANDARDS</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl min-[380px]:text-4xl sm:text-5xl lg:text-[3.25rem] font-sans font-extrabold tracking-tight text-[#081F38] leading-[1.12]">
                Know your technical gaps <br />
                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  before your next CRO interview.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 font-sans">
                Select your target healthcare role and complete 40 realistic clinical casework scenarios. Get an objective evaluation of your knowledge, decision-making, and technical gaps against published ICH E2A/E2D, EMA GVP VI, and MedDRA MSSO standards.
              </p>

              {/* 4 Apple-Grade Micro Metric Badges */}
              <div className="grid grid-cols-2 gap-3 max-w-md pt-1">
                <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md p-3 shadow-2xs flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold leading-none">Role Track</span>
                    <strong className="text-xs font-bold text-[#081F38] truncate block mt-0.5">Drug Safety Assoc</strong>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md p-3 shadow-2xs flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold leading-none">Casework</span>
                    <strong className="text-xs font-bold text-[#081F38] truncate block mt-0.5">40 Dilemmas</strong>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md p-3 shadow-2xs flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold leading-none">Audit Scope</span>
                    <strong className="text-xs font-bold text-[#081F38] truncate block mt-0.5">8 Competencies</strong>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md p-3 shadow-2xs flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Target className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold leading-none">Feedback</span>
                    <strong className="text-xs font-bold text-[#081F38] truncate block mt-0.5">Recruiter Insights</strong>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <Link
                  to="/career-engine/start"
                  onClick={trackCta("hero_start_assessment")}
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-2xl bg-[#081F38] hover:bg-blue-700 text-white px-8 text-sm font-bold shadow-[0_4px_14px_rgba(8,31,56,0.18)] transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Start Drug Safety Associate Diagnostic</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Free
                  </span>
                  <span>•</span>
                  <span>40 Scenario Questions</span>
                  <span>•</span>
                  <span>Immediate Scorecard</span>
                  <span>•</span>
                  <span>No Telemarketing</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic with Apple-Grade Floating Cards (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[420px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 bg-white tone-light">
                <img
                  src="/images/career-assessment-student.jpg"
                  alt="Candidate preparing for pharmacovigilance clinical interview"
                  className="w-full h-[360px] min-[380px]:h-[390px] sm:h-[420px] object-cover object-top"
                />

                {/* Glassmorphic Floating Bento Cards Layered Over Image */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between pointer-events-none">
                  {/* Top row cards */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="bg-white/95 tone-light card-light backdrop-blur-xl rounded-2xl p-2.5 shadow-lg border border-slate-200/70 max-w-[155px] sm:max-w-[175px]">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                          <ShieldCheck className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-[#081F38] leading-tight truncate">Drug Safety Assoc</p>
                          <p className="text-[9.5px] font-bold text-emerald-600">Live Casework Track</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/95 tone-light card-light backdrop-blur-xl rounded-2xl p-2.5 shadow-lg border border-slate-200/70 max-w-[155px] sm:max-w-[175px]">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <BookOpen className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-[#081F38] leading-tight truncate">ICH E2A / E2D</p>
                          <p className="text-[9.5px] font-bold text-blue-700">100% Objective</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row cards */}
                  <div className="flex justify-between items-end gap-2">
                    <div className="bg-white/95 tone-light card-light backdrop-blur-xl rounded-2xl p-2.5 shadow-lg border border-slate-200/70 max-w-[150px] sm:max-w-[170px]">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                          <Layers className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-[#081F38] leading-tight truncate">MedDRA PTC v27</p>
                          <p className="text-[9.5px] font-bold text-indigo-700">5-Level Hierarchy</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/95 tone-light card-light backdrop-blur-xl rounded-2xl p-2.5 shadow-lg border border-slate-200/70 max-w-[150px] sm:max-w-[170px]">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                          <Target className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-[#081F38] leading-tight truncate">Passing Bar</p>
                          <p className="text-[9.5px] font-bold text-emerald-700">75% Benchmark</p>
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
            2. APPLE BENTO GRID: 4 CORE CAPABILITIES
            ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
                BUILT FOR HEALTHCARE CANDIDATES
              </span>
              <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#081F38] tracking-tight">
                Designed to test what you know, not who you are.
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Grounded in EMA GVP Module VI &amp; ICH-GCP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Bento Card 1 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 border border-blue-100">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#081F38] font-sans">
                  Real Clinical Scenarios
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-sans">
                  Evaluate actual adverse event intake narratives, Day 0 clock boundaries, seriousness criteria, and ICSR triage.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-mono text-blue-700 font-bold">
                100% Casework Scenarios
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="h-10 w-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 border border-teal-100">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#081F38] font-sans">
                  8 Competency Pillars
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-sans">
                  Audited across PV Scope, ICSR Validity, Day 0 Clocks, Expedited Timelines, MedDRA, Special Situations, SBAR, and Causality.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-mono text-teal-700 font-bold">
                5 Questions Per Domain
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 border border-indigo-100">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#081F38] font-sans">
                  Recruiter Rationales
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-sans">
                  Understand why top CRO interviewers ask each dilemma, the expected industry response, and what traps to avoid.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-mono text-indigo-700 font-bold">
                Immediate Explanations
              </div>
            </div>

            {/* Bento Card 4 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-100">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#081F38] font-sans">
                  Actionable Next Steps
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-sans">
                  Close your technical gaps with a structured 7-day casework syllabus or submit your verified record for Arzon Certification.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-mono text-emerald-700 font-bold">
                Two Clear Actions
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. HOW THE CLINICAL INTERVIEW DIAGNOSTIC WORKS (APPLE STEP FLOW)
            ========================================================================= */}
        <section className="space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
              STREAMLINED 4-STEP PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#081F38] tracking-tight mt-1">
              How the Clinical Interview Diagnostic Works
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
              An objective technical screening designed to simulate real-world Day 1 pharmacovigilance responsibilities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-6 shadow-2xs relative">
              <div className="flex items-center justify-between mb-4">
                <span className="h-9 w-9 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
                  01
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Candidate Onboarding</span>
              </div>
              <h3 className="text-sm font-bold text-[#081F38] font-sans">
                Capture Candidate Profile
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans">
                Select your qualification (B.Pharm, Pharm.D, Life Sciences), graduation year, current status, and target job role.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-6 shadow-2xs relative">
              <div className="flex items-center justify-between mb-4">
                <span className="h-9 w-9 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
                  02
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Casework Simulation</span>
              </div>
              <h3 className="text-sm font-bold text-[#081F38] font-sans">
                Solve 40 Clinical Dilemmas
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans">
                Navigate real adverse-event reports, Day 0 clock resets, seriousness criteria, MedDRA coding, and causality disputes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-6 shadow-2xs relative">
              <div className="flex items-center justify-between mb-4">
                <span className="h-9 w-9 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
                  03
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Executive Audit</span>
              </div>
              <h3 className="text-sm font-bold text-[#081F38] font-sans">
                Instant Technical Scorecard
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans">
                Receive your score, 8-competency mastery, clearance status against the 75% CRO bar, and detailed question explanations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-6 shadow-2xs relative">
              <div className="flex items-center justify-between mb-4">
                <span className="h-9 w-9 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
                  04
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Career Next Steps</span>
              </div>
              <h3 className="text-sm font-bold text-[#081F38] font-sans">
                Two Actionable Pathways
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans">
                Follow our 7-day casework syllabus to close technical gaps or submit your verified score for official Arzon Certification.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. TWO-COLUMN WORKBENCH PREVIEW & ROLE-SPECIFIC TRACKS
            ========================================================================= */}
        <section className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Sample Clinical Diagnostic Scorecard (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
                  SCORECARD SAMPLE PREVIEW
                </span>
                <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#081F38] tracking-tight">
                  Technical Interview Diagnostic Scorecard
                </h2>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                Verified Ledger Audit
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Sample evaluation for a candidate completing the 40 Drug Safety Associate casework dilemmas.
            </p>

            <div className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-5 sm:p-6 shadow-[0_4px_24px_rgba(8,31,56,0.03)] space-y-4">
              {/* Score & Benchmark Display Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white p-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 block">
                    Arzon Diagnostic Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-mono font-extrabold text-[#081F38]">82%</span>
                    <span className="text-xs font-mono font-bold text-slate-500">(33 / 40 Correct)</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-blue-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">CRO Passing Bar:</span>
                    <span className="font-mono font-bold text-slate-900">75% (30+ Correct)</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/40 p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 block">
                      Screening Clearance Status
                    </span>
                    <strong className="text-sm font-bold text-emerald-950 font-sans block mt-1">
                      Cleared Technical Benchmark
                    </strong>
                    <p className="text-[11px] text-emerald-900/80 mt-0.5 leading-snug">
                      Demonstrates strong baseline foundation for Tier-1 CRO technical screening rounds.
                    </p>
                  </div>
                  <div className="text-[10.5px] font-mono text-slate-500 pt-2 border-t border-emerald-100 flex justify-between">
                    <span>National Fresher Avg:</span>
                    <strong className="text-slate-800">54%</strong>
                  </div>
                </div>
              </div>

              {/* 8-Competency Breakdown Inset */}
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#081F38] font-sans">8 Domain Competency Mastery</span>
                  <span className="text-[10px] font-mono text-slate-400">Published Criteria</span>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-xs font-sans">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-700 truncate">1. PV Scope &amp; Fundamentals</span>
                      <span className="font-mono font-bold text-emerald-700">100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-700 truncate">2. ICSR Intake &amp; Validity</span>
                      <span className="font-mono font-bold text-emerald-700">80%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-700 truncate">3. Day 0 Regulatory Clocks</span>
                      <span className="font-mono font-bold text-emerald-700">100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-700 truncate">4. Seriousness &amp; Expedited</span>
                      <span className="font-mono font-bold text-emerald-700">80%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-700 truncate">5. MedDRA Concepts &amp; Coding</span>
                      <span className="font-mono font-bold text-emerald-700">80%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-700 truncate">6. Special Safety Situations</span>
                      <span className="font-mono font-bold text-emerald-700">80%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-700 truncate">7. SBAR Narrative Writing</span>
                      <span className="font-mono font-bold text-emerald-700">80%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-700 truncate">8. Causality &amp; Escalation</span>
                      <span className="font-mono font-bold text-emerald-700">80%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Question Explanations Box */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                    Sample Diagnostic Dilemma · Case 01
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Correct (+1.0)
                  </span>
                </div>
                <p className="text-xs font-bold text-[#081F38] leading-snug">
                  Adverse Event (AE) vs Adverse Drug Reaction (ADR) under ICH E2A Section II.A
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                  Expected Response: Categorize trial subject's home fall fracture as an AE, not ADR, because an AE is any untoward medical occurrence without regard to causal relationship.
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>🎯 Recruiter Insight: Tests causality conflation</span>
                  <span className="font-bold text-slate-700">Ref: ICH E2A / ICH-GCP E6</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic Tracks Deck (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
                ROLE-SPECIFIC TRACKS
              </span>
              <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#081F38] tracking-tight mt-1">
                Clinical Diagnostic Tracks
              </h2>
              <p className="text-xs text-slate-600">
                Each job role is evaluated using its own dedicated, specialized casework bank.
              </p>
            </div>

            <div className="space-y-3">
              {/* Track 1: Drug Safety Associate (Live Pro Track) */}
              <div className="rounded-3xl border-2 border-blue-600 bg-blue-50/30 p-5 shadow-xs relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#081F38]">Drug Safety Associate (PV / ICSR)</h3>
                      <p className="text-[10.5px] text-slate-500">ICSR intake, Day 0 clocks, MedDRA coding, case triage</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full shrink-0">
                    LIVE NOW
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-blue-100/90 font-sans">
                  <span className="text-slate-600 font-mono text-[11px]">40 Questions · 8 Competencies</span>
                  <Link
                    to="/career-engine/start"
                    className="font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Start Track</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Track 2: Clinical Data Management */}
              <div className="rounded-3xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs opacity-90">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#081F38]">Clinical Data Management (CDM)</h3>
                      <p className="text-[10.5px] text-slate-500">EDC, eCRF, discrepancy triage, ICH E6(R3)</p>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                    COMING NEXT
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-sans">
                  Validation in progress with senior clinical data management professionals.
                </p>
              </div>

              {/* Track 3: Medical Coder */}
              <div className="rounded-3xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs opacity-90">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#081F38]">Medical Coder (ICD-10-CM / CPT)</h3>
                      <p className="text-[10.5px] text-slate-500">Anatomy, medical terminology, coding guidelines</p>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                    COMING NEXT
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-sans">
                  Validation in progress with certified medical coding specialists.
                </p>
              </div>

              {/* Track 4: Regulatory Affairs */}
              <div className="rounded-3xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs opacity-90">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#081F38]">Regulatory Affairs Associate</h3>
                      <p className="text-[10.5px] text-slate-500">CTD dossiers, submissions, agency guidelines</p>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                    COMING NEXT
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-sans">
                  Regulatory documentation and lifecycle management dilemmas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. PRODUCT COMPARISON TABLE (DIAGNOSTIC VS ACRI)
            ========================================================================= */}
        <section>
          <ProductComparisonTable activeProduct="assessment" />
        </section>

        {/* =========================================================================
            6. APPLE-STYLE BOTTOM CONVERSION BANNER
            ========================================================================= */}
        <section className="rounded-3xl border border-blue-200/90 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white p-7 sm:p-10 shadow-[0_4px_24px_rgba(8,31,56,0.04)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
                TAKE THE FIRST STEP
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#081F38] tracking-tight">
                Know exactly what to improve before attending your next interview.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                40 scenario dilemmas, 8 competencies, instant recruiter feedback, and zero marketing fluff.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:items-end gap-2.5">
              <Link
                to="/career-engine/start"
                onClick={trackCta("footer_start_assessment")}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-2xl bg-[#081F38] hover:bg-blue-700 text-white px-8 text-sm font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Start Drug Safety Associate Diagnostic</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                <span>Free</span>
                <span>•</span>
                <span>40 Questions</span>
                <span>•</span>
                <span>Instant Scorecard</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </CareerShell>
  );
}
