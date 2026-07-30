import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";

function admin() {
  return createSafeAdminClient();
}

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789"; // no 0/o/1/l/i confusion
function shortId(len = 7) {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return s;
}

const CreateInput = z.object({
  archetype: z.string().min(1).max(64),
  archetypeName: z.string().min(1).max(120),
  topTrackSlug: z.string().min(1).max(64).optional(),
  topTrackTitle: z.string().min(1).max(120).optional(),
  acriOverall: z.number().int().min(0).max(100),
  bandLabel: z.string().min(1).max(64).optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  referralCode: z.string().min(3).max(64).optional(),
});

export const createShareCard = createServerFn({ method: "POST" })
  .inputValidator((d: z.infer<typeof CreateInput>) => CreateInput.parse(d))
  .handler(async ({ data }) => {
    const sb = admin();
    // 5 attempts to find a free slug; collision odds are vanishing for 7 chars.
    for (let i = 0; i < 5; i++) {
      const slug = shortId(7);
      const { data: row, error } = await sb
        .from("assessment_shares")
        .insert({
          slug,
          archetype: data.archetype,
          archetype_name: data.archetypeName,
          top_track_slug: data.topTrackSlug ?? null,
          top_track_title: data.topTrackTitle ?? null,
          acri_overall: data.acriOverall,
          band_label: data.bandLabel ?? null,
          payload: (data.payload ?? {}) as any,
          referral_code: data.referralCode ?? slug,
        } as any)
        .select("slug")
        .single();
      if (!error && row) return { slug: row.slug };
      // 23505 = unique violation - retry with a new slug.
      if (error && error.code !== "23505") {
        throw new Error(error.message);
      }
    }
    throw new Error("Could not generate share slug");
  });

const GetInput = z.object({ slug: z.string().min(3).max(32) });

export const getShareCard = createServerFn({ method: "GET" })
  .inputValidator((d: z.infer<typeof GetInput>) => GetInput.parse(d))
  .handler(async ({ data }) => {
    const sb = admin();
    const { data: row } = await sb
      .from("assessment_shares")
      .select(
        "slug, archetype, archetype_name, top_track_slug, top_track_title, acri_overall, band_label, payload, referral_code, views, created_at",
      )
      .eq("slug", data.slug)
      .maybeSingle();
    if (!row) return null;
    // Best-effort view counter (don't await failure).
    sb.from("assessment_shares")
      .update({ views: (row.views ?? 0) + 1 })
      .eq("slug", data.slug)
      .then(() => undefined);
    return row;
  });

const RefInput = z.object({
  referralCode: z.string().min(3).max(64),
  landingPath: z.string().min(1).max(255),
  userAgent: z.string().min(1).max(512).optional(),
});

export const recordReferralVisit = createServerFn({ method: "POST" })
  .inputValidator((d: z.infer<typeof RefInput>) => RefInput.parse(d))
  .handler(async ({ data }) => {
    const sb = admin();
    await sb.from("referral_attributions").insert({
      referral_code: data.referralCode,
      landing_path: data.landingPath,
      user_agent: data.userAgent ?? null,
    });
    return { ok: true };
  });
