import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Target, ArrowRight, MessageCircle } from "lucide-react";
import {
  HSBC_SALARY_RANGE,
  JPMORGAN_SALARY_RANGE,
  AIML_COHORT_CAP,
  GCC_JOBS_2026,
  AI_TALENT_GAP,
  COUNSELLOR_PHONE,
  HSBC_JOB_CITIES,
} from "./constants";
import { trackEvent } from "@/lib/analytics";

/**
 * HSBCSalaryOutcomeStrip — Rebuilt to match Arzon's signature UI/UX & editorial light style.
 * Uses clean white paper cards, slate typography, verified badges, and refined color accents.
 */

const OUTCOMES = [
  {
    icon: TrendingUp,
    label: "HSBC AI/ML Engineer",
    value: HSBC_SALARY_RANGE,
    sub: "Starting salary · Fresher · Pan India",
    cardBg: "bg-gradient-to-b from-red-50/50 via-white to-white border-red-200/90",
    badgeBg: "bg-red-100 text-[#CC0000]",
    labelColor: "text-red-900",
    valColor: "text-[#CC0000]",
  },
  {
    icon: TrendingUp,
    label: "JPMorgan Chase SWE",
    value: JPMORGAN_SALARY_RANGE,
    sub: "Starting salary · Fresher · India GCC",
    cardBg: "bg-gradient-to-b from-blue-50/50 via-white to-white border-blue-200/90",
    badgeBg: "bg-blue-100 text-[#2563EB]",
    labelColor: "text-blue-900",
    valColor: "text-[#2563EB]",
  },
  {
    icon: Zap,
    label: "GenAI Salary Premium",
    value: "+30–60%",
    sub: "Over adjacent roles · India 2026 data",
    cardBg: "bg-gradient-to-b from-amber-50/50 via-white to-white border-amber-200/90",
    badgeBg: "bg-amber-100 text-amber-800",
    labelColor: "text-amber-900",
    valColor: "text-amber-800",
  },
  {
    icon: Target,
    label: "AI Talent Gap",
    value: AI_TALENT_GAP,
    sub: "Acute shortage of qualified engineers.",
    cardBg: "bg-gradient-to-b from-emerald-50/50 via-white to-white border-emerald-200/90",
    badgeBg: "bg-emerald-100 text-emerald-800",
    labelColor: "text-emerald-900",
    valColor: "text-emerald-800",
  },
];

const MARKET_FACTS = [
  { value: GCC_JOBS_2026, label: "New GCC jobs in India in 2026" },
  { value: "64%", label: "Of GCC roles need AI / data skills" },
  { value: "230,000+", label: "Data science professionals needed" },
  { value: AIML_COHORT_CAP.toString(), label: "Seats in this cohort (real cap)" },
];

const itemFade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export function HSBCSalaryOutcomeStrip() {
  return (
    <section
      id="salary-outcomes"
      aria-labelledby="salary-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#F8FAFC] to-white border-y border-slate-200/80"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex flex-col items-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">
              VERIFIED MARKET DATA · INDIA 2026
            </p>
            <div className="h-0.5 w-10 bg-[#CC0000]/70 mt-1 rounded-full" />
          </div>
          <h2
            id="salary-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-[1.15]"
          >
            What this cohort is{" "}
            <span className="italic text-[#CC0000]">actually worth.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5B6472] leading-relaxed max-w-2xl mx-auto">
            Grounded in India Skills Report 2026 &amp; GCC hiring tracker data from live banking hiring pipelines.
          </p>
        </div>

        {/* Salary Outcome Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {OUTCOMES.map((o) => (
            <motion.div
              key={o.label}
              variants={itemFade}
              className={`rounded-3xl border p-6 space-y-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 ${o.cardBg}`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${o.badgeBg}`}>
                <o.icon className="h-5 w-5" />
              </div>
              <div>
                <p className={`font-mono text-[10px] font-bold uppercase tracking-wider ${o.labelColor}`}>
                  {o.label}
                </p>
                <p className={`font-serif text-2xl sm:text-3xl font-bold mt-1 tracking-tight ${o.valColor}`}>
                  {o.value}
                </p>
                <p className="text-xs text-[#5B6472] mt-1.5 leading-snug font-medium">{o.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Market Stats Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white tone-light overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 divide-y lg:divide-y-0">
            {MARKET_FACTS.map((f) => (
              <div key={f.label} className="px-6 py-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#151C2E] tabular-nums tracking-tight">
                  {f.value}
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#707C90] mt-1.5">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cities strip */}
        <div className="text-center space-y-1.5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#707C90]">
            HSBC AI/ML HIRING CITIES
          </p>
          <p className="text-sm font-bold text-[#151C2E]">{HSBC_JOB_CITIES}</p>
        </div>

        {/* CTA Banner */}
        <div className="tone-dark surface-island-dark rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-slate-100 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-base sm:text-lg font-bold text-slate-50">
              {AIML_COHORT_CAP} seats. One cohort. Starts 30 August 2026.
            </p>
            <p className="text-xs sm:text-sm text-slate-300">
              Apply now to secure your seat before intake closes for this batch.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                "Hi Arzon — I want to join the HSBC AI/ML cohort. Can you share more details?",
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("salary_strip_whatsapp_click")}
              className="h-11 px-5 flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>Ask a Question</span>
            </a>
            <Link
              to="/apply"
              onClick={() => trackEvent("salary_strip_cta_click")}
              className="h-11 px-6 flex items-center gap-2 text-sm font-bold text-slate-50 bg-[#CC0000] hover:bg-[#b91c1c] rounded-xl shadow-lg shadow-red-900/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply for HSBC Cohort</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="text-center text-[10px] font-mono text-[#707C90]">
          Salary data: India Skills Report 2026 · GCC Hiring Tracker H1 2026 · Naukri / LinkedIn live JD analysis.
          No placement guarantee. ASCI guidelines apply.
        </p>
      </div>
    </section>
  );
}
