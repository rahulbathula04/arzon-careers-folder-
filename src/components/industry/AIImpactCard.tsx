import type { AIRisk } from "@/data/industry/types";

const TONES: Record<AIRisk, { label: string; badge: string; verdict: string }> = {
  augmented: {
    label: "Augmented by AI",
    badge: "bg-[var(--arzon-surface-subtle)] text-[var(--arzon-ink-strong)] border border-[var(--arzon-border)]",
    verdict: "AI changes the work, not the headcount.",
  },
  audit: {
    label: "AI Audit Role",
    badge: "bg-[var(--arzon-surface-blue)] text-[var(--arzon-blue-700)] border border-[var(--arzon-border)]",
    verdict: "Demand grows because someone has to verify AI output.",
  },
  resistant: {
    label: "AI Resistant",
    badge: "bg-[var(--arzon-teal-100)] text-[var(--arzon-teal-700)] border border-[var(--arzon-border)]",
    verdict: "Hands-on or compliance work AI cannot legally replace.",
  },
};

export function AIImpactCard({ risk, note }: { risk: AIRisk; note: string }) {
  const t = TONES[risk];
  return (
    <div className="tone-light card-light rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-white)] p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${t.badge}`}>
          {t.label}
        </span>
        <p className="text-base font-bold text-[var(--arzon-ink-strong)]">{t.verdict}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--arzon-ink-soft)]">{note}</p>
    </div>
  );
}
