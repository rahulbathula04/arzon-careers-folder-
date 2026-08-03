import { useState } from "react";
import { Network, ChevronRight, Layers, Cpu, ShieldCheck, Database, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InteractiveIndustryMap() {
  const [activeBranch, setActiveBranch] = useState<string>("drug-safety");
  const [activeRole, setActiveRole] = useState<string | null>(null);

  const branches = [
    {
      id: "drug-safety",
      name: "Drug Safety & PV",
      icon: ShieldCheck,
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      roles: [
        {
          title: "Safety Data Processor / Specialist",
          tools: "Oracle Argus Safety, MedDRA",
          description: "Triages & processes global individual case safety reports (ICSRs) received from hospitals & clinical trials.",
          salary: "₹3.8 - ₹6.5 LPA"
        },
        {
          title: "PV Aggregate Reporting Scientist",
          tools: "Argus, Empirica Signal, PSUR templates",
          description: "Compiles periodic safety update reports (PSUR/PBRER) submitted to global regulators annually.",
          salary: "₹6.5 - ₹12.0 LPA"
        },
        {
          title: "Signal Detection Manager",
          tools: "Empirica, RWE datasets",
          description: "Identifies early safety statistical signals across millions of global patient reports.",
          salary: "₹12.0 - ₹18.5+ LPA"
        }
      ]
    },
    {
      id: "regulatory",
      name: "Regulatory Affairs",
      icon: FileText,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      roles: [
        {
          title: "eCTD Publishing Associate",
          tools: "eCTDexpress, Lorenz docuBridge",
          description: "Formats Module 1-5 electronic drug submission packages for USFDA, EMA, and CDSCO.",
          salary: "₹4.2 - ₹7.0 LPA"
        },
        {
          title: "Global Regulatory Strategy Lead",
          tools: "Veeva Vault RIM, ESG Portal",
          description: "Designs multi-country clinical trial authorization & marketing clearance strategy.",
          salary: "₹10.5 - ₹20.0+ LPA"
        }
      ]
    },
    {
      id: "clinical",
      name: "Clinical Research & CDM",
      icon: Layers,
      color: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      roles: [
        {
          title: "Clinical Data Lead / EDC Manager",
          tools: "Medidata Rave, Oracle InForm",
          description: "Builds electronic data capture (EDC) screens and manages discrepancy cleaning.",
          salary: "₹3.6 - ₹8.0 LPA"
        },
        {
          title: "Clinical Research Associate (CRA)",
          tools: "CTMS, GCP Audit Portals",
          description: "Monitors hospital trial sites to ensure trial subject safety and protocol compliance.",
          salary: "₹4.5 - ₹11.0 LPA"
        }
      ]
    },
    {
      id: "data-analytics",
      name: "Data & Health Tech",
      icon: Database,
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      roles: [
        {
          title: "SAS Clinical Programmer",
          tools: "SAS Studio, CDISC SDTM/ADaM",
          description: "Writes macro scripts to build regulatory-compliant statistical analysis tables.",
          salary: "₹4.8 - ₹14.0 LPA"
        },
        {
          title: "Real-World Evidence (RWE) Analyst",
          tools: "Python, SQL, EHR datasets",
          description: "Analyzes electronic health records and insurance claims data for post-market drug efficacy.",
          salary: "₹6.0 - ₹18.0+ LPA"
        }
      ]
    }
  ];

  const currentBranch = branches.find((b) => b.id === activeBranch) ?? branches[0];

  return (
    <section className="bg-slate-950 py-20 text-white relative border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <Network className="h-3.5 w-3.5" />
            <span>INTERACTIVE HEALTHCARE INDUSTRY MAP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight">
            Discover how the healthcare ecosystem connects.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Click any branch node to expand real corporate specializations, mandatory software tools, and salary bands.
          </p>
        </div>

        {/* Tree Root Navigation */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-mono font-bold text-slate-300">
            HEALTHCARE INDUSTRY
          </div>
          <ChevronRight className="h-4 w-4 text-slate-600 hidden sm:block" />

          {branches.map((branch) => {
            const Icon = branch.icon;
            const isActive = activeBranch === branch.id;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => {
                  setActiveBranch(branch.id);
                  setActiveRole(null);
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  isActive
                    ? branch.color + " shadow-lg"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{branch.name}</span>
              </button>
            );
          })}
        </div>

        {/* Branch Node Expansion Details */}
        <motion.div
          key={activeBranch}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">
                Expanded Node Branch
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                {currentBranch.name} Specializations
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {currentBranch.roles.length} Core Career Pathways
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBranch.roles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-100 mb-2">
                    {role.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {role.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Tools:</span>
                    <span className="font-mono font-bold text-blue-300">{role.tools}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Salary Band:</span>
                    <span className="font-mono font-bold text-emerald-400">{role.salary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
