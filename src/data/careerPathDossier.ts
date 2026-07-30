/**
 * Career Path Dossier - the deep data layer behind the expanded Career Fit
 * Report. Each slug ships with an honest bundle: 10-year growth index,
 * salary trajectory across a decade, tool stack, first-90-days plan,
 * day-in-the-life, 2030 outlook, interview buckets, pivots, objections.
 *
 * Numbers here are directional benchmarks (Naukri / AmbitionBox / LinkedIn
 * cross-checked against ~150+ live JDs) - NOT job offers.
 */

export interface SalaryYearPoint {
  year: 0 | 1 | 3 | 5 | 10;
  label: string;
  min: number;
  max: number;
}

export interface GrowthPoint {
  year: number;
  index: number;
  jdCount?: number;
}

export interface ToolItem {
  name: string;
  why: string;
  frequency: "daily" | "weekly" | "occasional";
}

export interface ToolCategory {
  category: string;
  items: ToolItem[];
}

export interface MilestonePhase {
  window: "30" | "60" | "90";
  title: string;
  outcomes: string[];
  redFlag: string;
}

export interface DayBlock {
  time: string;
  activity: string;
  detail: string;
}

export interface OutlookRow {
  label: string;
  today: string;
  in2030: string;
  aiTouch: "human" | "assisted" | "automated";
}

export interface InterviewBucket {
  bucket: string;
  weight: number;
  examples: string[];
  commonFail: string;
  arzonCounter: string;
}

export interface PivotPath {
  slug: string;
  title: string;
  timing: string;
  why: string;
}

export interface Objection {
  q: string;
  a: string;
}

export interface PathDossier {
  salaryTrajectory: SalaryYearPoint[];
  growthIndex: GrowthPoint[];
  tools: ToolCategory[];
  first90Days: MilestonePhase[];
  dayInLife: DayBlock[];
  outlook2030: {
    headline: string;
    rows: OutlookRow[];
    stayHuman: string[];
  };
  interview: InterviewBucket[];
  pivots: PivotPath[];
  objections: Objection[];
  offshoreMultiplier: number;
}

const GENERIC_DAY: DayBlock[] = [
  {
    time: "09:00",
    activity: "Standup",
    detail: "15-min team sync - flag blockers, confirm the day's priorities.",
  },
  {
    time: "09:30",
    activity: "Deep work block",
    detail: "Two uninterrupted hours on the highest-priority queue item.",
  },
  {
    time: "11:30",
    activity: "Peer review",
    detail: "Review a colleague's output; feedback in-tool, not email.",
  },
  {
    time: "12:30",
    activity: "Lunch + async catch-up",
    detail: "Read Slack / email threads; no meetings.",
  },
  {
    time: "14:00",
    activity: "Client / stakeholder call",
    detail: "One structured call - status, decisions, next steps.",
  },
  {
    time: "15:00",
    activity: "Execution block 2",
    detail: "Second execution window; ship at least one deliverable.",
  },
  {
    time: "17:00",
    activity: "Handoff + logging",
    detail: "Update tracker, log time, prep tomorrow's top-3.",
  },
  {
    time: "17:45",
    activity: "Signoff",
    detail: "Log out - role rarely requires after-hours work in year 1.",
  },
];

