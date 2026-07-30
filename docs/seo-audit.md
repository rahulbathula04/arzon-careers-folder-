# Arzon Global · SEO Audit (Phase 2)

_Last updated: 2026-05-01_

This document is the running audit + backlog. P0 items are fixed in this phase; P1/P2 are tracked here for follow-up sprints.

## Status legend

- ✅ shipped this phase
- 🟡 partial / scaffolded (needs values)
- ⏳ tracked for next sprint

---

## P0 - fix this week

| #   | Issue                                                      | Status                                                                                                                         |
| --- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | No GA4 / Search Console wired in `<head>`                  | 🟡 env-gated loader scaffolded in `src/lib/analytics.ts`. Set `VITE_GA4_MEASUREMENT_ID` + `VITE_GSC_VERIFICATION` to activate. |
| 2   | Host split-brain: sitemap on apex, route canonicals on www | ✅ normalised - sitemap & canonicals both `https://www.arzonglobal.com`                                                        |
| 3   | No `FAQPage` schema on home/hub                            | ✅ added on `/internships`; `/` already has video schema                                                                       |
| 4   | No `ItemList` schema on `/internships` hub                 | ✅ added                                                                                                                       |
| 5   | No `Course` JSON-LD per `/courses/$slug`                   | ✅ wired (was already in route)                                                                                                |
| 6   | No `Review`/`AggregateRating` despite testimonials         | 🟡 helper shipped; populate `src/data/reviews.ts` to enable                                                                    |
| 7   | Generic homepage title (no keywords)                       | ✅ rewritten to "Healthcare Internships in India · ICD-10, PV, CDM · Arzon Global"                                             |
| 8   | Build had no SEO regression guard                          | ✅ `scripts/check-meta.mjs` + `scripts/check-jsonld.mjs` wired into `prebuild`                                                 |

## P1 - next sprint

| #   | Issue                                                                                                                   | Plan                                                |
| --- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 9   | `/cohorts`, `/proof`, `/refund`, `/verify`, `/courses`, `/career-engine`, `/legal/*` lack route-level OG image override | Add per-route OG images (one per shareable surface) |
| 10  | `robots.txt` previously allowed flat-route admin paths (e.g. `/admin.login`)                                            | ✅ fixed with `Disallow: /admin.`                   |
| 11  | Footer links to all 25 programmes not yet visually balanced for mobile                                                  | Add a collapsible "Programmes" disclosure on mobile |
| 12  | Sitemap `lastmod` is "today" for every URL                                                                              | Use git mtime per route file (post-Phase 2)         |

## P2 - nice to have

- Add `hreflang="en-IN"` self-reference on every canonical
- `Article` schema on `/proof` (long-form)
- IndexNow + sitemap ping on every deploy
- Per-programme social share image (currently shares the launch image)
- Add `BreadcrumbList` schema to `/career-engine/path/$slug`

## Tracking & verification

- **GA4**: `src/lib/analytics.ts` ships `ga4BootScript()` and `trackPageView()`. Loaded only when `VITE_GA4_MEASUREMENT_ID` is set. SPA navigation page_view is fired from the `RootComponent` `useEffect` so canonical URLs are recorded for every route change.
- **Search Console**: `<meta name="google-site-verification">` is rendered when `VITE_GSC_VERIFICATION` is set. Add the token from GSC → "URL prefix" → "HTML tag method".
- **Sitemap**: `/sitemap.xml` is dynamic, includes all 25 courses + 3 internships + career-engine paths + static pages = 45 URLs. Always emits the canonical www host.
- **robots.txt**: blocks `/admin*`, `/apply/{confirm,review,success}`, `/career-engine/{result,lead,start}`, `/dashboard`, `/learn/`, `/api/`. Single canonical sitemap entry.

## Validators run

- `pnpm prebuild` (or `bun run prebuild`) runs all SEO guards in addition to RLS / asset / reduced-motion / sitemap parity checks.
- Manual: paste any production URL into <https://search.google.com/test/rich-results> and confirm Course / FAQPage / Organization rich results.
