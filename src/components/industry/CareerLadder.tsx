import type { LadderStep } from "@/data/industry/types";

export function CareerLadder({ steps }: { steps: LadderStep[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li
          key={s.yrs}
          className="relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
        >
          <div>
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                Step {i + 1}
              </span>
              <span className="rounded bg-amber-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-800 ring-1 ring-amber-200">
                {s.yrs}
              </span>
            </div>
            <p className="mt-3 text-base font-bold text-slate-900 leading-snug">{s.role}</p>
            <p className="mt-1 text-sm font-bold text-blue-700">{s.payInr}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Career Unlock</span>
            <p className="text-xs text-slate-600 leading-relaxed">{s.unlocks}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
