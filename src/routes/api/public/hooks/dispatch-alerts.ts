import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { verifyHookSecret } from "@/lib/hook-auth.server";

/**
 * Alert dispatcher (Phase P1).
 *
 * Reads unsent rows from public.pending_alert_payloads() and forwards each to
 * the Slack incoming webhook in SLACK_ALERT_WEBHOOK_URL. On success the row is
 * marked notified via mark_alerts_notified / mark_backup_alerts_notified so it
 * won't fire again.
 *
 * If SLACK_ALERT_WEBHOOK_URL is unset the route still drains the queue but
 * just logs - useful for dev. Wire pg_cron to call every 5 min:
 *   SELECT cron.schedule('arzon-dispatch-alerts','* /5 * * * *', $$
 *     SELECT net.http_post(
 *       url := 'https://project--aee7d20e-6465-4338-8819-ad4efc6ce26b.lovable.app/api/public/hooks/dispatch-alerts',
 *       headers := jsonb_build_object('Content-Type','application/json','x-hook-secret', current_setting('app.hook_secret', true)),
 *       body := '{}'::jsonb
 *     );
 *   $$);
 */

type Pending = {
  kind: "analytics" | "backup_failed";
  id: string;
  title: string;
  body: Record<string, unknown>;
  fired_at: string;
};

async function postSlack(webhook: string, payload: Pending): Promise<boolean> {
  const text = `:rotating_light: *${payload.kind}* - ${payload.title}\nFired: ${payload.fired_at}\n\`\`\`${JSON.stringify(payload.body, null, 2).slice(0, 2500)}\`\`\``;
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.ok;
}

export const Route = createFileRoute("/api/public/hooks/dispatch-alerts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;

        const webhook = process.env.SLACK_ALERT_WEBHOOK_URL;
        const { data, error } = await supabaseAdmin.rpc("pending_alert_payloads", { _limit: 50 });
        if (error) {
          return new Response(JSON.stringify({ ok: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
        const rows = (data ?? []) as Pending[];

        const analyticsIds: string[] = [];
        const backupIds: string[] = [];
        let delivered = 0;
        let skipped = 0;

        for (const row of rows) {
          let ok = true;
          if (webhook) {
            try {
              ok = await postSlack(webhook, row);
            } catch {
              ok = false;
            }
          } else {
            skipped += 1;
            console.warn(
              "[dispatch-alerts] SLACK_ALERT_WEBHOOK_URL not set; would notify",
              row.title,
            );
          }
          if (ok) {
            delivered += 1;
            if (row.kind === "analytics") analyticsIds.push(row.id);
            else backupIds.push(row.id);
          }
        }

        if (analyticsIds.length) {
          await supabaseAdmin.rpc("mark_alerts_notified", { _ids: analyticsIds });
        }
        if (backupIds.length) {
          await supabaseAdmin.rpc("mark_backup_alerts_notified", { _ids: backupIds });
        }

        return new Response(
          JSON.stringify({
            ok: true,
            found: rows.length,
            delivered,
            skipped,
            webhook_configured: Boolean(webhook),
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
