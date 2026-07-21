# QA Hardening Plan — Visual Regression + Conversion E2E

Multi-day plan. Mobile sticky CTA has been removed; all sticky-CTA work is desktop-only.

---

## Day 1 — Visual regression foundation

**Goal:** every landing section + every CTA card has a baseline snapshot. CI fails on any pixel diff > tolerance.

1. Install + wire Playwright's built-in `toHaveScreenshot` (already on Playwright 1.40+; project ships `playwright.config.ts`).
2. Add a `tests/e2e/visual/` folder. One spec per page: `home.visual.spec.ts`, `courses.visual.spec.ts`, `course-slug.visual.spec.ts`, `deployment-model.visual.spec.ts`, `enrol.visual.spec.ts`, `career-engine.visual.spec.ts`, `internships.visual.spec.ts`, `pricing.visual.spec.ts`.
3. Per spec, scroll-and-snap each section by stable `data-testid`:
   - Annotate every landing section with `data-section="hero|pricing|faq|deploymentReady|finalCTA|footer|…"`.
   - `await page.locator('[data-section="pricing"]').scrollIntoViewIfNeeded()`, wait for fonts (`document.fonts.ready`) + image decode, then `expect(locator).toHaveScreenshot('pricing.png', { maxDiffPixelRatio: 0.01 })`.
4. Run two device profiles only: `desktop-1280x800` and `tablet-820x1180`. (Mobile profile skipped per scope — no mobile sticky CTA to test.)
5. Disable animations + caret blink in a global fixture (`prefers-reduced-motion: reduce` + `* { transition: none !important; animation: none !important; }`).
6. Baseline run locally, commit `*-snapshots/`, push. CI workflow `.github/workflows/visual-regression.yml` runs on every PR and uploads `playwright-report/` on failure.

**Exit criteria:** PR that changes one button color fails the visual job with a diff image; PR with no UI change passes.

---

## Day 2 — CTA / contrast / sticky behavior (desktop)

**Goal:** every primary CTA on the site is the correct component, has correct label text, sufficient contrast, and the desktop "Apply for Internship" sticky bar stays visible while scrolling on internship routes.

1. `tests/e2e/cta-contract.spec.ts` — iterate a fixture of `{ route, ctaTestId, expectedLabel, expectedHref }`. For each: navigate, assert visible, assert exact text, assert `href`/`to` resolves.
2. `tests/e2e/contrast.spec.ts` — for the same CTA set, read computed `color` + `background-color` and assert WCAG AA (4.5:1 body, 3:1 large). Reuse `scripts/check-contrast.mjs` as the contrast helper.
3. `tests/e2e/sticky-cta-desktop.spec.ts` — on `/internships/pharmacovigilance`, `/internships/medical-coding`, `/internships/clinical-data-management`:
   - assert the sticky "Apply for Internship" bar is in the DOM,
   - scroll the page in 25% increments, assert it remains `isInViewport()` at every step,
   - assert it does not overlap the footer (`getBoundingClientRect().bottom <= footer.top`).
4. Negative test: load `/` at desktop, assert no element with `data-sticky="mobile-cta"` exists (sticky was removed).

**Exit criteria:** all internship pages keep the sticky desktop CTA visible end-to-end; bad contrast on any CTA fails CI.

---

## Day 3 — Internship form → WhatsApp + CRM E2E

**Goal:** submitting the internship application actually fires the WhatsApp deep-link and writes a CRM row.

1. Pick the existing form: `src/components/landing/CounsellorLeadForm.tsx` + the internship landing in `src/components/internships/InternshipLanding.tsx`. Add `data-testid` to every input + submit button.
2. Wire a test-only intercept:
   - Frontend keeps using `waLink()` → `wa.me/...`. In the test, `page.on('popup')` captures the new tab and asserts the URL contains the prefilled message template.
   - Backend write: lead is persisted via `src/lib/leads.functions.ts` → `public.leads` table. Test signs in as a seeded service account (or uses the supabase JS client with anon key + RLS-permitted insert) and `SELECT`s the row by the unique email used in the test.
3. Spec: `tests/e2e/internship-lead.spec.ts`
   - Visit `/internships/pharmacovigilance`.
   - Fill `{ name, email: `qa+${Date.now()}@arzoncareers.in`, phone, message }`.
   - Click submit; assert toast "Thanks, we'll WhatsApp you".
   - Assert popup URL matches `^https://wa\.me/\d+\?text=.+Pharmacovigilance.+`.
   - Poll Supabase up to 5s: `SELECT id FROM leads WHERE email = $1` returns one row with `source = 'internship_pharmacovigilance'`.
4. Teardown: delete the row by id.

**Exit criteria:** a real new lead lands in the dev DB and the WhatsApp URL is correctly templated for every internship slug.

---

## Day 4 — Razorpay payment + success + refund clarity

**Goal:** the Career-tier checkout opens Razorpay, a sandbox success completes the flow, the success page shows the correct order id, and the refund clarity block is visible.

1. Use Razorpay's documented test mode: `RAZORPAY_KEY_ID=rzp_test_*` already configured in the dev environment. No production keys hit CI.
2. Spec: `tests/e2e/payment-razorpay.spec.ts`
   - Visit `/enrol/career/pay`.
   - Intercept `POST /api/public/razorpay.verify` to assert the request payload is well-formed (order id + signature present).
   - Stub the Razorpay Checkout SDK (`window.Razorpay`) with a test double that immediately invokes the success handler with a fake `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` generated by the test server using the dev key secret (so signature verification passes).
   - Assert redirect to `/enrol/success?orderId=...`.
   - Assert success page renders: order id, amount, tier name, "Receipt emailed to {email}", and a "Need a refund?" disclosure block with the 7-day terms verbatim.
3. Refund-clarity spec: `tests/e2e/refund-clarity.spec.ts` — visit `/refund`, assert headings, refund window (7 days), eligibility list, and contact CTA are present + above-the-fold at desktop.
4. Live-Razorpay smoke (manual, not in CI): document a one-command checklist in `docs/runbooks/razorpay-live-smoke.md` covering ₹1 capture + auto-refund in the live dashboard.

**Exit criteria:** sandbox checkout passes end-to-end in CI without a real card; refund block contract is locked.

---

## Day 5 — CI wiring, flake budget, sign-off

1. New workflow `.github/workflows/qa-e2e.yml` runs `visual`, `cta-contract`, `contrast`, `sticky-cta-desktop`, `internship-lead`, `payment-razorpay`, `refund-clarity` in parallel jobs on the preview URL.
2. Each job retries `2` on failure; >3 retries in 7 days marks a spec as quarantined in `tests/e2e/.quarantine.json` and pings the maintainers.
3. Add a `bun run qa:local` script that boots dev, waits for `:5173/healthz`, and runs the full suite headed for local debugging.
4. Update `docs/HANDOFF.md` with the new test commands + how to refresh snapshots (`bunx playwright test --update-snapshots`).

**Exit criteria:** PRs that ship UI changes show snapshot diffs inline in the PR; the conversion-critical paths (lead capture + payment) cannot regress silently.
