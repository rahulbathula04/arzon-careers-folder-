/**
 * EmployerTracker - per-employer apply tracker (status, due date, notes).
 * State lives in ReportStateContext (persists in localStorage).
 */
import { useEffect, useMemo, useRef } from "react";
import {
  AlertTriangle,
  Bell,
  BellOff,
  CalendarClock,
  CheckCircle2,
  Circle,
  Loader2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useReportState, type TrackerStatus } from "./ReportStateContext";
import { REPORT_TONES } from "./reportTones";

const STATUSES: { value: TrackerStatus; label: string; progress: number }[] = [
  { value: "not-started", label: "Not started", progress: 0 },
  { value: "researching", label: "Researching", progress: 20 },
  { value: "applied", label: "Applied", progress: 50 },
  { value: "interview", label: "Interview", progress: 75 },
  { value: "offer", label: "Offer", progress: 100 },
  { value: "rejected", label: "Rejected", progress: 100 },
];

export function EmployerTracker({ employerId }: { employerId: string }) {
  const state = useReportState();
  const entry = state.employerTracker[employerId];
  const status: TrackerStatus = entry?.status ?? "not-started";
  const progress = STATUSES.find((s) => s.value === status)?.progress ?? 0;
  const isRejected = status === "rejected";

  return (
    <div className="rounded-xl glass-panel-deep p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-caption uppercase tracking-[0.16em] text-white/50">
          My application tracker
        </p>
        {entry ? (
          <button
            type="button"
            onClick={() => state.clearTrackerEntry(employerId)}
            className={`inline-flex items-center gap-1 text-caption text-white/40 hover:${REPORT_TONES["ruled-out"].iconFill}`}
          >
            <Trash2 className="h-3 w-3" /> Reset
          </button>
        ) : null}
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
        <select
          value={status}
          onChange={(e) =>
            state.setTrackerEntry(employerId, { status: e.target.value as TrackerStatus })
          }
          className="rounded-full glass-panel-deep px-3 py-1.5 text-body-sm text-white/85"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={entry?.dueDate ?? ""}
          onChange={(e) => state.setTrackerEntry(employerId, { dueDate: e.target.value || null })}
          className="rounded-full glass-panel-deep px-3 py-1.5 text-body-sm text-white/85"
          aria-label="Due date"
        />
      </div>

      <textarea
        value={entry?.notes ?? ""}
        onChange={(e) => state.setTrackerEntry(employerId, { notes: e.target.value })}
        rows={2}
        placeholder="Recruiter name, JD link, next follow-up date…"
        className="mt-2 w-full rounded-xl glass-panel-deep p-2 text-body-sm text-white/85 placeholder:text-white/30"
      />

      {entry?.dueDate ? (
        <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-caption text-white/70">
          <input
            type="checkbox"
            checked={entry?.remind !== false}
            onChange={(e) => state.setTrackerEntry(employerId, { remind: e.target.checked })}
            className="h-3.5 w-3.5 accent-blue-400"
          />
          {entry?.remind !== false ? (
            <Bell className={`h-3.5 w-3.5 ${REPORT_TONES.primary.iconFill}`} aria-hidden />
          ) : (
            <BellOff className="h-3.5 w-3.5 text-white/40" aria-hidden />
          )}
          Remind me on the report when this is due
        </label>
      ) : null}

      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full transition-all ${
              isRejected
                ? REPORT_TONES["ruled-out"].chipBg
                : status === "offer"
                  ? REPORT_TONES.secondary.chipBg
                  : REPORT_TONES.primary.chipBg
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-caption tabular-nums text-white/60">{progress}%</span>
        {status === "offer" ? (
          <CheckCircle2 className={`h-3.5 w-3.5 ${REPORT_TONES.secondary.iconFill}`} aria-hidden />
        ) : status === "applied" || status === "interview" ? (
          <Loader2 className={`h-3.5 w-3.5 ${REPORT_TONES.primary.iconFill}`} aria-hidden />
        ) : (
          <Circle className="h-3.5 w-3.5 text-white/40" aria-hidden />
        )}
      </div>
    </div>
  );
}

type SummaryFilter =
  | "all"
  | "not-started"
  | "in-progress"
  | "submitted"
  | "follow-up"
  | "offer"
  | "rejected";

const STATUS_TO_FILTER: Record<TrackerStatus, Exclude<SummaryFilter, "all">> = {
  "not-started": "not-started",
  researching: "in-progress",
  applied: "submitted",
  interview: "follow-up",
  offer: "offer",
  rejected: "rejected",
};

const FILTER_LABEL: Record<Exclude<SummaryFilter, "all">, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  submitted: "Submitted",
  "follow-up": "Follow-up",
  offer: "Offer",
  rejected: "Rejected",
};

