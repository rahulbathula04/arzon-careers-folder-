import type { ArchetypeId } from "@/data/careerEngineQuestions";

/**
 * 7-day immediate-action plan per career archetype. Used on the result page
 * so students leave with something to do, not just a verdict.
 *
 * Each step is a small, verifiable action - never a vague intention.
 * Tone is direct, second-person, evidence-led. Lifts free / freemium tools
 * recruiters actually look for in resumes.
 */

export interface PlanStep {
  day: number;
  title: string;
  detail: string;
  /** Optional public reference link a student can open right away. */
  link?: { label: string; href: string };
}

export interface SevenDayPlan {
  archetype: ArchetypeId;
  role: string;
  steps: PlanStep[];
}

const PV: SevenDayPlan = {
  archetype: "sentinel",
  role: "Pharmacovigilance Associate",
  steps: [
    {
      day: 1,
      title: "Bookmark the WHO-UMC site",
      detail: "Spend 20 min on the Vigibase overview. You'll see how case reports flow worldwide.",
      link: { label: "WHO-UMC", href: "https://www.who-umc.org/" },
    },
    {
      day: 2,
      title: "Read one ICSR walkthrough",
      detail:
        "Search YouTube for 'ICSR case processing demo'. Take notes on the 4 mandatory fields.",
    },
    {
      day: 3,
      title: "Skim the MedDRA primer",
      detail:
        "MedDRA's free introductory guide is 18 pages. Recruiters will assume you've read it.",
      link: { label: "MedDRA intro", href: "https://www.meddra.org/how-to-use/basics" },
    },
    {
      day: 4,
      title: "Read 5 PV job descriptions",
      detail:
        "Open IQVIA, Cognizant, Parexel on LinkedIn. Note the recurring 6 phrases - that's your training spec.",
    },
    {
      day: 5,
      title: "Practise narrative writing",
      detail:
        "Write a 120-word case narrative from a public adverse-event news story. Keep it factual.",
    },
    {
      day: 6,
      title: "Talk to one PV professional",
      detail: "Send 3 polite LinkedIn notes asking what they wish they'd known in month 1.",
    },
    {
      day: 7,
      title: "Book a counsellor call",
      detail:
        "Bring your notes to the call. We'll show you exactly where you'd start in our cohort.",
    },
  ],
};

const CODER: SevenDayPlan = {
  archetype: "coder",
  role: "Medical Coder (ICD-10 / CPT)",
  steps: [
    {
      day: 1,
      title: "Install the WHO ICD-11 browser",
      detail: "Free, official. Search 3 conditions you know and watch how codes nest.",
      link: { label: "ICD browser", href: "https://icd.who.int/browse11" },
    },
    {
      day: 2,
      title: "Watch a CPC exam walkthrough",
      detail: "Find an AAPC mock-exam explainer on YouTube. Note the question shape.",
    },
    {
      day: 3,
      title: "Read 3 op-notes",
      detail:
        "Public surgical op-notes exist on PubMed Case Reports. Try mapping 2 codes from each.",
    },
    {
      day: 4,
      title: "Read 5 coder JDs",
      detail:
        "Cognizant, Optum, AGS Health. Note recurring tools (3M, EncoderPro) - your training spec.",
    },
    {
      day: 5,
      title: "Build a speed-drill",
      detail: "20 conditions in a Google Sheet. Add ICD-10 + CPT for each. Time yourself.",
    },
    {
      day: 6,
      title: "Ask one coder on LinkedIn",
      detail:
        "Recurring question: 'What does your first hour at work look like?' That's your interview prep.",
    },
    {
      day: 7,
      title: "Book a counsellor call",
      detail: "Bring the speed-drill. We'll grade it and show the cohort path.",
    },
  ],
};

const DATA: SevenDayPlan = {
  archetype: "data_storyteller",
  role: "Clinical Data Manager",
  steps: [
    {
      day: 1,
      title: "Open a public CRF",
      detail:
        "ClinicalTrials.gov publishes Case Report Forms. Pick a small Phase-2 study and read one CRF page.",
    },
    {
      day: 2,
      title: "Read the CDISC SDTM glossary",
      detail: "Spend 30 min on the top-20 SDTM domains. You'll meet them again in every interview.",
      link: { label: "CDISC", href: "https://www.cdisc.org/standards/foundational/sdtm" },
    },
    {
      day: 3,
      title: "Try a Medidata demo video",
      detail:
        "Search YouTube for 'Rave EDC demo'. You're learning the UI recruiters expect you to know.",
    },
    {
      day: 4,
      title: "Read 5 CDM JDs",
      detail: "ICON, Syneos, IQVIA. Track recurring tools (Rave, Veeva, Inform).",
    },
    {
      day: 5,
      title: "Practise edit-checks",
      detail:
        "Make 10 fake patient rows in a sheet. Write 5 'edit check' rules a CDM would enforce.",
    },
    {
      day: 6,
      title: "Find one CDM on LinkedIn",
      detail:
        "Ask: 'What's the difference between CDM 1 and CDM 2 in your team?' Saves you a year of guessing.",
    },
    {
      day: 7,
      title: "Book a counsellor call",
      detail: "We'll show your edit-checks to a senior CDM in the cohort.",
    },
  ],
};

