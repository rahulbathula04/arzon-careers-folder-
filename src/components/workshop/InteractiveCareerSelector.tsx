import { useState } from "react";
import { Compass, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";

interface InteractiveCareerSelectorProps {
  onReserveClick: () => void;
}

export function InteractiveCareerSelector({ onReserveClick }: InteractiveCareerSelectorProps) {
  const [workInterest, setWorkInterest] = useState<string>("Corporate / Desk");
  const [priority, setPriority] = useState<string>("Higher long-term growth");

  const workOptions = [
    "Corporate / Desk",
    "Clinical / Research",
    "Laboratory",
    "Data / Technology",
    "Commercial / Sales",
  ];

  const priorityOptions = [
    "Fast entry",
    "Higher long-term growth",
    "Scientific work",
    "Corporate environment",
    "Technology",
    "People interaction",
  ];

  // Deterministic Recommendation Engine
  const getRecommendation = () => {
    if (workInterest === "Corporate / Desk") {
      if (priority === "Fast entry") {
        return {
          primary: "Medical Coding & RCM",
          secondary: "Pharmacovigilance (PV)",
          desc: "High volume fresher hiring, rapid 30-60 day onboarding, stable corporate desk environments in Hyderabad & Chennai.",
        };
      }
      return {
        primary: "Pharmacovigilance & Drug Safety",
        secondary: "Regulatory Affairs (RA)",
        desc: "High-paying desk role processing global ICSR safety reports with excellent multi-year progression into CRO safety lead positions.",
      };
    }

    if (workInterest === "Clinical / Research") {
      return {
        primary: "Clinical Data Management (CDM)",
        secondary: "Clinical Research Associate (CRA)",
        desc: "Combines GCP clinical protocol understanding with data validation in EDC platforms (Rave, Inform) across global CROs.",
      };
    }

    if (workInterest === "Laboratory") {
      return {
        primary: "Quality Control (QC / Analytical)",
        secondary: "Quality Assurance (QA / cGMP)",
        desc: "Hands-on HPLC analytical testing, formulation assay, and cGMP documentation in pharmaceutical manufacturing hubs.",
      };
    }

    if (workInterest === "Data / Technology") {
      return {
        primary: "Healthcare Analytics",
        secondary: "Healthcare IT Business Analyst",
        desc: "High entry compensation (₹4.0-6.5 LPA) leveraging SQL, Python, and pharma domain knowledge to analyze clinical & commercial datasets.",
      };
    }

    // Commercial / Sales
    return {
      primary: "Pharma Sales & Detailing",
      secondary: "Product Marketing (PMT)",
      desc: "Commercial detailing of ethical brand portfolios with high variable incentives and fast progression into Product Management.",
    };
  };

  const rec = getRecommendation();

  return (
    <section id="career-selector" className="w-full bg-white tone-light py-14 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <span>CAREER DIAGNOSTIC TOOL</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-medical-navy)] tracking-tight">
            WHICH CAREER PATH FITS YOU?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-600 mt-2">
            Select your work preference and primary goal to see your recommended B.Pharm exploration path.
          </p>
        </div>

        {/* 2-Question Interactive Box */}
        <div className="max-w-4xl mx-auto bg-[var(--color-warm-paper)] rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Q1: Work Interest */}
            <div>
              <label className="font-mono text-xs font-bold text-[var(--color-medical-navy)] uppercase tracking-wider block mb-3">
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
                        ? "bg-slate-900 text-white font-bold border-slate-900 shadow-sm"
                        : "bg-white text-stone-700 border-stone-200 hover:border-slate-400"
                    }`}
                  >
                    <span>{opt}</span>
                    {workInterest === opt && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Priority */}
            <div>
              <label className="font-mono text-xs font-bold text-[var(--color-medical-navy)] uppercase tracking-wider block mb-3">
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
                        ? "bg-[var(--color-arzon-blue)] text-white font-bold border-[var(--color-arzon-blue)] shadow-sm"
                        : "bg-white text-stone-700 border-stone-200 hover:border-blue-300"
                    }`}
                  >
                    <span>{opt}</span>
                    {priority === opt && <CheckCircle2 className="w-4 h-4 text-teal-300" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Diagnostic Result Card */}
          <div className="bg-white tone-light rounded-2xl p-6 border-2 border-teal-500 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> YOUR DIAGNOSTIC RECOMMENDATION
              </span>
              <span className="font-mono text-[10px] text-stone-400">Match Accuracy: High</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200">
                <span className="font-mono text-[10px] font-bold text-teal-800 uppercase block mb-1">
                  Primary Recommendation
                </span>
                <h4 className="font-serif text-base font-extrabold text-[var(--color-medical-navy)]">
                  {rec.primary}
                </h4>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-stone-200">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block mb-1">
                  Secondary Parallel Option
                </span>
                <h4 className="font-serif text-base font-bold text-stone-800">
                  {rec.secondary}
                </h4>
              </div>
            </div>

            <p className="font-sans text-xs text-stone-600 leading-relaxed mb-6">
              {rec.desc}
            </p>

            <button
              type="button"
              onClick={onReserveClick}
              className="w-full py-3.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              EXPLORE MY CAREER MAP
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
