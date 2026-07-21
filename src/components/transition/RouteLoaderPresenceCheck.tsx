import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Dev-only assertion that <RouteLoader /> is mounted somewhere in the tree.
 * Renders nothing in production. If the loader's beacon flag isn't set
 * within ~500 ms of boot or any route change, this surfaces a console
 * error and a fixed red dev banner so the regression is impossible to
 * miss.
 */
export function RouteLoaderPresenceCheck() {
  if (!import.meta.env.DEV) return null;
  return <PresenceCheckImpl />;
}

function PresenceCheckImpl() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [missing, setMissing] = useState(false);
  const warnedRef = useRef(false);

  useEffect(() => {
    const id = setTimeout(() => {
      const mounted = Boolean(
        (window as unknown as { __ROUTE_LOADER_MOUNTED__?: boolean }).__ROUTE_LOADER_MOUNTED__,
      );
      if (!mounted) {
        if (!warnedRef.current) {
          warnedRef.current = true;
          console.error(
            "[RouteLoaderPresenceCheck] <RouteLoader /> is not mounted. " +
              "Add it once in src/routes/__root.tsx so the space loader appears on every route.",
          );
        }
        setMissing(true);
      } else {
        warnedRef.current = false;
        setMissing(false);
      }
    }, 500);
    return () => clearTimeout(id);
  }, [pathname]);

  if (!missing) return null;
  return (
    <div
      role="alert"
      className="fixed inset-x-0 top-0 z-[300] bg-red-600 px-3 py-1.5 text-center font-mono text-micro font-semibold text-white shadow-lg"
    >
      DEV: &lt;RouteLoader /&gt; missing, see console
    </div>
  );
}
