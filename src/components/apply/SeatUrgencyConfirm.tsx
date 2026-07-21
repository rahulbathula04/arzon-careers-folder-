import { useEffect, useState } from "react";
import { Users, Clock, AlertTriangle } from "lucide-react";
import { isReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  /** ISO string for when applications close for this cohort. */
  closesISO: string;
  /** Human label for the cohort start (e.g. "15 May 2026"). */
  startsLabel: string;
  /** Seats remaining in this cohort. */
  seatsLeft: number;
  /** Total seats in the cohort (for the "x of y" framing). */
  cohortSize: number;
  /** Acknowledgement state. Controlled by parent. */
  acknowledged: boolean;
  onAcknowledgeChange: (v: boolean) => void;
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/**
 * Final urgency confirmation surfaced just before the user pays the seat
 * reservation fee. Shows live countdown to applications close + seats
 * remaining, and requires an honest acknowledgement before payment can
 * proceed. Reduced-motion users get a static, hourly-refreshed variant.
 */
export function SeatUrgencyConfirm({
  closesISO,
  startsLabel,
  seatsLeft,
  cohortSize,
  acknowledged,
  onAcknowledgeChange,
}: Props) {
  const target = new Date(closesISO).getTime();
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const reduced = isReducedMotion();
    setNow(Date.now());
    const interval = reduced ? 3_600_000 : 1_000;
    const id = window.setInterval(() => setNow(Date.now()), interval);
    return () => window.clearInterval(id);
  }, []);

  const remaining = Math.max(0, target - now);
  const { days, hours, minutes, seconds } = parts(remaining);
  const closed = remaining === 0;

  const seatPct = Math.max(
    4,
    Math.min(100, Math.round((seatsLeft / Math.max(1, cohortSize)) * 100)),
  );
  const lowSeats = seatsLeft <= Math.ceil(cohortSize * 0.2);

  return (
    <section
      aria-label="Seat reservation urgency"
      className="overflow-hidden rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-amber-700">
            Before you pay · honest status
          </p>
          <h2 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
            Your seat is held while you complete payment.
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Cohort starts {startsLabel}. Applications close in real time, we don't oversell.
          </p>
        </div>
        {lowSeats && !closed ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-100 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-rose-700">
            <AlertTriangle className="h-3 w-3" /> Filling fast
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {/* Seats remaining */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-micro uppercase tracking-wider text-slate-500">
            <Users className="h-3.5 w-3.5 text-amber-600" /> Seats remaining
          </div>
          <p className="mt-2 font-mono text-h3 font-semibold text-slate-900 tabular-nums">
            {seatsLeft}
            <span className="ml-1 text-sm font-normal text-slate-500">of {cohortSize}</span>
          </p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={cohortSize}
            aria-valuenow={seatsLeft}
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
          >
            <div
              className={`h-full rounded-full ${
                lowSeats
                  ? "bg-gradient-to-r from-rose-500 to-amber-500"
                  : "bg-gradient-to-r from-sky-500 to-blue-500"
              }`}
              style={{ width: `${seatPct}%` }}
            />
          </div>
        </div>

        {/* Countdown */}
        <div
          className={`rounded-xl border p-4 ${
            closed ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`flex items-center gap-2 text-micro uppercase tracking-wider ${
              closed ? "text-rose-700" : "text-slate-500"
            }`}
          >
            <Clock className={`h-3.5 w-3.5 ${closed ? "text-rose-600" : "text-amber-600"}`} />
            {closed ? "Applications closed" : "Applications close in"}
          </div>
          {closed ? (
            <p className="mt-2 text-sm font-medium text-rose-800">
              This cohort has closed. Please pick the next cohort in step 2.
            </p>
          ) : (
            <div className="mt-2 flex items-end gap-2 font-mono tabular-nums" aria-live="polite">
              <TimeBlock value={days} label="days" />
              <Sep />
              <TimeBlock value={hours} label="hrs" />
              <Sep />
              <TimeBlock value={minutes} label="min" />
              <Sep />
              <TimeBlock value={seconds} label="sec" muted />
            </div>
          )}
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => onAcknowledgeChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary/40"
        />
        <span className="text-xs leading-relaxed text-slate-700">
          I understand my seat is held only while I complete payment, and that the{" "}
          {seatsLeft <= cohortSize ? `${seatsLeft} remaining` : "remaining"} seat(s) are released
          back to the queue if I close this page.
        </span>
      </label>
    </section>
  );
}

function TimeBlock({ value, label, muted }: { value: number; label: string; muted?: boolean }) {
  return (
    <span className="flex flex-col items-center">
      <span
        className={`text-h3 font-semibold leading-none ${
          muted ? "text-slate-500" : "text-slate-900"
        }`}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-micro uppercase tracking-wider text-slate-500">{label}</span>
    </span>
  );
}

function Sep() {
  return <span className="pb-3 text-lg text-slate-300">:</span>;
}
