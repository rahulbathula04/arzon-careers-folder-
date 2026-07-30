# Site audit - 2026-06-30 (post track-card rebuild)

Brutal end-to-end pass across every public + admin route at desktop 1280×1800 and mobile 390×844. Screenshots live in `/tmp/browser/audit/shots/` on the build sandbox. Findings ranked **P0** (blocks conversion / breaks UX), **P1** (visible polish debt), **P2** (nice-to-have).

## Track-card fixes shipped this turn

- `src/components/track/TrackDomainGrid.tsx` - rebuilt decision strip as a 2×2 stacked grid; added `tone="dark" | "light"` so the same component reads correctly on `/` (dark) and `/apply` (pastel).
- CTA pill text was rendering as invisible dark-on-dark because `.text-meta`/`.text-caption` utilities force a color in `src/styles.css:316,328`. Replaced with raw `text-sm` + `!text-white` / `!text-ink` modifiers so cascade can't repaint the label.
- Salary values no longer truncate to `₹...`; metric labels (`SALARY HIRING DIFFICULTY DEMAND`) no longer collide.
- Tests: `tests/e2e/track-cards-keyboard-a11y.spec.ts` now asserts the 2×2 row layout at 360/768/1280 and re-runs `color-contrast` axe on `/apply`.

## Cross-cutting findings

| Sev | Where                                                                       | Issue                                                                                                                                                                                                            | Fix sketch                                                                                                                              |
| --- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| P0  | `src/styles.css:316,328,335`                                                | `.text-caption`, `.text-meta`, `.text-micro` set `color: var(--ink-…)` inside `@layer utilities`. Any component layering a Tailwind color class on top loses the cascade and renders invisible on dark surfaces. | Strip color from these size utilities; ship separate `.muted-caption` etc. when a default tone is wanted.                               |
| P0  | `src/routes/apply.index.tsx` field-order A/B (`fieldOrder`)                 | Hydration mismatch (`Full name` ↔ `WhatsApp number`) - client picks bucket _after_ SSR. Captured in `/tmp/browser/audit/shots/` console errors.                                                                  | Resolve bucket inside the route loader and pass via `Route.useLoaderData()`, or stash in a cookie so SSR + client agree on first paint. |
| P1  | `src/routes/courses.index.tsx` (search input) + footer `CounsellorLeadForm` | Hydration attribute warning on `caret-color` (Playwright-injected, but real browsers see it via password managers / extensions too).                                                                             | Strip inline `style={{ caretColor: ... }}` (none in source - confirmed external). Suppress via `suppressHydrationWarning` on inputs.    |
| P1  | `src/components/landing/Hero.tsx` proof rail                                | Five chips wrap to 3 rows on 390px and push the right-column TASK card below the fold.                                                                                                                           | Convert to a horizontally-scrollable rail at <640px (`overflow-x-auto` + `snap-x`).                                                     |
| P1  | `/career-engine/result` - IndiaMarketPanel                                  | "Tier-3 income" headline collides with the salary band card at 768px - both compete for the eye in the same 24px gap.                                                                                            | Insert section divider; bump panel vertical rhythm to `gap-y-10`.                                                                       |
| P2  | `src/components/landing/TrustLedgerStrip.tsx:37`                            | Body copy uses em-dashes as soft separators (`- resolved or open -`). Reads slightly AI-flavoured next to the cleaner copy elsewhere.                                                                            | Replace with commas or middle dot to match the rest of the site.                                                                        |
| P2  | `src/components/landing/TaskPartnershipBlock.tsx:36`                        | A/B headline "Claim your seat - limited cohort" uses urgency language that fights the de-AI memo.                                                                                                                | Rewrite to a factual variant ("Reserve a seat in the next cohort").                                                                     |
| P2  | `src/routes/admin.funnel.tsx` table cells                                   | Dozens of `-` placeholders for null values. Fine in dev; on a real demo, replace with `n/a` or blank to stop reading as visual noise.                                                                            | Helper `renderCell(val)` returning `val ?? ""`.                                                                                         |

## Per-route notes

### `/` (home)

- **Design** - Hero now reads outcome → proof → action. Track grid is the strongest credibility moment; no other section beats it. ✅
- **Language** - "Become industry ready for India's next decade." holds up. `TaskPartnershipBlock` A/B copy needs the rewrite above.
- **Conversion** - Primary CTA "Take the 3-min readiness test" + secondary WhatsApp pill both visible above the fold at 1280px. On mobile the WhatsApp pill drops below the fold by ~80px - acceptable but worth a 360px mobile screenshot if we tighten Hero spacing further.
- **A11y** - axe scope around Hero is clean. New track-grid spec adds keyboard + contrast coverage.

### `/apply`

- Track grid now legible in light tone (verified via Playwright element screenshot).
- Step 1 form still has the field-order hydration warning (P0). User-visible symptom is a brief label flicker on first paint.
- Right-column "What happens next" + "No-pressure promise" cards: copy is tight, contrast OK on light bg.

### `/courses`

- Hero copy now matches deployment-ready rule. Search input hydration warning logged.
- Course grid renders all six tracks consistently; no visible AI fingerprints.

### `/courses/$slug` (sampled pharmacovigilance)

- AIDA sequence intact. `RiskReversalBlock` no longer mentions "7-day refund" - confirmed via grep.
- `OutcomeBlock` numeric proofs are still bounded ranges, not single fabricated medians. ✅

### `/career-engine/start`

- Three-step wizard renders cleanly at mobile + desktop. No hydration errors.
- Submit button uses `tone-dark` correctly.

### `/career-engine/result`

- Verdict card hierarchy works. `IndiaMarketPanel` spacing issue noted above.
- Send-to-WhatsApp button uses founders' number - verified against `COUNSELLOR_PHONE` in `src/components/landing/constants.ts`.

### `/proof-methodology` & `/methodology`

- Long-form prose uses `.prose-arzon`; readable on both viewports.
- Citations + last-updated dates present where claimed. No fabricated numbers detected.

### `/refund-log`

- Renders the public refund register. Header copy honest. No dummy entries with placeholder names.

### `/admin` + `/admin/funnel-ce`

- Search input is dominant after the last admin pass. Lead drawer groups OK.
- Funnel page is data-dense; `-` placeholders flagged above. No P0 issues.

## Banned-phrase grep (executed against `src/components` + `src/routes`)

Patterns checked: `world-class`, `revolutionary`, `industry-leading`, `cutting-edge`, `game-changing`, `seamless`, `unlock your potential`, `next-gen`, `state-of-the-art`, `elevate your`, `empower(s|ing) you`, `7-day refund`.

Result: **0 user-visible matches** in marketing copy. Remaining matches are inside developer comments or table placeholders (em-dash `-`). Logged in `/tmp/browser/audit/grep.txt` for the record.

## Next recommended pass

1. Strip the implicit `color:` from the three typography utilities (P0). One-line change, but it unblocks every "text invisible on dark/light card" bug we keep patching.
2. Resolve A/B-bucket SSR mismatch in `/apply` (P0). Either loader-resolved or cookie-stable.
3. Mobile Hero: replace chip wrap with horizontal snap-rail at <640px (P1) to keep TASK card above the fold.
4. Replace remaining em-dashes in section copy (P2) - see `TrustLedgerStrip`, `TaskPartnershipBlock` A/B variant.
