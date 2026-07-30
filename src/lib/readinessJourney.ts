/**
 * Client helper for the readiness_journey funnel table.
 *
 * We mint a per-visitor session id (sessionStorage, scoped) and call a
 * SECURITY DEFINER RPC to mark the three milestones: started, submitted,
 * paid. The RPC is COALESCE-upsert so retries and out-of-order calls are
 * safe.
 *
 * All calls are fire-and-forget - never block navigation on telemetry.
 */
import { supabase } from "@/integrations/supabase/client";

const SID_KEY = "arzon.readiness.sid";

export function getReadinessSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.sessionStorage.getItem(SID_KEY);
    if (existing && existing.length >= 8) return existing;
    const sid =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sid_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    window.sessionStorage.setItem(SID_KEY, sid);
    return sid;
  } catch {
    return "";
  }
}

function readUtm(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  try {
    const sp = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = sp.get(k);
      if (v) out[k] = v.slice(0, 200);
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

type MarkArgs = {
  leadId?: string | null;
  archetype?: string | null;
  scoreBand?: string | null;
  amountInr?: number | null;
};

async function mark(kind: "started" | "submitted" | "paid", args: MarkArgs = {}): Promise<void> {
  const sid = getReadinessSessionId();
  if (!sid) return;
  try {
    await supabase.rpc("mark_readiness_journey", {
      _session_id: sid,
      _kind: kind,
      _lead_id: args.leadId ?? undefined,
      _archetype: args.archetype ?? undefined,
      _score_band: args.scoreBand ?? undefined,
      _amount_inr: args.amountInr ?? undefined,
      _utm: kind === "started" ? (readUtm() ?? undefined) : undefined,
    });
  } catch (err) {
    // Telemetry is best-effort - never throw into the UI path.
    if (typeof console !== "undefined") console.warn("readiness_journey mark failed", err);
  }
}

export const markReadinessStarted = (args: MarkArgs = {}) => mark("started", args);
export const markReadinessSubmitted = (args: MarkArgs = {}) => mark("submitted", args);
export const markReadinessPaid = (args: MarkArgs = {}) => mark("paid", args);
