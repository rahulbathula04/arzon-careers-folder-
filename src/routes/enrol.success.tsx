import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  CheckCircle2,
  MessageCircle,
  Mail,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Share2,
  Sparkles,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { getEnrolmentIntent } from "@/lib/enrolment.functions";
import { TIER_META, formatInr } from "@/data/enrolmentTiers";
import { waLink, NEXT_COHORT } from "@/components/landing/constants";
import { EnrolErrorFallback } from "@/components/enrol/EnrolErrorFallback";
import { enrolProgressStore } from "@/hooks/useEnrolProgress";

const search = z.object({
  intent: z.string().uuid().optional(),
  t: z.string().min(16).max(64).optional(),
});

type IntentData = Awaited<ReturnType<typeof getEnrolmentIntent>>;

export const Route = createFileRoute("/enrol/success")({
  validateSearch: (s) => search.parse(s),
  loader: async ({ location }) => {
    const { intent, t } = search.parse(location.search);
    if (!intent || !t) return null;
    try {
      return await getEnrolmentIntent({ data: { intentId: intent, intentToken: t } });
    } catch {
      return null;
    }
  },
  head: () => ({
    meta: [
      { title: "You're enrolled. Arzon Global" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolSuccess,
  pendingComponent: () => (
    <div className="min-h-screen bg-[#070B17] px-5 py-24 sm:px-6 animate-pulse">
      <div className="mx-auto max-w-2xl h-[400px] rounded-xl bg-white/5" />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <EnrolErrorFallback error={error} reset={reset} where="confirmation" />
  ),
});

function EnrolSuccess() {
  const initial = Route.useLoaderData() as IntentData | null;
  const { intent, t: token } = Route.useSearch();
  const fetchIntent = useServerFn(getEnrolmentIntent);
  const [data, setData] = useState<IntentData | null>(initial);
  const [polling, setPolling] = useState(false);

  const status = data?.status ?? null;
  const isPaid = status === "paid";
  const isFailed = status === "failed";
  const isPending = !!data && !isPaid && !isFailed;

  // Clear the persisted enrolment progress cache once the payment is
  // confirmed so the resume banner doesn't reappear on a fresh visit.
  useEffect(() => {
    if (isPaid) enrolProgressStore.clear();
  }, [isPaid]);

  // Poll briefly while the webhook lands (verify usually marks it before
  // we get here, but if the user landed via webhook redirect or a slow
  // verify, give it a few seconds).
  useEffect(() => {
    if (!intent || !token || !isPending) return;
    let cancelled = false;
    setPolling(true);
    const start = Date.now();
    const tick = async () => {
      if (cancelled) return;
      try {
        const next = await fetchIntent({ data: { intentId: intent, intentToken: token } });
        if (cancelled) return;
        setData(next);
        if (next.status === "paid" || next.status === "failed") {
          setPolling(false);
          return;
        }
      } catch {
        /* ignore — keep polling */
      }
      if (Date.now() - start < 20_000) {
        setTimeout(tick, 2_000);
      } else {
        setPolling(false);
      }
    };
    const t = setTimeout(tick, 2_000);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [intent, isPending, fetchIntent]);

  const refresh = async () => {
    if (!intent || !token) return;
    setPolling(true);
    try {
      const next = await fetchIntent({ data: { intentId: intent, intentToken: token } });
      setData(next);
    } finally {
      setPolling(false);
    }
  };

  const tierMeta =
    data && (data.tier as string) in TIER_META
      ? TIER_META[data.tier as keyof typeof TIER_META]
      : null;
  const amount = data?.finalPriceInr ?? data?.basePriceInr;
  const rawFirst = data?.name?.split(" ")[0];
  const firstName = rawFirst && rawFirst.trim().length > 0 ? rawFirst.trim() : null;
  const cohortLabel = NEXT_COHORT.label;
  const cohortStarts = NEXT_COHORT.startsLabel;

  if (isFailed) {
    return (
      <FailureView
        firstName={firstName ?? "there"}
        tierName={tierMeta?.name ?? null}
        reason={data?.failureReason ?? null}
        intentId={intent ?? null}
      />
    );
  }

  if (isPending) {
    return <PendingView firstName={firstName ?? "there"} polling={polling} onRefresh={refresh} />;
  }

  return (
    <div className="surface-island-dark mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] p-5 shadow-[0_30px_80px_-30px_rgba(7,11,23,0.6)] ring-1 ring-white/5 sm:p-7 lg:p-10">
      {/* Hero — celebratory but grounded. Trust signals first, hype second. */}
      <div className="relative overflow-hidden rounded-3xl border border-accent-glow/30 bg-gradient-to-br from-sky-400/[0.12] via-sky-400/[0.04] to-transparent p-8 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background: "radial-gradient(circle at top, oklch(0.78 0.16 152) 0%, transparent 60%)",
          }}
        />
        <CheckCircle2 className="relative mx-auto h-14 w-14 text-eyebrow" />
        <p className="relative mt-4 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow-strong">
          Payment confirmed · Seat locked
        </p>
        <h1 className="relative mt-2 font-display text-h1 text-white">
          {firstName ? `Welcome aboard, ${firstName}.` : "Welcome to Arzon."}
        </h1>
        {data && tierMeta ? (
          <p className="relative mt-3 text-sm text-white/75">
            <span className="font-semibold text-white">{tierMeta.name}</span> programme
            {amount != null ? (
              <>
                {" "}
                · <span className="font-mono">{formatInr(amount)}</span> paid
              </>
            ) : null}
          </p>
        ) : (
          <p className="relative mt-3 text-sm text-white/70">Your enrolment is recorded.</p>
        )}
        <p className="relative mt-1 text-xs text-white/80">
          Cohort: <span className="text-white">{cohortLabel}</span> · starts {cohortStarts}
        </p>
        {data?.email && (
          <p className="relative mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-micro text-white/65">
            <Mail className="h-3 w-3" /> Receipt sent to {data.email}
          </p>
        )}
      </div>

      {/* Primary action — the one thing that matters in the next 30 min. */}
      <a
        href={waLink(
          `Hi Arzon, I just enrolled in the ${tierMeta?.name ?? ""} programme. My cohort is ${cohortLabel}. Here to confirm onboarding.`,
        )}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center gap-4 rounded-2xl border border-accent-glow/40 bg-accent-glow/10 p-5 transition hover:bg-accent-glow/15"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-glow/20 text-eyebrow-strong">
          <MessageCircle className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <p className="font-grotesk text-sm font-bold text-white">
            Say hi to your counsellor on WhatsApp
          </p>
          <p className="mt-0.5 text-xs text-white/65">
            One message confirms your number and unlocks your onboarding faster.
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-eyebrow-strong" />
      </a>

      {/* What happens next — concrete, time-bound. */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary-glow" />
          <p className="font-grotesk text-sm font-bold text-white">Your next 7 days</p>
        </div>
        <ul className="mt-4 space-y-4 text-sm">
          <Step
            n="1"
            icon={<MessageCircle className="h-4 w-4" />}
            title="WhatsApp welcome (within 30 min)"
            body="Your counsellor will confirm your details and share the cohort group link."
          />
          <Step
            n="2"
            icon={<Mail className="h-4 w-4" />}
            title="Onboarding email (within 2 hours)"
            body="Learning portal login, syllabus PDF, and Day-1 prep materials."
          />
          <Step
            n="3"
            icon={<Calendar className="h-4 w-4" />}
            title={`Cohort kickoff (${cohortStarts})`}
            body="First live session invite. Add the date to your calendar now so it doesn't slip."
          />
        </ul>
      </div>

      {/* Side actions — refund reminder + dashboard + share. */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          to="/dashboard"
          className="flex items-start gap-3 rounded-2xl border border-primary-glow/30 bg-primary/[0.08] p-5 transition hover:bg-primary/[0.14]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-glow/20 text-primary-glow">
            <ArrowRight className="h-4 w-4" />
          </span>
          <div>
            <p className="font-grotesk text-sm font-bold text-white">Open your dashboard</p>
            <p className="mt-0.5 text-xs text-white/65">
              Resume lessons, track progress, see your cohort milestones.
            </p>
          </div>
        </Link>
        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-glow/15 text-eyebrow">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <p className="font-grotesk text-sm font-bold text-white">ISO 9001 certified</p>
            <p className="mt-0.5 text-xs text-white/65">Arzon Global Pvt. Ltd. · MCA + MSME.</p>
          </div>
        </div>
      </div>

      {/* Quiet share — for the friends-recommend-friends moment. */}
      <a
        href={waLink(
          `Hey, I just enrolled with Arzon Careers for ${tierMeta?.name ?? "their programme"}. They have a free 3-min fit test you should try: https://arzoncareers.in/career-engine/start`,
        )}
        target="_blank"
        rel="noreferrer"
        className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/70 transition hover:bg-white/[0.05]"
      >
        <Share2 className="h-4 w-4 text-gold" /> Share Arzon with a friend who's still figuring it
        out
      </a>
    </div>
  );
}

function PendingView({
  firstName,
  polling,
  onRefresh,
}: {
  firstName: string;
  polling: boolean;
  onRefresh: () => void;
}) {
  return (
    <div className="surface-island-dark mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] p-5 shadow-[0_30px_80px_-30px_rgba(7,11,23,0.6)] ring-1 ring-white/5 sm:p-7 lg:p-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <Loader2 className="relative mx-auto h-12 w-12 motion-safe:animate-spin text-primary-glow" />
        <p className="relative mt-4 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
          Confirming with Razorpay
        </p>
        <h1 className="relative mt-2 font-display text-h1 text-white">
          {firstName ? `Hang tight, ${firstName}.` : "Hang tight."}
        </h1>
        <p className="relative mx-auto mt-3 max-w-md text-sm text-white/70">
          Your payment was submitted. We're waiting on Razorpay's confirmation — this usually takes
          just a few seconds. This page will update automatically.
        </p>
        <button
          type="button"
          onClick={onRefresh}
          disabled={polling}
          className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/80 transition hover:bg-white/[0.08] disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${polling ? "motion-safe:animate-spin" : ""}`} />
          {polling ? "Checking…" : "Check again"}
        </button>
        <p className="relative mt-6 text-xs text-white/70">
          If this takes more than a minute, your counsellor will reach out on WhatsApp to confirm.
          No payment is lost.
        </p>
      </div>
    </div>
  );
}

function FailureView({
  firstName,
  tierName,
  reason,
  intentId,
}: {
  firstName: string;
  tierName: string | null;
  reason: string | null;
  intentId: string | null;
}) {
  const navigate = useNavigate();
  return (
    <div className="surface-island-dark mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] p-5 shadow-[0_30px_80px_-30px_rgba(7,11,23,0.6)] ring-1 ring-white/5 sm:p-7 lg:p-10">
      <div className="relative overflow-hidden rounded-3xl border border-red-400/30 bg-gradient-to-br from-red-500/[0.10] via-red-500/[0.04] to-transparent p-8 text-center">
        <AlertTriangle className="relative mx-auto h-12 w-12 text-red-300" />
        <p className="relative mt-4 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-red-200">
          Payment was not completed
        </p>
        <h1 className="relative mt-2 font-display text-h1 text-white">
          {firstName
            ? `We couldn't confirm your payment, ${firstName}.`
            : "We couldn't confirm your payment."}
        </h1>
        <p className="relative mx-auto mt-3 max-w-md text-sm text-white/75">
          {reason ? `Razorpay reported: "${reason}".` : "Razorpay didn't confirm your payment."} No
          charge has been settled on your card. You can try again — your enrolment details and any
          coupon are still saved.
        </p>

        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (intentId) {
                // Send them back to pay step — pay route is /enrol/$tier; we
                // don't have the tier here without re-fetching, so go to /enrol.
                navigate({ to: "/enrol" });
              } else {
                navigate({ to: "/enrol" });
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" /> Try payment again
          </button>
          <a
            href={waLink(
              `Hi Arzon, my payment for ${tierName ?? "the programme"} didn't go through${
                reason ? ` (reason: ${reason})` : ""
              }. Can you help me complete enrolment?`,
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/[0.08]"
          >
            <MessageCircle className="h-4 w-4" /> Talk to your counsellor
          </a>
        </div>

        <p className="relative mt-6 text-xs text-white/80">
          Most card failures resolve by retrying or using a different payment method (UPI / Net
          Banking). If you see your bank charged you, contact your counsellor — Razorpay's
          settlement will be reversed automatically if no order is confirmed within 5–7 working
          days.
        </p>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-glow/15 text-eyebrow">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <div>
          <p className="font-grotesk text-sm font-bold text-white">Break-even inside month one</p>
          <p className="mt-0.5 text-xs text-white/65">
            ₹24,999 ÷ ₹26,667 median first-month salary ≈ 28 days. Everything after is upside.
          </p>
        </div>
      </div>
    </div>
  );
}

function Step({
  icon,
  title,
  body,
  n,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  n?: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="relative flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent-glow/15 text-eyebrow">
        {icon}
        {n && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-glow font-mono text-micro font-bold text-sky-950">
            {n}
          </span>
        )}
      </span>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-xs text-white/65">{body}</p>
      </div>
    </li>
  );
}
