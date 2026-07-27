import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { r as recordAdminExport, e as exportCsvAudited, d as dateStampedFilename } from "./admin-export.functions-BoaqXv52.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle, ak as Download, n as RotateCcw } from "../_libs/lucide-react.mjs";
import { p as objectType, x as numberType, v as enumType, q as stringType } from "../_libs/zod.mjs";
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
const SOFT_DELETE_TABLES = ["applications", "career_engine_leads", "enrolment_intents", "counsellor_leads", "arzonprime60_waitlist", "demand_votes", "certificates", "admin_invites", "user_roles", "course_thumbnail_overrides"];
const ListSchema = objectType({
  table: stringType().max(64).optional(),
  action: enumType(["insert", "update", "archive", "restore", "hard_delete"]).optional(),
  limit: numberType().int().min(1).max(500).optional()
});
const listAuditLog = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ListSchema.parse(d ?? {})).handler(createSsrRpc("2457e6d5b2a6d8c9cffacf3a223926670d2a925f7f1bd62df2590832bd7113a0"));
const RestoreSchema = objectType({
  table: enumType(SOFT_DELETE_TABLES),
  id: stringType().min(1).max(64)
});
const restoreRecord = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => RestoreSchema.parse(d)).handler(createSsrRpc("080d9565d89460dc658df79c1f7aa655d26197b4f1b8b1e984b213cd9a4529ed"));
const auditTables = SOFT_DELETE_TABLES;
const ACTIONS = ["insert", "update", "archive", "restore", "hard_delete"];
const ARCHIVABLE = new Set(auditTables);
function AdminAuditPage() {
  const {
    status
  } = useAdminGate(["admin"]);
  const listFn = useServerFn(listAuditLog);
  const restoreFn = useServerFn(restoreRecord);
  const recordExport = useServerFn(recordAdminExport);
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [table, setTable] = reactExports.useState("");
  const [action, setAction] = reactExports.useState("");
  const [expanded, setExpanded] = reactExports.useState(null);
  const [bump, setBump] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    setLoading(true);
    listFn({
      data: {
        table: table || void 0,
        action: action || void 0,
        limit: 200
      }
    }).then((res) => {
      if (!cancelled) setRows(res.rows);
    }).catch((e) => toast.error(e instanceof Error ? e.message : "Failed to load")).finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [status, table, action, bump, listFn]);
  const visibleRows = reactExports.useMemo(() => rows, [rows]);
  async function onRestore(row) {
    if (!ARCHIVABLE.has(row.table_name)) {
      toast.error("This table does not support restore.");
      return;
    }
    if (!confirm(`Restore ${row.table_name} record ${row.record_id}?`)) return;
    try {
      await restoreFn({
        data: {
          table: row.table_name,
          id: row.record_id
        }
      });
      toast.success("Restored");
      setBump((b) => b + 1);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Restore failed");
    }
  }
  async function onExport() {
    try {
      await exportCsvAudited(recordExport, "audit_log", dateStampedFilename("audit-log"), visibleRows, [{
        key: "occurred_at",
        header: "When"
      }, {
        key: "table_name",
        header: "Table"
      }, {
        key: "record_id",
        header: "Record ID"
      }, {
        key: "action",
        header: "Action"
      }, {
        key: "actor_id",
        header: "Actor"
      }, {
        key: "diff",
        header: "Diff"
      }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  }
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-8 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Loading…"
    ] });
  }
  if (status === "unauth") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-8 text-center text-sm text-foreground", children: [
      "You need to sign in.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", className: "underline", children: "Go to sign in" })
    ] });
  }
  if (status === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-md p-8 text-center text-sm text-foreground", children: "Admin only." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h3 font-semibold text-foreground", children: "Audit log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Every insert, update, archive, restore, and hard delete on protected tables." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: onExport, disabled: !visibleRows.length, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
        " Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 rounded-2xl border border-border bg-muted/60 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-foreground", children: [
        "Table",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: table, onChange: (e) => setTable(e.target.value), className: "ml-2 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All" }),
          auditTables.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-foreground", children: [
        "Action",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: action, onChange: (e) => setAction(e.target.value), className: "ml-2 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All" }),
          ACTIONS.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setBump((b) => b + 1), children: "Refresh" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full text-left text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Table" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Record" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Actor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-3 py-8 text-center text-muted-foreground", children: "Loading…" }) }) : visibleRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-3 py-8 text-center text-muted-foreground", children: "No audit events yet." }) }) : visibleRows.map((r) => {
        const isOpen = expanded === r.id;
        const isArchive = r.action === "archive";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border align-top", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-micro text-foreground", children: new Date(r.occurred_at).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: r.table_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 font-mono text-micro text-muted-foreground", children: [
              r.record_id.slice(0, 8),
              "…"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-micro uppercase tracking-wider ${r.action === "archive" ? "bg-amber-500/20 text-amber-200" : r.action === "restore" ? "bg-sky-500/20 text-sky-200" : r.action === "hard_delete" ? "bg-rose-500/20 text-rose-200" : r.action === "insert" ? "bg-accent-glow/20 text-eyebrow-strong" : "bg-accent text-foreground"}`, children: r.action }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-micro text-muted-foreground", children: r.actor_id ? r.actor_id.slice(0, 8) + "…" : "system" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setExpanded(isOpen ? null : r.id), children: isOpen ? "Hide" : "Diff" }),
              isArchive && ARCHIVABLE.has(r.table_name) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "secondary", onClick: () => onRestore(r), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-1 h-3 w-3" }),
                " Restore"
              ] })
            ] }) })
          ] }, r.id),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "bg-[#0a0c10]/40 px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-[40vh] overflow-auto whitespace-pre-wrap text-micro text-foreground", children: JSON.stringify(r.diff, null, 2) }) }) }, r.id + "-diff")
        ] });
      }) })
    ] }) })
  ] });
}
export {
  AdminAuditPage as component
};
