import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { redis } from "./redis.server";

export type DemandTrack = {
  id: string;
  slug: string;
  title: string;
  category: string;
  pitch: string | null;
  status: "voting" | "building" | "live";
  votes_count: number;
  vote_threshold: number;
  founding_cap: number;
  founding_filled: number;
  eta_days: number;
  build_started_at: string | null;
  launch_eta: string | null;
  live_course_slug: string | null;
};

export type DemandMilestone = {
  id: string;
  track_id: string;
  label: string;
  status: "pending" | "in_progress" | "done";
  order_index: number;
  completed_at: string | null;
};

export type DemandPartner = {
  id: string;
  track_id: string;
  type: "mentor" | "internship";
  name: string;
  logo_url: string | null;
  confirmed_at: string | null;
};

/** Public list of all tracks (read with the service role so this works on prerender). */
export const listDemandTracks = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cached = await redis.get<DemandTrack[]>("cache:demand_tracks");
    if (cached) return { tracks: cached };
  } catch (e) {
    console.warn("Redis get failed for demand_tracks", e);
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("demand_tracks")
      .select(
        "id, slug, title, category, pitch, status, votes_count, vote_threshold, founding_cap, founding_filled, eta_days, build_started_at, launch_eta, live_course_slug",
      )
      .order("status", { ascending: true })
      .order("votes_count", { ascending: false });

    if (error) {
      console.error("[listDemandTracks] Error, returning fallback:", error);
      return { tracks: [] };
    }

    const tracks = (data ?? []) as DemandTrack[];

    try {
      await redis.setex("cache:demand_tracks", 60, JSON.stringify(tracks));
    } catch (e) {
      console.warn("Redis set failed for demand_tracks", e);
    }

    return { tracks };
  } catch (err) {
    console.error("[listDemandTracks] Exception, returning fallback:", err);
    return { tracks: [] };
  }
});

/** Top N most-requested tracks for the homepage strip. */
export const listFeaturedDemandTracks = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cached = await redis.get<DemandTrack[]>("cache:featured_demand_tracks");
    if (cached) return { tracks: cached };
  } catch (e) {
    console.warn("Redis get failed for featured_demand_tracks", e);
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("demand_tracks")
      .select(
        "id, slug, title, category, pitch, status, votes_count, vote_threshold, founding_cap, founding_filled, eta_days, build_started_at, launch_eta, live_course_slug",
      )
      .in("status", ["building", "voting"])
      .order("status", { ascending: true })
      .order("votes_count", { ascending: false })
      .limit(3);

    if (error) {
      console.error("[listFeaturedDemandTracks] Error, returning fallback:", error);
      return { tracks: [] };
    }

    const tracks = (data ?? []) as DemandTrack[];

    try {
      await redis.setex("cache:featured_demand_tracks", 60, JSON.stringify(tracks));
    } catch (e) {
      console.warn("Redis set failed for featured_demand_tracks", e);
    }

    return { tracks };
  } catch (err) {
    console.error("[listFeaturedDemandTracks] Exception, returning fallback:", err);
    return { tracks: [] };
  }
});

/** Track + milestones + partners for a single slug. */
export const getDemandTrackBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const { data: track, error: te } = await supabaseAdmin
      .from("demand_tracks")
      .select(
        "id, slug, title, category, pitch, status, votes_count, vote_threshold, founding_cap, founding_filled, eta_days, build_started_at, launch_eta, live_course_slug",
      )
      .eq("slug", data.slug)
      .maybeSingle();
    if (te) throw new Error(te.message);
    if (!track)
      return { track: null, milestones: [] as DemandMilestone[], partners: [] as DemandPartner[] };

    const [{ data: ms }, { data: ps }] = await Promise.all([
      supabaseAdmin
        .from("demand_milestones")
        .select("id, track_id, label, status, order_index, completed_at")
        .eq("track_id", track.id)
        .order("order_index", { ascending: true }),
      supabaseAdmin
        .from("demand_partners")
        .select("id, track_id, type, name, logo_url, confirmed_at")
        .eq("track_id", track.id),
    ]);

    return {
      track: track as DemandTrack,
      milestones: (ms ?? []) as DemandMilestone[],
      partners: (ps ?? []) as DemandPartner[],
    };
  });

