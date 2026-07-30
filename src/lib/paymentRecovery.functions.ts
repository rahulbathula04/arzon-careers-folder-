import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Enqueue a payment-failure recovery job. Public (called from the success
 * page on ?status=failed). The cron worker at
 * /api/public/hooks/payment-recovery picks it up and sends the user a
 * fresh payment link via WhatsApp / counsellor handoff.
 *
 * Idempotent per application_id while a row is still pending/sent -
 * upserts attempts rather than enqueueing twice.
 */
const Input = z.object({
  applicationId: z.string().uuid(),
  reason: z.string().max(64).optional(),
});

export const enqueuePaymentRecovery = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const sb = supabaseAdmin as unknown as {
      from: (t: string) => {
        select: (s: string) => {
          eq: (
            k: string,
            v: string,
          ) => {
            in: (
              k: string,
              v: string[],
            ) => {
              maybeSingle: () => Promise<{ data: { id: string } | null; error: unknown }>;
            };
          };
        };
        insert: (row: Record<string, unknown>) => Promise<{ error: unknown }>;
      };
    };

    try {
      const existing = await sb
        .from("payment_recovery_queue")
        .select("id")
        .eq("application_id", data.applicationId)
        .in("status", ["pending", "sent"])
        .maybeSingle();
      if (existing.data?.id) return { ok: true, enqueued: false };

      // First attempt fires 5 min after failure to give the user a window
      // to retry on their own first.
      const nextSendAt = new Date(Date.now() + 5 * 60_000).toISOString();
      const ins = await sb.from("payment_recovery_queue").insert({
        application_id: data.applicationId,
        status: "pending",
        attempts: 0,
        next_send_at: nextSendAt,
        last_error: data.reason ?? null,
      });
      if (ins.error) {
        console.error("[recovery] enqueue failed", ins.error);
        return { ok: false };
      }
      return { ok: true, enqueued: true };
    } catch (err) {
      console.error("[recovery] enqueue exception", err);
      return { ok: false };
    }
  });
