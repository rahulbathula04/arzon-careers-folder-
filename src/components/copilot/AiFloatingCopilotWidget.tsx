import * as React from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, TerminalSquare, Brain, X, ArrowRight, Bot, Zap, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiFloatingCopilotWidget({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("fixed bottom-6 right-6 z-40 font-sans", className)}>
      {/* Expanded Quick Assistant Drawer */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl border border-white/15 bg-[#070C18]/95 p-5 text-slate-200 shadow-2xl backdrop-blur-md space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <Brain className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Ambient Arzon Copilot
                </h4>
                <p className="text-[10px] text-slate-400">Model Online · Active Guidance</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-3.5 space-y-2">
            <p className="text-xs text-teal-300 font-semibold">How can I help your career prep today?</p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Launch your interactive dual-pane workspace or test your scenario skills with AI diagnostics.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Suggested AI Workspaces
            </span>

            <Link
              to="/copilot"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-slate-200 hover:border-teal-400/50 hover:bg-teal-500/10 transition-all group"
            >
              <div className="flex items-center gap-2">
                <TerminalSquare className="h-4 w-4 text-teal-400" />
                <span className="font-medium">Dual-Pane Copilot Terminal</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-400 transition-colors" />
            </Link>

            <Link
              to="/copilot"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-slate-200 hover:border-teal-400/50 hover:bg-teal-500/10 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="font-medium">Live ATS Resume Optimizer</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
            </Link>
          </div>

          <Link
            to="/copilot"
            onClick={() => setIsOpen(false)}
            className="block w-full rounded-xl bg-teal-500 py-2.5 text-center text-xs font-bold text-slate-950 hover:bg-teal-400 transition-colors shadow-lg"
          >
            Open Full AI Workspace →
          </Link>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-slate-950 font-bold shadow-2xl hover:scale-105 transition-all ring-4 ring-teal-500/20"
        title="Open Ambient Arzon Copilot"
      >
        <span className="relative flex h-3 w-3 absolute top-1 right-1">
          <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
        </span>
        <Bot className="h-6 w-6 text-slate-950 transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}
