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
      <main className="min-h-screen overflow-x-clip bg-[#F7F3EC] text-[#07152F]">
        <section className="relative overflow-hidden bg-[#07152F] text-white">
          <div className="absolute inset-0"><img src="/images/bpharm-female-graduate-hero.jpg" alt="" className="h-full w-full object-cover opacity-25" loading="eager" /><div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/90 to-[#07152F]/45" /></div>
          <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200">START · FREE CAREER ENGINE</p>
                <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.9] tracking-[-0.04em]">Let’s understand your direction before you choose a course.</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">About 6 minutes. Your answers are used to create a role-fit report, capability signals and a practical next-step plan.</p>
                <div className="mt-7 flex flex-wrap gap-2">{["~6 minutes", "42 questions", "Role signals", "Private"].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/60">{item}</span>)}</div>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06]">
                <img src="/images/pv-career-graduate.jpg" alt="" className="h-52 w-full object-cover opacity-75" loading="lazy" />
                <div className="grid grid-cols-3 gap-2 p-4">
                  {["Explore", "Assess", "Plan"].map((item, i) => <div key={item} className="rounded-xl bg-white/[0.06] p-3"><p className="font-mono text-[8px] text-blue-200">0\${i + 1}</p><p className="mt-2 text-xs font-bold">{item}</p></div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.65fr_1.35fr]">
          <aside className="self-start lg:sticky lg:top-24">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#2F5F8F]">WHAT YOU’LL GET</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">A report built around your answers.</h2>
            <div className="mt-6 space-y-3">
              {[
                ["01", "Role fit", "Which role paths are worth exploring."],
                ["02", "Capability signals", "What your answers suggest you should strengthen."],
                ["03", "Next step", "A preparation route to investigate after the assessment."],
              ].map(([n, title, copy]) => <div key={n} className="rounded-2xl border border-[#07152F]/10 bg-white p-4"><span className="font-mono text-[9px] font-bold text-[#2F5F8F]">{n}</span><h3 className="mt-2 text-sm font-bold">{title}</h3><p className="mt-1 text-xs leading-5 text-[#07152F]/50">{copy}</p></div>)}
            </div>
          </aside>

          <form onSubmit={onSubmit} aria-busy={busy} className="rounded-[2rem] border border-[#07152F]/10 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(7,21,47,0.45)] sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <div><p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#2F5F8F]">STEP {step} OF 2</p><h2 className="mt-2 font-serif text-3xl">{step === 1 ? "Start with your name." : "Where should we send your report?"}</h2></div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#E8EEF6] font-mono text-[10px] font-bold text-[#2F5F8F]">{step === 1 ? "50%" : "100%"}</span>
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#E8EEF6]"><div className="h-full rounded-full bg-[#2563EB] transition-all" style={{ width: \`\${step * 50}%\` }} /></div>

            {step === 1 ? (
              <div className="mt-8">
                <Label htmlFor="name" className="text-xs font-bold text-[#07152F]/65">Full name</Label>
                <Input id="name" autoComplete="name" required autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-13 rounded-xl border-[#07152F]/15 bg-[#F7F3EC] px-4 text-base text-[#07152F] placeholder:text-[#07152F]/35 focus:bg-white focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]" placeholder="Your name" />
                <p className="mt-3 text-xs leading-5 text-[#07152F]/45">We’ll use this on your career report. You do not need to create an account.</p>
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                <div>
                  <Label htmlFor="phone" className="text-xs font-bold text-[#07152F]/65">WhatsApp number</Label>
                  <div className="mt-2 flex">
                    <span className="inline-flex h-13 items-center rounded-l-xl border border-r-0 border-[#07152F]/15 bg-[#E8EEF6] px-4 text-sm font-bold text-[#07152F]/55">+91</span>
                    <Input id="phone" inputMode="numeric" autoComplete="tel" required autoFocus maxLength={10} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} className="h-13 rounded-l-none rounded-r-xl border-[#07152F]/15 bg-[#F7F3EC] px-4 text-base text-[#07152F] placeholder:text-[#07152F]/35 focus:bg-white focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]" placeholder="98765 43210" />
                  </div>
                </div>
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#07152F]/10 bg-[#F7F3EC] p-4 text-xs leading-5 text-[#07152F]/60">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#2563EB]" checked={form.whatsappOptin} onChange={(e) => setForm({ ...form, whatsappOptin: e.target.checked })} />
                  <span>Yes, send my career report and counsellor follow-up on WhatsApp.</span>
                </label>
                <p className="flex items-center gap-2 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Private · No spam · Never shared</p>
              </div>
            )}

            {errorMsg ? <div role="alert" className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-800">{errorMsg}</div> : null}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              {step > 1 ? <button type="button" onClick={goBack} disabled={busy} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#07152F]/15 bg-white px-5 text-sm font-bold text-[#07152F]">Back</button> : <span />}
              <button type="submit" disabled={busy} aria-disabled={busy} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 text-sm font-bold text-white shadow-[0_15px_35px_-18px_rgba(37,99,235,0.9)] transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60">
                {busy ? <AiThinkingLoader label="Preparing…" size="sm" textClassName="text-white" /> : step < 2 ? <>Continue <ArrowRight className="h-4 w-4" /></> : <>Start the assessment <ArrowRight className="h-4 w-4" /></>}
              </button>
            </div>
            <p className="mt-6 text-center font-mono text-[8px] uppercase tracking-[0.15em] text-[#07152F]/35">Your answers are used only to generate your assessment experience.</p>
          </form>
        </section>
      </main>
    </CareerShell>
  );
}
