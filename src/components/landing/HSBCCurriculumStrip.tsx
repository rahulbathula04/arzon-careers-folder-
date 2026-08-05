import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageCircle, Flame, Users } from "lucide-react";
import { COUNSELLOR_PHONE, AIML_COHORT_CAP, HSBC_SALARY_RANGE, JPMORGAN_SALARY_RANGE } from "./constants";
import { trackEvent } from "@/lib/analytics";

/**
 * HSBCCurriculumStrip — maps the HSBC AI/ML Engineer Fresher JD line-by-line
 * to Arzon's 12-week curriculum. This is the highest-converting section:
 * "We built this around their exact brief." Marketing principle: IKEA Effect +
 * Transparency + Specificity over Vagueness.
 */

type CurriculumRow = {
  week: string;
  hsbcRequires: string;
  arzonDelivers: string;
  artifact: string;
};

const CURRICULUM_ROWS: CurriculumRow[] = [
  {
    week: "Wk 1–2",
    hsbcRequires: "Python programming proficiency + OOP concepts",
    arzonDelivers: "Python Foundations: data types, functions, OOP, list comprehensions",
    artifact: "Python assignment log",
  },
  {
    week: "Wk 3–4",
    hsbcRequires: "ML algorithms understanding + Statistics & Mathematics",
    arzonDelivers: "Scikit-learn: regression, classification, model evaluation + NumPy/Pandas",
    artifact: "Kaggle notebook (public)",
  },
  {
    week: "Wk 5–6",
    hsbcRequires: "TensorFlow + PyTorch + Deep Learning",
    arzonDelivers: "Deep Learning Bootcamp: CNNs, ANNs, transfer learning, model training",
    artifact: "DL model GitHub repo",
  },
  {
    week: "Wk 7",
    hsbcRequires: "NLP Libraries: NLTK, SpaCy",
    arzonDelivers: "NLP Track: text preprocessing, sentiment analysis, named entity recognition",
    artifact: "NLP project (hosted demo)",
  },
  {
    week: "Wk 8",
    hsbcRequires: "Generative AI fundamentals + Prompt Engineering",
    arzonDelivers: "GenAI & LangChain Sprint: RAG pipelines, LLM APIs, prompt optimization",
    artifact: "LLM capstone project",
  },
  {
    week: "Wk 9",
    hsbcRequires: "Azure AI or AWS AI (basic knowledge)",
    arzonDelivers: "Azure AI-900 exam prep + cloud AI fundamentals, deployment basics",
    artifact: "AI-900 certification",
  },
  {
    week: "Wk 10",
    hsbcRequires: "SQL + REST APIs + Data Structures & Algorithms",
    arzonDelivers: "Data Engineering Sprint: SQL queries, API calls with Python, DSA prep",
    artifact: "SQL portfolio + API project",
  },
  {
    week: "Wk 11",
    hsbcRequires: "Technical Assessment (coding round — HackerRank format)",
    arzonDelivers: "3 × mock HackerRank rounds, timed. HSBC-style coding questions reviewed",
    artifact: "Mock assessment score-card",
  },
  {
    week: "Wk 12",
    hsbcRequires: "Technical Interview + HR Interview + Background Verification",
    arzonDelivers: "Mock technical interview + HR prep + ATS resume rewritten from HSBC JD",
    artifact: "HSBC-format resume (QR-verifiable)",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const row = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
};

export function HSBCCurriculumStrip() {
  return (
    <section
      id="hsbc-curriculum"
      aria-labelledby="curriculum-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#060A14]"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-mono font-bold text-red-400">
            <Flame className="h-3.5 w-3.5 text-red-400" />
            <span>BUILT FROM HSBC'S ACTUAL JD · JULY 2026</span>
          </div>

          <h2
            id="curriculum-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            The HSBC JD.{" "}
            <span className="italic text-red-400">Our curriculum. Week by week.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            When HSBC gave us their AI/ML Engineer Fresher brief, we rebuilt every module around
            it. This table maps each HSBC requirement to exactly what we teach — and the artefact
            our graduates ship to prove it.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-3xl border border-slate-700/60 bg-slate-900/80 overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-[80px_1fr_1.2fr_1fr] gap-4 px-6 py-4 border-b border-slate-700/60 bg-slate-800/60">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">WEEK</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">HSBC REQUIRES</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">ARZON TEACHES</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">ARTEFACT</span>
          </div>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="divide-y divide-slate-700/40"
          >
            {CURRICULUM_ROWS.map((r) => (
              <motion.li
                key={r.week}
                variants={row}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_1.2fr_1fr] gap-3 md:gap-4 px-6 py-4 hover:bg-slate-800/40 transition-colors group"
              >
                {/* Week */}
                <div className="flex items-center">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    {r.week}
                  </span>
                </div>

                {/* HSBC Requires */}
                <div>
                  <span className="md:hidden font-mono text-[9px] font-bold uppercase text-red-400 block mb-1">
                    HSBC REQUIRES
                  </span>
                  <p className="text-xs font-medium text-slate-200 leading-relaxed">{r.hsbcRequires}</p>
                </div>

                {/* Arzon Teaches */}
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="md:hidden font-mono text-[9px] font-bold uppercase text-emerald-400 block mb-1">
                      ARZON TEACHES
                    </span>
                    <p className="text-xs font-bold text-emerald-100 leading-relaxed">{r.arzonDelivers}</p>
                  </div>
                </div>

                {/* Artefact */}
                <div>
                  <span className="md:hidden font-mono text-[9px] font-bold uppercase text-slate-400 block mb-1">
                    ARTEFACT
                  </span>
                  <p className="font-mono text-[10px] font-bold text-slate-300 uppercase tracking-wider leading-snug">
                    {r.artifact}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Bottom CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-300">
                <Users className="h-4 w-4" />
                <span>{AIML_COHORT_CAP} seats · 30 August 2026</span>
              </div>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-bold text-emerald-400">HSBC: {HSBC_SALARY_RANGE}</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-bold text-blue-400">JPMorgan: {JPMORGAN_SALARY_RANGE}</span>
            </div>
            <p className="text-xs text-slate-400">
              Every row above is a real HSBC JD line. Every deliverable is something our graduates ship.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                "Hi Arzon — I saw the HSBC JD curriculum breakdown. I want to apply for the Aug 2026 AI/ML cohort.",
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("curriculum_whatsapp_click", { placement: "hsbc_curriculum" })}
              className="h-11 px-5 flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              to="/apply"
              onClick={() => trackEvent("curriculum_cta_click", { placement: "hsbc_curriculum" })}
              className="h-11 px-6 flex items-center gap-2 text-sm font-bold text-white bg-[#CC0000] hover:bg-[#b91c1c] rounded-xl shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply for the HSBC Cohort</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
