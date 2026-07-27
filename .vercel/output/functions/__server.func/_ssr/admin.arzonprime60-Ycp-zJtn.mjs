import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { u as useAdminGate } from "./router-CvdLERTV.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle, az as Zap, m as ShieldCheck, q as ArrowRight } from "../_libs/lucide-react.mjs";
import { p as objectType, x as numberType } from "../_libs/zod.mjs";
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
const Input = objectType({
  fromDays: numberType().int().min(1).max(365).optional()
});
const getArzonPrime60Funnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data ?? {})).handler(createSsrRpc("7b6d8df8a4b7ab63ea55fb1f0178b664cb2a2d84f7e95edf99a8fb9a1c5c6da7"));
const TIER_LABEL = {
  essential: "Essential",
  career: "Career",
  elite: "Elite"
};
const SURFACE_LABEL = {
  result: "Career-engine result",
  next_step: "Personalised next step",
  pricing_mobile: "Pricing (mobile)",
  pricing_desktop: "Pricing (desktop)",
  unknown: "Unknown"
};
function Prime60FunnelPage() {
  const navigate = useNavigate();
  const fn = useServerFn(getArzonPrime60Funnel);
  const {
    status: gate
  } = useAdminGate(["admin", "reviewer", "support"]);
  const [days, setDays] = reactExports.useState(30);
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const f = await fn({
          data: {
            fromDays: days
          }
        });
        if (!cancelled) setData(f);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load funnel.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, days, fn]);
  if (gate === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Loading…"
    ] });
  }
  if (gate === "unauth") {
    navigate({
      to: "/admin/login"
    });
    return null;
  }
  if (gate === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100", children: "No staff role assigned." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-1.5 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-yellow-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
          " Admin · Coupon funnel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "ARZONPRIME60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-foreground", children: [
          "Shown → Clicked → Applied → Paid, broken down by tier. Owner:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 inline-flex items-center gap-1 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-yellow-300" }),
            " Arzon Academic Director"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: days, onChange: (e) => setDays(Number(e.target.value)), className: "rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 1, children: "Last 24h" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 7, children: "Last 7 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 30, children: "Last 30 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 90, children: "Last 90 days" })
      ] })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 motion-safe:animate-spin" }),
      " Loading data…"
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-200", children: error }),
    data && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Top-line funnel · unique users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-h3 text-primary-glow", children: [
            data.totals.shownToPaidPct,
            "%",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-micro font-normal uppercase tracking-widest text-muted-foreground", children: "shown → paid" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepTile, { label: "Offer shown", value: data.totals.shown }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepTile, { label: "CTA clicked", value: data.totals.clicked, dropFrom: data.totals.shown }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepTile, { label: "Coupon applied", value: data.totals.applied, dropFrom: data.totals.clicked }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepTile, { label: "Paid", value: data.totals.paid, dropFrom: data.totals.applied, highlight: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 grid gap-2 text-micro text-foreground sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Click → pay:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
              data.totals.clickToPayPct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Apply → pay:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
              data.totals.applyToPayPct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            data.totalEvents.toLocaleString(),
            " events scanned"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Conversion by tier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-micro uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 font-mono", children: "Tier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right font-mono", children: "Clicked" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right font-mono", children: "Applied" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right font-mono", children: "Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right font-mono", children: "Click → pay" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: data.byTier.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              TIER_LABEL[row.tier],
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 text-muted-foreground/70" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-mono tabular-nums", children: row.clicked }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-mono tabular-nums", children: row.applied }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-mono tabular-nums text-eyebrow", children: row.paid }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3 text-right font-mono tabular-nums", children: [
              row.clickToPayPct,
              "%"
            ] })
          ] }, row.tier)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-micro text-muted-foreground", children: [
          "Tier is derived from ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-foreground", children: "props.tier" }),
          ` on the click / apply / paid event. The offer card itself shows all three tiers, so the top-line "Shown" number isn't split by tier.`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Clicks by surface" }),
        data.bySurface.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground", children: "No click events in this range yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2", children: data.bySurface.map((s) => {
          const max = data.bySurface[0]?.clicked ?? 1;
          const pct = max ? Math.round(s.clicked / max * 100) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: SURFACE_LABEL[s.surface] ?? s.surface }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono tabular-nums text-foreground", children: s.clicked })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-yellow-400/80", style: {
              width: `${pct}%`
            } }) })
          ] }, s.surface);
        }) })
      ] })
    ] })
  ] });
}
function StepTile({
  label,
  value,
  dropFrom,
  highlight
}) {
  const conversion = dropFrom !== void 0 && dropFrom > 0 ? Math.round(value / dropFrom * 1e3) / 10 : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border p-4 ${highlight ? "border-accent-glow/30 bg-accent-glow/5" : "border-border bg-muted/40"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 font-display text-h2 tabular-nums ${highlight ? "text-eyebrow" : "text-foreground"}`, children: value }),
    conversion !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-micro text-muted-foreground", children: [
      conversion,
      "% of previous"
    ] })
  ] });
}
export {
  Prime60FunnelPage as component
};
