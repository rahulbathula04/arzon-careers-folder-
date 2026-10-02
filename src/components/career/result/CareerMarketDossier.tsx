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
      { name: "Oracle Argus Safety 8.x", category: "Safety Database" },
      { name: "MedDRA 27.x Coding", category: "Medical Terminology" },
      { name: "WHO Drug Dictionary", category: "Concomitant Meds" },
      { name: "ICH E2B(R3) Standards", category: "Regulatory Transmission" },
      { name: "Clinical Safety Narratives", category: "Technical Writing" },
      { name: "CIOMS / FDA Form 3500A", category: "Expedited Reporting" },
    ],
    employers: [
      "Novartis Healthcare (Hyderabad Biome)",
      "Parexel International",
      "IQVIA Clinical & Commercial India",
      "Cognizant Life Sciences",
      "TCS Healthcare & Life Sciences",
      "Pfizer Healthcare India",
      "Accenture Life Sciences Operations",
      "Wipro Health",
    ],
    dayInLife:
      "Triage incoming spontaneous, clinical trial, and literature adverse event cases. Code medical events to MedDRA Lowest Level Terms (LLTs), verify suspect drug formulation and causality, formulate structured safety narratives, and ensure compliance with strict 7-day and 15-day global regulatory submission deadlines.",
    dailyKpis: [
      "4–6 ICSR adverse event cases processed per 8-hour shift",
      "≥98.5% Quality Audit Score on MedDRA coding & listedness",
      "Zero Day-15 regulatory timeline breaches",
    ],
    technicalInterviewTells: [
      "Explain the exact difference between Serious Adverse Event (SAE) vs Serious Adverse Reaction (SAR).",
      "Walk through MedDRA hierarchy (LLT -> PT -> HLT -> HLGT -> SOC) with a clinical case example.",
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
      { name: "3M CAC Encoder", category: "Computer-Assisted Coding" },
      { name: "Optum 360", category: "Revenue Cycle Suite" },
      { name: "AAPC / AHIMA Guidelines", category: "Compliance Benchmarks" },
      { name: "HIPAA / HITECH Rules", category: "Data Confidentiality" },
    ],
    employers: [
      "Optum Global Solutions (UnitedHealth Group)",
      "Omega Healthcare",
      "Episource India",
      "CorroHealth India",
      "Cognizant RCM",
      "R1 RCM India",
      "GeBBS Healthcare Solutions",
      "Access Healthcare",
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
      { name: "Medidata Rave EDC", category: "Electronic Data Capture" },
      { name: "Oracle Clinical / InForm", category: "Trial Database" },
      { name: "CDISC CDASH & SDTM", category: "Global Data Standards" },
      { name: "Data Validation Specs (DVS)", category: "Edit Checks" },
      { name: "SAE Reconciliation Logs", category: "Cross-Functional Safety" },
      { name: "JReview / SAS Listings", category: "Data Cleaning" },
    ],
    employers: [
      "IQVIA India",
      "Icon plc (India)",
      "Syneos Health India",
      "Novartis Global Drug Development",
      "Wipro Life Sciences",
      "Labcorp Drug Development",
      "Parexel Clinical Data Services",
      "Cytel India",
    ],
    dayInLife:
      "Design and test electronic Case Report Forms (eCRFs) according to clinical study protocols. Program and execute automated edit checks, generate and resolve queries with investigator trial sites, reconcile serious adverse event data against safety databases, and prepare study databases for interim/final lock.",
    dailyKpis: [
      "25–40 site query cycles resolved within protocol SLAs",
      "100% SAE reconciliation agreement across EDC and Argus",
      "Zero critical audit findings during trial database lock",
    ],
    technicalInterviewTells: [
      "Explain the lifecycle of a query from initiation to closed state in Medidata Rave.",
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
      { name: "Veeva Vault RIM", category: "Regulatory Information Mgmt" },
      { name: "CDSCO SUGAM Portal", category: "Indian Filings" },
      { name: "US FDA ESG / CDER Direct", category: "US Submissions" },
      { name: "SmPC & PIL Artwork Review", category: "Labeling Governance" },
      { name: "Regulatory Variations (Type IA/IB/II)", category: "Lifecycle Mgmt" },
    ],
    employers: [
      "Sun Pharmaceutical Industries",
      "Dr. Reddy's Laboratories",
      "Cipla Limited",
      "Lupin Pharmaceuticals",
      "Aurobindo Pharma",
      "Viatris India",
      "Torrent Pharmaceuticals",
      "Biocon Biologics",
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
      { name: "Veeva Vault Clinical & Quality", category: "Life Sciences Cloud" },
      { name: "Salesforce Health Cloud", category: "Patient Management" },
      { name: "HL7 / FHIR Standards", category: "Interoperability" },
      { name: "Workflow Journey Mapping", category: "Clinical Operations" },
      { name: "Jira & Agile Sprint Tracking", category: "Product Delivery" },
      { name: "EHR / Hospital Information Systems", category: "Healthcare IT" },
    ],
    employers: [
      "Veeva Systems India",
      "Siemens Healthineers",
      "GE HealthCare India",
      "HealthPlix Technologies",
      "Cerner / Oracle Health India",
      "Innovaccer India",
      "Philips Innovation Campus",
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
      "Google Health / DeepMind Collaborators",
      "Microsoft Health India",
      "Philips Innovation Campus",
      "Wipro AI Health Labs",
      "Cognizant AI Life Sciences",
      "Fractal Analytics Healthcare",
      "Qure.ai",
      "Tata Medical Labs AI",
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
      <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4EAF2]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EEF6FF] text-[#1557D6]">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold block">
                CAREER MARKET INTELLIGENCE · 2026 INDIA BENCHMARKS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A4A]">
                Target Role & Industry Market Reality
              </h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-semibold text-emerald-700 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Active Hiring Market
          </span>
        </div>

        {/* Primary Role Box */}
        <div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#1557D6] font-bold tracking-wider block">
                RECOMMENDED DESIGNATION IN INDIAN MENTORSHIPS / CROs
              </span>
              <p className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#071A4A]">
                {market.targetRole}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-[#3F4A60] leading-relaxed">
            {market.dayInLife}
          </p>

          <div className="mt-4 pt-4 border-t border-[#D0E1FD]/60 flex items-start gap-2 text-xs text-[#071A4A]">
            <span className="font-bold shrink-0">Market Footprint in India:</span>
            <span>{market.marketShareInIndia}</span>
          </div>
        </div>

        {/* 5-Year Compensation Progression Grid (Defensible Indian CTC Bands) */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#69758A] font-bold">
              COMPENSATION PROGRESSION ACROSS TIER-1 INDIAN LIFE SCIENCES GCCs
            </span>
            <span className="text-[11px] text-[#69758A] font-mono">Real-world CTC Benchmarks</span>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Level 1: Fresher */}
            <div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">
              <span className="text-[10px] font-mono text-[#69758A] block uppercase font-bold">
                Level 1 · Trainee / Fresher (0–1 yr)
              </span>
              <span className="mt-2 font-serif text-2xl font-bold text-[#071A4A] block">
                {market.entryRange}
              </span>
              <span className="text-[11px] text-[#1557D6] font-semibold block mt-1">
                {market.entryTakeHome}
              </span>
              <span className="text-[10px] text-[#69758A] block mt-0.5">Starting Package</span>
            </div>

            {/* Level 2: Specialist */}
            <div className="rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/40 p-4 text-center">
              <span className="text-[10px] font-mono text-[#1557D6] block uppercase font-bold">
                Level 2 · Specialist (2–4 yrs)
              </span>
              <span className="mt-2 font-serif text-2xl font-bold text-[#1557D6] block">
                {market.midRange}
              </span>
              <span className="text-[11px] text-[#071A4A] font-semibold block mt-1">
                Independent Case Processor
              </span>
              <span className="text-[10px] text-[#69758A] block mt-0.5">Core Technical Band</span>
            </div>

            {/* Level 3: Lead */}
            <div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">
              <span className="text-[10px] font-mono text-[#69758A] block uppercase font-bold">
                Level 3 · Lead / Manager (5–8 yrs)
              </span>
              <span className="mt-2 font-serif text-2xl font-bold text-[#071A4A] block">
                {market.leadRange}
              </span>
              <span className="text-[11px] text-[#071A4A] font-semibold block mt-1">
                QA & Team Authority
              </span>
              <span className="text-[10px] text-[#69758A] block mt-0.5">Quality Reviewer Band</span>
            </div>

            {/* Level 4: Executive */}
            <div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">
              <span className="text-[10px] font-mono text-[#69758A] block uppercase font-bold">
                Level 4 · Associate Director (8+ yrs)
              </span>
              <span className="mt-2 font-serif text-2xl font-bold text-[#071A4A] block">
                {market.execRange}
              </span>
              <span className="text-[11px] text-[#071A4A] font-semibold block mt-1">
                Global Operations Head
              </span>
              <span className="text-[10px] text-[#69758A] block mt-0.5">Delivery Leadership</span>
            </div>
          </div>
        </div>

        {/* Major Indian Hubs & Real Hiring Employers */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 pt-6 border-t border-[#E4EAF2]">
          {/* Key Geographic Hubs */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-[#1557D6]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#071A4A] font-bold">
                PRIMARY LIFE SCIENCES HUBS IN INDIA
              </span>
            </div>
            <div className="space-y-2">
              {market.hubs.map((h) => (
                <div
                  key={h.city}
                  className="flex items-baseline justify-between rounded-xl border border-[#E4EAF2] bg-[#FAFBFD] px-3.5 py-2 text-xs"
                >
                  <span className="font-bold text-[#071A4A]">{h.city}</span>
                  <span className="text-[#69758A]">{h.areas}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Hiring Ecosystem in India */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-[#1557D6]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#071A4A] font-bold">
                TIER-1 EMPLOYERS & GLOBAL IN-HOUSE CENTERS
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {market.employers.map((emp) => (
                <span
                  key={emp}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4EAF2] bg-white tone-light card-light px-3 py-1.5 text-xs font-semibold text-[#071A4A] shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1557D6]" />
                  {emp}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#69758A] leading-relaxed">
              These organizations conduct bi-annual campus, off-campus, and lateral recruitment drives across India for this exact role profile.
            </p>
          </div>
        </div>

        {/* Expected Production Tool Competencies */}
        <div className="mt-8 pt-6 border-t border-[#E4EAF2]">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-[#1557D6]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#071A4A] font-bold">
              PRODUCTION TOOL STACK EXPECTED IN TECHNICAL ROUNDS
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {market.tools.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between rounded-xl border border-[#E4EAF2] bg-[#FAFBFD] p-3 text-xs"
              >
                <div>
                  <span className="font-bold text-[#071A4A] block">{t.name}</span>
                  <span className="text-[10px] text-[#69758A] block">{t.category}</span>
                </div>
                <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Daily KPIs & Technical Interview Questions Asked in India */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 pt-6 border-t border-[#E4EAF2]">
          {/* Daily Workload Reality & KPIs */}
          <div className="rounded-2xl border border-slate-200 bg-[#FAFBFD] p-5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#071A4A] font-bold block mb-2">
              DAILY OPERATIONAL WORKLOAD & SHIFT KPIs
            </span>
            <ul className="space-y-2 text-xs text-[#3F4A60]">
              {market.dailyKpis.map((kpi, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-[#1557D6] font-bold">•</span>
                  <span>{kpi}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Round Tells in India */}
          <div className="rounded-2xl border border-amber-200/70 bg-amber-50/50 p-5">
            <div className="flex items-center gap-1.5 mb-2 text-amber-900">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                WHAT INDIAN TECHNICAL INTERVIEWERS PROBE
              </span>
            </div>
            <ul className="space-y-2 text-xs text-amber-950/80">
              {market.technicalInterviewTells.map((tell, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-amber-700 font-bold">•</span>
                  <span>{tell}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
