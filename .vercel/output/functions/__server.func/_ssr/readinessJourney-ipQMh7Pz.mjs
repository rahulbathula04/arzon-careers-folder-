import { s as supabase } from "./client-CMxFZmfM.mjs";
const SID_KEY = "arzon.readiness.sid";
function getReadinessSessionId() {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.sessionStorage.getItem(SID_KEY);
    if (existing && existing.length >= 8) return existing;
    const sid = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `sid_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    window.sessionStorage.setItem(SID_KEY, sid);
    return sid;
  } catch {
    return "";
  }
}
function readUtm() {
  if (typeof window === "undefined") return null;
  try {
    const sp = new URLSearchParams(window.location.search);
    const out = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = sp.get(k);
      if (v) out[k] = v.slice(0, 200);
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}
async function mark(kind, args = {}) {
  const sid = getReadinessSessionId();
  if (!sid) return;
  try {
    await supabase.rpc("mark_readiness_journey", {
      _session_id: sid,
      _kind: kind,
      _lead_id: args.leadId ?? void 0,
      _archetype: args.archetype ?? void 0,
      _score_band: args.scoreBand ?? void 0,
      _amount_inr: args.amountInr ?? void 0,
      _utm: kind === "started" ? readUtm() ?? void 0 : void 0
    });
  } catch (err) {
    if (typeof console !== "undefined") console.warn("readiness_journey mark failed", err);
  }
}
const markReadinessStarted = (args = {}) => mark("started", args);
const markReadinessSubmitted = (args = {}) => mark("submitted", args);
export {
  markReadinessSubmitted as a,
  getReadinessSessionId as g,
  markReadinessStarted as m
};
