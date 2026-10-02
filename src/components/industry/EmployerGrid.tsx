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
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--arzon-blue-600)]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--arzon-ink-soft)]">
              {tier}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {grouped[tier].map((e) => (
              <div
                key={e.name}
                className="tone-light card-light rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-white)] p-4 shadow-sm transition-all hover:border-[var(--arzon-blue-600)] hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-bold text-[var(--arzon-ink-strong)] leading-snug">{e.name}</p>
                  <span className="shrink-0 rounded-full bg-[var(--arzon-surface-blue)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--arzon-blue-700)]">
                    Active Hiring
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-[var(--arzon-ink-muted)]">{e.cities.join(" · ")}</p>
                {e.typicalBand && (
                  <div className="mt-3 flex items-center gap-1.5 border-t border-[var(--arzon-border)]/60 pt-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">Entry Band:</span>
                    <span className="text-xs font-bold text-[var(--arzon-teal-700)]">{e.typicalBand}</span>
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
