import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { r as recordAdminExport, e as exportCsvAudited, d as dateStampedFilename } from "./admin-export.functions-BoaqXv52.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { ak as Download } from "../_libs/lucide-react.mjs";
import { p as objectType, v as enumType, q as stringType } from "../_libs/zod.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./moments.types-CDdnLKsa.mjs";
import "./enrolment.functions-Cs_77DUe.mjs";
import "./enrolmentTiers-CKOrj6Lb.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
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
const listAdmins = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("43caaf065d858cec9ed6d45b059b3ce74b6bce0e6e14336e4d50f0df8fa4ff2c"));
const grantAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  email: stringType().email().max(254)
}).parse(data)).handler(createSsrRpc("4789a3aa90a64f04c586e359b5b9d8d96c2ca3cb297e290629e7c8b142fe8bfc"));
const revokeAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  userId: stringType().uuid()
}).parse(data)).handler(createSsrRpc("29fe1a8fa1555f5ae3b80e31027016cafeaf59fd4c45a68533d2c9b052301b81"));
const ROLE_VALUES = ["admin", "reviewer", "support", "viewer", "analyst", "exporter"];
const listRoleAssignments = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("bde3ffa4211e8425af7edd50706889c3432eb3d8df3f6dc842bd19bafe1d56a7"));
const grantWorkspaceRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  email: stringType().email().max(254),
  role: enumType(ROLE_VALUES)
}).parse(data)).handler(createSsrRpc("ec4c41aad24db1ea5c2160fdb3230e161c8026c3e1eb10c54db41be4bab64649"));
const revokeWorkspaceRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  userId: stringType().uuid(),
  role: enumType(ROLE_VALUES)
}).parse(data)).handler(createSsrRpc("b54e157f398325f26a2a54a40f1224f6cfcca0bd043554b3e77aa705aaf6c89a"));
const ROLE_DESCRIPTIONS = {
  admin: "Full access — settings, roles, all data, audit log.",
  reviewer: "Reviews applications. Sees leads & applications.",
  support: "Can contact leads. Sees leads & applications.",
  viewer: "Read /admin/results with PII masked. No export.",
  analyst: "Read /admin/results with full PII. No export.",
  exporter: "Analyst + can download CSV exports."
};
function AdminRolesPage() {
  const recordExport = useServerFn(recordAdminExport);
  const navigate = useNavigate();
  const {
    status,
    userId: currentUserId
  } = useAdminGate(["admin"]);
  const [admins, setAdmins] = reactExports.useState([]);
  const [email, setEmail] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const listWs = useServerFn(listRoleAssignments);
  const grantWs = useServerFn(grantWorkspaceRole);
  const revokeWs = useServerFn(revokeWorkspaceRole);
  const [wsRows, setWsRows] = reactExports.useState([]);
  const [wsEmail, setWsEmail] = reactExports.useState("");
  const [wsRole, setWsRole] = reactExports.useState("viewer");
  const [wsBusy, setWsBusy] = reactExports.useState(false);
  async function refreshWs() {
    try {
      setWsRows(await listWs());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load roles");
    }
  }
  async function onGrantWs(e) {
    e.preventDefault();
    if (!wsEmail.trim()) return;
    setWsBusy(true);
    try {
      await grantWs({
        data: {
          email: wsEmail.trim(),
          role: wsRole
        }
      });
      toast.success(`Granted ${wsRole} to ${wsEmail.trim()}`);
      setWsEmail("");
      await refreshWs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Grant failed");
    } finally {
      setWsBusy(false);
    }
  }
  async function onRevokeWs(row) {
    if (!confirm(`Revoke ${row.role} from ${row.email ?? row.userId}?`)) return;
    setWsBusy(true);
    try {
      await revokeWs({
        data: {
          userId: row.userId,
          role: row.role
        }
      });
      toast.success("Role revoked");
      await refreshWs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Revoke failed");
    } finally {
      setWsBusy(false);
    }
  }
  async function refresh() {
    try {
      const rows = await listAdmins();
      setAdmins(rows);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load admins");
    }
  }
  reactExports.useEffect(() => {
    if (status === "ready") {
      refresh();
      refreshWs();
    }
  }, [status]);
  async function onGrant(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    try {
      await grantAdmin({
        data: {
          email: email.trim()
        }
      });
      toast.success(`Granted admin to ${email.trim()}`);
      setEmail("");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Grant failed");
    } finally {
      setBusy(false);
    }
  }
  async function onRevoke(row) {
    if (!confirm(`Revoke admin role from ${row.email ?? row.userId}?`)) return;
    setBusy(true);
    try {
      await revokeAdmin({
        data: {
          userId: row.userId
        }
      });
      toast.success("Admin role revoked");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Revoke failed");
    } finally {
      setBusy(false);
    }
  }
  if (status === "loading") return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: "Checking access…" });
  if (status === "unauth") return /* @__PURE__ */ jsxRuntimeExports.jsxs(Centered, { children: [
    "You need to sign in.",
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", className: "underline", children: "Go to sign in" })
  ] });
  if (status === "forbidden") return /* @__PURE__ */ jsxRuntimeExports.jsxs(Centered, { children: [
    "Your account isn't an admin.",
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", onClick: async () => {
      await supabase.auth.signOut();
      navigate({
        to: "/admin/login"
      });
    }, children: "Sign out" }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Workspace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2 text-foreground", children: "Staff roles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Grant or revoke admin access. The user must already have an account." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "secondary", size: "sm", disabled: admins.length === 0, onClick: () => {
        const columns = [{
          key: "email",
          header: "Email"
        }, {
          key: "userId",
          header: "User ID"
        }];
        exportCsvAudited(recordExport, "admin_roles", dateStampedFilename("admin-roles"), admins, columns).catch((e) => toast.error(e instanceof Error ? e.message : "Export blocked"));
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1.5 h-3.5 w-3.5" }),
        " Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onGrant, className: "flex flex-col gap-3 rounded-2xl border border-border bg-muted/60 p-5 sm:flex-row sm:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs uppercase tracking-wider text-foreground", children: "Grant admin to email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", required: true, placeholder: "user@example.com", value: email, onChange: (e) => setEmail(e.target.value), disabled: busy })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, children: busy ? "Working…" : "Grant admin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold uppercase tracking-wider text-foreground", children: [
        "Current admins (",
        admins.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 divide-y divide-border rounded-xl border border-border bg-muted/60", children: [
        admins.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "p-4 text-sm text-foreground", children: "No admins yet." }),
        admins.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center justify-between gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-sm font-medium text-foreground", children: [
              a.email ?? "(no email)",
              a.userId === currentUserId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded-full bg-accent-glow/20 px-2 py-0.5 text-micro uppercase tracking-wider text-eyebrow", children: "You" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro text-muted-foreground", children: a.userId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", disabled: busy || a.userId === currentUserId, onClick: () => onRevoke(a), children: "Revoke" })
        ] }, a.userId))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold uppercase tracking-wider text-foreground", children: [
          "Workspace roles (",
          wsRows.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Fine-grained access for /admin/results and other staff pages." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onGrantWs, className: "flex flex-col gap-3 rounded-2xl border border-border bg-muted/60 p-5 sm:flex-row sm:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs uppercase tracking-wider text-foreground", children: "User email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", required: true, placeholder: "user@example.com", value: wsEmail, onChange: (e) => setWsEmail(e.target.value), disabled: wsBusy })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:w-48", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs uppercase tracking-wider text-foreground", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: wsRole, onChange: (e) => setWsRole(e.target.value), className: "h-10 w-full rounded-md border border-border bg-muted px-3 text-sm text-foreground", disabled: wsBusy, children: Object.keys(ROLE_DESCRIPTIONS).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: wsBusy, children: wsBusy ? "Working…" : "Grant role" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-micro text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: wsRole }),
        ": ",
        ROLE_DESCRIPTIONS[wsRole]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "divide-y divide-border rounded-xl border border-border bg-muted/60", children: [
        wsRows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "p-4 text-sm text-foreground", children: "No workspace roles assigned yet." }),
        wsRows.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center justify-between gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-sm font-medium text-foreground", children: [
              a.email ?? "(no email)",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-micro uppercase tracking-wider text-primary-glow", children: a.role })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro text-muted-foreground", children: a.userId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", disabled: wsBusy, onClick: () => onRevokeWs(a), children: "Revoke" })
        ] }, `${a.userId}-${a.role}`))
      ] })
    ] })
  ] });
}
function Centered({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-5 text-center text-sm text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children }) });
}
export {
  AdminRolesPage as component
};
