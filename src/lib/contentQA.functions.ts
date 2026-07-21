import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireAdmin } from "@/server/auth-guards.server";
import { supabaseAdmin } from "@/server/analytics.server";

const STATUSES = ["pending", "reviewed", "approved", "live", "rejected"] as const;
const BUCKETS = ["desire", "proof", "sell", "rescue"] as const;

export const listContentQAReviews = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("content_qa_reviews")
      .select("id, page, section_id, bucket, status, notes, reviewer_id, updated_at")
      .order("page", { ascending: true });
    if (error) throw new Error(error.message);
    return { rows: data ?? [] };
  });

const UpsertSchema = z.object({
  page: z.string().min(1).max(120),
  sectionId: z.string().min(1).max(120),
  bucket: z.enum(BUCKETS),
  status: z.enum(STATUSES),
  notes: z.string().max(2000).optional().nullable(),
});

export const upsertContentQAReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => UpsertSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const { error } = await supabaseAdmin.from("content_qa_reviews").upsert(
      {
        page: data.page,
        section_id: data.sectionId,
        bucket: data.bucket,
        status: data.status,
        notes: data.notes ?? null,
        reviewer_id: context.userId,
      },
      { onConflict: "page,section_id" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });
