import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { z } from "zod";

const bodySchema = z.object({
  intent_id: z.string().uuid(),
  razorpay_order_id: z.string().min(4).max(64),
  razorpay_payment_id: z.string().min(4).max(64),
  razorpay_signature: z.string().min(8).max(256),
});

export const Route = createFileRoute("/api/public/razorpay/verify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) {
          return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
        }

        let parsed;
        try {
          const json = await request.json();
          parsed = bodySchema.parse(json);
        } catch {
          try {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

            await (supabaseAdmin as any).rpc("track_event", {
              p_event_name: "razorpay_verify_failed",
              p_props: { reason: "bad_request" },
            });
          } catch {
            /* noop */
          }
          return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
        }

        const expected = createHmac("sha256", keySecret)
          .update(`${parsed.razorpay_order_id}|${parsed.razorpay_payment_id}`)
          .digest("hex");

        const a = Buffer.from(expected, "utf8");
        const b = Buffer.from(parsed.razorpay_signature, "utf8");
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          try {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

            await (supabaseAdmin as any).rpc("track_event", {
              p_event_name: "razorpay_verify_failed",
              p_props: {
                reason: "invalid_signature",
                intent_id: parsed.intent_id,
                order_id: parsed.razorpay_order_id,
                payment_id: parsed.razorpay_payment_id,
              },
            });
          } catch {
            /* noop */
          }
          return Response.json({ ok: false, error: "invalid_signature" }, { status: 401 });
        }

        // Load privileged client lazily so this server-only module never
        // ships into a client bundle through this route file.
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error } = await (supabaseAdmin as any).rpc("mark_enrolment_paid_with_payment", {
          p_intent_id: parsed.intent_id,
          p_payment_id: parsed.razorpay_payment_id,
          p_order_id: parsed.razorpay_order_id,
        });
        if (error) {
          console.error("[razorpay verify] mark_paid", error);
          try {
            await (supabaseAdmin as any).rpc("track_event", {
              p_event_name: "razorpay_verify_failed",
              p_props: {
                reason: "db_error",
                intent_id: parsed.intent_id,
                order_id: parsed.razorpay_order_id,
                payment_id: parsed.razorpay_payment_id,
                message: String(error.message ?? error).slice(0, 240),
              },
            });
          } catch {
            /* noop */
          }
          return Response.json({ ok: false, error: "db_error" }, { status: 500 });
        }

        // Funnel: write a canonical `payment_success` row to analytics_events
        // so dashboards can compute test → lead → payment conversion from a
        // single table. Idempotent: a Razorpay webhook + browser redirect
        // can both hit verify with the same payment_id; we only record one
        // payment_success per intent_id.
        try {
          const { data: existing } = await (supabaseAdmin as any)
            .from("analytics_events")
            .select("id")
            .eq("event_name", "payment_success")
            .contains("props", { intent_id: parsed.intent_id })
            .limit(1);
          if (!existing || existing.length === 0) {
            await (supabaseAdmin as any).rpc("track_event", {
              p_event_name: "payment_success",
              p_props: {
                intent_id: parsed.intent_id,
                order_id: parsed.razorpay_order_id,
                payment_id: parsed.razorpay_payment_id,
                provider: "razorpay",
              },
            });
          }
        } catch (e) {
          console.warn("[razorpay verify] payment_success track_event failed", e);
        }

        // Close the A/B funnel: tag the paid event with the variant the
        // visitor saw on the curriculum page. We stored those on the
        // intent at submit time, so this is a one-row lookup + two inserts.
        try {
          const { data: intent } = await (supabaseAdmin as any)
            .from("enrolment_intents")
            .select("exp_uid, variant_layout, variant_cta, course_slug")
            .eq("id", parsed.intent_id)
            .maybeSingle();
          if (intent?.exp_uid) {
            const rows = [
              {
                experiment: "curriculum_layout_v1",
                variant: intent.variant_layout ?? "control",
              },
              {
                experiment: "cta_timing_v1",
                variant: intent.variant_cta ?? "control",
              },
            ].flatMap((e) => [
              {
                uid: intent.exp_uid,
                experiment: e.experiment,
                variant: e.variant,
                event: "razorpay_success",
                course_slug: intent.course_slug ?? null,
                props: { intent_id: parsed.intent_id, order_id: parsed.razorpay_order_id },
              },
              {
                uid: intent.exp_uid,
                experiment: e.experiment,
                variant: e.variant,
                event: "enrolment_paid",
                course_slug: intent.course_slug ?? null,
                props: { intent_id: parsed.intent_id, order_id: parsed.razorpay_order_id },
              },
            ]);
            await (supabaseAdmin as any).from("experiment_events").insert(rows);
          }
        } catch (e) {
          console.warn("[razorpay verify] experiment event log failed", e);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
