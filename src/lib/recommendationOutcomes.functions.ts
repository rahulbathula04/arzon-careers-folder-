/**
 * Recommendation Outcomes - captures which role the student chose to track
 * and feeds the retention KPI loop (Wave 2).
 *
 * Writes are best-effort and silently swallow failures (e.g. table not yet
 * migrated, unauthenticated user). The Wave 2 DB migration creates
 * `recommendation_outcomes` and `retention_checkins`.
 */

import { createServerFn } from "@tanstack/react-start";

import { createSafePublicClient } from "@/lib/supabaseEnv";

async function getPublishableClient() {
  return createSafePublicClient();
}

interface ChosenRolePayload {
  leadId: string;
  roleSlug: string;
  familyId: string;
}

export const recordChosenRole = createServerFn({ method: "POST" })
  .inputValidator((data: ChosenRolePayload) => {
    if (
      !data ||
      typeof data.leadId !== "string" ||
      typeof data.roleSlug !== "string" ||
      typeof data.familyId !== "string"
    ) {
      throw new Error("Invalid payload");
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const client = await getPublishableClient();
      if (!client) return { ok: false };
      await (client as any).rpc("record_recommendation_outcome", {
        p_lead_id: data.leadId,
        p_family_id: data.familyId,
        p_recommended_role_slug: null,
        p_chosen_role_slug: data.roleSlug,
        p_stage: "chose_role",
      });
    } catch {
      // Best-effort capture; RPC enforces validation and ownership guards.
    }
    return { ok: true };
  });

interface RecordRecommendedPayload {
  leadId: string;
  familyId: string;
  topRoleSlug: string;
}

export const recordRecommendation = createServerFn({ method: "POST" })
  .inputValidator((data: RecordRecommendedPayload) => {
    if (
      !data ||
      typeof data.leadId !== "string" ||
      typeof data.familyId !== "string" ||
      typeof data.topRoleSlug !== "string"
    ) {
      throw new Error("Invalid payload");
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const client = await getPublishableClient();
      if (!client) return { ok: false };
      await (client as any).rpc("record_recommendation_outcome", {
        p_lead_id: data.leadId,
        p_family_id: data.familyId,
        p_recommended_role_slug: data.topRoleSlug,
        p_chosen_role_slug: null,
        p_stage: "recommended",
      });
    } catch {
      // Best-effort.
    }
    return { ok: true };
  });
