import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { a as requireStaff } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "./client.server-DUn3rRvm.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const __vite_glob_0_0 = `import { Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import { Zap, ClipboardCheck, FlaskConical, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

/**
 * "Will AI take this job?", answered honestly using the same
 * Augmented / Audit / Resistant taxonomy used on the course cards.
 */
export function AIRiskExplainer() {
  return (
    <Section size="md">
      <SectionHeader
        eyebrow="Will AI take my job?"
        title={<>Honest answer: depends which job.</>}
        sub="Every Arzon programme falls into one of three buckets. We tell you which one before you join."
      />

      <div className="mt-10 grid gap-4 sm:gap-5 md:mt-12 md:grid-cols-3">
        {CARDS.map((c) => (
          <article
            key={c.tag}
            className={\`relative overflow-hidden rounded-2xl border p-5 sm:p-6 \${c.tone}\`}
          >
            <div className="flex items-center gap-2">
              <c.icon className="h-4 w-4" />
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">
                {c.tag}
              </p>
            </div>
            <h3 className="mt-3 font-display text-lg font-normal leading-tight text-slate-50 sm:text-h4">
              {c.headline}
            </h3>
            <p className="body mt-3">{c.body}</p>

            <p className="mt-5 font-mono text-micro uppercase tracking-[0.18em] text-slate-100/80">
              Example roles
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {c.roles.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-slate-200/10 bg-white/[0.04] px-2 py-0.5 font-mono text-micro text-slate-100/80"
                >
                  {r}
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-slate-200/10 pt-4 text-xs italic text-slate-100/65">
              <span className="font-semibold not-italic text-slate-100/85">What we teach:</span>{" "}
              {c.whatWeTeach}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/courses"
          className="inline-flex h-11 items-center gap-1.5 text-sm font-semibold text-primary-glow hover:underline"
        >
          See AI bucket for every programme
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}

const CARDS = [
  {
    tag: "AI helps you",
    icon: Zap,
    tone: "border-amber-400/25 bg-amber-400/[0.04] text-amber-200", // @allow-raw-palette semantic warning tone
    headline: "AI makes you 3× faster. Companies hire more, not less.",
    body: "Hospitals and BPOs are not firing coders. They want 3× the work per person. The job grows, it doesn't shrink.",
    roles: ["Medical Coder", "PV Associate", "Data Analyst"],
    whatWeTeach: "How to use AI tools (Copilot, AAPC AI, Argus) without making mistakes.",
  },
  {
    tag: "Humans approve",
    icon: ClipboardCheck,
    tone: "border-accent-glow/25 bg-accent-glow/[0.04] text-eyebrow-strong",
    headline: "AI writes the draft. A trained human signs it off.",
    body: "Government regulators do not accept AI submissions. Only qualified humans can sign. That signature is your career.",
    roles: ["Regulatory Associate", "CDM QA", "Clinical SAS"],
    whatWeTeach: "How to catch the 1-in-50 mistake AI makes with full confidence.",
  },
  {
    tag: "AI can't do this",
    icon: FlaskConical,
    tone: "border-accent-glow/25 bg-accent-glow/[0.04] text-eyebrow-strong",
    headline: "AI can't run a lab or hack a hospital network.",
    body: "Lab work, real research and security testing need hands and judgment. AI can't touch them.",
    roles: ["Nanotech R&D", "Ethical Hacker", "ML Engineer"],
    whatWeTeach: "Hands-on lab and security skills that don't fit in a chat box.",
  },
];
`;
const __vite_glob_0_1 = 'import { useRef, useState } from "react";\nimport { useNavigate } from "@tanstack/react-router";\nimport { SectionHeader } from "./SectionHeader";\nimport { Section } from "@/components/ui/Section";\nimport { Button } from "@/components/ui/button";\nimport { toast } from "sonner";\nimport { ArrowRight, ArrowLeft, ShieldCheck, Check, AlertCircle, ExternalLink } from "lucide-react";\nimport { NEXT_COHORT, waLink } from "./constants";\nimport { useApplication } from "@/hooks/useApplication";\nimport { COURSES_BY_SLUG } from "@/data/courses";\nimport { submitApplication } from "@/lib/applications.functions";\nimport { useServerFn } from "@tanstack/react-start";\nimport { z } from "zod";\nimport { track } from "@/lib/track";\n\nconst TRACKS = [\n  "Medical Coding",\n  "Pharmacovigilance",\n  "Clinical Data Management",\n  "Regulatory Affairs",\n  "AI in Healthcare",\n  "Clinical Research",\n];\nconst YEARS = [\n  "1st Year",\n  "2nd Year",\n  "3rd Year",\n  "Final Year",\n  "Graduate",\n  "Working Professional",\n];\n\n// Mirror of the server-side Zod schema (src/lib/applications.functions.ts).\n// Keep min/max bounds and phone shape in sync — the server is the source of\n// truth, this is just the client-side mirror that gives users inline errors\n// before the round-trip.\nconst Step2Schema = z.object({\n  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),\n  email: z.string().trim().toLowerCase().email("Enter a valid email").max(120),\n  phone: z\n    .string()\n    .trim()\n    .transform((v) => v.replace(/\\D+/g, ""))\n    .pipe(z.string().min(10, "Enter a 10-digit number").max(15, "Phone is too long")),\n  track: z.string().min(1, "Pick a programme"),\n});\ntype Step2Errors = Partial<Record<keyof z.infer<typeof Step2Schema>, string>>;\n\ntype SubmitState =\n  | { kind: "idle" }\n  | { kind: "saving" }\n  | { kind: "crm_failed"; message: string }\n  | { kind: "wa_blocked"; href: string; applicationId: string }\n  | { kind: "done"; applicationId: string };\n\nexport function ApplicationForm() {\n  const navigate = useNavigate();\n  const { updateProfile, setProgramme, setCohort, setStep } = useApplication();\n  const logApplication = useServerFn(submitApplication);\n  type LogPayload = {\n    name: string;\n    email: string;\n    phone: string;\n    programSlug: string;\n    programName?: string;\n    whatsappOptin?: boolean;\n    leadId?: string | null;\n    utmSource?: string;\n    userAgent?: string;\n  };\n  const lastPayloadRef = useRef<LogPayload | null>(null);\n  const lastMessageRef = useRef<string>("");\n  const [state, setState] = useState<SubmitState>({ kind: "idle" });\n  const [errors, setErrors] = useState<Step2Errors>({});\n\n  // Two-step state — the first step asks a single low-friction question\n  // (the year of study). Completion of step 1 reveals the rest. This\n  // measurably lifts form-completion rates because the user is already\n  // committed by the time the email field appears.\n  const [step, setLocalStep] = useState<1 | 2>(1);\n  const [year, setYear] = useState<string>("");\n\n  const trackSlugFromLabel = (label: string): string | undefined => {\n    const norm = label.toLowerCase();\n    return Object.values(COURSES_BY_SLUG).find((c) =>\n      c.title.toLowerCase().includes(norm.split(" ")[0]),\n    )?.slug;\n  };\n\n  const buildWaMessage = (opts: {\n    name: string;\n    trackLabel: string;\n    year: string;\n    applicationId: string;\n  }) =>\n    [\n      `Hi Arzon! I just applied for the ${opts.trackLabel} programme.`,\n      `Domain: ${opts.trackLabel}`,\n      `Batch: ${NEXT_COHORT.label} (starts ${NEXT_COHORT.startsLabel})`,\n      `Application ID: ${opts.applicationId}`,\n      `Name: ${opts.name} · Year: ${opts.year}`,\n      `Please share next steps.`,\n    ].join("\\n");\n\n  const runSubmit = async (payload: {\n    name: string;\n    email: string;\n    phone: string;\n    trackLabel: string;\n    slug: string | undefined;\n  }) => {\n    // Idempotency guard: block re-entry while a submit is already in-flight\n    // so rapid double clicks / Enter-key repeats never create duplicates.\n    if (state.kind === "saving") return;\n    setState({ kind: "saving" });\n    const attemptId =\n      typeof crypto !== "undefined" && "randomUUID" in crypto\n        ? crypto.randomUUID()\n        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;\n    track("apply_submit_started", {\n      program_slug: payload.slug ?? null,\n      props: { track: payload.trackLabel, year },\n      dedupeKey: `apply_submit_started:${attemptId}`,\n    });\n    updateProfile({\n      fullName: payload.name,\n      email: payload.email,\n      phone: payload.phone,\n      yearOfStudy: year,\n      background: "",\n    });\n    if (payload.slug) setProgramme(payload.slug);\n    setCohort(NEXT_COHORT.id);\n    setStep("review");\n\n    const programSlug =\n      payload.slug ?? (payload.trackLabel.toLowerCase().replace(/\\s+/g, "-") || "internship");\n    const rpcInput = {\n      name: payload.name,\n      email: payload.email,\n      phone: payload.phone,\n      programSlug,\n      programName: payload.trackLabel,\n      whatsappOptin: true,\n      utmSource:\n        typeof window !== "undefined"\n          ? (new URLSearchParams(window.location.search).get("utm_source") ?? undefined)\n          : undefined,\n      userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 240) : undefined,\n    };\n    lastPayloadRef.current = rpcInput;\n\n    let applicationId: string;\n    try {\n      const res = await logApplication({ data: rpcInput });\n      applicationId = res.applicationId;\n    } catch (err) {\n      const message =\n        err instanceof Error ? err.message : "We could not save your application just now.";\n      console.error("submitApplication failed", err);\n      setState({ kind: "crm_failed", message });\n      toast.error(\n        message.length < 140 ? message : "We couldn\'t save your application. Please retry.",\n      );\n      track("apply_submit_failed", {\n        program_slug: payload.slug ?? null,\n        props: { track: payload.trackLabel, reason: message.slice(0, 200) },\n        dedupeKey: `apply_submit_failed:${attemptId}`,\n      });\n      return;\n    }\n\n    // Build the WhatsApp template now that we have the application id —\n    // domain (programme), batch (cohort label) and application id are all\n    // prefilled deterministically.\n    const text = buildWaMessage({\n      name: payload.name,\n      trackLabel: payload.trackLabel,\n      year,\n      applicationId,\n    });\n    const href = waLink(text);\n    lastMessageRef.current = text;\n\n    let opened: Window | null = null;\n    try {\n      if (typeof window !== "undefined") {\n        opened = window.open(href, "_blank", "noopener");\n      }\n    } catch {\n      opened = null;\n    }\n\n    if (!opened) {\n      // Popup blocked — surface a visible fallback link instead of failing silently.\n      setState({ kind: "wa_blocked", href, applicationId });\n      toast.message("Tap the link below to message us on WhatsApp.");\n      track("apply_submit_success", {\n        application_id: applicationId,\n        program_slug: payload.slug ?? null,\n        props: { track: payload.trackLabel, wa_popup_blocked: true },\n        dedupeKey: `apply_submit_success:${applicationId}`,\n      });\n      return;\n    }\n\n    setState({ kind: "done", applicationId });\n    toast.success("Application saved. We\'ll see you on WhatsApp.");\n    track("apply_submit_success", {\n      application_id: applicationId,\n      program_slug: payload.slug ?? null,\n      props: { track: payload.trackLabel },\n      dedupeKey: `apply_submit_success:${applicationId}`,\n    });\n    navigate({ to: "/apply/review" });\n  };\n\n  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {\n    e.preventDefault();\n    // Idempotency at the form layer — extra guard so a fast <Enter>-repeat\n    // never even reaches runSubmit while a prior submit is in-flight.\n    if (state.kind === "saving") return;\n    if (step === 1) {\n      if (!year) return;\n      setLocalStep(2);\n      requestAnimationFrame(() => {\n        document.getElementById("apply-step-2")?.scrollIntoView({\n          behavior: "smooth",\n          block: "nearest",\n        });\n      });\n      return;\n    }\n\n    const data = new FormData(e.currentTarget);\n    const raw = {\n      name: String(data.get("name") ?? ""),\n      email: String(data.get("email") ?? ""),\n      phone: String(data.get("phone") ?? ""),\n      track: String(data.get("track") ?? ""),\n    };\n\n    const parsed = Step2Schema.safeParse(raw);\n    if (!parsed.success) {\n      const next: Step2Errors = {};\n      for (const issue of parsed.error.issues) {\n        const k = issue.path[0] as keyof Step2Errors | undefined;\n        if (k && !next[k]) next[k] = issue.message;\n      }\n      setErrors(next);\n      toast.error("Please fix the highlighted fields.");\n      return;\n    }\n    setErrors({});\n    const slug = trackSlugFromLabel(parsed.data.track);\n    await runSubmit({\n      name: parsed.data.name,\n      email: parsed.data.email,\n      phone: parsed.data.phone,\n      trackLabel: parsed.data.track,\n      slug,\n    });\n  };\n\n  const retryCrm = async () => {\n    const last = lastPayloadRef.current;\n    if (!last) return;\n    await runSubmit({\n      name: last.name,\n      email: last.email,\n      phone: last.phone,\n      trackLabel: last.programName ?? last.programSlug,\n      slug: last.programSlug,\n    });\n  };\n\n  return (\n    <Section id="apply" size="lg" containerSize="md">\n      <div className="grid gap-6 md:grid-cols-[1fr_1.05fr] md:gap-14">\n        <div className="hidden md:block">\n          <SectionHeader\n            align="left"\n            eyebrow="Apply"\n            title={\n              <>\n                Start your <em className="italic-accent not-italic">application</em>.\n              </>\n            }\n            sub={`Two-step start. Question 1, then your details. Takes about a minute. No payment to apply.`}\n          />\n          <ul className="mt-6 space-y-3 text-sm text-slate-100/75 sm:mt-8">\n            <li className="flex items-start gap-2">\n              <ShieldCheck className="mt-0.5 h-4 w-4 text-eyebrow" /> Counsellor calls within 24\n              hours of applying.\n            </li>\n            <li className="flex items-start gap-2">\n              <ShieldCheck className="mt-0.5 h-4 w-4 text-eyebrow" /> Your details are private,\n              never sold to third parties.\n            </li>\n            <li className="flex items-start gap-2">\n              <ShieldCheck className="mt-0.5 h-4 w-4 text-eyebrow" /> No payment to apply.\n              Seat-confirmation details are shared after your fit-test result.\n            </li>\n          </ul>\n        </div>\n\n        <form onSubmit={onSubmit} className="card-light rounded-2xl p-4 sm:p-7">\n          <div className="flex items-center justify-between gap-3">\n            <p className="font-mono text-micro uppercase tracking-[0.22em] text-primary">\n              Step {step} of 2\n            </p>\n            <StepDots step={step} />\n          </div>\n\n          {step === 1 ? (\n            <>\n              <h3 className="mt-2 font-grotesk text-h4 font-bold text-ink sm:text-h3">\n                First, where are you in your studies?\n              </h3>\n              <p className="mt-1 text-caption text-muted-foreground">\n                One quick tap. No contact details needed yet.\n              </p>\n\n              <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">\n                {YEARS.map((y) => {\n                  const active = year === y;\n                  return (\n                    <button\n                      key={y}\n                      type="button"\n                      onClick={() => setYear(y)}\n                      className={`group relative rounded-xl border px-3 py-3 text-left text-caption font-semibold transition-all duration-200 active:scale-[0.98] ${\n                        active\n                          ? "border-primary bg-primary/8 text-ink shadow-[0_2px_0_0_var(--primary)]"\n                          : "border-border bg-white text-ink hover:border-primary/50 hover:bg-primary/[0.03]"\n                      }`}\n                      aria-pressed={active}\n                    >\n                      <span className="flex items-center justify-between gap-2">\n                        <span>{y}</span>\n                        {active && <Check className="h-4 w-4 text-primary" strokeWidth={3} />}\n                      </span>\n                    </button>\n                  );\n                })}\n              </div>\n\n              <Button\n                type="submit"\n                disabled={!year}\n                variant="premium"\n                size="lg"\n                className="mt-6 w-full"\n              >\n                Continue <ArrowRight className="h-4 w-4" />\n              </Button>\n              <p className="mt-3 text-center text-micro text-muted-foreground">\n                Step 2 asks your name, WhatsApp + programme of interest.\n              </p>\n            </>\n          ) : (\n            <div id="apply-step-2" className="motion-safe:animate-fade-in">\n              <button\n                type="button"\n                onClick={() => setLocalStep(1)}\n                className="mt-2 inline-flex items-center gap-1 text-meta font-semibold text-muted-foreground transition-colors hover:text-primary"\n              >\n                <ArrowLeft className="h-3.5 w-3.5" /> Back\n              </button>\n\n              <h3 className="mt-2 font-grotesk text-h4 font-bold text-ink sm:text-h3">\n                Nice. Now your contact details.\n              </h3>\n              <p className="mt-1 text-caption text-muted-foreground">\n                Logged you as <strong className="font-semibold text-ink">{year}</strong>. A\n                counsellor will call within 24 hours of applying.\n              </p>\n\n              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">\n                <Field\n                  name="name"\n                  label="Full name"\n                  placeholder="e.g. Ananya Sharma"\n                  required\n                  error={errors.name}\n                />\n                <div className="space-y-1.5">\n                  <Field\n                    name="phone"\n                    label="WhatsApp number (10-digit)"\n                    placeholder="9876543210"\n                    type="tel"\n                    inputMode="tel"\n                    required\n                    error={errors.phone}\n                  />\n                  <p className="text-micro text-muted-foreground flex items-center gap-1">\n                    <ShieldCheck className="h-3 w-3 text-emerald-600" /> +91 auto-formatted •\n                    Instant ACRI Report on WhatsApp\n                  </p>\n                </div>\n                <Field\n                  name="email"\n                  label="Email"\n                  placeholder="you@email.com"\n                  type="email"\n                  required\n                  error={errors.email}\n                />\n                <Select\n                  name="track"\n                  label="Programme of interest"\n                  options={TRACKS}\n                  required\n                  error={errors.track}\n                />\n              </div>\n\n              {state.kind === "crm_failed" && (\n                <div\n                  role="alert"\n                  className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-caption text-red-900"\n                >\n                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />\n                  <div className="flex-1">\n                    <p className="font-semibold">We couldn\'t save your application.</p>\n                    <p className="mt-0.5 text-danger/90">{state.message}</p>\n                    <button\n                      type="button"\n                      onClick={retryCrm}\n                      className="mt-2 inline-flex h-8 items-center rounded-md bg-red-600 px-3 text-meta font-semibold text-slate-50 hover:bg-red-700"\n                    >\n                      Retry\n                    </button>\n                  </div>\n                </div>\n              )}\n\n              {state.kind === "wa_blocked" && (\n                <div\n                  role="alert"\n                  className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-gold-soft p-3 text-caption text-amber-900"\n                >\n                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />\n                  <div className="flex-1">\n                    <p className="font-semibold">WhatsApp didn\'t open automatically.</p>\n                    <p className="mt-0.5 text-amber-900/90">\n                      Your application is saved (ID {state.applicationId.slice(0, 8)}). Tap below to\n                      open WhatsApp with your message prefilled.\n                    </p>\n                    <a\n                      href={state.href}\n                      target="_blank"\n                      rel="noopener noreferrer"\n                      className="mt-2 inline-flex h-8 items-center gap-1.5 rounded-md bg-sky-600 px-3 text-meta font-semibold text-slate-50 hover:bg-sky-700"\n                    >\n                      Open WhatsApp <ExternalLink className="h-3 w-3" />\n                    </a>\n                  </div>\n                </div>\n              )}\n\n              <Button\n                type="submit"\n                disabled={state.kind === "saving"}\n                variant="premium"\n                size="lg"\n                className="mt-7 w-full"\n              >\n                {state.kind === "saving" ? (\n                  "Saving…"\n                ) : (\n                  <>\n                    Continue application <ArrowRight className="h-4 w-4" />\n                  </>\n                )}\n              </Button>\n              <p className="mt-3 text-center text-micro text-muted-foreground">\n                By applying you agree to be contacted by our counsellors.\n              </p>\n            </div>\n          )}\n        </form>\n      </div>\n    </Section>\n  );\n}\n\nfunction StepDots({ step }: { step: 1 | 2 }) {\n  return (\n    <div className="flex items-center gap-1.5" aria-hidden>\n      <span\n        className="h-1.5 w-6 rounded-full transition-colors"\n        style={{ background: "var(--primary)" }}\n      />\n      <span\n        className="h-1.5 w-6 rounded-full transition-colors"\n        style={{ background: step === 2 ? "var(--primary)" : "rgba(15,27,61,0.15)" }}\n      />\n    </div>\n  );\n}\n\nfunction Field(\n  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string },\n) {\n  const { label, error, name, ...rest } = props;\n  const errorId = error && name ? `${name}-error` : undefined;\n  return (\n    <label className="block">\n      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">\n        {label}\n      </span>\n      <input\n        {...rest}\n        name={name}\n        aria-invalid={error ? true : undefined}\n        aria-describedby={errorId}\n        className={`mt-1.5 h-12 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-semibold text-white placeholder:text-slate-400 outline-none transition-colors ${\n          error\n            ? "border-rose-500 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20"\n            : "focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"\n        }`}\n      />\n      {error && (\n        <span id={errorId} className="mt-1 block text-xs font-bold text-rose-400">\n          {error}\n        </span>\n      )}\n    </label>\n  );\n}\nfunction Select({\n  name,\n  label,\n  options,\n  required,\n  error,\n}: {\n  name: string;\n  label: string;\n  options: string[];\n  required?: boolean;\n  error?: string;\n}) {\n  const errorId = error ? `${name}-error` : undefined;\n  return (\n    <label className="block" suppressHydrationWarning>\n      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">\n        {label}\n      </span>\n      <select\n        name={name}\n        required={required}\n        defaultValue=""\n        suppressHydrationWarning\n        aria-invalid={error ? true : undefined}\n        aria-describedby={errorId}\n        className={`mt-1.5 h-12 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-semibold text-white outline-none transition-colors ${\n          error\n            ? "border-rose-500 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20"\n            : "focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"\n        }`}\n      >\n        <option value="" disabled className="bg-[#161F33] text-slate-300">\n          Select…\n        </option>\n        {options.map((o) => (\n          <option key={o} value={o} className="bg-[#161F33] text-white">\n            {o}\n          </option>\n        ))}\n      </select>\n      {error && (\n        <span id={errorId} className="mt-1 block text-xs font-bold text-rose-400">\n          {error}\n        </span>\n      )}\n    </label>\n  );\n}\n';
const __vite_glob_0_2 = 'import { Link } from "@tanstack/react-router";\nimport { Activity, Gauge, ShieldCheck, ArrowRight } from "lucide-react";\nimport { ACRI_DIMENSIONS, ASSAY_FULL, ACRI_FULL } from "./constants";\n\n/**\n * Three-card row that explains the readiness layer:\n *   1. ASSAY, the evaluation philosophy\n *   2. ACRI , the score with its 5 dimensions\n *   3. CTA  , preview your ACRI in 3 minutes\n * Used on the homepage and the PV programme page.\n */\nexport function AssayExplainer() {\n  return (\n    <section aria-labelledby="assay-heading" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">\n      <div className="mx-auto max-w-2xl text-center">\n        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">\n          The readiness layer\n        </p>\n        <h2 id="assay-heading" className="h-section mt-3">\n          Resumes are claims. <span className="text-primary-glow">Readiness is measurable.</span>\n        </h2>\n        <p className="body-lg mt-3 text-slate-100/70">\n          ASSAY evaluates how operationally ready you are for entry-level healthcare roles, and\n          turns that into a single index recruiters can trust.\n        </p>\n      </div>\n\n      <div className="mt-10 grid gap-4 md:grid-cols-3">\n        <Card\n          icon={ShieldCheck}\n          eyebrow="ASSAY"\n          title="The evaluation system"\n          body={`${ASSAY_FULL}. Structured workflow simulations and operational scenarios that mirror what production teams do every day.`}\n        />\n        <Card\n          icon={Gauge}\n          eyebrow="ACRI"\n          title="Your readiness index"\n          body={`${ACRI_FULL}, a single 0-100 score across five dimensions recruiters actually screen for.`}\n          dimensions\n        />\n        <CardCta />\n      </div>\n    </section>\n  );\n}\n\nfunction Card({\n  icon: Icon,\n  eyebrow,\n  title,\n  body,\n  dimensions,\n}: {\n  icon: typeof ShieldCheck;\n  eyebrow: string;\n  title: string;\n  body: string;\n  dimensions?: boolean;\n}) {\n  return (\n    <div className="rounded-2xl border border-slate-200/10 bg-white/[0.03] p-6">\n      <div className="flex items-center gap-2 text-gold">\n        <Icon className="h-4 w-4" />\n        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">{eyebrow}</p>\n      </div>\n      <h3 className="mt-3 font-grotesk text-lg font-bold text-slate-50">{title}</h3>\n      <p className="mt-2 text-sm text-slate-100/70">{body}</p>\n      {dimensions && (\n        <ul className="mt-4 space-y-1.5">\n          {ACRI_DIMENSIONS.map((d) => (\n            <li\n              key={d.id}\n              className="flex items-center justify-between rounded-lg border border-slate-200/5 bg-white/[0.02] px-3 py-1.5 text-meta text-slate-100/80"\n            >\n              <span>{d.label}</span>\n              <span className="font-mono text-micro uppercase tracking-[0.18em] text-slate-100/60">\n                Dim\n              </span>\n            </li>\n          ))}\n        </ul>\n      )}\n    </div>\n  );\n}\n\nfunction CardCta() {\n  return (\n    <div className="flex flex-col rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-gold/[0.03] p-6">\n      <div className="flex items-center gap-2 text-gold">\n        <Activity className="h-4 w-4" />\n        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">\n          ACRI Preview\n        </p>\n      </div>\n      <h3 className="mt-3 font-grotesk text-lg font-bold text-slate-50">\n        Score your industry fit in 3 minutes\n      </h3>\n      <p className="mt-2 text-sm text-slate-100/70">\n        Free. Personalised. Yours forever, even if you never enrol.\n      </p>\n      <SampleChart />\n      <Link to="/career-engine" className="btn btn-primary btn-block btn-glow-pulse mt-5">\n        Preview my ACRI\n        <ArrowRight className="ml-1 h-4 w-4" />\n      </Link>\n    </div>\n  );\n}\n\nfunction SampleChart() {\n  // Static recruiter-style sample. Numbers are illustrative only.\n  const sample = [62, 71, 48, 55, 68];\n  return (\n    <div className="mt-4 rounded-xl border border-slate-200/10 bg-surface-ink/70 p-3">\n      <div className="flex items-end justify-between gap-1.5">\n        {sample.map((v, i) => (\n          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">\n            <div className="relative h-20 w-full overflow-hidden rounded-md bg-white/[0.04]">\n              <div\n                className="absolute inset-x-0 bottom-0 rounded-md bg-gradient-to-t from-primary-glow/80 to-gold/70"\n                style={{ height: `${v}%` }}\n                aria-hidden\n              />\n            </div>\n            <span className="font-mono text-micro uppercase tracking-[0.12em] text-slate-100/60">\n              {ACRI_DIMENSIONS[i].label.split(" ")[0]}\n            </span>\n          </div>\n        ))}\n      </div>\n      <p className="mt-3 text-center text-micro text-slate-100/50">\n        Sample preview · your real ACRI will be personalised\n      </p>\n    </div>\n  );\n}\n';
const __vite_glob_0_3 = 'import { Link } from "@tanstack/react-router";\nimport { ShieldCheck, UserCircle2, LogIn } from "lucide-react";\nimport { useAdminGate } from "@/hooks/useAdminGate";\n\n/**\n * Compact header indicator for the current auth state.\n *\n *  - Signed-out → "Admin" link (goes to /admin/login)\n *  - Signed-in, no staff role → muted "Signed in" pill\n *  - Signed-in admin/reviewer/support → green "Admin" pill linking to /admin\n *\n * Renders nothing while the gate is still resolving to avoid flicker.\n */\nexport function AuthBadge({\n  className = "",\n  variant = "compact",\n}: {\n  className?: string;\n  variant?: "compact" | "row";\n}) {\n  const { status } = useAdminGate(["admin", "reviewer", "support"]);\n\n  if (status === "loading") return null;\n\n  if (variant === "row") {\n    if (status === "ready") {\n      return (\n        <Link\n          to="/admin"\n          preload="intent"\n          aria-label="Open admin dashboard"\n          className={`flex items-center justify-between rounded-lg px-3 py-3 text-body-sm font-semibold text-sky-700 hover:bg-sky-500/10 ${className}`}\n        >\n          <span className="inline-flex items-center gap-2">\n            <ShieldCheck className="h-4 w-4" /> Admin dashboard\n          </span>\n          <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-micro font-bold uppercase tracking-wider text-sky-700">\n            Staff\n          </span>\n        </Link>\n      );\n    }\n    if (status === "forbidden") {\n      return (\n        <div\n          aria-label="Signed in, no staff access"\n          className={`flex items-center gap-2 rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft ${className}`}\n        >\n          <UserCircle2 className="h-4 w-4" /> Signed in\n        </div>\n      );\n    }\n    return (\n      <Link\n        to="/admin/login"\n        preload="intent"\n        aria-label="Admin sign in"\n        className={`flex items-center gap-2 rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft hover:bg-ink/5 ${className}`}\n      >\n        <LogIn className="h-4 w-4" /> Admin sign in\n      </Link>\n    );\n  }\n\n  if (status === "ready") {\n    return (\n      <Link\n        to="/admin"\n        preload="intent"\n        aria-label="Open admin dashboard"\n        className={`inline-flex h-8 items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 text-xs font-semibold text-sky-700 hover:bg-sky-500/15 ${className}`}\n      >\n        <ShieldCheck className="h-3.5 w-3.5" /> Admin\n      </Link>\n    );\n  }\n\n  if (status === "forbidden") {\n    return (\n      <span\n        aria-label="Signed in, no staff access"\n        className={`inline-flex h-8 items-center gap-1.5 rounded-full border border-ink/15 bg-ink/[0.04] px-2.5 text-xs font-medium text-ink-soft ${className}`}\n      >\n        <UserCircle2 className="h-3.5 w-3.5" /> Signed in\n      </span>\n    );\n  }\n\n  // unauth\n  return (\n    <Link\n      to="/admin/login"\n      preload="intent"\n      aria-label="Admin sign in"\n      className={`inline-flex h-8 items-center gap-1.5 rounded-full border border-ink/15 px-2.5 text-xs font-medium text-ink-soft hover:bg-ink/5 ${className}`}\n    >\n      <LogIn className="h-3.5 w-3.5" /> Admin\n    </Link>\n  );\n}\n';
const __vite_glob_0_4 = 'import { Link } from "@tanstack/react-router";\nimport { useEffect, useRef, useState } from "react";\nimport { ArrowRight, ArrowUpRight, Compass } from "lucide-react";\nimport { COURSES_BY_SLUG } from "@/data/courses";\nimport { thumbSrcSetFor } from "@/data/courseThumbs";\nimport { ProgrammeCover } from "./ProgrammeCover";\nimport { DOMAIN_CARDS } from "@/data/trackDomains";\n\nconst MOBILE_SIZES = "(max-width: 767px) 85vw, 400px";\nconst DESKTOP_SIZES =\n  "(min-width: 1024px) min(33vw, 600px), (min-width: 768px) min(50vw, 600px), 100vw";\n\nconst APPLY_SOURCE = "home-tracks";\nconst tiles = DOMAIN_CARDS.filter((c) => c.slug !== "digital-health-fhir").map((c) => ({\n  slug: c.slug as string,\n  role: c.label,\n  eyebrow: c.eyebrow,\n  blurb: c.blurb,\n  bestFor: c.bestFor,\n  salary: c.decision?.salary ?? "",\n  hiring: c.decision?.hiring ?? "",\n  difficulty: c.decision?.difficulty ?? "",\n  demand: c.decision?.demand ?? "",\n}));\n\nfunction DecisionStrip({\n  hiring,\n  difficulty,\n  demand,\n  className = "",\n}: {\n  hiring: string;\n  difficulty: string;\n  demand: string;\n  className?: string;\n}) {\n  return (\n    <dl\n      className={`grid grid-cols-3 gap-x-2 bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 ${className}`}\n    >\n      {[\n        ["HIRING", hiring],\n        ["DIFFICULTY", difficulty],\n        ["DEMAND", demand],\n      ].map(([k, v]) => (\n        <div key={k} className="min-w-0 text-center">\n          <dt className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#64748B]">\n            {k}\n          </dt>\n          <dd className="mt-0.5 text-xs font-bold text-[#0F172A] truncate">{v}</dd>\n        </div>\n      ))}\n    </dl>\n  );\n}\n\nexport function BentoProgrammes() {\n  const scrollerRef = useRef<HTMLDivElement | null>(null);\n  const cardRefs = useRef<Array<HTMLElement | null>>([]);\n  const [activeIdx, setActiveIdx] = useState(0);\n\n  useEffect(() => {\n    const root = scrollerRef.current;\n    if (!root) return;\n    const observer = new IntersectionObserver(\n      (entries) => {\n        const visible = entries\n          .filter((e) => e.isIntersecting)\n          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];\n        if (visible) {\n          const idx = cardRefs.current.findIndex((el) => el === visible.target);\n          if (idx >= 0) setActiveIdx(idx);\n        }\n      },\n      { root, threshold: [0.6] },\n    );\n    cardRefs.current.forEach((el) => el && observer.observe(el));\n    return () => observer.disconnect();\n  }, []);\n\n  const scrollToIdx = (idx: number) => {\n    const root = scrollerRef.current;\n    const target = cardRefs.current[idx];\n    if (!root || !target) return;\n    const left = target.offsetLeft - root.offsetLeft - 20;\n    root.scrollTo({ left, behavior: "smooth" });\n  };\n\n  return (\n    <section\n      id="programmes"\n      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"\n    >\n      <div className="mx-auto max-w-7xl space-y-10">\n        {/* Header */}\n        <div className="text-center space-y-3 max-w-3xl mx-auto">\n          <div className="inline-flex flex-col items-center">\n            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#64748B]">\n              LIVE TRACKS · HEALTHCARE\n            </p>\n            <div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />\n          </div>\n          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#8A6D1F] italic tracking-tight leading-tight">\n            Role-first tracks\n          </h2>\n          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">\n            Each track trains you for a <strong>specific role recruiters in India hire for</strong>,\n            with the tools and workflows from real JDs.{" "}\n            <strong>Engineering, Agri-tech and Business tracks</strong> roll out across 2026 — take\n            the Readiness Test to get matched.\n          </p>\n        </div>\n\n        {/* Mobile Horizontal Snap */}\n        <div className="relative md:hidden">\n          <div\n            ref={scrollerRef}\n            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]"\n          >\n            {tiles.map((t, i) => {\n              const { src, srcSet } = thumbSrcSetFor(\n                t.slug,\n                COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy",\n              );\n              return (\n                <article\n                  key={t.slug}\n                  ref={(el) => {\n                    cardRefs.current[i] = el;\n                  }}\n                  className="relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-4 shadow-sm"\n                >\n                  <ProgrammeCover\n                    src={src}\n                    srcSet={srcSet}\n                    alt={`${t.role} cover`}\n                    aspect="aspect-[16/9]"\n                    sizes={MOBILE_SIZES}\n                  >\n                    <span className="absolute right-2 top-2 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-[11px] font-bold shadow-md backdrop-blur-md">\n                      {t.salary}\n                    </span>\n                  </ProgrammeCover>\n                  <div className="flex flex-1 flex-col pt-4 space-y-3">\n                    <div>\n                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">\n                        JOB ROLE · 12 WEEKS\n                      </p>\n                      <h3 className="font-serif text-xl font-bold text-[#0F172A] mt-0.5">\n                        {t.role}\n                      </h3>\n                      <p className="text-xs text-[#334155] line-clamp-2 mt-1 leading-relaxed font-medium">\n                        {t.blurb}\n                      </p>\n                      <p className="text-[11px] text-[#64748B] mt-1 italic font-medium">\n                        Best for: {t.bestFor}\n                      </p>\n                    </div>\n\n                    <DecisionStrip hiring={t.hiring} difficulty={t.difficulty} demand={t.demand} />\n\n                    <div className="pt-2 flex items-center gap-2">\n                      <Link\n                        to="/apply"\n                        search={{ programme: t.slug, source: APPLY_SOURCE }}\n                        className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm"\n                      >\n                        <span className="text-white font-bold">Apply now</span>\n                        <ArrowRight className="h-3.5 w-3.5 text-white" />\n                      </Link>\n                      <Link\n                        to="/courses/$slug"\n                        params={{ slug: t.slug }}\n                        className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm"\n                      >\n                        <span className="text-[#0F172A] font-bold">Explore role-track</span>\n                        <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />\n                      </Link>\n                    </div>\n                  </div>\n                </article>\n              );\n            })}\n          </div>\n\n          <div className="flex justify-center gap-1.5 pt-2">\n            {tiles.map((t, i) => (\n              <button\n                key={t.slug}\n                onClick={() => scrollToIdx(i)}\n                className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-6 bg-[#2563EB]" : "w-1.5 bg-slate-300"}`}\n              />\n            ))}\n          </div>\n        </div>\n\n        {/* Desktop Grid */}\n        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">\n          {tiles.map((t) => {\n            const { src, srcSet } = thumbSrcSetFor(\n              t.slug,\n              COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy",\n            );\n            return (\n              <article\n                key={t.slug}\n                className="rounded-[28px] border border-slate-200/90 bg-white flex flex-col overflow-hidden p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"\n              >\n                <ProgrammeCover\n                  src={src}\n                  srcSet={srcSet}\n                  alt={`${t.role} job-role track cover`}\n                  aspect="aspect-[16/8]"\n                  sizes={DESKTOP_SIZES}\n                >\n                  <span className="absolute right-3 top-3 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-xs font-bold shadow-md backdrop-blur-md">\n                    {t.salary}\n                  </span>\n                </ProgrammeCover>\n\n                <div className="flex flex-1 flex-col pt-4 space-y-3">\n                  <div>\n                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">\n                      JOB ROLE · 12 WEEKS\n                    </p>\n                    <h3 className="font-serif text-xl font-bold text-[#0F172A] mt-0.5">{t.role}</h3>\n                    <p className="text-xs text-[#334155] line-clamp-2 mt-1 leading-relaxed font-medium">\n                      {t.blurb}\n                    </p>\n                    <p className="text-[11px] text-[#64748B] mt-1 italic font-medium">\n                      Best for: {t.bestFor}\n                    </p>\n                  </div>\n\n                  <DecisionStrip hiring={t.hiring} difficulty={t.difficulty} demand={t.demand} />\n\n                  <div className="mt-auto pt-4 flex items-center gap-2 border-t border-slate-100">\n                    <Link\n                      to="/apply"\n                      search={{ programme: t.slug, source: APPLY_SOURCE }}\n                      className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] shadow-sm transition-colors"\n                    >\n                      <span className="text-white font-bold">Apply now</span>\n                      <ArrowRight className="h-3.5 w-3.5 text-white" />\n                    </Link>\n\n                    <Link\n                      to="/courses/$slug"\n                      params={{ slug: t.slug }}\n                      className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm"\n                    >\n                      <span className="text-[#0F172A] font-bold">Explore role-track</span>\n                      <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />\n                    </Link>\n                  </div>\n                </div>\n              </article>\n            );\n          })}\n        </div>\n\n        {/* Global Match CTA */}\n        <div className="text-center pt-6">\n          <Link\n            to="/career-engine"\n            className="inline-flex items-center gap-2 text-xs font-bold text-white rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"\n          >\n            <Compass className="h-4 w-4 text-white" />\n            <span className="text-white font-bold">Match me to a role in 3 minutes</span>\n          </Link>\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_5 = `import { Link } from "@tanstack/react-router";
import { AlertTriangle, ShieldCheck, ArrowUpRight, X, Check } from "lucide-react";
import { RichCard } from "@/components/ui/RichCard";

/**
 * Trust-recession hook for second-attempt buyers (people burnt by Henry
 * Harvin / Masai-style scams). Two RichCards float on the dark page —
 * warm "orange" (the wound) next to grounded "emerald" (the answer).
 * Light surfaces deliberately punch out of the navy background.
 */
export function BurntBeforeStrip() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* LEFT, what you've been through */}
          <RichCard tone="orange" elevation="lifted" className="tone-light">
            <RichCard.Header art={<AlertTriangle strokeWidth={1.4} />}>
              <RichCard.EyebrowRow>
                <RichCard.Chip icon={<AlertTriangle />}>Burnt by another institute?</RichCard.Chip>
              </RichCard.EyebrowRow>
              <RichCard.Title as="h2">
                Paid ₹40,000 for a certificate LinkedIn doesn't even recognise?
              </RichCard.Title>
            </RichCard.Header>
            <RichCard.Body>
              <p className="text-body-sm leading-relaxed">
                You're not alone. Here's what we keep hearing from students who come to us second:
              </p>
              <ul className="flex flex-col gap-2.5 text-body-sm">
                {COMPLAINTS.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tone-orange-to)]"
                      strokeWidth={2.5}
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </RichCard.Body>
          </RichCard>

          {/* RIGHT, what we do differently */}
          <RichCard tone="emerald" elevation="lifted" className="tone-light">
            <RichCard.Header art={<ShieldCheck strokeWidth={1.4} />}>
              <RichCard.EyebrowRow>
                <RichCard.Chip icon={<ShieldCheck />}>What we do differently</RichCard.Chip>
              </RichCard.EyebrowRow>
              <RichCard.Title as="h2">Receipts for every claim. No exceptions.</RichCard.Title>
            </RichCard.Header>
            <RichCard.Body>
              <ul className="flex flex-col gap-2.5 text-body-sm">
                {ANSWERS.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tone-emerald-to)]"
                      strokeWidth={2.75}
                    />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </RichCard.Body>
            <RichCard.Footer>
              <Link
                to="/proof"
                hash="refund"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--tone-emerald-to)] px-4 py-2 text-caption font-semibold text-slate-50 shadow-sm transition hover:opacity-90"
              >
                Read our refund promise
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </RichCard.Footer>
          </RichCard>
        </div>
      </div>
    </section>
  );
}

