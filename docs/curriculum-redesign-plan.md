# Plan — Adopt Curriculum-style "track" design across the site

The `/curriculum` page is the design target. Each track gets a locked color identity (dark-canvas, color-tinted gradient hero panel, matching chip + progress bars), and the rest of the site adopts the same hero-panel + module-card grammar.

The user loves three things from `/curriculum`:

1. **Dark canvas, color-tinted gradient hero panel per track** with eyebrow chip, big serif/display title, one-line outcome, hiring metros + JD sources, and a "Last change" line.
2. **Three-stat strip** at top right: JDs reviewed · Modules · Last refresh.
3. **Module cards** below: `MODULE N · Wk` eyebrow, title, bullet list, deliverable, "Maps to JD" footnote, and a track-colored `% of JDs` chip top-right.

## Locked track color tokens (single source of truth)

New file: `src/data/trackTheme.ts` — exports `TRACK_THEME[slug]` with:

| Track slug                                                                    | Hero gradient                          | Chip / accent | Icon        |
| ----------------------------------------------------------------------------- | -------------------------------------- | ------------- | ----------- |
| pharmacovigilance                                                             | sky → blue (`#0EA5E9 → #2563EB`)       | sky-300       | Shield      |
| medical-coding                                                                | violet → indigo (`#8B5CF6 → #4F46E5`)  | violet-300    | Stethoscope |
| clinical-data-management                                                      | amber → orange (`#F59E0B → #EA580C`)   | amber-300     | BarChart3   |
| sas-clinical                                                                  | rose → pink (`#F43F5E → #EC4899`)      | rose-300      | LineChart   |
| regulatory-affairs                                                            | fuchsia → purple (`#D946EF → #9333EA`) | fuchsia-300   | Scroll      |
| medical-writing                                                               | cyan → sky (`#06B6D4 → #0EA5E9`)       | cyan-300      | PenLine     |
| (tech tracks reuse the same palette family they already have in `CourseCard`) |

Each entry exposes: `grad`, `ring`, `chip`, `accentText`, `progressGrad`, `icon`. Existing `curriculum.tsx` `TRACK_THEME` is moved into this file and re-imported.

## Shared components (extracted from `curriculum.tsx`)

1. `src/components/tracks/TrackHeroPanel.tsx` — the colored gradient panel: eyebrow chip, icon tile, h1 serif title, one-line outcome, hiring metros + sources row, "Last change" callout, right-side 3-stat strip.
2. `src/components/tracks/TrackModuleCard.tsx` — module card with bullets, deliverable, JD footnote, and the colored `% of JDs` chip.
3. `src/components/tracks/TrackJDPhrases.tsx` — recurring JD phrases bar chart using the track's `progressGrad`.
4. `src/components/tracks/TrackSection.tsx` — composes hero + module grid + JD phrases + "Apply for this track" CTA. `curriculum.tsx` re-renders using these.

No visual change on `/curriculum` itself — it just stops being a one-off and becomes the canonical implementation.

## Page-by-page rebuild

### Home (`/`)

- Replace the existing "Programmes" preview block on the homepage with a **horizontal carousel of 6 `TrackHeroPanel`s** (one per track, locked color). Each panel links to `/courses/$slug`.
- "Why us" section restyled into a 4-card grid using the same `card-dark` chrome as `TrackModuleCard` (no color tint — neutral dark).
- Final CTA = a `TrackHeroPanel`-styled dark panel with a brand-blue gradient (not a track color; brand = `#0056D2`).

### Programmes (`/courses`)

- Each `CourseCard` repainted to match `TrackHeroPanel` chrome: dark surface, track-color top accent strip (3px), eyebrow chip in track color, h-card title in serif, salary + AI-posture strip becomes the curriculum-style metric strip. The course thumbnail stays.
- Grid stays 3-up at desktop, 1-up at mobile.
- Filter chips at top reuse `chip` color of the matched track when active.

### Course detail (`/courses/$slug`)

- Hero replaced with `TrackHeroPanel` for that slug (eyebrow, serif title, blurb, hiring metros, 3-stat strip).
- Syllabus uses `TrackModuleCard`.
- JD provenance uses `TrackJDPhrases`.
- Pricing tile + Apply CTA at the bottom inherit the track color.

### Why us (`/about` and the homepage "Why us" block)

- New `/why-us` route (if not already a section) using the curriculum chrome: hero panel with a neutral brand-blue gradient, then a 4-card grid of pillars (`Deployment-ready · JD-mapped · Mentor + cohort · Placement support`).
- Each pillar card uses `TrackModuleCard` shape with a small neutral "PILLAR N" eyebrow.

### Pricing (`/pricing` / `Pricing` component)

- Outer wrapper becomes a curriculum-style dark panel with brand-blue gradient.
- Three tier cards (`Essential / Career / Elite`) repainted as `TrackHeroPanel`-style cards. Career tier locks **brand blue** (`#0056D2`), Essential locks **slate**, Elite locks **emerald** (`#0d7a5f`). These are the three "tier colors" — not track colors.
- Existing break-even reframe block stays, restyled to the new dark chrome.

### FAQ (`/` FAQ block, also `/faq` if present)

- Wrap inside the curriculum dark canvas. Accordion items become `TrackModuleCard`-shaped panels with a neutral slate accent strip. Question = `h-card` serif. Answer body uses the same `body-lg` token as curriculum.

### Proof (`/proof`, `/trust-report`, `/credibility`)

- Page header becomes a `TrackHeroPanel` with brand-blue gradient.
- Testimonial / stat / press cards become `TrackModuleCard` variants.
- "JD Mirror" and "JDProvenance" badges adopt the track chip color for whichever track they refer to.

### Apply (`/apply`, `/apply/index`, `/apply/review`, `/apply/confirm`, `/apply/success`)

- Wrap the whole funnel in a `TrackHeroPanel` whose color = the selected track (carried via `?track=` search param). This gives the applicant a visual thread.
- Form fields adopt the white-card-on-dark pattern already used by `CounsellorLeadForm`.
- Success page = `TrackHeroPanel` + a single `TrackModuleCard` listing next steps.

## Rollout order

1. Extract `TRACK_THEME` → `src/data/trackTheme.ts`. Rewrite `curriculum.tsx` to import it. Build, confirm no visual change.
2. Extract `TrackHeroPanel`, `TrackModuleCard`, `TrackJDPhrases`, `TrackSection`. Re-render `/curriculum` through them. Build + screenshot diff to confirm parity.
3. Repaint `CourseCard` and `/courses/$slug` hero.
4. Repaint Home (`Programmes preview`, `Why us`, `FinalCTA`).
5. Repaint Pricing, FAQ.
6. Repaint Proof routes.
7. Repaint Apply funnel.
8. Lighthouse + `scripts/check-contrast.mjs` + `scripts/ui-audit.mjs` after every page swap.

## Out of scope (do NOT touch)

- Admin routes (`/admin/*`), career-engine quiz UI, learn player, internships landing — these have their own design languages.
- Mobile sticky CTA (already removed).
- Backend / data shape changes.

## Verification per page

- `bunx playwright test tests/e2e/full-pages-visual.spec.ts --update-snapshots` per page after the swap.
- Manual check at 1017×641 (user's viewport) and at 1440×900.
- Confirm each track's color is **identical** on `/`, `/courses`, `/courses/$slug`, `/curriculum`, `/apply?track=...` — the locked color is the contract.
