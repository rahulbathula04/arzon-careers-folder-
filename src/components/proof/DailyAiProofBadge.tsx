import { Sparkles } from "lucide-react";
import { useDailyAiAssessmentCount } from "@/hooks/useDailyAiAssessmentCount";

export function DailyAiProofBadge({ className = "" }: { className?: string }) {
  const { count, formattedLabel } = useDailyAiAssessmentCount();

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-slate-100 border border-slate-700/80 shadow-md backdrop-blur-md text-xs font-medium tone-dark ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />

      <span style={{ color: "#F8FAFC" }} className="font-bold text-[#F8FAFC]">
        AI Assessment:
      </span>

      <span style={{ color: "#38BDF8" }} className="font-mono font-bold text-sky-400">
        {formattedLabel}
      </span>
    </div>
  );
}
