import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { T as TRACK_THEME } from "./trackTheme-K0XYOa_i.mjs";
import { aL as isReducedMotion } from "./router-CvdLERTV.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, o as TriangleAlert, Z as Check } from "../_libs/lucide-react.mjs";
import { p as objectType, q as stringType, x as numberType, C as arrayType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-CMxFZmfM.mjs";
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
import "../_libs/uncrypto.mjs";
import "node:crypto";
const Schema = objectType({
  experiments: arrayType(stringType().min(1).max(64)).default(["curriculum_layout_v1", "cta_timing_v1"]),
  windowDays: numberType().int().min(1).max(90).default(14),
  courseSlug: stringType().min(1).max(80).optional()
});
const getCurriculumExperimentResults = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Schema.parse(data ?? {})).handler(createSsrRpc("69c41417e7cb89d63cdb91ecc4180a437367ec5c5975a76c3d221ab28168a171"));
const fmtPct = (n) => Number.isFinite(n) ? (n * 100).toFixed(2) + "%" : "–";
const fmtNum = (n) => new Intl.NumberFormat("en-IN").format(n);
const FUNNEL = [{
  key: "exposure",
  label: "Exposure"
}, {
  key: "cta_click",
  label: "CTA click"
}, {
  key: "form_open",
  label: "Form open"
}, {
  key: "form_submit",
  label: "Form submit"
}, {
  key: "whatsapp_click",
  label: "WhatsApp"
}, {
  key: "razorpay_open",
  label: "Razorpay open"
}, {
  key: "razorpay_success",
  label: "Razorpay success"
}, {
  key: "enrolment_paid",
  label: "Paid"
}];
function ExperimentsPage() {
  const fn = useServerFn(getCurriculumExperimentResults);
  const [data, setData] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [windowDays, setWindowDays] = reactExports.useState(14);
  const [slug, setSlug] = reactExports.useState("");
  const slugs = reactExports.useMemo(() => Object.keys(TRACK_THEME), []);
  reactExports.useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fn({
          data: {
            experiments: ["curriculum_layout_v1", "cta_timing_v1"],
            windowDays,
            courseSlug: slug || void 0
          }
        });
        if (alive) {
          setData(res);
          setErr(null);
        }
      } catch (e) {
        if (alive) setErr(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (alive) setLoading(false);
      }
    };
    void load();
    const id = setInterval(load, isReducedMotion() ? 3e5 : 6e4);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [fn, windowDays, slug]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 p-6 text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display", children: "Curriculum experiments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Hero CTA → form submit → WhatsApp → Razorpay → paid registration, split by variant. Refreshes every 60s." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
          "Course",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: slug, onChange: (e) => setSlug(e.target.value), className: "rounded border border-border bg-transparent px-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All" }),
            slugs.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
          "Window",
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: windowDays, onChange: (e) => setWindowDays(Number(e.target.value)), className: "rounded border border-border bg-transparent px-2 py-1", children: [1, 3, 7, 14, 30, 60].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d, children: [
            d,
            "d"
          ] }, d)) })
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin opacity-60" })
      ] })
    ] }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-2 inline h-4 w-4" }),
      err
    ] }),
    data?.experiments.map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-muted/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: exp.experiment }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          exp.arms.length,
          " arm",
          exp.arms.length === 1 ? "" : "s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Variant" }),
          FUNNEL.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: s.label }, s.key)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "Conv." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "Lift" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "p" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "Sig?" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: exp.arms.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 font-mono", children: [
            a.variant,
            a.isControl && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: "control" })
          ] }),
          FUNNEL.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: fmtNum(a.counts[s.key] ?? 0) }, s.key)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: fmtPct(a.conversion) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: a.test ? (a.test.lift >= 0 ? "+" : "") + (a.test.lift * 100).toFixed(1) + "%" : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right tabular-nums", children: a.test ? a.test.p.toFixed(4) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: a.test?.sig ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded bg-sky-500/20 px-2 py-0.5 text-xs text-sky-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
            " Yes"
          ] }) : a.test ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "n≥100/arm, p<0.05" }) : "—" })
        ] }, a.variant)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground", children: "Daily — exposures vs paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { series: exp.series })
      ] })
    ] }, exp.experiment))
  ] });
}
function Sparkline({
  series
}) {
  const w = 720;
  const h = 80;
  const maxE = Math.max(1, ...series.map((d) => d.exposure));
  const maxP = Math.max(1, ...series.map((d) => d.paid));
  const stepX = series.length > 1 ? w / (series.length - 1) : 0;
  const ePath = series.map((d, i) => `${i ? "L" : "M"}${(i * stepX).toFixed(1)},${(h - d.exposure / maxE * h).toFixed(1)}`).join(" ");
  const pPath = series.map((d, i) => `${i ? "L" : "M"}${(i * stepX).toFixed(1)},${(h - d.paid / maxP * h).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${w} ${h}`, className: "h-20 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: ePath, fill: "none", stroke: "rgba(255,255,255,0.5)", strokeWidth: 1.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: pPath, fill: "none", stroke: "#10B981", strokeWidth: 1.5 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-4 text-micro text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-px w-3 bg-slate-50/60" }),
        " exposures (max ",
        maxE,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-px w-3 bg-sky-400" }),
        " paid (max ",
        maxP,
        ")"
      ] })
    ] })
  ] });
}
export {
  ExperimentsPage as component
};
