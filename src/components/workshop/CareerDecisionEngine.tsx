import { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw, Target, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface CareerDecisionEngineProps {
  onOpenRegister: () => void;
}

export function CareerDecisionEngine({ onOpenRegister }: CareerDecisionEngineProps) {
  const [step, setStep] = useState<number>(1);
  const [education, setEducation] = useState<string>("B.Pharm / Pharm.D");
  const [workStyle, setWorkStyle] = useState<string>("Data & Tool Logic");
  const [priority, setPriority] = useState<string>("Highest starting salary & growth");

  const educationOptions = [
    "B.Pharm / Pharm.D",
    "MBBS / BDS / AYUSH",
    "M.Sc / B.Sc Life Sciences",
    "Biotechnology / Bio-informatics",
    "Nursing / Allied Health"
  ];

  const workStyleOptions = [
    "Data & Tool Logic (Working on databases, software & analysis)",
    "Regulatory & Compliance (Dossiers, submissions & USFDA rules)",
    "Clinical & Trial Operations (Patient protocols & trial data)",
    "Scientific & Medical Writing (Reports, manuscripts & literature)"
  ];

  const priorityOptions = [
    "Highest starting salary & growth",
    "US / Global hybrid remote work",
    "Fixed corporate hours & zero night shifts",
    "Future-proof stability against AI automation"
  ];

  // Derive calculated best fit
  const getCalculatedResult = () => {
    if (education.includes("Pharm") || workStyle.includes("Data")) {
      return {
        matchScore: "96% Best-Fit Match",
        domain: "Pharmacovigilance & Drug Safety",
        softwareFocus: "Oracle Argus Safety & MedDRA 26.0",
        whyFit: "Your background in pharmaceutical sciences combined with data logic maps directly to corporate safety triage & aggregate reporting roles.",
        avgSalary: "₹3.8 LPA – ₹16.5 LPA",
        recommendedSession: "Session 2: Oracle Argus Safety & PV Workflow Diagnostic"
      };
    } else if (workStyle.includes("Regulatory")) {
      return {
        matchScore: "94% Best-Fit Match",
        domain: "Global Regulatory Affairs",
        softwareFocus: "eCTD Submissions & Veeva Vault RIM",
        whyFit: "Your preference for compliance and structured filings makes you ideal for Module 1-5 drug dossier publishing for USFDA & EMA.",
        avgSalary: "₹4.2 LPA – ₹18.0 LPA",
        recommendedSession: "Session 3: eCTD Publishing & Dossier Structuring"
      };
    } else if (workStyle.includes("Clinical")) {
      return {
        matchScore: "92% Best-Fit Match",
        domain: "Clinical Data Management (CDM)",
        softwareFocus: "Medidata Rave EDC & InForm",
        whyFit: "Clinical background aligns cleanly with EDC database locks, discrepancy management, and trial data validation.",
        avgSalary: "₹3.6 LPA – ₹15.0 LPA",
        recommendedSession: "Session 1: Clinical Trial EDC Data Architecture"
      };
    } else {
      return {
        matchScore: "95% Best-Fit Match",
        domain: "Health Data & SAS Analytics",
        softwareFocus: "SAS Studio & CDISC SDTM/ADaM",
        whyFit: "Strong analytical inclination pairs directly with high-demand statistical programming for global pharma clinical trials.",
        avgSalary: "₹4.5 LPA – ₹22.0 LPA",
        recommendedSession: "Session 4: 1-on-1 Data & SAS Trajectory Blueprint"
      };
    };
  };

  const result = getCalculatedResult();

  return (
    <section id="decision-engine" className="bg-slate-900 py-20 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
            <Target className="h-3.5 w-3.5" />
            <span>CAREER DECISION ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight">
            Which healthcare career fits you?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Don't guess. Take this 30-second interactive diagnostic to calculate your exact best-fit domain based on degree, work preference, and career goals.
          </p>
        </div>

        {/* Engine Card Container */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl relative">
          
          {/* Step Progress Dots */}
          <div className="flex items-center justify-between pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {step > 3 ? "✓" : step}
              </span>
              <span className="text-sm font-semibold text-slate-200">
                {step === 1 && "Step 1 of 3: Educational Background"}
                {step === 2 && "Step 2 of 3: Preferred Work Style"}
                {step === 3 && "Step 3 of 3: Primary Career Goal"}
                {step === 4 && "Diagnostic Result Complete"}
              </span>
            </div>

            {step <= 3 && (
              <span className="text-xs font-mono text-slate-500">
                Progress: {Math.round((step / 3) * 100)}%
              </span>
            )}
          </div>

          {/* Interactive Step Content */}
          <div className="mt-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-bold text-slate-200 mb-4">Select your qualification:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {educationOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setEducation(opt)}
                      className={`p-4 rounded-xl text-left text-sm font-semibold border transition-all cursor-pointer ${
                        education === opt
                          ? "border-blue-500 bg-blue-500/10 text-blue-200 shadow-md"
                          : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-bold text-slate-200 mb-4">What type of work do you enjoy most?</h3>
                <div className="space-y-3">
                  {workStyleOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setWorkStyle(opt)}
                      className={`w-full p-4 rounded-xl text-left text-sm font-semibold border transition-all cursor-pointer ${
                        workStyle === opt
                          ? "border-blue-500 bg-blue-500/10 text-blue-200 shadow-md"
                          : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-200"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-bold text-slate-200 mb-4">What is your primary priority?</h3>
                <div className="space-y-3">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPriority(opt)}
                      className={`w-full p-4 rounded-xl text-left text-sm font-semibold border transition-all cursor-pointer ${
                        priority === opt
                          ? "border-blue-500 bg-blue-500/10 text-blue-200 shadow-md"
                          : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-200"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-500 transition-all cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    <Sparkles className="h-4 w-4 text-blue-300" />
                    <span>Calculate My Match Score</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                
                <div className="rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {result.matchScore}
                      </span>
                      <h4 className="mt-3 text-2xl font-serif font-bold text-white">
                        {result.domain}
                      </h4>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[11px] font-semibold text-slate-400 block">Typical Salary Band</span>
                      <span className="text-lg font-mono font-bold text-white">{result.avgSalary}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-sm text-slate-300">
                    <p><strong className="text-blue-300">Why this fits you:</strong> {result.whyFit}</p>
                    <p><strong className="text-blue-300">Primary Tool Stack:</strong> {result.softwareFocus}</p>
                    <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                      🎯 Tailored Workshop Module: {result.recommendedSession}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="button"
                      onClick={onOpenRegister}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      <span>Reserve My Career Session</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Retake Diagnostic</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
