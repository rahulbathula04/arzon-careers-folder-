import React from "react";
import { HEALTHCARE_DEGREES, HealthcareDegree } from "@/data/healthcareTaxonomy";
import { CheckCircle2, GraduationCap, ArrowRight } from "lucide-react";

interface DegreeSelectorProps {
  selectedDegreeId: string | null;
  onSelectDegree: (degree: HealthcareDegree) => void;
}

export const DegreeSelector: React.FC<DegreeSelectorProps> = ({
  selectedDegreeId,
  onSelectDegree,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-center">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-sky-400" />
          <span>Your Career Explorer</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-50 tracking-tight">
          First, what degree are you holding?
        </h2>
        <p className="font-sans text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Select your degree to explore the corporate healthcare paths, current job openings, and skills connected to your background.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
        {HEALTHCARE_DEGREES.map((degree) => {
          const isSelected = selectedDegreeId === degree.id;
          return (
            <button
              key={degree.id}
              onClick={() => onSelectDegree(degree)}
              className={`relative group text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-b from-[#0C1938] to-[#070D1B] border-sky-400 shadow-xl shadow-sky-500/10 scale-[1.02]"
                  : "bg-[#0B152C] border-slate-800 hover:border-sky-500/40 hover:bg-[#0E1B38] active:scale-[0.98]"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`font-mono text-xs font-bold ${isSelected ? "text-sky-400" : "text-slate-400"}`}>
                  {degree.shortName}
                </span>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors shrink-0" />
                )}
              </div>
              <h3 className="font-serif text-sm font-bold text-slate-100 mt-2 line-clamp-1">
                {degree.name}
              </h3>
              <p className="font-sans text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {degree.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
