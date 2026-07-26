import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Check, Loader2 } from "lucide-react";

function detectType(value: string): "email" | "phone" | null {
  const v = value.trim();
  if (!v) return null;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "email";
  const digits = v.replace(/[^\d]/g, "");
  if (digits.length >= 7 && digits.length <= 15) return "phone";
  return null;
}

export function CounsellorLeadForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    if (trimmedName.length < 1 || trimmedName.length > 120) {
      setError("Please enter your name.");
      return;
    }
    const contactType = detectType(trimmedContact);
    if (!contactType) {
      setError("Enter a valid phone number or email.");
      return;
    }

    setStatus("loading");
    const { error: insertError } = await supabase.from("counsellor_leads").insert({
      name: trimmedName,
      contact: trimmedContact,
      contact_type: contactType,
      source: typeof window !== "undefined" ? window.location.pathname : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });

    if (insertError) {
      setStatus("error");
      setError("Couldn't submit right now. Please try again.");
      return;
    }

    setStatus("success");
    setName("");
    setContact("");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-white"
      >
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          <div>
            <p className="font-bold text-white">
              Thanks, a counsellor will reach out within 24 hours.
            </p>
            <p className="mt-1 text-xs text-slate-300">
              No spam. We only contact you about your enquiry.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="footer-lead-heading"
      className="space-y-3"
    >
      <div>
        <label htmlFor="footer-lead-name" className="sr-only">
          Your name
        </label>
        <input
          id="footer-lead-name"
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          disabled={status === "loading"}
          className="h-11 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-medium text-white placeholder:text-slate-400 focus:border-sky-400 focus-ring-sky shadow-inner"
        />
      </div>
      <div>
        <label htmlFor="footer-lead-contact" className="sr-only">
          Phone or email
        </label>
        <input
          id="footer-lead-contact"
          name="contact"
          type="text"
          inputMode="email"
          required
          maxLength={200}
          autoComplete="email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Phone or email"
          disabled={status === "loading"}
          className="h-11 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-medium text-white placeholder:text-slate-400 focus:border-sky-400 focus-ring-sky shadow-inner"
        />
      </div>
      {error ? (
        <p role="alert" className="text-xs font-semibold text-rose-400">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label={status === "loading" ? "Submitting callback request" : "Request callback"}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-lg transition-colors disabled:opacity-60 focus-ring-sky"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-white" /> Submitting…
          </>
        ) : (
          <>
            Request callback <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-[11px] text-slate-400 leading-tight">
        By submitting, you agree to be contacted by an Arzon counsellor. No spam.
      </p>
    </form>
  );
}
