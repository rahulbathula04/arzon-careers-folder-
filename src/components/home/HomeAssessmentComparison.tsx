import { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  BarChart2,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  CreditCard,
  Database,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Layers,
  PlusSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { openCounsellorModal } from "@/components/system/CounsellorLeadModal";

export const ASSESSMENT_VIDEO_URL = "https://drive.google.com/file/d/1PLHA9NcqVdlakysuVWckynrmwRL1xARN/preview";

export function HomeAssessmentComparison() {
  const shouldReduceMotion = useReducedMotion();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (!isVideoModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVideoModalOpen]);

  return (
    <section
      id="assessments"
      className="py-14 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light relative overflow-hidden"
    >
      <div className="ap-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* =========================================================================
            MOBILE VIEW (md:hidden): APPLE-INSPIRED MINIMAL CONVERSION EXPERIENCE
            ========================================================================= */}
        <div className="md:hidden">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-left mb-6"
          >
            {/* 1. Eyebrow: Pure Apple Typographic Minimalism (No bulky pill or green dot) */}
            <div className="text-xs font-mono font-bold tracking-widest text-[#64748B] uppercase mb-2.5">
              CAREER ASSESSMENT
            </div>

            {/* 2. Dominant Headline with Campus Role Gradient Italic Flourish */}
            <h2 className="text-[32px] min-[390px]:text-[36px] font-sans font-extrabold text-[#081F38] tracking-tight leading-[1.12]">
              Find your right healthcare career <br />
              <span className="font-serif italic font-medium bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                in 6 minutes.
              </span>
            </h2>

            {/* 3. Supporting Copy: Structured Assessment */}
            <p className="mt-3 text-[14.5px] text-[#475569] leading-relaxed">
              A structured assessment to identify your role fit, skill gaps, and job readiness in healthcare.
            </p>

            {/* 4. Three Compact Benefit Indicators in One Horizontal Row */}
            <div className="grid grid-cols-3 gap-2.5 my-6 text-center">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-2xs tone-light card-light">
                <span className="block text-xl font-extrabold text-[#081F38] tracking-tight">6 min</span>
                <span className="block text-[11px] font-medium text-[#64748B] mt-0.5">Assessment</span>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-2xs tone-light card-light">
                <span className="block text-xl font-extrabold text-[#081F38] tracking-tight">4+</span>
                <span className="block text-[11px] font-medium text-[#64748B] mt-0.5">Career domains</span>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-2xs tone-light card-light">
                <span className="block text-xl font-extrabold text-[#081F38] tracking-tight">1</span>
                <span className="block text-[11px] font-medium text-[#64748B] mt-0.5">Personal report</span>
              </div>
            </div>

            {/* 5. Primary CTA (Black, 56px high, full width) + Secondary Video Action */}
            <div className="flex flex-col gap-3">
              <Link
                to="/career-assessment"
                data-fab-avoid
                data-testid="mobile-primary-assessment-cta"
                className="w-full h-14 inline-flex items-center justify-center gap-2 rounded-full bg-[#081F38] hover:bg-[#1557D6] active:bg-[#1E40AF] text-white px-7 text-[15.5px] font-bold shadow-md shadow-slate-900/10 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#081F38] hover:text-[#2563EB] py-2 cursor-pointer transition-colors"
                aria-label="See how the career assessment works (1 minute video)"
              >
                <div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                  <Play className="h-3 w-3 fill-[#2563EB] ml-0.5" />
                </div>
                <span>See how it works (1 min)</span>
              </button>
            </div>

            {/* 6. Trust Micro-Row */}
            <div className="flex items-center justify-center gap-3 pt-3 text-[11px] font-medium text-[#64748B]">
              <span className="inline-flex items-center gap-1 font-semibold text-[#081F38]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                100% Free
              </span>
              <span>•</span>
              <span>No Credit Card</span>
              <span>•</span>
              <span>Instant PDF</span>
            </div>
          </motion.div>

          {/* 7. Streamlined Dossier Outcome Card (Progressive Disclosure) */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm tone-light card-light overflow-hidden mt-7 text-left">
            <div className="bg-gradient-to-r from-[#081F38] via-[#0D2847] to-[#1E3A8A] px-4 py-3 flex items-center justify-between text-white">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                DIAGNOSTIC DOSSIER PREVIEW
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#081F38] shadow-2xs tone-light card-light">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                ARZ-2026
              </span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center h-13 w-13 rounded-full border-4 border-emerald-500 bg-emerald-50/50 shrink-0">
                    <span className="font-extrabold text-base text-[#081F38]">94%</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-[#64748B] uppercase">Primary Archetype</span>
                    <span className="block text-xs sm:text-sm font-bold text-[#081F38]">Clinical Data &amp; Safety</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold text-[#64748B] uppercase">Starting CTC</span>
                  <span className="block text-xs sm:text-sm font-bold text-[#10B981]">₹3.80 – ₹5.50 LPA</span>
                </div>
              </div>

              {/* 4 Mini Progress Bars */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#081F38] mb-1">
                    <span>Pharmacovigilance</span>
                    <span className="text-[#2563EB]">94%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-full" style={{ width: "94%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#081F38] mb-1">
                    <span>Clinical Data Management</span>
                    <span className="text-[#0284C7]">88%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0284C7] to-[#0369A1] rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#081F38] mb-1">
                    <span>Medical Coding</span>
                    <span className="text-[#10B981]">82%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#081F38] mb-1">
                    <span>Clinical SAS</span>
                    <span className="text-[#7C3AED]">76%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-full" style={{ width: "76%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP VIEW (hidden md:block): COMPREHENSIVE DUAL-BENTO SHOWCASE
            ========================================================================= */}
        <div className="hidden md:block">
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

              {/* 3 Numbered Steps / Pillars: High-Impact Visual Badges */}
              <div className="space-y-3">
                {/* Pillar 01 */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-[#EEF6FF] border border-[#BFDBFE] text-[#1D4ED8] flex items-center justify-center shrink-0 shadow-2xs">
                      <BarChart3 className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">Role Compatibility Fit</h4>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EEF6FF] border border-[#BFDBFE] text-[10.5px] font-mono font-semibold text-[#1D4ED8]">PV 94%</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F0F9FF] border border-[#BAE6FD] text-[10.5px] font-mono font-semibold text-[#0284C7]">CDM 88%</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[10.5px] font-mono font-semibold text-[#10B981]">Coding 82%</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F5F3FF] border border-[#DDD6FE] text-[10.5px] font-mono font-semibold text-[#7C3AED]">SAS 76%</span>
                      </div>
                    </div>
                  </div>
                  <span className="h-6 w-6 rounded-lg bg-[#EEF6FF] text-[#1D4ED8] font-mono font-bold text-[11px] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                    01
                  </span>
                </div>

                {/* Pillar 02 */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#DDD6FE] transition-colors">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] text-[#7C3AED] flex items-center justify-center shrink-0 shadow-2xs">
                      <Layers className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">Verified Skill Gap Audit</h4>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10.5px] font-mono font-medium text-slate-700">Argus Safety</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10.5px] font-mono font-medium text-slate-700">MedDRA v26</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10.5px] font-mono font-medium text-slate-700">Rave EDC</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10.5px] font-mono font-medium text-slate-700">ICD-10-CM</span>
                      </div>
                    </div>
                  </div>
                  <span className="h-6 w-6 rounded-lg bg-[#F5F3FF] text-[#7C3AED] font-mono font-bold text-[11px] flex items-center justify-center shrink-0 border border-[#DDD6FE]/60">
                    02
                  </span>
                </div>

                {/* Pillar 03 */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#A7F3D0] transition-colors">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center shrink-0 shadow-2xs">
                      <Calendar className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">12-Week Roadmap &amp; CTC Band</h4>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-[#059669]">
                          <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                          ₹3.80 – ₹5.50 LPA
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10.5px] font-mono font-medium text-slate-600">Personalized PDF</span>
                      </div>
                    </div>
                  </div>
                  <span className="h-6 w-6 rounded-lg bg-[#ECFDF5] text-[#059669] font-mono font-bold text-[11px] flex items-center justify-center shrink-0 border border-[#A7F3D0]/60">
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
                  className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-[#081F38] hover:bg-[#1557D6] text-white px-6 text-sm sm:text-base font-bold shadow-md shadow-slate-900/10 transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer"
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

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#081F38] hover:text-[#2563EB] pt-1 transition-colors cursor-pointer"
                  aria-label="See how the career assessment works (1 minute video)"
                >
                  <div className="h-5 w-5 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                    <Play className="h-2.5 w-2.5 fill-[#2563EB] ml-0.5" />
                  </div>
                  <span>See how it works (1 min)</span>
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
            <div className="bg-gradient-to-r from-[#081F38] via-[#0D2847] to-[#1E3A8A] px-6 py-3.5 flex items-center justify-between text-white">
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
                        <div className="h-full bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] rounded-full transition-all duration-1000" style={{ width: "94%" }} />
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
      </div>

      {/* ─── Video Embed Modal Dialog (Apple Cinema Style) ─── */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How the assessment works video"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#081F38] text-white">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 fill-white text-white" />
                <span className="text-xs font-bold font-mono tracking-wider uppercase">
                  How Career Assessment Works (1 Min)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={ASSESSMENT_VIDEO_URL}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Career Assessment Walkthrough"
              />
            </div>
            <div className="px-4 sm:px-5 py-2.5 bg-[#081F38] flex items-center justify-between text-xs text-slate-300">
              <span className="text-[11px] sm:text-xs text-slate-400">Arzon Diagnostic Dossier Walkthrough</span>
              <a
                href={ASSESSMENT_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/90 hover:text-white font-semibold underline underline-offset-2"
              >
                <span>Open in Drive</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
