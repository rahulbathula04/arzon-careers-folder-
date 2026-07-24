import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AlertTriangle, Check, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitAiFeedback } from "@/lib/aiFeedback.functions";

type Reason = "sounds_ai" | "not_verified" | "wrong_data" | "other";

const REASONS: Array<{ id: Reason; label: string }> = [
  { id: "sounds_ai", label: "Sounds AI-written" },
  { id: "not_verified", label: "Claim not verified" },
  { id: "wrong_data", label: "Wrong number / fact" },
  { id: "other", label: "Something else" },
];

/**
 * One-tap feedback prompt for users to report AI-sounding or unverified
 * copy. Inserts into public.ai_feedback via a server fn; admins triage in
 * /admin/ai-feedback.
 */
export function AiFeedbackPrompt({ surface, className }: { surface?: string; className?: string }) {
  const route = useRouterState({ select: (s) => s.location.pathname });
  const submit = useServerFn(submitAiFeedback);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<Reason | null>(null);
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function send() {
    if (!reason) return;
    setState("sending");
    try {
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : undefined;
      const res = await submit({
        data: { route, surface, reason, note: note.trim() || undefined, userAgent: ua },
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div
        className={
          "inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs text-sky-200 " +
          (className ?? "")
        }
      >
        <Check className="h-3.5 w-3.5" /> Thanks — flagged for review.
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/[0.08] hover:text-white/90 " +
          (className ?? "")
        }
        aria-label="Report this section as sounding AI or not verified"
      >
        <AlertTriangle className="h-3.5 w-3.5" />
        Sounds AI / not verified?
      </button>
    );
  }

  return (
    <div
      className={
        "rounded-2xl border border-white/15 bg-[#0B1426] p-4 text-sm text-white/85 shadow-lg " +
        (className ?? "")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-semibold text-white">Flag this section</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close feedback prompt"
          className="text-white/50 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-1 text-xs text-white/60">
        We'll review on the next copy sweep.{" "}
        {surface ? <span className="text-white/40">· {surface}</span> : null}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {REASONS.map((r) => (
          <button
            type="button"
            key={r.id}
            onClick={() => setReason(r.id)}
            className={
              "rounded-full border px-2.5 py-1 text-xs font-medium transition " +
              (reason === r.id
                ? "border-accent-glow/60 bg-accent-glow/15 text-eyebrow-strong"
                : "border-white/15 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]")
            }
          >
            {r.label}
          </button>
        ))}
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value.slice(0, 1000))}
        rows={2}
        placeholder="Optional — what felt off? (no personal info)"
        className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-2 text-xs text-white/85 placeholder:text-white/35 focus:border-accent-glow/40 focus:outline-none"
      />
      <div className="mt-3 flex items-center justify-end gap-2">
        {state === "error" ? (
          <span className="text-xs text-rose-300">Couldn't send. Try again.</span>
        ) : null}
        <button
          type="button"
          disabled={!reason || state === "sending"}
          onClick={send}
          className="rounded-full bg-accent-glow px-3 py-1.5 text-xs font-semibold text-slate-900 disabled:opacity-40"
        >
          {state === "sending" ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
