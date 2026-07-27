import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { i as useSearch, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { B as Button } from "./router-CvdLERTV.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { a as lookupAdminInvite } from "./admin-invites.functions-QpKBOBby.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
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
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
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
import "../_libs/lucide-react.mjs";
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
function AcceptInvitePage() {
  const {
    token
  } = useSearch({
    from: "/admin/accept-invite"
  });
  const navigate = useNavigate();
  const lookup = useServerFn(lookupAdminInvite);
  const [invite, setInvite] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [busy, setBusy] = reactExports.useState(false);
  const [password, setPassword] = reactExports.useState("");
  reactExports.useEffect(() => {
    let cancelled = false;
    lookup({
      data: {
        token
      }
    }).then((r) => {
      if (!cancelled) setInvite(r.invite);
    }).catch((e) => {
      if (!cancelled) setError(e instanceof Error ? e.message : "Invalid invite");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [token, lookup]);
  async function accept() {
    if (!invite) return;
    setBusy(true);
    setError(null);
    try {
      const {
        error: signupError
      } = await supabase.auth.signUp({
        email: invite.email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/accept-invite?token=${token}`
        }
      });
      if (signupError && /registered|already/i.test(signupError.message)) {
        const {
          error: siErr
        } = await supabase.auth.signInWithPassword({
          email: invite.email,
          password
        });
        if (siErr) throw siErr;
      } else if (signupError) {
        throw signupError;
      }
      const {
        error: rpcErr
      } = await supabase.rpc("accept_admin_invite", {
        p_token: token
      });
      if (rpcErr) throw rpcErr;
      toast.success(`Welcome! You now have ${invite.role} access.`);
      navigate({
        to: "/admin/applications"
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not accept invite");
    } finally {
      setBusy(false);
    }
  }
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-sm text-foreground", children: "Loading invite…" });
  if (error || !invite) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h4 font-semibold text-foreground", children: "Invite link is not valid" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-rose-300", children: error ?? "Unknown error" })
    ] });
  }
  if (invite.used) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h4 font-semibold text-foreground", children: "This invite has already been used" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground", children: "Please ask an admin for a new invite link." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-widest text-primary-glow", children: "Admin signup" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-h3 font-semibold text-foreground", children: "Welcome to Arzon Admin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-foreground", children: [
      "You’re being invited as ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: invite.role }),
      ". Pick a password to finish signup."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase text-foreground", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: invite.email, readOnly: true, className: "mt-1 w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase text-foreground", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), minLength: 8, required: true, className: "mt-1 w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground", placeholder: "At least 8 characters" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-300", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: accept, disabled: busy || password.length < 8, className: "w-full", children: busy ? "Setting up…" : "Accept invite & continue" })
    ] })
  ] });
}
export {
  AcceptInvitePage as component
};
