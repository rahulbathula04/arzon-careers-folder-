import { useState } from "react";
import { Compass, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";

interface InteractiveCareerSelectorProps {
  onReserveClick: () => void;
}

export function InteractiveCareerSelector({ onReserveClick }: InteractiveCareerSelectorProps) {
  const [workInterest, setWorkInterest] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);

  const workOptions = [
    "Corporate / Desk",
    "Clinical / Research",
    "Laboratory / QC",
    "Data & Analytics",
    "Commercial / Sales",
  ];

  const priorityOptions = [
    "Fast fresher entry",
    "Long-term salary growth",
    "Scientific & clinical depth",
    "Corporate work environment",
    "Technology & data tools",
  ];

  // Deterministic Explainable Scoring Recommendation Engine
  const getRecommendation = () => {
    if (!workInterest || !priority) return null;

    if (workInterest === "Corporate / Desk") {
      if (priority === "Fast fresher entry") {
        return {
          primary: "Medical Coding & Revenue Cycle Management",
          secondary: "Pharmacovigilance (PV)",
          desc: "High volume fresher intake in Hyderabad, Chennai & Bangalore with rapid 30-60 day onboarding and structured corporate desk environments.",
        };
      }
      return {
        primary: "Pharmacovigilance & Drug Safety",
        secondary: "Regulatory Affairs (RA)",
        desc: "High-demand desk role evaluating ICSR safety reports with multi-year career growth into safety lead and signal detection roles.",
      };
    }

    if (workInterest === "Clinical / Research") {
      return {
        primary: "Clinical Data Management (CDM)",
        secondary: "Clinical Research Coordinator (CRC)",
        desc: "Blends ICH-GCP clinical trial protocols with electronic data capture (EDC) validation across global CROs.",
      };
    }

    if (workInterest === "Laboratory / QC") {
      return {
        primary: "Quality Control (HPLC / Analytical)",
        secondary: "Quality Assurance (cGMP / Audit)",
        desc: "Hands-on instrumental testing, raw material assay, and cGMP compliance documentation in pharmaceutical manufacturing hubs.",
      };
    }

    if (workInterest === "Data & Analytics") {
      return {
        primary: "Healthcare Data Analytics",
        secondary: "Clinical Data Science",
        desc: "Premium starting compensation (₹4.0-6.5 LPA) leveraging SQL, Excel, and pharma domain intelligence to solve commercial & clinical data problems.",
      };
    }

    return {
      primary: "Pharma Commercial Detailing",
      secondary: "Product Management (PMT)",
      desc: "Commercial strategy and brand detailing with high variable performance incentives and fast progression into corporate brand management.",
    };
  };

  const rec = getRecommendation();

  return (
    <section id="career-diagnostic" className="w-full bg-slate-50 py-12 sm:py-16 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 font-sans text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4 text-teal-700" />
            <span>60-Second Career Diagnostic</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Which B.Pharm Career Path Fits You?
          </h2>
          <p className="font-sans text-sm text-slate-600 mt-2">
            Select your work preference and primary goal to reveal your recommended B.Pharm exploration path.
          </p>
        </div>

        {/* 2-Question Interactive Box */}
        <div className="max-w-4xl mx-auto bg-white card-light rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Q1: Work Interest */}
            <div>
              <label className="font-sans text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                1. What kind of work interests you?
              </label>
              <div className="space-y-2">
                {workOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setWorkInterest(opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                      workInterest === opt
                        ? "tone-dark bg-[#0B1325] border-[#0B1325] shadow-sm"
                        : "bg-stone-50 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <span className={workInterest === opt ? "text-white font-bold" : "text-stone-700 font-medium"}>
                      {opt}
                    </span>
                    {workInterest === opt && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Priority */}
            <div>
              <label className="font-sans text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                2. What matters most to you?
              </label>
              <div className="space-y-2">
                {priorityOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPriority(opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                      priority === opt
                        ? "tone-dark bg-[#1B3F8B] border-[#1B3F8B] shadow-sm"
                        : "bg-stone-50 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <span className={priority === opt ? "text-white font-bold" : "text-stone-700 font-medium"}>
                      {opt}
                    </span>
                    {priority === opt && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Diagnostic Result Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border-2 border-teal-500 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-600" /> Your Personal Fit Recommendation
              </span>
            </div>

            {rec ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                  <div className="p-4 rounded-xl bg-teal-100/70 border border-teal-200">
                    <span className="font-sans text-[10px] font-bold text-teal-900 uppercase block mb-1">
                      Primary Recommended Direction
                    </span>
                    <h4 className="font-sans text-base font-extrabold text-slate-900">
                      {rec.primary}
                    </h4>
                  </div>

                  <div className="p-4 rounded-xl bg-white tone-light border border-slate-200">
                    <span className="font-sans text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Secondary Alternative Option
                    </span>
                    <h4 className="font-sans text-base font-bold text-slate-800">
                      {rec.secondary}
                    </h4>
                  </div>
                </div>

                <p className="font-sans text-xs text-slate-700 leading-relaxed mb-6">
                  {rec.desc}
                </p>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-500 font-sans text-xs">
                Select your work preference (Q1) and priority (Q2) above to see your recommended fit.
              </div>
            )}

            <button
              type="button"
              onClick={onReserveClick}
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>GET MY CAREER MAP + RESERVE FREE SEAT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
