import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireAdmin } from "@/server/auth-guards.server";
import {
  MOMENT_CATEGORIES,
  MOMENT_IMAGE_CAP,
  MOMENT_STATUSES,
  MOMENTS_BUCKET,
  MOMENTS_PREFIX,
  publicUrlForPath,
  type MomentCategory,
  type MomentDetail,
  type MomentImage,
  type MomentStatus,
  type MomentSummary,
} from "./moments.types";

function admin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

function pub() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function rowToSummary(
  row: Record<string, unknown>,
  coverPath: string | null,
  imageCount: number,
): MomentSummary {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    subtitle: (row.subtitle as string | null) ?? null,
    event_date: row.event_date as string,
    location: (row.location as string | null) ?? null,
    category: row.category as MomentCategory,
    status: row.status as MomentStatus,
    published_at: (row.published_at as string | null) ?? null,
    cover_image_id: (row.cover_image_id as string | null) ?? null,
    cover_url: coverPath ? publicUrlForPath(process.env.SUPABASE_URL!, coverPath) : null,
    image_count: imageCount,
    updated_at: row.updated_at as string,
  };
}

function imgRowToImage(row: Record<string, unknown>): MomentImage {
  return {
    id: row.id as string,
    moment_id: row.moment_id as string,
    storage_path: row.storage_path as string,
    alt: (row.alt as string) ?? "",
    caption: (row.caption as string | null) ?? null,
    width: (row.width as number | null) ?? null,
    height: (row.height as number | null) ?? null,
    position: (row.position as number) ?? 0,
    created_at: row.created_at as string,
    url: publicUrlForPath(process.env.SUPABASE_URL!, row.storage_path as string),
  };
}

/** Public list of all published moments, newest first. */
export const listPublishedMoments = createServerFn({ method: "GET" }).handler(async () => {
  const sb = pub();
  const { data: moments, error } = await sb
    .from("moments")
    .select(
      "id, slug, title, subtitle, event_date, location, category, status, published_at, cover_image_id, updated_at",
    )
    .eq("status", "published")
    .order("event_date", { ascending: false });
  if (error) throw new Error(error.message);

  const ids = (moments ?? []).map((m) => m.id as string);
  let images: { id: string; moment_id: string; storage_path: string }[] = [];
  if (ids.length) {
    const { data: imgs, error: imgErr } = await sb
      .from("moment_images")
      .select("id, moment_id, storage_path, position")
      .in("moment_id", ids)
      .order("position", { ascending: true });
    if (imgErr) throw new Error(imgErr.message);
    images = (imgs ?? []) as typeof images;
  }

  const byMoment = new Map<string, { id: string; storage_path: string }[]>();
  for (const img of images) {
    const arr = byMoment.get(img.moment_id) ?? [];
    arr.push({ id: img.id, storage_path: img.storage_path });
    byMoment.set(img.moment_id, arr);
  }

  const summaries: MomentSummary[] = (moments ?? []).map((m) => {
    const arr = byMoment.get(m.id as string) ?? [];
    const coverId = (m.cover_image_id as string | null) ?? null;
    const cover = (coverId && arr.find((i) => i.id === coverId)) || arr[0];
    return rowToSummary(m as Record<string, unknown>, cover?.storage_path ?? null, arr.length);
  });
  return { moments: summaries };
});

/** Public single moment by slug. */
export const getMomentBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1).max(120) }).parse(data))
  .handler(async ({ data }) => {
    const sb = pub();
    const { data: m, error } = await sb
      .from("moments")
      .select(
        "id, slug, title, subtitle, body, event_date, location, category, status, published_at, cover_image_id, updated_at",
      )
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!m) return { moment: null as MomentDetail | null };

    const { data: imgs, error: imgErr } = await sb
      .from("moment_images")
      .select("id, moment_id, storage_path, alt, caption, width, height, position, created_at")
      .eq("moment_id", m.id as string)
      .order("position", { ascending: true });
    if (imgErr) throw new Error(imgErr.message);

    const images = (imgs ?? []).map((row) => imgRowToImage(row as Record<string, unknown>));
    const coverId = (m.cover_image_id as string | null) ?? null;
    const cover = (coverId && images.find((i) => i.id === coverId)) || images[0];
    const summary = rowToSummary(
      m as Record<string, unknown>,
      cover?.storage_path ?? null,
      images.length,
    );
    const detail: MomentDetail = {
      ...summary,
      body: (m.body as string) ?? "",
      images,
    };
    return { moment: detail };
  });

