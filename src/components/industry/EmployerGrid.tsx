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
          <p className="mb-2 font-mono text-micro uppercase tracking-[0.18em] text-white/60">
            {tier}
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {grouped[tier].map((e) => (
              <div key={e.name} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                <p className="text-sm font-semibold text-white">{e.name}</p>
                <p className="text-micro text-white/55">{e.cities.join(" · ")}</p>
                {e.typicalBand && <p className="mt-1 text-meta text-white/75">{e.typicalBand}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
