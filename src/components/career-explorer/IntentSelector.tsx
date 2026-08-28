import React from "react";
import { INTENT_OPTIONS } from "./ExplorerState";
import { Compass, Briefcase, TrendingUp, Wrench, GitCompare, UserCheck, CheckCircle2 } from "lucide-react";

interface IntentSelectorProps {
  degreeName: string;
  selectedIntentId: string | null;
  onSelectIntent: (intentId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Briefcase,
  TrendingUp,
  Wrench,
  GitCompare,
  UserCheck,
};

export const IntentSelector: React.FC<IntentSelectorProps> = ({
  degreeName,
  selectedIntentId,
  onSelectIntent,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Personalized For You</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-50 tracking-tight">
          Got it. What's your biggest question about {degreeName}?
        </h2>
        <p className="font-sans text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Choose what you want to figure out first. We'll customize your career discovery map accordingly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-2">
        {INTENT_OPTIONS.map((opt) => {
          const isSelected = selectedIntentId === opt.id;
          const IconComponent = ICON_MAP[opt.icon] || Compass;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectIntent(opt.id)}
              className={`relative text-left p-5 rounded-2xl border transition-all duration-200 focus:outline-none cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-b from-[#0C1938] to-[#070D1B] border-sky-400 shadow-xl shadow-sky-500/10 scale-[1.02]"
                  : "bg-[#0B152C] border-slate-800 hover:border-sky-500/40 hover:bg-[#0E1B38] active:scale-[0.98]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${isSelected ? "bg-sky-500/20 text-sky-400" : "bg-slate-900 text-sky-400 border border-slate-800"}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />}
              </div>
              <h3 className="font-serif text-base font-bold text-slate-100 mt-3">
                {opt.title}
              </h3>
              <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
