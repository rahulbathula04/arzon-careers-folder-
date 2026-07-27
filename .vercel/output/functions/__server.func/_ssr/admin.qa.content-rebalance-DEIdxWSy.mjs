import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle, aQ as ExternalLink, bW as Save } from "../_libs/lucide-react.mjs";
import { p as objectType, q as stringType, v as enumType } from "../_libs/zod.mjs";
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
const CONTENT_QA_ROWS = [
  // ───── Home ( / ) ─────
  {
    page: "/",
    sectionId: "hero",
    label: "Hero (kept) — primary deployment-ready promise + Apply CTA",
    bucket: "sell",
    action: "kept"
  },
  {
    page: "/",
    sectionId: "day-in-the-life",
    label: "Day-in-the-life strip (added)",
    bucket: "desire",
    action: "added"
  },
  {
    page: "/",
    sectionId: "bento-programmes",
    label: "Bento programmes (kept) — anchor #programmes",
    bucket: "desire",
    action: "kept"
  },
  {
    page: "/",
    sectionId: "domain-grid-removed",
    label: "Pick-your-domain grid (removed)",
    bucket: "sell",
    action: "trimmed"
  },
  {
    page: "/",
    sectionId: "scroll-rescue",
    label: "Legacy /#domains → /#programmes scroll rescue",
    bucket: "rescue",
    action: "rescue",
    notes: "Verify analytics event home_domain_grid_search_signal fires."
  },
  {
    page: "/",
    sectionId: "recruiter-band",
    label: "Recruiter band (kept) — IQVIA / Cognizant / Parexel",
    bucket: "proof",
    action: "kept"
  },
  // ───── Courses ( /courses ) ─────
  {
    page: "/courses",
    sectionId: "tools-you-touch",
    label: "Tools-you-touch strip (added) — Argus, MedDRA, etc.",
    bucket: "desire",
    action: "added"
  },
  {
    page: "/courses",
    sectionId: "recruiter-quote",
    label: "Recruiter quote strip (added)",
    bucket: "proof",
    action: "added"
  },
  {
    page: "/courses",
    sectionId: "courses-grid",
    label: "Courses grid (kept)",
    bucket: "desire",
    action: "kept"
  },
  {
    page: "/courses",
    sectionId: "duplicate-apply",
    label: "Duplicate Apply blocks (trimmed) — cap 3 per page",
    bucket: "sell",
    action: "trimmed"
  }
];
const STATUSES$1 = ["pending", "reviewed", "approved", "live", "rejected"];
const BUCKETS = ["desire", "proof", "sell", "rescue"];
const listContentQAReviews = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("dffb2992e4b72f9a1a23e9ec07b115f3b7d925aee33e616e9405b09c3f1aa58b"));
const UpsertSchema = objectType({
  page: stringType().min(1).max(120),
  sectionId: stringType().min(1).max(120),
  bucket: enumType(BUCKETS),
  status: enumType(STATUSES$1),
  notes: stringType().max(2e3).optional().nullable()
});
const upsertContentQAReview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => UpsertSchema.parse(data)).handler(createSsrRpc("40fb0f0e7d16ed6d524fad6522f0e3f8829d8d7a7fc95fd0ea926d216698885c"));
const BUCKET_LABEL = {
  desire: "70 · Desire",
  proof: "20 · Proof",
  sell: "10 · Sell",
  rescue: "— Rescue"
};
const STATUSES = ["pending", "reviewed", "approved", "live", "rejected"];
function ContentQAPage() {
  const list = useServerFn(listContentQAReviews);
  const save = useServerFn(upsertContentQAReview);
  const [byKey, setByKey] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const keyOf = (page, sectionId) => `${page}::${sectionId}`;
  reactExports.useEffect(() => {
    void (async () => {
      try {
        const {
          rows
        } = await list();
        const map = {};
        for (const r of rows) {
          map[keyOf(r.page, r.section_id)] = {
            status: r.status,
            notes: r.notes ?? ""
          };
        }
        setByKey(map);
      } finally {
        setLoading(false);
      }
    })();
  }, [list]);
  const grouped = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const r of CONTENT_QA_ROWS) {
      const arr = m.get(r.page) ?? [];
      arr.push(r);
      m.set(r.page, arr);
    }
    return [...m.entries()];
  }, []);
  const onSave = async (page, sectionId, bucket) => {
    const k = keyOf(page, sectionId);
    const cur = byKey[k] ?? {
      status: "pending",
      notes: ""
    };
    setByKey((s) => ({
      ...s,
      [k]: {
        ...cur,
        saving: true
      }
    }));
    try {
      await save({
        data: {
          page,
          sectionId,
          bucket,
          status: cur.status,
          notes: cur.notes
        }
      });
      setByKey((s) => ({
        ...s,
        [k]: {
          ...cur,
          saving: false,
          savedAt: Date.now()
        }
      }));
    } catch (e) {
      setByKey((s) => ({
        ...s,
        [k]: {
          ...cur,
          saving: false
        }
      }));
      alert(e instanceof Error ? e.message : "Save failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6 text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display", children: "Content QA · 70/20/10 rebalance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Per-page checklist for the desire (70) / proof (20) / sell (10) rebalance and scroll-rescue verification before deployment." })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Loading reviews…"
    ] }) : grouped.map(([page, rows]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 border-b border-border px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-sm", children: page }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: page, target: "_blank", rel: "noopener", className: "inline-flex items-center gap-1 text-xs text-eyebrow hover:underline", children: [
          "Open ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Section" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Bucket" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r) => {
          const k = keyOf(r.page, r.sectionId);
          const st = byKey[k] ?? {
            status: "pending",
            notes: ""
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border align-top", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: r.label }),
              r.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: r.notes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs", children: BUCKET_LABEL[r.bucket] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs capitalize", children: r.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: st.status, onChange: (e) => setByKey((s) => ({
              ...s,
              [k]: {
                ...st,
                status: e.target.value,
                savedAt: void 0
              }
            })), className: "rounded border border-border bg-transparent px-2 py-1 text-xs", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: st.notes, onChange: (e) => setByKey((s) => ({
              ...s,
              [k]: {
                ...st,
                notes: e.target.value,
                savedAt: void 0
              }
            })), className: "w-full rounded border border-border bg-transparent px-2 py-1 text-xs", placeholder: "Reviewer notes…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onSave(r.page, r.sectionId, r.bucket), disabled: st.saving, className: "inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs hover:bg-muted disabled:opacity-50", children: [
                st.saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 motion-safe:animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3 w-3" }),
                "Save"
              ] }),
              st.savedAt && !st.saving && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-micro text-sky-300", children: "saved" })
            ] })
          ] }, k);
        }) })
      ] })
    ] }, page))
  ] });
}
export {
  ContentQAPage as component
};
