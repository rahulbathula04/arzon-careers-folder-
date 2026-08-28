import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Stethoscope,
  Database,
  Code2,
  FileCheck2,
  Atom,
  BrainCircuit,
  Sparkles,
  Layers,
  Shield,
  LineChart,
  Cpu,
  Cloud,
  Smartphone,
  CircuitBoard,
  GitBranch,
  Megaphone,
  BarChart3,
  Wallet,
  Users,
  Server,
  Receipt,
  Network,
  PenLine,
  Dna,
} from "lucide-react";

export type CourseCategory =
  | "Pharmacy & Life Sciences"
  | "Tech Programmes"
  | "Commerce & Marketing";

export type Demand = "Very High" | "High" | "Steady";

/**
 * AI-impact posture for the role family this course leads to.
 * - "augmented": role is being augmented by AI (faster, but still hiring) - e.g. coding, PV
 * - "audit":     role increasingly involves auditing/QC of AI output - e.g. RA, CDM QA
 * - "resistant": role is structurally insulated from AI replacement - e.g. lab, compliance
 */
export type AIRisk = "augmented" | "audit" | "resistant";

export type LessonType = "video" | "reading" | "lab" | "live";
export type AssessmentType = "quiz" | "assignment" | "project" | "viva";

export interface Resource {
  label: string;
  kind: "pdf" | "csv" | "code" | "link";
  href: string;
}

export interface Lesson {
  id: string; // stable per module, e.g. "l1"
  title: string;
  type: LessonType;
  durationMin: number;
  videoUrl?: string; // youtube embed URL
  body?: string; // markdown-ish text for readings
  resources?: Resource[];
}

export interface SyllabusModule {
  weeks: string; // e.g. "W1–2"
  title: string;
  topics: string[];
  deliverable: string;
  jdSkill: string; // the JD requirement this module satisfies
  // Optional enrichments (auto-derived in helpers when absent):
  skills?: string[];
  deliverables?: string[];
  hours?: number;
  assessment?: { type: AssessmentType; weight: number; rubric: string[] };
  lessons?: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  category: CourseCategory;
  Icon: LucideIcon;
  blurb: string;
  heroTagline: string;
  tools: string[];
  jd: {
    topSkills: string[];
    hiringRoles: string[];
    salary: string;
    demand: Demand;
    sampleEmployers: string[];
  };
  syllabus: SyllabusModule[];
  projects: { minor: [string, string]; major: string };
  certification: string;
  /** Optional honest extras - auto-derived in helpers when absent. */
  aiRisk?: AIRisk;
  salaryYear1?: string;
  salaryYear3?: string;
  lastBatch?: { placed: number; total: number };
  /** Exact JD role title this track trains for (e.g. "Drug Safety Associate"). */
  roleTitle?: string;
  /** Target seniority - almost always "Fresher" for our catalogue. */
  seniority?: "Fresher" | "Junior" | "Mid";
  /** ISO date of the last JD market refresh used to design this syllabus. */
  jdRefreshedOn?: string;
}

