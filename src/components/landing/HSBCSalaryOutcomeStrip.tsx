import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Target, ArrowRight, MessageCircle } from "lucide-react";
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
 * HSBCSalaryOutcomeStrip — premium dark outcome strip showing real salary
 * anchors and market demand data. Marketing principle: Anchoring + Aspiration.
 * The JPMorgan ₹14–18 LPA number anchors the highest aspiration; HSBC ₹6–10 LPA
 * is the floor (still compelling). Market data creates urgency: 10 GenAI roles
 * per 1 qualified engineer = FOMO through real scarcity.
 */

const OUTCOMES = [
  {
    icon: TrendingUp,
    label: "HSBC AI/ML Engineer",
    value: HSBC_SALARY_RANGE,
    sub: "Starting salary · Fresher · Pan India",
    color: "red",
  },
  {
    icon: TrendingUp,
    label: "JPMorgan Chase SWE",
    value: JPMORGAN_SALARY_RANGE,
    sub: "Starting salary · Fresher · India GCC",
    color: "blue",
  },
  {
    icon: Zap,
    label: "GenAI Salary Premium",
    value: "+30–60%",
    sub: "Over adjacent roles · India 2026 data",
    color: "amber",
  },
  {
    icon: Target,
    label: "AI Talent Gap",
    value: AI_TALENT_GAP,
    sub: "The demand is there. The supply isn't. Yet.",
    color: "emerald",
  },
];

const MARKET_FACTS = [
  { value: GCC_JOBS_2026, label: "New GCC jobs in India in 2026" },
  { value: "64%", label: "Of GCC roles need AI / data skills" },
  { value: "230,000+", label: "Data science professionals needed" },
  { value: AIML_COHORT_CAP.toString(), label: "Seats in this cohort (real cap)" },
];

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function HSBCSalaryOutcomeStrip() {
  return (
    <section
      id="salary-outcomes"
      aria-labelledby="salary-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B132B] to-[#060A14]"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
            VERIFIED MARKET DATA · INDIA 2026
          </p>
          <h2
            id="salary-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            What this cohort is{" "}
            <span className="italic bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              actually worth.
            </span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Not promises. Not testimonials from 2022. Real 2026 salary data from live GCC hiring
            markets, grounded in India Skills Report 2026 and GCC hiring tracker data.
          </p>
        </div>

        {/* Salary Outcome Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {OUTCOMES.map((o) => (
            <motion.div
              key={o.label}
              variants={itemFade}
              className={`rounded-3xl border p-6 space-y-3 transition-all hover:-translate-y-1 ${
                o.color === "red"
                  ? "border-red-800/60 bg-red-950/30 hover:border-red-600/60"
                  : o.color === "blue"
                  ? "border-blue-800/60 bg-blue-950/30 hover:border-blue-600/60"
                  : o.color === "amber"
                  ? "border-amber-800/60 bg-amber-950/30 hover:border-amber-600/60"
                  : "border-emerald-800/60 bg-emerald-950/30 hover:border-emerald-600/60"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                  o.color === "red"
                    ? "bg-red-600/20 border border-red-500/30"
                    : o.color === "blue"
                    ? "bg-blue-600/20 border border-blue-500/30"
                    : o.color === "amber"
                    ? "bg-amber-600/20 border border-amber-500/30"
                    : "bg-emerald-600/20 border border-emerald-500/30"
                }`}
              >
                <o.icon
                  className={`h-5 w-5 ${
                    o.color === "red"
                      ? "text-red-400"
                      : o.color === "blue"
                      ? "text-blue-400"
                      : o.color === "amber"
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                />
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {o.label}
                </p>
                <p
                  className={`font-serif text-2xl sm:text-3xl font-bold mt-1 ${
                    o.color === "red"
                      ? "text-red-300"
                      : o.color === "blue"
                      ? "text-blue-300"
                      : o.color === "amber"
                      ? "text-amber-300"
                      : "text-emerald-300"
                  }`}
                >
                  {o.value}
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{o.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Market Stats Bar */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-700/50 divide-y lg:divide-y-0">
            {MARKET_FACTS.map((f) => (
              <div key={f.label} className="px-6 py-5 text-center">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {f.value}
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cities strip */}
        <div className="text-center space-y-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            HSBC AI/ML HIRING CITIES
          </p>
          <p className="text-sm font-bold text-slate-300">{HSBC_JOB_CITIES}</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-base font-bold text-white">
              {AIML_COHORT_CAP} seats. One cohort. Starts 30 August 2026.
            </p>
            <p className="text-sm text-slate-400">
              Become one of the {AIML_COHORT_CAP} — apply before the seats fill.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                "Hi Arzon — I want to join the HSBC AI/ML cohort. Can you share more details?",
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("salary_strip_whatsapp_click")}
              className="h-11 px-5 flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>Ask a Question</span>
            </a>
            <Link
              to="/apply"
              onClick={() => trackEvent("salary_strip_cta_click")}
              className="h-11 px-6 flex items-center gap-2 text-sm font-bold text-white bg-[#CC0000] hover:bg-[#b91c1c] rounded-xl shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Secure My Seat</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="text-center text-[10px] font-mono text-slate-600">
          Salary data: India Skills Report 2026 · GCC Hiring Tracker H1 2026 · Naukri / LinkedIn live JD analysis.
          No placement guarantee. ASCI guidelines apply.
        </p>
      </div>
    </section>
  );
}
