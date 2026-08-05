import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, ShieldCheck, Check, AlertCircle, ExternalLink } from "lucide-react";
import { NEXT_COHORT, waLink } from "./constants";
import { useApplication } from "@/hooks/useApplication";
import { COURSES_BY_SLUG } from "@/data/courses";
import { submitApplication } from "@/lib/applications.functions";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { track } from "@/lib/track";

const TRACKS = [
  "Medical Coding",
  "Pharmacovigilance",
  "Clinical Data Management",
  "Regulatory Affairs",
  "AI in Healthcare",
  "Clinical Research",
];
const YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "Final Year",
  "Graduate",
  "Working Professional",
];

// Mirror of the server-side Zod schema (src/lib/applications.functions.ts).
// Keep min/max bounds and phone shape in sync - the server is the source of
// truth, this is just the client-side mirror that gives users inline errors
// before the round-trip.
const Step2Schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(120),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D+/g, ""))
    .pipe(z.string().min(10, "Enter a 10-digit number").max(15, "Phone is too long")),
  track: z.string().min(1, "Pick a programme"),
});
type Step2Errors = Partial<Record<keyof z.infer<typeof Step2Schema>, string>>;

type SubmitState =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "crm_failed"; message: string }
  | { kind: "wa_blocked"; href: string; applicationId: string }
  | { kind: "done"; applicationId: string };

