import { createFileRoute } from "@tanstack/react-router";
import { redis } from "@/lib/redis.server";
import { supabaseAdmin } from "@/server/analytics.server";

const BATCH_SIZE = 500;

export const Route = createFileRoute("/api/public/cron/flush-analytics")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Basic security: require a cron secret in production
        const authHeader = request.headers.get("Authorization");
        const cronSecret = process.env.CRON_SECRET;
        
        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
          return new Response("Unauthorized", { status: 401 });
        }

        if (!process.env.UPSTASH_REDIS_REST_URL) {
          return Response.json({ status: "skipped", reason: "redis_not_configured" });
        }

        try {
          // Pop up to BATCH_SIZE events from the right of the list (oldest first)
          // Upstash Redis supports LPOP with count in newer versions, 
          // but to be safe we'll use LRANGE and LTRIM
          const events = await redis.lrange("buffer:analytics_events", 0, BATCH_SIZE - 1);
          
          if (!events || events.length === 0) {
            return Response.json({ status: "ok", flushed: 0 });
          }

          // Map the buffered payloads (which used RPC param names) to table column names
          const rowsToInsert = events.map((ev: any) => ({
            event_name: ev.p_event_name,
            anon_id: ev.p_anon_id || null,
            session_id: ev.p_session_id || null,
            application_id: ev.p_application_id || null,
            lead_id: ev.p_lead_id || null,
            path: ev.p_path || null,
            referrer: ev.p_referrer || null,
            utm_source: ev.p_utm_source || null,
            program_slug: ev.p_program_slug || null,
            cohort: ev.p_cohort || null,
            props: ev.p_props || {},
            user_agent: ev.p_user_agent || null,
            ip_hash: ev.p_ip_hash || null,
            created_at: ev._timestamp || new Date().toISOString(),
          }));

          // Bulk insert into Supabase
          const { error } = await supabaseAdmin
            .from("analytics_events")
            .insert(rowsToInsert);

          if (error) {
            console.error("[cron:flush-analytics] Supabase insert failed:", error);
            return Response.json({ status: "error", error: error.message }, { status: 500 });
          }

          // If successful, trim the processed events from the list
          await redis.ltrim("buffer:analytics_events", events.length, -1);

          return Response.json({ status: "ok", flushed: events.length });
        } catch (err) {
          console.error("[cron:flush-analytics] Flush failed:", err);
          return Response.json({ status: "error", error: String(err) }, { status: 500 });
        }
      },
    },
  },
});
