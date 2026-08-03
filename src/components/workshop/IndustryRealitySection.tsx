import { useState } from "react";
import { BookOpen, Building2, Check, AlertTriangle, ArrowRight, ShieldCheck, Database, FileCode, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export function IndustryRealitySection() {
  const [selectedDomain, setSelectedDomain] = useState<number>(0);

  const domains = [
    {
      name: "Pharmacovigilance & Safety",
      collegeTeaches: "Basic pharmacology, drug classification, adverse event definitions from 1990s textbooks.",
      industryExpects: "Oracle Argus Safety database processing, MedDRA dictionary coding (LLT/PT/SOC), ICSR triage, & Aggregate Reporting (PSUR/PBRER).",
      keySoftware: ["Oracle Argus Safety", "MedDRA 26.0", "Safety Gateway", "Empirica Signal"],
      gapSeverity: "High Gap — 92% of graduates fail Argus triage screen tests."
    },
    {
      name: "Regulatory Affairs",
      collegeTeaches: "Generic Drug Inspector rules, basic pharmacy law chapters, textbook registration processes.",
      industryExpects: "eCTD XML structure creation, Module 1-5 compilation, USFDA 505(b)(2) & Anda submissions, ESG portal filings.",
      keySoftware: ["eCTDexpress", "Veeva Vault RIM", "Lorenz docuBridge", "Adobe Acrobat Pro XML"],
      gapSeverity: "Critical Gap — 0% of colleges teach eCTD software tools."
    },
    {
      name: "Clinical Research & CDM",
      collegeTeaches: "Phase 1 to 4 trial definitions, GCP guidelines history, general ethics committee roles.",
      industryExpects: "Electronic Data Capture (EDC) build, Medidata Rave / Oracle InForm data validation, Discrepancy Management, SAE reconciliation.",
      keySoftware: ["Medidata Rave", "Oracle InForm", "Veeva Clinical", "CTMS"],
      gapSeverity: "High Gap — Industry requires certified EDC hands-on practice."
    },
    {
      name: "Health Data & Analytics",
      collegeTeaches: "Basic biostatistics formulas by hand, standard deviation, t-test calculations on paper.",
      industryExpects: "SAS / R clinical data programming, CDISC SDTM/ADaM domain creation, TLF (Tables, Listings, Figures) generation for trial reporting.",
      keySoftware: ["SAS Studio", "R Studio", "Python pandas", "CDISC Standards"],
      gapSeverity: "Severe Gap — Paper math vs. corporate SAS code pipelines."
    }
  ];

  return (
    <section className="bg-slate-950 py-20 text-white relative border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-4">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>INDUSTRY REALITY CHECK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight">
            What colleges don't teach vs. what companies expect.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Indian universities teach academic theory. Global healthcare employers hire for operational tool competence. See the exact gap in your field.
          </p>
        </div>

        {/* Domain Selection Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {domains.map((d, idx) => (
            <button
              key={d.name}
              type="button"
              onClick={() => setSelectedDomain(idx)}
              className={`rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedDomain === idx
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850"
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Active Comparison Card */}
        <motion.div
          key={selectedDomain}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* What Colleges Teach */}
          <div className="rounded-3xl border border-red-900/30 bg-slate-900/60 p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-200">What University Teaches</h3>
                  <p className="text-xs text-red-400">Theory & Memorization</p>
                </div>
              </div>
              <span className="rounded-full bg-red-950 px-3 py-1 text-[11px] font-semibold text-red-300 border border-red-800/40">
                Outdated Syllabus
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-300 leading-relaxed font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
              "{domains[selectedDomain].collegeTeaches}"
            </p>

            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Typical Exam Assessment
              </span>
              <p className="text-xs text-slate-400">
                Write 10-mark long answers on paper explaining definitions without ever touching real corporate software.
              </p>
            </div>
          </div>

          {/* What Companies Expect */}
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/30 to-slate-900 p-6 sm:p-8 relative shadow-xl">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">What Employers Test For</h3>
                  <p className="text-xs text-blue-400">Real Work Execution</p>
                </div>
              </div>
              <span className="rounded-full bg-blue-950 px-3 py-1 text-[11px] font-semibold text-blue-300 border border-blue-800/40">
                Live Industry Standard
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-200 leading-relaxed font-mono bg-slate-950 p-4 rounded-xl border border-blue-900/50">
              "{domains[selectedDomain].industryExpects}"
            </p>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-3">
                Mandatory Industry Software Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {domains[selectedDomain].keySoftware.map((sw) => (
                  <span key={sw} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-300">
                    <Cpu className="h-3.5 w-3.5 text-blue-400" />
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
