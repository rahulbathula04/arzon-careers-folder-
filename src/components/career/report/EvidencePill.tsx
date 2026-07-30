import { CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { REPORT_TONES } from "./reportTones";

/**
 * EvidencePill - one line of "your answer → what it signals → delta".
 * Replaces bespoke evidence rows in PrimaryFit + EvidenceLedger.
 */
export function EvidencePill({
  label,
  signal,
  delta,
  tone = "positive",
}: {
  label: string;
  signal?: string;
  delta?: number;
  tone?: "positive" | "watch";
}) {
  const Icon = tone === "watch" ? AlertTriangle : CheckCircle2;
  return (
    <li
      className={cn(
        "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
        tone === "watch"
          ? `${REPORT_TONES.warn.softBorder} ${REPORT_TONES.warn.softBg} ${REPORT_TONES.warn.eyebrow}`
          : "border-white/8 bg-white/[0.025] text-white/85",
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          tone === "watch" ? REPORT_TONES.warn.iconAccent : REPORT_TONES.secondary.iconFill,
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="text-white">{label}</span>
        {signal && <span className="text-white/55"> - signals {signal}</span>}
      </span>
      {typeof delta === "number" && (
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            delta >= 0 ? REPORT_TONES.secondary.iconAccent : REPORT_TONES["ruled-out"].iconAccent,
          )}
        >
          {delta >= 0 ? "+" : ""}
          {delta.toFixed(1)}
        </span>
      )}
    </li>
  );
}

export default EvidencePill;
