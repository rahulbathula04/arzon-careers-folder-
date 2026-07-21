/**
 * ReportFreshnessBadge — small chip showing when the report's source
 * catalogue was last verified. Data comes from computeReportFreshness().
 */
import { CalendarCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { computeReportFreshness } from "@/data/industry/sources";
import { REPORT_TONES } from "./reportTones";

export function ReportFreshnessBadge({ className }: { className?: string }) {
  const f = computeReportFreshness();
  return (
    <span
      title={`Report data verified from ${f.count} live sources; refreshed monthly.`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70",
        className,
      )}
    >
      <CalendarCheck2 className={`h-3 w-3 ${REPORT_TONES.secondary.iconFill}`} aria-hidden />
      Data verified · {f.label}
      <span className="text-white/40">· {f.count} sources</span>
    </span>
  );
}

export default ReportFreshnessBadge;
