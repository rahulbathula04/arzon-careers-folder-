export const MOMENT_CATEGORIES = [
  "launch",
  "media",
  "partnership",
  "campus",
  "team",
  "other",
] as const;
export type MomentCategory = (typeof MOMENT_CATEGORIES)[number];

export const MOMENT_STATUSES = ["draft", "published"] as const;
export type MomentStatus = (typeof MOMENT_STATUSES)[number];

export const MOMENTS_BUCKET = "media";
export const MOMENTS_PREFIX = "moments";
export const MOMENT_IMAGE_CAP = 10;

export type MomentImage = {
  id: string;
  moment_id: string;
  storage_path: string;
  alt: string;
  caption: string | null;
  width: number | null;
  height: number | null;
  position: number;
  created_at: string;
  url: string;
};

export type MomentSummary = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  event_date: string;
  location: string | null;
  category: MomentCategory;
  status: MomentStatus;
  published_at: string | null;
  cover_image_id: string | null;
  cover_url: string | null;
  image_count: number;
  updated_at: string;
};

export type MomentDetail = MomentSummary & {
  body: string;
  images: MomentImage[];
};

export function publicUrlForPath(supabaseUrl: string, path: string): string {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${MOMENTS_BUCKET}/${path}`;
}
