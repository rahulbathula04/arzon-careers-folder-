import type { AIRisk } from "@/data/industry/types";

const TONES: Record<AIRisk, { label: string; color: string; verdict: string }> = {
  augmented: {
    label: "Augmented by AI",
    color: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    verdict: "AI changes the work, not the headcount.",
  },
  audit: {
    label: "AI audit role",
    color: "bg-accent-glow/15 text-eyebrow ring-accent-glow/30",
    verdict: "Demand grows because someone has to verify AI output.",
  },
  resistant: {
    label: "AI resistant",
    color: "bg-accent-glow/15 text-eyebrow ring-accent-glow/30",
    verdict: "Hands-on or compliance work AI cannot legally replace.",
  },
};

export function AIImpactCard({ risk, note }: { risk: AIRisk; note: string }) {
  const t = TONES[risk];
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-micro font-semibold ring-1 ${t.color}`}
        >
          {t.label}
        </span>
        <p className="text-sm text-white/85">{t.verdict}</p>
      </div>
      <p className="mt-3 text-sm text-white/75">{note}</p>
    </div>
  );
}
