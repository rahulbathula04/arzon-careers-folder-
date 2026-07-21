import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { ArrowRight, CalendarDays, Users2, Clock, Lock, MessageCircle } from "lucide-react";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { CTAButton } from "./CTAButton";
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

// SSR-safe placeholder — identical output on server and first client render.
// The real value is populated inside a useEffect on mount, which never runs
// during SSR, so hydration matches.
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

/**
 * Backend-driven cohort urgency strip. Reads `cohorts` via getCohortStatus
 * and subscribes to row updates so seats/lock state can never be bypassed
 * by a refresh. Falls back to the hard-coded labels until the query resolves.
 */
export function LimitedSeatsCountdown() {
  const q = useQuery({
    queryKey: ["cohort-status", ACTIVE_COHORT_ID],
    queryFn: () => getCohortStatus({ data: { id: ACTIVE_COHORT_ID } }),
    staleTime: 15_000,
    refetchOnWindowFocus: true,
    refetchInterval: 60_000,
  });

  // Realtime: any UPDATE on this row → refetch.
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
  const startsAtIso = status?.startsAt ?? BATCH_START_ISO_FALLBACK;
  const lockAtIso = status?.lockAt ?? BATCH_START_ISO_FALLBACK;
  const label = status?.displayLabel ?? BATCH_START_LABEL_FALLBACK;
  const locked = !!status?.effectiveLocked;

  const target = new Date(lockAtIso).getTime();
  const [t, setT] = useState(ZERO_DIFF);

  // Fire seat_availability_viewed once when the live status resolves.
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

  // Fire lock_countdown_visible exactly once when crossing the <=24h window.
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
    // Populate the real countdown immediately on mount so the placeholder
    // is only visible for one frame.
    setT(diff(target));
    if (isReducedMotion()) return;
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const fillPct = Math.min(100, Math.round((seatsTaken / Math.max(1, seatsCap)) * 100));

  return (
    <Section id="limited-seats" size="lg">
      <SectionHeader
        eyebrow={locked ? "Cohort locked" : "Cohort closes soon"}
        title={
          <>
            {locked ? "This cohort is now full —" : "Next batch begins"}{" "}
            <em className="italic-accent not-italic">{label}</em>
          </>
        }
        sub={
          <>
            We cap every cohort at {seatsCap} seats. Applications close once seats are full or at{" "}
            {formatLockLabel(lockAtIso)}, whichever comes first.
          </>
        }
      />

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:gap-5 md:grid-cols-[1.2fr_1fr]">
        {/* Countdown */}
        <div className="card-light rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.22em] text-primary">
            <Clock className="h-3.5 w-3.5" /> {locked ? "Cohort locked" : "Time until lock"}
          </div>
          <div
            className="mt-4 grid grid-cols-4 gap-2 sm:gap-3"
            role="timer"
            aria-live="polite"
            aria-label={
              locked
                ? "Cohort locked"
                : `${t.days} days, ${t.hours} hours, ${t.minutes} minutes, ${t.seconds} seconds until cohort locks`
            }
          >
            {[
              { v: t.days, l: "Days" },
              { v: t.hours, l: "Hours" },
              { v: t.minutes, l: "Min" },
              { v: t.seconds, l: "Sec" },
            ].map((u) => (
              <div
                key={u.l}
                className={`rounded-xl px-2 py-3 text-center ring-1 ${locked ? "bg-muted ring-border opacity-60" : "bg-gradient-to-br from-slate-50 to-slate-100 ring-border"}`}
              >
                <div className="font-display text-h1 font-bold leading-none text-ink tabular-nums">
                  {String(u.v).padStart(2, "0")}
                </div>
                <div className="mt-1 font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
                  {u.l}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-meta text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            Live classes start {label}, 7:30 PM IST · lock at {formatLockLabel(lockAtIso)}
          </div>
        </div>

        {/* Seats meter */}
        <div className="card-light rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.22em] text-primary">
            <Users2 className="h-3.5 w-3.5" /> Cohort capacity
          </div>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-h2 font-bold text-ink">{seatsLeft}</span>
            <span className="text-sm text-muted-foreground">of {seatsCap} seats left</span>
            {locked ? (
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 font-mono text-micro uppercase tracking-[0.22em] text-rose-700">
                <Lock className="h-3 w-3" /> Locked
              </span>
            ) : (
              <span className="ml-1 inline-flex items-center rounded-full bg-[#F59E0B]/15 px-2 py-0.5 font-mono text-micro uppercase tracking-[0.22em] text-[#B45309]">
                Closing soon
              </span>
            )}
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-[width] duration-[1200ms] ease-out ${locked ? "bg-rose-500" : "bg-gradient-to-r from-[#F59E0B] to-[#B45309]"}`}
              style={{ width: `${fillPct}%` }}
            />
          </div>
          <p className="mt-3 text-meta leading-relaxed text-muted-foreground">
            {locked
              ? `All ${seatsCap} seats are taken. Join the waitlist for the next batch.`
              : `${seatsTaken} confirmed enrolments. Only ${seatsLeft} seats remain — cohort locks once we hit ${seatsCap}.`}
          </p>
          {locked ? (
            <CTAButton
              asChild
              variant="primary"
              size="md"
              fullBlock
              trailingIcon={<MessageCircle className="h-4 w-4" />}
              className="mt-4"
            >
              <Link
                to="/waitlist"
                aria-label="Cohort locked — open waitlist page"
                data-testid="cohort-locked-cta"
              >
                Cohort locked · Join waitlist
              </Link>
            </CTAButton>
          ) : (
            <CTAButton
              asChild
              variant="primary"
              size="md"
              fullBlock
              glow
              trailingIcon={<ArrowRight className="h-4 w-4" />}
              className="mt-4"
            >
              <Link to="/apply">Apply for this cohort</Link>
            </CTAButton>
          )}
        </div>
      </div>
    </Section>
  );
}
