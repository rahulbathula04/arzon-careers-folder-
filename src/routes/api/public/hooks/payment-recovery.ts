import { createFileRoute } from "@tanstack/react-router";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";
import { verifyHookSecret } from "@/lib/hook-auth.server";

/**
 * Payment-failure recovery worker. Called by pg_cron every 5 min.
 * Picks due rows from payment_recovery_queue, generates a WhatsApp
 * deep-link with a fresh payment link, and logs the attempt to both
 * application_events and counsellor_leads.recovery_attempts.
 *
 * Authentication: `verifyHookSecret` — shared HOOK_SECRET header pattern
 * used by every other /api/public/hooks/* endpoint. The anon key MUST NOT
 * be used to gate this endpoint (it is publishable and would allow anyone
 * to trigger payment recovery + WhatsApp fanout).
 *
 * Delivery: this iteration writes the wa.me link into the audit log so
 * the on-duty counsellor can click and send. When a WhatsApp Business
 * API connector is added later, the SEND_VIA_WHATSAPP_API block below
 * is the single integration point.
 */

const RAZORPAY_PAYMENT_LINK = "https://rzp.io/rzp/rTrWHwjx";
const ATTEMPT_BACKOFF_MS = [
  5 * 60_000, // attempt 1: +5 min after failure
  2 * 60 * 60_000, // attempt 2: +2 h
  24 * 60 * 60_000, // attempt 3: +24 h
];

type QueueRow = {
  id: string;
  application_id: string;
  status: string;
  attempts: number;
  max_attempts: number;
};

type AppRow = {
  id: string;
  name: string | null;
  phone: string | null;
  program_slug: string | null;
  program_name: string | null;
  lead_id: string | null;
};

function buildRecoveryLink(applicationId: string): string {
  // Hosted Razorpay link is shared across apps; we tag the app_id in the
  // wa.me message so reconciliation back to the application_id is trivial.
  return `${RAZORPAY_PAYMENT_LINK}?ref=${encodeURIComponent(applicationId.slice(0, 8))}`;
}

function buildWhatsAppDeepLink(
  applicantPhone: string | null,
  program: string,
  link: string,
): string {
  const msg =
    `Hi! Your seat reservation payment for ${program} didn't complete. ` +
    `Here's a fresh secure payment link to finish: ${link} ` +
    `Any trouble, reply to this message and we'll help.`;
  const num = (applicantPhone ?? COUNSELLOR_PHONE).replace(/\D/g, "");
  const target = num.length === 10 ? `91${num}` : num;
  return `https://wa.me/${target}?text=${encodeURIComponent(msg)}`;
}

export const Route = createFileRoute("/api/public/hooks/payment-recovery")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = supabaseAdmin as any;

        // 1. Mark any queue rows whose application has since been paid
        //    as completed so we don't message users who already finished.
        const { data: paidEvents } = await sb
          .from("analytics_events")
          .select("application_id")
          .eq("event_name", "payment_success")
          .not("application_id", "is", null)
          .gte("created_at", new Date(Date.now() - 48 * 60 * 60_000).toISOString())
          .limit(500);
        const paidIds: string[] = Array.from(
          new Set(
            (paidEvents ?? [])
              .map((r: { application_id: string }) => r.application_id)
              .filter(Boolean),
          ),
        );
        if (paidIds.length) {
          await sb
            .from("payment_recovery_queue")
            .update({ status: "completed" })
            .in("application_id", paidIds)
            .in("status", ["pending", "sent"]);
        }

        // 2. Fetch due rows.
        const { data: due, error: dueErr } = await sb
          .from("payment_recovery_queue")
          .select("id, application_id, status, attempts, max_attempts")
          .eq("status", "pending")
          .lte("next_send_at", new Date().toISOString())
          .order("next_send_at", { ascending: true })
          .limit(25);
        if (dueErr) {
          return Response.json({ ok: false, error: String(dueErr) }, { status: 500 });
        }
        const queue = (due ?? []) as QueueRow[];
        if (queue.length === 0) {
          return Response.json({ ok: true, processed: 0 });
        }

        // 3. Fetch application + lead details in bulk.
        const appIds = queue.map((q) => q.application_id);
        const { data: apps } = await sb
          .from("applications")
          .select("id, name, phone, program_slug, program_name, lead_id")
          .in("id", appIds);
        const appById = new Map<string, AppRow>();
        for (const a of (apps ?? []) as AppRow[]) appById.set(a.id, a);

        let processed = 0;
        for (const row of queue) {
          const app = appById.get(row.application_id);
          if (!app) {
            await sb
              .from("payment_recovery_queue")
              .update({ status: "cancelled", last_error: "application_not_found" })
              .eq("id", row.id);
            continue;
          }

          const attemptIdx = row.attempts; // 0-based
          const link = buildRecoveryLink(app.id);
          const program = app.program_name ?? app.program_slug ?? "your programme";
          const waLink = buildWhatsAppDeepLink(app.phone, program, link);

          // SEND_VIA_WHATSAPP_API:
          // Future integration point. For now we log the wa.me link to the
          // counsellor audit trail so a human can send it from the admin UI.
          const sentAt = new Date().toISOString();
          const channel = "wa_deep_link";

          // Log to application_events. Schema only has event_type + note;
          // we serialize metadata into note as JSON.
          await sb.from("application_events").insert({
            application_id: app.id,
            event_type: "payment_recovery_sent",
            note: JSON.stringify({ attempt: attemptIdx + 1, channel, link, wa_link: waLink }),
          });

          // Append to lead.recovery_attempts (jsonb array). Best-effort.
          if (app.lead_id) {
            const { data: lead } = await sb
              .from("counsellor_leads")
              .select("recovery_attempts")
              .eq("id", app.lead_id)
              .maybeSingle();
            const prior = Array.isArray(lead?.recovery_attempts) ? lead!.recovery_attempts : [];
            const next = [
              ...prior,
              { attempt: attemptIdx + 1, channel, sent_at: sentAt, link, wa_link: waLink },
            ];
            await sb
              .from("counsellor_leads")
              .update({ recovery_attempts: next })
              .eq("id", app.lead_id);
          }

          // Schedule next attempt or mark exhausted.
          const nextAttempt = attemptIdx + 1;
          if (nextAttempt >= row.max_attempts) {
            await sb
              .from("payment_recovery_queue")
              .update({
                status: "sent",
                attempts: nextAttempt,
                last_channel: channel,
              })
              .eq("id", row.id);
          } else {
            const offset =
              ATTEMPT_BACKOFF_MS[nextAttempt] ?? ATTEMPT_BACKOFF_MS[ATTEMPT_BACKOFF_MS.length - 1]!;
            await sb
              .from("payment_recovery_queue")
              .update({
                attempts: nextAttempt,
                last_channel: channel,
                next_send_at: new Date(Date.now() + offset).toISOString(),
              })
              .eq("id", row.id);
          }
          processed++;
        }

        return Response.json({ ok: true, processed });
      },
    },
  },
});
