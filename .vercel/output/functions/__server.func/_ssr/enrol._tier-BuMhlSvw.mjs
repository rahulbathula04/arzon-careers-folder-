import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as useMatches, d as useNavigate, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { i as isTier, T as TIER_META, f as formatInr } from "./enrolmentTiers-CKOrj6Lb.mjs";
import { c as createEnrolmentIntent } from "./enrolment.functions-Cs_77DUe.mjs";
import { I as Route$1f, B as Button, t as track, c as cn } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { L as Label } from "./label-CCvxiayl.mjs";
import { R as ResumeBanner } from "./ResumeBanner-Dihe6zGg.mjs";
import { e as enrolProgressStore } from "./useEnrolProgress-BU665q_a.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { d as Sparkles, m as ShieldCheck, be as User, aj as Phone, a2 as Mail, a3 as MapPin, af as GraduationCap, a7 as Lock, a4 as LoaderCircle, q as ArrowRight, I as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "./createSsrRpc-BV3sOdh8.mjs";
import "../_libs/zod.mjs";
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
function EnrolDetails() {
  const {
    tier
  } = Route$1f.useParams();
  const matches = useMatches();
  const navigate = useNavigate();
  const createIntent = useServerFn(createEnrolmentIntent);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    background: ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  if (!isTier(tier)) return null;
  const hasChildMatch = matches.some((m) => m.routeId.startsWith("/enrol/$tier/") && m.routeId !== "/enrol/$tier");
  if (hasChildMatch) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  const meta = TIER_META[tier];
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }
    if (!form.phone.trim() || form.phone.trim().replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit WhatsApp phone number.");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const {
        intentId,
        intentToken
      } = await createIntent({
        data: {
          tier,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          city: form.city.trim() || null,
          background: form.background.trim() || null,
          basePriceInr: meta.mrpInr,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 256) : null
        }
      });
      track("enrol_intent_created", {
        program_slug: tier,
        props: {
          intent_id: intentId,
          tier
        }
      });
      enrolProgressStore.set({
        intentId,
        intentToken,
        tier,
        step: "payment",
        contact: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim()
        }
      });
      navigate({
        to: "/enrol/$tier/pay",
        params: {
          tier
        },
        search: {
          intent: intentId,
          t: intentToken
        }
      });
    } catch (err) {
      console.error("[enrol] createIntent failed", err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(friendlyIntentError(msg));
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#070B19] text-white px-4 py-8 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-[#0E172F] p-5 backdrop-blur-2xl shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2.5 text-blue-300 font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/30 text-blue-300 ring-1 ring-blue-400/50 font-mono text-xs", children: "1" }),
          "Step 1 of 2: Applicant Profile"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2.5 text-slate-400 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 font-mono text-xs", children: "2" }),
          "Step 2 of 2: Secure Payment & Order"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3.5 h-2 w-full overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.6)]" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.3fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-blue-300 ring-1 ring-blue-400/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-blue-400" }),
          " Fast-Track Direct Registration"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3.5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight", children: [
          "Enrol in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-300", children: meta.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-sm text-slate-300 leading-relaxed font-normal", children: meta.sub }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-3 rounded-2xl border border-blue-500/30 bg-[#0D1938] px-4.5 py-3.5 text-xs text-blue-200 font-medium shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 shrink-0 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "1,240+ candidates" }),
            " across India enrolled this month · MCA + MSME Registered Portal"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { method: "post", noValidate: true, onSubmit, className: "mt-6 grid gap-5 rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "name", autoComplete: "name", label: "Full Name", icon: User, value: form.name, onChange: (v) => setForm({
            ...form,
            name: v
          }), required: true, placeholder: "e.g. Aditi Sharma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "phone", autoComplete: "tel", inputMode: "tel", type: "tel", label: "WhatsApp Phone Number", icon: Phone, value: form.phone, onChange: (v) => setForm({
            ...form,
            phone: v
          }), required: true, placeholder: "+91 98765 43210" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "email", autoComplete: "email", inputMode: "email", type: "email", label: "Email Address", icon: Mail, value: form.email, onChange: (v) => setForm({
            ...form,
            email: v
          }), required: true, placeholder: "aditi@gmail.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "city", autoComplete: "address-level2", label: "City", icon: MapPin, value: form.city, onChange: (v) => setForm({
            ...form,
            city: v
          }), placeholder: "e.g. Hyderabad / Bengaluru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "background", label: "Educational / Career Background (Optional)", icon: GraduationCap, value: form.background, onChange: (v) => setForm({
            ...form,
            background: v
          }), placeholder: "e.g. Pharm.D / B.Sc / B.Tech / Working Pro", className: "sm:col-span-2" }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-rose-500/50 bg-rose-950/60 p-4 text-xs font-semibold text-rose-200 sm:col-span-2", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-col-reverse items-stretch justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "256-Bit TLS Secured · Razorpay Gateway" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: submitting, size: "lg", "aria-busy": submitting, style: {
              color: "#FFFFFF"
            }, className: "min-w-[230px] rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm h-13 shadow-xl shadow-blue-900/50 disabled:opacity-100 transition-all", children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 motion-safe:animate-spin", "aria-hidden": "true" }),
              "Creating enrolment intent…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Continue to Payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-4.5 w-4.5 text-white", strokeWidth: 2.5 })
            ] }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-5 lg:sticky lg:top-6 lg:self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-7 backdrop-blur-2xl shadow-xl space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-5 border-b border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400", children: "Selected Path" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl font-bold text-white mt-0.5", children: meta.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-300 block font-medium", children: "Standard Fee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-2xl font-bold text-white tabular-nums", children: formatInr(meta.mrpInr) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-3", children: "Included Deliverables" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-xs text-slate-200", children: meta.perks.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4.5 w-4.5 shrink-0 text-blue-400 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug", children: p })
            ] }, p)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-[#0E172F] p-5 backdrop-blur-2xl flex items-center gap-3.5 shadow-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6 text-amber-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-white", children: "ISO 9001 Issuer · MCA Registered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300", children: "Arzon Global Pvt. Ltd. · Official Enrolment Portal" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function Field({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  className,
  name,
  autoComplete,
  inputMode
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "text-xs font-bold text-slate-200 flex items-center gap-1.5", children: [
      Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-blue-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id, type, name, autoComplete, inputMode, value, onChange: (e) => onChange(e.target.value), required, "aria-required": required ? true : void 0, placeholder, maxLength: type === "email" ? 120 : type === "tel" ? 20 : 120, className: "h-12 rounded-2xl border border-slate-700/80 bg-[#121B35] text-white font-medium placeholder:text-slate-400 focus:bg-[#162244] focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30 transition-all [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#121B35_inset]" })
  ] });
}
function friendlyIntentError(msg) {
  const m = msg.toLowerCase();
  if (m.includes("invalid email")) return "That email looks off. Please check and try again.";
  if (m.includes("invalid phone")) return "That phone number looks off. Please use 10–15 digits.";
  if (m.includes("invalid name")) return "Please enter your full name (2–80 characters).";
  return msg;
}
export {
  EnrolDetails as component
};
