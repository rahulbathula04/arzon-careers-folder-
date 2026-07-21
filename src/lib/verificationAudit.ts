import { supabase } from "@/integrations/supabase/client";

export type VerificationEvent =
  | "id_generated"
  | "qr_scanned"
  | "rubric_viewed"
  | "artifact_unlocked"
  | "portfolio_viewed";

export async function logVerificationEvent(
  candidateRef: string,
  eventType: VerificationEvent,
  viewerOrgTag?: string,
) {
  const ref = candidateRef.trim().toUpperCase();
  if (!/^[A-Z0-9-]{3,64}$/.test(ref)) return;
  try {
    await supabase.from("verification_audit").insert({
      candidate_ref: ref,
      event_type: eventType,
      viewer_org_tag: viewerOrgTag?.slice(0, 48) ?? null,
    });
  } catch {
    /* best-effort, audit is non-critical */
  }
}

export interface AuditRow {
  id: string;
  candidate_ref: string;
  event_type: VerificationEvent;
  viewer_org_tag: string | null;
  occurred_at: string;
}

export async function fetchVerificationAudit(candidateRef: string): Promise<AuditRow[]> {
  const ref = candidateRef.trim().toUpperCase();
  if (!/^[A-Z0-9-]{3,64}$/.test(ref)) return [];
  // Public SELECT on verification_audit is restricted; use the RPC that
  // gates on candidate_ref and returns at most 50 rows.
  const { data, error } = await supabase.rpc("get_verification_audit", {
    _candidate_ref: ref,
  });
  if (error || !data) return [];
  return data as AuditRow[];
}

function randSegment(bytes: number) {
  const arr = new Uint8Array(bytes);
  (globalThis.crypto ?? window.crypto).getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function generateArtifactToken(): string {
  return `${randSegment(8)}${randSegment(8)}`; // 32 hex chars
}
