import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Section } from "./Section-DK9GN_Ac.mjs";
import { R as RUBRIC_BY_SLUG } from "./gradingRubric-CufAaT1p.mjs";
import { a as JD_PROVENANCE_BY_SLUG, c as coverageBand } from "./jdProvenance-C_dgELW0.mjs";
import { W as WORK_SAMPLES } from "./WorkSampleCard-CIEmOSKU.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { l as logVerificationEvent, g as generateArtifactToken } from "./verificationAudit-BO_-cmet.mjs";
import { V as VerificationAuditTrail } from "./VerificationAuditTrail-BhakBSTq.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { a_ as Route$q } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { ae as QrCode, q as ArrowRight, ac as FileText, m as ShieldCheck, I as CircleCheck, ar as Copy } from "../_libs/lucide-react.mjs";
import { p as objectType, q as stringType, y as literalType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./analytics-Do62eWB1.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./moments.types-CDdnLKsa.mjs";
import "./enrolment.functions-Cs_77DUe.mjs";
import "./enrolmentTiers-CKOrj6Lb.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/workflow__serde.mjs";
import "../_libs/ai-sdk__openai.mjs";
import "../_libs/lovable.dev__webhooks-js.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./client.server-DUn3rRvm.mjs";
import "./redis.server-jD5sLB4g.mjs";
import "../_libs/react-email__render.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__text.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__button.mjs";
import "../_libs/react-email__hr.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
const schema = objectType({
  recruiter_email: stringType().trim().toLowerCase().email().max(200),
  recruiter_org: stringType().trim().min(1).max(200),
  jd_task: stringType().trim().min(1).max(200),
  message: stringType().trim().max(1e3).optional().or(literalType(""))
});
const TTL_HOURS = 72;
const SUGGESTED_TASKS = [
  "Capstone case file (full)",
  "Day-30 deliverable (graded)",
  "Mid-term assessment + auditor sheet",
  "Compliance checklist walkthrough",
  "JD-phrase coverage report"
];
function ArtifactRequestLane({ candidateRef }) {
  const [submitted, setSubmitted] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      recruiter_email: fd.get("recruiter_email"),
      recruiter_org: fd.get("recruiter_org"),
      jd_task: fd.get("jd_task"),
      message: fd.get("message") ?? ""
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the fields and try again");
      return;
    }
    setSubmitting(true);
    const token = generateArtifactToken();
    const expiresAt = new Date(Date.now() + TTL_HOURS * 60 * 60 * 1e3);
    const { error: dbError } = await supabase.from("artifact_requests").insert({
      candidate_ref: candidateRef.toUpperCase(),
      recruiter_email: parsed.data.recruiter_email,
      recruiter_org: parsed.data.recruiter_org,
      jd_task: parsed.data.jd_task,
      message: parsed.data.message || null,
      token,
      expires_at: expiresAt.toISOString()
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
    const url = typeof window !== "undefined" ? `${window.location.origin}/r/artifact/${submitted.token}` : `/r/artifact/${submitted.token}`;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-sky-300/50 bg-sky-50 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-sky-700" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-grotesk text-body-sm font-bold text-sky-900", children: "Time-bound verification link issued" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-meta leading-relaxed text-sky-900/80", children: [
          "Valid until ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: submitted.expiresAt.toLocaleString() }),
          ". We've recorded your intent on the candidate's audit trail. Same link is in your inbox."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-xl border border-sky-200 bg-white p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "min-w-0 flex-1 truncate font-mono text-micro text-slate-700", children: url }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigator.clipboard?.writeText(url),
              className: "shrink-0 rounded-lg border border-ink/10 p-1.5 text-slate-600 hover:bg-slate-50",
              "aria-label": "Copy link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/r/artifact/$token",
            params: { token: submitted.token },
            className: "mt-3 inline-flex items-center gap-1.5 text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline",
            children: [
              "Open the verification link ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ]
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "rounded-2xl border border-ink/10 bg-white p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]", children: "Request a specific JD-task artifact" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-2 font-grotesk text-body-sm font-bold text-ink", children: [
      "Get a ",
      TTL_HOURS,
      "-hour verification link"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-meta text-slate-600", children: [
      "Pick the JD task you want to evaluate. We log your request to the candidate's public audit trail and unlock the de-identified deliverable for ",
      TTL_HOURS,
      " hours."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "recruiter_email", type: "email", label: "Work email", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "recruiter_org", label: "Company", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-500", children: "JD task to verify" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            name: "jd_task",
            list: "jd-task-suggestions",
            required: true,
            maxLength: 200,
            placeholder: "Pick one or type your own",
            className: "mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-body-sm text-ink outline-none ring-[color:var(--teal-deep)]/30 focus:ring-2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "jd-task-suggestions", children: SUGGESTED_TASKS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-500", children: "Context (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            name: "message",
            rows: 3,
            maxLength: 1e3,
            className: "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-body-sm text-ink outline-none ring-[color:var(--teal-deep)]/30 focus:ring-2"
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-meta font-semibold text-rose-600", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        disabled: submitting,
        className: "mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--teal-deep)] px-5 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)] disabled:opacity-50",
        children: submitting ? "Issuing link…" : `Issue ${TTL_HOURS}h verification link`
      }
    )
  ] });
}
function Field({
  name,
  label,
  type = "text",
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-500", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        name,
        type,
        required,
        maxLength: 200,
        className: "mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-body-sm text-ink outline-none ring-[color:var(--teal-deep)]/30 focus:ring-2"
      }
    )
  ] });
}
const BAND_TONE = {
  A: "border-sky-400/40 bg-sky-100 text-sky-900",
  "B+": "border-accent-glow/40 bg-sky-100 text-sky-900",
  B: "border-amber-400/40 bg-amber-100 text-amber-900",
  NA: "border-slate-400/40 bg-slate-100 text-slate-700"
};
function CandidatePortfolio({ data }) {
  const rubric = RUBRIC_BY_SLUG[data.trackSlug];
  const provenance = JD_PROVENANCE_BY_SLUG[data.trackSlug];
  const trackTitle = rubric?.title ?? data.trackSlug;
  const sample = WORK_SAMPLES.find((s) => s.trackSlug === data.trackSlug);
  const verifyHref = `/verify?id=${encodeURIComponent(data.id)}`;
  const bandRow = rubric?.rows.find((r) => r.band === data.band);
  reactExports.useEffect(() => {
    void logVerificationEvent(data.id, "portfolio_viewed");
    void logVerificationEvent(data.id, "rubric_viewed");
  }, [data.id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-[#F7F9FC] pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", className: "pt-12 sm:pt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]", children: "Recruiter portfolio · do not share with candidate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 font-grotesk text-h1 font-bold text-ink", children: [
        "Candidate ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[0.85em]", children: data.id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-body-sm text-slate-600", children: [
        trackTitle,
        " · ",
        data.cohort,
        " cohort · Issued ",
        data.issuedOn
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-[1fr_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border-2 p-5 ${BAND_TONE[data.band]}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em]", children: "Grade band" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-grotesk text-h2 font-bold leading-none", children: data.band }),
          bandRow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-md text-caption leading-relaxed", children: bandRow.jdOutcome })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/verify",
            search: { id: data.id },
            className: "flex items-center gap-3 rounded-2xl border border-ink/15 bg-white px-4 py-3 text-caption font-semibold text-ink hover:border-[color:var(--teal-deep)]/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-5 w-5 text-[color:var(--teal-deep)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Verify this certificate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-normal text-slate-500", children: verifyHref })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-3.5 w-3.5 text-slate-400" })
            ]
          }
        )
      ] })
    ] }),
    provenance && /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-h4 font-bold text-ink", children: "What they were graded on" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-caption text-slate-600", children: [
        "Tasks reverse-engineered from current ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: provenance.roleTitle }),
        " JDs (",
        provenance.sources.join(", "),
        "). The candidate’s graded deliverables map to the phrases hiring teams actually write."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 overflow-x-auto rounded-2xl border border-ink/10 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[560px] text-left text-caption", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50 text-micro font-semibold uppercase tracking-[0.16em] text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "JD phrase (verbatim)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "In JDs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Module satisfied" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: provenance.topJdPhrases.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-ink/5 align-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-800", children: p.phrase }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-meta text-slate-600", children: coverageBand(p.coverage) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-700", children: p.satisfiedByModule ?? "—" })
        ] }, p.phrase)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { size: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-h4 font-bold text-ink", children: "Performance artifacts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption text-slate-600", children: "Track-level samples shown below. Individual artifacts (this candidate's actual graded deliverables) are sent on request with the candidate's consent — never published openly." }),
      sample ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-white p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]", children: "Track-level sample" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-grotesk text-body-sm font-bold text-ink", children: sample.artifact }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-micro text-slate-500", children: sample.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5 text-caption leading-relaxed text-slate-700", children: sample.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--teal-deep)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
          ] }, b)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactRequestLane, { candidateRef: data.id })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { size: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VerificationAuditTrail, { candidateRef: data.id }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { size: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-white p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-[color:var(--teal-deep)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-grotesk text-body-sm font-bold text-ink", children: "Want to talk to this candidate?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-caption leading-relaxed text-slate-600", children: "We don't publish candidate email or phone. Send a one-line note and we'll forward it the same day. The candidate decides whether to share contact details." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/contact",
            className: "inline-flex h-10 items-center rounded-full bg-[color:var(--teal-deep)] px-4 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]",
            children: "Forward an intro"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/recruiters",
            className: "inline-flex h-10 items-center rounded-full border border-ink/15 bg-white px-4 text-caption font-semibold text-ink hover:border-[color:var(--teal-deep)]/40",
            children: "See the rubric again"
          }
        )
      ] })
    ] }) })
  ] });
}
const TRACK_PREFIX = {
  PV: "pharmacovigilance",
  MC: "medical-coding",
  CDM: "clinical-data-management",
  SAS: "sas-clinical",
  RA: "regulatory-affairs",
  MW: "medical-writing"
};
function inferTrackFromId(id) {
  const m = id.toUpperCase().match(/^AG-([A-Z]+)-/);
  const code = m?.[1] ?? "";
  return TRACK_PREFIX[code] ?? "pharmacovigilance";
}
function inferCohortFromId(id) {
  const m = id.toUpperCase().match(/-(\d{4})-/);
  return m?.[1] ? `${m[1]}` : "2026";
}
function CandidatePortfolioRoute() {
  const params = Route$q.useParams();
  const search = Route$q.useSearch();
  const trackSlug = search.track ?? inferTrackFromId(params.id);
  const rubric = RUBRIC_BY_SLUG[trackSlug];
  const data = {
    id: params.id.toUpperCase(),
    trackSlug: rubric ? trackSlug : "pharmacovigilance",
    cohort: search.cohort ?? inferCohortFromId(params.id),
    band: search.band ?? "B+",
    issuedOn: search.issued ?? "March 2026",
    initials: params.id.slice(-3).toUpperCase()
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CandidatePortfolio, { data }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CandidatePortfolioRoute as component
};
