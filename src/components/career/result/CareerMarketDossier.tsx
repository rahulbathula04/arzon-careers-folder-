import { Briefcase, Building2, TrendingUp, MapPin, CheckCircle2, AlertTriangle, ShieldCheck, Layers } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

interface MarketProfile {
  targetRole: string;
  marketShareInIndia: string;
  entryRange: string;
  entryTakeHome: string;
  midRange: string;
  leadRange: string;
  execRange: string;
  hubs: { city: string; areas: string }[];
  tools: { name: string; category: string }[];
  employers: string[];
  dayInLife: string;
  dailyKpis: string[];
  technicalInterviewTells: string[];
  marketOutlook: string;
}

const MARKET_METRICS: Record<string, MarketProfile> = {
  pharmacovigilance: {
    targetRole: "Drug Safety Associate / Pharmacovigilance Specialist",
    marketShareInIndia: "India processes >65% of global ICSR adverse event reports across MNC Global Capability Centers (GCCs).",
    entryRange: "₹3.8L – ₹5.6L PA",
    entryTakeHome: "₹28,000 – ₹38,000 / month",
    midRange: "₹6.8L – ₹10.5L PA",
    leadRange: "₹14.0L – ₹22.0L PA",
    execRange: "₹24.0L – ₹38.0L+ PA",
    hubs: [
      { city: "Hyderabad", areas: "HITEC City, Genome Valley, Gachibowli" },
      { city: "Bengaluru", areas: "Whitefield, Electronic City, Manyata" },
      { city: "Pune", areas: "Hinjawadi Phase 1-3, Magarpatta" },
      { city: "Mumbai / Navi Mumbai", areas: "Airoli, MBP, Thane West" },
      { city: "Chennai", areas: "OMR, Guindy DLF SEZ" },
    ],
    tools: [
      { name: "Enterprise Safety Databases", category: "Safety Database" },
      { name: "Standardized Medical Coding", category: "Medical Terminology" },
      { name: "Global Drug Coding Dictionaries", category: "Concomitant Meds" },
      { name: "ICH E2B(R3) Standards", category: "Regulatory Transmission" },
      { name: "Clinical Safety Narratives", category: "Technical Writing" },
      { name: "CIOMS / FDA Form 3500A", category: "Expedited Reporting" },
    ],
    employers: [
      "Global Pharma Safety GCCs (Hyderabad & Bengaluru)",
      "Tier-1 Contract Research Organisations (CROs)",
      "Multinational Safety Data Operations",
      "Life Sciences Pharmacovigilance Centers",
      "Regulatory Science Consulting Units",
      "Central Adverse Event Case Processing Units",
      "Global Drug Safety Operations Desks",
      "Post-Marketing Surveillance Hubs",
    ],
    dayInLife:
      "Triage incoming spontaneous, clinical trial, and literature adverse event cases. Code medical events to standardized clinical dictionary terms, verify suspect drug formulation and causality, formulate structured safety narratives, and ensure compliance with strict 7-day and 15-day global regulatory submission deadlines.",
    dailyKpis: [
      "4–6 ICSR adverse event cases processed per 8-hour shift",
      "≥98.5% Quality Audit Score on medical coding & listedness",
      "Zero Day-15 regulatory timeline breaches",
    ],
    technicalInterviewTells: [
      "Explain the exact difference between Serious Adverse Event (SAE) vs Serious Adverse Reaction (SAR).",
      "Walk through 5-tier medical coding hierarchy (LLT -> PT -> HLT -> HLGT -> SOC) with a clinical case example.",
      "How to assess causality using the WHO-UMC scale versus Naranjo algorithm.",
    ],
    marketOutlook:
      "High expansion in India. Global pharma sponsors continue shifting full safety surveillance operations to captive India GCC hubs to optimize 24/7 pharmacovigilance coverage.",
  },
  "medical-coding": {
    targetRole: "Medical Coding Specialist (Outpatient / Inpatient / ED)",
    marketShareInIndia: "India is the global epicenter for US Healthcare Revenue Cycle Management (RCM), commanding over 55% of outsourced chart audits.",
    entryRange: "₹3.2L – ₹5.0L PA",
    entryTakeHome: "₹24,000 – ₹35,000 / month",
    midRange: "₹5.8L – ₹9.2L PA",
    leadRange: "₹11.5L – ₹17.5L PA",
    execRange: "₹20.0L – ₹30.0L+ PA",
    hubs: [
      { city: "Hyderabad", areas: "Madhapur, Kondapur, Begumpet" },
      { city: "Chennai", areas: "DLF Porur, Ambattur, Taramani" },
      { city: "Bengaluru", areas: "Nagasandra, Koramangala, Bellandur" },
      { city: "Noida / Gurugram", areas: "Sector 62/135, Cyber City" },
      { city: "Coimbatore", areas: "TIDEL Park, Saravanampatti" },
    ],
    tools: [
      { name: "ICD-10-CM 2026", category: "Diagnosis Coding" },
      { name: "CPT-4 / HCPCS Level II", category: "Procedure Coding" },
      { name: "Enterprise CAC Encoders", category: "Computer-Assisted Coding" },
      { name: "Optum 360", category: "Revenue Cycle Suite" },
      { name: "AAPC / AHIMA Guidelines", category: "Compliance Benchmarks" },
      { name: "HIPAA / HITECH Rules", category: "Data Confidentiality" },
    ],
    employers: [
      "US Health Systems & Revenue Cycle Managers",
      "Inpatient & Outpatient Hospital Coding Units",
      "Clinical Documentation Improvement (CDI) Desks",
      "Risk Adjustment & HCC Coding Hubs",
      "Healthcare IT & RCM Operations",
      "Emergency Department Chart Audit Units",
      "US Insurance Reimbursement Networks",
      "Specialty Surgical Billing Centers",
    ],
    dayInLife:
      "Review electronic health records (EHRs), surgical operative reports, and emergency physician encounters. Abstract diagnoses, surgical interventions, and pharmaceutical therapies into standardized ICD-10 and CPT codes for US insurance claim reimbursement while resolving documentation discrepancies.",
    dailyKpis: [
      "55–75 Outpatient charts or 25–35 Inpatient charts audited daily",
      "≥95.0% AAPC audit accuracy compliance",
      "Denial rate kept strictly below 3.0%",
    ],
    technicalInterviewTells: [
      "Explain the official coding guidelines for Section I Conventions and sequencing of Primary Diagnosis.",
      "How to differentiate modifier 25 versus modifier 59 in physician billing.",
      "Identify bundling edits under National Correct Coding Initiative (NCCI).",
    ],
    marketOutlook:
      "Continuous hiring volume. US healthcare billing complexity and expansion of Medicare Advantage risk adjustment drive steady hiring across Tier-1 and Tier-2 Indian tech corridors.",
  },
  "clinical-data-management": {
    targetRole: "Clinical Data Associate / Clinical Data Manager (CDM)",
    marketShareInIndia: "India handles >40% of international multi-center clinical trial database design and EDC data validation.",
    entryRange: "₹3.8L – ₹5.8L PA",
    entryTakeHome: "₹28,000 – ₹40,000 / month",
    midRange: "₹7.2L – ₹12.0L PA",
    leadRange: "₹15.0L – ₹24.0L PA",
    execRange: "₹26.0L – ₹42.0L+ PA",
    hubs: [
      { city: "Bengaluru", areas: "Manyata, Outer Ring Road, Marathahalli" },
      { city: "Hyderabad", areas: "HITEC City, Financial District" },
      { city: "Pune", areas: "Kharadi, Hinjawadi" },
      { city: "Ahmedabad", areas: "SG Highway, Prahlad Nagar" },
      { city: "Mumbai", areas: "Powai, Vikhroli" },
    ],
    tools: [
      { name: "Electronic Data Capture (EDC)", category: "Trial Data Systems" },
      { name: "Clinical Trial Databases", category: "Trial Database" },
      { name: "CDISC CDASH & SDTM", category: "Global Data Standards" },
      { name: "Data Validation Specs (DVS)", category: "Edit Checks" },
      { name: "SAE Reconciliation Logs", category: "Cross-Functional Safety" },
      { name: "JReview / SAS Listings", category: "Data Cleaning" },
    ],
    employers: [
      "Tier-1 Global CRO Trial Data Centers",
      "Decentralized Clinical Trial (DCT) Platforms",
      "Multinational Biostatistics & CDM Units",
      "Sponsor Global Drug Development GCCs",
      "Clinical Trial Registry & EDC Networks",
      "Central Data Quality Monitoring Units",
      "Phase I–IV Clinical Trial Consortia",
      "Safety Reconciliation & Data Lock Units",
    ],
    dayInLife:
      "Design and test electronic Case Report Forms (eCRFs) according to clinical study protocols. Program and execute automated edit checks, generate and resolve queries with investigator trial sites, reconcile serious adverse event data against safety databases, and prepare study databases for interim/final lock.",
    dailyKpis: [
      "25–40 site query cycles resolved within protocol SLAs",
      "100% SAE reconciliation agreement across EDC and Safety Databases",
      "Zero critical audit findings during trial database lock",
    ],
    technicalInterviewTells: [
      "Explain the lifecycle of a query from initiation to closed state in enterprise EDC systems.",
      "What is the difference between CDISC CDASH standards and SDTM domains?",
      "How to conduct Discrepancy Management and Database Soft vs Hard Lock.",
    ],
    marketOutlook:
      "Accelerating demand. Decentralized clinical trials (DCT) and synthetic control arms require rigorous data hygiene, placing high premiums on candidates skilled in EDC platforms.",
  },
  "regulatory-affairs": {
    targetRole: "Regulatory Affairs Associate / Specialist (Global Submissions)",
    marketShareInIndia: "India is the 'Pharmacy of the World', driving the largest volume of US ANDA and EU generic dossier filings globally.",
    entryRange: "₹4.0L – ₹6.2L PA",
    entryTakeHome: "₹30,000 – ₹42,000 / month",
    midRange: "₹8.0L – ₹13.5L PA",
    leadRange: "₹16.0L – ₹28.0L PA",
    execRange: "₹30.0L – ₹50.0L+ PA",
    hubs: [
      { city: "Hyderabad", areas: "Balanagar, Genome Valley, Jubilee Hills" },
      { city: "Mumbai", areas: "Bandra-Kurla Complex (BKC), Andheri East" },
      { city: "Ahmedabad", areas: "Changodar, Sarkhej, Sanand" },
      { city: "Bengaluru", areas: "Peenya, Bommasandra" },
      { city: "Goa / Vadodara", areas: "Pharma Manufacturing Corridors" },
    ],
    tools: [
      { name: "eCTD Submissions (Module 1-5)", category: "Dossier Formatting" },
      { name: "Enterprise RIM Platforms", category: "Regulatory Information Mgmt" },
      { name: "CDSCO SUGAM Portal", category: "Indian Filings" },
      { name: "US FDA ESG / CDER Direct", category: "US Submissions" },
      { name: "SmPC & PIL Artwork Review", category: "Labeling Governance" },
      { name: "Regulatory Variations (Type IA/IB/II)", category: "Lifecycle Mgmt" },
    ],
    employers: [
      "Global Generic Pharma Dossier Units",
      "Multinational Biologics & Biosimilar Hubs",
      "US ANDA & EU MAA Regulatory Desks",
      "Global Lifecycle Maintenance Units",
      "Chemistry, Manufacturing & Controls (CMC) Teams",
      "Central Labeling & SmPC Artwork Units",
      "Emerging Markets Regulatory Operations",
      "CDSCO Clinical Trial Regulatory Desks",
    ],
    dayInLife:
      "Compile and author Module 1 through 5 dossiers for generic drugs, biologics, and medical devices. Review Chemistry, Manufacturing, and Controls (CMC) data, verify product labeling and package leaflets against reference listed drugs (RLDs), and draft formal deficiency responses to FDA, EMA, and CDSCO requests.",
    dailyKpis: [
      "Dossier module submission completed ≥5 days ahead of agency cut-off",
      "100% compliance with electronic submission specifications",
      "Zero non-compliance notices on post-approval variation filings",
    ],
    technicalInterviewTells: [
      "Break down the 5 modules of an eCTD dossier and specify which contains CMC.",
      "What is the difference between 505(b)(1), 505(b)(2), and 505(j) drug applications?",
      "How to manage an FDA Information Request (IR) or Complete Response Letter (CRL).",
    ],
    marketOutlook:
      "Strategic prestige. Biosimilar approvals and global regulatory tightening have transformed RA from a filing department into an executive business strategy division.",
  },
  "clinical-saas": {
    targetRole: "Clinical Solutions Specialist / Healthcare SaaS Implementation Lead",
    marketShareInIndia: "Rapid expansion of global HealthTech engineering centers and hospital digital transformation platforms in India.",
    entryRange: "₹5.0L – ₹8.0L PA",
    entryTakeHome: "₹38,000 – ₹55,000 / month",
    midRange: "₹10.0L – ₹16.5L PA",
    leadRange: "₹18.0L – ₹30.0L PA",
    execRange: "₹32.0L – ₹55.0L+ PA",
    hubs: [
      { city: "Bengaluru", areas: "Koramangala, Indiranagar, HSR Layout" },
      { city: "Hyderabad", areas: "Gachibowli Financial District, Knowledge City" },
      { city: "Pune", areas: "Baner, Viman Nagar" },
      { city: "Gurugram", areas: "DLF Cyber City, Golf Course Road" },
    ],
    tools: [
      { name: "Life Sciences Cloud Platforms", category: "Life Sciences Cloud" },
      { name: "Salesforce Health Cloud", category: "Patient Management" },
      { name: "HL7 / FHIR Standards", category: "Interoperability" },
      { name: "Workflow Journey Mapping", category: "Clinical Operations" },
      { name: "Jira & Agile Sprint Tracking", category: "Product Delivery" },
      { name: "EHR / Hospital Information Systems", category: "Healthcare IT" },
    ],
    employers: [
      "Global Healthcare Cloud Software Centers",
      "Hospital Information System (HIS) Providers",
      "Clinical Trial Management System (CTMS) Units",
      "Health Interoperability & FHIR Platforms",
      "Enterprise Electronic Health Record (EHR) Hubs",
      "Digital Health & Teleconsultation Networks",
      "MedTech Software Development Centers",
      "Medical Device Software Validation Units",
    ],
    dayInLife:
      "Collaborate with hospital clinical directors and software engineering teams. Configure healthcare workflows, train clinical staff on digital health solutions, translate frontline medical workflows into technical specifications, and ensure patient data privacy under Indian and international regulations.",
    dailyKpis: [
      "Client onboarding milestones achieved within 30-day target window",
      "≥90% frontline physician system adoption within 60 days of go-live",
      "Zero downtime on critical clinical medication modules",
    ],
    technicalInterviewTells: [
      "Explain FHIR resource structure and how patient observations are communicated.",
      "How do you manage physician resistance when replacing legacy paper charts?",
      "Walk through a 21 CFR Part 11 compliant audit trail requirement in clinical software.",
    ],
    marketOutlook:
      "Fastest growing compensation trajectory for clinical graduates with tech acumen.",
  },
  "ai-intelligence": {
    targetRole: "Clinical AI Engineer / Healthcare Data Scientist",
    marketShareInIndia: "India is emerging as the primary AI engineering hub for medical imaging, generative documentation, and clinical NLP.",
    entryRange: "₹6.5L – ₹10.5L PA",
    entryTakeHome: "₹48,000 – ₹72,000 / month",
    midRange: "₹12.5L – ₹22.0L PA",
    leadRange: "₹24.0L – ₹42.0L PA",
    execRange: "₹45.0L – ₹80.0L+ PA",
    hubs: [
      { city: "Bengaluru", areas: "Outer Ring Road, Bellandur, Whitefield" },
      { city: "Hyderabad", areas: "HITEC City, Financial District" },
      { city: "Pune", areas: "Hinjawadi, Magarpatta" },
      { city: "Noida / Gurugram", areas: "Cyber City, Sector 125" },
    ],
    tools: [
      { name: "Python / PyTorch / Transformers", category: "Deep Learning" },
      { name: "BioBERT / ClinicalGPT", category: "Biomedical NLP" },
      { name: "DICOM & Medical Imaging Processing", category: "Radiology AI" },
      { name: "FHIR API Data Pipelines", category: "Health Standards" },
      { name: "AWS HealthOmics / Azure Health", category: "Compliant Cloud" },
      { name: "Vector Databases & RAG Pipelines", category: "Evidence Retrieval" },
    ],
    employers: [
      "Healthcare AI & Biomedical NLP Laboratories",
      "Radiological Deep Learning & Imaging Centers",
      "Clinical Decision Support Systems (CDSS) Hubs",
      "Precision Medicine & Bioinformatics Units",
      "Health AI Generative Documentation Teams",
      "Pharmaceutical R&D Machine Learning Labs",
      "Clinical Trial AI Optimization Desks",
      "Global Life Sciences Analytics Centers",
    ],
    dayInLife:
      "Fine-tune clinical domain language models for automated medical summary generation. Develop computer vision models for radiological screening, validate algorithmic fairness, and architect end-to-end data pipelines complying with HIPAA and Indian Digital Personal Data Protection Act (DPDPA).",
    dailyKpis: [
      "Model inference latency kept under 250ms for clinical triage",
      "≥96% precision on medical entity extraction benchmarks",
      "100% adherence to explainable AI and clinical safety protocols",
    ],
    technicalInterviewTells: [
      "How do you mitigate hallucinations when building RAG systems over clinical trials?",
      "Explain methods for de-identifying protected health information (PHI) in text.",
      "How do you evaluate sensitivity versus specificity in high-stakes clinical triage?",
    ],
    marketOutlook:
      "Explosive growth. Premium compensation for dual-literate professionals possessing biological domain knowledge and modern machine learning engineering.",
  },
};

