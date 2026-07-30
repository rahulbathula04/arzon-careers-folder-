import { test, expect } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

/**
 * Logical-failure tests for the Career Engine RPC surface.
 *
 * These run against the live preview Supabase project using the public
 * anon key - every assertion expects the server-side validation in the
 * SECURITY DEFINER functions to reject the bad payload. If any of these
 * stop throwing, the input-validation contract has regressed.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY;

test.describe("Career Engine RPC validation", () => {
  test.skip(!SUPABASE_URL || !SUPABASE_KEY, "Supabase public env vars not set");

  const sb = createClient(SUPABASE_URL!, SUPABASE_KEY!, { auth: { persistSession: false } });

  test("ce_start_session: honeypot rejected", async () => {
    const { error } = await sb.rpc("ce_start_session", {
      p_stream: "comm",
      p_device: "test",
      p_utm_source: "qa",
      p_user_agent: "qa-bot",
      p_honeypot: "i-am-a-bot",
      p_client_fp: "qa-honeypot",
    });
    expect(error).not.toBeNull();
    expect(error!.message).toMatch(/rejected|honeypot/i);
  });

  test("ce_create_lead_early: invalid name/phone/email all rejected", async () => {
    const { data: started, error: startErr } = await sb.rpc("ce_start_session", {
      p_stream: "comm",
      p_device: "test",
      p_utm_source: "qa",
      p_user_agent: "qa-bot-validation",
      p_honeypot: null,
      p_client_fp: `qa-validation-${Date.now()}`,
    });
    expect(startErr).toBeNull();
    const session = (started as Array<{ session_id: string; session_token: string }>)?.[0];
    expect(session?.session_id).toBeTruthy();

    // bad name
    const badName = await sb.rpc("ce_create_lead_early", {
      p_session_id: session.session_id,
      p_name: "x",
      p_phone: "9999999999",
      p_email: "qa@example.com",
      p_whatsapp_optin: true,
      p_session_token: session.session_token,
    });
    expect(badName.error?.message).toMatch(/name/i);

    // bad phone
    const badPhone = await sb.rpc("ce_create_lead_early", {
      p_session_id: session.session_id,
      p_name: "Valid Name",
      p_phone: "123",
      p_email: "qa@example.com",
      p_whatsapp_optin: true,
      p_session_token: session.session_token,
    });
    expect(badPhone.error?.message).toMatch(/phone/i);

    // bad email
    const badEmail = await sb.rpc("ce_create_lead_early", {
      p_session_id: session.session_id,
      p_name: "Valid Name",
      p_phone: "9999999999",
      p_email: "not-an-email",
      p_whatsapp_optin: true,
      p_session_token: session.session_token,
    });
    expect(badEmail.error?.message).toMatch(/email/i);
  });

  test("ce_record_answer: tampered session token rejected", async () => {
    const { data: started, error: startErr } = await sb.rpc("ce_start_session", {
      p_stream: "comm",
      p_device: "test",
      p_utm_source: "qa",
      p_user_agent: "qa-bot-tamper",
      p_honeypot: null,
      p_client_fp: `qa-tamper-${Date.now()}`,
    });
    expect(startErr).toBeNull();
    const session = (started as Array<{ session_id: string; session_token: string }>)?.[0];

    const { error } = await sb.rpc("ce_record_answer", {
      p_session_id: session.session_id,
      p_question_id: "stream",
      p_answer: "comm",
      p_session_token: "not-the-real-token-1234567890",
    });
    expect(error).not.toBeNull();
    expect(error!.message).toMatch(/session auth failed/i);
  });

  test("ce_record_answer: invalid question_id rejected", async () => {
    const { data: started } = await sb.rpc("ce_start_session", {
      p_stream: "comm",
      p_device: "test",
      p_utm_source: "qa",
      p_user_agent: "qa-bot-qid",
      p_honeypot: null,
      p_client_fp: `qa-qid-${Date.now()}`,
    });
    const session = (started as Array<{ session_id: string; session_token: string }>)?.[0];
    const longQid = "x".repeat(65);
    const { error } = await sb.rpc("ce_record_answer", {
      p_session_id: session.session_id,
      p_question_id: longQid,
      p_answer: "yes",
      p_session_token: session.session_token,
    });
    expect(error?.message).toMatch(/invalid question_id/i);
  });
});
