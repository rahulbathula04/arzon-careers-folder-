import { SITE, absUrl } from "@/components/landing/constants";

/**
 * Per-route SEO helper. Returns the meta + links a leaf route needs to be
 * indexed and shared correctly.
 *
 * Pass the route path WITH a leading slash and WITHOUT trailing slash:
 *   seo("/about")
 *   seo(`/courses/${slug}`)
 */
export function seo(path: string): {
  meta: Array<{ property?: string; name?: string; content: string }>;
  links: Array<{ rel: string; href: string }>;
} {
  const url = absUrl(path);
  return {
    meta: [
      { property: "og:url", content: url },
      { name: "twitter:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

const DEFAULT_OG_IMAGE = absUrl(SITE.ogImage.inauguration);

export type PageSeoInput = {
  /** Route path beginning with "/" — used for canonical + og:url. */
  path: string;
  /** <title> and og:title. Keep under 60 characters. */
  title: string;
  /** <meta name=description> and og:description. Keep under 155 characters. */
  description: string;
  /** Absolute or root-relative image URL. Falls back to the site OG image. */
  image?: string;
  /** Override the og:type (defaults to "website"). */
  ogType?: string;
  /** Set to true to mark this page as noindex (e.g. personalised result pages). */
  noindex?: boolean;
};

/**
 * One-call SEO helper that emits the full set of canonical + Open Graph +
 * Twitter tags for a route. Use this on every public, shareable page so we
 * never miss og:image or twitter:card again.
 */
export function pageSeo(input: PageSeoInput): {
  meta: Array<{ property?: string; name?: string; content: string }>;
  links: Array<{ rel: string; href: string }>;
} {
  const { path, title, description, ogType = "website", noindex } = input;
  const url = absUrl(path);
  const image = input.image ? absUrl(input.image) : DEFAULT_OG_IMAGE;

  const meta: Array<{ property?: string; name?: string; content: string }> = [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: ogType },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:width", content: String(SITE.ogImage.width) },
    { property: "og:image:height", content: String(SITE.ogImage.height) },
    { property: "og:image:alt", content: SITE.ogImage.alt },
    { property: "og:locale", content: "en_IN" },
    { property: "og:site_name", content: "Arzon Global" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:url", content: url },
  ];
  if (noindex) {
    meta.push({ name: "robots", content: "noindex,nofollow" });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export const SITE_ORIGIN = SITE.origin;
