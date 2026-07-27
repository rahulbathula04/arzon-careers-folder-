import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as redis } from "./redis.server-jD5sLB4g.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, v as enumType, y as literalType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/uncrypto.mjs";
import "node:crypto";
const listDemandTracks_createServerFn_handler = createServerRpc({
  id: "05b6d8861a11eded4fc6c6cdfc52b296933d1a6fe5958ae462b79e62fab67414",
  name: "listDemandTracks",
  filename: "src/lib/demand.functions.ts"
}, (opts) => listDemandTracks.__executeServer(opts));
const listDemandTracks = createServerFn({
  method: "GET"
}).handler(listDemandTracks_createServerFn_handler, async () => {
  try {
    const cached = await redis.get("cache:demand_tracks");
    if (cached) return {
      tracks: cached
    };
  } catch (e) {
    console.warn("Redis get failed for demand_tracks", e);
  }
  const {
    data,
    error
  } = await supabaseAdmin.from("demand_tracks").select("id, slug, title, category, pitch, status, votes_count, vote_threshold, founding_cap, founding_filled, eta_days, build_started_at, launch_eta, live_course_slug").order("status", {
    ascending: true
  }).order("votes_count", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const tracks = data ?? [];
  try {
    await redis.setex("cache:demand_tracks", 60, JSON.stringify(tracks));
  } catch (e) {
    console.warn("Redis set failed for demand_tracks", e);
  }
  return {
    tracks
  };
});
const listFeaturedDemandTracks_createServerFn_handler = createServerRpc({
  id: "d1dee96c04a6f69191b478b7e67dc5a66ed4d1d8a2bfb807baf007948b49df9a",
  name: "listFeaturedDemandTracks",
  filename: "src/lib/demand.functions.ts"
}, (opts) => listFeaturedDemandTracks.__executeServer(opts));
const listFeaturedDemandTracks = createServerFn({
  method: "GET"
}).handler(listFeaturedDemandTracks_createServerFn_handler, async () => {
  try {
    const cached = await redis.get("cache:featured_demand_tracks");
    if (cached) return {
      tracks: cached
    };
  } catch (e) {
    console.warn("Redis get failed for featured_demand_tracks", e);
  }
  const {
    data,
    error
  } = await supabaseAdmin.from("demand_tracks").select("id, slug, title, category, pitch, status, votes_count, vote_threshold, founding_cap, founding_filled, eta_days, build_started_at, launch_eta, live_course_slug").in("status", ["building", "voting"]).order("status", {
    ascending: true
  }).order("votes_count", {
    ascending: false
  }).limit(3);
  if (error) throw new Error(error.message);
  const tracks = data ?? [];
  try {
    await redis.setex("cache:featured_demand_tracks", 60, JSON.stringify(tracks));
  } catch (e) {
    console.warn("Redis set failed for featured_demand_tracks", e);
  }
  return {
    tracks
  };
});
const getDemandTrackBySlug_createServerFn_handler = createServerRpc({
  id: "4bb4c93cf39e618b241955cd75a3cf04803f72d9b2448a6aa962c75a3ec71367",
  name: "getDemandTrackBySlug",
  filename: "src/lib/demand.functions.ts"
}, (opts) => getDemandTrackBySlug.__executeServer(opts));
const getDemandTrackBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType().min(1).max(120)
}).parse(input)).handler(getDemandTrackBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    data: track,
    error: te
  } = await supabaseAdmin.from("demand_tracks").select("id, slug, title, category, pitch, status, votes_count, vote_threshold, founding_cap, founding_filled, eta_days, build_started_at, launch_eta, live_course_slug").eq("slug", data.slug).maybeSingle();
  if (te) throw new Error(te.message);
  if (!track) return {
    track: null,
    milestones: [],
    partners: []
  };
  const [{
    data: ms
  }, {
    data: ps
  }] = await Promise.all([supabaseAdmin.from("demand_milestones").select("id, track_id, label, status, order_index, completed_at").eq("track_id", track.id).order("order_index", {
    ascending: true
  }), supabaseAdmin.from("demand_partners").select("id, track_id, type, name, logo_url, confirmed_at").eq("track_id", track.id)]);
  return {
    track,
    milestones: ms ?? [],
    partners: ps ?? []
  };
});
const VoteInput = objectType({
  trackSlug: stringType().min(1).max(120).regex(/^[a-z0-9-]+$/),
  name: stringType().trim().min(1).max(120),
  phone: stringType().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  email: stringType().trim().email().max(255).optional().or(literalType("")),
  experienceLevel: enumType(["student", "fresher", "1-3y", "3-5y", "5y+"]),
  why: stringType().trim().min(1).max(800)
});
const castDemandVote_createServerFn_handler = createServerRpc({
  id: "08dd06c8979a4b1bd0001ca90a10d92e7d7bcd429eafb794cef3b9082e53c743",
  name: "castDemandVote",
  filename: "src/lib/demand.functions.ts"
}, (opts) => castDemandVote.__executeServer(opts));
const castDemandVote = createServerFn({
  method: "POST"
}).inputValidator((input) => VoteInput.parse(input)).handler(castDemandVote_createServerFn_handler, async ({
  data
}) => {
  const {
    data: track,
    error: te
  } = await supabaseAdmin.from("demand_tracks").select("id, status").eq("slug", data.trackSlug).maybeSingle();
  if (te) throw new Error(te.message);
  if (!track) throw new Error("Track not found");
  if (track.status === "live") {
    return {
      ok: false,
      reason: "already_live"
    };
  }
  const {
    error: ie
  } = await supabaseAdmin.from("demand_votes").insert({
    track_id: track.id,
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    experience_level: data.experienceLevel,
    why: data.why,
    verified_at: (/* @__PURE__ */ new Date()).toISOString(),
    reservation_status: "pending",
    amount_inr: 499
  });
  if (ie) {
    if (ie.code === "23505") {
      return {
        ok: false,
        reason: "duplicate"
      };
    }
    throw new Error(ie.message);
  }
  try {
    await redis.del("cache:demand_tracks", "cache:featured_demand_tracks");
  } catch (e) {
    console.warn("Failed to invalidate demand cache", e);
  }
  return {
    ok: true
  };
});
const CATEGORIES = ["engineering", "healthcare", "life-sciences", "business", "tech", "agriculture", "design", "other"];
const RequestInput = objectType({
  title: stringType().trim().min(4).max(80),
  category: enumType(CATEGORIES),
  pitch: stringType().trim().min(20).max(500),
  name: stringType().trim().min(1).max(120),
  phone: stringType().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  email: stringType().trim().email().max(255).optional().or(literalType("")),
  experienceLevel: enumType(["student", "fresher", "1-3y", "3-5y", "5y+"]),
  why: stringType().trim().min(1).max(800)
});
function slugify(input) {
  return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}
