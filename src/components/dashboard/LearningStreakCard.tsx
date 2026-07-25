import { useState } from "react";
import { Flame, Trophy, Award, ArrowRight, Zap, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  isUser?: boolean;
}

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Priya Sharma", xp: 2850, streak: 14 },
  { rank: 2, name: "Rahul Verma", xp: 2600, streak: 11 },
  { rank: 3, name: "Ananya Patel (You)", xp: 2420, streak: 6, isUser: true },
  { rank: 4, name: "Vikram Reddy", xp: 2150, streak: 8 },
  { rank: 5, name: "Sneha Nair", xp: 1980, streak: 5 },
];

export function LearningStreakCard() {
  const [streakDays, setStreakDays] = useState(6);
  const [todayMinutes, setTodayMinutes] = useState(12);
  const targetMinutes = 15;
  const xpPoints = 2420;

  const isTodayComplete = todayMinutes >= targetMinutes;
  const progressPct = Math.min(100, Math.round((todayMinutes / targetMinutes) * 100));

  const claimDailyXP = () => {
    if (!isTodayComplete) {
      setTodayMinutes(15);
      setStreakDays((s) => s + 1);
      toast.success("🔥 Daily Learning Target Reached! +50 XP Earned!");
    } else {
      toast.info("You've already claimed today's streak XP! Keep learning for bonus points.");
    }
  };

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 sm:p-7 shadow-2xl">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Active Streak Gauge */}
        <div className="flex flex-col justify-between space-y-4 lg:border-r lg:border-slate-800 lg:pr-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              <Flame className="h-3.5 w-3.5 fill-amber-400" /> Active Learning Streak
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-grotesk text-5xl font-black text-white tracking-tight">
                {streakDays}
              </span>
              <span className="font-grotesk text-xl font-bold text-amber-400">Days Active 🔥</span>
            </div>
            <p className="text-caption text-slate-400 mt-1">
              Top 8% of your cohort! Complete 3 more minutes today to lock your 7-day streak bonus.
            </p>
          </div>

          {/* Today's Target Ring */}
          <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-amber-400" /> Daily Target (15 mins)
              </span>
              <span className="text-amber-400 font-mono">{todayMinutes} / 15m</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <Button
              size="sm"
              onClick={claimDailyXP}
              className={`mt-3 w-full font-bold text-xs rounded-xl ${
                isTodayComplete
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                  : "bg-amber-500 hover:bg-amber-400 text-slate-950"
              }`}
            >
              {isTodayComplete ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Streak Locked (+50 XP)
                </>
              ) : (
                <>
                  <Zap className="mr-1.5 h-3.5 w-3.5 fill-slate-950" /> Complete 3 Mins & Claim XP
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Middle Column: XP & Badges */}
        <div className="flex flex-col justify-between space-y-4 lg:border-r lg:border-slate-800 lg:px-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <Trophy className="h-3.5 w-3.5 text-amber-400" /> Total XP Earned
            </div>
            <p className="font-grotesk text-3xl font-bold text-white mt-1">
              {xpPoints.toLocaleString()} <span className="text-xs text-amber-400 font-mono">XP</span>
            </p>
            <p className="text-micro text-slate-500">Unlocks Arzon Alumni Honor Roll at 3,000 XP</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-300">Recent Milestones Unlocked</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs">
                  🏆
                </div>
                <div>
                  <p className="text-micro font-bold text-white">GCP Master</p>
                  <p className="text-[10px] text-slate-500">Module 2 Cleared</p>
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  🔥
                </div>
                <div>
                  <p className="text-micro font-bold text-white">5-Day Streak</p>
                  <p className="text-[10px] text-slate-500">Consistent Learner</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cohort Leaderboard */}
        <div className="flex flex-col justify-between space-y-3 lg:pl-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-400" /> Cohort Leaderboard
            </span>
            <span className="text-micro text-amber-400 font-semibold">March Batch</span>
          </div>

          <div className="space-y-1.5">
            {MOCK_LEADERBOARD.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                  user.isUser
                    ? "bg-amber-500/15 border border-amber-500/30 text-white font-bold"
                    : "bg-slate-950/40 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-micro font-bold w-4 ${
                      user.rank === 1
                        ? "text-amber-400"
                        : user.rank === 2
                        ? "text-slate-300"
                        : "text-amber-600"
                    }`}
                  >
                    #{user.rank}
                  </span>
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center gap-3 text-micro">
                  <span className="text-amber-400/90 font-mono">{user.xp} XP</span>
                  <span className="text-slate-500 font-mono">🔥 {user.streak}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
