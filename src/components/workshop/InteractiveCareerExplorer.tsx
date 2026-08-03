import { useState } from "react";
import { 
  ShieldCheck, Database, FileText, Code2, Sparkles, ArrowRight,
  TrendingUp, Building2, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DOMAINS = [
  {
    id: "pv",
    title: "Pharmacovigilance & Safety",
    icon: ShieldCheck,
    tag: "High Demand",
    tagColor: "emerald",
    salary: "₹3.8L – ₹16.5L",
    demandJds: "4,850+ Active JDs",
    aiRisk: "Low (FDA Mandatory Physician Sign-off)",
    tools: ["Oracle Argus Safety", "MedDRA 26.0", "Safety Gateway", "Empirica Signal"],
    hiringCompanies: ["IQVIA", "Parexel", "Novartis", "Cognizant", "TCS Life Sciences"],
    desc: "Monitor adverse drug reactions, write ICSR case evaluations, and ensure ICH-GCP regulatory compliance for global biopharma safety signal detection."
  },
  {
    id: "cdm",
    title: "Clinical Data Management",
    icon: Database,
    tag: "High Hiring",
    tagColor: "blue",
    salary: "₹3.5L – ₹14.0L",
    demandJds: "3,620+ Active JDs",
    aiRisk: "Low (Clinical Trial Audit Lock)",
    tools: ["Medidata Rave", "Oracle Clinical", "Veeva Vault CDMS", "EDC Validation"],
    hiringCompanies: ["Syneos Health", "Labcorp", "Accenture", "Icon PLC"],
    desc: "Design electronic case report forms (eCRF), execute data validation checks, and manage clinical trial databases for global Phase I-IV trials."
  },
  {
    id: "ra",
    title: "Regulatory Affairs",
    icon: FileText,
    tag: "Executive Track",
    tagColor: "purple",
    salary: "₹4.2L – ₹18.0L",
    demandJds: "2,140+ Active JDs",
    aiRisk: "Minimal (Legal Agency Filings)",
    tools: ["eCTDexpress", "Lorenz docuBridge", "ESG Portal", "RIM Smart"],
    hiringCompanies: ["Dr. Reddy's", "Sun Pharma", "Cipla", "Lupin", "Pfizer India"],
    desc: "Compile eCTD dossiers (Modules 1-5), handle NDA/IND regulatory submissions to USFDA, EMA, and DCGI, and oversee product lifecycle management."
  },
  {
    id: "sas",
    title: "Biostatistics & SAS Analytics",
    icon: Code2,
    tag: "High Salary",
    tagColor: "sky",
    salary: "₹4.5L – ₹22.0L",
    demandJds: "1,980+ Active JDs",
    aiRisk: "Low (Complex Statistical Analysis)",
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
    <section id="explorer" className="bg-slate-950 py-24 text-white border-t border-slate-900/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>CAREER INTELLIGENCE EXPLORER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Explore Healthcare Career Trajectories
          </h2>
          <p className="mt-2 text-base text-slate-300 font-sans">
            Select a domain to inspect live market demand, mandatory software tools, and salary growth bands.
          </p>
        </div>

        {/* Linear-Style Split Workspace Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Domain List Panel (4 columns) */}
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
                      ? "bg-blue-600/15 border border-blue-500/40 text-white shadow-lg"
                      : "bg-slate-900/40 hover:bg-slate-900/80 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{domain.title}</h4>
                      <span className="text-[11px] font-mono text-slate-400">{domain.salary}</span>
                    </div>
                  </div>
                  {isSelected && <ArrowRight className="h-4 w-4 text-blue-400" />}
                </button>
              );
            })}
          </div>

          {/* Right Inspector Workspace Panel (8 columns) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md"
              >
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">DOMAIN SPECIFICATION</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{activeDomain.title}</h3>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                    {activeDomain.demandJds}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm text-slate-300 leading-relaxed font-sans">
                  {activeDomain.desc}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="rounded-xl bg-slate-950/80 p-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span>ESTIMATED SALARY SCALE</span>
                    </div>
                    <span className="text-lg font-mono font-bold text-white block mt-1">{activeDomain.salary}</span>
                  </div>

                  <div className="rounded-xl bg-slate-950/80 p-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                      <Cpu className="h-4 w-4 text-blue-400" />
                      <span>AI AUTOMATION RISK</span>
                    </div>
                    <span className="text-xs font-semibold text-blue-300 block mt-1">{activeDomain.aiRisk}</span>
                  </div>
                </div>

                {/* Software Tools & Hiring Employers */}
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-2">MANDATORY CORPORATE SOFTWARE</span>
                    <div className="flex flex-wrap gap-2">
                      {activeDomain.tools.map((t) => (
                        <span key={t} className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-mono font-semibold text-blue-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-2">TOP HIRING EMPLOYERS</span>
                    <div className="flex flex-wrap gap-2">
                      {activeDomain.hiringCompanies.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-300">
                          <Building2 className="h-3 w-3 text-slate-400" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
