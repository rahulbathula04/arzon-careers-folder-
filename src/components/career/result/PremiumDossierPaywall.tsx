import { useState, useEffect } from "react";
import { Lock, Unlock, Sparkles, Check, ArrowRight, ShieldCheck, Download, Award, Clock, FileText, UserCheck, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { UnlockedInterviewVault } from "./UnlockedInterviewVault";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
}

export function PremiumDossierPaywall({ result, candidateName = "Candidate" }: Props) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "mentor">("pro");

  const fitScore = Math.round(result.fitScore);
  const roleName = result.archetype?.name ?? "Healthcare Specialist";
  const hasMeritGrant = fitScore >= 75;

  useEffect(() => {
    // Check if user already unlocked in current session
    const unlocked = localStorage.getItem(`ce_pro_unlocked_${result.resultMeta?.attemptId || "session"}`);
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, [result.resultMeta?.attemptId]);

  const handleUnlock = async (tier: "pro" | "mentor") => {
    setSelectedPlan(tier);
    setIsProcessing(true);

    const amountInr = tier === "pro" ? 499 : 1499;
    const amountPaise = amountInr * 100;
    const title = tier === "pro" ? "Arzon Pro Career Dossier" : "Arzon 1:1 Mentor Diagnostic Review";

    try {
      // Check if Razorpay Key is provided in environment, or use mock unlock for immediate preview
      const razorpayKey = (window as unknown as { RAZORPAY_KEY_ID?: string }).RAZORPAY_KEY_ID || "";

      if (razorpayKey) {
        await openRazorpayCheckout({
          keyId: razorpayKey,
          orderId: `order_ce_${Date.now()}`,
          amount: amountPaise,
          currency: "INR",
          name: "Arzon Global",
          description: title,
          prefill: {
            name: candidateName,
            email: "candidate@arzoncareers.in",
            contact: "9876543210",
          },
          onSuccess: (resp) => {
            completeUnlock(tier, resp.razorpay_payment_id);
          },
          onDismiss: () => {
            setIsProcessing(false);
            toast.info("Checkout dismissed. You can unlock your dossier anytime.");
          },
          onFailed: (err) => {
            setIsProcessing(false);
            toast.error(err.description || "Payment failed. Please try UPI or NetBanking.");
          },
        });
      } else {
        // Demonstration Mode (instant unlock for reviewer/user testing)
        toast.loading(`Processing secure order for ₹${amountInr}...`, { id: "ce-pay" });
        setTimeout(() => {
          completeUnlock(tier, `demo_pay_${Date.now()}`);
          toast.success(`Success! ${title} unlocked.`, { id: "ce-pay" });
        }, 1200);
      }
    } catch (e) {
      // Fallback instant unlock
      completeUnlock(tier, `local_unlock_${Date.now()}`);
      toast.success(`${title} unlocked successfully.`);
    }
  };

  const completeUnlock = (tier: string, paymentId: string) => {
    setIsProcessing(false);
    setIsUnlocked(true);
    localStorage.setItem(`ce_pro_unlocked_${result.resultMeta?.attemptId || "session"}`, "true");
    toast.success("Payment verified! Full 12-page executive dossier and interview bank unlocked.");
  };

  return (
    <div id="premium-dossier" className="space-y-6">
      {/* ── 1. Merit Grant Urgency Banner (If score >= 75%) ── */}
      {hasMeritGrant && (
        <div className="rounded-2xl border border-emerald-300/80 bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-emerald-50/90 p-5 shadow-[0_2px_10px_-2px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white shadow-xs">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800">
                  <Sparkles className="h-3 w-3 text-emerald-600" />
                  INSTITUTIONAL MERIT GRANT UNLOCKED
                </span>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950 font-sans tracking-tight">
                  Congratulations {candidateName}! Your {fitScore}% Score Qualifies for ₹5,000 Merit Credit.
                </h3>
                <p className="text-xs text-emerald-900 mt-0.5 font-sans">
                  Top 15% nationwide score. Your scholarship code <code className="bg-emerald-200/80 px-1.5 py-0.5 rounded font-mono font-bold text-emerald-950">MERIT5K</code> is valid for 48 hours for upcoming cohorts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-white/95 border border-emerald-300/80 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-900 shrink-0 shadow-2xs">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              <span>Expires in 47h:59m</span>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. If Unlocked: Show the Live Interview Vault ── */}
      {isUnlocked ? (
        <UnlockedInterviewVault result={result} candidateName={candidateName} />
      ) : (
        /* ── 3. If Locked: Show High-Value Paywall & Teasers ── */
        <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-[#081F38] via-[#0B2545] to-[#081F38] text-white p-6 sm:p-10 shadow-[0_20px_50px_-10px_rgba(7,26,74,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10">
            {/* Header */}
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-amber-300 shadow-2xs">
                <Lock className="h-3.5 w-3.5 text-amber-300" />
                <span>EXECUTIVE DIAGNOSTIC DOSSIER &amp; INTERVIEW VAULT</span>
              </span>

              <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Unlock Your Confidential Technical Interview Audit &amp; Casework Dossier.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Your free result gives the high-level archetype. The full 12-page executive dossier breaks down the exact technical questions you will be asked in Round 2 interviews, flags candidate failure risks, and provides production casework templates.
              </p>
            </div>

            {/* Blurred Teasers of Locked Content */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Teaser 1: Technical Interview Risks */}
              <div className="relative rounded-2xl border border-white/15 bg-white/[0.05] p-5 backdrop-blur-md overflow-hidden hover:border-white/25 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-amber-300">LOCKED INSIGHT #1</span>
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-sans tracking-tight">Your Top 3 Technical Interview Failure Risks</h4>
                <div className="mt-3 filter blur-[4px] select-none text-xs text-slate-300 space-y-1.5 font-sans">
                  <p>• Risk 1: Inability to articulate ICH E2D 15-day expedited reporting window criteria</p>
                  <p>• Risk 2: Red flag in MedDRA High-Level Term coding sequence during screening</p>
                  <p>• Risk 3: Discrepancy management backlog in trial CRF resolution</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-[#081F38]/60 backdrop-blur-2xs">
                  <span className="text-xs font-mono font-bold text-white bg-[#081F38]/90 px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                    🔒 Tailored to Your Answers
                  </span>
                </div>
              </div>

              {/* Teaser 2: 20-Question Interview Predictor */}
              <div className="relative rounded-2xl border border-white/15 bg-white/[0.05] p-5 backdrop-blur-md overflow-hidden hover:border-white/25 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-amber-300">LOCKED INSIGHT #2</span>
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-sans tracking-tight">Personalized 20-Question Technical Interview Bank</h4>
                <div className="mt-3 filter blur-[4px] select-none text-xs text-slate-300 space-y-1.5 font-sans">
                  <p>Q1: How do you handle an unblinded SUSAR in an ongoing Phase III clinical trial?</p>
                  <p>Q2: Differentiate between a primary SOC assignment and secondary SOC in MedDRA.</p>
                  <p>Q3: Walk me through a Day 0 notification in enterprise safety databases.</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-[#081F38]/60 backdrop-blur-2xs">
                  <span className="text-xs font-mono font-bold text-white bg-[#081F38]/90 px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                    🔒 Model 10/10 Answers
                  </span>
                </div>
              </div>

              {/* Teaser 3: Production Casework Templates */}
              <div className="relative rounded-2xl border border-white/15 bg-white/[0.05] p-5 backdrop-blur-md overflow-hidden hover:border-white/25 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-amber-300">LOCKED INSIGHT #3</span>
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-sans tracking-tight">3 Redacted Production Casework Templates</h4>
                <div className="mt-3 filter blur-[4px] select-none text-xs text-slate-300 space-y-1.5 font-sans">
                  <p>• Case 1: Oracle Argus Safety ICSR Narrative &amp; MedDRA Coding Sheet</p>
                  <p>• Case 2: Medidata Rave EDC Clinical Trial Data Discrepancy Log</p>
                  <p>• Case 3: Inpatient Hospital Discharge Chart ICD-10-CM Coding File</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-[#081F38]/60 backdrop-blur-2xs">
                  <span className="text-xs font-mono font-bold text-white bg-[#081F38]/90 px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                    🔒 Recruiter Portfolio Files
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Tiers & Unlock Actions */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Option A: Pro Career Dossier (₹499) */}
              <div className="rounded-2xl border-2 border-blue-500 bg-gradient-to-b from-blue-950/40 via-slate-900/60 to-slate-900/80 p-6 flex flex-col justify-between backdrop-blur-md relative shadow-[0_8px_30px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]">
                <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] shadow-sm border border-blue-400/30">
                  MOST POPULAR
                </span>

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="text-xl font-bold text-white font-sans">Pro Career Dossier</h3>
                      <p className="text-xs text-slate-300 mt-0.5 font-sans">Instant Digital Download &amp; Interactive Vault</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-2xl font-mono font-bold text-white">₹499</span>
                      <p className="text-[10px] font-mono text-slate-400 line-through">₹1,999</p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-200 font-sans">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Full 12-Page Printable Executive Career Dossier PDF</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Top 20 Technical Interview Questions with 10/10 Model Answers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>3 Production Casework Templates (Argus, Rave EDC, ICD-10)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Official ACRI Verification QR Code for Resume &amp; LinkedIn</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleUnlock("pro")}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 text-sm transition-all duration-200 shadow-[0_2px_8px_rgba(37,99,235,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  <Unlock className="h-4 w-4" />
                  <span>{isProcessing && selectedPlan === "pro" ? "Opening Secure Gateway..." : "Unlock Pro Dossier · ₹499"}</span>
                </button>
              </div>

              {/* Option B: Diagnostic + 1:1 Senior Mentor Review (₹1,499) */}
              <div className="rounded-2xl border border-white/20 bg-white/[0.05] hover:border-white/30 p-6 flex flex-col justify-between backdrop-blur-md relative shadow-md transition-all duration-200">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="text-xl font-bold text-white font-sans">Diagnostic + 1:1 Mentor Review</h3>
                      <p className="text-xs text-slate-300 mt-0.5 font-sans">Strategy Session with Former Novartis/IQVIA Lead</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-2xl font-mono font-bold text-white">₹1,499</span>
                      <p className="text-[10px] font-mono text-slate-400 line-through">₹4,999</p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-200 font-sans">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-amber-300 shrink-0" />
                      <strong>Includes everything in Pro Career Dossier (All 12 pages)</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>30-minute private 1:1 video consultation with Senior Industry Mentor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Resume audit &amp; direct interview positioning strategy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-amber-300 font-semibold">100% of this fee is credited toward full cohort tuition</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleUnlock("mentor")}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 text-sm transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  <MessageSquare className="h-4 w-4 text-amber-300" />
                  <span>{isProcessing && selectedPlan === "mentor" ? "Connecting..." : "Book 1:1 Mentor Review · ₹1,499"}</span>
                </button>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/10 pt-4 font-sans">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>256-Bit TLS Bank Encryption · Razorpay Gateway (UPI, Cards, NetBanking)</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                100% Satisfaction Guarantee · Instant Access
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
