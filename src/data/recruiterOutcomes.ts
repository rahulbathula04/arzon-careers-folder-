/**
 * What an HSBC / JPMorgan recruiter actually receives when an Arzon graduate applies.
 * Each row maps a concrete HSBC AI/ML JD screening pain to the artefact our cohort
 * ships on Day 1 - no vague "soft skills" claims. Sourced directly from the
 * HSBC AI/ML Engineer Fresher JD (July 2026). Consumed by `RecruiterOutcomes.tsx`.
 */
export type RecruiterOutcome = {
  pain: string;
  delivers: string;
  artifact: string;
};

export const RECRUITER_OUTCOMES: RecruiterOutcome[] = [
  {
    pain: "Python coding round filter (HackerRank)",
    delivers: "12 weeks of Python + DSA + OOP training with mock assessments",
    artifact: "HackerRank mock score-card (shared on request)",
  },
  {
    pain: "ML algorithm knowledge gap in technical interview",
    delivers: "Hands-on Scikit-learn, regression, classification & model tuning",
    artifact: "3-project GitHub portfolio (public link)",
  },
  {
    pain: "No GenAI / Prompt Engineering experience",
    delivers: "RAG pipeline build + LangChain + Prompt Engineering sprint in week 8",
    artifact: "LLM capstone project demo (hosted link)",
  },
  {
    pain: "Zero cloud AI exposure (Azure AI / AWS AI required)",
    delivers: "Azure AI Fundamentals (AI-900) exam prep track in week 9",
    artifact: "Microsoft AI-900 certification (verifiable credential)",
  },
  {
    pain: "No banking domain context for AI use-cases",
    delivers: "Fraud detection, customer analytics & process automation capstone",
    artifact: "HSBC-domain capstone project writeup (PDF)",
  },
  {
    pain: "Verifying CGPA / no-backlog claims on a CV",
    delivers: "Academic eligibility pre-screened; ATS resume rewritten from real HSBC JD",
    artifact: "HSBC-format resume, ISO 9001 certificate with public verifier URL",
  },
];
