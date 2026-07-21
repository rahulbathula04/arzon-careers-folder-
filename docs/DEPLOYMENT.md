# Arzon Careers — Deploy-Ready Checklist & CI/CD Pipeline

Production target: `https://arzoncareers.in` (also `www.arzoncareers.in`, `arzoncareers.lovable.app`).
Stack: TanStack Start v1 + Vite 7 on Cloudflare Workers, Lovable Cloud (Supabase) backend, Razorpay payments, Lovable AI Gateway.

---

## 0. Branching & Release Model

- `main` → auto-syncs to Lovable preview (`id-preview--*.lovable.app`).
- Tag `vX.Y.Z` on `main` after QA → triggers production publish.
- Hotfix: branch from the last green tag, PR → `main`, re-tag.

---

## 1. Pre-flight Checklist (manual gate before tagging)

### Code

- [ ] No `console.log` / `debugger` left in committed code (`rg "console\.(log|debug)" src/`).
- [ ] No placeholder content in `src/routes/index.tsx` (no `PlaceholderIndex`, no `data-lovable-blank-page-placeholder`).
- [ ] All routes referenced by `<Link to="...">` exist in `src/routes/`.
- [ ] `src/routeTree.gen.ts` is freshly generated (committed, no diff after build).

### Secrets

- [ ] All required secrets set in Lovable Cloud:
      `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`,
      `LOVABLE_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL`,
      `SUPABASE_PUBLISHABLE_KEY`.
- [ ] No secret echoed via `console.log` or returned from a serverFn.

### Database / Backend

- [ ] `supabase--linter` → 0 ERROR-level. WARN-level only for the documented public RPCs (see `@security-memory`).
- [ ] `supabase--cloud_status` returns `ACTIVE_HEALTHY`.
- [ ] New migrations have been previewed in a fresh shadow DB; rollback path documented in the migration comment.
- [ ] RLS enabled on every new table; policies tested against anon + authenticated roles.
- [ ] No new `SECURITY DEFINER` function granted `EXECUTE` to `public`/`anon`/`authenticated` unless intentional and noted in security memory.

### SEO / Meta

- [ ] Every route file under `src/routes/` defines `head()` with unique `title` (<60 chars) and `description` (<160 chars).
- [ ] `og:image` + `twitter:image` set on leaf routes that have a hero/cover (not on `__root.tsx`).
- [ ] Single `<h1>` per page; semantic HTML; `alt` on every `<img>`.
- [ ] `public/robots.txt` is not `Disallow: /` (unless intended).
- [ ] `src/routes/sitemap[.]xml.ts` lists every public route + dynamic content; `BASE_URL = "https://arzoncareers.in"`.
- [ ] Canonical tags use absolute URLs on leaf routes.

### Payments

- [ ] Razorpay webhook URL configured to `https://arzoncareers.in/api/public/razorpay-webhook` (production keys, not test).
- [ ] `mark_enrolment_paid_with_payment` / `mark_enrolment_failed` exercised end-to-end with a ₹1 live test order, then refunded.

### Performance

- [ ] `bun run build` succeeds with no warnings; bundle size diff reviewed.
- [ ] Lighthouse on `/`, `/curriculum`, `/apply`, `/enrol`: LCP < 2.5s, CLS < 0.1, TBT < 200ms.
- [ ] All hero images lazy-loaded except the LCP image; LCP image has `fetchpriority="high"`.

---

## 2. CI Pipeline (GitHub Actions)

File: `.github/workflows/ci.yml` (run on every PR to `main`).

```yaml
name: CI
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: latest }

      # 1. Install
      - run: bun install --frozen-lockfile

      # 2. Lint & typecheck
      - run: bun run lint
      - run: bunx tsc --noEmit

      # 3. Unit tests
      - run: bunx vitest run --reporter=verbose

      # 4. Build (catches missing routes, broken imports, route conflicts)
      - run: bun run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}

      # 5. Static SEO/meta validation
      - run: bun run scripts/validate-meta.ts
      - run: bun run scripts/validate-sitemap.ts

      # 6. Upload build artifact for downstream jobs
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: .output }

  db-migration-dry-run:
    runs-on: ubuntu-latest
    needs: build-and-test
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
      - run: supabase db start
      - run: supabase db push --dry-run
      - run: supabase db lint
```

---

## 3. CD Pipeline (Production deploy)

File: `.github/workflows/deploy.yml` (triggered on `v*` tag).

```yaml
name: Deploy Production
on:
  push:
    tags: ["v*"]

jobs:
  migrate:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
      - name: Apply pending migrations
        run: supabase db push --linked
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}
      - name: Run post-migration linter
        run: supabase db lint --linked

  publish:
    runs-on: ubuntu-latest
    needs: migrate
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      # Lovable auto-publishes from main; this step pings the publish webhook
      - name: Trigger Lovable publish
        run: curl -fsS -X POST "${{ secrets.LOVABLE_PUBLISH_HOOK }}"

  smoke-tests:
    runs-on: ubuntu-latest
    needs: publish
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - name: Wait for deploy
        run: |
          for i in $(seq 1 30); do
            curl -fsS https://arzoncareers.in/ > /dev/null && break || sleep 5
          done
      - run: bunx playwright install --with-deps chromium
      - run: bunx playwright test tests/smoke --reporter=github
        env:
          BASE_URL: https://arzoncareers.in

  rollback-on-failure:
    runs-on: ubuntu-latest
    needs: smoke-tests
    if: failure()
    steps:
      - name: Notify + open rollback PR
        run: |
          curl -X POST "${{ secrets.SLACK_WEBHOOK }}" \
            -d '{"text":"🔴 Production smoke tests failed for ${{ github.ref_name }} — rolling back via Lovable version history."}'
```

