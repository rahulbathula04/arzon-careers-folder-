const MOMENT_CATEGORIES = [
  "launch",
  "media",
  "partnership",
  "campus",
  "team",
  "other"
];
const MOMENT_STATUSES = ["draft", "published"];
const MOMENTS_BUCKET = "media";
const MOMENTS_PREFIX = "moments";
const MOMENT_IMAGE_CAP = 10;
function publicUrlForPath(supabaseUrl, path) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${MOMENTS_BUCKET}/${path}`;
}
export {
  MOMENT_STATUSES as M,
  MOMENT_CATEGORIES as a,
  MOMENTS_BUCKET as b,
  MOMENTS_PREFIX as c,
  MOMENT_IMAGE_CAP as d,
  publicUrlForPath as p
};