export function CareerMarketDossier({ result }: Props) {
  const pathSlug =
    result.archetype?.topPaths?.[0]?.slug ??
    result.archetype?.pathSlug ??
    "pharmacovigilance";

  const market =
    MARKET_METRICS[pathSlug] ||
    MARKET_METRICS["pharmacovigilance"];

  return (
    <section className="space-y-6">
      {/* ─── Role Reality & Executive Market Context ───────────────── */}
      <div className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_30px_-5px_rgba(7,26,74,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50 to-indigo-50/60 text-blue-600 shadow-xs">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-blue-600 font-bold block">
                CAREER MARKET INTELLIGENCE · 2026 INDIA BENCHMARKS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#081F38]">
                Target Role & Industry Market Reality
              </h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-emerald-50/90 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700 border border-emerald-200/80 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Active Hiring Market</span>
          </span>
        </div>

        {/* Primary Role Box: Apple Pro Executive Designation Hero */}
        <div className="mt-6 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-blue-50/50 via-white to-slate-50/50 p-6 sm:p-7 shadow-[0_2px_12px_-2px_rgba(37,99,235,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-blue-600 shrink-0">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-600 font-bold tracking-[0.14em] block">
                  RECOMMENDED DESIGNATION IN INDIAN MENTORSHIPS / CROS
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#081F38]">
                  {market.targetRole}
                </h3>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 text-[11px] font-mono font-bold text-blue-700 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Primary Requisition Focus
            </span>
          </div>

          <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-4xl">
            {market.dayInLife}
          </p>

          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#081F38]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-[10px] font-mono font-bold text-blue-700">
                MARKET FOOTPRINT
              </span>
              <span className="text-slate-600 font-sans">{market.marketShareInIndia}</span>
            </div>
          </div>
        </div>

        {/* 5-Year Compensation Progression Grid (Tactile Step Cards) */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400 font-bold">
              COMPENSATION PROGRESSION ACROSS TIER-1 INDIAN LIFE SCIENCES GCCS
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Real-world CTC Benchmarks</span>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Level 1: Fresher */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 text-center hover:border-slate-300 transition-all duration-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">LEVEL 01</span>
                  <span className="text-[10px] font-mono text-slate-400">0–1 YR</span>
                </div>
                <span className="text-xs font-semibold text-slate-600 block font-sans">
                  Trainee / Fresher
                </span>
                <span className="mt-2 font-mono text-xl sm:text-2xl font-bold text-[#081F38] block tracking-tight">
                  {market.entryRange}
                </span>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] text-slate-700 font-semibold font-mono">
                  {market.entryTakeHome}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-3 pt-2.5 border-t border-slate-100 font-sans">
                Starting Candidate Package
              </span>
            </div>

            {/* Level 2: Specialist (Target Promotion Landmark) */}
            <div className="rounded-2xl border-2 border-blue-500 bg-gradient-to-b from-blue-50/70 via-indigo-50/20 to-white p-4.5 text-center shadow-[0_4px_16px_rgba(37,99,235,0.1),inset_0_1px_0_rgba(255,255,255,1)] relative ring-2 ring-blue-500/15 flex flex-col justify-between">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 text-white px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                PROMOTION TARGET
              </span>
              <div>
                <div className="flex items-center justify-between text-blue-600 mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">LEVEL 02</span>
                  <span className="text-[10px] font-mono font-bold">2–4 YRS</span>
                </div>
                <span className="text-xs font-bold text-blue-900 block font-sans">
                  Specialist / Processor
                </span>
                <span className="mt-2 font-mono text-xl sm:text-2xl font-bold text-blue-700 block tracking-tight">
                  {market.midRange}
                </span>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/80 text-[11px] text-blue-800 font-bold font-mono">
                  Independent Case Processor
                </span>
              </div>
              <span className="text-[10px] text-blue-700/80 block mt-3 pt-2.5 border-t border-blue-100 font-medium font-sans">
                Core Production Technical Band
              </span>
            </div>

            {/* Level 3: Lead */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 text-center hover:border-slate-300 transition-all duration-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">LEVEL 03</span>
                  <span className="text-[10px] font-mono text-slate-400">5–8 YRS</span>
                </div>
                <span className="text-xs font-semibold text-slate-600 block font-sans">
                  Lead / Manager
                </span>
                <span className="mt-2 font-mono text-xl sm:text-2xl font-bold text-[#081F38] block tracking-tight">
                  {market.leadRange}
                </span>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] text-slate-700 font-semibold font-mono">
                  QA &amp; Team Authority
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-3 pt-2.5 border-t border-slate-100 font-sans">
                Quality Reviewer Band
              </span>
            </div>

            {/* Level 4: Executive */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 text-center hover:border-slate-300 transition-all duration-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">LEVEL 04</span>
                  <span className="text-[10px] font-mono text-slate-400">8+ YRS</span>
                </div>
                <span className="text-xs font-semibold text-slate-600 block font-sans">
                  Associate Director
                </span>
                <span className="mt-2 font-mono text-xl sm:text-2xl font-bold text-[#081F38] block tracking-tight">
                  {market.execRange}
                </span>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] text-slate-700 font-semibold font-mono">
                  Global Operations Head
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-3 pt-2.5 border-t border-slate-100 font-sans">
                Delivery Leadership Band
              </span>
            </div>
          </div>
        </div>

        {/* Major Indian Hubs & Real Hiring Employers */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 pt-6 border-t border-slate-100">
          {/* Key Geographic Hubs */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-lg bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600 shrink-0">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#081F38] font-bold">
                PRIMARY LIFE SCIENCES HUBS IN INDIA
              </span>
            </div>
            <div className="space-y-2">
              {market.hubs.map((h) => (
                <div
                  key={h.city}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/40 px-3.5 py-2.5 text-xs hover:border-slate-300 transition-all duration-150 shadow-2xs"
                >
                  <span className="font-bold text-[#081F38]">{h.city}</span>
                  <span className="text-slate-500 text-[11px] font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200/60">{h.areas}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Hiring Ecosystem in India */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-lg bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600 shrink-0">
                <Building2 className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#081F38] font-bold">
                TIER-1 HIRING ECOSYSTEMS &amp; GLOBAL CAPABILITY CENTERS
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {market.employers.map((emp) => (
                <span
                  key={emp}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-[#081F38] shadow-2xs hover:border-blue-300 transition-all duration-150"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.5)]" />
                  {emp}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed font-sans">
              These industry sectors and captive GCC units conduct continuous campus, off-campus, and lateral recruitment drives across Indian life sciences hubs for this role profile.
            </p>
          </div>
        </div>

        {/* Expected Production Tool Competencies */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600 shrink-0">
                <Layers className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#081F38] font-bold">
                PRODUCTION TOOL STACK EXPECTED IN TECHNICAL ROUNDS
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-full shadow-2xs">
              6 Core Tools
            </span>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {market.tools.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3 text-xs hover:border-slate-300 transition-all duration-150 shadow-2xs"
              >
                <div>
                  <span className="font-bold text-[#081F38] block">{t.name}</span>
                  <span className="text-[10px] text-slate-500 block font-mono mt-0.5">{t.category}</span>
                </div>
                <div className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-200/70">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily KPIs & Technical Interview Questions Asked in India */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 pt-6 border-t border-slate-100">
          {/* Daily Workload Reality & KPIs */}
          <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50/60 via-white to-slate-50/30 p-5 shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#081F38] font-bold block mb-3">
              DAILY OPERATIONAL WORKLOAD &amp; SHIFT KPIS
            </span>
            <ul className="space-y-2.5 text-xs text-slate-700 font-sans">
              {market.dailyKpis.map((kpi, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="h-4 w-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-[9px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{kpi}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Round Tells in India */}
          <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 text-amber-900">
              <div className="h-5 w-5 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <AlertTriangle className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-bold">
                WHAT INDIAN TECHNICAL INTERVIEWERS PROBE
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-amber-950/90 font-sans">
              {market.technicalInterviewTells.map((tell, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-amber-600 font-bold">•</span>
                  <span className="leading-relaxed">{tell}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
