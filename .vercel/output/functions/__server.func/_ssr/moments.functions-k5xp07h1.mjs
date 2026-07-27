import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { M as MOMENT_STATUSES, a as MOMENT_CATEGORIES, b as MOMENTS_BUCKET, c as MOMENTS_PREFIX, d as MOMENT_IMAGE_CAP, p as publicUrlForPath } from "./moments.types-CDdnLKsa.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, v as enumType, w as booleanType, x as numberType } from "../_libs/zod.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "./client.server-DUn3rRvm.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}
function pub() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
function rowToSummary(row, coverPath, imageCount) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? null,
    event_date: row.event_date,
    location: row.location ?? null,
    category: row.category,
    status: row.status,
    published_at: row.published_at ?? null,
    cover_image_id: row.cover_image_id ?? null,
    cover_url: coverPath ? publicUrlForPath(process.env.SUPABASE_URL, coverPath) : null,
    image_count: imageCount,
    updated_at: row.updated_at
  };
}
function imgRowToImage(row) {
  return {
    id: row.id,
    moment_id: row.moment_id,
    storage_path: row.storage_path,
    alt: row.alt ?? "",
    caption: row.caption ?? null,
    width: row.width ?? null,
    height: row.height ?? null,
    position: row.position ?? 0,
    created_at: row.created_at,
    url: publicUrlForPath(process.env.SUPABASE_URL, row.storage_path)
  };
}
const listPublishedMoments_createServerFn_handler = createServerRpc({
  id: "5b12b9e55705b3e25dd049623d626573efe8b92dbc010e9d97ced956e4e51769",
  name: "listPublishedMoments",
  filename: "src/lib/moments.functions.ts"
}, (opts) => listPublishedMoments.__executeServer(opts));
const listPublishedMoments = createServerFn({
  method: "GET"
}).handler(listPublishedMoments_createServerFn_handler, async () => {
  const sb = pub();
  const {
    data: moments,
    error
  } = await sb.from("moments").select("id, slug, title, subtitle, event_date, location, category, status, published_at, cover_image_id, updated_at").eq("status", "published").order("event_date", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const ids = (moments ?? []).map((m) => m.id);
  let images = [];
  if (ids.length) {
    const {
      data: imgs,
      error: imgErr
    } = await sb.from("moment_images").select("id, moment_id, storage_path, position").in("moment_id", ids).order("position", {
      ascending: true
    });
    if (imgErr) throw new Error(imgErr.message);
    images = imgs ?? [];
  }
  const byMoment = /* @__PURE__ */ new Map();
  for (const img of images) {
    const arr = byMoment.get(img.moment_id) ?? [];
    arr.push({
      id: img.id,
      storage_path: img.storage_path
    });
    byMoment.set(img.moment_id, arr);
  }
  const summaries = (moments ?? []).map((m) => {
    const arr = byMoment.get(m.id) ?? [];
    const coverId = m.cover_image_id ?? null;
    const cover = coverId && arr.find((i) => i.id === coverId) || arr[0];
    return rowToSummary(m, cover?.storage_path ?? null, arr.length);
  });
  return {
    moments: summaries
  };
});
const getMomentBySlug_createServerFn_handler = createServerRpc({
  id: "e90dd4cbaf90d961a7fddee08b84d71273800db72f1420f8a747ff143123ff91",
  name: "getMomentBySlug",
  filename: "src/lib/moments.functions.ts"
}, (opts) => getMomentBySlug.__executeServer(opts));
const getMomentBySlug = createServerFn({
  method: "GET"
}).inputValidator((data) => objectType({
  slug: stringType().min(1).max(120)
}).parse(data)).handler(getMomentBySlug_createServerFn_handler, async ({
  data
}) => {
  const sb = pub();
  const {
    data: m,
    error
  } = await sb.from("moments").select("id, slug, title, subtitle, body, event_date, location, category, status, published_at, cover_image_id, updated_at").eq("slug", data.slug).eq("status", "published").maybeSingle();
  if (error) throw new Error(error.message);
  if (!m) return {
    moment: null
  };
  const {
    data: imgs,
    error: imgErr
  } = await sb.from("moment_images").select("id, moment_id, storage_path, alt, caption, width, height, position, created_at").eq("moment_id", m.id).order("position", {
    ascending: true
  });
  if (imgErr) throw new Error(imgErr.message);
  const images = (imgs ?? []).map((row) => imgRowToImage(row));
  const coverId = m.cover_image_id ?? null;
  const cover = coverId && images.find((i) => i.id === coverId) || images[0];
  const summary = rowToSummary(m, cover?.storage_path ?? null, images.length);
  const detail = {
    ...summary,
    body: m.body ?? "",
    images
  };
  return {
    moment: detail
  };
});
const listMomentsAdmin_createServerFn_handler = createServerRpc({
  id: "bf03975efd47d1fb603f7700697995cbf1d369ceb9d8f07c4a451f82c0eda80e",
  name: "listMomentsAdmin",
  filename: "src/lib/moments.functions.ts"
}, (opts) => listMomentsAdmin.__executeServer(opts));
const listMomentsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listMomentsAdmin_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    data: moments,
    error
  } = await sb.from("moments").select("id, slug, title, subtitle, event_date, location, category, status, published_at, cover_image_id, updated_at").order("event_date", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const ids = (moments ?? []).map((m) => m.id);
  let images = [];
  if (ids.length) {
    const {
      data: imgs
    } = await sb.from("moment_images").select("id, moment_id, storage_path").in("moment_id", ids);
    images = imgs ?? [];
  }
  const counts = /* @__PURE__ */ new Map();
  const cover = /* @__PURE__ */ new Map();
  for (const i of images) {
    counts.set(i.moment_id, (counts.get(i.moment_id) ?? 0) + 1);
    if (!cover.has(i.moment_id)) cover.set(i.moment_id, i.storage_path);
  }
  const summaries = (moments ?? []).map((m) => {
    const coverId = m.cover_image_id ?? null;
    const coverPath = coverId && images.find((i) => i.id === coverId)?.storage_path || cover.get(m.id) || null;
    return rowToSummary(m, coverPath ?? null, counts.get(m.id) ?? 0);
  });
  return {
    moments: summaries
  };
});
const getMomentAdmin_createServerFn_handler = createServerRpc({
  id: "556897b785d794de3f03905ef8bbc0be146f404c8057e2b88ac2c7f2796cd6f5",
  name: "getMomentAdmin",
  filename: "src/lib/moments.functions.ts"
}, (opts) => getMomentAdmin.__executeServer(opts));
const getMomentAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  id: stringType().uuid()
}).parse(data)).handler(getMomentAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    data: m,
    error
  } = await sb.from("moments").select("id, slug, title, subtitle, body, event_date, location, category, status, published_at, cover_image_id, updated_at").eq("id", data.id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!m) throw new Error("Moment not found");
  const {
    data: imgs,
    error: imgErr
  } = await sb.from("moment_images").select("id, moment_id, storage_path, alt, caption, width, height, position, created_at").eq("moment_id", m.id).order("position", {
    ascending: true
  });
  if (imgErr) throw new Error(imgErr.message);
  const images = (imgs ?? []).map((row) => imgRowToImage(row));
  const coverId = m.cover_image_id ?? null;
  const cover = coverId && images.find((i) => i.id === coverId) || images[0];
  const summary = rowToSummary(m, cover?.storage_path ?? null, images.length);
  return {
    moment: {
      ...summary,
      body: m.body ?? "",
      images
    }
  };
});
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80) || `moment-${Date.now()}`;
}
const MomentInputSchema = objectType({
  slug: stringType().max(120).optional(),
  title: stringType().min(2).max(160),
  subtitle: stringType().max(240).nullable().optional(),
  body: stringType().max(2e4).optional(),
  event_date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/),
  location: stringType().max(160).nullable().optional(),
  category: enumType(MOMENT_CATEGORIES),
  status: enumType(MOMENT_STATUSES)
});
const createMoment_createServerFn_handler = createServerRpc({
  id: "f0652ee2747f5f4d93e0bdde248ea1cf3407898511df4aad194c6aeaf48ca2d5",
  name: "createMoment",
  filename: "src/lib/moments.functions.ts"
}, (opts) => createMoment.__executeServer(opts));
const createMoment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => MomentInputSchema.parse(data)).handler(createMoment_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const slug = data.slug && data.slug.trim() || slugify(data.title);
  const payload = {
    slug,
    title: data.title,
    subtitle: data.subtitle ?? null,
    body: data.body ?? "",
    event_date: data.event_date,
    location: data.location ?? null,
    category: data.category,
    status: data.status,
    published_at: data.status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null,
    created_by: context.userId
  };
  const {
    data: row,
    error
  } = await sb.from("moments").insert(payload).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: row.id
  };
});
const MomentUpdateSchema = MomentInputSchema.partial().extend({
  id: stringType().uuid()
});
const updateMoment_createServerFn_handler = createServerRpc({
  id: "865de48116bb59b9f17184aebe364e1305f0bb70878edbb7ef3d83f3a8a686a9",
  name: "updateMoment",
  filename: "src/lib/moments.functions.ts"
}, (opts) => updateMoment.__executeServer(opts));
const updateMoment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => MomentUpdateSchema.parse(data)).handler(updateMoment_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const patch = {};
  for (const k of ["slug", "title", "subtitle", "body", "event_date", "location", "category"]) {
    if (data[k] !== void 0) patch[k] = data[k];
  }
  if (data.status !== void 0) {
    patch.status = data.status;
    if (data.status === "published") {
      const {
        data: existing
      } = await sb.from("moments").select("published_at").eq("id", data.id).maybeSingle();
      if (!existing?.published_at) patch.published_at = (/* @__PURE__ */ new Date()).toISOString();
    }
  }
  if (Object.keys(patch).length === 0) return {
    ok: true
  };
  const {
    error
  } = await sb.from("moments").update(patch).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteMoment_createServerFn_handler = createServerRpc({
  id: "5201c3d6dbb8b17413f0246a9887a8a60ce5ec6f02dd4ddca629664716ff0edd",
  name: "deleteMoment",
  filename: "src/lib/moments.functions.ts"
}, (opts) => deleteMoment.__executeServer(opts));
const deleteMoment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  id: stringType().uuid()
}).parse(data)).handler(deleteMoment_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    data: imgs
  } = await sb.from("moment_images").select("storage_path").eq("moment_id", data.id);
  const paths = (imgs ?? []).map((r) => r.storage_path ?? "").filter(Boolean);
  const {
    error
  } = await sb.from("moments").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  if (paths.length) {
    await sb.storage.from(MOMENTS_BUCKET).remove(paths);
  }
  return {
    ok: true
  };
});
const AddImageSchema = objectType({
  moment_id: stringType().uuid(),
  storage_path: stringType().min(1).max(512),
  alt: stringType().max(240).optional(),
  caption: stringType().max(500).nullable().optional(),
  width: numberType().int().positive().nullable().optional(),
  height: numberType().int().positive().nullable().optional(),
  make_cover: booleanType().optional()
});
const addMomentImage_createServerFn_handler = createServerRpc({
  id: "c9bba08335c1e341478d1a799f770154545f015179fdf5a9f46aac83ffd5bd7b",
  name: "addMomentImage",
  filename: "src/lib/moments.functions.ts"
}, (opts) => addMomentImage.__executeServer(opts));
const addMomentImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => AddImageSchema.parse(data)).handler(addMomentImage_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  if (!data.storage_path.startsWith(`${MOMENTS_PREFIX}/`)) {
    throw new Error("Invalid storage_path");
  }
  const {
    count
  } = await sb.from("moment_images").select("id", {
    count: "exact",
    head: true
  }).eq("moment_id", data.moment_id);
  if ((count ?? 0) >= MOMENT_IMAGE_CAP) {
    throw new Error(`Each moment can have at most ${MOMENT_IMAGE_CAP} images`);
  }
  const position = count ?? 0;
  const {
    data: row,
    error
  } = await sb.from("moment_images").insert({
    moment_id: data.moment_id,
    storage_path: data.storage_path,
    alt: data.alt ?? "",
    caption: data.caption ?? null,
    width: data.width ?? null,
    height: data.height ?? null,
    position
  }).select("id").single();
  if (error) throw new Error(error.message);
  if (data.make_cover || position === 0) {
    await sb.from("moments").update({
      cover_image_id: row.id
    }).eq("id", data.moment_id);
  }
  return {
    id: row.id
  };
});
const removeMomentImage_createServerFn_handler = createServerRpc({
  id: "c7bbbf33ffca8507c935688b50c0c8cadf0d109536f50f04c1e6c06f1acd5085",
  name: "removeMomentImage",
  filename: "src/lib/moments.functions.ts"
}, (opts) => removeMomentImage.__executeServer(opts));
const removeMomentImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  id: stringType().uuid()
}).parse(data)).handler(removeMomentImage_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    data: row
  } = await sb.from("moment_images").select("storage_path, moment_id").eq("id", data.id).maybeSingle();
  if (!row) return {
    ok: true
  };
  const {
    error
  } = await sb.from("moment_images").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  if (row.storage_path) {
    await sb.storage.from(MOMENTS_BUCKET).remove([row.storage_path]);
  }
  const {
    data: parent
  } = await sb.from("moments").select("cover_image_id").eq("id", row.moment_id).maybeSingle();
  if (!parent || parent.cover_image_id === data.id) {
    const {
      data: next
    } = await sb.from("moment_images").select("id").eq("moment_id", row.moment_id).order("position", {
      ascending: true
    }).limit(1).maybeSingle();
    await sb.from("moments").update({
      cover_image_id: next?.id ?? null
    }).eq("id", row.moment_id);
  }
  return {
    ok: true
  };
});
const setMomentCover_createServerFn_handler = createServerRpc({
  id: "22c55f90c737dfcf527786bf73971ae005f0bfe773a431865e12ece705fbfc79",
  name: "setMomentCover",
  filename: "src/lib/moments.functions.ts"
}, (opts) => setMomentCover.__executeServer(opts));
const setMomentCover = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  moment_id: stringType().uuid(),
  image_id: stringType().uuid()
}).parse(data)).handler(setMomentCover_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    error
  } = await sb.from("moments").update({
    cover_image_id: data.image_id
  }).eq("id", data.moment_id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const updateMomentImage_createServerFn_handler = createServerRpc({
  id: "31447ff58de484807235c9c47ba69c4c20a87ef8fc039e3efaf1b2dccb9d0023",
  name: "updateMomentImage",
  filename: "src/lib/moments.functions.ts"
}, (opts) => updateMomentImage.__executeServer(opts));
const updateMomentImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  id: stringType().uuid(),
  alt: stringType().max(240).optional(),
  caption: stringType().max(500).nullable().optional()
}).parse(data)).handler(updateMomentImage_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const patch = {};
  if (data.alt !== void 0) patch.alt = data.alt;
  if (data.caption !== void 0) patch.caption = data.caption;
  if (Object.keys(patch).length === 0) return {
    ok: true
  };
  const {
    error
  } = await sb.from("moment_images").update(patch).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const listMomentSitemap_createServerFn_handler = createServerRpc({
  id: "308c8e5f988ca3644d4f8227009769b48bd5e35d0365d5720d7028762504984c",
  name: "listMomentSitemap",
  filename: "src/lib/moments.functions.ts"
}, (opts) => listMomentSitemap.__executeServer(opts));
const listMomentSitemap = createServerFn({
  method: "GET"
}).handler(listMomentSitemap_createServerFn_handler, async () => {
  const sb = pub();
  const {
    data,
    error
  } = await sb.from("moments").select("slug, updated_at, cover_image_id").eq("status", "published").order("event_date", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    items: data ?? []
  };
});
export {
  addMomentImage_createServerFn_handler,
  createMoment_createServerFn_handler,
  deleteMoment_createServerFn_handler,
  getMomentAdmin_createServerFn_handler,
  getMomentBySlug_createServerFn_handler,
  listMomentSitemap_createServerFn_handler,
  listMomentsAdmin_createServerFn_handler,
  listPublishedMoments_createServerFn_handler,
  removeMomentImage_createServerFn_handler,
  setMomentCover_createServerFn_handler,
  updateMomentImage_createServerFn_handler,
  updateMoment_createServerFn_handler
};
