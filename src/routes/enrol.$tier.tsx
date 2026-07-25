import { useState } from "react";
import { createFileRoute, useNavigate, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2, ShieldCheck, Sparkles, CheckCircle2, User, Phone, Mail, MapPin, GraduationCap, Lock, Award, Building2 } from "lucide-react";
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
  const hasChildMatch = matches.some(
    (m) => m.routeId.startsWith("/enrol/$tier/") && m.routeId !== "/enrol/$tier",
  );
  if (hasChildMatch) return <Outlet />;
  const meta = TIER_META[tier];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }
    if (!form.phone.trim() || form.phone.trim().replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit WhatsApp phone number.");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

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
          basePriceInr: meta.mrpInr,
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
    <div className="min-h-screen bg-[#070B19] text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <ResumeBanner />

        {/* Executive Step Progress Header */}
        <div className="rounded-3xl border border-white/10 bg-[#0E172F] p-5 backdrop-blur-2xl shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-slate-200">
            <span className="inline-flex items-center gap-2.5 text-blue-300 font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/30 text-blue-300 ring-1 ring-blue-400/50 font-mono text-xs">1</span>
              Step 1 of 2: Applicant Profile
            </span>
            <span className="inline-flex items-center gap-2.5 text-slate-400 font-medium">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 font-mono text-xs">2</span>
              Step 2 of 2: Secure Payment & Order
            </span>
          </div>
          <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-blue-300 ring-1 ring-blue-400/30">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Fast-Track Direct Registration
              </span>
            </div>

            <h1 className="mt-3.5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Enrol in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-300">{meta.name}</span>
            </h1>
            <p className="mt-2.5 text-sm text-slate-300 leading-relaxed font-normal">{meta.sub}</p>

            {/* Verification / Trust Banner */}
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-blue-500/30 bg-[#0D1938] px-4.5 py-3.5 text-xs text-blue-200 font-medium shadow-md">
              <ShieldCheck className="h-5 w-5 shrink-0 text-blue-400" />
              <span><strong className="text-white">1,240+ candidates</strong> across India enrolled this month · MCA + MSME Registered Portal</span>
            </div>

            {/* Executive Form */}
            <form
              method="post"
              noValidate
              onSubmit={onSubmit}
              className="mt-6 grid gap-5 rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl sm:grid-cols-2"
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
                placeholder="aditi@gmail.com"
              />
              <Field
                id="city"
                autoComplete="address-level2"
                label="City"
                icon={MapPin}
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
                placeholder="e.g. Hyderabad / Bengaluru"
              />
              <Field
                id="background"
                label="Educational / Career Background (Optional)"
                icon={GraduationCap}
                value={form.background}
                onChange={(v) => setForm({ ...form, background: v })}
                placeholder="e.g. Pharm.D / B.Sc / B.Tech / Working Pro"
                className="sm:col-span-2"
              />

              {error && (
                <div className="rounded-2xl border border-rose-500/50 bg-rose-950/60 p-4 text-xs font-semibold text-rose-200 sm:col-span-2">
                  {error}
                </div>
              )}

              <div className="mt-4 flex flex-col-reverse items-stretch justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Lock className="h-4 w-4 text-amber-400" />
                  <span>256-Bit TLS Secured · Razorpay Gateway</span>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  aria-busy={submitting}
                  style={{ color: "#FFFFFF" }}
                  className="min-w-[230px] rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm h-13 shadow-xl shadow-blue-900/50 disabled:opacity-100 transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
                      Creating enrolment intent…
                    </>
                  ) : (
                    <>
                      <span>Continue to Payment</span>
                      <ArrowRight className="ml-1.5 h-4.5 w-4.5 text-white" strokeWidth={2.5} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Sidebar: Programme Perks & Verification */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-7 backdrop-blur-2xl shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400">
                    Selected Path
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">{meta.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-300 block font-medium">Standard Fee</span>
                  <span className="font-serif text-2xl font-bold text-white tabular-nums">{formatInr(meta.mrpInr)}</span>
                </div>
              </div>

              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Included Deliverables
                </p>
                <ul className="space-y-3 text-xs text-slate-200">
                  {meta.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-blue-400 mt-0.5" />
                      <span className="leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Official Accreditation Seal */}
            <div className="rounded-3xl border border-white/10 bg-[#0E172F] p-5 backdrop-blur-2xl flex items-center gap-3.5 shadow-xl">
              <ShieldCheck className="h-6 w-6 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">ISO 9001 Issuer · MCA Registered</p>
                <p className="text-xs text-slate-300">Arzon Global Pvt. Ltd. · Official Enrolment Portal</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  icon: Icon,
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
  icon?: import("lucide-react").LucideIcon;
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
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
        {Icon && <Icon className="h-4 w-4 text-blue-400" />}
        <span>{label}</span>
        {required && <span className="text-rose-400">*</span>}
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
        className="h-12 rounded-2xl border border-slate-700 bg-white/[0.04] text-white font-medium placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30 transition-all"
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

