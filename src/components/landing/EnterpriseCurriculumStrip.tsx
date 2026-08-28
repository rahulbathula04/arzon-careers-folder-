import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

const CURRICULUM_TABLE = [
  {
    enterprise: "Python proficiency + OOP",
    arzon: "Python foundations: data types, functions, OOP, list comprehensions",
    ship: "Python assignment log",
  },
  {
    enterprise: "ML algorithm understanding",
    arzon: "Scikit-learn: regression, classification, model evaluation + NumPy/Pandas",
    ship: "Kaggle notebook, public link",
  },
  {
    enterprise: "TensorFlow + PyTorch + Deep Learning",
    arzon: "Deep learning bootcamp: CNNs, ANNs, transfer learning, model training",
    ship: "Deep learning model, GitHub repo",
  },
  {
    enterprise: "NLP libraries: NLTK, SpaCy",
    arzon: "Text preprocessing, sentiment analysis, named entity recognition",
    ship: "NLP project, hosted demo",
  },
  {
    enterprise: "Generative AI + Prompt Engineering",
    arzon: "GenAI and LangChain sprint: RAG pipelines, LLM APIs, prompt optimisation",
    ship: "LLM capstone project",
  },
  {
    enterprise: "Azure AI or AWS AI",
    arzon: "Azure AI-900 exam prep + cloud AI fundamentals, deployment basics",
    ship: "Microsoft AI-900 certification",
  },
  {
    enterprise: "SQL + REST APIs + Data Structures",
    arzon: "Data engineering sprint: SQL queries, API calls with Python, DSA prep",
    ship: "SQL portfolio + API project",
  },
  {
    enterprise: "Technical assessment: HackerRank format",
    arzon: "3 mock HackerRank rounds, timed, enterprise-style questions reviewed",
    ship: "Mock assessment score-card",
  },
  {
    enterprise: "Enterprise domain context",
    arzon: "Fraud detection, customer analytics, and process automation capstone",
    ship: "Enterprise-domain capstone project writeup",
  },
  {
    enterprise: "Verifiable academic and work record",
    arzon: "Academic eligibility pre-screened, ATS resume rewritten from real Enterprise JDs",
    ship: "Enterprise-format resume, ISO 9001 certificate with public verifier URL",
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
    sub: "Work on actual projects. Enterprise domain case studies. Capstone that your recruiter can open and verify.",
    bullets: ["Enterprise domain capstone", "Mentor reviews", "Verifiable certificate with public URL"],
  },
  {
    step: "Week 12 onwards",
    title: "Your application goes through our desk",
    sub: "We submit your profile through the Arzon partner pipeline to Tier-1 Enterprise & Quant Fintech recruiters.",
    bullets: ["Partner-desk submission", "7-day priority review SLA", "Resume rewritten against actual enterprise JDs"],
  },
];

/**
 * Section Four — The Programme
 * Design: White background (#FFFFFF). 10-row comparison table mapping
 * Enterprise Requirements -> Arzon Curriculum -> Candidate Deliverable.
 * Followed by the 4-step candidate journey.
 */
export function EnterpriseCurriculumStrip() {
  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <PremiumChip variant="navy" size="md">
            THE PROGRAMME · REVERSE-ENGINEERED FROM ENTERPRISE JDs
          </PremiumChip>
          <h2
            id="curriculum-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            12 weeks. Built from live Tier-1 Enterprise AI/ML briefs.{" "}
            <span className="italic text-[#1B3F8B]">Not from a syllabus committee.</span>
          </h2>
          <p className="text-base text-stone-700 leading-relaxed font-sans">
            We didn't create a random course and then look for jobs. Instead, we started from employer requirements and built preparation around them. Every week of this programme maps directly to a specific requirement in enterprise hiring briefs, ensuring every deliverable you ship matches what global recruiters test for.
          </p>
        </div>

        {/* 10-Row Table */}
        <div className="overflow-hidden rounded-2xl border border-stone-300 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1B3F8B] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Enterprise Requires</th>
                  <th className="py-3.5 px-4 sm:px-6">Arzon Teaches</th>
                  <th className="py-3.5 px-4 sm:px-6">What You Ship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {CURRICULUM_TABLE.map((row, idx) => (
                  <tr
                    key={row.enterprise}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F7F5F0]"}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#1A1A1A] max-w-[200px]">
                      {row.enterprise}
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
          Every artefact above is verifiable on the public ledger: certificates, JD sources, refund records, methodology.
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
                  <span 
                    style={{ backgroundColor: "#1B3F8B", color: "#FFFFFF" }}
                    className="inline-block px-2.5 py-1 rounded-md font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-xs"
                  >
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