export function ApplicationForm() {
  const navigate = useNavigate();
  const { updateProfile, setProgramme, setCohort, setStep } = useApplication();
  const logApplication = useServerFn(submitApplication);
  type LogPayload = {
    name: string;
    email: string;
    phone: string;
    programSlug: string;
    programName?: string;
    whatsappOptin?: boolean;
    leadId?: string | null;
    utmSource?: string;
    userAgent?: string;
  };
  const lastPayloadRef = useRef<LogPayload | null>(null);
  const lastMessageRef = useRef<string>("");
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [errors, setErrors] = useState<Step2Errors>({});

  // Two-step state - the first step asks a single low-friction question
  // (the year of study). Completion of step 1 reveals the rest. This
  // measurably lifts form-completion rates because the user is already
  // committed by the time the email field appears.
  const [step, setLocalStep] = useState<1 | 2>(1);
  const [year, setYear] = useState<string>("");

  const trackSlugFromLabel = (label: string): string | undefined => {
    const norm = label.toLowerCase();
    return Object.values(COURSES_BY_SLUG).find((c) =>
      c.title.toLowerCase().includes(norm.split(" ")[0]),
    )?.slug;
  };

  const buildWaMessage = (opts: {
    name: string;
    trackLabel: string;
    year: string;
    applicationId: string;
  }) =>
    [
      `Hi Arzon! I just applied for the ${opts.trackLabel} programme.`,
      `Domain: ${opts.trackLabel}`,
      `Batch: ${NEXT_COHORT.label} (starts ${NEXT_COHORT.startsLabel})`,
      `Application ID: ${opts.applicationId}`,
      `Name: ${opts.name} · Year: ${opts.year}`,
      `Please share next steps.`,
    ].join("\n");

  const runSubmit = async (payload: {
    name: string;
    email: string;
    phone: string;
    trackLabel: string;
    slug: string | undefined;
  }) => {
    // Idempotency guard: block re-entry while a submit is already in-flight
    // so rapid double clicks / Enter-key repeats never create duplicates.
    if (state.kind === "saving") return;
    setState({ kind: "saving" });
    const attemptId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    track("apply_submit_started", {
      program_slug: payload.slug ?? null,
      props: { track: payload.trackLabel, year },
      dedupeKey: `apply_submit_started:${attemptId}`,
    });
    updateProfile({
      fullName: payload.name,
      email: payload.email,
      phone: payload.phone,
      yearOfStudy: year,
      background: "",
    });
    if (payload.slug) setProgramme(payload.slug);
    setCohort(NEXT_COHORT.id);
    setStep("review");

    const programSlug =
      payload.slug ?? (payload.trackLabel.toLowerCase().replace(/\s+/g, "-") || "internship");
    const rpcInput = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      programSlug,
      programName: payload.trackLabel,
      whatsappOptin: true,
      utmSource:
        typeof window !== "undefined"
          ? (new URLSearchParams(window.location.search).get("utm_source") ?? undefined)
          : undefined,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 240) : undefined,
    };
    lastPayloadRef.current = rpcInput;

    let applicationId: string;
    try {
      const res = await logApplication({ data: rpcInput });
      applicationId = res.applicationId;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "We could not save your application just now.";
      console.error("submitApplication failed", err);
      setState({ kind: "crm_failed", message });
      toast.error(
        message.length < 140 ? message : "We couldn't save your application. Please retry.",
      );
      track("apply_submit_failed", {
        program_slug: payload.slug ?? null,
        props: { track: payload.trackLabel, reason: message.slice(0, 200) },
        dedupeKey: `apply_submit_failed:${attemptId}`,
      });
      return;
    }

    // Build the WhatsApp template now that we have the application id -
    // domain (programme), batch (cohort label) and application id are all
    // prefilled deterministically.
    const text = buildWaMessage({
      name: payload.name,
      trackLabel: payload.trackLabel,
      year,
      applicationId,
    });
    const href = waLink(text);
    lastMessageRef.current = text;

    let opened: Window | null = null;
    try {
      if (typeof window !== "undefined") {
        opened = window.open(href, "_blank", "noopener");
      }
    } catch {
      opened = null;
    }

    if (!opened) {
      // Popup blocked - surface a visible fallback link instead of failing silently.
      setState({ kind: "wa_blocked", href, applicationId });
      toast.message("Tap the link below to message us on WhatsApp.");
      track("apply_submit_success", {
        application_id: applicationId,
        program_slug: payload.slug ?? null,
        props: { track: payload.trackLabel, wa_popup_blocked: true },
        dedupeKey: `apply_submit_success:${applicationId}`,
      });
      return;
    }

    setState({ kind: "done", applicationId });
    toast.success("Application saved. We'll see you on WhatsApp.");
    track("apply_submit_success", {
      application_id: applicationId,
      program_slug: payload.slug ?? null,
      props: { track: payload.trackLabel },
      dedupeKey: `apply_submit_success:${applicationId}`,
    });
    navigate({ to: "/apply/review" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Idempotency at the form layer - extra guard so a fast <Enter>-repeat
    // never even reaches runSubmit while a prior submit is in-flight.
    if (state.kind === "saving") return;
    if (step === 1) {
      if (!year) return;
      setLocalStep(2);
      requestAnimationFrame(() => {
        document.getElementById("apply-step-2")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
      return;
    }

    const data = new FormData(e.currentTarget);
    const raw = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      track: String(data.get("track") ?? ""),
    };

    const parsed = Step2Schema.safeParse(raw);
    if (!parsed.success) {
      const next: Step2Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Step2Errors | undefined;
        if (k && !next[k]) next[k] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    const slug = trackSlugFromLabel(parsed.data.track);
    await runSubmit({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      trackLabel: parsed.data.track,
      slug,
    });
  };

  const retryCrm = async () => {
    const last = lastPayloadRef.current;
    if (!last) return;
    await runSubmit({
      name: last.name,
      email: last.email,
      phone: last.phone,
      trackLabel: last.programName ?? last.programSlug,
      slug: last.programSlug,
    });
  };

  return (
    <Section id="apply" size="lg" containerSize="md">
      <div className="grid gap-6 md:grid-cols-[1fr_1.05fr] md:gap-14">
        <div className="hidden md:block">
          <SectionHeader
            align="left"
            eyebrow="Apply"
            title={
              <>
                Start your <em className="italic-accent not-italic">application</em>.
              </>
            }
            sub={`Two-step start. Question 1, then your details. Takes about a minute. No payment to apply.`}
          />
          <ul className="mt-6 space-y-3 text-sm text-slate-100/75 sm:mt-8">
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-eyebrow" /> Counsellor calls within 24
              hours of applying.
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-eyebrow" /> Your details are private,
              never sold to third parties.
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-eyebrow" /> No payment to apply.
              Seat-confirmation details are shared after your fit-test result.
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="card-light rounded-2xl p-4 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-primary">
              Step {step} of 2
            </p>
            <StepDots step={step} />
          </div>

          {step === 1 ? (
            <>
              <h3 className="mt-2 font-grotesk text-h4 font-bold text-ink sm:text-h3">
                First, where are you in your studies?
              </h3>
              <p className="mt-1 text-caption text-muted-foreground">
                One quick tap. No contact details needed yet.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                {YEARS.map((y) => {
                  const active = year === y;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYear(y)}
                      className={`group relative rounded-xl border px-3 py-3 text-left text-caption font-semibold transition-all duration-200 active:scale-[0.98] ${
                        active
                          ? "border-primary bg-primary/8 text-ink shadow-[0_2px_0_0_var(--primary)]"
                          : "border-border bg-white text-ink hover:border-primary/50 hover:bg-primary/[0.03]"
                      }`}
                      aria-pressed={active}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span>{y}</span>
                        {active && <Check className="h-4 w-4 text-primary" strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Button
                type="submit"
                disabled={!year}
                variant="premium"
                size="lg"
                className="mt-6 w-full"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-center text-micro text-muted-foreground">
                Step 2 asks your name, WhatsApp + programme of interest.
              </p>
            </>
          ) : (
            <div id="apply-step-2" className="motion-safe:animate-fade-in">
              <button
                type="button"
                onClick={() => setLocalStep(1)}
                className="mt-2 inline-flex items-center gap-1 text-meta font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>

              <h3 className="mt-2 font-grotesk text-h4 font-bold text-ink sm:text-h3">
                Nice. Now your contact details.
              </h3>
              <p className="mt-1 text-caption text-muted-foreground">
                Logged you as <strong className="font-semibold text-ink">{year}</strong>. A
                counsellor will call within 24 hours of applying.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <Field
                  name="name"
                  label="Full name"
                  placeholder="e.g. Ananya Sharma"
                  required
                  error={errors.name}
                />
                <div className="space-y-1.5">
                  <Field
                    name="phone"
                    label="WhatsApp number (10-digit)"
                    placeholder="9876543210"
                    type="tel"
                    inputMode="tel"
                    required
                    error={errors.phone}
                  />
                  <p className="text-micro text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" /> +91 auto-formatted •
                    Instant ACRI Report on WhatsApp
                  </p>
                </div>
                <Field
                  name="email"
                  label="Email"
                  placeholder="you@email.com"
                  type="email"
                  required
                  error={errors.email}
                />
                <Select
                  name="track"
                  label="Programme of interest"
                  options={TRACKS}
                  required
                  error={errors.track}
                />
              </div>

              {state.kind === "crm_failed" && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-caption text-red-900"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  <div className="flex-1">
                    <p className="font-semibold">We couldn't save your application.</p>
                    <p className="mt-0.5 text-danger/90">{state.message}</p>
                    <button
                      type="button"
                      onClick={retryCrm}
                      className="mt-2 inline-flex h-8 items-center rounded-md bg-[#2563EB] px-3 text-meta font-semibold text-slate-50 hover:bg-[#1d4ed8]"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {state.kind === "wa_blocked" && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-gold-soft p-3 text-caption text-amber-900"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  <div className="flex-1">
                    <p className="font-semibold">WhatsApp didn't open automatically.</p>
                    <p className="mt-0.5 text-amber-900/90">
                      Your application is saved (ID {state.applicationId.slice(0, 8)}). Tap below to
                      open WhatsApp with your message prefilled.
                    </p>
                    <a
                      href={state.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex h-8 items-center gap-1.5 rounded-md bg-sky-600 px-3 text-meta font-semibold text-slate-50 hover:bg-sky-700"
                    >
                      Open WhatsApp <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={state.kind === "saving"}
                variant="premium"
                size="lg"
                className="mt-7 w-full"
              >
                {state.kind === "saving" ? (
                  "Saving…"
                ) : (
                  <>
                    Continue application <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="mt-3 text-center text-micro text-muted-foreground">
                By applying you agree to be contacted by our counsellors.
              </p>
            </div>
          )}
        </form>
      </div>
    </Section>
  );
}

function StepDots({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span
        className="h-1.5 w-6 rounded-full transition-colors"
        style={{ background: "var(--primary)" }}
      />
      <span
        className="h-1.5 w-6 rounded-full transition-colors"
        style={{ background: step === 2 ? "var(--primary)" : "rgba(15,27,61,0.15)" }}
      />
    </div>
  );
}

function Field(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string },
) {
  const { label, error, name, ...rest } = props;
  const errorId = error && name ? `${name}-error` : undefined;
  return (
    <label className="block">
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
        {label}
      </span>
      <input
        {...rest}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`mt-1.5 h-12 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-semibold text-white placeholder:text-slate-400 outline-none transition-colors ${
          error
            ? "border-rose-500 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20"
            : "focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
        }`}
      />
      {error && (
        <span id={errorId} className="mt-1 block text-xs font-bold text-rose-400">
          {error}
        </span>
      )}
    </label>
  );
}
function Select({
  name,
  label,
  options,
  required,
  error,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  error?: string;
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <label className="block" suppressHydrationWarning>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
        {label}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        suppressHydrationWarning
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`mt-1.5 h-12 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-semibold text-white outline-none transition-colors ${
          error
            ? "border-rose-500 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20"
            : "focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
        }`}
      >
        <option value="" disabled className="bg-[#161F33] text-slate-300">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#161F33] text-white">
            {o}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} className="mt-1 block text-xs font-bold text-rose-400">
          {error}
        </span>
      )}
    </label>
  );
}
