import type { AbroadMarket } from "@/data/industry/types";

export function AbroadStrip({ markets }: { markets: AbroadMarket[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {markets.map((m) => (
        <div key={m.country} className="tone-light card-light rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-white)] p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--arzon-border)]/60 pb-3">
            <p className="text-base font-bold text-[var(--arzon-ink-strong)]">
              <span className="mr-2 text-xl">{m.flag}</span>
              {m.country}
            </p>
            <span className="rounded bg-[var(--arzon-surface-subtle)] px-2.5 py-1 text-xs font-bold text-[var(--arzon-ink)] border border-[var(--arzon-border)]">
              {m.payInrEquiv}
            </span>
          </div>
          <p className="mt-3 text-xs text-[var(--arzon-ink)]">
            <span className="font-bold text-[var(--arzon-ink-strong)]">Eligibility:</span> {m.eligibility}
          </p>
          <p className="mt-1.5 text-xs text-[var(--arzon-ink-soft)] leading-relaxed">{m.note}</p>
        </div>
      ))}
    </div>
  );
}
