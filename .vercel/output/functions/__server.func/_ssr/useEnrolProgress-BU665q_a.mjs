import { r as reactExports } from "../_libs/react.mjs";
import { i as isTier } from "./enrolmentTiers-CKOrj6Lb.mjs";
const KEY = "arzon_enrol_v1";
const TTL_MS = 24 * 60 * 60 * 1e3;
function read() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.v !== 1) return null;
    if (Date.now() - (parsed.updatedAt ?? 0) > TTL_MS) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    if (parsed.tier && !isTier(parsed.tier)) return null;
    return parsed;
  } catch {
    return null;
  }
}
function write(next) {
  if (typeof window === "undefined") return;
  try {
    if (!next) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify({ ...next, updatedAt: Date.now() }));
  } catch {
  }
}
const enrolProgressStore = {
  get: read,
  set: (patch) => {
    const prev = read() ?? { v: 1, step: "profile", updatedAt: Date.now() };
    write({ ...prev, ...patch, v: 1, updatedAt: Date.now() });
  },
  clear: () => write(null)
};
function useEnrolProgress() {
  const [state, setState] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setState(read());
    const onStorage = (e) => {
      if (e.key === KEY) setState(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const update = reactExports.useCallback((patch) => {
    enrolProgressStore.set(patch);
    setState(read());
  }, []);
  const clear = reactExports.useCallback(() => {
    enrolProgressStore.clear();
    setState(null);
  }, []);
  return { state, update, clear };
}
export {
  enrolProgressStore as e,
  useEnrolProgress as u
};
