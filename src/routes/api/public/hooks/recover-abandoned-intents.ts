import * as React from "react";
import { render as renderAsync } from "@react-email/components";
import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { verifyHookSecret } from "@/lib/hook-auth.server";
import { TEMPLATES } from "@/lib/email-templates/registry";
import { TIER_META, isTier } from "@/data/enrolmentTiers";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";

const SITE_NAME = "arzoncareers";
const SENDER_DOMAIN = "info.arzoncareers.in";
const FROM_DOMAIN = "info.arzoncareers.in";
const SITE_ORIGIN = "https://arzoncareers.in";
const WHATSAPP_URL = `https://wa.me/${COUNSELLOR_PHONE}`;

// Only nudge intents that have been stuck for at least this long.
const MIN_AGE_MINUTES = 30;
// Don't nudge intents older than 24h — at that point the seat is auto-released.
const MAX_AGE_HOURS = 24;
const BATCH_LIMIT = 50;

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function formatInr(paise: number | null | undefined): string | undefined {
  if (!paise && paise !== 0) return undefined;
  return `₹${paise.toLocaleString("en-IN")}`;
}

async function ensureUnsubscribeToken(email: string): Promise<string | null> {
  const normalized = email.toLowerCase();
  const { data: existing } = await supabaseAdmin
    .from("email_unsubscribe_tokens")
    .select("token, used_at")
    .eq("email", normalized)
    .maybeSingle();

  if (existing?.token && !existing.used_at) return existing.token;
  if (existing?.used_at) return null; // already unsubscribed

  const token = generateToken();
  await supabaseAdmin
    .from("email_unsubscribe_tokens")
    .upsert({ token, email: normalized }, { onConflict: "email", ignoreDuplicates: true });

  const { data: stored } = await supabaseAdmin
    .from("email_unsubscribe_tokens")
    .select("token")
    .eq("email", normalized)
    .maybeSingle();
  return stored?.token ?? null;
}

export const Route = createFileRoute("/api/public/hooks/recover-abandoned-intents")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        try {
          const minAgeIso = new Date(Date.now() - MIN_AGE_MINUTES * 60_000).toISOString();
          const maxAgeIso = new Date(Date.now() - MAX_AGE_HOURS * 3_600_000).toISOString();

          const { data: intents, error } = await supabaseAdmin
            .from("enrolment_intents")
            .select("id, tier, name, email, status, base_price_inr, final_price_inr, created_at")
            .is("paid_at", null)
            .is("recovery_email_sent_at", null)
            .in("status", ["started", "coupon_applied"])
            .lte("created_at", minAgeIso)
            .gte("created_at", maxAgeIso)
            .order("created_at", { ascending: true })
            .limit(BATCH_LIMIT);

          if (error) {
            console.error("recover-abandoned-intents: select failed", error);
            return Response.json({ error: error.message }, { status: 500 });
          }

          const template = TEMPLATES["enrolment-recovery"];
          if (!template) {
            return Response.json({ error: "template not registered" }, { status: 500 });
          }

          let queued = 0;
          let skipped = 0;

          for (const row of intents ?? []) {
            if (!row.email || !row.tier) {
              skipped++;
              continue;
            }

            // Skip suppressed recipients
            const { data: sup } = await supabaseAdmin
              .from("suppressed_emails")
              .select("id")
              .eq("email", row.email.toLowerCase())
              .maybeSingle();
            if (sup) {
              skipped++;
              await supabaseAdmin
                .from("enrolment_intents")
                .update({ recovery_email_sent_at: new Date().toISOString() })
                .eq("id", row.id);
              continue;
            }

            const tierMeta = isTier(row.tier) ? TIER_META[row.tier] : undefined;
            const tierLabel = tierMeta?.name ?? "your Arzon Global cohort";
            const finalPriceLabel = formatInr(row.final_price_inr) ?? formatInr(row.base_price_inr);
            const resumeUrl = `${SITE_ORIGIN}/enrol/${row.tier}/pay?intent=${row.id}`;

            const templateData = {
              name: row.name ?? undefined,
              tierLabel,
              finalPriceLabel,
              resumeUrl,
              whatsappUrl: WHATSAPP_URL,
            };

            const element = React.createElement(template.component, templateData);
            const html = await renderAsync(element);
            const plainText = await renderAsync(element, { plainText: true });
            const subject =
              typeof template.subject === "function"
                ? template.subject(templateData)
                : template.subject;

            const unsubscribeToken = await ensureUnsubscribeToken(row.email);
            if (!unsubscribeToken) {
              // Already unsubscribed — mark sent so we don't keep retrying.
              await supabaseAdmin
                .from("enrolment_intents")
                .update({ recovery_email_sent_at: new Date().toISOString() })
                .eq("id", row.id);
              skipped++;
              continue;
            }

            const messageId = crypto.randomUUID();

            await supabaseAdmin.from("email_send_log").insert({
              message_id: messageId,
              template_name: "enrolment-recovery",
              recipient_email: row.email,
              status: "pending",
            });

            const { error: enqErr } = await supabaseAdmin.rpc("enqueue_email", {
              queue_name: "transactional_emails",
              payload: {
                message_id: messageId,
                to: row.email,
                from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
                sender_domain: SENDER_DOMAIN,
                subject,
                html,
                text: plainText,
                purpose: "transactional",
                label: "enrolment-recovery",
                idempotency_key: `enrolment-recovery-${row.id}`,
                unsubscribe_token: unsubscribeToken,
                queued_at: new Date().toISOString(),
              },
            });

            if (enqErr) {
              console.error("recover-abandoned-intents: enqueue failed", {
                intent_id: row.id,
                error: enqErr,
              });
              await supabaseAdmin.from("email_send_log").insert({
                message_id: messageId,
                template_name: "enrolment-recovery",
                recipient_email: row.email,
                status: "failed",
                error_message: "enqueue failed",
              });
              continue;
            }

            await supabaseAdmin
              .from("enrolment_intents")
              .update({ recovery_email_sent_at: new Date().toISOString() })
              .eq("id", row.id);

            queued++;
          }

          return Response.json({
            success: true,
            scanned: intents?.length ?? 0,
            queued,
            skipped,
          });
        } catch (err) {
          console.error("recover-abandoned-intents: unhandled", err);
          return Response.json(
            { error: err instanceof Error ? err.message : "unknown" },
            { status: 500 },
          );
        }
      },
    },
  },
});
