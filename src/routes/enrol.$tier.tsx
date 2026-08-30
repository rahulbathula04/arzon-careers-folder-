import { useState } from "react";
import { createFileRoute, useNavigate, notFound, Outlet, useMatches } from "@tanstack/react-router";
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
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 sm:col-span-2">
                  {error}
                </div>
              )}

              <div className="mt-4 flex flex-col-reverse items-stretch justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-600 font-sans">
                  <Lock className="h-4 w-4 text-[#8A6D1F]" />
                  <span>256-Bit TLS Secured · Razorpay Gateway</span>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  aria-busy={submitting}
                  style={{ color: "#FFFFFF" }}
                  className="min-w-[220px] rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-bold text-sm h-12 shadow-md cursor-pointer disabled:opacity-80 transition-all"
                >
                  {submitting ? (
                    <AiThinkingLoader label="Thinking & preparing enrolment intent…" size="sm" textClassName="text-white" />
                  ) : (
                    <>
                      <span>Continue to Payment</span>
                      <ArrowRight className="ml-1.5 h-4 w-4 text-white" strokeWidth={2.5} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Sidebar: Programme Perks & Verification */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#8A6D1F]">
                    Selected Path
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-0.5">{meta.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 block font-medium">Standard Fee</span>
                  <span className="font-serif text-2xl font-bold text-[#1B3F8B] tabular-nums">
                    {formatInr(meta.mrpInr)}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
                  Included Deliverables
                </p>
                <ul className="space-y-3 text-xs text-stone-700 font-sans">
                  {meta.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span className="leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Official Accreditation Seal */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 flex items-center gap-3.5 shadow-xs">
              <ShieldCheck className="h-6 w-6 text-[#8A6D1F] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#1A1A1A]">ISO 9001 Issuer · MCA Registered</p>
                <p className="text-xs text-stone-500 font-sans">
                  Arzon Global Pvt. Ltd. · Official Enrolment Portal
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
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
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 text-[#1B3F8B]" />}
        <span>{label}</span>
        {required && <span className="text-rose-500">*</span>}
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
        className="h-11 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 font-medium placeholder:text-stone-400 focus:bg-white focus-visible:border-[#1B3F8B] focus-visible:ring-2 focus-visible:ring-[#1B3F8B]/20 transition-all font-sans"
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
