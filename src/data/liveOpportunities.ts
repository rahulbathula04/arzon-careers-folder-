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
  status: "active" | "screening" | "routing";
  urgencyLabel: string;
  skills: string[];
  trackSlug: string;
  description: string;
}

export interface LiveIntakeMetadata {
  totalActiveRoles: number;
  primaryEmployers: string[];
  currentCohortStartDate: string;
  benchmarkScoreRequired: string;
  vmoId: string;
  disclaimer: string;
}

export const LiveOpportunitiesData = {
  METADATA: {
    totalActiveRoles: 75,
    primaryEmployers: ["HSBC Holdings", "JPMorgan Chase & Co.", "Certified Partner Network"],
    currentCohortStartDate: "30 August 2026",
    benchmarkScoreRequired: "75 / 100 on internal assessment",
    vmoId: "HSBC2621TAVM026",
    disclaimer:
      "Salary and placement outcomes depend on candidate eligibility, assessment performance, employer requirements, and final selection. Arzon Careers does not guarantee employment or specific salary figures.",
  },

  ROLES: [
    {
      id: "jpmc-data-analyst",
      role: "Data Analyst",
      employer: "JPMorgan Chase & Co.",
      partnerBadge: "JPMC PARTNER DESK",
      openingsCount: 10,
      openingsDisplay: "10 Openings",
      eligibility: "Freshers & Recent Graduates (B.Tech / BE / B.Sc / Math / STEM)",
      ctcDisplay: "₹14 LPA CTC",
      deadlineDisplay: "September 15, 2026",
      status: "active",
      urgencyLabel: "High Priority Intake",
      skills: ["SQL", "Python", "Power BI", "Financial Analytics", "Statistics"],
      trackSlug: "data-analyst",
      description: "Analyze bank-domain financial datasets, construct reporting dashboards, and model operational metrics for global banking teams.",
    },
    {
      id: "hsbc-aiml",
      role: "AI / ML Engineer",
      employer: "HSBC Holdings",
      partnerBadge: "VMO ID: HSBC2621TAVM026",
      openingsCount: 25,
      openingsDisplay: "Current Intake Window",
      eligibility: "B.Tech / BE / MCA / CS Background (Freshers Eligible)",
      ctcDisplay: "As per HSBC JD Brief",
      deadlineDisplay: "Current Intake Window",
      status: "screening",
      urgencyLabel: "Screening Active",
      skills: ["Python + OOP", "ML Algorithms", "PyTorch / TensorFlow", "NLP / GenAI", "Banking Context"],
      trackSlug: "ai-ml",
      description: "Build deep learning, NLP, and predictive AI pipelines calibrated to HSBC's technical screening standards.",
    },
    {
      id: "python-tech-dev",
      role: "Python / Data Developer",
      employer: "Certified Partner Network",
      partnerBadge: "PARTNER PIPELINE",
      openingsCount: 40,
      openingsDisplay: "40+ Live Positions",
      eligibility: "Freshers & 0-2 Yrs Experience",
      ctcDisplay: "₹6.0 – ₹10.0 LPA",
      deadlineDisplay: "Rolling Intake",
      status: "routing",
      urgencyLabel: "Profiles Being Routed",
      skills: ["Python", "REST APIs", "SQL", "Git", "Data Structures"],
      trackSlug: "python-dev",
      description: "Develop enterprise API integrations, clean data processing scripts, and backend microservices.",
    },
  ];
}
