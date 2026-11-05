import {
  ArrowRight,
  BarChart2,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  CreditCard,
  Database,
  Download,
  FileCheck2,
  FileText,
  Layers,
  PlusSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { openCounsellorModal } from "@/components/system/CounsellorLeadModal";

export function HomeAssessmentComparison() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="assessments"
      className="py-14 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light relative overflow-hidden"
    >
      <div className="ap-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            1. SECTION HEADER: INSTITUTIONAL BADGE, TITLE & VALUE PILLS
            ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          {/* Top Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF] px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1D4ED8] mb-4 shadow-2xs">
            <Compass className="h-3.5 w-3.5 text-[#1D4ED8]" />
            <span>INSTITUTIONAL CAREER ASSESSMENT • 100% FREE</span>
          </div>

          {/* Main Title (Exact Reference Match with Apple Calligraphy Flourish) */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#081F38] tracking-tight leading-[1.18]">
            Not sure which healthcare role fits your degree? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              Find your ideal path in 6 minutes.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-xs sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Benchmark your academic qualifications, clinical aptitude, and problem-solving strengths against 2,000+ analyzed employer job descriptions to receive an instant, personalized career readiness dossier.
          </p>

          {/* 3 Value Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-medium text-[#334155]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-4 py-1.5 shadow-2xs tone-light card-light font-semibold">
              <Clock className="h-3.5 w-3.5 text-[#1D4ED8]" />
              ~6 Minutes Diagnostic
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-4 py-1.5 shadow-2xs tone-light card-light font-semibold">
              <FileCheck2 className="h-3.5 w-3.5 text-[#0284C7]" />
              15 Clinical Scenarios
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-4 py-1.5 shadow-2xs tone-light card-light font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              50+ Healthcare Careers Mapped
            </span>
          </div>
        </motion.div>

        {/* =========================================================================
            2. MAIN 2-COLUMN BENTO GRID: DIAGNOSTIC PROCESS + LIVE DOSSIER PREVIEW
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-14 sm:mb-18">
          {/* ─────────────────────────────────────────────────────────────────────────
              LEFT CARD (5 COLS): THE ARZON CAREER ASSESSMENT ENGINE
              ───────────────────────────────────────────────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-[0_2px_16px_rgba(8,31,56,0.04)] tone-light card-light relative"
          >
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  THE ARZON CAREER ASSESSMENT ENGINE
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#081F38] tracking-tight leading-snug">
                  A data-driven diagnostic built for{" "}
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone] font-extrabold">
                    B.Pharm, Pharm.D, MBBS, BDS &amp; Life Sciences
                  </span>{" "}
                  graduates.
                </h3>
              </div>

              {/* 3 Numbered Steps / Pillars */}
              <div className="space-y-3.5">
                {/* Pillar 01 */}
                <div className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-[#EEF6FF] border border-[#BFDBFE] text-[#1D4ED8] flex items-center justify-center shrink-0 shadow-2xs">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#081F38] leading-snug">Role Compatibility Fit Scores</h4>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                        Calculates your exact percentage match across PV, CDM, Medical Coding, and Clinical SAS based on your academic and analytical profile.
                      </p>
                    </div>
                  </div>
                  <span className="h-7 w-7 rounded-lg bg-[#EEF6FF] text-[#1D4ED8] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                    01
                  </span>
                </div>

                {/* Pillar 02 */}
                <div className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#DDD6FE] transition-colors">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] text-[#7C3AED] flex items-center justify-center shrink-0 shadow-2xs">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#081F38] leading-snug">Verified Skill Gap Audit</h4>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                        Identifies the specific tools, technical skills, and regulatory knowledge (e.g., EDC, MedDRA, Argus, ICD-10, SAS) you need to become job-ready.
                      </p>
                    </div>
                  </div>
                  <span className="h-7 w-7 rounded-lg bg-[#F5F3FF] text-[#7C3AED] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[#DDD6FE]/60">
                    02
                  </span>
                </div>

                {/* Pillar 03 */}
                <div className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#A7F3D0] transition-colors">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center shrink-0 shadow-2xs">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#081F38] leading-snug">12-Week Roadmap &amp; CTC Benchmark</h4>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                        Get a personalized 12-week skill development plan with a realistic fresher salary range of ₹3.80 – ₹5.50 LPA for your top-fit roles.
                      </p>
                    </div>
                  </div>
                  <span className="h-7 w-7 rounded-lg bg-[#ECFDF5] text-[#059669] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[#A7F3D0]/60">
                    03
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs & Trust Badges: Apple Precision Layout (Full-Width Anti-Wrap Stack) */}
            <div className="pt-6 mt-6 border-t border-[#F1F5F9] space-y-3">
              <div className="flex flex-col gap-2.5 w-full">
                <Link
                  to="/career-assessment"
                  data-fab-avoid
                  className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white px-6 text-sm sm:text-base font-bold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] whitespace-nowrap"
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => openCounsellorModal({ source: "home_assessment_section" })}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#081F38] px-6 text-sm font-bold shadow-2xs transition-all active:scale-[0.98] tone-light card-light cursor-pointer whitespace-nowrap"
                >
                  <Users className="h-4 w-4 text-[#1D4ED8]" />
                  <span>Talk to Experts</span>
                </button>
              </div>

              {/* Trust Indicators: 3 Clean Micro-Pill Cards (Zero Dangling Pipes, Never Wrap) */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200/60 text-[11px] font-semibold text-[#081F38]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                  <span className="truncate">100% Free</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200/60 text-[11px] font-medium text-slate-700">
                  <CreditCard className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">No Card</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200/60 text-[11px] font-medium text-slate-700">
                  <Download className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Instant PDF</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────────────────
              RIGHT CARD (7 COLS): DIAGNOSTIC DOSSIER PREVIEW (MOCKUP + METRICS)
              ───────────────────────────────────────────────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_2px_16px_rgba(8,31,56,0.04)] tone-light card-light overflow-hidden relative"
          >
            {/* Top Royal Blue Dossier Header Strip */}
            <div className="bg-[#2563EB] px-6 py-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-white" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  DIAGNOSTIC DOSSIER PREVIEW
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 font-mono text-[11px] font-bold text-[#081F38] shadow-2xs tone-light card-light">
                <span className="h-2 w-2 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
                <span>ARZ-2026-DIAGNOSTIC</span>
              </div>
            </div>

            {/* Inner Bento Body (Substantial Laptop Mockup + Prominent Dial & Progress Bars) */}
            <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left Side: Prominent Vector MacBook Display Mockup */}
                <div className="md:col-span-6 flex justify-center">
                  <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
                    {/* Laptop Screen Bezel */}
                    <div className="relative rounded-t-2xl border-2 border-slate-700 bg-slate-900 p-2 shadow-xl">
                      {/* Web camera */}
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-slate-500" />

                      {/* Display Content Surface */}
                      <div className="rounded-lg bg-white p-3.5 tone-light card-light border border-slate-200 text-left shadow-inner">
                        {/* Dossier Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <div className="h-4 w-4 rounded-full bg-[#081F38] text-white flex items-center justify-center font-bold text-[9px]">
                              A
                            </div>
                            <span className="font-bold text-[10px] text-[#081F38]">
                              Arzon Global<sup>®</sup>
                            </span>
                          </div>
                          <span className="text-[8.5px] font-mono text-[#64748B]">
                            Career Readiness Dossier
                          </span>
                        </div>

                        {/* Title inside laptop */}
                        <div className="text-[12px] font-bold text-[#081F38] leading-tight">
                          Your Career Fit Analysis
                        </div>
                        <div className="text-[9px] text-[#64748B] mb-2 font-medium">
                          Multi-Role Compatibility Report
                        </div>

                        {/* Sparkline / Area Chart graphic */}
                        <div className="h-14 w-full rounded-md bg-gradient-to-b from-blue-50/80 to-transparent p-1.5 mb-2.5 relative overflow-hidden border border-blue-100/60">
                          <svg viewBox="0 0 200 60" className="w-full h-full text-[#2563EB] overflow-visible" fill="none">
                            <defs>
                              <linearGradient id="laptopChartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M0,45 C30,42 60,18 100,24 C140,30 160,8 200,12 L200,60 L0,60 Z"
                              fill="url(#laptopChartGrad)"
                            />
                            <path
                              d="M0,45 C30,42 60,18 100,24 C140,30 160,8 200,12"
                              stroke="#2563EB"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                            <circle cx="100" cy="24" r="3.5" fill="#2563EB" />
                            <circle cx="200" cy="12" r="3.5" fill="#2563EB" />
                          </svg>
                        </div>

                        {/* 4 Micro Feature Icons */}
                        <div className="grid grid-cols-4 gap-1.5 text-center">
                          <div className="rounded-md bg-slate-50 p-1.5 border border-slate-100">
                            <BarChart3 className="h-3 w-3 text-[#2563EB] mx-auto mb-1" />
                            <span className="block text-[7.5px] font-bold text-[#081F38] leading-tight truncate">
                              Role Fit
                            </span>
                          </div>
                          <div className="rounded-md bg-slate-50 p-1.5 border border-slate-100">
                            <Layers className="h-3 w-3 text-[#7C3AED] mx-auto mb-1" />
                            <span className="block text-[7.5px] font-bold text-[#081F38] leading-tight truncate">
                              Skill Gap
                            </span>
                          </div>
                          <div className="rounded-md bg-slate-50 p-1.5 border border-slate-100">
                            <Calendar className="h-3 w-3 text-[#059669] mx-auto mb-1" />
                            <span className="block text-[7.5px] font-bold text-[#081F38] leading-tight truncate">
                              12-Week
                            </span>
                          </div>
                          <div className="rounded-md bg-slate-50 p-1.5 border border-slate-100">
                            <TrendingUp className="h-3 w-3 text-[#0284C7] mx-auto mb-1" />
                            <span className="block text-[7.5px] font-bold text-[#081F38] leading-tight truncate">
                              CTC Band
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Laptop Bottom Keyboard Lip */}
                    <div className="relative mx-auto h-2 w-[106%] -left-[3%] rounded-b-lg bg-slate-300 border-t border-slate-400 shadow-md flex items-center justify-center">
                      <div className="h-0.5 w-12 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Right Side: Prominent Radial Score Meter & Breakdown */}
                <div className="md:col-span-6 space-y-4">
                  {/* Top: 94% Dial + Archetype Badge */}
                  <div className="flex items-center gap-4">
                    {/* SVG Radial Gauge */}
                    <div className="relative h-20 w-20 shrink-0">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#10B981]"
                          strokeDasharray="94, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold font-mono text-[#081F38] leading-none">
                          94%
                        </span>
                        <span className="text-[7.5px] font-mono font-bold text-[#059669] tracking-wider mt-0.5">
                          VERIFIED
                        </span>
                        <span className="text-[7px] font-mono text-[#059669] tracking-wider">
                          ROLE FIT
                        </span>
                      </div>
                    </div>

                    {/* Archetype Label */}
                    <div className="min-w-0">
                      <span className="inline-block rounded-full bg-[#EEF6FF] border border-[#BFDBFE] px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8]">
                        Primary Archetype
                      </span>
                      <div className="mt-1 flex items-center gap-1.5 text-base sm:text-lg font-bold text-[#081F38] truncate">
                        <ShieldCheck className="h-5 w-5 text-[#2563EB] shrink-0" />
                        <span className="truncate">Clinical Data &amp; Safety</span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Role Progress Bars */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="text-xs font-bold text-[#081F38] tracking-tight uppercase font-mono">
                      Multi-Role Compatibility Breakdown
                    </div>

                    {/* 01. Pharmacovigilance */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-[#081F38] font-semibold text-xs truncate">
                          <ShieldCheck className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                          Pharmacovigilance &amp; Drug Safety
                        </span>
                        <span className="font-mono font-bold text-xs text-[#081F38] shrink-0">94%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2563EB] rounded-full transition-all duration-1000" style={{ width: "94%" }} />
                      </div>
                    </div>

                    {/* 02. Clinical Data Management */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-[#081F38] font-semibold text-xs truncate">
                          <Database className="h-3.5 w-3.5 text-[#0284C7] shrink-0" />
                          Clinical Data Management (CDM)
                        </span>
                        <span className="font-mono font-bold text-xs text-[#081F38] shrink-0">88%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0284C7] rounded-full transition-all duration-1000" style={{ width: "88%" }} />
                      </div>
                    </div>

                    {/* 03. Medical Coding */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-[#081F38] font-semibold text-xs truncate">
                          <PlusSquare className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                          Medical Coding &amp; Informatics
                        </span>
                        <span className="font-mono font-bold text-xs text-[#081F38] shrink-0">82%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#10B981] rounded-full transition-all duration-1000" style={{ width: "82%" }} />
                      </div>
                    </div>

                    {/* 04. Clinical SAS */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-[#081F38] font-semibold text-xs truncate">
                          <BarChart2 className="h-3.5 w-3.5 text-[#7C3AED] shrink-0" />
                          Clinical SAS &amp; Biostatistics
                        </span>
                        <span className="font-mono font-bold text-xs text-[#081F38] shrink-0">76%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#7C3AED] rounded-full transition-all duration-1000" style={{ width: "76%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Calibrated Diagnostic Verification Highlights (Apple Precision Balance) */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[#475569]">
                    <span className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-slate-200/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-[#081F38]">
                      <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                      <span>ICH E2B(R3) Aligned</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-slate-200/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-[#081F38]">
                      <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                      <span>Argus &amp; MedDRA v26</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-slate-200/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-[#081F38]">
                      <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                      <span>15 Clinical Scenarios</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-6 sm:p-8 pt-0">
              <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 flex items-center gap-3.5 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-[#EEF6FF] text-[#1D4ED8] font-bold text-lg flex items-center justify-center shrink-0 border border-[#BFDBFE]">
                  ₹
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Starting CTC Range
                  </span>
                  <span className="block font-bold text-sm sm:text-base text-[#081F38]">
                    ₹3.80 – ₹5.50 LPA
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 flex items-center gap-3.5 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0 border border-[#DDD6FE]">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Output Format
                  </span>
                  <span className="block font-bold text-sm sm:text-base text-[#081F38] truncate">
                    Instant PDF Career Readiness Report
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            3. BOTTOM 4-CARD TRAY: HEALTHCARE CAREER PATHWAYS CALIBRATED BY ENGINE
            ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h3 className="text-center text-lg sm:text-2xl font-bold text-[#081F38] tracking-tight">
            Healthcare Career Pathways Calibrated by the Engine
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Pathway Card 01: Pharmacovigilance */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-[#BFDBFE] transition-all tone-light card-light flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#EEF6FF] text-[#1D4ED8] flex items-center justify-center mb-3.5 border border-[#BFDBFE]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-[#081F38] leading-snug">
                  Pharmacovigilance &amp; Drug Safety
                </h4>
                <p className="text-xs text-[#64748B] mt-2.5 leading-relaxed">
                  <strong className="text-[#081F38]">Key Tools:</strong> Argus Safety, MedDRA v26, ICSRs
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <strong className="text-[#081F38]">Typical Roles:</strong> Drug Safety Associate, Safety Scientist
                </p>
              </div>

              <Link
                to="/career-assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#081F38] mt-5"
              >
                <span>Check compatibility in assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Pathway Card 02: Clinical Data Management */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-[#BAE6FD] transition-all tone-light card-light flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center mb-3.5 border border-[#BAE6FD]">
                  <Database className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-[#081F38] leading-snug">
                  Clinical Data Management
                </h4>
                <p className="text-xs text-[#64748B] mt-2.5 leading-relaxed">
                  <strong className="text-[#081F38]">Key Tools:</strong> Medidata Rave, CDISC ODM, eCRFs
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <strong className="text-[#081F38]">Typical Roles:</strong> Clinical Data Coordinator, Data Manager
                </p>
              </div>

              <Link
                to="/career-assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#081F38] mt-5"
              >
                <span>Check compatibility in assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Pathway Card 03: Medical Coding */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-[#A7F3D0] transition-all tone-light card-light flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-3.5 border border-[#A7F3D0]">
                  <PlusSquare className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-[#081F38] leading-snug">
                  Medical Coding &amp; Informatics
                </h4>
                <p className="text-xs text-[#64748B] mt-2.5 leading-relaxed">
                  <strong className="text-[#081F38]">Key Tools:</strong> ICD-10-CM, CPT-4, HCPCS
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <strong className="text-[#081F38]">Typical Roles:</strong> Medical Coder, Clinical Informatics Analyst
                </p>
              </div>

              <Link
                to="/career-assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#081F38] mt-5"
              >
                <span>Check compatibility in assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Pathway Card 04: Clinical SAS */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-[#DDD6FE] transition-all tone-light card-light flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center mb-3.5 border border-[#DDD6FE]">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-[#081F38] leading-snug">
                  Clinical SAS &amp; Biostatistics
                </h4>
                <p className="text-xs text-[#64748B] mt-2.5 leading-relaxed">
                  <strong className="text-[#081F38]">Key Tools:</strong> SAS Base/Stat, SDTM, ADAM
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <strong className="text-[#081F38]">Typical Roles:</strong> Clinical SAS Programmer, Biostatistician
                </p>
              </div>

              <Link
                to="/career-assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#081F38] mt-5"
              >
                <span>Check compatibility in assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
