/**
 * Client-side event idempotency.
 *
 * Some funnel events (`lead_submitted`, `payment_started`, `payment_success`)
 * must not double-fire when the user retries, refreshes, or the network
 * stalls and the same submit runs twice. We persist a small set of "already
 * sent" keys in localStorage; subsequent attempts with the same key are
 * skipped.
 *
 * Keys are scoped (e.g. `lead_submitted:<attempt_id>`) so two different
 * attempts can still both fire the same event name.
 */
const KEY = "arzon_event_dedupe_v1";
const MAX_ENTRIES = 200;

type Store = Record<string, number>;

function readStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(s: Store): void {
  if (typeof window === "undefined") return;
  try {
    // Bound storage to MAX_ENTRIES by dropping the oldest entries.
    const keys = Object.keys(s);
    if (keys.length > MAX_ENTRIES) {
      const sorted = keys.sort((a, b) => (s[a] ?? 0) - (s[b] ?? 0));
      for (const k of sorted.slice(0, keys.length - MAX_ENTRIES)) delete s[k];
    }
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* noop */
  }
}

/** True the first time this key is seen; false on every subsequent call. */
export function claimOnce(key: string): boolean {
  if (!key) return true;
  const s = readStore();
  if (s[key]) return false;
  s[key] = Date.now();
  writeStore(s);
  return true;
}

/** Clear a single dedupe claim — used when a retry should be re-armed. */
export function releaseClaim(key: string): void {
  if (typeof window === "undefined" || !key) return;
  try {
    const s = readStore();
    if (s[key]) {
      delete s[key];
      writeStore(s);
    }
  } catch {
    /* noop */
  }
}
