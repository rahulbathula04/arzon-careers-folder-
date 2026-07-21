import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/employer/login")({
  head: () => ({
    meta: [
      { title: "Employer sign in · Arzon Careers" },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content:
          "Verified employer sign in for the Arzon hiring console. Manage roles, shortlists, and submit signed placement evidence.",
      },
    ],
  }),
  component: EmployerLoginPage,
});

const credsSchema = z.object({
  email: z.string().email("Enter a valid email").max(254),
  password: z.string().min(8, "At least 8 characters").max(72),
});

function EmployerLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/employer/console" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      const text = parsed.error.issues[0]?.message ?? "Invalid input";
      setMessage({ tone: "error", text });
      return;
    }
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/employer/console" });
      } else {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/employer/console` },
        });
        if (error) throw error;
        setMessage({
          tone: "success",
          text: "Account created. An Arzon admin will verify your employer profile before you can post roles or view shortlists.",
        });
      }
    } catch (err) {
      const text = err instanceof Error ? err.message : "Something went wrong";
      setMessage({ tone: "error", text });
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setGoogleBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/employer/console` },
      });
      if (error) throw error;
    } catch (err) {
      const text = err instanceof Error ? err.message : "Google sign-in failed";
      setMessage({ tone: "error", text });
      setGoogleBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <h1 className="h-display text-foreground">Employer sign in</h1>
      <p className="mt-2 text-sm text-foreground">
        Access reserved for verified employers. After sign-up an Arzon admin reviews your
        organisation before the hiring console unlocks.
      </p>

      <div className="mt-6">
        <Button
          type="button"
          onClick={onGoogle}
          disabled={googleBusy || busy}
          className="w-full"
          variant="outline"
        >
          {googleBusy ? "Redirecting…" : "Continue with Google"}
        </Button>
        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or use email
          <span className="h-px flex-1 bg-border" />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
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
            Work email
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
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1"
          />
        </div>
        <Button type="submit" disabled={busy || googleBusy} className="w-full">
          {busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
        </Button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-center text-sm text-foreground underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "New employer? Create an account →" : "← Back to sign in"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-foreground">
        <Link to="/" className="underline-offset-4 hover:underline">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
