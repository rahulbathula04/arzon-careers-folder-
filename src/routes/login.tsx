import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Building2, Shield, ArrowRight, Lock, Mail, Key } from "lucide-react";
import { pageSeo } from "@/lib/seo";

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

function LoginPage() {
  const [tab, setTab] = useState<PortalTab>("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF8F5] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
            AUTHENTICATED ACCESS
          </p>
          <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
            Sign in to Arzon Global
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Select your portal to access your personalized workspace
          </p>
        </div>

        {/* Portal Switcher Tabs */}
        <div className="flex rounded-xl bg-stone-200/70 p-1 text-xs font-medium text-stone-700">
          <button
            type="button"
            onClick={() => setTab("learner")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
              tab === "learner"
                ? "bg-white text-stone-900 font-bold shadow-xs"
                : "hover:text-stone-900"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Learner</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("employer")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
              tab === "employer"
                ? "bg-white text-stone-900 font-bold shadow-xs"
                : "hover:text-stone-900"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Employer</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("admin")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
              tab === "admin"
                ? "bg-white text-stone-900 font-bold shadow-xs"
                : "hover:text-stone-900"
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white tone-light rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {tab === "learner" && (
            <div className="space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h2 className="text-sm font-bold text-stone-900">Student &amp; Candidate Workspace</h2>
                <p className="text-xs text-stone-500">
                  Access your course materials, ACRI scores, and case files.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Direct learner to workspace / learn
                  window.location.href = "/learn";
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@university.edu"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#1B3F8B]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-stone-700">Password</label>
                    <a href="#" className="text-xs text-[#1B3F8B] hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#1B3F8B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Sign In to Workspace</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>

              <div className="pt-3 border-t border-stone-100 text-center text-xs text-stone-600">
                <span>Not registered yet? </span>
                <Link to="/career-engine/test" className="text-[#1B3F8B] font-semibold hover:underline">
                  Take ACRI Assessment →
                </Link>
              </div>
            </div>
          )}

          {tab === "employer" && (
            <div className="space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h2 className="text-sm font-bold text-stone-900">Employer &amp; Recruiter Console</h2>
                <p className="text-xs text-stone-500">
                  Access verified candidate pipelines and benchmark reports.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2">
                <p className="font-semibold text-stone-900">Enterprise Talent Network</p>
                <p className="leading-relaxed">
                  Partner recruiters can log in through the enterprise console or contact our corporate partnerships desk for custom cohort batch verification.
                </p>
              </div>

              <Link
                to="/employer/login"
                className="w-full py-2.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span>Continue to Employer Console</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <div className="text-center text-xs text-stone-600">
                <span>Need hiring access? </span>
                <Link to="/recruiters" className="text-[#1B3F8B] font-semibold hover:underline">
                  Request Employer Partnership
                </Link>
              </div>
            </div>
          )}

          {tab === "admin" && (
            <div className="space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h2 className="text-sm font-bold text-stone-900">Platform Administration</h2>
                <p className="text-xs text-stone-500">
                  Administrative console for admissions, content, and scoring.
                </p>
              </div>

              <Link
                to="/admin/login"
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-slate-50 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Go to Admin Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
