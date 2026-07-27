import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle, ai as Undo2, ak as Download, bR as RotateCw, aF as ShieldAlert, m as ShieldCheck } from "../_libs/lucide-react.mjs";
import { p as objectType, v as enumType, q as stringType } from "../_libs/zod.mjs";
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
const listLandingCopyChanges = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("249a1cacb0cc84e36857b2631a3e02223edcc6ebb7b87d43013ebb64a3b61717"));
const RecordSchema = objectType({
  filePath: stringType().min(1).max(240),
  section: stringType().max(120).optional().nullable(),
  before: stringType().max(4e3),
  after: stringType().max(4e3),
  reason: stringType().max(500).optional().nullable(),
  source: enumType(["agent", "admin", "migration", "scanner"]).default("admin")
});
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => RecordSchema.parse(data)).handler(createSsrRpc("b7eeaafc6347c002586e4b6b933e80dba90fcfa7f7c6bf6b4061aebf9ddfdb89"));
const requestPublishRollback = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("e9e7960da1d1c1f102f9304c57e5a1b86ab97af74eeb5b7df519208cb7749799"));
function LandingChangelogPage() {
  const {
    status
  } = useAdminGate(["admin", "reviewer"]);
  const listFn = useServerFn(listLandingCopyChanges);
  const rollbackFn = useServerFn(requestPublishRollback);
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [fileFilter, setFileFilter] = reactExports.useState("");
  const [rollingBack, setRollingBack] = reactExports.useState(false);
  const [rollbackResult, setRollbackResult] = reactExports.useState(null);
  const runRollback = async () => {
    setRollingBack(true);
    try {
      const r = await rollbackFn();
      setRollbackResult({
        rollbackNeeded: r.rollbackNeeded,
        message: r.message,
        warnCount: r.summary.warnCount
      });
      if (r.rollbackNeeded) {
        toast.warning(r.message, {
          description: "Open the chat History panel and revert to the last approved version.",
          duration: 8e3
        });
        await load();
      } else {
        toast.success(r.message);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Rollback check failed");
    } finally {
      setRollingBack(false);
    }
  };
  const load = async () => {
    setLoading(true);
    try {
      const r = await listFn();
      setRows(r.rows);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load changelog");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (status === "ready") load();
  }, [status]);
  if (status !== "ready") return null;
  const visible = rows.filter((r) => fileFilter ? r.file_path.toLowerCase().includes(fileFilter.toLowerCase()) : true);
  const exportCsv = () => {
    if (visible.length === 0) {
      toast.error("No rows to export");
      return;
    }
    const headers = ["changed_at", "actor_email", "source", "file_path", "section", "reason", "before_text", "after_text"];
    const esc = (v) => {
      const s = (v ?? "").replace(/\r?\n/g, "\\n");
      return `"${s.replace(/"/g, '""')}"`;
    };
    const lines = [headers.join(","), ...visible.map((r) => [r.changed_at, r.actor_email, r.source, r.file_path, r.section, r.reason, r.before_text, r.after_text].map(esc).join(","))];
    const blob = new Blob(["\uFEFF" + lines.join("\n")], {
      type: "text/csv;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19);
    a.download = `landing-copy-changelog-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${visible.length} row${visible.length === 1 ? "" : "s"}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-h3 text-foreground", children: "Landing copy changelog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Every recorded edit to landing-page copy, newest first." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: runRollback, disabled: rollingBack, "aria-label": "Check published landing for QA regressions and request rollback", children: [
          rollingBack ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 motion-safe:animate-spin", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "mr-1.5 h-3.5 w-3.5", "aria-hidden": true }),
          "Rollback published landing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: exportCsv, disabled: loading || visible.length === 0, "aria-label": `Export ${visible.length} changelog row${visible.length === 1 ? "" : "s"} as CSV`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1.5 h-3.5 w-3.5", "aria-hidden": true }),
          "Export CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: load, disabled: loading, "aria-label": "Refresh changelog", children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 motion-safe:animate-spin", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "mr-1.5 h-3.5 w-3.5", "aria-hidden": true }),
          "Refresh"
        ] })
      ] })
    ] }),
    rollbackResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "status", "aria-live": "polite", className: `mb-5 flex items-start gap-3 rounded-xl border p-4 ${rollbackResult.rollbackNeeded ? "border-amber-400/30 bg-amber-400/[0.06]" : "border-sky-400/30 bg-sky-400/[0.06]"}`, children: [
      rollbackResult.rollbackNeeded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-amber-300", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-sky-300", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-semibold ${rollbackResult.rollbackNeeded ? "text-amber-100" : "text-sky-100"}`, children: rollbackResult.message }),
        rollbackResult.rollbackNeeded && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-meta text-foreground", children: "A rollback request has been logged below. To restore the last approved version, open the chat History panel and revert to the prior approved landing commit. Publishing is owned by the deploy pipeline — this audit row is the formal trigger." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", value: fileFilter, onChange: (e) => setFileFilter(e.target.value), placeholder: "Filter by file path…", className: "h-9 w-full max-w-sm rounded-md border border-border bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-slate-200/30 focus:outline-none focus:ring-2 focus:ring-border" }) }),
    visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-muted/60 p-6 text-center text-sm text-muted-foreground", children: loading ? "Loading…" : "No copy changes recorded yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: visible.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-border bg-muted/60 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-micro text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono uppercase tracking-wider text-muted-foreground", children: new Date(r.changed_at).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded px-1.5 py-0.5 font-mono uppercase tracking-wider ${r.source === "admin" ? "bg-sky-400/15 text-sky-200" : r.source === "agent" ? "bg-accent-glow/15 text-eyebrow-strong" : "bg-accent text-foreground"}`, children: r.source }),
        r.actor_email && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "by ",
          r.actor_email
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 font-mono text-meta text-foreground", children: [
        r.file_path,
        r.section && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          " · ",
          r.section
        ] })
      ] }),
      r.reason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-caption text-foreground", children: r.reason }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-2 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Diff, { label: "Before", tone: "rust", text: r.before_text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Diff, { label: "After", tone: "emerald", text: r.after_text })
      ] })
    ] }, r.id)) })
  ] });
}
function Diff({
  label,
  tone,
  text
}) {
  const color = tone === "rust" ? "border-rose-400/25 bg-rose-400/[0.06] text-rose-100" : "border-sky-400/25 bg-sky-400/[0.06] text-sky-100";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-md border p-2.5 ${color}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 font-mono text-micro uppercase tracking-wider opacity-70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap break-words font-mono text-micro leading-relaxed", children: text || "—" })
  ] });
}
export {
  LandingChangelogPage as component
};