/** Submit a verified-by-phone vote / seat reservation. */
const VoteInput = z.object({
  trackSlug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(1).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  experienceLevel: z.enum(["student", "fresher", "1-3y", "3-5y", "5y+"]),
  why: z.string().trim().min(1).max(800),
});

export const castDemandVote = createServerFn({ method: "POST" })
  .inputValidator((input) => VoteInput.parse(input))
  .handler(async ({ data }) => {
    const { data: track, error: te } = await supabaseAdmin
      .from("demand_tracks")
      .select("id, status")
      .eq("slug", data.trackSlug)
      .maybeSingle();
    if (te) throw new Error(te.message);
    if (!track) throw new Error("Track not found");
    if (track.status === "live") {
      return { ok: false as const, reason: "already_live" as const };
    }

    // Placeholder verification: we trust the phone as "verified_at = now()"
    // until the payment gateway / OTP provider is wired. Reservation stays
    // 'pending' until a real ₹499 charge is settled.
    const { error: ie } = await supabaseAdmin.from("demand_votes").insert({
      track_id: track.id,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      experience_level: data.experienceLevel,
      why: data.why,
      verified_at: new Date().toISOString(),
      reservation_status: "pending",
      amount_inr: 499,
    });
    if (ie) {
      if (ie.code === "23505") {
        return { ok: false as const, reason: "duplicate" as const };
      }
      throw new Error(ie.message);
    }

    // Invalidate Redis cache
    try {
      await redis.del("cache:demand_tracks", "cache:featured_demand_tracks");
    } catch (e) {
      console.warn("Failed to invalidate demand cache", e);
    }

    return { ok: true as const };
  });

/* ----------------------------------------------------------------- */
/* Request a brand-new track (visitor-proposed). Inserts a voting    */
/* row and records the requester as the first verified vote so the   */
/* threshold counter is honest from day zero.                        */
/* ----------------------------------------------------------------- */

const CATEGORIES = [
  "engineering",
  "healthcare",
  "life-sciences",
  "business",
  "tech",
  "agriculture",
  "design",
  "other",
] as const;

const RequestInput = z.object({
  title: z.string().trim().min(4).max(80),
  category: z.enum(CATEGORIES),
  pitch: z.string().trim().min(20).max(500),
  name: z.string().trim().min(1).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  experienceLevel: z.enum(["student", "fresher", "1-3y", "3-5y", "5y+"]),
  why: z.string().trim().min(1).max(800),
});

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export const requestDemandTrack = createServerFn({ method: "POST" })
  .inputValidator((input) => RequestInput.parse(input))
  .handler(async ({ data }) => {
    // Route through the SECURITY DEFINER RPC that enforces rate limits and
    // column-level validation server-side, instead of using the service-role
    // client to bypass RLS on `demand_tracks` / `demand_votes`.
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !anonKey) throw new Error("Supabase env vars missing");
    const client = createClient(url, anonKey, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { data: rpc, error } = await client.rpc("request_demand_track", {
      p_title: data.title,
      p_category: data.category,
      p_pitch: data.pitch,
      p_name: data.name,
      p_phone: data.phone,
      p_email: data.email || "",
      p_experience_level: data.experienceLevel,
      p_why: data.why,
    });
    if (error) {
      const msg = error.message || "";
      if (msg.includes("rate_limited"))
        throw new Error("Too many requests. Please try again later.");
      if (msg.includes("already_live")) {
        return { ok: false as const, reason: "already_live" as const, slug: slugify(data.title) };
      }
      throw new Error(msg || "Request failed");
    }
    const result = rpc as {
      ok: boolean;
      created?: boolean;
      slug?: string;
      duplicateVote?: boolean;
      reason?: string;
    };
    if (!result.ok) {
      return {
        ok: false as const,
        reason: (result.reason ?? "unknown") as "already_live",
        slug: result.slug ?? "",
      };
    }
    return {
      ok: true as const,
      created: Boolean(result.created),
      slug: result.slug ?? "",
      duplicateVote: Boolean(result.duplicateVote),
    };
  });
