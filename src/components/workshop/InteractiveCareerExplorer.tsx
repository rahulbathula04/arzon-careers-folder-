import { useState } from "react";
import { Compass, DollarSign, Cpu, ShieldCheck, Building2, TrendingUp, CpuIcon, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InteractiveCareerExplorer() {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState<number>(0);

  const careerDomains = [
    {
      title: "Pharmacovigilance & Drug Safety",
      slug: "pharmacovigilance",
      tagline: "Monitor, analyze, and report global adverse events for approved and investigational drugs.",
      salary: "₹3.8 LPA – ₹16.5 LPA",
      salaryEntry: "₹3.8 - ₹5.5 LPA",
      salarySenior: "₹10 - ₹16.5+ LPA",
      software: ["Oracle Argus Safety", "MedDRA 26.0", "Safety Gateway", "Empirica Signal"],
      workLife: "9/10 — Fixed corporate shifts, minimal weekend load, global hybrid work models.",
      aiRiskScore: "Low AI Risk (15%)",
      aiRiskDetail: "AI assists with initial intake & triage, but human safety specialists are legally required by FDA/EMA for medical causation assessment.",
      companies: ["IQVIA", "Novartis", "Cognizant", "Parexel", "Accenture", "Labcorp"],
      growthTrajectory: "Rapid promotion path from Safety Data Processor → PV Scientist → Aggregate Reporting Lead → Global Safety Officer.",
      demandStatus: "Very High — 4,850+ Openings across Hyderabad, Bengaluru & Pune."
    },
    {
      title: "Regulatory Affairs",
      slug: "regulatory-affairs",
      tagline: "Prepare and submit drug dossier applications to global regulatory bodies (USFDA, EMA, CDSCO).",
      salary: "₹4.2 LPA – ₹18.0 LPA",
      salaryEntry: "₹4.2 - ₹6.0 LPA",
      salarySenior: "₹11 - ₹18.0+ LPA",
      software: ["eCTDexpress", "Veeva Vault RIM", "Lorenz docuBridge", "ESG Portal"],
      workLife: "8.5/10 — High strategic visibility, corporate office environments, global filing schedules.",
      aiRiskScore: "Very Low AI Risk (8%)",
      aiRiskDetail: "Regulatory strategy requires human negotiation with FDA review divisions; AI cannot sign off on legal filings.",
      companies: ["Sun Pharma", "Dr. Reddy's", "Cipla", "Novartis", "Lupin", "GSK"],
      growthTrajectory: "RA Executive → RA Manager → Head of Global Regulatory Affairs.",
      demandStatus: "High — 2,400+ Openings across Hyderabad, Mumbai & Ahmedabad."
    },
    {
      title: "Clinical Data Management (CDM)",
      slug: "cdm",
      tagline: "Design, validate, and clean clinical trial data pipelines for global pharmaceutical trials.",
      salary: "₹3.6 LPA – ₹15.0 LPA",
      salaryEntry: "₹3.6 - ₹5.0 LPA",
      salarySenior: "₹9.5 - ₹15.0+ LPA",
      software: ["Medidata Rave", "Oracle InForm", "Veeva Clinical Data", "JReview"],
      workLife: "9/10 — Structured timeline execution, hybrid & remote work flexibility.",
      aiRiskScore: "Moderate AI Risk (22%)",
      aiRiskDetail: "AI automates routine edit checks; human data managers handle clinical discrepancy resolution and database lock.",
      companies: ["IQVIA", "Parexel", "ICON plc", "Sygneos Health", "Fortrea", "Charles River"],
      growthTrajectory: "Data Lead → Clinical Data Manager → Global CDM Director.",
      demandStatus: "High — 3,100+ Openings nationwide."
    },
    {
      title: "Medical Coding (CPC / ICD-10)",
      slug: "medical-coding",
      tagline: "Translate medical diagnoses, procedures, and treatments into standardized medical codes.",
      salary: "₹3.2 LPA – ₹11.5 LPA",
      salaryEntry: "₹3.2 - ₹4.5 LPA",
      salarySenior: "₹7.5 - ₹11.5 LPA",
      software: ["3M Encoder", "Optum360", "ICD-10-CM / CPT Manuals", "EHR Systems"],
      workLife: "9.5/10 — Predictable daily coding quotas, excellent entry-level stability.",
      aiRiskScore: "Moderate AI Risk (28%)",
      aiRiskDetail: "Computer-Assisted Coding (CAC) speeds up suggestions; certified coders perform mandatory audit verification.",
      companies: ["Optum", "Omega Healthcare", "CorroHealth", "Access Healthcare", "Episource"],
      growthTrajectory: "Junior Coder → Senior CPC Coder → Quality Auditor → Operations Team Lead.",
      demandStatus: "Massive Volume — 6,200+ Openings."
    },
    {
      title: "Health Data & SAS Analytics",
      slug: "sas-analytics",
      tagline: "Program statistical analyses and tables for clinical study reports using SAS and Real-World Evidence.",
      salary: "₹4.5 LPA – ₹22.0 LPA",
      salaryEntry: "₹4.5 - ₹7.0 LPA",
      salarySenior: "₹14 - ₹22.0+ LPA",
      software: ["SAS Studio / Enterprise Guide", "CDISC SDTM/ADaM", "R", "Python"],
      workLife: "8/10 — Technical problem solving, high-remuneration career path.",
      aiRiskScore: "Low AI Risk (12%)",
      aiRiskDetail: "Statistical validation of trial data for regulatory bodies demands bulletproof human auditability.",
      companies: ["Novartis", "Eli Lilly", "Sanofi", "IQVIA", "Cytel", "TCS Life Sciences"],
      growthTrajectory: "Statistical Programmer → Senior SAS Lead → Principal Biostatistician.",
      demandStatus: "High Growth — Premium salary scale."
    }
  ];

  const current = careerDomains[selectedDomainIndex];

  return (
    <section id="career-explorer" className="bg-slate-950 py-20 text-white relative border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-400 mb-4">
            <Compass className="h-3.5 w-3.5" />
            <span>INTERACTIVE CAREER EXPLORER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight">
            Explore domain careers with real market data.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Don't look at generic course lists. Explore actual healthcare domain roles, real corporate software, salary trajectory, and AI safety ratings.
          </p>
        </div>

        {/* Domain Navigation Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {careerDomains.map((domain, idx) => (
            <button
              key={domain.slug}
              type="button"
              onClick={() => setSelectedDomainIndex(idx)}
              className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedDomainIndex === idx
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850"
              }`}
            >
              {domain.title}
            </button>
          ))}
        </div>

        {/* Active Domain Detailed Card */}
        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                Domain Overview
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {current.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-3xl">
                {current.tagline}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 shrink-0">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                Hiring Demand Status
              </span>
              <span className="text-sm font-bold text-emerald-300">
                {current.demandStatus}
              </span>
            </div>
          </div>

          {/* Grid metrics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Salary */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase mb-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <span>Salary Progression</span>
              </div>
              <div className="text-xl font-mono font-bold text-white mb-2">
                {current.salary}
              </div>
              <div className="space-y-1 text-xs text-slate-400">
                <p>• Entry-Level (0-2 yrs): <strong className="text-slate-200">{current.salaryEntry}</strong></p>
                <p>• Senior / Lead (5+ yrs): <strong className="text-slate-200">{current.salarySenior}</strong></p>
              </div>
            </div>

            {/* Corporate Software */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase mb-2">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span>Required Industry Software</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {current.software.map((sw) => (
                  <span key={sw} className="rounded-md bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-mono font-bold text-blue-300">
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Risk Assessment */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase mb-2">
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
                <span>AI Risk Assessment</span>
              </div>
              <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-300 mb-2">
                {current.aiRiskScore}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {current.aiRiskDetail}
              </p>
            </div>

            {/* Top Hiring Companies */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase mb-3">
                <Building2 className="h-4 w-4 text-amber-400" />
                <span>Top Hiring Companies in India</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {current.companies.map((c) => (
                  <span key={c} className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Work-Life Balance */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase mb-2">
                <TrendingUp className="h-4 w-4 text-sky-400" />
                <span>Work-Life Balance Score</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                {current.workLife}
              </p>
            </div>

          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>Career Trajectory: <strong className="text-slate-200">{current.growthTrajectory}</strong></span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
