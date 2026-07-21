/**
 * Per-path briefing data — Indian role variants, employers grouped by tier,
 * and concrete employer requirements. Powers PathBriefing on the result page.
 * Pairs with careerForecast.ts (pay + growth lives there).
 */

export interface CompanyTier {
  label: string;
  note: string;
  companies: string[];
}

export interface PathBriefingData {
  slug: string;
  /** Indian role titles a fresher applies to under this path. */
  roleVariants: string[];
  /** What recruiters actually screen for, in order of weight. */
  employerRequirements: string[];
  /** Companies grouped by tier — pay + brand mix. */
  tiers: CompanyTier[];
  /** 90-day "first job" plan a fresher should run after the cohort. */
  firstNinetyDays: string[];
}

export const PATH_BRIEFINGS: Record<string, PathBriefingData> = {
  pharmacovigilance: {
    slug: "pharmacovigilance",
    roleVariants: [
      "Drug Safety Associate",
      "ICSR Case Processor",
      "Aggregate Report Writer",
      "Signal Detection Analyst",
    ],
    employerRequirements: [
      "Life-sciences degree (B.Pharm / M.Pharm / Pharm.D / B.Sc Life-Sci)",
      "Hands-on with Argus, ARISg or Veeva Vault Safety (any one)",
      "MedDRA + WHO-DD coding accuracy demonstrated on a sample case",
      "ICH-GVP / 21 CFR 314.80 awareness in interview",
      "English writing — narratives must read like the reviewer wrote them",
    ],
    tiers: [
      {
        label: "Tier-1 CRO/Pharma",
        note: "₹4.5–6.5 LPA fresher · global trial books",
        companies: ["IQVIA", "Parexel", "ICON plc", "Labcorp", "Syneos Health"],
      },
      {
        label: "Tier-2 specialists",
        note: "₹3.8–5.0 LPA fresher · faster ladder",
        companies: ["Indegene", "Cognizant LS", "Tata Elxsi LS", "Navitas", "TAKE Solutions"],
      },
      {
        label: "Indian pharma in-house",
        note: "₹3.5–4.5 LPA · domestic + EU PSURs",
        companies: ["Sun Pharma", "Dr. Reddy's", "Cipla", "Lupin", "Aurobindo"],
      },
    ],
    firstNinetyDays: [
      "Clear Argus / ARISg system test in week 1",
      "Hit 95%+ MedDRA coding accuracy on training cases by week 4",
      "Own end-to-end ICSR processing for 1 product by month 3",
    ],
  },
  "medical-coding": {
    slug: "medical-coding",
    roleVariants: ["Medical Coder (CPC trainee)", "IP-DRG Coder", "E/M Coder", "Coding Auditor"],
    employerRequirements: [
      "Life-sciences / paramedical / nursing background",
      "AAPC CPC or AHIMA CCS certification (or in-progress)",
      "ICD-10-CM, CPT, HCPCS Level II working knowledge",
      "95%+ accuracy on a 30-chart screening test",
      "Comfort with US payer rules (Medicare, Medicaid, commercial)",
    ],
    tiers: [
      {
        label: "Tier-1 RCM majors",
        note: "₹3.8–5.0 LPA · structured ladder + certs paid",
        companies: ["Optum", "Omega Healthcare", "Access Healthcare", "AGS Health", "R1 RCM"],
      },
      {
        label: "Tier-2 RCM",
        note: "₹3.0–4.0 LPA · faster specialty pivot",
        companies: ["Sutherland", "GeBBS", "Visionary RCM", "Vee Healthtek", "Episource"],
      },
      {
        label: "Hospital-aligned",
        note: "₹3.5–4.5 LPA · in-house IP-DRG focus",
        companies: ["Apollo HealthCo", "Manipal Health", "Max Healthcare BPO arms"],
      },
    ],
    firstNinetyDays: [
      "Clear CPC / CCS certification by week 6",
      "Move from training to production charts by week 8",
      "Hit production benchmark of 30+ charts/day by month 3",
    ],
  },
  "clinical-data-management": {
    slug: "clinical-data-management",
    roleVariants: [
      "Clinical Data Coordinator",
      "CDM Associate",
      "EDC Designer",
      "Lead Data Manager (Y3+)",
    ],
    employerRequirements: [
      "Life-sciences degree + SCDM awareness",
      "Hands-on with Medidata Rave, Veeva CDB or Oracle Inform",
      "SQL basics + ability to write edit checks",
      "ICH-GCP working knowledge",
      "Detail discipline visible in trial / project sample work",
    ],
    tiers: [
      {
        label: "Tier-1 CRO",
        note: "₹4.6–6.5 LPA · global Phase 2/3 books",
        companies: ["IQVIA", "Parexel", "ICON plc", "Syneos Health", "PPD"],
      },
      {
        label: "Tech-led CDM",
        note: "₹5.0–7.0 LPA · EDC product + services",
        companies: ["Veeva Systems", "Medidata", "Oracle Health Sciences", "eClinicalWorks"],
      },
      {
        label: "Mid-tier CRO",
        note: "₹3.8–5.0 LPA · faster lead-CDM ladder",
        companies: ["Novotech", "Sciformix", "Tata Consultancy LS", "Wipro LS"],
      },
    ],
    firstNinetyDays: [
      "Clear EDC system training (Rave / CDB) in week 4",
      "Own first study CRF build with senior review by month 2",
      "Run first interim data review independently by month 3",
    ],
  },
  "regulatory-affairs": {
    slug: "regulatory-affairs",
    roleVariants: ["RA Associate", "CMC Writer", "Submission Publisher", "Labelling Specialist"],
    employerRequirements: [
      "M.Pharm / B.Pharm with regulatory electives",
      "eCTD structure (Modules 1–5) understanding",
      "Working knowledge of US FDA + EMA + CDSCO guidelines",
      "Long-form scientific writing with clean references",
      "Tools: DocuBridge, eCTDXPress, Veeva Vault RIM (any one)",
    ],
    tiers: [
      {
        label: "Top Indian generics",
        note: "₹5–7 LPA · ANDA filing factories",
        companies: ["Dr. Reddy's", "Sun Pharma", "Cipla", "Aurobindo", "Lupin"],
      },
      {
        label: "MNCs",
        note: "₹6–9 LPA · global submissions",
        companies: ["Novartis", "Pfizer", "AstraZeneca", "GSK", "Sanofi"],
      },
      {
        label: "RA service co's",
        note: "₹4–6 LPA · cross-client volume",
        companies: ["Freyr Solutions", "Indegene RA", "ProductLife", "PharmaLex"],
      },
    ],
    firstNinetyDays: [
      "Read CTD Modules 1–5 of a published ANDA cover-to-cover",
      "Own first labelling change or admin amendment by month 2",
      "Co-author a Module 3 (CMC) section under senior review by month 3",
    ],
  },
  "sas-clinical": {
    slug: "sas-clinical",
    roleVariants: ["SAS Programmer", "Statistical Programmer", "ADaM Lead (Y3+)", "TLF Programmer"],
    employerRequirements: [
      "B.Pharm / M.Sc Stats / B.Tech with SAS Base + Advanced certs",
      "SDTM + ADaM (CDISC) hands-on with at least one mock study",
      "TLF programming (proc report, proc tabulate, ods)",
      "Validation via double-programming workflow",
      "R or Python familiarity is a plus, not a substitute",
    ],
    tiers: [
      {
        label: "Tier-1 CRO",
        note: "₹5.5–7.5 LPA · CDISC submission work",
        companies: ["IQVIA", "Cytel", "Parexel", "PPD", "ICON plc"],
      },
      {
        label: "Pure-play stats",
        note: "₹6.5–9.0 LPA · senior ladder fast",
        companies: ["SAS Institute", "Cytel", "PHASTAR", "Statinfo"],
      },
      {
        label: "Big-tech LS",
        note: "₹6–8 LPA · pharma R&D analytics",
        companies: ["TCS BioSciences", "Cognizant LS", "Accenture LS", "Wipro LS"],
      },
    ],
    firstNinetyDays: [
      "Build one SDTM domain (DM/AE/EX) end-to-end in week 6",
      "Build paired ADaM dataset (ADSL/ADAE) by month 2",
      "Programme + validate one TLF set by month 3",
    ],
  },
  "ai-intelligence": {
    slug: "ai-intelligence",
    roleVariants: [
      "ML Engineer (Healthcare)",
      "Applied AI Engineer",
      "Clinical NLP Engineer",
      "MLOps Engineer",
    ],
    employerRequirements: [
      "B.Tech CS/ECE/AI or M.Sc with strong ML projects",
      "PyTorch + HuggingFace + at least one shipped model project",
      "MLOps basics: Docker, FastAPI, model versioning",
      "Healthcare data literacy: HL7/FHIR, DICOM or claims",
      "GitHub portfolio reviewers can actually open and run",
    ],
    tiers: [
      {
        label: "Healthcare AI product",
        note: "₹10–18 LPA · core ML roles",
        companies: ["Tempus AI", "Innovaccer", "Qure.ai", "Nference", "SigTuple"],
      },
      {
        label: "Big Tech health",
        note: "₹14–24 LPA · platform scale",
        companies: ["Google Health", "Microsoft Health", "AWS HealthLake"],
      },
      {
        label: "Clinical SaaS",
        note: "₹8–14 LPA · embedded AI teams",
        companies: ["Veeva AI", "Medidata AI", "IQVIA Tech", "Doceree"],
      },
    ],
    firstNinetyDays: [
      "Ship one healthcare ML notebook to GitHub in month 1 (MIMIC, ChestX-ray14)",
      "Wrap one model behind a FastAPI endpoint by month 2",
      "Contribute to a real PR in the team's prod codebase by month 3",
    ],
  },
  "clinical-saas": {
    slug: "clinical-saas",
    roleVariants: [
      "Customer Success Associate",
      "Solutions Consultant",
      "Implementation Analyst",
      "Account Executive (Y2+)",
    ],
    employerRequirements: [
      "Any degree with strong communication + healthcare interest",
      "Comfortable demoing software live to a clinical SME",
      "CRM + ticketing tool fluency (Salesforce, HubSpot, Zendesk)",
      "Clinical workflow literacy (EHR, eTMF, EDC — any one)",
      "Quota / book-of-business mindset visible in interview",
    ],
    tiers: [
      {
        label: "Tier-1 clinical SaaS",
        note: "₹6–9 LPA · global accounts",
        companies: ["Veeva Systems", "Medidata", "IQVIA Tech", "Saama"],
      },
      {
        label: "Indian healthtech",
        note: "₹5–7 LPA · faster CSM ladder",
        companies: ["Innovaccer", "Doceree", "Practo Pro", "HealthPlix"],
      },
      {
        label: "Consulting + CS",
        note: "₹5–8 LPA · advisory + delivery",
        companies: ["ZS Associates", "Axtria", "Indegene", "Cognizant LS"],
      },
    ],
    firstNinetyDays: [
      "Shadow 10 customer demos in month 1",
      "Own one customer renewal call solo by month 2",
      "Hit 100% of a small expansion quota by month 3",
    ],
  },
  "software-engineer": {
    slug: "software-engineer",
    roleVariants: ["SDE-1 (Backend)", "SDE-1 (Full-stack)", "Platform Engineer", "Mobile Engineer"],
    employerRequirements: [
      "B.Tech CS/IT or equivalent self-taught portfolio",
      "DSA + system design fundamentals (LeetCode medium fluency)",
      "TypeScript / Java / Go + one DB (Postgres/Mongo)",
      "GitHub with 1-2 shipped projects, README + tests",
      "Comfort with on-call mindset: logs, metrics, postmortems",
    ],
    tiers: [
      {
        label: "Indian product unicorns",
        note: "₹14–28 LPA · strongest pay",
        companies: ["Razorpay", "Zerodha", "PhonePe", "Cred", "Postman"],
      },
      {
        label: "Global product co's",
        note: "₹18–35 LPA · top ladder",
        companies: ["Google", "Microsoft", "Atlassian", "Adobe", "Salesforce"],
      },
      {
        label: "Fast-growth SaaS",
        note: "₹10–18 LPA · ownership early",
        companies: ["Freshworks", "Zoho", "Chargebee", "BrowserStack", "Hasura"],
      },
    ],
    firstNinetyDays: [
      "Ship a non-trivial PR (200+ LOC, reviewed) in month 1",
      "Own one service feature end-to-end including tests + docs by month 2",
      "Take first on-call shift with a buddy by month 3",
    ],
  },
  "business-analyst": {
    slug: "business-analyst",
    roleVariants: ["Business Analyst", "Data Analyst", "Product Analyst", "Strategy Analyst"],
    employerRequirements: [
      "Any quant-leaning degree (BBA, B.Com, B.Sc Stats, B.Tech)",
      "SQL — joins, window functions, CTEs (live test in interview)",
      "Excel modelling + PowerBI / Tableau dashboard built solo",
      "Python or R basics for cleaning + analysis",
      "Storytelling: turn a 5-tab analysis into a 1-page brief",
    ],
    tiers: [
      {
        label: "Indian product co's",
        note: "₹7–10 LPA · clearest analyst ladder",
        companies: ["Amazon", "Flipkart", "Razorpay", "Swiggy", "Zomato"],
      },
      {
        label: "Analytics consulting",
        note: "₹8–14 LPA · cross-client variety",
        companies: ["ZS Associates", "Tiger Analytics", "Mu Sigma", "Fractal"],
      },
      {
        label: "Strategy + ops",
        note: "₹9–15 LPA · MBA-style ladder",
        companies: ["Bain Capability Network", "McKinsey Knowledge", "Deloitte USI"],
      },
    ],
    firstNinetyDays: [
      "Recreate a real team dashboard solo in week 4",
      "Own one weekly business review report by month 2",
      "Run one stakeholder analysis end-to-end (brief → SQL → readout) by month 3",
    ],
  },
  "b2b-saas-sales": {
    slug: "b2b-saas-sales",
    roleVariants: [
      "BDR / SDR",
      "Inside Sales Rep",
      "Customer Success Associate",
      "Account Executive (Y2+)",
    ],
    employerRequirements: [
      "Any degree, English + one Indian language fluency",
      "Comfortable with 30-50 outbound calls/day",
      "CRM hygiene (Salesforce, HubSpot, Apollo) demonstrated",
      "Quota mindset: track pipeline, close rate, MRR",
      "Discovery-call skill: ask better questions than the prospect expects",
    ],
    tiers: [
      {
        label: "Indian SaaS unicorns",
        note: "₹6–9 LPA + ₹2–4 LPA OTE",
        companies: ["Freshworks", "Zoho", "Postman", "Razorpay", "BrowserStack"],
      },
      {
        label: "Global SaaS India",
        note: "₹7–11 LPA + 30-40% variable",
        companies: ["Salesforce", "HubSpot", "Atlassian", "Gong", "Outreach"],
      },
      {
        label: "Vertical SaaS",
        note: "₹5–7 LPA + faster AE ladder",
        companies: ["LeadSquared", "WebEngage", "Whatfix", "Chargebee"],
      },
    ],
    firstNinetyDays: [
      "Hit 100% of outbound activity quota in month 1",
      "Source first qualified opportunity (SQL) by month 2",
      "Close first solo deal (or own first renewal) by month 3",
    ],
  },
  "agri-tech-ops": {
    slug: "agri-tech-ops",
    roleVariants: [
      "Field Operations Associate",
      "Category Associate",
      "Supply / Procurement Associate",
      "Farmer Engagement Lead",
    ],
    employerRequirements: [
      "B.Sc Agri / B.Tech Agri / BBA Agri / B.Com with rural exposure",
      "Comfort spending 60%+ of week in field with farmers / FPOs",
      "Local language fluency (Hindi + 1 regional language)",
      "Excel + WhatsApp-Business / app-based ops tooling literacy",
      "Negotiation + grievance handling at the FPO / mandi level",
    ],
    tiers: [
      {
        label: "Series-B+ agri-tech",
        note: "₹4.5–7 LPA · region ownership early",
        companies: ["DeHaat", "Ninjacart", "WayCool", "AgroStar", "Samunnati"],
      },
      {
        label: "AgriTech SaaS",
        note: "₹5–8 LPA · product + ops blend",
        companies: ["Cropin", "Fasal", "Bijak", "Otipy"],
      },
      {
        label: "Corporate agribusiness",
        note: "₹4–6 LPA · structured ladder",
        companies: ["ITC ABD", "Mahindra Agri", "Olam Agri", "Adani Agri Logistics"],
      },
    ],
    firstNinetyDays: [
      "Visit 30+ farmers / 5+ FPOs in month 1",
      "Own one micro-region's supply or input-sales metric by month 2",
      "Lead one cross-functional fix (quality, pricing, logistics) by month 3",
    ],
  },
};

export function getPathBriefing(slug: string): PathBriefingData | null {
  return PATH_BRIEFINGS[slug] ?? null;
}