const REG: SevenDayPlan = {
  archetype: "regulatory_architect",
  role: "Regulatory Affairs Associate",
  steps: [
    {
      day: 1,
      title: "Skim the eCTD overview",
      detail: "ICH publishes a 12-page eCTD guide. Don't memorise - get the 5-module mental model.",
      link: {
        label: "ICH eCTD",
        href: "https://www.ich.org/page/ich-electronic-common-technical-document-ectd",
      },
    },
    {
      day: 2,
      title: "Read a CDSCO public approval",
      detail: "Pick any recently approved drug in India. Read the public assessment summary.",
    },
    {
      day: 3,
      title: "Watch one Module-3 walkthrough",
      detail: "YouTube has free regulatory affairs courses. Note: CMC sits in Module 3.",
    },
    {
      day: 4,
      title: "Read 5 RA JDs",
      detail:
        "Dr Reddy's, Aurobindo, Sun Pharma. Track recurring tools (Veeva Vault, MasterControl).",
    },
    {
      day: 5,
      title: "Build a submission timeline",
      detail:
        "On paper: list every step from CMC draft to ANDA submission. Approximate dates are fine.",
    },
    {
      day: 6,
      title: "Ask a RA professional",
      detail: "'What's the most common rejection reason you've seen?' Best resume prep there is.",
    },
    {
      day: 7,
      title: "Book a counsellor call",
      detail: "Bring the timeline. We'll show the cohort syllabus that mirrors a live submission.",
    },
  ],
};

const OPERATOR: SevenDayPlan = {
  archetype: "operator",
  role: "Clinical Operations / SaaS Associate",
  steps: [
    {
      day: 1,
      title: "Read about a Veeva product",
      detail: "Pick one Vault module. Watch the 5-min product page demo.",
    },
    {
      day: 2,
      title: "Try a free Salesforce trail",
      detail: "30-min Trailhead module. The shape of CRM is the shape of clinical SaaS.",
    },
    {
      day: 3,
      title: "Read a clinical-ops JD on LinkedIn",
      detail: "ICON, Parexel. Note: stakeholder management is the real job.",
    },
    {
      day: 4,
      title: "Map a 4-step trial workflow",
      detail: "Site activation → patient enrolment → data lock → CSR. Draw it on paper.",
    },
    {
      day: 5,
      title: "Watch a CTMS demo",
      detail: "Free YouTube CTMS walkthroughs exist. You're learning the lingo.",
    },
    {
      day: 6,
      title: "Ask one ops professional",
      detail: "'What's the worst day in clinical ops look like?' Tells you if you'll love it.",
    },
    {
      day: 7,
      title: "Book a counsellor call",
      detail: "We'll match you to the cohort track that fits your operator instinct.",
    },
  ],
};

const AI: SevenDayPlan = {
  archetype: "ai_builder",
  role: "Health-AI / Clinical NLP Engineer",
  steps: [
    {
      day: 1,
      title: "Open MIMIC-IV demo",
      detail: "Free de-identified ICU dataset. Browse the demo schema for 20 min.",
      link: { label: "MIMIC demo", href: "https://physionet.org/content/mimic-iv-demo/" },
    },
    {
      day: 2,
      title: "Read one clinical-NLP paper",
      detail:
        "Search arXiv for 'clinical BERT'. Read the abstract + intro. That's enough this week.",
    },
    {
      day: 3,
      title: "Run a Hugging Face demo",
      detail: "Try 'emilyalsentzer/Bio_ClinicalBERT' on a sentence. You're doing health AI.",
    },
    {
      day: 4,
      title: "Read 5 AI-in-pharma JDs",
      detail: "Novartis, GSK, IQVIA Data Science. Track: SQL, Python, GxP awareness.",
    },
    {
      day: 5,
      title: "Build a tiny notebook",
      detail: "Take 100 adverse-event tweets, classify by drug name. Push to GitHub.",
    },
    {
      day: 6,
      title: "Find one health-AI engineer",
      detail: "Ask: 'What did your first production model do?' Cuts months of guessing.",
    },
    {
      day: 7,
      title: "Book a counsellor call",
      detail: "Bring the notebook. We'll show how the AI cohort builds on it.",
    },
  ],
};

const PLANS: Record<ArchetypeId, SevenDayPlan> = {
  sentinel: PV,
  coder: CODER,
  data_storyteller: DATA,
  regulatory_architect: REG,
  operator: OPERATOR,
  ai_builder: AI,
};

export function getSevenDayPlan(archetype: ArchetypeId): SevenDayPlan {
  return PLANS[archetype] ?? PV;
}
