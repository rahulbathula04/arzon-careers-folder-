import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { C as COUNSELLOR_PHONE_DISPLAY, w as waLink, d as COUNSELLOR_PHONE, A as ADDRESS, B as Button } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { s as MessageCircle, a2 as Mail, aj as Phone, a3 as MapPin, q as ArrowRight } from "../_libs/lucide-react.mjs";
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
function ContactPage() {
  const [done, setDone] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [msg, setMsg] = reactExports.useState("");
  const [programme, setProgramme] = reactExports.useState("");
  const [waUrl, setWaUrl] = reactExports.useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    const url = waLink(`Hi Arzon. I'm ${name} (${phone}). Programme: ${programme || "Not sure yet"}. ${msg}`);
    setWaUrl(url);
    const opened = window.open(url, "_blank");
    setDone(!opened ? false : true);
    if (!opened) {
      setDone(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "tone-dark min-h-app bg-[#0A0F1E] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-900/0 to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold uppercase tracking-[0.22em] text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-3 font-serif", children: "Talk to a real counsellor." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-base text-white/70", children: "Pick the channel that's easiest for you. WhatsApp is fastest. Our team replies within an hour during 10 AM–8 PM IST." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink("Hi Arzon. I'd like to know more about your programmes."), target: "_blank", rel: "noopener noreferrer", className: "group glass-panel-deep block rounded-3xl border border-sky-400/30 bg-sky-400/[0.05] p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-sky-400/50 hover:bg-sky-400/[0.08]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10 ring-1 ring-sky-400/30 transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5 text-sky-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-sky-400/15 px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky-300 ring-1 ring-sky-400/30", children: "Fastest" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-grotesk text-lg font-bold text-white", children: "WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-white/60", children: [
              COUNSELLOR_PHONE_DISPLAY,
              " · usually replies in 5 min"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:info@arzonglobal.com", className: "group glass-panel-deep block rounded-3xl border border-white/10 p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-teal-500/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-110 group-hover:ring-teal-500/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5 text-slate-300 group-hover:text-teal-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-grotesk text-lg font-bold text-white", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/60", children: "info@arzonglobal.com · reply within 1 working day" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:+${COUNSELLOR_PHONE}`, className: "group glass-panel-deep block rounded-3xl border border-white/10 p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-teal-500/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-110 group-hover:ring-teal-500/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5 text-slate-300 group-hover:text-teal-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-grotesk text-lg font-bold text-white", children: "Call" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-white/60", children: [
              COUNSELLOR_PHONE_DISPLAY,
              " · 10 AM – 8 PM IST · Mon–Sat"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel-deep rounded-3xl border border-white/10 p-5 shadow-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-slate-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-grotesk text-lg font-bold text-white", children: "Visit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm leading-relaxed text-white/60", children: [
              ADDRESS.company,
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              ADDRESS.street,
              ",",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              ADDRESS.area,
              ",",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              ADDRESS.locality,
              ", ",
              ADDRESS.city,
              ",",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              ADDRESS.region,
              " ",
              ADDRESS.postalCode,
              ", ",
              ADDRESS.country
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: ADDRESS.mapsUrl, target: "_blank", rel: "noopener noreferrer", className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-400 transition-colors hover:text-teal-300", children: "Get directions →" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "glass-panel-deep relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl sm:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/10 blur-[40px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow", children: "Or send us a callback request" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-caption text-white/70", children: "One real counsellor (not a bot) will message you back within an hour. Your details are never sold or shared." }),
          done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-h3 text-white", children: "Thanks, we're on it." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/75", children: "If WhatsApp didn't open automatically, tap the button below." }),
            waUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waUrl, target: "_blank", rel: "noopener noreferrer", className: "mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-accent-glow px-5 text-sm font-semibold text-sky-950 transition hover:opacity-90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
              " Open WhatsApp"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apply", className: "mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
              "Or start your application ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your name", hint: "So we know who to greet.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true, placeholder: "e.g. Priya R.", className: "h-12 w-full rounded-xl border-0 px-3.5 text-body-sm font-medium ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-accent-glow", style: {
              background: "rgba(255,255,255,0.06)",
              color: "#F8FAFC"
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp number", hint: "We only use this to text you a callback time.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", inputMode: "tel", value: phone, onChange: (e) => setPhone(e.target.value), required: true, placeholder: "+91 98xxx xxxxx", className: "h-12 w-full rounded-xl border-0 px-3.5 text-body-sm font-medium ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-accent-glow", style: {
              background: "rgba(255,255,255,0.06)",
              color: "#F8FAFC"
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Which programme are you exploring?", hint: "Helps us route you to the right counsellor.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: programme, onChange: (e) => setProgramme(e.target.value), className: "h-12 w-full rounded-xl border-0 px-3 text-body-sm font-medium ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-accent-glow", style: {
              background: "rgba(255,255,255,0.06)",
              color: "#F8FAFC"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", style: {
                color: "#0F172A"
              }, children: "Not sure yet — help me decide" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Pharmacovigilance", style: {
                color: "#0F172A"
              }, children: "Pharmacovigilance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Medical Coding", style: {
                color: "#0F172A"
              }, children: "Medical Coding" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Clinical Research", style: {
                color: "#0F172A"
              }, children: "Clinical Research" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SAS Clinical", style: {
                color: "#0F172A"
              }, children: "SAS Clinical" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "How can we help?", hint: "Optional — a sentence about your background helps a lot.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: msg, onChange: (e) => setMsg(e.target.value), placeholder: "e.g. I'm a final-year B.Pharm student exploring PV…", className: "h-28 w-full resize-none rounded-xl border-0 p-3.5 text-body-sm leading-relaxed ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-accent-glow", style: {
              background: "rgba(255,255,255,0.06)",
              color: "#F8FAFC"
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "lg", className: "h-12 w-full rounded-full text-body-sm font-semibold", style: {
              background: "#10B981",
              color: "#FFFFFF"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
              " Send & open WhatsApp"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-meta text-white/60", children: "By submitting you agree to be contacted by an Arzon counsellor. No spam, ever." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Field({
  label,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-caption font-semibold text-white", children: label }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 block text-meta text-white/55", children: hint }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block", children })
  ] });
}
export {
  ContactPage as component
};