// ---------- Admin ----------

export const listMomentsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { data: moments, error } = await sb
      .from("moments")
      .select(
        "id, slug, title, subtitle, event_date, location, category, status, published_at, cover_image_id, updated_at",
      )
      .order("event_date", { ascending: false });
    if (error) throw new Error(error.message);
    const ids = (moments ?? []).map((m) => m.id as string);
    let images: { id: string; moment_id: string; storage_path: string }[] = [];
    if (ids.length) {
      const { data: imgs } = await sb
        .from("moment_images")
        .select("id, moment_id, storage_path")
        .in("moment_id", ids);
      images = (imgs ?? []) as typeof images;
    }
    const counts = new Map<string, number>();
    const cover = new Map<string, string>();
    for (const i of images) {
      counts.set(i.moment_id, (counts.get(i.moment_id) ?? 0) + 1);
      if (!cover.has(i.moment_id)) cover.set(i.moment_id, i.storage_path);
    }
    const summaries: MomentSummary[] = (moments ?? []).map((m) => {
      const coverId = (m.cover_image_id as string | null) ?? null;
      const coverPath =
        (coverId && images.find((i) => i.id === coverId)?.storage_path) ||
        cover.get(m.id as string) ||
        null;
      return rowToSummary(
        m as Record<string, unknown>,
        coverPath ?? null,
        counts.get(m.id as string) ?? 0,
      );
    });
    return { moments: summaries };
  });

export const getMomentAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { data: m, error } = await sb
      .from("moments")
      .select(
        "id, slug, title, subtitle, body, event_date, location, category, status, published_at, cover_image_id, updated_at",
      )
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!m) throw new Error("Moment not found");
    const { data: imgs, error: imgErr } = await sb
      .from("moment_images")
      .select("id, moment_id, storage_path, alt, caption, width, height, position, created_at")
      .eq("moment_id", m.id as string)
      .order("position", { ascending: true });
    if (imgErr) throw new Error(imgErr.message);
    const images = (imgs ?? []).map((row) => imgRowToImage(row as Record<string, unknown>));
    const coverId = (m.cover_image_id as string | null) ?? null;
    const cover = (coverId && images.find((i) => i.id === coverId)) || images[0];
    const summary = rowToSummary(
      m as Record<string, unknown>,
      cover?.storage_path ?? null,
      images.length,
    );
    return { moment: { ...summary, body: (m.body as string) ?? "", images } as MomentDetail };
  });

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80) || `moment-${Date.now()}`
  );
}

const MomentInputSchema = z.object({
  slug: z.string().max(120).optional(),
  title: z.string().min(2).max(160),
  subtitle: z.string().max(240).nullable().optional(),
  body: z.string().max(20_000).optional(),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  location: z.string().max(160).nullable().optional(),
  category: z.enum(MOMENT_CATEGORIES),
  status: z.enum(MOMENT_STATUSES),
});

export const createMoment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => MomentInputSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const slug = (data.slug && data.slug.trim()) || slugify(data.title);
    const payload = {
      slug,
      title: data.title,
      subtitle: data.subtitle ?? null,
      body: data.body ?? "",
      event_date: data.event_date,
      location: data.location ?? null,
      category: data.category,
      status: data.status,
      published_at: data.status === "published" ? new Date().toISOString() : null,
      created_by: context.userId,
    };
    const { data: row, error } = await sb.from("moments").insert(payload).select("id").single();
    if (error) throw new Error(error.message);
    return { id: row.id as string };
  });

const MomentUpdateSchema = MomentInputSchema.partial().extend({
  id: z.string().uuid(),
});

