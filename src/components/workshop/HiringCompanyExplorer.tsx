import { useState } from "react";
import { Building2, MapPin, Briefcase, ArrowRight, CheckCircle2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HiringCompanyExplorerProps {
  onOpenRegister: () => void;
}

const COMPANIES = [
  {
    name: "IQVIA",
    type: "Global CRO & Clinical Data Giant",
    roles: ["PV Safety Associate", "Clinical Data Manager", "SAS Programmer"],
    locations: ["Bengaluru", "Hyderabad", "Mumbai"],
    payScale: "₹3.8L – ₹18.0L",
    jdCriteria: "Requires hands-on Argus Safety or Medidata Rave & ICSR triage."
  },
  {
    name: "Parexel",
    type: "Leading Global Clinical Research MNC",
    roles: ["Drug Safety Specialist", "Regulatory Dossier Publisher", "CDM Lead"],
    locations: ["Mohali", "Bengaluru", "Hyderabad"],
    payScale: "₹4.0L – ₹16.5L",
    jdCriteria: "Requires eCTD publishing & MedDRA coding knowledge."
  },
  {
    name: "Novartis",
    type: "Top Global Pharmaceutical Multinational",
    roles: ["Safety Scientist", "Clinical Scientific Expert", "Medical Writer"],
    locations: ["Hyderabad Global Capability Center"],
    payScale: "₹4.5L – ₹22.0L",
    jdCriteria: "Requires clinical narrative writing & ICH-GCP audit readiness."
  },
  {
    name: "Pfizer",
    type: "Global Pharma & Vaccine Pioneer",
    roles: ["PV Quality Evaluator", "Regulatory Affairs Executive"],
    locations: ["Chennai", "Mumbai"],
    payScale: "₹4.2L – ₹20.0L",
    jdCriteria: "Requires USFDA 21 CFR compliance & dossier authoring."
  },
  {
    name: "Dr. Reddy's",
    type: "Leading Indian Multinational Pharma",
    roles: ["Regulatory Affairs Officer", "QA Specialist"],
    locations: ["Hyderabad", "Vizag"],
    payScale: "₹3.6L – ₹14.0L",
    jdCriteria: "Requires CDSCO/EMA regulatory documentation experience."
  },
  {
    name: "Optum (UnitedHealth)",
    type: "World's Largest Healthcare Services Firm",
    roles: ["CPC Certified Medical Coder", "RCM Auditor"],
    locations: ["Hyderabad", "Gurugram", "Noida"],
    payScale: "₹3.5L – ₹12.0L",
    jdCriteria: "Requires ICD-10-CM & CPT procedure coding speed."
  },
  {
    name: "Syneos Health",
    type: "Fully Integrated Biopharmaceutical Solutions",
    roles: ["Safety Operations Analyst", "Clinical SAS Programmer"],
    locations: ["Gurugram", "Bengaluru"],
    payScale: "₹4.0L – ₹17.5L",
    jdCriteria: "Requires CDISC SDTM macro creation & Argus intake."
  },
  {
    name: "ICON plc",
    type: "Global Intelligence & Trial Organization",
    roles: ["Clinical Data Associate", "Biostatistician"],
    locations: ["Chennai", "Trivandrum", "Bengaluru"],
    payScale: "₹3.8L – ₹15.0L",
    jdCriteria: "Requires eCRF validation & automated query management."
  }
];

export function HiringCompanyExplorer({ onOpenRegister }: HiringCompanyExplorerProps) {
  const [selectedComp, setSelectedComp] = useState(COMPANIES[0]);

  return (
    <section className="bg-slate-950 py-16 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400 mb-4">
            <Building2 className="h-3.5 w-3.5" />
            <span>INTERACTIVE EMPLOYER RECRUITER DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Where Healthcare Intelligence Careers Live
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Click any MNC to see real open role titles, salary ranges, and hiring expectations.
          </p>
        </div>

        {/* Interactive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Company Buttons Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-3">
            {COMPANIES.map((comp) => {
              const isSelected = comp.name === selectedComp.name;
              return (
                <button
                  key={comp.name}
                  type="button"
                  onClick={() => setSelectedComp(comp)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-500 bg-blue-600/10 text-white shadow-lg"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{comp.name}</span>
                    <Building2 className={`h-4 w-4 ${isSelected ? "text-blue-400" : "text-slate-600"}`} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 mt-1 block truncate">
                    {comp.type}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Company Inspector Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedComp.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider">EMPLOYER DOSSIER</span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-0.5">{selectedComp.name}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    {selectedComp.payScale}
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-400 mt-3">{selectedComp.type}</p>

                <div className="mt-5 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">OPEN ROLE TITLES</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedComp.roles.map((role) => (
                        <span key={role} className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-semibold text-blue-300">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">HIRING LOCATIONS IN INDIA</span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-rose-400" />
                      <span>{selectedComp.locations.join(" • ")}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">PRIMARY HIRING SELECTION CRITERIA</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {selectedComp.jdCriteria}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
                >
                  <span>See My Compatibility With {selectedComp.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Micro-conversion Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Want your personalized answer on which company fits your profile?
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
