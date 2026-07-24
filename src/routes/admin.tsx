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
  const { status } = useAdminGate(["admin"]);

  useEffect(() => {
    if (!isPublic && status === "unauth") {
      navigate({ to: "/admin/login" });
    }
  }, [isPublic, status, navigate]);

  if (isPublic) return <Outlet />;

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 motion-safe:animate-spin" /> Verifying access…
      </div>
    );
  }

  if (status === "unauth") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 text-center">
        <div className="max-w-md">
          <Lock className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <h1 className="h-display text-foreground">Sign in required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Redirecting you to the admin sign-in page…
          </p>
          <Button asChild className="mt-5">
            <Link to="/admin/login">Go to sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (status === "forbidden") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 text-center">
        <div className="max-w-lg">
          <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-amber-600" />
          <h1 className="h-display text-foreground">Access denied</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account doesn't have a staff role assigned, so you can't view this area. If you
            believe this is a mistake, ask an admin to grant you access on the Staff roles page.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild variant="outline">
              <Link to="/">Back to site</Link>
            </Button>
            <Button asChild>
              <Link to="/admin/login">Switch account</Link>
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

function AdminErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
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
          {error?.message || "An unexpected error occurred while loading this admin page."}
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
