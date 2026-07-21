import { Link } from "@tanstack/react-router";
import { ShieldCheck, UserCircle2, LogIn } from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";

/**
 * Compact header indicator for the current auth state.
 *
 *  - Signed-out → "Admin" link (goes to /admin/login)
 *  - Signed-in, no staff role → muted "Signed in" pill
 *  - Signed-in admin/reviewer/support → green "Admin" pill linking to /admin
 *
 * Renders nothing while the gate is still resolving to avoid flicker.
 */
export function AuthBadge({
  className = "",
  variant = "compact",
}: {
  className?: string;
  variant?: "compact" | "row";
}) {
  const { status } = useAdminGate(["admin", "reviewer", "support"]);

  if (status === "loading") return null;

  if (variant === "row") {
    if (status === "ready") {
      return (
        <Link
          to="/admin"
          preload="intent"
          aria-label="Open admin dashboard"
          className={`flex items-center justify-between rounded-lg px-3 py-3 text-body-sm font-semibold text-sky-700 hover:bg-sky-500/10 ${className}`}
        >
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Admin dashboard
          </span>
          <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-micro font-bold uppercase tracking-wider text-sky-700">
            Staff
          </span>
        </Link>
      );
    }
    if (status === "forbidden") {
      return (
        <div
          aria-label="Signed in, no staff access"
          className={`flex items-center gap-2 rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft ${className}`}
        >
          <UserCircle2 className="h-4 w-4" /> Signed in
        </div>
      );
    }
    return (
      <Link
        to="/admin/login"
        preload="intent"
        aria-label="Admin sign in"
        className={`flex items-center gap-2 rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft hover:bg-ink/5 ${className}`}
      >
        <LogIn className="h-4 w-4" /> Admin sign in
      </Link>
    );
  }

  if (status === "ready") {
    return (
      <Link
        to="/admin"
        preload="intent"
        aria-label="Open admin dashboard"
        className={`inline-flex h-8 items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 text-xs font-semibold text-sky-700 hover:bg-sky-500/15 ${className}`}
      >
        <ShieldCheck className="h-3.5 w-3.5" /> Admin
      </Link>
    );
  }

  if (status === "forbidden") {
    return (
      <span
        aria-label="Signed in, no staff access"
        className={`inline-flex h-8 items-center gap-1.5 rounded-full border border-ink/15 bg-ink/[0.04] px-2.5 text-xs font-medium text-ink-soft ${className}`}
      >
        <UserCircle2 className="h-3.5 w-3.5" /> Signed in
      </span>
    );
  }

  // unauth
  return (
    <Link
      to="/admin/login"
      preload="intent"
      aria-label="Admin sign in"
      className={`inline-flex h-8 items-center gap-1.5 rounded-full border border-ink/15 px-2.5 text-xs font-medium text-ink-soft hover:bg-ink/5 ${className}`}
    >
      <LogIn className="h-3.5 w-3.5" /> Admin
    </Link>
  );
}
