export interface LiveRoleBrief {
  id: string;
  role: string;
  employer: string;
  partnerBadge: string;
  openingsCount: number;
  openingsDisplay: string;
  eligibility: string;
  ctcDisplay: string;
  deadlineDisplay: string;
  status: "OPEN" | "CLOSING_SOON" | "CLOSED" | "PAUSED" | "FILLED";
  urgencyLabel: string;
  skills: string[];
  trackSlug: string;
  description: string;
}

export interface MetricDefinition {
  metricKey: string;
  value: number;
  label: string;
  definition: string;
}

export interface CompetitionPipelineMetrics {
  candidatesAssessed: number;
  candidatesMeetingCriteria: number;
  profilesSubmitted: number;
  interviewsScheduled: number;
  currentOpenings: number;
  acceptRatePercent: number;
  rejectionRatePercent: number;
  period: string;
  source: string;
  lastUpdated: string;
  definitions: MetricDefinition[];
}

export interface PricingAccessTier {
  id: string;
  name: string;
  badge: string;
  price: number;
  priceDisplay: string;
  emiDisplay: string;
  accessLevel: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const LiveOpportunitiesData = {
  METADATA: {
    totalActiveRoles: 75,
    primaryEmployers: ["HSBC Holdings", "JPMorgan Chase & Co.", "Certified Partner Network"],
    currentCohortStartDate: "30 August 2026",
    benchmarkScoreRequired: "75 / 100 on internal assessment",
    vmoId: "HSBC2621TAVM026",
    disclaimer:
      "Salary outcomes depend on employer requirements, role availability, candidate assessment performance, and final selection. Arzon Careers does not guarantee employment or specific salary outcomes.",
  },

  COMPETITION_METRICS: {
    candidatesAssessed: 1842,
    candidatesMeetingCriteria: 663,
    profilesSubmitted: 214,
    interviewsScheduled: 48,
    currentOpenings: 75,
    acceptRatePercent: 36,
    rejectionRatePercent: 64,
    period: "2026-08-01 to 2026-08-15",
    source: "Arzon Candidate Assessment Ledger",
    lastUpdated: "15 Aug 2026, 5:30 PM IST",
    definitions: [
      {
        metricKey: "candidatesAssessed",
        value: 1842,
        label: "Candidates Assessed",
        definition: "Unique candidates who completed the 20-minute readiness assessment during the evaluation period.",
      },
      {
        metricKey: "candidatesMeetingCriteria",
        value: 663,
        label: "Met Initial Criteria",
        definition: "Candidates meeting academic eligibility and scoring above initial screening threshold (663 / 1,842 = 36.0%).",
      },
      {
        metricKey: "profilesSubmitted",
        value: 214,
        label: "Submitted to Partner Desk",
        definition: "Candidate dossiers cleared by internal mentors and formally submitted through the certified partner process.",
      },
      {
        metricKey: "interviewsScheduled",
        value: 48,
        label: "Interviews Scheduled",
        definition: "Direct recruiter or hiring manager interview calls confirmed by partner employer teams.",
      },
    ],
  } as CompetitionPipelineMetrics,

  PRICING_TIERS: [
    {
      id: "foundation",
      name: "FOUNDATION",
      badge: "KNOWLEDGE",
      price: 14999,
      priceDisplay: "₹14,999",
      emiDisplay: "₹1,499 / mo",
      accessLevel: "Learn & Build Skills",
      description: "Comprehensive curriculum, live mentor-led classes, and foundational capstone assignments.",
      features: [
        "8-Week Live Technical Curriculum",
        "Graded Weekly Homework & Lab Files",
        "Community & Mentor Q&A Support",
        "Foundational Project Portfolio",
      ],
    },
    {
      id: "career",
      name: "CAREER",
      badge: "READINESS",
      price: 24999,
      priceDisplay: "₹24,999",
      emiDisplay: "₹2,499 / mo",
      accessLevel: "Become Pipeline-Ready",
      description: "Full curriculum + 4-week bank-domain internship, timed HackerRank mock assessment, and verified certificate.",
      recommended: true,
      features: [
        "Everything in Foundation Tier",
        "4-Week Bank-Domain Applied Internship",
        "Internal HackerRank Mock Assessment (75/100 Benchmark)",
        "Certified Partner Desk Profile Routing",
        "Verified Certificate with Public Verification URL",
      ],
    },
    {
      id: "elite",
      name: "ELITE",
      badge: "DIRECT ACCESS",
      price: 39999,
      priceDisplay: "₹39,999",
      emiDisplay: "₹3,999 / mo",
      accessLevel: "Direct Introduction Support",
      description: "Complete readiness pipeline + up to 3 verified hiring-manager introductions and VIP fast-track routing.",
      features: [
        "Everything in Career Tier",
        "Up to 3 Verified Hiring Manager Introductions",
        "1-on-1 Executive Resume & Portfolio Audit",
        "Priority Partner Desk Dossier Submission",
        "7-Day Recruiter SLA Tracking",
      ],
    },
  ] as PricingAccessTier[],

  ROLES: [
    {
      id: "JPMC-DA-2026-09",
      role: "Data Analyst",
      employer: "JPMorgan Chase & Co.",
      partnerBadge: "JPMC PARTNER DESK",
      openingsCount: 10,
      openingsDisplay: "10 Openings",
      eligibility: "Freshers & Recent Graduates (B.Tech / BE / B.Sc / Math / STEM)",
      ctcDisplay: "₹14 LPA CTC",
      deadlineDisplay: "September 15, 2026",
      status: "CLOSING_SOON",
      urgencyLabel: "Application Cutoff Sept 15",
      skills: ["SQL", "Python", "Power BI", "Financial Analytics", "Statistics"],
      trackSlug: "data-analyst",
      description: "Analyze bank-domain financial datasets, construct reporting dashboards, and model operational metrics for global banking teams.",
    },
    {
      id: "HSBC-AIML-2026-08",
      role: "AI / ML Engineer",
      employer: "HSBC Holdings",
      partnerBadge: "VMO ID: HSBC2621TAVM026",
      openingsCount: 25,
      openingsDisplay: "Current Intake Window",
      eligibility: "B.Tech / BE / MCA / CS Background (Freshers Eligible)",
      ctcDisplay: "As per HSBC JD Brief",
      deadlineDisplay: "Current Intake Window",
      status: "OPEN",
      urgencyLabel: "Screening Active",
      skills: ["Python + OOP", "ML Algorithms", "PyTorch / TensorFlow", "NLP / GenAI", "Banking Context"],
      trackSlug: "ai-ml",
      description: "Build deep learning, NLP, and predictive AI pipelines calibrated to HSBC's technical screening standards.",
    },
    {
      id: "PARTNER-PYTHON-2026-08",
      role: "Python / Data Developer",
      employer: "Certified Partner Network",
      partnerBadge: "PARTNER PIPELINE",
      openingsCount: 40,
      openingsDisplay: "40+ Live Positions",
      eligibility: "Freshers & 0-2 Yrs Experience",
      ctcDisplay: "₹6.0 – ₹10.0 LPA",
      deadlineDisplay: "Rolling Intake",
      status: "OPEN",
      urgencyLabel: "Profiles Being Routed",
      skills: ["Python", "REST APIs", "SQL", "Git", "Data Structures"],
      trackSlug: "python-dev",
      description: "Develop enterprise API integrations, clean data processing scripts, and backend microservices.",
    },
  ] as LiveRoleBrief[],
};
