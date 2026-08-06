import { useState } from "react";
import { z } from "zod";
import { Download, CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { COUNSELLOR_PHONE, COUNSELLOR_PHONE_DISPLAY, waLink } from "@/components/landing/constants";

const schema = z.object({
  contact_name: z.string().trim().min(1, "Your name").max(120),
  work_email: z.string().trim().toLowerCase().email("Use a work email").max(200),
  org_name: z.string().trim().min(1, "Organisation").max(200),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  year: z.string().trim().max(32).optional().or(z.literal("")),
  domain: z.string().trim().max(80).optional().or(z.literal("")),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Please confirm consent to be contacted" }),
  }),
});

type Audience = "tpo" | "recruiter";

const COPY: Record<
  Audience,
  {
    eyebrow: string;
    title: string;
    orgLabel: string;
    yearLabel: string;
    pdf: string;
    pdfLabel: string;
    waMessage: string;
  }
> = {
  tpo: {
    eyebrow: "Request the partner briefing pack",
    title: "We email it to your work address",
    orgLabel: "College / institution",
    yearLabel: "Graduating batch year",
    pdf: "/arzon-tpo-briefing.pdf",
    pdfLabel: "Arzon TPO briefing (PDF)",
    waMessage:
      "Hi, I'm a TPO and I just requested the Arzon partner briefing pack. Can you walk me through it?",
  },
  recruiter: {
    eyebrow: "Request the recruiter pack",
    title: "We email the de-identified pack to your work address",
    orgLabel: "Company",
    yearLabel: "Hiring year / cohort",
    pdf: "/arzon-recruiter-pack.pdf",
    pdfLabel: "Arzon recruiter pack (PDF)",
    waMessage:
      "Hi, I'm a recruiter and I just requested the Arzon recruiter pack. Can you walk me through it?",
  },
};

export function BriefingPackForm({ audience }: { audience: Audience }) {
  const copy = COPY[audience];
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const parsed = schema.safeParse({
      contact_name: fd.get("contact_name"),
      work_email: fd.get("work_email"),
      org_name: fd.get("org_name"),
      role: fd.get("role") ?? "",
      year: fd.get("year") ?? "",
      domain: fd.get("domain") ?? "",
      consent: fd.get("consent") ?? "",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the fields and try again");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("briefing_requests").insert({
      audience,
      contact_name: parsed.data.contact_name,
      work_email: parsed.data.work_email,
      org_name: parsed.data.org_name,
      role: parsed.data.role || null,
      year: parsed.data.year || null,
      domain: parsed.data.domain || null,
      consent_given: true,
      consent_at: new Date().toISOString(),
      source: typeof window !== "undefined" ? window.location.pathname : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 240) : null,
    });
    setSubmitting(false);
    if (dbError) {
      setError("Couldn't send the request. Try again, or email partnerships directly.");
      return;
    }
    setSubmitted(true);
    formEl.reset();
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sky-300/50 bg-sky-50 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
          <div>
            <p className="font-grotesk text-body font-bold text-sky-900">
              You're in. Your pack is below.
            </p>
            <p className="mt-1 text-caption leading-relaxed text-sky-900/80">
              We also emailed it to your work address. A counsellor follows up within 4 working
              hours.
            </p>
          </div>
        </div>
        <a
          href={copy.pdf}
          download
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--teal-deep)] px-5 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]"
        >
          <Download className="h-4 w-4" /> Download {copy.pdfLabel}
        </a>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          <a
            href={`tel:+${COUNSELLOR_PHONE}`}
            className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white p-3 text-meta font-semibold text-ink hover:border-[color:var(--teal-deep)]/40"
          >
            <Phone className="h-4 w-4 text-[color:var(--teal-deep)]" /> {COUNSELLOR_PHONE_DISPLAY}
          </a>
          <a
            href={waLink(copy.waMessage)}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white p-3 text-meta font-semibold text-ink hover:border-[color:var(--teal-deep)]/40"
          >
            <MessageCircle className="h-4 w-4 text-[color:var(--teal-deep)]" /> WhatsApp
          </a>
          <a
            href={`mailto:${audience === "tpo" ? "info@arzonglobal.com" : "hire@arzoncareers.in"}?subject=${encodeURIComponent(audience === "tpo" ? "TPO partnership enquiry" : "Recruiter enquiry")}`}
            className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white p-3 text-meta font-semibold text-ink hover:border-[color:var(--teal-deep)]/40"
          >
            <Mail className="h-4 w-4 text-[color:var(--teal-deep)]" /> Email counsellor
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6"
      noValidate
    >
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
        {copy.eyebrow}
      </p>
      <h3 className="mt-1 font-grotesk text-body font-bold text-ink">{copy.title}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field name="contact_name" label="Your name" required />
        <Field name="org_name" label={copy.orgLabel} required />
        <Field name="work_email" type="email" label="Work email" required />
        <Field name="role" label="Your role (optional)" />
        <Field name="year" label={copy.yearLabel} />
        <Field
          name="domain"
          label={
            audience === "tpo" ? "Primary domain (e.g. CR, PV)" : "Hiring domain (e.g. CR, PV)"
          }
        />
      </div>
      <label className="mt-4 flex items-start gap-2.5 text-meta leading-relaxed text-slate-600">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-ink/30 text-[color:var(--teal-deep)] focus:ring-[color:var(--teal-deep)]/40"
        />
        <span>
          I agree to be contacted by an Arzon counsellor about this request. We won't add you to any
          marketing list.
        </span>
      </label>
      {error && <p className="mt-3 text-meta font-semibold text-rose-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--teal-deep)] px-5 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)] disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send me the pack"}
      </button>
      <p className="mt-3 text-micro leading-relaxed text-slate-500">
        We use your email only to send the pack and have a counsellor follow up. No marketing list.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={200}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-body-sm text-ink outline-none ring-[color:var(--teal-deep)]/30 focus:ring-2"
      />
    </label>
  );
}
