import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mic, TerminalSquare, Send, StopCircle, ArrowLeft, Sparkles, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { AiArtifactCanvas, type CopilotTrack } from "@/components/copilot/AiArtifactCanvas";

import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/copilot")({
  head: () => {
    const seo = pageSeo({
      path: "/copilot",
      title: "Arzon Copilot · AI Healthcare Mock Interviewer & Canvas",
      description:
        "Interactive AI-powered mock interview practice and live execution canvas for Clinical Research, Medical Coding, and Healthcare careers.",
      noindex: true,
    });
    return {
      meta: [{ title: "Arzon Copilot · AI Dual-Pane Workspace" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: CopilotTerminal,
});

function CopilotTerminal() {
  const [input, setInput] = useState("");
  const [track, setTrack] = useState<CopilotTrack>("medical-coding");

  // Derive the role from the career engine profile saved in sessionStorage.
  const storedProfile =
    typeof window !== "undefined"
      ? (() => {
          try {
            return JSON.parse(sessionStorage.getItem("ce_result") || "null");
          } catch {
            return null;
          }
        })()
      : null;

  const acriScore = storedProfile?.fitScore ?? 78;
  const archetypeName: string = storedProfile?.archetype?.name ?? "";
  const greeting = archetypeName
    ? `Hello! I am Arzon Copilot. I'll conduct your technical mock interview for the ${archetypeName} track. Take a look at your Live AI Canvas on the right as we go. Are you ready to begin?`
    : "Hello! I am Arzon Copilot. I'll help you prepare for your healthcare career interview with live workspace scenarios. Tell me which role you're targeting and we'll begin.";

  const { messages, status, stop, sendMessage } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: greeting,
      },
    ],
    body: {
      data: { weaknesses: "Medical coding basics and attention to detail", track },
    },
  } as any);

  return (
    <div className="flex min-h-dvh flex-col bg-[#050A15] text-slate-300">
      {/* Global Top Navbar */}
      <header className="flex h-16 items-center justify-between border-b border-white/10 bg-white/[0.01] px-6">
        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2.5">
            <TerminalSquare className="h-5 w-5 text-teal-400" />
            <span className="font-mono text-sm font-semibold tracking-widest text-white uppercase">
              Arzon Copilot Dual Workspace
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
          </span>
          <span className="font-mono text-xs text-teal-400 font-medium">Model Online · Sonnet 3.5</span>
        </div>
      </header>

      {/* Main Dual-Pane Body */}
      <main className="flex flex-1 overflow-hidden p-4 lg:p-6 gap-6">
        {/* Left Pane: Terminal Chat */}
        <div className="flex w-full flex-col lg:w-1/2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-teal-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                AI Interviewer Stream
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Audio Visualizer Ready</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {(messages as any[]).map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm font-medium leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm shadow-md"
                      : "bg-teal-500/20 border border-teal-500/30 text-teal-100 rounded-tr-sm shadow-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {(status === "submitted" || status === "streaming") && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-4 text-sm bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm">
                  <AiThinkingLoader label="Thinking & evaluating response…" size="sm" />
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim()) return;
              sendMessage({ role: "user", content: input, id: Date.now().toString() } as any);
              setInput("");
            }}
            className="relative mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-2 shadow-2xl"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled
              title="Voice input - coming soon"
              aria-label="Voice input (coming soon)"
              className="h-11 w-11 rounded-lg text-slate-500 cursor-not-allowed"
            >
              <Mic className="h-4 w-4" />
            </Button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status === "submitted" || status === "streaming"}
              placeholder="Type your answer or select option from canvas..."
              className="flex-1 bg-transparent px-3 py-2 font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
            />

            {status === "submitted" || status === "streaming" ? (
              <Button
                type="button"
                onClick={stop}
                className="h-11 w-11 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <StopCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!input.trim()}
                className="h-11 w-11 rounded-lg bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>

        {/* Right Pane: Live Interactive AI Canvas */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          <AiArtifactCanvas
            track={track}
            onTrackChange={(t) => setTrack(t)}
            candidateName={archetypeName || "Candidate"}
            acriScore={acriScore}
          />
        </div>
      </main>
    </div>
  );
}