const genericTemplate = (): PathDossier => ({
  salaryTrajectory: [
    { year: 0, label: "Entry (L1)", min: 3.5, max: 5.5 },
    { year: 1, label: "Year 1", min: 4.5, max: 6.5 },
    { year: 3, label: "Year 3", min: 7, max: 11 },
    { year: 5, label: "Year 5", min: 11, max: 18 },
    { year: 10, label: "Year 10", min: 18, max: 32 },
  ],
  growthIndex: [
    { year: 2016, index: 100 },
    { year: 2018, index: 118 },
    { year: 2020, index: 138 },
    { year: 2022, index: 172 },
    { year: 2024, index: 214 },
    { year: 2026, index: 240 },
  ],
  tools: [
    {
      category: "Core execution",
      items: [
        {
          name: "Excel / Google Sheets",
          why: "Every role logs and models in it - non-negotiable.",
          frequency: "daily",
        },
        {
          name: "Slack / MS Teams",
          why: "Async coordination is where 60% of a modern role happens.",
          frequency: "daily",
        },
      ],
    },
    {
      category: "Tracking & reporting",
      items: [
        {
          name: "Jira / Asana",
          why: "Ticket-driven work - every task is a row someone can audit.",
          frequency: "daily",
        },
        {
          name: "Confluence / Notion",
          why: "SOPs and handoffs live here - read before you ask.",
          frequency: "weekly",
        },
      ],
    },
    {
      category: "AI copilots",
      items: [
        {
          name: "ChatGPT / Copilot",
          why: "First-draft speed - you still verify every output.",
          frequency: "daily",
        },
      ],
    },
  ],
  first90Days: [
    {
      window: "30",
      title: "Absorb and shadow",
      outcomes: [
        "Ship your first low-stakes deliverable end-to-end.",
        "Read every SOP in your team's Confluence space.",
        "Have a 1:1 with each person who reviews your work.",
      ],
      redFlag: "You still don't know who reviews your work.",
    },
    {
      window: "60",
      title: "Own a queue",
      outcomes: [
        "Handle a full daily queue solo with under 5% rework.",
        "Log accurate cycle-time in the tracker every day.",
        "Ask one hard question per week that pushes a decision.",
      ],
      redFlag: "You still route every ambiguous case up.",
    },
    {
      window: "90",
      title: "Be trusted",
      outcomes: [
        "Peer-review a teammate's work weekly.",
        "Author one SOP tweak or template.",
        "Present a small metric review to your manager.",
      ],
      redFlag: "No teammate has asked for your review yet.",
    },
  ],
  dayInLife: GENERIC_DAY,
  outlook2030: {
    headline:
      "The role stays. The lowest 30% of tasks get automated. What you own moves up the stack.",
    rows: [
      {
        label: "Routine data entry",
        today: "Manual",
        in2030: "AI-assisted with human sign-off",
        aiTouch: "assisted",
      },
      {
        label: "Quality review",
        today: "Peer-based",
        in2030: "Auto-triage + human on exceptions",
        aiTouch: "assisted",
      },
      { label: "Stakeholder decisions", today: "Human", in2030: "Human", aiTouch: "human" },
      {
        label: "Compliance sign-off",
        today: "Human",
        in2030: "Human - regulator requires it",
        aiTouch: "human",
      },
    ],
    stayHuman: [
      "Judgement calls where a wrong output has legal or clinical consequence.",
      "Client conversations and expectation-setting.",
      "Anything a regulator or auditor traces back to a named person.",
    ],
  },
  interview: [
    {
      bucket: "Domain knowledge",
      weight: 40,
      examples: [
        "Walk me through your process for a typical case.",
        "What would you check first if the output looks off?",
      ],
      commonFail: "Memorised definitions, no lived example.",
      arzonCounter: "The bootcamp works 40+ real cases - you have stories, not slides.",
    },
    {
      bucket: "Tools",
      weight: 25,
      examples: [
        "Show me a screenshot of work you've done in the tool.",
        "How would you structure a tracker for this?",
      ],
      commonFail: "Named the tool, never touched it.",
      arzonCounter: "You leave with a portfolio of tool artefacts, not certificates.",
    },
    {
      bucket: "Attention and judgement",
      weight: 20,
      examples: ["Here's a sample - spot 3 issues.", "Would you escalate this? Why?"],
      commonFail: "Freeze under a small ambiguous case.",
      arzonCounter: "The ACRI diagnostic surfaces this exact gap before you walk in.",
    },
    {
      bucket: "Cultural fit",
      weight: 15,
      examples: [
        "Tell me about a time you missed a deadline.",
        "Why this company vs. its competitor?",
      ],
      commonFail: "Generic answers, no company-specific research.",
      arzonCounter:
        "Interview prep scripts the 5 questions each shortlisted employer actually asks.",
    },
  ],
  pivots: [
    {
      slug: "business-analyst",
      title: "Business / data analyst",
      timing: "After 18 months",
      why: "Your domain fluency + SQL upskill opens analyst roles at 30–50% more.",
    },
    {
      slug: "regulatory-affairs",
      title: "Regulatory or compliance track",
      timing: "After 2 years",
      why: "Auditors want people who've done the work, not just studied it.",
    },
  ],
  objections: [
    {
      q: "I don't have a life-sciences degree - can I really break in?",
      a: "Recruiters filter on demonstrable skill for entry roles. A portfolio + verified assessment beats a B.Pharm CV with no artefacts.",
    },
    {
      q: "I'm 27+. Am I too late?",
      a: "Median first-role hire in this dataset is 24–29. Career switchers actually convert faster because they treat it as work, not exams.",
    },
    {
      q: "Won't AI take this role in 5 years?",
      a: "Look at the 2030 outlook above - the human accountability layer is regulator-mandated. AI compresses task volume, not headcount responsibility.",
    },
  ],
  offshoreMultiplier: 1.35,
});