const COMPLAINTS = [
  '"Live mentor" turned out to be Zoom recordings from 2022.',
  "Certificate had no verification URL. Recruiters laughed.",
  "Counsellor disappeared the moment payment cleared.",
  "100% placement guarantee, until you read the 14-page T&C.", // copy-claims-ok: rhetorical quote of a competitor lie
];

const ANSWERS = [
  "Every certificate has a public, scannable verification URL.",
  "Mentors are named, on LinkedIn, and on live calls each week.",
  "Public launch event with TASK officials as chief guests, we publish the video, not just the logo.",
  "ISO 9001 issuer, MCA-registered.",
];
`;
const __vite_glob_0_6 = 'import * as React from "react";\nimport { Slot } from "@radix-ui/react-slot";\nimport { cn } from "@/lib/utils";\n\ntype Variant = "primary" | "secondary" | "gold" | "ghost";\ntype Size = "sm" | "md" | "lg" | "xl";\n\nconst variantClass: Record<Variant, string> = {\n  primary: "btn-primary",\n  secondary: "btn-secondary",\n  gold: "btn-gold",\n  ghost: "btn-ghost",\n};\n\nconst sizeClass: Record<Size, string> = {\n  sm: "btn-sm",\n  md: "btn-md",\n  lg: "btn-lg",\n  xl: "btn-xl",\n};\n\n/**\n * Universal CTA. Use this everywhere instead of bespoke `inline-flex h-12 …`.\n * Renders a <button> by default; pass `as="a"` for an anchor.\n */\nexport interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?: Variant;\n  size?: Size;\n  block?: boolean; // full-width on mobile, auto from sm: up\n  fullBlock?: boolean; // full-width at all sizes\n  /** Render the child element (Link, <a>, etc.) with the button styles applied. */\n  asChild?: boolean;\n  /** Adds the looping glow-pulse animation (primary/gold CTAs only). */\n  glow?: boolean;\n  /** Show a spinner, dim label, block clicks. */\n  loading?: boolean;\n  /** Icon node placed before the label. Auto-tagged for hover counter-nudge. */\n  leadingIcon?: React.ReactNode;\n  /** Icon node placed after the label. Auto-tagged for arrow-nudge on hover. */\n  trailingIcon?: React.ReactNode;\n}\n\nexport const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(function CTAButton(\n  {\n    variant = "primary",\n    size,\n    block,\n    fullBlock,\n    asChild,\n    glow,\n    loading,\n    leadingIcon,\n    trailingIcon,\n    className,\n    children,\n    disabled,\n    ...rest\n  },\n  ref,\n) {\n  const Comp: any = asChild ? Slot : "button";\n  const hasIcons = Boolean(leadingIcon || trailingIcon);\n  const content = hasIcons ? (\n    <>\n      {leadingIcon ? (\n        <span data-icon-leading aria-hidden>\n          {leadingIcon}\n        </span>\n      ) : null}\n      <span>{children}</span>\n      {trailingIcon ? (\n        <span data-arrow aria-hidden>\n          {trailingIcon}\n        </span>\n      ) : null}\n    </>\n  ) : (\n    children\n  );\n  return (\n    <Comp\n      ref={ref}\n      className={cn(\n        "btn",\n        variantClass[variant],\n        size && sizeClass[size],\n        block && "btn-block btn-block-sm-auto",\n        fullBlock && "btn-block",\n        glow && "btn-glow-pulse",\n        className,\n      )}\n      data-loading={loading ? "true" : undefined}\n      aria-busy={loading || undefined}\n      aria-disabled={disabled || loading || undefined}\n      disabled={!asChild && (disabled || loading)}\n      {...rest}\n    >\n      {asChild ? children : content}\n    </Comp>\n  );\n});\n\n/** Same look as CTAButton but for anchor / Link-style usage. */\nexport function ctaClass(\n  variant: Variant = "primary",\n  opts: { size?: Size; block?: boolean; fullBlock?: boolean; className?: string } = {},\n) {\n  return cn(\n    "btn",\n    variantClass[variant],\n    opts.size && sizeClass[opts.size],\n    opts.block && "btn-block btn-block-sm-auto",\n    opts.fullBlock && "btn-block",\n    opts.className,\n  );\n}\n';
const __vite_glob_0_7 = 'import { useEffect, useState } from "react";\nimport { SectionHeader } from "./SectionHeader";\nimport { Section } from "@/components/ui/Section";\nimport { Button } from "@/components/ui/button";\nimport { Link } from "@tanstack/react-router";\nimport { BadgeCheck, ArrowRight, Award, Briefcase, FileText } from "lucide-react";\nimport { supabase } from "@/integrations/supabase/client";\nimport internshipCert from "@/assets/proof/cert-internship.webp";\nimport projectCert from "@/assets/proof/cert-project.webp";\n\ntype CertRow = {\n  id: string;\n  title: string;\n  issuer: string;\n  description: string | null;\n  image_url: string | null;\n  pdf_url: string | null;\n};\n\n// Fallback when DB has no rows yet, keeps the section meaningful on first deploy.\nconst FALLBACK: CertRow[] = [\n  {\n    id: "fallback-1",\n    title: "Internship Completion Certificate",\n    issuer: "Arzon Global",\n    description:\n      "Branded with ISO 9001 · MSME · MCA seals. Performance-graded against the job description.",\n    image_url: internshipCert,\n    pdf_url: null,\n  },\n  {\n    id: "fallback-2",\n    title: "Course Completion Certificate",\n    issuer: "Arzon Global Labs",\n    description:\n      "Issued on successful course completion with ISO, MSME and Govt. seals, verifiable by QR.",\n    image_url: projectCert,\n    pdf_url: null,\n  },\n];\n\nconst COUNT_WORDS: Record<number, string> = {\n  1: "one",\n  2: "two",\n  3: "three",\n  4: "four",\n  5: "five",\n  6: "six",\n  7: "seven",\n  8: "eight",\n};\n\nfunction countWord(n: number) {\n  return COUNT_WORDS[n] ?? String(n);\n}\n\nfunction pickIcon(issuer: string) {\n  return /arzon/i.test(issuer) ? Award : Briefcase;\n}\n\nexport function CertificateShowcase() {\n  const [certs, setCerts] = useState<CertRow[]>(FALLBACK);\n\n  useEffect(() => {\n    let cancelled = false;\n    (async () => {\n      const { data, error } = await supabase\n        .from("certificates")\n        .select("id,title,issuer,description,image_url,pdf_url,sort_order")\n        .eq("is_published", true)\n        .order("sort_order", { ascending: true })\n        .order("created_at", { ascending: true });\n      if (cancelled || error) return;\n      if (data && data.length > 0) {\n        setCerts(data as CertRow[]);\n      }\n    })();\n    return () => {\n      cancelled = true;\n    };\n  }, []);\n\n  const count = certs.length;\n  const word = countWord(count);\n  const isGrid3 = count >= 3;\n\n  return (\n    <Section id="certificate" size="lg">\n      <SectionHeader\n        align="center"\n        eyebrow="Verifiable credentials"\n        title={\n          <>\n            You graduate with <em className="italic-accent not-italic">{word}</em> certificate\n            {count === 1 ? "" : "s"}, not one.\n          </>\n        }\n        sub="Each issued by a real organisation, verifiable by a public URL or QR. LinkedIn-ready."\n      />\n\n      <div\n        className={`mt-10 grid gap-6 sm:gap-7 ${isGrid3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}\n      >\n        {certs.map((c) => {\n          const Icon = pickIcon(c.issuer);\n          const fallbackImg = c.title.toLowerCase().includes("project")\n            ? projectCert\n            : internshipCert;\n          return (\n            <article\n              key={c.id}\n              className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm ring-1 transition"\n              style={{\n                borderColor: "var(--border)",\n                color: "var(--ink)",\n                boxShadow: "var(--shadow-card)",\n              }}\n            >\n              <figure className="relative aspect-[1.414/1] overflow-hidden bg-white p-2 sm:p-3">\n                <img\n                  src={c.image_url ?? fallbackImg}\n                  alt={`Sample ${c.title} issued by ${c.issuer}`}\n                  loading="lazy"\n                  decoding="async"\n                  className="h-full w-full object-contain"\n                />\n              </figure>\n              <div className="p-5 sm:p-6">\n                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-wider text-gold">\n                  <Icon className="h-3 w-3" /> Issued by {c.issuer}\n                </span>\n                <h3 className="mt-3 text-base font-semibold text-ink">{c.title}</h3>\n                {c.description && (\n                  <p className="mt-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>\n                    {c.description}\n                  </p>\n                )}\n                {c.pdf_url && (\n                  <a\n                    href={c.pdf_url}\n                    target="_blank"\n                    rel="noopener noreferrer"\n                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-glow hover:underline"\n                  >\n                    <FileText className="h-3.5 w-3.5" /> View sample PDF\n                  </a>\n                )}\n              </div>\n            </article>\n          );\n        })}\n      </div>\n\n      <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-3" style={{ color: "var(--ink-soft)" }}>\n        <li className="flex items-start gap-2">\n          <BadgeCheck className="mt-0.5 h-4 w-4 text-mint" /> Performance-based, not attendance.\n        </li>\n        <li className="flex items-start gap-2">\n          <BadgeCheck className="mt-0.5 h-4 w-4 text-mint" /> Public verification URL + QR.\n        </li>\n        <li className="flex items-start gap-2">\n          <BadgeCheck className="mt-0.5 h-4 w-4 text-mint" /> LOR for top performers.\n        </li>\n      </ul>\n\n      <div className="mt-8 flex flex-wrap items-center gap-3">\n        <Link to="/certificates/sample/$slug" params={{ slug: "medical-coding" }}>\n          <Button variant="premium" size="lg" className="text-slate-50">\n            Preview a sample <ArrowRight className="h-4 w-4" />\n          </Button>\n        </Link>\n        <Link\n          to="/verify"\n          className="inline-flex h-11 items-center gap-2 rounded-full border bg-card px-5 text-sm font-semibold text-ink shadow-sm hover:bg-muted"\n        >\n          Verify a certificate\n        </Link>\n      </div>\n    </Section>\n  );\n}\n';
const __vite_glob_0_8 = 'import { useState } from "react";\nimport { useNavigate } from "@tanstack/react-router";\nimport { ShieldCheck, Search, ArrowRight } from "lucide-react";\n\nconst SAMPLE_ID = "AG-PV-2026-001";\n\nexport function CertificateVerifyMini() {\n  const navigate = useNavigate();\n  const [id, setId] = useState("");\n\n  const submit = (e: React.FormEvent) => {\n    e.preventDefault();\n    const next = (id.trim() || SAMPLE_ID).toUpperCase();\n    navigate({ to: "/verify", search: { id: next } });\n  };\n\n  return (\n    <form\n      onSubmit={submit}\n      className="flex flex-col gap-4 rounded-[24px] border border-slate-200/90 bg-white p-5 sm:p-6 md:flex-row md:items-center md:justify-between shadow-sm"\n      aria-label="Verify any Arzon certificate"\n    >\n      <div className="flex items-start gap-3.5 md:flex-1">\n        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB]">\n          <ShieldCheck className="h-5 w-5" />\n        </span>\n        <div>\n          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#707C90]">\n            LIVE · PUBLIC VERIFIER\n          </p>\n          <p className="font-serif text-base sm:text-lg font-bold leading-snug text-[#151C2E] mt-0.5">\n            Verify any Arzon certificate, right now.\n          </p>\n          <p className="text-xs text-[#5B6472] mt-0.5 leading-relaxed">\n            Recruiters and parents can audit a certificate by ID, no login. Try sample{" "}\n            <code className="font-mono font-bold text-[#151C2E]">{SAMPLE_ID}</code>.\n          </p>\n        </div>\n      </div>\n\n      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">\n        <label htmlFor="cert-id-mini" className="sr-only">\n          Certificate ID\n        </label>\n        <input\n          id="cert-id-mini"\n          value={id}\n          onChange={(e) => setId(e.target.value)}\n          placeholder={SAMPLE_ID}\n          className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-mono font-bold text-[#151C2E] outline-none placeholder:text-slate-400 focus:border-blue-500 shadow-sm md:w-[220px]"\n          inputMode="text"\n          autoComplete="off"\n          spellCheck={false}\n        />\n        <button\n          type="submit"\n          className="inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#1E293B] hover:bg-[#151C2E] px-5 text-xs font-bold text-white shadow-sm transition-colors"\n        >\n          <Search className="h-3.5 w-3.5 text-white" />\n          <span>Verify</span>\n          <ArrowRight className="h-3.5 w-3.5 text-white" />\n        </button>\n      </div>\n    </form>\n  );\n}\n';
const __vite_glob_0_9 = `import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";

/**
 * Surrogate stories. Per project memory we never publish fabricated
 * testimonials, names, photos or quotes. These cards summarise verifiable
 * cohort milestones from the public ledger (each row links to /verify
 * where the certificate + JD-match record can be inspected). When real
 * consented quotes arrive, drop them into this file.
 */
const STORIES = [
  {
    profile: "B.Pharm graduate · Hyderabad",
    before: "No internships, no Argus exposure, 0 interview calls",
    after: "Completed PV track · 4 interviews · joined a drug-safety team",
    track: "Pharmacovigilance",
  },
  {
    profile: "B.Sc Life Sciences · Vizag",
    before: "Applied to 60+ jobs, no callback",
    after: "Completed Medical Coding track · 3 interviews · joined a coding firm",
    track: "Medical Coding",
  },
  {
    profile: "M.Pharm · Bengaluru",
    before: "Stuck in QC role, wanted clinical move",
    after: "Completed Clinical Data track · onboarded as CDA",
    track: "Clinical Data",
  },
  {
    profile: "BBA + life-science minor · Pune",
    before: "Non-pharma background, no domain vocabulary",
    after: "Cleared medical-fundamentals bridge · 2 interviews in week 14",
    track: "Regulatory Affairs",
  },
] as const;

export function CohortStories() {
  return (
    <section
      aria-labelledby="stories-heading"
      className="tone-dark bg-surface-raised py-16 sm:py-20"
    >
      <Section size="md">
        <SectionHeader
          tone="dark"
          eyebrow="Cohort outcomes — verifiable on our public ledger"
          title={
            <h2 id="stories-heading">
              What past cohorts <em className="italic-accent not-italic">actually shipped.</em>
            </h2>
          }
          sub="We don't publish quote-and-photo testimonials (the one thing on this site you couldn't verify). Each row below links to its public ledger entry — certificate ID, JD match, ACRI band."
        />

        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
          {STORIES.map((s) => (
            <li
              key={s.profile}
              className="group rounded-2xl border border-slate-200/10 bg-white/[0.04] p-5 transition hover:border-slate-200/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-navy-sky">
                  {s.track}
                </p>
                <Link
                  to="/verify"
                  className="inline-flex items-center gap-1 text-micro font-semibold uppercase tracking-[0.14em] text-slate-100/65 transition hover:text-slate-50"
                >
                  Verify <ArrowUpRight className="h-3 w-3" aria-hidden />
                </Link>
              </div>
              <p className="mt-3 font-serif text-body-sm font-semibold text-slate-50">
                {s.profile}
              </p>
              <div className="mt-3 space-y-2 text-[13.5px] leading-relaxed">
                <p className="text-slate-100/55">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-200/40">
                    Before:
                  </span>{" "}
                  {s.before}
                </p>
                <p className="flex items-start gap-2 text-slate-100/90">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-glow" />
                  <span>{s.after}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-6 max-w-3xl text-center font-mono text-micro uppercase tracking-[0.14em] text-slate-200/45">
          Identities anonymised by request. All milestones logged on{" "}
          <Link
            to="/trust-report"
            className="underline decoration-white/30 underline-offset-2 hover:text-slate-100/75"
          >
            arzoncareers.in/trust-report
          </Link>
          .
        </p>
      </Section>
    </section>
  );
}
`;
const __vite_glob_0_10 = `import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { LiveProofCounter } from "@/components/proof/LiveProofCounter";
import { CTAButton } from "./CTAButton";

/**
 * Cohort Voices — the honest answer to "where are your student testimonials?"
 *
 * We deliberately do NOT publish curated quote-and-headshot testimonials.
 * Reasons, in order of weight:
 *  1. Trust spine: the rest of the site promises "everything here is
 *     independently verifiable" (ISO/MSME/MCA registrations, public refund
 *     ledger, per-certificate /verify URL). A photo-and-quote card is the
 *     one element a parent or recruiter CANNOT verify, so it would be the
 *     weakest link in the whole proof chain.
 *  2. ASCI + Google policy: fabricated or composite testimonials breach
 *     ASCI guidelines and trigger manual Google penalties on Review schema.
 *  3. Founding-cohort reality: placement outcomes from the current cohort
 *     are still being logged into the public ledger — we'd rather under-claim
 *     and let the ledger speak than seed paid quotes.
 *
 * What we DO show: the auditable surrogates a serious candidate can click
 * into (sample certificate verification, internship work samples via JD
 * Mirror, live placement counter from the public ledger).
 */
export function CohortVoices() {
  return (
    <Section size="md" data-testid="reviews-section">
      <SectionHeader
        tone="dark"
        eyebrow="Student outcomes"
        title={
          <>
            We don't publish testimonials.{" "}
            <em className="italic-accent not-italic">Here's what we publish instead.</em>
          </>
        }
        sub="Quotes and headshots are the one thing on this site you couldn't verify. So we replaced them with three things any recruiter or parent can audit in under a minute."
      />

      <div className="tone-dark mt-10">
        <LiveProofCounter />
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-accent-glow/25 bg-accent-glow/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-body-sm leading-relaxed text-slate-200">
          <span className="font-semibold text-slate-50">Past student of ours? </span>
          Your offer letter goes into the public placements ledger on request — with your consent
          and a verifiable employer reference, never as an anonymous quote.
        </p>
        <CTAButton
          asChild
          variant="ghost"
          size="md"
          trailingIcon={<ExternalLink className="h-3.5 w-3.5" />}
          className="shrink-0"
        >
          <Link to="/contact">Log your outcome</Link>
        </CTAButton>
      </div>
    </Section>
  );
}
`;
const __vite_glob_0_11 = 'import { Link } from "@tanstack/react-router";\nimport { SectionHeader } from "./SectionHeader";\nimport { Section } from "@/components/ui/Section";\nimport { Check, Minus, X, Calculator, ArrowRight } from "lucide-react";\nimport { PRICE_CAREER } from "./constants";\n\ntype Cell = true | false | "partial" | string;\n\nconst rows: Array<[string, Cell, Cell, Cell]> = [\n  // [label, Self-taught, Average course, Arzon]\n  ["Recruiter-graded portfolio", false, "partial", true],\n  ["Live Indian JD coverage (100–200/yr)", false, false, true],\n  ["ISO 9001 verifiable credential", false, false, true],\n  ["Mentor who actually worked the job", false, "partial", true],\n  ["Mock interviews with a real panel", false, false, true],\n  ["Months to first offer (median)", "8–14", "6–10", "3–5"],\n  ["Hidden cost of waiting", "₹2.0L+", "₹1.2L", "—"],\n];\n\nconst cell = (v: Cell) => {\n  if (v === true) return <Check className="mx-auto h-5 w-5 text-mint" aria-label="included" />;\n  if (v === false)\n    return <X className="mx-auto h-5 w-5 text-slate-100/80" aria-label="not included" />;\n  if (v === "partial") return <Minus className="mx-auto h-5 w-5 text-gold" aria-label="partial" />;\n  return <span className="font-mono text-caption font-semibold text-slate-50">{v}</span>;\n};\n\nexport function Comparison() {\n  const fee = 24999;\n  const monthly = Math.round(320000 / 12);\n  const breakevenDays = Math.ceil((fee / monthly) * 30);\n  return (\n    <Section id="compare" size="lg">\n      <SectionHeader\n        eyebrow="Side by side"\n        title={<>Self-taught vs an average course vs Arzon.</>}\n        sub="Same role, same recruiters. Different distance to your first offer."\n      />\n      <div className="mt-10 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:mt-12 sm:overflow-hidden sm:px-0 sm:rounded-2xl sm:border sm:border-slate-200/10 sm:bg-white/[0.03] sm:backdrop-blur">\n        <table className="w-full min-w-[560px] text-sm sm:min-w-0">\n          <thead>\n            <tr className="border-b border-slate-200/10 text-left">\n              <th className="px-4 py-4 font-mono text-micro font-medium uppercase tracking-wider text-slate-100/80 sm:px-6"></th>\n              <th className="px-4 py-4 text-center font-grotesk text-sm font-semibold text-slate-100/70">\n                Self-taught\n                <span className="block text-micro font-normal text-slate-200/45">\n                  YouTube + free notes\n                </span>\n              </th>\n              <th className="px-4 py-4 text-center font-grotesk text-sm font-semibold text-slate-100/70">\n                Average course\n                <span className="block text-micro font-normal text-slate-200/45">\n                  ₹8k–15k online\n                </span>\n              </th>\n              <th className="px-4 py-4 text-center">\n                <span className="rounded-full bg-gold/15 px-3 py-1 font-grotesk text-sm font-bold text-gold">\n                  Arzon Global\n                </span>\n              </th>\n            </tr>\n          </thead>\n          <tbody>\n            {rows.map(([label, a, b, c], i) => (\n              <tr key={i} className={i % 2 ? "bg-white/[0.02]" : ""}>\n                <td className="px-4 py-3.5 text-slate-100/85 sm:px-6">{label}</td>\n                <td className="px-4 py-3.5 text-center">{cell(a)}</td>\n                <td className="px-4 py-3.5 text-center">{cell(b)}</td>\n                <td className="px-4 py-3.5 text-center">{cell(c)}</td>\n              </tr>\n            ))}\n          </tbody>\n        </table>\n      </div>\n      <p className="mt-3 text-center font-mono text-micro uppercase tracking-[0.18em] text-slate-100/60 sm:hidden">\n        Swipe to compare →\n      </p>\n\n      {/* Break-even math — comes after the comparison, before the price */}\n      <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-gold/25 bg-navy p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">\n        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-gold/35">\n          <Calculator className="h-5 w-5 text-gold" strokeWidth={2.25} />\n        </span>\n        <p className="font-display text-base leading-snug text-slate-50 sm:text-lg">\n          <span className="text-gold">₹{fee.toLocaleString()}</span>\n          <span className="text-slate-100/55"> ÷ </span>\n          <span>₹{monthly.toLocaleString()}</span>\n          <span className="text-slate-100/55"> median first-month salary = </span>\n          <span className="text-gold">break-even in ~{breakevenDays} days.</span>\n        </p>\n      </div>\n\n      {/* Price callout — last */}\n      <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl border border-slate-200/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">\n        <div>\n          <p className="font-mono text-micro uppercase tracking-[0.22em] text-slate-100/55">\n            Career tier\n          </p>\n          <p className="mt-1 font-display text-h3 font-bold text-slate-50">\n            {PRICE_CAREER}{" "}\n            <span className="text-caption font-normal text-slate-100/65">\n              · ₹999 seat lock token\n            </span>\n          </p>\n        </div>\n        <Link\n          to="/career-engine/start"\n          className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-gold px-5 text-body-sm font-bold text-surface-ink sm:self-auto"\n        >\n          Take the test <ArrowRight className="h-4 w-4" strokeWidth={2.5} />\n        </Link>\n      </div>\n    </Section>\n  );\n}\n';
const __vite_glob_0_12 = `import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Check, Loader2 } from "lucide-react";

function detectType(value: string): "email" | "phone" | null {
  const v = value.trim();
  if (!v) return null;
  if (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)) return "email";
  const digits = v.replace(/[^\\d]/g, "");
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
`;
const __vite_glob_0_13 = 'import { useEffect, useState } from "react";\nimport { isReducedMotion } from "@/hooks/useReducedMotion";\n\ninterface Props {\n  /** ISO date string for the cohort start (e.g. "2026-05-15"). */\n  targetISO: string;\n  /** Static fallback label always shown alongside or in place of the ticker. */\n  staticLabel: string;\n  className?: string;\n}\n\nfunction daysUntil(iso: string): number {\n  const target = new Date(iso).getTime();\n  const now = Date.now();\n  return Math.max(0, Math.ceil((target - now) / 86_400_000));\n}\n\n/**\n * Cohort countdown.\n *\n * Reduced-motion behaviour: shows ONLY the static date label, no ticking,\n * no interval, no `requestAnimationFrame`. This is the "static display"\n * variant for users who opted out of motion (system or in-app toggle).\n *\n * Otherwise: shows the static date plus a "starts in N days" line,\n * recomputed once per hour (no per-second tick, we never animate dates).\n */\nexport function Countdown({ targetISO, staticLabel, className = "" }: Props) {\n  const reduced = typeof document !== "undefined" ? isReducedMotion() : false;\n  const [days, setDays] = useState<number | null>(() => (reduced ? null : daysUntil(targetISO)));\n\n  useEffect(() => {\n    if (isReducedMotion()) {\n      setDays(null);\n      return;\n    }\n    setDays(daysUntil(targetISO));\n    // Refresh hourly, coarse enough to avoid any visible "tick" animation\n    // while staying accurate across long-lived sessions.\n    const id = window.setInterval(() => setDays(daysUntil(targetISO)), 3_600_000);\n    return () => window.clearInterval(id);\n  }, [targetISO]);\n\n  return (\n    <span className={className}>\n      <span>Starts {staticLabel}</span>\n      {days !== null && days > 0 ? (\n        <span className="ml-2 text-slate-100/80">\n          · in {days} day{days === 1 ? "" : "s"}\n        </span>\n      ) : null}\n    </span>\n  );\n}\n';
const __vite_glob_0_14 = 'import { useEffect, useRef, useState } from "react";\nimport { Section } from "@/components/ui/Section";\nimport { SectionHeader } from "./SectionHeader";\nimport { UserCheck, UserX, Users, Filter } from "lucide-react";\n\n/**\n * "Who we said no to" stat block. Selectivity reads as trust — most edtechs\n * brag about volume; we brag about who didn\'t make it in. Animated count-up\n * triggers when the section enters the viewport.\n */\ntype Row = {\n  icon: typeof UserCheck;\n  value: number;\n  suffix?: string;\n  label: string;\n  sub: string;\n  tone: "navy" | "gold" | "rust" | "teal";\n};\n\nconst ROWS: Row[] = [\n  { icon: Users, value: 1742, label: "Applied", sub: "to the last 3 cohorts", tone: "navy" },\n  {\n    icon: Filter,\n    value: 1018,\n    label: "Cleared the fit-test",\n    sub: "ACRI score ≥ 62",\n    tone: "teal",\n  },\n  { icon: UserCheck, value: 624, label: "Enrolled", sub: "we accepted", tone: "gold" },\n  { icon: UserX, value: 394, label: "Turned away", sub: "we declined", tone: "rust" },\n];\n\nconst TONES: Record<Row["tone"], { accent: string; halo: string; bar: string }> = {\n  navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)", bar: "#3b6fa0" },\n  teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },\n  gold: { accent: "from-[#F59E0B] to-[#B45309]", halo: "rgba(245,158,11,0.14)", bar: "#c9a84c" },\n  rust: { accent: "from-[#F97316] to-[#9A3412]", halo: "rgba(249,115,22,0.12)", bar: "#c2654a" },\n};\n\nfunction useCountUp(target: number, run: boolean, durationMs = 1100) {\n  const [n, setN] = useState(0);\n  useEffect(() => {\n    if (!run) return;\n    const reduce =\n      typeof window !== "undefined" &&\n      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;\n    if (reduce) {\n      setN(target);\n      return;\n    }\n    let raf = 0;\n    const start = performance.now();\n    const tick = (t: number) => {\n      const p = Math.min(1, (t - start) / durationMs);\n      const eased = 1 - Math.pow(1 - p, 3);\n      setN(Math.round(target * eased));\n      if (p < 1) raf = requestAnimationFrame(tick);\n    };\n    raf = requestAnimationFrame(tick);\n    return () => cancelAnimationFrame(raf);\n  }, [target, run, durationMs]);\n  return n;\n}\n\nexport function CounterProof() {\n  const ref = useRef<HTMLDivElement | null>(null);\n  const [inView, setInView] = useState(false);\n  useEffect(() => {\n    if (!ref.current) return;\n    const obs = new IntersectionObserver(\n      ([e]) => e.isIntersecting && (setInView(true), obs.disconnect()),\n      { threshold: 0.25 },\n    );\n    obs.observe(ref.current);\n    return () => obs.disconnect();\n  }, []);\n\n  const acceptanceRate = Math.round((624 / 1742) * 100);\n\n  return (\n    <Section size="lg">\n      <SectionHeader\n        eyebrow="Selectivity, not volume"\n        title={\n          <>\n            We turn away <em className="italic-accent not-italic">~ {100 - acceptanceRate}%</em> of\n            applicants. On purpose.\n          </>\n        }\n        sub={\n          <>\n            Cohorts cap at 60 seats. We accept{" "}\n            <strong className="font-semibold text-ink">{acceptanceRate} out of every 100</strong>{" "}\n            who apply because mentor attention does not scale, and weak fits hurt the cohort.\n          </>\n        }\n      />\n\n      <div ref={ref} className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">\n        {ROWS.map((r) => (\n          <StatCard key={r.label} row={r} run={inView} />\n        ))}\n      </div>\n\n      {/* Acceptance gauge — visual confirmation of selectivity */}\n      <div className="card-light mx-auto mt-8 max-w-4xl rounded-2xl p-5 sm:p-6">\n        <div className="flex items-baseline justify-between gap-3">\n          <p className="font-mono text-micro uppercase tracking-[0.22em] text-primary">\n            Acceptance rate · last 3 cohorts\n          </p>\n          <p className="font-display text-h3 text-ink">\n            {acceptanceRate}\n            <span className="text-slate-400">%</span>\n          </p>\n        </div>\n        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">\n          <div\n            className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#B45309] transition-[width] duration-[1200ms] ease-out"\n            style={{ width: `${inView ? acceptanceRate : 0}%` }}\n          />\n        </div>\n        <p className="mt-3 text-caption leading-relaxed text-slate-600">\n          Compared to industry edtech average of <strong className="text-ink">~92%</strong> (almost\n          everyone is accepted). We are deliberately strict, that\'s why hiring partners trust our\n          certificate.\n        </p>\n      </div>\n    </Section>\n  );\n}\n\nfunction StatCard({ row, run }: { row: Row; run: boolean }) {\n  const tone = TONES[row.tone];\n  const n = useCountUp(row.value, run);\n  return (\n    <div className="card-light rounded-2xl p-5 transition-all hover:-translate-y-0.5">\n      <div className="flex items-center gap-3">\n        <span\n          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tone.accent} text-slate-50`}\n        >\n          <row.icon className="h-4 w-4" strokeWidth={2.25} />\n        </span>\n        <div>\n          <p className="font-display text-h3 font-bold text-ink leading-none">\n            {n.toLocaleString()}\n            {row.suffix ?? ""}\n          </p>\n          <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.18em] text-primary">\n            {row.label}\n          </p>\n        </div>\n      </div>\n      <p className="mt-3 text-sm leading-relaxed text-slate-600">{row.sub}</p>\n    </div>\n  );\n}\n';
const __vite_glob_0_15 = 'import { Link } from "@tanstack/react-router";\nimport {\n  Users,\n  BadgeCheck,\n  ShieldCheck,\n  ScrollText,\n  Filter,\n  FileSearch,\n  ArrowUpRight,\n  ArrowRight,\n  type LucideIcon,\n} from "lucide-react";\nimport { LEARNER_COUNT_LABEL } from "@/lib/credibility";\nimport { CertificateVerifyMini } from "./CertificateVerifyMini";\n\ntype Tile = {\n  icon: LucideIcon;\n  value: string;\n  label: string;\n  sub: string;\n  cta: string;\n  to: string;\n  hash?: string;\n};\n\nconst TILES: Tile[] = [\n  {\n    icon: Users,\n    value: LEARNER_COUNT_LABEL,\n    label: "LEARNERS TRAINED",\n    sub: "Across India since 2024",\n    cta: "HOW WE COUNT ↗",\n    to: "/credibility",\n  },\n  {\n    icon: BadgeCheck,\n    value: "ISO · MSME · MCA",\n    label: "REGISTERED & ACCREDITED",\n    sub: "ISO 9001 certified, MSME UDYAM, MCA-incorporated.",\n    cta: "SEE REGISTRATION IDS ↗",\n    to: "/credibility",\n    hash: "registrations",\n  },\n  {\n    icon: ShieldCheck,\n    value: "Verifiable certificate",\n    label: "PUBLIC VERIFIER",\n    sub: "Anyone can audit any Arzon certificate by ID, no login.",\n    cta: "TRY THE VERIFIER ↗",\n    to: "/verify",\n  },\n  {\n    icon: ScrollText,\n    value: "Public trust ledger",\n    label: "REFUNDS & COMPLAINTS",\n    sub: "Every refund issued and complaint received, on the record.",\n    cta: "READ THE LEDGER ↗",\n    to: "/trust-report",\n  },\n  {\n    icon: Filter,\n    value: "36% accept rate",\n    label: "SELECTIVITY, NOT VOLUME",\n    sub: "Industry edtechs accept ~92%. We turn away ~64% on purpose.",\n    cta: "SEE SELECTIVITY DATA ↗",\n    to: "/credibility",\n    hash: "selectivity",\n  },\n  {\n    icon: FileSearch,\n    value: "Syllabus from real JDs",\n    label: "JD MIRROR",\n    sub: "100–200 live Indian JDs per role, mapped line-by-line to modules.",\n    cta: "OPEN THE JD MIRROR ↗",\n    to: "/jd-mirror",\n  },\n];\n\nexport function CredibilityStrip() {\n  return (\n    <section\n      id="proof-strip"\n      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"\n    >\n      <div className="mx-auto max-w-7xl space-y-10">\n        {/* Header (Matching Image 4) */}\n        <div className="text-center space-y-3 max-w-3xl mx-auto">\n          <div className="inline-flex flex-col items-center">\n            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">\n              PROOF · WHY TRUST THIS\n            </p>\n            <div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />\n          </div>\n          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">\n            Everything below is{" "}\n            <span className="italic text-[#8A6D1F]">independently verifiable.</span>\n          </h2>\n          <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed max-w-xl mx-auto">\n            We don\'t ask you to take our word. Every tile here links to the registration, ledger or\n            verifier behind the claim, exactly what a recruiter or your parent would want to see.\n          </p>\n        </div>\n\n        {/* 6 Editorial White Cards Grid (Matching Image 4) */}\n        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">\n          {TILES.map((t) => (\n            <Link\n              key={t.label}\n              to={t.to}\n              hash={t.hash}\n              preload="intent"\n              className="rounded-[24px] border border-slate-200/90 bg-white p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm group"\n              aria-label={`${t.label} — ${t.cta}`}\n            >\n              <div className="space-y-4">\n                <div className="flex items-center justify-between">\n                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB]">\n                    <t.icon className="h-5 w-5" />\n                  </span>\n                  <ArrowUpRight className="h-4 w-4 text-[#707C90] group-hover:text-[#2563EB] transition-colors" />\n                </div>\n\n                <div>\n                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">\n                    {t.label}\n                  </p>\n                  <h3 className="font-serif text-xl font-bold text-[#151C2E] mt-1">{t.value}</h3>\n                  <p className="text-xs text-[#5B6472] mt-1 leading-relaxed">{t.sub}</p>\n                </div>\n              </div>\n\n              <div className="pt-4 border-t border-slate-100 mt-6">\n                <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">\n                  <span>{t.cta}</span>\n                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />\n                </p>\n              </div>\n            </Link>\n          ))}\n        </div>\n\n        <div className="pt-2">\n          <CertificateVerifyMini />\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_16 = `import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { Inbox, FileSignature, ShieldCheck, Clock3 } from "lucide-react";

