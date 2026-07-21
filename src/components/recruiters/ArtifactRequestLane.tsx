import { useState } from "react";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, FileText, ArrowRight, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { generateArtifactToken, logVerificationEvent } from "@/lib/verificationAudit";

const schema = z.object({
  recruiter_email: z.string().trim().toLowerCase().email().max(200),
  recruiter_org: z.string().trim().min(1).max(200),
  jd_task: z.string().trim().min(1).max(200),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const TTL_HOURS = 72;

const SUGGESTED_TASKS = [
  "Capstone case file (full)",
  "Day-30 deliverable (graded)",
  "Mid-term assessment + auditor sheet",
  "Compliance checklist walkthrough",
  "JD-phrase coverage report",
];

export function ArtifactRequestLane({ candidateRef }: { candidateRef: string }) {
  const [submitted, setSubmitted] = useState<{ token: string; expiresAt: Date } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      recruiter_email: fd.get("recruiter_email"),
      recruiter_org: fd.get("recruiter_org"),
      jd_task: fd.get("jd_task"),
      message: fd.get("message") ?? "",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the fields and try again");
      return;
    }
    setSubmitting(true);
    const token = generateArtifactToken();
    const expiresAt = new Date(Date.now() + TTL_HOURS * 60 * 60 * 1000);
    const { error: dbError } = await supabase.from("artifact_requests").insert({
      candidate_ref: candidateRef.toUpperCase(),
      recruiter_email: parsed.data.recruiter_email,
      recruiter_org: parsed.data.recruiter_org,
      jd_task: parsed.data.jd_task,
      message: parsed.data.message || null,
      token,
      expires_at: expiresAt.toISOString(),
    });
    setSubmitting(false);
    if (dbError) {
      setError("Couldn't submit the request. Try again in a moment.");
      return;
    }
    void logVerificationEvent(candidateRef, "artifact_unlocked", parsed.data.recruiter_org);
    setSubmitted({ token, expiresAt });
  }

  if (submitted) {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/r/artifact/${submitted.token}`
        : `/r/artifact/${submitted.token}`;
    return (
      <div className="rounded-2xl border border-sky-300/50 bg-sky-50 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
          <div className="min-w-0">
            <p className="font-grotesk text-body-sm font-bold text-sky-900">
              Time-bound verification link issued
            </p>
            <p className="mt-1 text-meta leading-relaxed text-sky-900/80">
              Valid until <strong>{submitted.expiresAt.toLocaleString()}</strong>. We've recorded
              your intent on the candidate's audit trail. Same link is in your inbox.
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-sky-200 bg-white p-2.5">
              <code className="min-w-0 flex-1 truncate font-mono text-micro text-slate-700">
                {url}
              </code>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(url)}
                className="shrink-0 rounded-lg border border-ink/10 p-1.5 text-slate-600 hover:bg-slate-50"
                aria-label="Copy link"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            <Link
              to="/r/artifact/$token"
              params={{ token: submitted.token }}
              className="mt-3 inline-flex items-center gap-1.5 text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
            >
              Open the verification link <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-ink/10 bg-white p-5">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-[color:var(--teal-deep)]" />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]">
          Request a specific JD-task artifact
        </p>
      </div>
      <h3 className="mt-2 font-grotesk text-body-sm font-bold text-ink">
        Get a {TTL_HOURS}-hour verification link
      </h3>
      <p className="mt-1 text-meta text-slate-600">
        Pick the JD task you want to evaluate. We log your request to the candidate's public audit
        trail and unlock the de-identified deliverable for {TTL_HOURS} hours.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field name="recruiter_email" type="email" label="Work email" required />
        <Field name="recruiter_org" label="Company" required />
        <div className="sm:col-span-2">
          <span className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-500">
            JD task to verify
          </span>
          <input
            name="jd_task"
            list="jd-task-suggestions"
            required
            maxLength={200}
            placeholder="Pick one or type your own"
            className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-body-sm text-ink outline-none ring-[color:var(--teal-deep)]/30 focus:ring-2"
          />
          <datalist id="jd-task-suggestions">
            {SUGGESTED_TASKS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>
        <div className="sm:col-span-2">
          <span className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-500">
            Context (optional)
          </span>
          <textarea
            name="message"
            rows={3}
            maxLength={1000}
            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-body-sm text-ink outline-none ring-[color:var(--teal-deep)]/30 focus:ring-2"
          />
        </div>
      </div>
      {error && <p className="mt-3 text-meta font-semibold text-rose-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--teal-deep)] px-5 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)] disabled:opacity-50"
      >
        {submitting ? "Issuing link…" : `Issue ${TTL_HOURS}h verification link`}
      </button>
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
