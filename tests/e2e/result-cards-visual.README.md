# Result-cards visual regression

Deterministic per-card pixel snapshots for the Career Engine result page.
The harness route `/dev/cards` renders every card with mocked data so
snapshots don't depend on a quiz session or a live database write.

## What gets snapshotted

Each card in the harness is screenshotted across a matrix of:

- **10 cards** - `acri`, `flagship`, `secondary`, `compare`, `gapmap`,
  `focus-stack`, `next-step`, `internship-tracks`, `mentor-brief`,
  `primitives`.
- **9 viewports** - `mobile-320`, `mobile-360`, `mobile-375`,
  `mobile-390`, `mobile-414`, `tablet-768`, `tablet-1024`,
  `desktop-1280`, `desktop-1440`.
- **2 themes** - `dark` (matches `/career-engine/result`) and `light`.

Snapshot filenames follow `${card}-${viewport}-${theme}.png` and live
next to the spec at
`tests/e2e/result-cards-visual.spec.ts-snapshots/`.

`internship-tracks` and `mentor-brief` only render when the harness URL
includes `?harness=1`. The spec always passes that flag; the visual
toggle in the page header lets you flip it manually while developing.

## Mocks (how `?harness=1` keeps things deterministic)

- **`createShareCard` server fn** - `installHarnessMocks()` in
  `src/routes/dev.cards.tsx` patches `window.fetch` to short-circuit any
  request whose URL matches `createShareCard|share-card|_serverFn`,
  returning `{ slug: "mock-brief-slug" }` synchronously.
- **MentorBrief cache** - the same hook pre-seeds
  `localStorage["arz_brief_pv_64_pharmacovigilance"] = "mock-brief-slug"`
  so the component skips the mint call entirely on first render.
- **`InternshipTracksCard` `pathFits`** - a fixed five-track ranking is
  hardcoded in the harness so the snapshot is stable across releases of
  the scoring engine.

## Run locally

```bash
# Run the full matrix (chromium-default only)
bunx playwright test result-cards-visual

# Update all snapshots after an intentional design change
bunx playwright test result-cards-visual --update-snapshots

# Open the harness in a browser to debug a specific card
bun dev
# then visit http://localhost:5173/dev/cards?theme=dark&harness=1
```

### Snapshot only specific cards

Set `SNAPSHOT_CARDS` to a comma-separated list of card IDs to scope the
run. The viewport × theme matrix still runs for those cards, but every
other card is skipped - ideal for iterating on a single diff:

```bash
SNAPSHOT_CARDS=mentor-brief bunx playwright test result-cards-visual
SNAPSHOT_CARDS=mentor-brief,acri bunx playwright test result-cards-visual --update-snapshots
```

Valid IDs: `acri`, `flagship`, `secondary`, `compare`, `gapmap`,
`focus-stack`, `next-step`, `internship-tracks`, `mentor-brief`,
`primitives`.

## Pixel-diff thresholds (anti-aliasing tolerance)

Per-card snapshots use Playwright's `threshold: 0.2` (per-channel YIQ
delta below which two pixels are considered equal) combined with
`maxDiffPixelRatio: 0.005`. `threshold` absorbs sub-pixel font hinting
and AA jitter that vary across runners; `maxDiffPixelRatio` then caps
how many pixels are allowed to exceed it, so a real typography or
layout shift - which moves many pixels far past the threshold - still
fails the build.

Full-page result silhouette snapshots in
`tests/e2e/full-pages-visual.spec.ts` use the same `threshold: 0.2`
with a slightly looser `maxDiffPixelRatio: 0.01` because they
aggregate more pixels.

## Full-page snapshots

`full-pages-visual.spec.ts` snapshots the entire `/dev/cards?harness=1`
page across all 9 viewports × dark and light themes, in addition to
the per-card matrix. The harness is the deterministic twin of
`/career-engine/result` (which is quiz-session-gated and not
screenshottable in CI), so the full-page snapshots pin the whole
stacked layout, vertical rhythm, and inter-card spacing.

## Inspect a diff

When a test fails, Playwright writes three PNGs per failing snapshot
into `test-results/`:

- `*-expected.png` - the baseline we shipped
- `*-actual.png` - what your branch rendered
- `*-diff.png` - red-pixel overlay of the difference

Open them side by side, or run `bunx playwright show-report` to see them
in the HTML report.

## CI

`.github/workflows/result-cards-visual.yml` runs the spec on every PR
that touches result-page code (`src/components/career/**`,
`src/routes/career-engine.result.tsx`, `src/routes/dev.cards.tsx`,
`src/styles.css`, or the spec itself). On failure it:

1. Uploads the full HTML report as the `playwright-report-result-cards`
   artifact.
2. Uploads every diff PNG as the `result-cards-pixel-diffs` artifact.
3. Generates small (~280 px wide) thumbnails for each changed
   snapshot's expected / actual / diff PNG, commits them to the
   `visual-diffs-snapshots` branch under `pr-<num>/<sha>/`, and
   posts (or updates) a sticky PR comment with an inline image table
   so reviewers can spot the change without downloading artifacts.
   The comment also shows the exact `SNAPSHOT_CARDS=…` command to
   re-run only the changed cards locally.

If the diff is intentional, run
`bunx playwright test result-cards-visual --update-snapshots` locally,
commit the regenerated PNGs in
`tests/e2e/result-cards-visual.spec.ts-snapshots/`, and push.
