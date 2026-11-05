import { ArrowRight, Calendar, CheckCircle2, Database, Pill, Shield, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { HomePriorityTracks } from "@/components/home/HomePriorityTracks";
import { HomeAssessmentComparison } from "@/components/home/HomeAssessmentComparison";
import { HomeJourneyRoadmap } from "@/components/home/HomeJourneyRoadmap";
import { HomeEmployerTrustStrip } from "@/components/home/HomeEmployerTrustStrip";
import { HomeInstitutionalTrust } from "@/components/home/HomeInstitutionalTrust";
import { CareerEngineLeaderboard } from "@/components/home/CareerEngineLeaderboard";
import { HomeLearnerFeedback } from "@/components/home/HomeLearnerFeedback";
import { HomeIndustryNetworkSection } from "@/components/home/HomeIndustryNetworkSection";
import { HomeClosingBanner } from "@/components/home/HomeClosingBanner";
import { openCounsellorModal } from "@/components/system/CounsellorLeadModal";

export function ArzonHomeV2() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="arzon-premium-home bg-white tone-light card-light">
      {/* ─── SECTION 1: HERO (HEALTHCARE CAREER DISCOVERY & SKILL READINESS) ───── */}
      <section className="relative overflow-hidden bg-white pt-6 sm:pt-14 pb-10 sm:pb-20 border-b border-[#E4EAF2] tone-light card-light">
        {/* Ambient Radial Accent */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.06),rgba(255,255,255,0))] pointer-events-none"
          aria-hidden="true"
        />

        <div className="ap-shell relative z-10">
          <div className="max-w-xl sm:max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-start text-left sm:items-center sm:text-center px-1 sm:px-4">
            {/* 1. Healthcare Career Discovery Eyebrow Pill */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF] px-3.5 sm:px-4 py-1.5 text-xs font-semibold text-[#1D4ED8] shadow-2xs mb-4 sm:mb-6"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>Healthcare Career Discovery</span>
            </motion.div>

            {/* 2. High-Impact Headline */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[34px] min-[390px]:text-[38px] sm:text-[50px] md:text-[60px] lg:text-[68px] font-extrabold tracking-[-0.03em] text-[#081F38] leading-[1.12] sm:leading-[1.08] mb-3.5 sm:mb-5"
            >
              <span className="block">From Healthcare</span>
              <span className="block">Graduate to</span>
              <span className="block text-[#2563EB]">Industry Ready</span>
            </motion.h1>

            {/* 3. Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] sm:text-lg text-[#475569] leading-relaxed max-w-xl mb-5 sm:mb-7 font-normal"
            >
              Practical training, real projects and internships in high-demand healthcare roles.
            </motion.p>

            {/* 4. Three Track Pills (Pharmacovigilance, CDM, Regulatory Affairs) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-wrap items-center justify-start sm:justify-center gap-2 mb-6 sm:mb-8 w-full"
            >
              <Link
                to="/pv-associate"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#F8FAFC] hover:bg-[#EEF6FF] hover:border-[#BFDBFE] px-3.5 py-1.5 text-xs font-semibold text-[#081F38] transition-colors shadow-2xs"
              >
                <Pill className="h-3.5 w-3.5 text-[#2563EB] rotate-45" />
                <span>Pharmacovigilance</span>
              </Link>
              <Link
                to={"/courses/clinical-data-management" as any}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#F8FAFC] hover:bg-[#EEF6FF] hover:border-[#BFDBFE] px-3.5 py-1.5 text-xs font-semibold text-[#081F38] transition-colors shadow-2xs"
              >
                <Database className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>CDM</span>
              </Link>
              <Link
                to={"/courses/regulatory-affairs" as any}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#F8FAFC] hover:bg-[#EEF6FF] hover:border-[#BFDBFE] px-3.5 py-1.5 text-xs font-semibold text-[#081F38] transition-colors shadow-2xs"
              >
                <Shield className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>Regulatory Affairs</span>
              </Link>
            </motion.div>

            {/* 5. CTAs: Primary Explore My Career Path + Secondary WhatsApp Talk to Experts */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start sm:justify-center gap-3 w-full sm:w-auto mb-6 sm:mb-8"
            >
              {/* Primary Visual CTA */}
              <Link
                to="/career-assessment"
                data-testid="primary-career-intelligence-cta"
                className="w-full sm:w-auto h-12.5 sm:h-13 inline-flex items-center justify-center gap-2 rounded-full bg-[#081F38] hover:bg-[#1557D6] text-white px-7 text-[15px] sm:text-base font-bold shadow-md shadow-slate-900/10 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Explore My Career Path</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Secondary Visual CTA (WhatsApp Talk to Experts) */}
              <button
                type="button"
                onClick={() => openCounsellorModal({ source: "home_hero_expert" })}
                data-testid="secondary-expert-cta"
                className="w-full sm:w-auto h-12.5 sm:h-13 inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#081F38] px-7 text-[15px] sm:text-base font-bold shadow-2xs active:scale-[0.98] transition-all cursor-pointer tone-light card-light whitespace-nowrap"
              >
                <svg className="h-5 w-5 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-10.416c-5.522 0-10 4.477-10 10 0 1.76.459 3.414 1.261 4.862l-1.34 4.898 5.023-1.317c1.405.766 3.008 1.197 4.71 1.197 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10z" />
                </svg>
                <span>Talk to Experts</span>
              </button>
            </motion.div>

            {/* 6. Cohort Information Metadata Row (Application Deadline & Cohort Starts) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="w-full max-w-xl pt-5 sm:pt-6 border-t border-slate-100 flex items-center justify-between sm:justify-center sm:gap-10"
            >
              {/* Application Deadline */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[#EEF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="text-left">
                  <span className="block text-[10.5px] sm:text-[11px] font-medium text-[#64748B] leading-tight">
                    Application Deadline
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-[#081F38] mt-0.5">
                    4 November 2026
                  </span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="h-8 w-px bg-slate-200 shrink-0" aria-hidden="true" />

              {/* Cohort Starts */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[#EEF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="text-left">
                  <span className="block text-[10.5px] sm:text-[11px] font-medium text-[#64748B] leading-tight">
                    Cohort Starts
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-[#081F38] mt-0.5">
                    11 November 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: PRIORITY CAREER TRACKS (4-CARD GRID) ────────────────── */}
      <HomePriorityTracks />

      {/* ─── SECTION 3: INSTITUTIONAL CAREER ASSESSMENT ENGINE SHOWCASE ──────── */}
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

      {/* ─── SECTION 8.5: ARZON GLOBAL INDUSTRY NETWORK PROGRAMME ──────────── */}
      <HomeIndustryNetworkSection />

      {/* ─── SECTION 9: CLOSING CTA BANNER ─────────────────────────────────── */}
      <HomeClosingBanner />
    </div>
  );
}
