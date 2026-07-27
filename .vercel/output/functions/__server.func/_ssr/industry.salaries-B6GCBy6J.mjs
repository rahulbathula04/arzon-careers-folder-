import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { D as Route$1k, E as EXP_LEVELS, F as ROLES } from "./router-CvdLERTV.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { I as IndustryReadinessCTA } from "./IndustryReadinessCTA-DfH6tf6Y.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { p as objectType, q as stringType, v as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
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
import "../_libs/lucide-react.mjs";
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
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
import "./analytics-Do62eWB1.mjs";
const ALL_CITIES = Array.from(new Set(ROLES.flatMap((r) => r.pay.map((p) => p.city)))).sort();
objectType({
  city: stringType().optional().default("all"),
  exp: enumType(["fresher", "midY3", "seniorY5", "leadY8"]).optional().default("fresher"),
  role: stringType().optional().default("all")
});
function fmt(range) {
  return `₹${range[0]} – ${range[1]} LPA`;
}
function SalariesPage() {
  const {
    city,
    exp,
    role
  } = Route$1k.useSearch();
  const navigate = Route$1k.useNavigate();
  const expLabel = EXP_LEVELS.find((e) => e.key === exp).label;
  const filteredRoles = role === "all" ? ROLES : ROLES.filter((r) => r.slug === role);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-[#070A14] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.22em] text-white/70", children: "Salaries · India 2026" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-h1 font-semibold", children: "Browse pay by city and experience" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-white/70", children: "Pick a city and experience level. Bands are JD-scrape medians (Naukri + LinkedIn, n > 1,000) cross-checked with AmbitionBox and Arzon alumni offers." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-end gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { label: "City", value: city, onChange: (v) => navigate({
          search: (p) => ({
            ...p,
            city: v
          })
        }), options: [{
          v: "all",
          l: "All cities"
        }, ...ALL_CITIES.map((c) => ({
          v: c,
          l: c
        }))] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { label: "Experience", value: exp, onChange: (v) => navigate({
          search: (p) => ({
            ...p,
            exp: v
          })
        }), options: EXP_LEVELS.map((e) => ({
          v: e.key,
          l: e.label
        })) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { label: "Role", value: role, onChange: (v) => navigate({
          search: (p) => ({
            ...p,
            role: v
          })
        }), options: [{
          v: "all",
          l: "All roles"
        }, ...ROLES.map((r) => ({
          v: r.slug,
          l: r.name
        }))] }),
        (city !== "all" || exp !== "fresher" || role !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          search: () => ({
            city: "all",
            exp: "fresher",
            role: "all"
          })
        }), className: "ml-auto text-xs text-white/80 underline-offset-2 hover:text-gold hover:underline", children: "Reset" })
      ] }),
      city === "all" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CrossCityTable, { roles: filteredRoles, expKey: exp, expLabel }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SingleCityTable, { roles: filteredRoles, city }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-meta text-white/70", children: [
        "Showing ",
        filteredRoles.length,
        " role",
        filteredRoles.length === 1 ? "" : "s",
        city !== "all" ? ` for ${city}` : "",
        " · ",
        expLabel,
        ". Data refreshed Nov 2025."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry/employers", search: {
          city: "all",
          role: "all",
          tier: "all"
        }, className: "rounded-lg border border-white/15 px-4 py-2 hover:border-gold/40 hover:text-gold", children: "Browse employers by city →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry/compare", search: {}, className: "rounded-lg border border-white/15 px-4 py-2 hover:border-gold/40 hover:text-gold", children: "Compare all 5 roles →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndustryReadinessCTA, { source: "industry-salaries", context: 'The pay is real. The gap between "graduate" and "hire-able" is what we close in 12 weeks.' })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Filter({
  label,
  value,
  onChange,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro uppercase tracking-[0.18em] text-white/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value, onChange: (e) => onChange(e.target.value), className: "rounded-md border border-white/15 bg-[#0d1124] px-3 py-2 text-sm text-white focus:border-gold/60 focus:outline-none", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.v, children: o.l }, o.v)) })
  ] });
}
function CrossCityTable({
  roles,
  expKey,
  expLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[860px] text-left text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/[0.04] text-xs uppercase tracking-wide text-white/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "px-4 py-3 font-medium", children: [
        "Role · ",
        expLabel
      ] }),
      ALL_CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: c }, c))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-white/[0.06]", children: roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry/$role", params: {
        role: r.slug
      }, className: "font-medium text-white hover:text-gold", children: r.name }) }),
      ALL_CITIES.map((c) => {
        const band = r.pay.find((p) => p.city === c);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/80", children: band ? fmt(band[expKey]) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/65", children: "—" }) }, c);
      })
    ] }, r.slug)) })
  ] }) });
}
function SingleCityTable({
  roles,
  city
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[720px] text-left text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/[0.04] text-xs uppercase tracking-wide text-white/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "px-4 py-3 font-medium", children: [
        "Role in ",
        city
      ] }),
      EXP_LEVELS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: e.label }, e.key)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: "Note" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-white/[0.06]", children: roles.map((r) => {
      const band = r.pay.find((p) => p.city === city);
      if (!band) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry/$role", params: {
            role: r.slug
          }, className: "font-medium text-white hover:text-gold", children: r.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 5, className: "px-4 py-3 text-white/65", children: [
            "No active hiring tracked in ",
            city,
            " for this role."
          ] })
        ] }, r.slug);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry/$role", params: {
          role: r.slug
        }, className: "font-medium text-white hover:text-gold", children: r.name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/80", children: fmt(band.fresher) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/80", children: fmt(band.midY3) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/80", children: fmt(band.seniorY5) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/80", children: fmt(band.leadY8) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/80 text-meta", children: band.note ?? "—" })
      ] }, r.slug);
    }) })
  ] }) });
}
export {
  SalariesPage as component
};
