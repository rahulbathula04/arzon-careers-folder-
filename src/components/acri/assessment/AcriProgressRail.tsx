import { Clock, Flag, ShieldCheck } from "lucide-react";

interface AcriProgressRailProps {
  currentIndex: number;
  totalItems: number;
  timeRemainingSeconds: number;
  flaggedCount: number;
  isFlaggedCurrent: boolean;
  onToggleFlagCurrent: () => void;
  mode: "practice" | "certified";
}

export function AcriProgressRail({
  currentIndex,
  totalItems,
  timeRemainingSeconds,
  flaggedCount,
  isFlaggedCurrent,
  onToggleFlagCurrent,
  mode,
}: AcriProgressRailProps) {
  const percent = Math.round(((currentIndex + 1) / totalItems) * 100);

  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <aside className="w-full lg:w-56 xl:w-60 border-t lg:border-t-0 lg:border-l border-stone-200 bg-[#FAF8F5] p-4 lg:p-5 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Progress Box */}
        <div>
          <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-stone-500 mb-2">
            Progress
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-sans text-2xl font-extrabold text-[#0B1325]">{percent}%</span>
            <span className="font-mono text-xs text-stone-500">
              {currentIndex + 1} / {totalItems}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Time Left Box */}
        <div className="rounded-xl border border-stone-200 bg-white tone-light p-3.5 shadow-2xs">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-stone-500" />
            <span>Time Remaining</span>
          </div>
          <div className="font-mono text-2xl font-extrabold text-[#0B1325] tracking-tight">
            {timeFormatted}
          </div>
          <div className="text-[10px] text-stone-400 mt-1">
            {mode === "certified" ? "Timed exam battery" : "Untimed practice mode"}
          </div>
        </div>

        {/* Flag Review Action */}
        <div>
          <button
            type="button"
            onClick={onToggleFlagCurrent}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              isFlaggedCurrent
                ? "border-amber-400 bg-amber-50 text-amber-900"
                : "border-stone-300 bg-white tone-light text-stone-700 hover:bg-stone-50"
            }`}
          >
            <Flag
              className={`h-3.5 w-3.5 ${
                isFlaggedCurrent ? "fill-amber-500 text-amber-500" : "text-stone-400"
              }`}
            />
            <span>{isFlaggedCurrent ? "Unflag Question" : "Flag for Review"}</span>
          </button>
          {flaggedCount > 0 && (
            <div className="text-[10px] text-amber-800 font-medium text-center mt-1.5">
              {flaggedCount} question{flaggedCount > 1 ? "s" : ""} flagged
            </div>
          )}
        </div>
      </div>

      {/* Security Status Indicator */}
      <div className="mt-8 pt-4 border-t border-stone-200/80 flex items-center gap-2 text-[10px] text-stone-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
        <span>Controlled Assessment Protocol · Tamper-Monitored</span>
      </div>
    </aside>
  );
}
