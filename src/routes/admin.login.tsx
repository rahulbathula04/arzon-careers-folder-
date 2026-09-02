import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

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