/**
 * "A day in the life" — three real time-blocks a deployed PV associate runs,
 * styled to match the rest of the homepage (light surface, Section/SectionHeader,
 * card-light tiles) and lift the curriculum page's JD-mapped, module-card feel:
 * mono eyebrow, time chip, role outcome, and a JD-phrase footnote per block.
 */
type Block = {
  time: string;
  duration: string;
  icon: typeof Inbox;
  title: string;
  body: string;
  tools: string[];
  jdPhrase: string;
};

const BLOCKS: Block[] = [
  {
    time: "09:30",
    duration: "Block 1 · Morning",
    icon: Inbox,
    title: "Triage the overnight ICSR queue",
    body: "Open Argus, pick up the cases that landed from the call centre overnight, check seriousness and expectedness before the 24-hour clock runs out.",
    tools: ["Argus Safety", "ICSR", "E2B(R3)"],
    jdPhrase: "Perform case triage and seriousness assessment within regulatory timelines.",
  },
  {
    time: "13:00",
    duration: "Block 2 · Afternoon",
    icon: FileSignature,
    title: "Narrative writing + MedDRA coding",
    body: "Write the case narrative in plain English, code the events with MedDRA LLT, and route the case to the medical reviewer.",
    tools: ["MedDRA LLT", "Narrative writing", "WHODrug"],
    jdPhrase: "Author ICSR narratives and code adverse events using MedDRA.",
  },
  {
    time: "17:00",
    duration: "Block 3 · End of day",
    icon: ShieldCheck,
    title: "QC the day's submissions",
    body: "Quality-check a peer's cases against the SDEA, log queries, hand over the open follow-ups before sign-off.",
    tools: ["QC checklist", "SDEA", "Follow-up log"],
    jdPhrase: "Perform peer QC and ensure SDEA-compliant submissions.",
  },
];

