import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { am as getCareerEngineFunnel, u as useAdminGate } from "./router-CvdLERTV.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle } from "../_libs/lucide-react.mjs";
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
const STEP_LABEL = {
  ce_test_viewed: "Test viewed",
  ce_lead_form_viewed: "Lead form viewed",
  lead_submitted: "Lead submitted",
  payment_started: "Payment started",
  payment_success: "Payment success"
};
const FAILURE_LABEL = {
  lead_form_validation_error: "Lead form validation errors",
  test_timeout: "Test timeouts (>30 min)",
  payment_failed: "Payment failed (client)",
  razorpay_verify_failed: "Razorpay verify failed (server)"
};
function fmtPct(n) {
  if (n === null || !Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(1)}%`;
}
function CEFunnelPage() {
  const navigate = useNavigate();
  const fn = useServerFn(getCareerEngineFunnel);
  const {
    status: gate
  } = useAdminGate(["admin", "reviewer", "support"]);
  const [days, setDays] = reactExports.useState(30);
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const d = await fn({
          data: {
            fromDays: days
          }
        });
        if (!cancelled) setData(d);
      } catch (e) {
        console.error("[ce-funnel]", e);
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
  const top = data?.steps[0]?.users ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Career Engine funnel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Test → Lead form → Lead submit → Payment start → Payment success, plus failure events and UTM split." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: days, onChange: (e) => setDays(Number(e.target.value)), className: "rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 1, children: "Last 24h" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 7, children: "Last 7 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 30, children: "Last 30 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 90, children: "Last 90 days" })
      ] })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Loading data…" }),
    data && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "End-to-end conversion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-h3 text-primary-glow", children: fmtPct(data.overall_cvr) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-micro text-muted-foreground", children: [
          top,
          " users entered · ",
          data.steps[data.steps.length - 1]?.users ?? 0,
          " paid"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-5 space-y-4", children: data.steps.map((s, i) => {
          const pct = top > 0 ? Math.round(s.users / top * 100) : 0;
          const exits = data.exit_counts[s.step] ?? 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2 font-mono text-micro text-muted-foreground", children: [
                  i + 1,
                  "."
                ] }),
                STEP_LABEL[s.step] ?? s.step
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-base text-foreground tabular-nums", children: [
                s.users,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-micro font-normal text-muted-foreground", children: "users" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary-glow", style: {
              width: `${pct}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center justify-between gap-2 text-micro text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                pct,
                "% of step 1"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                s.drop_rate !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: (s.drop_rate ?? 0) > 0.5 ? "text-amber-300" : "", children: [
                  "−",
                  fmtPct(s.drop_rate),
                  " vs prev · ",
                  s.drop_users ?? 0,
                  " lost"
                ] }),
                exits > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3", children: [
                  exits,
                  " ended here"
                ] })
              ] })
            ] })
          ] }, s.step);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Failure events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-micro text-muted-foreground", children: [
            "Use to debug drop-offs. Recent ",
            days,
            "d."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm", children: Object.entries(data.failures).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: FAILURE_LABEL[k] ?? k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display tabular-nums ${v > 0 ? "text-rose-300" : "text-foreground"}`, children: v })
          ] }, k)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Top UTM sources" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-micro text-muted-foreground", children: "Reached test → paid, by attribution source." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "mt-3 w-full text-left text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-micro uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-1", children: "Source" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-1 text-right", children: "Reached" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-1 text-right", children: "Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-1 text-right", children: "CVR" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              data.utm.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "py-3 text-center text-foreground", children: "No UTM activity yet." }) }),
              data.utm.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 font-mono text-foreground", children: u.source }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums text-foreground", children: u.reached }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums text-foreground", children: u.paid }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right tabular-nums text-foreground", children: fmtPct(u.cvr) })
              ] }, u.source))
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  CEFunnelPage as component
};
