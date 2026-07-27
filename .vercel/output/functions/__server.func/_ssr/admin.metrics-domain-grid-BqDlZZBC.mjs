import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { u as useAdminGate } from "./router-CvdLERTV.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle } from "../_libs/lucide-react.mjs";
import { p as objectType, q as stringType, x as numberType } from "../_libs/zod.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
const Schema = objectType({
  cutoverISO: stringType().min(1),
  windowDays: numberType().int().min(1).max(90).default(14),
  experiment: stringType().max(64).default("sticky_cta_placement")
});
const getDomainGridMetrics = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Schema.parse(data ?? {})).handler(createSsrRpc("c83da84564b2feda11fe88ba7a3e8a4a7dacc3927fee34d33e1b131e84ab1e13"));
const FunnelSchema = objectType({
  sinceISO: stringType().min(1)
});
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data)).handler(createSsrRpc("e980f9e0d0d9887b7ac1705c01f14f5bfd92b741068390a00347704efe96edb2"));
function pct(n) {
  if (!Number.isFinite(n)) return "–";
  return (n * 100).toFixed(1) + "%";
}
function delta(after, before) {
  if (!before) return after ? "+∞" : "0";
  const d = (after - before) / before;
  const sign = d >= 0 ? "+" : "";
  return sign + (d * 100).toFixed(1) + "%";
}
function MetricsPage() {
  const fn = useServerFn(getDomainGridMetrics);
  const {
    status
  } = useAdminGate(["admin", "reviewer", "support"]);
  const today = reactExports.useMemo(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), []);
  const [cutover, setCutover] = reactExports.useState(today);
  const [windowDays, setWindowDays] = reactExports.useState(14);
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const cutoverISO = (/* @__PURE__ */ new Date(cutover + "T00:00:00Z")).toISOString();
        const r = await fn({
          data: {
            cutoverISO,
            windowDays,
            experiment: "sticky_cta_placement"
          }
        });
        if (!cancelled) setData(r);
      } catch (e) {
        console.error(e);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [fn, status, cutover, windowDays]);
  if (status === "loading") return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: "Checking access…" });
  if (status === "unauth") return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: "Please sign in." });
  if (status === "forbidden") return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: "Forbidden." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-10 text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h3 font-semibold", children: "Domain-grid removal — before/after" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Equal-length windows around the cutover. Compares apply CTA rate, funnel conversion, and home engagement signals; bottom panel breaks down the live sticky-CTA A/B by variant." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mt-3 flex flex-wrap gap-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin/experiments/sticky-cta", className: "rounded border border-border px-2 py-1 hover:bg-muted", children: "Sticky CTA · live A/B results →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin/qa/content-rebalance", className: "rounded border border-border px-2 py-1 hover:bg-muted", children: "70/20/10 content QA checklist →" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-end gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Cutover (UTC)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: cutover, onChange: (e) => setCutover(e.target.value), className: "mt-1 rounded-md border border-border bg-[#0A0F1E] px-2 py-1.5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Window (days each side)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 90, value: windowDays, onChange: (e) => setWindowDays(Number(e.target.value) || 14), className: "mt-1 w-24 rounded-md border border-border bg-[#0A0F1E] px-2 py-1.5" })
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "ml-2 h-4 w-4 motion-safe:animate-spin text-muted-foreground" })
    ] }),
    data && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full table-fixed border-collapse text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "Metric" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "Before" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "After" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "Δ" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Unique visitors", b: data.before.visitors, a: data.after.visitors }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Apply CTA clicks (events)", b: data.before.ctaClicks, a: data.after.ctaClicks }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Apply CTA clickers (unique)", b: data.before.ctaClickers, a: data.after.ctaClickers }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "CTA click rate (clickers / visitors)", b: data.before.ctaClickRate, a: data.after.ctaClickRate, format: "pct" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Apply submitters", b: data.before.submitters, a: data.after.submitters }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "CTA → submit conversion", b: data.before.ctaToSubmitRate, a: data.after.ctaToSubmitRate, format: "pct" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Legacy #domains rescue hits", b: data.before.domainGridHits, a: data.after.domainGridHits }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Home dwell ≥60s w/o CTA", b: data.before.dwellNoCta, a: data.after.dwellNoCta }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Home find-in-page triggers", b: data.before.searchKeypress, a: data.after.searchKeypress })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Sticky-CTA A/B (post-cutover)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          "Variants assigned in ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "src/lib/abTest.ts" }),
          ". Visitors are unique anon_ids that received an assignment."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "mt-3 w-full table-fixed border-collapse text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "Variant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "Visitors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "CTA clickers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "Click rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "Submitters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border py-2", children: "Submit rate" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
            Object.entries(data.experiment.variants).map(([name, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-mono text-xs", children: name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: v.visitors }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: v.ctaClickers }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: pct(v.visitors ? v.ctaClickers / v.visitors : 0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: v.submitters }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: pct(v.visitors ? v.submitters / v.visitors : 0) })
            ] }, name)),
            Object.keys(data.experiment.variants).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "py-3 text-muted-foreground", children: "No assignments yet in this window." }) })
          ] })
        ] })
      ] })
    ] })
  ] });
  function Row({
    label,
    b,
    a,
    format
  }) {
    const fmt = (n) => format === "pct" ? pct(n) : String(n);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-mono", children: fmt(b) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-mono", children: fmt(a) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-mono " + (a >= b ? "text-sky-300" : "text-rose-300"), children: delta(a, b) })
    ] });
  }
}
function Centered({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "grid min-h-app place-items-center px-6 text-foreground", children });
}
export {
  MetricsPage as component
};
