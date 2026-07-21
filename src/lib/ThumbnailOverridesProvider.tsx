import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { setThumbnailOverrides } from "@/data/courseThumbs";

/**
 * Loads admin-managed thumbnail overrides and pushes them into the in-memory
 * map consumed by `thumbFor()`. Subscribes to realtime changes so updates
 * appear without a page reload.
 *
 * Only activates on routes that actually display course thumbnails so the
 * homepage's LCP isn't competing with this background fetch.
 */
export function ThumbnailOverridesProvider({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const needed =
    pathname === "/" || pathname.startsWith("/courses") || pathname.startsWith("/admin");

  useEffect(() => {
    if (!needed) return;
    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function load() {
      const { data, error } = await supabase
        .from("course_thumbnail_overrides")
        .select("slug,image_url");
      if (cancelled || error || !data) return;
      const map: Record<string, string> = {};
      for (const row of data) map[row.slug] = row.image_url;
      setThumbnailOverrides(map);
      // No overrides yet → don't hold a realtime websocket open. The
      // homepage LCP / hydration shouldn't carry a permanent subscriber
      // for an empty table. Admins on /admin/thumbnails still subscribe
      // because the route guard re-mounts with `needed=true` and the
      // table will populate after the first insert.
      if (data.length === 0 && channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    }

    // Defer until the browser is idle so we don't compete with LCP / hydration.
    const start = () => {
      if (cancelled) return;
      void load();
      channel = supabase
        .channel("course_thumbnail_overrides")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "course_thumbnail_overrides" },
          () => {
            void load();
          },
        )
        .subscribe();
    };

    const w =
      typeof window !== "undefined"
        ? (window as Window & {
            requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          })
        : null;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    if (w?.requestIdleCallback) {
      idleHandle = w.requestIdleCallback(start, { timeout: 4000 });
    } else {
      timeoutHandle = setTimeout(start, 1500);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined && w && "cancelIdleCallback" in w) {
        (w as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(
          idleHandle,
        );
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      if (channel) supabase.removeChannel(channel);
    };
  }, [needed]);

  return <>{children}</>;
}
