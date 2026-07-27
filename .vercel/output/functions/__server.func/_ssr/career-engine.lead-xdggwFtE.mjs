import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { j as trackCEFunnelStep, P as getAttemptId, T as getSessionId, k as CareerShell, a0 as NEXT_COHORT, n as trackCECtaClicked, a1 as computeResult, U as startSession, a2 as recordAnswer, a3 as getLeadId, a4 as submitLead, t as track } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { Z as Check, bB as CalendarClock } from "../_libs/lucide-react.mjs";
import { p as objectType, w as booleanType, q as stringType } from "../_libs/zod.mjs";
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
objectType({
  name: stringType().trim().min(2).max(80),
  phone: stringType().trim().regex(/^[5-9]\d{9}$/),
  email: stringType().trim().email().max(120),
  whatsapp: booleanType()
});
function sanitizePhone(v) {
  const digits = v.replace(/\D/g, "");
  if (digits.length >= 10) return digits.slice(-10);
  if (digits.length > 0) return digits.padEnd(10, "0");
  return "9876543210";
}
const fieldValid = {
  name: (v) => v.trim().length >= 2 && v.trim().length <= 80,
  phone: (v) => v.replace(/\D/g, "").length >= 9,
  email: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()) && v.trim().length <= 120
};
function LeadPage() {
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    whatsapp: true
  });
  const [busy, setBusy] = reactExports.useState(false);
  const inFlightRef = reactExports.useRef(false);
  const [answers, setAnswers] = reactExports.useState(null);
  const phoneRef = reactExports.useRef(null);
  const emailRef = reactExports.useRef(null);
  const validity = reactExports.useMemo(() => ({
    name: fieldValid.name(form.name),
    phone: fieldValid.phone(form.phone),
    email: fieldValid.email(form.email)
  }), [form.name, form.phone, form.email]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      trackCEFunnelStep({
        step: "lead_form",
        sessionId: getSessionId(),
        attemptId: getAttemptId()
      });
    } catch {
    }
    try {
      const a = JSON.parse(sessionStorage.getItem("ce_answers") || "{}");
      if (!a || !a.stream) {
        navigate({
          to: "/career-engine/test"
        }).catch(() => {
          window.location.href = "/career-engine/test";
        });
        return;
      }
      setAnswers(a);
    } catch {
      navigate({
        to: "/career-engine/test"
      }).catch(() => {
        window.location.href = "/career-engine/test";
      });
    }
  }, [navigate]);
  const runSubmit = async (data) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setBusy(true);
    trackCECtaClicked({
      step: "lead_form",
      target: "submit",
      sessionId: getSessionId(),
      attemptId: getAttemptId()
    });
    try {
      const currentAnswers = answers || JSON.parse(sessionStorage.getItem("ce_answers") || "{}");
      const result = computeResult(currentAnswers);
      sessionStorage.setItem("ce_result", JSON.stringify(result));
      let sid = getSessionId();
      if (!sid) {
        try {
          sid = await startSession(currentAnswers.stream || "pharmacovigilance");
          for (const [qid, val] of Object.entries(currentAnswers)) {
            try {
              await recordAnswer(sid, qid, val);
            } catch {
            }
          }
        } catch (e) {
          console.warn("Session initialization failed, continuing", e);
        }
      }
      let leadId = getLeadId();
      try {
        if (sid) {
          leadId = await submitLead({
            sessionId: sid,
            name: data.name,
            phone: `91${data.phone}`,
            email: data.email,
            whatsappOptin: data.whatsapp,
            result
          });
        }
      } catch (err) {
        console.warn("Backend submit lead failed, continuing with client lead ID", err);
      }
      if (!leadId) {
        leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      }
      sessionStorage.setItem("ce_lead_id", leadId);
      try {
        track("lead_submitted", {
          session_id: sid,
          lead_id: leadId,
          props: {
            archetype: result.archetypeId,
            fit_score: result.fitScore,
            attempt_id: getAttemptId()
          },
          dedupeKey: `lead_submitted:${getAttemptId() ?? sid ?? leadId}`
        });
      } catch {
      }
      navigate({
        to: "/career-engine/result",
        search: {
          id: leadId
        }
      }).catch(() => {
        window.location.href = `/career-engine/result?id=${leadId}`;
      });
    } catch (err) {
      console.error("Lead submission error", err);
      const leadId = getLeadId() || `lead_${Date.now()}`;
      window.location.href = `/career-engine/result?id=${leadId}`;
    } finally {
      inFlightRef.current = false;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (inFlightRef.current) return;
    const cleanName = form.name.trim().length >= 2 ? form.name.trim() : "Candidate";
    const cleanPhone = sanitizePhone(form.phone);
    const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim());
    const cleanEmail = isEmailValid ? form.email.trim() : "candidate@arzon.in";
    const payload = {
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      whatsapp: form.whatsapp
    };
    await runSubmit(payload);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CareerShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-[#1D4ED8]/30 bg-[#1D4ED8]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-sky-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-[#1D4ED8]" }),
        " Score ready · 30-sec unlock"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-4", children: "Unlock your full result" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-md text-sm text-slate-300", children: "Quick details so we can send your report and reserve your slot for the next batch." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mx-auto mt-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-amber-200/85", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-3.5 w-3.5 text-amber-400" }),
        " Next batch ·",
        " ",
        NEXT_COHORT.startsLabel
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, "aria-busy": busy, className: "mx-auto mt-6 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-center gap-2", children: [
        [validity.name, validity.phone, validity.email].map((ok, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 rounded-full transition-all duration-300 ${ok ? "w-6 bg-[#1D4ED8]" : "w-3 bg-white/15"}` }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-mono text-xs uppercase tracking-wider text-slate-400", children: "3 fields · ~30 sec" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "name", className: "text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your Name" }),
          validity.name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "✓ OK" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", autoComplete: "name", autoFocus: true, required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), onKeyDown: (e) => {
          if (e.key === "Enter" && validity.name) {
            e.preventDefault();
            phoneRef.current?.focus();
          }
        }, placeholder: "Full name", className: "h-11 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500 rounded-xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "phone", className: "text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "WhatsApp Number" }),
          validity.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "✓ OK" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-11 shrink-0 items-center rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-300 font-mono", children: "+91" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ref: phoneRef, id: "phone", type: "tel", inputMode: "numeric", autoComplete: "tel-national", required: true, value: form.phone, onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }), onKeyDown: (e) => {
            if (e.key === "Enter" && validity.phone) {
              e.preventDefault();
              emailRef.current?.focus();
            }
          }, placeholder: "10-digit mobile number", className: "h-11 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500 rounded-xl" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "email", className: "text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email for Your Report" }),
          validity.email && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "✓ OK" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ref: emailRef, id: "email", type: "email", autoComplete: "email", required: true, value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }), placeholder: "name@example.com", className: "h-11 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500 rounded-xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2.5 pt-1 text-xs text-slate-300 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.whatsapp, onChange: (e) => setForm({
          ...form,
          whatsapp: e.target.checked
        }), className: "mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#1D4ED8] focus:ring-[#1D4ED8]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug", children: "Send my report and next-batch updates on WhatsApp. You can opt out anytime — one tap." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, className: "text-sm h-12 px-4 w-full flex items-center justify-center gap-2 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] mt-2", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Unlocking your report..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "See my result & save my slot →" }) })
    ] })
  ] });
}
export {
  LeadPage as component
};
