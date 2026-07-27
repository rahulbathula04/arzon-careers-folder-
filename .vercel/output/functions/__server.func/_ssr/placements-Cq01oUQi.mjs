import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { b as Route$1W } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { m as ShieldCheck, q as ArrowRight, E as FileCheck } from "../_libs/lucide-react.mjs";
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
const EVIDENCE_LABELS = {
  signed_offer_letter: "Signed offer letter",
  employer_hr_email: "Employer HR email",
  payslip: "Payslip",
  joining_letter: "Joining letter",
  linkedin_confirmation: "LinkedIn confirmation"
};
function formatMonth(iso) {
  const [y, m] = iso.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric"
  });
}
function PlacementsPage() {
  const {
    placements
  } = Route$1W.useLoaderData();
  const count = placements.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tone-dark min-h-dvh bg-[#0A0F1E] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative border-b border-white/10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-900/0 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-6 py-16 md:py-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs uppercase tracking-wider text-teal-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
          "Public ledger · updated in real time"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-serif text-4xl font-semibold tracking-tight md:text-6xl text-white", children: "Verified Placements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-lg text-white/70 md:text-xl", children: "Every hire Arzon places lands here — confirmed in writing by the employer, timestamped, and never deleted. No aggregate percentages. No unnamed testimonials. If it isn’t in this ledger, it didn’t happen." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-4 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Verified placements", value: String(count) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Unverified claims", value: "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Source of truth", value: "Employer letter" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-6 py-16", children: count === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyLedger, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(LedgerTable, { rows: placements }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-white/10 bg-white/[0.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-2xl font-bold tracking-tight md:text-3xl text-white", children: "How an entry gets on this page" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-6 space-y-4 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: 1, title: "Employer sends a signed offer or hire confirmation", children: "We accept only employer-issued documents. Screenshots and self-reports are not evidence." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: 2, title: "Arzon verifies the document and the candidate", children: "Two-party check: employer contact + candidate. No third-party intermediaries." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: 3, title: "Entry is published — permanently", children: "Rows are append-only. Corrections are versioned in a separate audit trail. Nothing is ever quietly deleted." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/why-arzon", className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90", children: [
          "Read our methodology",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recruiters", className: "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted", children: "Hire from Arzon" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel-deep group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl transition hover:border-teal-500/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-5xl font-bold tabular-nums tracking-tight text-white md:text-6xl drop-shadow-md", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs uppercase tracking-wider text-teal-400", children: label })
  ] });
}
function EmptyLedger() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel-deep rounded-3xl border border-dashed border-white/20 p-10 text-center shadow-xl md:p-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "h-8 w-8 text-white/50" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-grotesk text-2xl font-bold tracking-tight text-white", children: "0 verified placements — for now" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60", children: "This page will populate the moment an employer confirms a hire in writing. We would rather publish an empty ledger than an inflated one. That is the difference between a placement platform and a marketing page." })
  ] });
}
function LedgerTable({
  rows
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-panel-deep overflow-hidden rounded-3xl border border-white/10 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5 text-xs uppercase tracking-wider text-teal-400", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold", children: "Month" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold", children: "Role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold", children: "City" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold", children: "Employer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold", children: "Verified by" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-white/10", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "transition-colors hover:bg-white/[0.02]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono tabular-nums text-white/80", children: formatMonth(r.month_start) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium", children: r.role_title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-white/80", children: r.city }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium", children: r.employer_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-xs text-white/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-teal-500/10 px-2 py-1 text-teal-400 ring-1 ring-teal-500/20", children: EVIDENCE_LABELS[r.evidence_source] ?? r.evidence_source }) })
    ] }, r.id)) })
  ] }) });
}
function Step({
  n,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4 group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-mono text-sm font-bold tabular-nums text-teal-400 transition-colors group-hover:border-teal-500/30 group-hover:bg-teal-500/10", children: n }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-white", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-white/60", children })
    ] })
  ] });
}
export {
  PlacementsPage as component
};
