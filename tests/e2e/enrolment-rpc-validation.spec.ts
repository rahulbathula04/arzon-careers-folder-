import { test, expect } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

/**
 * Public-role payment boundary tests.
 * Privileged enrolment/payment RPCs must never be callable with the publishable key.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY;

test.describe("Enrolment payment RPC boundary", () => {
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

  test("payment finalization: public callers cannot mark an intent paid", async () => {
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
});
