import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, CalendarClock } from "lucide-react";
import { z } from "zod";
import { CareerShell } from "@/components/career/CareerShell";
import { Input } from "@/components/ui/input";
import { computeResult } from "@/data/careerEngineScoring";
import {
  getSessionId,
  submitLead,
  startSession,
  recordAnswer,
  humanizeCareerEngineError,
  getAttemptId,
  getLeadId,
} from "@/lib/careerEngineApi";
import { toast } from "sonner";
import { track } from "@/lib/track";
import { trackCECtaClicked, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
import { NEXT_COHORT } from "@/components/landing/constants";

export const Route = createFileRoute("/career-engine/lead")({
  head: () => ({
    meta: [
      { title: "Your result is ready. Arzon Career Engine" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LeadPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[5-9]\d{9}$/),
  email: z.string().trim().email().max(120),
  whatsapp: z.boolean(),
});

function sanitizePhone(v: string): string {
  const digits = v.replace(/\D/g, "");
  if (digits.length >= 10) return digits.slice(-10);
  if (digits.length > 0) return digits.padEnd(10, "0");
  return "9876543210";
}

const fieldValid = {
  name: (v: string) => v.trim().length >= 2 && v.trim().length <= 80,
  phone: (v: string) => v.replace(/\D/g, "").length >= 9,
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

  useEffect(() => {
    if (typeof window === "undefined") return;
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
      // 1. Instantly compute result locally from cached or current answers
      const currentAnswers = answers || JSON.parse(sessionStorage.getItem("ce_answers") || "{}");
      const result = computeResult(currentAnswers);

      // 2. Cache in sessionStorage immediately
      sessionStorage.setItem("ce_result", JSON.stringify(result));

      // 3. Ensure session exists
      let sid = getSessionId();
      if (!sid) {
        try {
          sid = await startSession(currentAnswers.stream || "pharmacovigilance");
          for (const [qid, val] of Object.entries(currentAnswers)) {
            try {
              await recordAnswer(sid, qid, val as string);
            } catch {
              /* noop */
            }
          }
        } catch (e) {
          console.warn("Session initialization failed, continuing", e);
        }
      }

      // 4. Submit lead to backend (with graceful fallback if backend is offline)
      let leadId = getLeadId();
      try {
        if (sid) {
          leadId = await submitLead({
            sessionId: sid,
            name: data.name,
            phone: `91${data.phone}`,
            email: data.email,
            whatsappOptin: data.whatsapp,
            result,
          });
        }
      } catch (err) {
        console.warn("Backend submit lead failed, continuing with client lead ID", err);
      }

      if (!leadId) {
        leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      }
      sessionStorage.setItem("ce_lead_id", leadId);

      try {
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
      } catch {
        /* noop */
      }

      // 5. Instantly navigate to /career-engine/result
      navigate({ to: "/career-engine/result", search: { id: leadId } }).catch(() => {
        window.location.href = `/career-engine/result?id=${leadId}`;
      });
    } catch (err) {
      console.error("Lead submission error", err);
      // Even on outer error, navigate to result with cached data
      const leadId = getLeadId() || `lead_${Date.now()}`;
      window.location.href = `/career-engine/result?id=${leadId}`;
    } finally {
      inFlightRef.current = false;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current) return;

    const cleanName = form.name.trim().length >= 2 ? form.name.trim() : "Candidate";
    const cleanPhone = sanitizePhone(form.phone);
    const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim());
    const cleanEmail = isEmailValid ? form.email.trim() : "candidate@arzon.in";

    const payload = {
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      whatsapp: form.whatsapp,
    };

    await runSubmit(payload);
  };

  return (
    <CareerShell>
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4ED8]/30 bg-[#1D4ED8]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
          <Check className="h-3.5 w-3.5 text-[#1D4ED8]" /> Score ready · 30-sec unlock
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-4">
          Unlock your full result
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-300">
          Quick details so we can send your report and reserve your slot for the next batch.
        </p>
        <p className="mx-auto mt-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-amber-200/85">
          <CalendarClock className="h-3.5 w-3.5 text-amber-400" /> Next batch ·{" "}
          {NEXT_COHORT.startsLabel}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        aria-busy={busy}
        className="mx-auto mt-6 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-4"
      >
        {/* Inline progress dots */}
        <div className="mb-2 flex items-center justify-center gap-2">
          {([validity.name, validity.phone, validity.email] as const).map((ok, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${ok ? "w-6 bg-[#1D4ED8]" : "w-3 bg-white/15"}`}
            />
          ))}
          <span className="ml-1 font-mono text-xs uppercase tracking-wider text-slate-400">
            3 fields · ~30 sec
          </span>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex justify-between"
          >
            <span>Your Name</span>
            {validity.name && <span className="text-emerald-400">✓ OK</span>}
          </label>
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
            className="h-11 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500 rounded-xl"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex justify-between"
          >
            <span>WhatsApp Number</span>
            {validity.phone && <span className="text-emerald-400">✓ OK</span>}
          </label>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-11 shrink-0 items-center rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-300 font-mono">
              +91
            </span>
            <Input
              ref={phoneRef}
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && validity.phone) {
                  e.preventDefault();
                  emailRef.current?.focus();
                }
              }}
              placeholder="10-digit mobile number"
              className="h-11 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500 rounded-xl"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex justify-between"
          >
            <span>Email for Your Report</span>
            {validity.email && <span className="text-emerald-400">✓ OK</span>}
          </label>
          <Input
            ref={emailRef}
            id="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@example.com"
            className="h-11 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500 rounded-xl"
          />
        </div>

        {/* Optin Checkbox */}
        <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#1D4ED8] focus:ring-[#1D4ED8]"
          />
          <span className="leading-snug">
            Send my report and next-batch updates on WhatsApp. You can opt out anytime — one tap.
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={busy}
          className="text-sm h-12 px-4 w-full flex items-center justify-center gap-2 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] mt-2"
        >
          {busy ? (
            <span>Unlocking your report...</span>
          ) : (
            <span>See my result & save my slot →</span>
          )}
        </button>
      </form>
    </CareerShell>
  );
}
