import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useLocation, d as useNavigate, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { A as AdminShell } from "./AdminShell-CMiuQFn3.mjs";
import "../_libs/sonner.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import { a4 as LoaderCircle, a7 as Lock, aF as ShieldAlert } from "../_libs/lucide-react.mjs";
import { p as objectType, q as stringType, v as enumType } from "../_libs/zod.mjs";
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
import "../_libs/cmdk.mjs";
import "./dialog-DQUu35ki.mjs";
const Schema = objectType({
  kind: enumType(["hydration", "runtime", "unhandledrejection"]),
  message: stringType().max(2e3),
  stack: stringType().max(8e3).optional(),
  url: stringType().max(500).optional(),
  route: stringType().max(200).optional(),
  ua: stringType().max(500).optional()
});
const logClientError = createServerFn({
  method: "POST"
}).inputValidator((d) => Schema.parse(d ?? {})).handler(createSsrRpc("04cc1b132b23e18a7c392ab0a565455cfd32a5613307d8cd84ed61f891b23194"));
function useAdminErrorReporter(route) {
  reactExports.useEffect(() => {
    const send = (kind, message, stack) => {
      try {
        void logClientError({
          data: {
            kind,
            message: message.slice(0, 2e3),
            stack: stack?.slice(0, 8e3),
            url: typeof location !== "undefined" ? location.href : void 0,
            route,
            ua: typeof navigator !== "undefined" ? navigator.userAgent : void 0
          }
        });
        console.error(`[admin][${kind}]`, message, stack);
      } catch {
      }
    };
    const onError = (e) => {
      const msg = e.message || String(e.error?.message || e.error || "error");
      const isHydration = /Minified React error #(418|423|425)|hydrat/i.test(msg);
      send(isHydration ? "hydration" : "runtime", msg, e.error?.stack);
    };
    const onRejection = (e) => {
      const r = e.reason;
      send("unhandledrejection", String(r?.message || r || "unhandled rejection"), r?.stack);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [route]);
}
const PUBLIC_ADMIN_PATHS = /* @__PURE__ */ new Set(["/admin/login", "/admin/accept-invite"]);
function AdminLayout() {
  const {
    pathname
  } = useLocation();
  const navigate = useNavigate();
  useAdminErrorReporter(pathname);
  const isPublic = PUBLIC_ADMIN_PATHS.has(pathname.replace(/\/$/, ""));
  const {
    status
  } = useAdminGate(["admin"]);
  reactExports.useEffect(() => {
    if (!isPublic && status === "unauth") {
      navigate({
        to: "/admin/login"
      });
    }
  }, [isPublic, status, navigate]);
  if (isPublic) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen items-center justify-center bg-background text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 motion-safe:animate-spin" }),
      " Verifying access…"
    ] });
  }
  if (status === "unauth") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mx-auto mb-3 h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display text-foreground", children: "Sign in required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Redirecting you to the admin sign-in page…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", children: "Go to sign in" }) })
    ] }) });
  }
  if (status === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mx-auto mb-3 h-10 w-10 text-amber-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display text-foreground", children: "Access denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Your account doesn't have a staff role assigned, so you can't view this area. If you believe this is a mistake, ask an admin to grant you access on the Staff roles page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Back to site" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", children: "Switch account" }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
export {
  AdminLayout as component
};
