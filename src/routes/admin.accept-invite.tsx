import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lookupAdminInvite } from "@/lib/admin-invites.functions";

export const Route = createFileRoute("/admin/accept-invite")({
  validateSearch: z.object({ token: z.string().min(8).max(128) }),
  head: () => ({
    meta: [{ title: "Accept invite · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AcceptInvitePage,
  errorComponent: () => (
    <div className="mx-auto max-w-md p-8">
      <h2 className="text-h4 font-semibold text-foreground">Invite link is not valid</h2>
      <p className="mt-2 text-sm text-rose-300">
        This invite link is missing or malformed. Please ask an admin for a new link.
      </p>
    </div>
  ),
});

function AcceptInvitePage() {
  const { token } = useSearch({ from: "/admin/accept-invite" });
  const navigate = useNavigate();
  const lookup = useServerFn(lookupAdminInvite);

  const [invite, setInvite] = useState<{
    email: string;
    role: string;
    used: boolean;
    expires_at: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    let cancelled = false;
    lookup({ data: { token } })
      .then((r) => {
        if (!cancelled) setInvite(r.invite);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Invalid invite");
      })
      .finally(() => {
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
      // Sign up (or sign in if account already exists)
      const { error: signupError } = await supabase.auth.signUp({
        email: invite.email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/accept-invite?token=${token}`,
        },
      });
      // If "User already registered", try sign-in.
      if (signupError && /registered|already/i.test(signupError.message)) {
        const { error: siErr } = await supabase.auth.signInWithPassword({
          email: invite.email,
          password,
        });
        if (siErr) throw siErr;
      } else if (signupError) {
        throw signupError;
      }

      // Consume invite (server-side checks email matches)
      const { error: rpcErr } = await supabase.rpc("accept_admin_invite", { p_token: token });
      if (rpcErr) throw rpcErr;

      toast.success(`Welcome! You now have ${invite.role} access.`);
      navigate({ to: "/admin/applications" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not accept invite");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="p-8 text-sm text-foreground">Loading invite…</div>;
  if (error || !invite) {
    return (
      <div className="mx-auto max-w-md p-8">
        <h2 className="text-h4 font-semibold text-foreground">Invite link is not valid</h2>
        <p className="mt-2 text-sm text-rose-300">{error ?? "Unknown error"}</p>
      </div>
    );
  }
  if (invite.used) {
    return (
      <div className="mx-auto max-w-md p-8">
        <h2 className="text-h4 font-semibold text-foreground">This invite has already been used</h2>
        <p className="mt-2 text-sm text-foreground">Please ask an admin for a new invite link.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <p className="font-mono text-micro uppercase tracking-widest text-primary-glow">
        Admin signup
      </p>
      <h1 className="mt-2 text-h3 font-semibold text-foreground">Welcome to Arzon Admin</h1>
      <p className="mt-2 text-sm text-foreground">
        You’re being invited as <span className="font-semibold text-foreground">{invite.role}</span>
        . Pick a password to finish signup.
      </p>

      <div className="mt-6 space-y-3">
        <div>
          <label className="block text-xs uppercase text-foreground">Email</label>
          <input
            value={invite.email}
            readOnly
            className="mt-1 w-full rounded-lg border border-border bg-black/30 px-3 py-2 text-sm text-foreground"
          />
        </div>
        <div>
          <label className="block text-xs uppercase text-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            className="mt-1 w-full rounded-lg border border-border bg-black/30 px-3 py-2 text-sm text-foreground"
            placeholder="At least 8 characters"
          />
        </div>
        {error && <p className="text-xs text-rose-300">{error}</p>}
        <Button onClick={accept} disabled={busy || password.length < 8} className="w-full">
          {busy ? "Setting up…" : "Accept invite & continue"}
        </Button>
      </div>
    </div>
  );
}
