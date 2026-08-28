import React, { useState } from "react";
import {
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Code,
  Award,
  Send,
  CheckCircle2,
  Clock,
  Briefcase,
  FileCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { TRANSITION_PRESETS } from "@/components/motion/motion-tokens";
import { GOOGLE_FORM_URL } from "./constants";

interface StepItem {
  num: string;
  title: string;
  shortDesc: string;
  detailTitle: string;
  detailDesc: string;
  highlights: string[];
  badgeText: string;
  slaText: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  {
    num: "01",
    title: "Register",
    shortDesc: "Basic details in under 2 minutes.",
    detailTitle: "Step 01: Quick & Free Registration",
    detailDesc:
      "Fill out your basic candidate profile. No lengthy cover letters, no upfront application fees, and no complex forms.",
    highlights: [
      "Instant profile creation with resume upload",
      "Choose preferred track: Healthcare (PV/MC/CDM) or Tech (AI/ML)",
      "Zero registration charges",
    ],
    badgeText: "2 MIN PROCESS",
    slaText: "Immediate Confirmation",
    icon: UserCheck,
  },
  {
    num: "02",
    title: "Get Profiled",
    shortDesc: "Matched to live enterprise openings.",
    detailTitle: "Step 02: Automated Candidate Profiling",
    detailDesc:
      "Our matching engine evaluates your domain experience, background, and career goals against 100+ live job descriptions from recruiters.",
    highlights: [
      "JD-Mirror skill gap mapping",
      "Personalized cohort readiness report",
      "Dedicated counsellor consultation",
    ],
    badgeText: "AI MATCHING",
    slaText: "24-48 Hour Profiling",
    icon: Code,
  },
  {
    num: "03",
    title: "Get Shortlisted",
    shortDesc: "Profiles move to direct recruiter screening.",
    detailTitle: "Step 03: Fast-Track Recruiter Shortlisting",
    detailDesc:
      "Matching profiles are formatted into verified candidate dossiers and fast-tracked directly to corporate partner desks at Tier-1 Tech Enterprises, Quant Fintechs, and partner CROs.",
    highlights: [
      "Bypasses general ATS black-hole queues",
      "Verified candidate badge attached to profile",
      "Direct recruiter notification",
    ],
    badgeText: "FAST-TRACK",
    slaText: "Direct Desk Review",
    icon: Award,
  },
  {
    num: "04",
    title: "Get Assessed",
    shortDesc: "ASSAY evaluation benchmark threshold.",
    detailTitle: "Step 04: ASSAY Technical Evaluation",
    detailDesc:
      "Complete the 12-week applied curriculum and clear our internal ASSAY (Arzon Science and Skill Assessment for Industry Readiness) benchmark threshold of 75/100.",
    highlights: [
      "5 operational dimensions tested (Reasoning, Comm, Docs, Workflow, Domain)",
      "HackerRank & real clinical capstone datasets",
      "ISO 9001:2015 competency grading",
    ],
    badgeText: "75/100 THRESHOLD",
    slaText: "Weekly Graded Benchmarks",
    icon: Send,
  },
  {
    num: "05",
    title: "Get Hired",
    shortDesc: "Direct partner-desk candidate presentation.",
    detailTitle: "Step 05: Partner Desk Introduction & Hiring",
    detailDesc:
      "Candidates who clear the ASSAY threshold receive direct hiring manager introductions to Tier-1 enterprise recruitment teams with a 7-day fast-track review SLA.",
    highlights: [
      "7-Day fast-track review SLA with partner recruiters",
      "3 confirmed hiring manager calls (Elite Tier)",
      "100% QR-verifiable ISO credential",
    ],
    badgeText: "PARTNER SLA",
    slaText: "7-Day Fast-Track SLA",
    icon: ShieldCheck,
  },
];

/**
 * Section 3B — The Recruiter's Desk (The Hiring System)
 * Rebuilt for 100% high contrast readability, brand palette alignment, and visual polish.
 */
export function HiringSystemBlock() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const activeData = STEPS[activeStep] || STEPS[0];
  const ActiveIcon = activeData.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      id="hiring-system"
      aria-labelledby="hiring-system-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <BlurReveal className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" size="md">
            DIRECT PIPELINE TO TOP EMPLOYERS
          </PremiumChip>
          <h2
            id="hiring-system-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            How It Works:{" "}
            <span className="italic text-[#1B3F8B]">Simple, Fast, Transparent</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-sans font-medium leading-relaxed">
            No confusing steps. No hidden forms. Just your profile, in front of the right hiring managers.
          </p>
        </BlurReveal>

        {/* Dynamic Progress Bar */}
        <div className="hidden md:block w-full bg-stone-300/70 h-2.5 rounded-full overflow-hidden relative shadow-inner border border-stone-300">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1B3F8B] to-teal-600 rounded-full"
            initial={{ width: "20%" }}
            animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* 5-Step Pipeline Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 lg:gap-5 relative"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={s.num}
                variants={itemVariants}
                onClick={() => setActiveStep(idx)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -5, scale: 1.01, transition: { type: "spring", stiffness: 350, damping: 25 } }
                }
                className={`group cursor-pointer rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all duration-300 relative overflow-hidden tone-light card-light ${
                  isActive
                    ? "border-2 border-[#1B3F8B] bg-white shadow-xl ring-4 ring-[#1B3F8B]/10"
                    : "border border-stone-300 bg-white/90 hover:border-[#1B3F8B]/50 hover:bg-white hover:shadow-md"
                }`}
              >
                {/* Top Accent Bar with layoutId */}
                {isActive ? (
                  <motion.div
                    layoutId="activeStepGlow"
                    transition={TRANSITION_PRESETS.springQuick}
                    className="absolute top-0 left-0 right-0 h-1.5 bg-[#1B3F8B]"
                  />
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-transparent group-hover:bg-[#1B3F8B]/30 transition-colors" />
                )}

                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider ${
                        isActive
                          ? "bg-[#1B3F8B] text-white"
                          : "bg-stone-200 text-stone-700 group-hover:bg-[#1B3F8B]/10 group-hover:text-[#1B3F8B]"
                      }`}
                    >
                      STEP {s.num}
                    </span>
                    <div
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-[#1B3F8B] text-white shadow-sm"
                          : "bg-stone-100 text-[#1B3F8B] group-hover:bg-[#1B3F8B]/15"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                    </div>
                  </div>

                  {/* STEP TITLE — 100% High Contrast Crisp Charcoal */}
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] leading-snug tracking-tight">
                    {s.title}
                  </h3>

                  {/* STEP DESCRIPTION — 100% High Contrast Slate */}
                  <p className="text-xs text-stone-600 leading-relaxed font-sans font-normal">
                    {s.shortDesc}
                  </p>
                </div>

                {/* Bottom Stage Indicator */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between font-mono text-[10px] font-bold">
                  <span className={isActive ? "text-[#1B3F8B]" : "text-stone-500 group-hover:text-[#1B3F8B]"}>
                    {isActive ? "ACTIVE STAGE" : `STAGE ${s.num}`}
                  </span>
                  <ArrowRight
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isActive
                        ? "text-[#1B3F8B] translate-x-1"
                        : "text-stone-400 group-hover:translate-x-1 group-hover:text-[#1B3F8B]"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Active Step Spotlight Card */}
        <div className="rounded-3xl border border-stone-300 bg-white tone-light card-light p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#1B3F8B]/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 px-3 py-1 text-xs font-mono font-bold text-[#1B3F8B]">
                  <ActiveIcon className="h-3.5 w-3.5" />
                  <span>{activeData.badgeText}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-stone-500">
                  <Clock className="h-3.5 w-3.5 text-teal-600" />
                  <span>SLA: {activeData.slaText}</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {activeData.detailTitle}
              </h3>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
                {activeData.detailDesc}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                {activeData.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-medium text-stone-800 bg-[#F7F5F0] p-2.5 rounded-xl border border-stone-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Action (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3 border-t lg:border-t-0 lg:border-l border-stone-200 pt-5 lg:pt-0 lg:pl-6">
              <p className="text-xs text-stone-500 font-mono font-semibold text-left lg:text-right">
                Ready to take Step {activeData.num}?
              </p>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] px-6 text-sm font-bold text-white shadow-lg hover:bg-[#153270] transition-all active:scale-[0.98]"
              >
                <span>Start Candidate Application</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
