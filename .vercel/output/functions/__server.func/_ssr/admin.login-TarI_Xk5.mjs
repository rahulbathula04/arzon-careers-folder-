import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { L as Label } from "./label-CCvxiayl.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { q as stringType, p as objectType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
const credsSchema = objectType({
  email: stringType().email("Enter a valid email").max(254),
  password: stringType().min(8, "At least 8 characters").max(72)
});
function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [resetBusy, setResetBusy] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) navigate({
        to: "/admin"
      });
    });
  }, [navigate]);
  async function onSubmit(e) {
    e.preventDefault();
    setMessage(null);
    const parsed = credsSchema.safeParse({
      email,
      password
    });
    if (!parsed.success) {
      const text = parsed.error.issues[0]?.message ?? "Invalid input";
      setMessage({
        tone: "error",
        text
      });
      toast.error(text);
      return;
    }
    setBusy(true);
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password
      });
      if (error) throw error;
      toast.success("Signed in");
      navigate({
        to: "/admin"
      });
    } catch (err) {
      const text = err instanceof Error && /invalid login credentials/i.test(err.message) ? "Invalid email or password. Use Forgot password to set a new password." : err instanceof Error ? err.message : "Something went wrong";
      setMessage({
        tone: "error",
        text
      });
      toast.error(text);
    } finally {
      setBusy(false);
    }
  }
  async function onForgotPassword() {
    setMessage(null);
    const parsed = stringType().email().safeParse(email.trim());
    if (!parsed.success) {
      const text = "Enter your email above first, then click Forgot password";
      setMessage({
        tone: "error",
        text
      });
      toast.error(text);
      return;
    }
    setResetBusy(true);
    try {
      const {
        error
      } = await supabase.auth.resetPasswordForEmail(parsed.data, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) throw error;
      const text = "Password reset email sent. Check your inbox, then open the link to choose a new password.";
      setMessage({
        tone: "success",
        text
      });
      toast.success(text);
    } catch (err) {
      const text = err instanceof Error ? err.message : "Something went wrong";
      setMessage({
        tone: "error",
        text
      });
      toast.error(text);
    } finally {
      setResetBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display text-foreground", children: "Admin sign in" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground", children: "Staff access only. Accounts are created by invite — use the invite link you received." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-8 space-y-4", children: [
      message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "status", className: message.tone === "error" ? "rounded-md border border-destructive/35 bg-destructive/10 px-3 py-2 text-sm text-destructive" : "rounded-md border border-primary/35 bg-primary/10 px-3 py-2 text-sm text-primary-foreground", children: message.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-foreground", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-foreground", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", autoComplete: "current-password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8, className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, className: "w-full", children: busy ? "Working…" : "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onForgotPassword, disabled: resetBusy, className: "w-full text-center text-sm text-foreground underline-offset-4 hover:underline disabled:opacity-60", children: resetBusy ? "Sending…" : "Forgot password?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between text-sm text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/accept-invite", search: {
        token: ""
      }, className: "underline-offset-4 hover:underline", children: "Have an invite? Accept it →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "underline-offset-4 hover:underline", children: "← Back to site" })
    ] })
  ] });
}
export {
  AdminLoginPage as component
};