export function ApplicationsSummary({
  employerIds,
  activeFilter = "all",
  onFilterChange,
}: {
  employerIds: string[];
  activeFilter?: SummaryFilter;
  onFilterChange?: (next: SummaryFilter) => void;
}) {
  const state = useReportState();
  const entries = employerIds
    .map((id) => ({ id, entry: state.employerTracker[id] }))
    .filter((r) => r.entry);
  if (entries.length === 0) return null;

  const counts: Record<Exclude<SummaryFilter, "all">, number> = {
    "not-started": 0,
    "in-progress": 0,
    submitted: 0,
    "follow-up": 0,
    offer: 0,
    rejected: 0,
  };
  for (const { entry } of entries) counts[STATUS_TO_FILTER[entry!.status]] += 1;

  const upcoming = entries
    .filter((r) => r.entry?.dueDate)
    .sort((a, b) => (a.entry!.dueDate! < b.entry!.dueDate! ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="rounded-2xl glass-panel-deep p-4">
      <p className="font-mono text-caption uppercase tracking-[0.16em] text-white/50">
        My applications · {entries.length} tracked
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(Object.keys(counts) as Exclude<SummaryFilter, "all">[]).map((k) => {
          if (counts[k] === 0) return null;
          const active = activeFilter === k;
          const label = FILTER_LABEL[k];
          const cls = `rounded-full border px-2.5 py-0.5 font-mono text-caption uppercase tracking-wider transition ${
            active
              ? "border-white/30 bg-white/15 text-white"
              : "border-white/10 bg-white/[0.03] text-white/75 hover:border-white/25 hover:text-white"
          }`;
          if (!onFilterChange) {
            return (
              <span key={k} className={cls}>
                {label} · <span className="tabular-nums text-white">{counts[k]}</span>
              </span>
            );
          }
          return (
            <button
              key={k}
              type="button"
              onClick={() => onFilterChange(active ? "all" : k)}
              aria-pressed={active}
              className={cls}
            >
              {label} · <span className="tabular-nums text-white">{counts[k]}</span>
            </button>
          );
        })}
      </div>
      {upcoming.length > 0 && (
        <div className="mt-3">
          <p className="font-mono text-caption uppercase tracking-[0.14em] text-white/50">
            Next due
          </p>
          <ul className="mt-1 space-y-1 text-body-sm text-white/80">
            {upcoming.map(({ id, entry }) => (
              <li key={id} className="flex justify-between gap-3">
                <span className="truncate">{id}</span>
                <span className="font-mono tabular-nums text-white/60">{entry!.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EmployerTracker;

/**
 * DueDateReminders - surfaces overdue and due-today employer applications
 * (where the reader has opted in to reminders) as an in-report banner, and
 * fires a one-time sonner toast on first mount per session so it can act
 * like an on-screen notification.
 */
function todayKey(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function DueDateReminders({ employerIds }: { employerIds: string[] }) {
  const state = useReportState();
  const today = todayKey();

  const { overdue, dueToday } = useMemo(() => {
    const overdue: { id: string; date: string }[] = [];
    const dueToday: { id: string; date: string }[] = [];
    for (const id of employerIds) {
      const entry = state.employerTracker[id];
      if (!entry?.dueDate) continue;
      if (entry.remind === false) continue;
      // Skip if this application is already terminal.
      if (entry.status === "offer" || entry.status === "rejected") continue;
      if (entry.dueDate < today) overdue.push({ id, date: entry.dueDate });
      else if (entry.dueDate === today) dueToday.push({ id, date: entry.dueDate });
    }
    overdue.sort((a, b) => (a.date < b.date ? -1 : 1));
    dueToday.sort((a, b) => (a.id < b.id ? -1 : 1));
    return { overdue, dueToday };
  }, [employerIds, state.employerTracker, today]);

  const total = overdue.length + dueToday.length;
  const toastedRef = useRef(false);

  useEffect(() => {
    if (toastedRef.current || total === 0) return;
    toastedRef.current = true;
    const parts: string[] = [];
    if (overdue.length) parts.push(`${overdue.length} overdue`);
    if (dueToday.length) parts.push(`${dueToday.length} due today`);
    toast.warning("Application follow-ups need attention", {
      description: parts.join(" · "),
      duration: 6000,
    });
  }, [total, overdue.length, dueToday.length]);

  if (total === 0) return null;

  return (
    <div
      role="status"
      className={`report-print-hide flex flex-wrap items-start gap-3 rounded-2xl border p-3 ${REPORT_TONES.warn.chipBorder} ${REPORT_TONES.warn.chipBg}`}
    >
      <AlertTriangle
        className={`mt-0.5 h-4 w-4 shrink-0 ${REPORT_TONES.warn.iconFill}`}
        aria-hidden
      />
      <div className="min-w-0 flex-1 space-y-1">
        <p
          className={`font-mono text-caption uppercase tracking-[0.16em] ${REPORT_TONES.warn.chipText}`}
        >
          Follow-up reminders · {total}
        </p>
        <ul className="text-body-sm text-white/90">
          {overdue.map(({ id, date }) => (
            <li key={`o-${id}`} className="flex items-center justify-between gap-3">
              <span className="truncate">
                <span className={REPORT_TONES.warn.chipText}>Overdue</span> · {id}
              </span>
              <span className="font-mono tabular-nums text-white/60">{date}</span>
            </li>
          ))}
          {dueToday.map(({ id, date }) => (
            <li key={`t-${id}`} className="flex items-center justify-between gap-3">
              <span className="truncate inline-flex items-center gap-1">
                <CalendarClock className="h-3 w-3 text-white/50" aria-hidden />
                Due today · {id}
              </span>
              <span className="font-mono tabular-nums text-white/60">{date}</span>
            </li>
          ))}
        </ul>
        <p className="text-caption text-white/60">
          Turn off individual reminders inside each employer's tracker.
        </p>
      </div>
    </div>
  );
}