---

## 4. Validation Scripts

Place under `scripts/`. These are referenced by the CI workflow above.

### `scripts/validate-meta.ts`

Walks `src/routes/**/*.tsx`, parses each `createFileRoute(...).head()`, and fails the build if any route:

- Is missing `title` or `description`
- Has `title` length > 60 or < 10
- Has `description` length > 160 or < 50
- Uses the literal strings `"Lovable App"` or `"Lovable Generated Project"`
- Defines `og:image` inside `__root.tsx` (must be leaf-only)

### `scripts/validate-sitemap.ts`

- Imports the route tree from `src/routeTree.gen.ts`.
- Fetches `/sitemap.xml` from the local build output.
- Asserts every public route (excluding `_authenticated/*`, `admin.*`, `/not-found`, `/lovable/*`) appears in the sitemap.
- Asserts every `<loc>` starts with `https://arzoncareers.in`.

---

## 5. Smoke Tests (`tests/smoke/*.spec.ts`)

Playwright suite that runs against the deployed URL. Minimum set:

1. **Home loads** → `/` returns 200, contains `<h1>`, no console errors.
2. **Curriculum page** → `/curriculum` shows all 6 tracks (Pharmacovigilance, Medical Coding, CDM, Clinical SAS, Regulatory Affairs, Medical Writing).
3. **Apply form** → submits a synthetic lead with email `qa+<timestamp>@arzoncareers.in`, asserts redirect to `/apply/success`.
4. **Enrol intent creation** → calls `create_enrolment_intent` RPC, asserts row appears, then `expire_enrolment_coupon` cleans it up.
5. **Career engine session** → `ce_start_session` → answer 3 questions → `ce_create_lead_early` → asserts lead persisted.
6. **Razorpay webhook signature** → POST unsigned payload to `/api/public/razorpay-webhook`, expect 401.
7. **Sitemap + robots** → `/sitemap.xml` returns valid XML, `/robots.txt` is not `Disallow: /`.
8. **Auth-protected route** → `/dashboard` while logged out → redirects to `/login`.

Tag synthetic test rows with `utm_source = "ci-smoke"` so a nightly cleanup job can prune them.

---

## 6. Post-Deploy Verification (manual, 5 min)

- [ ] Visit `/`, `/curriculum`, `/apply`, `/enrol`, `/courses/pharmacovigilance` — confirm tabs, no layout regression.
- [ ] Run `supabase--linter` again on production → 0 ERROR.
- [ ] Check `analytics_alerts` table → no `volume_drop` or `shape_drift` rows opened in last 30 min.
- [ ] Razorpay dashboard → last 24h success rate ≥ 95%.
- [ ] Google Search Console → `sitemap.xml` last-fetched status = Success.
- [ ] Trigger SEO rescan (SEO & AI search tab) → all critical findings green.

---

## 7. Rollback Plan

1. **Frontend regression** → Lovable → Version History → restore last green version → re-publish.
2. **Bad migration** → run the inverse migration immediately (every migration must include a `-- ROLLBACK:` comment block at the top).
3. **Webhook breakage** → temporarily re-point Razorpay webhook to the previous deployment's URL while patch is prepared.
4. **Total outage** → flip Lovable Cloud instance to maintenance mode (Cloud → Overview → Pause), put a static "we'll be right back" page at the apex domain via Cloudflare Workers route.

---

## 8. On-Call & Observability

- **Logs**: `supabase--edge_function_logs` for serverFn errors; Cloudflare Workers tail for SSR errors.
- **Alerts**: `check_analytics_anomalies()` runs hourly via pg_cron; opens rows in `analytics_alerts` for volume drops or missing required props.
- **Pager**: route Slack `#prod-alerts` webhook to on-call Google Voice number after 22:00 IST.
- **SLOs**: 99.5% monthly availability for `/`, `/apply`, `/api/public/razorpay-webhook`; p95 TTFB < 800ms.

---

_Last updated: 2026-07-04. Owner: Platform team._

## Post-deploy checks (staging)

On every successful preview/staging deployment, `.github/workflows/staging-smoke.yml` runs:

1. **`bun run smoke:conversion`** — loads `/courses/pharmacovigilance`, opens the enrol drawer, submits a synthetic form, and asserts the WhatsApp deep-link + Razorpay entrypoint render with no console/page errors.
2. **`bun run visual:hero`** — pixel-diffs the landing hero, primary CTA, course hero, enrol CTA, **trust ribbon, testimonials, and final CTA band** (desktop + mobile) against `tests/visual/baseline/**`. Threshold `VR_THRESHOLD=0.005` (0.5%).

Both steps stream into `::group::` blocks so pass/fail lines are highlighted in the run log. On failure the actual + diff PNGs are uploaded as the `visual-hero-diffs` artifact (7-day retention).

### Baseline lock

`tests/visual/baseline/**` is CODEOWNER-locked. Refresh **only** via the manual `Refresh visual baseline (manual)` workflow (requires `confirm: yes`); it opens a PR labelled `baseline-refresh` with the regenerated PNGs and appends to `docs/visual-baseline-changelog.md`. Ad-hoc edits are rejected by `scripts/check-visual-baseline-guard.mjs`.

### Token audit on every PR

`.github/workflows/token-audit-pr.yml` runs `bun run audit:tokens:json` on each PR and upserts a sticky comment with clickable `file:line` permalinks for every remaining raw hex/rgb/hsl literal. A second job fails the PR if raw literals appear in a file that had none on `main` (new-file regression guard).