const PV: PathDossier = {
  ...genericTemplate(),
  salaryTrajectory: [
    { year: 0, label: "Entry (DSA)", min: 3.5, max: 5 },
    { year: 1, label: "Year 1 (PV Assoc.)", min: 4.5, max: 6.5 },
    { year: 3, label: "Year 3 (Sr. PV)", min: 7, max: 12 },
    { year: 5, label: "Year 5 (Safety Sci.)", min: 12, max: 20 },
    { year: 10, label: "Year 10 (Lead)", min: 22, max: 42 },
  ],
  growthIndex: [
    { year: 2016, index: 100, jdCount: 62 },
    { year: 2018, index: 132, jdCount: 84 },
    { year: 2020, index: 168, jdCount: 118 },
    { year: 2022, index: 205, jdCount: 156 },
    { year: 2024, index: 244, jdCount: 214 },
    { year: 2026, index: 268, jdCount: 247 },
  ],
  tools: [
    {
      category: "Case processing",
      items: [
        {
          name: "Oracle Argus Safety",
          why: "Industry-standard safety database - 70% of CROs run on it.",
          frequency: "daily",
        },
        {
          name: "ARISg (ArisGlobal)",
          why: "The other 25% - same shape, different vendor.",
          frequency: "daily",
        },
        {
          name: "MedDRA browser",
          why: "You code every adverse event term against it.",
          frequency: "daily",
        },
      ],
    },
    {
      category: "Literature & signal",
      items: [
        {
          name: "PubMed / Embase",
          why: "Weekly literature screening - auditor asks to see your query.",
          frequency: "weekly",
        },
        {
          name: "Empirica Signal",
          why: "Statistical signal detection for aggregate reports.",
          frequency: "occasional",
        },
      ],
    },
    {
      category: "Documentation",
      items: [
        {
          name: "MS Word (locked templates)",
          why: "Every ICSR narrative is a Word doc against a locked template.",
          frequency: "daily",
        },
        {
          name: "Veeva Vault / SharePoint",
          why: "Regulatory-grade document control.",
          frequency: "weekly",
        },
      ],
    },
  ],
  first90Days: [
    {
      window: "30",
      title: "Case triage fluency",
      outcomes: [
        "Complete Argus + MedDRA + GVP onboarding.",
        "Triage 20+ shadowed cases with a senior.",
        "Know seriousness, expectedness, causality cold.",
      ],
      redFlag: "You still guess at seriousness assessment.",
    },
    {
      window: "60",
      title: "Own the queue",
      outcomes: [
        "Process 8–12 ICSRs/day at QC pass rate ≥ 95%.",
        "Write narratives without template hand-holding.",
        "Track cycle-time within Day-15 / Day-90 windows.",
      ],
      redFlag: "Your QC failure rate is above 8%.",
    },
    {
      window: "90",
      title: "Trusted associate",
      outcomes: [
        "Peer-QC a colleague's cases.",
        "Own literature screening for one product.",
        "Present a small metric review to team lead.",
      ],
      redFlag: "No one has asked you to peer-QC yet.",
    },
  ],
  dayInLife: [
    {
      time: "09:00",
      activity: "Case intake review",
      detail: "New ICSRs assigned overnight - triage by seriousness and regulatory clock.",
    },
    {
      time: "09:30",
      activity: "Daily standup",
      detail: "15-min queue check-in with your PV team lead.",
    },
    {
      time: "09:45",
      activity: "Case processing block",
      detail: "3–4 non-serious ICSRs entered into Argus, MedDRA-coded, narrative drafted.",
    },
    {
      time: "12:30",
      activity: "Lunch + literature scan",
      detail: "Skim PubMed alerts for your assigned products.",
    },
    {
      time: "13:30",
      activity: "Serious case deep-dive",
      detail: "One expedited Day-15 case - full narrative + causality + QC.",
    },
    {
      time: "15:30",
      activity: "QC & peer review",
      detail: "Review a colleague's cases; log discrepancies in the QC tracker.",
    },
    {
      time: "16:30",
      activity: "Client / sponsor call",
      detail: "Weekly status call - case counts, backlog, escalations.",
    },
    {
      time: "17:15",
      activity: "Metrics + handoff",
      detail: "Update daily metric sheet; queue tomorrow's cases.",
    },
    {
      time: "17:45",
      activity: "Signoff",
      detail: "Log out. PV rarely requires after-hours work in year 1.",
    },
  ],
  outlook2030: {
    headline:
      "PV is one of the most regulator-locked roles in life sciences. AI compresses intake and duplicate detection; every named signatory stays human until GVP changes.",
    rows: [
      {
        label: "Case intake & duplicate check",
        today: "Manual triage",
        in2030: "AI-auto-classified, human confirms",
        aiTouch: "assisted",
      },
      {
        label: "MedDRA coding (routine AEs)",
        today: "Manual lookup",
        in2030: "LLM-suggested + human accept",
        aiTouch: "assisted",
      },
      {
        label: "Narrative writing (serious)",
        today: "Human",
        in2030: "Human - regulator names a person",
        aiTouch: "human",
      },
      { label: "Causality assessment", today: "Human", in2030: "Human", aiTouch: "human" },
      {
        label: "Aggregate signal review",
        today: "Human + stats",
        in2030: "Human + better stats",
        aiTouch: "human",
      },
      { label: "Health authority responses", today: "Human", in2030: "Human", aiTouch: "human" },
    ],
    stayHuman: [
      "Every ICSR that reaches a regulator has a named human associate + reviewer - GVP Module VI requires it.",
      "Signal decisions and benefit-risk calls sit with the QPPV / safety physician layer.",
      "Any case involving pregnancy, paediatric, or fatal outcome escalates to human-only review.",
    ],
  },
  interview: [
    {
      bucket: "GVP + case processing",
      weight: 45,
      examples: [
        "Walk me through processing a Day-15 case.",
        "How do you assess causality? Which scale?",
        "What triggers a case to be expedited?",
      ],
      commonFail: "Memorised the 4 seriousness criteria, freezes on a real case.",
      arzonCounter:
        "You process 40+ real anonymised ICSRs in the PV Track - muscle memory, not flashcards.",
    },
    {
      bucket: "MedDRA + tools",
      weight: 25,
      examples: [
        "Show me how you'd code 'severe headache after 3rd dose'.",
        "Screenshot of an Argus case you processed?",
      ],
      commonFail: "Named Argus, never opened it.",
      arzonCounter: "Sandbox Argus + MedDRA browser access from Week 2.",
    },
    {
      bucket: "Regulatory awareness",
      weight: 20,
      examples: ["Difference between EU-QPPV and PSMF?", "What's on a Day-90 PSUR?"],
      commonFail: "Confuses ICH E2E with GVP module numbers.",
      arzonCounter: "GVP module coverage + one full PSUR walkthrough in Week 6.",
    },
    {
      bucket: "Attention + English",
      weight: 10,
      examples: ["Read this narrative - spot 3 issues.", "Rewrite in clinical style."],
      commonFail: "Missed a temporal-relationship inconsistency.",
      arzonCounter: "The ACRI report shows exactly where your attention band sits.",
    },
  ],
  pivots: [
    {
      slug: "regulatory-affairs",
      title: "Regulatory affairs",
      timing: "After 24 months",
      why: "PV case-work is the fastest route into RA - you already read labels and CCDS.",
    },
    {
      slug: "clinical-data-management",
      title: "Clinical data management",
      timing: "After 18 months",
      why: "You handle regulated data + queries; CDM adds EDC platforms.",
    },
    {
      slug: "ai-intelligence",
      title: "AI in pharmacovigilance",
      timing: "After 30 months + Python",
      why: "PV automation is one of the hottest sub-fields - domain-first > engineer-first.",
    },
  ],
  objections: [
    {
      q: "I heard PV is being automated away by AI.",
      a: "Intake and duplicate detection compress. Named-signatory narrative writing, causality, and signal review are regulator-locked to humans until GVP Module VI is rewritten - no vendor has proposed that.",
    },
    {
      q: "Do I need a pharma degree?",
      a: "Life-sciences (B.Pharm, BSc, BDS, BAMS, nursing) is the fastest route. Non-life-sciences graduates enter via bridge modules - Arzon's PV Track includes the drug-lifecycle primer.",
    },
    {
      q: "Will I be doing night shifts?",
      a: "Global-serving CROs (IQVIA, Cognizant) have some US-hours teams. India-serving pharma (Dr. Reddy's, Sun) is day-shift. You choose your employer band.",
    },
    {
      q: "Salary looks low vs. software.",
      a: "PV pays less at L1 but has faster mid-career acceleration into signal / safety scientist / QPPV support - Y5 median is ₹15–20 LPA with lower attrition risk.",
    },
  ],
  offshoreMultiplier: 1.4,
};

