import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { u as useAdminGate } from "./router-CvdLERTV.mjs";
import { a as adminListCohorts, b as adminCohortAudit, d as adminSetCohortCapacity, e as adminSetCohortLock } from "./cohort.functions-BCUND4Jp.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, a7 as Lock, bV as LockOpen, bW as Save } from "../_libs/lucide-react.mjs";
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
function CohortsPage() {
  const nav = useNavigate();
  const {
    status: gate
  } = useAdminGate(["admin"]);
  const list = useServerFn(adminListCohorts);
  const audit = useServerFn(adminCohortAudit);
  const setCap = useServerFn(adminSetCohortCapacity);
  const setLock = useServerFn(adminSetCohortLock);
  const [rows, setRows] = reactExports.useState([]);
  const [log, setLog] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState(null);
  const [savingId, setSavingId] = reactExports.useState(null);
  const reload = reactExports.useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const [r, a] = await Promise.all([list(), audit({
        data: {
          limit: 50
        }
      })]);
      setRows(r);
      setLog(a);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load cohorts");
    } finally {
      setLoading(false);
    }
  }, [list, audit]);
  reactExports.useEffect(() => {
    if (gate === "ready") void reload();
  }, [gate, reload]);
  if (gate === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Loading…"
    ] });
  }
  if (gate === "unauth") {
    nav({
      to: "/admin/login"
    });
    return null;
  }
  if (gate === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100", children: "Admin role required." });
  }
  async function onSaveCap(id, capStr) {
    const cap = Number(capStr);
    if (!Number.isInteger(cap) || cap < 1) {
      setErr("Capacity must be a positive integer.");
      return;
    }
    setSavingId(id);
    try {
      await setCap({
        data: {
          id,
          cap
        }
      });
      await reload();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to update capacity");
    } finally {
      setSavingId(null);
    }
  }
  async function onToggleLock(c, reason) {
    setSavingId(c.id);
    try {
      await setLock({
        data: {
          id: c.id,
          locked: !c.is_locked,
          reason: reason.trim() || null
        }
      });
      await reload();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to update lock");
    } finally {
      setSavingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Cohorts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Capacity & lock control" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Adjust seat caps and lock state per cohort. All changes are appended to the audit log below." })
    ] }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100", children: err }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Loading…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "space-y-4", children: rows.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CohortRow, { c, saving: savingId === c.id, onSaveCap: (v) => onSaveCap(c.id, v), onToggleLock: (reason) => onToggleLock(c, reason) }, c.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-h3 text-foreground", children: "Audit log" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-meta text-foreground/70", children: [
        "Most recent ",
        log.length,
        " change(s). All seat/lock writes are recorded server-side."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-[640px] w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/60 text-left text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]", children: "When" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]", children: "Cohort" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]", children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]", children: "Actor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]", children: "Detail" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          log.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap tabular-nums", children: new Date(r.occurred_at).toLocaleString("en-IN") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono", children: r.cohort_id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: r.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-xs text-foreground/70", children: r.actor_id ? r.actor_id.slice(0, 8) : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs text-foreground/70", children: r.before || r.after ? /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
              JSON.stringify(r.before),
              " → ",
              JSON.stringify(r.after)
            ] }) : "—" })
          ] }, r.id)),
          log.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-3 py-4 text-center text-foreground/60", children: "No changes recorded yet." }) })
        ] })
      ] }) })
    ] })
  ] });
}
function CohortRow({
  c,
  saving,
  onSaveCap,
  onToggleLock
}) {
  const [cap, setCap] = reactExports.useState(String(c.seats_cap));
  const [reason, setReason] = reactExports.useState("");
  const seatsLeft = Math.max(0, c.seats_cap - c.seats_taken);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/40 p-4 sm:p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-h3 text-foreground", children: c.display_label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-micro uppercase tracking-[0.18em] text-foreground/60", children: [
          "id: ",
          c.id,
          " · starts ",
          new Date(c.starts_at).toLocaleDateString("en-IN"),
          " · locks",
          " ",
          new Date(c.lock_at).toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-micro uppercase tracking-[0.22em] ${c.is_locked ? "bg-rose-500/15 text-rose-200" : "bg-sky-500/15 text-sky-200"}`, children: [
        c.is_locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "h-3 w-3" }),
        c.is_locked ? "Locked" : "Open"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-3 grid grid-cols-3 gap-3 text-sm text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-foreground/60", children: "Capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-display text-h3 text-foreground", children: c.seats_cap })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-foreground/60", children: "Taken" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-display text-h3 text-foreground", children: c.seats_taken })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-foreground/60", children: "Left" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-display text-h3 text-primary-glow", children: seatsLeft })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro uppercase tracking-[0.18em] text-foreground/70", children: "Set capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: cap, onChange: (e) => setCap(e.target.value), className: "w-28 rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: saving || cap === String(c.seats_cap), onClick: () => onSaveCap(cap), className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-50", children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 motion-safe:animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
            "Save"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-micro uppercase tracking-[0.18em] text-foreground/70", children: c.is_locked ? "Unlock reason (optional)" : "Lock reason (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: reason, onChange: (e) => setReason(e.target.value), maxLength: 240, placeholder: "e.g. capacity reached", className: "flex-1 rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: saving, onClick: () => onToggleLock(reason), className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold disabled:opacity-50 ${c.is_locked ? "bg-sky-500 text-sky-50" : "bg-rose-500 text-rose-50"}`, children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 motion-safe:animate-spin" }) : c.is_locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }),
            c.is_locked ? "Unlock cohort" : "Lock cohort"
          ] })
        ] })
      ] })
    ] }),
    c.lock_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-meta text-foreground/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground/80", children: "Lock reason:" }),
      " ",
      c.lock_reason
    ] })
  ] });
}
export {
  CohortsPage as component
};
