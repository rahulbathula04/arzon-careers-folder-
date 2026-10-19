import { useState } from "react";
import { Download, CheckCircle2, AlertTriangle, FileText, ChevronDown, ChevronUp, Sparkles, BookOpen, ExternalLink, Printer } from "lucide-react";
import { toast } from "sonner";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
}

interface InterviewQuestion {
  id: number;
  category: "Pharmacovigilance" | "Clinical Data Management" | "Regulatory Affairs" | "Medical Coding";
  question: string;
  recruiterRationale: string;
  candidateFailureRisk: string;
  mediocreAnswer: string;
  modelAnswer: string;
}

export function UnlockedInterviewVault({ result, candidateName = "Candidate" }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const roleName = result.archetype?.name ?? "Healthcare Specialist";

  const interviewBank: InterviewQuestion[] = [
    {
      id: 1,
      category: "Pharmacovigilance",
      question: "What constitutes a 'Day 0' in Pharmacovigilance, and what are the 4 minimum criteria for a valid ICSR?",
      recruiterRationale: "Panels use this as an immediate filter. If a candidate fumbles the 4 criteria, they are immediately disqualified from Tier-1 CRO intake.",
      candidateFailureRisk: "High risk: 73% of pharmacy freshers mention 'patient name' instead of 'identifiable patient', or omit the identifiable reporter.",
      mediocreAnswer: "Day 0 is when the company gets the report. The 4 criteria are patient name, drug name, hospital name, and what happened to the patient.",
      modelAnswer: "Day 0 is the exact calendar day when any employee, affiliate, or contractual partner of the marketing authorization holder first receives the minimum four criteria of an adverse event. The 4 mandatory elements are: (1) An identifiable patient, (2) An identifiable reporter, (3) At least one suspect medicinal product, and (4) At least one adverse event. Under ICH E2D and GVP Module VI, regulatory clocks (7-day or 15-day expedited reporting) begin ticking from Day 0.",
    },
    {
      id: 2,
      category: "Pharmacovigilance",
      question: "Walk me through how you determine whether an adverse drug reaction must be reported within 15 calendar days under ICH E2A.",
      recruiterRationale: "Tests whether you understand regulatory triage and seriousness criteria without supervision.",
      candidateFailureRisk: "Failing to distinguish between 'serious' and 'severe' - severe is intensity, serious is regulatory outcome.",
      mediocreAnswer: "If the side effect is very severe and painful, we report it to the regulatory authority within 15 days.",
      modelAnswer: "A report qualifies for 15-day expedited submission if it meets two strict conditions: (1) It meets at least one regulatory Seriousness Criterion: death, life-threatening, inpatient hospitalization or prolongation thereof, persistent disability/incapacity, or congenital anomaly/birth defect; and (2) It is classified as Unexpected (not listed in the current Investigator's Brochure or Summary of Product Characteristics). Expected serious events are typically summarized in aggregate PBRER/PSUR reports unless specified by local agency guidelines.",
    },
    {
      id: 3,
      category: "Pharmacovigilance",
      question: "What is the structural hierarchy of MedDRA, and at which level are ICSR adverse events officially entered?",
      recruiterRationale: "Proves whether you have worked in actual safety databases (Argus, ArisG) or only read lecture slides.",
      candidateFailureRisk: "Confusing Lower Level Terms (LLT) with Preferred Terms (PT) for coding and statistical analysis.",
      mediocreAnswer: "MedDRA has 5 levels: SOC, HLGT, HLT, PT, and LLT. We code at the System Organ Class level.",
      modelAnswer: "MedDRA operates on a 5-level hierarchy: System Organ Class (SOC) → High-Level Group Term (HLGT) → High-Level Term (HLT) → Preferred Term (PT) → Lowest Level Term (LLT). Data entry is always performed at the LLT level to capture the reporter's verbatim terminology as closely as possible. However, safety analysis, signal detection, and regulatory submission tables always aggregate and report at the Preferred Term (PT) and SOC levels.",
    },
    {
      id: 4,
      category: "Clinical Data Management",
      question: "Explain the complete lifecycle of a Data Clarification Form (DCF) or discrepancy in Medidata Rave EDC.",
      recruiterRationale: "CROs screen for candidates who understand clinical trial audit trails and query reconciliation workflows.",
      candidateFailureRisk: "Believing that data managers can directly overwrite incorrect values in the trial database.",
      mediocreAnswer: "When there's an error in the CRF, the data manager changes the value and approves the page.",
      modelAnswer: "Under 21 CFR Part 11 and GCP E6 (R2), data managers never alter raw source data. When an edit check triggers or manual review identifies an inconsistency (e.g. out-of-range lab value or missing date), a query is generated (Open state). The clinical research coordinator (CRC) at the trial site reviews the query, references medical records, and either updates the eCRF or provides a clinical explanation (Answered state). The data manager reviews the response: if satisfactory, the query is Closed; if incomplete, it is Re-opened. Every interaction is permanently logged in the electronic audit trail.",
    },
    {
      id: 5,
      category: "Clinical Data Management",
      question: "What is the purpose of MedDRA and WHO-Drug Global dictionary versioning during an ongoing multi-year Phase III trial?",
      recruiterRationale: "Tests whether you understand why version locking and dictionary migrations matter in clinical biometrics.",
      candidateFailureRisk: "Not knowing that dictionaries update bi-annually (March and September for MedDRA).",
      mediocreAnswer: "We use the latest version every week so that all new medicines are included.",
      modelAnswer: "MedDRA releases major/minor updates in March and September, while WHO-Drug Global updates quarterly. In a multi-year trial, clinical data management must maintain an explicit Dictionary Versioning Strategy. Typically, studies either version-lock for the entire trial duration or schedule formal mid-study migrations with impact assessments to prevent recoding discrepancies and ensure that pooling of safety datasets for CDISC SDTM conforms to regulatory freeze guidelines.",
    },
    {
      id: 6,
      category: "Regulatory Affairs",
      question: "Break down the 5 modules of the Common Technical Document (CTD) and identify which module is region-specific.",
      recruiterRationale: "Standard screening question for entry-level Regulatory Operations and Dossier Publishing roles.",
      candidateFailureRisk: "Forgetting that Module 1 is administrative and not harmonized under ICH.",
      mediocreAnswer: "There are 5 modules about chemistry, pharmacology, toxicology, and administration.",
      modelAnswer: "The ICH CTD consists of 5 modular blocks: Module 1 is Regional Administrative Information (prescribing info, labels, application forms) and is NOT harmonized between FDA, EMA, or CDSCO. Modules 2 through 5 are harmonized: Module 2 contains CTD Overviews and Summaries; Module 3 contains Quality (CMC - drug substance and product); Module 4 contains Non-clinical Study Reports (toxicology/pharmacology); and Module 5 contains Clinical Study Reports. For eCTD submissions, XML backbone validation is strictly required.",
    },
    {
      id: 7,
      category: "Medical Coding",
      question: "What is the coding guideline rule when a symptom is documented alongside an established definitive diagnosis in an inpatient chart?",
      recruiterRationale: "Tests core ICD-10-CM coding guideline Section I.B.4.",
      candidateFailureRisk: "Double coding symptoms that are integral to the underlying disease (e.g. coding chest pain when angina is diagnosed).",
      mediocreAnswer: "You should code all symptoms and diseases that the doctor wrote down to be safe.",
      modelAnswer: "According to ICD-10-CM Official Guidelines Section I.B.4: Signs and symptoms that are routinely associated with a disease process should NOT be assigned as additional codes, unless otherwise instructed by the classification (e.g., pain associated with acute myocardial infarction). However, signs and symptoms that are not routinely associated with a definitive disease state must be coded separately.",
    },
    {
      id: 8,
      category: "Regulatory Affairs",
      question: "What is the difference between a Type IA, Type IB, and Type II regulatory variation in the EU / global markets?",
      recruiterRationale: "Evaluates candidate understanding of post-approval lifecycle management.",
      candidateFailureRisk: "Not knowing the difference between 'Do and Tell' minor changes vs prior approval major variations.",
      mediocreAnswer: "Type 1 is minor and Type 2 is major.",
      modelAnswer: "Type IA variations are minor changes with minimal or no impact on quality, safety, or efficacy (e.g., tightening of specification, administrative packaging changes). They follow a 'Do and Tell' procedure submitted within 12 months. Type IB variations are minor changes that don't qualify as Type IA and must be notified prior to implementation. Type II variations are major changes (e.g., new indication, substantial manufacturing process changes) that require formal scientific evaluation and prior agency approval before marketing.",
    },
  ];

  const filtered = activeCategory === "All"
    ? interviewBank
    : interviewBank.filter((q) => q.category === activeCategory);

  const handlePrintDossier = () => {
    toast.success("Preparing executive dossier for printing / PDF export...");
    window.print();
  };

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.05),inset_0_1px_0_rgba(255,255,255,0.95)]">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-blue-700 mb-2 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>CONFIDENTIAL RECRUITER QUESTION BANK · FREE ACCESS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#081F38]">
            Technical Interview Preparation &amp; Casework Vault
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl font-sans leading-relaxed">
            Direct recruiter question bank for <strong className="text-[#081F38]">{roleName}</strong>. Master the model 10/10 answers and avoid the exact pitfalls that cause 70%+ of fresher rejections.
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
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] font-mono text-amber-950">
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
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 text-[11px] font-bold text-blue-700 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Casework</span>
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
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 text-[11px] font-bold text-teal-800 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Casework</span>
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
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/80 text-[11px] font-bold text-indigo-800 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Casework</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Section C: Interactive 20-Question Technical Interview Predictor ── */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-blue-600">INTERVIEW PREDICTOR</span>
            <h3 className="text-lg font-bold text-[#081F38] font-sans">Company Technical Screening Bank</h3>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {["All", "Pharmacovigilance", "Clinical Data Management", "Regulatory Affairs", "Medical Coding"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#081F38] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-3">
          {filtered.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen ? "border-blue-500/80 bg-white shadow-sm ring-1 ring-blue-500/20" : "border-slate-200/80 bg-gradient-to-b from-white to-slate-50/40 hover:border-blue-200"
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
                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {item.category}
                      </span>
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
                        <span className="font-mono font-bold text-slate-500 uppercase text-[9px] tracking-wider">Why Recruiters Ask This:</span>
                        <p className="text-slate-700 mt-0.5 leading-relaxed font-sans">{item.recruiterRationale}</p>
                      </div>
                      <div className="rounded-xl bg-amber-50/80 border border-amber-200/80 p-3 text-xs">
                        <span className="font-mono font-bold text-amber-700 uppercase text-[9px] tracking-wider">Fresher Trap to Avoid:</span>
                        <p className="text-amber-950 mt-0.5 leading-relaxed font-sans">{item.candidateFailureRisk}</p>
                      </div>
                    </div>

                    {/* Comparison: Mediocre vs Model Answer */}
                    <div className="space-y-3 pt-1">
                      <div className="rounded-xl bg-red-50/60 border border-red-200/80 p-3.5">
                        <span className="font-mono font-bold text-red-700 uppercase text-[10px] flex items-center gap-1.5 mb-1 tracking-wider">
                          <span>❌ How 80% of Unverified Freshers Answer (Rejected)</span>
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
