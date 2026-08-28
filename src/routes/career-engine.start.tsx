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
  humanizeCareerEngineError,
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
  getReadinessSessionId,
} from "@/lib/readinessJourney";
import { trackEvent } from "@/lib/analytics";

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
  whatsapp: z.boolean(),
  // Honeypot: must stay empty. Real users never see or fill this.
  website: z.string().max(0, "request rejected").optional().default(""),
});

function StartPage() {
  const navigate = useNavigate();
  const existing = getProfile();
  const [form, setForm] = useState({
    name: existing?.name ?? "",
    phone: existing?.phone ?? "",
    whatsapp: existing?.whatsappOptin ?? true,
    website: "",
  });
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const inFlightRef = useRef(false);
  const mountedAtRef = useRef<number>(Date.now());

  // Always start a fresh attempt when landing here: drop any stale answers,
  // result, session and seed so the next test draws a new 40 and re-scores
  // from scratch. Profile is preserved so the form stays pre-filled.
  useEffect(() => {
    // If the user already has an in-progress attempt (refresh / return visit
    // within the TTL), bounce them straight back to the test instead of
    // resetting their answers.
    if (hasResumableAttempt()) {
      navigate({ to: "/career-engine/test" }).catch(() => {
        window.location.href = "/career-engine/test";
      });
      return;
    }
    startFreshAttempt({ preserveProfile: true });
    mountedAtRef.current = Date.now();
    trackCEFunnelStep({ step: "lead_form", attemptId: getAttemptId() });
    // Ensure a journey row exists for this visit (even if the user reached
    // /start directly without going through the hero CTA).
    void markReadinessStarted();
    trackEvent("readiness_test_started", {
      surface: "career-engine-start",
      session_id: getReadinessSessionId(),
    });
  }, [navigate]);

  const runFlow = async (data: z.infer<typeof schema>) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setBusy(true);
    setErrorMsg(null);
    try {
      // 1. Ensure a session exists (with local fallback if offline)
      let sid = getSessionId();
      if (!sid) {
        try {
          sid = await startSession(undefined, { honeypot: data.website });
        } catch {
          sid = `sess_local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        }
      }
      try {
        trackAttemptStarted({ sessionId: sid, attemptId: getAttemptId() });
      } catch {
        /* noop */
      }

      // 2. Save the profile locally so the test page greets by candidate name
      const dummyEmail = `whatsapp-${data.phone}@arzon.local`;
      saveProfile({
        name: data.name,
        phone: data.phone,
        email: dummyEmail,
        whatsappOptin: data.whatsapp,
      });

      // 3. Capture early lead in background
      try {
        await createLeadEarly({
          sessionId: sid,
          name: data.name,
          phone: data.phone,
          email: dummyEmail,
          whatsappOptin: data.whatsapp,
        });
        track("lead_form_viewed", { session_id: sid });
        void markReadinessSubmitted();
        trackEvent("readiness_test_submitted", {
          surface: "career-engine-start",
          session_id: sid,
        });
      } catch (err) {
        console.warn("early lead capture skipped, continuing to test", err);
      }

      // 4. Always navigate directly to the 40-question readiness test
      navigate({ to: "/career-engine/test" }).catch(() => {
        window.location.href = "/career-engine/test";
      });
    } catch (err) {
      console.warn("start.test submit fallback active", err);
      // Fallback navigation guaranteed
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
    // We append a dummy email so schema validation passes
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
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/[0.08] px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-gold">
          <Lock className="h-3 w-3" /> Free · No login · 6 minutes
        </span>
        <h1 className="text-display mt-4 text-slate-50">Get your free career fit report.</h1>
        <p className="body-lg mx-auto mt-3 max-w-md text-white/75">
          Answer 40 questions and we'll map you to the healthcare role you're most likely to land -
          with an honest "not a fit" rating if the data says so. No spam. No calls unless you ask.
        </p>
        <p className="mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-micro uppercase tracking-[0.18em] text-white/50">
          <span>40 questions</span>
          <span className="text-white/25">·</span>
          <span>~6 minutes</span>
          <span className="text-white/25">·</span>
          <span>13 traits</span>
          <span className="text-white/25">·</span>
          <span>6 paths</span>
          <span className="text-white/25">·</span>
          <span>Honest "not a fit" rating</span>
        </p>
      </div>

      {/* Locked preview - 3 ACRI dimensions teased so the user knows what's coming */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {ACRI_DIMENSIONS.slice(0, 3).map((d) => (
          <div
            key={d.id}
            className="rounded-xl border border-white/10 bg-surface-dim p-3 text-center shadow-lg transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <Lock className="mx-auto h-3 w-3 text-white/30" />
            <p className="mt-2 font-mono text-micro uppercase tracking-[0.16em] text-white/80">
              {d.label}
            </p>
            <div className="mx-auto mt-2 h-1 w-full max-w-[60px] rounded-full bg-white/10">
              <div className="h-full w-1/3 rounded-full bg-white/20" />
            </div>
            <p className="mt-1.5 font-mono text-micro uppercase tracking-[0.16em] text-white/55">
              Locked
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        aria-busy={busy}
        className="mt-7 space-y-4 rounded-2xl border border-white/10 glass-panel-deep p-5 sm:p-7 shadow-2xl"
      >
        {/* Honeypot: hidden from users + assistive tech, bots fill it */}
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
          <div className="flex items-center justify-between font-mono text-micro uppercase tracking-[0.18em] text-white/55">
            <span>Step {step} of 2</span>
            <span>{step === 1 ? "Who are you?" : "How do we reach you?"}</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={step * 50}
            className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.5)] motion-safe:transition-[width] motion-safe:duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <div>
            <Label htmlFor="name" className="text-xs text-white/70">
              Full name
            </Label>
            <Input
              id="name"
              autoComplete="name"
              required
              autoFocus
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 h-12 rounded-xl border-white/15 bg-black/40 text-white placeholder:text-white/30 transition-colors focus-visible:border-sky-400 focus-visible:ring-1 focus-visible:ring-sky-400"
              placeholder="Your name"
            />
            <p className="mt-2 text-xs text-white/55">We'll use this on your career report.</p>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-xs text-white/70">
                WhatsApp number
              </Label>
              <div className="mt-1.5 flex items-center shadow-sm">
                <span className="inline-flex h-12 items-center rounded-l-xl border border-r-0 border-white/15 bg-black/40 px-4 text-sm text-white/70">
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
                  className="h-12 rounded-l-none rounded-r-xl border-white/15 bg-black/40 text-white placeholder:text-white/30 transition-colors focus-visible:border-sky-400 focus-visible:ring-1 focus-visible:ring-sky-400"
                  placeholder="98765 43210"
                />
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs text-white/80 shadow-inner transition-colors hover:border-sky-500/40 hover:bg-sky-500/10">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/40 accent-sky-500"
                checked={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.checked })}
              />
              <span>Yes, send my career report and counsellor follow-up on WhatsApp.</span>
            </label>

            <p className="flex items-center gap-1.5 text-xs text-white/60 mt-4">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-400" /> Private · No spam · Never sold
            </p>
          </div>
        ) : null}

        {errorMsg ? (
          <div
            role="alert"
            className="rounded-xl border border-rose-500/40 bg-rose-500/20 px-4 py-3 text-xs text-rose-200 font-medium"
          >
            {errorMsg}
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={busy}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 text-white" /> Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          <button
            type="submit"
            disabled={busy}
            aria-disabled={busy}
            className="inline-flex h-12 sm:min-w-[220px] items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
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

        <p className="flex items-center justify-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/60">
          <ShieldCheck className="h-3 w-3 text-gold" /> Private · No spam · Never sold
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link to="/career-engine" className="text-xs text-white/80 hover:text-white">
          ← Back
        </Link>
      </div>
    </CareerShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-2.5">
      <span className="font-mono text-micro uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>
      <span className="truncate text-sm text-white/90">{value || "-"}</span>
    </li>
  );
}
