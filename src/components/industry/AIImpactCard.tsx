import type { AIRisk } from "@/data/industry/types";

const TONES: Record<AIRisk, { label: string; badge: string; verdict: string }> = {
  augmented: {
    label: "Augmented by AI",
    badge: "bg-amber-100 text-amber-900 border border-amber-300",
    verdict: "AI changes the work, not the headcount.",
  },
  audit: {
    label: "AI Audit Role",
    badge: "bg-blue-100 text-blue-900 border border-blue-300",
    verdict: "Demand grows because someone has to verify AI output.",
  },
  resistant: {
    label: "AI Resistant",
    badge: "bg-emerald-100 text-emerald-900 border border-emerald-300",
    verdict: "Hands-on or compliance work AI cannot legally replace.",
  },
};

export function AIImpactCard({ risk, note }: { risk: AIRisk; note: string }) {
  const t = TONES[risk];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${t.badge}`}>
          {t.label}
        </span>
        <p className="text-base font-bold text-slate-900">{t.verdict}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{note}</p>
    </div>
  );
}
