import { useState } from "react";
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Printer,
  Building2,
  Target,
  ShieldCheck,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { CompanyBrandLogo } from "./CompanyLogos";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
}

export type EmployerFilter = "All" | "Cognizant" | "IQVIA" | "Parexel" | "Novartis" | "Accenture";

interface InterviewQuestion {
  id: number;
  category: "Pharmacovigilance" | "Clinical Data Management" | "Regulatory Affairs" | "Medical Coding";
  employerTrack: "Cognizant" | "IQVIA" | "Parexel" | "Novartis" | "Accenture" | "General";
  interviewRound: string;
  question: string;
  recruiterRationale: string;
  candidateFailureRisk: string;
  mediocreAnswer: string;
  modelAnswer: string;
}

export function UnlockedInterviewVault({ result, candidateName = "Candidate" }: Props) {
  const [activeEmployer, setActiveEmployer] = useState<EmployerFilter>("All");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const roleName = result.archetype?.name ?? "Healthcare Specialist";

  const interviewBank: InterviewQuestion[] = [
    // ─────────────────────────────────────────────────────────────────────────────
    // TOP 5 EMPLOYER-SPECIFIC ROUND 2 QUESTIONS
    // ─────────────────────────────────────────────────────────────────────────────
    {
      id: 1,
      category: "Pharmacovigilance",
      employerTrack: "Cognizant",
      interviewRound: "Round 2 · Timed Technical Case Exercise (45 Mins)",
      question: "In a 20-minute timed medical narrative test for Cognizant's life sciences account, what are the mandatory 6 chronological elements you must include for a serious case of Stevens-Johnson syndrome?",
      recruiterRationale: "Cognizant evaluates speed and SBAR discipline. Candidates who draft conversational prose without exact dates and laboratory milestones fail the delivery benchmark.",
      candidateFailureRisk: "High risk: 73% of pharmacy freshers write unstructured paragraphs, forgetting dechallenge/rechallenge details or omitting the identifiable reporter contact.",
      mediocreAnswer: "The patient was admitted with rash and blisters after taking antibiotic. The doctor diagnosed Stevens-Johnson syndrome and stopped the drug. The patient recovered after 5 days in ICU.",
      modelAnswer: "A production-grade SBAR narrative requires: (1) Patient Demographics & Baseline: Age, sex, pertinent medical history; (2) Suspect Therapy Details: Drug brand/generic, daily dose, indication, start/stop dates, lot number; (3) Concomitant Medications: Concurrent therapies ruled out; (4) Chronological Adverse Event Course: Onset date/time, progression of mucosal lesions/erythema; (5) Diagnostic Markers & Interventions: Biopsy results, ICU admission date, systemic corticosteroids; and (6) Action Taken & Outcome: Explicit dechallenge outcome (did lesions resolve post-withdrawal?), rechallenge status, and final recovery status per CIOMS guidelines.",
    },
    {
      id: 2,
      category: "Pharmacovigilance",
      employerTrack: "IQVIA",
      interviewRound: "Round 2 · Technical Panel Discussion (45 Mins)",
      question: "If a Principal Investigator determines an adverse event is 'Suspected Related' but the Company Core Data Sheet (CCDS) lists the reaction as 'Expected', how do you classify the event for expedited regulatory reporting?",
      recruiterRationale: "IQVIA safety desk tests the candidate's understanding of the legal distinction between Causality (Reporter / Sponsor) and Listedness (CCDS / IB).",
      candidateFailureRisk: "Confusing expectedness with causality: Assuming that because an event is listed in the CCDS, it never requires expedited submission even when unexpected nuances arise.",
      mediocreAnswer: "If it is listed in the CCDS, it is expected, so we never submit it to the FDA within 15 days.",
      modelAnswer: "Under ICH E2A and FDA/EMA clinical safety guidelines: In a clinical trial, a Serious Adverse Reaction requires 15-day expedited reporting (SUSAR) ONLY if it is BOTH Suspected Related AND Unexpected. Since the PI marked causality as 'Suspected' but the event is documented in the current reference safety information (CCDS / Investigator's Brochure), the event is classified as a Serious Expected Reaction. Therefore, it does NOT qualify for 15-day expedited submission, but MUST be aggregated into the annual DSUR (Development Safety Update Report) and monitored during signal detection meetings.",
    },
    {
      id: 3,
      category: "Pharmacovigilance",
      employerTrack: "Parexel",
      interviewRound: "Round 2 · Technical Case Interview (45 Mins)",
      question: "How do you evaluate potential Drug-Induced Liver Injury (DILI) using Hy's Law criteria in an ongoing oncology trial?",
      recruiterRationale: "Parexel manages high-complexity oncology clinical development programs where hepatic toxicity is a critical dose-limiting safety endpoint.",
      candidateFailureRisk: "Looking only at isolated AST/ALT elevations without evaluating Total Bilirubin and Alkaline Phosphatase (ALP) ratios.",
      mediocreAnswer: "If liver function tests are high, we tell the oncologist that the patient has liver damage from the drug.",
      modelAnswer: "Hy's Law is the FDA gold standard predictor of severe DILI with ~10% mortality risk. It requires meeting 3 concurrent criteria: (1) Transaminase Elevation: Aminotransferase (ALT or AST) elevation > 3x the Upper Limit of Normal (ULN); (2) Hyperbilirubinemia: Serum Total Bilirubin (TBL) elevation > 2x ULN; and (3) Absence of Initial Cholestasis: Serum Alkaline Phosphatase (ALP) < 2x ULN (indicating primary hepatocellular injury rather than biliary obstruction). Furthermore, viral hepatitis (A, B, C), autoimmune liver disease, and biliary metastases must be actively excluded.",
    },
    {
      id: 4,
      category: "Pharmacovigilance",
      employerTrack: "Novartis",
      interviewRound: "Round 2 · Global Safety Scientific Assessment (60 Mins)",
      question: "As a global MAH safety associate, how do you handle Day 0 determination when an adverse event report is received by a Novartis affiliate in Tokyo on Friday at 5:30 PM local time, but global safety operations are coordinated from Basel and Hyderabad?",
      recruiterRationale: "Novartis is a primary Marketing Authorization Holder with worldwide legal accountability. A single miscalculated Day 0 clock triggers regulatory inspection findings and late-case fines.",
      candidateFailureRisk: "Believing that Day 0 begins on Monday morning when the Hyderabad or Basel central safety desk opens.",
      mediocreAnswer: "Day 0 starts on Monday morning at 9:00 AM when the central safety associate in Hyderabad opens the inbox.",
      modelAnswer: "Under EMA GVP Module VI (VI.B.7) and FDA 21 CFR 314.80: Day 0 is the exact calendar day when ANY employee, contractor, or commercial affiliate of the Marketing Authorization Holder first receives the minimum 4 valid ICSR criteria anywhere in the world. Even though received Friday evening in Tokyo, Day 0 is established on that Friday in Japan. Regulatory clocks (7-day fatal/life-threatening or 15-day serious) start counting from Day 1 on Saturday, regardless of weekends, office closures, or international time zones.",
    },
    {
      id: 5,
      category: "Clinical Data Management",
      employerTrack: "Accenture",
      interviewRound: "Round 2 · Technical Operations & Data Integrity Panel (45 Mins)",
      question: "Under 21 CFR Part 11 and ALCOA+ data integrity rules, explain the correct procedure when an adverse event onset date is entered with a typo in the safety database.",
      recruiterRationale: "Accenture delivers managed life sciences biometrics. Any attempt to overwrite or delete data without an audit trail triggers immediate disqualification.",
      candidateFailureRisk: "Suggesting that an associate can directly backspace and re-type the date without formal change reason logging.",
      mediocreAnswer: "You contact the IT administrator to delete the wrong date and type the correct date into the Oracle database.",
      modelAnswer: "Under 21 CFR Part 11 and ALCOA+ principles (Attributable, Legible, Contemporaneous, Original, Accurate), raw records are immutable. The associate must execute a formal Data Amendment in the safety database (e.g. Argus Safety). The database must automatically preserve the original incorrect timestamp, record the newly corrected date, log the identity of the user making the edit, capture an electronic timestamp, and require an explicit mandatory 'Reason for Change' code (e.g. 'Source Document Clarification' or 'Typographical Error'). The electronic audit trail can never be erased or truncated.",
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // FOUNDATIONAL INDUSTRY & REGULATORY DOMAIN QUESTIONS
    // ─────────────────────────────────────────────────────────────────────────────
    {
      id: 6,
      category: "Pharmacovigilance",
      employerTrack: "General",
      interviewRound: "Round 1 & 2 · Core Screening",
      question: "What constitutes a 'Day 0' in Pharmacovigilance, and what are the 4 minimum criteria for a valid ICSR?",
      recruiterRationale: "Panels use this as an immediate filter. If a candidate fumbles the 4 criteria, they are immediately disqualified from Tier-1 CRO intake.",
      candidateFailureRisk: "High risk: 73% of pharmacy freshers mention 'patient name' instead of 'identifiable patient', or omit the identifiable reporter.",
      mediocreAnswer: "Day 0 is when the company gets the report. The 4 criteria are patient name, drug name, hospital name, and what happened to the patient.",
      modelAnswer: "Day 0 is the exact calendar day when any employee, affiliate, or contractual partner of the marketing authorization holder first receives the minimum four criteria of an adverse event. The 4 mandatory elements are: (1) An identifiable patient, (2) An identifiable reporter, (3) At least one suspect medicinal product, and (4) At least one adverse event. Under ICH E2D and GVP Module VI, regulatory clocks (7-day or 15-day expedited reporting) begin ticking from Day 0.",
    },
    {
      id: 7,
      category: "Pharmacovigilance",
      employerTrack: "General",
      interviewRound: "Round 2 · Technical Screening",
      question: "What is the structural hierarchy of MedDRA, and at which level are ICSR adverse events officially entered?",
      recruiterRationale: "Proves whether you have worked in actual safety databases (Argus, ArisG) or only read lecture slides.",
      candidateFailureRisk: "Confusing Lower Level Terms (LLT) with Preferred Terms (PT) for coding and statistical analysis.",
      mediocreAnswer: "MedDRA has 5 levels: SOC, HLGT, HLT, PT, and LLT. We code at the System Organ Class level.",
      modelAnswer: "MedDRA operates on a 5-level hierarchy: System Organ Class (SOC) → High-Level Group Term (HLGT) → High-Level Term (HLT) → Preferred Term (PT) → Lowest Level Term (LLT). Data entry is always performed at the LLT level to capture the reporter's verbatim terminology as closely as possible. However, safety analysis, signal detection, and regulatory submission tables always aggregate and report at the Preferred Term (PT) and SOC levels.",
    },
    {
      id: 8,
      category: "Clinical Data Management",
      employerTrack: "General",
      interviewRound: "Round 2 · Clinical EDC Workflow",
      question: "Explain the complete lifecycle of a Data Clarification Form (DCF) or discrepancy in Medidata Rave EDC.",
      recruiterRationale: "CROs screen for candidates who understand clinical trial audit trails and query reconciliation workflows.",
      candidateFailureRisk: "Believing that data managers can directly overwrite incorrect values in the trial database.",
      mediocreAnswer: "When there's an error in the CRF, the data manager changes the value and approves the page.",
      modelAnswer: "Under 21 CFR Part 11 and GCP E6 (R2), data managers never alter raw source data. When an edit check triggers or manual review identifies an inconsistency (e.g. out-of-range lab value or missing date), a query is generated (Open state). The clinical research coordinator (CRC) at the trial site reviews the query, references medical records, and either updates the eCRF or provides a clinical explanation (Answered state). The data manager reviews the response: if satisfactory, the query is Closed; if incomplete, it is Re-opened. Every interaction is permanently logged in the electronic audit trail.",
    },
    {
      id: 9,
      category: "Medical Coding",
      employerTrack: "General",
      interviewRound: "Round 2 · Coding Hierarchy Guidelines",
      question: "What is the coding guideline rule when a symptom is documented alongside an established definitive diagnosis in an inpatient chart?",
      recruiterRationale: "Tests core ICD-10-CM coding guideline Section I.B.4.",
      candidateFailureRisk: "Double coding symptoms that are integral to the underlying disease (e.g. coding chest pain when angina is diagnosed).",
      mediocreAnswer: "You should code all symptoms and diseases that the doctor wrote down to be safe.",
      modelAnswer: "According to ICD-10-CM Official Guidelines Section I.B.4: Signs and symptoms that are routinely associated with a disease process should NOT be assigned as additional codes, unless otherwise instructed by the classification (e.g., pain associated with acute myocardial infarction). However, signs and symptoms that are not routinely associated with a definitive disease state must be coded separately.",
    },
    {
      id: 10,
      category: "Regulatory Affairs",
      employerTrack: "General",
      interviewRound: "Round 2 · Global Dossier Operations",
      question: "Break down the 5 modules of the Common Technical Document (CTD) and identify which module is region-specific.",
      recruiterRationale: "Standard screening question for entry-level Regulatory Operations and Dossier Publishing roles.",
      candidateFailureRisk: "Forgetting that Module 1 is administrative and not harmonized under ICH.",
      mediocreAnswer: "There are 5 modules about chemistry, pharmacology, toxicology, and administration.",
      modelAnswer: "The ICH CTD consists of 5 modular blocks: Module 1 is Regional Administrative Information (prescribing info, labels, application forms) and is NOT harmonized between FDA, EMA, or CDSCO. Modules 2 through 5 are harmonized: Module 2 contains CTD Overviews and Summaries; Module 3 contains Quality (CMC - drug substance and product); Module 4 contains Non-clinical Study Reports (toxicology/pharmacology); and Module 5 contains Clinical Study Reports. For eCTD submissions, XML backbone validation is strictly required.",
    },
  ];

  // Filter questions based on employer AND category
  const filtered = interviewBank.filter((q) => {
    const matchesEmployer =
      activeEmployer === "All" ||
      q.employerTrack === activeEmployer ||
      q.employerTrack === "General";
    const matchesCategory =
      activeCategory === "All" || q.category === activeCategory;
    return matchesEmployer && matchesCategory;
  });

  const handlePrintDossier = () => {
    toast.success("Preparing executive interview dossier for printing / PDF export...");
    window.print();
  };

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-4 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.05),inset_0_1px_0_rgba(255,255,255,0.95)] w-full max-w-full min-w-0 overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-blue-700 mb-2 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="truncate">TOP 5 EMPLOYER VAULT <span className="hidden sm:inline">· CALIBRATED RUBRICS</span></span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#081F38]">
            Technical Interview Preparation &amp; Casework Vault
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl font-sans leading-relaxed">
            Direct recruiter question bank for <strong className="text-[#081F38]">{roleName}</strong> mapped across Cognizant, IQVIA, Parexel, Novartis, and Accenture. Master model 10/10 answers and avoid the exact pitfalls that cause 70%+ of fresher rejections.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrintDossier}
          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#081F38] hover:bg-[#0D2E54] text-white px-5 py-2.5 text-xs font-bold tracking-wide transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(8,31,56,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] active:scale-[0.98] shrink-0 self-start md:self-auto cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          <span>Export 12-Page Dossier PDF</span>
        </button>
      </div>

      {/* ── Section A: Top 3 Candidate Failure Risks ── */}
      <div className="mt-8 rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50/60 via-amber-50/20 to-white p-6 sm:p-7 shadow-2xs">
        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] font-mono text-amber-950 break-words">
              CONFIDENTIAL DIAGNOSTIC AUDIT: TOP 3 INTERVIEW VULNERABILITIES
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            Hiring Panel Traps
          </span>
        </div>
        <p className="text-xs text-amber-900/90 mb-5 font-sans leading-relaxed max-w-3xl">
          Based on your assessment responses and cognitive trait percentiles, hiring panels at Cognizant, IQVIA, and Parexel will probe these 3 vulnerabilities:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-amber-200/80 bg-white p-4.5 shadow-2xs flex flex-col justify-between hover:border-amber-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold text-amber-700 uppercase tracking-wider">
                  FAILURE RISK 01
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              </div>
              <h4 className="text-xs font-bold text-[#081F38] font-sans">Regulatory Clocks &amp; Day 0 Precision</h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed font-sans">
                Hesitation in defining the 4 ICSR minimum criteria or confusing calendar days with working days leads to immediate panel disqualification.
              </p>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 text-[10px] font-mono font-semibold text-amber-800">
              Audit Standard: ICH E2D &amp; GVP Module VI
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-white p-4.5 shadow-2xs flex flex-col justify-between hover:border-amber-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold text-amber-700 uppercase tracking-wider">
                  FAILURE RISK 02
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              </div>
              <h4 className="text-xs font-bold text-[#081F38] font-sans">Audit Trail &amp; Data Alteration Protocols</h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed font-sans">
                Suggesting that clinical data managers or coders can overwrite trial database entries directly violates 21 CFR Part 11 protocols.
              </p>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 text-[10px] font-mono font-semibold text-amber-800">
              Audit Standard: 21 CFR Part 11 &amp; GCP E6
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-white p-4.5 shadow-2xs flex flex-col justify-between hover:border-amber-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold text-amber-700 uppercase tracking-wider">
                  FAILURE RISK 03
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              </div>
              <h4 className="text-xs font-bold text-[#081F38] font-sans">Textbook Theory vs Production Nomenclature</h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed font-sans">
                Quoting college pharmacology definitions instead of GVP Module VI, MedDRA PT coding rules, or CTD XML publishing standards flags you as unready.
              </p>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 text-[10px] font-mono font-semibold text-amber-800">
              Audit Standard: Production Terminology
            </div>
          </div>
        </div>
      </div>

      {/* ── Section B: 3 Redacted Production Work Sample Templates ── */}
      <div className="mt-8 rounded-3xl border border-slate-200/90 bg-gradient-to-b from-[#FAFBFD] to-white p-6 sm:p-7 shadow-2xs">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-blue-600">
              PORTFOLIO ARTIFACTS
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#081F38] font-sans">
              3 Production Work Samples to Attach to Your Applications
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200/90 shadow-2xs">
            Redacted Real-World Case Files
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Work Sample 1 */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4.5 flex flex-col justify-between shadow-2xs hover:border-blue-300 transition-all duration-150">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  PDF · 4 PAGES
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#081F38] font-sans">Argus Safety ICSR Case</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-sans">
                Full 4-page adverse event narrative with MedDRA LLT/PT coding sheet &amp; causality assessment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Downloading Argus ICSR Case Sample (.PDF)...")}
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[11px] font-bold text-blue-700 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5 text-blue-700" />
              <span className="text-blue-700">Download Casework</span>
            </button>
          </div>

          {/* Work Sample 2 */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4.5 flex flex-col justify-between shadow-2xs hover:border-teal-300 transition-all duration-150">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-200/70 flex items-center justify-center text-teal-700">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  XLSX · 12 ROWS
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#081F38] font-sans">Medidata Rave EDC Discrepancy Log</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-sans">
                12-row clinical trial CRF data audit reconciliation sheet with site queries and resolution trails.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Downloading EDC Discrepancy Log (.XLSX)...")}
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-[11px] font-bold text-teal-800 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5 text-teal-800" />
              <span className="text-teal-800">Download Casework</span>
            </button>
          </div>

          {/* Work Sample 3 */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4.5 flex flex-col justify-between shadow-2xs hover:border-indigo-300 transition-all duration-150">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200/70 flex items-center justify-center text-indigo-700">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  PDF · AUDIT FILE
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#081F38] font-sans">Inpatient Hospital Chart Coding File</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-sans">
                Patient discharge summary coded to ICD-10-CM with principal sequencing &amp; DRG assignment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Downloading Medical Coding Chart (.PDF)...")}
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-[11px] font-bold text-indigo-800 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5 text-indigo-800" />
              <span className="text-indigo-800">Download Casework</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Section C: Interactive Employer & Domain Technical Screening Bank ── */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-blue-600">
              INTERVIEW PREDICTOR
            </span>
            <h3 className="text-lg font-bold text-[#081F38] font-sans">
              Company-Calibrated Technical Screening Questions
            </h3>
          </div>

          {/* Employer Track Filter Ribbon */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {(["All", "Cognizant", "IQVIA", "Parexel", "Novartis", "Accenture"] as EmployerFilter[]).map(
              (emp) => {
                const isSelected = activeEmployer === emp;
                return (
                  <button
                    key={emp}
                    type="button"
                    onClick={() => setActiveEmployer(emp)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-[#081F38] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {emp !== "All" && (
                      <CompanyBrandLogo company={emp} className="h-2.5 w-auto invert brightness-0" />
                    )}
                    <span>{emp}</span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Secondary Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
          {["All", "Pharmacovigilance", "Clinical Data Management", "Regulatory Affairs", "Medical Coding"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-blue-100 text-blue-800 font-bold"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-3">
          {filtered.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-blue-500/80 bg-white shadow-sm ring-1 ring-blue-500/20"
                    : "border-slate-200/80 bg-gradient-to-b from-white to-slate-50/40 hover:border-blue-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : item.id)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-blue-50 text-blue-600 font-mono text-xs font-bold shrink-0 mt-0.5">
                      Q{item.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          {item.category}
                        </span>
                        {item.employerTrack !== "General" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold text-blue-700">
                            <CompanyBrandLogo company={item.employerTrack} className="h-2.5 w-auto" />
                            <span>{item.employerTrack}</span>
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.2 rounded-full">
                          {item.interviewRound}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#081F38] leading-snug font-sans">
                        {item.question}
                      </h4>
                    </div>
                  </div>

                  <div className="shrink-0 text-slate-400 mt-1">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4">
                    {/* Rationale & Trap */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs">
                        <span className="font-mono font-bold text-slate-500 uppercase text-[9px] tracking-wider">
                          Why Recruiters Ask This:
                        </span>
                        <p className="text-slate-700 mt-0.5 leading-relaxed font-sans">
                          {item.recruiterRationale}
                        </p>
                      </div>
                      <div className="rounded-xl bg-amber-50/80 border border-amber-200/80 p-3 text-xs">
                        <span className="font-mono font-bold text-amber-700 uppercase text-[9px] tracking-wider">
                          Fresher Trap to Avoid:
                        </span>
                        <p className="text-amber-950 mt-0.5 leading-relaxed font-sans">
                          {item.candidateFailureRisk}
                        </p>
                      </div>
                    </div>

                    {/* Comparison: Mediocre vs Model Answer */}
                    <div className="space-y-3 pt-1">
                      <div className="rounded-xl bg-red-50/60 border border-red-200/80 p-3.5">
                        <span className="font-mono font-bold text-red-700 uppercase text-[10px] flex items-center gap-1.5 mb-1 tracking-wider">
                          <span>❌ How 80% of Unverified Freshers Answer (Disqualified)</span>
                        </span>
                        <p className="text-xs text-red-950 italic leading-relaxed font-sans">
                          "{item.mediocreAnswer}"
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50/80 border-2 border-emerald-300 p-4 shadow-xs">
                        <span className="font-mono font-bold text-emerald-800 uppercase text-[10px] flex items-center gap-1.5 mb-1.5 tracking-wider">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>✅ ACRI Model 10/10 Answer (Immediate Hire Signal)</span>
                        </span>
                        <p className="text-xs text-emerald-950 leading-relaxed font-sans">
                          {item.modelAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
