import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const GOLD = "#0056D2";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EC5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B17]";

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
        className="rounded-md border border-[#C9A84C]/40 bg-[#C9A84C]/10 p-4 text-sm text-slate-50"
      >
        <div className="flex items-start gap-2">
          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD }} />
          <div>
            <p className="font-semibold">Thanks, a counsellor will reach out within 24 hours.</p>
            <p className="mt-1 text-xs text-slate-100/70">
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
      className="space-y-2.5"
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
          className={`h-11 w-full rounded-md border border-slate-200/25 bg-white px-3 text-sm font-medium text-primary placeholder:text-[#52657f] ${focusRing}`}
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
          className={`h-11 w-full rounded-md border border-slate-200/25 bg-white px-3 text-sm font-medium text-primary placeholder:text-[#52657f] ${focusRing}`}
        />
      </div>
      {error ? (
        <p role="alert" className="text-micro text-red-300">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label={status === "loading" ? "Submitting callback request" : "Request callback"}
        className={`inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-md px-4 text-caption font-bold transition-colors hover:bg-[#00419E] disabled:opacity-60 ${focusRing}`}
        style={{ backgroundColor: GOLD, color: "#FFFFFF" }}
      >
        {status === "loading" ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" /> Submitting…
          </>
        ) : (
          <>
            Request callback <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-micro leading-snug" style={{ color: "#CBD5E1" }}>
        By submitting, you agree to be contacted by an Arzon counsellor. No spam.
      </p>
    </form>
  );
}
