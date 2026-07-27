import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-C-SVodlH.mjs";
import { G as Route$1j, H as EMPLOYERS, F as ROLES } from "./router-CvdLERTV.mjs";
import { E as EmployerGrid } from "./EmployerGrid-Cxiewm8y.mjs";
import { I as IndustryReadinessCTA } from "./IndustryReadinessCTA-DfH6tf6Y.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { p as objectType, q as stringType } from "../_libs/zod.mjs";
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
import "../_libs/lucide-react.mjs";
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
const ALL_CITIES = Array.from(new Set(EMPLOYERS.flatMap((e) => e.cities))).sort();
const ROLE_OPTIONS = ROLES.map((r) => ({
  slug: r.slug,
  name: r.name
}));
objectType({
  city: stringType().optional().default("all"),
  role: stringType().optional().default("all"),
  tier: stringType().optional().default("all")
});
const ALL_TIERS = Array.from(new Set(EMPLOYERS.map((e) => e.tier)));
function EmployersPage() {
  const {
    city,
    role,
    tier
  } = Route$1j.useSearch();
  const navigate = Route$1j.useNavigate();
  const filtered = EMPLOYERS.filter((e) => {
    if (city !== "all" && !e.cities.includes(city)) return false;
    if (role !== "all" && !e.hiringFor.includes(role)) return false;
    if (tier !== "all" && e.tier !== tier) return false;
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-[#070A14] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.22em] text-white/70", children: "Employers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-h1 font-semibold", children: "Who is actually hiring you, by city and role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-white/70", children: "Filter the live employer index by city, role and tier. Bands shown are L1 / fresher offers from JD scrape and Arzon alumni reports." }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { label: "Hiring for", value: role, onChange: (v) => navigate({
          search: (p) => ({
            ...p,
            role: v
          })
        }), options: [{
          v: "all",
          l: "All roles"
        }, ...ROLE_OPTIONS.map((r) => ({
          v: r.slug,
          l: r.name
        }))] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { label: "Employer tier", value: tier, onChange: (v) => navigate({
          search: (p) => ({
            ...p,
            tier: v
          })
        }), options: [{
          v: "all",
          l: "All tiers"
        }, ...ALL_TIERS.map((t) => ({
          v: t,
          l: t
        }))] }),
        (city !== "all" || role !== "all" || tier !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          search: () => ({
            city: "all",
            role: "all",
            tier: "all"
          })
        }), className: "ml-auto text-xs text-white/80 underline-offset-2 hover:text-gold hover:underline", children: "Reset" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-meta text-white/80", children: [
        filtered.length,
        " employer",
        filtered.length === 1 ? "" : "s",
        city !== "all" ? ` in ${city}` : "",
        role !== "all" ? ` hiring for ${ROLE_OPTIONS.find((r) => r.slug === role)?.name}` : "",
        tier !== "all" ? ` · ${tier}` : "",
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: filtered.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmployerGrid, { employers: filtered }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-white/80", children: "No employers in our index match this combination yet. Try a broader city or remove the role filter." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry/salaries", search: {
          city: "all",
          exp: "fresher",
          role: "all"
        }, className: "rounded-lg border border-white/15 px-4 py-2 hover:border-gold/40 hover:text-gold", children: "Browse salaries by city →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry", search: {}, className: "rounded-lg border border-white/15 px-4 py-2 hover:border-gold/40 hover:text-gold", children: "Industry hub →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndustryReadinessCTA, { source: "industry-employers", context: "These employers screen for operational readiness, not coursework. Find out where you stand." })
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
export {
  EmployersPage as component
};
