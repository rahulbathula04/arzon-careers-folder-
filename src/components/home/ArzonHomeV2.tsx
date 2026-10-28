import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";
import { HomePriorityTracks } from "@/components/home/HomePriorityTracks";
import { HomeAssessmentComparison } from "@/components/home/HomeAssessmentComparison";
import { HomeJourneyRoadmap } from "@/components/home/HomeJourneyRoadmap";
import { HomeEmployerTrustStrip } from "@/components/home/HomeEmployerTrustStrip";
import { HomeInstitutionalTrust } from "@/components/home/HomeInstitutionalTrust";
import { CareerEngineLeaderboard } from "@/components/home/CareerEngineLeaderboard";
import { HomeLearnerFeedback } from "@/components/home/HomeLearnerFeedback";
import { HomeClosingBanner } from "@/components/home/HomeClosingBanner";
import { openCounsellorModal } from "@/components/system/CounsellorLeadModal";

const HERO_PROGRAMS = [
  "Pharmacovigilance (PV)",
  "Clinical Data Management (CDM)",
  "Clinical Research (CRC/CRA)",
  "Regulatory Affairs (RA)",
  "Medical Writing",
  "Health Informatics",
  "QA / QC Validation",
];

export function ArzonHomeV2() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="arzon-premium-home bg-white tone-light card-light">
      {/* ─── SECTION 1: HERO (HEALTHCARE CAREER READINESS & PREVIEW) ───────────── */}
      <section className="relative overflow-hidden bg-white pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-[#E4EAF2] tone-light card-light">

        {/* Ambient Radial Accent */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.06),rgba(255,255,255,0))] pointer-events-none"
          aria-hidden="true"
        />

        <div className="ap-shell relative z-10">
          <div className="mx-auto flex max-w-5xl xl:max-w-6xl flex-col items-center text-center">
            {/* Clear Healthcare Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 backdrop-blur-xs px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#1D4ED8] shadow-2xs mb-4 sm:mb-6"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="hidden sm:inline">HEALTHCARE CAREER DISCOVERY &amp; SKILL READINESS</span>
              <span className="sm:hidden">HEALTHCARE CAREER DISCOVERY</span>
            </motion.div>

            {/* High-Impact Typography Scale (Strict 2-Line Mobile & Large Screens) */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[25px] min-[375px]:text-[28px] min-[414px]:text-[31px] sm:text-[46px] md:text-[56px] lg:text-[66px] xl:text-[72px] font-extrabold tracking-[-0.03em] text-[#081F38] leading-[1.18] sm:leading-[1.05] max-w-5xl mx-auto mb-4 sm:mb-6 px-3 sm:px-1"
            >
              <span className="block">
                Turn your healthcare degree
              </span>
              <span className="block mt-1.5 sm:mt-2">
                into an{" "}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                  <span className="inline-block">industry-ready</span> <span className="inline-block">career.</span>
                </span>
              </span>
            </motion.h1>

            {/* Arzon Slate Gray Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] sm:text-lg md:text-[19px] text-[#475569] leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 font-normal"
            >
              We analyse real employer job descriptions to identify your exact skill gaps, build practical work samples, and guide you into Pharmacovigilance, CDM, and Regulatory Affairs.
            </motion.p>

            {/* Healthcare Programmes Marquee Ticker Pill */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-1"
            >
              <div className="flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-full border border-[#E2E8F0] bg-white tone-light card-light shadow-2xs overflow-hidden">
                <span className="shrink-0 text-[9.5px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-[#2563EB] bg-[#EEF6FF] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#D0E1FD]">
                  PROGRAMMES
                </span>
                <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <Marquee className="py-0 [--gap:0.75rem] [--duration:28s]" pauseOnHover repeat={4}>
                    {HERO_PROGRAMS.map((prog) => (
                      <span
                        key={prog}
                        className="inline-flex items-center text-[11px] sm:text-xs font-semibold text-[#081F38] bg-[#F8FAFC] hover:bg-[#EEF6FF] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#E2E8F0] transition-colors whitespace-nowrap cursor-default"
                      >
                        {prog}
                      </span>
                    ))}
                  </Marquee>
                </div>
              </div>
            </motion.div>

            {/* Centered Dual CTAs */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 mb-6 sm:mb-8 w-full sm:max-w-none mx-auto px-2 sm:px-0"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto"
              >
                <button
                  type="button"
                  onClick={() => openCounsellorModal({ source: "home_hero_primary" })}
                  data-testid="primary-counsellor-cta"
                  className="w-full sm:w-auto h-12 sm:h-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-[15px] sm:text-base font-bold transition-all shadow-md shadow-blue-600/15 group cursor-pointer active:scale-95"
                >
                  <span>Talk to a counsellor</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/career-assessment"
                  data-testid="secondary-assessment-cta"
                  className="w-full sm:w-auto h-12 sm:h-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#CBD5E1] bg-white tone-light card-light hover:bg-[#F8FAFC] text-[#081F38] px-6 py-3.5 text-[15px] sm:text-base font-bold transition-all shadow-2xs group"
                >
                  <span>Take the free career assessment</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Value Checkpoints: Responsive Wrapped Badges */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 lg:gap-8 pt-2 sm:pt-3 w-full max-w-full sm:max-w-4xl mx-auto px-2"
            >
              {[
                "Real job description insights",
                "Role-specific skill gaps",
                "Practical work samples",
              ].map((text, idx) => (
                <motion.div
                  key={text}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.36 + idx * 0.08 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[14px] font-semibold text-[#1E293B] shrink-0 bg-slate-50 sm:bg-transparent px-2.5 sm:px-0 py-1 sm:py-0 rounded-full border border-slate-200/60 sm:border-0"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#10B981] shrink-0" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: PRIORITY CAREER TRACKS (4-CARD GRID) ────────────────── */}
      <HomePriorityTracks />

      {/* ─── SECTION 3: FROM DIAGNOSTIC TO ROLE READINESS (PV FOCUS) ──────── */}
      <HomeAssessmentComparison />

      {/* ─── SECTION 4: 4-STEP CAREER PATHWAY ─────────────────────────────────── */}
      <HomeJourneyRoadmap />

      {/* ─── SECTION 5: REAL WORK SAMPLES & EMPLOYER REQUIREMENTS ────────────── */}
      <HomeEmployerTrustStrip />

      {/* ─── SECTION 6: INSTITUTIONAL TRUST & GOVERNMENT ALIGNMENT (TASK VIDEO) */}
      <HomeInstitutionalTrust />

      {/* ─── SECTION 7: CANDIDATE HEALTHCARE ROLE READINESS ARENA & LEADERBOARD ─ */}
      <CareerEngineLeaderboard />

      {/* ─── SECTION 8: LEARNER FEEDBACK (OPTION A VERIFIED TESTIMONIALS) ─────── */}
      <HomeLearnerFeedback />

      {/* ─── SECTION 9: CLOSING CTA BANNER ─────────────────────────────────── */}
      <HomeClosingBanner />
    </div>
  );
}
