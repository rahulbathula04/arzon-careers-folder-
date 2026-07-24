import { useState } from "react";
import { createFileRoute, useNavigate, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2, ShieldCheck, Sparkles, CheckCircle2, User, Phone, Mail, MapPin, GraduationCap, Lock } from "lucide-react";
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
    <div className="min-h-screen bg-[#070B18] text-slate-50! px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ResumeBanner />

        {/* Step Progress Bar Header */}
        <div className="mb-8 rounded-3xl border border-white/15 bg-[#0C1222] p-5 backdrop-blur-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200!">
            <span className="flex items-center gap-2 text-teal-300! font-black">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/20 text-teal-300! ring-1 ring-teal-400/40">1</span>
              Step 1 of 2: Applicant Profile
            </span>
            <span className="flex items-center gap-2 text-slate-300! font-semibold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-slate-300!">2</span>
              Step 2 of 2: Secure Payment & Order
            </span>
          </div>
          <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-teal-300! ring-1 ring-teal-400/40">
                <Sparkles className="h-3.5 w-3.5" /> Fast-Track Direct Registration
              </span>
            </div>

            <h1 className="mt-3.5 font-black text-3xl sm:text-4xl text-slate-50!">
              Enrol in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300">{meta.name}</span>
            </h1>
            <p className="mt-2.5 text-sm text-slate-200! leading-relaxed font-normal">{meta.sub}</p>

            {/* Verification / Trust Badge */}
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-emerald-950/60 px-4.5 py-3 text-xs text-emerald-300! font-semibold shadow-sm">
              <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-emerald-400!" />
              <span><strong className="text-white!">1,240+ students</strong> across India locked seats this month · MCA + MSME Registered</span>
            </div>

            {/* Sleek Form */}
            <form
              method="post"
              noValidate
              onSubmit={onSubmit}
              className="mt-6 grid gap-5 rounded-3xl border border-white/15 bg-[#0C1222] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl sm:grid-cols-2"
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
                <div className="rounded-2xl border border-rose-500/50 bg-rose-950/60 p-3.5 text-xs font-semibold text-rose-200 sm:col-span-2">
                  {error}
                </div>
              )}

              <div className="mt-3 flex flex-col-reverse items-stretch justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300!">
                  <Lock className="h-4 w-4 text-teal-400!" />
                  <span>256-Bit TLS Secured · Razorpay Gateway</span>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  aria-busy={submitting}
                  className="min-w-[230px] rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950! font-black shadow-[0_0_25px_rgba(20,184,166,0.45)] disabled:opacity-100 transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
                      Creating enrolment intent…
                    </>
                  ) : (
                    <>
                      <span>Continue to Payment</span>
                      <ArrowRight className="ml-1.5 h-4.5 w-4.5" strokeWidth={2.5} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Sidebar: Programme Perks & Verification */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-white/15 bg-[#0C1222] p-6 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div>
                  <p className="font-mono text-micro font-bold uppercase tracking-widest text-teal-400!">
                    Selected Path
                  </p>
                  <h3 className="text-2xl font-black text-slate-50!">{meta.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-300! block font-semibold">Standard Fee</span>
                  <span className="text-xl font-black text-slate-50!">{formatInr(meta.mrpInr)}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-mono text-micro font-bold uppercase tracking-wider text-slate-300! mb-2.5">
                  What's included
                </p>
                <ul className="space-y-3 text-xs text-slate-100!">
                  {meta.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-teal-400! mt-0.5" />
                      <span className="leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 p-3.5 text-xs text-emerald-300! font-semibold">
                💡 <strong>Have a launch coupon?</strong> Apply code <strong className="text-white!">ARZONPRIME60</strong> on step 2 to drop the price by up to 75%.
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-[#0C1222] p-5 backdrop-blur-2xl flex items-center gap-3.5 shadow-xl">
              <ShieldCheck className="h-6 w-6 text-amber-400! shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-50!">ISO 9001 Issuer · MCA Registered</p>
                <p className="text-xs text-slate-300!">Arzon Global Pvt. Ltd. · Official Enrolment Portal</p>
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
      <Label htmlFor={id} className="text-xs font-bold text-slate-200! flex items-center gap-1.5">
        {Icon && <Icon className="h-4 w-4 text-teal-400!" />}
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
        className="h-12 rounded-xl border border-white/20 bg-white/[0.06] text-slate-50! font-semibold placeholder:text-slate-400 focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400/40 transition-all"
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
