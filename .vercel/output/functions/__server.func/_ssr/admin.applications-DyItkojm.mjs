import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { u as useAdminGate, B as Button, t as track } from "./router-CvdLERTV.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { r as recordAdminExport, e as exportCsvAudited, d as dateStampedFilename } from "./admin-export.functions-BoaqXv52.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { ak as Download } from "../_libs/lucide-react.mjs";
import { p as objectType, x as numberType, q as stringType, v as enumType, w as booleanType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
const SubmitSchema = objectType({
  name: stringType().min(2).max(80),
  email: stringType().email().max(120),
  phone: stringType().min(10).max(20),
  programSlug: stringType().min(1).max(80),
  programName: stringType().max(120).optional(),
  whatsappOptin: booleanType().optional(),
  leadId: stringType().uuid().optional().nullable(),
  utmSource: stringType().max(64).optional(),
  userAgent: stringType().max(256).optional()
});
createServerFn({
  method: "POST"
}).inputValidator((data) => SubmitSchema.parse(data)).handler(createSsrRpc("0eb51b4df6b0d88ecdda68f490c97172a3b61b1cca7dcca9590a260f83d004f5"));
const ListSchema = objectType({
  status: stringType().optional(),
  limit: numberType().int().min(1).max(500).optional(),
  page: numberType().int().min(0).max(1e4).optional(),
  pageSize: numberType().int().min(10).max(200).optional()
});
const listApplications = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ListSchema.parse(data ?? {})).handler(createSsrRpc("1e9e3b335f696f04224ab187fa3131a6d38970d9a29a8de98e16b829548176a3"));
const UpdateStatusSchema = objectType({
  id: stringType().uuid(),
  status: enumType(["submitted", "reviewing", "shortlisted", "rejected", "accepted", "enrolled", "withdrawn"]),
  notes: stringType().max(2e3).optional()
});
const updateApplicationStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => UpdateStatusSchema.parse(data)).handler(createSsrRpc("8b2d852cc98c70ec99a61c1119c48424001d661eff4ccaaf5dd0b1ccea5d7f57"));
const STATUSES = ["submitted", "reviewing", "shortlisted", "accepted", "enrolled", "rejected", "withdrawn"];
function AdminApplicationsPage() {
  const {
    status
  } = useAdminGate(["admin", "reviewer", "support"]);
  const [rows, setRows] = reactExports.useState([]);
  const [filter, setFilter] = reactExports.useState("");
  const [savingId, setSavingId] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(0);
  const [total, setTotal] = reactExports.useState(0);
  const pageSize = 50;
  const list = useServerFn(listApplications);
  const update = useServerFn(updateApplicationStatus);
  const recordExport = useServerFn(recordAdminExport);
  reactExports.useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await list({
          data: {
            page,
            pageSize,
            status: filter || void 0
          }
        });
        if (!cancelled) {
          setRows(res.applications);
          setTotal(res.total ?? 0);
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load applications");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, list, page, filter]);
  reactExports.useEffect(() => {
    setPage(0);
  }, [filter]);
  const filtered = rows;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const csvColumns = reactExports.useMemo(() => [{
    key: "created_at",
    header: "Created"
  }, {
    key: "name",
    header: "Name"
  }, {
    key: "email",
    header: "Email"
  }, {
    key: "phone",
    header: "Phone"
  }, {
    key: "program_slug",
    header: "Programme slug"
  }, {
    key: "program_name",
    header: "Programme"
  }, {
    key: "status",
    header: "Status"
  }, {
    key: "utm_source",
    header: "UTM source"
  }, {
    key: "notes",
    header: "Notes"
  }, {
    key: "id",
    header: "ID"
  }], []);
  async function onExport() {
    try {
      await exportCsvAudited(recordExport, "applications", dateStampedFilename(filter ? `applications-${filter}` : "applications"), filtered, csvColumns, {
        filter: filter || null
      });
      track("admin_export_csv", {
        props: {
          entity: "applications",
          count: filtered.length,
          filter: filter || null
        }
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  }
  async function changeStatus(row, next) {
    setSavingId(row.id);
    try {
      await update({
        data: {
          id: row.id,
          status: next
        }
      });
      setRows((prev) => prev.map((r) => r.id === row.id ? {
        ...r,
        status: next
      } : r));
      toast.success(`Moved to ${next}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSavingId(null);
    }
  }
  function viewApplication(row) {
    track("admin_application_viewed", {
      application_id: row.id,
      program_slug: row.program_slug
    });
  }
  if (status !== "ready") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Pipeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Applications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-foreground", children: [
          total,
          " total · page ",
          page + 1,
          " of ",
          pageCount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "h-10 rounded-full border border-border bg-muted px-4 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All statuses" }),
          STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "secondary", size: "sm", onClick: onExport, disabled: filtered.length === 0, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1.5 h-3.5 w-3.5" }),
          " Export CSV"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-micro uppercase tracking-[0.22em] text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Applicant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Programme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 cursor-pointer hover:bg-muted/60", onClick: () => viewApplication(r), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: new Date(r.created_at).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground", children: r.utm_source ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: r.program_name ?? r.program_slug }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: r.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground", children: r.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: r.status, disabled: savingId === r.id, onChange: (e) => changeStatus(r, e.target.value), className: "rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground disabled:opacity-50", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }) })
        ] }, r.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-12 text-center text-muted-foreground", children: "No applications yet." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "secondary", size: "sm", onClick: () => setPage((p) => Math.max(0, p - 1)), disabled: page === 0, children: "Previous" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-foreground", children: [
        page + 1,
        " / ",
        pageCount
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "secondary", size: "sm", onClick: () => setPage((p) => Math.min(pageCount - 1, p + 1)), disabled: page >= pageCount - 1, children: "Next" })
    ] })
  ] });
}
export {
  AdminApplicationsPage as component
};
