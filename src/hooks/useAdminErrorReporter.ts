import { useEffect } from "react";
import { logClientError } from "@/lib/client-error-log.functions";

/**
 * Listens for window errors + unhandled rejections while an admin page is
 * mounted and forwards them to the server so they appear in Server Logs.
 * Also flags React hydration mismatches (#418/#423/#425) explicitly.
 */
export function useAdminErrorReporter(route: string) {
  useEffect(() => {
    const send = (
      kind: "hydration" | "runtime" | "unhandledrejection",
      message: string,
      stack?: string,
    ) => {
      try {
        // Fire-and-forget; never block UI on logging.
        void logClientError({
          data: {
            kind,
            message: message.slice(0, 2000),
            stack: stack?.slice(0, 8000),
            url: typeof location !== "undefined" ? location.href : undefined,
            route,
            ua: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
          },
        });

        console.error(`[admin][${kind}]`, message, stack);
      } catch {
        /* swallow */
      }
    };

    const onError = (e: ErrorEvent) => {
      const msg = e.message || String(e.error?.message || e.error || "error");
      const isHydration = /Minified React error #(418|423|425)|hydrat/i.test(msg);
      send(isHydration ? "hydration" : "runtime", msg, e.error?.stack);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const r: any = e.reason;
      send("unhandledrejection", String(r?.message || r || "unhandled rejection"), r?.stack);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [route]);
}
