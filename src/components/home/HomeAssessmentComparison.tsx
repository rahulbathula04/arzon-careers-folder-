import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

export function HomeAssessmentComparison() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="assessments" className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light">
      <div className="ap-shell">
        {/* Compact Pathway Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
            <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
            <span>CAREER READINESS PATHWAY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#081F38] tracking-tight leading-tight">
            From Free Diagnostic to<br />
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              Industry-Ready Outcome.
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Assess your qualifications and skill gaps in 6 minutes, then build verified proof of readiness for high-demand Pharmacovigilance careers.
          </p>

          {/* Step Indicator */}
          <div className="mt-4 inline-flex items-center gap-1.5 xs:gap-2 rounded-full bg-white border border-[#E2E8F0] px-3 xs:px-3.5 py-1 text-[10px] xs:text-[10.5px] font-mono font-semibold text-[#64748B] shadow-2xs tone-light card-light max-w-full">
            <span className="xs:hidden font-bold text-[#2563EB]">01 Diagnostic</span>
            <span className="hidden xs:inline text-[#2563EB] font-bold">01 · Free Clinical Diagnostic</span>
            <span className="text-slate-300">→</span>
            <span className="xs:hidden font-bold text-[#081F38]">02 PV Track</span>
            <span className="hidden xs:inline text-[#081F38] font-bold">02 · Practical Pharmacovigilance Track</span>
          </div>
        </motion.div>

        {/* 2 Bento Cards: Free Diagnostic + Flagship Outcome */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {/* ════════════════════════════════════════════════════════════════════
              CARD 1: CAREER ASSESSMENT ENGINE (FREE DIAGNOSTIC ENTRY POINT)
          ════════════════════════════════════════════════════════════════════ */}
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -6,
                    transition: { type: "spring", stiffness: 350, damping: 25 },
                  }
            }
            className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white p-4 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:border-[#2563EB]/40 transition-colors duration-300 tone-light card-light group relative overflow-hidden"
          >
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

              {/* Media Showcase with Preview & Glass Badge */}
              <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] bg-slate-900 group/img">
                <img
                  src="/images/career-assessment-ai.webp"
                  alt="Arzon Career Assessment Engine Interface Preview"
                  className="w-full h-36 sm:h-44 object-cover object-center group-hover/img:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Floating Frosted Dossier Pill */}
                <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 rounded-lg backdrop-blur-md bg-white/92 border border-white/80 p-2 sm:p-2.5 shadow-sm flex items-center justify-between gap-2 tone-light card-light">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-mono font-bold text-[10px] sm:text-[11px] shrink-0 shadow-2xs">
                      88%
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] sm:text-xs font-bold text-[#081F38] truncate flex items-center gap-1">
                        Pharmacovigilance Associate
                        <span className="text-[8.5px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1 py-0.2 rounded font-mono">
                          SAMPLE FIT
                        </span>
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] text-[#64748B] truncate">
                        Indicative Range: <span className="font-semibold text-[#081F38]">₹3.80 – ₹5.20 LPA</span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex text-[9.5px] font-mono font-semibold text-[#2563EB] bg-[#EEF6FF] px-1.5 py-0.5 rounded border border-[#D0E1FD] shrink-0">
                    Sample Dossier
                  </span>
                </div>
              </div>

              {/* 3-Tag Feature Bar */}
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

            {/* Action Strip */}
            <div className="pt-3.5 mt-3.5 sm:pt-4 sm:mt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10.5px] sm:text-[11px] font-mono text-[#64748B] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                100% Free · Instant Dossier
              </span>

              <Link
                to="/career-assessment"
                className="w-full sm:w-auto h-12 sm:h-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white py-2.5 px-5 text-xs xs:text-[13px] sm:text-xs font-bold transition-all shadow-2xs hover:shadow-sm active:scale-[0.98]"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.article>

          {/* ════════════════════════════════════════════════════════════════════
              CARD 2: PHARMACOVIGILANCE & DRUG SAFETY (FLAGSHIP OUTCOME)
          ════════════════════════════════════════════════════════════════════ */}
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -6,
                    transition: { type: "spring", stiffness: 350, damping: 25 },
                  }
            }
            className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white p-4 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:border-[#1557D6]/40 transition-colors duration-300 tone-light card-light group relative overflow-hidden"
          >
            {/* Top Micro Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1557D6] via-[#0284C7] to-[#2563EB]" />

            <div className="space-y-3.5 sm:space-y-4">
              {/* Header Metadata */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF6FF] border border-[#BFDBFE] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                  <Stethoscope className="h-3 w-3 text-[#1D4ED8]" />
                  STEP 02 · FLAGSHIP ROLE READINESS
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#64748B]">
                  <Clock className="h-3 w-3 text-[#1557D6]" />
                  12 Weeks Practical
                </span>
              </div>

              {/* Title & Elevator Pitch */}
              <div>
                <h3 className="text-xl sm:text-[22px] font-bold text-[#081F38] tracking-tight group-hover:text-[#1557D6] transition-colors">
                  Pharmacovigilance & Drug Safety
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  Master ICSR case processing, MedDRA coding, and safety narratives with real clinical datasets from 2,000+ analyzed job descriptions.
                </p>
              </div>

              {/* Media Showcase with Preview & Glass Badge */}
              <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] bg-slate-900 group/img">
                <img
                  src="/images/pv-clinical-workstation.jpg"
                  alt="Arzon Pharmacovigilance Case Processing Workstation"
                  className="w-full h-36 sm:h-44 object-cover object-center group-hover/img:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Floating Frosted Scorecard Pill */}
                <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 rounded-lg backdrop-blur-md bg-white/92 border border-white/80 p-2 sm:p-2.5 shadow-sm flex items-center justify-between gap-2 tone-light card-light">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#1557D6] text-white flex items-center justify-center font-mono font-bold text-[10px] sm:text-[10.5px] shrink-0 shadow-2xs">
                      PV
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] sm:text-xs font-bold text-[#081F38] truncate flex items-center gap-1">
                        ICSR Triage & Case Processing
                        <span className="text-[8.5px] bg-[#EEF6FF] text-[#1D4ED8] border border-[#BFDBFE] px-1 py-0.2 rounded font-mono">
                          AUDIT READY
                        </span>
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] text-[#64748B] truncate">
                        Tools: <span className="font-semibold text-[#081F38]">Argus Workflows & MedDRA v26</span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex text-[9.5px] font-mono font-semibold text-[#1557D6] bg-[#EEF6FF] px-1.5 py-0.5 rounded border border-[#D0E1FD] shrink-0">
                    Verified Proof
                  </span>
                </div>
              </div>

              {/* 3-Tag Feature Bar */}
              <div className="grid grid-cols-3 gap-1 sm:gap-1.5 pt-1 text-[10px] sm:text-[11px] font-medium text-[#334155]">
                <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">Core Tools</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">Argus, MedDRA</span>
                </div>
                <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">Real Cases</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">ICSR Datasets</span>
                </div>
                <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 sm:px-2 py-1.5 text-center">
                  <span className="block font-bold text-[#081F38] text-[10.5px] sm:text-[11.5px]">Proof Portfolio</span>
                  <span className="text-[9px] sm:text-[10px] text-[#64748B]">Recruiter Ready</span>
                </div>
              </div>
            </div>

            {/* Action Strip */}
            <div className="pt-3.5 mt-3.5 sm:pt-4 sm:mt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10.5px] sm:text-[11px] font-mono text-[#64748B] flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                Practical Industry Curriculum
              </span>

              <Link
                to="/pv-associate"
                className="w-full sm:w-auto h-12 sm:h-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] active:bg-[#F1F5F9] text-[#081F38] py-2.5 px-5 text-xs xs:text-[13px] sm:text-xs font-bold transition-all shadow-2xs hover:border-[#94A3B8] tone-light card-light active:scale-[0.98]"
              >
                <span>Explore PV Track</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#1557D6]" />
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
