export interface MatchBreakdown {
  skillsMatch: number;
  roleFit: number;
  educationMatch: number;
  experienceMatch: number;
}

export interface LiveRoleBrief {
  id: string;
  role: string;
  employer: string;
  category: "AI_ML" | "DATA" | "QUANT" | "CLOUD";
  openingsCount: number;
  openingsDisplay: string;
  eligibility: string;
  ctcDisplay: string;
  location: string;
  status: "OPEN" | "CLOSING_SOON" | "CLOSED" | "PAUSED" | "FILLED";
  overallMatch: number;
  matchBreakdown: MatchBreakdown;
  matchingSkills: string[];
  gapSkills: string[];
  skills: string[];
  trackSlug: string;
  description: string;
  hiringSteps: string[];
  routingSla: string;
  partnerBadge?: string;
  deadlineDisplay?: string;
  urgencyLabel?: string;
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
    primaryEmployers: ["Global Tech Enterprises", "Investment & Quant Platforms", "Enterprise AI GCCs"],
    currentCohortStartDate: "30 August 2026",
    benchmarkScoreRequired: "75 / 100 on internal ACRI assessment",
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
        definition: "Unique candidates who completed the 20-minute readiness assessment.",
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
      description: "Full curriculum + 4-week enterprise-domain internship, timed HackerRank mock assessment, and verified certificate.",
      recommended: true,
      features: [
        "Everything in Foundation Tier",
        "4-Week Enterprise-Domain Applied Internship",
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
      id: "QUANT-DATA-01",
      role: "Quantitative Data Analyst",
      employer: "Global Quant Financial Systems",
      category: "QUANT",
      openingsCount: 10,
      openingsDisplay: "10 Openings",
      eligibility: "B.Tech / BE / B.Sc / Mathematics / STEM (Freshers Eligible)",
      ctcDisplay: "₹14 LPA CTC",
      location: "Bengaluru / Hybrid",
      status: "CLOSING_SOON",
      overallMatch: 94,
      matchBreakdown: {
        skillsMatch: 97,
        roleFit: 93,
        educationMatch: 100,
        experienceMatch: 88,
      },
      matchingSkills: ["SQL Windowing", "Python", "Power BI", "Financial Analytics"],
      gapSkills: ["Stochastic Modeling"],
      skills: ["SQL", "Python", "Power BI", "Financial Analytics", "Statistics"],
      trackSlug: "quant-analyst",
      description: "Analyze streaming financial datasets, construct real-time risk dashboards, and optimize quantitative algorithms.",
      hiringSteps: [
        "Verified Profile Routing (Within 24 hours)",
        "Technical Coding & SQL Evaluation",
        "Hiring Manager Technical Interview",
      ],
      routingSla: "24-Hour Direct Routing",
    },
    {
      id: "ENTERPRISE-AIML-02",
      role: "Enterprise AI / ML Systems Engineer",
      employer: "Tier-1 Enterprise Cloud Platforms",
      category: "AI_ML",
      openingsCount: 25,
      openingsDisplay: "25 Openings",
      eligibility: "B.Tech / BE / MCA / CS & AI Background",
      ctcDisplay: "₹14–18 LPA CTC",
      location: "Hyderabad / On-site",
      status: "OPEN",
      overallMatch: 91,
      matchBreakdown: {
        skillsMatch: 94,
        roleFit: 90,
        educationMatch: 95,
        experienceMatch: 85,
      },
      matchingSkills: ["Python", "PyTorch", "FastAPI", "Docker"],
      gapSkills: ["Kubernetes Operator Development"],
      skills: ["Python", "PyTorch", "FastAPI", "Docker", "MLOps"],
      trackSlug: "ai-engineer",
      description: "Build scalable GenAI microservices, optimize LLM inference pipelines, and implement production RAG systems.",
      hiringSteps: [
        "ACRI Benchmark Dossier Submission",
        "System Design & MLOps Interview",
        "Final Offer SLA within 5 Business Days",
      ],
      routingSla: "12-Hour Priority Routing",
    },
    {
      id: "LAKEHOUSE-ARCH-03",
      role: "Lakehouse Data Engineer",
      employer: "Global Analytics & Data Infra GCC",
      category: "DATA",
      openingsCount: 15,
      openingsDisplay: "15 Openings",
      eligibility: "B.Tech / BE / Data Science / IT Freshers & 0-2 yrs",
      ctcDisplay: "₹10–14 LPA CTC",
      location: "Bengaluru / Hybrid",
      status: "OPEN",
      overallMatch: 88,
      matchBreakdown: {
        skillsMatch: 90,
        roleFit: 86,
        educationMatch: 90,
        experienceMatch: 86,
      },
      matchingSkills: ["PySpark", "SQL", "Iceberg", "Data Pipeline CI/CD"],
      gapSkills: ["Snowflake Snowpark"],
      skills: ["PySpark", "SQL", "Apache Iceberg", "Delta Lake", "Airflow"],
      trackSlug: "data-engineer",
      description: "Design high-concurrency ETL pipelines, implement Apache Iceberg catalogs, and optimize distributed SQL queries.",
      hiringSteps: [
        "Partner Desk Profile Review",
        "Live Data Pipeline Coding Round",
        "Direct Manager Discussion",
      ],
      routingSla: "24-Hour Direct Routing",
    },
    {
      id: "CLOUD-DEVOPS-04",
      role: "Cloud AI Infrastructure Engineer",
      employer: "Enterprise Cloud Systems",
      category: "CLOUD",
      openingsCount: 12,
      openingsDisplay: "12 Openings",
      eligibility: "CS / IT / ECE Graduates",
      ctcDisplay: "₹12–16 LPA CTC",
      location: "Pune / Remote",
      status: "OPEN",
      overallMatch: 86,
      matchBreakdown: {
        skillsMatch: 88,
        roleFit: 85,
        educationMatch: 90,
        experienceMatch: 82,
      },
      matchingSkills: ["Docker", "Kubernetes", "AWS / Azure", "Terraform"],
      gapSkills: ["eBPF Observability"],
      skills: ["Docker", "Kubernetes", "Terraform", "CI/CD Pipelines", "Python"],
      trackSlug: "cloud-engineer",
      description: "Provision multi-region Kubernetes clusters, build automated CI/CD pipelines, and secure enterprise AI endpoints.",
      hiringSteps: [
        "Automated Profile Routing",
        "Cloud Infrastructure Architecture Assessment",
        "Executive Leadership Interview",
      ],
      routingSla: "24-Hour Direct Routing",
    },
  ] as LiveRoleBrief[],
};
