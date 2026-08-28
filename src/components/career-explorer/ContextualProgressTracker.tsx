import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface ContextualProgressTrackerProps {
  hasDegree: boolean;
  hasIntent: boolean;
  hasExplored: boolean;
  hasMatch: boolean;
  hasWhatsApp: boolean;
}

export const ContextualProgressTracker: React.FC<ContextualProgressTrackerProps> = ({
  hasDegree,
  hasIntent,
  hasExplored,
  hasMatch,
  hasWhatsApp,
}) => {
  const steps = [
    { label: "Degree", done: hasDegree },
    { label: "Intent", done: hasIntent },
    { label: "Careers Explored", done: hasExplored },
    { label: "Job Match", done: hasMatch },
    { label: "Saved Map", done: hasWhatsApp },
    { label: "Expert Guidance", done: false },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-3 px-4 rounded-2xl bg-[#0B152C]/80 border border-slate-800 text-slate-100 flex items-center justify-between overflow-x-auto gap-2 font-mono text-[11px]">
      <span className="text-slate-400 uppercase font-bold shrink-0 hidden sm:inline">Exploration Progress:</span>
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 mx-auto sm:mx-0">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex items-center gap-1.5 shrink-0">
            {step.done ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            )}
            <span className={step.done ? "text-slate-100 font-bold" : "text-slate-500"}>
              {step.label}
            </span>
            {idx < steps.length - 1 && <span className="text-slate-700 font-normal ml-1">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
