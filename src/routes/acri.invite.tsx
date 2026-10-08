import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { ShieldCheck, Clock, CheckCircle2, Copy, ArrowRight, AlertCircle, Sparkles, KeyRound } from "lucide-react";
import { logAcriFunnelEvent } from "@/lib/acri/acriCandidateStore";
import { verifyAcriInviteFn, startAcriSessionFn, checkAcriCandidateStatusFn } from "@/lib/acri-core.functions";
import { toast } from "sonner";
import { pageSeo } from "@/lib/seo";

const inviteSearchSchema = z.object({
  code: z.string().optional(),
});

export const Route = createFileRoute("/acri/invite")({
  validateSearch: (input) => inviteSearchSchema.parse(input),
  head: () => {
    const ps = pageSeo({
      path: "/acri/invite",
      title: "Your ACRI Invite · Arzon Global",
      description: "Enter your single-use ACRI invitation code to begin your Pharmacovigilance certification assessment.",
      noindex: true,
    });
    return {
      meta: [
        { title: "Your ACRI Invite · Arzon Global" },
        { name: "robots", content: "noindex,nofollow" },
        ...ps.meta,
      ],
      links: ps.links,
    };
  },
  component: AcriInvitePage,
});

function AcriInvitePage() {
  const { code: incomingCode } = Route.useSearch();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState(incomingCode || "");
  const [validatedCode, setValidatedCode] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState<string | null>(null);
  const [candidateEmail, setCandidateEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Self-service code retrieval state
  const [showLookupBox, setShowLookupBox] = useState(false);
  const [lookupQuery, setLookupQuery] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupMsg, setLookupMsg] = useState<{ type: "success" | "pending" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (incomingCode) {
      void handleValidate(incomingCode);
      return;
    }

    // Auto-check local/session storage if no code was given in URL
    if (typeof window !== "undefined") {
      const storedCode =
        sessionStorage.getItem("arzon_acri_invite_code") ||
        localStorage.getItem("arzon_acri_invite_code");
      if (storedCode) {
        setInputCode(storedCode);
        void handleValidate(storedCode);
        return;
      }

      // Check if candidate applied earlier and has stored profile
      const rawProfile =
        sessionStorage.getItem("arzon_acri_candidate_profile") ||
        localStorage.getItem("arzon_acri_candidate_profile");
      if (rawProfile) {
        try {
          const prof = JSON.parse(rawProfile);
          const email = prof.email;
          const phone = prof.mobile || prof.phone;
          if (email || phone) {
            void checkAcriCandidateStatusFn({ data: { email, phone } }).then((res) => {
              if (res.found && res.inviteCode) {
                setInputCode(res.inviteCode);
                localStorage.setItem("arzon_acri_invite_code", res.inviteCode);
                void handleValidate(res.inviteCode);
              }
            });
          }
        } catch {}
      }
    }
  }, [incomingCode]);

  const handleValidate = async (codeToTest: string) => {
    setError(null);
    const clean = codeToTest.trim().toUpperCase();
    if (!clean) {
      setError("Please enter your ACRI invitation code.");
      return;
    }
    try {
      const res = await verifyAcriInviteFn({ data: { code: clean } });
      if (!res.valid) {
        setError(res.error || "This invite code is invalid or unavailable.");
        setValidatedCode(null);
        return;
      }
      setValidatedCode(clean);
      setCandidateName(res.candidateName || "Candidate");
      setCandidateEmail("");
      if (typeof window !== "undefined") {
        localStorage.setItem("arzon_acri_invite_code", clean);
      }
      logAcriFunnelEvent("invite_verified", { code: clean }, res.candidateId, clean);
    } catch {
      setError("Invitation verification is temporarily unavailable. Please try again.");
      setValidatedCode(null);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupMsg(null);
    const query = lookupQuery.trim();
    if (!query) {
      setLookupMsg({ type: "error", text: "Please enter your mobile number or email address." });
      return;
    }
    setIsLookingUp(true);
    try {
      const isEmail = query.includes("@");
      const res = await checkAcriCandidateStatusFn({
        data: isEmail ? { email: query } : { phone: query },
      });

      if (!res.found) {
        setLookupMsg({
          type: "error",
          text: "No application on file for this contact. If you haven't applied yet, submit your application below.",
        });
      } else if (res.status === "accepted" && res.inviteCode) {
        setInputCode(res.inviteCode);
        if (typeof window !== "undefined") {
          localStorage.setItem("arzon_acri_invite_code", res.inviteCode);
        }
        setLookupMsg({
          type: "success",
          text: `Welcome back, ${res.candidateName || "Candidate"}! We found your authorized access key. Verifying now...`,
        });
        setTimeout(() => {
          void handleValidate(res.inviteCode!);
        }, 600);
      } else {
        setLookupMsg({
          type: "pending",
          text: `Hello ${res.candidateName || "Candidate"}! Your application for ${res.college || "the ACRI cohort"} is currently under review by admissions. You will receive your access key once approved.`,
        });
      }
    } catch {
      setLookupMsg({
        type: "error",
        text: "Could not retrieve status right now. Please enter your invite code directly.",
      });
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleStartCertification = async () => {
    if (!validatedCode) return;
    try {
      const res = await startAcriSessionFn({ data: { inviteCode: validatedCode } });
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "arzon_acri_candidate_profile",
          JSON.stringify({
            fullName: res.candidate.fullName,
            email: res.candidate.email,
            qualification: res.candidate.qualification,
            college: res.candidate.college,
          }),
        );
        // The server returns only the sanitized assessment payload here.
        // Keep the bearer token and selected items out of the URL so they do
        // not leak through browser history, analytics, referrers, or copied links.
        sessionStorage.setItem("arzon_acri_session_token", res.sessionToken);
        sessionStorage.setItem("arzon_acri_session_id", res.sessionId);
        sessionStorage.setItem("arzon_acri_assessment_items", JSON.stringify(res.questions ?? []));
      }
      logAcriFunnelEvent("assessment_started", { code: validatedCode }, undefined, validatedCode);
      navigate({
        to: "/acri/assessment/$sessionId",
        params: { sessionId: res.sessionId },
      });
    } catch {
      toast.error("Unable to start the assessment. Please try again.");
    }
  };

  const handleCopyCode = () => {
    if (!validatedCode) return;
    navigator.clipboard.writeText(validatedCode);
    setCopied(true);
    toast.success("Copied code to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md py-4 px-6 sm:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-[#005B4F] flex items-center justify-center text-white">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <span className="font-serif font-bold text-lg text-[#0B1325] block leading-none">
              ARZON GLOBAL
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#005B4F] font-bold">
              ACRI Terminal
            </span>
          </div>
        </Link>

        <Link
          to="/acri/pharmacovigilance-certification"
          className="text-xs font-semibold text-stone-600 hover:text-[#005B4F] transition-colors"
        >
          Certification Overview
        </Link>
      </header>

      {/* Main Center Panel */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg rounded-3xl bg-white card-light border border-[#D9DEE0] shadow-xl p-6 sm:p-8 space-y-6">
          {validatedCode ? (
            /* Invite Validated & Ready Screen */
            <div className="space-y-6 text-center animate-in fade-in duration-200">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#E8F7F1] text-[#005B4F] mx-auto shadow-xs">
                <CheckCircle2 className="h-7 w-7 text-[#005B4F]" />
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">
                  INVITATION VERIFIED
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325] mt-2.5">
                  Your ACRI Invite Is Ready
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Welcome, <strong>{candidateName}</strong>. You have been cleared to take the ACRI Pharmacovigilance Certification.
                </p>
              </div>

              {/* Code Box */}
              <div className="bg-[#FAF8F5] border-2 border-dashed border-[#005B4F]/30 rounded-2xl p-5 space-y-2">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                  AUTHORIZED INVITE CODE
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#005B4F] tracking-wider select-all">
                    {validatedCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-white card-light border border-stone-200 text-stone-600 hover:text-[#005B4F] transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                {copied && (
                  <span className="text-xs text-emerald-600 font-semibold block">
                    Copied to clipboard!
                  </span>
                )}
              </div>

              {/* Assessment Parameters Grid */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-200 text-left">
                <div className="p-2">
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">Assessment</span>
                  <span className="text-xs font-bold text-stone-900 block truncate">PV Certification</span>
                </div>
                <div className="p-2">
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">Duration</span>
                  <span className="text-xs font-bold text-stone-900 block">25 Minutes</span>
                </div>
                <div className="p-2">
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">Status</span>
                  <span className="text-xs font-bold text-emerald-700 block">Active</span>
                </div>
              </div>

              {/* Timer Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-left flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 leading-snug">
                  <strong>Important:</strong> Timer does <em>NOT</em> start here. The 25-minute clock activates strictly when you click &ldquo;Start Certification&rdquo; below.
                </p>
              </div>

              {/* Start Certification CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartCertification}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-semibold text-base tracking-wide transition-all shadow-md cursor-pointer group"
                >
                  <span>Start Certification →</span>
                  <ArrowRight className="h-4 w-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            /* Invite Entry / Validation Form */
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#E8F7F1] text-[#005B4F] mb-3">
                  <KeyRound className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-[#0B1325]">
                  Enter Your ACRI Invite Code
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Access to the official ACRI certification is invitation-only. Please enter the code sent to your email.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleValidate(inputCode);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Invite Code
                  </label>
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="e.g. ACRI-PV-7X92K"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 font-mono text-base font-bold text-[#005B4F] tracking-wider placeholder:text-stone-400 placeholder:font-normal placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] uppercase"
                  />
                  {error && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
                >
                  <span>Verify Code &amp; Continue →</span>
                </button>
              </form>

              <div className="pt-2 text-center border-t border-stone-100 space-y-3">
                <div>
                  <button
                    type="button"
                    onClick={() => setShowLookupBox((prev) => !prev)}
                    className="text-xs font-semibold text-[#005B4F] hover:text-[#00473E] inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-2"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{showLookupBox ? "Hide lookup form" : "Accepted? Retrieve code by Phone / Email →"}</span>
                  </button>
                </div>

                {showLookupBox && (
                  <form
                    onSubmit={handleLookup}
                    className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-3 animate-in fade-in duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800">
                        Retrieve ACRI Access Key
                      </span>
                      <span className="text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        Self-Service
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Enter the phone number or email you used during registration to pull your approved invite pass.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lookupQuery}
                        onChange={(e) => setLookupQuery(e.target.value)}
                        placeholder="Mobile or email address"
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white card-light focus:outline-none focus:ring-2 focus:ring-[#005B4F]/30"
                      />
                      <button
                        type="submit"
                        disabled={isLookingUp}
                        className="px-4 py-2 bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold rounded-xl disabled:opacity-50 cursor-pointer"
                      >
                        {isLookingUp ? "Checking..." : "Retrieve"}
                      </button>
                    </div>

                    {lookupMsg && (
                      <div
                        className={`text-xs p-2.5 rounded-xl ${
                          lookupMsg.type === "success"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : lookupMsg.type === "pending"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {lookupMsg.text}
                      </div>
                    )}
                  </form>
                )}

                <div>
                  <span className="text-xs text-stone-500 block">
                    Don&rsquo;t have an invite code?
                  </span>
                  <Link
                    to="/acri/pharmacovigilance-certification"
                    className="text-xs font-semibold text-[#005B4F] hover:underline mt-1 inline-block"
                  >
                    Apply for the ACRI launch cohort →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 text-center text-stone-400 text-xs border-t border-stone-200 bg-white card-light">
        &copy; {new Date().getFullYear()} Arzon Global · ACRI Career Intelligence Platform
      </footer>
    </div>
  );
}