const MEDICAL_CODING: PathDossier = {
  ...genericTemplate(),
  salaryTrajectory: [
    { year: 0, label: "Entry (Trainee)", min: 2.8, max: 4.2 },
    { year: 1, label: "Year 1 (Coder)", min: 3.5, max: 5 },
    { year: 3, label: "Year 3 (Sr. Coder)", min: 5, max: 8 },
    { year: 5, label: "Year 5 (QA/Auditor)", min: 8, max: 13 },
    { year: 10, label: "Year 10 (Lead)", min: 14, max: 22 },
  ],
  growthIndex: [
    { year: 2016, index: 100, jdCount: 78 },
    { year: 2018, index: 128, jdCount: 102 },
    { year: 2020, index: 156, jdCount: 132 },
    { year: 2022, index: 178, jdCount: 158 },
    { year: 2024, index: 192, jdCount: 182 },
    { year: 2026, index: 202, jdCount: 198 },
  ],
  tools: [
    {
      category: "Code books",
      items: [
        { name: "ICD-10-CM Codebook", why: "Diagnosis coding rulebook.", frequency: "daily" },
        {
          name: "CPT Professional",
          why: "Procedure coding for professional-fee claims.",
          frequency: "daily",
        },
        { name: "HCPCS Level II", why: "Supplies, devices, drugs not in CPT.", frequency: "daily" },
      ],
    },
    {
      category: "Coding platforms",
      items: [
        {
          name: "3M CodeFinder / Encoder Pro",
          why: "Search + reference lookup with NCCI edits.",
          frequency: "daily",
        },
        { name: "EPIC / Cerner EHR", why: "Where the patient chart lives.", frequency: "daily" },
      ],
    },
    {
      category: "QA & reporting",
      items: [
        {
          name: "Excel + QA trackers",
          why: "Every audit finding logged in a shared sheet.",
          frequency: "daily",
        },
      ],
    },
  ],
  outlook2030: {
    headline:
      "The lowest-complexity outpatient coding is first to compress. Inpatient DRG, ambulatory surgery and audit stay human - payer-appeal accountability sits with a named coder.",
    rows: [
      {
        label: "Simple outpatient ICD-10",
        today: "Manual",
        in2030: "AI-suggested, human accept",
        aiTouch: "assisted",
      },
      {
        label: "E/M level assignment",
        today: "Manual",
        in2030: "AI-scored + human confirm",
        aiTouch: "assisted",
      },
      { label: "Inpatient DRG assignment", today: "Human", in2030: "Human", aiTouch: "human" },
      {
        label: "Audit / appeal",
        today: "Human",
        in2030: "Human - payer requires named coder",
        aiTouch: "human",
      },
      { label: "Compliance review", today: "Human", in2030: "Human", aiTouch: "human" },
    ],
    stayHuman: [
      "Every appealed claim has a named coder - payers require it.",
      "Inpatient DRG needs chart-reading judgement AI still fails at.",
      "Audit / QA sits above the coding line and requires human sign-off.",
    ],
  },
  offshoreMultiplier: 1.25,
};

