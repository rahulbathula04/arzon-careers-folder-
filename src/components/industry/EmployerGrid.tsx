import type { Employer } from "@/data/industry/types";

export function EmployerGrid({ employers }: { employers: Employer[] }) {
  if (!employers.length) return null;
  const grouped = employers.reduce<Record<string, Employer[]>>((acc, e) => {
    (acc[e.tier] ||= []).push(e);
    return acc;
  }, {});
  const tiers = Object.keys(grouped);
  return (
    <div className="space-y-6">
      {tiers.map((tier) => (
        <div key={tier}>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
              {tier}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {grouped[tier].map((e) => (
              <div
                key={e.name}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-bold text-slate-900 leading-snug">{e.name}</p>
                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                    Active Hiring
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500">{e.cities.join(" · ")}</p>
                {e.typicalBand && (
                  <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Entry Band:</span>
                    <span className="text-xs font-bold text-emerald-700">{e.typicalBand}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
