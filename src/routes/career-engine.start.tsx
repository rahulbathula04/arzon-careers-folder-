import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowRight, ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { CareerShell } from "@/components/career/CareerShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ACRI_DIMENSIONS } from "@/components/landing/constants";
import {
  startSession,
  createLeadEarly,
  saveProfile,
  getProfile,
  getSessionId,
  startFreshAttempt,
  getAttemptId,
  hasResumableAttempt,
} from "@/lib/careerEngineApi";
import { toast } from "sonner";
import { track } from "@/lib/track";
import { trackAttemptStarted, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
import {
  markReadinessSubmitted,
  markReadinessStarted,
} from "@/lib/readinessJourney";
import { trackEvent } from "@/lib/analytics";
import { PremiumChip } from "@/components/ui/PremiumChip";

export const Route = createFileRoute("/career-engine/start")({
  head: () => ({
    meta: [
      { title: "Begin Readiness Assessment · ACRI Preview · Arzon" },
      {
        name: "description",
        content: "Where should we send your free personalised healthcare career report?",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StartPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
  email: z.string().trim().email("Enter a valid email").max(120),
  whatsappOptin: z.boolean(),
  // Honeypot: must stay empty. Real users never see or fill this.
  website: z.string().max(0, "request rejected").optional().default(""),
});

function StartPage() {
  const navigate = useNavigate();
  const existing = getProfile();
  const [form, setForm] = useState({
    name: existing?.name ?? "",
    phone: existing?.phone ?? "",
    email: existing?.email ?? "",
    whatsappOptin: existing?.whatsappOptin ?? true,
    website: "",
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    trackCEFunnelStep({ step: "lead_form" });
    track("ce_start_viewed", { props: { flow: "v2" } });
  }, []);

  const runFlow = async (validData: z.infer<typeof schema>) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setBusy(true);
    setErrorMsg(null);

    try {
      saveProfile({
        name: validData.name,
        phone: validData.phone,
        email: validData.email,
        whatsappOptin: validData.whatsappOptin,
      });

      markReadinessStarted();

      let attemptId = getAttemptId();
      if (!attemptId || !hasResumableAttempt()) {
        attemptId = startFreshAttempt();
      }

      let sessionId = getSessionId();
      if (!sessionId) {
        try {
          sessionId = await startSession();
        } catch {
          // session init fallback
        }
      }

      trackAttemptStarted({
        sessionId: sessionId ?? null,
        attemptId: attemptId ?? null,
      });

      let leadId: string | undefined;
      if (sessionId) {
        try {
          leadId = await createLeadEarly({
            sessionId,
            name: validData.name,
            email: validData.email,
            phone: validData.phone,
            whatsappOptin: validData.whatsappOptin,
          });
        } catch {
          // lead creation best-effort
        }
      }

      markReadinessSubmitted({ leadId });

      trackEvent("readiness_lead_captured", {
        step: 1,
        has_whatsapp_consent: validData.whatsappOptin,
      });

      navigate({ to: "/career-engine/test" });
    } catch (err) {
      console.warn("start.test submit fallback active", err);
      window.location.href = "/career-engine/test";
    } finally {
      inFlightRef.current = false;
    }
  };

  const validateStep = (s: 1 | 2): string | null => {
    if (s === 1) {
      const r = schema.pick({ name: true }).safeParse({ name: form.name });
      return r.success ? null : (r.error.issues[0]?.message ?? "Please enter your name");
    }
    if (s === 2) {
      const r = schema.pick({ phone: true }).safeParse({ phone: form.phone });
      return r.success ? null : (r.error.issues[0]?.message ?? "Please check your phone number");
    }
    return null;
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      setErrorMsg(err);
      toast.error(err);
      return;
    }
    setErrorMsg(null);
    setStep((s) => (s < 2 ? ((s + 1) as 1 | 2) : s));
  };

  const goBack = () => {
    setErrorMsg(null);
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2) : s));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current) return;
    if (step !== 2) {
      goNext();
      return;
    }
    const formWithDummyEmail = {
      ...form,
      email: `whatsapp-${form.phone}@arzon.local`,
    };
    const parsed = schema.safeParse(formWithDummyEmail);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Please check your details";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }
    await runFlow(parsed.data);
  };

  return (
    <CareerShell>
      <div className="text-center space-y-3">
        <div>
          <PremiumChip variant="gold" size="sm">
            FREE · NO LOGIN · 6 MINUTES
          </PremiumChip>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
          Get your free career fit report.
        </h1>
        <p className="text-base text-stone-700 mx-auto max-w-md font-sans leading-relaxed">
          Answer 40 questions and we'll map you to the healthcare role you're most likely to land —
          with an honest "not a fit" rating if the data says so.
        </p>
        <p className="mx-auto inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-stone-500 font-bold">
          <span>40 questions</span>
          <span>·</span>
          <span>~6 minutes</span>
          <span>·</span>
          <span>13 traits</span>
          <span>·</span>
          <span>6 paths</span>
          <span>·</span>
          <span>Honest fit rating</span>
        </p>
      </div>

      {/* Locked preview - 3 ACRI dimensions teased */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {ACRI_DIMENSIONS.slice(0, 3).map((d) => (
          <div
            key={d.id}
            className="rounded-xl border border-stone-200 bg-white p-3.5 text-center shadow-xs transition-colors hover:border-[#1B3F8B]/40"
          >
            <Lock className="mx-auto h-4 w-4 text-[#8A6D1F]" />
            <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-stone-800">
              {d.label}
            </p>
            <div className="mx-auto mt-2 h-1 w-full max-w-[60px] rounded-full bg-stone-100">
              <div className="h-full w-1/3 rounded-full bg-[#1B3F8B]" />
            </div>
            <p className="mt-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-stone-400">
              Locked
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        aria-busy={busy}
        className="mt-7 space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs"
      >
        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        >
          <input
            id="company_url"
            name="company_url"
            type="text"
            tabIndex={-1}
            autoComplete="new-password"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <span>Step {step} of 2</span>
            <span>{step === 1 ? "Who are you?" : "How do we reach you?"}</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={step * 50}
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-100"
          >
            <div
              className="relative h-full rounded-full bg-[#1B3F8B] transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <div>
            <Label htmlFor="name" className="text-xs font-bold text-stone-800">
              Full name
            </Label>
            <Input
              id="name"
              autoComplete="name"
              required
              autoFocus
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 h-12 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:bg-white focus-visible:border-[#1B3F8B] focus-visible:ring-1 focus-visible:ring-[#1B3F8B] transition-all"
              placeholder="Your name"
            />
            <p className="mt-2 text-xs text-stone-500 font-sans">We'll use this on your career report.</p>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-xs font-bold text-stone-800">
                WhatsApp number
              </Label>
              <div className="mt-1.5 flex items-center shadow-xs">
                <span className="inline-flex h-12 items-center rounded-l-xl border border-r-0 border-stone-300 bg-stone-100 px-4 text-sm font-mono font-bold text-stone-700">
                  +91
                </span>
                <Input
                  id="phone"
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                  autoFocus
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                  }
                  className="h-12 rounded-l-none rounded-r-xl border border-stone-300 bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:bg-white focus-visible:border-[#1B3F8B] focus-visible:ring-1 focus-visible:ring-[#1B3F8B] transition-all"
                  placeholder="98765 43210"
                />
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-sky-200 bg-sky-50/60 p-4 text-xs text-stone-700 font-sans shadow-2xs hover:bg-sky-50 transition-colors">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-stone-300 accent-[#1B3F8B]"
                checked={form.whatsappOptin}
                onChange={(e) => setForm({ ...form, whatsappOptin: e.target.checked })}
              />
              <span>Yes, send my career report and counsellor follow-up on WhatsApp.</span>
            </label>

            <p className="flex items-center gap-1.5 text-xs text-stone-600 mt-3 font-sans">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Private · No spam · Never shared
            </p>
          </div>
        ) : null}

        {errorMsg ? (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-800 font-semibold"
          >
            {errorMsg}
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={busy}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 px-4 text-sm font-bold text-stone-800 shadow-2xs transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-stone-800" /> Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          <button
            type="submit"
            disabled={busy}
            aria-disabled={busy}
            className="inline-flex h-12 sm:min-w-[220px] items-center justify-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-6 text-sm font-bold text-white shadow-md transition-all cursor-pointer"
          >
            {busy ? (
              <AiThinkingLoader label="Thinking…" size="sm" textClassName="text-white" />
            ) : step < 2 ? (
              <>
                Next <ArrowRight className="ml-1.5 h-4 w-4 text-white" />
              </>
            ) : (
              <>
                Unlock my ACRI Preview <ArrowRight className="ml-1.5 h-4 w-4 text-white" />
              </>
            )}
          </button>
        </div>

        <p className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-stone-500 pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#8A6D1F]" /> Private · ISO 9001 Audited Platform
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link to="/career-engine" className="text-xs text-stone-500 hover:text-stone-800 underline">
          ← Back to Overview
        </Link>
      </div>
    </CareerShell>
  );
}
