import type { LadderStep } from "@/data/industry/types";

export function CareerLadder({ steps }: { steps: LadderStep[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li
          key={s.yrs}
          className="tone-light card-light relative flex flex-col justify-between rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-white)] p-5 shadow-sm transition-all hover:border-[var(--arzon-blue-600)] hover:shadow-md"
        >
          <div>
            <div className="flex items-baseline justify-between border-b border-[var(--arzon-border)]/60 pb-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--arzon-blue-700)]">
                Step {i + 1}
              </span>
              <span className="rounded bg-[var(--arzon-surface-subtle)] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--arzon-ink)] border border-[var(--arzon-border)]">
                {s.yrs}
              </span>
            </div>
            <p className="mt-3 text-base font-bold text-[var(--arzon-ink-strong)] leading-snug">{s.role}</p>
            <p className="mt-1 text-sm font-bold text-[var(--arzon-blue-700)]">{s.payInr}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--arzon-border)]/60">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)] mb-0.5">Prerequisites</span>
            <p className="text-xs text-[var(--arzon-ink-soft)] leading-relaxed">{s.unlocks}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
