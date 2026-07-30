import { CalendarClock, Flame, IndianRupee } from "lucide-react";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection } from "@/components/courses/ConversionSection";
import { NEXT_COHORT, SEAT_FEE_AMOUNT } from "@/components/landing/constants";

type Theme = ReturnType<typeof getTrackTheme>;

function daysUntil(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

/** Beat 10 - urgency anchored to the published cohort close date. Honest. */
export function UrgencyBlock({ theme }: { theme: Theme }) {
  const cohort = NEXT_COHORT;
  const daysLeft = daysUntil(cohort.applicationsCloseISO);
  const priceRiseDelta = 2000; // ₹2,000 increment after cohort closes
  const nextFee = SEAT_FEE_AMOUNT + priceRiseDelta;

  return (
    <ConversionSection
      id="urgency"
      step="10"
      eyebrow="The window is finite"
      title={
        <>
          Applications for the{" "}
          <em className="not-italic" style={{ color: theme.hex.from }}>
            {cohort.label} cohort
          </em>{" "}
          close in {daysLeft} days.
        </>
      }
      subtitle={`After ${cohort.applicationsCloseISO.slice(0, 10)}, the seat fee moves to ₹${nextFee.toLocaleString("en-IN")}. We cap each cohort at 30 learners so mentor:learner ratio stays honest.`}
      theme={theme}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: CalendarClock, k: cohort.startsLabel, v: "cohort kick-off" },
          { icon: Flame, k: `${daysLeft} days left`, v: "applications close window" },
          {
            icon: IndianRupee,
            k: `₹${SEAT_FEE_AMOUNT.toLocaleString("en-IN")} → ₹${nextFee.toLocaleString("en-IN")}`,
            v: "seat fee after the close date",
          },
        ].map(({ icon: I, k, v }) => (
          <div
            key={v}
            className="rounded-2xl border p-5 text-center"
            style={{
              background: `linear-gradient(180deg, ${theme.hex.from}18, rgba(15,23,42,0.6))`,
              borderColor: `${theme.hex.from}40`,
            }}
          >
            <I className="mx-auto h-5 w-5" style={{ color: theme.hex.from }} />
            <p className="mt-3 font-display text-lg font-bold" style={{ color: "#F8FAFC" }}>
              {k}
            </p>
            <p className="mt-1 text-meta uppercase tracking-[0.18em]" style={{ color: "#94A3B8" }}>
              {v}
            </p>
          </div>
        ))}
      </div>
    </ConversionSection>
  );
}
