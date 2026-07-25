import { useState } from "react";
import { Gift, Share2, Copy, Check, Users, DollarSign, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { waLink } from "@/components/landing/constants";

interface ReferralItem {
  id: string;
  name: string;
  date: string;
  status: "Enrolled" | "Assessment Completed" | "Pending Payment";
  rewardInr: number;
}

const MOCK_REFERRALS: ReferralItem[] = [
  { id: "1", name: "Rahul Deshmukh", date: "22 Mar 2026", status: "Enrolled", rewardInr: 2000 },
  { id: "2", name: "Kavita Rao", date: "18 Mar 2026", status: "Enrolled", rewardInr: 2000 },
  { id: "3", name: "Amit Kumar", date: "15 Mar 2026", status: "Assessment Completed", rewardInr: 0 },
];

export function ReferralHub() {
  const [copied, setCopied] = useState(false);
  const referralCode = "ARZON-GIVE2K-ANANYA";
  const referralLink = `https://arzoncareers.in/career-engine/start?ref=${referralCode}`;

  const totalEarnedInr = 4000;
  const pendingRewardInr = 2000;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnWhatsApp = () => {
    const text = `Hey! I've been learning with Arzon Careers for my Healthcare & Life Sciences career. They're giving ₹2,000 OFF on all career master programs with my referral link. Take their free 3-min career assessment here: ${referralLink}`;
    window.open(waLink(text), "_blank", "noopener");
  };

  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
            <Gift className="h-3.5 w-3.5" /> Give ₹2,000 • Get ₹2,000 Referral Program
          </div>
          <h2 className="font-grotesk text-2xl font-bold text-white">
            Share Success. Earn Cash Rewards.
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Give your peers ₹2,000 off their enrolment fee. Get ₹2,000 cash credited via UPI for every friend who joins.
          </p>
        </div>

        {/* Total Earned Badge */}
        <div className="bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800 text-center sm:text-right">
          <p className="text-micro font-semibold text-slate-400 uppercase tracking-widest">Total Cashback Earned</p>
          <p className="font-grotesk text-3xl font-black text-emerald-400">₹{totalEarnedInr.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Left Box: WhatsApp 1-Tap Share */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 space-y-4">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Share2 className="h-4 w-4 text-emerald-400" /> Share via WhatsApp in 1-Tap
          </div>
          <p className="text-xs text-slate-400">
            Send a pre-filled invitation message with your referral tracking link directly to your college & WhatsApp groups.
          </p>
          <Button
            onClick={shareOnWhatsApp}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl py-2.5"
          >
            Share on WhatsApp Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Copy Link Input */}
          <div className="flex items-center gap-2 pt-2">
            <input
              readOnly
              value={referralLink}
              className="h-10 flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 text-xs text-slate-300 outline-none"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={copyLink}
              className="h-10 border-slate-700 text-slate-200 hover:bg-slate-800 text-xs shrink-0"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Right Box: Live Referrals Tracker */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-white flex items-center gap-1.5">
              <Users className="h-4 w-4 text-emerald-400" /> Your Referred Candidates
            </span>
            <span className="text-emerald-400 font-mono">3 Referred</span>
          </div>

          <div className="space-y-2 pt-1">
            {MOCK_REFERRALS.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 text-xs"
              >
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-micro text-slate-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-micro font-bold ${
                      item.status === "Enrolled"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {item.status}
                  </span>
                  {item.rewardInr > 0 && (
                    <p className="text-micro font-mono text-emerald-400 font-bold mt-0.5">
                      +₹{item.rewardInr} Paid
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
