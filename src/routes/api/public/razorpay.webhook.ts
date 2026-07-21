import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/razorpay/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) {
          return new Response("not_configured", { status: 500 });
        }

        const signature = request.headers.get("x-razorpay-signature");
        const raw = await request.text();
        if (!signature || raw.length === 0 || raw.length > 100_000) {
          return new Response("bad_request", { status: 400 });
        }

        const expected = createHmac("sha256", secret).update(raw).digest("hex");
        const a = Buffer.from(expected, "utf8");
        const b = Buffer.from(signature, "utf8");
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          return new Response("invalid_signature", { status: 401 });
        }

        type PaymentEntity = {
          id?: string;
          order_id?: string;
          status?: string;
          error_code?: string;
          error_description?: string;
          error_reason?: string;
          notes?: { intent_id?: string };
        };
        let payload: {
          id?: string;
          event?: string;
          payload?: { payment?: { entity?: PaymentEntity } };
        };
        try {
          payload = JSON.parse(raw);
        } catch {
          return new Response("bad_json", { status: 400 });
        }

        const ent = payload.payload?.payment?.entity;
        const intentId = ent?.notes?.intent_id;
        const paymentId = ent?.id;
        const orderId = ent?.order_id;

        // Replay protection: dedupe by Razorpay event id (falls back to payment id
        // for older payloads). First write wins via unique (provider, event_id);
        // any duplicate webhook short-circuits with 200 so Razorpay stops retrying.
        const eventId = payload.id ?? paymentId ?? null;
        if (eventId) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { error: dupErr } = await (supabaseAdmin as any)
            .from("webhook_events")
            .insert({ provider: "razorpay", event_id: eventId, event_type: payload.event ?? null });
          if (dupErr) {
            // 23505 = unique_violation → already processed, ack and exit.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((dupErr as any).code === "23505") {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await (supabaseAdmin as any).from("analytics_events").insert({
                event_name: "seat_claim_skipped_duplicate",
                props: {
                  provider: "razorpay",
                  event_id: eventId,
                  event_type: payload.event ?? null,
                  payment_id: paymentId ?? null,
                  intent_id: intentId ?? null,
                },
              });
              return new Response("duplicate", { status: 200 });
            }
            console.error("[razorpay webhook] dedupe insert", dupErr);
            return new Response("db_error", { status: 500 });
          }
        }

        if (payload.event === "payment.captured" || payload.event === "payment.authorized") {
          if (intentId && paymentId && orderId) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabaseAdmin as any).rpc("mark_enrolment_paid_with_payment", {
              p_intent_id: intentId,
              p_payment_id: paymentId,
              p_order_id: orderId,
            });
            if (error) {
              console.error("[razorpay webhook] mark_paid", error);
              return new Response("db_error", { status: 500 });
            }
            // Mark the readiness funnel row as paid so the admin conversion
            // view can report the test → paid timeline. Looked up via the
            // enrolment intent's lead_id (we don't store the readiness
            // session_id on the intent). Best-effort — never fail the webhook
            // on telemetry issues.
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const { data: intentRow } = await (supabaseAdmin as any)
                .from("enrolment_intents")
                .select("lead_id, final_price_inr")
                .eq("id", intentId)
                .maybeSingle();
              const leadId = intentRow?.lead_id ?? null;
              const amountInr = intentRow?.final_price_inr ?? null;
              if (leadId) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (supabaseAdmin as any).rpc("mark_readiness_paid_by_lead", {
                  _lead_id: leadId,
                  _amount_inr: amountInr,
                });
              }
            } catch (rjErr) {
              console.warn("[razorpay webhook] readiness_journey paid update", rjErr);
            }
            // Best-effort: atomically increment seats_taken for the active
            // cohort. The RPC is idempotent-per-payment (unique
            // claimed_by_payment_id), so duplicate webhooks won't double-claim.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error: seatErr } = await (supabaseAdmin as any).rpc("cohort_claim_seat", {
              p_cohort_id: "aug-2026",
              p_payment_id: paymentId,
              p_intent_id: intentId,
            });
            if (seatErr) {
              console.error("[razorpay webhook] cohort_claim_seat", seatErr);
              // Don't fail the webhook on seat-claim issues — payment is the
              // source of truth and admins can reconcile from the audit log.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await (supabaseAdmin as any).from("analytics_events").insert({
                event_name: "seat_claim_error",
                props: {
                  provider: "razorpay",
                  event_id: eventId,
                  payment_id: paymentId,
                  intent_id: intentId,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  error_code: (seatErr as any)?.code ?? null,
                  error_message: seatErr.message ?? null,
                },
              });
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await (supabaseAdmin as any).from("analytics_events").insert({
                event_name: "seat_claim_succeeded",
                props: {
                  provider: "razorpay",
                  cohort_id: "aug-2026",
                  event_id: eventId,
                  payment_id: paymentId,
                  intent_id: intentId,
                },
              });
            }

            // Auto-provision the learner: create an `enrolments` row and
            // invite the buyer by email so they can claim their /app account.
            // Both steps are idempotent — safe on webhook retries.
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const { data: provRows, error: provErr } = await (supabaseAdmin as any).rpc(
                "provision_enrolment_from_intent",
                { p_intent_id: intentId, p_cohort_id: "aug-2026" },
              );
              if (provErr) {
                console.error("[razorpay webhook] provision", provErr);
              } else {
                const prov = Array.isArray(provRows) ? provRows[0] : provRows;
                if (prov?.created && prov?.user_email) {
                  const { error: inviteErr } = await (
                    supabaseAdmin as any
                  ).auth.admin.inviteUserByEmail(prov.user_email, {
                    data: { source: "razorpay_webhook", intent_id: intentId },
                    redirectTo: `${process.env.SITE_ORIGIN ?? "https://arzoncareers.in"}/app`,
                  });
                  // 422 = user already exists → benign, they'll sign in normally
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  if (inviteErr && (inviteErr as any).status !== 422) {
                    console.warn("[razorpay webhook] invite", inviteErr);
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  await (supabaseAdmin as any).from("analytics_events").insert({
                    event_name: "learner_provisioned",
                    props: {
                      intent_id: intentId,
                      enrolment_id: prov.enrolment_id,
                      email: prov.user_email,
                      invited: !inviteErr,
                    },
                  });
                }
              }
            } catch (provFatal) {
              console.error("[razorpay webhook] provision fatal", provFatal);
            }
          }
        } else if (payload.event === "payment.failed") {
          if (intentId) {
            const reason =
              ent?.error_description ?? ent?.error_reason ?? ent?.error_code ?? "payment_failed";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabaseAdmin as any).rpc("mark_enrolment_failed", {
              p_intent_id: intentId,
              p_order_id: orderId ?? null,
              p_payment_id: paymentId ?? null,
              p_reason: reason,
            });
            if (error) {
              console.error("[razorpay webhook] mark_failed", error);
              return new Response("db_error", { status: 500 });
            }
          }
        }

        return new Response("ok");
      },
    },
  },
});