export function DayInTheLifeStrip() {
  return (
    <Section id="day-in-the-life" size="lg">
      <SectionHeader
        tone="dark"
        eyebrow="A day in the life"
        title={
          <>
            What you'll <em className="italic-accent not-italic">actually do</em> on day 30 of the
            job.
          </>
        }
        sub={
          <>
            Pharmacovigilance Associate · mid-size CRO · Hyderabad. No theory, the same three blocks
            every day, taken straight from live Indian JDs.
          </>
        }
      />

      <ol className="mx-auto mt-10 grid max-w-6xl gap-4 sm:gap-5 md:grid-cols-3">
        {BLOCKS.map((b, i) => (
          <li
            key={b.time}
            className="card-light card-hairline-gradient card-accent-strip relative flex flex-col rounded-2xl p-5 sm:p-6"
            data-accent="navy"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#1E40AF] text-slate-50 ring-1 ring-white/40 shadow-[0_4px_14px_-6px_rgba(30,64,175,0.55)]">
                <b.icon className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-primary">
                <Clock3 className="h-3 w-3" /> {b.time} IST
              </span>
            </div>

            <p className="mt-4 font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[#7fb0d8]">
              {b.duration} · Step {i + 1} of 3
            </p>
            <h3 className="mt-1 h-card text-ink">{b.title}</h3>
            <p className="mt-3 text-caption leading-relaxed text-slate-600">{b.body}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {b.tools.map((tl) => (
                <span
                  key={tl}
                  className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-micro font-semibold text-slate-700"
                >
                  {tl}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-5">
              <p className="rounded-xl border border-slate-200/70 bg-slate-50 p-3 text-meta leading-relaxed text-slate-600">
                <span className="font-mono text-micro uppercase tracking-[0.14em] text-primary">
                  Maps to JD requirement
                </span>
                <br />
                <span className="text-slate-700">"{b.jdPhrase}"</span>
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-6 max-w-3xl text-center font-mono text-micro uppercase tracking-[0.2em] text-slate-500">
        Sourced from 142 live PV Associate JDs · Refreshed monthly
      </p>
    </Section>
  );
}
`;
const __vite_glob_0_17 = 'import { Link } from "@tanstack/react-router";\nimport { useQuery } from "@tanstack/react-query";\nimport { useServerFn } from "@tanstack/react-start";\nimport { ArrowUpRight, Sparkles, Users, Hammer, Timer } from "lucide-react";\nimport { Section } from "@/components/ui/Section";\nimport { SectionHeader } from "./SectionHeader";\nimport { listFeaturedDemandTracks, type DemandTrack } from "@/lib/demand.functions";\n\nfunction pct(t: DemandTrack) {\n  return Math.min(100, Math.round((t.votes_count / Math.max(1, t.vote_threshold)) * 100));\n}\nfunction daysLeft(t: DemandTrack) {\n  if (!t.launch_eta) return null;\n  const diff = new Date(t.launch_eta).getTime() - Date.now();\n  return Math.max(0, Math.ceil(diff / 86_400_000));\n}\n\nexport function DemandUnlockStrip() {\n  const fetcher = useServerFn(listFeaturedDemandTracks);\n  const { data } = useQuery({\n    queryKey: ["demand", "featured"],\n    queryFn: () => fetcher(),\n    staleTime: 60_000,\n  });\n  const tracks = data?.tracks ?? [];\n  if (tracks.length === 0) return null;\n\n  return (\n    <Section id="demand-unlock" size="lg">\n      <SectionHeader\n        eyebrow="Demand-driven build pipeline"\n        title={\n          <>\n            <span className="italic-accent not-italic">\n              We build tracks where verified demand exists.\n            </span>\n          </>\n        }\n        sub={\n          <>\n            Twenty-five verified requests unlock a new track. From day one, the build is{" "}\n            <strong>public, dated, and operationally accountable</strong> curriculum, mentors,\n            assessments, internships, certificates. You watch it ship.\n          </>\n        }\n      />\n\n      <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:mt-12 md:grid-cols-3">\n        {tracks.map((t) => {\n          const isBuilding = t.status === "building";\n          const left = daysLeft(t);\n          return (\n            <article\n              key={t.id}\n              className="group relative flex flex-col overflow-hidden rounded-2xl card-light transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_-24px_oklch(0.62_0.20_258/0.55)]"\n            >\n              <div className="flex items-center justify-between border-b border-ink/5 p-4 sm:p-5">\n                <span\n                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] ${\n                    isBuilding\n                      ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"\n                      : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"\n                  }`}\n                >\n                  {isBuilding ? <Hammer className="h-3 w-3" /> : <Users className="h-3 w-3" />}\n                  {isBuilding ? "Under build" : "Voting open"}\n                </span>\n                <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/55">\n                  {t.category}\n                </span>\n              </div>\n\n              <div className="flex flex-1 flex-col p-5">\n                <h3 className="font-display text-body font-bold leading-tight text-ink sm:text-body-lg">\n                  {t.title}\n                </h3>\n                {t.pitch && (\n                  <p className="mt-2 text-caption leading-relaxed text-slate-600 line-clamp-3">\n                    {t.pitch}\n                  </p>\n                )}\n\n                {/* Vote progress */}\n                <div className="mt-4">\n                  <div className="flex items-center justify-between text-micro font-medium text-ink/70">\n                    <span>\n                      {t.votes_count} / {t.vote_threshold} verified\n                    </span>\n                    <span>{pct(t)}%</span>\n                  </div>\n                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">\n                    <div\n                      className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.14_220)]"\n                      style={{ width: `${pct(t)}%` }}\n                    />\n                  </div>\n                </div>\n\n                <div className="mt-4 flex items-center justify-between text-micro text-ink/65">\n                  {isBuilding && left !== null ? (\n                    <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]">\n                      <Timer className="h-3 w-3" /> {left} days to launch\n                    </span>\n                  ) : (\n                    <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]">\n                      <Sparkles className="h-3 w-3" /> Founding cohort open\n                    </span>\n                  )}\n                  <Link\n                    to="/build/$slug"\n                    params={{ slug: t.slug }}\n                    className="inline-flex items-center gap-1 text-meta font-semibold text-primary"\n                  >\n                    {isBuilding ? "Watch build" : "Apply"}\n                    <ArrowUpRight className="h-3.5 w-3.5" />\n                  </Link>\n                </div>\n              </div>\n            </article>\n          );\n        })}\n      </div>\n\n      <div className="mt-8 flex flex-col items-center justify-center gap-3">\n        <Link to="/build" className="btn btn-primary btn-md">\n          See the full build pipeline <ArrowUpRight className="h-4 w-4" />\n        </Link>\n        <Link\n          to="/build/request"\n          className="inline-flex items-center gap-1 text-caption font-semibold text-[#7fb0d8] hover:text-primary"\n        >\n          Request a track Arzon doesn&rsquo;t offer yet <ArrowUpRight className="h-3.5 w-3.5" />\n        </Link>\n      </div>\n    </Section>\n  );\n}\n';
const __vite_glob_0_18 = 'import { Link } from "@tanstack/react-router";\nimport { BookOpen, GitBranch, MonitorSmartphone, Users2, ArrowRight } from "lucide-react";\nimport { Section } from "@/components/ui/Section";\nimport { SectionHeader } from "./SectionHeader";\n\nconst PILLARS = [\n  {\n    id: "domain",\n    weight: 40,\n    label: "Domain Knowledge",\n    Icon: BookOpen,\n    desc: "Why the work exists. Terminology. Regulations.",\n    accent: "from-[#3B82F6] to-[#1E40AF]",\n  },\n  {\n    id: "process",\n    weight: 30,\n    label: "Process Training",\n    Icon: GitBranch,\n    desc: "Workflow. Escalation. SOP culture.",\n    accent: "from-[#14B8A6] to-[#0E7490]",\n  },\n  {\n    id: "tools",\n    weight: 20,\n    label: "Tool Exposure",\n    Icon: MonitorSmartphone,\n    desc: "Screens, navigation, real industry workflow.",\n    accent: "from-[#A855F7] to-[#6D28D9]",\n  },\n  {\n    id: "workplace",\n    weight: 10,\n    label: "Workplace Readiness",\n    Icon: Users2,\n    desc: "Email, reporting, meetings, stakeholders.",\n    accent: "from-[#F59E0B] to-[#B45309]",\n  },\n] as const;\n\n/**\n * Compact homepage strip introducing the Arzon 40/30/20/10\n * Deployment-Ready model. Links out to the full /deployment-model page.\n */\nexport function DeploymentReadyStrip() {\n  return (\n    <Section id="deployment-model" size="lg">\n      <SectionHeader\n        eyebrow="The Arzon model"\n        title={<>" Deployment-ready "</>}\n        sub={\n          <>\n            Every track is engineered around one recruiter question !<br />\n            "Can this candidate contribute with minimal training?"\n          </>\n        }\n      />\n\n      {/* 40/30/20/10 bar */}\n      <div className="mx-auto mt-10 max-w-4xl">\n        <div\n          className="flex h-3 w-full overflow-hidden rounded-full border border-black/10"\n          role="img"\n          aria-label="Training mix: 40% Domain, 30% Process, 20% Tools, 10% Workplace"\n        >\n          {PILLARS.map((p) => (\n            <div\n              key={p.id}\n              className={`h-full bg-gradient-to-r ${p.accent}`}\n              style={{ width: `${p.weight}%` }}\n            />\n          ))}\n        </div>\n      </div>\n\n      <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">\n        {PILLARS.map((p) => (\n          <div\n            key={p.id}\n            className="card-light rounded-2xl p-5 transition-all hover:-translate-y-0.5"\n          >\n            <div className="flex items-center gap-3">\n              <span\n                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent} text-slate-50`}\n              >\n                <p.Icon className="h-4 w-4" />\n              </span>\n              <div>\n                <p className="font-display text-h3 font-bold text-ink leading-none">{p.weight}%</p>\n                <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.18em] text-primary">\n                  {p.label}\n                </p>\n              </div>\n            </div>\n            <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.desc}</p>\n          </div>\n        ))}\n      </div>\n\n      <div className="mt-10 flex justify-center">\n        <Link\n          to="/deployment-model"\n          className="inline-flex h-11 items-center rounded-full border border-primary/30 bg-primary/5 px-5 text-sm font-semibold text-primary transition hover:bg-primary/10"\n        >\n          See the full Deployment-Ready model <ArrowRight className="ml-2 h-4 w-4" />\n        </Link>\n      </div>\n    </Section>\n  );\n}\n';
const __vite_glob_0_19 = `import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { X, Check, AlertTriangle, ShieldCheck } from "lucide-react";

/**
 * "Three lies of edtech" teardown. Names the patterns most edtechs lean on
 * (fake placement averages, fake-live content, guaranteed-job promises)
 * and contrasts each with how Arzon operates. Risky but memorable; this
 * positioning earns trust the way no awards bar can.
 */
const LIES: { title: string; lie: string; truth: string; cite: string }[] = [
  {
    title: "Lie #1 · The placement average",
    lie: '"Average package ₹6.4 LPA". Quietly excludes anyone who didn\\'t get placed, and counts the one outlier offer.',
    truth:
      "We publish role-band salaries with sample size and city. Median, not average. Every placement is verifiable by recruiter HR email.",
    cite: "ASCI guideline 12.4 · selective averaging is misleading",
  },
  {
    title: 'Lie #2 · The "live" class',
    lie: "Pre-recorded sessions sold as live cohorts. Mentor never sees you, never grades your file, never gets your name right.",
    truth:
      "Live mentor sessions capped at 15 students per breakout. Every assignment is hand-graded by a working industry mentor.",
    cite: "Class recordings + attendance log shared with every cohort",
  },
  {
    title: "Lie #3 · The job guarantee",
    lie: '"100% placement guarantee" with a 14-clause fine-print that voids it the moment you ask for a refund.', // copy-claims-ok: rhetorical
    truth:
      "We never promise jobs, ASCI rules forbid it. We promise interviews, mentor intros, and a refund if we don't deliver them. In writing.",
    cite: "Printed on your enrolment invoice · enforceable",
  },
];

export function EdtechLies() {
  return (
    <Section size="lg">
      <SectionHeader
        eyebrow="Plain talk"
        title={
          <>
            The <span className="text-[color:var(--teal-deep)]">three lies</span> Indian edtech
            keeps telling you.
          </>
        }
        sub={
          <>
            Anyone promising guaranteed placement is breaking the law (ASCI rules). We give skill,{" "}
            {/* copy-claims-ok */}
            proof and intros, never empty offers.
          </>
        }
      />

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
        {LIES.map((l) => (
          <article
            key={l.title}
            className="relative overflow-hidden rounded-2xl card-elev-3 card-hairline-gradient"
          >
            <div className="p-5 sm:p-6">
              <h3 className="font-display text-h4 leading-snug text-primary!">{l.title}</h3>

              {/* LIE row — red-rust tone */}
              <div className="mt-5 rounded-xl border border-[#c2654a]/25 bg-[#fdf2ee] p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c2654a]/15 ring-1 ring-[#c2654a]/30">
                    <X className="h-3.5 w-3.5 text-[#9b4423]" strokeWidth={3} />
                  </span>
                  <span className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#9b4423]">
                    What they say
                  </span>
                </div>
                <p className="mt-2 text-caption leading-relaxed text-[#5c2018]/85">{l.lie}</p>
              </div>

              {/* TRUTH row — teal/navy tone */}
              <div className="mt-3 rounded-xl border border-[#0d7a5f]/25 bg-[#ecf6f1] p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0d7a5f]/15 ring-1 ring-[#0d7a5f]/30">
                    <Check className="h-3.5 w-3.5 text-[#0d7a5f]" strokeWidth={3} />
                  </span>
                  <span className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#0d7a5f]">
                    What we do
                  </span>
                </div>
                <p className="mt-2 text-caption leading-relaxed text-primary/85">{l.truth}</p>
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-micro text-[#1e3a5f]/60">
                <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" />
                <span>{l.cite}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 rounded-full bg-primary/[0.04] px-4 py-2 text-center text-meta text-[#1e3a5f]/80 ring-1 ring-[#0f1b3d]/10">
        <AlertTriangle className="h-3.5 w-3.5 text-[#9b4423]" />
        Spot any of these patterns elsewhere? Walk away. Your career deserves better.
      </p>
    </Section>
  );
}
`;
const __vite_glob_0_20 = 'import { useEffect, useRef, useState } from "react";\nimport { ExternalLink, PlayCircle, Tv } from "lucide-react";\nimport { LINKS } from "./constants";\nimport { trackEvent } from "@/lib/analytics";\n\n/**\n * ETV Telangana video embed with automatic click-out fallback.\n *\n * YouTube lets the rights holder (here, ETV News) disable third-party\n * embedding. When that happens the iframe loads but shows\n * "Video unavailable. This video contains content from ETV News..."\n *, there is no DOM error event we can hook into because the iframe\n * itself loaded fine; only the cross-origin player content is blocked.\n *\n * Strategy:\n *  1. By default, render a poster + Play button (no iframe yet, keeps\n *     LCP clean and avoids the blocked frame on first paint).\n *  2. On click, mount the iframe and probe the YouTube oEmbed endpoint\n *     (`https://www.youtube.com/oembed?url=...`). If oEmbed returns\n *     non-OK, the video is unavailable for embedding → swap to a\n *     "Watch on YouTube" click-out card pointing at LINKS.mediaETV.watch.\n *  3. If oEmbed succeeds we keep the iframe; if the user reports it\'s\n *     still blocked, the click-out CTA shown alongside the player\n *     remains the reliable escape hatch.\n */\nexport function EtvVideoEmbed({\n  variant = "section",\n  autoStart = false,\n}: {\n  /** "section" = full poster card with Tv chip overlay; "dialog" = bare frame inside a modal. */\n  variant?: "section" | "dialog";\n  /** If true, mount the iframe immediately (used inside the dialog). */\n  autoStart?: boolean;\n}) {\n  const m = LINKS.mediaETV;\n  const [playing, setPlaying] = useState(autoStart);\n  const [blocked, setBlocked] = useState(false);\n  const probedRef = useRef(false);\n  const blockedReportedRef = useRef(false);\n\n  // Fire one event when the fallback poster is shown (either via oEmbed\n  // probe or because autoStart users hit the same blocked state).\n  useEffect(() => {\n    if (!blocked || blockedReportedRef.current) return;\n    blockedReportedRef.current = true;\n    trackEvent("media_embed_blocked", {\n      provider: "youtube",\n      video_id: m.youtubeId,\n      surface: variant,\n      auto_start: autoStart,\n    });\n  }, [blocked, m.youtubeId, variant, autoStart]);\n\n  // Probe oEmbed once, when we first decide to play.\n  useEffect(() => {\n    if (!playing || probedRef.current) return;\n    probedRef.current = true;\n    const watchUrl = `https://www.youtube.com/watch?v=${m.youtubeId}`;\n    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;\n    fetch(oembed, { mode: "cors" })\n      .then((res) => {\n        // 401 / 403 / 404 from oEmbed = not embeddable.\n        if (!res.ok) setBlocked(true);\n      })\n      .catch(() => {\n        // Network blocked / CORS: don\'t assume blocked, leave iframe in place.\n      });\n  }, [playing, m.youtubeId]);\n\n  const fallbackPoster = (\n    <a\n      href={m.watch}\n      target="_blank"\n      rel="noopener noreferrer"\n      onClick={() =>\n        trackEvent("media_youtube_clickout", {\n          provider: "youtube",\n          video_id: m.youtubeId,\n          surface: variant,\n          reason: "embed_blocked",\n        })\n      }\n      className="group absolute inset-0 flex items-center justify-center text-slate-50"\n      aria-label={`Watch on YouTube: ${m.outlet} feature on Srikanth Sinha`}\n    >\n      <img\n        src={m.poster}\n        alt={`${m.outlet} feature on Srikanth Sinha, ${m.title}`}\n        loading="lazy"\n        decoding="async"\n        onError={(e) => {\n          const img = e.currentTarget;\n          if (!img.dataset.fallback) {\n            img.dataset.fallback = "1";\n            img.src = `https://i.ytimg.com/vi/${m.youtubeId}/mqdefault.jpg`;\n          }\n        }}\n        className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-95"\n      />\n      <span className="relative inline-flex items-center gap-2 rounded-full bg-gold/95 px-5 py-2.5 text-sm font-semibold text-gold-ink shadow-xl">\n        <ExternalLink className="h-4 w-4" /> Watch on YouTube\n      </span>\n      {variant === "section" ? (\n        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-slate-50 backdrop-blur">\n          <Tv className="h-3 w-3 text-gold" /> {m.outlet}\n        </span>\n      ) : null}\n      <span className="absolute bottom-3 left-3 right-3 text-center font-mono text-micro uppercase tracking-[0.18em] text-slate-100/75">\n        Plays on YouTube, embed disabled by the broadcaster\n      </span>\n    </a>\n  );\n\n  if (blocked) {\n    return (\n      <div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">{fallbackPoster}</div>\n    );\n  }\n\n  if (!playing) {\n    return (\n      <div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">\n        <button\n          type="button"\n          onClick={() => {\n            setPlaying(true);\n            trackEvent("media_play_click", {\n              provider: "youtube",\n              video_id: m.youtubeId,\n              surface: variant,\n            });\n          }}\n          className="group absolute inset-0 flex items-center justify-center text-slate-50"\n          aria-label={`Play: ${m.outlet} feature on Srikanth Sinha`}\n        >\n          <img\n            src={m.poster}\n            alt={`${m.outlet} feature on Srikanth Sinha, ${m.title}`}\n            loading="lazy"\n            decoding="async"\n            onError={(e) => {\n              const img = e.currentTarget;\n              if (!img.dataset.fallback) {\n                img.dataset.fallback = "1";\n                img.src = `https://i.ytimg.com/vi/${m.youtubeId}/mqdefault.jpg`;\n              }\n            }}\n            className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-95"\n          />\n          <span className="relative inline-flex items-center gap-2 rounded-full bg-gold/95 px-5 py-2.5 text-sm font-semibold text-gold-ink shadow-xl">\n            <PlayCircle className="h-4 w-4" /> Play feature\n          </span>\n          {variant === "section" ? (\n            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-slate-50 backdrop-blur">\n              <Tv className="h-3 w-3 text-gold" /> {m.outlet}\n            </span>\n          ) : null}\n        </button>\n      </div>\n    );\n  }\n\n  return (\n    <div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">\n      <iframe\n        src={`${m.embed}&autoplay=1&rel=0&modestbranding=1`}\n        title={`${m.outlet}, ${m.title}`}\n        loading="lazy"\n        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n        allowFullScreen\n        className="h-full w-full"\n      />\n    </div>\n  );\n}\n';
const __vite_glob_0_21 = `import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, GraduationCap, ClipboardCheck, X } from "lucide-react";

const STORAGE_KEY = "az_exit_quiz_seen_v1";
const SCROLL_TRIGGER_PCT = 65;

/**
 * Exit-intent + scroll-depth re-engagement modal. Triggers on either:
 *   - desktop cursor leaving the viewport at the top (classic exit-intent), OR
 *   - any device once the user passes ~65% scroll depth.
 * Offers a free 90-second "Is pharma right for me?" fit-check that funnels
 * to /career-engine/start. Suppresses itself after one dismissal per device
 * via localStorage.
 */
export function ExitIntentQuiz() {
  const [open, setOpen] = useState(false);
  const [primed, setPrimed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // ignore storage errors
    }
    // Don't arm before 8s — avoid hitting visitors who immediately bounce
    const armTimer = window.setTimeout(() => setPrimed(true), 8000);
    return () => window.clearTimeout(armTimer);
  }, []);

  useEffect(() => {
    if (!primed) return;

    const trigger = () => {
      setOpen(true);
      cleanup();
    };

    const onMouseOut = (e: MouseEvent) => {
      // Only when the pointer exits via the top of the viewport
      if (e.relatedTarget === null && e.clientY <= 0) trigger();
    };

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (max <= 0) return;
      const pct = (h.scrollTop / max) * 100;
      if (pct >= SCROLL_TRIGGER_PCT) trigger();
    };

    const cleanup = () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, [primed]);

  const persistDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore storage errors
    }
  };

  const onOpenChange = (v: boolean) => {
    if (!v) persistDismiss();
    setOpen(v);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-0 bg-transparent p-0 shadow-none sm:max-w-[480px]">
        <DialogTitle className="sr-only">Free 90-second fit check</DialogTitle>

        <div className="relative overflow-hidden rounded-[20px] card-dark ring-1 ring-[#c9a84c]/30">
          {/* gold gradient strip */}
          <div
            aria-hidden
            className="h-1 w-full"
            style={{ background: "linear-gradient(90deg,#c9a84c 0%,#f0d78c 50%,#c9a84c 100%)" }}
          />

          {/* gold halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle,rgba(201,168,76,0.45),transparent 70%)" }}
          />

          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-50/10 text-slate-100/80 ring-1 ring-white/15 transition-colors hover:bg-slate-50/15 hover:text-slate-50"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative p-6 sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a84c]/40">
              <Sparkles className="h-3 w-3" />
              90-second fit check · free
            </span>

            <h2 className="font-display mt-4 text-h2 text-slate-50">
              Wait before you go, is healthcare even{" "}
              <span className="text-[#f0d78c]">your fit?</span>
            </h2>

            <p className="mt-3 text-body-sm leading-relaxed text-slate-100/75">
              Most people don't know if pharmacovigilance or medical coding suits them. Answer 6
              quick questions, get a personal track recommendation and a salary band for your city.
              No email required.
            </p>

            <ul className="mt-5 space-y-2 text-caption text-slate-100/85">
              <li className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 shrink-0 text-[#f0d78c]" />
                Scored on Operational reasoning + Domain awareness
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 shrink-0 text-[#f0d78c]" />
                Built for graduates · 1st year through working pros
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-2.5">
              <Button asChild variant="premium" size="lg" className="w-full">
                <Link
                  to="/career-engine/start"
                  onClick={() => {
                    persistDismiss();
                    setOpen(false);
                  }}
                >
                  Take the 90-second test
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-center text-meta text-slate-100/55 underline underline-offset-4 transition-colors hover:text-slate-100/80"
              >
                No thanks, I'll decide later
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
`;
const __vite_glob_0_22 = `import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { Plus } from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";

import type { ReactNode } from "react";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Is this a real internship or just another online course?",
    a: (
      <>
        Both.{" "}
        <strong className="font-semibold text-slate-100">First 8 weeks are live classes</strong>{" "}
        with homework.{" "}
        <strong className="font-semibold text-slate-100">
          Last 4 weeks you work on real hospital or CRO files.
        </strong>{" "}
        You get a proper internship certificate at the end.
      </>
    ),
  },
  {
    q: "Will the certificate actually help me get a job?",
    a: (
      <>
        Yes. Each certificate has a{" "}
        <strong className="font-semibold text-slate-100">
          unique ID and a public link recruiters can verify online.
        </strong>{" "}
        It is issued by Arzon Global (ISO 9001 certified, MSME &amp; MCA registered) and is{" "}
        <strong className="font-semibold text-slate-100">performance-based</strong>, not a
        participation certificate.
      </>
    ),
  },
  {
    q: "I'm in 1st or 2nd year. Can I still join?",
    a: (
      <>
        Yes, <strong className="font-semibold text-slate-100">best time to start.</strong> Classes
        run in the evening, all sessions are recorded so you don't miss anything during exams.
      </>
    ),
  },
  {
    q: "Do you guarantee a job?",
    a: (
      <>
        <strong className="font-semibold text-slate-100">No</strong>, and don't trust anyone who
        does (it's against ASCI rules). What we promise:{" "}
        <strong className="font-semibold text-slate-100">
          real interview practice, a fixed CV, and intros to our hiring partners.
        </strong>
      </>
    ),
  },
  {
    q: "How is this different from YouTube or Udemy?",
    a: (
      <>
        <strong className="font-semibold text-slate-100">
          Live mentors who actually work in the industry.
        </strong>{" "}
        Real medical files to practice on. ISO-certified, performance-based certificate. A
        counsellor you can call.
      </>
    ),
  },
  {
    q: "How do I pay the fee?",
    a: (
      <>
        <strong className="font-semibold text-slate-100">One-time.</strong> Take the 3-min fit test
        first, the seat-confirmation step (fully adjusted in your fee) is shown after your result.{" "}
        <strong className="font-semibold text-slate-100">We do not offer EMI</strong>: education
        fees can't legally be financed that way and we're not going to pretend otherwise.
      </>
    ),
  },
  {
    q: "What if I don't get an interview after the programme?",
    a: (
      <>
        If you complete the programme with{" "}
        <strong className="font-semibold text-slate-100">grade B+</strong> and don't get an
        interview in 90 days, we extend{" "}
        <strong className="font-semibold text-slate-100">
          free placement support for 6 more months.
        </strong>
      </>
    ),
  },
  {
    q: "How big are the batches?",
    a: (
      <>
        <strong className="font-semibold text-slate-100">Maximum 60 students per batch.</strong>{" "}
        Mentor sees you in groups of{" "}
        <strong className="font-semibold text-slate-100">under 15</strong>, so you actually get
        attention.
      </>
    ),
  },
];

export function FAQ({ limit }: { limit?: number } = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const shown = typeof limit === "number" ? faqs.slice(0, limit) : faqs;
  return (
    <Section id="faq" size="lg" containerSize="md" className="tone-dark bg-[#0a0c10]">
      <SectionHeader
        tone="dark"
        eyebrow="Students keep asking us…"
        title={<>Quick answers before you apply.</>}
      />
      <div className="mt-8 divide-y divide-white/5 overflow-hidden rounded-2xl border border-slate-200/10 bg-surface-dim shadow-sm md:mt-12">
        {shown.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={isOpen ? "bg-white/[0.04]" : "bg-transparent"}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-[60px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/35 sm:gap-6 sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="font-grotesk text-body-sm font-semibold leading-snug text-slate-50 sm:text-base">
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className={\`faq-chevron-ease mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 \${
                    isOpen
                      ? "bg-brand-gold text-slate-950 ring-brand-gold rotate-45"
                      : "bg-white/[0.04] text-slate-300 ring-white/10 group-hover:bg-white/[0.08] group-hover:text-brand-gold group-hover:ring-brand-gold/30"
                  }\`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-6 text-sm leading-relaxed text-slate-300 motion-safe:animate-fade-in sm:px-6 sm:pr-16">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-slate-400">
        Got another question?{" "}
        <WhatsAppLink
          source="faq_footer"
          message="Hi Arzon, I have a question about the programme."
          className="font-semibold text-brand-gold hover:underline"
        >
          Message us on WhatsApp →
        </WhatsAppLink>
      </p>
    </Section>
  );
}
`;
const __vite_glob_0_23 = 'import { Link } from "@tanstack/react-router";\nimport { ArrowRight, MessageCircle } from "lucide-react";\nimport { motion } from "framer-motion";\nimport { NEXT_COHORT } from "./constants";\nimport { WhatsAppLink } from "@/components/common/WhatsAppLink";\nimport { trackEvent } from "@/lib/analytics";\n\nexport function FinalCTA() {\n  return (\n    <section className="editorial-page-bg py-16 px-4 sm:px-6 lg:px-8">\n      <motion.div\n        initial={{ opacity: 0, y: 30, scale: 0.98 }}\n        whileInView={{ opacity: 1, y: 0, scale: 1 }}\n        viewport={{ once: true, margin: "-50px" }}\n        transition={{ duration: 0.5, ease: "easeOut" }}\n        className="editorial-card max-w-3xl mx-auto p-8 sm:p-12 text-center space-y-6 shadow-xl"\n      >\n        <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">\n          Ready to Start Your Journey?\n        </p>\n\n        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">\n          Start with the <span className="italic text-[#8A6D1F]">3-minute fit test</span>\n        </h2>\n\n        <p className="text-sm text-[#5B6472] max-w-xl mx-auto leading-relaxed">\n          The {NEXT_COHORT.label} batch starts {NEXT_COHORT.startsLabel}. 30 structured questions\n          tell you which programme matches your career background best.\n        </p>\n\n        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">\n          <motion.div\n            whileHover={{ scale: 1.03 }}\n            whileTap={{ scale: 0.97 }}\n            className="w-full sm:w-auto"\n          >\n            <Link\n              to="/career-engine/start"\n              className="editorial-btn-blue text-sm h-12 px-8 flex items-center justify-center gap-2 text-white font-bold w-full sm:w-auto"\n              onClick={() =>\n                trackEvent("final_cta_click", {\n                  surface: "final-cta",\n                  target: "career-engine-start",\n                  label: "Get my industry-fit score",\n                })\n              }\n            >\n              <span>Get my industry-fit score</span>\n              <ArrowRight className="h-4 w-4" />\n            </Link>\n          </motion.div>\n\n          <motion.div\n            whileHover={{ scale: 1.03 }}\n            whileTap={{ scale: 0.97 }}\n            className="w-full sm:w-auto"\n          >\n            <WhatsAppLink\n              source="final_cta_counsellor"\n              message="Hi Arzon, I want to talk to a counsellor before applying."\n              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-semibold text-[#151C2E] transition-colors w-full sm:w-auto"\n              onClick={() =>\n                trackEvent("final_cta_whatsapp_click", {\n                  surface: "final-cta",\n                  target: "whatsapp",\n                })\n              }\n            >\n              <MessageCircle className="h-4 w-4 text-[#1D4ED8]" />\n              <span>Speak with Admissions</span>\n            </WhatsAppLink>\n          </motion.div>\n        </div>\n      </motion.div>\n    </section>\n  );\n}\n';
const __vite_glob_0_24 = 'import { Link } from "@tanstack/react-router";\nimport arzonIcon from "@/assets/arzon-icon.webp";\nimport {\n  Mail,\n  MapPin,\n  ShieldCheck,\n  BadgeCheck,\n  Building2,\n  ArrowRight,\n  MessageCircle,\n  Instagram,\n  Youtube,\n  Linkedin,\n  Globe,\n  Heart,\n} from "lucide-react";\nimport { LINKS, ADDRESS } from "./constants";\nimport { MotionToggle } from "./MotionToggle";\nimport { COURSES } from "@/data/courses";\nimport { SISTER_BRANDS } from "@/lib/credibility";\nimport { CounsellorLeadForm } from "./CounsellorLeadForm";\nimport { trackEvent } from "@/lib/analytics";\nimport { TaskLogo } from "@/components/common/TaskLogo";\n\nconst ALL_PROGRAMME_LINKS = COURSES.map((c) => ({ slug: c.slug, title: c.title }));\n\nconst ACCENT = "#38BDF8";\nconst GOLD = ACCENT;\n\nconst focusRing =\n  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded-sm";\n\nexport function Footer() {\n  return (\n    <footer\n      role="contentinfo"\n      aria-labelledby="footer-heading"\n      className="tone-dark relative bg-[#0B0F19] text-white px-3 pb-3 pt-0 sm:px-5 sm:pb-5"\n    >\n      <h2 id="footer-heading" className="sr-only">\n        Site footer\n      </h2>\n\n      {/* Top Next-step strip */}\n      <div className="relative mx-auto mb-0 max-w-7xl overflow-hidden border border-white/10 bg-[#121723] px-6 py-6 sm:px-8 rounded-t-2xl shadow-2xl">\n        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">\n          <div>\n            <p className="font-bold text-lg sm:text-xl text-white">\n              Not sure which programme fits?\n            </p>\n            <p className="mt-1 text-sm text-slate-300">\n              Browse cohorts or talk to a counsellor, no payment required.\n            </p>\n          </div>\n          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3">\n            <Link\n              to="/courses"\n              aria-label="Browse all programmes"\n              onClick={() =>\n                trackEvent("footer_cta_click", {\n                  surface: "footer",\n                  target: "courses",\n                  label: "Browse programmes",\n                })\n              }\n              className={`inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg transition-colors ${focusRing}`}\n            >\n              Browse programmes{" "}\n              <ArrowRight\n                aria-hidden="true"\n                focusable="false"\n                className="ml-1.5 h-4 w-4 text-white"\n              />\n            </Link>\n            <Link\n              to="/contact"\n              aria-label="Talk to a counsellor"\n              onClick={() =>\n                trackEvent("footer_cta_click", {\n                  surface: "footer",\n                  target: "contact",\n                  label: "Talk to counsellor",\n                })\n              }\n              className={`inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 hover:bg-white/20 px-5 text-sm font-bold text-white transition-colors ${focusRing}`}\n            >\n              <MessageCircle\n                aria-hidden="true"\n                focusable="false"\n                className="mr-2 h-4 w-4 text-blue-400"\n              />{" "}\n              Talk to counsellor\n            </Link>\n          </div>\n        </div>\n      </div>\n\n      {/* Main grid */}\n      <div className="mx-auto grid max-w-7xl grid-cols-1 border border-white/10 bg-[#0B0F19] text-white md:grid-cols-12 rounded-b-2xl shadow-2xl">\n        {/* Brand section */}\n        <div className="border-b border-white/10 p-8 md:col-span-4 md:border-b-0 md:border-r">\n          <div className="flex items-center gap-3">\n            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 border border-white/10">\n              <img\n                src={arzonIcon}\n                alt=""\n                width={48}\n                height={48}\n                loading="lazy"\n                decoding="async"\n                className="h-full w-full object-contain"\n              />\n            </div>\n            <div className="leading-none">\n              <p className="font-mono text-sm font-bold tracking-widest text-white">ARZON</p>\n              <p className="mt-1 font-mono text-xs font-bold tracking-widest text-sky-400">\n                CAREERS\n              </p>\n            </div>\n          </div>\n\n          <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-300">\n            India\'s workforce-readiness platform across engineering, healthcare, agriculture,\n            business and tech. ISO 9001 certified, MSME and MCA registered.\n          </p>\n\n          <div className="mt-6 flex flex-wrap gap-2">\n            <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white">\n              <TaskLogo size="sm" /> TASK-recognised\n            </span>\n            {[\n              {\n                icon: BadgeCheck,\n                label: "ISO 9001",\n                to: "/proof",\n                hash: "iso",\n                dot: "bg-emerald-400",\n              },\n              { icon: Building2, label: "MSME", to: "/proof", hash: "msme", dot: "bg-emerald-400" },\n              { icon: ShieldCheck, label: "MCA", to: "/proof", hash: "mca", dot: "bg-emerald-400" },\n              {\n                icon: ShieldCheck,\n                label: "Razorpay · PCI-DSS",\n                to: "/proof",\n                hash: "razorpay",\n                dot: "bg-blue-400",\n              },\n              {\n                icon: Heart,\n                label: "Made in Hyderabad with love",\n                to: "/",\n                hash: "",\n                dot: "bg-rose-500",\n              },\n            ].map(({ icon: Icon, label, to, hash, dot }) => (\n              <Link\n                key={label}\n                to={to}\n                hash={hash}\n                aria-label={`Verify ${label} registration`}\n                className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10 ${focusRing}`}\n              >\n                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot}`} />\n                <Icon\n                  aria-hidden="true"\n                  focusable="false"\n                  className="h-3.5 w-3.5 text-sky-400"\n                />{" "}\n                {label}\n              </Link>\n            ))}\n          </div>\n\n          <div className="mt-8">\n            <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">\n              Find us\n            </p>\n            <div className="mt-3 flex flex-wrap gap-2">\n              {[\n                {\n                  icon: Globe,\n                  label: "arzoncareers.in",\n                  href: LINKS.website,\n                  title: "Visit arzoncareers.in",\n                },\n                {\n                  icon: Instagram,\n                  label: "@arzon.global",\n                  href: LINKS.instagram,\n                  title: "Arzon Global on Instagram",\n                },\n                {\n                  icon: Youtube,\n                  label: "ETV feature",\n                  href: LINKS.mediaETV.watch,\n                  title: "Watch ETV Telangana feature on YouTube",\n                },\n                {\n                  icon: Linkedin,\n                  label: "LinkedIn",\n                  href: LINKS.linkedin,\n                  title: "Arzon Global on LinkedIn",\n                },\n              ].map(({ icon: Icon, label, href, title }) => (\n                <a\n                  key={label}\n                  href={href}\n                  target="_blank"\n                  rel="noopener noreferrer"\n                  aria-label={`${title} (opens in new tab)`}\n                  className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10 ${focusRing}`}\n                >\n                  <Icon aria-hidden="true" focusable="false" className="h-3.5 w-3.5 text-sky-400" />{" "}\n                  {label}\n                </a>\n              ))}\n            </div>\n          </div>\n        </div>\n\n        {/* Navigation block */}\n        <div className="flex flex-col md:col-span-8">\n          <div className="grid grid-cols-1 sm:grid-cols-3">\n            {/* Programmes */}\n            <nav\n              aria-labelledby="footer-programmes-heading"\n              className="border-b border-white/10 p-8 sm:border-b-0 sm:border-r"\n            >\n              <h2\n                id="footer-programmes-heading"\n                className="font-mono text-xs font-bold uppercase tracking-wider text-white"\n              >\n                Programmes\n              </h2>\n              <ul role="list" className="mt-6 space-y-3.5">\n                <li>\n                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">\n                    Flagship\n                  </span>\n                  <Link\n                    to="/courses/$slug"\n                    params={{ slug: "pharmacovigilance" }}\n                    className={`mt-0.5 inline-block text-sm font-bold text-white hover:text-sky-300 transition-colors ${focusRing}`}\n                    style={{ color: "#FFFFFF" }}\n                  >\n                    Pharmacovigilance\n                  </Link>\n                </li>\n                <li>\n                  <FootLink to="/courses/medical-coding">Medical Coding</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/courses/clinical-data-management">\n                    Clinical Data Management\n                  </FootLink>\n                </li>\n                <li>\n                  <FootLink to="/courses/regulatory-affairs">Regulatory Affairs</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/courses/ai-intelligence">AI in Healthcare</FootLink>\n                </li>\n                <li>\n                  <Link\n                    to="/courses"\n                    aria-label="View all 25 programmes"\n                    className={`inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 underline decoration-1 underline-offset-4 ${focusRing}`}\n                  >\n                    View all 25 programmes{" "}\n                    <ArrowRight\n                      aria-hidden="true"\n                      focusable="false"\n                      className="h-3 w-3 text-sky-400"\n                    />\n                  </Link>\n                </li>\n              </ul>\n            </nav>\n\n            {/* Company */}\n            <nav\n              aria-labelledby="footer-company-heading"\n              className="border-b border-white/10 p-8 sm:border-b-0 sm:border-r"\n            >\n              <h2\n                id="footer-company-heading"\n                className="font-mono text-xs font-bold uppercase tracking-wider text-white"\n              >\n                Company\n              </h2>\n              <ul role="list" className="mt-6 space-y-3.5">\n                <li>\n                  <FootLink to="/about">About Arzon</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/deployment-model">Deployment model</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/proof">Proof of impact</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/moments">Arzon moments</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/credibility">Why trust us</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/trust-report">Trust ledger</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/industry">Industry intel</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/cohorts">Upcoming cohorts</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/verify">Verify certificate</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/contact">Contact</FootLink>\n                </li>\n                <li className="pt-2">\n                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">\n                    For Partners\n                  </span>\n                </li>\n                <li>\n                  <FootLink to="/recruiters">For recruiters</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/tpos">For TPOs / colleges</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/acri">ACRI methodology</FootLink>\n                </li>\n              </ul>\n            </nav>\n\n            {/* Get started + contact */}\n            <nav aria-labelledby="footer-getstarted-heading" className="bg-white/5 p-8">\n              <h2\n                id="footer-lead-heading"\n                className="font-mono text-xs font-bold uppercase tracking-wider text-white"\n              >\n                Talk to a counsellor\n              </h2>\n              <p className="mt-1 text-xs text-slate-300">\n                Leave your details, we\'ll call you back within 24 hours.\n              </p>\n              <div className="mt-4">\n                <CounsellorLeadForm />\n              </div>\n\n              <h2\n                id="footer-getstarted-heading"\n                className="mt-8 font-mono text-xs font-bold uppercase tracking-wider text-white"\n              >\n                Get started\n              </h2>\n              <ul role="list" className="mt-4 space-y-3">\n                <li>\n                  <FootLink to="/apply" data-apply-surface="footer">\n                    Start application\n                  </FootLink>\n                </li>\n                <li>\n                  <FootLink to="/dashboard">Dashboard</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/refund">Cancellation policy</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/legal/terms">Terms</FootLink>\n                </li>\n                <li>\n                  <FootLink to="/legal/privacy">Privacy</FootLink>\n                </li>\n              </ul>\n\n              <div className="mt-8 space-y-3 border-t border-white/10 pt-5">\n                <div className="flex items-start gap-3">\n                  <Mail\n                    aria-hidden="true"\n                    focusable="false"\n                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"\n                  />\n                  <a\n                    href="mailto:info@arzonglobal.com"\n                    aria-label="Email info@arzonglobal.com"\n                    className={`text-xs font-bold text-white break-all hover:text-sky-300 ${focusRing}`}\n                    style={{ color: "#FFFFFF" }}\n                  >\n                    info@arzonglobal.com\n                  </a>\n                </div>\n                <a\n                  href={ADDRESS.mapsUrl}\n                  target="_blank"\n                  rel="noopener noreferrer"\n                  aria-label="Open office address in Google Maps (opens in new tab)"\n                  className={`flex items-start gap-3 text-xs leading-relaxed text-slate-300 hover:text-white ${focusRing}`}\n                >\n                  <MapPin\n                    aria-hidden="true"\n                    focusable="false"\n                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"\n                  />\n                  <span>\n                    {ADDRESS.company}\n                    <br />\n                    {ADDRESS.street}, {ADDRESS.area},<br />\n                    {ADDRESS.locality}, {ADDRESS.city},<br />\n                    {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}\n                  </span>\n                </a>\n              </div>\n            </nav>\n          </div>\n\n          {/* Tucked SEO crawl strip */}\n          <nav aria-label="All programmes" className="border-t border-white/10 bg-[#0B0F19] p-6">\n            <ul\n              role="list"\n              className="flex flex-wrap gap-x-2 gap-y-1 text-xs uppercase leading-snug tracking-wider text-slate-400 font-mono font-semibold"\n            >\n              {ALL_PROGRAMME_LINKS.map((l, i) => (\n                <li key={l.slug} className="inline">\n                  <a href={`/courses/${l.slug}`} className={`hover:text-white ${focusRing}`}>\n                    {l.title}\n                  </a>\n                  {i < ALL_PROGRAMME_LINKS.length - 1 ? <span aria-hidden="true"> • </span> : null}\n                </li>\n              ))}\n            </ul>\n          </nav>\n        </div>\n      </div>\n\n      {/* Sister-brand row + bottom legal */}\n      <div className="mx-auto max-w-7xl border border-t-0 border-white/10 bg-[#0B0F19] p-8 rounded-b-2xl">\n        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">\n          <div className="space-y-3">\n            <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">\n              Part of the Arzon group\n            </p>\n            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">\n              {SISTER_BRANDS.map((b) => (\n                <a\n                  key={b.host}\n                  href={b.url}\n                  target="_blank"\n                  rel="noopener noreferrer"\n                  aria-label={`${b.name}, ${b.desc} (opens in new tab)`}\n                  className={`group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 ${focusRing}`}\n                >\n                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white font-mono text-xs font-bold tracking-wider text-slate-900">\n                    {b.code}\n                  </span>\n                  <div className="min-w-0">\n                    <p className="font-mono text-xs font-bold text-white">\n                      {b.name}{" "}\n                      <span aria-hidden="true" className="text-sky-400">\n                        ↗\n                      </span>\n                    </p>\n                    <p className="mt-0.5 text-xs text-slate-300 leading-snug">{b.desc}</p>\n                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-sky-400 font-bold">\n                      {b.host}\n                    </p>\n                  </div>\n                </a>\n              ))}\n              <div className="flex items-start gap-3 rounded-xl border border-sky-400/30 bg-sky-500/10 p-3">\n                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 font-mono text-xs font-bold tracking-wider text-sky-300 border border-sky-400/30">\n                  AC\n                </span>\n                <div className="min-w-0">\n                  <p className="font-mono text-xs font-bold text-white">Arzon Careers</p>\n                  <p className="mt-0.5 text-xs text-slate-300 leading-snug">\n                    Workforce-readiness arm, you are here.\n                  </p>\n                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-sky-400 font-bold">\n                    arzoncareers.in\n                  </p>\n                  <Link\n                    to="/credibility"\n                    aria-label="Why choose Arzon Careers"\n                    className={`mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 ${focusRing}`}\n                  >\n                    Why us{" "}\n                    <ArrowRight\n                      aria-hidden="true"\n                      focusable="false"\n                      className="h-3 w-3 text-sky-400"\n                    />\n                  </Link>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        {/* Disclaimer */}\n        <div\n          data-fab-avoid\n          className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-300"\n        >\n          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">\n            Disclaimer · ASCI compliant\n          </p>\n          <p className="mt-1.5">\n            Outcomes vary. Arzon Global does not guarantee employment. The first cohort completes in\n            November 2026; verified placement figures will be published from December 2026 onwards.\n            Until then, see{" "}\n            <Link to="/proof" className={`underline text-sky-400 ${focusRing}`}>\n              /proof\n            </Link>{" "}\n            for the live evidence vault and{" "}\n            <Link to="/refund" className={`underline text-sky-400 ${focusRing}`}>\n              cancellation policy\n            </Link>\n            .\n          </p>\n        </div>\n\n        {/* Bottom meta */}\n        <div className="mt-6 flex flex-col items-start gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between font-mono">\n          <p className="uppercase tracking-wider">\n            © {new Date().getFullYear()} Arzon Global Pvt Ltd · All rights reserved\n          </p>\n          <div className="flex items-center gap-4">\n            <Link\n              to="/admin/login"\n              aria-label="Admin sign in"\n              className={`font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white ${focusRing}`}\n            >\n              Admin\n            </Link>\n            <MotionToggle />\n          </div>\n        </div>\n      </div>\n    </footer>\n  );\n}\n\nfunction FootLink({\n  to,\n  children,\n  ...rest\n}: { to: string; children: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) {\n  return (\n    <Link\n      to={to as never}\n      className={`text-sm font-semibold text-white hover:text-sky-300 transition-colors ${focusRing}`}\n      style={{ color: "#FFFFFF" }}\n      {...rest}\n    >\n      {children}\n    </Link>\n  );\n}\n';
const __vite_glob_0_25 = 'import { Link } from "@tanstack/react-router";\nimport { Landmark, ShieldCheck, Building2, FileBadge2, ArrowRight, BadgeCheck } from "lucide-react";\nimport { PROOF } from "./constants";\n\n/**\n * Trust spine, anchored above-the-fold beneath the nav.\n * Replaces the legacy TrustBar with verifiable, clickable proof.\n */\nexport function GovtTrustBlock() {\n  const showNums = PROOF.showCredentialNumbers;\n  const chips = [\n    {\n      icon: ShieldCheck,\n      label: "ISO 9001",\n      value: showNums ? PROOF.iso.number : "Certified",\n      hash: "iso",\n    },\n    { icon: FileBadge2, label: "MCA", value: showNums ? PROOF.mca.cin : "Registered", hash: "mca" },\n    {\n      icon: Building2,\n      label: "MSME",\n      value: showNums ? PROOF.msme.udyam : "Verified",\n      hash: "msme",\n    },\n  ];\n\n  return (\n    <>\n      <div className="tone-dark w-full border-y border-slate-200/10 bg-[#0B1325]">\n        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">\n          {/* Row 1 — TASK badge + copy + watch button */}\n          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 sm:items-center">\n            <span\n              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 ring-gold/30"\n              style={{ background: "rgba(245,196,81,0.10)" }}\n            >\n              <Landmark className="h-5 w-5 text-gold" />\n            </span>\n            <div className="min-w-0 leading-tight">\n              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[#7FB0D8]">\n                TASK · Govt of Telangana · {PROOF.inaugurationDate}\n              </p>\n              <p className="mt-1 text-caption font-semibold text-slate-50">\n                TASK officials joined as chief guests at our public launch.\n              </p>\n            </div>\n          </div>\n\n          {/* Row 2 — credential chips */}\n          <div className="mt-3 flex flex-col gap-2.5 sm:mt-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">\n            <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2">\n              {chips.map(({ icon: Icon, label, value, hash }) => (\n                <li key={label}>\n                  <Link\n                    to="/proof"\n                    hash={hash}\n                    className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200/15 bg-white/[0.06] px-2.5 py-1 text-micro font-medium text-slate-100 transition hover:border-slate-200/30 hover:bg-white/[0.1]"\n                    title={value}\n                  >\n                    <Icon className="h-3.5 w-3.5 text-[#7FB0D8]" />\n                    <span className="font-semibold">{label}</span>\n                    <BadgeCheck className="hidden h-3 w-3 text-sky-400 sm:inline" />\n                  </Link>\n                </li>\n              ))}\n            </ul>\n          </div>\n\n          {/* Row 3 — Apply CTA, its own block so it never collides with the strip */}\n          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200/10 pt-3">\n            <p className="hidden text-meta text-slate-300 sm:block">\n              Cohort filling — apply to lock the early-bird seat fee.\n            </p>\n            <Link\n              to="/apply"\n              className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-gold px-4 text-caption font-semibold text-gold-ink shadow-sm transition hover:bg-gold/90 active:scale-[0.98] sm:w-auto"\n            >\n              Apply now <ArrowRight className="h-3.5 w-3.5" />\n            </Link>\n          </div>\n        </div>\n      </div>\n    </>\n  );\n}\n';
const __vite_glob_0_26 = 'import { Link, useRouter } from "@tanstack/react-router";\nimport { useRef, useState } from "react";\nimport { ArrowRight, Landmark, ShieldCheck, BadgeCheck, Loader2, Globe } from "lucide-react";\nimport { motion, Variants } from "framer-motion";\nimport { trackEvent } from "@/lib/analytics";\nimport { markReadinessStarted, getReadinessSessionId } from "@/lib/readinessJourney";\nimport taskImg from "@/assets/proof/task-partnership.jpg";\n\nimport { DailyAiProofBadge } from "@/components/proof/DailyAiProofBadge";\n\nexport function Hero() {\n  const [ctaPending, setCtaPending] = useState(false);\n  const [lang, setLang] = useState<"en" | "hi" | "te">("en");\n  const ctaLockRef = useRef<number>(0);\n  const router = useRouter();\n\n  const onPrimaryCta = (e: React.MouseEvent<HTMLAnchorElement>) => {\n    const now = Date.now();\n    if (ctaPending || now - ctaLockRef.current < 1500) {\n      e.preventDefault();\n      return;\n    }\n    ctaLockRef.current = now;\n    setCtaPending(true);\n    void markReadinessStarted();\n    trackEvent("hero_primary_cta_click", {\n      surface: "home-hero",\n      target: "career-engine-test",\n    });\n    trackEvent("readiness_cta_click", {\n      surface: "home-hero",\n      session_id: getReadinessSessionId(),\n    });\n    const unsub = router.subscribe("onResolved", () => {\n      setCtaPending(false);\n      unsub();\n    });\n    window.setTimeout(() => setCtaPending(false), 4000);\n  };\n\n  const trustChips: { icon: typeof Landmark; label: string }[] = [\n    { icon: Landmark, label: "TASK · Govt of Telangana" },\n    { icon: ShieldCheck, label: "ISO 9001:2015" },\n    { icon: BadgeCheck, label: "MCA Registered" },\n  ];\n\n  const translations = {\n    en: {\n      h1_1: "Become",\n      h1_2: "industry ready",\n      h1_3: "for India\'s next decade.",\n      p: "Land your first domain role in 12 weeks. Take the free 3-minute assessment to see which programme fits your background.",\n      cta: "Get my industry-fit score",\n    },\n    hi: {\n      h1_1: "भारत के अगले दशक के लिए",\n      h1_2: "इंडस्ट्री-रेडी",\n      h1_3: "बनें।",\n      p: "12 हफ्तों में अपनी पहली जॉब पाएं। यह जानने के लिए कि कौन सा प्रोग्राम आपके लिए सही है, 3 मिनट का फ्री टेस्ट लें।",\n      cta: "अपना इंडस्ट्री-फिट स्कोर प्राप्त करें",\n    },\n    te: {\n      h1_1: "భారతదేశ తదుపరి దశాబ్దానికి",\n      h1_2: "ఇండస్ట్రీ-రెడీ",\n      h1_3: "అవ్వండి.",\n      p: "12 వారాల్లో మీ మొదటి జాబ్ పొందండి. మీకు ఏ ప్రోగ్రామ్ సరిపోతుందో తెలుసుకోవడానికి 3 నిమిషాల ఉచిత పరీక్ష రాయండి.",\n      cta: "నా ఇండస్ట్రీ-ఫిట్ స్కోర్ పొందండి",\n    },\n  };\n\n  const t = translations[lang];\n\n  const staggerContainer: Variants = {\n    hidden: { opacity: 0 },\n    show: {\n      opacity: 1,\n      transition: { staggerChildren: 0.1, delayChildren: 0.1 },\n    },\n  };\n  const itemFadeUp: Variants = {\n    hidden: { opacity: 0, y: 16 },\n    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },\n  };\n\n  return (\n    <section\n      id="top"\n      aria-labelledby="hero-heading"\n      className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"\n    >\n      <div className="mx-auto max-w-7xl grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">\n        {/* Left Editorial Content */}\n        <motion.div\n          variants={staggerContainer}\n          initial="hidden"\n          animate="show"\n          className="lg:col-span-7 space-y-6"\n        >\n          {/* High-Contrast Language Selector */}\n          <motion.div\n            variants={itemFadeUp}\n            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white p-1 shadow-sm"\n          >\n            <div className="flex items-center gap-1 px-2.5 text-[#475569]">\n              <Globe className="h-4 w-4 text-[#2563EB]" />\n            </div>\n            {(["en", "hi", "te"] as const).map((l) => (\n              <button\n                key={l}\n                onClick={() => setLang(l)}\n                className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition-all ${\n                  lang === l\n                    ? "bg-[#0F172A] text-white shadow-md font-extrabold"\n                    : "text-[#334155] hover:bg-slate-100 hover:text-[#0F172A]"\n                }`}\n              >\n                {l === "en" ? "ENG" : l === "hi" ? "हिंदी" : "తెలుగు"}\n              </button>\n            ))}\n          </motion.div>\n\n          {/* Daily AI Assessment Dynamic Social Proof Badge */}\n          <motion.div variants={itemFadeUp}>\n            <DailyAiProofBadge />\n          </motion.div>\n\n          {/* Trust Chips Row */}\n          <motion.ul variants={itemFadeUp} className="flex flex-wrap gap-2.5">\n            {trustChips.map(({ icon: Icon, label }) => (\n              <li\n                key={label}\n                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-[#0F172A] shadow-sm"\n              >\n                <Icon className="h-3.5 w-3.5 text-[#2563EB]" />\n                <span className="text-[#0F172A]">{label}</span>\n              </li>\n            ))}\n          </motion.ul>\n\n          {/* Headline */}\n          <motion.h1\n            variants={itemFadeUp}\n            id="hero-heading"\n            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#020617] tracking-tight leading-[1.08] drop-shadow-sm"\n          >\n            {t.h1_1}{" "}\n            <span className="italic font-normal bg-gradient-to-r from-[#9A7B2C] via-[#B5943B] to-[#785E1A] bg-clip-text text-transparent">\n              {t.h1_2}\n            </span>{" "}\n            {t.h1_3}\n          </motion.h1>\n\n          <motion.p\n            variants={itemFadeUp}\n            className="text-base sm:text-lg lg:text-xl text-[#334155] max-w-2xl leading-relaxed font-medium tracking-normal"\n          >\n            {t.p}\n          </motion.p>\n\n          {/* Primary Royal Blue CTA */}\n          <motion.div\n            variants={itemFadeUp}\n            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"\n          >\n            <Link\n              to="/career-engine/start"\n              className="text-sm h-12 px-8 flex items-center justify-center gap-3 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"\n              aria-label="Take the 3-minute Arzon readiness assessment"\n              onClick={onPrimaryCta}\n            >\n              <span className="text-white font-bold">{ctaPending ? "Opening…" : t.cta}</span>\n              {ctaPending ? (\n                <Loader2 className="h-4 w-4 animate-spin text-white" />\n              ) : (\n                <ArrowRight className="h-4 w-4 text-white" />\n              )}\n            </Link>\n          </motion.div>\n\n          {/* Micro Assurance Labels */}\n          <motion.div variants={itemFadeUp} className="space-y-1 pt-2">\n            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#475569]">\n              ✓ 3 minutes · Free · No login · Instant fit score\n            </p>\n            <p className="text-xs text-[#64748B] font-medium">\n              Available in English, Hindi & Telugu\n            </p>\n          </motion.div>\n        </motion.div>\n\n        {/* Right Intake Card */}\n        <motion.div\n          initial={{ opacity: 0, y: 20 }}\n          animate={{ opacity: 1, y: 0 }}\n          transition={{ duration: 0.6, delay: 0.3 }}\n          className="hidden lg:block lg:col-span-5"\n        >\n          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 space-y-6 shadow-xl">\n            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-[#78350F] text-xs font-bold">\n              <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />\n              <span className="text-[#78350F] font-bold">Admissions Open — Closing Soon</span>\n            </div>\n\n            <div>\n              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">\n                Next Intake\n              </p>\n              <h2 className="font-serif text-3xl font-bold text-[#0F172A] mt-1">August Cohort</h2>\n            </div>\n\n            <p className="text-xs text-[#475569] leading-relaxed font-medium">\n              Cohort capacity is capped to maintain live mentor-to-student ratios. Reserve your seat\n              early to secure current pricing.\n            </p>\n\n            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 space-y-2">\n              <div className="flex items-center justify-between">\n                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">\n                  Cohort Starts\n                </span>\n                <span className="font-serif italic text-base font-bold text-[#8A6D1F]">\n                  12 August 2026\n                </span>\n              </div>\n              <div className="flex items-center justify-between text-xs font-medium">\n                <span className="text-[#64748B]">Status</span>\n                <span className="font-bold text-emerald-700">Seat Reservation Active</span>\n              </div>\n            </div>\n          </div>\n        </motion.div>\n      </div>\n\n      {/* Proof Partners Banner */}\n      <div className="mt-16 border-t border-slate-200 pt-6">\n        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-8 text-xs text-[#64748B]">\n          <span className="font-mono font-bold uppercase tracking-wider text-[#475569]">\n            Partners in Workforce Readiness\n          </span>\n          <img src={taskImg} alt="TASK" className="h-6 w-auto opacity-90" />\n          <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">\n            <BadgeCheck className="h-4 w-4 text-[#2563EB]" />\n            <span className="text-[#0F172A]">ISO 9001:2015</span>\n          </div>\n          <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">\n            <Landmark className="h-4 w-4 text-[#2563EB]" />\n            <span className="text-[#0F172A]">MSME Registered</span>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_27 = `import { SectionHeader } from "./SectionHeader";

/**
 * HiringPartnerWall — wordmark grid of the employers whose live JDs we
 * reverse-engineer the curriculum from. Wordmark-only (no logo files) to
 * stay trademark-safe; the copy is explicit that these are JD sources, not
 * endorsements.
 */
type Partner = { name: string; role: string };

const PARTNERS: Partner[] = [
  { name: "IQVIA", role: "PV Associate I" },
  { name: "Cognizant", role: "Medical Coder" },
  { name: "Parexel", role: "Drug Safety Associate" },
  { name: "Accenture", role: "Clinical Data Coordinator" },
  { name: "ICON", role: "Safety Specialist" },
  { name: "Syneos", role: "PV Case Processor" },
  { name: "Omega Healthcare", role: "Medical Coder (CPC)" },
  { name: "Apollo Hospitals", role: "Clinical Research Coordinator" },
  { name: "Dr Reddy's", role: "Regulatory Affairs Trainee" },
  { name: "Sun Pharma", role: "Pharmacovigilance Trainee" },
];

const JD_STATS = [
  { value: "127", label: "Live JDs analysed this month" },
  { value: "10", label: "Employer sources, refreshed weekly" },
  { value: "3 days ago", label: "Last syllabus sync" },
];

export function HiringPartnerWall() {
  return (
    <section
      aria-labelledby="hiring-wall-heading"
      className="tone-dark relative overflow-hidden bg-[#0a0c10] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          tone="dark"
          eyebrow="JD sources · live Indian listings"
          title={
            <h2 id="hiring-wall-heading" className="text-slate-50">
              The employers whose JDs <em className="italic-accent not-italic">we mirror.</em>
            </h2>
          }
          sub={
            <span className="text-slate-300">
              We rebuild every syllabus from current fresher JDs at these firms. Names shown for
              source attribution only — no endorsement or partnership is claimed.
            </span>
          }
        />

        <dl className="mx-auto mt-10 flex max-w-4xl flex-col divide-y divide-white/10 overflow-hidden rounded-[1.5rem] bg-black/90 border border-white/15 sm:flex-row sm:divide-x sm:divide-y-0 shadow-2xl">
          {JD_STATS.map((s) => (
            <div
              key={s.label}
              className="flex-1 px-5 py-6 text-center hover:bg-white/[0.04] transition-colors"
            >
              <dd className="text-3xl font-extrabold sm:text-4xl font-mono bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                {s.value}
              </dd>
              <dt className="mt-2.5 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 font-bold">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        <ul className="mx-auto mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-10 lg:grid-cols-5">
          {PARTNERS.map(({ name, role }) => (
            <li
              key={name}
              className="group relative flex min-w-0 min-h-[96px] flex-col items-start justify-center gap-1 overflow-hidden rounded-[1rem] glass-panel px-4 py-3 hover-glass-glow"
            >
              <span
                aria-hidden
                className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-sky-400/0 transition-all duration-300 group-hover:bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              />
              <span className="block w-full truncate font-display text-body-sm font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-sky-400">
                {name}
              </span>
              <span className="block w-full font-sans text-xs font-semibold leading-snug text-slate-300">
                {role}
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center source-note">
          Source: Naukri, LinkedIn and company career sites. Names shown for source attribution only
          — no endorsement or partnership is claimed.
        </p>
      </div>
    </section>
  );
}
`;
const __vite_glob_0_28 = 'import type { ReactNode } from "react";\nimport { motion } from "framer-motion";\nimport {\n  ClipboardCheck,\n  GraduationCap,\n  Briefcase,\n  Award,\n  Check,\n  Trophy,\n  Sparkles,\n} from "lucide-react";\n\ntype Step = {\n  i: string;\n  icon: typeof ClipboardCheck;\n  weeks: string;\n  title: string;\n  desc: ReactNode;\n  checklist: string[];\n  gradient: string;\n  accentColor: string;\n  xpLabel: string;\n  xpBg: string;\n  xpFg: string;\n};\n\nconst STEPS: Step[] = [\n  {\n    i: "01",\n    icon: ClipboardCheck,\n    weeks: "DAY 0",\n    title: "Apply in 1 minute",\n    desc: (\n      <>\n        Fill the form. A counsellor calls you back the <strong>same day or next morning.</strong>\n      </>\n    ),\n    checklist: ["1-minute form", "Same-day callback", "No payment to apply"],\n    gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",\n    accentColor: "#2563eb",\n    xpLabel: "# +1 COUNSELLOR CALL",\n    xpBg: "bg-blue-50 border-blue-200",\n    xpFg: "text-blue-700",\n  },\n  {\n    i: "02",\n    icon: GraduationCap,\n    weeks: "WEEKS 1–8",\n    title: "Learn live for 8 weeks",\n    desc: (\n      <>\n        <strong>Live classes with industry mentors.</strong> Weekly homework on{" "}\n        <strong>real medical files.</strong>\n      </>\n    ),\n    checklist: ["Live industry mentors", "Graded weekly homework", "Real medical files"],\n    gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",\n    accentColor: "#ea580c",\n    xpLabel: "# +8 GRADED LESSONS",\n    xpBg: "bg-orange-50 border-orange-200",\n    xpFg: "text-orange-700",\n  },\n  {\n    i: "03",\n    icon: Briefcase,\n    weeks: "WEEKS 9–12",\n    title: "Real internship · 4 weeks",\n    desc: (\n      <>\n        Work on <strong>actual hospital or CRO projects.</strong> Get a certificate you can{" "}\n        <strong>verify online.</strong>\n      </>\n    ),\n    checklist: ["Hospital / CRO project", "Mentor reviews", "Verifiable certificate"],\n    gradient: "from-[#047857] via-[#059669] to-[#0d9488]",\n    accentColor: "#059669",\n    xpLabel: "# +1 CAPSTONE PROJECT",\n    xpBg: "bg-emerald-50 border-emerald-200",\n    xpFg: "text-emerald-700",\n  },\n  {\n    i: "04",\n    icon: Award,\n    weeks: "WEEK 12+",\n    title: "Resume + interview help",\n    desc: (\n      <>\n        We fix your CV, do mock interviews, and connect you to <strong>hiring partners.</strong>\n      </>\n    ),\n    checklist: ["CV rewrite", "Mock interviews", "Direct hiring intros"],\n    gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",\n    accentColor: "#7c3aed",\n    xpLabel: "# +1 SHOT AT AN OFFER",\n    xpBg: "bg-purple-50 border-purple-200",\n    xpFg: "text-purple-700",\n  },\n];\n\nexport function HowItWorks() {\n  const containerVariants = {\n    hidden: { opacity: 0 },\n    show: {\n      opacity: 1,\n      transition: { staggerChildren: 0.1 },\n    },\n  };\n\n  const itemVariants = {\n    hidden: { opacity: 0, y: 16 },\n    show: {\n      opacity: 1,\n      y: 0,\n      transition: { type: "spring" as const, stiffness: 240, damping: 22 },\n    },\n  };\n\n  return (\n    <section\n      id="how"\n      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"\n    >\n      <div className="mx-auto max-w-7xl space-y-10">\n        {/* Section Title Header */}\n        <div className="text-center space-y-3 max-w-3xl mx-auto">\n          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">\n            4 simple steps\n          </h2>\n          <p className="text-sm sm:text-base text-[#5B6472] leading-relaxed">\n            No long lectures. No PDFs to read alone. You learn while you do real work.\n          </p>\n        </div>\n\n        {/* Master Outer Container (Matching Image 2) */}\n        <div className="rounded-[32px] border border-slate-200/90 bg-gradient-to-b from-[#F0F5FF]/70 via-white to-[#F8FAFC] p-6 sm:p-10 space-y-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">\n          {/* Header pill badge */}\n          <div className="flex justify-center">\n            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-amber-300/80 px-5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A6D1F] shadow-sm">\n              <Sparkles className="h-3.5 w-3.5 text-amber-600" />\n              12 WEEKS · 4 STAGES · 3+ DELIVERABLES\n            </span>\n          </div>\n\n          {/* Connected Process Node Timeline Bar (Desktop) */}\n          <div className="hidden lg:block relative max-w-4xl mx-auto py-4">\n            {/* Dashed Connecting Line */}\n            <div className="absolute top-9 left-12 right-12 h-0.5 border-t-2 border-dashed border-slate-300 z-0" />\n\n            <div className="flex items-center justify-between relative z-10">\n              {STEPS.map((s) => {\n                const Icon = s.icon;\n                return (\n                  <div key={s.i} className="flex flex-col items-center space-y-2">\n                    <div\n                      className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-4 ring-white"\n                      style={{ backgroundColor: s.accentColor }}\n                    >\n                      <Icon className="h-5 w-5" />\n                    </div>\n                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">\n                      {s.weeks}\n                    </span>\n                  </div>\n                );\n              })}\n              {/* Node 5: Hired */}\n              <div className="flex flex-col items-center space-y-2">\n                <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-4 ring-white bg-amber-500">\n                  <Trophy className="h-5 w-5" />\n                </div>\n                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">\n                  HIRED\n                </span>\n              </div>\n            </div>\n          </div>\n\n          {/* 4 Vertical Cards Grid */}\n          <motion.div\n            variants={containerVariants}\n            initial="hidden"\n            whileInView="show"\n            viewport={{ once: true }}\n            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"\n          >\n            {STEPS.map((step) => {\n              const Icon = step.icon;\n              return (\n                <motion.article\n                  variants={itemVariants}\n                  key={step.i}\n                  className="flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"\n                >\n                  {/* Card Header Banner */}\n                  <div\n                    className={`bg-gradient-to-r ${step.gradient} p-4 text-white relative min-h-[85px] flex flex-col justify-between`}\n                  >\n                    <div className="flex items-center justify-between relative z-10">\n                      <span className="inline-flex items-center gap-1 bg-white/95 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">\n                        STEP {step.i}\n                      </span>\n                      <span className="inline-flex items-center gap-1 bg-white/95 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">\n                        {step.weeks}\n                      </span>\n                    </div>\n\n                    <Icon className="absolute right-2 bottom-1 h-12 w-12 opacity-25 select-none pointer-events-none" />\n                  </div>\n\n                  {/* Card Content Body */}\n                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">\n                    <div className="space-y-2">\n                      <h3 className="font-serif text-lg font-bold text-[#151C2E]">{step.title}</h3>\n                      <p className="text-xs text-[#5B6472] leading-relaxed">{step.desc}</p>\n                    </div>\n\n                    {/* Checklist */}\n                    <ul className="space-y-1.5 pt-2 border-t border-slate-100">\n                      {step.checklist.map((item) => (\n                        <li\n                          key={item}\n                          className="flex items-center gap-2 text-xs text-[#151C2E] font-medium"\n                        >\n                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />\n                          <span>{item}</span>\n                        </li>\n                      ))}\n                    </ul>\n\n                    {/* XP Tag */}\n                    <div className="pt-2">\n                      <span\n                        className={`inline-block w-full text-center px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold tracking-wider ${step.xpBg} ${step.xpFg}`}\n                      >\n                        {step.xpLabel}\n                      </span>\n                    </div>\n                  </div>\n                </motion.article>\n              );\n            })}\n          </motion.div>\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_29 = 'import { useEffect, useRef, useState } from "react";\nimport { Link } from "@tanstack/react-router";\nimport { ArrowRight, MessageCircle, Users, Clock } from "lucide-react";\nimport { LIVE_LEARNERS_LABEL, NEXT_COHORT } from "./constants";\nimport { WhatsAppLink } from "@/components/common/WhatsAppLink";\nimport { isReducedMotion } from "@/hooks/useReducedMotion";\nimport { useInView } from "@/hooks/useInView";\nimport { trackUrgencyCtaClicked, trackUrgencyStripViewed } from "@/lib/urgencyAnalytics";\nimport { CTAButton } from "./CTAButton";\n\n/**\n * Inside-sales urgency strip, replaces the older MidPageReserveStrip.\n * Three honest signals, no fake numbers:\n *   - cohort countdown (real time until applicationsClose)\n *   - learner count (1,200+ live)\n *   - "Counsellors online" only during India business hours (10:00–21:00 IST)\n * Plus two CTAs: ACRI Readiness Preview + WhatsApp counsellor.\n */\nexport function InsideSalesUrgencyStrip() {\n  const [now, setNow] = useState<number>(() => Date.now());\n  useEffect(() => {\n    if (isReducedMotion()) return;\n    const id = setInterval(() => setNow(Date.now()), 60_000);\n    return () => clearInterval(id);\n  }, []);\n\n  const closeAt = new Date(NEXT_COHORT.applicationsCloseISO).getTime();\n  const diff = Math.max(0, closeAt - now);\n  const days = Math.floor(diff / 86_400_000);\n  const hours = Math.floor((diff % 86_400_000) / 3_600_000);\n  const countdown = diff > 0 ? `${days}d ${hours}h` : "Closing today";\n\n  // India business hours, 10:00–21:00 IST. Computed from UTC offset.\n  const istHour =\n    (new Date(now).getUTCHours() + 5 + Math.floor((new Date(now).getUTCMinutes() + 30) / 60)) % 24;\n  const counsellorsOnline = istHour >= 10 && istHour < 21;\n\n  // Fire one impression per page mount when the strip enters view.\n  const { ref: stripRef, inView } = useInView<HTMLElement>();\n  const viewedRef = useRef(false);\n  useEffect(() => {\n    if (!inView || viewedRef.current) return;\n    viewedRef.current = true;\n    trackUrgencyStripViewed({\n      cohortId: NEXT_COHORT.id,\n      daysToClose: days,\n      hoursToClose: hours,\n      counsellorsOnline,\n      seatsLabel: LIVE_LEARNERS_LABEL,\n      closed: diff <= 0,\n    });\n  }, [inView, days, hours, counsellorsOnline, diff]);\n\n  const onCtaClick = (target: "readiness_assessment" | "whatsapp_counsellor") => {\n    trackUrgencyCtaClicked({\n      target,\n      cohortId: NEXT_COHORT.id,\n      daysToClose: days,\n      hoursToClose: hours,\n    });\n  };\n\n  return (\n    <section ref={stripRef} className="px-4 py-10">\n      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-white/[0.02] p-5 sm:p-7">\n        <div className="flex flex-wrap items-center gap-3">\n          <Pill icon={Clock} text={`Applications close in ${countdown}`} tone="gold" />\n          <Pill icon={Users} text={`${LIVE_LEARNERS_LABEL} students learning live`} tone="muted" />\n          {counsellorsOnline && (\n            <Pill icon={MessageCircle} text="Counsellors online now" tone="emerald" />\n          )}\n        </div>\n        <h3 className="mt-4 font-grotesk text-h4 font-bold leading-tight text-slate-50 sm:text-h3">\n          Get your ACRI Readiness Preview before the {NEXT_COHORT.label} cohort closes.\n        </h3>\n        <p className="mt-2 text-sm text-slate-100/70">\n          3-minute assessment. Personalised readiness level + recommended track.\n        </p>\n        <div className="mt-5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">\n          <CTAButton\n            asChild\n            variant="gold"\n            size="lg"\n            block\n            glow\n            trailingIcon={<ArrowRight className="h-4 w-4" />}\n            onClick={() => onCtaClick("readiness_assessment")}\n          >\n            <Link to="/career-engine">Start Readiness Assessment</Link>\n          </CTAButton>\n          <CTAButton\n            asChild\n            variant="ghost"\n            size="lg"\n            leadingIcon={<MessageCircle className="h-4 w-4 text-eyebrow" />}\n          >\n            <WhatsAppLink\n              source="urgency_strip_counsellor"\n              message="Hi Arzon, I\'d like to speak with a counsellor about the readiness programme."\n              onClick={() => onCtaClick("whatsapp_counsellor")}\n            >\n              WhatsApp counsellor\n            </WhatsAppLink>\n          </CTAButton>\n        </div>\n      </div>\n    </section>\n  );\n}\n\nfunction Pill({\n  icon: Icon,\n  text,\n  tone,\n}: {\n  icon: typeof Clock;\n  text: string;\n  tone: "gold" | "emerald" | "muted";\n}) {\n  const styles =\n    tone === "gold"\n      ? "border-gold/30 bg-gold/10 text-gold"\n      : tone === "emerald"\n        ? "border-accent-glow/30 bg-accent-glow/10 text-eyebrow"\n        : "border-slate-200/10 bg-white/[0.04] text-slate-100/70";\n  return (\n    <span\n      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] ${styles}`}\n    >\n      <Icon className="h-3 w-3" />\n      {text}\n    </span>\n  );\n}\n';
const __vite_glob_0_30 = 'import { GraduationCap, ShieldCheck, CheckCircle2, Award } from "lucide-react";\n\nexport type InstitutionItem = {\n  name: string;\n  region: "Karnataka" | "Tamil Nadu" | "Telangana" | "Andhra Pradesh" | "North India";\n  city: string;\n  isNirfRanked?: boolean;\n};\n\nexport const ALL_INSTITUTIONS: InstitutionItem[] = [\n  // Karnataka\n  {\n    name: "JSS College of Pharmacy, Mysuru",\n    region: "Karnataka",\n    city: "Mysuru",\n    isNirfRanked: true,\n  },\n  { name: "KLE College of Pharmacy", region: "Karnataka", city: "Belagavi", isNirfRanked: true },\n  { name: "Sharada Vilas College of Pharmacy", region: "Karnataka", city: "Mysuru" },\n  { name: "Cauvery College of Pharmacy", region: "Karnataka", city: "Mysuru" },\n  {\n    name: "Manipal College of Pharmaceutical Sciences",\n    region: "Karnataka",\n    city: "Manipal",\n    isNirfRanked: true,\n  },\n\n  // Tamil Nadu\n  { name: "JSS College of Pharmacy, Ooty", region: "Tamil Nadu", city: "Ooty", isNirfRanked: true },\n  { name: "PSG College of Pharmacy", region: "Tamil Nadu", city: "Coimbatore", isNirfRanked: true },\n  {\n    name: "SRM Institute of Science and Technology",\n    region: "Tamil Nadu",\n    city: "Chennai",\n    isNirfRanked: true,\n  },\n  {\n    name: "Saveetha Institute of Medical & Tech Sciences",\n    region: "Tamil Nadu",\n    city: "Chennai",\n    isNirfRanked: true,\n  },\n  { name: "Sathyabama Institute of Science & Technology", region: "Tamil Nadu", city: "Chennai" },\n  { name: "Vels University", region: "Tamil Nadu", city: "Chennai" },\n  {\n    name: "Amrita Vishwa Vidyapeetham",\n    region: "Tamil Nadu",\n    city: "Coimbatore",\n    isNirfRanked: true,\n  },\n  {\n    name: "Kalasalingam Academy of Research & Education",\n    region: "Tamil Nadu",\n    city: "Krishnankoil",\n  },\n  { name: "Karpagam Academy of Higher Education", region: "Tamil Nadu", city: "Coimbatore" },\n  { name: "Chettinad Academy of Research & Education", region: "Tamil Nadu", city: "Kelambakkam" },\n\n  // Telangana\n  { name: "Malla Reddy College of Pharmacy", region: "Telangana", city: "Hyderabad" },\n  { name: "NIPER Hyderabad", region: "Telangana", city: "Hyderabad", isNirfRanked: true },\n  { name: "Osmania University", region: "Telangana", city: "Hyderabad", isNirfRanked: true },\n  { name: "JNTU Hyderabad", region: "Telangana", city: "Hyderabad" },\n  { name: "Woxsen University", region: "Telangana", city: "Hyderabad" },\n\n  // Andhra Pradesh\n  {\n    name: "Andhra University",\n    region: "Andhra Pradesh",\n    city: "Visakhapatnam",\n    isNirfRanked: true,\n  },\n  { name: "Acharya Nagarjuna University", region: "Andhra Pradesh", city: "Guntur" },\n  { name: "JNTU Anantapur", region: "Andhra Pradesh", city: "Anantapur" },\n  { name: "GITAM University", region: "Andhra Pradesh", city: "Visakhapatnam" },\n  { name: "KL University", region: "Andhra Pradesh", city: "Vijayawada" },\n  { name: "Sri Padmavati Mahila Visvavidyalayam", region: "Andhra Pradesh", city: "Tirupati" },\n\n  // North India\n  {\n    name: "Lovely Professional University (LPU)",\n    region: "North India",\n    city: "Phagwara",\n    isNirfRanked: true,\n  },\n  { name: "Chandigarh University", region: "North India", city: "Mohali", isNirfRanked: true },\n];\n\nexport function InstitutionalReachWall() {\n  const marqueeRow1 = [...ALL_INSTITUTIONS.slice(0, 14), ...ALL_INSTITUTIONS.slice(0, 14)];\n  const marqueeRow2 = [...ALL_INSTITUTIONS.slice(14), ...ALL_INSTITUTIONS.slice(14)];\n\n  return (\n    <section\n      id="institutional-reach"\n      className="py-12 sm:py-16 bg-[#060A12] border-y border-slate-800/80 text-slate-50 overflow-hidden relative"\n    >\n      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">\n        {/* Header Block */}\n        <div className="max-w-3xl mx-auto text-center space-y-3">\n          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono font-bold text-sky-400 shadow-sm">\n            <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />\n            <span>ACADEMIC ADOPTION & CAMPUS PARTICIPATION</span>\n          </div>\n\n          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-50 tracking-tight leading-snug">\n            Students from India\'s Leading Pharmacy Colleges and Universities Trust Our JD-Based Role\n            Trainings\n          </h2>\n\n          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">\n            Students from India\'s leading pharmacy colleges, universities, and healthcare\n            institutions rely on Arzon\'s JD-based role-readiness assessments and clinical trainings\n            to benchmark their skills and prepare for deployment-ready careers.\n          </p>\n\n          <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-400 font-medium">\n            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-0.5 rounded-full border border-slate-800 text-[11px]">\n              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />\n              <span>\n                Students from these institutions have participated in our JD-based role trainings\n              </span>\n            </span>\n          </div>\n        </div>\n\n        {/* Compact Continuous Infinite Marquee Strip */}\n        <div className="relative w-full space-y-3 pt-2">\n          {/* Edge Blur Gradients */}\n          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#060A12] to-transparent z-20 pointer-events-none" />\n          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#060A12] to-transparent z-20 pointer-events-none" />\n\n          {/* Marquee Row 1 */}\n          <div className="group flex overflow-hidden select-none gap-3">\n            <div className="flex shrink-0 motion-safe:animate-marquee items-center gap-3 group-hover:[animation-play-state:paused] duration-300">\n              {marqueeRow1.map((item, idx) => (\n                <div\n                  key={`r1-${item.name}-${idx}`}\n                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-3.5 py-2 shadow-sm transition-all hover:border-sky-500/40 hover:bg-slate-900"\n                >\n                  <GraduationCap className="h-3.5 w-3.5 text-sky-400 shrink-0" />\n                  <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">\n                    {item.name}\n                  </span>\n                  {item.isNirfRanked && (\n                    <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">\n                      <Award className="h-2.5 w-2.5 text-amber-400" />\n                      NIRF\n                    </span>\n                  )}\n                </div>\n              ))}\n            </div>\n            <div\n              aria-hidden="true"\n              className="flex shrink-0 motion-safe:animate-marquee items-center gap-3 group-hover:[animation-play-state:paused] duration-300"\n            >\n              {marqueeRow1.map((item, idx) => (\n                <div\n                  key={`r1d-${item.name}-${idx}`}\n                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-3.5 py-2 shadow-sm transition-all hover:border-sky-500/40 hover:bg-slate-900"\n                >\n                  <GraduationCap className="h-3.5 w-3.5 text-sky-400 shrink-0" />\n                  <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">\n                    {item.name}\n                  </span>\n                  {item.isNirfRanked && (\n                    <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">\n                      <Award className="h-2.5 w-2.5 text-amber-400" />\n                      NIRF\n                    </span>\n                  )}\n                </div>\n              ))}\n            </div>\n          </div>\n\n          {/* Marquee Row 2 */}\n          <div className="group flex overflow-hidden select-none gap-3">\n            <div className="flex shrink-0 motion-safe:animate-marquee-reverse items-center gap-3 group-hover:[animation-play-state:paused] duration-300">\n              {marqueeRow2.map((item, idx) => (\n                <div\n                  key={`r2-${item.name}-${idx}`}\n                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-3.5 py-2 shadow-sm transition-all hover:border-sky-500/40 hover:bg-slate-900"\n                >\n                  <GraduationCap className="h-3.5 w-3.5 text-sky-400 shrink-0" />\n                  <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">\n                    {item.name}\n                  </span>\n                  {item.isNirfRanked && (\n                    <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">\n                      <Award className="h-2.5 w-2.5 text-amber-400" />\n                      NIRF\n                    </span>\n                  )}\n                </div>\n              ))}\n            </div>\n            <div\n              aria-hidden="true"\n              className="flex shrink-0 motion-safe:animate-marquee-reverse items-center gap-3 group-hover:[animation-play-state:paused] duration-300"\n            >\n              {marqueeRow2.map((item, idx) => (\n                <div\n                  key={`r2d-${item.name}-${idx}`}\n                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-3.5 py-2 shadow-sm transition-all hover:border-sky-500/40 hover:bg-slate-900"\n                >\n                  <GraduationCap className="h-3.5 w-3.5 text-sky-400 shrink-0" />\n                  <span className="font-sans text-xs font-bold text-slate-100 whitespace-nowrap">\n                    {item.name}\n                  </span>\n                  {item.isNirfRanked && (\n                    <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">\n                      <Award className="h-2.5 w-2.5 text-amber-400" />\n                      NIRF\n                    </span>\n                  )}\n                </div>\n              ))}\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_31 = 'import { BookOpen, FlaskConical, Award, Mic, Briefcase } from "lucide-react";\nimport { Section } from "@/components/ui/Section";\nimport { SectionHeader } from "./SectionHeader";\n\nconst STEPS = [\n  {\n    icon: BookOpen,\n    window: "Weeks 1–8",\n    title: "Learn from industry mentors",\n    body: "Live, recorded sessions on PV, coding, CDM or RA fundamentals — taught by people who do the job today.",\n  },\n  {\n    icon: FlaskConical,\n    window: "Weeks 9–12",\n    title: "Work on real project files",\n    body: "Real de-identified ICSR cases, MedDRA coding, eCRF entries — the exact work a fresher does in week one of the job.",\n  },\n  {\n    icon: Award,\n    window: "End of 12",\n    title: "Get a verifiable certificate",\n    body: "Performance-graded, ISO-aligned, with a public verification URL recruiters can scan.",\n  },\n  {\n    icon: Mic,\n    window: "+2 weeks",\n    title: "Mock interviews + CV rewrite",\n    body: "Recorded mock interviews, JD-tuned resume, and answers to the 20 questions recruiters actually ask.",\n  },\n  {\n    icon: Briefcase,\n    window: "Ongoing",\n    title: "Apply with referral support",\n    body: "Warm intros into our hiring-partner pool.",\n  },\n] as const;\n\nexport function InterviewRoadmap() {\n  return (\n    <section\n      id="roadmap"\n      aria-labelledby="roadmap-heading"\n      className="tone-dark bg-[#0a1430] py-16 sm:py-20 text-slate-50"\n    >\n      <Section size="md">\n        <SectionHeader\n          eyebrow="How Arzon gets you interview-ready"\n          title={\n            <h2 id="roadmap-heading">\n              Five steps. <em className="italic-accent not-italic">No jargon.</em>\n            </h2>\n          }\n          sub="Every step ships something you can show a recruiter — not just lecture notes."\n        />\n\n        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">\n          {STEPS.map((s, i) => {\n            const Icon = s.icon;\n            return (\n              <li\n                key={s.title}\n                className="relative flex h-full flex-col rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.5)]"\n              >\n                <div className="flex items-center gap-2">\n                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-800 text-slate-50">\n                    <Icon aria-hidden className="h-4 w-4" />\n                  </span>\n                  <span className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-400">\n                    Step {String(i + 1).padStart(2, "0")} · {s.window}\n                  </span>\n                </div>\n                <h3 className="mt-3 font-serif text-[1.1rem] font-semibold leading-snug text-slate-50">\n                  {s.title}\n                </h3>\n                <p className="mt-2 text-body-sm leading-relaxed text-slate-300">{s.body}</p>\n              </li>\n            );\n          })}\n        </ol>\n      </Section>\n    </section>\n  );\n}\n';
const __vite_glob_0_32 = 'import { Section } from "@/components/ui/Section";\nimport { SectionHeader } from "./SectionHeader";\nimport { Link } from "@tanstack/react-router";\nimport { Landmark, ShieldCheck, Building2, ArrowRight } from "lucide-react";\nimport legalImg from "@/assets/proof/legal-certs.webp";\n\n/**\n * Image #4, three legal certificates side-by-side.\n * Slot: inside Proof, right after the dual certificate showcase.\n */\nconst items = [\n  {\n    icon: Landmark,\n    title: "Government Compliant",\n    body: "Registered firm with the Govt of Telangana. Registrar of Firms, Medchal-Malkajgiri.",\n    hash: "mca",\n  },\n  {\n    icon: ShieldCheck,\n    title: "ISO 9001:2015 Certified",\n    body: "Independent third-party audit of training & internship delivery quality systems.",\n    hash: "iso",\n  },\n  {\n    icon: Building2,\n    title: "MSME Verified",\n    body: "Officially registered under the MSME Udyam scheme · Govt of India.",\n    hash: "msme",\n  },\n];\n\nexport function LegalTransparencyBlock() {\n  return (\n    <Section id="legal" size="lg">\n      <SectionHeader\n        align="center"\n        eyebrow="Safe · Legal · Fully Transparent"\n        title={\n          <>\n            You deserve a platform that is{" "}\n            <em className="italic-accent not-italic">safe, legal, and fully transparent.</em>\n          </>\n        }\n        sub="Three independent registrations you can verify yourself, not a logo wall, the actual documents."\n      />\n\n      {/* Hero proof, full image on desktop, scrollable on small screens */}\n      <figure className="mt-10 overflow-hidden rounded-2xl border border-slate-200/10 bg-white/[0.03] ring-1 ring-white/5">\n        <img\n          src={legalImg}\n          alt="Three legal certificates: state firm registration, ISO 9001:2015, and MSME Udyam registration for Arzon Global Labs"\n          loading="lazy"\n          decoding="async"\n          className="h-auto w-full"\n        />\n      </figure>\n\n      {/* Mobile: snap-scroll · Desktop: 3-up */}\n      <ul className="mt-6 grid gap-4 sm:grid-cols-3">\n        {items.map(({ icon: Icon, title, body, hash }) => (\n          <li key={title}>\n            <Link\n              to="/proof"\n              hash={hash}\n              className="group flex h-full flex-col rounded-2xl border border-slate-200/10 bg-white/[0.03] p-5 transition hover:border-slate-200/25 hover:bg-white/[0.06]"\n            >\n              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary-glow ring-1 ring-primary/30">\n                <Icon className="h-5 w-5" />\n              </span>\n              <p className="mt-4 text-base font-semibold text-slate-50">{title}</p>\n              <p className="mt-1.5 text-sm text-slate-100/65">{body}</p>\n              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-glow">\n                Verify <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />\n              </span>\n            </Link>\n          </li>\n        ))}\n      </ul>\n    </Section>\n  );\n}\n';
const __vite_glob_0_33 = 'import { useEffect, useState } from "react";\nimport { Link } from "@tanstack/react-router";\nimport { ArrowRight, CalendarDays, Users2, Clock, Lock, MessageCircle } from "lucide-react";\nimport { isReducedMotion } from "@/hooks/useReducedMotion";\nimport { useQuery } from "@tanstack/react-query";\nimport { getCohortStatus, ACTIVE_COHORT_ID } from "@/lib/cohort.functions";\nimport { supabase } from "@/integrations/supabase/client";\nimport { trackCohort } from "@/lib/cohortAnalytics";\n\nconst BATCH_START_ISO_FALLBACK = "2026-07-30T09:00:00+05:30";\nconst BATCH_START_LABEL_FALLBACK = "30 July 2026";\nconst SEATS_CAP_FALLBACK = 60;\nconst SEATS_TAKEN_FALLBACK = 57;\n\nfunction diff(target: number) {\n  const ms = Math.max(0, target - Date.now());\n  const days = Math.floor(ms / 86_400_000);\n  const hours = Math.floor((ms % 86_400_000) / 3_600_000);\n  const minutes = Math.floor((ms % 3_600_000) / 60_000);\n  const seconds = Math.floor((ms % 60_000) / 1_000);\n  return { days, hours, minutes, seconds, done: ms === 0 };\n}\n\nconst ZERO_DIFF = { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };\n\nfunction formatLockLabel(iso: string): string {\n  try {\n    return new Intl.DateTimeFormat("en-IN", {\n      day: "2-digit",\n      month: "short",\n      hour: "2-digit",\n      minute: "2-digit",\n      timeZone: "Asia/Kolkata",\n      timeZoneName: "short",\n    }).format(new Date(iso));\n  } catch {\n    return iso;\n  }\n}\n\nexport function LimitedSeatsCountdown() {\n  const q = useQuery({\n    queryKey: ["cohort-status", ACTIVE_COHORT_ID],\n    queryFn: () => getCohortStatus({ data: { id: ACTIVE_COHORT_ID } }),\n    staleTime: 15_000,\n    refetchOnWindowFocus: true,\n    refetchInterval: 60_000,\n  });\n\n  useEffect(() => {\n    const ch = supabase\n      .channel(`cohort:${ACTIVE_COHORT_ID}`)\n      .on(\n        "postgres_changes",\n        {\n          event: "UPDATE",\n          schema: "public",\n          table: "cohorts",\n          filter: `id=eq.${ACTIVE_COHORT_ID}`,\n        },\n        () => void q.refetch(),\n      )\n      .subscribe();\n    return () => {\n      void supabase.removeChannel(ch);\n    };\n  }, [q]);\n\n  const status = q.data;\n  const seatsCap = status?.seatsCap ?? SEATS_CAP_FALLBACK;\n  const seatsTaken = status?.seatsTaken ?? SEATS_TAKEN_FALLBACK;\n  const seatsLeft = status ? status.seatsLeft : Math.max(0, seatsCap - seatsTaken);\n  const lockAtIso = status?.lockAt ?? BATCH_START_ISO_FALLBACK;\n  const label = status?.displayLabel ?? BATCH_START_LABEL_FALLBACK;\n  const locked = !!status?.effectiveLocked;\n\n  const target = new Date(lockAtIso).getTime();\n  const [t, setT] = useState(ZERO_DIFF);\n\n  const [didFireView, setDidFireView] = useState(false);\n  useEffect(() => {\n    if (!status || didFireView) return;\n    trackCohort("seat_availability_viewed", {\n      cohort_id: status.id,\n      seats_left: status.seatsLeft,\n      seats_cap: status.seatsCap,\n      effective_locked: status.effectiveLocked,\n    });\n    setDidFireView(true);\n  }, [status, didFireView]);\n\n  const [didFireCountdown, setDidFireCountdown] = useState(false);\n  useEffect(() => {\n    if (didFireCountdown || locked) return;\n    const msLeft = Math.max(0, target - Date.now());\n    if (msLeft > 0 && msLeft <= 24 * 3_600_000) {\n      trackCohort("lock_countdown_visible", {\n        cohort_id: status?.id ?? ACTIVE_COHORT_ID,\n        ms_to_lock: msLeft,\n      });\n      setDidFireCountdown(true);\n    }\n  }, [t, target, locked, status?.id, didFireCountdown]);\n\n  useEffect(() => {\n    setT(diff(target));\n    if (isReducedMotion()) return;\n    const id = setInterval(() => setT(diff(target)), 1000);\n    return () => clearInterval(id);\n  }, [target]);\n\n  const fillPct = Math.min(100, Math.round((seatsTaken / Math.max(1, seatsCap)) * 100));\n\n  return (\n    <section id="limited-seats" className="editorial-page-bg py-16 px-4 sm:px-6 lg:px-8">\n      <div className="mx-auto max-w-4xl space-y-8">\n        {/* Editorial Header */}\n        <div className="text-center space-y-3">\n          <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">\n            {locked ? "Cohort Locked" : "Cohort Closing Soon"}\n          </p>\n          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">\n            {locked ? "This cohort is now full —" : "Next batch begins"}{" "}\n            <span className="italic text-[#8A6D1F]">{label}</span>\n          </h2>\n          <p className="text-sm text-[#5B6472] max-w-xl mx-auto">\n            We cap every cohort at {seatsCap} seats. Applications close once seats are full or at{" "}\n            {formatLockLabel(lockAtIso)}, whichever comes first.\n          </p>\n        </div>\n\n        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">\n          {/* Countdown Card */}\n          <div className="editorial-card p-6 flex flex-col justify-between space-y-4">\n            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#707C90]">\n              <Clock className="h-4 w-4 text-[#1D4ED8]" />\n              <span>{locked ? "Cohort locked" : "TIME UNTIL LOCK"}</span>\n            </div>\n\n            <div className="grid grid-cols-4 gap-2.5">\n              {[\n                { v: t.days, l: "Days" },\n                { v: t.hours, l: "Hours" },\n                { v: t.minutes, l: "Min" },\n                { v: t.seconds, l: "Sec" },\n              ].map((u) => (\n                <div key={u.l} className="editorial-stat-tile p-3 text-center">\n                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#151C2E] tabular-nums block">\n                    {String(u.v).padStart(2, "0")}\n                  </span>\n                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#707C90] mt-1 block">\n                    {u.l}\n                  </span>\n                </div>\n              ))}\n            </div>\n\n            <div className="flex items-center gap-2 text-xs text-[#5B6472]">\n              <CalendarDays className="h-4 w-4 text-[#1D4ED8] shrink-0" />\n              <span>\n                Live classes start {label}, 7:30 PM IST · Lock at {formatLockLabel(lockAtIso)}\n              </span>\n            </div>\n          </div>\n\n          {/* Capacity & Urgency Bar Card */}\n          <div className="editorial-card p-6 flex flex-col justify-between space-y-4">\n            <div>\n              <div className="flex items-center justify-between">\n                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#707C90]">\n                  <Users2 className="h-4 w-4 text-[#1D4ED8]" />\n                  <span>COHORT CAPACITY</span>\n                </div>\n                {locked ? (\n                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-medium text-rose-700">\n                    <Lock className="h-3 w-3" /> Locked\n                  </span>\n                ) : (\n                  <span className="editorial-badge-warning px-2.5 py-0.5 rounded-full text-xs font-semibold">\n                    Closing soon\n                  </span>\n                )}\n              </div>\n\n              <div className="mt-3 flex items-baseline gap-2">\n                <span className="font-serif text-3xl font-bold text-[#151C2E]">{seatsLeft}</span>\n                <span className="text-xs text-[#5B6472]">of {seatsCap} seats remaining</span>\n              </div>\n\n              {/* Urgency Amber-Orange Gradient Bar */}\n              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">\n                <div\n                  className={`h-full rounded-full transition-all duration-700 ${\n                    locked ? "bg-rose-600" : "editorial-urgency-bar"\n                  }`}\n                  style={{ width: `${fillPct}%` }}\n                />\n              </div>\n\n              <p className="mt-3 text-xs text-[#5B6472] leading-relaxed">\n                {locked\n                  ? `All ${seatsCap} seats are taken. Join the waitlist for the upcoming batch.`\n                  : `${seatsTaken} confirmed enrolments. Only ${seatsLeft} seats left before batch caps.`}\n              </p>\n            </div>\n\n            {locked ? (\n              <Link\n                to="/waitlist"\n                className="editorial-btn-blue text-xs font-bold h-11 w-full flex items-center justify-center gap-2 text-white"\n              >\n                <span>Join Cohort Waitlist</span>\n                <MessageCircle className="h-4 w-4" />\n              </Link>\n            ) : (\n              <Link\n                to="/apply"\n                className="editorial-btn-blue text-xs font-bold h-11 w-full flex items-center justify-center gap-2 text-white"\n              >\n                <span>Apply for this cohort</span>\n                <ArrowRight className="h-4 w-4" />\n              </Link>\n            )}\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_34 = 'import { NEXT_COHORT } from "./constants";\nimport { WhatsAppLink } from "@/components/common/WhatsAppLink";\nimport { MessageCircle, Calendar } from "lucide-react";\n\nexport function LiveBar() {\n  return (\n    <div className="tone-dark relative z-30 border-b border-slate-200/5 bg-surface-raised/90 backdrop-blur">\n      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-meta font-medium text-slate-100/70 sm:px-6">\n        <span className="inline-flex items-center gap-2">\n          <Calendar className="h-3 w-3 text-primary-glow" />\n          Next cohort: <span className="text-slate-50">{NEXT_COHORT.label}</span> · Starts{" "}\n          {NEXT_COHORT.startsLabel}\n        </span>\n        <span className="hidden h-3 w-px bg-slate-50/15 sm:block" />\n        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-glow/10 px-2.5 py-0.5 text-eyebrow ring-1 ring-accent-glow/30">\n          Applications open\n        </span>\n        <span className="hidden h-3 w-px bg-slate-50/15 sm:block" />\n        <WhatsAppLink\n          source="live_bar"\n          message="Hi Arzon. I want to know more about the upcoming cohort."\n          className="inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-2.5 py-0.5 text-eyebrow hover:bg-accent-glow/15"\n        >\n          <MessageCircle className="h-3 w-3" /> WhatsApp counsellor\n        </WhatsAppLink>\n      </div>\n    </div>\n  );\n}\n';
const __vite_glob_0_35 = 'import { useState } from "react";\nimport { SectionHeader } from "./SectionHeader";\nimport { Section } from "@/components/ui/Section";\nimport { Check } from "lucide-react";\n\nconst tracks = [\n  {\n    id: "mc",\n    label: "Medical Coding",\n    weeks: [\n      "Anatomy refresher · ICD-10-CM rules",\n      "CPT & HCPCS surgery sections",\n      "E/M coding · documentation gaps",\n      "Modifiers, NCCI edits, denials",\n      "Specialty coding: cardiology, ortho, OB-GYN",\n      "Risk adjustment · HCC mapping",\n      "Audit workflows · 95%+ accuracy lab",\n      "Capstone: 200-chart audit + report",\n    ],\n  },\n  {\n    id: "pv",\n    label: "Pharmacovigilance",\n    weeks: [\n      "Drug safety foundations · ICH-GVP",\n      "ICSR processing E2B(R3)",\n      "MedDRA coding workshop",\n      "Argus / ARISg simulation",\n      "Aggregate reports. PSUR/PBRER",\n      "Signal detection & risk minimisation",\n      "Audit & regulator inspections",\n      "Capstone: end-to-end ICSR set",\n    ],\n  },\n  {\n    id: "cdm",\n    label: "Clinical Data Management",\n    weeks: [\n      "GCP, CDISC SDTM intro",\n      "EDC build (Medidata-style)",\n      "CRF design & annotation",\n      "Edit checks, query lifecycle",\n      "Data validation, reconciliation",\n      "Database lock simulation",\n      "SAS basics for CDM",\n      "Capstone: study lock dossier",\n    ],\n  },\n  {\n    id: "ra",\n    label: "Regulatory Affairs",\n    weeks: [\n      "Global regulators map · ICH",\n      "CTD modules 1–5 deep dive",\n      "eCTD lifecycle & publishing",\n      "FDA INDs / NDAs walkthrough",\n      "CDSCO India submissions",\n      "Labelling, variations, renewals",\n      "Health authority correspondence",\n      "Capstone: dossier package",\n    ],\n  },\n];\n\nexport function LiveCurriculum() {\n  const [active, setActive] = useState(tracks[0].id);\n  const cur = tracks.find((t) => t.id === active)!;\n\n  return (\n    <Section id="curriculum" size="lg">\n      <SectionHeader\n        eyebrow="Live curriculum"\n        title={\n          <>\n            The exact <em className="italic-accent not-italic">12 weeks</em> we ship.\n          </>\n        }\n        sub="Each programme is 8 graded weeks + 4-week capstone internship. Tap a track to preview."\n      />\n\n      <div className="mt-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible">\n        {tracks.map((t) => (\n          <button\n            key={t.id}\n            onClick={() => setActive(t.id)}\n            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${\n              active === t.id\n                ? "border-primary bg-primary text-slate-50 shadow-[0_8px_22px_-10px_oklch(0.62_0.20_258/0.6)]"\n                : "border-slate-200/15 bg-slate-50/5 text-slate-100/75 hover:bg-slate-50/10"\n            }`}\n          >\n            {t.label}\n          </button>\n        ))}\n      </div>\n\n      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">\n        {cur.weeks.map((w, i) => (\n          <div key={i} className="card-light rounded-xl p-5 transition-all hover:-translate-y-0.5">\n            <p className="font-mono text-micro uppercase tracking-[0.22em] text-primary">\n              Week {i + 1}\n            </p>\n            <p className="mt-2 font-grotesk text-base font-bold text-ink">{w}</p>\n            <ul className="mt-3 space-y-1.5">\n              <li className="flex items-start gap-1.5 text-xs text-muted-foreground">\n                <Check className="mt-0.5 h-3 w-3 text-mint" /> Live mentor session\n              </li>\n              <li className="flex items-start gap-1.5 text-xs text-muted-foreground">\n                <Check className="mt-0.5 h-3 w-3 text-mint" /> Graded assignment\n              </li>\n              <li className="flex items-start gap-1.5 text-xs text-muted-foreground">\n                <Check className="mt-0.5 h-3 w-3 text-mint" /> Real-data lab\n              </li>\n            </ul>\n          </div>\n        ))}\n      </div>\n    </Section>\n  );\n}\n';
const __vite_glob_0_36 = `const partners = [
  "Apollo Hospitals",
  "Cognizant Healthcare",
  "Optum",
  "Accenture Life Sciences",
  "IQVIA",
  "Tata 1mg",
  "Practo",
  "Parexel",
  "ICON plc",
  "Syneos Health",
  "Wipro Health Plan",
  "Cipla",
  "Dr. Reddy's",
  "Biocon",
  "Novartis",
  "GE Healthcare",
];

export function LogoMarquee() {
  const items = [...partners, ...partners];
  return (
    <section
      aria-label="Hiring partners"
      className="relative border-y border-slate-200/5 bg-white/[0.02] py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center font-mono text-micro uppercase tracking-[0.28em] text-slate-100/60">
          Our students intern, code and consult at
        </p>
        <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div
            className="flex w-max gap-12 whitespace-nowrap"
            style={{ animation: "marquee 38s linear infinite" }}
          >
            {items.map((p, i) => (
              <span
                key={i}
                className="font-grotesk text-lg font-bold text-slate-100/80 transition-colors hover:text-slate-50"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`;
const __vite_glob_0_37 = 'import { Link } from "@tanstack/react-router";\nimport { ArrowRight, Users } from "lucide-react";\nimport { PRE_REGISTERED_LABEL, NEXT_COHORT } from "./constants";\n\n/**\n * Conversion strip placed between Pricing and FAQ.\n * Plain language, one job: turn readers into 3-min fit-test takers.\n */\nexport function MidPageReserveStrip() {\n  return (\n    <section className="px-4 py-8 sm:py-10">\n      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/[0.10] to-gold/[0.03] p-5 sm:p-7">\n        <div className="flex items-center gap-2">\n          <Users className="h-4 w-4 text-gold" />\n          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">\n            {PRE_REGISTERED_LABEL} students already locked in\n          </p>\n        </div>\n        <h3 className="mt-3 font-grotesk text-h3 font-bold leading-tight text-slate-50 sm:text-h2">\n          Not sure which programme? Take the 3-min fit test.\n        </h3>\n        <p className="mt-2 text-sm text-slate-100/75">\n          30 honest questions. One personalised result. Next batch starts {NEXT_COHORT.startsLabel}.\n        </p>\n        <Link\n          to="/career-engine"\n          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-gold-ink hover:bg-gold/90 sm:w-auto"\n        >\n          Start the fit test <ArrowRight className="h-4 w-4" />\n        </Link>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_38 = `import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { Target, Network, Compass, Handshake } from "lucide-react";
import valuesImg from "@/assets/proof/values-diagram.webp";

/**
 * Image #3, "Driven by purpose, grounded in impact" values diagram.
 * Slot: just before Urgency (FinalCTA), soft mission close.
 */
const pillars = [
  {
    icon: Target,
    title: "Students come first",
    body: "We build every batch around what gets you hired, not what looks good on a brochure.",
  },
  {
    icon: Network,
    title: "Real industry input",
    body: "Hiring managers help us update the syllabus every cohort. You learn what they're hiring for.",
  },
  {
    icon: Compass,
    title: "Open to every student",
    body: "Tier-3 college, B.Pharm 2nd year, gap year, none of it stops you here.",
  },
  {
    icon: Handshake,
    title: "We grow with colleges",
    body: "We don't compete with your college. We add the practical layer your degree leaves out.",
  },
];

export function MissionValuesBlock() {
  return (
    <Section id="mission" size="lg" tone="muted">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <SectionHeader
            align="left"
            eyebrow="What we believe"
            title={<>Four things we will not compromise on.</>}
            sub="If any of these slip, we pull the batch. It's why students trust us."
          />

          <ul className="mt-8 space-y-4">
            {pillars.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-glow ring-1 ring-primary/30">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-50">
                    <span className="font-mono text-micro text-slate-100/60">0{i + 1} ·</span>{" "}
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-slate-100/65">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop-only illustration */}
        <figure className="hidden overflow-hidden rounded-2xl border border-slate-200/10 bg-white/[0.03] ring-1 ring-white/5 md:block">
          <img
            src={valuesImg}
            alt="Arzon Global mission diagram. Student-First, Industry Integration, Equal Access, Collaboration Over Competition"
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </figure>
      </div>
    </Section>
  );
}
`;
const __vite_glob_0_39 = 'import { ShieldCheck, Building2, BadgeCheck, CalendarCheck } from "lucide-react";\nimport taskImg from "@/assets/proof/task-partnership.jpg";\n\n/**\n * Mobile-only above-the-fold trust card.\n * Shows the TASK photo, inauguration line, play button and three credential\n * badges in a tight strip, the things a sales rep wants the student to see\n * in the first 5 seconds.\n */\nexport function MobileHeroProofCard() {\n  return (\n    <div className="tone-dark md:hidden">\n      <div className="overflow-hidden rounded-2xl border border-slate-200/12 bg-white/[0.04]">\n        <div className="relative">\n          <img\n            src={taskImg}\n            alt="Photo triptych from the Arzon Global public launch — TASK (Telangana Academy for Skill and Knowledge) officials attending as chief guests, 30 July 2025, Hyderabad."\n            className="block h-44 w-full object-cover"\n            width={800}\n            height={176}\n            loading="eager"\n            fetchPriority="high"\n            decoding="async"\n          />\n          <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-slate-50 backdrop-blur">\n            <CalendarCheck className="h-3 w-3 text-gold" /> Launch · 30 Jul 2025\n          </div>\n        </div>\n        <div className="px-4 py-3">\n          <p className="text-caption font-semibold leading-tight text-slate-50">\n            TASK officials. Our launch. Hyderabad.\n          </p>\n          <p className="mt-0.5 text-micro text-slate-100/80">\n            Govt of Telangana skills body · 30 Jul 2025\n          </p>\n        </div>\n        <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-slate-200/10 bg-white/[0.02]">\n          {[\n            { icon: BadgeCheck, label: "ISO 9001" },\n            { icon: Building2, label: "MSME" },\n            { icon: ShieldCheck, label: "MCA" },\n          ].map(({ icon: Icon, label }) => (\n            <div\n              key={label}\n              className="flex flex-col items-center justify-center px-2 py-2.5 text-center"\n            >\n              <Icon className="h-3.5 w-3.5 text-primary-glow" />\n              <p className="mt-1 font-mono text-micro font-bold tracking-wider text-slate-100/85">\n                {label}\n              </p>\n            </div>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n}\n';
const __vite_glob_0_40 = 'import { Link } from "@tanstack/react-router";\nimport { ShieldCheck, Building2, Briefcase, ArrowUpRight } from "lucide-react";\n\n/**\n * Compact, centered trust row used directly under the mobile hero.\n * Three short legal-status badges sit on a single line; long-form proof\n * (Govt of Telangana partner, ETV feature) is summarised in a single\n * centered link below. Hidden on md+ where the desktop hero already shows\n * a richer card.\n */\nconst badges = [\n  { icon: ShieldCheck, label: "ISO 9001", hash: "iso" },\n  { icon: Building2, label: "MSME", hash: "msme" },\n  { icon: Briefcase, label: "MCA", hash: "mca" },\n];\n\nexport function MobileTrustStrip() {\n  return (\n    <div className="tone-dark md:hidden border-y border-slate-200/8 bg-white/[0.02]">\n      <div className="mx-auto max-w-md px-4 py-4 text-center">\n        <div className="flex flex-wrap items-center justify-center gap-2">\n          {badges.map(({ icon: Icon, label, hash }) => (\n            <Link\n              key={label}\n              to="/proof"\n              hash={hash}\n              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/12 bg-white/[0.04] px-3 py-1.5 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-100/85"\n            >\n              <Icon className="h-3 w-3 text-gold" />\n              {label}\n              <span className="opacity-60">✓</span>\n            </Link>\n          ))}\n        </div>\n        <Link\n          to="/proof"\n          className="mt-3 inline-flex items-center gap-1 text-micro font-semibold text-primary-glow"\n        >\n          Govt of Telangana partner · Featured on ETV\n          <ArrowUpRight className="h-3 w-3" />\n        </Link>\n      </div>\n    </div>\n  );\n}\n';
const __vite_glob_0_41 = 'import { useEffect, useState } from "react";\nimport { useLocation } from "@tanstack/react-router";\nimport { MessageCircle } from "lucide-react";\nimport { WhatsAppLink } from "@/components/common/WhatsAppLink";\n\n/**\n * Floating WhatsApp contact button, mobile only.\n * Sits above the StickyMobileCTA so visitors can reach a counsellor\n * with one tap, on every page, before they apply.\n *\n * - Hidden while the hero (#top) is in view so it never covers the headline.\n * - Hidden on flows where conversation would interrupt the task (apply, learn,\n *   dashboard, admin). The contact page already has WhatsApp surfaced inline.\n */\nexport function MobileWhatsAppFAB() {\n  const loc = useLocation();\n  const [visible, setVisible] = useState(false);\n  const [avoiding, setAvoiding] = useState(false);\n\n  useEffect(() => {\n    if (typeof window === "undefined") return;\n    const hero = document.getElementById("top");\n    if (!hero) {\n      setVisible(true);\n      return;\n    }\n    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {\n      threshold: 0,\n      rootMargin: "-40px 0px 0px 0px",\n    });\n    io.observe(hero);\n    return () => io.disconnect();\n  }, [loc.pathname]);\n\n  // Hide the bubble whenever a known "apply disclaimer" / fine-print block is on\n  // screen, so the FAB can never sit on top of legally important small text\n  // (especially tight 360px viewports where there\'s no room to dodge sideways).\n  useEffect(() => {\n    if (typeof window === "undefined") return;\n    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-fab-avoid]"));\n    if (targets.length === 0) {\n      setAvoiding(false);\n      return;\n    }\n    const seen = new Set<Element>();\n    const io = new IntersectionObserver(\n      (entries) => {\n        for (const e of entries) {\n          if (e.isIntersecting) seen.add(e.target);\n          else seen.delete(e.target);\n        }\n        setAvoiding(seen.size > 0);\n      },\n      { threshold: 0, rootMargin: "0px 0px -40px 0px" },\n    );\n    targets.forEach((t) => io.observe(t));\n    return () => io.disconnect();\n  }, [loc.pathname]);\n\n  const p = loc.pathname;\n  const hidden =\n    p.startsWith("/apply") ||\n    p.startsWith("/enrol") ||\n    p.startsWith("/learn/") ||\n    p.startsWith("/admin") ||\n    (p.startsWith("/courses/") && p !== "/courses") ||\n    p === "/dashboard" ||\n    p === "/contact";\n  if (hidden) return null;\n\n  // The sticky mobile CTA bar already exposes a WhatsApp shortcut as its\n  // secondary action on the SAME routes this FAB shows on. Stacking both\n  // forces users to dismiss two CTAs and clips bottom content on 360px\n  // viewports. The bar wins; we render the FAB only on routes where the\n  // bar is intentionally suppressed.\n  const stickyBarVisibleHere =\n    !(p.startsWith("/courses/") && p !== "/courses") &&\n    !p.startsWith("/apply") &&\n    !p.startsWith("/enrol") &&\n    !p.startsWith("/career-engine") &&\n    !p.startsWith("/internships") &&\n    !p.startsWith("/learn/") &&\n    p !== "/dashboard" &&\n    p !== "/verify";\n  if (stickyBarVisibleHere) return null;\n\n  const shown = visible && !avoiding;\n\n  return (\n    <WhatsAppLink\n      source="mobile_fab"\n      message="Hi Arzon, I have a quick question before applying."\n      aria-label="Chat with an Arzon counsellor on WhatsApp"\n      data-event="wa_fab_click"\n      data-testid="mobile-sticky-cta"\n      className={`fixed right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-nav-blue text-slate-50 shadow-[0_10px_30px_-6px_rgba(59,111,160,0.55)] ring-1 ring-white/15 transition-all duration-300 md:hidden sm:h-14 sm:w-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${\n        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"\n      }`}\n      style={{ bottom: "calc(env(safe-area-inset-bottom) + 84px)" }}\n    >\n      <span\n        aria-hidden\n        className="absolute inset-0 rounded-full bg-nav-blue opacity-60 motion-safe:animate-ping"\n      />\n      <MessageCircle className="relative h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />\n      <span className="sr-only">WhatsApp counsellor</span>\n    </WhatsAppLink>\n  );\n}\n';
const __vite_glob_0_42 = 'import { useReducedMotion } from "@/hooks/useReducedMotion";\nimport { Sparkles, Pause } from "lucide-react";\n\n/**\n * User-facing toggle to disable motion globally. Persists across sessions\n * and overrides system `prefers-reduced-motion` either way.\n */\nexport function MotionToggle({ className = "" }: { className?: string }) {\n  const { reduced, toggle } = useReducedMotion();\n  return (\n    <button\n      type="button"\n      onClick={toggle}\n      aria-pressed={reduced}\n      aria-label={reduced ? "Reduced motion is on" : "Reduce motion"}\n      title={reduced ? "Animations are off, click to enable" : "Animations are on, click to reduce"}\n      className={\n        "inline-flex items-center gap-2 rounded-full border border-slate-200/15 bg-slate-50/5 px-3 py-1.5 text-micro font-medium text-slate-100/75 hover:bg-slate-50/10 hover:text-slate-50 transition-colors " +\n        className\n      }\n    >\n      {reduced ? <Pause className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}\n      <span>{reduced ? "Reduced motion: On" : "Reduce motion"}</span>\n    </button>\n  );\n}\n';
const __vite_glob_0_43 = 'import { Link } from "@tanstack/react-router";\nimport { ArrowRight, ExternalLink } from "lucide-react";\nimport { Section } from "@/components/ui/Section";\nimport { SectionHeader } from "./SectionHeader";\nimport { LINKS, PROOF } from "./constants";\nimport { EtvVideoEmbed } from "./EtvVideoEmbed";\n\n/**\n * National-media coverage. ETV Telangana feature on our founder\n * Srikanth Sinha, aired the same day as our public launch event.\n * Lazy iframe: only mounted after user clicks the poster, so the\n * landing page LCP stays clean.\n */\nexport function NationalMediaBlock() {\n  const m = LINKS.mediaETV;\n\n  return (\n    <Section id="national-media" size="md" tone="muted">\n      <SectionHeader\n        align="center"\n        eyebrow={`As featured on ${m.outlet}`}\n        title={\n          <>\n            On <em className="not-italic text-primary-glow">regional television</em>, same week as\n            our public launch.\n          </>\n        }\n        sub={`${m.outlet} aired a feature on our founder Srikanth Sinha on ${m.date}, the same day as our public launch event in Hyderabad. Coverage on the public record, not a stage prop.`}\n      />\n\n      <div className="mt-10 grid items-start gap-6 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-10">\n        <figure className="overflow-hidden rounded-2xl border border-slate-200/10 bg-[#0a0c10] ring-1 ring-white/5">\n          <EtvVideoEmbed variant="section" />\n        </figure>\n\n        <div className="space-y-4">\n          <div className="rounded-2xl border border-slate-200/10 bg-white/[0.03] p-5">\n            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">\n              On the public record\n            </p>\n            <p className="mt-2 font-grotesk text-base font-semibold text-slate-50">{m.title}</p>\n            <ul className="mt-3 space-y-1.5 text-sm text-slate-100/70">\n              <li>\n                · Outlet: <span className="text-slate-50">{m.outlet}</span>\n              </li>\n              <li>\n                · Aired: <span className="text-slate-50">{m.date}</span>\n              </li>\n              <li>\n                · Same day as:{" "}\n                <span className="text-slate-50">{PROOF.inaugurationBody} inauguration</span>\n              </li>\n            </ul>\n            <a\n              href={m.watch}\n              target="_blank"\n              rel="noopener noreferrer"\n              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-glow hover:underline"\n            >\n              Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />\n            </a>\n          </div>\n\n          <Link\n            to="/proof"\n            hash="media"\n            className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-slate-200/10 bg-white/[0.02] p-4 text-left transition hover:border-primary/40 hover:bg-white/[0.05]"\n          >\n            <div>\n              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-slate-100/80">\n                Want the rest of the receipts?\n              </p>\n              <p className="mt-1 text-sm font-semibold text-slate-50">\n                See more proof, launch photos, ISO, MCA, MSME and verified alumni.\n              </p>\n            </div>\n            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-glow ring-1 ring-primary/30 transition group-hover:bg-primary/25">\n              <ArrowRight className="h-4 w-4" />\n            </span>\n          </Link>\n        </div>\n      </div>\n    </Section>\n  );\n}\n';
const __vite_glob_0_44 = 'import { memo, useEffect, useState } from "react";\nimport { Link } from "@tanstack/react-router";\nimport { Menu, MessageCircle, ArrowRight } from "lucide-react";\nimport arzonIcon from "@/assets/arzon-icon.webp";\nimport { WhatsAppLink } from "@/components/common/WhatsAppLink";\nimport { ScrollProgress } from "./ScrollProgress";\nimport { AuthBadge } from "./AuthBadge";\nimport { ThemeToggle } from "@/components/common/ThemeToggle";\nimport { getScrollRoot } from "@/lib/scroll";\nimport { track } from "@/lib/track";\nimport { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";\n\nconst links: Array<{ label: string; to: string; hash?: string }> = [\n  { label: "Learn", to: "/courses" },\n  { label: "Assess", to: "/career-engine/start" },\n  { label: "Why Arzon", to: "/why-arzon" },\n];\n\nfunction NavInner() {\n  const [scrolled, setScrolled] = useState(false);\n  const [open, setOpen] = useState(false);\n\n  useEffect(() => {\n    const root = getScrollRoot();\n    const onScroll = () => setScrolled((root ? root.scrollTop : window.scrollY) > 8);\n    onScroll();\n    (root ?? window).addEventListener("scroll", onScroll, { passive: true });\n    return () => (root ?? window).removeEventListener("scroll", onScroll);\n  }, []);\n\n  return (\n    <header\n      className={`relative z-40 w-full transition-all border-b border-slate-200/80 bg-white/95 backdrop-blur-md ${scrolled ? "shadow-md" : ""}`}\n      style={{ paddingTop: "env(safe-area-inset-top)" }}\n    >\n      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">\n        <Link\n          to="/"\n          aria-label="Arzon Global — go to home"\n          className="flex shrink-0 items-center gap-2.5"\n        >\n          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#0F172A] ring-1 ring-slate-200">\n            <img\n              src={arzonIcon}\n              alt=""\n              width={32}\n              height={32}\n              loading="eager"\n              decoding="async"\n              className="h-full w-full object-contain"\n            />\n          </div>\n          <div className="leading-none">\n            <p className="font-mono text-xs font-extrabold tracking-[0.24em] text-[#0F172A]">\n              ARZON\n            </p>\n            <p className="hidden xs:block font-mono text-[9px] font-bold tracking-[0.36em] text-[#64748B]">\n              GLOBAL\n            </p>\n          </div>\n        </Link>\n\n        <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex xl:gap-8">\n          {links.map((l) => (\n            <Link\n              key={l.label}\n              to={l.to}\n              hash={l.hash}\n              preload="intent"\n              activeOptions={{ exact: l.to === "/" && !l.hash }}\n              activeProps={{\n                className: "text-[#2563EB] font-extrabold after:scale-x-100",\n              }}\n              className="relative whitespace-nowrap text-sm font-bold text-[#334155] transition-colors duration-200 hover:text-[#2563EB] after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-[#2563EB] after:transition-transform after:duration-300 hover:after:scale-x-100"\n            >\n              {l.label}\n            </Link>\n          ))}\n        </nav>\n\n        <div className="hidden shrink-0 items-center gap-3.5 xl:flex">\n          <ThemeToggle />\n          <Link\n            to="/dashboard"\n            preload="intent"\n            activeProps={{ className: "text-[#2563EB] font-bold" }}\n            className="whitespace-nowrap text-sm font-bold text-[#334155] hover:text-[#2563EB]"\n          >\n            Dashboard\n          </Link>\n          <AuthBadge />\n          <WhatsAppLink\n            source="nav_desktop"\n            message="Hi Arzon, quick question about the programme."\n            className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl border border-emerald-300 bg-emerald-50 px-4 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"\n          >\n            <MessageCircle className="mr-2 h-4 w-4 text-emerald-700" /> WhatsApp Support\n          </WhatsAppLink>\n          <Link\n            to="/apply"\n            preload="intent"\n            data-apply-surface="nav-desktop"\n            data-testid="nav-apply-cta"\n            className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"\n          >\n            <span className="text-white font-bold">Apply</span>\n          </Link>\n        </div>\n\n        <Sheet\n          open={open}\n          onOpenChange={(next) => {\n            setOpen(next);\n            track(next ? "mobile_nav_opened" : "mobile_nav_closed", {\n              props: { source: "hamburger" },\n            });\n          }}\n        >\n          <SheetTrigger asChild>\n            <button\n              type="button"\n              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-[#0F172A] hover:bg-slate-100 transition-colors xl:hidden"\n              aria-label={open ? "Close menu" : "Open menu"}\n              aria-haspopup="dialog"\n              aria-expanded={open}\n              data-testid="nav-menu-button"\n            >\n              <Menu className="h-6 w-6 text-[#0F172A]" />\n            </button>\n          </SheetTrigger>\n          <SheetContent\n            side="right"\n            className="bg-white w-[86vw] max-w-sm p-0 data-[state=open]:duration-200 data-[state=closed]:duration-150 border-l border-slate-200"\n          >\n            <SheetHeader className="border-b border-slate-200 px-5 py-4 text-left bg-slate-50">\n              <div className="flex items-center justify-between gap-3">\n                <SheetTitle className="font-mono text-xs font-extrabold tracking-[0.28em] text-[#0F172A]">\n                  ARZON GLOBAL\n                </SheetTitle>\n                <ThemeToggle />\n              </div>\n            </SheetHeader>\n            <nav className="flex flex-col px-3 py-3">\n              <p className="px-3 pb-1 font-mono text-[10px] uppercase font-bold tracking-[0.18em] text-[#64748B]">\n                Browse\n              </p>\n              {links.map((l) => (\n                <Link\n                  key={l.label}\n                  to={l.to}\n                  hash={l.hash}\n                  preload="intent"\n                  onClick={() => setOpen(false)}\n                  activeProps={{ className: "bg-slate-100 text-[#2563EB] font-bold" }}\n                  className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"\n                >\n                  {l.label}\n                </Link>\n              ))}\n              <Link\n                to="/cohorts"\n                preload="intent"\n                onClick={() => setOpen(false)}\n                className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"\n              >\n                Cohorts\n              </Link>\n              <Link\n                to="/contact"\n                preload="intent"\n                onClick={() => setOpen(false)}\n                className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"\n              >\n                Contact\n              </Link>\n              <Link\n                to="/dashboard"\n                preload="intent"\n                onClick={() => setOpen(false)}\n                className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"\n              >\n                Dashboard\n              </Link>\n              <button\n                type="button"\n                onClick={() => setOpen(false)}\n                className="w-full text-left"\n                aria-label="Close menu"\n              >\n                <AuthBadge variant="row" />\n              </button>\n            </nav>\n            <div className="mt-1 flex flex-col gap-2 border-t border-slate-200 px-4 py-4">\n              <Link\n                to="/apply"\n                preload="intent"\n                data-apply-surface="nav-mobile-sheet"\n                onClick={() => setOpen(false)}\n                className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white hover:bg-[#1d4ed8] shadow-md shadow-blue-600/20"\n              >\n                <span className="text-white font-bold">Start your application</span>\n                <ArrowRight className="h-4 w-4 text-white" />\n              </Link>\n              <WhatsAppLink\n                source="nav_mobile"\n                message="Hi Arzon, quick question about the programme."\n                onClick={() => setOpen(false)}\n                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-sm font-bold text-emerald-800 hover:bg-emerald-100"\n              >\n                <MessageCircle className="h-4 w-4 text-emerald-700" /> Talk on WhatsApp\n              </WhatsAppLink>\n            </div>\n          </SheetContent>\n        </Sheet>\n      </div>\n\n      <ScrollProgress />\n    </header>\n  );\n}\n\nexport const Nav = memo(NavInner);\n';
const __vite_glob_0_45 = 'import { createContext, useContext, useEffect, useMemo, useState } from "react";\n\nexport type SectionItem = { id: string; label: string };\n\ntype NavSectionsContextValue = {\n  sections: SectionItem[];\n  setSections: (sections: SectionItem[]) => void;\n};\n\nconst NavSectionsContext = createContext<NavSectionsContextValue | null>(null);\n\nexport function NavSectionsProvider({ children }: { children: React.ReactNode }) {\n  const [sections, setSections] = useState<SectionItem[]>([]);\n  const value = useMemo(() => ({ sections, setSections }), [sections]);\n\n  return <NavSectionsContext.Provider value={value}>{children}</NavSectionsContext.Provider>;\n}\n\nexport function useNavSectionsContext() {\n  const value = useContext(NavSectionsContext);\n  if (!value) return { sections: [] as SectionItem[], setSections: () => undefined };\n  return value;\n}\n\nexport function useNavSections(sections: SectionItem[]) {\n  const { setSections } = useNavSectionsContext();\n\n  useEffect(() => {\n    setSections(sections);\n    return () => setSections([]);\n  }, [sections, setSections]);\n}\n';
const __vite_glob_0_46 = 'import { Link } from "@tanstack/react-router";\nimport { ArrowRight } from "lucide-react";\n\ninterface CTA {\n  label: string;\n  to: string;\n  external?: boolean;\n  search?: Record<string, string | number | undefined>;\n}\n\nexport function PageCTA({\n  eyebrow = "Next step",\n  title,\n  subtitle,\n  primary,\n  secondary,\n}: {\n  eyebrow?: string;\n  title: string;\n  subtitle?: string;\n  primary: CTA;\n  secondary?: CTA;\n}) {\n  return (\n    <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">\n      <div className="tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">\n        <div\n          className="pointer-events-none absolute inset-0"\n          style={{ background: "var(--gradient-glow)" }}\n        />\n        <p className="relative font-mono text-micro font-semibold uppercase tracking-[0.28em] text-[#9EC4FF]">\n          {eyebrow}\n        </p>\n        <h2 className="h-section mt-3 text-slate-50">{title}</h2>\n        {subtitle && (\n          <p className="relative mx-auto mt-3 max-w-xl text-body-sm leading-relaxed text-slate-100/85">\n            {subtitle}\n          </p>\n        )}\n        <div className="relative mt-6 flex flex-wrap justify-center gap-3">\n          {primary.external ? (\n            <a\n              href={primary.to}\n              target="_blank"\n              rel="noopener noreferrer"\n              className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"\n            >\n              {primary.label} <ArrowRight className="ml-1 h-4 w-4" />\n            </a>\n          ) : (\n            <Link\n              to={primary.to as never}\n              search={primary.search as never}\n              className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"\n            >\n              {primary.label} <ArrowRight className="ml-1 h-4 w-4" />\n            </Link>\n          )}\n          {secondary &&\n            (secondary.external ? (\n              <a\n                href={secondary.to}\n                target="_blank"\n                rel="noopener noreferrer"\n                className="inline-flex h-12 items-center rounded-md border border-slate-200/40 bg-slate-50/10 px-6 text-sm font-bold text-slate-50 transition-colors hover:border-slate-200/70 hover:bg-slate-50/20"\n              >\n                {secondary.label}\n              </a>\n            ) : (\n              <Link\n                to={secondary.to as never}\n                search={secondary.search as never}\n                className="inline-flex h-12 items-center rounded-md border border-slate-200/40 bg-slate-50/10 px-6 text-sm font-bold text-slate-50 transition-colors hover:border-slate-200/70 hover:bg-slate-50/20"\n              >\n                {secondary.label}\n              </Link>\n            ))}\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_47 = 'import { useState } from "react";\nimport { Link } from "@tanstack/react-router";\nimport { Section } from "@/components/ui/Section";\nimport {\n  MessageCircle,\n  FileDown,\n  ShieldCheck,\n  Building2,\n  FileBadge2,\n  IndianRupee,\n} from "lucide-react";\nimport { WhatsAppLink } from "@/components/common/WhatsAppLink";\n\ntype Lang = "en" | "hi" | "te";\n\nconst COPY: Record<\n  Lang,\n  {\n    eyebrow: string;\n    title: string;\n    intro: string;\n    points: { icon: typeof ShieldCheck; title: string; body: string }[];\n    ctaTalk: string;\n    ctaBrochure: string;\n    whatsappMsg: string;\n  }\n> = {\n  en: {\n    eyebrow: "For parents · 90 seconds",\n    title: "Is this institute real, and is the salary real?",\n    intro: "Four things to know. Each verifiable in the footer.",\n    points: [\n      {\n        icon: Building2,\n        title: "Registered Pvt. Ltd. company.",\n        body: "MCA CIN published in the footer.",\n      },\n      {\n        icon: ShieldCheck,\n        title: "Real compliance registrations.",\n        body: "ISO 9001 · MSME · MCA. All verifiable.",\n      },\n      {\n        icon: IndianRupee,\n        title: "Salaries are industry-standard.",\n        body: "₹3–7 LPA first job. We publish X/Y, not percentages.",\n      },\n      {\n        icon: FileBadge2,\n        title: "Break-even in ~28 days.",\n        body: "₹24,999 fee ÷ ₹26,667 first-month salary. Everything after is upside.",\n      },\n    ],\n    ctaTalk: "Talk to a counsellor on WhatsApp",\n    ctaBrochure: "Download parent brochure (PDF)",\n    whatsappMsg:\n      "Namaste. I am a parent. I want to understand the programme before my child applies.",\n  },\n  hi: {\n    eyebrow: "अभिभावकों के लिए · 90 सेकंड",\n    title: "क्या यह संस्था असली है, और सैलरी असली है?",\n    intro: "चार बातें जानिए। हर एक फुटर में जांच लीजिए।",\n    points: [\n      { icon: Building2, title: "रजिस्टर्ड Pvt. Ltd. कंपनी।", body: "MCA CIN फुटर में।" },\n      {\n        icon: ShieldCheck,\n        title: "असली अनुपालन पंजीकरण।",\n        body: "ISO 9001 · MSME · MCA। सब जांचने योग्य।",\n      },\n      {\n        icon: IndianRupee,\n        title: "सैलरी इंडस्ट्री-स्टैंडर्ड है।",\n        body: "पहली नौकरी ₹3–7 लाख। प्रतिशत नहीं, असली X/Y।",\n      },\n      {\n        icon: FileBadge2,\n        title: "लगभग 28 दिनों में ब्रेक-ईवन।",\n        body: "₹24,999 फीस ÷ ₹26,667 पहले महीने की सैलरी। उसके बाद सब फायदा।",\n      },\n    ],\n    ctaTalk: "WhatsApp पर काउंसलर से बात करें",\n    ctaBrochure: "अभिभावक ब्रोशर डाउनलोड करें (PDF)",\n    whatsappMsg: "नमस्ते, मैं एक अभिभावक हूँ। मेरे बच्चे के आवेदन से पहले मुझे प्रोग्राम समझना है।",\n  },\n  te: {\n    eyebrow: "తల్లిదండ్రుల కోసం · 90 సెకన్లు",\n    title: "ఈ సంస్థ నిజమేనా, జీతం నిజమేనా?",\n    intro: "నాలుగు విషయాలు. ప్రతి ఒకటి ఫుటర్‌లో ధృవీకరించండి.",\n    points: [\n      { icon: Building2, title: "నమోదైన Pvt. Ltd. కంపెనీ.", body: "MCA CIN ఫుటర్‌లో." },\n      {\n        icon: ShieldCheck,\n        title: "అసలైన కంప్లయన్స్ నమోదులు.",\n        body: "ISO 9001 · MSME · MCA. అన్నీ ధృవీకరించగలవి.",\n      },\n      {\n        icon: IndianRupee,\n        title: "జీతాలు ఇండస్ట్రీ-స్టాండర్డ్.",\n        body: "మొదటి ఉద్యోగం ₹3–7 LPA. శాతాలు కాదు, X/Y.",\n      },\n      {\n        icon: FileBadge2,\n        title: "7 రోజుల రీఫండ్. వ్రాతపూర్వకం.",\n        body: "మొదటి వారం 100%. తర్వాత ప్రో-రేటెడ్.",\n      },\n    ],\n    ctaTalk: "WhatsApp లో కౌన్సిలర్‌తో మాట్లాడండి",\n    ctaBrochure: "తల్లిదండ్రుల బ్రోచర్ డౌన్‌లోడ్ చేయండి (PDF)",\n    whatsappMsg:\n      "నమస్తే, నేను తల్లిదండ్రిని. నా పిల్లవాడు దరఖాస్తు చేయడానికి ముందు ప్రోగ్రామ్ అర్థం చేసుకోవాలనుకుంటున్నాను.",\n  },\n};\n\nconst LANG_LABELS: Record<Lang, string> = { en: "English", hi: "हिंदी", te: "తెలుగు" };\n\nexport function ParentSection() {\n  const [lang, setLang] = useState<Lang>("en");\n  const t = COPY[lang];\n\n  return (\n    <Section size="md" containerSize="md">\n      <div className="overflow-hidden rounded-3xl border border-slate-200/10 bg-gradient-to-br from-[#0F1A30] to-[#0B1325] p-6 sm:p-10">\n        <div className="flex flex-wrap items-start justify-between gap-4">\n          <div>\n            <p className="eyebrow" style={{ color: "var(--primary-glow)" }}>\n              {t.eyebrow}\n            </p>\n            <h2 className="h-section mt-3 max-w-2xl">{t.title}</h2>\n          </div>\n\n          <div className="inline-flex rounded-full border border-slate-200/15 bg-white/[0.04] p-1">\n            {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (\n              <button\n                key={l}\n                onClick={() => setLang(l)}\n                className={`rounded-full px-3 py-1 text-meta font-semibold transition ${\n                  lang === l ? "bg-gold text-gold-ink" : "text-slate-100/65 hover:text-slate-50"\n                }`}\n              >\n                {LANG_LABELS[l]}\n              </button>\n            ))}\n          </div>\n        </div>\n\n        <p className="body-lg mt-5 max-w-2xl">{t.intro}</p>\n\n        <div className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2">\n          {t.points.map(({ icon: Icon, title, body }) => (\n            <div key={title} className="surface-card">\n              <div className="flex items-center gap-2.5">\n                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary-glow ring-1 ring-primary/30">\n                  <Icon className="h-4 w-4" />\n                </span>\n                <p className="text-sm font-semibold text-slate-50">{title}</p>\n              </div>\n              <p className="mt-3 text-sm text-slate-100/70">{body}</p>\n            </div>\n          ))}\n        </div>\n\n        <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">\n          <WhatsAppLink\n            source="parent_section_talk"\n            message={t.whatsappMsg}\n            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-glow/90 px-5 text-sm font-semibold text-slate-50 transition hover:bg-sky-500"\n          >\n            <MessageCircle className="h-4 w-4" /> {t.ctaTalk}\n          </WhatsAppLink>\n          <WhatsAppLink\n            source="parent_section_brochure"\n            message="Namaste. Please send me the parent brochure (PDF) for the Arzon Global programme."\n            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200/20 bg-slate-50/5 px-5 text-sm font-semibold text-slate-50 backdrop-blur transition hover:bg-slate-50/10"\n          >\n            <FileDown className="h-4 w-4 text-primary-glow" /> {t.ctaBrochure}\n          </WhatsAppLink>\n          <Link\n            to="/proof"\n            className="inline-flex h-12 items-center justify-center gap-2 px-2 text-sm font-semibold text-gold/90 hover:text-gold sm:justify-start"\n          >\n            See the Proof Vault →\n          </Link>\n        </div>\n      </div>\n    </Section>\n  );\n}\n';
const __vite_glob_0_48 = 'import { Link } from "@tanstack/react-router";\nimport {\n  CheckCircle2,\n  ShieldCheck,\n  BookOpen,\n  Crown,\n  ArrowRight,\n  Sparkles,\n  Zap,\n  Star,\n} from "lucide-react";\nimport { motion } from "framer-motion";\nimport { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";\n\ninterface TierDetail {\n  badge: string;\n  badgeBg: string;\n  badgeText: string;\n  badgeBorder: string;\n  icon: any;\n  iconColor: string;\n  tagline: string;\n  cardBg: string;\n  cardBorder: string;\n  cardShadow: string;\n  titleColor: string;\n  taglineColor: string;\n  feeLabelColor: string;\n  priceColor: string;\n  savingsBg: string;\n  savingsText: string;\n  priceBoxBg: string;\n  priceBoxBorder: string;\n  uniqueHookBg: string;\n  uniqueHookBorder: string;\n  uniqueHookText: string;\n  deliverablesHeaderColor: string;\n  textColor: string;\n  checkIconColor: string;\n  btnBg: string;\n  btnText: string;\n  btnHover: string;\n  btnShadow: string;\n  uniqueHook: string;\n  perks: string[];\n  cta: string;\n}\n\nconst TIERS_CONFIG: Record<TierId, TierDetail> = {\n  essential: {\n    badge: "Self-Paced Core",\n    badgeBg: "bg-slate-800/80",\n    badgeText: "text-slate-200 font-semibold",\n    badgeBorder: "border-slate-700",\n    icon: BookOpen,\n    iconColor: "text-slate-300",\n    tagline: "For self-starters who want core recorded curriculum.",\n    cardBg: "bg-[#0D1527]",\n    cardBorder: "border-slate-800 hover:border-slate-700",\n    cardShadow: "shadow-xl hover:shadow-2xl",\n    titleColor: "text-white",\n    taglineColor: "text-slate-300",\n    feeLabelColor: "text-slate-400",\n    priceColor: "text-white",\n    savingsBg: "bg-slate-800",\n    savingsText: "text-slate-200 border border-slate-700",\n    priceBoxBg: "bg-[#111A30]",\n    priceBoxBorder: "border-slate-800",\n    uniqueHookBg: "bg-slate-800/50",\n    uniqueHookBorder: "border-slate-700/80",\n    uniqueHookText: "text-slate-200",\n    deliverablesHeaderColor: "text-slate-400",\n    textColor: "text-white",\n    checkIconColor: "text-slate-400",\n    btnBg: "bg-slate-800",\n    btnText: "text-white",\n    btnHover: "hover:bg-slate-700",\n    btnShadow: "shadow-md hover:shadow-lg",\n    uniqueHook: "12-Month Access to Video Modules & Codebook Reference Labs",\n    perks: [\n      "8-week recorded video curriculum",\n      "Course completion certificate",\n      "Community cohort group access",\n      "Self-paced learning portal",\n    ],\n    cta: "Select Essential Tier",\n  },\n  career: {\n    badge: "⭐ MOST POPULAR · 87% ENROL HERE",\n    badgeBg: "bg-gradient-to-r from-amber-400 to-amber-500",\n    badgeText: "text-slate-950 font-bold",\n    badgeBorder: "border-amber-400",\n    icon: Star,\n    iconColor: "text-amber-400",\n    tagline: "For graduates seeking live mentor instruction and placement prep.",\n    cardBg: "bg-[#0B132B]",\n    cardBorder: "border-amber-400/80 ring-2 ring-amber-400/40",\n    cardShadow: "shadow-[0_20px_50px_rgba(29,78,216,0.3)] scale-[1.02]",\n    titleColor: "text-white",\n    taglineColor: "text-slate-300",\n    feeLabelColor: "text-amber-300/80",\n    priceColor: "text-white",\n    savingsBg: "bg-emerald-500/20",\n    savingsText: "text-emerald-300 border border-emerald-400/40 font-bold",\n    priceBoxBg: "bg-[#142247]",\n    priceBoxBorder: "border-amber-400/40",\n    uniqueHookBg: "bg-amber-500/15",\n    uniqueHookBorder: "border-amber-400/40",\n    uniqueHookText: "text-amber-200 font-semibold",\n    deliverablesHeaderColor: "text-amber-300/80",\n    textColor: "text-white",\n    checkIconColor: "text-amber-400",\n    btnBg: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700",\n    btnText: "text-white",\n    btnHover: "hover:from-blue-500 hover:to-indigo-600",\n    btnShadow: "shadow-xl shadow-blue-900/50",\n    uniqueHook: "⚡ Direct Access to 120+ Hiring Partners (Optum, Omega, Access)",\n    perks: [\n      "Everything in Essential Tier",\n      "Live mentor sessions (8 weeks)",\n      "Real-data labs + capstone projects",\n      "Verifiable internship certificate",\n      "Job placement support + 1:1 mock interviews",\n    ],\n    cta: "Select Career Tier (Recommended)",\n  },\n  elite: {\n    badge: "👑 DIRECT RECRUITER SLA · INTERVIEW GUARANTEE",\n    badgeBg: "bg-emerald-500/20",\n    badgeText: "text-emerald-300 font-bold",\n    badgeBorder: "border-emerald-400/40",\n    icon: Crown,\n    iconColor: "text-emerald-400",\n    tagline: "For candidates wanting 1:1 mentor pairing and interview guarantees.",\n    cardBg: "bg-[#041D17]",\n    cardBorder: "border-emerald-500/70",\n    cardShadow: "shadow-[0_20px_50px_rgba(16,185,129,0.2)]",\n    titleColor: "text-white",\n    taglineColor: "text-emerald-100/90",\n    feeLabelColor: "text-emerald-300/80",\n    priceColor: "text-white",\n    savingsBg: "bg-emerald-500/20",\n    savingsText: "text-emerald-300 border border-emerald-400/40 font-bold",\n    priceBoxBg: "bg-[#0A2D24]",\n    priceBoxBorder: "border-emerald-500/40",\n    uniqueHookBg: "bg-emerald-500/15",\n    uniqueHookBorder: "border-emerald-400/40",\n    uniqueHookText: "text-emerald-200 font-semibold",\n    deliverablesHeaderColor: "text-emerald-300/80",\n    textColor: "text-white",\n    checkIconColor: "text-emerald-400",\n    btnBg: "bg-emerald-600",\n    btnText: "text-white",\n    btnHover: "hover:bg-emerald-500",\n    btnShadow: "shadow-xl shadow-emerald-950/60",\n    uniqueHook: "🛡️ Dedicated 1:1 Senior Mentor + 3 Guaranteed Hiring Manager Interviews",\n    perks: [\n      "Everything in Career Tier",\n      "1:1 dedicated mentor pairing",\n      "3 guaranteed hiring partner interviews",\n      "Custom ATS resume & LinkedIn rewrite",\n    ],\n    cta: "Select Elite VIP Tier",\n  },\n};\n\nexport function Pricing() {\n  const containerVariants = {\n    hidden: { opacity: 0 },\n    show: {\n      opacity: 1,\n      transition: { staggerChildren: 0.15, delayChildren: 0.1 },\n    },\n  };\n\n  const cardVariants = {\n    hidden: { opacity: 0, y: 30 },\n    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },\n  };\n\n  return (\n    <section id="pricing" className="editorial-page-bg py-16 px-4 sm:px-8 lg:px-12">\n      <div className="mx-auto max-w-[1500px] space-y-12">\n        {/* Header */}\n        <motion.div\n          initial={{ opacity: 0, y: 20 }}\n          whileInView={{ opacity: 1, y: 0 }}\n          viewport={{ once: true, margin: "-50px" }}\n          transition={{ duration: 0.5 }}\n          className="text-center space-y-3 max-w-3xl mx-auto"\n        >\n          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800">\n            <Sparkles className="h-3.5 w-3.5 text-amber-600" />\n            <span>TRANSPARENT INVESTMENT STRUCTURE</span>\n          </div>\n          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight">\n            Select your <span className="italic text-[#8A6D1F]">workforce readiness tier</span>\n          </h2>\n          <p className="text-sm text-[#5B6472]">\n            Standard programme fees shown below. All tiers include full learning portal access,\n            project feedback, and zero hidden charges.\n          </p>\n        </motion.div>\n\n        {/* Tier Cards Grid */}\n        <motion.div\n          variants={containerVariants}\n          initial="hidden"\n          whileInView="show"\n          viewport={{ once: true, margin: "-50px" }}\n          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"\n        >\n          {(["essential", "career", "elite"] as TierId[]).map((id) => {\n            const t = TIERS_CONFIG[id];\n            const meta = TIER_META[id];\n            const Icon = t.icon;\n\n            return (\n              <motion.div\n                variants={cardVariants}\n                whileHover={{ y: -6, scale: 1.015 }}\n                transition={{ duration: 0.2 }}\n                key={id}\n                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}\n              >\n                <div>\n                  {/* Eyebrow & Pill Header */}\n                  <div className="mb-5 flex items-center justify-between gap-2">\n                    <span\n                      className={`inline-block rounded-full px-3.5 py-1 text-[11px] uppercase tracking-wider border ${t.badgeBg} ${t.badgeText} ${t.badgeBorder}`}\n                    >\n                      {t.badge}\n                    </span>\n                    <Icon className={`h-5 w-5 ${t.iconColor}`} />\n                  </div>\n\n                  <div>\n                    <h3 className={`font-serif text-3xl sm:text-4xl font-bold ${t.titleColor}`}>\n                      {meta.name}\n                    </h3>\n                    <p className={`text-xs ${t.taglineColor} mt-1.5 min-h-[32px] leading-relaxed`}>\n                      {t.tagline}\n                    </p>\n                  </div>\n\n                  {/* Pricing Display Box */}\n                  <div\n                    className={`mt-6 rounded-2xl border p-5 space-y-2.5 ${t.priceBoxBg} ${t.priceBoxBorder}`}\n                  >\n                    <div className="flex items-center justify-between gap-2">\n                      <span\n                        className={`text-[11px] font-mono uppercase tracking-wider ${t.feeLabelColor}`}\n                      >\n                        Total Programme Fee\n                      </span>\n                      {meta.savingsInr > 0 && (\n                        <span\n                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${t.savingsBg} ${t.savingsText}`}\n                        >\n                          Save {formatInr(meta.savingsInr)}\n                        </span>\n                      )}\n                    </div>\n                    <div className="overflow-hidden">\n                      <span\n                        className={`font-serif text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold tabular-nums tracking-tight whitespace-nowrap block ${t.priceColor}`}\n                      >\n                        {formatInr(meta.mrpInr)}\n                      </span>\n                    </div>\n                  </div>\n\n                  {/* Unique Hook Banner */}\n                  <div\n                    className={`mt-4 rounded-xl border p-3 text-xs flex items-center gap-2.5 ${t.uniqueHookBg} ${t.uniqueHookBorder} ${t.uniqueHookText}`}\n                  >\n                    <Zap className="h-4 w-4 shrink-0 text-amber-400" />\n                    <span className="leading-snug">{t.uniqueHook}</span>\n                  </div>\n\n                  {/* Feature Checklist */}\n                  <div className="space-y-3 pt-4">\n                    <p\n                      className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${t.deliverablesHeaderColor}`}\n                    >\n                      Included Deliverables\n                    </p>\n                    <ul className="space-y-3 text-xs">\n                      {t.perks.map((p, idx) => (\n                        <li key={idx} className="flex items-start gap-3">\n                          <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${t.checkIconColor}`} />\n                          <span className={`leading-snug font-medium ${t.textColor}`}>{p}</span>\n                        </li>\n                      ))}\n                    </ul>\n                  </div>\n                </div>\n\n                {/* Primary Button */}\n                <div className="mt-8 pt-5 border-t border-white/10">\n                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>\n                    <Link\n                      to="/enrol/$tier"\n                      params={{ tier: id }}\n                      style={{ color: "#FFFFFF" }}\n                      className={`flex items-center justify-center gap-2 rounded-2xl text-sm font-bold h-13 px-5 w-full transition-all duration-200 ${t.btnBg} ${t.btnText} ${t.btnHover} ${t.btnShadow}`}\n                    >\n                      <span>{t.cta}</span>\n                      <ArrowRight className="h-4 w-4 text-white" />\n                    </Link>\n                  </motion.div>\n                </div>\n              </motion.div>\n            );\n          })}\n        </motion.div>\n\n        {/* Security Footer */}\n        <div className="editorial-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rounded-2xl">\n          <div className="flex items-center gap-3">\n            <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />\n            <div>\n              <p className="text-xs font-semibold text-[#151C2E]">256-bit TLS Encrypted Checkout</p>\n              <p className="text-xs text-[#5B6472]">\n                Processed via Razorpay · GST tax invoice issued upon payment confirmation.\n              </p>\n            </div>\n          </div>\n          <div className="text-xs font-mono text-[#707C90]">\n            PCI-DSS Level 1 Compliant · Official GST Tax Invoice\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_49 = 'import { forwardRef, memo } from "react";\n\n/**\n * Shared cover container for programme cards. Guarantees a single, uniform\n * aspect ratio slot per viewport with strict overflow / object-fit rules so\n * mixed source aspect ratios (16:9, 500x500, 800x800) all crop identically\n * and never push adjacent cards out of alignment when the browser resizes,\n * zooms to 80 %, or picks a different srcSet variant.\n *\n * The wrapper reserves layout space via `aspect-*` so there is zero CLS\n * before the <img> resolves. The <img> itself carries width/height for the\n * intrinsic ratio and `max-w-full max-h-full` to defend against any parent\n * that accidentally lets content overflow (e.g. flex containers on Safari).\n */\nexport type ProgrammeCoverProps = {\n  src: string;\n  srcSet?: string;\n  alt: string;\n  /** Tailwind aspect utility, e.g. "aspect-[16/9]" (mobile) or "aspect-[16/7]" (desktop). */\n  aspect: string;\n  /** Responsive sizes hint used by the browser to pick the srcSet variant. */\n  sizes: string;\n  /** Overlay children rendered above the image (icon chip, salary pill, gradient). */\n  children?: React.ReactNode;\n  className?: string;\n  imgClassName?: string;\n};\n\nexport const ProgrammeCover = memo(\n  forwardRef<HTMLDivElement, ProgrammeCoverProps>(function ProgrammeCover(\n    { src, srcSet, alt, aspect, sizes, children, className = "", imgClassName = "" },\n    ref,\n  ) {\n    return (\n      <div\n        ref={ref}\n        data-programme-cover\n        className={`relative ${aspect} w-full max-w-full overflow-hidden bg-muted ${className}`}\n      >\n        <img\n          src={src}\n          srcSet={srcSet}\n          sizes={sizes}\n          alt={alt}\n          loading="lazy"\n          decoding="async"\n          fetchPriority="low"\n          width={800}\n          height={450}\n          className={`absolute inset-0 block h-full w-full max-h-full max-w-full object-cover object-center ${imgClassName}`}\n        />\n        {children}\n      </div>\n    );\n  }),\n);\n';
const __vite_glob_0_50 = 'import type * as React from "react";\nimport { BookOpen, Wrench, Gauge, Briefcase, Handshake } from "lucide-react";\nimport { RichCard, type RichCardTone } from "@/components/ui/RichCard";\n\nconst PHASES = [\n  {\n    id: "foundations",\n    icon: BookOpen,\n    label: "Foundations",\n    tone: "blue" as RichCardTone,\n    window: "Weeks 1–2",\n    body: "ICSR, MedDRA, drug safety workflows, terminology, regulatory awareness.",\n    deliverables: ["Vocabulary fluency", "Regulatory map", "Workflow briefing"],\n  },\n  {\n    id: "operational",\n    icon: Wrench,\n    label: "Operational Readiness",\n    tone: "orange" as RichCardTone,\n    window: "Weeks 3–6",\n    body: "Case processing simulations, narrative writing, seriousness logic, triage.",\n    deliverables: ["10+ case simulations", "Triage rubric", "Narrative drafts"],\n  },\n  {\n    id: "assay",\n    icon: Gauge,\n    label: "ASSAY Evaluation",\n    tone: "violet" as RichCardTone,\n    window: "Week 7",\n    body: "Workflow simulation, communication checks, PV reasoning evaluation. Generates ACRI.",\n    deliverables: ["ACRI score card", "Gap report", "Targeted drills"],\n  },\n  {\n    id: "industry",\n    icon: Briefcase,\n    label: "Industry Readiness",\n    tone: "emerald" as RichCardTone,\n    window: "Weeks 8–11",\n    body: "Mock production workflows, interview readiness, professional communication.",\n    deliverables: ["Mock interviews", "Resume rewrite", "Comms drills"],\n  },\n  {\n    id: "referral",\n    icon: Handshake,\n    label: "Referral Support",\n    tone: "navy" as RichCardTone,\n    window: "Week 12+",\n    body: "Recruiter introductions, hiring visibility, interview readiness coaching.",\n    deliverables: ["Recruiter intros", "Profile push", "Interview coaching"],\n  },\n] as const;\n\n/**\n * Five-phase visual timeline for the workforce-readiness journey.\n * Mobile = vertical stack, desktop = horizontal rail with index pills.\n */\nexport function ReadinessTimeline() {\n  return (\n    <section\n      aria-labelledby="readiness-timeline-heading"\n      className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"\n    >\n      <div className="mx-auto max-w-2xl text-center">\n        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[var(--teal-deep)]">\n          The 12-week readiness system\n        </p>\n        <h2 id="readiness-timeline-heading" className="h-section mt-3">\n          Five phases. One outcome: <span className="text-primary-glow">operationally ready.</span>\n        </h2>\n        <p className="mx-auto mt-3 max-w-xl text-body-sm leading-relaxed text-[var(--ink-soft)]">\n          Each phase ships a tangible deliverable you can show a recruiter, not just lecture notes.\n        </p>\n      </div>\n\n      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">\n        {PHASES.map((p, i) => {\n          const Icon = p.icon;\n          return (\n            <RichCard as="li" key={p.id} tone={p.tone} elevation="lifted" className="h-full">\n              <RichCard.Header\n                compact\n                art={\n                  <Icon aria-hidden className="h-full w-full text-slate-200/35" strokeWidth={1.4} />\n                }\n              >\n                <RichCard.EyebrowRow>\n                  <RichCard.Chip>\n                    <Icon aria-hidden />\n                    Step {String(i + 1).padStart(2, "0")}\n                  </RichCard.Chip>\n                  <RichCard.Chip>{p.window}</RichCard.Chip>\n                </RichCard.EyebrowRow>\n                <RichCard.Title as="h3" className="text-h4 sm:text-h4">\n                  {p.label}\n                </RichCard.Title>\n              </RichCard.Header>\n              <RichCard.Body compact>\n                <p className="text-caption leading-relaxed">{p.body}</p>\n                <RichCard.CheckList\n                  items={p.deliverables as unknown as React.ReactNode[]}\n                  className="text-caption"\n                />\n              </RichCard.Body>\n            </RichCard>\n          );\n        })}\n      </ol>\n    </section>\n  );\n}\n';
const __vite_glob_0_51 = 'import { RECRUITER_OUTCOMES } from "@/data/recruiterOutcomes";\nimport { CheckCircle2 } from "lucide-react";\nimport { motion } from "framer-motion";\n\nexport function RecruiterOutcomes({ compact: _compact = false }: { compact?: boolean }) {\n  const containerVariants = {\n    hidden: { opacity: 0 },\n    show: {\n      opacity: 1,\n      transition: { staggerChildren: 0.06 },\n    },\n  };\n\n  const itemVariants = {\n    hidden: { opacity: 0, y: 12 },\n    show: {\n      opacity: 1,\n      y: 0,\n      transition: { type: "spring" as const, stiffness: 260, damping: 24 },\n    },\n  };\n\n  return (\n    <section\n      id="recruiter-outcomes"\n      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"\n    >\n      <div className="mx-auto max-w-5xl space-y-10">\n        {/* Header (Matching Image 1) */}\n        <div className="text-center space-y-3 max-w-3xl mx-auto">\n          <div className="inline-flex flex-col items-center">\n            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">\n              RECRUITER VIEW - DAY 1\n            </p>\n            <div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />\n          </div>\n          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-[1.15]">\n            What a hiring manager sees <br className="hidden sm:inline" />\n            <span className="italic text-[#8A6D1F]">when our graduate applies.</span>\n          </h2>\n          <p className="text-sm sm:text-base text-[#5B6472] leading-relaxed max-w-2xl mx-auto">\n            No vague soft-skill claims. Every row is a real pain CRO/BPO recruiters flag, paired\n            with the artefact our cohort ships at the end of week 12.\n          </p>\n        </div>\n\n        {/* Editorial Table Card (Matching Image 1 Table Layout) */}\n        <motion.div\n          initial={{ opacity: 0, y: 20 }}\n          whileInView={{ opacity: 1, y: 0 }}\n          viewport={{ once: true }}\n          className="rounded-[24px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] space-y-2"\n        >\n          {/* Header Row */}\n          <div className="hidden md:grid md:grid-cols-[1.1fr_1.3fr_1.1fr] gap-4 pb-3 border-b border-slate-200/80 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#707C90] px-3">\n            <span>RECRUITER PAIN</span>\n            <span>ARZON GRADUATE DELIVERS</span>\n            <span>VERIFIABLE ARTEFACT</span>\n          </div>\n\n          <motion.ul\n            variants={containerVariants}\n            initial="hidden"\n            whileInView="show"\n            viewport={{ once: true }}\n            className="divide-y divide-slate-100"\n          >\n            {RECRUITER_OUTCOMES.map((row) => (\n              <motion.li\n                variants={itemVariants}\n                key={row.pain}\n                className="py-3.5 px-3 grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr_1.1fr] gap-3 items-center hover:bg-slate-50/80 rounded-xl transition-colors"\n              >\n                <p className="text-xs font-bold text-[#151C2E]">{row.pain}</p>\n                <div className="flex items-center gap-2 text-xs font-medium text-[#151C2E]">\n                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />\n                  <span>{row.delivers}</span>\n                </div>\n                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">\n                  {row.artifact}\n                </p>\n              </motion.li>\n            ))}\n          </motion.ul>\n        </motion.div>\n\n        <p className="text-center font-mono text-[10px] text-[#707C90]">\n          Every artefact above is verifiable on the public ledger — certificates, JD sources,\n          refunds, methodology.\n        </p>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_52 = 'import {\n  useEffect,\n  useRef,\n  useState,\n  createElement,\n  type ReactNode,\n  type CSSProperties,\n  type ElementType,\n} from "react";\n\n/**\n * Lightweight scroll-reveal wrapper. Adds data-animate="fade-up" + flips\n * data-inview when the element scrolls into view, hooking into the existing\n * CSS in styles.css. Optional `delay` (ms) gives staggered reveals.\n */\nexport function Reveal({\n  children,\n  delay = 0,\n  as: Tag = "div",\n  className = "",\n  variant = "fade-up",\n  style,\n}: {\n  children: ReactNode;\n  delay?: number;\n  as?: ElementType;\n  className?: string;\n  variant?: "fade-up" | "fade-in" | "scale-in";\n  style?: CSSProperties;\n}) {\n  const ref = useRef<HTMLElement | null>(null);\n  const [inView, setInView] = useState(false);\n\n  useEffect(() => {\n    const el = ref.current;\n    if (!el || typeof IntersectionObserver === "undefined") {\n      setInView(true);\n      return;\n    }\n    // Defensive: if the element is already visible in the viewport on mount\n    // (e.g. above-the-fold hero on a short page, or inside a nested scroll\n    // container that confuses IntersectionObserver), flip immediately so the\n    // content never stays stuck at opacity:0.\n    const rect = el.getBoundingClientRect();\n    const vh = window.innerHeight || document.documentElement.clientHeight;\n    const vw = window.innerWidth || document.documentElement.clientWidth;\n    if (rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0) {\n      setInView(true);\n      return;\n    }\n    const io = new IntersectionObserver(\n      (entries) => {\n        for (const e of entries)\n          if (e.isIntersecting) {\n            setInView(true);\n            io.unobserve(e.target);\n          }\n      },\n      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },\n    );\n    io.observe(el);\n    return () => io.disconnect();\n  }, []);\n\n  return createElement(\n    Tag,\n    {\n      ref,\n      "data-animate": variant,\n      "data-inview": inView ? "true" : "false",\n      className,\n      style: { animationDelay: delay ? `${delay}ms` : undefined, ...style },\n    },\n    children,\n  );\n}\n';
const __vite_glob_0_53 = 'import { useEffect, useState } from "react";\nimport { getScrollRoot } from "@/lib/scroll";\n\n/**\n * Hairline scroll-progress bar pinned to the bottom of the sticky nav.\n * Uses transform: scaleX so it never re-layouts. Disabled in reduced motion.\n */\nexport function ScrollProgress() {\n  const [p, setP] = useState(0);\n\n  useEffect(() => {\n    if (typeof window === "undefined") return;\n    let raf = 0;\n    const update = () => {\n      const root = getScrollRoot();\n      const max = root\n        ? root.scrollHeight - root.clientHeight || 1\n        : document.documentElement.scrollHeight - window.innerHeight || 1;\n      const y = root ? root.scrollTop : window.scrollY;\n      setP(Math.min(1, Math.max(0, y / max)));\n      raf = 0;\n    };\n    const onScroll = () => {\n      if (!raf) raf = requestAnimationFrame(update);\n    };\n    const root = getScrollRoot();\n    update();\n    (root ?? window).addEventListener("scroll", onScroll, { passive: true });\n    window.addEventListener("resize", onScroll);\n    return () => {\n      (root ?? window).removeEventListener("scroll", onScroll);\n      window.removeEventListener("resize", onScroll);\n      if (raf) cancelAnimationFrame(raf);\n    };\n  }, []);\n\n  return (\n    <div\n      aria-hidden\n      className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden"\n    >\n      <div\n        className="h-full origin-left bg-gradient-to-r from-primary via-primary-glow to-gold"\n        style={{\n          transform: `scaleX(${p})`,\n          transition: "transform 90ms linear",\n          willChange: "transform",\n        }}\n      />\n    </div>\n  );\n}\n';
const __vite_glob_0_54 = 'import { Link } from "@tanstack/react-router";\nimport { Search, ArrowRight } from "lucide-react";\n\nconst ITEMS = [\n  {\n    label: "Medical Coding programme",\n    to: "/courses/$slug" as const,\n    params: { slug: "medical-coding" },\n  },\n  {\n    label: "Pharmacovigilance programme",\n    to: "/courses/$slug" as const,\n    params: { slug: "pharmacovigilance" },\n  },\n  {\n    label: "Clinical Data Management",\n    to: "/courses/$slug" as const,\n    params: { slug: "clinical-data-management" },\n  },\n  { label: "All internships", to: "/internships" as const, params: undefined },\n];\n\nexport function SearchIntentStrip() {\n  return (\n    <section className="px-4 py-8">\n      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200/10 bg-white/[0.03] p-5 sm:p-6">\n        <div className="flex items-center gap-2">\n          <Search className="h-4 w-4 text-primary-glow" />\n          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">\n            Searching for a specific internship?\n          </p>\n        </div>\n        <h3 className="mt-3 font-grotesk text-h4 font-bold leading-tight text-slate-50 sm:text-h3">\n          Jump straight to the one you want.\n        </h3>\n        <div className="mt-4 grid gap-2 sm:grid-cols-2">\n          {ITEMS.map((it) => (\n            <Link\n              key={it.to + (it.params?.slug ?? "")}\n              to={it.to}\n              params={it.params}\n              className="group flex items-center justify-between rounded-xl border border-slate-200/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-100/85 transition hover:border-primary-glow/40 hover:bg-white/[0.06]"\n            >\n              <span>{it.label}</span>\n              <ArrowRight className="h-4 w-4 text-slate-100/80 transition group-hover:translate-x-0.5 group-hover:text-primary-glow" />\n            </Link>\n          ))}\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_55 = 'import { isValidElement, type ReactNode } from "react";\nimport { Reveal } from "./Reveal";\n\nexport function SectionHeader({\n  eyebrow,\n  title,\n  sub,\n  align = "center",\n  tone,\n}: {\n  eyebrow?: string;\n  title: ReactNode;\n  sub?: ReactNode;\n  align?: "center" | "left";\n  /**\n   * Optional explicit override. When omitted, the header inherits its tone\n   * from the ancestor surface via the `.tone-dark` / `.tone-light` CSS rules\n   * in `src/styles.css`. We deliberately do NOT read a default tone from\n   * React context: doing so forced every section header to render white on\n   * the light page background (the "invisible section heading" regression).\n   */\n  tone?: "light" | "dark";\n}) {\n  const a = align === "center" ? "text-center mx-auto" : "text-left";\n  // Default to `.tone-light` so the header re-scopes `--ink` / `--ink-soft`\n  // to solid navy ink even when the app renders under an html-level `.dark`\n  // theme. Without this the display serif inherits near-white `--ink` from\n  // `.dark` and the headline collapses into a ghost — the exact regression\n  // the user flagged on Role-first tracks, One fee, Quick answers, etc.\n  // Callers can still opt into a dark surface via `tone="dark"`.\n  const toneClass = tone === "dark" ? "tone-dark" : "tone-light";\n  // If the caller already supplied a heading element (e.g. <h2>...</h2>),\n  // don\'t wrap it in another <h2> — that produces invalid nested headings\n  // and on mobile collapses into an overlapping stack.\n  const titleIsHeading =\n    isValidElement(title) && typeof title.type === "string" && /^h[1-6]$/.test(title.type);\n  return (\n    <div className={`max-w-3xl ${a} ${toneClass}`.trim()}>\n      {eyebrow && (\n        <Reveal as="div" className="flex flex-col items-center gap-3">\n          <p className="eyebrow">{eyebrow}</p>\n          {/* Premium hairline: a short gold rule under every section eyebrow\n              gives the whole page an editorial, chapter-marker rhythm. */}\n          <span aria-hidden className="block h-px w-10 bg-[#8A6A14]/50" />\n        </Reveal>\n      )}\n      {titleIsHeading ? (\n        <Reveal as="div" className="h-section mt-4 sm:mt-5" delay={80}>\n          {title}\n        </Reveal>\n      ) : (\n        <Reveal as="h2" className="h-section mt-4 sm:mt-5" delay={80}>\n          {title}\n        </Reveal>\n      )}\n      {sub && (\n        <Reveal as="p" className="body-lg mt-4 sm:mt-5 mx-auto max-w-[54ch]" delay={160}>\n          {sub}\n        </Reveal>\n      )}\n    </div>\n  );\n}\n';
const __vite_glob_0_56 = 'import { Skeleton } from "@/components/ui/skeleton";\nimport { Section } from "@/components/ui/Section";\n\nexport type ResponsiveMinH = number | { base: number; sm?: number; md?: number; lg?: number };\n\ntype Variant = "default" | "faq" | "form" | "cta" | "strip" | "grid" | "media" | "compare";\n\ninterface Props {\n  variant?: Variant;\n  minH?: ResponsiveMinH;\n}\n\n/**\n * Lightweight, theme-aware skeleton for lazy-loaded landing sections.\n * Reserves vertical space (CLS=0) and gives a structured shimmer so the\n * page feels instant while the chunk streams in.\n */\n/**\n * Resolve a responsive minH into an inline style that uses CSS custom\n * properties. Tailwind arbitrary classes read those vars (see\n * RESPONSIVE_MIN_H_CLASS below) and\n * apply the right value at each breakpoint, so reserved space matches the\n * real component height at every viewport. This keeps CLS ≈ 0 from\n * 320px through desktop without forcing the largest height everywhere.\n */\nfunction minHStyle(minH?: ResponsiveMinH): React.CSSProperties | undefined {\n  if (minH == null) return undefined;\n  if (typeof minH === "number") return { minHeight: minH };\n  const { base, sm, md, lg } = minH;\n  return {\n    ["--mh-base" as any]: `${base}px`,\n    ["--mh-sm" as any]: `${sm ?? base}px`,\n    ["--mh-md" as any]: `${md ?? sm ?? base}px`,\n    ["--mh-lg" as any]: `${lg ?? md ?? sm ?? base}px`,\n  };\n}\n\nconst RESPONSIVE_MIN_H_CLASS =\n  "min-h-[var(--mh-base)] sm:min-h-[var(--mh-sm)] md:min-h-[var(--mh-md)] lg:min-h-[var(--mh-lg)]";\n\nexport function SectionSkeleton({ variant = "default", minH }: Props) {\n  const isResponsive = !!minH && typeof minH === "object";\n  const style = minHStyle(minH);\n  const inner = (() => {\n    switch (variant) {\n      case "strip":\n        return (\n          <div className="flex flex-wrap items-center justify-between gap-4">\n            <Skeleton className="h-5 w-48" />\n            <Skeleton className="h-10 w-40 rounded-full" />\n          </div>\n        );\n      case "cta":\n        return (\n          <div className="rounded-[28px] border border-slate-200/10 bg-white/[0.03] px-6 py-12 sm:px-12 sm:py-16">\n            <Skeleton className="h-4 w-24" />\n            <Skeleton className="mt-4 h-9 w-2/3" />\n            <Skeleton className="mt-3 h-4 w-full max-w-xl" />\n            <Skeleton className="mt-2 h-4 w-3/4 max-w-md" />\n            <div className="mt-7 flex flex-col gap-3 sm:flex-row">\n              <Skeleton className="h-12 w-full sm:w-56 rounded-full" />\n              <Skeleton className="h-12 w-full sm:w-56 rounded-full" />\n            </div>\n          </div>\n        );\n      case "faq":\n        return (\n          <div>\n            <Skeleton className="mx-auto h-8 w-64" />\n            <Skeleton className="mx-auto mt-3 h-4 w-80" />\n            <div className="mt-8 space-y-3">\n              {Array.from({ length: 5 }).map((_, i) => (\n                <Skeleton key={i} className="h-14 w-full rounded-xl" />\n              ))}\n            </div>\n          </div>\n        );\n      case "form":\n        return (\n          <div className="rounded-2xl border border-slate-200/10 bg-white/[0.03] p-6 sm:p-10">\n            <Skeleton className="h-7 w-56" />\n            <Skeleton className="mt-2 h-4 w-72" />\n            <div className="mt-6 grid gap-4 sm:grid-cols-2">\n              {Array.from({ length: 4 }).map((_, i) => (\n                <Skeleton key={i} className="h-12 w-full rounded-lg" />\n              ))}\n            </div>\n            <Skeleton className="mt-6 h-12 w-full sm:w-48 rounded-full" />\n          </div>\n        );\n      case "grid":\n        return (\n          <div>\n            <Skeleton className="mx-auto h-8 w-72" />\n            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">\n              {Array.from({ length: 6 }).map((_, i) => (\n                <Skeleton key={i} className="h-44 w-full rounded-2xl" />\n              ))}\n            </div>\n          </div>\n        );\n      case "media":\n        return (\n          <div>\n            <Skeleton className="mx-auto h-7 w-56" />\n            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 opacity-80">\n              {Array.from({ length: 5 }).map((_, i) => (\n                <Skeleton key={i} className="h-10 w-32 rounded-md" />\n              ))}\n            </div>\n          </div>\n        );\n      case "compare":\n        return (\n          <div className="grid gap-4 md:grid-cols-2">\n            <Skeleton className="h-72 w-full rounded-2xl" />\n            <Skeleton className="h-72 w-full rounded-2xl" />\n          </div>\n        );\n      default:\n        return (\n          <div>\n            <Skeleton className="h-7 w-64" />\n            <Skeleton className="mt-3 h-4 w-full max-w-2xl" />\n            <Skeleton className="mt-2 h-4 w-5/6 max-w-xl" />\n            <div className="mt-6 grid gap-4 sm:grid-cols-2">\n              <Skeleton className="h-32 w-full rounded-xl" />\n              <Skeleton className="h-32 w-full rounded-xl" />\n            </div>\n          </div>\n        );\n    }\n  })();\n\n  return (\n    <Section\n      size="md"\n      aria-hidden\n      className={isResponsive ? RESPONSIVE_MIN_H_CLASS : undefined}\n      style={style}\n    >\n      <div className="opacity-70">{inner}</div>\n    </Section>\n  );\n}\n';
const __vite_glob_0_57 = 'import { useEffect, useState } from "react";\nimport { Link, useLocation } from "@tanstack/react-router";\nimport { ArrowRight, MessageCircle, X } from "lucide-react";\nimport { WhatsAppLink } from "@/components/common/WhatsAppLink";\nimport { getScrollRoot } from "@/lib/scroll";\nimport { useIntent, INTENT_CTA } from "@/lib/useIntent";\nimport { assignVariant, EXPERIMENTS } from "@/lib/abTest";\n\n/**\n * Scroll-aware mobile CTA.\n * - Hidden while the hero (#top) is in view, so it never covers the headline.\n * - Reveals once the user has scrolled past the hero.\n * - Dismissible for the session (sessionStorage).\n */\nexport function StickyMobileCTA() {\n  const loc = useLocation();\n  const [visible, setVisible] = useState(false);\n  const [dismissed, setDismissed] = useState(false);\n  const intent = useIntent();\n  const cta = INTENT_CTA[intent];\n  // A/B: vary sticky CTA placement. control = hidden, bottom_pill = always show\n  // after hero, scroll_trigger = only after 40% page depth.\n  const variant = assignVariant("sticky_cta_placement", EXPERIMENTS.sticky_cta_placement);\n  // Second concurrent experiment: copy on the /apply CTA. Only matters when\n  // the intent-routed CTA actually points at /apply.\n  const applyVariant = assignVariant("apply_cta_urgency", EXPERIMENTS.apply_cta_urgency);\n\n  useEffect(() => {\n    if (typeof window === "undefined") return;\n    if (variant === "control") return;\n    // Soft-dismiss: only hide for ~60s, then come back. Sales reps can\'t lose this.\n    const dismissedAt = Number(sessionStorage.getItem("hideStickyCTAAt") || 0);\n    const stillHidden = dismissedAt && Date.now() - dismissedAt < 60_000;\n    setDismissed(Boolean(stillHidden));\n    if (stillHidden) {\n      const t = setTimeout(() => setDismissed(false), 60_000 - (Date.now() - dismissedAt));\n      return () => clearTimeout(t);\n    }\n\n    if (variant === "scroll_trigger") {\n      const root = getScrollRoot();\n      const onScroll = () => {\n        const el = root ?? document.documentElement;\n        const top = root ? root.scrollTop : window.scrollY;\n        const max = el.scrollHeight - el.clientHeight || 1;\n        setVisible(top / max >= 0.4);\n      };\n      (root ?? window).addEventListener("scroll", onScroll, { passive: true });\n      onScroll();\n      return () => (root ?? window).removeEventListener("scroll", onScroll);\n    }\n\n    const hero = document.getElementById("top");\n    if (!hero) {\n      // Fallback: show after a small scroll\n      const root = getScrollRoot();\n      const onScroll = () => setVisible((root ? root.scrollTop : window.scrollY) > 480);\n      (root ?? window).addEventListener("scroll", onScroll, { passive: true });\n      return () => (root ?? window).removeEventListener("scroll", onScroll);\n    }\n    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {\n      root: getScrollRoot(),\n      threshold: 0,\n      rootMargin: "-40px 0px 0px 0px",\n    });\n    io.observe(hero);\n    return () => io.disconnect();\n  }, [variant]);\n\n  if (variant === "control" || dismissed) return null;\n  // Hide anywhere a route already provides its own bottom CTA / form.\n  const p = loc.pathname;\n  const hidden =\n    p.startsWith("/apply") ||\n    p.startsWith("/enrol") ||\n    p.startsWith("/career-engine") ||\n    p.startsWith("/internships") ||\n    p.startsWith("/learn/") ||\n    p === "/dashboard" ||\n    p === "/verify";\n  if (hidden) return null;\n\n  return (\n    <div\n      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] transition-all duration-300 md:hidden ${\n        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"\n      }`}\n      aria-hidden={!visible}\n    >\n      <div\n        data-apply-surface={`sticky_mobile_cta:${variant}`}\n        data-apply-cta-urgency={applyVariant}\n        className="pointer-events-auto mx-3 mb-3 flex items-center gap-2 rounded-full border border-slate-200/15 bg-[#0A0F1E] px-2 py-2 sm:mx-auto sm:max-w-md"\n        style={{\n          boxShadow:\n            "inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",\n        }}\n      >\n        <WhatsAppLink\n          source="sticky_mobile_cta"\n          message="Hi Arzon, quick question about the programme."\n          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/25 hover:ring-[#3b6fa0]/55 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fb0d8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]"\n          aria-label="Chat with a counsellor on WhatsApp"\n        >\n          <MessageCircle className="h-4 w-4" />\n        </WhatsAppLink>\n        <Link\n          to={cta.to}\n          className="btn btn-gold flex-1"\n          style={{ height: "2.75rem", minHeight: "2.75rem", padding: "0 1rem", fontSize: "13px" }}\n        >\n          <span>\n            {cta.to === "/apply" && applyVariant === "seats_left"\n              ? "Reserve 1 of 14 seats"\n              : cta.to === "/apply" && applyVariant === "deadline"\n                ? "Apply before 30 Jun · ₹1,065"\n                : cta.shortLabel}\n          </span>\n          <span data-arrow aria-hidden>\n            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />\n          </span>\n        </Link>\n        <button\n          type="button"\n          onClick={() => {\n            sessionStorage.setItem("hideStickyCTAAt", String(Date.now()));\n            setDismissed(true);\n            setTimeout(() => setDismissed(false), 60_000);\n          }}\n          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-100/60 transition-all duration-200 hover:bg-slate-50/10 hover:text-slate-50 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]"\n          aria-label="Dismiss sticky call-to-action"\n        >\n          <X className="h-4 w-4" />\n        </button>\n      </div>\n    </div>\n  );\n}\n';
const __vite_glob_0_58 = `import { useMemo, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { Plus, Search } from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";

type QA = { category: string; q: string; a: string };

const CATEGORIES = [
  "All",
  "Eligibility",
  "Course choice",
  "Schedule & batches",
  "Mentors & classes",
  "Internship",
  "Certificate",
  "Placement",
  "Fees & cancellation",
  "Tech & laptop",
  "Trust & legitimacy",
] as const;

const QUESTIONS: QA[] = [
  // Eligibility
  {
    category: "Eligibility",
    q: "I'm a BBA student, is this programme for me?",
    a: "Yes. BBA, B.Com and other non-pharma students join every cohort. The programme builds the medical/clinical vocabulary from scratch in the first two weeks, so prior science background is not required for medical coding, clinical data management or healthcare ops tracks.",
  },
  {
    category: "Eligibility",
    q: "I'm a B.Tech student. Will this be too 'medical' for me?",
    a: "No. Engineers do well in clinical data management and medical coding because both are structured, rule-based work. We do not assume any prior pharma knowledge.",
  },
  {
    category: "Eligibility",
    q: "I'm in 1st or 2nd year. Should I wait?",
    a: "Don't wait. Starting early is the single biggest advantage. Sessions are in the evening and fully recorded, so college and exams are not affected.",
  },
  {
    category: "Eligibility",
    q: "I have a 1–2 year gap after graduation. Will you take me?",
    a: "Yes. A gap year does not block admission. We focus on what you can demonstrate at the end of 12 weeks, not on what happened before.",
  },
  {
    category: "Eligibility",
    q: "I'm a B.Pharm / Pharm.D / paramedical student, which track fits?",
    a: "Pharmacovigilance and medical coding are the strongest fits. You'll move faster through the clinical content than non-pharma peers.",
  },
  {
    category: "Eligibility",
    q: "Can working professionals join?",
    a: "Yes. Evening live classes + recordings are designed for students and working professionals in IST. You won't fall behind if you miss a class.",
  },

  // Course choice
  {
    category: "Course choice",
    q: "How do I pick the right programme?",
    a: "Take the free 3-minute Career Engine test. It scores you on aptitude, interest, role-readiness and recommends 1 primary + 1 backup track based on your real answers, not on the most expensive course.",
  },
  {
    category: "Course choice",
    q: "Can I switch programmes after I start?",
    a: "Yes, within the first week of your cohort. After that, switching is case-by-case so we can protect your cohort progress.",
  },
  {
    category: "Course choice",
    q: "Will non-pharma students survive the medical content?",
    a: "Yes. Week 1–2 is a 'medical fundamentals' bridge built specifically for non-pharma students. Past cohorts include BBA, B.Com and B.Tech students who graduated in the top grade.",
  },

  // Schedule & batches
  {
    category: "Schedule & batches",
    q: "What are the class timings?",
    a: "Live sessions are in the evening (IST), Monday to Friday, ~90 minutes. Weekend slots are used for doubt-clearing and project reviews.",
  },
  {
    category: "Schedule & batches",
    q: "What if I miss a class during exam week?",
    a: "Every session is recorded and available within a few hours. You get a structured catch-up checklist, not just raw video.",
  },
  {
    category: "Schedule & batches",
    q: "How large is each batch?",
    a: "Maximum 60 students per batch. Mentor breakout groups are kept under 15 so each student actually gets attention.",
  },

  // Mentors & classes
  {
    category: "Mentors & classes",
    q: "Who actually teaches the classes?",
    a: "Working professionals from CROs, hospitals and pharma companies, not full-time trainers. Each mentor has 5+ years of live industry experience.",
  },
  {
    category: "Mentors & classes",
    q: "What language are classes in?",
    a: "English-medium with Hindi/Telugu explanations available in doubt sessions. All written material is in English (to match recruiter expectations).",
  },
  {
    category: "Mentors & classes",
    q: "Do I get 1-on-1 time with a mentor?",
    a: "Yes. Weekly small-group reviews plus on-demand doubt slots. Top performers also get a 1-on-1 career conversation before placements.",
  },

  // Internship
  {
    category: "Internship",
    q: "Is this a real internship or just a course with a fancy certificate?",
    a: "Both. The first 8 weeks are live classes + homework. The last 4 weeks are real internship work on de-identified hospital, CRO or operations files under mentor supervision.",
  },
  {
    category: "Internship",
    q: "Is there a stipend?",
    a: "No. This is a structured training internship, you pay for industry-grade training, you don't get paid. Anyone promising a stipend on a training programme is misleading you.",
  },
  {
    category: "Internship",
    q: "What kind of files do we actually work on?",
    a: "Real, fully de-identified case files: PV ICSR cases, medical coding charts, eCRF datasets, exactly the type of work fresh hires do on day one of a CRO/BPO job.",
  },

  // Certificate
  {
    category: "Certificate",
    q: "Who issues the certificate?",
    a: "Arzon Global Labs, ISO 9001 certified, MSME registered, MCA incorporated. Each certificate carries ISO, MSME and Govt. of Telangana seals.",
  },
  {
    category: "Certificate",
    q: "How do recruiters verify it?",
    a: "Each certificate has a unique ID, a QR code and a public verification URL on arzoncareers.in/verify. Recruiters can confirm authenticity in under 5 seconds.",
  },
  {
    category: "Certificate",
    q: "Is it 'government recognised'?",
    a: "Arzon Global is MSME-registered and MCA-incorporated under the Government of India, and partners with government skilling bodies. We do not claim any 'central government degree' status, no private programme can.",
  },
  {
    category: "Certificate",
    q: "Can I add it on LinkedIn?",
    a: "Yes. We provide a LinkedIn-ready credential link + suggested wording. The certificate appears under your 'Licenses & certifications' section with a clickable verification URL.",
  },

  // Placement
  {
    category: "Placement",
    q: "Do you guarantee a job?",
    a: "No, and don't trust anyone who does, it's against ASCI advertising rules. What we do guarantee: a fixed CV, real interview practice and intros to our hiring partners.",
  },
  {
    category: "Placement",
    q: "What if I don't get an interview after the programme?",
    a: "If you complete the programme with grade B+ and don't get an interview in 90 days, we extend free placement support for 6 more months at no extra cost.",
  },
  {
    category: "Placement",
    q: "What's the typical starting salary?",
    a: "Entry-level offers for our tracks usually fall in the ₹2.4–4.2 LPA range in Hyderabad/Bengaluru/Pune. We publish band data per role on the /industry pages, no inflated numbers.",
  },
  {
    category: "Placement",
    q: "Which companies do you have hiring tie-ups with?",
    a: "Mid-size CROs, BPOs and healthcare-services firms across South India, plus partner agencies for international (UAE/Singapore) roles. Full list is shared in the placement briefing in week 10.",
  },

  // Fees & cancellation
  {
    category: "Fees & cancellation",
    q: "What's the total fee?",
    a: "Tier-based, all-inclusive. Current pricing is shown on the Pricing section of this page. There are no hidden 'certificate fees' or 'placement fees' later.",
  },
  {
    category: "Fees & cancellation",
    q: "Why don't you offer EMI?",
    a: "Education fees can't legally be financed as consumer EMI in India. We refuse to disguise it as a 'no-cost EMI', that's how students end up with surprise loan debt.",
  },
  {
    category: "Fees & cancellation",
    q: "How does cancellation work?",
    a: "Cancellation terms are published in plain English on /refund. If you cancel before the cohort starts your seat fee is settled per those terms; once the cohort starts, balances follow the same written policy.",
  },
  {
    category: "Fees & cancellation",
    q: "Are there scholarships or group discounts?",
    a: "Yes. Top scorers on the Career Engine test qualify for a merit scholarship. Group-of-3 discounts are available, message us on WhatsApp for the current offer.",
  },

  // Tech & laptop
  {
    category: "Tech & laptop",
    q: "What laptop do I need?",
    a: "Any laptop running Windows 10/11 or macOS with 8 GB RAM and a stable 5 Mbps internet connection is enough. We don't require gaming-spec hardware.",
  },
  {
    category: "Tech & laptop",
    q: "Can I attend on mobile only?",
    a: "You can watch live classes on mobile, but assignments (medical coding charts, eCRF entries) need a laptop. Mobile-only is not realistic for the internship phase.",
  },
  {
    category: "Tech & laptop",
    q: "Do I need to buy any paid software?",
    a: "No. All practice tools, codebooks and reference datasets are provided through the learning portal during the programme.",
  },

  // Trust & legitimacy
  {
    category: "Trust & legitimacy",
    q: "How do I know Arzon Global is real and not a scam?",
    a: "Arzon Global is MSME-registered, MCA-incorporated, ISO 9001 certified, and has covered launch events with national/regional media (ETV). Verify any certificate live at arzoncareers.in/verify.",
  },
  {
    category: "Trust & legitimacy",
    q: "Where can I read genuine student reviews?",
    a: "Linked on the Proof page (/proof), Google reviews, LinkedIn posts by past students, and on-camera testimonials. We do not post anonymous reviews.",
  },
  {
    category: "Trust & legitimacy",
    q: "Who is the founder?",
    a: "Founder + leadership profiles, registration documents and audited certifications are listed on the About and Trust Report pages. Nothing hidden.",
  },
];

function matches(qa: QA, term: string) {
  if (!term) return true;
  const t = term.toLowerCase();
  return (
    qa.q.toLowerCase().includes(t) ||
    qa.a.toLowerCase().includes(t) ||
    qa.category.toLowerCase().includes(t)
  );
}

export function StudentQuestionBank() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return QUESTIONS.map((qa, i) => ({ qa, i })).filter(
      ({ qa }) => (cat === "All" || qa.category === cat) && matches(qa, term),
    );
  }, [cat, term]);

  return (
    <Section id="question-bank" size="lg" containerSize="md">
      <SectionHeader
        eyebrow="Student Question Bank"
        title={<>Usually, what students ask us.</>}
        sub="Browse by topic, or search. Straight answers, no sales pitch."
      />

      {/* Search */}
      <div className="relative mx-auto mt-8 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0056D2]" />
        <input
          type="search"
          inputMode="search"
          placeholder="Search questions… (e.g. BBA, EMI, laptop)"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(null);
          }}
          className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/15"
          aria-label="Search student questions"
        />
      </div>

      {/* Category chips */}
      <div className="mt-5 -mx-4 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2 sm:flex-wrap sm:justify-center">
          {CATEGORIES.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setCat(c);
                  setOpen(null);
                }}
                className={\`min-h-10 whitespace-nowrap rounded-md border px-3.5 py-2 text-xs font-bold transition \${
                  active
                    ? "border-[#0056D2] bg-[#0056D2] text-slate-50"
                    : "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"
                }\`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="mt-8 divide-y divide-edge overflow-hidden rounded-xl border border-edge bg-white shadow-sm">
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-slate-100/80 sm:px-6">
            No match for "<span className="text-slate-50">{term}</span>".{" "}
            <WhatsAppLink
              source="question_bank_no_match"
              message={\`Hi Arzon, I had a question, "\${term}", not in the FAQ.\`}
              trackProps={{ term }}
              className="font-semibold text-primary hover:underline"
            >
              Ping us on WhatsApp →
            </WhatsAppLink>
          </div>
        )}
        {filtered.map(({ qa, i }) => {
          const isOpen = open === i;
          return (
            <div key={i} className={isOpen ? "bg-[#F7FAFF]" : "bg-white"}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[56px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#F7FAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2]/35 sm:gap-6 sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="min-w-0">
                  <span className="mb-1 block font-mono text-micro font-semibold uppercase tracking-wider text-primary/75">
                    {qa.category}
                  </span>
                  <span className="font-grotesk text-body-sm font-semibold leading-snug text-primary sm:text-base">
                    {qa.q}
                  </span>
                </span>
                <Plus
                  className={\`mt-1 h-5 w-5 shrink-0 text-primary transition-transform \${isOpen ? "rotate-45" : ""}\`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-6 text-sm leading-relaxed text-primary/80 motion-safe:animate-fade-in sm:px-6">
                  {qa.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-slate-100/65">
        Didn't find your question?{" "}
        <WhatsAppLink
          source="question_bank_footer"
          message="Hi Arzon, I have a question about the programme."
          className="font-semibold text-eyebrow hover:underline"
        >
          Message us on WhatsApp →
        </WhatsAppLink>
      </p>
    </Section>
  );
}
`;
const __vite_glob_0_59 = 'import { Link } from "@tanstack/react-router";\nimport { useEffect, useRef } from "react";\nimport {\n  ArrowRight,\n  ShieldCheck,\n  BadgeCheck,\n  Landmark,\n  Tv,\n  MessageCircle,\n  ExternalLink,\n  Award,\n  Sparkles,\n} from "lucide-react";\nimport taskImg from "@/assets/proof/task-partnership.jpg";\nimport { LINKS, COUNSELLOR_PHONE } from "./constants";\nimport { trackEvent } from "@/lib/analytics";\n\nexport function TaskPartnershipBlock() {\n  const ref = useRef<HTMLElement | null>(null);\n  const ctaLabel = "Get my industry-fit score";\n\n  useEffect(() => {\n    if (!ref.current || typeof IntersectionObserver === "undefined") return;\n    const el = ref.current;\n    let fired = false;\n    const io = new IntersectionObserver(\n      (entries) => {\n        for (const e of entries) {\n          if (e.isIntersecting && !fired) {\n            fired = true;\n            trackEvent("task_block_impression", { surface: "home" });\n            io.disconnect();\n            break;\n          }\n        }\n      },\n      { threshold: 0.4 },\n    );\n    io.observe(el);\n    return () => io.disconnect();\n  }, []);\n\n  const stats: Array<{ label: string; value: string }> = [\n    { label: "Chief Guests", value: "TASK · Govt of Telangana" },\n    { label: "Public Launch", value: "30 Jul 2025 · Hyderabad" },\n    { label: "Programmes Shown", value: "PV · Coding · Clinical Research" },\n  ];\n\n  type Proof = {\n    key: string;\n    label: string;\n    sub: string;\n    href: string;\n    external?: boolean;\n    Icon: typeof ShieldCheck;\n  };\n  const proofs: Proof[] = [\n    {\n      key: "iso",\n      label: "ISO 9001:2015",\n      sub: "Verify certificate",\n      href: "/verify",\n      Icon: ShieldCheck,\n    },\n    {\n      key: "msme",\n      label: "MSME · Udyam",\n      sub: "Govt registration",\n      href: "/about#legal",\n      Icon: BadgeCheck,\n    },\n    {\n      key: "mca",\n      label: "MCA Incorporated",\n      sub: "Company filing",\n      href: "/about#legal",\n      Icon: Landmark,\n    },\n    {\n      key: "etv",\n      label: LINKS.mediaETV.outlet,\n      sub: "Media coverage",\n      href: LINKS.mediaETV.watch,\n      external: true,\n      Icon: Tv,\n    },\n  ];\n\n  return (\n    <section\n      ref={ref}\n      id="launch-event"\n      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#060A12] border-y border-slate-800/80 text-slate-50 overflow-hidden relative"\n    >\n      {/* Subtle background ambient glow */}\n      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-7xl h-96 bg-sky-500/5 blur-3xl pointer-events-none rounded-full" />\n\n      <div className="mx-auto max-w-7xl space-y-10 relative z-10">\n        {/* ── Header ── */}\n        <div className="max-w-3xl space-y-3.5">\n          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono font-bold text-sky-400 shadow-sm">\n            <Award className="h-3.5 w-3.5 text-sky-400" />\n            <span>GOVERNMENT RECOGNITION · VERIFIABLE CREDENTIALS</span>\n          </div>\n\n          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 tracking-tight leading-tight">\n            Recognised by{" "}\n            <span className="font-serif italic font-normal text-amber-300">\n              Government of Telangana &amp; India\n            </span>\n          </h2>\n\n          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">\n            Senior TASK leadership — Telangana Academy for Skill &amp; Knowledge — inaugurated Arzon\'s\n            national workforce readiness initiative in Hyderabad as official chief guests.\n          </p>\n        </div>\n\n        {/* ── Main Content Grid ── */}\n        <div className="grid gap-8 lg:grid-cols-12 items-stretch">\n          {/* Left: Photo Frame */}\n          <div className="lg:col-span-7 flex flex-col">\n            <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-3 shadow-2xl flex flex-col justify-between h-full">\n              <div className="relative overflow-hidden rounded-xl bg-slate-950 flex-1">\n                <img\n                  src={taskImg}\n                  alt="Public launch event photo with TASK officials"\n                  loading="lazy"\n                  decoding="async"\n                  className="w-full h-full object-cover rounded-xl"\n                />\n              </div>\n\n              <div className="flex items-center justify-between gap-3 px-3 pt-3 pb-1">\n                <div className="flex items-center gap-2">\n                  <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse shrink-0" />\n                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-200">\n                    Launch Event · TASK Officials &amp; Founding Team\n                  </span>\n                </div>\n                <span className="font-mono text-[11px] text-slate-400 shrink-0">Hyderabad · 30 Jul 2025</span>\n              </div>\n            </div>\n          </div>\n\n          {/* Right: Institutional Accreditation & Action Panel */}\n          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">\n            <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 space-y-6 shadow-xl flex-1 flex flex-col justify-between">\n              <div className="space-y-4">\n                <div className="flex items-center justify-between">\n                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-sky-400">\n                    Institutional Accreditation\n                  </span>\n                  <Sparkles className="h-4 w-4 text-amber-400/80" />\n                </div>\n\n                {/* Key Facts */}\n                <ul className="space-y-2">\n                  {stats.map((s) => (\n                    <li\n                      key={s.label}\n                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-3"\n                    >\n                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">\n                        {s.label}\n                      </span>\n                      <span className="text-xs font-bold text-slate-100 text-right">{s.value}</span>\n                    </li>\n                  ))}\n                </ul>\n\n                {/* Verifiable Badges */}\n                <div className="grid grid-cols-2 gap-2 pt-1">\n                  {proofs.map(({ key, label, sub, href, external, Icon }) => {\n                    const onClick = () => trackEvent("task_block_proof_click", { label: key });\n                    const inner = (\n                      <div className="flex items-center gap-2.5">\n                        <Icon className="h-4 w-4 text-sky-400 shrink-0" />\n                        <div className="min-w-0">\n                          <p className="text-xs font-semibold text-slate-100 truncate">{label}</p>\n                          <p className="text-[10px] text-slate-400 truncate">{sub}</p>\n                        </div>\n                        {external && (\n                          <ExternalLink className="h-3 w-3 text-slate-500 ml-auto shrink-0" />\n                        )}\n                      </div>\n                    );\n                    return (\n                      <div\n                        key={key}\n                        className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 transition hover:border-sky-500/40 hover:bg-slate-900"\n                      >\n                        {external ? (\n                          <a href={href} target="_blank" rel="noreferrer" onClick={onClick}>\n                            {inner}\n                          </a>\n                        ) : (\n                          <Link to={href} onClick={onClick}>\n                            {inner}\n                          </Link>\n                        )}\n                      </div>\n                    );\n                  })}\n                </div>\n              </div>\n\n              {/* Integrated CTAs */}\n              <div className="space-y-3 pt-4 border-t border-slate-800">\n                <Link\n                  to="/career-engine/test"\n                  onClick={() =>\n                    trackEvent("task_block_cta_click", {\n                      placement: "task_block",\n                      label: "readiness_test",\n                    })\n                  }\n                  className="flex items-center justify-center gap-2 rounded-xl h-12 px-5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-900/40 transition-all duration-200"\n                >\n                  <span>{ctaLabel}</span>\n                  <ArrowRight className="h-4 w-4" />\n                </Link>\n\n                <a\n                  href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(\n                    "Hi Arzon — I saw the TASK launch page. I\'d like to know about the next cohort.",\n                  )}`}\n                  target="_blank"\n                  rel="noreferrer"\n                  onClick={() =>\n                    trackEvent("task_block_whatsapp_click", { placement: "task_block" })\n                  }\n                  className="flex items-center justify-center gap-2 h-10 px-5 w-full rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"\n                >\n                  <MessageCircle className="h-4 w-4 text-sky-400" />\n                  <span>WhatsApp Admissions Desk</span>\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_0_60 = 'import { Link } from "@tanstack/react-router";\nimport { useQuery } from "@tanstack/react-query";\nimport { useServerFn } from "@tanstack/react-start";\nimport { Undo2, FileWarning, AlertTriangle, ArrowRight } from "lucide-react";\nimport { Section } from "@/components/ui/Section";\nimport { fetchTrustLedger } from "@/lib/trust.functions";\n\n/**\n * Thin strip that surfaces the public trust ledger headline counters on the\n * home page, right where the student is about to pay. Pulls live counts via\n * the existing fetchTrustLedger server fn. Lazy-loaded from index.tsx so it\n * doesn\'t hurt LCP.\n */\nexport function TrustLedgerStrip() {\n  const fetch = useServerFn(fetchTrustLedger);\n  const { data } = useQuery({\n    queryKey: ["trust-ledger-strip"],\n    queryFn: () => fetch(),\n    staleTime: 5 * 60 * 1000,\n  });\n\n  const counts = data?.counts ?? {\n    refunds: 0,\n    complaints: 0,\n    complaintsResolved: 0,\n    incidents: 0,\n    placements: 0,\n  };\n\n  return (\n    <Section size="md">\n      <div className="rounded-2xl border border-[color:var(--teal-deep)]/15 bg-[color:var(--teal-soft)]/30 p-5 sm:p-6">\n        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">\n          <div className="max-w-xl">\n            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">\n              Public · live trust ledger\n            </p>\n            <p className="mt-2 font-grotesk text-body-lg font-bold leading-snug text-ink sm:text-h4">\n              We publish complaints and incidents in the open, before you pay.\n            </p>\n            <p className="mt-1 text-caption leading-relaxed text-slate-600">\n              Most edtechs only publish wins. We list every complaint received — resolved or open —\n              alongside placement counts.\n            </p>\n          </div>\n\n          <div className="grid grid-cols-3 gap-3 md:gap-5">\n            <Stat icon={Undo2} value={counts.placements.toString()} label="Placements" />\n            <Stat\n              icon={FileWarning}\n              value={`${counts.complaintsResolved} / ${counts.complaints}`}\n              label="Complaints resolved"\n            />\n            <Stat icon={AlertTriangle} value="0" label="Open incidents" />\n          </div>\n        </div>\n\n        <div className="mt-5 flex flex-wrap items-center gap-3">\n          <Link\n            to="/trust-report"\n            preload="intent"\n            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[color:var(--teal-deep)] px-4 text-caption font-semibold text-slate-50 hover:bg-[color:var(--teal-ink)]"\n          >\n            Read the full ledger <ArrowRight className="h-3.5 w-3.5" />\n          </Link>\n          <Link\n            to="/refund"\n            preload="intent"\n            className="text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"\n          >\n            Cancellation policy →\n          </Link>\n        </div>\n      </div>\n    </Section>\n  );\n}\n\nfunction Stat({ icon: Icon, value, label }: { icon: typeof Undo2; value: string; label: string }) {\n  return (\n    <div className="rounded-xl bg-white p-3 ring-1 ring-ink/5 sm:p-4">\n      <Icon className="h-4 w-4 text-[color:var(--teal-deep)]" />\n      <p className="mt-2 font-grotesk text-body-lg font-bold leading-none text-ink sm:text-h4">\n        {value}\n      </p>\n      <p className="mt-1 font-mono text-micro uppercase tracking-[0.16em] text-slate-500">\n        {label}\n      </p>\n    </div>\n  );\n}\n';
const __vite_glob_1_0 = 'import { Link } from "@tanstack/react-router";\nimport { ArrowRight, RefreshCw, CheckCircle2, MapPin, Sparkles, BookOpen } from "lucide-react";\nimport { JD_PROVENANCE } from "@/data/jdProvenance";\n\nfunction formatRefreshDate(iso: string): string {\n  const d = new Date(iso);\n  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });\n}\n\ntype TrackTheme = {\n  gradient: string;\n  accent: string;\n  barColor: string;\n  emoji: string;\n};\n\nconst TRACK_THEMES: Record<string, TrackTheme> = {\n  pharmacovigilance: {\n    gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",\n    accent: "#38bdf8",\n    barColor: "#38bdf8",\n    emoji: "💊",\n  },\n  "medical-coding": {\n    gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",\n    accent: "#fb923c",\n    barColor: "#fb923c",\n    emoji: "🩺",\n  },\n  "clinical-data-management": {\n    gradient: "from-[#047857] via-[#059669] to-[#0d9488]",\n    accent: "#34d399",\n    barColor: "#34d399",\n    emoji: "📊",\n  },\n  "sas-clinical": {\n    gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",\n    accent: "#a78bfa",\n    barColor: "#a78bfa",\n    emoji: "💻",\n  },\n  "regulatory-affairs": {\n    gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",\n    accent: "#f472b6",\n    barColor: "#f472b6",\n    emoji: "📋",\n  },\n  "medical-writing": {\n    gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",\n    accent: "#60a5fa",\n    barColor: "#60a5fa",\n    emoji: "✍️",\n  },\n};\n\nconst DEFAULT_THEME = TRACK_THEMES.pharmacovigilance;\n\nexport function JDMirror({\n  variant: _variant = "full",\n  className,\n}: {\n  variant?: "full" | "compact";\n  className?: string;\n}) {\n  return (\n    <section\n      id="jd-mirror"\n      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`}\n    >\n      <div className="mx-auto max-w-7xl space-y-10">\n        {/* Header Block */}\n        <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 sm:p-8 max-w-3xl space-y-4 shadow-md">\n          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-[#0F172A]">\n            <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />\n            <span className="text-[#0F172A] font-bold">THE JD MIRROR · LIVE CREDIBILITY</span>\n          </div>\n          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">\n            " The exact lines from real Indian JDs{" "}\n            <span className="italic text-[#8A6D1F]">\n              and the module we built to train for each one.\n            </span>{" "}\n            "\n          </h2>\n          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">\n            Recruiters write JDs in a very specific language. We read thousands of them, extract\n            what actually repeats, and turn each recurring requirement into a graded week of\n            training with a real deliverable. Nothing in our syllabus is academic filler.\n          </p>\n        </div>\n\n        {/* Track Grid */}\n        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">\n          {JD_PROVENANCE.map((p) => {\n            const theme = TRACK_THEMES[p.slug] ?? DEFAULT_THEME;\n            const phrases = p.topJdPhrases.slice(0, 3);\n            const avgCoverage = Math.round(\n              (phrases.reduce((s, x) => s + x.coverage, 0) / phrases.length) * 100,\n            );\n            return (\n              <article\n                key={p.slug}\n                className="flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"\n              >\n                {/* Curved Top Gradient Banner */}\n                <div\n                  className={`relative bg-gradient-to-r ${theme.gradient} p-5 text-white overflow-hidden min-h-[115px] flex flex-col justify-between`}\n                >\n                  <div className="flex items-center gap-2 relative z-10">\n                    <span className="inline-flex items-center gap-1 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">\n                      <BookOpen className="h-2.5 w-2.5 text-[#2563EB]" />\n                      <span className="text-[#0F172A]">TRACK</span>\n                    </span>\n                    <span className="inline-flex items-center gap-1.5 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-sm">\n                      <span\n                        className="h-1.5 w-1.5 rounded-full"\n                        style={{ backgroundColor: theme.accent }}\n                      />\n                      <span className="text-[#0F172A]">{avgCoverage}% match</span>\n                    </span>\n                  </div>\n\n                  <div className="relative z-10 pt-2">\n                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">\n                      {p.roleTitle}\n                    </h3>\n                  </div>\n\n                  {/* Background Watermark Emoji */}\n                  <span className="absolute right-2 -bottom-2 text-5xl opacity-30 select-none pointer-events-none">\n                    {theme.emoji}\n                  </span>\n                </div>\n\n                {/* White Card Body */}\n                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">\n                  <div className="space-y-3">\n                    {/* Stat Strip */}\n                    <div className="flex items-center gap-2 text-xs text-[#475569] font-semibold">\n                      <span className="font-mono font-bold text-[#0F172A]">\n                        {p.jdCount.toLocaleString("en-IN")} JDs\n                      </span>\n                      <span>•</span>\n                      <span className="flex items-center gap-1 text-[#334155]">\n                        <MapPin className="h-3 w-3 text-[#64748B]" />\n                        {p.topMetros.slice(0, 2).join(" · ")}\n                      </span>\n                    </div>\n\n                    {/* Dark Slate Phrase Rows with High-Contrast Pure White Text */}\n                    <ul className="space-y-2.5">\n                      {phrases.map((phr) => {\n                        const pct = Math.round(phr.coverage * 100);\n                        return (\n                          <li\n                            key={phr.phrase}\n                            className="tone-dark bg-[#0F172A] text-slate-100 rounded-xl p-3.5 space-y-2 shadow-sm border border-slate-800"\n                          >\n                            <div className="flex items-start gap-2.5">\n                              <CheckCircle2\n                                style={{ color: "#38bdf8" }}\n                                className="h-4 w-4 shrink-0 mt-0.5 text-sky-400"\n                              />\n                              <p\n                                style={{ color: "#F8FAFC" }}\n                                className="text-xs font-bold text-[#F8FAFC] leading-snug tracking-tight"\n                              >\n                                "{phr.phrase}"\n                              </p>\n                            </div>\n                            <div className="flex items-center gap-2 pt-0.5">\n                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">\n                                <div\n                                  className="h-full rounded-full transition-all duration-500"\n                                  style={{ width: `${pct}%`, backgroundColor: "#38bdf8" }}\n                                />\n                              </div>\n                              <span\n                                style={{ color: "#38bdf8" }}\n                                className="font-mono text-xs font-bold text-sky-300 shrink-0"\n                              >\n                                {pct}%\n                              </span>\n                            </div>\n                          </li>\n                        );\n                      })}\n                    </ul>\n\n                    {/* Warm Tan Notice Banner with High-Contrast Dark Amber Text */}\n                    {p.lastChange && (\n                      <div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs">\n                        <RefreshCw className="h-3.5 w-3.5 text-[#78350F] shrink-0 mt-0.5" />\n                        <span className="leading-snug text-[#78350F] font-medium">\n                          <strong className="font-bold text-[#78350F]">\n                            Updated {formatRefreshDate(p.lastChange.dateISO)}:\n                          </strong>{" "}\n                          {p.lastChange.note}\n                        </span>\n                      </div>\n                    )}\n                  </div>\n\n                  {/* Outline Button at Bottom of Card */}\n                  <div className="pt-2">\n                    <Link\n                      to="/courses/$slug"\n                      params={{ slug: p.slug }}\n                      className="text-xs h-10 px-4 w-full flex items-center justify-center gap-2 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm"\n                    >\n                      <span className="text-[#0F172A]">Explore track</span>\n                      <ArrowRight className="h-3.5 w-3.5 text-[#64748B]" />\n                    </Link>\n                  </div>\n                </div>\n              </article>\n            );\n          })}\n        </div>\n      </div>\n    </section>\n  );\n}\n';
const __vite_glob_1_1 = `import { ShieldCheck, FileSearch, MapPin } from "lucide-react";
import {
  getJdProvenance,
  RESEARCH_REFRESH_QUARTER,
  refreshQuarter,
  coverageBand,
} from "@/data/jdProvenance";

/**
 * Compact inline pill — use in course cards / hero strip.
 * "Built from 1,247 live Drug Safety Associate JDs · refreshed Oct 2026"
 */
export function JDProvenancePill({ slug, className }: { slug: string; className?: string }) {
  const data = getJdProvenance(slug);
  if (!data) return null;
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-3 py-1.5 text-xs font-semibold text-eyebrow-strong " +
        (className ?? "")
      }
    >
      <ShieldCheck className="h-3.5 w-3.5" />
      Built from current {data.roleTitle} JDs
      <span className="text-eyebrow/70">· refreshed {refreshQuarter(data.refreshedOn)}</span>
    </span>
  );
}

/**
 * Module chip — sits next to a syllabus week.
 * "Satisfies JD line: 'ICSR end-to-end processing' — seen in 91% of JDs"
 */
export function JDProvenanceModuleChip({
  phrase,
  coverage,
  className,
}: {
  phrase: string;
  coverage: number;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex items-start gap-1.5 rounded-md border border-accent-glow/25 bg-accent-glow/[0.06] px-2 py-1 text-micro font-medium text-eyebrow-strong/90 " +
        (className ?? "")
      }
    >
      <FileSearch className="mt-0.5 h-3 w-3 flex-shrink-0 text-eyebrow" />
      <span>
        Satisfies JD line: <span className="italic">&ldquo;{phrase}&rdquo;</span>{" "}
        <span className="text-eyebrow/80">· {coverageBand(coverage)}</span>
      </span>
    </span>
  );
}

/**
 * Full trust block — methodology + sources + sample size + cadence.
 * Use on /about, /proof, /jd-mirror, and home page credibility section.
 */
export function JDProvenanceBlock({ className }: { className?: string }) {
  const SOURCES = ["Naukri", "LinkedIn India", "Foundit", "Company careers pages"];
  return (
    <div
      className={"rounded-3xl border border-slate-800 bg-[#0B1426] p-6 sm:p-8 " + (className ?? "")}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-3 py-1">
        <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#7DD3FC" }} />
        <p
          className="font-mono text-micro font-bold uppercase tracking-[0.22em]"
          style={{ color: "#7DD3FC" }}
        >
          JD-derived syllabus methodology
        </p>
      </div>
      <h3 className="mt-4 text-h4 font-bold leading-tight sm:text-h3" style={{ color: "#F8FAFC" }}>
        We don't teach subjects. We train people into specific Indian fresher job roles.
      </h3>
      <p
        className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base"
        style={{ color: "#CBD5E1" }}
      >
        Every Arzon Careers track is reverse-engineered from current Indian job descriptions. We
        read the fresher openings posted on Naukri, LinkedIn India, Foundit and company careers
        pages, extract the recurring skills, tools and deliverables, and only then design the
        12-week syllabus and capstone. We refresh this market read every quarter.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p
            className="font-mono text-micro font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#7DD3FC" }}
          >
            Last refresh
          </p>
          <p
            className="mt-1 font-display text-h2 font-bold tabular-nums"
            style={{ color: "#F8FAFC" }}
          >
            {RESEARCH_REFRESH_QUARTER}
          </p>
          <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>
            re-read once every quarter, by hand
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p
            className="font-mono text-micro font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#7DD3FC" }}
          >
            Tracks
          </p>
          <p className="mt-1 font-display text-h2 font-bold" style={{ color: "#F8FAFC" }}>
            6 role tracks
          </p>
          <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>
            PV · Coding · CDM · SAS · RA · Med Writing
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p
            className="font-mono text-micro font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#7DD3FC" }}
          >
            Sources
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {SOURCES.map((s) => (
              <li
                key={s}
                className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium"
                style={{ color: "#F1F5F9" }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs"
        style={{ color: "#CBD5E1" }}
      >
        <MapPin className="h-3.5 w-3.5" style={{ color: "#7DD3FC" }} />
        Indian fresher market only — roles, salaries and tools that actually hire here.
      </div>
    </div>
  );
}
`;
const SOURCES = {
  .../* @__PURE__ */ Object.assign({
    "/src/components/landing/AIRiskExplainer.tsx": __vite_glob_0_0,
    "/src/components/landing/ApplicationForm.tsx": __vite_glob_0_1,
    "/src/components/landing/AssayExplainer.tsx": __vite_glob_0_2,
    "/src/components/landing/AuthBadge.tsx": __vite_glob_0_3,
    "/src/components/landing/BentoProgrammes.tsx": __vite_glob_0_4,
    "/src/components/landing/BurntBeforeStrip.tsx": __vite_glob_0_5,
    "/src/components/landing/CTAButton.tsx": __vite_glob_0_6,
    "/src/components/landing/CertificateShowcase.tsx": __vite_glob_0_7,
    "/src/components/landing/CertificateVerifyMini.tsx": __vite_glob_0_8,
    "/src/components/landing/CohortStories.tsx": __vite_glob_0_9,
    "/src/components/landing/CohortVoices.tsx": __vite_glob_0_10,
    "/src/components/landing/Comparison.tsx": __vite_glob_0_11,
    "/src/components/landing/CounsellorLeadForm.tsx": __vite_glob_0_12,
    "/src/components/landing/Countdown.tsx": __vite_glob_0_13,
    "/src/components/landing/CounterProof.tsx": __vite_glob_0_14,
    "/src/components/landing/CredibilityStrip.tsx": __vite_glob_0_15,
    "/src/components/landing/DayInTheLifeStrip.tsx": __vite_glob_0_16,
    "/src/components/landing/DemandUnlockStrip.tsx": __vite_glob_0_17,
    "/src/components/landing/DeploymentReadyStrip.tsx": __vite_glob_0_18,
    "/src/components/landing/EdtechLies.tsx": __vite_glob_0_19,
    "/src/components/landing/EtvVideoEmbed.tsx": __vite_glob_0_20,
    "/src/components/landing/ExitIntentQuiz.tsx": __vite_glob_0_21,
    "/src/components/landing/FAQ.tsx": __vite_glob_0_22,
    "/src/components/landing/FinalCTA.tsx": __vite_glob_0_23,
    "/src/components/landing/Footer.tsx": __vite_glob_0_24,
    "/src/components/landing/GovtTrustBlock.tsx": __vite_glob_0_25,
    "/src/components/landing/Hero.tsx": __vite_glob_0_26,
    "/src/components/landing/HiringPartnerWall.tsx": __vite_glob_0_27,
    "/src/components/landing/HowItWorks.tsx": __vite_glob_0_28,
    "/src/components/landing/InsideSalesUrgencyStrip.tsx": __vite_glob_0_29,
    "/src/components/landing/InstitutionalReachWall.tsx": __vite_glob_0_30,
    "/src/components/landing/InterviewRoadmap.tsx": __vite_glob_0_31,
    "/src/components/landing/LegalTransparencyBlock.tsx": __vite_glob_0_32,
    "/src/components/landing/LimitedSeatsCountdown.tsx": __vite_glob_0_33,
    "/src/components/landing/LiveBar.tsx": __vite_glob_0_34,
    "/src/components/landing/LiveCurriculum.tsx": __vite_glob_0_35,
    "/src/components/landing/LogoMarquee.tsx": __vite_glob_0_36,
    "/src/components/landing/MidPageReserveStrip.tsx": __vite_glob_0_37,
    "/src/components/landing/MissionValuesBlock.tsx": __vite_glob_0_38,
    "/src/components/landing/MobileHeroProofCard.tsx": __vite_glob_0_39,
    "/src/components/landing/MobileTrustStrip.tsx": __vite_glob_0_40,
    "/src/components/landing/MobileWhatsAppFAB.tsx": __vite_glob_0_41,
    "/src/components/landing/MotionToggle.tsx": __vite_glob_0_42,
    "/src/components/landing/NationalMediaBlock.tsx": __vite_glob_0_43,
    "/src/components/landing/Nav.tsx": __vite_glob_0_44,
    "/src/components/landing/NavSectionsContext.tsx": __vite_glob_0_45,
    "/src/components/landing/PageCTA.tsx": __vite_glob_0_46,
    "/src/components/landing/ParentSection.tsx": __vite_glob_0_47,
    "/src/components/landing/Pricing.tsx": __vite_glob_0_48,
    "/src/components/landing/ProgrammeCover.tsx": __vite_glob_0_49,
    "/src/components/landing/ReadinessTimeline.tsx": __vite_glob_0_50,
    "/src/components/landing/RecruiterOutcomes.tsx": __vite_glob_0_51,
    "/src/components/landing/Reveal.tsx": __vite_glob_0_52,
    "/src/components/landing/ScrollProgress.tsx": __vite_glob_0_53,
    "/src/components/landing/SearchIntentStrip.tsx": __vite_glob_0_54,
    "/src/components/landing/SectionHeader.tsx": __vite_glob_0_55,
    "/src/components/landing/SectionSkeleton.tsx": __vite_glob_0_56,
    "/src/components/landing/StickyMobileCTA.tsx": __vite_glob_0_57,
    "/src/components/landing/StudentQuestionBank.tsx": __vite_glob_0_58,
    "/src/components/landing/TaskPartnershipBlock.tsx": __vite_glob_0_59,
    "/src/components/landing/TrustLedgerStrip.tsx": __vite_glob_0_60
  }),
  .../* @__PURE__ */ Object.assign({
    "/src/components/credibility/JDMirror.tsx": __vite_glob_1_0,
    "/src/components/credibility/JDProvenanceBadge.tsx": __vite_glob_1_1
  })
};
const RULES = [{
  id: "em-dash",
  label: "Em-dash in copy (—)",
  severity: "warn",
  category: "typography",
  match: (l) => indices(l, /—/g)
}, {
  id: "en-dash-non-numeric",
  label: "En-dash outside numeric range (–)",
  severity: "warn",
  category: "typography",
  match: (l) => {
    const hits = [];
    const re = /–/g;
    let m;
    while (m = re.exec(l)) {
      const before = l[m.index - 1] ?? "";
      const after = l[m.index + 1] ?? "";
      if (/\d/.test(before) && /\d/.test(after)) continue;
      hits.push(m.index);
    }
    return hits;
  }
}, {
  id: "curly-double-quote",
  label: "Curly double quote (“ ”)",
  severity: "warn",
  category: "typography",
  match: (l) => indices(l, /[\u201C\u201D]/g)
}, {
  id: "curly-single-quote",
  label: "Curly single quote / apostrophe (‘ ’)",
  severity: "warn",
  category: "typography",
  match: (l) => indices(l, /[\u2018\u2019]/g)
}, {
  id: "triple-dot",
  label: "Three dots instead of ellipsis (…)",
  severity: "info",
  category: "typography",
  match: (l) => indices(l, /\.{3}/g)
}, {
  id: "double-space",
  label: "Double space inside copy",
  severity: "info",
  category: "typography",
  match: (l) => {
    const trimmed = l.replace(/^\s+/, "");
    const offset = l.length - trimmed.length;
    const hits = [];
    const re = /[A-Za-z.,)] {2,}[A-Za-z(]/g;
    let m;
    while (m = re.exec(trimmed)) hits.push(offset + m.index + 1);
    return hits;
  }
}, {
  id: "todo",
  label: "TODO / FIXME marker",
  severity: "info",
  category: "typography",
  match: (l) => indices(l, /\b(TODO|FIXME)\b/g)
}];
function indices(line, re) {
  const hits = [];
  let m;
  while (m = re.exec(line)) hits.push(m.index);
  return hits;
}
function shortPath(absPath) {
  return absPath.replace(/^\/src\//, "");
}
function scan() {
  const findings = [];
  let scannedFiles = 0;
  for (const [absPath, source] of Object.entries(SOURCES)) {
    if (typeof source !== "string") continue;
    scannedFiles += 1;
    const lines = source.split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      const raw = lines[i];
      const trimmed = raw.trim();
      if (trimmed.startsWith("import ") || trimmed.startsWith("// ")) continue;
      for (const rule of RULES) {
        const cols = rule.match(raw);
        for (const col of cols) {
          findings.push({
            file: shortPath(absPath),
            line: i + 1,
            column: col + 1,
            snippet: raw.trim().slice(0, 200),
            rule: rule.label,
            severity: rule.severity,
            category: rule.category
          });
        }
      }
    }
    const buttonRe = /<button\b([^>]*)>([\s\S]*?)<\/button>/g;
    let bm;
    while (bm = buttonRe.exec(source)) {
      const attrs = bm[1];
      const inner = bm[2];
      const hasLabel = /\baria-label(?:ledby)?\s*=/.test(attrs);
      const innerStripped = inner.replace(/\{[^}]*\}/g, "").replace(/<[^>]+\/?>/g, "").trim();
      const innerHasText = innerStripped.length > 0;
      if (!hasLabel && !innerHasText) {
        const lineIdx = source.slice(0, bm.index).split(/\r?\n/).length;
        findings.push({
          file: shortPath(absPath),
          line: lineIdx,
          column: 1,
          snippet: source.slice(bm.index, bm.index + 120).split(/\r?\n/)[0],
          rule: "Icon-only <button> missing aria-label",
          severity: "warn",
          category: "a11y"
        });
      }
    }
  }
  return {
    findings,
    scannedFiles
  };
}
const scanLandingCopy_createServerFn_handler = createServerRpc({
  id: "762173d2beeab8a950902df4e81eea4585a41dbc13d3143e6ebd22a77a9e68c5",
  name: "scanLandingCopy",
  filename: "src/lib/landingCopyScan.functions.ts"
}, (opts) => scanLandingCopy.__executeServer(opts));
const scanLandingCopy = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(scanLandingCopy_createServerFn_handler, async ({
  context
}) => {
  await requireStaff(context.userId);
  const {
    findings,
    scannedFiles
  } = scan();
  findings.sort((a, b) => {
    if (a.severity !== b.severity) return a.severity === "warn" ? -1 : 1;
    if (a.file !== b.file) return a.file.localeCompare(b.file);
    return a.line - b.line;
  });
  const warnCount = findings.filter((f) => f.severity === "warn").length;
  const a11yWarnCount = findings.filter((f) => f.severity === "warn" && f.category === "a11y").length;
  const typographyWarnCount = warnCount - a11yWarnCount;
  const publishReady = warnCount === 0;
  return {
    findings,
    scannedFiles,
    scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
    summary: {
      warnCount,
      typographyWarnCount,
      a11yWarnCount,
      infoCount: findings.length - warnCount,
      publishReady
    }
  };
});
export {
  scanLandingCopy_createServerFn_handler
};
