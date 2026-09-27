import { useState } from "react";
import { createFileRoute, useNavigate, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import {
  ArrowRight,
  Loader2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Lock,
  Award,
  Building2,
} from "lucide-react";
import { TIER_META, isTier, formatInr } from "@/data/enrolmentTiers";
import { COURSES_BY_SLUG } from "@/data/courses";
import { createEnrolmentIntent } from "@/lib/enrolment.functions";
import { track } from "@/lib/track";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EnrolErrorFallback } from "@/components/enrol/EnrolErrorFallback";
import { ResumeBanner } from "@/components/enrol/ResumeBanner";
import { enrolProgressStore } from "@/hooks/useEnrolProgress";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PremiumChip } from "@/components/ui/PremiumChip";

export const Route = createFileRoute("/enrol/$tier")({
  validateSearch: (search: Record<string, unknown>) =>
    z.object({ programme: z.string().trim().max(80).optional() }).parse(search),
  beforeLoad: ({ params }) => {
    if (!isTier(params.tier)) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Complete your enrolment · Arzon Global" },
      { name: "description", content: "Enter your details to enrol in an Arzon Global programme." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolDetails,
  errorComponent: ({ error, reset }) => (
    <EnrolErrorFallback error={error} reset={reset} where="registration" />
  ),
});

function EnrolDetails() {
  const { tier } = Route.useParams();
  const { programme } = Route.useSearch();
  const selectedCourse = programme ? COURSES_BY_SLUG[programme] : undefined;
  const matches = useMatches();
  const navigate = useNavigate();
  const createIntent = useServerFn(createEnrolmentIntent);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    background: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const meta = isTier(tier) ? TIER_META[tier] : null;
  if (!meta) return null;

  const isChildActive = matches.some(
    (m) => m.routeId === "/enrol/$tier/pay" || m.pathname?.endsWith("/pay"),
  );

  if (isChildActive) {
    return <Outlet />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in your name, email, and phone.");
      return;
    }

    setSubmitting(true);
    try {
      const { intentId, intentToken } = await createIntent({
        data: {
          tier,
          contact: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            city: form.city.trim() || undefined,
            background: form.background.trim() || undefined,
          },
        },
      });
      track("enrol_intent_created", {
        program_slug: tier,
        props: { intent_id: intentId, tier },
      });
      enrolProgressStore.set({
        intentId,
        intentToken,
        tier: meta.id,
        step: "payment",
        contact: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
      });
      navigate({
        to: "/enrol/$tier/pay",
        params: { tier },
        search: { intent: intentId, t: intentToken },
      });
    } catch (err) {
      console.error("[enrol] createIntent failed", err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(friendlyIntentError(msg));
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">
      <Nav />
      <div className="mx-auto max-w-6xl px-4 pt-28 sm:pt-36 pb-20 sm:px-6 lg:px-8 space-y-8">
        <ResumeBanner />

        {/* Step Progress Header */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-stone-700">
            <span className="inline-flex items-center gap-2 text-[#1B3F8B] font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-[#1B3F8B] font-mono text-xs">
                1
              </span>
              Step 1 of 2: Applicant Profile
            </span>
            <span className="inline-flex items-center gap-2 text-stone-400 font-medium">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-400 font-mono text-xs">
                2
              </span>
              Step 2 of 2: Secure Payment &amp; Order
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-100">
            <div className="h-full w-1/2 rounded-full bg-[#1B3F8B]" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-2">
              <PremiumChip variant="navy" size="sm">
                FAST-TRACK DIRECT REGISTRATION
              </PremiumChip>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Enrol in{" "}
              <span className="text-[#1B3F8B] italic font-normal">
                {meta.name}
              </span>
            </h1>
            <p className="mt-2 text-base text-stone-700 leading-relaxed font-sans">{meta.sub}</p>

            {/* Verification / Trust Banner */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-xs text-stone-700 font-medium shadow-2xs font-sans">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#1B3F8B]" />
              <span>
                <strong className="text-[#1A1A1A]">1,240+ candidates</strong> across India enrolled this
                month · MCA + MSME Registered Portal
              </span>
            </div>

            {/* Form */}
            <form
              method="post"
              noValidate
              onSubmit={onSubmit}
              className="mt-6 grid gap-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs sm:grid-cols-2"
            >
              <Field
                id="name"
                autoComplete="name"
                label="Full Name"
                icon={User}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
                placeholder="e.g. Aditi Sharma"
              />
              <Field
                id="phone"
                autoComplete="tel"
                inputMode="tel"
                type="tel"
                label="WhatsApp Phone Number"
                icon={Phone}
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                required
                placeholder="+91 98765 43210"
              />
              <Field
                id="email"
                autoComplete="email"
                inputMode="email"
                type="email"
                label="Email Address"
                icon={Mail}
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
