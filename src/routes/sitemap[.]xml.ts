import { createFileRoute } from "@tanstack/react-router";
import { COURSES_BY_SLUG } from "@/data/courses";
import { CITIES } from "@/data/industry/cities";
import { ROLES_BY_SLUG } from "@/data/industry/roles";
import { findPayBand } from "@/data/industry/cities";
import { listMomentSitemap } from "@/lib/moments.functions";

/**
 * Each static entry: path, priority, changefreq, optional og:image (relative).
 * Tiered priorities: home 1.0, hub/internship leaves 0.9, supporting 0.6,
 * legal 0.3.
 */
const STATIC_ENTRIES: Array<{
  path: string;
  priority: string;
  changefreq: string;
  image?: string;
  imageAlt?: string;
}> = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "daily",
    image: "/og/og-inauguration.jpg",
    imageAlt: "Arzon Global public launch event",
  },
  {
    path: "/about",
    priority: "0.7",
    changefreq: "monthly",
    image: "/og/about.jpg",
    imageAlt: "About Arzon Global",
  },
  {
    path: "/contact",
    priority: "0.6",
    changefreq: "monthly",
    image: "/og/about.jpg",
    imageAlt: "Contact Arzon Global",
  },
  {
    path: "/cohorts",
    priority: "0.7",
    changefreq: "weekly",
    image: "/og/internships.jpg",
    imageAlt: "Arzon Global cohort schedule",
  },
  {
    path: "/jd-mirror",
    priority: "0.8",
    changefreq: "monthly",
    image: "/og/internships.jpg",
    imageAlt: "Arzon Careers JD Mirror - syllabus from real Indian JDs",
  },
  {
    path: "/refund",
    priority: "0.4",
    changefreq: "yearly",
    image: "/og/legal.jpg",
    imageAlt: "Arzon Global refund policy",
  },
  {
    path: "/verify",
    priority: "0.5",
    changefreq: "monthly",
    image: "/og/legal.jpg",
    imageAlt: "Verify Arzon Global certificate",
  },
  {
    path: "/courses",
    priority: "0.9",
    changefreq: "weekly",
    image: "/og/internships.jpg",
    imageAlt: "Arzon Global programmes",
  },
  {
    path: "/career-engine",
    priority: "0.8",
    changefreq: "weekly",
    image: "/og/career-engine.jpg",
    imageAlt: "Arzon Career Engine fit test",
  },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  {
    path: "/legal/privacy",
    priority: "0.3",
    changefreq: "yearly",
    image: "/og/legal.jpg",
    imageAlt: "Arzon Global privacy notice",
  },
  {
    path: "/legal/terms",
    priority: "0.3",
    changefreq: "yearly",
    image: "/og/legal.jpg",
    imageAlt: "Arzon Global terms of service",
  },
  { path: "/changelog", priority: "0.5", changefreq: "weekly" },
  { path: "/refer", priority: "0.6", changefreq: "monthly" },
  { path: "/status", priority: "0.3", changefreq: "weekly" },
  { path: "/courses/compare", priority: "0.7", changefreq: "monthly" },
  { path: "/industry", priority: "0.9", changefreq: "weekly" },
  { path: "/industry/salaries", priority: "0.8", changefreq: "weekly" },
  { path: "/industry/employers", priority: "0.8", changefreq: "weekly" },
  { path: "/industry/compare", priority: "0.8", changefreq: "weekly" },
  { path: "/industry/pharmacovigilance", priority: "0.8", changefreq: "monthly" },
  { path: "/industry/medical-coding", priority: "0.8", changefreq: "monthly" },
  { path: "/industry/clinical-data-management", priority: "0.8", changefreq: "monthly" },
  { path: "/industry/regulatory-affairs", priority: "0.8", changefreq: "monthly" },
  { path: "/industry/ai-in-healthcare", priority: "0.8", changefreq: "monthly" },
  { path: "/build", priority: "0.8", changefreq: "weekly" },
  { path: "/build/request", priority: "0.6", changefreq: "monthly" },
  { path: "/curriculum", priority: "0.7", changefreq: "monthly" },
  { path: "/acri", priority: "0.7", changefreq: "monthly" },
  { path: "/recruiters", priority: "0.8", changefreq: "monthly" },
  { path: "/tpos", priority: "0.8", changefreq: "monthly" },
  {
    path: "/moments",
    priority: "0.7",
    changefreq: "weekly",
    image: "/og/og-inauguration.jpg",
    imageAlt: "Arzon Moments - our story in photos",
  },
  {
    path: "/why-arzon",
    priority: "0.8",
    changefreq: "monthly",
    image: "/og/about.jpg",
    imageAlt: "Why Arzon - proof, methodology and credibility",
  },
  {
    path: "/roadmap",
    priority: "0.6",
    changefreq: "weekly",
    image: "/og/about.jpg",
    imageAlt: "Arzon infrastructure roadmap",
  },
];

