import { useState } from "react";
import { createFileRoute, useNavigate, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { z } from "zod";
import { TIER_META, isTier, formatInr } from "@/data/enrolmentTiers";
import { createEnrolmentIntent } from "@/lib/enrolment.functions";
import { track } from "@/lib/track";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EnrolErrorFallback } from "@/components/enrol/EnrolErrorFallback";
import { ResumeBanner } from "@/components/enrol/ResumeBanner";
import { enrolProgressStore } from "@/hooks/useEnrolProgress";

export const Route = createFileRoute("/enrol/$tier")({
  beforeLoad: ({ params }) => {
    if (!isTier(params.tier)) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Complete your enrolment. Arzon Global" },
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

  if (!isTier(tier)) return null;
  // If a child route (e.g. /enrol/$tier/pay) is matched, render it instead of the form.
  const hasChildMatch = matches.some(
    (m) => m.routeId.startsWith("/enrol/$tier/") && m.routeId !== "/enrol/$tier",
  );
  if (hasChildMatch) return <Outlet />;
  const meta = TIER_META[tier];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { intentId, intentToken } = await createIntent({
        data: {
          tier,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          city: form.city.trim() || null,
          background: form.background.trim() || null,
          basePriceInr: meta.priceInr,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 256) : null,
        },
      });
      track("enrol_intent_created", {
        program_slug: tier,
        props: { intent_id: intentId, tier },
      });
      enrolProgressStore.set({
        intentId,
        intentToken,
        tier,
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
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <ResumeBanner />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold-ink">
          Step 1 of 2 · Fast-track enrolment
        </p>
        <h1 className="mt-3 font-display text-h1 text-ink">
          Enrol in <span className="italic-accent not-italic">{meta.name}</span>,{" "}
          {formatInr(meta.priceInr)}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">{meta.sub}</p>

        {/* BHARAT UX: Immediate Social Proof & Trust */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800 border border-green-200 shadow-sm">
           <ShieldCheck className="h-4 w-4 text-green-600" aria-hidden="true" />
           <span><strong>1,240+ students</strong> from India enrolled this month</span>
        </div>

        <form
          method="post"
          noValidate
          onSubmit={onSubmit}
          className="tone-light card-light mt-6 grid gap-5 rounded-2xl border border-edge bg-white p-6 shadow-sm sm:grid-cols-2"
        >
          <Field
            id="name"
            autoComplete="name"
            label="Full name"
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
            label="WhatsApp number"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
            required
            placeholder="+91 …"
          />
          <Field
            id="email"
            autoComplete="email"
            inputMode="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
            placeholder="you@email.com"
          />
          <Field
            id="city"
            autoComplete="address-level2"
            label="City"
            value={form.city}
            onChange={(v) => setForm({ ...form, city: v })}
            placeholder="Hyderabad"
          />
          <Field
            id="background"
            label="Background (optional)"
            value={form.background}
            onChange={(v) => setForm({ ...form, background: v })}
            placeholder="Pharm.D / B.Sc / B.Tech …"
            className="sm:col-span-2"
          />

          {error && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger sm:col-span-2">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:col-span-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-1.5 text-micro text-ink-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
              <span>100% Secure Checkout · UPI, Cards & Net Banking</span>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              aria-busy={submitting}
              className="min-w-[200px] bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold disabled:opacity-100"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
                  Saving your details…
                </>
              ) : (
                <>
                  Continue to payment <ArrowRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <div className="tone-light card-light rounded-2xl border border-edge bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold-ink" />
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold-ink">
              What's included
            </p>
          </div>
          <ul className="mt-3 space-y-2 text-xs text-ink">
            <li>· Live cohort sessions + recordings</li>
            <li>· Industry-recognised certificate</li>
            <li>· Job-ready portfolio + interview support</li>
            <li>· WhatsApp support from your counsellor</li>
          </ul>
        </div>
        <div className="tone-light card-light rounded-2xl border border-edge bg-white p-5 shadow-sm">
          <ShieldCheck className="h-5 w-5 text-gold-ink" />
          <p className="mt-2 font-semibold text-ink">ISO 9001 issuer</p>
          <p className="mt-1 text-xs text-ink-soft">
            Arzon Global Pvt. Ltd. · MCA + MSME registered.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  className,
  name,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  name?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "search" | "url" | "decimal" | "none";
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-xs text-ink-soft">
        {label}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden>
            *
          </span>
        )}
      </Label>
      <Input
        id={id}
        type={type}
        name={name}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required ? true : undefined}
        placeholder={placeholder}
        maxLength={type === "email" ? 120 : type === "tel" ? 20 : 120}
        className="h-11 rounded-lg border border-edge bg-white text-ink placeholder:text-ink-mute focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/30"
      />
    </div>
  );
}

function friendlyIntentError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid email")) return "That email looks off. Please check and try again.";
  if (m.includes("invalid phone")) return "That phone number looks off. Please use 10–15 digits.";
  if (m.includes("invalid name")) return "Please enter your full name (2–80 characters).";
  return msg;
}
