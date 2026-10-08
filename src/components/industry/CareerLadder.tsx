import type { LadderStep } from "@/data/industry/types";

export function CareerLadder({ steps }: { steps: LadderStep[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.yrs} className="relative rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-micro uppercase tracking-[0.2em] text-white/60">
              Step {i + 1}
            </span>
            <span className="font-mono text-micro font-semibold text-gold">{s.yrs}</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">{s.role}</p>
          <p className="mt-1 text-meta text-white/70">{s.payInr}</p>
          <p className="mt-2 text-micro text-white/55">Unlock: {s.unlocks}</p>
        </li>
      ))}
    </ol>
  );
}