// Backwards-compat for existing parity check script which scans for STATIC_PATHS.
const STATIC_PATHS = STATIC_ENTRIES.map((e) => e.path);
void STATIC_PATHS;

const CAREER_PATH_SLUGS = ["pharma", "tech", "business"] as const;

// Canonical host (with www). Apex requests are normalised to this in the
// sitemap so Google never indexes split apex/www URLs.
const CANONICAL_HOST = "arzoncareers.in";

function originFromRequest(_request: Request): string {
  // Always emit the canonical production host. The sitemap advertises URLs
  // for crawlers - preview / *.lovable.app hosts should never appear in it,
  // even when the sitemap is fetched from a preview deploy.
  return `https://${CANONICAL_HOST}`;
}

function urlEntry(
  origin: string,
  path: string,
  lastmod: string,
  priority = "0.7",
  changefreq = "weekly",
  image?: { href: string; alt?: string },
) {
  // Self-referencing hreflang signals locale + canonical URL to Google in
  // a single line. We only ship one locale (en-IN) so x-default points to
  // the same URL.
  const loc = `${origin}${path}`;
  const hreflang =
    `<xhtml:link rel="alternate" hreflang="en-IN" href="${loc}"/>` +
    `<xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`;
  const img = image
    ? `<image:image><image:loc>${origin}${image.href}</image:loc>${
        image.alt ? `<image:title>${escapeXml(image.alt)}</image:title>` : ""
      }</image:image>`
    : "";
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${hreflang}${img}</url>`;
}

function escapeXml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&apos;",
  );
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = originFromRequest(request);
        // Use UTC date so the sitemap is byte-stable for the rest of the day.
        const lastmod = new Date().toISOString().slice(0, 10);
        const entries: string[] = [];
        for (const e of STATIC_ENTRIES) {
          entries.push(
            urlEntry(
              origin,
              e.path,
              lastmod,
              e.priority,
              e.changefreq,
              e.image ? { href: e.image, alt: e.imageAlt } : undefined,
            ),
          );
        }
        // Every programme page derived from the real course catalogue.
        for (const slug of Object.keys(COURSES_BY_SLUG)) {
          entries.push(urlEntry(origin, `/courses/${slug}`, lastmod, "0.8", "weekly"));
        }
        for (const slug of CAREER_PATH_SLUGS) {
          entries.push(urlEntry(origin, `/career-engine/path/${slug}`, lastmod, "0.6", "weekly"));
        }
        // Programmatic city × role landing pages (36 long-tail SEO targets).
        // Only emit combinations that have real per-city pay data.
        for (const role of Object.values(ROLES_BY_SLUG)) {
          for (const city of CITIES) {
            if (!findPayBand(role.pay, city)) continue;
            entries.push(
              urlEntry(origin, `/industry/${role.slug}/${city.slug}`, lastmod, "0.6", "monthly"),
            );
          }
        }
        // Published Arzon Moments - dynamic, never fail the sitemap if DB is slow.
        try {
          const { items } = await listMomentSitemap();
          for (const m of items) {
            const lm = (m.updated_at || lastmod).slice(0, 10);
            entries.push(urlEntry(origin, `/moments/${m.slug}`, lm, "0.6", "monthly"));
          }
        } catch {
          // ignore - moments are optional in the sitemap
        }
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.sitemaps.org/schemas/sitemap-image/0.9">\n${entries.join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
