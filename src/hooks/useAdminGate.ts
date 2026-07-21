import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminRole = "admin" | "reviewer" | "support" | "viewer" | "analyst" | "exporter";
export type AdminGateStatus = "loading" | "unauth" | "forbidden" | "ready";

export interface AdminGateState {
  status: AdminGateStatus;
  userId: string | null;
  /** Manually re-run the role check (e.g. after granting a role in the UI). */
  recheck: () => void;
}

/**
 * Auth + role gate for /admin/* pages.
 *
 * Re-verifies on:
 *  - mount
 *  - Supabase auth events (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED)
 *  - tab focus / visibility change (catches "role granted in another tab")
 *  - manual recheck()
 *
 * Uses the SECURITY DEFINER `has_role` RPC so it never returns a false
 * negative because of RLS edge cases on `user_roles`.
 */
export function useAdminGate(allowed: AdminRole[] = ["admin"]): AdminGateState {
  const [status, setStatus] = useState<AdminGateStatus>("loading");
  const [userId, setUserId] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const recheck = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (cancelled) return;
      if (userErr || !userData.user) {
        setUserId(null);
        setStatus("unauth");
        return;
      }
      const uid = userData.user.id;
      setUserId(uid);

      // Try has_role RPC for each allowed role (SECURITY DEFINER, bypasses RLS).
      for (const role of allowed) {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: uid,
          _role: role,
        });
        if (cancelled) return;
        if (!error && data === true) {
          setStatus("ready");
          return;
        }
      }

      // Fallback to direct user_roles read (works under "view own roles" RLS).
      const { data: rows } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      if (cancelled) return;
      const ok = (rows ?? []).some((r) => (allowed as string[]).includes(r.role as string));
      setStatus(ok ? "ready" : "forbidden");
    }

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUserId(null);
        setStatus("unauth");
        return;
      }
      // Re-verify role on sign-in, token refresh, or user update.
      setStatus("loading");
      check();
    });

    const onFocus = () => {
      if (document.visibilityState === "visible") check();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, allowed.join("|")]);

  return { status, userId, recheck };
}
