import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Users2, Clock, Lock, MessageCircle } from "lucide-react";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { useQuery } from "@tanstack/react-query";
import { getCohortStatus, ACTIVE_COHORT_ID } from "@/lib/cohort.functions";
import { supabase } from "@/integrations/supabase/client";
import { trackCohort } from "@/lib/cohortAnalytics";

const BATCH_START_ISO_FALLBACK = "2026-07-30T09:00:00+05:30";
const BATCH_START_LABEL_FALLBACK = "30 July 2026";
const SEATS_CAP_FALLBACK = 60;
const SEATS_TAKEN_FALLBACK = 57;

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1_000);
  return { days, hours, minutes, seconds, done: ms === 0 };
}

const ZERO_DIFF = { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

function formatLockLabel(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
      timeZoneName: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function LimitedSeatsCountdown() {
  const q = useQuery({
    queryKey: ["cohort-status", ACTIVE_COHORT_ID],
    queryFn: () => getCohortStatus({ data: { id: ACTIVE_COHORT_ID } }),
    staleTime: 15_000,
    refetchOnWindowFocus: true,
    refetchInterval: 60_000,
  });

  useEffect(() => {
    const ch = supabase
      .channel(`cohort:${ACTIVE_COHORT_ID}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "cohorts",
          filter: `id=eq.${ACTIVE_COHORT_ID}`,
        },
        () => void q.refetch(),
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(ch);
    };
  }, [q]);

  const status = q.data;
  const seatsCap = status?.seatsCap ?? SEATS_CAP_FALLBACK;
  const seatsTaken = status?.seatsTaken ?? SEATS_TAKEN_FALLBACK;
  const seatsLeft = status ? status.seatsLeft : Math.max(0, seatsCap - seatsTaken);
  const lockAtIso = status?.lockAt ?? BATCH_START_ISO_FALLBACK;
  const label = status?.displayLabel ?? BATCH_START_LABEL_FALLBACK;
  const locked = !!status?.effectiveLocked;

  const target = new Date(lockAtIso).getTime();
  const [t, setT] = useState(ZERO_DIFF);

  const [didFireView, setDidFireView] = useState(false);
  useEffect(() => {
    if (!status || didFireView) return;
    trackCohort("seat_availability_viewed", {
      cohort_id: status.id,
      seats_left: status.seatsLeft,
      seats_cap: status.seatsCap,
      effective_locked: status.effectiveLocked,
    });
    setDidFireView(true);
  }, [status, didFireView]);

  const [didFireCountdown, setDidFireCountdown] = useState(false);
  useEffect(() => {
    if (didFireCountdown || locked) return;
    const msLeft = Math.max(0, target - Date.now());
    if (msLeft > 0 && msLeft <= 24 * 3_600_000) {
      trackCohort("lock_countdown_visible", {
        cohort_id: status?.id ?? ACTIVE_COHORT_ID,
        ms_to_lock: msLeft,
      });
      setDidFireCountdown(true);
    }
  }, [t, target, locked, status?.id, didFireCountdown]);

  useEffect(() => {
    setT(diff(target));
    if (isReducedMotion()) return;
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const fillPct = Math.min(100, Math.round((seatsTaken / Math.max(1, seatsCap)) * 100));

  return (
    <section id="limited-seats" className="editorial-page-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Editorial Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
            {locked ? "Cohort Locked" : "Cohort Closing Soon"}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">
            {locked ? "This cohort is now full —" : "Next batch begins"}{" "}
            <span className="italic text-[#8A6D1F]">{label}</span>
          </h2>
          <p className="text-sm text-[#5B6472] max-w-xl mx-auto">
            We cap every cohort at {seatsCap} seats. Applications close once seats are full or at{" "}
            {formatLockLabel(lockAtIso)}, whichever comes first.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          {/* Countdown Card */}
          <div className="editorial-card p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#707C90]">
              <Clock className="h-4 w-4 text-[#1D4ED8]" />
              <span>{locked ? "Cohort locked" : "TIME UNTIL LOCK"}</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {[
                { v: t.days, l: "Days" },
                { v: t.hours, l: "Hours" },
                { v: t.minutes, l: "Min" },
                { v: t.seconds, l: "Sec" },
              ].map((u) => (
                <div key={u.l} className="editorial-stat-tile p-3 text-center">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#151C2E] tabular-nums block">
                    {String(u.v).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#707C90] mt-1 block">
                    {u.l}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5B6472]">
              <CalendarDays className="h-4 w-4 text-[#1D4ED8] shrink-0" />
              <span>Live classes start {label}, 7:30 PM IST · Lock at {formatLockLabel(lockAtIso)}</span>
            </div>
          </div>

          {/* Capacity & Urgency Bar Card */}
          <div className="editorial-card p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#707C90]">
                  <Users2 className="h-4 w-4 text-[#1D4ED8]" />
                  <span>COHORT CAPACITY</span>
                </div>
                {locked ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
                ) : (
                  <span className="editorial-badge-warning px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    Closing soon
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#151C2E]">{seatsLeft}</span>
                <span className="text-xs text-[#5B6472]">of {seatsCap} seats remaining</span>
              </div>

              {/* Urgency Amber-Orange Gradient Bar */}
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    locked ? "bg-rose-600" : "editorial-urgency-bar"
                  }`}
                  style={{ width: `${fillPct}%` }}
                />
              </div>

              <p className="mt-3 text-xs text-[#5B6472] leading-relaxed">
                {locked
                  ? `All ${seatsCap} seats are taken. Join the waitlist for the upcoming batch.`
                  : `${seatsTaken} confirmed enrolments. Only ${seatsLeft} seats left before batch caps.`}
              </p>
            </div>

            {locked ? (
              <Link
                to="/waitlist"
                className="editorial-btn-blue text-xs font-bold h-11 w-full flex items-center justify-center gap-2 text-white"
              >
                <span>Join Cohort Waitlist</span>
                <MessageCircle className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                to="/apply"
                className="editorial-btn-blue text-xs font-bold h-11 w-full flex items-center justify-center gap-2 text-white"
              >
                <span>Apply for this cohort</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
