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
    <section id="assessments" className="py-12 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light relative overflow-hidden">
      <div className="ap-shell max-w-6xl mx-auto">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF] px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1D4ED8] mb-3.5 shadow-2xs">
            <Compass className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>INSTITUTIONAL CAREER ASSESSMENT • 100% FREE</span>
          </div>

          {/* Main Title (Exact Reference Match) */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#081F38] tracking-tight leading-[1.18]">
            Not sure which healthcare role fits your degree? <br />
            <span className="text-[#2563EB]">Find your ideal path </span>
            <span className="text-[#6366F1]">in 6 minutes.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-xs sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Benchmark your academic qualifications, clinical aptitude, and problem-solving strengths against 2,000+ analyzed employer job descriptions to receive an instant, personalized career readiness dossier.
          </p>

          {/* 3 Value Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-[#334155]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2E8F0] px-3.5 py-1.5 shadow-2xs tone-light card-light">
              <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
              ~6 Minutes Diagnostic
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2E8F0] px-3.5 py-1.5 shadow-2xs tone-light card-light">
              <FileCheck2 className="h-3.5 w-3.5 text-[#2563EB]" />
              15 Clinical Scenarios
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2E8F0] px-3.5 py-1.5 shadow-2xs tone-light card-light">
              <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
              50+ Healthcare Careers Mapped
            </span>
          </div>
        </motion.div>

        {/* =========================================================================
            2. MAIN 2-COLUMN BENTO GRID: DIAGNOSTIC PROCESS + LIVE DOSSIER PREVIEW
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12 sm:mb-16">
          {/* ─────────────────────────────────────────────────────────────────────────
              LEFT CARD (5 COLS): THE ARZON CAREER ASSESSMENT ENGINE
              ───────────────────────────────────────────────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-7 shadow-[0_2px_14px_rgba(0,0,0,0.04)] tone-light card-light relative"
          >
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#475569]">
                  THE ARZON CAREER ASSESSMENT ENGINE
                </span>
                <h3 className="mt-1.5 text-xl sm:text-2xl font-bold text-[#081F38] tracking-tight leading-snug">
                  A data-driven diagnostic built for{" "}
                  <span className="text-[#2563EB]">
                    B.Pharm, Pharm.D, MBBS, BDS &amp; Life Sciences
                  </span>{" "}
                  graduates.
                </h3>
              </div>

              {/* 3 Numbered Steps / Pillars */}
              <div className="space-y-3">
                {/* Pillar 01 */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-[#EEF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#081F38]">Role Compatibility Fit Scores</h4>
                      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                        Calculates your exact percentage match across PV, CDM, Medical Coding, and Clinical SAS based on your academic and analytical profile.
                      </p>
                    </div>
                  </div>
                  <span className="h-6 w-6 rounded-md bg-[#EEF6FF] text-[#2563EB] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    01
                  </span>
                </div>

                {/* Pillar 02 */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] text-[#7C3AED] flex items-center justify-center shrink-0">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#081F38]">Verified Skill Gap Audit</h4>
                      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                        Identifies the specific tools, technical skills, and regulatory knowledge (e.g., EDC, MedDRA, Argus, ICD-10, SAS) you need to become job-ready.
                      </p>
                    </div>
                  </div>
                  <span className="h-6 w-6 rounded-md bg-[#F5F3FF] text-[#7C3AED] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    02
                  </span>
                </div>

                {/* Pillar 03 */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center shrink-0">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#081F38]">12-Week Roadmap &amp; CTC Benchmark</h4>
                      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                        Get a personalized 12-week skill development plan with a realistic fresher salary range of ₹3.80 – ₹5.50 LPA for your top-fit roles.
                      </p>
                    </div>
                  </div>
                  <span className="h-6 w-6 rounded-md bg-[#ECFDF5] text-[#059669] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    03
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs & Trust Badges */}
            <div className="pt-6 mt-6 border-t border-[#F1F5F9] space-y-3.5">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <Link
                  to="/career-assessment"
                  data-fab-avoid
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white py-3 px-5 text-sm font-bold shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => openCounsellorModal({ source: "home_assessment_section" })}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#081F38] py-3 px-5 text-sm font-bold shadow-2xs transition-all active:scale-[0.98] tone-light card-light"
                >
                  <Users className="h-4 w-4 text-[#2563EB]" />
                  <span>Talk to Experts</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#64748B] pt-1">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#081F38]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                  100% Free
                </span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-[#64748B]" />
                  No Credit Card Required
                </span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5 text-[#64748B]" />
                  Instant PDF Download
                </span>
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
            className="lg:col-span-7 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_2px_14px_rgba(0,0,0,0.04)] tone-light card-light overflow-hidden relative"
          >
            {/* Top Royal Blue Dossier Header Strip */}
            <div className="bg-[#2563EB] px-5 py-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-white" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  DIAGNOSTIC DOSSIER PREVIEW
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-0.5 font-mono text-[11px] font-bold text-[#081F38] shadow-2xs tone-light card-light">
                <span className="h-2 w-2 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
                <span>ARZ-2026-DIAGNOSTIC</span>
              </div>
            </div>

            {/* Inner Bento Body (Laptop Mockup + Live Dial & Role Breakdown) */}
            <div className="p-5 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Left Side: Vector Laptop Screen Mockup */}
                <div className="md:col-span-6 flex justify-center">
                  <div className="relative w-full max-w-[270px] sm:max-w-[290px]">
                    {/* Laptop Screen Bezel */}
                    <div className="relative rounded-t-xl border-2 border-slate-700 bg-slate-900 p-1.5 shadow-md">
                      {/* Web camera */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-slate-500" />

                      {/* Display Content Surface */}
                      <div className="rounded-md bg-white p-2.5 tone-light card-light border border-slate-200 text-left">
                        {/* Dossier Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                          <div className="flex items-center gap-1">
                            <div className="h-3.5 w-3.5 rounded-full bg-[#081F38] text-white flex items-center justify-center font-bold text-[8px]">
                              A
                            </div>
                            <span className="font-bold text-[9px] text-[#081F38]">
                              Arzon Global<sup>®</sup>
                            </span>
                          </div>
                          <span className="text-[7.5px] font-mono text-[#64748B]">
                            Career Readiness Dossier
                          </span>
                        </div>

                        {/* Title inside laptop */}
                        <div className="text-[10px] font-bold text-[#081F38] leading-tight">
                          Your Career Fit Analysis
                        </div>
                        <div className="text-[7.5px] text-[#64748B] mb-1.5">
                          Multi-Role Compatibility Report
                        </div>

                        {/* Sparkline / Area Chart graphic */}
                        <div className="h-10 w-full rounded bg-gradient-to-b from-blue-50/70 to-transparent p-1 mb-2 relative overflow-hidden border border-blue-50">
                          <svg viewBox="0 0 200 60" className="w-full h-full text-[#2563EB] overflow-visible" fill="none">
                            <defs>
                              <linearGradient id="laptopChartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
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
                            <circle cx="100" cy="24" r="3" fill="#2563EB" />
                            <circle cx="200" cy="12" r="3" fill="#2563EB" />
                          </svg>
                        </div>

                        {/* 4 Micro Feature Icons */}
                        <div className="grid grid-cols-4 gap-1 text-center">
                          <div className="rounded bg-slate-50 p-1 border border-slate-100">
                            <BarChart3 className="h-2.5 w-2.5 text-[#2563EB] mx-auto mb-0.5" />
                            <span className="block text-[6.5px] font-bold text-[#081F38] leading-tight truncate">
                              Role Fit
                            </span>
                          </div>
                          <div className="rounded bg-slate-50 p-1 border border-slate-100">
                            <Layers className="h-2.5 w-2.5 text-[#7C3AED] mx-auto mb-0.5" />
                            <span className="block text-[6.5px] font-bold text-[#081F38] leading-tight truncate">
                              Skill Gap
                            </span>
                          </div>
                          <div className="rounded bg-slate-50 p-1 border border-slate-100">
                            <Calendar className="h-2.5 w-2.5 text-[#059669] mx-auto mb-0.5" />
                            <span className="block text-[6.5px] font-bold text-[#081F38] leading-tight truncate">
                              12-Week
                            </span>
                          </div>
                          <div className="rounded bg-slate-50 p-1 border border-slate-100">
                            <TrendingUp className="h-2.5 w-2.5 text-[#0284C7] mx-auto mb-0.5" />
                            <span className="block text-[6.5px] font-bold text-[#081F38] leading-tight truncate">
                              CTC Band
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Laptop Bottom Keyboard Lip */}
                    <div className="relative mx-auto h-1.5 w-[106%] -left-[3%] rounded-b-md bg-slate-300 border-t border-slate-400 shadow-sm flex items-center justify-center">
                      <div className="h-0.5 w-10 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Right Side: Radial Score Meter & Breakdown */}
                <div className="md:col-span-6 space-y-3.5">
                  {/* Top: 94% Dial + Archetype Badge */}
                  <div className="flex items-center gap-3.5">
                    {/* SVG Radial Gauge */}
                    <div className="relative h-16 w-16 shrink-0">
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
                        <span className="text-base font-bold font-mono text-[#081F38] leading-none">
                          94%
                        </span>
                        <span className="text-[6.5px] font-mono font-bold text-[#059669] tracking-wider mt-0.5">
                          VERIFIED
                        </span>
                        <span className="text-[6px] font-mono text-[#059669] tracking-wider">
                          ROLE FIT
                        </span>
                      </div>
                    </div>

                    {/* Archetype Label */}
                    <div className="min-w-0">
                      <span className="inline-block rounded-full bg-[#EEF6FF] border border-[#BFDBFE] px-2.5 py-0.5 text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8]">
                        Primary Archetype
                      </span>
                      <div className="mt-1 flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#081F38] truncate">
                        <ShieldCheck className="h-4 w-4 text-[#2563EB] shrink-0" />
                        <span className="truncate">Clinical Data &amp; Safety</span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Role Progress Bars */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-[#081F38] tracking-tight">
                      Multi-Role Compatibility Breakdown
                    </div>

                    {/* 01. Pharmacovigilance */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-[#081F38] font-medium text-[11px] truncate">
                          <ShieldCheck className="h-3 w-3 text-[#2563EB] shrink-0" />
                          Pharmacovigilance &amp; Drug Safety
                        </span>
                        <span className="font-mono font-bold text-xs text-[#081F38] shrink-0">94%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2563EB] rounded-full" style={{ width: "94%" }} />
                      </div>
                    </div>

                    {/* 02. Clinical Data Management */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-[#081F38] font-medium text-[11px] truncate">
                          <Database className="h-3 w-3 text-[#0284C7] shrink-0" />
                          Clinical Data Management (CDM)
                        </span>
                        <span className="font-mono font-bold text-xs text-[#081F38] shrink-0">88%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0284C7] rounded-full" style={{ width: "88%" }} />
                      </div>
                    </div>

                    {/* 03. Medical Coding */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-[#081F38] font-medium text-[11px] truncate">
                          <PlusSquare className="h-3 w-3 text-[#10B981] shrink-0" />
                          Medical Coding &amp; Informatics
                        </span>
                        <span className="font-mono font-bold text-xs text-[#081F38] shrink-0">82%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#10B981] rounded-full" style={{ width: "82%" }} />
                      </div>
                    </div>

                    {/* 04. Clinical SAS */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-[#081F38] font-medium text-[11px] truncate">
                          <BarChart2 className="h-3 w-3 text-[#7C3AED] shrink-0" />
                          Clinical SAS &amp; Biostatistics
                        </span>
                        <span className="font-mono font-bold text-xs text-[#081F38] shrink-0">76%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: "76%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 sm:p-6 pt-0">
              <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#EEF6FF] text-[#2563EB] font-bold text-base flex items-center justify-center shrink-0">
                  ₹
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-semibold uppercase text-[#64748B]">
                    Starting CTC Range
                  </span>
                  <span className="block font-bold text-xs sm:text-sm text-[#081F38]">
                    ₹3.80 – ₹5.50 LPA
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-semibold uppercase text-[#64748B]">
                    Output Format
                  </span>
                  <span className="block font-bold text-xs sm:text-sm text-[#081F38] truncate">
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
          <h3 className="text-center text-lg sm:text-xl font-bold text-[#081F38] tracking-tight">
            Healthcare Career Pathways Calibrated by the Engine
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pathway Card 01: Pharmacovigilance */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[#BFDBFE] transition-all tone-light card-light flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center mb-3">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-[#081F38] leading-snug">
                  Pharmacovigilance &amp; Drug Safety
                </h4>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  <strong className="text-[#081F38]">Key Tools:</strong> Argus Safety, MedDRA v26, ICSRs
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <strong className="text-[#081F38]">Typical Roles:</strong> Drug Safety Associate, Safety Scientist
                </p>
              </div>

              <Link
                to="/career-assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] mt-4"
              >
                <span>Check compatibility in assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Pathway Card 02: Clinical Data Management */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[#BAE6FD] transition-all tone-light card-light flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center mb-3">
                  <Database className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-[#081F38] leading-snug">
                  Clinical Data Management
                </h4>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  <strong className="text-[#081F38]">Key Tools:</strong> Medidata Rave, CDISC ODM, eCRFs
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <strong className="text-[#081F38]">Typical Roles:</strong> Clinical Data Coordinator, Data Manager
                </p>
              </div>

              <Link
                to="/career-assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] mt-4"
              >
                <span>Check compatibility in assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Pathway Card 03: Medical Coding */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[#A7F3D0] transition-all tone-light card-light flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-3">
                  <PlusSquare className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-[#081F38] leading-snug">
                  Medical Coding &amp; Informatics
                </h4>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  <strong className="text-[#081F38]">Key Tools:</strong> ICD-10-CM, CPT-4, HCPCS
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <strong className="text-[#081F38]">Typical Roles:</strong> Medical Coder, Clinical Informatics Analyst
                </p>
              </div>

              <Link
                to="/career-assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] mt-4"
              >
                <span>Check compatibility in assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Pathway Card 04: Clinical SAS */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[#DDD6FE] transition-all tone-light card-light flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center mb-3">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-[#081F38] leading-snug">
                  Clinical SAS &amp; Biostatistics
                </h4>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  <strong className="text-[#081F38]">Key Tools:</strong> SAS Base/Stat, SDTM, ADAM
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <strong className="text-[#081F38]">Typical Roles:</strong> Clinical SAS Programmer, Biostatistician
                </p>
              </div>

              <Link
                to="/career-assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] mt-4"
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
