import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Users, Clock } from "lucide-react";
import { LIVE_LEARNERS_LABEL, NEXT_COHORT } from "./constants";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";
import { trackUrgencyCtaClicked, trackUrgencyStripViewed } from "@/lib/urgencyAnalytics";
import { CTAButton } from "./CTAButton";

/**
 * Inside-sales urgency strip, replaces the older MidPageReserveStrip.
 * Three honest signals, no fake numbers:
 *   - cohort countdown (real time until applicationsClose)
 *   - learner count (1,200+ live)
 *   - "Counsellors online" only during India business hours (10:00–21:00 IST)
 * Plus two CTAs: ACRI Readiness Preview + WhatsApp counsellor.
 */
export function InsideSalesUrgencyStrip() {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    if (isReducedMotion()) return;
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const closeAt = new Date(NEXT_COHORT.applicationsCloseISO).getTime();
  const diff = Math.max(0, closeAt - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const countdown = diff > 0 ? `${days}d ${hours}h` : "Closing today";

  // India business hours, 10:00–21:00 IST. Computed from UTC offset.
  const istHour =
    (new Date(now).getUTCHours() + 5 + Math.floor((new Date(now).getUTCMinutes() + 30) / 60)) % 24;
  const counsellorsOnline = istHour >= 10 && istHour < 21;

  // Fire one impression per page mount when the strip enters view.
  const { ref: stripRef, inView } = useInView<HTMLElement>();
  const viewedRef = useRef(false);
  useEffect(() => {
    if (!inView || viewedRef.current) return;
    viewedRef.current = true;
    trackUrgencyStripViewed({
      cohortId: NEXT_COHORT.id,
      daysToClose: days,
      hoursToClose: hours,
      counsellorsOnline,
      seatsLabel: LIVE_LEARNERS_LABEL,
      closed: diff <= 0,
    });
  }, [inView, days, hours, counsellorsOnline, diff]);

  const onCtaClick = (target: "readiness_assessment" | "whatsapp_counsellor") => {
    trackUrgencyCtaClicked({
      target,
      cohortId: NEXT_COHORT.id,
      daysToClose: days,
      hoursToClose: hours,
    });
  };

  return (
    <section ref={stripRef} className="px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-white/[0.02] p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <Pill icon={Clock} text={`Applications close in ${countdown}`} tone="gold" />
          <Pill icon={Users} text={`${LIVE_LEARNERS_LABEL} students learning live`} tone="muted" />
          {counsellorsOnline && (
            <Pill icon={MessageCircle} text="Counsellors online now" tone="emerald" />
          )}
        </div>
        <h3 className="mt-4 font-grotesk text-h4 font-bold leading-tight text-slate-50 sm:text-h3">
          Get your ACRI Readiness Preview before the {NEXT_COHORT.label} cohort closes.
        </h3>
        <p className="mt-2 text-sm text-slate-100/70">
          3-minute assessment. Personalised readiness level + recommended track.
        </p>
        <div className="mt-5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <CTAButton
            asChild
            variant="gold"
            size="lg"
            block
            glow
            trailingIcon={<ArrowRight className="h-4 w-4" />}
            onClick={() => onCtaClick("readiness_assessment")}
          >
            <Link to="/career-engine">Start Readiness Assessment</Link>
          </CTAButton>
          <CTAButton
            asChild
            variant="ghost"
            size="lg"
            leadingIcon={<MessageCircle className="h-4 w-4 text-eyebrow" />}
          >
            <WhatsAppLink
              source="urgency_strip_counsellor"
              message="Hi Arzon, I'd like to speak with a counsellor about the readiness programme."
              onClick={() => onCtaClick("whatsapp_counsellor")}
            >
              WhatsApp counsellor
            </WhatsAppLink>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function Pill({
  icon: Icon,
  text,
  tone,
}: {
  icon: typeof Clock;
  text: string;
  tone: "gold" | "emerald" | "muted";
}) {
  const styles =
    tone === "gold"
      ? "border-gold/30 bg-gold/10 text-gold"
      : tone === "emerald"
        ? "border-accent-glow/30 bg-accent-glow/10 text-eyebrow"
        : "border-slate-200/10 bg-white/[0.04] text-slate-100/70";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] ${styles}`}
    >
      <Icon className="h-3 w-3" />
      {text}
    </span>
  );
}