export const COURSES: Course[] = [
  // ───────── Pharmacy & Life Sciences ─────────
  {
    slug: "pharmacovigilance",
    title: "Fresher Drug Safety Associate Track - Argus + MedDRA + ICSR",
    roleTitle: "Drug Safety Associate",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: Activity,
    blurb:
      "Collect, analyse and report drug-safety data to keep patients safe and meet global regulations.",
    heroTagline:
      "Built from 1,247 live Drug Safety Associate JDs. Argus + MedDRA + E2B(R3) the way Cognizant, IQVIA and Accenture actually hire for.",
    tools: ["Argus Safety", "ArisG", "MedDRA", "WHO-DD", "E2B(R3)", "VigiBase", "EudraVigilance"],
    jd: {
      topSkills: [
        "ICSR processing",
        "MedDRA coding",
        "Narrative writing",
        "E2B / EVDAS",
        "Aggregate reports (PSUR/PBRER)",
      ],
      hiringRoles: [
        "Drug Safety Associate",
        "PV Officer",
        "ICSR Processor",
        "Aggregate Report Writer",
      ],
      salary: "₹3.5 – 7 LPA",
      demand: "Very High",
      sampleEmployers: ["Cognizant", "Accenture", "IQVIA", "Parexel", "Syneos", "Tata 1mg"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "PV foundations & global regulations",
        topics: [
          "Drug development lifecycle",
          "ICH-GVP modules",
          "FDA / EMA / CDSCO frameworks",
          "Roles in PV",
        ],
        deliverable: "Regulatory comparison sheet",
        jdSkill: "Knowledge of ICH-GVP and ICH-E2 guidelines",
      },
      {
        weeks: "W3–4",
        title: "Adverse events & ICSR processing",
        topics: [
          "AE vs ADR vs SAE",
          "Case intake & triage",
          "Seriousness, causality, expectedness",
          "Source-document handling",
        ],
        deliverable: "10 mock ICSR cases booked",
        jdSkill: "End-to-end ICSR case processing",
      },
      {
        weeks: "W5–6",
        title: "MedDRA & WHO-DD coding",
        topics: [
          "MedDRA hierarchy (LLT→SOC)",
          "Coding conventions",
          "WHO Drug Dictionary",
          "Quality checks",
        ],
        deliverable: "100-term coding test (>95% accuracy)",
        jdSkill: "MedDRA + WHO-DD coding proficiency",
      },
      {
        weeks: "W7–8",
        title: "Argus Safety hands-on",
        topics: [
          "Case book-in workflow",
          "Narrative writing",
          "Follow-up handling",
          "E2B(R3) submission",
        ],
        deliverable: "Argus simulation: 25 cases",
        jdSkill: "Working knowledge of Argus / ArisG",
      },
      {
        weeks: "W9–10",
        title: "Aggregate reports & signal detection",
        topics: [
          "PSUR / PBRER / DSUR",
          "Literature search (Embase/Medline)",
          "Signal detection basics",
          "EVDAS & VigiBase",
        ],
        deliverable: "1 mini-PSUR draft",
        jdSkill: "Aggregate report writing & signal screening",
      },
      {
        weeks: "W11–12",
        title: "Audits, inspections & capstone",
        topics: ["GVP audits", "CAPA", "Quality metrics", "Mock interview"],
        deliverable: "Capstone: 50-case PV report",
        jdSkill: "Inspection-readiness and quality mindset",
      },
    ],
    projects: {
      minor: [
        "Process 25 ICSR cases in a simulated Argus environment",
        "Code 100 adverse-event terms in MedDRA with QC review",
      ],
      major:
        "End-to-end PSUR for a sample drug, including line-listing, signal review and benefit-risk summary",
    },
    certification:
      "Verified Pharmacovigilance Internship Certificate + Project Letter from associated CRO partner.",
  },
  {
    slug: "medical-coding",
    title: "Fresher Medical Coder Track - ICD-10-CM + CPT + 3M Encoder",
    roleTitle: "Medical Coder",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: Stethoscope,
    blurb:
      "Master the coding standards hospitals and insurers use to process global healthcare claims.",
    heroTagline:
      "Built from 1,893 live fresher Medical Coder JDs. ICD-10-CM, CPT, E/M, modifiers - exactly what Optum, Omega and Access Healthcare interview on.",
    tools: [
      "ICD-10-CM",
      "ICD-10-PCS",
      "CPT®",
      "HCPCS Level II",
      "3M Encoder",
      "EncoderPro",
      "EHR systems",
    ],
    jd: {
      topSkills: [
        "ICD-10-CM coding",
        "CPT & HCPCS",
        "E/M coding",
        "HIPAA compliance",
        "NCCI edits",
        "Modifier application",
      ],
      hiringRoles: [
        "Medical Coder (E/M, IP, OP, Surgery)",
        "Coding QA Analyst",
        "AR / Denial Analyst",
      ],
      salary: "₹3 – 6 LPA",
      demand: "Very High",
      sampleEmployers: [
        "Optum",
        "Omega Healthcare",
        "Access Healthcare",
        "R1 RCM",
        "Sutherland",
        "AGS Health",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Anatomy, physiology & medical terminology",
        topics: [
          "Body systems overview",
          "Common Rx classes",
          "Medical terminology roots/suffixes",
          "Disease processes",
        ],
        deliverable: "Terminology + anatomy quiz",
        jdSkill: "Strong medical terminology and anatomy",
      },
      {
        weeks: "W3–4",
        title: "ICD-10-CM coding",
        topics: [
          "Conventions and guidelines",
          "Chapter-specific guidelines",
          "Sequencing rules",
          "Combination codes",
        ],
        deliverable: "100-chart ICD-10-CM exercise",
        jdSkill: "ICD-10-CM proficiency to AAPC standard",
      },
      {
        weeks: "W5–6",
        title: "CPT & HCPCS Level II",
        topics: [
          "Surgery / Radiology / Path / Medicine sections",
          "E/M leveling",
          "Modifiers (-25, -59, -51, …)",
          "HCPCS Level II",
        ],
        deliverable: "60-chart CPT + E/M test",
        jdSkill: "CPT, HCPCS and E/M leveling",
      },
      {
        weeks: "W7–8",
        title: "Specialty coding (IP, OP, Surgery, ED)",
        topics: ["IP DRG basics", "Outpatient APC", "Surgery coding rules", "ED workflows"],
        deliverable: "Specialty mini-audit",
        jdSkill: "Multi-specialty coding exposure",
      },
      {
        weeks: "W9–10",
        title: "Compliance, NCCI & RCM",
        topics: [
          "HIPAA & PHI handling",
          "NCCI edits and bundling",
          "Medical necessity",
          "Payer rules & denials",
        ],
        deliverable: "Denial-management case study",
        jdSkill: "HIPAA, NCCI and payer-side awareness",
      },
      {
        weeks: "W11–12",
        title: "CPC mock + capstone audit",
        topics: ["CPC exam strategy", "Timed practice", "QA workflows", "Resume + interview prep"],
        deliverable: "Capstone: 50-chart audit + report",
        jdSkill: "Production accuracy ≥ 95% with QA mindset",
      },
    ],
    projects: {
      minor: [
        "Code 100 outpatient charts in ICD-10-CM with QA peer review",
        "CPT + E/M leveling on 60 surgical encounters",
      ],
      major:
        "50-chart end-to-end audit (ICD + CPT + modifiers + denial-risk note) graded against AAPC rubric",
    },
    certification: "Verified Medical Coding Internship Certificate + CPC-readiness assessment.",
  },
  {
    slug: "clinical-data-management",
    title: "Clinical Data Associate Track - Medidata Rave + CDASH + SDTM",
    roleTitle: "Clinical Data Associate",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: Database,
    blurb: "Manage, validate and report clinical-trial data using industry-standard CDISC tools.",
    heroTagline:
      "Built from 684 live Clinical Data Associate JDs. Medidata Rave, CDASH, SDTM - the toolkit IQVIA, Parexel and Syneos hire freshers for.",
    tools: [
      "Medidata Rave",
      "Oracle Clinical / RDC",
      "Veeva CDMS",
      "CDISC SDTM",
      "CDASH",
      "SAS basics",
    ],
    jd: {
      topSkills: [
        "CRF design (CDASH)",
        "Edit-check programming",
        "Data cleaning & query management",
        "SAE reconciliation",
        "Database lock",
      ],
      hiringRoles: ["Clinical Data Associate", "CDM Programmer", "Data Validation Specialist"],
      salary: "₹4 – 8 LPA",
      demand: "High",
      sampleEmployers: ["IQVIA", "Parexel", "Syneos", "ICON plc", "TCS Lifesciences", "Cognizant"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Clinical trials & GCP overview",
        topics: ["Trial phases I–IV", "ICH-GCP", "Roles: sponsor, CRO, site", "21 CFR Part 11"],
        deliverable: "GCP self-assessment",
        jdSkill: "ICH-GCP & 21 CFR Part 11 awareness",
      },
      {
        weeks: "W3–4",
        title: "CRF design with CDASH",
        topics: [
          "Protocol-driven CRF design",
          "CDASH standards",
          "Annotated CRF",
          "Version control",
        ],
        deliverable: "Annotated CRF for a sample protocol",
        jdSkill: "CDASH-aligned CRF design",
      },
      {
        weeks: "W5–6",
        title: "EDC build (Medidata Rave / Veeva)",
        topics: ["Study build basics", "Edit checks", "User management", "UAT"],
        deliverable: "Mini study build + UAT log",
        jdSkill: "Hands-on EDC (Rave / Veeva)",
      },
      {
        weeks: "W7–8",
        title: "Data cleaning & query management",
        topics: [
          "Discrepancy handling",
          "Query lifecycle",
          "Listings review",
          "Coding (MedDRA/WHO-DD)",
        ],
        deliverable: "Clean a 200-row dirty dataset",
        jdSkill: "Query management & data cleaning",
      },
      {
        weeks: "W9–10",
        title: "SAE recon, SDTM & lock",
        topics: [
          "SAE reconciliation with PV",
          "SDTM mapping basics",
          "Define-XML",
          "Lock checklist",
        ],
        deliverable: "SAE recon report",
        jdSkill: "SAE reconciliation & SDTM exposure",
      },
      {
        weeks: "W11–12",
        title: "Capstone & interview prep",
        topics: ["Lock dry run", "Audit trail review", "Resume building", "Mock interview"],
        deliverable: "Capstone: full study lock package",
        jdSkill: "End-to-end CDM lifecycle ownership",
      },
    ],
    projects: {
      minor: [
        "Design + annotate a CRF for an oncology Phase II protocol",
        "Build edit checks and run UAT on a Medidata-style EDC",
      ],
      major: "Take a sample study from CRF design → cleaning → SAE recon → mock database lock",
    },
    certification: "Verified Clinical Data Management Internship Certificate + Project Letter.",
  },
  {
    slug: "sas-clinical",
    title: "Clinical SAS Programmer Track - SDTM + ADaM + TLF",
    roleTitle: "Clinical SAS Programmer",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: Code2,
    blurb: "Program SDTM/ADaM datasets and TLFs for regulatory submissions.",
    heroTagline:
      "Built from 512 live Clinical SAS Programmer JDs. Base SAS + Macros, SDTM, ADaM, TLFs - the exact stack CROs interview on.",
    tools: ["SAS Base", "SAS Macros", "SAS SQL", "SDTM", "ADaM", "Define-XML", "Pinnacle 21"],
    jd: {
      topSkills: [
        "Base SAS + Macros",
        "SDTM / ADaM mapping",
        "TLFs (Tables, Listings, Figures)",
        "Pinnacle 21 validation",
        "Clinical-trial data flow",
      ],
      hiringRoles: ["SAS Programmer (Clinical)", "Statistical Programmer", "ADaM Lead"],
      salary: "₹4.5 – 10 LPA",
      demand: "Very High",
      sampleEmployers: ["IQVIA", "Cytel", "Parexel", "TCS", "Accenture", "Quanticate"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Base SAS essentials",
        topics: ["DATA step", "PROC SQL", "Reading raw data", "Output delivery"],
        deliverable: "10 mini SAS exercises",
        jdSkill: "Strong Base SAS programming",
      },
      {
        weeks: "W3–4",
        title: "SAS Macros & efficiency",
        topics: ["Macro vars and macros", "%IF/%DO", "Reusable utilities", "Debugging"],
        deliverable: "Reusable macro library",
        jdSkill: "Macro programming for production code",
      },
      {
        weeks: "W5–6",
        title: "Clinical data & SDTM",
        topics: [
          "CDISC overview",
          "SDTM domains (DM, AE, EX, LB…)",
          "Mapping conventions",
          "Define-XML basics",
        ],
        deliverable: "Map raw data → 5 SDTM domains",
        jdSkill: "SDTM mapping per CDISC IG",
      },
      {
        weeks: "W7–8",
        title: "ADaM datasets",
        topics: ["ADaM principles", "ADSL build", "BDS structure", "Traceability"],
        deliverable: "Build ADSL + ADAE",
        jdSkill: "ADaM creation with traceability",
      },
      {
        weeks: "W9–10",
        title: "TLFs for submissions",
        topics: [
          "Demographic tables",
          "Efficacy tables",
          "Safety listings",
          "Figures with PROC SGPLOT",
        ],
        deliverable: "5 TLFs to mock SAP",
        jdSkill: "TLF programming to SAP",
      },
      {
        weeks: "W11–12",
        title: "Validation & capstone",
        topics: [
          "Pinnacle 21 checks",
          "Double programming",
          "Define-XML packaging",
          "Submission readiness",
        ],
        deliverable: "Capstone: SDTM + ADaM + TLF pack",
        jdSkill: "Submission-grade deliverable",
      },
    ],
    projects: {
      minor: [
        "Build a reusable macro library for common clinical reports",
        "Map 5 SDTM domains for a sample Phase II oncology trial",
      ],
      major: "End-to-end deliverable: raw → SDTM → ADaM → TLFs → Pinnacle-21 validated package",
    },
    certification: "Verified Clinical SAS Programming Internship Certificate + Project Letter.",
  },
  {
    slug: "regulatory-affairs",
    title: "Regulatory Affairs Associate Track - eCTD + Veeva Vault RIM + ANDA",
    roleTitle: "Regulatory Affairs Associate",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: FileCheck2,
    blurb: "Submissions and approvals across FDA, EMA and CDSCO for global health authorities.",
    heroTagline:
      "Built from 437 live Regulatory Affairs Associate JDs. eCTD modules, Veeva Vault RIM, ANDA/NDA/MAA - exactly what Dr Reddy's, Sun Pharma and Aurobindo hire for.",
    tools: ["eCTD", "FDA portals", "EMA EudraLex", "CDSCO SUGAM", "Veeva Vault RIM"],
    jd: {
      topSkills: [
        "eCTD module structure (M1–M5)",
        "ANDA / NDA / MAA basics",
        "Labeling & artwork review",
        "RIM tools",
        "Variations & lifecycle",
      ],
      hiringRoles: [
        "Regulatory Affairs Associate",
        "Publishing Specialist",
        "Labeling Coordinator",
      ],
      salary: "₹4 – 9 LPA",
      demand: "High",
      sampleEmployers: [
        "Dr. Reddy's",
        "Sun Pharma",
        "Aurobindo",
        "Lupin",
        "Freyr Solutions",
        "Indegene",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Global RA landscape",
        topics: [
          "Drug approval pathways",
          "FDA, EMA, CDSCO, PMDA, ANVISA",
          "Generic vs innovator",
          "Lifecycle management",
        ],
        deliverable: "Pathway comparison brief",
        jdSkill: "Knowledge of major regulatory frameworks",
      },
      {
        weeks: "W3–4",
        title: "eCTD & dossier structure",
        topics: [
          "CTD modules M1–M5",
          "Granularity rules",
          "Hyperlinking & bookmarks",
          "Common deficiencies",
        ],
        deliverable: "Mini-dossier table of contents",
        jdSkill: "Working knowledge of eCTD structure",
      },
      {
        weeks: "W5–6",
        title: "ANDA / NDA / MAA basics",
        topics: ["ANDA Q&A", "NDA contents", "EU MAA centralised vs DCP", "FDA gateway"],
        deliverable: "ANDA module 1 draft",
        jdSkill: "ANDA / NDA / MAA familiarity",
      },
      {
        weeks: "W7–8",
        title: "Labeling, artwork & promotional review",
        topics: [
          "USPI / SmPC / PIL",
          "Artwork lifecycle",
          "Promo material compliance",
          "Change control",
        ],
        deliverable: "Mock USPI + SmPC review",
        jdSkill: "Labeling & artwork QC",
      },
      {
        weeks: "W9–10",
        title: "RIM systems & publishing",
        topics: [
          "Veeva Vault RIM tour",
          "Publishing workflow",
          "Validation",
          "Submission tracking",
        ],
        deliverable: "RIM-style submission log",
        jdSkill: "RIM / publishing tool exposure",
      },
      {
        weeks: "W11–12",
        title: "Variations, queries & capstone",
        topics: [
          "Type IA/IB/II variations",
          "Health-authority queries",
          "Resume & RA interview prep",
        ],
        deliverable: "Capstone: small ANDA pack",
        jdSkill: "Lifecycle + query handling",
      },
    ],
    projects: {
      minor: [
        "Draft Module 1 (administrative) for a generic ANDA",
        "QC review of a USPI + SmPC for label deviations",
      ],
      major: "End-to-end mini-ANDA package (M1 + summary M2) with publishing checklist",
    },
    certification: "Verified Regulatory Affairs Internship Certificate + Project Letter.",
  },
  {
    slug: "nanoscience",
    title: "Nanoscience & Nanotechnology",
    category: "Pharmacy & Life Sciences",
    Icon: Atom,
    blurb: "Apply nanotech to pharma, materials and diagnostics, synthesis to characterisation.",
    heroTagline: "Lab-grade exposure for research and R&D roles.",
    tools: ["SEM", "TEM", "AFM", "FTIR", "XRD", "DLS", "UV-Vis"],
    jd: {
      topSkills: [
        "Nanoparticle synthesis",
        "Characterisation (SEM/TEM/XRD)",
        "Drug delivery systems",
        "Lab notebook discipline",
        "Literature review",
      ],
      hiringRoles: ["R&D Associate", "Formulation Trainee", "Materials Lab Analyst"],
      salary: "₹3 – 6 LPA",
      demand: "Steady",
      sampleEmployers: [
        "Pharma R&D centres",
        "IISc/CSIR labs",
        "Biocon",
        "Dr. Reddy's R&D",
        "ARCI",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Nano fundamentals",
        topics: ["Nanoscale phenomena", "Quantum effects", "Surface area & reactivity", "Safety"],
        deliverable: "Concept quiz + lab safety cert",
        jdSkill: "Foundation in nanoscale science",
      },
      {
        weeks: "W3–4",
        title: "Synthesis methods",
        topics: [
          "Top-down vs bottom-up",
          "Sol-gel, hydrothermal",
          "Green synthesis",
          "Reproducibility",
        ],
        deliverable: "Mock synthesis SOP",
        jdSkill: "Hands-on synthesis exposure",
      },
      {
        weeks: "W5–6",
        title: "Characterisation toolbox",
        topics: ["SEM/TEM imaging", "XRD pattern reading", "FTIR/UV-Vis", "DLS for size/zeta"],
        deliverable: "Characterisation report on a sample dataset",
        jdSkill: "Reading SEM/TEM/XRD/DLS data",
      },
      {
        weeks: "W7–8",
        title: "Nano in drug delivery",
        topics: ["Liposomes & micelles", "Polymeric NPs", "Targeted delivery", "Toxicology basics"],
        deliverable: "Drug-delivery design brief",
        jdSkill: "Application to formulation R&D",
      },
      {
        weeks: "W9–10",
        title: "Materials & diagnostics",
        topics: ["Quantum dots", "Biosensors", "Lateral-flow assays", "Magnetic NPs"],
        deliverable: "Mini literature review",
        jdSkill: "Cross-domain nano applications",
      },
      {
        weeks: "W11–12",
        title: "Capstone project",
        topics: ["Project design", "Data analysis", "Poster preparation", "Viva"],
        deliverable: "Capstone: research poster + report",
        jdSkill: "Communicate research outputs",
      },
    ],
    projects: {
      minor: [
        "Characterisation deep-dive on a provided SEM/XRD dataset",
        "Design brief for a nano drug-delivery system",
      ],
      major:
        "Research poster + report on a chosen application (drug delivery, biosensor or material)",
    },
    certification: "Verified Nanotech R&D Internship Certificate + Mentor recommendation.",
  },
  {
    slug: "clinical-saas",
    title: "Clinical SaaS Programme",
    category: "Pharmacy & Life Sciences",
    Icon: Server,
    blurb:
      "Configure, validate and run studies on the SaaS platforms every CRO and biotech is migrating to.",
    heroTagline: "The Veeva + Medidata + Oracle skill set CROs interview for.",
    tools: [
      "Veeva Vault Clinical (CTMS, eTMF, Study Startup)",
      "Medidata Rave EDC",
      "Oracle Clinical One",
      "Argus Safety",
      "21 CFR Part 11",
      "GxP validation",
    ],
    jd: {
      topSkills: [
        "Vault Clinical configuration",
        "Rave study build & edit checks",
        "Clinical One admin",
        "21 CFR Part 11 / CSV",
        "User & role management",
      ],
      hiringRoles: [
        "Clinical Systems Analyst",
        "EDC Build Programmer",
        "Veeva Vault Administrator",
        "Validation Analyst",
      ],
      salary: "₹6 – 12 LPA",
      demand: "Very High",
      sampleEmployers: [
        "IQVIA",
        "Parexel",
        "Syneos",
        "ICON plc",
        "Indegene",
        "TCS Lifesciences",
        "Cognizant Life Sciences",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Clinical SaaS landscape & GxP foundations",
        topics: [
          "Clinical platforms market map",
          "Multi-tenant SaaS basics",
          "ICH-GCP & 21 CFR Part 11 refresher",
          "Roles: build, validate, operate",
        ],
        deliverable: "Platform comparison matrix (Vault vs Rave vs Clinical One)",
        jdSkill: "Working knowledge of major clinical SaaS systems",
      },
      {
        weeks: "W3–4",
        title: "Veeva Vault Clinical (CTMS + eTMF)",
        topics: [
          "Vault object model",
          "CTMS site & monitoring workflows",
          "eTMF zones, EDLs and TMF reference model",
          "Vault admin: users, roles, lifecycles",
        ],
        deliverable: "Configure CTMS + eTMF for a mock study",
        jdSkill: "Hands-on Veeva Vault Clinical configuration",
      },
      {
        weeks: "W5–6",
        title: "Medidata Rave study build",
        topics: [
          "Architect: forms, folders, matrices",
          "Edit checks & derivations",
          "Custom functions basics",
          "UAT & migration",
        ],
        deliverable: "Mini Rave study build + UAT log",
        jdSkill: "Rave study build & edit-check programming",
      },
      {
        weeks: "W7–8",
        title: "Oracle Clinical One & Argus admin",
        topics: [
          "Clinical One study design",
          "Randomisation & supply (RTSM)",
          "Argus Safety case workflow basics",
          "Cross-system data flow",
        ],
        deliverable: "Clinical One mock study + Argus user setup",
        jdSkill: "Oracle clinical platform familiarity",
      },
      {
        weeks: "W9–10",
        title: "Validation, CSV & 21 CFR Part 11",
        topics: [
          "GAMP 5 risk-based CSV",
          "IQ/OQ/PQ documentation",
          "Audit trails & e-signatures",
          "Change control",
        ],
        deliverable: "OQ test script pack for a Vault config",
        jdSkill: "Computer System Validation discipline",
      },
      {
        weeks: "W11–12",
        title: "Capstone: end-to-end SaaS study",
        topics: [
          "Cross-platform study design",
          "Build → validate → go-live",
          "SOP authoring",
          "Mock interview",
        ],
        deliverable:
          "Capstone: study configured across two SaaS platforms with validation evidence",
        jdSkill: "Ship a validated, production-style configuration",
      },
    ],
    projects: {
      minor: [
        "Configure a Veeva Vault eTMF zone with EDLs for a Phase II study",
        "Build a Medidata Rave EDC form with edit checks and run UAT",
      ],
      major:
        "End-to-end study configured across Vault Clinical + Rave with full CSV evidence (URS → IQ/OQ → PQ)",
    },
    certification: "Verified Clinical SaaS Internship Certificate + Validation evidence pack.",
  },
  {
    slug: "healthcare-rcm",
    title: "Healthcare RCM & US Medical Billing",
    category: "Pharmacy & Life Sciences",
    Icon: Receipt,
    blurb:
      "Run the US revenue cycle end-to-end, eligibility, claims, denials and AR, the way Optum and R1 hire for.",
    heroTagline: "The largest healthcare-BPO hiring pipeline in India.",
    tools: [
      "Epic / Cerner basics",
      "Athena",
      "Availity",
      "Waystar",
      "EDI 837 / 835 / 270 / 271",
      "ICD-10-CM",
      "CPT®",
    ],
    jd: {
      topSkills: [
        "Eligibility & prior authorisation",
        "Charge capture & claim scrubbing",
        "EDI 837 / 835 reading",
        "Denial management & appeals",
        "AR follow-up & KPIs",
      ],
      hiringRoles: [
        "AR Caller",
        "Charge Entry Specialist",
        "Denial Management Analyst",
        "RCM Operations Analyst",
      ],
      salary: "₹3 – 6 LPA",
      demand: "Very High",
      sampleEmployers: [
        "Optum",
        "R1 RCM",
        "Access Healthcare",
        "AGS Health",
        "Omega Healthcare",
        "Sutherland",
        "Cognizant",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "US healthcare ecosystem & payers",
        topics: [
          "Provider–payer–patient flow",
          "Medicare, Medicaid & commercial plans",
          "HIPAA basics",
          "Revenue cycle map",
        ],
        deliverable: "Payer comparison + RCM flow diagram",
        jdSkill: "US healthcare ecosystem fluency",
      },
      {
        weeks: "W3–4",
        title: "Patient access, eligibility & prior auth",
        topics: [
          "EDI 270/271 eligibility",
          "Benefits verification",
          "Prior authorisation workflows",
          "Patient estimation",
        ],
        deliverable: "Eligibility + auth log on 25 mock patients",
        jdSkill: "Front-end RCM operations",
      },
      {
        weeks: "W5–6",
        title: "Charge capture & claims (837/835)",
        topics: [
          "Charge entry & coding handoff",
          "EDI 837 claim structure",
          "Clearinghouse scrubbing",
          "EDI 835 remittance",
        ],
        deliverable: "Submit & post 50 mock claims",
        jdSkill: "End-to-end claim lifecycle",
      },
      {
        weeks: "W7–8",
        title: "Denial management & appeals",
        topics: [
          "CARC/RARC denial codes",
          "Root-cause categories",
          "Appeal letter writing",
          "Payer-specific playbooks",
        ],
        deliverable: "20 denial workups + appeal letters",
        jdSkill: "Denial analytics & resolution",
      },
      {
        weeks: "W9–10",
        title: "AR follow-up & RCM KPIs",
        topics: [
          "AR aging buckets",
          "Collector calling scripts",
          "DSO / clean-claim rate / denial rate",
          "Reporting",
        ],
        deliverable: "AR aging dashboard + collector script pack",
        jdSkill: "AR ownership & KPI literacy",
      },
      {
        weeks: "W11–12",
        title: "Capstone & interview",
        topics: [
          "End-to-end mock revenue cycle",
          "Compliance & PHI handling",
          "RCM analyst interview drills",
          "Resume polish",
        ],
        deliverable: "Capstone: 50-claim revenue cycle audit",
        jdSkill: "Production-ready RCM analyst",
      },
    ],
    projects: {
      minor: [
        "Run eligibility + prior-auth on a 25-patient mock panel",
        "Work 20 denied claims to resolution with appeal letters",
      ],
      major:
        "End-to-end revenue cycle on a 50-claim sample: eligibility → coding handoff → 837 → 835 → denials → AR resolution",
    },
    certification: "Verified Healthcare RCM Internship Certificate + Project Letter.",
  },
  {
    slug: "digital-health-fhir",
    title: "Digital Health & FHIR Interoperability",
    category: "Pharmacy & Life Sciences",
    Icon: Network,
    blurb:
      "Build the interoperability layer every modern health-tech product needs. HL7 FHIR R4, ABDM and SMART on FHIR.",
    heroTagline: "FHIR fluency is the new baseline for healthtech engineering.",
    tools: [
      "HL7 FHIR R4",
      "HAPI FHIR",
      "Medplum",
      "Postman",
      "SMART on FHIR / OAuth 2.0",
      "ABDM Sandbox",
      "SNOMED CT",
      "LOINC",
    ],
    jd: {
      topSkills: [
        "FHIR R4 resources & profiles",
        "Implementation Guides (US Core, ABDM)",
        "FHIR API design (HAPI / Medplum)",
        "SMART on FHIR auth",
        "Clinical terminologies (SNOMED, LOINC, ICD)",
      ],
      hiringRoles: [
        "Healthcare Integration Engineer",
        "FHIR Developer",
        "Digital Health Engineer",
        "Interoperability Analyst",
      ],
      salary: "₹6 – 14 LPA",
      demand: "Very High",
      sampleEmployers: [
        "Practo",
        "Tata 1mg",
        "PharmEasy",
        "Apollo 24|7",
        "HealthifyMe",
        "Indegene",
        "Persistent Health",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Health data standards & HL7 v2 → FHIR R4",
        topics: [
          "HL7 v2 messages overview",
          "Why FHIR? REST + resources",
          "FHIR data model basics",
          "Postman + public FHIR servers",
        ],
        deliverable: "Read & write 10 Patient/Observation resources via Postman",
        jdSkill: "FHIR R4 fundamentals",
      },
      {
        weeks: "W3–4",
        title: "Resources, profiles & Implementation Guides",
        topics: [
          "Core resources (Patient, Encounter, Observation, MedicationRequest)",
          "Profiles & extensions",
          "US Core IG",
          "ABDM HRP/HIP profiles",
        ],
        deliverable: "Author a custom profile + example resource",
        jdSkill: "FHIR profiling for an Implementation Guide",
      },
      {
        weeks: "W5–6",
        title: "Build a FHIR API (HAPI / Medplum)",
        topics: [
          "HAPI FHIR JPA server setup",
          "Medplum as a hosted alternative",
          "Search parameters",
          "Bundles & transactions",
        ],
        deliverable: "Deploy a working FHIR API with seed data",
        jdSkill: "Hands-on FHIR server development",
      },
      {
        weeks: "W7–8",
        title: "SMART on FHIR + OAuth 2.0",
        topics: [
          "SMART app launch flow",
          "Scopes & consent",
          "OAuth 2.0 / PKCE",
          "Patient-facing app pattern",
        ],
        deliverable: "SMART app that reads a patient's data",
        jdSkill: "Secure FHIR app integration",
      },
      {
        weeks: "W9–10",
        title: "Terminologies + India ABDM stack",
        topics: [
          "SNOMED CT, LOINC, ICD basics",
          "Code systems & ValueSets",
          "ABDM (HFR, HPR, HIE-CM, Health Locker)",
          "Consent flows",
        ],
        deliverable: "Connect to ABDM Sandbox + map a code set",
        jdSkill: "Terminology + ABDM integration",
      },
      {
        weeks: "W11–12",
        title: "Capstone: FHIR-native EHR module",
        topics: [
          "Architecture & data model",
          "API + minimal UI",
          "Testing with Touchstone",
          "Demo + interview prep",
        ],
        deliverable: "Capstone: FHIR-native mini-EHR module",
        jdSkill: "Ship a real interoperable health-tech feature",
      },
    ],
    projects: {
      minor: [
        "Author a US Core-aligned Patient profile + validate against the IG",
        "Build a SMART on FHIR app that reads a patient timeline",
      ],
      major:
        "FHIR-native mini-EHR module: HAPI/Medplum backend + SMART app + ABDM-style consent flow",
    },
    certification: "Verified Digital Health & FHIR Internship Certificate + GitHub portfolio.",
  },
  {
    slug: "medical-writing",
    title: "Medical & Scientific Writing",
    category: "Pharmacy & Life Sciences",
    Icon: PenLine,
    blurb:
      "Write the documents pharma actually pays for, protocols, CSRs, regulatory summaries and manuscripts.",
    heroTagline: "From protocol to publication, the writing pharma billing rates demand.",
    tools: [
      "MS Word advanced",
      "EndNote / Mendeley",
      "ICH-E3 templates",
      "CTD modules",
      "AMA / Vancouver style",
      "PubMed / Embase",
    ],
    jd: {
      topSkills: [
        "Protocol & investigator brochure writing",
        "CSR authoring (ICH-E3)",
        "Regulatory writing (CTD 2.5 / 2.7)",
        "Manuscript & abstract writing",
        "Reference management",
      ],
      hiringRoles: [
        "Medical Writer",
        "Regulatory Writer",
        "Scientific Communications Associate",
        "Publications Specialist",
      ],
      salary: "₹4.5 – 9 LPA",
      demand: "High",
      sampleEmployers: [
        "IQVIA",
        "Indegene",
        "Freyr Solutions",
        "Cactus Communications",
        "Parexel",
        "Syneos Health",
        "Tata Elxsi",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Pharma document landscape & ICH-E3",
        topics: [
          "Regulatory document map",
          "ICH-E3 CSR structure",
          "GCP & data sources",
          "Style guides (AMA, Vancouver)",
        ],
        deliverable: "Annotated CSR table of contents",
        jdSkill: "ICH-E3 fluency",
      },
      {
        weeks: "W3–4",
        title: "Protocols & investigator brochures",
        topics: [
          "Protocol skeleton & SAP linkage",
          "Inclusion/exclusion writing",
          "IB structure",
          "Plain-language summaries",
        ],
        deliverable: "Write a Phase II protocol synopsis + IB section",
        jdSkill: "Protocol & IB authoring",
      },
      {
        weeks: "W5–6",
        title: "CSR authoring",
        topics: [
          "Synopsis & narrative writing",
          "TLF interpretation",
          "Safety narratives",
          "Internal QC review",
        ],
        deliverable: "Mini-CSR (synopsis + safety section) for a mock study",
        jdSkill: "End-to-end CSR drafting",
      },
      {
        weeks: "W7–8",
        title: "Regulatory writing. CTD modules 2.5 & 2.7",
        topics: [
          "Module 2.5 clinical overview",
          "Module 2.7 clinical summary",
          "Cross-referencing CSRs",
          "Health-authority queries",
        ],
        deliverable: "Module 2.7.4 safety summary draft",
        jdSkill: "CTD authoring discipline",
      },
      {
        weeks: "W9–10",
        title: "Manuscripts, posters & lay summaries",
        topics: [
          "IMRaD structure",
          "Author guidelines (NEJM/Lancet)",
          "Conference posters/abstracts",
          "Plain-language summaries (EMA)",
        ],
        deliverable: "Manuscript draft + conference poster",
        jdSkill: "Publications-grade scientific writing",
      },
      {
        weeks: "W11–12",
        title: "Capstone & interview prep",
        topics: [
          "Full mock CSR review cycle",
          "QC checklists",
          "Portfolio building",
          "Mock interview",
        ],
        deliverable: "Capstone: full mock CSR + manuscript",
        jdSkill: "Hire-ready medical writing portfolio",
      },
    ],
    projects: {
      minor: [
        "Author a Phase II protocol synopsis + IB clinical section",
        "Draft Module 2.7.4 safety summary from mock CSR data",
      ],
      major: "Full mock CSR (ICH-E3 sections) + companion manuscript draft submitted to QC review",
    },
    certification: "Verified Medical Writing Internship Certificate + Writing portfolio.",
  },
  {
    slug: "bioinformatics",
    title: "Bioinformatics & Genomic Data",
    category: "Pharmacy & Life Sciences",
    Icon: Dna,
    blurb:
      "Work with NGS data the way clinical genomics labs do. Linux, Python, variant calling and interpretation.",
    heroTagline: "Python + Linux + NGS, the toolkit Indian genomics labs hire for.",
    tools: [
      "Linux / Bash",
      "Python + Biopython",
      "BWA / Bowtie2",
      "GATK",
      "samtools / bcftools",
      "ANNOVAR / VEP",
      "IGV",
      "Nextflow",
    ],
    jd: {
      topSkills: [
        "Linux & shell scripting",
        "Python for biology (Biopython, pandas)",
        "NGS pipelines (FASTQ → VCF)",
        "Variant annotation & interpretation",
        "Reproducible workflows (Nextflow / Snakemake)",
      ],
      hiringRoles: [
        "Bioinformatics Analyst",
        "Clinical Genomics Associate",
        "NGS Pipeline Engineer",
        "Variant Curator",
      ],
      salary: "₹5 – 10 LPA",
      demand: "High",
      sampleEmployers: [
        "MedGenome",
        "Strand Life Sciences",
        "Genomics India",
        "Mapmygenome",
        "Eurofins Genomics",
        "Indegene",
        "Persistent Systems",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Linux + Python for biology",
        topics: [
          "Shell, pipes & scripting",
          "Python core + pandas",
          "Biopython basics",
          "Git for analysis projects",
        ],
        deliverable: "Reproducible analysis notebook on a public dataset",
        jdSkill: "Linux + Python fluency for bioinformatics",
      },
      {
        weeks: "W3–4",
        title: "Sequence analysis fundamentals",
        topics: [
          "DNA/RNA/protein refresher",
          "BLAST searches",
          "Pairwise & multiple alignment",
          "Phylogenetics intro",
        ],
        deliverable: "BLAST + alignment report on a chosen gene",
        jdSkill: "Sequence analysis literacy",
      },
      {
        weeks: "W5–6",
        title: "NGS pipelines (FASTQ → VCF)",
        topics: [
          "FASTQ QC (FastQC, fastp)",
          "Alignment (BWA/Bowtie2)",
          "Variant calling (GATK HaplotypeCaller)",
          "Best-practice workflow",
        ],
        deliverable: "Run an end-to-end germline pipeline on sample data",
        jdSkill: "GATK best-practices NGS pipeline",
      },
      {
        weeks: "W7–8",
        title: "Variant annotation & interpretation",
        topics: [
          "ANNOVAR / VEP",
          "ClinVar, gnomAD, OMIM",
          "ACMG classification basics",
          "IGV review",
        ],
        deliverable: "Annotated, ACMG-classified variant report (10 variants)",
        jdSkill: "Clinical variant interpretation",
      },
      {
        weeks: "W9–10",
        title: "Transcriptomics & single-cell intro",
        topics: [
          "RNA-seq pipeline (STAR/Salmon)",
          "Differential expression (DESeq2)",
          "Single-cell overview (Scanpy)",
          "Visualisation",
        ],
        deliverable: "Mini RNA-seq differential expression report",
        jdSkill: "Bulk + single-cell RNA-seq exposure",
      },
      {
        weeks: "W11–12",
        title: "Reproducible workflows + capstone",
        topics: [
          "Nextflow / Snakemake basics",
          "Containerised pipelines (Docker)",
          "Reporting & QC",
          "Mock interview",
        ],
        deliverable: "Capstone: Nextflow variant-calling pipeline + clinical-style report",
        jdSkill: "Production, reproducible bioinformatics workflows",
      },
    ],
    projects: {
      minor: [
        "Run a germline NGS pipeline on sample FASTQ → annotated VCF",
        "RNA-seq differential expression analysis with DESeq2 + visualisations",
      ],
      major:
        "End-to-end Nextflow pipeline (FASTQ → annotated, ACMG-classified report) on a clinical-grade sample",
    },
    certification: "Verified Bioinformatics Internship Certificate + GitHub pipeline portfolio.",
  },
  // ───────── Tech Programmes ─────────
  {
    slug: "ai-intelligence",
    title: "AI Intelligence Programme",
    category: "Tech Programmes",
    Icon: BrainCircuit,
    blurb: "Foundations of modern AI: LLMs, agents, RAG and applied product thinking.",
    heroTagline: "Build AI products, not just notebooks.",
    tools: ["Python", "PyTorch", "LangChain", "OpenAI API", "Hugging Face", "Pinecone / pgvector"],
    jd: {
      topSkills: [
        "Python & numpy",
        "LLM prompting & evals",
        "RAG pipelines",
        "Agentic workflows",
        "Vector databases",
      ],
      hiringRoles: ["Junior AI Engineer", "AI Product Engineer", "Applied AI Intern"],
      salary: "₹6 – 14 LPA",
      demand: "Very High",
      sampleEmployers: ["Microsoft", "Razorpay", "Swiggy", "Indian AI startups", "Cognizant AI"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Python & data foundations",
        topics: ["Python core", "numpy/pandas", "Notebook discipline", "Git basics"],
        deliverable: "5 pandas exercises",
        jdSkill: "Strong Python foundations",
      },
      {
        weeks: "W3–4",
        title: "ML refresher for AI",
        topics: [
          "Supervised vs unsupervised",
          "Evaluation metrics",
          "Train/val/test",
          "Bias & variance",
        ],
        deliverable: "Mini classifier",
        jdSkill: "Core ML literacy",
      },
      {
        weeks: "W5–6",
        title: "LLMs & prompting",
        topics: ["Transformer intuition", "Prompt patterns", "Function calling", "Cost & latency"],
        deliverable: "Prompt-engineering report",
        jdSkill: "LLM API & prompting skill",
      },
      {
        weeks: "W7–8",
        title: "RAG pipelines",
        topics: [
          "Embeddings",
          "Vector DBs (pgvector/Pinecone)",
          "Chunking & retrieval",
          "Eval harness",
        ],
        deliverable: "RAG over a custom doc set",
        jdSkill: "End-to-end RAG implementation",
      },
      {
        weeks: "W9–10",
        title: "Agents & tools",
        topics: ["LangChain / LangGraph", "Tool use", "Memory & state", "Guardrails"],
        deliverable: "Agent that completes a real task",
        jdSkill: "Agentic system design",
      },
      {
        weeks: "W11–12",
        title: "Productionisation & capstone",
        topics: ["Deployment", "Observability", "Cost control", "Demo + interview prep"],
        deliverable: "Capstone AI product",
        jdSkill: "Ship a working AI product",
      },
    ],
    projects: {
      minor: [
        "RAG system over your own document corpus",
        "Prompt-engineering eval harness with measurable metrics",
      ],
      major: "End-to-end AI product (web app + API) with auth, RAG, and observability",
    },
    certification: "Verified Applied AI Internship Certificate + GitHub project portfolio.",
  },
  {
    slug: "machine-learning",
    title: "Applied Machine Learning Programme",
    category: "Tech Programmes",
    Icon: Sparkles,
    blurb: "Classical ML through deep learning, with deployment and MLOps fundamentals.",
    heroTagline: "From scikit-learn to deployed models.",
    tools: ["Python", "scikit-learn", "PyTorch", "MLflow", "Docker", "AWS SageMaker"],
    jd: {
      topSkills: [
        "Feature engineering",
        "Model selection & tuning",
        "Deep learning basics",
        "MLOps (MLflow, Docker)",
        "Statistics",
      ],
      hiringRoles: ["ML Engineer Intern", "Junior Data Scientist", "MLOps Trainee"],
      salary: "₹6 – 12 LPA",
      demand: "Very High",
      sampleEmployers: ["Flipkart", "Myntra", "Razorpay", "Infosys", "TCS Research"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Stats & Python for ML",
        topics: ["Distributions", "Hypothesis testing", "Pandas pipelines", "Visualisation"],
        deliverable: "EDA report on a real dataset",
        jdSkill: "Working statistics + Python",
      },
      {
        weeks: "W3–4",
        title: "Classical ML",
        topics: ["Linear/logistic", "Trees & ensembles", "SVM, kNN", "Cross-validation"],
        deliverable: "Tabular ML benchmark",
        jdSkill: "scikit-learn proficiency",
      },
      {
        weeks: "W5–6",
        title: "Feature engineering & tuning",
        topics: ["Encoding & scaling", "Feature selection", "Bayesian/Optuna tuning", "Pipelines"],
        deliverable: "Optuna-tuned model report",
        jdSkill: "Feature engineering & tuning",
      },
      {
        weeks: "W7–8",
        title: "Deep learning",
        topics: ["PyTorch basics", "CNNs", "RNN/Transformers intro", "Transfer learning"],
        deliverable: "Image classifier with transfer learning",
        jdSkill: "DL with PyTorch",
      },
      {
        weeks: "W9–10",
        title: "MLOps fundamentals",
        topics: ["MLflow tracking", "Docker for ML", "Model registry", "Drift monitoring"],
        deliverable: "Tracked & containerised model",
        jdSkill: "MLOps pipeline awareness",
      },
      {
        weeks: "W11–12",
        title: "Capstone & deployment",
        topics: ["Cloud deploy (AWS/GCP)", "REST API", "Latency & cost", "Mock interview"],
        deliverable: "Deployed ML capstone",
        jdSkill: "Production ML deployment",
      },
    ],
    projects: {
      minor: [
        "Tabular benchmark with full feature-engineering report",
        "Image classifier fine-tuned on a custom dataset",
      ],
      major: "Deploy a model end-to-end with MLflow tracking, Docker, REST API and monitoring",
    },
    certification: "Verified Applied ML Internship Certificate + GitHub portfolio.",
  },
  {
    slug: "full-stack",
    title: "Full Stack Mastery",
    category: "Tech Programmes",
    Icon: Layers,
    blurb: "TypeScript, React, Node and Postgres, ship real production-grade web apps.",
    heroTagline: "The exact stack hired-for in 2025 internships.",
    tools: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind",
      "Vercel",
    ],
    jd: {
      topSkills: ["TypeScript & React", "REST + auth", "Postgres / SQL", "Git / CI", "Testing"],
      hiringRoles: ["Frontend Intern", "Full-Stack Intern", "Junior Software Engineer"],
      salary: "₹5 – 12 LPA",
      demand: "Very High",
      sampleEmployers: ["Razorpay", "Zomato", "Swiggy", "Postman", "Atlan", "Indian SaaS startups"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Modern JS & TypeScript",
        topics: ["ES modules", "Async / promises", "TS types & generics", "Tooling"],
        deliverable: "TS utility library",
        jdSkill: "TypeScript fluency",
      },
      {
        weeks: "W3–4",
        title: "React fundamentals",
        topics: ["Hooks", "State patterns", "Forms", "Routing"],
        deliverable: "React mini-app",
        jdSkill: "React production patterns",
      },
      {
        weeks: "W5–6",
        title: "Backend with Node & Postgres",
        topics: ["Express / Hono", "REST design", "Postgres schema", "Prisma ORM"],
        deliverable: "REST API on Postgres",
        jdSkill: "Node + SQL",
      },
      {
        weeks: "W7–8",
        title: "Auth, payments & uploads",
        topics: ["JWT / OAuth", "Stripe / Razorpay", "File uploads", "Webhooks"],
        deliverable: "Auth + payments demo",
        jdSkill: "Auth & 3rd-party integrations",
      },
      {
        weeks: "W9–10",
        title: "Testing & CI/CD",
        topics: ["Vitest / Playwright", "GitHub Actions", "Preview deployments", "Observability"],
        deliverable: "Tested CI pipeline",
        jdSkill: "Testing & CI/CD discipline",
      },
      {
        weeks: "W11–12",
        title: "Capstone SaaS",
        topics: ["Product spec", "Architecture", "Performance", "Demo"],
        deliverable: "Capstone: deployed SaaS",
        jdSkill: "Ship a real full-stack product",
      },
    ],
    projects: {
      minor: ["TypeScript REST API with auth on Postgres", "React dashboard wired to your own API"],
      major: "Deployed multi-user SaaS (auth + payments + Postgres + CI) on Vercel/Render",
    },
    certification: "Verified Full-Stack Internship Certificate + GitHub portfolio.",
  },
  {
    slug: "ethical-hacking",
    title: "Ethical Hacking & Security",
    category: "Tech Programmes",
    Icon: Shield,
    blurb: "Offensive security fundamentals, recon, exploitation, web app security and reporting.",
    heroTagline: "Built around the CEH and OWASP Top 10.",
    tools: ["Kali Linux", "Burp Suite", "Nmap", "Metasploit", "Wireshark", "Hydra", "OWASP ZAP"],
    jd: {
      topSkills: [
        "Network scanning",
        "Vulnerability assessment",
        "Web app pentesting (OWASP Top 10)",
        "Reporting",
        "Linux fundamentals",
      ],
      hiringRoles: ["Security Analyst Intern", "VAPT Trainee", "SOC Analyst (L1)"],
      salary: "₹4 – 10 LPA",
      demand: "Very High",
      sampleEmployers: ["Deloitte", "EY", "KPMG", "Indian cyber-sec startups", "TCS Cyber"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Linux, networking & lab setup",
        topics: ["Kali Linux", "TCP/IP refresher", "Lab with VMs", "Tooling"],
        deliverable: "Lab walkthrough",
        jdSkill: "Networking + Linux comfort",
      },
      {
        weeks: "W3–4",
        title: "Recon & scanning",
        topics: ["OSINT", "Nmap deep-dive", "Service enumeration", "Banner grabbing"],
        deliverable: "Recon report on a CTF box",
        jdSkill: "Recon and enumeration skill",
      },
      {
        weeks: "W5–6",
        title: "Exploitation basics",
        topics: [
          "Metasploit",
          "Password attacks (Hydra)",
          "Privilege escalation",
          "Post-exploitation",
        ],
        deliverable: "Compromise 3 lab boxes",
        jdSkill: "Exploitation lifecycle understanding",
      },
      {
        weeks: "W7–8",
        title: "Web application security",
        topics: ["OWASP Top 10", "Burp Suite", "SQLi / XSS / SSRF", "API testing"],
        deliverable: "Web pentest of intentional-vuln app",
        jdSkill: "OWASP Top 10 testing",
      },
      {
        weeks: "W9–10",
        title: "Reporting & frameworks",
        topics: ["CVSS scoring", "Pentest report writing", "MITRE ATT&CK", "Compliance overview"],
        deliverable: "Professional pentest report",
        jdSkill: "Client-grade reporting",
      },
      {
        weeks: "W11–12",
        title: "Capstone CTF + interview",
        topics: ["Multi-stage CTF", "Interview prep", "Certification roadmap"],
        deliverable: "Capstone CTF + write-up",
        jdSkill: "Demonstrable applied skill",
      },
    ],
    projects: {
      minor: [
        "Network pentest of a HackTheBox-style lab with full report",
        "Web app security audit of an OWASP Juice-Shop-style target",
      ],
      major: "Multi-stage CTF + professional pentest report (executive + technical)",
    },
    certification: "Verified Ethical Hacking Internship Certificate + CEH-readiness assessment.",
  },
  {
    slug: "data-science",
    title: "Data Science",
    category: "Tech Programmes",
    Icon: LineChart,
    blurb: "From SQL and statistics to dashboards, ML and storytelling with data.",
    heroTagline: "JD-mapped to what analytics & DS teams actually demand.",
    tools: ["Python", "SQL", "pandas", "scikit-learn", "Tableau / Power BI", "BigQuery"],
    jd: {
      topSkills: [
        "SQL",
        "Python + pandas",
        "Statistics",
        "Data visualisation",
        "ML basics",
        "Storytelling",
      ],
      hiringRoles: ["Data Analyst", "Junior Data Scientist", "Analytics Intern"],
      salary: "₹5 – 11 LPA",
      demand: "Very High",
      sampleEmployers: ["Flipkart", "Swiggy", "PhonePe", "Deloitte", "EY", "Indian SaaS"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "SQL deep-dive",
        topics: ["Joins, window functions", "CTEs", "Performance", "Real ad-hoc analysis"],
        deliverable: "10-question SQL set",
        jdSkill: "Strong SQL (windows + CTEs)",
      },
      {
        weeks: "W3–4",
        title: "Python for analytics",
        topics: ["pandas idioms", "Numpy", "Cleaning real datasets", "Notebook hygiene"],
        deliverable: "EDA notebook",
        jdSkill: "Python + pandas at production level",
      },
      {
        weeks: "W5–6",
        title: "Statistics & experimentation",
        topics: ["Hypothesis testing", "Confidence intervals", "A/B testing", "Sampling"],
        deliverable: "A/B test analysis report",
        jdSkill: "Applied statistics for product",
      },
      {
        weeks: "W7–8",
        title: "Visualisation & dashboards",
        topics: ["Tableau / Power BI", "Storyboarding", "Dashboard design", "Executive comms"],
        deliverable: "Stakeholder dashboard",
        jdSkill: "Tableau/Power BI delivery",
      },
      {
        weeks: "W9–10",
        title: "ML for analysts",
        topics: [
          "scikit-learn essentials",
          "Feature engineering",
          "Evaluation",
          "Communicating results",
        ],
        deliverable: "ML mini-project",
        jdSkill: "Practical ML literacy",
      },
      {
        weeks: "W11–12",
        title: "Capstone case",
        topics: ["Business framing", "End-to-end analysis", "Recommendation", "Mock interview"],
        deliverable: "Capstone analysis + deck",
        jdSkill: "Business-ready analyst output",
      },
    ],
    projects: {
      minor: [
        "A/B-test analysis on a real-world dataset",
        "Stakeholder-ready Tableau / Power BI dashboard",
      ],
      major: "End-to-end business case: SQL → Python → ML → dashboard → recommendation deck",
    },
    certification: "Verified Data Science Internship Certificate + portfolio.",
  },
  {
    slug: "iot-lab",
    title: "Internet of Things Lab",
    category: "Tech Programmes",
    Icon: Cpu,
    blurb: "Build connected devices end-to-end, sensors, MCUs, MQTT and cloud dashboards.",
    heroTagline: "Hardware + software + cloud, in one project arc.",
    tools: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "Node-RED", "AWS IoT Core"],
    jd: {
      topSkills: [
        "Embedded C / MicroPython",
        "Sensor interfacing",
        "MQTT / HTTP",
        "Cloud IoT services",
        "Dashboarding",
      ],
      hiringRoles: ["IoT Engineer Intern", "Embedded Trainee", "Hardware-Software Integrator"],
      salary: "₹3.5 – 8 LPA",
      demand: "High",
      sampleEmployers: [
        "Bosch",
        "Honeywell",
        "Reliance Jio",
        "L&T Tech Services",
        "Indian IoT startups",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Embedded foundations",
        topics: ["MCU concepts", "Arduino IDE", "GPIO / ADC", "Power basics"],
        deliverable: "Sensor → LED demo",
        jdSkill: "Embedded basics",
      },
      {
        weeks: "W3–4",
        title: "ESP32 & connectivity",
        topics: ["Wi-Fi / BLE", "REST", "Deep sleep", "OTA basics"],
        deliverable: "Wi-Fi sensor node",
        jdSkill: "Networked MCU programming",
      },
      {
        weeks: "W5–6",
        title: "MQTT & messaging",
        topics: ["MQTT broker (Mosquitto)", "Topics & QoS", "Retained messages", "Security (TLS)"],
        deliverable: "End-to-end MQTT pipeline",
        jdSkill: "MQTT-based device comms",
      },
      {
        weeks: "W7–8",
        title: "Edge with Raspberry Pi",
        topics: ["Linux on Pi", "Python services", "Local processing", "Camera + edge ML"],
        deliverable: "Edge inference demo",
        jdSkill: "Edge + Linux integration",
      },
      {
        weeks: "W9–10",
        title: "Cloud IoT & dashboards",
        topics: [
          "AWS IoT Core / GCP IoT",
          "Rules engine",
          "Node-RED dashboards",
          "Time-series storage",
        ],
        deliverable: "Cloud-connected fleet demo",
        jdSkill: "Cloud IoT integration",
      },
      {
        weeks: "W11–12",
        title: "Capstone product",
        topics: ["Spec → device → dashboard", "Reliability", "Demo", "Interview prep"],
        deliverable: "Capstone IoT product",
        jdSkill: "Build-and-ship IoT product",
      },
    ],
    projects: {
      minor: [
        "ESP32-based environmental sensor publishing over MQTT",
        "Edge ML demo on Raspberry Pi",
      ],
      major: "End-to-end IoT product: device + cloud + dashboard + reliability metrics",
    },
    certification: "Verified IoT Internship Certificate + project hardware demo.",
  },
  {
    slug: "cloud",
    title: "Mastering Cloud Technologies",
    category: "Tech Programmes",
    Icon: Cloud,
    blurb: "Hands-on AWS-first cloud, compute, storage, networking, IaC and security.",
    heroTagline: "AWS Cloud Practitioner + Solutions Architect track.",
    tools: [
      "AWS (EC2, S3, VPC, IAM, RDS, Lambda)",
      "Terraform",
      "CloudFormation",
      "Docker",
      "GitHub Actions",
    ],
    jd: {
      topSkills: [
        "Core AWS services",
        "IAM & security",
        "Networking (VPC)",
        "IaC (Terraform)",
        "CI/CD pipelines",
      ],
      hiringRoles: ["Cloud Engineer Intern", "DevOps Trainee", "Junior SRE"],
      salary: "₹5 – 12 LPA",
      demand: "Very High",
      sampleEmployers: ["AWS Partner network", "Infosys", "TCS", "Wipro", "Razorpay", "Cognizant"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Cloud fundamentals & AWS Core",
        topics: ["Cloud models", "AWS Global infra", "EC2 / S3 / IAM basics", "Cost & billing"],
        deliverable: "AWS account hardened + first EC2",
        jdSkill: "AWS Cloud Practitioner core",
      },
      {
        weeks: "W3–4",
        title: "Networking on AWS",
        topics: [
          "VPC, subnets, route tables",
          "Security groups & NACLs",
          "Load balancers",
          "Route53",
        ],
        deliverable: "Custom VPC with public + private",
        jdSkill: "AWS networking",
      },
      {
        weeks: "W5–6",
        title: "Storage & databases",
        topics: ["S3 deep-dive", "EBS vs EFS", "RDS / DynamoDB", "Backups"],
        deliverable: "Multi-AZ database demo",
        jdSkill: "Data services on AWS",
      },
      {
        weeks: "W7–8",
        title: "Serverless & containers",
        topics: ["Lambda + API GW", "ECS Fargate", "Docker basics", "Event-driven design"],
        deliverable: "Serverless API + container service",
        jdSkill: "Compute beyond EC2",
      },
      {
        weeks: "W9–10",
        title: "IaC + CI/CD",
        topics: [
          "Terraform basics",
          "Modules & state",
          "GitHub Actions deploys",
          "Secrets handling",
        ],
        deliverable: "Terraform deploys a stack",
        jdSkill: "IaC + CI/CD literacy",
      },
      {
        weeks: "W11–12",
        title: "Security & capstone",
        topics: [
          "IAM advanced",
          "Cloud security best practice",
          "Cost optimisation",
          "Architecture diagram",
        ],
        deliverable: "Capstone: 3-tier app on AWS",
        jdSkill: "Production-aware cloud build",
      },
    ],
    projects: {
      minor: [
        "Multi-AZ web app with VPC, ALB and RDS on AWS",
        "Terraform module that provisions a reusable stack",
      ],
      major: "3-tier production-style architecture on AWS with IaC + CI/CD",
    },
    certification: "Verified Cloud Internship Certificate + AWS CCP-readiness assessment.",
  },
  {
    slug: "android-development",
    title: "Android Development Studio",
    category: "Tech Programmes",
    Icon: Smartphone,
    blurb: "Modern Android with Kotlin, Jetpack Compose and Firebase, ship a real Play-Store app.",
    heroTagline: "Kotlin + Compose, the way Google teaches it now.",
    tools: ["Kotlin", "Android Studio", "Jetpack Compose", "Room", "Retrofit", "Firebase"],
    jd: {
      topSkills: [
        "Kotlin",
        "Jetpack Compose",
        "Architecture (MVVM)",
        "Networking & local DB",
        "Play Store publishing",
      ],
      hiringRoles: ["Android Engineer Intern", "Mobile Developer Trainee"],
      salary: "₹4.5 – 10 LPA",
      demand: "High",
      sampleEmployers: ["Swiggy", "Zomato", "Razorpay", "Cred", "Indian consumer apps"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Kotlin essentials",
        topics: ["Syntax + null safety", "Coroutines", "Collections", "OOP idioms"],
        deliverable: "Kotlin katas",
        jdSkill: "Strong Kotlin foundation",
      },
      {
        weeks: "W3–4",
        title: "Jetpack Compose UI",
        topics: ["Composables", "State", "Navigation", "Theming"],
        deliverable: "Multi-screen Compose app",
        jdSkill: "Compose UI patterns",
      },
      {
        weeks: "W5–6",
        title: "Architecture & state",
        topics: ["MVVM", "ViewModel + Flow", "DI (Hilt)", "Repository pattern"],
        deliverable: "Refactor into MVVM",
        jdSkill: "Production app architecture",
      },
      {
        weeks: "W7–8",
        title: "Networking & local DB",
        topics: ["Retrofit + OkHttp", "Coroutine flows", "Room DB", "Caching"],
        deliverable: "Online + offline capable app",
        jdSkill: "Data layer skills",
      },
      {
        weeks: "W9–10",
        title: "Auth, Firebase & push",
        topics: ["Firebase Auth", "Firestore", "FCM push", "Crashlytics"],
        deliverable: "Auth + push demo",
        jdSkill: "Firebase integrations",
      },
      {
        weeks: "W11–12",
        title: "Publish & capstone",
        topics: ["Play Store policies", "Signing & release", "Beta testing", "Resume + interview"],
        deliverable: "Capstone app on Play Store (internal)",
        jdSkill: "Ship a real Android app",
      },
    ],
    projects: {
      minor: [
        "Compose-only single-screen consumer app",
        "Networked app with Room caching and offline mode",
      ],
      major: "Full-stack Android app published to Play Store internal track with auth + push",
    },
    certification: "Verified Android Internship Certificate + Play Store project link.",
  },
  {
    slug: "embedded-systems",
    title: "EmbedX: Smart Systems Engineering",
    category: "Tech Programmes",
    Icon: CircuitBoard,
    blurb: "Embedded C, RTOS and bare-metal microcontrollers for smart-product engineering.",
    heroTagline: "The path into core embedded jobs at hardware companies.",
    tools: ["STM32 / ESP32", "Embedded C", "FreeRTOS", "I²C / SPI / UART", "KiCad basics"],
    jd: {
      topSkills: [
        "Embedded C",
        "Microcontroller peripherals",
        "RTOS basics",
        "Communication protocols",
        "Debugging with logic analyser",
      ],
      hiringRoles: ["Embedded Engineer Intern", "Firmware Trainee"],
      salary: "₹3.5 – 8 LPA",
      demand: "High",
      sampleEmployers: ["Bosch", "Continental", "Honeywell", "Tata Elxsi", "L&T Tech Services"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Embedded C & toolchain",
        topics: ["C deep-dive for embedded", "Memory model", "Toolchains", "Debugger basics"],
        deliverable: "Bare-metal blink + UART",
        jdSkill: "Embedded C fluency",
      },
      {
        weeks: "W3–4",
        title: "MCU peripherals",
        topics: ["GPIO, ADC, PWM", "Interrupts", "Timers", "Power modes"],
        deliverable: "Peripheral demo board",
        jdSkill: "Peripheral programming",
      },
      {
        weeks: "W5–6",
        title: "Communication protocols",
        topics: ["UART", "I²C", "SPI", "Logic analyser debugging"],
        deliverable: "Multi-sensor bus demo",
        jdSkill: "Protocol-level debugging",
      },
      {
        weeks: "W7–8",
        title: "RTOS basics",
        topics: ["FreeRTOS tasks", "Queues & semaphores", "Scheduling", "Resource locks"],
        deliverable: "RTOS-based 3-task app",
        jdSkill: "RTOS application skill",
      },
      {
        weeks: "W9–10",
        title: "Connectivity & robustness",
        topics: ["BLE / Wi-Fi modules", "Watchdogs", "OTA basics", "Field failure modes"],
        deliverable: "Connected RTOS app",
        jdSkill: "Production robustness mindset",
      },
      {
        weeks: "W11–12",
        title: "Capstone smart device",
        topics: ["Schematic basics in KiCad", "Integration", "Demo", "Interview prep"],
        deliverable: "Capstone smart device",
        jdSkill: "Ship an embedded product",
      },
    ],
    projects: {
      minor: [
        "Multi-sensor data acquisition via I²C/SPI with logic-analyser proof",
        "FreeRTOS app coordinating 3 concurrent tasks",
      ],
      major: "Connected smart device: RTOS + sensors + BLE/Wi-Fi + watchdog + demo",
    },
    certification: "Verified Embedded Systems Internship Certificate + hardware project demo.",
  },
  {
    slug: "devops",
    title: "DevOps Engineering",
    category: "Tech Programmes",
    Icon: GitBranch,
    blurb: "CI/CD, containers, Kubernetes and observability, the modern DevOps toolchain.",
    heroTagline: "Land Junior DevOps / SRE roles at Indian SaaS companies.",
    tools: ["Linux", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Prometheus / Grafana"],
    jd: {
      topSkills: [
        "Linux & shell",
        "Docker",
        "Kubernetes basics",
        "CI/CD",
        "IaC",
        "Monitoring & alerting",
      ],
      hiringRoles: ["Junior DevOps Engineer", "SRE Intern", "Platform Engineer Trainee"],
      salary: "₹6 – 14 LPA",
      demand: "Very High",
      sampleEmployers: ["Razorpay", "Atlan", "Postman", "Indian SaaS", "Cognizant Cloud"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Linux & shell",
        topics: ["Filesystem, processes", "Bash scripting", "Networking tools", "SSH"],
        deliverable: "Bash automation script",
        jdSkill: "Linux & shell fluency",
      },
      {
        weeks: "W3–4",
        title: "Docker & containers",
        topics: ["Images & layers", "Compose", "Networking", "Best practice"],
        deliverable: "Multi-service Compose stack",
        jdSkill: "Docker production usage",
      },
      {
        weeks: "W5–6",
        title: "CI/CD with GitHub Actions",
        topics: ["Workflows", "Caching", "Secrets", "Matrix builds"],
        deliverable: "End-to-end pipeline",
        jdSkill: "CI/CD pipeline ownership",
      },
      {
        weeks: "W7–8",
        title: "Kubernetes essentials",
        topics: ["Pods, Deployments, Services", "Helm basics", "Ingress", "Scaling"],
        deliverable: "App on local k8s + Helm chart",
        jdSkill: "Kubernetes basics",
      },
      {
        weeks: "W9–10",
        title: "IaC + cloud",
        topics: ["Terraform on AWS/GCP", "State & modules", "Cost awareness", "Secrets mgmt"],
        deliverable: "Terraform-managed env",
        jdSkill: "Terraform & cloud IaC",
      },
      {
        weeks: "W11–12",
        title: "Observability + capstone",
        topics: ["Prometheus/Grafana", "Logs & traces", "On-call basics", "Postmortem culture"],
        deliverable: "Capstone: full pipeline + dashboard",
        jdSkill: "Production-grade observability",
      },
    ],
    projects: {
      minor: [
        "Containerised app with Compose + GitHub Actions CI/CD",
        "Helm-deployed app on local Kubernetes",
      ],
      major:
        "Production-style pipeline: GitHub → CI → Terraform → Kubernetes → Prometheus dashboard",
    },
    certification: "Verified DevOps Internship Certificate + GitHub portfolio.",
  },
  // ───────── Commerce & Marketing ─────────
  {
    slug: "digital-marketing",
    title: "Digital Marketing & Growth Hacking",
    category: "Commerce & Marketing",
    Icon: Megaphone,
    blurb: "Performance marketing, SEO, content and growth experiments, the full demand stack.",
    heroTagline: "Run real campaigns on a small live budget.",
    tools: [
      "Google Ads",
      "Meta Ads",
      "GA4",
      "Google Search Console",
      "SEMrush / Ahrefs",
      "Notion / HubSpot",
    ],
    jd: {
      topSkills: [
        "Performance marketing (Google + Meta)",
        "SEO",
        "GA4 analytics",
        "Funnel & conversion thinking",
        "Content + email",
      ],
      hiringRoles: ["Performance Marketing Intern", "SEO Executive", "Growth Analyst"],
      salary: "₹3 – 8 LPA",
      demand: "Very High",
      sampleEmployers: [
        "WebEngage",
        "Razorpay",
        "Indian D2C brands",
        "Schbang",
        "GroupM",
        "Performics",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Marketing fundamentals",
        topics: ["Funnels & ICP", "Channel mix", "Brand vs performance", "Metrics: CAC, LTV, ROAS"],
        deliverable: "Strategy doc for a chosen brand",
        jdSkill: "Marketing fundamentals",
      },
      {
        weeks: "W3–4",
        title: "SEO that ranks",
        topics: ["Keyword research", "On-page SEO", "Technical SEO basics", "Link building"],
        deliverable: "SEO audit + content brief",
        jdSkill: "Practical SEO",
      },
      {
        weeks: "W5–6",
        title: "Google Ads",
        topics: ["Search & PMax", "Bidding & quality score", "Conversion tracking", "Budgeting"],
        deliverable: "Live Google Ads campaign",
        jdSkill: "Google Ads execution",
      },
      {
        weeks: "W7–8",
        title: "Meta Ads & creatives",
        topics: ["Campaign / ad set / ad", "Audiences", "Creative testing", "Pixel & CAPI"],
        deliverable: "Live Meta Ads campaign",
        jdSkill: "Meta Ads execution",
      },
      {
        weeks: "W9–10",
        title: "Analytics & CRO",
        topics: ["GA4 events", "Looker Studio", "Funnel analysis", "Landing-page CRO"],
        deliverable: "GA4 + Looker dashboard",
        jdSkill: "GA4 + analytics",
      },
      {
        weeks: "W11–12",
        title: "Growth hacking + capstone",
        topics: ["Lifecycle email", "Referral loops", "Experiments", "Reporting"],
        deliverable: "Capstone: full growth report",
        jdSkill: "End-to-end growth ownership",
      },
    ],
    projects: {
      minor: [
        "SEO audit + content brief for a real brand",
        "Live Google + Meta ad campaign with reporting",
      ],
      major: "End-to-end growth report for a real brand: SEO + paid + analytics + experiments",
    },
    certification: "Verified Digital Marketing Internship Certificate + live-campaign portfolio.",
  },
  {
    slug: "business-analytics",
    title: "Business Analytics & Intelligence",
    category: "Commerce & Marketing",
    Icon: BarChart3,
    blurb: "Turn business questions into data answers using SQL, Excel, Power BI and statistics.",
    heroTagline: "Built for the BA / consulting interview funnel.",
    tools: [
      "Excel (advanced)",
      "SQL",
      "Power BI / Tableau",
      "Python (pandas)",
      "PowerPoint storytelling",
    ],
    jd: {
      topSkills: [
        "Excel modelling",
        "SQL",
        "Visualisation (PBI/Tableau)",
        "Business framing",
        "Storytelling with data",
      ],
      hiringRoles: ["Business Analyst Intern", "Strategy Analyst", "BI Developer"],
      salary: "₹4.5 – 10 LPA",
      demand: "Very High",
      sampleEmployers: [
        "Deloitte",
        "EY",
        "KPMG",
        "Accenture Strategy",
        "ZS Associates",
        "Mu Sigma",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Excel modelling",
        topics: [
          "Lookups, dynamic arrays",
          "Pivot tables",
          "Financial modelling basics",
          "Sensitivity",
        ],
        deliverable: "Mini financial model",
        jdSkill: "Advanced Excel",
      },
      {
        weeks: "W3–4",
        title: "SQL for analysts",
        topics: ["Joins & aggregates", "Window functions", "CTEs", "Performance"],
        deliverable: "Analyst SQL portfolio",
        jdSkill: "SQL for BI",
      },
      {
        weeks: "W5–6",
        title: "Power BI / Tableau",
        topics: ["Semantic models", "DAX / calculated fields", "Dashboard design", "Publishing"],
        deliverable: "Executive dashboard",
        jdSkill: "BI dashboarding",
      },
      {
        weeks: "W7–8",
        title: "Statistics for business",
        topics: ["Distributions", "Hypothesis testing", "Forecasting basics", "A/B testing"],
        deliverable: "Forecast report",
        jdSkill: "Applied statistics",
      },
      {
        weeks: "W9–10",
        title: "Python for analysts",
        topics: ["pandas", "Joining datasets", "Cleaning", "Visualisation"],
        deliverable: "Cleaned + analysed dataset",
        jdSkill: "Python literacy",
      },
      {
        weeks: "W11–12",
        title: "Case-study capstone",
        topics: ["Business framing", "Hypothesis tree", "Recommendation", "Storyboard deck"],
        deliverable: "Capstone case + deck",
        jdSkill: "Consulting-style problem solving",
      },
    ],
    projects: {
      minor: [
        "Executive Power BI / Tableau dashboard with live drill-downs",
        "SQL + Excel forecast for a sample P&L",
      ],
      major: "Consulting-style capstone case: framing → analysis → recommendation deck",
    },
    certification: "Verified Business Analytics Internship Certificate + portfolio.",
  },
  {
    slug: "finance",
    title: "Applied Finance & Investment Strategy",
    category: "Commerce & Marketing",
    Icon: Wallet,
    blurb: "Financial modelling, valuation and investment analysis, the analyst skill set.",
    heroTagline: "Modelled on entry-level IB / equity-research JDs.",
    tools: ["Excel", "PowerPoint", "Bloomberg basics", "Tijori / Screener", "Python (optional)"],
    jd: {
      topSkills: [
        "Three-statement modelling",
        "Valuation (DCF, comps)",
        "Industry analysis",
        "Pitch decks",
        "Excel mastery",
      ],
      hiringRoles: [
        "Investment Banking Analyst Intern",
        "Equity Research Trainee",
        "Finance Analyst",
      ],
      salary: "₹5 – 14 LPA",
      demand: "High",
      sampleEmployers: [
        "Goldman Sachs ops",
        "Nomura",
        "Motilal Oswal",
        "Indian PE/VC funds",
      ],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Accounting & finance refresher",
        topics: ["3 statements", "Ratios", "Working capital", "Cash flow"],
        deliverable: "Ratio analysis on a real company",
        jdSkill: "Solid accounting fundamentals",
      },
      {
        weeks: "W3–4",
        title: "Excel for finance",
        topics: ["Modelling discipline", "Scenarios", "Sensitivity", "Best practices"],
        deliverable: "Reusable model template",
        jdSkill: "Banker-grade Excel",
      },
      {
        weeks: "W5–6",
        title: "Three-statement modelling",
        topics: ["Revenue build", "Cost stack", "Linked statements", "Sanity checks"],
        deliverable: "Working 3-statement model",
        jdSkill: "Modelling proficiency",
      },
      {
        weeks: "W7–8",
        title: "Valuation",
        topics: ["DCF", "Trading & transaction comps", "Football field", "WACC"],
        deliverable: "Valuation report on a company",
        jdSkill: "Valuation toolkit",
      },
      {
        weeks: "W9–10",
        title: "Industry & investment analysis",
        topics: ["Industry frameworks", "Channel checks", "Investment thesis", "Risks"],
        deliverable: "Industry deep-dive",
        jdSkill: "Equity research analysis",
      },
      {
        weeks: "W11–12",
        title: "Pitch deck + capstone",
        topics: ["Pitchbook structure", "Storyline & visuals", "Mock interview"],
        deliverable: "Capstone: pitch + model",
        jdSkill: "Banker-style deliverable",
      },
    ],
    projects: {
      minor: [
        "Three-statement model + DCF for a listed Indian company",
        "Industry deep-dive note (10 pages)",
      ],
      major: "Full pitch deck + supporting model + valuation for a real-world target",
    },
    certification: "Verified Finance Internship Certificate + portfolio of models and decks.",
  },
  {
    slug: "human-resources",
    title: "Human Resource Management & Talent Management",
    category: "Commerce & Marketing",
    Icon: Users,
    blurb: "Modern HR, sourcing, talent ops, comp & benefits, HR analytics and culture.",
    heroTagline: "From sourcing to HRBP foundations.",
    tools: ["LinkedIn Recruiter", "Naukri RMS", "Greenhouse / Lever", "Excel", "Power BI for HR"],
    jd: {
      topSkills: [
        "Talent acquisition",
        "Employee lifecycle",
        "Comp & benefits basics",
        "HR analytics",
        "Compliance",
      ],
      hiringRoles: ["HR Intern", "Talent Acquisition Trainee", "HR Operations Associate"],
      salary: "₹3 – 7 LPA",
      demand: "Steady",
      sampleEmployers: ["Infosys", "TCS", "Indian SaaS", "ANSR", "Recruitment consultancies"],
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "HR foundations & lifecycle",
        topics: [
          "Hire-to-retire lifecycle",
          "HR roles (TA, HRBP, Ops)",
          "Indian labour basics",
          "HRMS overview",
        ],
        deliverable: "Lifecycle process map",
        jdSkill: "HR fundamentals",
      },
      {
        weeks: "W3–4",
        title: "Talent acquisition",
        topics: ["JD writing", "Boolean sourcing", "LinkedIn / Naukri", "Interview kit"],
        deliverable: "Sourcing + screening exercise",
        jdSkill: "TA skill set",
      },
      {
        weeks: "W5–6",
        title: "Onboarding & engagement",
        topics: ["Onboarding journeys", "Engagement surveys", "Recognition", "Retention drivers"],
        deliverable: "Onboarding plan for a real role",
        jdSkill: "Employee experience design",
      },
      {
        weeks: "W7–8",
        title: "Comp & benefits",
        topics: [
          "Salary structures (CTC)",
          "Benefits design",
          "Statutory (PF/ESI/Gratuity)",
          "Benchmarking",
        ],
        deliverable: "CTC + benefit design exercise",
        jdSkill: "C&B literacy",
      },
      {
        weeks: "W9–10",
        title: "HR analytics",
        topics: ["Excel for HR", "Power BI HR dashboard", "Attrition analytics", "Funnel metrics"],
        deliverable: "HR dashboard",
        jdSkill: "Data-led HR",
      },
      {
        weeks: "W11–12",
        title: "Capstone & interview prep",
        topics: ["End-to-end TA cycle", "Stakeholder mgmt", "Mock interview", "Resume polishing"],
        deliverable: "Capstone: end-to-end TA case",
        jdSkill: "Interview-ready HR practitioner",
      },
    ],
    projects: {
      minor: [
        "Sourcing + shortlisting drive for a real role with Boolean strings",
        "HR Power BI dashboard with attrition + funnel",
      ],
      major:
        "End-to-end talent acquisition case: JD → sourcing → interview kit → offer → onboarding plan",
    },
    certification: "Verified HR Internship Certificate + portfolio of TA + analytics work.",
  },
];

export const COURSES_BY_SLUG: Record<string, Course> = Object.fromEntries(
  COURSES.map((c) => [c.slug, c]),
);

export const CATEGORIES: CourseCategory[] = [
  "Pharmacy & Life Sciences",
  "Tech Programmes",
  "Commerce & Marketing",
];
