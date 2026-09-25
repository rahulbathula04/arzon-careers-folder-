import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  GraduationCap,
  Building2,
  Shield,
  ArrowRight,
  Lock,
  Mail,
  Key,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  head: () => {
    const seo = pageSeo({
      path: "/login",
      title: "Sign In · Arzon Global Portals",
      description:
        "Access your Arzon Global account. Select your workspace: Student & Candidate Workspace, Employer Talent Console, or Administrator Platform.",
    });
    return {
      meta: [{ title: "Sign In · Arzon Global Portals" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: LoginPage,
});

type PortalTab = "learner" | "employer" | "admin";

const credsSchema = z.object({
  email: z.string().email("Enter a valid email address").max(254),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<PortalTab>("learner");

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsed = credsSchema.safeParse({ email: email.trim(), password });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid input";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });

      if (error) throw error;

      toast.success("Signed in successfully!");
      if (tab === "admin") {
        navigate({ to: "/admin" });
      } else if (tab === "employer") {
        navigate({ to: "/employer/console" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      const raw = err?.message || "Invalid credentials. Please verify your details.";
      const cleanMsg = /invalid login credentials/i.test(raw)
        ? "Invalid email or password. Please verify and try again."
        : /email not confirmed/i.test(raw)
          ? "Please verify your email address before logging in."
          : raw;
      setErrorMsg(cleanMsg);
      toast.error(cleanMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error("Enter your email address first, then click Forgot password.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setForgotSent(true);
      toast.success("Password reset instructions sent to your email.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google") => {
    try {
      const redirectPath = tab === "employer" ? "/employer/console" : "/dashboard";
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}${redirectPath}`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err?.message || "OAuth sign-in failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF8F5] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Brand & Security Proof */}
        <div className="lg:col-span-5 space-y-6 hidden lg:block">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-[#005B4F]" />
            <span>AUTHENTICATED ACCESS</span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-[#0B1325] leading-tight">
            Healthcare Career Intelligence Workspace
          </h2>

          <p className="text-sm text-stone-600 leading-relaxed">
            One single sign-in to access your role diagnostics, verified ACRI scorecards, curriculum modules, and enterprise candidate profiles.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white card-light border border-stone-200/80 shadow-2xs">
              <div className="h-8 w-8 rounded-lg bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Verifiable Credentials</h4>
                <p className="text-[11px] text-stone-500">Tamper-evident ACRI competency scores with cryptographic SHA-256 verification.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white card-light border border-stone-200/80 shadow-2xs">
              <div className="h-8 w-8 rounded-lg bg-sky-50 text-[#1B3F8B] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">14+ Employer Network</h4>
                <p className="text-[11px] text-stone-500">Direct hiring partner shortlists across Novartis, IQVIA, Parexel, and Dr. Reddy's.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Portal Authentication Card */}
        <div className="lg:col-span-7">
          <div className="bg-white tone-light card-light rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header */}
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F] mb-1">
                PORTAL LOGIN
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
                Sign in to your account
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Select your role to access your dedicated dashboard.
              </p>
            </div>

            {/* Portal Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-stone-100 p-1 text-xs font-medium text-stone-700">
              <button
                type="button"
                onClick={() => {
                  setTab("learner");
                  setErrorMsg(null);
                }}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all cursor-pointer ${
                  tab === "learner"
                    ? "bg-white tone-light text-stone-900 font-bold shadow-xs border border-stone-200/60"
                    : "hover:text-stone-900"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Learner</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("employer");
                  setErrorMsg(null);
                }}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all cursor-pointer ${
                  tab === "employer"
                    ? "bg-white tone-light text-stone-900 font-bold shadow-xs border border-stone-200/60"
                    : "hover:text-stone-900"
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>Employer</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("admin");
                  setErrorMsg(null);
                }}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all cursor-pointer ${
                  tab === "admin"
                    ? "bg-white tone-light text-stone-900 font-bold shadow-xs border border-stone-200/60"
                    : "hover:text-stone-900"
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Sub-header per Tab */}
            <div className="border-b border-stone-100 pb-3">
              {tab === "learner" && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Candidate &amp; Learner Workspace
                  </h3>
                  <p className="text-xs text-stone-500">
                    Access your ACRI test results, personalized roadmaps, and case study files.
                  </p>
                </div>
              )}
              {tab === "employer" && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Enterprise Recruiter Console
                  </h3>
                  <p className="text-xs text-stone-500">
                    Access pre-assessed talent pipelines, score validation, and candidate dossiers.
                  </p>
                </div>
              )}
              {tab === "admin" && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Platform Administration
                  </h3>
                  <p className="text-xs text-stone-500">
                    Administrative credentials for content moderation, scoring audit, and cohort admissions.
                  </p>
                </div>
              )}
            </div>

            {/* Error / Alert Display */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {forgotSent && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>Password reset link sent! Check your inbox to set a new password.</span>
              </div>
            )}

            {/* Direct Unified Sign In Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {tab === "learner"
                    ? "Email address"
                    : tab === "employer"
                      ? "Work email address"
                      : "Administrator email"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      tab === "learner"
                        ? "student@university.edu"
                        : tab === "employer"
                          ? "recruiter@pharma.com"
                          : "admin@arzonglobal.com"
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white tone-light text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-700">Password</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-[#005B4F] font-medium hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white tone-light text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0B1325] hover:bg-[#1B3F8B] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 motion-safe:animate-spin text-emerald-300" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {tab === "learner"
                        ? "Sign In to Workspace"
                        : tab === "employer"
                          ? "Access Employer Console"
                          : "Sign In as Administrator"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
                  </>
                )}
              </button>
            </form>

            {/* Social / Alternative Access */}
            {tab !== "admin" && (
              <>
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-stone-200 w-full" />
                  <span className="bg-white tone-light px-3 text-[11px] uppercase tracking-wider text-stone-500 font-mono">
                    or
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOAuth("google")}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </>
            )}

            {/* Bottom Context Footnote */}
            <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
              {tab === "learner" && (
                <>
                  <span>Haven't taken the assessment?</span>
                  <Link
                    to="/career-engine/test"
                    className="font-semibold text-[#005B4F] hover:underline"
                  >
                    Take Free ACRI Assessment →
                  </Link>
                </>
              )}
              {tab === "employer" && (
                <>
                  <span>Looking to hire verified talent?</span>
                  <Link
                    to="/recruiters"
                    className="font-semibold text-[#005B4F] hover:underline"
                  >
                    Request Partner Access →
                  </Link>
                </>
              )}
              {tab === "admin" && (
                <div className="w-full text-center text-[11px] text-stone-500">
                  <span>Protected system. Unauthorized access attempts are monitored and logged.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
