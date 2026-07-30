/**
 * SourceTag - inline chip that resolves a source id from
 * `industry/sources.ts` and renders publisher · as-of. If the id is
 * missing we render an honest "sourcing in progress" chip rather than
 * invent an attribution.
 *
 * The chip is a link to the source URL (opens in a new tab, rel=nofollow).
 * All colouring routes through `reportTones.ts` so this file passes the
 * report accent-token gate.
 */
import { ExternalLink, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOURCES } from "@/data/industry/sources";
import { REPORT_TONES, type ReportTone } from "./reportTones";
import { useReportState } from "./ReportStateContext";

export function SourceTag({
  id,
  tone = "neutral",
  className,
}: {
  id: string;
  tone?: ReportTone;
  className?: string;
}) {
  const src = SOURCES[id];
  const t = REPORT_TONES[tone];
  const state = useReportState();
  if (!src) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45",
          className,
        )}
        title="Source catalogue entry missing - refreshed monthly."
      >
        <FileQuestion className="h-3 w-3" aria-hidden />
        Sourcing in progress
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => state.openEvidence({ ids: [id], title: `Evidence · ${src.publisher}` })}
      title={`${src.label} - ${src.publisher}, as of ${src.asOf}`}
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] transition hover:brightness-110",
        t.chipBorder,
        t.chipBg,
        t.chipText,
        className,
      )}
    >
      <span className="truncate">
        Source · {src.publisher} · {src.asOf}
      </span>
      <ExternalLink className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
    </button>
  );
}

export function SourceTagRow({
  ids,
  tone = "neutral",
  className,
}: {
  ids: string[];
  tone?: ReportTone;
  className?: string;
}) {
  const state = useReportState();
  if (!ids.length) {
    return <SourceTag id="__missing__" tone={tone} className={className} />;
  }
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {ids.map((id) => (
        <SourceTag key={id} id={id} tone={tone} />
      ))}
      {ids.length > 1 ? (
        <button
          type="button"
          onClick={() => state.openEvidence({ ids, title: "All sources for this claim" })}
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 hover:text-white hover:border-white/25"
        >
          Explore all {ids.length}
        </button>
      ) : null}
    </div>
  );
}

export default SourceTag;
