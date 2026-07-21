import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Users, Sparkles, MessageCircle, Hourglass, ShieldCheck } from "lucide-react";
import { NEXT_COHORT } from "@/components/landing/constants";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { ResultCard, StatTile } from "@/components/career/cards/primitives";

/**
 * Live programme slugs — the six healthcare tracks that have an actual
 * 12-week cohort running. Anything else is treated as upcoming and routed
 * to the waitlist instead of a course page.
 */
const LIVE_PROGRAMME_SLUGS = new Set<string>([
  "pharmacovigilance",
  "medical-coding",
  "clinical-data-management",
  "regulatory-affairs",
  "clinical-saas",
  "ai-intelligence",
]);

function streamLabelFor(slug: string): string {
  if (
    slug.startsWith("software") ||
    slug.includes("full-stack") ||
    slug.includes("devops") ||
    slug.includes("ml") ||
    slug.includes("ethical")
  )
    return "Engineering";
  if (slug.includes("agri")) return "Agri-tech";
  if (
    slug.includes("business") ||
    slug.includes("sales") ||
    slug.includes("finance") ||
    slug.includes("marketing") ||
    slug.includes("hr")
  )
    return "Business";
  return "this track";
}

export function seatsLeft(closeISO: string, nowMs: number = Date.now()): number {
  const days = Math.max(0, Math.ceil((new Date(closeISO).getTime() - nowMs) / 86400000));
  if (days >= 30) return 24;
  return Math.max(2, 2 + Math.floor(days * 0.73));
}

export function computeCountdown(targetISO: string, nowMs: number) {
  const ms = Math.max(0, new Date(targetISO).getTime() - nowMs);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return { days, hours, minutes, expired: ms === 0 };
}

export function startCountdownTicker(
  onTick: () => void,
  reduced: boolean,
  intervalMs: number = 60_000,
): (() => void) | undefined {
  if (reduced) return undefined;
  const t = setInterval(onTick, intervalMs);
  return () => clearInterval(t);
}

function useCountdown(targetISO: string) {
  // SSR-safe: seed with null so server and first-client render produce the
  // same placeholder ({0,0,0,false}). Populate the real time on mount.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    return startCountdownTicker(() => setNow(Date.now()), isReducedMotion());
  }, []);
  if (now === null) return { days: 0, hours: 0, minutes: 0, expired: false };
  return computeCountdown(targetISO, now);
}

export function PersonalisedNextStep({
  trackSlug,
  trackTitle,
}: {
  trackSlug: string;
  trackTitle: string;
}) {
  const isLive = LIVE_PROGRAMME_SLUGS.has(trackSlug);
  const cohort = NEXT_COHORT;
  const { days, hours, minutes, expired } = useCountdown(cohort.applicationsCloseISO);
  const seats = seatsLeft(cohort.applicationsCloseISO);

  if (isLive) {
    const closeStr = expired ? "Closed" : days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`;
    return (
      <ResultCard
        tone="gold"
        icon={<Sparkles className="h-3.5 w-3.5" />}
        eyebrow={`Live cohort · ${cohort.label}`}
        title={
          <>
            Reserve your seat in <span className="text-primary">{trackTitle}</span>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatTile label="Cohort starts" value={cohort.startsLabel} />
          <StatTile
            label="Applications close"
            value={closeStr}
            tone={!expired && days <= 3 ? "amber" : "slate"}
          />
          <StatTile
            label="Seats left"
            value={`${seats}/24`}
            tone={seats <= 6 ? "amber" : "slate"}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            to="/enrol/$tier"
            params={{ tier: "career" }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-body-sm font-bold text-primary-foreground shadow-[0_10px_30px_-10px_rgba(59,130,246,0.7)] transition hover:brightness-110 motion-reduce:transition-none"
          >
            Reserve my seat <ArrowRight className="h-4 w-4" />
          </Link>
          <WhatsAppLink
            source="acri_reserve_seat"
            message={`Hi Arzon, I just took the ACRI assessment and got matched to ${trackTitle}. Please reserve my seat for the ${cohort.label} cohort.`}
            trackProps={{ track_slug: trackSlug, cohort: cohort.label }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-sky-deep px-5 py-3 text-body-sm font-bold text-white shadow-sm transition hover:brightness-110 motion-reduce:transition-none"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </WhatsAppLink>
        </div>

        <p className="mt-3 inline-flex items-center gap-1.5 text-meta text-slate-600">
          <ShieldCheck className="h-3.5 w-3.5 text-yellow-600" /> ISO 9001 issuer.
        </p>
      </ResultCard>
    );
  }

  // Waitlist branch
  const stream = streamLabelFor(trackSlug);
  return (
    <ResultCard
      tone="primary"
      icon={<Hourglass className="h-3.5 w-3.5" />}
      eyebrow={`${stream} track · Launching 2026`}
      title={
        <>
          Join the waitlist for <span className="text-primary">{trackTitle}</span>
        </>
      }
    >
      <p className="text-caption leading-relaxed text-slate-600">
        The {stream.toLowerCase()} cohort opens in 2026. Waitlist members get founding-cohort
        pricing, first-pick of seats, and early access to the full curriculum.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatTile label="Founding seats" value="50 capped" tone="primary" />
        <StatTile label="Opens" value="2026" tone="primary" />
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <WhatsAppLink
          source="acri_waitlist"
          message={`Hi Arzon, I took the ACRI assessment and got matched to ${trackTitle} (${stream}). Please add me to the waitlist for the 2026 cohort.`}
          trackProps={{ track_slug: trackSlug, stream }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-body-sm font-bold text-primary-foreground shadow-[0_10px_30px_-10px_rgba(59,130,246,0.7)] transition hover:brightness-110 motion-reduce:transition-none"
        >
          <MessageCircle className="h-4 w-4" /> Join the {stream} waitlist
        </WhatsAppLink>
        <Link
          to="/courses"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-body-sm font-bold text-slate-900 ring-1 ring-slate-300 transition hover:ring-primary motion-reduce:transition-none"
        >
          See live programmes <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 text-meta text-slate-600">
        <Users className="h-3.5 w-3.5" /> We'll WhatsApp you the moment {stream.toLowerCase()}{" "}
        enrolment opens.
      </p>
    </ResultCard>
  );
}
