import { useState } from "react";
import { 
  ShieldAlert, Database, FileSpreadsheet, Code2, LineChart, FileText, 
  ArrowRight, CheckCircle2, TrendingUp, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DomainData {
  id: string;
  name: string;
  shortName: string;
  icon: any;
  tagline: string;
  salaryEntry: string;
  salaryExp: string;
  demand: string;
  aiRisk: string;
  hiringCount: string;
  companies: string[];
  software: string[];
  skills: string[];
  roadmap: string[];
}

const DOMAINS: DomainData[] = [
  {
    id: "pv",
    name: "Pharmacovigilance & Drug Safety",
    shortName: "Pharmacovigilance",
    icon: ShieldAlert,
    tagline: "Monitor drug adverse events and submit regulatory safety evaluations to global authorities.",
    salaryEntry: "3.8",
    salaryExp: "16.0",
    demand: "High (4,850+ active JDs)",
    aiRisk: "Low (Human legal sign-off required)",
    hiringCount: "186 MNCs",
    companies: ["IQVIA", "Parexel", "Novartis", "Pfizer", "Cognizant", "Syneos Health"],
    software: ["Oracle Argus Safety", "MedDRA 26.0", "Safety Gateway", "Veeva Safety"],
    skills: ["ICSR Case Intake", "Causality Assessment", "Signal Detection", "MedDRA Coding"],
    roadmap: ["Weeks 1-4: ICSR Fundamentals", "Weeks 5-8: Argus Hands-on", "Weeks 9-12: Live Audit Simulations"]
  },
  {
    id: "cdm",
    name: "Clinical Data Management (CDM)",
    shortName: "Clinical Data Mgmt",
    icon: Database,
    tagline: "Design clinical trial databases, clean patient data, and lock trial datasets for FDA audit.",
    salaryEntry: "3.6",
    salaryExp: "15.0",
    demand: "Very High (3,400+ active JDs)",
    aiRisk: "Low-Medium (EDC automation)",
    hiringCount: "142 MNCs",
    companies: ["ICON plc", "Parexel", "Labcorp", "Accenture", "TCS Life Sciences"],
    software: ["Oracle Clinical", "Medidata Rave", "eDM Suite", "Veeva EDC"],
    skills: ["CRF Building", "Data Discrepancy Mgmt", "Database Locking", "CDASH Compliance"],
    roadmap: ["Weeks 1-4: eCRF Design", "Weeks 5-8: Medidata Rave Workflows", "Weeks 9-12: Trial Data Lock"]
  },
  {
    id: "ra",
    name: "Regulatory Affairs (RA)",
    shortName: "Regulatory Affairs",
    icon: FileSpreadsheet,
    tagline: "Author eCTD dossiers, compile NDA/IND submissions, and secure global market authorization.",
    salaryEntry: "4.2",
    salaryExp: "18.0",
    demand: "High (2,900+ active JDs)",
    aiRisk: "Very Low (High regulatory compliance)",
    hiringCount: "118 MNCs",
    companies: ["Dr. Reddy's", "Sun Pharma", "Pfizer", "Novartis", "Cipla", "Lupin"],
    software: ["eCTDexpress", "Veeva Vault RIM", "Lorenz docuBridge", "Publishing Tools"],
    skills: ["eCTD Module 1-5 Authoring", "Dossier Compilation", "CDSCO Guidelines", "USFDA 21 CFR"],
    roadmap: ["Weeks 1-4: Regulatory Submissions", "Weeks 5-8: eCTD Publishing", "Weeks 9-12: USFDA/EMA Dossier Prep"]
  },
  {
    id: "coding",
    name: "Medical Coding",
    shortName: "Medical Coding",
    icon: Code2,
    tagline: "Translate medical records and diagnostic procedures into standardized CPT & ICD-10 codes.",
    salaryEntry: "3.2",
    salaryExp: "12.0",
    demand: "Extremely High (6,100+ active JDs)",
    aiRisk: "Medium (Automated suggestions)",
    hiringCount: "210 MNCs",
    companies: ["Optum", "Omega Healthcare", "Corro Health", "RCM Global", "Episource"],
    software: ["3M Encoder", "AAPC Codify", "ICD-10-CM Tools", "CPT Assistant"],
    skills: ["ICD-10-CM Coding", "CPT Procedure Coding", "HCPCS Coding", "Chart Auditing"],
    roadmap: ["Weeks 1-4: Anatomy & Physiology", "Weeks 5-8: ICD-10 & CPT Mastery", "Weeks 9-12: CPC Exam Prep"]
  },
  {
    id: "sas",
    name: "SAS & Health Data Analytics",
    shortName: "SAS Analytics",
    icon: LineChart,
    tagline: "Write SAS macros, transform clinical datasets into SDTM/ADaM models, and build TFL reports.",
    salaryEntry: "4.5",
    salaryExp: "20.0",
    demand: "High (2,200+ active JDs)",
    aiRisk: "Low (Complex statistical logic)",
    hiringCount: "95 MNCs",
    companies: ["IQVIA", "Cytel", "Parexel", "Novartis", "Syneos Health", "Wipro"],
    software: ["SAS Base & Stat", "SAS Studio", "R Studio", "Python pandas"],
    skills: ["CDISC SDTM Mapping", "ADaM Dataset Creation", "TFL Generation", "SAS Macro Writing"],
    roadmap: ["Weeks 1-4: Base & Advanced SAS", "Weeks 5-8: CDISC SDTM/ADaM", "Weeks 9-12: TFL Production"]
  },
  {
    id: "writing",
    name: "Medical Writing",
    shortName: "Medical Writing",
    icon: FileText,
    tagline: "Author Clinical Study Reports (CSRs), investigator brochures, and peer-reviewed journals.",
    salaryEntry: "4.0",
    salaryExp: "16.0",
    demand: "Moderate-High (1,800+ JDs)",
    aiRisk: "Low (Scientific interpretation)",
    hiringCount: "88 MNCs",
    companies: ["Cactus Communications", "Indegene", "Novartis", "Pfizer", "Parexel"],
    software: ["EndNote", "iThenticate", "Veeva PromoMats", "AMA Manual Tools"],
    skills: ["CSR Writing", "ICH-GCP E6 Guidelines", "Protocol Development", "Manuscript Editing"],
    roadmap: ["Weeks 1-4: Scientific Writing", "Weeks 5-8: Clinical Protocols", "Weeks 9-12: CSR & FDA Summaries"]
  }
];

interface InteractiveCareerExplorerProps {
  onOpenRegister: () => void;
}

export function InteractiveCareerExplorer({ onOpenRegister }: InteractiveCareerExplorerProps) {
  const [selectedId, setSelectedId] = useState<string>("pv");
  const currentDomain = DOMAINS.find((d) => d.id === selectedId) || DOMAINS[0];

  return (
    <section id="explorer" className="bg-slate-950 py-24 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Master Career Intelligence Explorer
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Select a domain to inspect real employer expectations, software tools, salary bands, and AI risk profiles.
          </p>
        </div>

        {/* Equal 200px Width Centered Domain Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {DOMAINS.map((domain) => {
            const isSelected = domain.id === selectedId;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setSelectedId(domain.id)}
                className={`w-[180px] sm:w-[200px] py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer truncate ${
                  isSelected
                    ? "border-blue-500 bg-blue-600 text-white shadow-md"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {domain.shortName}
              </button>
            );
          })}
        </div>

        {/* Inspector Panel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDomain.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-blue-400 font-bold uppercase">DOMAIN SPECIFICATION</span>
                  <h3 className="text-2xl font-bold text-white mt-1">{currentDomain.name}</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-400 self-start sm:self-auto">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {currentDomain.demand}
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-300 font-sans leading-relaxed">
                {currentDomain.tagline}
              </p>

              {/* Bold Typography Scale for Salaries */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">ENTRY SALARY BAND</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-mono text-white">₹{currentDomain.salaryEntry}</span>
                    <span className="text-xs font-mono text-slate-400">LPA</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">EXPERIENCED PAY SCALE</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-mono text-emerald-400">₹{currentDomain.salaryExp}</span>
                    <span className="text-xs font-mono text-slate-400">LPA</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">AI AUTOMATION RISK</span>
                  <span className="text-xs font-bold text-blue-300 mt-3 block">{currentDomain.aiRisk}</span>
                </div>
              </div>

              {/* Software & Companies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">MANDATORY SOFTWARE STACK</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDomain.software.map((sw) => (
                      <span key={sw} className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-mono text-blue-300">
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">PRIMARY HIRING EMPLOYERS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDomain.companies.map((comp) => (
                      <span key={comp} className="rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-mono text-slate-300">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 12-Week Roadmap */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-3">12-WEEK SKILL READINESS ROADMAP</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentDomain.roadmap.map((step) => (
                    <div key={step} className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel CTA */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-300">
                  Curious if your degree matches <strong>{currentDomain.shortName}</strong>?
                </span>
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Check My Fit For {currentDomain.shortName}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section Micro-conversion Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Want your personalized answer on which domain suits you best?
            </span>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Find My Career Path</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
