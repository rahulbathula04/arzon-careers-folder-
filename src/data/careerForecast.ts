/**
 * Career forecast records - one per trainable path slug. Numbers sourced
 * from JD aggregation (Naukri + LinkedIn + AmbitionBox, refreshed quarterly)
 * and NASSCOM / IQVIA sector reports. Used by the result page Career
 * Forecast panel to render today + 5-yr + 10-yr trajectory.
 */

export type AIRiskLevel = "augmented" | "audit" | "resistant";
export type DemandLevel = "Very High" | "High" | "Steady";

export interface CareerForecast {
  slug: string;
  title: string;
  /** Median fresher package (LPA), today's market. */
  avgFresherLpa: number;
  fresherRange: [number, number];
  /** What the role does, day-to-day. 3 short bullets. */
  roleExpectations: string[];
  /** Annual salary growth (sector CAGR). */
  cagr: number;
  /** Demand strength + driver. */
  demand: DemandLevel;
  demandDriver: string;
  /** Indian openings per year, rough order-of-magnitude. */
  openingsPerYearIN: string;
  /** AI risk + 1-line note explaining what survives automation. */
  aiRisk: AIRiskLevel;
  aiNote: string;
  /** Year-5 trajectory. */
  y5RoleTitle: string;
  y5LpaRange: [number, number];
  /** Year-10 trajectory. */
  y10RoleTitle: string;
  y10LpaRange: [number, number];
  /** Abroad equivalent (1-liner, optional). */
  abroad?: { country: string; flag: string; payInrEquiv: string };
  /** Top hiring employers, max 6. */
  topEmployers: string[];
  /** Source label for the footer. */
  asOf: string;
}

