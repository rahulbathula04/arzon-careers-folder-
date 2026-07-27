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
import { a4 as LoaderCircle, au as RefreshCw, I as CircleCheck, o as TriangleAlert } from "../_libs/lucide-react.mjs";
import { p as objectType, w as booleanType, x as numberType } from "../_libs/zod.mjs";
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
const ListSchema = objectType({
  limit: numberType().int().min(1).max(200).optional(),
  openOnly: booleanType().optional()
}).optional();
const getAnalyticsAlerts = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ListSchema.parse(data ?? {})).handler(createSsrRpc("1bf5e239da7247688602bc0576f9a7ce34cae1d05979063c06613fdb110380f8"));
const runAnalyticsAnomalyCheck = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("257b614ceea6b2d535878f78aef5452f09ced63b8fffb16ba0bfc01c741d42a1"));
function AlertsPage() {
  const navigate = useNavigate();
  const list = useServerFn(getAnalyticsAlerts);
  const runCheck = useServerFn(runAnalyticsAnomalyCheck);
  const {
    status: gate
  } = useAdminGate(["admin", "reviewer", "support"]);
  const [data, setData] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const refresh = async () => {
    setBusy(true);
    try {
      setData(await list({
        data: {
          limit: 100
        }
      }));
    } finally {
      setBusy(false);
    }
  };
  reactExports.useEffect(() => {
    if (gate === "ready") refresh();
  }, [gate]);
  if (gate === "loading") return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 motion-safe:animate-spin" }) });
  if (gate === "unauth") {
    navigate({
      to: "/admin/login"
    });
    return null;
  }
  if (gate === "forbidden") return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Forbidden." }) });
  const alerts = data?.alerts ?? [];
  const open = alerts.filter((a) => !a.resolved_at);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Growth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Analytics alerts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Hourly check for funnel-event volume drops and `props` shape drift." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
        setBusy(true);
        try {
          await runCheck({});
          await refresh();
        } finally {
          setBusy(false);
        }
      }, disabled: busy, className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-3.5 w-3.5 ${busy ? "motion-safe:animate-spin" : ""}` }),
        " Run check now"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 grid gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Open alerts", value: open.length, tone: open.length > 0 ? "warn" : "ok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total in last 100", value: alerts.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Monitored events", value: data?.configs.length ?? 0 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-sm font-bold uppercase tracking-[0.18em] text-foreground", children: "Monitored events" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid gap-2", children: (data?.configs ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/60 px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-xs text-primary-glow", children: c.event_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-micro text-muted-foreground", children: [
            "≥ ",
            c.min_count,
            " per ",
            c.window_hours,
            "h · requires [",
            c.required_props.join(", "),
            "]"
          ] })
        ] }),
        c.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-foreground", children: c.notes })
      ] }, c.event_name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-sm font-bold uppercase tracking-[0.18em] text-foreground", children: "Recent alerts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid gap-2", children: [
        alerts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-border bg-muted/60 px-3 py-4 text-sm text-foreground", children: "No alerts on record." }),
        alerts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border px-3 py-2 text-sm ${a.resolved_at ? "border-accent-glow/20 bg-accent-glow/5" : a.alert_type === "shape_drift" ? "border-amber-400/40 bg-amber-400/10" : "border-rose-400/40 bg-rose-400/10"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              a.resolved_at ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-eyebrow" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-[0.16em]", children: a.alert_type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-xs text-foreground", children: a.event_name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-micro text-muted-foreground", children: [
              new Date(a.fired_at).toLocaleString(),
              a.resolved_at && ` · resolved ${new Date(a.resolved_at).toLocaleString()}`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 overflow-x-auto rounded bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2 py-1.5 text-micro text-foreground", children: JSON.stringify(a.details, null, 2) })
        ] }, a.id))
      ] })
    ] })
  ] });
}
function Centered({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[40vh] items-center justify-center text-foreground", children });
}
function Stat({
  label,
  value,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border px-3 py-3 ${tone === "warn" ? "border-amber-400/40 bg-amber-400/10" : tone === "ok" ? "border-accent-glow/20 bg-accent-glow/5" : "border-border bg-muted/60"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.18em] text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-grotesk text-h3 font-bold text-foreground", children: value })
  ] });
}
export {
  AlertsPage as component
};