const CDM: PathDossier = {
  ...genericTemplate(),
  salaryTrajectory: [
    { year: 0, label: "Entry (CDA)", min: 4, max: 5.5 },
    { year: 1, label: "Year 1", min: 5, max: 7 },
    { year: 3, label: "Year 3 (Sr. CDM)", min: 8, max: 14 },
    { year: 5, label: "Year 5 (Data Mgr.)", min: 14, max: 22 },
    { year: 10, label: "Year 10 (Head)", min: 24, max: 40 },
  ],
  tools: [
    {
      category: "EDC platforms",
      items: [
        {
          name: "Medidata Rave",
          why: "The largest EDC - 60% of trials globally.",
          frequency: "daily",
        },
        { name: "Veeva Vault EDC", why: "Fastest-growing modern EDC.", frequency: "daily" },
        {
          name: "Oracle Clinical / Inform",
          why: "Legacy but still widespread at big pharma.",
          frequency: "occasional",
        },
      ],
    },
    {
      category: "Standards & QC",
      items: [
        {
          name: "CDISC SDTM / ADaM",
          why: "Every submission-grade dataset speaks it.",
          frequency: "weekly",
        },
        { name: "Excel + SQL", why: "Ad-hoc data checks live here.", frequency: "daily" },
      ],
    },
  ],
  offshoreMultiplier: 1.4,
};

