import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { M as getProfile, N as hasResumableAttempt, O as startFreshAttempt, j as trackCEFunnelStep, P as getAttemptId, k as CareerShell, Q as ACRI_DIMENSIONS, T as getSessionId, U as startSession, V as trackAttemptStarted, X as saveProfile, Y as createLeadEarly, t as track } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { L as Label } from "./label-CCvxiayl.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as markReadinessStarted, g as getReadinessSessionId, a as markReadinessSubmitted } from "./readinessJourney-ipQMh7Pz.mjs";
import { t as trackEvent } from "./analytics-Do62eWB1.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { a7 as Lock, I as CircleCheck, a6 as ArrowLeft, a4 as LoaderCircle, q as ArrowRight, m as ShieldCheck } from "../_libs/lucide-react.mjs";
import { p as objectType, q as stringType, w as booleanType } from "../_libs/zod.mjs";
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
import "../_libs/tanstack__react-query.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
const schema = objectType({
  name: stringType().trim().min(2, "Please enter your full name").max(80),
  phone: stringType().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
  email: stringType().trim().email("Enter a valid email").max(120),
  whatsapp: booleanType(),
  // Honeypot: must stay empty. Real users never see or fill this.
  website: stringType().max(0, "request rejected").optional().default("")
});
function StartPage() {
  const navigate = useNavigate();
  const existing = getProfile();
  const [form, setForm] = reactExports.useState({
    name: existing?.name ?? "",
    phone: existing?.phone ?? "",
    whatsapp: existing?.whatsappOptin ?? true,
    website: ""
  });
  const [busy, setBusy] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const [step, setStep] = reactExports.useState(1);
  const inFlightRef = reactExports.useRef(false);
  const mountedAtRef = reactExports.useRef(Date.now());
  reactExports.useEffect(() => {
    if (hasResumableAttempt()) {
      navigate({
        to: "/career-engine/test"
      }).catch(() => {
        window.location.href = "/career-engine/test";
      });
      return;
    }
    startFreshAttempt({
      preserveProfile: true
    });
    mountedAtRef.current = Date.now();
    trackCEFunnelStep({
      step: "lead_form",
      attemptId: getAttemptId()
    });
    void markReadinessStarted();
    trackEvent("readiness_test_started", {
      surface: "career-engine-start",
      session_id: getReadinessSessionId()
    });
  }, [navigate]);
  const runFlow = async (data) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setBusy(true);
    setErrorMsg(null);
    try {
      let sid = getSessionId();
      if (!sid) {
        try {
          sid = await startSession(void 0, {
            honeypot: data.website
          });
        } catch {
          sid = `sess_local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        }
      }
      try {
        trackAttemptStarted({
          sessionId: sid,
          attemptId: getAttemptId()
        });
      } catch {
      }
      const dummyEmail = `whatsapp-${data.phone}@arzon.local`;
      saveProfile({
        name: data.name,
        phone: data.phone,
        email: dummyEmail,
        whatsappOptin: data.whatsapp
      });
      try {
        await createLeadEarly({
          sessionId: sid,
          name: data.name,
          phone: data.phone,
          email: dummyEmail,
          whatsappOptin: data.whatsapp
        });
        track("lead_form_viewed", {
          session_id: sid
        });
        void markReadinessSubmitted();
        trackEvent("readiness_test_submitted", {
          surface: "career-engine-start",
          session_id: sid
        });
      } catch (err) {
        console.warn("early lead capture skipped, continuing to test", err);
      }
      navigate({
        to: "/career-engine/test"
      }).catch(() => {
        window.location.href = "/career-engine/test";
      });
    } catch (err) {
      console.warn("start.test submit fallback active", err);
      window.location.href = "/career-engine/test";
    } finally {
      inFlightRef.current = false;
    }
  };
  const validateStep = (s) => {
    if (s === 1) {
      const r = schema.pick({
        name: true
      }).safeParse({
        name: form.name
      });
      return r.success ? null : r.error.issues[0]?.message ?? "Please enter your name";
    }
    if (s === 2) {
      const r = schema.pick({
        phone: true
      }).safeParse({
        phone: form.phone
      });
      return r.success ? null : r.error.issues[0]?.message ?? "Please check your phone number";
    }
    return null;
  };
  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      setErrorMsg(err);
      toast.error(err);
      return;
    }
    setErrorMsg(null);
    setStep((s) => s < 2 ? s + 1 : s);
  };
  const goBack = () => {
    setErrorMsg(null);
    setStep((s) => s > 1 ? s - 1 : s);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (inFlightRef.current) return;
    if (step !== 2) {
      goNext();
      return;
    }
    const formWithDummyEmail = {
      ...form,
      email: `whatsapp-${form.phone}@arzon.local`
    };
    const parsed = schema.safeParse(formWithDummyEmail);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Please check your details";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }
    await runFlow(parsed.data);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CareerShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/[0.08] px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
        " Free · No login · 6 minutes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display mt-4 text-slate-50", children: "Get your free career fit report." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "body-lg mx-auto mt-3 max-w-md text-white/75", children: `Answer 40 questions and we'll map you to the healthcare role you're most likely to land — with an honest "not a fit" rating if the data says so. No spam. No calls unless you ask.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-micro uppercase tracking-[0.18em] text-white/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "40 questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/25", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "~6 minutes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/25", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "13 traits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/25", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "6 paths" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/25", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: 'Honest "not a fit" rating' })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-3 gap-2", children: ACRI_DIMENSIONS.slice(0, 3).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-surface-dim p-3 text-center shadow-lg transition-colors hover:border-white/20 hover:bg-white/[0.04]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mx-auto h-3 w-3 text-white/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-micro uppercase tracking-[0.16em] text-white/80", children: d.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-2 h-1 w-full max-w-[60px] rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-1/3 rounded-full bg-white/20" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 font-mono text-micro uppercase tracking-[0.16em] text-white/55", children: "Locked" })
    ] }, d.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, "aria-busy": busy, className: "mt-7 space-y-4 rounded-2xl border border-white/10 glass-panel-deep p-5 sm:p-7 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", className: "absolute left-[-10000px] top-auto h-px w-px overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "company_url", name: "company_url", type: "text", tabIndex: -1, autoComplete: "new-password", value: form.website, onChange: (e) => setForm({
        ...form,
        website: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between font-mono text-micro uppercase tracking-[0.18em] text-white/55", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Step ",
            step,
            " of 2"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step === 1 ? "Who are you?" : "How do we reach you?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": step * 50, className: "mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.5)] motion-safe:transition-[width] motion-safe:duration-300", style: {
          width: `${step / 2 * 100}%`
        } }) })
      ] }),
      step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-xs text-white/70", children: "Full name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", autoComplete: "name", required: true, autoFocus: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), className: "mt-1.5 h-12 rounded-xl border-white/15 bg-black/40 text-white placeholder:text-white/30 transition-colors focus-visible:border-sky-400 focus-visible:ring-1 focus-visible:ring-sky-400", placeholder: "Your name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-white/55", children: "We'll use this on your career report." })
      ] }) : null,
      step === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "text-xs text-white/70", children: "WhatsApp number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-12 items-center rounded-l-xl border border-r-0 border-white/15 bg-black/40 px-4 text-sm text-white/70", children: "+91" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", inputMode: "numeric", autoComplete: "tel", required: true, autoFocus: true, maxLength: 10, value: form.phone, onChange: (e) => setForm({
              ...form,
              phone: e.target.value.replace(/\D/g, "").slice(0, 10)
            }), className: "h-12 rounded-l-none rounded-r-xl border-white/15 bg-black/40 text-white placeholder:text-white/30 transition-colors focus-visible:border-sky-400 focus-visible:ring-1 focus-visible:ring-sky-400", placeholder: "98765 43210" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs text-white/80 shadow-inner transition-colors hover:border-sky-500/40 hover:bg-sky-500/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "mt-0.5 h-4 w-4 rounded border-white/20 bg-black/40 accent-sky-500", checked: form.whatsapp, onChange: (e) => setForm({
            ...form,
            whatsapp: e.target.checked
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Yes, send my career report and counsellor follow-up on WhatsApp." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-xs text-white/60 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-green-400" }),
          " Private · No spam · Never sold"
        ] })
      ] }) : null,
      errorMsg ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "alert", className: "rounded-xl border border-rose-500/40 bg-rose-500/20 px-4 py-3 text-xs text-rose-200 font-medium", children: errorMsg }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
        step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: goBack, disabled: busy, className: "inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 text-white" }),
          " Back"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, "aria-disabled": busy, className: "inline-flex h-12 sm:min-w-[220px] items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin text-white" }),
          " One sec…"
        ] }) : step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Next ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-4 w-4 text-white" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Unlock my ACRI Preview ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-4 w-4 text-white" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center justify-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-gold" }),
        " Private · No spam · Never sold"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/career-engine", className: "text-xs text-white/80 hover:text-white", children: "← Back" }) })
  ] });
}
export {
  StartPage as component
};
