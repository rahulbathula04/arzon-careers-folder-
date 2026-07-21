import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Loader2, Check, CalendarClock, Zap } from "lucide-react";
import { z } from "zod";
import { CareerShell } from "@/components/career/CareerShell";
import { StartFreshButton } from "@/components/career/StartFreshButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { computeResult } from "@/data/careerEngineScoring";
import {
  getSessionId,
  submitLead,
  startSession,
  recordAnswer,
  humanizeCareerEngineError,
} from "@/lib/careerEngineApi";
import { toast } from "sonner";
import { track } from "@/lib/track";
import { trackCECtaClicked, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
import { getAttemptId } from "@/lib/careerEngineApi";
import { NEXT_COHORT } from "@/components/landing/constants";

export const Route = createFileRoute("/career-engine/lead")({
  // Open route: reached after the anonymous test completes. The component
  // itself checks for cached answers and bounces back to /test if missing.
  head: () => ({
    meta: [
      { title: "Your result is ready. Arzon Career Engine" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LeadPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
  email: z.string().trim().email("Enter a valid email").max(120),
  whatsapp: z.boolean(),
});

/** Per-field validators — used to drive inline tick marks + auto-advance. */
const fieldValid = {
  name: (v: string) => v.trim().length >= 2 && v.trim().length <= 80,
  phone: (v: string) => /^[6-9]\d{9}$/.test(v.trim()),
  email: (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()) && v.trim().length <= 120,
};

function LeadPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", whatsapp: true });
  const [busy, setBusy] = useState(false);
  const inFlightRef = useRef(false);
  const [answers, setAnswers] = useState<Record<string, string> | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const validity = useMemo(
    () => ({
      name: fieldValid.name(form.name),
      phone: fieldValid.phone(form.phone),
      email: fieldValid.email(form.email),
    }),
    [form.name, form.phone, form.email],
  );

  const allValid = validity.name && validity.phone && validity.email;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Funnel step: anonymous user landed on /lead after completing the test.
    try {
      trackCEFunnelStep({
        step: "lead_form",
        sessionId: getSessionId(),
        attemptId: getAttemptId(),
      });
    } catch {
      /* noop */
    }
    try {
      const a = JSON.parse(sessionStorage.getItem("ce_answers") || "{}");
      if (!a || !a.stream) {
        navigate({ to: "/career-engine/test" }).catch(() => {
          window.location.href = "/career-engine/test";
        });
        return;
      }
      setAnswers(a);
    } catch {
      navigate({ to: "/career-engine/test" }).catch(() => {
        window.location.href = "/career-engine/test";
      });
    }
  }, [navigate]);

  const runSubmit = async (data: z.infer<typeof schema>) => {
    if (!answers) return;
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setBusy(true);
    trackCECtaClicked({
      step: "lead_form",
      target: "submit",
      sessionId: getSessionId(),
      attemptId: getAttemptId(),
    });
    try {
      const result = computeResult(answers);

      // Ensure session exists; if not, create + replay answers.
      let sid = getSessionId();
      if (!sid) {
        sid = await startSession(answers.stream);
        for (const [qid, val] of Object.entries(answers)) {
          try {
            await recordAnswer(sid, qid, val);
          } catch {
            /* noop */
          }
        }
      }

      const leadId = await submitLead({
        sessionId: sid,
        name: data.name,
        phone: `91${data.phone}`,
        email: data.email,
        whatsappOptin: data.whatsapp,
        result,
      });
      track("lead_submitted", {
        session_id: sid,
        lead_id: leadId,
        props: {
          archetype: result.archetypeId,
          fit_score: result.fitScore,
          attempt_id: getAttemptId(),
        },
        dedupeKey: `lead_submitted:${getAttemptId() ?? sid ?? leadId}`,
      });

      sessionStorage.setItem("ce_result", JSON.stringify(result));
      navigate({ to: "/career-engine/result", search: { id: leadId } }).catch(() => {
        window.location.href = `/career-engine/result?id=${leadId}`;
      });
    } catch (err) {
      console.error(err);
      toast.error(humanizeCareerEngineError(err, "Something went wrong. Please try again."), {
        action: {
          label: "Retry",
          onClick: () => {
            void runSubmit(data);
          },
        },
      });
      setBusy(false);
    } finally {
      inFlightRef.current = false;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current) return;
    if (!answers) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      try {
        const fieldErrors = parsed.error.flatten().fieldErrors;
        track("lead_form_validation_error", {
          session_id: getSessionId(),
          props: {
            attempt_id: getAttemptId(),
            fields: Object.keys(fieldErrors),
            first_error: parsed.error.issues[0]?.message ?? null,
          },
        });
      } catch {
        /* noop */
      }
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    await runSubmit(parsed.data);
  };

  return (
    <CareerShell>
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-eyebrow">
          <Check className="h-3 w-3" /> Score ready · 30-sec unlock
        </span>
        <h1 className="h-display mt-4">Unlock your full result</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/75">
          Quick details so we can send your report and reserve your slot for the next batch.
        </p>
        <p className="mx-auto mt-2 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-amber-200/85">
          <CalendarClock className="h-3 w-3" /> Next batch · {NEXT_COHORT.startsLabel}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        aria-busy={busy}
        className="mx-auto mt-6 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
      >
        {/* Inline progress dots — visual proof of "lightweight". */}
        <div className="mb-4 flex items-center justify-center gap-2">
          {([validity.name, validity.phone, validity.email] as const).map((ok, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-all duration-300 ${ok ? "w-6 bg-accent-glow" : "w-3 bg-white/15"}`}
            />
          ))}
          <span className="ml-1 font-mono text-micro uppercase tracking-[0.18em] text-white/70">
            3 fields · ~30 sec
          </span>
        </div>

        {/* Name */}
        <CompactField label="Your name" done={validity.name}>
          <Input
            id="name"
            autoComplete="name"
            autoFocus
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && validity.name) {
                e.preventDefault();
                phoneRef.current?.focus();
              }
            }}
            placeholder="Full name"
            className="h-11 border-white/15 bg-white/[0.04] pr-9 text-white placeholder:text-white/80"
          />
        </CompactField>

        {/* Phone */}
        <CompactField label="WhatsApp number" done={validity.phone} className="mt-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-11 shrink-0 items-center rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-white/70">
              +91
            </span>
            <div className="relative flex-1">
              <Input
                id="phone"
                ref={phoneRef}
                inputMode="numeric"
                autoComplete="tel"
                required
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && validity.phone) {
                    e.preventDefault();
                    emailRef.current?.focus();
                  }
                }}
                placeholder="98765 43210"
                className="h-11 border-white/15 bg-white/[0.04] pr-9 text-white placeholder:text-white/80"
              />
              {validity.phone && <FieldTick />}
            </div>
          </div>
        </CompactField>

        {/* Email */}
        <CompactField label="Email for your report" done={validity.email} className="mt-3">
          <Input
            id="email"
            ref={emailRef}
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            className="h-11 border-white/15 bg-white/[0.04] pr-9 text-white placeholder:text-white/80"
          />
        </CompactField>

        <label className="mt-4 flex items-start gap-2 rounded-lg bg-white/[0.02] px-3 py-2 text-micro text-white/70 ring-1 ring-white/10">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-sky-400"
            checked={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.checked })}
          />
          <span>
            Send my report and next-batch updates on WhatsApp.
            <span className="block text-white/65">You can opt out anytime — one tap.</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={busy || !allValid}
          aria-disabled={busy || !allValid}
          className="btn btn-primary btn-block btn-glow-pulse mt-4"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Unlocking…
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" /> See my result & save my slot{" "}
              <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/70">
          <ShieldCheck className="h-3 w-3 text-gold" /> Private · No spam · No selling
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link to="/career-engine/test" className="text-xs text-white/80 hover:text-white">
          ← Back to test
        </Link>
      </div>

      <div className="mt-4 flex justify-center">
        <StartFreshButton label="Not your result? Start fresh" />
      </div>
    </CareerShell>
  );
}

/** Tight label + slot pattern with a green tick when the field is valid. */
function CompactField({
  label,
  done,
  className = "",
  children,
}: {
  label: string;
  done: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <Label className="text-micro uppercase tracking-wide text-white/80">{label}</Label>
        {done && (
          <span className="inline-flex items-center gap-1 font-mono text-micro uppercase tracking-[0.18em] text-eyebrow">
            <Check className="h-3 w-3" /> ok
          </span>
        )}
      </div>
      <div className="relative mt-1.5">{children}</div>
    </div>
  );
}

function FieldTick() {
  return (
    <Check
      aria-hidden="true"
      className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-eyebrow"
    />
  );
}
