import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a7 as requestDemandTrack } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { I as CircleCheck, a4 as LoaderCircle, a6 as ArrowLeft, m as ShieldCheck, q as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "./client-CMxFZmfM.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/zod.mjs";
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
const INITIAL = {
  title: "",
  category: "healthcare",
  pitch: "",
  name: "",
  phone: "",
  email: "",
  experienceLevel: "fresher",
  why: ""
};
const CATEGORY_LABELS = {
  engineering: "Engineering",
  healthcare: "Healthcare",
  "life-sciences": "Life sciences",
  business: "Business",
  tech: "Tech",
  agriculture: "Agriculture",
  design: "Design",
  other: "Other"
};
const EXPERIENCE_LABELS = {
  student: "Student",
  fresher: "Fresher (0–1 yr)",
  "1-3y": "1–3 years",
  "3-5y": "3–5 years",
  "5y+": "5+ years"
};
function validate(form) {
  const errs = {};
  if (form.title.trim().length < 4) errs.title = "Add a role title (4+ characters).";
  if (form.title.trim().length > 80) errs.title = "Keep the title under 80 characters.";
  if (form.pitch.trim().length < 20) errs.pitch = "Tell us in at least 20 characters why this role matters.";
  if (form.pitch.trim().length > 500) errs.pitch = "Keep the pitch under 500 characters.";
  if (form.name.trim().length < 1) errs.name = "Your name is required.";
  if (!/^[+0-9 ()-]{7,20}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number.";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Enter a valid email or leave blank.";
  if (form.why.trim().length < 1) errs.why = "Tell us why you want this track.";
  if (form.why.trim().length > 800) errs.why = "Keep your reason under 800 characters.";
  return errs;
}
function RequestTrackPage() {
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(INITIAL);
  const [errors, setErrors] = reactExports.useState({});
  const [serverError, setServerError] = reactExports.useState(null);
  const mutation = useMutation({
    mutationFn: (data) => requestDemandTrack({
      data
    }),
    onSuccess: (res) => {
      if (res?.ok && res.slug) {
        setTimeout(() => {
          navigate({
            to: "/build/$slug",
            params: {
              slug: res.slug
            }
          });
        }, 1400);
      }
    },
    onError: (err) => {
      setServerError(err.message ?? "Something went wrong. Try again.");
    }
  });
  const update = (key, value) => {
    setForm((f) => ({
      ...f,
      [key]: value
    }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = {
        ...e
      };
      delete next[key];
      return next;
    });
    setServerError(null);
  };
  const onSubmit = (e) => {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-sky-50 ring-1 ring-sky-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-mono text-micro font-bold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]", children: created ? "Track opened for voting" : "Vote recorded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-h1 font-bold text-black", children: created ? "Your track is live. Voting is open." : dup ? "You already voted on this one." : "Your vote is in." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-body-sm leading-relaxed text-black/70", children: "Redirecting you to the public build page…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto mt-5 h-5 w-5 motion-safe:animate-spin text-black/50" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-6 py-14 sm:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/build", className: "inline-flex items-center gap-1.5 text-caption font-semibold text-black/70 hover:text-black", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Back to pipeline"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-mono text-micro font-bold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]", children: "Request a track" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-h1 font-bold text-black", children: "Propose the role we should build for next." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-body-sm leading-relaxed text-black/75", children: "If 25 verified peers want the same role, we open the build publicly — curriculum, mentors, assessments and internship partners, all dated." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, noValidate: true, className: "mt-10 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { legend: "The track", desc: "What role should we build infrastructure for?", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "title", label: "Role title", hint: "e.g. Clinical SAS Programmer, Site Reliability Engineer", error: errors.title, required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "title", type: "text", maxLength: 80, autoComplete: "off", value: form.title, onChange: (e) => update("title", e.target.value), className: inputCls(!!errors.title) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "category", label: "Category", error: errors.category, required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { id: "category", value: form.category, onChange: (e) => update("category", e.target.value), className: inputCls(false), children: Object.keys(CATEGORY_LABELS).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: CATEGORY_LABELS[c] }, c)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "pitch", label: "Why this role matters", hint: `${form.pitch.trim().length}/500 — describe the demand signal you're seeing.`, error: errors.pitch, required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "pitch", rows: 4, maxLength: 500, value: form.pitch, onChange: (e) => update("pitch", e.target.value), className: inputCls(!!errors.pitch), placeholder: "Hiring teams in Hyderabad keep posting for this role with no qualified candidates…" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { legend: "Your details", desc: "So we can verify demand and update you when the track ships.", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "name", label: "Full name", error: errors.name, required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "name", type: "text", maxLength: 120, autoComplete: "name", value: form.name, onChange: (e) => update("name", e.target.value), className: inputCls(!!errors.name) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "phone", label: "Phone (WhatsApp)", error: errors.phone, required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "phone", type: "tel", inputMode: "tel", maxLength: 20, autoComplete: "tel", value: form.phone, onChange: (e) => update("phone", e.target.value), className: inputCls(!!errors.phone), placeholder: "+91 98765 43210" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "email", label: "Email", hint: "Optional — for build updates.", error: errors.email, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", maxLength: 255, autoComplete: "email", value: form.email, onChange: (e) => update("email", e.target.value), className: inputCls(!!errors.email) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "experienceLevel", label: "Where you are today", error: errors.experienceLevel, required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { id: "experienceLevel", value: form.experienceLevel, onChange: (e) => update("experienceLevel", e.target.value), className: inputCls(false), children: Object.keys(EXPERIENCE_LABELS).map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: x, children: EXPERIENCE_LABELS[x] }, x)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "why", label: "Why you want this track", hint: `${form.why.trim().length}/800 — what would shipping this unlock for you?`, error: errors.why, required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "why", rows: 3, maxLength: 800, value: form.why, onChange: (e) => update("why", e.target.value), className: inputCls(!!errors.why) }) })
      ] }),
      serverError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "alert", className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-caption text-red-800", children: serverError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-1.5 text-meta text-black/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-[color:var(--teal-ink)]" }),
          "No spam. Phone is used only to verify demand and ship updates."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isPending, className: "btn btn-primary btn-lg inline-flex items-center justify-center disabled:opacity-60", children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
          " Submitting…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Submit request ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Fieldset({
  legend,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "rounded-2xl border border-black/10 bg-white p-5 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "px-1 font-mono text-micro font-bold uppercase tracking-[0.18em] text-black/60", children: legend }),
    desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption text-black/65", children: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-5", children })
  ] });
}
function Field({
  id,
  label,
  hint,
  error,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: id, className: "flex items-center gap-1 text-caption font-semibold text-black", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-red-600", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-meta font-medium text-red-700", children: error }) : hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-meta text-black/55", children: hint }) : null
  ] });
}
function inputCls(hasError) {
  return ["w-full rounded-lg border bg-white px-3.5 py-2.5 text-body-sm text-black", "shadow-[inset_0_1px_0_rgba(15,23,42,0.02)]", "placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-offset-1", hasError ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-black/15 focus:border-[color:var(--teal-ink)] focus:ring-[color:var(--teal-soft)]"].join(" ");
}
export {
  RequestTrackPage as component
};
