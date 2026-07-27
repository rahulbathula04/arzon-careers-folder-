import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { s as scanLandingCopy } from "./landingCopyScan.functions-tRBixUn9.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { ak as Download, bT as ClipboardCopy, a4 as LoaderCircle, bR as RotateCw, o as TriangleAlert, bU as Info, m as ShieldCheck, aF as ShieldAlert } from "../_libs/lucide-react.mjs";
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
function ContentQAScanPage() {
  const {
    status
  } = useAdminGate(["admin", "reviewer", "support"]);
  const scanFn = useServerFn(scanLandingCopy);
  const [findings, setFindings] = reactExports.useState([]);
  const [scannedAt, setScannedAt] = reactExports.useState(null);
  const [scannedFiles, setScannedFiles] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("warn");
  const [summary, setSummary] = reactExports.useState(null);
  const runScan = async () => {
    setLoading(true);
    try {
      const r = await scanFn();
      setFindings(r.findings);
      setScannedAt(r.scannedAt);
      setScannedFiles(r.scannedFiles);
      setSummary(r.summary);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Scan failed");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (status === "ready") runScan();
  }, [status]);
  const visible = reactExports.useMemo(() => filter === "all" ? findings : findings.filter((f) => f.severity === filter), [findings, filter]);
  const grouped = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const f of visible) {
      const arr = map.get(f.file) ?? [];
      arr.push(f);
      map.set(f.file, arr);
    }
    return Array.from(map.entries());
  }, [visible]);
  const warnCount = findings.filter((f) => f.severity === "warn").length;
  const infoCount = findings.filter((f) => f.severity === "info").length;
  const exportCsv = () => {
    if (findings.length === 0) {
      toast.error("Nothing to export");
      return;
    }
    const headers = ["severity", "category", "file", "line", "column", "rule", "snippet"];
    const esc = (v) => `"${String(v ?? "").replace(/\r?\n/g, "\\n").replace(/"/g, '""')}"`;
    const rows = findings.map((f) => [f.severity, f.category, f.file, f.line, f.column, f.rule, f.snippet].map(esc).join(","));
    const meta = [`# Landing copy QA scan`, `# scanned_at,${scannedAt ?? (/* @__PURE__ */ new Date()).toISOString()}`, `# files_scanned,${scannedFiles}`, `# warnings,${warnCount}`, `# info,${infoCount}`, `# publish_ready,${summary?.publishReady ?? false}`, ""];
    const csv = "\uFEFF" + meta.join("\n") + headers.join(",") + "\n" + rows.join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19);
    a.download = `content-qa-report-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${findings.length} row${findings.length === 1 ? "" : "s"}`);
  };
  const copyReport = async () => {
    const lines = [`Landing copy QA scan — ${scannedAt ?? (/* @__PURE__ */ new Date()).toISOString()}`, `${scannedFiles} files scanned · ${warnCount} warnings · ${infoCount} info`, "", ...findings.map((f) => `[${f.severity.toUpperCase()}] ${f.file}:${f.line}:${f.column} — ${f.rule}
    ${f.snippet}`)];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      toast.success("Report copied to clipboard");
    } catch {
      toast.error("Clipboard unavailable");
    }
  };
  if (status !== "ready") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-h3 text-foreground", children: "Content QA scan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Pre-publish punctuation and style check for landing copy." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: exportCsv, disabled: findings.length === 0, "aria-label": "Export QA report as CSV", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1.5 h-3.5 w-3.5", "aria-hidden": true }),
          " Export CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: copyReport, disabled: findings.length === 0, "aria-label": "Copy QA report to clipboard", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "mr-1.5 h-3.5 w-3.5", "aria-hidden": true }),
          " Copy report"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: runScan, disabled: loading, "aria-label": "Re-run scan", children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 motion-safe:animate-spin", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "mr-1.5 h-3.5 w-3.5", "aria-hidden": true }),
          "Re-scan"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublishGate, { summary, loading }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill, { tone: "warn", active: filter !== "info", onClick: () => setFilter(filter === "warn" ? "all" : "warn"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
        " ",
        warnCount,
        " warnings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill, { tone: "info", active: filter === "info", onClick: () => setFilter(filter === "info" ? "all" : "info"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3 w-3" }),
        " ",
        infoCount,
        " info"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFilter("all"), className: `rounded-md border px-2.5 py-1 text-micro font-medium uppercase tracking-wider transition ${filter === "all" ? "border-slate-200/30 bg-accent text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`, children: "Show all" }),
      scannedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-micro uppercase tracking-wider text-muted-foreground", children: [
        "Scanned ",
        new Date(scannedAt).toLocaleString(),
        " · ",
        scannedFiles,
        " files"
      ] })
    ] }),
    visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-sky-400/25 bg-sky-400/5 p-6 text-center text-sm text-sky-200", children: loading ? "Scanning…" : "No findings at this severity. Landing copy is clean." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: grouped.map(([file, list]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-muted/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border/60 px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-meta text-foreground", children: file }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-micro uppercase tracking-wider text-muted-foreground", children: [
          list.length,
          " ",
          list.length === 1 ? "finding" : "findings"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: list.map((f, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-micro", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono uppercase tracking-wider ${f.severity === "warn" ? "bg-amber-400/15 text-amber-200" : "bg-accent-glow/15 text-eyebrow-strong"}`, children: f.severity }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "line ",
            f.line,
            ":",
            f.column
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            "— ",
            f.rule
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-1.5 overflow-x-auto whitespace-pre-wrap break-words rounded bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2.5 py-1.5 font-mono text-micro text-foreground", children: f.snippet })
      ] }, idx)) })
    ] }, file)) })
  ] });
}
function Pill({
  tone,
  active,
  onClick,
  children
}) {
  const base = "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-micro font-medium uppercase tracking-wider transition";
  const colors = tone === "warn" ? active ? "border-amber-300/40 bg-amber-400/15 text-amber-100" : "border-border text-muted-foreground hover:text-amber-100" : active ? "border-accent-glow/40 bg-accent-glow/15 text-eyebrow-strong" : "border-border text-muted-foreground hover:text-eyebrow-strong";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, className: `${base} ${colors}`, children });
}
function PublishGate({
  summary,
  loading
}) {
  if (loading && !summary) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 rounded-xl border border-border bg-muted/60 p-4 text-sm text-foreground", children: "Running publish-readiness check…" });
  }
  if (!summary) return null;
  const ready = summary.publishReady;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "status", "aria-live": "polite", className: `mb-5 flex flex-wrap items-start gap-3 rounded-xl border p-4 ${ready ? "border-sky-400/30 bg-sky-400/[0.06]" : "border-amber-400/30 bg-amber-400/[0.06]"}`, children: [
    ready ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-sky-300", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-amber-300", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-semibold ${ready ? "text-sky-100" : "text-amber-100"}`, children: ready ? "Publish-ready — no blocking findings" : "Publish blocked — resolve warnings before pushing live" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-meta text-foreground", children: [
        summary.typographyWarnCount,
        " typography",
        " ",
        summary.typographyWarnCount === 1 ? "violation" : "violations",
        " · ",
        summary.a11yWarnCount,
        " ",
        "accessibility ",
        summary.a11yWarnCount === 1 ? "violation" : "violations",
        " ·",
        " ",
        summary.infoCount,
        " info"
      ] }),
      !ready && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-meta text-muted-foreground", children: "Publish reviewers should hold the release until warnings reach zero. Info-level findings are advisory and do not block." })
    ] })
  ] });
}
export {
  ContentQAScanPage as component
};
