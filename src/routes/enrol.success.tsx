import { createFileRoute, Link } from "@tanstack/react-router";
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
  Loader2,
} from "lucide-react";
import { getEnrolmentIntent } from "@/lib/enrolment.functions";
import { TIER_META, formatInr } from "@/data/enrolmentTiers";
import { waLink, NEXT_COHORT } from "@/components/landing/constants";
import { EnrolErrorFallback } from "@/components/enrol/EnrolErrorFallback";
import { enrolProgressStore } from "@/hooks/useEnrolProgress";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

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
      { title: "Enrolment Confirmed · Arzon Global" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolSuccess,
  pendingComponent: () => (
    <div className="min-h-screen editorial-page-bg px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl h-[400px] editorial-card bg-white/80" />
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

  useEffect(() => {
    if (isPaid) enrolProgressStore.clear();
  }, [isPaid]);

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
        /* ignore */
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
  }, [intent, token, isPending, fetchIntent]);

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
      />
    );
  }

  if (isPending) {
    return <PendingView firstName={firstName ?? "there"} polling={polling} onRefresh={refresh} />;
  }

  return (
    <div className="min-h-screen editorial-page-bg p-4 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="w-full max-w-2xl editorial-card p-6 sm:p-8 space-y-6">
        {/* Editorial Success Hero */}
        <div className="text-center space-y-3">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
          <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
            Payment Verified · Seat Locked
          </p>
          <h1 className="font-serif text-3xl font-bold text-[#151C2E] tracking-tight">
            {firstName ? `Welcome aboard, ${firstName}.` : "Welcome to Arzon Global."}
          </h1>
          {data && tierMeta ? (
            <p className="text-sm text-[#5B6472]">
              <span className="font-semibold text-[#151C2E]">{tierMeta.name}</span> programme
              {amount != null ? (
                <>
                  {" "}
                  ·{" "}
                  <span className="font-mono text-[#151C2E] font-semibold">
                    {formatInr(amount)}
                  </span>{" "}
                  paid
                </>
              ) : null}
            </p>
          ) : (
            <p className="text-sm text-[#5B6472]">Your enrolment record has been confirmed.</p>
          )}
          <p className="text-xs text-[#5B6472]">
            Cohort: <span className="font-semibold text-[#151C2E]">{cohortLabel}</span> · Starts{" "}
            {cohortStarts}
          </p>
          {data?.email && (
            <div className="inline-flex items-center gap-1.5 text-xs text-[#5B6472] editorial-stat-tile px-3 py-1">
              <Mail className="h-3.5 w-3.5 text-[#707C90]" /> Digital receipt sent to {data.email}
            </div>
          )}
        </div>

        {/* Day-0 Gamified Activation Wizard */}
        <OnboardingWizard
          studentName={data?.name ?? "Student"}
          studentPhone={data?.phone}
          tierName={tierMeta?.name ?? "Career Master"}
        />

        {/* Primary Action - WhatsApp Outreach */}
        <a
          href={waLink(
            `Hi Arzon, I just enrolled in the ${tierMeta?.name ?? ""} programme. My cohort is ${cohortLabel}. Here to confirm onboarding.`,
          )}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between editorial-btn-blue p-4 text-white hover:bg-[#1e40af]"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-white" />
            <div>
              <p className="text-sm font-semibold">Connect with Admissions on WhatsApp</p>
              <p className="text-xs text-white/90">
                Confirms your phone number and accelerates cohort orientation.
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </a>

        {/* Next 7 Days Schedule */}
        <div className="editorial-stat-tile p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#8A6D1F]" />
            <h2 className="font-serif text-base font-bold text-[#151C2E]">
              First 7 Days Execution Schedule
            </h2>
          </div>
          <ul className="space-y-3.5 text-xs text-[#5B6472]">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">
                1
              </span>
              <div>
                <p className="font-semibold text-[#151C2E]">Admissions Outreach (within 30 min)</p>
                <p className="mt-0.5">
                  Your counsellor will verify profile details and send cohort invitations.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">
                2
              </span>
              <div>
                <p className="font-semibold text-[#151C2E]">
                  Credential Onboarding (within 2 hours)
                </p>
                <p className="mt-0.5">
                  Learning portal credentials, syllabus documentation, and preparatory reading.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">
                3
              </span>
              <div>
                <p className="font-semibold text-[#151C2E]">Cohort Kickoff ({cohortStarts})</p>
                <p className="mt-0.5">
                  First live technical briefing invite. Save the schedule to your calendar.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Dashboard & Accreditation Footer */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 editorial-stat-tile p-4 text-[#151C2E] hover:bg-slate-200/60 transition-colors"
          >
            <ArrowRight className="h-4 w-4 text-[#1D4ED8] shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#151C2E]">Open Student Dashboard</p>
              <p className="text-xs text-[#5B6472]">Track progress & module milestones.</p>
            </div>
          </Link>
          <div className="flex items-center gap-3 editorial-stat-tile p-4">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#151C2E]">ISO 9001 Certified</p>
              <p className="text-xs text-[#5B6472]">
                Arzon Global Pvt. Ltd. · MCA & MSME Registered.
              </p>
            </div>
          </div>
        </div>

        {/* Share Action */}
        <a
          href={waLink(
            `Hey, I just enrolled with Arzon Careers for ${tierMeta?.name ?? "their programme"}. They have a free 3-min fit test you should try: https://arzoncareers.in/career-engine/start`,
          )}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 text-xs text-[#5B6472] hover:text-[#151C2E] transition-colors pt-2"
        >
          <Share2 className="h-3.5 w-3.5 text-[#8A6D1F]" /> Share career assessment link with a peer
        </a>
      </div>
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
    <div className="min-h-screen editorial-page-bg p-4 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="w-full max-w-md editorial-card p-8 text-center space-y-4">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1D4ED8]" />
        <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
          Verifying Payment with Razorpay
        </p>
        <h1 className="font-serif text-2xl font-bold text-[#151C2E]">
          {firstName ? `Hang tight, ${firstName}.` : "Confirming your seat..."}
        </h1>
        <p className="text-xs text-[#5B6472]">
          We're matching your payment receipt. This page updates automatically once verified.
        </p>
      </div>
    </div>
  );
}

function FailureView({
  firstName,
  tierName,
  reason,
}: {
  firstName: string;
  tierName: string | null;
  reason: string | null;
}) {
  return (
    <div className="min-h-screen editorial-page-bg p-4 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="w-full max-w-md editorial-card p-8 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-[#151C2E]">Payment Processing Issue</h1>
        <p className="text-xs text-[#5B6472]">
          {reason || "The payment transaction could not be completed. No funds were debited."}
        </p>
        <Link
          to="/enrol"
          className="editorial-btn-blue text-xs font-semibold px-4 py-2.5 inline-block"
        >
          Return to Programme Selection
        </Link>
      </div>
    </div>
  );
}
