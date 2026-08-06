import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2, MessageCircle, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { submitCourseEnquiry } from "@/lib/enquiries.functions";
import { EXP, getVariant, getVisitorUid, trackEvent } from "@/lib/experiments";
import { SEAT_FEE, SEAT_FEE_AMOUNT, waLink } from "@/components/landing/constants";
import type { TrackTheme } from "@/data/trackTheme";

const Schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{10,15}$/, "Enter a 10–15 digit phone"),
  city: z.string().trim().max(80).optional(),
  slot: z.string().max(60).optional(),
});

const SLOTS = ["Morning · 9–12", "Afternoon · 12–4", "Evening · 5–9"];

export type EnquiryFormProps = {
  courseSlug: string;
  courseTitle: string;
  placement: "hero" | "mid" | "final";
  theme: TrackTheme;
  onSubmitted?: () => void;
};

export function EnquiryForm({
  courseSlug,
  courseTitle,
  placement,
  theme,
  onSubmitted,
}: EnquiryFormProps) {
  const submit = useServerFn(submitCourseEnquiry);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [slot, setSlot] = useState<string>(SLOTS[1]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<{ intentId: string } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const parsed = Schema.safeParse({ name, email, phone, city, slot });
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    try {
      const res = await submit({
        data: {
          courseSlug,
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          city: parsed.data.city ?? "",
          preferredSlot: parsed.data.slot ?? "",
          variantLayout: getVariant(EXP.layout),
          variantCta: getVariant(EXP.ctaTiming),
          expUid: getVisitorUid(),
          placement,
          basePriceInr: SEAT_FEE_AMOUNT,
          utmSource: typeof window !== "undefined" ? document.referrer.slice(0, 64) : "",
        },
      });
      if (!res.ok) {
        setErr(res.error ?? "Could not submit. Try again.");
        return;
      }
      trackEvent(EXP.layout, "form_submit", courseSlug, { placement, intent_id: res.intentId });
      trackEvent(EXP.ctaTiming, "form_submit", courseSlug, { placement, intent_id: res.intentId });
      setDone({ intentId: res.intentId });
      onSubmitted?.();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    const waText = `Hi, I just enquired about the ${courseTitle} programme (ref ${done.intentId.slice(0, 8)}). Can we talk?`;
    const onWa = () => {
      trackEvent(EXP.layout, "whatsapp_click", courseSlug, { placement, intent_id: done.intentId });
      trackEvent(EXP.ctaTiming, "whatsapp_click", courseSlug, {
        placement,
        intent_id: done.intentId,
      });
    };
    const onPay = () => {
      trackEvent(EXP.layout, "razorpay_open", courseSlug, { placement, intent_id: done.intentId });
      trackEvent(EXP.ctaTiming, "razorpay_open", courseSlug, {
        placement,
        intent_id: done.intentId,
      });
    };
    return (
      <div className="space-y-5 text-left">
        <div className="flex items-start gap-3">
          <CheckCircle2 className={`mt-0.5 h-5 w-5 ${theme.accentText}`} />
          <div>
            <p className="font-display text-lg font-bold text-white">We've got it.</p>
            <p className="mt-1 text-sm text-white/70">
              A counsellor will reach out shortly. Continue the conversation now on WhatsApp, or
              lock your seat with the {SEAT_FEE} seat fee.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href={waLink(waText)}
            target="_blank" rel="noopener noreferrer"
            onClick={onWa}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[#0A0F1E] px-5 text-sm font-semibold hover:bg-white/90"
          >
            <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
          </a>
          <a
            href={`/enrol?intent=${done.intentId}`}
            onClick={onPay}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Pay seat fee · {SEAT_FEE}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 text-left"
      data-testid="enquiry-form"
      data-placement={placement}
    >
      <Field label="Full name" required>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          autoComplete="name"
          className="enquiry-input"
          placeholder="Your name"
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Email" required>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            maxLength={120}
            autoComplete="email"
            className="enquiry-input"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone" required>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            maxLength={15}
            autoComplete="tel"
            className="enquiry-input"
            placeholder="10-digit number"
          />
        </Field>
      </div>
      <Field label="City (optional)">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          maxLength={80}
          className="enquiry-input"
          placeholder="Hyderabad, Bengaluru…"
        />
      </Field>
      <div>
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-white/55">
          Preferred call slot
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SLOTS.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSlot(s)}
              className={`rounded-full px-3 py-1.5 font-mono text-micro font-semibold ring-1 transition ${
                slot === s
                  ? `${theme.chip} ${theme.ring} text-white`
                  : "bg-white/[0.04] ring-white/10 text-white/65 hover:bg-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {err && (
        <p role="alert" className="text-xs text-rose-300">
          {err}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0A0F1E] hover:bg-white/90 disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 motion-safe:animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
        Request a callback
      </button>
      <p className="text-center text-micro text-white/45">
        No spam. We use your details only to discuss this programme.
      </p>
      <style>{`
        .enquiry-input {
          width: 100%;
          height: 2.75rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0 0.875rem;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
        }
        .enquiry-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); }
        .enquiry-input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-white/55">
        {label}
        {required && <span className="text-rose-300/80"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
