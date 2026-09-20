import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

export interface StageInfo {
  name: string;
  category: string;
  isComplete: boolean;
  isActive: boolean;
}

interface AcriStageRailProps {
  stages: StageInfo[];
  currentCategory: string;
  onSelectCategory?: (category: string) => void;
}

export function AcriStageRail({ stages, currentCategory }: AcriStageRailProps) {
  return (
    <aside className="w-full lg:w-56 xl:w-64 border-b lg:border-b-0 lg:border-r border-stone-200 bg-[#FAF8F5] p-4 lg:p-5 flex flex-col justify-between">
      <div>
        <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-stone-500 mb-4">
          Assessment Stages
        </div>

        <nav className="space-y-1 text-xs">
          {stages.map((stage) => {
            const isActive = stage.category === currentCategory;

            return (
              <div
                key={stage.category}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#0B1325] text-white font-bold shadow-xs"
                    : stage.isComplete
                    ? "text-stone-700 hover:bg-stone-200/60 font-medium"
                    : "text-stone-500 hover:bg-stone-200/40"
                }`}
              >
                {stage.isComplete ? (
                  <CheckCircle2
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  />
                ) : isActive ? (
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 shrink-0 ml-1 mr-1" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-stone-400 shrink-0 ml-0.5 mr-0.5" />
                )}

                <span className="truncate">{stage.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Regulatory Badge */}
      <div className="mt-8 pt-4 border-t border-stone-200/80 text-[10px] text-stone-500 space-y-1">
        <div className="font-bold text-stone-700">ACRI-PV Standard v1.0</div>
        <div>Aligned with EMA GVP VI &amp; ICH E2B(R3)</div>
      </div>
    </aside>
  );
}
