const IS_DEV = import.meta.env.DEV;
const IS_LOCAL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const BYPASS_KEY = "arzon_dev_admin_bypass";

export function DevBypassBanner() {
  // Only render in dev mode on localhost
  if (!IS_DEV || !IS_LOCAL) return null;

  const isEnabled =
    typeof window !== "undefined" &&
    localStorage.getItem(BYPASS_KEY) === "true";

  function enableBypass() {
    localStorage.setItem(BYPASS_KEY, "true");
    window.location.reload();
  }

  function disableBypass() {
    localStorage.removeItem(BYPASS_KEY);
    window.location.reload();
  }

  // ── Bypass active: show small green pill badge ──────────────────────────
  if (isEnabled) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/90 px-3 py-1.5 shadow-lg backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
        <span className="text-xs font-semibold text-emerald-300">
          🔧 Dev Bypass Active
        </span>
        <button
          type="button"
          onClick={disableBypass}
          className="ml-1 grid h-4 w-4 place-items-center rounded-full text-emerald-400 transition hover:bg-emerald-500/20 hover:text-emerald-200"
          aria-label="Disable dev bypass"
          title="Disable dev bypass & reload"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3 w-3"
          >
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        </button>
      </div>
    );
  }

  // ── Bypass NOT set: show blocking amber banner at top ───────────────────
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b-2 border-amber-500 bg-amber-950/95 px-4 py-3 shadow-2xl backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <p className="text-sm font-bold text-amber-300">
            ⚠️ Dev Admin Bypass Not Enabled
          </p>
          <p className="mt-0.5 text-xs text-amber-200/80">
            You're on localhost but the admin bypass flag is not set. Click
            below to enable it, then the page will reload.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
          <button
            type="button"
            onClick={enableBypass}
            className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-bold text-amber-950 shadow-md transition hover:bg-amber-400 active:scale-95"
          >
            Enable Dev Bypass &amp; Reload
          </button>
          <span className="text-[10px] font-medium text-amber-400/70">
            This flag only works on localhost in development mode.
          </span>
        </div>
      </div>
    </div>
  );
}
