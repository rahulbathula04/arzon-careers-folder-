import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { requestDemandTrack } from "@/lib/demand.functions";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/build/request")({
  head: () => {
    const title = "Request a track - Arzon Global";
    const description =
      "Propose a role we should build workforce infrastructure for. 25 verified peers unlock the build.";
    const ps = pageSeo({ path: "/build/request", title, description });
    return { meta: [{ title }, ...ps.meta], links: ps.links };
  },
  component: RequestTrackPage,
});

type Category =
  | "engineering"
  | "healthcare"
  | "life-sciences"
  | "business"
  | "tech"
  | "agriculture"
  | "design"
  | "other";

type Experience = "student" | "fresher" | "1-3y" | "3-5y" | "5y+";

type FormState = {
  title: string;
  category: Category;
  pitch: string;
  name: string;
  phone: string;
  email: string;
  experienceLevel: Experience;
  why: string;
};

const INITIAL: FormState = {
  title: "",
  category: "healthcare",
  pitch: "",
  name: "",
  phone: "",
  email: "",
  experienceLevel: "fresher",
  why: "",
};

const CATEGORY_LABELS: Record<Category, string> = {
  engineering: "Engineering",
  healthcare: "Healthcare",
  "life-sciences": "Life sciences",
  business: "Business",
  tech: "Tech",
  agriculture: "Agriculture",
  design: "Design",
  other: "Other",
};

const EXPERIENCE_LABELS: Record<Experience, string> = {
  student: "Student",
  fresher: "Fresher (0–1 yr)",
  "1-3y": "1–3 years",
  "3-5y": "3–5 years",
  "5y+": "5+ years",
};

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errs: Partial<Record<keyof FormState, string>> = {};
  if (form.title.trim().length < 4) errs.title = "Add a role title (4+ characters).";
  if (form.title.trim().length > 80) errs.title = "Keep the title under 80 characters.";
  if (form.pitch.trim().length < 20)
    errs.pitch = "Tell us in at least 20 characters why this role matters.";
  if (form.pitch.trim().length > 500) errs.pitch = "Keep the pitch under 500 characters.";
  if (form.name.trim().length < 1) errs.name = "Your name is required.";
  if (!/^[+0-9 ()-]{7,20}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number.";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errs.email = "Enter a valid email or leave blank.";
  if (form.why.trim().length < 1) errs.why = "Tell us why you want this track.";
  if (form.why.trim().length > 800) errs.why = "Keep your reason under 800 characters.";
  return errs;
}

function RequestTrackPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: FormState) => requestDemandTrack({ data }),
    onSuccess: (res) => {
      if (res?.ok && res.slug) {
        // Redirect to the track build page after a short success beat.
        setTimeout(() => {
          navigate({ to: "/build/$slug", params: { slug: res.slug } });
        }, 1400);
      }
    },
    onError: (err: Error) => {
      setServerError(err.message ?? "Something went wrong. Try again.");
    },
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
    setServerError(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    mutation.mutate(form);
  };

  const success = mutation.data?.ok === true;
  const isPending = mutation.isPending;

  if (success) {
    const created = mutation.data?.created;
    const dup = mutation.data?.duplicateVote;
    return (
      <main className="min-h-dvh bg-white">
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sky-50 ring-1 ring-sky-200">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>
          <p className="mt-5 font-mono text-micro font-bold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]">
            {created ? "Track opened for voting" : "Vote recorded"}
          </p>
          <h1 className="mt-2 font-display text-h1 font-bold text-black">
            {created
              ? "Your track is live. Voting is open."
              : dup
                ? "You already voted on this one."
                : "Your vote is in."}
          </h1>
          <p className="mt-3 text-body-sm leading-relaxed text-black/70">
            Thinking & redirecting you to the public build page&hellip;
          </p>
          <div className="mt-5 flex justify-center">
            <AiThinkingLoader label="Thinking…" size="md" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
        <Link
          to="/build"
          className="inline-flex items-center gap-1.5 text-caption font-semibold text-black/70 hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to pipeline
        </Link>

        <p className="mt-6 font-mono text-micro font-bold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]">
          Request a track
        </p>
        <h1 className="mt-2 font-display text-h1 font-bold text-black">
          Propose the role we should build for next.
        </h1>
        <p className="mt-4 max-w-xl text-body-sm leading-relaxed text-black/75">
          If 25 verified peers want the same role, we open the build publicly - curriculum, mentors,
          assessments and internship partners, all dated.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-10 space-y-8">
          {/* Track block */}
          <Fieldset legend="The track" desc="What role should we build infrastructure for?">
            <Field
              id="title"
              label="Role title"
              hint="e.g. Clinical SAS Programmer, Site Reliability Engineer"
              error={errors.title}
              required
            >
              <input
                id="title"
                type="text"
                maxLength={80}
                autoComplete="off"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className={inputCls(!!errors.title)}
              />
            </Field>

            <Field id="category" label="Category" error={errors.category} required>
              <select
                id="category"
                value={form.category}
                onChange={(e) => update("category", e.target.value as Category)}
                className={inputCls(false)}
              >
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="pitch"
              label="Why this role matters"
              hint={`${form.pitch.trim().length}/500 - describe the demand signal you're seeing.`}
              error={errors.pitch}
              required
            >
              <textarea
                id="pitch"
                rows={4}
                maxLength={500}
                value={form.pitch}
                onChange={(e) => update("pitch", e.target.value)}
                className={inputCls(!!errors.pitch)}
                placeholder="Hiring teams in Hyderabad keep posting for this role with no qualified candidates…"
              />
            </Field>
          </Fieldset>

          {/* You block */}
          <Fieldset
            legend="Your details"
            desc="So we can verify demand and update you when the track ships."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="name" label="Full name" error={errors.name} required>
                <input
                  id="name"
                  type="text"
                  maxLength={120}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputCls(!!errors.name)}
                />
              </Field>
              <Field id="phone" label="Phone (WhatsApp)" error={errors.phone} required>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  maxLength={20}
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputCls(!!errors.phone)}
                  placeholder="+91 98765 43210"
                />
              </Field>
            </div>

            <Field
              id="email"
              label="Email"
              hint="Optional - for build updates."
              error={errors.email}
            >
              <input
                id="email"
                type="email"
                maxLength={255}
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputCls(!!errors.email)}
              />
            </Field>

            <Field
              id="experienceLevel"
              label="Where you are today"
              error={errors.experienceLevel}
              required
            >
              <select
                id="experienceLevel"
                value={form.experienceLevel}
                onChange={(e) => update("experienceLevel", e.target.value as Experience)}
                className={inputCls(false)}
              >
                {(Object.keys(EXPERIENCE_LABELS) as Experience[]).map((x) => (
                  <option key={x} value={x}>
                    {EXPERIENCE_LABELS[x]}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="why"
              label="Why you want this track"
              hint={`${form.why.trim().length}/800 - what would shipping this unlock for you?`}
              error={errors.why}
              required
            >
              <textarea
                id="why"
                rows={3}
                maxLength={800}
                value={form.why}
                onChange={(e) => update("why", e.target.value)}
                className={inputCls(!!errors.why)}
              />
            </Field>
          </Fieldset>

          {serverError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-caption text-red-800"
            >
              {serverError}
            </div>
          )}

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-1.5 text-meta text-black/60">
              <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--teal-ink)]" />
              No spam. Phone is used only to verify demand and ship updates.
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary btn-lg inline-flex items-center justify-center disabled:opacity-60"
            >
              {isPending ? (
                <AiThinkingLoader label="Thinking & submitting…" size="sm" />
              ) : (
                <>
                  Submit request <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Fieldset({
  legend,
  desc,
  children,
}: {
  legend: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
      <legend className="px-1 font-mono text-micro font-bold uppercase tracking-[0.18em] text-black/60">
        {legend}
      </legend>
      {desc && <p className="mt-1 text-caption text-black/65">{desc}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-center gap-1 text-caption font-semibold text-black">
        {label}
        {required && (
          <span aria-hidden className="text-red-600">
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p className="mt-1.5 text-meta font-medium text-red-700">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-meta text-black/55">{hint}</p>
      ) : null}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-body-sm text-black",
    "shadow-[inset_0_1px_0_rgba(15,23,42,0.02)]",
    "placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-offset-1",
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
      : "border-black/15 focus:border-[color:var(--teal-ink)] focus:ring-[color:var(--teal-soft)]",
  ].join(" ");
}