export const CAREER_FORECASTS: Record<string, CareerForecast> = {
  pharmacovigilance: {
    slug: "pharmacovigilance",
    title: "Pharmacovigilance",
    avgFresherLpa: 4.5,
    fresherRange: [3.5, 6.2],
    roleExpectations: [
      "Process 8–12 adverse-event cases per day in Argus or ARISg",
      "Code symptoms in MedDRA, classify seriousness, file ICSR within the regulator clock",
      "Review aggregate reports (PSUR/PBRER) under a senior reviewer",
    ],
    cagr: 0.13,
    demand: "Very High",
    demandDriver: "India runs PV for ~70% of global pharma; demand is structural, not cyclical.",
    openingsPerYearIN: "12,000+ /yr",
    aiRisk: "augmented",
    aiNote:
      "AI drafts narratives and pre-codes terms. Causality + regulator submission stay human.",
    y5RoleTitle: "Aggregate Report Writer / Team Lead",
    y5LpaRange: [9, 14],
    y10RoleTitle: "PV Manager / Signal Detection Lead",
    y10LpaRange: [16, 28],
    abroad: {
      country: "Ireland",
      flag: "🇮🇪",
      payInrEquiv: "₹35–55 LPA equivalent (EU-QPPV pipeline)",
    },
    topEmployers: ["IQVIA", "Parexel", "ICON plc", "Labcorp", "Indegene", "Cognizant LS"],
    asOf: "Nov 2025",
  },
  "medical-coding": {
    slug: "medical-coding",
    title: "Medical Coding",
    avgFresherLpa: 3.8,
    fresherRange: [3.0, 5.0],
    roleExpectations: [
      "Code 30–60 charts per day in ICD-10-CM, CPT and HCPCS",
      "Hit a 95%+ accuracy bar audited by US/EU payer QA teams",
      "Specialise into IP-DRG, E/M or surgery coding for higher pay bands",
    ],
    cagr: 0.08,
    demand: "Very High",
    demandDriver: "80,000+ openings/yr in India; US healthcare RCM growth is structural.",
    openingsPerYearIN: "80,000+ /yr",
    aiRisk: "audit",
    aiNote:
      "Computer-assisted coding handles 60% of straightforward charts. Auditors and specialty coders grow.",
    y5RoleTitle: "Senior Coder / Auditor (CCS, CIC)",
    y5LpaRange: [7, 11],
    y10RoleTitle: "Coding Manager / RCM Operations Lead",
    y10LpaRange: [12, 20],
    abroad: { country: "UAE", flag: "🇦🇪", payInrEquiv: "₹14–22 LPA equivalent (DHA/HAAD)" },
    topEmployers: [
      "Optum",
      "Omega Healthcare",
      "Access Healthcare",
      "AGS Health",
      "Sutherland",
      "R1 RCM",
    ],
    asOf: "Nov 2025",
  },
  "clinical-data-management": {
    slug: "clinical-data-management",
    title: "Clinical Data Management",
    avgFresherLpa: 4.6,
    fresherRange: [4.0, 6.5],
    roleExpectations: [
      "Build and validate eCRFs in Medidata Rave, Veeva CDB or Oracle Inform",
      "Write edit checks, raise + close discrepancies, run weekly data review",
      "Drive database lock with biostats and the trial sponsor",
    ],
    cagr: 0.11,
    demand: "Very High",
    demandDriver: "Decentralised trials and EDC standardisation pushed CDM hiring up 22% in 2024.",
    openingsPerYearIN: "8,000+ /yr",
    aiRisk: "augmented",
    aiNote:
      "AI handles edit-check writing + discrepancy auto-triage. Lead CDM judgement stays human.",
    y5RoleTitle: "Lead Data Manager / Study Lead",
    y5LpaRange: [10, 16],
    y10RoleTitle: "CDM Programme Manager / Head of Data Ops",
    y10LpaRange: [18, 32],
    abroad: {
      country: "Singapore",
      flag: "🇸🇬",
      payInrEquiv: "₹28–45 LPA equivalent (APAC trial hubs)",
    },
    topEmployers: ["IQVIA", "Parexel", "Syneos Health", "ICON plc", "Veeva Systems", "Novotech"],
    asOf: "Nov 2025",
  },
  "regulatory-affairs": {
    slug: "regulatory-affairs",
    title: "Regulatory Affairs",
    avgFresherLpa: 5.0,
    fresherRange: [4.0, 7.0],
    roleExpectations: [
      "Author CTD/eCTD modules for ANDA, NDA and EU MAA submissions",
      "Track regulatory commitments, deficiency letters and post-approval changes",
      "Liaise between R&D, manufacturing and the regulator",
    ],
    cagr: 0.12,
    demand: "High",
    demandDriver: "India is now the #1 ANDA filer to FDA - every generic needs RA support.",
    openingsPerYearIN: "5,000+ /yr",
    aiRisk: "augmented",
    aiNote: "AI summarises dossiers and auto-checks formatting. Submission strategy stays human.",
    y5RoleTitle: "Senior RA Associate / Submission Lead",
    y5LpaRange: [10, 16],
    y10RoleTitle: "RA Manager / Head of Regulatory Strategy",
    y10LpaRange: [18, 35],
    abroad: { country: "Ireland", flag: "🇮🇪", payInrEquiv: "₹40–65 LPA equivalent (EU RA)" },
    topEmployers: ["Dr. Reddy's", "Sun Pharma", "Cipla", "Aurobindo", "Lupin", "Novartis"],
    asOf: "Nov 2025",
  },
  "sas-clinical": {
    slug: "sas-clinical",
    title: "SAS Programming (Clinical)",
    avgFresherLpa: 5.5,
    fresherRange: [4.5, 7.5],
    roleExpectations: [
      "Build SDTM and ADaM datasets per CDISC standards",
      "Programme TLFs (tables, listings, figures) for clinical study reports",
      "Validate output via double-programming with biostats",
    ],
    cagr: 0.14,
    demand: "Very High",
    demandDriver: "Every CDISC submission needs SAS programmers; hiring is supply-constrained.",
    openingsPerYearIN: "4,000+ /yr",
    aiRisk: "augmented",
    aiNote:
      "AI generates boilerplate macros. Validation, CDISC mapping and submission QC stay human.",
    y5RoleTitle: "Senior SAS Programmer / Lead",
    y5LpaRange: [12, 20],
    y10RoleTitle: "Programming Manager / Stats Programming Head",
    y10LpaRange: [22, 40],
    abroad: { country: "USA", flag: "🇺🇸", payInrEquiv: "₹65–110 LPA equivalent (H1B)" },
    topEmployers: ["IQVIA", "Cytel", "Parexel", "PPD", "TCS BioSciences", "SAS Institute"],
    asOf: "Nov 2025",
  },
  "ai-intelligence": {
    slug: "ai-intelligence",
    title: "AI in Healthcare",
    avgFresherLpa: 8.5,
    fresherRange: [6.0, 14.0],
    roleExpectations: [
      "Build and fine-tune LLMs / vision models for clinical or payer workflows",
      "Validate model outputs against clinician-labelled gold sets",
      "Ship production pipelines to hospitals, CROs or pharma R&D teams",
    ],
    cagr: 0.22,
    demand: "Very High",
    demandDriver:
      "Healthcare AI VC funding 5x since 2022; hiring is talent-constrained, not budget-constrained.",
    openingsPerYearIN: "3,000+ /yr",
    aiRisk: "resistant",
    aiNote: "You ARE the automation. Roles compound rather than shrink as models improve.",
    y5RoleTitle: "Senior ML / Applied AI Engineer",
    y5LpaRange: [22, 40],
    y10RoleTitle: "AI Tech Lead / Healthcare AI Architect",
    y10LpaRange: [40, 90],
    abroad: { country: "USA", flag: "🇺🇸", payInrEquiv: "₹1.2–2.5 Cr equivalent (Bay Area)" },
    topEmployers: [
      "Google Health",
      "Microsoft Health",
      "Tempus AI",
      "Innovaccer",
      "Qure.ai",
      "Nference",
    ],
    asOf: "Nov 2025",
  },
  "clinical-saas": {
    slug: "clinical-saas",
    title: "Clinical SaaS Programme",
    avgFresherLpa: 6.0,
    fresherRange: [5.0, 9.0],
    roleExpectations: [
      "Run product demos and onboarding for hospital, CRO or pharma customers",
      "Own a quarterly retention + expansion target for an account book",
      "Bridge between customer success, product and clinical SMEs",
    ],
    cagr: 0.16,
    demand: "High",
    demandDriver: "Clinical SaaS market growing 18% CAGR; sales+CS heads are the bottleneck.",
    openingsPerYearIN: "2,500+ /yr",
    aiRisk: "augmented",
    aiNote:
      "AI handles outreach + meeting prep. Trust-building and clinical-context judgement stay human.",
    y5RoleTitle: "Account Executive / Customer Success Manager",
    y5LpaRange: [14, 25],
    y10RoleTitle: "Sales Director / VP Customer Success",
    y10LpaRange: [30, 70],
    abroad: { country: "Singapore", flag: "🇸🇬", payInrEquiv: "₹35–60 LPA equivalent (APAC SaaS)" },
    topEmployers: [
      "Veeva Systems",
      "Medidata",
      "Innovaccer",
      "Doceree",
      "ZS Associates",
      "IQVIA Tech",
    ],
    asOf: "Nov 2025",
  },
  "software-engineer": {
    slug: "software-engineer",
    title: "Software Engineer (Product / Backend)",
    avgFresherLpa: 8.0,
    fresherRange: [6.0, 14.0],
    roleExpectations: [
      "Ship features in TypeScript / Java / Go behind a product team",
      "Own 1-2 services end-to-end including on-call and incident response",
      "Pair on system design, code review and architecture for the next bet",
    ],
    cagr: 0.18,
    demand: "Very High",
    demandDriver:
      "Indian product co's (Razorpay, Zerodha, PhonePe, Atlassian) hire 40k+/yr; pay 2-3x service co's.",
    openingsPerYearIN: "120,000+ /yr",
    aiRisk: "augmented",
    aiNote:
      "Copilot writes boilerplate. System design, debugging and review compound - they don't shrink.",
    y5RoleTitle: "SDE-2 / Senior Engineer",
    y5LpaRange: [22, 40],
    y10RoleTitle: "Staff Engineer / Engineering Manager",
    y10LpaRange: [45, 95],
    abroad: {
      country: "USA",
      flag: "🇺🇸",
      payInrEquiv: "₹1.4–3 Cr equivalent (Big Tech / unicorns)",
    },
    topEmployers: ["Google", "Microsoft", "Atlassian", "Razorpay", "Zerodha", "PhonePe"],
    asOf: "Nov 2025",
  },
  "business-analyst": {
    slug: "business-analyst",
    title: "Business Analyst / Data Analyst",
    avgFresherLpa: 6.0,
    fresherRange: [4.5, 9.0],
    roleExpectations: [
      "Pull data in SQL, model in Excel / Python, build Tableau / PowerBI dashboards",
      "Own a metric (acquisition, retention, ops) and report to leadership weekly",
      "Translate ambiguous business questions into structured analyses",
    ],
    cagr: 0.15,
    demand: "Very High",
    demandDriver:
      "Every Indian SaaS, fintech and e-com co hires BAs/DAs; SQL+storytelling combo is supply-constrained.",
    openingsPerYearIN: "45,000+ /yr",
    aiRisk: "augmented",
    aiNote: "AI auto-charts data. Question framing and stakeholder narrative stay human.",
    y5RoleTitle: "Senior Analyst / Analytics Lead",
    y5LpaRange: [14, 24],
    y10RoleTitle: "Head of Analytics / BI Manager",
    y10LpaRange: [28, 55],
    abroad: {
      country: "Singapore",
      flag: "🇸🇬",
      payInrEquiv: "₹30–55 LPA equivalent (APAC analytics)",
    },
    topEmployers: ["Amazon", "Flipkart", "Razorpay", "Swiggy", "ZS Associates", "Tiger Analytics"],
    asOf: "Nov 2025",
  },
  "b2b-saas-sales": {
    slug: "b2b-saas-sales",
    title: "B2B SaaS Sales / Customer Success",
    avgFresherLpa: 5.5,
    fresherRange: [4.5, 9.0],
    roleExpectations: [
      "Run 30-50 outbound calls / demos per week against a quarterly quota",
      "Own pipeline, MRR retention or expansion for an account book",
      "Bridge customers to product, success and marketing",
    ],
    cagr: 0.18,
    demand: "Very High",
    demandDriver:
      "Indian SaaS (Freshworks, Zoho, Postman, Razorpay) is the fastest path from BBA to ₹25 LPA.",
    openingsPerYearIN: "25,000+ /yr",
    aiRisk: "augmented",
    aiNote:
      "AI handles cold outreach + meeting prep. Negotiation, objection handling and trust stay human.",
    y5RoleTitle: "Account Executive / CSM",
    y5LpaRange: [12, 22],
    y10RoleTitle: "Sales Director / Head of CS",
    y10LpaRange: [28, 65],
    abroad: { country: "Dubai", flag: "🇦🇪", payInrEquiv: "₹30–55 LPA equivalent (MENA SaaS)" },
    topEmployers: ["Freshworks", "Zoho", "Postman", "Razorpay", "Salesforce", "HubSpot"],
    asOf: "Nov 2025",
  },
  "agri-tech-ops": {
    slug: "agri-tech-ops",
    title: "Agri-Tech Product Operations",
    avgFresherLpa: 4.5,
    fresherRange: [3.5, 7.0],
    roleExpectations: [
      "Run field pilots with farmers, FPOs and rural distribution partners",
      "Own a region's supply, quality, traceability or input-sales metric",
      "Bridge between agronomy SMEs, product and operations teams",
    ],
    cagr: 0.16,
    demand: "High",
    demandDriver:
      "Indian agri-tech raised $1B+ since 2022; field-aware grads are the bottleneck for scaling.",
    openingsPerYearIN: "8,000+ /yr",
    aiRisk: "resistant",
    aiNote: "Field judgement, farmer trust and last-mile execution can't be automated.",
    y5RoleTitle: "Regional Ops Manager / Category Lead",
    y5LpaRange: [10, 18],
    y10RoleTitle: "VP Operations / Supply Chain Head",
    y10LpaRange: [22, 45],
    abroad: {
      country: "Kenya",
      flag: "🇰🇪",
      payInrEquiv: "₹15–28 LPA equivalent (Africa agri-tech)",
    },
    topEmployers: ["DeHaat", "Ninjacart", "Cropin", "WayCool", "AgroStar", "Samunnati"],
    asOf: "Nov 2025",
  },
};

export function getForecast(slug: string): CareerForecast | null {
  return CAREER_FORECASTS[slug] ?? null;
}
