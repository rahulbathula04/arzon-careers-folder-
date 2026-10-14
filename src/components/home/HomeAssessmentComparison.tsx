import {
  ArrowRight,
  Clock,
  Compass,
  FileCheck,
  FileText,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HomeAssessmentComparison() {
  return (
    <section id="assessments" className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light">
      <div className="ap-shell">
        {/* Apple-style Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
            <Sparkles className="h-3 w-3 text-[#2563EB]" />
            <span>Diagnostic vs. Professional Benchmark</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#081F38] tracking-tight leading-tight">
            Two assessment engines.<br />
            <span className="text-[#2563EB]">One clear path to placement.</span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Discover your best-fit healthcare domain in 6 minutes, then certify audit-ready clinical competence for top employers.
          </p>

          {/* Minimal Step Indicator */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-3.5 py-1 text-[10.5px] font-mono font-semibold text-[#64748B] shadow-2xs tone-light card-light">
            <span className="text-[#2563EB] font-bold">01 · Pre-Enrolment Diagnostic</span>
            <span className="text-slate-300">→</span>
            <span className="text-emerald-800 font-bold">02 · Recruiter Competency Index</span>
          </div>
        </div>

        {/* Apple-style Compact Bento Cards (Reduced Size, High Density) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {/* ════════════════════════════════════════════════════════════════════
              CARD 1: CAREER ASSESSMENT ENGINE (APPLE UI/UX COMPACT BENTO)
          ════════════════════════════════════════════════════════════════════ */}
          <article className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white p-4 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:border-[#2563EB]/40 transition-all duration-300 tone-light card-light group relative overflow-hidden">
            {/* Top Micro Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA]" />

            <div className="space-y-3.5 sm:space-y-4">
              {/* Header Metadata */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  <Compass className="h-3 w-3 text-[#2563EB]" />
                  STEP 01 · FREE DIAGNOSTIC
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#64748B]">
                  <Clock className="h-3 w-3 text-[#2563EB]" />
                  ~6 Minutes
                </span>
              </div>

              {/* Title & Elevator Pitch */}
              <div>
                <h3 className="text-xl sm:text-[22px] font-bold text-[#081F38] tracking-tight group-hover:text-[#2563EB] transition-colors">
                  Career Assessment Engine
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  Discover the healthcare roles that match your degree, practical interests, and clinical aptitude.
                </p>
              </div>

              {/* Apple-style Media Showcase with AI-Generated Visual & Glass Badge */}
              <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] bg-slate-900 group/img">
                <img
                  src="/images/career-assessment-ai.webp"
                  alt="Arzon Career Assessment Engine AI Interface Preview"
                  className="w-full h-36 sm:h-44 object-cover object-center group-hover/img:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Floating Apple Frosted Glass Dossier Pill */}
                <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 rounded-lg backdrop-blur-md bg-white/92 border border-white/80 p-2 sm:p-2.5 shadow-sm flex items-center justify-between gap-2 tone-light card-light">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-mono font-bold text-[10px] sm:text-[11px] shrink-0 shadow-2xs">
                      94%
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] sm:text-xs font-bold text-[#081F38] truncate flex items-center gap-1">
                        Pharmacovigilance Associate
                        <span className="text-[8.5px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1 py-0.2 rounded font-mono">
                          TOP FIT
                        </span>
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] text-[#64748B] truncate">
                        Fresher CTC: <span className="font-semibold text-[#081F38]">₹3.80 – ₹5.20 LPA</span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex text-[9.5px] font-mono font-semibold text-[#2563EB] bg-[#EEF6FF] px-1.5 py-0.5 rounded border border-[#D0E1FD] shrink-0">
                    MedDRA Fit
                  </span>
                </div>
              </div>

              {/* Apple-style Compact 3-Tag Feature Bar (No bulky vertical bullets) */}
              <div className="grid grid-cols-3 gap-1 sm:gap-1.5 pt-1 text-[10px] sm:text-[11px] font-medium text-[#334155]">
                <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">Role Archetype</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">PV, CDM, SAS</span>
                </div>
                <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">Skill Gap Audit</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">Software Tools</span>
                </div>
                <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">12-Wk Plan</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">Action Plan</span>
                </div>
              </div>
            </div>

            {/* Apple-style Action Strip */}
            <div className="pt-3.5 mt-3.5 sm:pt-4 sm:mt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10.5px] sm:text-[11px] font-mono text-[#64748B] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                100% Free · Instant Dossier
              </span>

              <Link
                to="/career-assessment"
                className="w-full sm:w-auto h-11 sm:h-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2 px-5 text-xs font-bold transition-all shadow-2xs hover:shadow-sm active:scale-[0.98]"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>

          {/* ════════════════════════════════════════════════════════════════════
              CARD 2: ACRI™ CERTIFICATION INDEX (APPLE UI/UX COMPACT BENTO)
          ════════════════════════════════════════════════════════════════════ */}
          {/* ════════════════════════════════════════════════════════════════════
              CARD 2: ACRI™ CERTIFICATION INDEX (APPLE UI/UX COMPACT BENTO)
          ════════════════════════════════════════════════════════════════════ */}
          <article className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white p-4 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:border-emerald-500/40 transition-all duration-300 tone-light card-light group relative overflow-hidden">
            {/* Top Micro Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-600 to-teal-400" />

            <div className="space-y-3.5 sm:space-y-4">
              {/* Header Metadata */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  STEP 02 · RECRUITER CREDENTIAL
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#64748B]">
                  <Clock className="h-3 w-3 text-emerald-600" />
                  ~25 Minutes
                </span>
              </div>

              {/* Title & Elevator Pitch */}
              <div>
                <h3 className="text-xl sm:text-[22px] font-bold text-[#081F38] tracking-tight group-hover:text-emerald-700 transition-colors">
                  ACRI™ Certification Index
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  Evaluate and certify audit-ready capability through 40 calibrated clinical scenario simulations.
                </p>
              </div>

              {/* Apple-style Media Showcase with AI-Generated Visual & Glass Badge */}
              <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] bg-slate-900 group/img">
                <img
                  src="/images/acri-certification-ai.webp"
                  alt="Arzon ACRI Clinical Certification Scorecard AI Preview"
                  className="w-full h-36 sm:h-44 object-cover object-center group-hover/img:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Floating Apple Frosted Glass Scorecard Pill */}
                <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 rounded-lg backdrop-blur-md bg-white/92 border border-white/80 p-2 sm:p-2.5 shadow-sm flex items-center justify-between gap-2 tone-light card-light">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-mono font-bold text-[10px] sm:text-[10.5px] shrink-0 shadow-2xs">
                      91
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] sm:text-xs font-bold text-[#081F38] truncate flex items-center gap-1">
                        Tier-1 Workplace Certified
                        <span className="text-[8.5px] bg-[#081F38] text-white px-1 py-0.2 rounded font-mono">
                          TOP 5%
                        </span>
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] text-[#64748B] truncate">
                        Calibrated: <span className="font-semibold text-emerald-900">ICH E2B(R3) & MedDRA</span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex text-[9.5px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                    Audit-Ready
                  </span>
                </div>
              </div>

              {/* Apple-style Compact 3-Tag Feature Bar (No bulky vertical bullets) */}
              <div className="grid grid-cols-3 gap-1 sm:gap-1.5 pt-1 text-[10px] sm:text-[11px] font-medium text-[#334155]">
                <div className="rounded-lg bg-emerald-50/50 border border-emerald-200/60 px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">40 Live Cases</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">Triage & Coding</span>
                </div>
                <div className="rounded-lg bg-emerald-50/50 border border-emerald-200/60 px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">Benchmarked</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">Percentile Rank</span>
                </div>
                <div className="rounded-lg bg-emerald-50/50 border border-emerald-200/60 px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">CRO Visibility</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">Fast-Track</span>
                </div>
              </div>
            </div>

            {/* Apple-style Action Strip */}
            <div className="pt-3.5 mt-3.5 sm:pt-4 sm:mt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10.5px] sm:text-[11px] font-mono text-[#64748B] flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-slate-400 shrink-0" />
                Invite or Prerequisite Required
              </span>

              <Link
                to="/acri"
                className="w-full sm:w-auto h-11 sm:h-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-[#081F38] py-2 px-5 text-xs font-bold transition-all shadow-2xs hover:border-slate-400 tone-light card-light active:scale-[0.98]"
              >
                <span>Learn About ACRI™</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
