import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { u as useAdminGate, d as COUNSELLOR_PHONE } from "./router-CvdLERTV.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, s as MessageCircle } from "../_libs/lucide-react.mjs";
import { p as objectType, x as numberType, v as enumType } from "../_libs/zod.mjs";
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
const STATUSES = ["all", "started", "submitted", "paid"];
const Schema = objectType({
  status: enumType(STATUSES).optional(),
  sinceHours: numberType().int().min(1).max(24 * 365).optional(),
  limit: numberType().int().min(1).max(1e3).optional()
});
const listReadinessJourneys = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Schema.parse(data ?? {})).handler(createSsrRpc("310eb6582dd0252aa0a33fb0e6e78ca648b60aaf2d8727950924db821b6f862f"));
const STATUS_LABELS = {
  all: "All",
  started: "Started (test only)",
  submitted: "Submitted (lead, unpaid)",
  paid: "Paid"
};
function fmtTs(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return value;
  }
}
function counsellorWaLink(lead) {
  const text = `Hi ${lead.leadName ?? "there"} — this is Arzon Careers (founders' line). Following up on your readiness test (session ${lead.sessionId.slice(0, 8)}…).`;
  return `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text)}`;
}
function AdminReadinessJourneys() {
  const list = useServerFn(listReadinessJourneys);
  const {
    status: gate
  } = useAdminGate(["admin"]);
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [status, setStatus] = reactExports.useState("all");
  const [sinceHours, setSinceHours] = reactExports.useState(168);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancel = false;
    setLoading(true);
    (async () => {
      try {
        const res = await list({
          data: {
            status,
            sinceHours
          }
        });
        if (!cancel) setRows(res.rows);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load journeys");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [gate, list, status, sinceHours]);
  const counts = reactExports.useMemo(() => {
    const c = {
      started: 0,
      submitted: 0,
      paid: 0
    };
    for (const r of rows) {
      if (r.paidAt) c.paid++;
      else if (r.submittedAt) c.submitted++;
      else if (r.startedAt) c.started++;
    }
    return c;
  }, [rows]);
  if (gate === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex max-w-5xl items-center gap-2 p-8 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Checking access…"
    ] });
  }
  if (gate === "unauth") return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "p-8", children: "Sign in required." });
  if (gate === "forbidden") return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "p-8", children: "Forbidden." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Readiness journeys" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Conversion funnel: started → submitted → paid. Counsellor WhatsApp is the founders' line." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md border bg-muted px-2 py-1", children: [
          "Started: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: counts.started })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md border bg-muted px-2 py-1", children: [
          "Submitted: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: counts.submitted })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md border bg-muted px-2 py-1", children: [
          "Paid: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: counts.paid })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", role: "group", "aria-label": "Status filter", children: [
      Object.keys(STATUS_LABELS).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "data-testid": `status-filter-${s}`, "aria-pressed": status === s, onClick: () => setStatus(s), className: `rounded-full border px-3 py-1 text-xs ${status === s ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground hover:bg-muted"}`, children: STATUS_LABELS[s] }, s)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "ml-auto rounded-md border bg-background px-2 py-1 text-xs", value: sinceHours, onChange: (e) => setSinceHours(Number(e.target.value)), "aria-label": "Window", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 24, children: "Last 24h" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 72, children: "Last 3 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 168, children: "Last 7 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 720, children: "Last 30 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 2160, children: "Last 90 days" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Lead" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Session" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Started" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Submitted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Counsellor" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-6 text-center text-muted-foreground", colSpan: 7, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-4 w-4 motion-safe:animate-spin" }) }) }) : rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-6 text-center text-muted-foreground", colSpan: 7, children: "No journeys in this window." }) }) : rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { "data-testid": "journey-row", className: "border-t align-top", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: r.leadName ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            r.leadEmail ?? "no email",
            r.leadPhone ? ` · ${r.leadPhone}` : ""
          ] }),
          r.archetype ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-xs", children: [
            r.archetype,
            r.scoreBand ? ` · ${r.scoreBand}` : ""
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 font-mono text-xs", children: [
          r.sessionId.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: fmtTs(r.startedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: fmtTs(r.submittedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: r.paidAt ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-sky-500/15 px-1.5 py-0.5 font-medium text-sky-700 dark:text-sky-300", children: fmtTs(r.paidAt) }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: r.amountInr ? `₹${r.amountInr.toLocaleString("en-IN")}` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: r.leadPhone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: counsellorWaLink(r), target: "_blank", rel: "noopener noreferrer", "data-testid": "journey-wa-link", className: "inline-flex items-center gap-1 rounded border border-sky-500/40 px-2 py-1 text-xs text-sky-700 hover:bg-sky-500/10 dark:text-sky-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3 w-3" }),
          " WhatsApp"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) })
      ] }, r.id)) })
    ] }) })
  ] });
}
export {
  AdminReadinessJourneys as component
};
