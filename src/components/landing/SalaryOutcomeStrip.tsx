import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TrendingUp, BarChart2, Zap, ArrowRight, MessageCircle, Users } from "lucide-react";
import {
  ENTERPRISE_SALARY_RANGE,
  QUANT_FINTECH_SALARY_RANGE,
  AIML_COHORT_CAP,
  GCC_JOBS_2026,
  COUNSELLOR_PHONE,
  ENTERPRISE_JOB_CITIES,
} from "./constants";
import { trackEvent } from "@/lib/analytics";

/**
 * SalaryOutcomeStrip — Rebuilt for Tier-1 Enterprise Tech & Quant Financial AI.
 * Uses clean white paper cards, slate typography, verified badges, and refined color accents.
 */

const OUTCOMES = [
  {
    icon: TrendingUp,
    label: "Enterprise AI/ML Engineer",
    value: ENTERPRISE_SALARY_RANGE,
    sub: "Starting salary · Fresher · Pan India",
    cardBg: "bg-gradient-to-b from-blue-50/50 via-white to-white border-blue-200/90",
    badgeBg: "bg-blue-100 text-[#2563EB]",
    labelColor: "text-blue-900",
    valColor: "text-[#2563EB]",
  },
  {
    icon: BarChart2,
    label: "Quant Fintech Developer",
    value: QUANT_FINTECH_SALARY_RANGE,
    sub: "Starting salary · Fresher · India GCC",
    cardBg: "bg-gradient-to-b from-blue-50/50 via-white to-white border-blue-200/90",
    badgeBg: "bg-blue-100 text-[#2563EB]",
    labelColor: "text-blue-900",
    valColor: "text-[#2563EB]",
  },
  {
    icon: Zap,
    label: "GenAI Skill Premium",
    value: "+30% to 60%",
    sub: "Over traditional software roles",
    cardBg: "bg-gradient-to-b from-amber-50/50 via-white to-white border-amber-200/90",
    badgeBg: "bg-amber-100 text-amber-800",
    labelColor: "text-amber-900",
    valColor: "text-amber-700",
  },
  {
    icon: Users,
    label: "India GCC Talent Deficit",
    value: "10 : 1",
    sub: "Open GenAI roles per qualified engineer",
    cardBg: "bg-gradient-to-b from-emerald-50/50 via-white to-white border-emerald-200/90",
    badgeBg: "bg-emerald-100 text-emerald-800",
    labelColor: "text-emerald-900",
    valColor: "text-emerald-700",
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

export function SalaryOutcomeStrip() {
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
              LIVE GCC HIRING MARKET DATA · INDIA 2026
            </p>
            <div className="h-0.5 w-10 bg-[#2563EB]/70 mt-1 rounded-full" />
          </div>
          <h2
            id="salary-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-[1.15]"
          >
            Why enterprise tech roles are India's highest-paying fresh jobs.{" "}
            <span className="italic text-[#2563EB]">{ENTERPRISE_SALARY_RANGE} in Enterprise. {QUANT_FINTECH_SALARY_RANGE} in Quant Fintech.</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Global Capability Centres (GCCs) in India pay premium packages to engineers who can ship production ML pipelines and financial analytics.
          </p>
        </div>

        {/* 4 Outcome Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {OUTCOMES.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={itemFade}
                className={`rounded-2xl border p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow ${card.cardBg}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`p-2.5 rounded-xl ${card.badgeBg}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    GCC METRIC
                  </span>
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${card.labelColor}`}>{card.label}</h3>
                  <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${card.valColor}`}>
                    {card.value}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-snug">{card.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Market Facts Bar */}
        <div className="rounded-2xl bg-[#0F172A] text-white p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {MARKET_FACTS.map((fact, idx) => (
              <div key={fact.label} className={`space-y-1 ${idx > 0 ? "pt-4 md:pt-0" : ""}`}>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] tracking-tight">
                  {fact.value}
                </div>
                <div className="text-xs text-slate-400 font-medium px-2">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Locations & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-blue-50/60 border border-blue-100">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-semibold text-blue-950 uppercase tracking-wider">
              Primary Hiring Locations Across India
            </div>
            <div className="text-sm font-medium text-slate-700">{ENTERPRISE_JOB_CITIES}</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/courses"
              onClick={() => trackEvent("salary_strip_explore_click")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
            >
              Explore Programmes <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent("Hi, I want to check salary outcome benchmarks for Tier-1 Enterprise Tech roles.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("salary_strip_whatsapp_click")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white tone-light border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> Counsellor Q&A
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

