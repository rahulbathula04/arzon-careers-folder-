import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mic, MicOff, TerminalSquare, Send, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";

import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/copilot")({
  head: () => {
    const seo = pageSeo({
      path: "/copilot",
      title: "Arzon Copilot · AI Healthcare Mock Interviewer",
      description:
        "Interactive AI-powered mock interview practice for Clinical Research, Pharmacovigilance, and Healthcare careers.",
      noindex: true,
    });
    return {
      meta: [{ title: "Arzon Copilot · AI Mock Interview" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: CopilotTerminal,
});

function CopilotTerminal() {
  const [input, setInput] = useState("");

  // Derive the role from the career engine profile saved in sessionStorage.
  // Falls back to a generic greeting if no profile is found.
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
  const archetypeName: string = storedProfile?.archetype?.name ?? "";
  const greeting = archetypeName
    ? `Hello! I am Arzon Copilot. I'll conduct your technical mock interview for the ${archetypeName} track. Are you ready to begin?`
    : "Hello! I am Arzon Copilot. I'll help you prepare for your healthcare career interview. Tell me which role you're targeting and we'll begin.";

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
      data: { weaknesses: "Medical coding basics and attention to detail" },
    },
  } as any);

  // Optional: Add recording state for UI completeness
  const isRecording = false;

  return (
    <div className="flex min-h-dvh flex-col bg-[#050A15] text-slate-300">
      <header className="flex h-16 items-center justify-between border-b border-white/5 bg-white/[0.01] px-6">
        <div className="flex items-center gap-3">
          <TerminalSquare className="h-5 w-5 text-teal-400" />
          <span className="font-mono text-sm font-semibold tracking-widest text-white uppercase">
            Arzon Copilot Terminal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
          </span>
          <span className="font-mono text-xs text-teal-500">System Online</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-6">
        <div className="flex-1 overflow-y-auto space-y-6 pb-6">
          {(messages as any[]).map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm font-medium leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm"
                    : "bg-teal-500/20 border border-teal-500/30 text-teal-100 rounded-tr-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {(status === "submitted" || status === "streaming") && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl p-4 text-sm font-medium leading-relaxed bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm">
                <span className="flex items-center gap-1">
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
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
          className="relative mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-2 shadow-2xl backdrop-blur-md"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled
            title="Voice input - coming soon"
            aria-label="Voice input (coming soon)"
            className="h-12 w-12 rounded-xl text-slate-600 cursor-not-allowed"
          >
            <Mic className="h-5 w-5" />
          </Button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status === "submitted" || status === "streaming"}
            placeholder="Type your response or use voice..."
            className="flex-1 bg-transparent px-4 py-3 font-mono text-sm text-white placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
          />

          {status === "submitted" || status === "streaming" ? (
            <Button
              type="button"
              onClick={stop}
              className="h-12 w-12 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
            >
              <StopCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!input.trim()}
              className="h-12 w-12 rounded-xl bg-teal-500 text-slate-900 hover:bg-teal-400 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </form>
      </main>
    </div>
  );
}
