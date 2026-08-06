import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const CURRICULUM_TABLE = [
  {
    hsbc: "Python proficiency + OOP",
    arzon: "Python foundations: data types, functions, OOP, list comprehensions",
    ship: "Python assignment log",
  },
  {
    hsbc: "ML algorithm understanding",
    arzon: "Scikit-learn: regression, classification, model evaluation + NumPy/Pandas",
    ship: "Kaggle notebook, public link",
  },
  {
    hsbc: "TensorFlow + PyTorch + Deep Learning",
    arzon: "Deep learning bootcamp: CNNs, ANNs, transfer learning, model training",
    ship: "Deep learning model, GitHub repo",
  },
  {
    hsbc: "NLP libraries: NLTK, SpaCy",
    arzon: "Text preprocessing, sentiment analysis, named entity recognition",
    ship: "NLP project, hosted demo",
  },
  {
    hsbc: "Generative AI + Prompt Engineering",
    arzon: "GenAI and LangChain sprint: RAG pipelines, LLM APIs, prompt optimisation",
    ship: "LLM capstone project",
  },
  {
    hsbc: "Azure AI or AWS AI",
    arzon: "Azure AI-900 exam prep + cloud AI fundamentals, deployment basics",
    ship: "Microsoft AI-900 certification",
  },
  {
    hsbc: "SQL + REST APIs + Data Structures",
    arzon: "Data engineering sprint: SQL queries, API calls with Python, DSA prep",
    ship: "SQL portfolio + API project",
  },
  {
    hsbc: "Technical assessment — HackerRank format",
    arzon: "3 mock HackerRank rounds, timed, HSBC-style questions reviewed",
    ship: "Mock assessment score-card",
  },
  {
    hsbc: "Banking domain context",
    arzon: "Fraud detection, customer analytics, and process automation capstone",
    ship: "HSBC-domain capstone project writeup",
  },
  {
    hsbc: "Verifiable academic and work record",
    arzon: "Academic eligibility pre-screened, ATS resume rewritten from real HSBC JD",
    ship: "HSBC-format resume, ISO 9001 certificate with public verifier URL",
  },
];

const JOURNEY_STEPS = [
  {
    step: "Day 0",
    title: "Apply in 1 minute",
    sub: "Fill the form. A counsellor calls you back the same day or next morning.",
    bullets: ["1-minute form", "Same-day callback", "No payment to apply"],
  },
  {
    step: "Weeks 1–8",
    title: "Learn live for 8 weeks",
    sub: "Live classes with industry mentors. Weekly homework on real data files. Every lesson has a deliverable.",
    bullets: ["Live industry mentors", "Graded weekly homework", "Real data files, not toy datasets"],
  },
  {
    step: "Weeks 9–12",
    title: "Real internship, 4 weeks",
    sub: "Work on actual projects. Bank domain case studies. Capstone that your recruiter can open and verify.",
    bullets: ["Bank domain capstone", "Mentor reviews", "Verifiable certificate with public URL"],
  },
  {
    step: "Week 12 onwards",
    title: "Your application goes through our desk",
    sub: "We submit your profile through the Arzon partner pipeline to HSBC or JPMorgan. 7-day review SLA.",
    bullets: ["Partner-desk submission", "7-day HSBC fast-track review", "Resume rewritten against their actual JD"],
  },
];

/**
 * Section Four — The Programme
 * Design: White background (#FFFFFF). 10-row comparison table mapping
 * HSBC Requirements -> Arzon Curriculum -> Candidate Deliverable.
 * Followed by the 4-step candidate journey.
 */
export function HSBCCurriculumStrip() {
  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            THE PROGRAMME · REVERSE-ENGINEERED FROM HSBC'S ACTUAL JD
          </p>
          <h2
            id="curriculum-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            12 weeks. Built from the July 2026 HSBC AI/ML fresher brief.{" "}
            <span className="italic text-[#1B3F8B]">Not from a syllabus committee.</span>
          </h2>
          <p className="text-base text-stone-700 leading-relaxed font-sans">
            HSBC gave Arzon their hiring brief. We read it line by line. Every week of this programme maps
            to a specific requirement in that brief. Every deliverable you ship maps to a specific artefact the HSBC recruiter is looking for. Nothing in our curriculum is academic filler.
          </p>
        </div>

        {/* 10-Row Table */}
        <div className="overflow-hidden rounded-2xl border border-stone-300 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1B3F8B] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">HSBC Requires</th>
                  <th className="py-3.5 px-4 sm:px-6">Arzon Teaches</th>
                  <th className="py-3.5 px-4 sm:px-6">What You Ship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {CURRICULUM_TABLE.map((row, idx) => (
                  <tr
                    key={row.hsbc}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F7F5F0]"}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#1A1A1A] max-w-[200px]">
                      {row.hsbc}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-stone-700 leading-snug">
                      {row.arzon}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-xs font-bold text-[#1B3F8B]">
                      {row.ship}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-xs font-mono text-stone-600">
          Every artefact above is verifiable on the public ledger — certificates, JD sources, refund records, methodology.
        </p>

        {/* 4-Step Candidate Journey */}
        <div className="pt-4 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] text-center sm:text-left">
            The 4-Step Journey to Your Partner Desk Review
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#1B3F8B] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    {step.step}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">{step.title}</h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">{step.sub}</p>
                </div>

                <ul className="space-y-2 border-t border-stone-300 pt-3 text-xs text-stone-800">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#1B3F8B] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
