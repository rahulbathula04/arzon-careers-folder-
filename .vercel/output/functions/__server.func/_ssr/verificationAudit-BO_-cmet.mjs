import { s as supabase } from "./client-CMxFZmfM.mjs";
async function logVerificationEvent(candidateRef, eventType, viewerOrgTag) {
  const ref = candidateRef.trim().toUpperCase();
  if (!/^[A-Z0-9-]{3,64}$/.test(ref)) return;
  try {
    await supabase.from("verification_audit").insert({
      candidate_ref: ref,
      event_type: eventType,
      viewer_org_tag: viewerOrgTag?.slice(0, 48) ?? null
    });
  } catch {
  }
}
async function fetchVerificationAudit(candidateRef) {
  const ref = candidateRef.trim().toUpperCase();
  if (!/^[A-Z0-9-]{3,64}$/.test(ref)) return [];
  const { data, error } = await supabase.rpc("get_verification_audit", {
    _candidate_ref: ref
  });
  if (error || !data) return [];
  return data;
}
function randSegment(bytes) {
  const arr = new Uint8Array(bytes);
  (globalThis.crypto ?? window.crypto).getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}
function generateArtifactToken() {
  return `${randSegment(8)}${randSegment(8)}`;
}
export {
  fetchVerificationAudit as f,
  generateArtifactToken as g,
  logVerificationEvent as l
};
