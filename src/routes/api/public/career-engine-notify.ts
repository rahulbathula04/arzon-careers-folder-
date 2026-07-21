import * as React from "react";
import { render as renderAsync } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { TEMPLATES } from "@/lib/email-templates/registry";
import { verifyHookSecret } from "@/lib/hook-auth.server";

const SITE_NAME = "arzoncareers";
const SENDER_DOMAIN = "info.arzoncareers.in";
const FROM_DOMAIN = "info.arzoncareers.in";
const TEMPLATE_NAME = "career-engine-result";

const Schema = z.object({
  leadId: z.string().uuid(),
});

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const Route = createFileRoute("/api/public/career-engine-notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        // Server-side: read the non-prefixed env var. VITE_-prefixed values
        // are baked into the client bundle and must not be referenced here.
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        const { leadId } = parsed.data;

        const supabase: any = createClient(supabaseUrl, supabaseServiceKey);

        // Uniform response envelope — never disclose whether the lead exists,
        // is unfinalized, or is already queued. This eliminates the UUID oracle
        // an attacker could otherwise use to enumerate valid lead IDs.
        const ack = () => Response.json({ success: true, accepted: true }, { status: 202 });

        // Fetch the lead row directly (service role bypasses RLS)
        const { data: lead, error: leadErr } = await supabase
          .from("career_engine_leads")
          .select("*")
          .eq("id", leadId)
          .maybeSingle();

        if (leadErr || !lead) {
          return ack();
        }
        if (!lead.archetype || !lead.result_payload) {
          return ack();
        }

        const template = TEMPLATES[TEMPLATE_NAME];
        if (!template) {
          console.error("[career-engine-notify] template misconfigured");
          return ack();
        }
        const recipientRaw = (lead.email || "").trim();
        if (!recipientRaw || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(recipientRaw)) {
          return ack();
        }
        const recipient = recipientRaw;
        const normalizedEmail = recipient.toLowerCase();

        // Idempotency: skip if we've already enqueued/sent for this lead
        const idempotencyKey = `career-engine-result-${leadId}`;
        const { data: existing } = await supabase
          .from("email_send_log")
          .select("id, status")
          .eq("template_name", TEMPLATE_NAME)
          .eq("recipient_email", recipient)
          .contains("metadata", { lead_id: leadId } as any)
          .limit(1)
          .maybeSingle();
        if (existing) {
          return ack();
        }

        // Build template props from lead row
        const rp = (lead.result_payload || {}) as any;
        const archetype = rp.archetype || {};
        const props = {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          whatsappOptin: lead.whatsapp_optin,
          archetypeName: archetype.name,
          archetypeTagline: archetype.tagline,
          archetypeEmoji: archetype.emoji,
          fitScore: lead.fit_score,
          topPaths: lead.top_paths,
          ranking: rp.ranking,
          notFit: rp.notFit,
          confidence: rp.confidence,
          confidenceBand: rp.confidenceBand,
          microAccuracy: rp.microAccuracy,
          risks: rp.risks,
          notFitReasons: rp.notFitReasons,
          breakdown: rp.breakdown,
          traitScores: rp.traitScores,
          evidence: rp.evidence,
          resultMeta: rp.resultMeta,
          cohortId: lead.cohort_id,
          leadId: lead.id,
          sessionId: lead.session_id,
          submittedAt: lead.created_at,
        };

        // Ensure unsubscribe token exists for the fixed recipient
        let unsubscribeToken = "";
        const { data: existingToken } = await supabase
          .from("email_unsubscribe_tokens")
          .select("token, used_at")
          .eq("email", normalizedEmail)
          .maybeSingle();
        if (existingToken && !existingToken.used_at) {
          unsubscribeToken = existingToken.token;
        } else if (!existingToken) {
          unsubscribeToken = generateToken();
          await supabase
            .from("email_unsubscribe_tokens")
            .upsert(
              { token: unsubscribeToken, email: normalizedEmail },
              { onConflict: "email", ignoreDuplicates: true },
            );
          const { data: stored } = await supabase
            .from("email_unsubscribe_tokens")
            .select("token")
            .eq("email", normalizedEmail)
            .maybeSingle();
          unsubscribeToken = stored?.token || unsubscribeToken;
        } else {
          // Token used → recipient unsubscribed; abort.
          return ack();
        }

        // Render template
        const element = React.createElement(template.component, props);
        const html = await renderAsync(element);
        const plainText = await renderAsync(element, { plainText: true });
        const subject =
          typeof template.subject === "function" ? template.subject(props) : template.subject;

        const messageId = crypto.randomUUID();

        await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
          recipient_email: recipient,
          status: "pending",
          metadata: { lead_id: leadId },
        });

        const { error: enqueueError } = await supabase.rpc("enqueue_email", {
          queue_name: "transactional_emails",
          payload: {
            message_id: messageId,
            to: recipient,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html,
            text: plainText,
            purpose: "transactional",
            label: TEMPLATE_NAME,
            idempotency_key: idempotencyKey,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        });

        if (enqueueError) {
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: recipient,
            status: "failed",
            error_message: "Failed to enqueue email",
            metadata: { lead_id: leadId },
          });
          return ack();
        }

        return ack();
      },
    },
  },
});
