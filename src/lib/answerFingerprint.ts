/**
 * Deterministic 8-char fingerprint of an answers map. Used as a visible
 * "Match ID" on the result page so users can see two attempts produced
 * different inputs. Not crypto — collision rate is fine for UX.
 */
export function fingerprintAnswers(answers: Record<string, string> | null | undefined): string {
  if (!answers) return "ce-00000000";
  const keys = Object.keys(answers).sort();
  const s = keys.map((k) => `${k}=${answers[k]}`).join("|");
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  // Mix into 64 bits by re-hashing reversed
  let h2 = 0x811c9dc5;
  for (let i = s.length - 1; i >= 0; i--) {
    h2 ^= s.charCodeAt(i);
    h2 = (h2 + ((h2 << 1) + (h2 << 4) + (h2 << 7) + (h2 << 8) + (h2 << 24))) >>> 0;
  }
  return (
    "ce-" +
    h.toString(16).padStart(8, "0").slice(0, 4) +
    h2.toString(16).padStart(8, "0").slice(0, 4)
  );
}
