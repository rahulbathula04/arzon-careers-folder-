# Arzon — Execution Plan (derived from CEO Strategic Audit)

Sequenced from safest → highest-risk. Each phase is a separate approval.
No destructive schema changes without explicit go-ahead per phase.

## Phase 0 — Ship this turn (additive, zero risk)

- [x] `/placements` — Verified Placement Ledger public route with honest zero-state
      ("0 verified placements to date — this ledger populates only when an
      employer confirms a hire in writing"). Category-defining page.
- [ ] Add `/placements` to footer once we have 1 verified entry.

## Phase 1 — Employer Console (private beta)

New surface under `/employer/*` (own layout, own auth).

- `employers` table (company, contact, verified_at, billing_status)
- `employer_users` table (RBAC via existing `user_roles` + new `employer` role)
- `jobs` table (role, city, band, closes_at, published_at, employer_id)
- `shortlists` table (job_id, candidate_id, rank, reason, sent_at)
- Routes: `/employer/login`, `/employer/dashboard`, `/employer/jobs/new`,
  `/employer/jobs/$id`, `/employer/jobs/$id/shortlist`
- Deferred: interview scheduler, chat.

## Phase 2 — Placement ledger writes

- `placements` table (candidate_id, employer_id, job_id, role, city,
  start_date, salary_band, verification_source, verified_at, verified_by)
- RLS: public SELECT of non-PII columns; write via
  `requireSupabaseAuth` + admin/employer role only.
- Wire `/placements` to read from this table.

## Phase 3 — ASSAY v2 as passport

- `assay_variants` (role_slug, version, question_pool_id, proctored bool)
- `assay_attempts` (candidate_id, variant_id, score, percentile, proctor_flags)
- Employer console filters shortlists by ASSAY score threshold per role.

## Phase 4 — Retention loop

- `placement_checkins` (placement_id, day_offset, employer_nps,
  candidate_status, notes) at 30/90/180.
- Public Deployability Index aggregated from these.

## Phase 5 — Deletions (requires explicit user confirmation per group)

Aggregate list from audit; do NOT execute without per-group sign-off.
Groups (safest → riskiest):
A. Ops/noise: `landing_copy_changes`, `changelog_entries`,
`content_qa_reviews`, `course_thumbnail_overrides`, `status_components`,
`seo_alert_config`, `seo_alerts`, `seo_query_snapshots`.
B. Growth theater: `arzonprime60_waitlist`, `demand_*` (4 tables),
`referral_codes`, `referral_attributions`, `coupons`,
`coupon_tier_prices`.
C. Off-strategy surfaces: `moments`, `moment_images`; retire
`retention_checkins`, `student_weekly_goals` in favor of Phase-4
`placement_checkins`.
D. Route pruning: collapse `admin.*` surfaces tied to deleted tables.

## Phase 6 — Talent Graph API

- Read-only server routes under `/api/public/graph/*` (signed HMAC).
- Rate-limited, scoped by employer contract.

## Non-goals for now

- Government/state dashboard (Y2).
- DigiLocker (Y2, needs partner signature).
- ATS integrations (Y3).

## Metric

All work is scored against **Verified Placements per Week (VPW)**.
Anything not on the critical path to VPW is deferred, not built.
