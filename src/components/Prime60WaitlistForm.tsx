import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BellRing, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { joinPrime60Waitlist } from "@/lib/arzonPrime60Waitlist.functions";

type Variant = "dark" | "light";

type Props = {
  variant?: Variant;
  source: string;
  tier?: string | null;
  intentId?: string | null;
  leadId?: string | null;
  sessionId?: string | null;
  defaultEmail?: string | null;
  defaultName?: string | null;
  defaultPhone?: string | null;
  title?: string;
  description?: string;
  className?: string;
};

/**
 * Lets a user join the ARZONPRIME60 waitlist when their offer has expired.
 * They opt in for a reminder when the next ARZONPRIME60 window opens (or for
 * early access if we run it). Posts to a public server function that
 * persists the row and de-dupes by email + reason within 24h.
 */
export function Prime60WaitlistForm({
  variant = "dark",
  source,
  tier = null,
  intentId = null,
  leadId = null,
  sessionId = null,
  defaultEmail = "",
  defaultName = "",
  defaultPhone = "",
  title = "Get notified when the offer reopens",
  description = "We'll email you the moment ARZONPRIME60 is available again. Optionally add WhatsApp for early access.",
  className = "",
}: Props) {
  const join = useServerFn(joinPrime60Waitlist);
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [name, setName] = useState(defaultName ?? "");
  const [phone, setPhone] = useState(defaultPhone ?? "");
  const [reason, setReason] = useState<"reminder" | "early_access">("reminder");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const dark = variant === "dark";
  const inputClasses = dark
    ? "w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-yellow-300/60 focus:outline-none"
    : "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none";
  const labelClasses = dark
    ? "block text-micro font-bold uppercase tracking-[0.14em] text-white/60"
    : "block text-micro font-bold uppercase tracking-[0.14em] text-slate-600";
  const wrapClasses = dark
    ? "rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
    : "rounded-2xl border border-slate-200 bg-white p-4 sm:p-5";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your email so we can notify you.");
      return;
    }
    setStatus("loading");
    try {
      await join({
        data: {
          email: trimmedEmail,
          name: name.trim() || null,
          phone: phone.trim() || null,
          tier: tier ?? null,
          intentId: intentId ?? null,
          leadId: leadId ?? null,
          sessionId: sessionId ?? null,
          reason,
          source,
        },
      });
      setStatus("ok");
    } catch (err) {
      console.error("[prime60-waitlist] join failed", err);
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message.replace(/^Error:\s*/, "")
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "ok") {
    return (
      <div className={`${wrapClasses} ${className}`} role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <CheckCircle2
            className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-eyebrow" : "text-primary"}`}
          />
          <div className="min-w-0">
            <p
              className={`font-grotesk text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}
            >
              You're on the list
            </p>
            <p className={`mt-1 text-xs ${dark ? "text-white/70" : "text-slate-600"}`}>
              We'll reach out at <span className="font-mono font-semibold">{email}</span> the next
              time ARZONPRIME60 opens
              {reason === "early_access" ? " — with early access first." : "."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`${wrapClasses} ${className}`} noValidate>
      <div className="flex items-start gap-2.5">
        <span
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            dark ? "bg-yellow-400/20 text-yellow-200" : "bg-amber-100 text-amber-700"
          }`}
        >
          <BellRing className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className={`font-grotesk text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}>
            {title}
          </p>
          <p className={`mt-1 text-xs ${dark ? "text-white/65" : "text-slate-600"}`}>
            {description}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor={`p60w-email-${source}`}>
            Email <span className={dark ? "text-red-300" : "text-red-600"}>*</span>
          </label>
          <input
            id={`p60w-email-${source}`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`mt-1 ${inputClasses}`}
          />
        </div>
        <div>
          <label className={labelClasses} htmlFor={`p60w-name-${source}`}>
            Name <span className={dark ? "text-white/60" : "text-slate-400"}>(optional)</span>
          </label>
          <input
            id={`p60w-name-${source}`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={`mt-1 ${inputClasses}`}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClasses} htmlFor={`p60w-phone-${source}`}>
            WhatsApp{" "}
            <span className={dark ? "text-white/60" : "text-slate-400"}>
              (optional, for early access)
            </span>
          </label>
          <input
            id={`p60w-phone-${source}`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98xxxxxxxx"
            className={`mt-1 ${inputClasses}`}
          />
        </div>
      </div>

      <fieldset className="mt-4">
        <legend className={`${labelClasses} mb-1.5`}>Notify me about</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { value: "reminder", label: "Reminder when it reopens" },
              { value: "early_access", label: "Early access (next batch)" },
            ] as const
          ).map((opt) => {
            const selected = reason === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => setReason(opt.value)}
                aria-pressed={selected}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selected
                    ? dark
                      ? "border-yellow-300 bg-yellow-400/15 text-yellow-100"
                      : "border-slate-900 bg-slate-900 text-white"
                    : dark
                      ? "border-white/15 text-white/70 hover:border-white/30"
                      : "border-slate-300 text-slate-700 hover:border-slate-500"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className={`mt-3 text-xs ${dark ? "text-red-300" : "text-red-600"}`}>
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-60 ${
            dark
              ? "bg-yellow-400 text-[#1a1305] hover:brightness-110"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" /> Adding you…
            </>
          ) : (
            <>
              <BellRing className="h-3.5 w-3.5" /> Notify me
            </>
          )}
        </button>
        <span
          className={`inline-flex items-center gap-1.5 text-micro ${dark ? "text-white/60" : "text-slate-500"}`}
        >
          <MessageCircle className="h-3 w-3" /> We won't spam — one email per opening.
        </span>
      </div>
    </form>
  );
}
