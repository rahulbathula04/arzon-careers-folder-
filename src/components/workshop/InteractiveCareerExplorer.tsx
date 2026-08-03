import { useState } from "react";
import { 
  ShieldAlert, Database, FileSpreadsheet, Code2, LineChart, FileText, 
  ArrowRight, CheckCircle2, Building2, Cpu, TrendingUp, DollarSign, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DomainData {
  id: string;
  name: string;
  shortName: string;
  icon: any;
  tagline: string;
  salary: { entry: string; exp: string };
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
    salary: { entry: "₹3.8L – ₹5.5L", exp: "₹12.0L – ₹24.0L" },
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
    salary: { entry: "₹3.6L – ₹5.2L", exp: "₹11.0L – ₹20.0L" },
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
    salary: { entry: "₹4.2L – ₹6.0L", exp: "₹15.0L – ₹28.0L" },
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
    salary: { entry: "₹3.2L – ₹4.8L", exp: "₹9.0L – ₹16.0L" },
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
    salary: { entry: "₹4.5L – ₹7.0L", exp: "₹16.0L – ₹30.0L+" },
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
    salary: { entry: "₹4.0L – ₹5.8L", exp: "₹14.0L – ₹25.0L" },
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
    <section id="explorer" className="bg-slate-950 py-16 lg:py-24 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 text-xs font-mono font-semibold text-slate-300 mb-4">
            <Layers className="h-3.5 w-3.5 text-blue-400" />
            <span>NOTION/LINEAR-STYLE MASTER WORKSPACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Master Career Intelligence Explorer
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Click any domain on the left to inspect real employer expectations, software tools, salary bands, and AI risk profiles.
          </p>
        </div>

        {/* 2-Column Master Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Domain Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block px-2 mb-2">
              HEALTHCARE DOMAIN INDEX
            </span>
            {DOMAINS.map((domain) => {
              const Icon = domain.icon;
              const isSelected = domain.id === selectedId;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setSelectedId(domain.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-500 bg-blue-600/10 text-white shadow-lg"
                      : "border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border ${isSelected ? "border-blue-500/30 bg-blue-500/20 text-blue-400" : "border-slate-800 bg-slate-950 text-slate-500"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold block">{domain.shortName}</span>
                      <span className="text-[11px] font-mono text-slate-500">{domain.hiringCount}</span>
                    </div>
                  </div>
                  <ArrowRight className={`h-4 w-4 transition-transform ${isSelected ? "text-blue-400 translate-x-1" : "text-slate-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Workspace Inspector Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDomain.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">DOMAIN SPECIFICATION</span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">{currentDomain.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-400 self-start sm:self-auto">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {currentDomain.demand}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-300 font-sans leading-relaxed">
                  {currentDomain.tagline}
                </p>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">FRESHER PAY</span>
                    <span className="text-sm font-mono font-bold text-white mt-1 block">{currentDomain.salary.entry}</span>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">EXPERIENCED PAY</span>
                    <span className="text-sm font-mono font-bold text-emerald-400 mt-1 block">{currentDomain.salary.exp}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">AI AUTOMATION RISK</span>
                    <span className="text-xs font-bold text-blue-300 mt-1 block">{currentDomain.aiRisk}</span>
                  </div>
                </div>

                {/* Software Stack & Hiring Companies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">MANDATORY SOFTWARE STACK</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentDomain.software.map((sw) => (
                        <span key={sw} className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-mono text-blue-300">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">PRIMARY HIRING EMPLOYERS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentDomain.companies.map((comp) => (
                        <span key={comp} className="rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-mono text-slate-300">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 12-Week Roadmap Sequence */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-3">12-WEEK SKILL READINESS ROADMAP</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentDomain.roadmap.map((step, idx) => (
                      <div key={step} className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel CTA */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    Curious if your degree matches <strong>{currentDomain.shortName}</strong>?
                  </span>
                  <button
                    type="button"
                    onClick={onOpenRegister}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
                  >
                    <span>Check My Fit For {currentDomain.shortName}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Section Micro-conversion Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Want your personalized answer on which domain suits you best?
            </span>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
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
