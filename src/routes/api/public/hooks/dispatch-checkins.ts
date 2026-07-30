import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { verifyHookSecret } from "@/lib/hook-auth.server";

/**
 * Retention check-in dispatcher (Wave 2).
 *
 * 1. enqueue_retention_checkins() - generates 30/90/180/365-day check-in
 *    rows for every outcome that has reached chose_role / in_role. Idempotent
 *    via UNIQUE(outcome_id, checkin_type).
 * 2. claim_due_retention_checkins(limit) - atomically marks due rows as sent
 *    and returns them so concurrent dispatchers can't double-send.
 * 3. For each claimed row we send an email (no-op if RESEND_API_KEY unset).
 *
 * Schedule via pg_cron daily - see supabase--insert call from the implementer.
 */

type Claimed = {
  id: string;
  outcome_id: string;
  checkin_type: string;
  token: string;
  due_at: string;
  user_email: string | null;
  recommended_family_id: string | null;
  chosen_role_slug: string | null;
};

const CHECKIN_COPY: Record<string, { subject: string; body: string }> = {
  "30d": {
    subject: "Quick 1-question check-in from Arzon Careers",
    body: "It's been a month since you started tracking your role - are you still in it?",
  },
  "90d": {
    subject: "90 days in - still in role?",
    body: "Three months in. Are you still in the role you chose?",
  },
  "180d": {
    subject: "Halfway through year one",
    body: "Six months in. Are you still in the role you chose?",
  },
  "365d": {
    subject: "One year on - quick update?",
    body: "A year in. Are you still in the role you chose?",
  },
};

async function sendCheckinEmail(row: Claimed, origin: string): Promise<boolean> {
  if (!row.user_email) return true; // nothing to send; still mark sent
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(
      "[dispatch-checkins] would email",
      row.user_email,
      row.checkin_type,
      `${origin}/checkin/${row.token}`,
    );
    return true;
  }
  const copy = CHECKIN_COPY[row.checkin_type] ?? CHECKIN_COPY["30d"];
  const link = `${origin}/checkin/${row.token}`;
  const html = `<p>${copy.body}</p><p><a href="${link}">Yes, still in role</a> &middot; <a href="${link}?left=1">No, I left</a></p>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: "Arzon Careers <hello@arzoncareers.in>",
      to: [row.user_email],
      subject: copy.subject,
      html,
    }),
  });
  return res.ok;
}

export const Route = createFileRoute("/api/public/hooks/dispatch-checkins")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;

        const origin = process.env.PUBLIC_SITE_ORIGIN ?? "https://arzoncareers.in";

        const { data: enqueued, error: enqErr } = await supabaseAdmin.rpc(
          "enqueue_retention_checkins",
        );
        if (enqErr) {
          return new Response(
            JSON.stringify({ ok: false, stage: "enqueue", error: enqErr.message }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        const { data: claimedRows, error: claimErr } = await supabaseAdmin.rpc(
          "claim_due_retention_checkins",
          { p_limit: 100 },
        );
        if (claimErr) {
          return new Response(
            JSON.stringify({ ok: false, stage: "claim", error: claimErr.message }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
        const rows = (claimedRows ?? []) as Claimed[];

        let delivered = 0;
        let failed = 0;
        const failedIds: string[] = [];
        for (const row of rows) {
          try {
            const ok = await sendCheckinEmail(row, origin);
            if (ok) delivered += 1;
            else {
              failed += 1;
              failedIds.push(row.id);
            }
          } catch {
            failed += 1;
            failedIds.push(row.id);
          }
        }

        // Rollback sent_at on failures so the next run retries them.
        if (failedIds.length) {
          await supabaseAdmin
            .from("retention_checkins")
            .update({ sent_at: null })
            .in("id", failedIds);
        }

        return new Response(
          JSON.stringify({ ok: true, enqueued, claimed: rows.length, delivered, failed }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
