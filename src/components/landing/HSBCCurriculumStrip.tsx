import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageCircle, Flame, Users } from "lucide-react";
import { COUNSELLOR_PHONE, AIML_COHORT_CAP, HSBC_SALARY_RANGE, JPMORGAN_SALARY_RANGE } from "./constants";
import { trackEvent } from "@/lib/analytics";

/**
 * HSBCCurriculumStrip — Rebuilt to match Arzon's signature light editorial UI/UX.
 * Maps HSBC AI/ML Engineer Fresher JD line-by-line to Arzon's 12-week curriculum in a clean table.
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
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-y border-slate-200/80"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold text-[#2563EB]">
            <Flame className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>BUILT FROM HSBC'S ACTUAL JD · JULY 2026</span>
          </div>

          <h2
            id="curriculum-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-[1.15]"
          >
            Reverse-engineered from HSBC's actual AI/ML brief.{" "}
            <span className="italic text-[#2563EB]">12 Weeks. 3 Production Artefacts. Zero Filler.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5B6472] leading-relaxed max-w-2xl mx-auto">
            We don't teach generic slides or outdated tutorials. When HSBC gave us their AI/ML fresher
            hiring brief, we built 12 weeks of production sprints around their exact requirements — and the
            exact code artifacts our graduates ship to prove it.
          </p>
        </div>

        {/* Table Container */}
        <div className="rounded-3xl border border-slate-200 bg-white tone-light overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-[90px_1fr_1.2fr_1fr] gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50/80">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#707C90]">WEEK</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">HSBC REQUIRES</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800">ARZON TEACHES</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#707C90]">DELIVERABLE</span>
          </div>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="divide-y divide-slate-100"
          >
            {CURRICULUM_ROWS.map((r) => (
              <motion.li
                key={r.week}
                variants={row}
                className="grid grid-cols-1 md:grid-cols-[90px_1fr_1.2fr_1fr] gap-3 md:gap-4 px-6 py-4 hover:bg-slate-50/80 transition-colors group"
              >
                {/* Week */}
                <div className="flex items-center">
                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                    {r.week}
                  </span>
                </div>

                {/* HSBC Requires */}
                <div>
                  <span className="md:hidden font-mono text-[9px] font-bold uppercase text-[#2563EB] block mb-1">
                    HSBC REQUIRES
                  </span>
                  <p className="text-xs font-semibold text-[#151C2E] leading-relaxed">{r.hsbcRequires}</p>
                </div>

                {/* Arzon Teaches */}
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="md:hidden font-mono text-[9px] font-bold uppercase text-emerald-800 block mb-1">
                      ARZON TEACHES
                    </span>
                    <p className="text-xs font-bold text-emerald-950 leading-relaxed">{r.arzonDelivers}</p>
                  </div>
                </div>

                {/* Artefact */}
                <div>
                  <span className="md:hidden font-mono text-[9px] font-bold uppercase text-[#707C90] block mb-1">
                    DELIVERABLE
                  </span>
                  <p className="font-mono text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-lg inline-block uppercase tracking-wider">
                    {r.artifact}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Bottom CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#151C2E]">
                <Users className="h-4 w-4 text-[#2563EB]" />
                <span>{AIML_COHORT_CAP} seats · 30 August 2026</span>
              </div>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-[#2563EB]">HSBC: {HSBC_SALARY_RANGE}</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-[#2563EB]">JPMorgan: {JPMORGAN_SALARY_RANGE}</span>
            </div>
            <p className="text-xs text-[#5B6472]">
              Every row above is a real HSBC JD requirement. Every deliverable is built in our 12-week cohort.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                "Hi Arzon — I saw the HSBC JD curriculum breakdown. I want to apply for the Aug 2026 AI/ML cohort.",
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("curriculum_whatsapp_click", { placement: "hsbc_curriculum" })}
              className="h-11 px-5 flex items-center gap-2 text-xs font-bold text-slate-700 bg-white tone-light border border-slate-300 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>
            <Link
              to="/apply"
              onClick={() => trackEvent("curriculum_cta_click", { placement: "hsbc_curriculum" })}
              className="h-11 px-6 flex items-center gap-2 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply for HSBC Cohort</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
