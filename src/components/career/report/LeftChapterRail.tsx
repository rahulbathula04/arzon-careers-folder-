import { useMemo } from "react";
import { Check, Bookmark } from "lucide-react";
import type { RailChapter } from "./SectionRail";
import { useReportState } from "./ReportStateContext";

export interface RailGroup {
  label: string;
  chapterIds: string[];
}

export function MobileChapterStrip({
  chapters,
  activeId,
  onJump,
}: {
  chapters: RailChapter[];
  activeId: string | null;
  onJump?: (id: string) => void;
}) {
  const state = useReportState();

  const handleClick = (id: string) => {
    onJump?.(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="report-print-hide lg:hidden overflow-x-auto no-scrollbar py-2.5 -mx-4 px-4 flex items-center gap-2 border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl sticky top-14 z-20">
      {chapters.map((c) => {
        const isActive = activeId === c.id;
        const isDone = state.completed.includes(c.id);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => handleClick(c.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive
                ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20"
                : isDone
                  ? "bg-white/10 text-white border border-white/15"
                  : "bg-white/5 text-slate-400 border border-white/10"
            }`}
          >
            <span className="font-mono text-[10px] opacity-75">{String(c.number).padStart(2, "0")}</span>
            <span>{c.label}</span>
            {isDone && !isActive && <Check className="h-3 w-3 text-emerald-400" />}
          </button>
        );
      })}
    </div>
  );
}

export function LeftChapterRail({
  chapters,
  groups,
  activeId,
  onJump,
}: {
  chapters: RailChapter[];
  groups: RailGroup[];
  activeId: string | null;
  onJump?: (id: string) => void;
}) {
  const state = useReportState();
  const total = chapters.length;
  const completedCount = useMemo(
    () => chapters.filter((c) => state.completed.includes(c.id)).length,
    [chapters, state],
  );
  const pct = total ? Math.round((completedCount / total) * 100) : 0;

  const byId = useMemo(() => {
    const m = new Map<string, RailChapter>();
    for (const c of chapters) m.set(c.id, c);
    return m;
  }, [chapters]);

  const handleClick = (id: string) => {
    onJump?.(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Report chapters" className="report-print-hide hidden lg:block sticky top-20">
      <div className="rounded-2xl border border-white/10 bg-[#121723] p-5 space-y-3 shadow-2xl">
        <div className="flex items-end justify-between gap-3">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Report Progress
          </p>
          <p className="font-serif text-lg font-bold text-white tabular-nums">
            {completedCount} <span className="text-slate-400 text-sm">/ {total}</span>
          </p>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#2563EB] shadow-sm transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>

        <p className="text-xs text-slate-300">
          {pct === 0
            ? "Start with the Verdict — 30 seconds."
            : pct < 50
              ? "Good progress. Key market chapters below."
              : "Almost complete — 4-week action plan unlocks next."}
        </p>
      </div>

      <ol className="mt-6 space-y-6">
        {groups.map((group) => (
          <li key={group.label} className="space-y-2">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 px-2">
              {group.label}
            </p>
            <ol className="space-y-1">
              {group.chapterIds.map((id) => {
                const c = byId.get(id);
                if (!c) return null;
                const isActive = activeId === id;
                const isDone = state.completed.includes(id);
                const isBookmarked = state.isBookmarked(id);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => handleClick(id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all font-medium text-left ${
                        isActive
                          ? "bg-[#2563EB] text-white font-bold shadow-lg shadow-blue-600/30"
                          : isDone
                            ? "bg-[#121723] text-white hover:bg-white/10 border border-white/10"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] opacity-75">{String(c.number).padStart(2, "0")}</span>
                        <span className="truncate">{c.label}</span>
                      </span>
                      {isDone && !isActive && <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                      {isBookmarked && <Bookmark className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </nav>
  );
}
