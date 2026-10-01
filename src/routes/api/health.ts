import { createFileRoute } from "@tanstack/react-router";
import { isRedisConfigured, redis } from "@/lib/redis.server";
import { getSupabaseUrl, getSupabaseAnonKey } from "@/lib/supabaseEnv";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const checks: Record<string, string> = {
          app: "ok",
          redis: isRedisConfigured ? "configured" : "missing",
          supabase: "configured",
        };

        try {
          getSupabaseUrl();
          getSupabaseAnonKey();
        } catch {
          checks.supabase = "missing";
        }

        if (isRedisConfigured) {
          try {
            await redis.setex("health:ping", 30, "ok");
            const pong = await redis.get("health:ping");
            checks.redis = pong === "ok" ? "ok" : "error";
          } catch {
            checks.redis = "error";
          }
        }

        const healthy = checks.app === "ok" && checks.supabase === "configured" && checks.redis === "ok";
        return Response.json(
          {
            status: healthy ? "ok" : "degraded",
            checks,
            version: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT_SHA ?? "unknown",
            environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
            timestamp: new Date().toISOString(),
          },
          { status: healthy ? 200 : 503, headers: { "Cache-Control": "no-store" } },
        );
      },
    },
  },
});
