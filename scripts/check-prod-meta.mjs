#!/usr/bin/env node
/**
 * Production smoke check: fetches a handful of key live route URLs and
 * verifies the rendered HTML carries the meta tags we expect (title,
 * description, canonical, og:image, og:title, twitter:card).
 *
 * Run after deploy:
 *   BASE_URL=https://arzoncareers.in node scripts/check-prod-meta.mjs
 *
 * In CI this runs against the published production origin so we catch
 * any drift between source `pageSeo()` declarations and what actually
 * ships to crawlers (CDN cache, redirect, header strip, etc).
 */

const BASE_URL = (process.env.BASE_URL || "https://arzoncareers.in").replace(/\/$/, "");

/**
 * Expected per-route meta. Values are substrings - the assertion passes
 * when the rendered tag's content INCLUDES the expected string. Keep
 * substrings short and stable so wording tweaks don't flap the check.
 */
const ROUTES = [
  {
    path: "/",
    title: "Arzon",
    description: /.+/,
    canonical: `${BASE_URL}/`,
    ogImage: /\/og\/.+\.(jpg|png|webp)/i,
    ogTitle: "Arzon",
  },
  {
    path: "/about",
    title: "About",
    description: /.+/,
    canonical: `${BASE_URL}/about`,
    ogImage: /\/og\/.+\.(jpg|png|webp)/i,
    ogTitle: "About",
  },
  {
    path: "/courses",
    title: /courses|programmes/i,
    description: /.+/,
    canonical: `${BASE_URL}/courses`,
    ogImage: /\/og\/.+\.(jpg|png|webp)/i,
  },
  {
    path: "/career-engine",
    title: /career/i,
    description: /.+/,
    canonical: `${BASE_URL}/career-engine`,
    ogImage: /\/og\/.+\.(jpg|png|webp)/i,
  },
  {
    path: "/contact",
    title: /contact/i,
    description: /.+/,
    canonical: `${BASE_URL}/contact`,
    ogImage: /\/og\/.+\.(jpg|png|webp)/i,
  },
];

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractMeta(html, { name, property }) {
  // Match <meta ... content="..."> in either attribute order.
  const attr = name ? `name=["']${name}["']` : `property=["']${property}["']`;
  const re1 = new RegExp(`<meta[^>]*${attr}[^>]*content=["']([^"']*)["']`, "i");
  const re2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}`, "i");
  const m = html.match(re1) || html.match(re2);
  return m ? m[1].trim() : null;
}

function extractCanonical(html) {
  const re1 = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i;
  const re2 = /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i;
  const m = html.match(re1) || html.match(re2);
  return m ? m[1].trim() : null;
}

function matches(actual, expected) {
  if (actual == null) return false;
  if (expected instanceof RegExp) return expected.test(actual);
  return actual.includes(expected);
}

async function checkRoute(route) {
  const url = `${BASE_URL}${route.path}`;
  const failures = [];
  let html;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "ArzonProdMetaCheck/1.0" },
    });
    if (!res.ok) {
      return { url, failures: [`HTTP ${res.status}`] };
    }
    html = await res.text();
  } catch (err) {
    return { url, failures: [`fetch failed: ${err.message}`] };
  }

  const title = extractTitle(html);
  const description = extractMeta(html, { name: "description" });
  const canonical = extractCanonical(html);
  const ogImage = extractMeta(html, { property: "og:image" });
  const ogTitle = extractMeta(html, { property: "og:title" });
  const twitterCard = extractMeta(html, { name: "twitter:card" });

  if (!matches(title, route.title)) failures.push(`title mismatch - got: ${JSON.stringify(title)}`);
  if (!matches(description, route.description)) failures.push(`description missing/empty`);
  if (!matches(canonical, route.canonical))
    failures.push(
      `canonical mismatch - got: ${JSON.stringify(canonical)}, want: ${route.canonical}`,
    );
  if (!matches(ogImage, route.ogImage))
    failures.push(`og:image mismatch - got: ${JSON.stringify(ogImage)}`);
  if (route.ogTitle && !matches(ogTitle, route.ogTitle))
    failures.push(`og:title mismatch - got: ${JSON.stringify(ogTitle)}`);
  if (!twitterCard) failures.push(`missing twitter:card`);

  return { url, failures };
}

const results = await Promise.all(ROUTES.map(checkRoute));
let failed = 0;
for (const r of results) {
  if (r.failures.length) {
    failed++;
    console.error(`\n[check-prod-meta] FAIL ${r.url}`);
    for (const f of r.failures) console.error(`  - ${f}`);
  } else {
    console.log(`[check-prod-meta] OK   ${r.url}`);
  }
}
if (failed) {
  console.error(
    `\n[check-prod-meta] ${failed} of ${results.length} route(s) failed against ${BASE_URL}`,
  );
  process.exit(1);
}
console.log(`\n[check-prod-meta] OK · ${results.length} routes verified against ${BASE_URL}`);
