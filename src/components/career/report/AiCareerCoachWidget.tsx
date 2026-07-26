import { useState } from "react";
import { Sparkles, Send, Bot, User, CheckCircle2 } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Message {
  role: "assistant" | "user";
  text: string;
}

export function AiCareerCoachWidget({
  result,
  primarySlug,
}: {
  result: CareerEngineResult;
  primarySlug: string;
}) {
  const roleName = result.archetype?.name ?? "Life Sciences Associate";
  const fitScore = result.fitScore ?? 75;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Hi! I'm your AI Career Coach. I've analyzed your assessment: you scored ${fitScore}% fit for ${roleName}. How can I help you prepare for your 90-day action plan or recruiter interviews today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || thinking) return;

    const newMsgs: Message[] = [...messages, { role: "user", text: q }];
    setMessages(newMsgs);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      let reply = `Based on your ${fitScore}% fit score in ${roleName}, recruiters will evaluate your compliance discipline and ICH-GCP terminology first. Focus on building 1 portfolio artifact this week!`;
      if (q.toLowerCase().includes("salary") || q.toLowerCase().includes("pay")) {
        reply = `For ${roleName} entry roles in India, median starting pay ranges between ₹4.5 LPA and ₹5.5 LPA. Candidates with a verified portfolio reach L2 promotions 6 months faster!`;
      } else if (q.toLowerCase().includes("interview") || q.toLowerCase().includes("question")) {
        reply = `Top interview question for ${roleName}: "Walk me through how you handle a data discrepancy or SOP deviation." Would you like to practice a 2-minute mock answer with me right now?`;
      }
      setMessages([...newMsgs, { role: "assistant", text: reply }]);
      setThinking(false);
    }, 800);
  };

  return (
    <div className="rounded-2xl border border-blue-500/30 bg-[#121723] p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">AI Career Coach</h3>
            <p className="text-[10px] font-mono text-slate-400">
              Tuned for {roleName} • {fitScore}% Fit
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
          <CheckCircle2 className="h-3 w-3" /> Online
        </span>
      </div>

      <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "assistant" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div
              className={`rounded-xl p-3 max-w-[85%] leading-relaxed ${
                m.role === "user"
                  ? "bg-[#2563EB] text-white font-medium"
                  : "bg-[#161F33] border border-white/10 text-slate-200"
              }`}
            >
              {m.text}
            </div>
            {m.role === "user" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {thinking && (
          <div className="flex gap-2 items-center text-xs text-slate-400 font-mono">
            <Bot className="h-4 w-4 text-blue-400 animate-pulse" />
            <span>AI Coach is evaluating your response...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2 pt-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask AI Coach about ${roleName} interviews, tools, or salary...`}
          className="flex-1 rounded-xl border border-white/15 bg-[#0B0F19] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={thinking || !input.trim()}
          className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-md disabled:opacity-50 transition-colors"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}

export default AiCareerCoachWidget;
