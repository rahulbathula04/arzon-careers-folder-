import { test, expect } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

/**
 * Logical-failure tests for the enrolment / coupon / payment RPCs.
 * Every assertion below expects server-side validation to reject the
 * payload. If any stops throwing, the validation contract regressed.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY;

test.describe("Enrolment RPC validation", () => {
  test.skip(!SUPABASE_URL || !SUPABASE_KEY, "Supabase public env vars not set");

  const sb = createClient(SUPABASE_URL!, SUPABASE_KEY!, { auth: { persistSession: false } });

  test("create_enrolment_intent: public callers cannot supply pricing", async () => {
    const result = await sb.rpc("create_enrolment_intent", {
      p_tier: "career",
      p_name: "QA Bot",
      p_email: `qa+${Date.now()}@example.com`,
      p_phone: "9999999999",
      p_city: "Bengaluru",
      p_background: "MSc",
      p_base_price_inr: 1,
      p_lead_id: null,
      p_utm_source: "qa",
      p_user_agent: "qa-bot",
    });
    expect(result.data).toBeNull();
    expect(result.error).toBeTruthy();
    expect(result.error?.message).toMatch(/function|permission|does not exist/i);
  });

  test("payment finalization RPC is not callable by public roles", async () => {
    const result = await sb.rpc("mark_enrolment_paid_with_payment", {
      p_intent_id: "00000000-0000-4000-8000-000000000001",
      p_payment_id: "pay_qa_dummy",
      p_order_id: "order_qa_dummy",
      p_amount_paise: 1,
      p_currency: "INR",
    });
    expect(result.data).toBeNull();
    expect(result.error).toBeTruthy();
    expect(result.error?.message).toMatch(/function|permission|does not exist/i);
  });

  test("apply_enrolment_coupon: wrong tier rejected, bad token rejected", async () => {
    const { data: created, error } = await sb.rpc("create_enrolment_intent", {
      p_tier: "essential",
      p_name: "QA Bot",
      p_email: `qa+${Date.now()}@example.com`,
      p_phone: "9999999999",
      p_city: "Bengaluru",
      p_background: "MSc",
      p_lead_id: null,
      p_utm_source: "qa",
      p_user_agent: "qa-bot",
    });
    expect(error).toBeNull();
    const intent = (created as Array<{ id: string; intent_token: string }>)?.[0];
    expect(intent?.id).toBeTruthy();

    // bad token
    const bad = await sb.rpc("apply_enrolment_coupon", {
      p_intent_id: intent.id,
      p_code: "ARZONPRIME60",
      p_intent_token: "wrong-token-but-long-enough-1234",
    });
    expect(bad.error?.message).toMatch(/intent auth failed/i);

    // unknown coupon
    const unknown = await sb.rpc("apply_enrolment_coupon", {
      p_intent_id: intent.id,
      p_code: "NOTACODE",
      p_intent_token: intent.intent_token,
    });
    expect(unknown.error?.message).toMatch(/invalid coupon/i);
  });

  test("mark_enrolment_paid_with_payment: order/intent mismatch rejected", async () => {
    const { data: created } = await sb.rpc("create_enrolment_intent", {
      p_tier: "essential",
      p_name: "QA Bot",
      p_email: `qa+pay${Date.now()}@example.com`,
      p_phone: "9999999999",
      p_city: "Bengaluru",
      p_background: "MSc",
      p_lead_id: null,
      p_utm_source: "qa",
      p_user_agent: "qa-bot",
    });
    const intent = (created as Array<{ id: string; intent_token: string }>)?.[0];
    const mismatch = await sb.rpc("mark_enrolment_paid_with_payment", {
      p_intent_id: intent?.id ?? "00000000-0000-4000-8000-000000000001",
      p_payment_id: "pay_qa_dummy",
      p_order_id: "order_qa_does_not_match",
      p_amount_paise: 1,
      p_currency: "INR",
    });
    expect(mismatch.error?.message).toMatch(/order\/intent mismatch/i);
  });
});
