# Employer Console - Phase 1

## Verification → login mapping

| State                                                        | What the user sees                                                          |
| ------------------------------------------------------------ | --------------------------------------------------------------------------- |
| No account                                                   | `/employer/login` - email/password + "Continue with Google"                 |
| Signed in, no `employer_members` row                         | "Your account is not linked to a verified employer yet" message + sign out  |
| Signed in, member of employer with `verified_at IS NULL`     | Same as above - `has_employer_access()` returns false, RLS hides everything |
| Signed in, member of employer with `verified_at IS NOT NULL` | Full console at `/employer/console`                                         |

Verification is a two-step action on the Arzon side (admins only):

1. Create/update the `public.employers` row and set `verified_at = now()` via the admin console (`/admin/placements` extends to employer management later).
2. Insert a `public.employer_members` row linking the auth user to that employer with `member_role = 'owner'` (or `'recruiter'`).

`has_employer_access(uid, employer_id)` (SECURITY DEFINER) is the single gate - every RLS policy on `employer_jobs`, `job_shortlists`, and the `employer_submit_placement_evidence` RPC calls it.

## Job posting form

Fields and validation live in `src/lib/employer.functions.ts` (`JobUpsertSchema`, zod). DB-level `CHECK` constraints mirror them in `supabase/migrations/*_employer_console.sql`.

| Field                             | Type        | Rule                                                     |
| --------------------------------- | ----------- | -------------------------------------------------------- |
| `program_slug`                    | enum        | one of the 6 program slugs from `src/data/trackTheme.ts` |
| `title`                           | text        | 3–160 chars                                              |
| `location`                        | text        | 2–120 chars                                              |
| `employment_type`                 | enum        | `full_time` \| `contract` \| `internship`                |
| `experience_min_yrs` / `_max_yrs` | numeric     | 0–40; max ≥ min when set                                 |
| `salary_min_inr` / `_max_inr`     | int         | 0–100,000,000; max ≥ min when set                        |
| `description`                     | text        | 20–8000 chars                                            |
| `skills`                          | text[]      | up to 30 entries, comma-separated in the UI              |
| `status`                          | enum        | `draft` \| `open` \| `closed` \| `filled`                |
| `opens_at` / `closes_at`          | timestamptz | close ≥ open when both set                               |

## Shortlist workflow

Table: `public.job_shortlists`.

- Employer adds a candidate → row inserted with `status = 'shortlisted'`, `status_changed_at = now()`.
- Status transitions (`contacted` → `interviewing` → `offer_extended` → `hired` | `rejected`) update `status_changed_at` automatically via `trg_job_shortlists_touch`.
- Moving to `hired` sets `hired_at` automatically.
- CSV export ships from the console client-side (no server round trip needed).

## Auto-generating placements from signed evidence

The employer submits evidence from the console. That call hits the SECURITY DEFINER RPC `employer_submit_placement_evidence(...)`, which:

1. Verifies `has_employer_access(auth.uid(), shortlist.employer_id)`.
2. Refuses if the shortlist row already has a `placement_id` (idempotent per shortlist).
3. Inserts a row into `public.placements` with `published = false`, `verified_by = NULL`.
4. Links the new placement back to the shortlist row (`placement_id`) and flips its status to `hired`.

Admins verify + publish via `/admin/placements`. Only rows with `published = true AND retracted_at IS NULL` surface on `/placements` (via `list_verified_placements()`), keeping `public.placements` the **single source of truth** for the Verified Placement Ledger.