export const updateMoment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => MomentUpdateSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const patch: Record<string, unknown> = {};
    for (const k of [
      "slug",
      "title",
      "subtitle",
      "body",
      "event_date",
      "location",
      "category",
    ] as const) {
      if (data[k] !== undefined) patch[k] = data[k];
    }
    if (data.status !== undefined) {
      patch.status = data.status;
      if (data.status === "published") {
        const { data: existing } = await sb
          .from("moments")
          .select("published_at")
          .eq("id", data.id)
          .maybeSingle();
        if (!existing?.published_at) patch.published_at = new Date().toISOString();
      }
    }
    if (Object.keys(patch).length === 0) return { ok: true };
    const { error } = await sb.from("moments").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteMoment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    // collect storage paths to clean up
    const { data: imgs } = await sb
      .from("moment_images")
      .select("storage_path")
      .eq("moment_id", data.id);
    const paths = (imgs ?? []).map((r) => (r.storage_path as string) ?? "").filter(Boolean);
    const { error } = await sb.from("moments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    if (paths.length) {
      await sb.storage.from(MOMENTS_BUCKET).remove(paths);
    }
    return { ok: true };
  });

const AddImageSchema = z.object({
  moment_id: z.string().uuid(),
  storage_path: z.string().min(1).max(512),
  alt: z.string().max(240).optional(),
  caption: z.string().max(500).nullable().optional(),
  width: z.number().int().positive().nullable().optional(),
  height: z.number().int().positive().nullable().optional(),
  make_cover: z.boolean().optional(),
});

export const addMomentImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => AddImageSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    if (!data.storage_path.startsWith(`${MOMENTS_PREFIX}/`)) {
      throw new Error("Invalid storage_path");
    }
    // server-side guard mirrors the trigger so users see a clean error
    const { count } = await sb
      .from("moment_images")
      .select("id", { count: "exact", head: true })
      .eq("moment_id", data.moment_id);
    if ((count ?? 0) >= MOMENT_IMAGE_CAP) {
      throw new Error(`Each moment can have at most ${MOMENT_IMAGE_CAP} images`);
    }
    const position = count ?? 0;
    const { data: row, error } = await sb
      .from("moment_images")
      .insert({
        moment_id: data.moment_id,
        storage_path: data.storage_path,
        alt: data.alt ?? "",
        caption: data.caption ?? null,
        width: data.width ?? null,
        height: data.height ?? null,
        position,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);

    if (data.make_cover || position === 0) {
      await sb
        .from("moments")
        .update({ cover_image_id: row.id as string })
        .eq("id", data.moment_id);
    }
    return { id: row.id as string };
  });

export const removeMomentImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { data: row } = await sb
      .from("moment_images")
      .select("storage_path, moment_id")
      .eq("id", data.id)
      .maybeSingle();
    if (!row) return { ok: true };
    const { error } = await sb.from("moment_images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    if (row.storage_path) {
      await sb.storage.from(MOMENTS_BUCKET).remove([row.storage_path as string]);
    }
    // if it was the cover, fall back to first remaining image
    const { data: parent } = await sb
      .from("moments")
      .select("cover_image_id")
      .eq("id", row.moment_id as string)
      .maybeSingle();
    if (!parent || parent.cover_image_id === data.id) {
      const { data: next } = await sb
        .from("moment_images")
        .select("id")
        .eq("moment_id", row.moment_id as string)
        .order("position", { ascending: true })
        .limit(1)
        .maybeSingle();
      await sb
        .from("moments")
        .update({ cover_image_id: next?.id ?? null })
        .eq("id", row.moment_id as string);
    }
    return { ok: true };
  });

export const setMomentCover = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ moment_id: z.string().uuid(), image_id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { error } = await sb
      .from("moments")
      .update({ cover_image_id: data.image_id })
      .eq("id", data.moment_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateMomentImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        alt: z.string().max(240).optional(),
        caption: z.string().max(500).nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const patch: Record<string, unknown> = {};
    if (data.alt !== undefined) patch.alt = data.alt;
    if (data.caption !== undefined) patch.caption = data.caption;
    if (Object.keys(patch).length === 0) return { ok: true };
    const { error } = await sb.from("moment_images").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Slug list used by sitemap. Public. */
export const listMomentSitemap = createServerFn({ method: "GET" }).handler(async () => {
  const sb = pub();
  const { data, error } = await sb
    .from("moments")
    .select("slug, updated_at, cover_image_id")
    .eq("status", "published")
    .order("event_date", { ascending: false });
  if (error) throw new Error(error.message);
  return {
    items: (data ?? []) as { slug: string; updated_at: string; cover_image_id: string | null }[],
  };
});
