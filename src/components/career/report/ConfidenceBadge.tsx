/**
 * ConfidenceBadge — three-state chip driven by data-volume signals:
 *   - High: >=3 sources or >=50 JDs backing the claim
 *   - Medium: 1-2 sources or 10-49 JDs
 *   - Directional: single reference, no live scrape
 * Colour tokens routed through `reportTones.ts` to pass the accent gate.
 */
import { ShieldCheck, ShieldQuestion, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { REPORT_TONES } from "./reportTones";
import { useReportState } from "./ReportStateContext";

export type ConfidenceLevel = "high" | "medium" | "directional";

export function confidenceFrom({
  sources = 0,
  jdCount = 0,
}: {
  sources?: number;
  jdCount?: number;
}): ConfidenceLevel {
  if (sources >= 3 || jdCount >= 50) return "high";
  if (sources >= 1 || jdCount >= 10) return "medium";
  return "directional";
}

const LABEL: Record<ConfidenceLevel, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  directional: "Directional",
};

const TONE: Record<ConfidenceLevel, keyof typeof REPORT_TONES> = {
  high: "secondary",
  medium: "primary",
  directional: "warn",
};

const ICON: Record<ConfidenceLevel, React.ComponentType<{ className?: string }>> = {
  high: ShieldCheck,
  medium: ShieldQuestion,
  directional: Compass,
};

export function ConfidenceBadge({
  level,
  detail,
  className,
  sourceIds,
}: {
  level: ConfidenceLevel;
  detail?: string;
  className?: string;
  sourceIds?: string[];
}) {
  const t = REPORT_TONES[TONE[level]];
  const Icon = ICON[level];
  const state = useReportState();
  return (
    <button
      type="button"
      onClick={() =>
        state.openEvidence({
          ids: sourceIds ?? [],
          title: "How this confidence is calculated",
          level,
          rationale: detail,
        })
      }
      title={detail ?? "Confidence is driven by the number and freshness of underlying sources."}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110",
        t.chipBorder,
        t.chipBg,
        t.chipText,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {LABEL[level]}
    </button>
  );
}

export default ConfidenceBadge;