const requestDemandTrack_createServerFn_handler = createServerRpc({
  id: "d8e577c0db185eb5027fdac3582b1436d30445757f528b575b886de2986116d2",
  name: "requestDemandTrack",
  filename: "src/lib/demand.functions.ts"
}, (opts) => requestDemandTrack.__executeServer(opts));
const requestDemandTrack = createServerFn({
  method: "POST"
}).inputValidator((input) => RequestInput.parse(input)).handler(requestDemandTrack_createServerFn_handler, async ({
  data
}) => {
  const {
    createClient
  } = await import("../_libs/supabase__supabase-js.mjs");
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !anonKey) throw new Error("Supabase env vars missing");
  const client = createClient(url, anonKey, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
  const {
    data: rpc,
    error
  } = await client.rpc("request_demand_track", {
    p_title: data.title,
    p_category: data.category,
    p_pitch: data.pitch,
    p_name: data.name,
    p_phone: data.phone,
    p_email: data.email || "",
    p_experience_level: data.experienceLevel,
    p_why: data.why
  });
  if (error) {
    const msg = error.message || "";
    if (msg.includes("rate_limited")) throw new Error("Too many requests. Please try again later.");
    if (msg.includes("already_live")) {
      return {
        ok: false,
        reason: "already_live",
        slug: slugify(data.title)
      };
    }
    throw new Error(msg || "Request failed");
  }
  const result = rpc;
  if (!result.ok) {
    return {
      ok: false,
      reason: result.reason ?? "unknown",
      slug: result.slug ?? ""
    };
  }
  return {
    ok: true,
    created: Boolean(result.created),
    slug: result.slug ?? "",
    duplicateVote: Boolean(result.duplicateVote)
  };
});
export {
  castDemandVote_createServerFn_handler,
  getDemandTrackBySlug_createServerFn_handler,
  listDemandTracks_createServerFn_handler,
  listFeaturedDemandTracks_createServerFn_handler,
  requestDemandTrack_createServerFn_handler
};
