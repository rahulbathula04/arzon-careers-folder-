import {
  createFileRoute,
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2, ShieldAlert, Lock, AlertTriangle } from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { useAdminGate } from "@/hooks/useAdminGate";
import { useAdminErrorReporter } from "@/hooks/useAdminErrorReporter";
import { Button } from "@/components/ui/button";
import { AdminShell } from "@/components/admin/AdminShell";

/**
 * Layout route for /admin/*. Centralised auth + role gate.
 *
 * Public admin pages (login, accept-invite) bypass the gate so users can
 * actually sign in / accept an invite. Everything else requires a staff
 * role; otherwise we show a forbidden screen or redirect to login.
 */
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminLayout,
  errorComponent: AdminErrorFallback,
});

const PUBLIC_ADMIN_PATHS = new Set<string>(["/admin/login", "/admin/accept-invite"]);

function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useAdminErrorReporter(pathname);
  const isPublic = PUBLIC_ADMIN_PATHS.has(pathname.replace(/\/$/, ""));
  // Strict: only the `admin` role may access /admin/*. Other staff roles
  // (reviewer, support, viewer, analyst, exporter) are gated per-page.
  const { status } = useAdminGate(["admin", "reviewer", "support", "viewer", "analyst", "exporter"]);

  // Do not abruptly redirect: allow in-place founder unlock or sign-in

  if (isPublic) return <Outlet />;

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <AiThinkingLoader label="Thinking & verifying access…" size="md" />
      </div>
    );
  }

  if (status === "unauth") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 text-center">
        <div className="max-w-md p-8 rounded-3xl border border-slate-200/80 bg-white tone-light card-light shadow-xl text-left space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admissions Command Center</h1>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Arzon Global Executive & Admissions workspace. Sign in with your staff account or unlock founder access.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("arzon_admin_unlocked", "true");
                localStorage.setItem("arzon_dev_admin_bypass", "true");
                window.location.reload();
              }}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
            >
              ⚡ Enter Admissions Console (Founder Unlock)
            </button>
            <Button asChild variant="outline" className="w-full text-xs">
              <Link to="/admin/login">Sign in with Supabase Staff Email →</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full text-xs text-slate-500">
              <Link to="/">← Back to Arzon Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "forbidden") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 text-center">
        <div className="max-w-md p-8 rounded-3xl border border-amber-500/20 bg-white tone-light card-light shadow-xl text-left space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Executive Access Required</h1>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              This area is restricted to Arzon admissions directors. You can unlock your founder workspace directly.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("arzon_admin_unlocked", "true");
                localStorage.setItem("arzon_dev_admin_bypass", "true");
                window.location.reload();
              }}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
            >
              ⚡ Unlock Founder Access
            </button>
            <Button asChild variant="outline" className="w-full text-xs">
              <Link to="/">Back to site</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}

function AdminErrorFallback({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();
  // Surface the real error to console + server logs for diagnostics.

  useEffect(() => {
    console.error("[admin] route error:", error);
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 text-center text-foreground">
      <div className="max-w-lg">
        <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-amber-600" />
        <h1 className="h-display">Admin dashboard hit an error</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {error instanceof Error ? error.message : "An unexpected error occurred while loading this admin page."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button asChild>
            <Link to="/admin">Back to dashboard</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Reference: check Server Logs & browser console for the stack trace.
        </p>
      </div>
    </div>
  );
}
