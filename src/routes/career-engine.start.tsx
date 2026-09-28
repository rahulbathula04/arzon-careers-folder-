import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { CareerShell } from "@/components/career/CareerShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      { title: "Begin Career Assessment · Arzon Global" },
      {
        name: "description",
        content: "Where should we send your free personalised healthcare career report?",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search) => z.object({ role: z.string().optional().catch(undefined) }).parse(search),
  component: StartPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
  whatsappOptin: z.boolean(),
  // Honeypot: must stay empty. Real users never see or fill this.
  website: z.string().max(0, "request rejected").optional().default(""),
});

function StartPage() {
  const navigate = useNavigate();
  const { role: roleContext } = Route.useSearch();
  const existing = getProfile();
  const [form, setForm] = useState({
    name: existing?.name ?? "",
    phone: existing?.phone ?? "",
    whatsappOptin: existing?.whatsappOptin ?? true,
    website: "",
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (roleContext && typeof window !== "undefined") window.sessionStorage.setItem("arzon_career_engine_role_context", roleContext);
    trackCEFunnelStep({ step: "lead_form" });
    track("ce_start_viewed", { props: { flow: "v2" } });
  }, [roleContext]);

  const runFlow = async (validData: z.infer<typeof schema>) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setBusy(true);
    setErrorMsg(null);

    try {
      saveProfile({
        name: validData.name,
        phone: validData.phone,
        email: `whatsapp-${validData.phone}@arzon.local`,
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
            email: `whatsapp-${validData.phone}@arzon.local`,
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

      track("lead_form_complete", {
        props: {
          flow: "career_engine",
          has_whatsapp_consent: validData.whatsappOptin,
        },
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
      <div className="arzon-engine-intro text-center space-y-3">
        <div>
          <PremiumChip variant="gold" size="sm">
            FREE · NO LOGIN · ABOUT 6 MINUTES
          </PremiumChip>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
          Find the career paths worth exploring.
        </h1>
        <p className="text-base text-[var(--arzon-ink-soft)] mx-auto max-w-md font-sans leading-relaxed">
          Answer about 42 questions and we'll map you to the healthcare role you're most likely to land —
          with an honest "not a fit" rating if the data says so.
        </p>
        <p className="mx-auto inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-[var(--arzon-ink-muted)] font-bold">
          <span>42 questions</span>
          <span>·</span>
          <span>~6 minutes</span>
          <span>·</span>
          <span>13 traits</span>
          <span>·</span>
          <span>6 paths</span>
          <span>·</span>
          <span>Role readiness signal</span>
        </p>
      </div>

      {/* What the assessment looks at */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {["Role fit","Work style","Readiness"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--arzon-border)] bg-white p-3.5 text-center shadow-xs transition-colors hover:border-[#1B3F8B]/40"
          >
            <ShieldCheck className="mx-auto h-4 w-4 text-[var(--arzon-blue-700)]" />
            <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--arzon-ink-soft)]">
              {label}
            </p>
            <div className="mx-auto mt-2 h-1 w-full max-w-[60px] rounded-full bg-[var(--arzon-blue-100)]">
              <div className="h-full w-1/3 rounded-full bg-[var(--arzon-navy-950)]" />
            </div>
            <p className="mt-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">
              Locked
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        aria-busy={busy}
        className="arzon-engine-form mt-7 space-y-5 rounded-[1.25rem] border border-[var(--arzon-border)] bg-white p-6 sm:p-8 shadow-sm"
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
          <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--arzon-ink-soft)]">
            <span>Step {step} of 2</span>
            <span>{step === 1 ? "Who are you?" : "How do we reach you?"}</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={step * 50}
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--arzon-blue-100)]"
          >
            <div
              className="relative h-full rounded-full bg-[var(--arzon-navy-950)] transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <div>
            <Label htmlFor="name" className="text-xs font-bold text-[var(--arzon-ink-soft)]">
              Full name
            </Label>
            <Input
              id="name"
              autoComplete="name"
              required
              autoFocus
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 h-12 rounded-xl border border-[var(--arzon-border-strong)] bg-[var(--arzon-surface-subtle)]/50 text-[var(--arzon-ink)] placeholder:text-[var(--arzon-ink-muted)] focus:bg-white focus-visible:border-[#1B3F8B] focus-visible:ring-1 focus-visible:ring-[#1B3F8B] transition-all"
              placeholder="Your name"
            />
            <p className="mt-2 text-xs text-[var(--arzon-ink-muted)] font-sans">We'll use this on your career report.</p>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-xs font-bold text-[var(--arzon-ink-soft)]">
                WhatsApp number
              </Label>
              <div className="mt-1.5 flex items-center shadow-xs">
                <span className="inline-flex h-12 items-center rounded-l-xl border border-r-0 border-stone-300 bg-[var(--arzon-blue-100)] px-4 text-sm font-mono font-bold text-[var(--arzon-ink-soft)]">
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
                  className="h-12 rounded-l-none rounded-r-xl border border-stone-300 bg-[var(--arzon-surface-subtle)]/50 text-[var(--arzon-ink)] placeholder:text-[var(--arzon-ink-muted)] focus:bg-white focus-visible:border-[#1B3F8B] focus-visible:ring-1 focus-visible:ring-[#1B3F8B] transition-all"
                  placeholder="98765 43210"
                />
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-sky-200 bg-sky-50/60 p-4 text-xs text-[var(--arzon-ink-soft)] font-sans shadow-2xs hover:bg-sky-50 transition-colors">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-stone-300 accent-[var(--arzon-blue-700)]"
                checked={form.whatsappOptin}
                onChange={(e) => setForm({ ...form, whatsappOptin: e.target.checked })}
              />
              <span>Yes, send my career report and counsellor follow-up on WhatsApp.</span>
            </label>

            <p className="flex items-center gap-1.5 text-xs text-[var(--arzon-ink-soft)] mt-3 font-sans">
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
              className="arzon-button-secondary inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 text-sm font-bold shadow-2xs transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-[var(--arzon-ink-soft)]" /> Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          <button
            type="submit"
            disabled={busy}
            aria-disabled={busy}
            className="arzon-button-primary inline-flex h-12 sm:min-w-[220px] items-center justify-center rounded-full px-6 text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            {busy ? (
              <AiThinkingLoader label="Thinking…" size="sm" textClassName="text-white" />
            ) : step < 2 ? (
              <>
                Next <ArrowRight className="ml-1.5 h-4 w-4 text-white" />
              </>
            ) : (
              <>
                Start the assessment <ArrowRight className="ml-1.5 h-4 w-4 text-white" />
              </>
            )}
          </button>
        </div>

        <p className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--arzon-ink-muted)] pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--arzon-amber-600)]" /> Private · Your answers are used to generate your assessment
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link to="/career-engine" className="text-xs text-[var(--arzon-ink-muted)] hover:text-[var(--arzon-ink-soft)] underline">
          ← Back to Overview
        </Link>
      </div>
    </CareerShell>
  );
}