const REGULATORY: PathDossier = {
  ...genericTemplate(),
  salaryTrajectory: [
    { year: 0, label: "Entry (RA Assoc.)", min: 4, max: 6 },
    { year: 1, label: "Year 1", min: 5, max: 7 },
    { year: 3, label: "Year 3 (Sr. RA)", min: 8, max: 14 },
    { year: 5, label: "Year 5 (RA Mgr.)", min: 15, max: 26 },
    { year: 10, label: "Year 10 (Head)", min: 28, max: 55 },
  ],
  offshoreMultiplier: 1.5,
};

const SAS: PathDossier = {
  ...genericTemplate(),
  salaryTrajectory: [
    { year: 0, label: "Entry (Trainee)", min: 4.5, max: 6.5 },
    { year: 1, label: "Year 1", min: 5.5, max: 8 },
    { year: 3, label: "Year 3 (Sr. Prog.)", min: 9, max: 16 },
    { year: 5, label: "Year 5 (Lead)", min: 16, max: 28 },
    { year: 10, label: "Year 10 (Stat. Lead)", min: 30, max: 55 },
  ],
  offshoreMultiplier: 1.6,
};

const AI: PathDossier = {
  ...genericTemplate(),
  salaryTrajectory: [
    { year: 0, label: "Entry (ML Assoc.)", min: 6, max: 10 },
    { year: 1, label: "Year 1", min: 8, max: 14 },
    { year: 3, label: "Year 3 (AI Eng.)", min: 14, max: 28 },
    { year: 5, label: "Year 5 (Sr. Eng.)", min: 25, max: 50 },
    { year: 10, label: "Year 10 (Lead)", min: 45, max: 90 },
  ],
  growthIndex: [
    { year: 2016, index: 100 },
    { year: 2018, index: 156 },
    { year: 2020, index: 232 },
    { year: 2022, index: 348 },
    { year: 2024, index: 486 },
    { year: 2026, index: 612 },
  ],
  offshoreMultiplier: 1.8,
};

export const PATH_DOSSIERS: Record<string, PathDossier> = {
  pharmacovigilance: PV,
  "medical-coding": MEDICAL_CODING,
  "clinical-data-management": CDM,
  "regulatory-affairs": REGULATORY,
  "sas-clinical": SAS,
  "ai-intelligence": AI,
};

export function getPathDossier(slug: string): PathDossier {
  return PATH_DOSSIERS[slug] ?? genericTemplate();
}
