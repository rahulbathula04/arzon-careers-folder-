import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { r as recordAdminExport, e as exportCsvAudited, d as dateStampedFilename } from "./admin-export.functions-BoaqXv52.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle, ak as Download } from "../_libs/lucide-react.mjs";
import { p as objectType, x as numberType, q as stringType } from "../_libs/zod.mjs";
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
const ActivitySchema = objectType({
  action: stringType().max(64).optional(),
  actorId: stringType().uuid().optional(),
  resource: stringType().max(64).optional(),
  sinceHours: numberType().int().min(1).max(24 * 365).optional(),
  limit: numberType().int().min(1).max(2e3).optional()
});
const listAdminActivity = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ActivitySchema.parse(data ?? {})).handler(createSsrRpc("356f32c800efa18b7eba291d33e92a960fce2b39a6a58210bdaca33be64b399a"));
const ACTIONS = ["results_view", "results_detail", "results_export", "bulk_export", "role_granted", "role_revoked"];
const ROLES = ["admin", "analyst", "exporter", "viewer", "reviewer", "support"];
const RESOURCES = ["career_engine_leads", "career_engine_results", "applications", "user_roles"];
function AdminActivity() {
  const navigate = useNavigate();
  const list = useServerFn(listAdminActivity);
  const recordExport = useServerFn(recordAdminExport);
  const {
    status: gate
  } = useAdminGate(["admin"]);
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [actionFilter, setActionFilter] = reactExports.useState("");
  const [resourceFilter, setResourceFilter] = reactExports.useState("");
  const [roleFilter, setRoleFilter] = reactExports.useState("");
  const [actorQuery, setActorQuery] = reactExports.useState("");
  const [sinceHours, setSinceHours] = reactExports.useState(168);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancel = false;
    setLoading(true);
    (async () => {
      try {
        const res = await list({
          data: {
            action: actionFilter || void 0,
            resource: resourceFilter || void 0,
            sinceHours
          }
        });
        if (!cancel) setRows(res.rows);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load activity");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [gate, list, actionFilter, resourceFilter, sinceHours]);
  const visible = reactExports.useMemo(() => {
    const q = actorQuery.trim().toLowerCase();
    return rows.filter((r) => {
      if (roleFilter && !r.actorRoles.includes(roleFilter)) return false;
      if (q && !(r.actorEmail ?? "").toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, roleFilter, actorQuery]);
  const summary = reactExports.useMemo(() => {
    const counts = {};
    for (const r of visible) counts[r.action] = (counts[r.action] ?? 0) + 1;
    const byActor = {};
    for (const r of visible) {
      const k = r.actorEmail ?? r.actorId ?? "(unknown)";
      byActor[k] = (byActor[k] ?? 0) + 1;
    }
    const top = Object.entries(byActor).sort((a, b) => b[1] - a[1]).slice(0, 3);
    return {
      total: visible.length,
      views: counts["results_view"] ?? 0,
      details: counts["results_detail"] ?? 0,
      exports: (counts["results_export"] ?? 0) + (counts["bulk_export"] ?? 0),
      top
    };
  }, [visible]);
  const columns = [{
    key: "occurredAt",
    header: "occurred_at"
  }, {
    key: "actorEmail",
    header: "actor_email"
  }, {
    key: "actorRoles",
    header: "actor_roles",
    accessor: (r) => r.actorRoles.join("|")
  }, {
    key: "action",
    header: "action"
  }, {
    key: "tableName",
    header: "resource"
  }, {
    key: "recordId",
    header: "record_id"
  }, {
    key: "diff",
    header: "diff",
    accessor: (r) => JSON.stringify(r.diff ?? {})
  }];
  const onExport = async () => {
    try {
      await exportCsvAudited(recordExport, "admin_activity", dateStampedFilename("admin-activity"), visible, columns);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  };
  if (gate === "loading") return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
    " Loading…"
  ] });
  if (gate === "unauth") {
    navigate({
      to: "/admin/login"
    });
    return null;
  }
  if (gate === "forbidden") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100", children: "Admins only." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Access log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Every admin view, detail open, export, and role change." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: onExport, className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Events", value: summary.total }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Views", value: summary.views }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Details", value: summary.details }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Exports", value: summary.exports })
    ] }),
    summary.top.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/40 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro uppercase tracking-[0.22em] text-muted-foreground mb-2", children: "Top actors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-2 text-meta text-foreground", children: summary.top.map(([who, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-full border border-border bg-muted px-3 py-1", children: [
        who,
        " · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: n })
      ] }, who)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-2xl border border-border bg-muted/40 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "search", value: actorQuery, onChange: (e) => setActorQuery(e.target.value), placeholder: "Actor email…", className: "h-10 rounded-lg border-border bg-muted px-3 text-sm text-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Action", value: actionFilter, onChange: setActionFilter, options: ACTIONS }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Resource", value: resourceFilter, onChange: setResourceFilter, options: RESOURCES }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Role", value: roleFilter, onChange: setRoleFilter, options: ROLES }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-micro uppercase tracking-[0.18em] text-muted-foreground mb-1", children: "Window" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: String(sinceHours), onChange: (e) => setSinceHours(Number(e.target.value)), className: "h-10 w-full rounded-lg border border-border bg-muted px-3 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "24", children: "24h" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "168", children: "7 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "720", children: "30 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2160", children: "90 days" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-micro uppercase tracking-[0.22em] text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Actor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Roles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Resource" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Summary" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 6, className: "px-4 py-12 text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "inline h-4 w-4 motion-safe:animate-spin" }),
          " Loading…"
        ] }) }),
        !loading && visible.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 align-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: new Date(r.occurredAt).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: r.actorEmail ?? r.actorId ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: r.actorRoles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border bg-muted px-2 py-0.5 text-micro uppercase tracking-wider text-foreground", children: role }, role)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground font-mono text-meta", children: r.action }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground text-meta", children: r.tableName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground text-micro font-mono max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer hover:text-foreground", children: summaryFor(r) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 whitespace-pre-wrap text-muted-foreground", children: JSON.stringify(r.diff ?? {}, null, 2) })
          ] }) })
        ] }, r.id)),
        !loading && visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-4 py-12 text-center text-muted-foreground", children: "No activity in this window." }) })
      ] })
    ] }) })
  ] });
}
function summaryFor(r) {
  const d = r.diff ?? {};
  if (typeof d.row_count === "number") return `${d.row_count} rows${d.masked_pii ? " · masked" : ""}`;
  if (typeof d.lead_email_masked === "string") return d.lead_email_masked;
  if (typeof d.role === "string") return String(d.role);
  return r.recordId || "—";
}
function Kpi({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-micro uppercase tracking-[0.22em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-h3 font-semibold text-foreground", children: value })
  ] });
}
function Select({
  label,
  value,
  onChange,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-micro uppercase tracking-[0.18em] text-muted-foreground mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value, onChange: (e) => onChange(e.target.value), className: "h-10 w-full rounded-lg border border-border bg-muted px-3 text-sm text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All" }),
      options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o))
    ] })
  ] });
}
export {
  AdminActivity as component
};
