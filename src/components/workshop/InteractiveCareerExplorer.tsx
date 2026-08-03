import { useState } from "react";
import { 
  ShieldCheck, Database, FileText, Code2, Sparkles, ArrowRight,
  TrendingUp, Building2, Cpu, LineChart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DOMAINS = [
  {
    id: "pv",
    title: "Pharmacovigilance & Safety",
    icon: ShieldCheck,
    tag: "High Demand",
    salary: "₹3.8L – ₹16.5L",
    demandJds: "4,850+ Active JDs",
    aiRisk: "Low (FDA Mandatory Sign-off)",
    salaryPath: [
      { year: "Entry (Y0)", pay: "₹3.8L" },
      { year: "Analyst (Y2)", pay: "₹7.2L" },
      { year: "Lead (Y4)", pay: "₹12.5L" },
      { year: "Manager (Y6)", pay: "₹16.5L" }
    ],
    tools: ["Oracle Argus Safety", "MedDRA 26.0", "Safety Gateway", "Empirica Signal"],
    hiringCompanies: ["IQVIA", "Parexel", "Novartis", "Cognizant", "TCS Life Sciences"],
    desc: "Monitor adverse drug reactions, write ICSR case evaluations, and ensure ICH-GCP regulatory compliance for global biopharma safety signal detection."
  },
  {
    id: "cdm",
    title: "Clinical Data Management",
    icon: Database,
    tag: "High Hiring",
    salary: "₹3.5L – ₹14.0L",
    demandJds: "3,620+ Active JDs",
    aiRisk: "Low (Clinical Audit Lock)",
    salaryPath: [
      { year: "Entry (Y0)", pay: "₹3.5L" },
      { year: "Analyst (Y2)", pay: "₹6.5L" },
      { year: "Lead (Y4)", pay: "₹10.8L" },
      { year: "Manager (Y6)", pay: "₹14.0L" }
    ],
    tools: ["Medidata Rave", "Oracle Clinical", "Veeva Vault CDMS", "EDC Validation"],
    hiringCompanies: ["Syneos Health", "Labcorp", "Accenture", "Icon PLC"],
    desc: "Design electronic case report forms (eCRF), execute data validation checks, and manage clinical trial databases for global Phase I-IV trials."
  },
  {
    id: "ra",
    title: "Regulatory Affairs",
    icon: FileText,
    tag: "Executive Track",
    salary: "₹4.2L – ₹18.0L",
    demandJds: "2,140+ Active JDs",
    aiRisk: "Minimal (Legal Agency Filings)",
    salaryPath: [
      { year: "Entry (Y0)", pay: "₹4.2L" },
      { year: "Analyst (Y2)", pay: "₹8.0L" },
      { year: "Lead (Y4)", pay: "₹13.5L" },
      { year: "Manager (Y6)", pay: "₹18.0L" }
    ],
    tools: ["eCTDexpress", "Lorenz docuBridge", "ESG Portal", "RIM Smart"],
    hiringCompanies: ["Dr. Reddy's", "Sun Pharma", "Cipla", "Lupin", "Pfizer India"],
    desc: "Compile eCTD dossiers (Modules 1-5), handle NDA/IND regulatory submissions to USFDA, EMA, and DCGI, and oversee product lifecycle management."
  },
  {
    id: "sas",
    title: "Biostatistics & SAS Analytics",
    icon: Code2,
    tag: "High Salary",
    salary: "₹4.5L – ₹22.0L",
    demandJds: "1,980+ Active JDs",
    aiRisk: "Low (Complex Statistical Analysis)",
    salaryPath: [
      { year: "Entry (Y0)", pay: "₹4.5L" },
      { year: "Analyst (Y2)", pay: "₹9.2L" },
      { year: "Lead (Y4)", pay: "₹15.8L" },
      { year: "Manager (Y6)", pay: "₹22.0L" }
    ],
    tools: ["SAS Studio", "CDISC SDTM", "ADaM Datasets", "R Clinical", "TLF Generation"],
    hiringCompanies: ["Cytel", "Emmes", "Novo Nordisk", "AstraZeneca"],
    desc: "Transform raw clinical data into CDISC-compliant SDTM/ADaM datasets and generate Tables, Listings, and Figures (TLFs) for FDA regulatory filings."
  }
];

interface InteractiveCareerExplorerProps {
  onOpenRegister: () => void;
}

export function InteractiveCareerExplorer({ onOpenRegister }: InteractiveCareerExplorerProps) {
  const [selectedId, setSelectedId] = useState("pv");
  const activeDomain = DOMAINS.find((d) => d.id === selectedId) || DOMAINS[0];

  return (
    <section id="explorer" className="tone-dark bg-[#020617] py-24 text-white border-t border-slate-900/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3 border border-blue-500/20">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>CAREER INTELLIGENCE EXPLORER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Inspect Healthcare Career Trajectories
          </h2>
          <p className="mt-2 text-base text-slate-300 font-sans">
            Select a domain to view live market demand, salary growth curves, and mandatory corporate tools.
          </p>
        </div>

        {/* Workspace Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Domain Select Panel */}
          <div className="lg:col-span-4 space-y-2.5">
            {DOMAINS.map((domain) => {
              const Icon = domain.icon;
              const isSelected = domain.id === selectedId;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setSelectedId(domain.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-600/30 border border-blue-500 text-white shadow-lg backdrop-blur-md ring-1 ring-blue-500/50"
                      : "bg-[#0f172a]/60 hover:bg-[#0f172a]/90 text-slate-200 border border-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? "bg-blue-600 text-white" : "bg-[#080d1a] text-slate-300 border border-slate-800"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-sans text-white">{domain.title}</h4>
                      <span className="text-[11px] font-mono font-semibold text-slate-300">{domain.salary}</span>
                    </div>
                  </div>
                  {isSelected && <ArrowRight className="h-4 w-4 text-blue-400" />}
                </button>
              );
            })}
          </div>

          {/* Right Inspector Workspace */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-[#0f172a] p-6 sm:p-8 backdrop-blur-md border border-slate-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block">INSPECTED DOMAIN SPECIFICATION</span>
                    <h3 className="text-2xl font-bold text-white mt-1 font-sans">{activeDomain.title}</h3>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-mono font-bold text-emerald-300">
                    {activeDomain.demandJds}
                  </span>
                </div>

                <p className="mt-5 text-sm text-slate-200 leading-relaxed font-sans">
                  {activeDomain.desc}
                </p>

                {/* Salary Progression Path Visual */}
                <div className="mt-6 rounded-xl bg-[#080d1a] p-4 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-3">
                    <LineChart className="h-4 w-4 text-emerald-400" />
                    <span>CAREER SALARY TRAJECTORY (0 - 6 YEARS)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    {activeDomain.salaryPath.map((sp) => (
                      <div key={sp.year} className="p-2.5 rounded-lg bg-[#0f172a] border border-slate-800">
                        <span className="text-[11px] text-slate-300 block font-sans font-medium">{sp.year}</span>
                        <span className="text-sm font-mono font-bold text-emerald-300 block mt-1">{sp.pay}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-xl bg-[#080d1a] p-4 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span>SALARY SCALE</span>
                    </div>
                    <span className="text-base font-mono font-bold text-white block mt-1">{activeDomain.salary}</span>
                  </div>

                  <div className="rounded-xl bg-[#080d1a] p-4 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
                      <Cpu className="h-4 w-4 text-blue-400" />
                      <span>AI AUTOMATION RISK</span>
                    </div>
                    <span className="text-xs font-semibold text-blue-200 block mt-1">{activeDomain.aiRisk}</span>
                  </div>
                </div>

                {/* Software & Employers */}
                <div className="mt-5 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-2 font-mono uppercase">MANDATORY CORPORATE SOFTWARE</span>
                    <div className="flex flex-wrap gap-2">
                      {activeDomain.tools.map((t) => (
                        <span key={t} className="rounded-lg bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs font-mono font-bold text-blue-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-2 font-mono uppercase">TOP HIRING EMPLOYERS</span>
                    <div className="flex flex-wrap gap-2">
                      {activeDomain.hiringCompanies.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 rounded-lg bg-[#080d1a] px-3 py-1 text-xs font-semibold text-slate-200 border border-slate-800">
                          <Building2 className="h-3 w-3 text-slate-400" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={onOpenRegister}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Inspect Career Trajectory</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
