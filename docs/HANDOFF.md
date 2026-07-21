# Arzon Global — Engineering Hand-off

_Last updated: 2026-05-01_

This document is the single source of truth for getting a new engineer productive on the Arzon codebase. Read it top to bottom before touching anything.

## 1. Stack

| Layer     | Choice                               | Notes                                               |
| --------- | ------------------------------------ | --------------------------------------------------- |
| Framework | TanStack Start v1                    | File-based routing under `src/routes/`              |
| Frontend  | React 19 + Vite 7                    | Tailwind v4 via `src/styles.css`                    |
| Runtime   | Cloudflare Workers (via Lovable)     | `nodejs_compat` enabled                             |
| Backend   | Supabase (Postgres + Auth + Storage) | Managed via Lovable Cloud                           |
| Auth      | Supabase email + password            | Invite-only for staff                               |
| Payments  | Razorpay hosted payment link         | https://rzp.io/rzp/rTrWHwjx — manual reconciliation |
| Hosting   | Lovable (auto-deploy)                | GitHub-synced repo: `Arzon Registration`            |

## 2. Repo layout

```
src/
  routes/                 # file-based routes (37 files, see § 4)
  components/             # shared UI (landing/, ui/, etc.)
  server/                 # *.functions.ts — server functions (RPC)
  integrations/supabase/  # auto-generated client + types — DO NOT EDIT
  data/                   # static course/cohort data
  hooks/                  # React hooks
supabase/
  migrations/             # SQL migrations (timestamped, never edited)
public/                   # static assets
docs/                     # this file
```

## 3. Database (8 tables, all RLS-enabled)

| Table                        | Purpose                                     | Who can read             |
| ---------------------------- | ------------------------------------------- | ------------------------ |
| `user_roles`                 | Staff RBAC (`admin`, `reviewer`, `support`) | Self + admins            |
| `admin_invites`              | Single-use staff invite tokens              | Admins only              |
| `applications`               | Apply funnel                                | Staff                    |
| `application_events`         | Status-change audit trail                   | Staff                    |
| `career_engine_sessions`     | Quiz sessions                               | Staff                    |
| `career_engine_answers`      | Per-question answers                        | Staff                    |
| `career_engine_leads`        | Quiz lead capture                           | Staff (writes via RPC)   |
| `course_thumbnail_overrides` | CMS for course art                          | Public read, admin write |

**Public writes** happen exclusively through SECURITY DEFINER RPCs:

- `submit_application(...)` — apply form
- `ce_start_session(...)` / `ce_record_answer(...)` / `ce_submit_lead(...)` — quiz
- `accept_admin_invite(token)` — staff onboarding

These RPCs validate input server-side (length, regex, format).

## 4. Routes

**Marketing**: `/`, `/about`, `/contact`, `/cohorts`, `/proof`, `/refund`, `/legal/{privacy,terms}`
**Courses**: `/courses`, `/courses/$slug`
**Internships**: `/internships`, `/internships/{clinical-data-management,medical-coding,pharmacovigilance}`
**Career Engine** (quiz funnel): `/career-engine`, `/start`, `/test`, `/result`, `/path/$slug`, `/lead`, `/enrol`
**Apply funnel**: `/apply`, `/apply/review`, `/apply/confirm` (→ Razorpay), `/apply/success`
**Learner** (skeleton): `/dashboard`, `/learn/$slug`, `/verify`, `/certificates/sample/$slug`
**Admin** (staff only): `/admin`, `/admin/login`, `/admin/applications`, `/admin/leads`, `/admin/invites`, `/admin/roles`, `/admin/thumbnails`, `/admin/accept-invite`
**System**: `/sitemap.xml`, `/robots.txt`

## 5. Secrets / env vars

Runtime secrets (set in **Cloud → Secrets**):

- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`
- `LOVABLE_API_KEY` (managed; rotate via Lovable UI)

Frontend env (`.env`, auto-managed):

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`

No Razorpay keys are stored — we use a hosted payment link.

## 6. Bootstrap super-admin

`rahulbathula04@gmail.com` is auto-granted `admin` on first signup via the `bootstrap_super_admin` trigger on `auth.users`. To add more staff:

1. Sign in as an admin → `/admin/invites` → create an invite for the new email + role.
2. Send them the accept link.
3. They sign up at `/admin/login`, then visit the accept link → role is assigned.

To grant a role manually (one-off, e.g. you're locked out): see `/admin/roles`.

## 7. Common ops

**Mark a payment as enrolled** (until Razorpay webhook is wired):

1. Open Razorpay dashboard, confirm payment by email/phone.
2. `/admin/applications` → find row → set status to `enrolled`.

**Refund**: Issued in Razorpay dashboard; update application status to `withdrawn` and add a note.

**Add a new course**: Edit `src/data/courses.ts`. Course pages auto-render at `/courses/$slug`. Add the slug to `src/routes/sitemap[.]xml.ts`.

**Add a new shareable page**: Create the route file in `src/routes/`. In its `head()`, spread `seo("/your-path")` into both `meta` and `links` so the page gets the right canonical + og:url + twitter:url. Then add the path to the `STATIC_PATHS` array in `src/routes/sitemap[.]xml.ts`.

**Verify ownership in Google Search Console**: GSC will give you a meta tag like `<meta name="google-site-verification" content="ABC123...">`. Open `src/routes/__root.tsx`, find the commented-out `google-site-verification` line, uncomment it and paste the token.

**Push code from local**: Repo is GitHub-synced. `git push` → Lovable picks it up automatically. If sync breaks, see § 9.

## 8. Deploy

- **Backend** (server functions, migrations, edge code): deploys instantly when saved.
- **Frontend**: needs a click on **Publish** in the Lovable editor (top-right desktop, ⋯ → Publish on mobile).
- **Custom domain**: Project Settings → Domains → connect `arzonglobal.com` (root + www) after publishing once. DNS instructions are shown in the dialog.
- **Self-host elsewhere later**: code is portable — clone the GitHub repo, set the env vars from § 5, run `bun install && bun run build`. Cloudflare Workers/Pages, Vercel, or any Node host works.

## 9. Known gaps & future work

| #   | Gap                                           | Workaround                                                                                              | Priority |
| --- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| 1   | No transactional/auth emails                  | Lovable email infra not yet provisioned. Set up sender domain in **Cloud → Emails**, then re-run setup. | High     |
| 2   | Razorpay payments reconciled manually         | See § 7. Wire webhook later for auto-sync.                                                              | Medium   |
| 3   | Learner area is static (no progress tracking) | `/dashboard` and `/learn/$slug` are placeholders.                                                       | Medium   |
| 4   | No analytics / error tracking                 | Add Plausible + Sentry when ready.                                                                      | Medium   |
| 5   | No backend rate limiting                      | Lovable platform doesn't have first-class primitives yet — accepted risk.                               | Low      |
| 6   | No certificates engine                        | `/certificates/sample/$slug` is a static template.                                                      | Low      |

## 10. Security posture

- All tables have RLS enabled.
- Public writes go only through validated SECURITY DEFINER RPCs.
- Service-role key is used only inside `src/server/*.functions.ts` (never exposed to client).
- Storage buckets `media` and `course-thumbnails` are public-read by design (marketing assets).
- Linter warnings about "Public Can Execute SECURITY DEFINER Function" are accepted and documented in the project security memory — these are the public-write entry points and are intentionally callable without auth.

## 11. Who to contact

- **Product / business**: rahulbathula04@gmail.com (super-admin)
- **Razorpay account**: same
- **DNS / domain**: rahulbathula04@gmail.com
- **GitHub repo**: `Arzon Registration` (org TBD by owner)
