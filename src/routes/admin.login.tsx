import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { ArzonLogo } from "@/components/acri/ArzonLogo";
import { getAdminRuntimeStatus } from "@/lib/adminRuntime.functions";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin sign in · Arzon Global" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

const credsSchema = z.object({
  email: z.string().email("Enter a valid email").max(254),
  password: z.string().min(8, "At least 8 characters").max(72),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [runtime, setRuntime] = useState<{
    browserReady: boolean;
    serverReady: boolean;
    browserUrlReady: boolean;
    browserKeyReady: boolean;
    serverUrlReady: boolean;
    serverSecretReady: boolean;
  } | null>(null);
  const getRuntimeStatus = useServerFn(getAdminRuntimeStatus);

  // Check local runtime configuration without exposing any secret values.
  useEffect(() => {
    getRuntimeStatus()
      .then(setRuntime)
      .catch(() => setRuntime(null));
  }, [getRuntimeStatus]);

  // If already signed in, hop to the admin page (which will gate by role).
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      const text = parsed.error.issues[0]?.message ?? "Invalid input";
      setMessage({ tone: "error", text });
      toast.error(text);
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (error) throw error;
      toast.success("Signed in");
      navigate({ to: "/admin" });
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : "Something went wrong";
      const text =
        /invalid login credentials/i.test(rawMsg)
          ? "Invalid email or password. Use Forgot password to set a new password."
          : /failed to fetch|network|fetch/i.test(rawMsg)
            ? "Cannot reach the server. Check your internet connection and try again."
            : rawMsg;
      setMessage({ tone: "error", text });
      toast.error(text);
    } finally {
      setBusy(false);
    }
  }

  async function onForgotPassword() {
    setMessage(null);
    const parsed = z.string().email().safeParse(email.trim());
    if (!parsed.success) {
      const text = "Enter your email above first, then click Forgot password";
      setMessage({ tone: "error", text });
      toast.error(text);
      return;
    }
    setResetBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetEmailSent(true);
      const text =
        "Password reset email sent! Check your inbox and click the link to set a new password.";
      setMessage({ tone: "success", text });
      toast.success(text);
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : "Something went wrong";
      const text = /failed to fetch|network|fetch/i.test(rawMsg)
        ? "Cannot reach the server. Check your internet connection and try again."
        : rawMsg;
      setMessage({ tone: "error", text });
      toast.error(text);
    } finally {
      setResetBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <Link to="/" className="inline-block mb-6">
        <ArzonLogo variant="light" size="md" />
      </Link>
      <h1 className="h-display text-foreground">Admin sign in</h1>
      <p className="mt-2 text-sm text-foreground">
        Staff access only. Accounts are created by invite - use the invite link you received.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {message && (
          <div
            role="status"
            className={
              message.tone === "error"
                ? "rounded-md border border-destructive/35 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                : "rounded-md border border-primary/35 bg-primary/10 px-3 py-2 text-sm text-primary-foreground"
            }
          >
            {message.text}
          </div>
        )}
        <div>
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1"
          />
        </div>
        <Button type="submit" disabled={busy} className="w-full">
          {busy ? "Working…" : "Sign in"}
        </Button>
        {resetEmailSent ? (
          <p className="w-full text-center text-sm text-green-600">
            ✓ Email sent — check your inbox
          </p>
        ) : (
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={resetBusy}
            className="w-full text-center text-sm text-foreground underline-offset-4 hover:underline disabled:opacity-60"
          >
            {resetBusy ? "Sending…" : "Forgot password?"}
          </button>
        )}

        {runtime && (!runtime.browserReady || !runtime.serverReady) && (
          <div
            role="alert"
            className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-950"
          >
            <p className="font-bold">Local Supabase setup is incomplete.</p>
            <p className="mt-1 leading-5">
              The old localhost bypass has been removed because it only changed the browser UI
              and could not authenticate protected server functions.
            </p>
            <ul className="mt-2 space-y-1 font-mono text-[11px]">
              <li>{runtime.browserUrlReady ? "✓" : "•"} VITE_SUPABASE_URL</li>
              <li>{runtime.browserKeyReady ? "✓" : "•"} VITE_SUPABASE_PUBLISHABLE_KEY</li>
              <li>{runtime.serverUrlReady ? "✓" : "•"} SUPABASE_URL</li>
              <li>{runtime.serverSecretReady ? "✓" : "•"} SUPABASE_SECRET_KEY</li>
            </ul>
            <p className="mt-2 leading-5">
              Put these values in your local <code className="font-mono">.env</code>, restart Vite,
              then sign in with a real Supabase staff account.
            </p>
          </div>
        )}
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-foreground">
        <Link
          to="/admin/accept-invite"
          search={{ token: "" }}
          className="underline-offset-4 hover:underline"
        >
          Have an invite? Accept it →
        </Link>
        <Link to="/" className="underline-offset-4 hover:underline">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
