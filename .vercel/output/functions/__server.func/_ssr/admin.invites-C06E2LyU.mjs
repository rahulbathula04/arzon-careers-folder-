import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { c as createAdminInvite, l as listAdminInvites, r as revokeAdminInvite } from "./admin-invites.functions-QpKBOBby.mjs";
import { r as recordAdminExport, e as exportCsvAudited, d as dateStampedFilename } from "./admin-export.functions-BoaqXv52.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { ak as Download } from "../_libs/lucide-react.mjs";
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
function AdminInvitesPage() {
  const {
    status
  } = useAdminGate(["admin"]);
  const [invites, setInvites] = reactExports.useState([]);
  const [email, setEmail] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("reviewer");
  const [creating, setCreating] = reactExports.useState(false);
  const create = useServerFn(createAdminInvite);
  const list = useServerFn(listAdminInvites);
  const revoke = useServerFn(revokeAdminInvite);
  const recordExport = useServerFn(recordAdminExport);
  reactExports.useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await list();
        if (!cancelled) setInvites(res.invites);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load invites");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, list]);
  async function onCreate(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await create({
        data: {
          email,
          role
        }
      });
      setInvites((prev) => [res.invite, ...prev]);
      setEmail("");
      toast.success(`Invite created for ${res.invite.email}`);
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Could not create invite");
    } finally {
      setCreating(false);
    }
  }
  async function onRevoke(id) {
    if (!confirm("Revoke this invite?")) return;
    try {
      await revoke({
        data: {
          id
        }
      });
      setInvites((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not revoke");
    }
  }
  function inviteUrl(token) {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/admin/accept-invite?token=${token}`;
  }
  if (status !== "ready") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin · Workspace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2", children: "Staff invites" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: "Create one-time signup links. Expires in 14 days." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "secondary", size: "sm", disabled: invites.length === 0, onClick: () => {
        const columns = [{
          key: "email",
          header: "Email"
        }, {
          key: "role",
          header: "Role"
        }, {
          key: "created_at",
          header: "Created"
        }, {
          key: "expires_at",
          header: "Expires"
        }, {
          key: "used_at",
          header: "Used"
        }, {
          key: "id",
          header: "ID"
        }];
        exportCsvAudited(recordExport, "admin_invites", dateStampedFilename("admin-invites"), invites, columns).catch((e) => toast.error(e instanceof Error ? e.message : "Export blocked"));
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1.5 h-3.5 w-3.5" }),
        " Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onCreate, className: "flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-muted/60 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[220px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase text-foreground", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1 w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground", placeholder: "teammate@arzonglobal.com" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase text-foreground", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: role, onChange: (e) => setRole(e.target.value), className: "mt-1 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "reviewer", children: "Reviewer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "support", children: "Support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: creating, children: creating ? "Creating…" : "Create invite" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      invites.map((inv) => {
        const used = !!inv.used_at;
        const url = inviteUrl(inv.token);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: inv.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground", children: [
                inv.role,
                " ·",
                " ",
                used ? `used ${new Date(inv.used_at).toLocaleString()}` : `expires ${new Date(inv.expires_at).toLocaleDateString()}`
              ] })
            ] }),
            !used && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onRevoke(inv.id), className: "text-xs text-rose-300 hover:text-rose-200 underline", children: "Revoke" })
          ] }),
          !used && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { readOnly: true, value: url, className: "flex-1 rounded-md border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2 py-1.5 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "secondary", onClick: () => {
              navigator.clipboard.writeText(url);
              toast.success("Link copied");
            }, children: "Copy" })
          ] })
        ] }, inv.id);
      }),
      invites.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground", children: "No invites yet. Create one above." })
    ] })
  ] });
}
export {
  AdminInvitesPage as component
};
