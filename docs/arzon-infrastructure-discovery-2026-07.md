# Arzon Careers - Infrastructure Discovery Report

_Date: 2026-07-02 · Author: Lovable (acting as CPO/Architect/UX/CRO/Tech Lead) · Audience: founder_

> Brutally honest. No sugar. Read Section 20 first if you only have five minutes.

---

## SECTION 1 - PROJECT OVERVIEW

**Current purpose (as expressed by the code, not the pitch):**
Arzon Careers is a **paid, cohort-based upskilling programme for Indian pharma/clinical/tech graduates**, sold under a "Deployment-Ready" 40/30/20/10 methodology, with an application → Razorpay payment → manual admissions flow, plus a _quiz-driven lead funnel_ ("Career Engine") and a small staff back-office to manage applications, leads, cohorts and content.

**What problem it actually solves today:** it converts "confused pharma/CS/life-science graduate" traffic into paid enrolments for 3-track internships (Pharmacovigilance, Medical Coding, CDM, plus adjacent SAS/AI/Regulatory programmes). Everything else - recruiters portal, TPO portal, employer wall, JD Mirror, ACRI, Deployment Republic, Moments, Trust Report - is _marketing surface area to justify the price and increase perceived credibility_. It is not a two-sided marketplace yet.

**5-second homepage impression (honest):** "A premium-looking Indian edtech that trains pharma graduates and _claims_ to place them, with lots of trust-signal chrome (JDs, recruiters, government, cohort proof) but no obvious way to see actual placed alumni or actual employer accounts." A senior visitor will smell "content-heavy edtech dressed up as infrastructure."

**User types the code currently supports:**

| Type                             | Present in code?                            | Actually served?                           |
| -------------------------------- | ------------------------------------------- | ------------------------------------------ |
| Prospective student (organic)    | ✅ Everywhere                               | ✅ Best-served user                        |
| Applied/paying student           | ✅ apply._ + enrol._ + Razorpay link        | ⚠️ Half-served - no learner app            |
| Enrolled learner                 | ⚠️ `/dashboard`, `/learn/$slug` are stubs   | ❌ Worst-served                            |
| Certificate verifier (recruiter) | ✅ `/verify`, `/certificates/sample/$slug`  | ⚠️ Static template only                    |
| Recruiter / hiring manager       | ✅ `/recruiters`, `/r/$id`, artifact tokens | ⚠️ Content page + PDF download; no account |
| TPO / college                    | ✅ `/tpos`                                  | ⚠️ Content page + PDF only                 |
| Parent                           | ✅ ParentSection on home                    | ✅ Content only                            |
| Staff (admin/reviewer/support)   | ✅ 30+ `/admin/*` routes                    | ✅ Reasonably served                       |
| Employer with a hiring account   | ❌ Not modelled                             | ❌ Does not exist                          |

- **Primary focus:** prospective student → paying student conversion.
- **Best experience:** organic student browsing marketing pages (design system, motion, copy are all polished here).
- **Worst experience:** the paying learner _after_ checkout - `/dashboard` and `/learn/$slug` are placeholders, so a student who paid ₹X gets an email/Razorpay receipt and a static shell. This is the single biggest product risk.

---

## SECTION 2 - COMPLETE SITE MAP (tree of every route)

111 route files under `src/routes/` today. Grouped:

```
/
├── index                             (home)
├── about, contact, faq, changelog, refund, status, refer, waitlist
├── legal/
│   ├── privacy
│   └── terms
├── proof, proof-methodology, methodology, credibility, deployment-model, curriculum
├── acri, jd-mirror, republic, trust-report
├── cohorts
├── moments/
│   ├── index
│   └── $slug
├── courses/
│   ├── index
│   ├── compare
│   └── $slug                         (dynamic - every programme)
├── internships/
│   ├── index
│   ├── clinical-data-management
│   ├── medical-coding
│   └── pharmacovigilance
├── industry/
│   ├── index, salaries, employers, compare
│   ├── $role                         (role landing)
│   └── $role/$city                   (36 programmatic SEO pages)
├── career-engine/
│   ├── index, start, test, result, plan, lead, enrol
│   └── path/$slug
├── apply/
│   ├── index, review, confirm, success
├── enrol/
│   ├── index, success
│   └── $tier, $tier/pay
├── build/
│   ├── index, request, $slug
├── recruiters, recruiters/candidate/$id
├── tpos
├── r/
│   ├── $id, $id/brief
│   └── artifact/$token               (tokenised recruiter share)
├── dashboard                         ⚠️ stub
├── learn/$slug                       ⚠️ stub
├── verify, certificates/sample/$slug
├── checkin/$token                    (retention nudge)
├── reset-password
├── dev/cards                         ⚠️ dev-only, still shipped
├── admin/                            (staff area - /admin gate: role='admin')
│   ├── index, login, accept-invite, invites, roles, audit
│   ├── activity, leads, applications, cohorts, certificates
│   ├── funnel, funnel-ce, funnel-test, results, retention
│   ├── demand, arzonprime60, readiness-journeys
│   ├── analytics-alerts, seo, metrics-domain-grid
│   ├── landing-changelog, experiments, experiments/sticky-cta
│   ├── content-qa-scan, qa/content-rebalance, thumbnails, assets
│   ├── moments, moments/$id, backups
├── api/                              (server routes - webhooks/public APIs)
├── email/                            (transactional email routes)
├── lovable/                          (Lovable platform reserved)
├── __vr.moments-empty                ⚠️ visual-regression fixture, still shipped
├── sitemap.xml
└── (root __root layout)
```

**Hidden / non-obvious routes** worth calling out: `/checkin/$token`, `/r/artifact/$token`, `/admin/arzonprime60`, `/admin/experiments/sticky-cta`, `/build/*`, `/dev/cards`, `/__vr.moments-empty`. The last two shouldn't be in a production build.

---

## SECTION 3 - NAVIGATION

**Desktop nav** (from `components/landing/Nav.tsx` behaviour): Home, Courses, Career Engine, Industry, Proof, Cohorts, About, Apply. Sticky CTA "Apply" appears on scroll.

**Mobile nav:** same items in a hamburger, plus a `MobileStickyCTA` bar (Apply + WhatsApp).

**Footer nav:** legal, refund, verify, contact, sitemap, plus secondary marketing surfaces (Proof, Methodology, Republic, TPOs, Recruiters, Moments, Changelog).

**Dashboard nav:** `AdminShell` sidebar - Overview, Applications, Leads, Cohorts, Certificates, Funnel, Retention, Demand, Experiments, Content-QA, Assets, Roles, Invites, Audit, SEO, Analytics-alerts, Backups, Moments. It's dense but coherent.

**Student dashboard nav:** does not exist. `/dashboard` is a shell.

**Employer nav:** does not exist. Recruiters get a PDF and a `/r/artifact/$token` link.

**Duplicate paths - yes, many:**

- Proof story is split across `/proof`, `/proof-methodology`, `/methodology`, `/credibility`, `/trust-report`, `/deployment-model`, `/republic`. A first-time visitor cannot tell which is canonical.
- Programmes are split across `/courses`, `/courses/$slug`, `/internships/*`, `/industry/*`, `/curriculum`, `/jd-mirror`. Same content, different framings.
- Career discovery is split across `/career-engine`, `/career-engine/start`, `/career-engine/test`, `/career-engine/result`, `/career-engine/plan`, `/career-engine/lead`, `/career-engine/enrol`, `/career-engine/path/$slug` - 8 URLs for one funnel.
- Enrol/apply is split across `/apply/*` and `/enrol/*` (two different funnels that both end at Razorpay).

**Are users forced to think?** Yes. The information architecture optimises for SEO surface area, not for a first-time visitor's decision.

---

## SECTION 4 - FEATURE INVENTORY

### Student-facing (public + funnel)

| Feature                                | Purpose                       | Status             | Used?                  | Complete? | Missing                                        |
| -------------------------------------- | ----------------------------- | ------------------ | ---------------------- | --------- | ---------------------------------------------- |
| Home marketing                         | Convert cold traffic          | ✅ Shipped         | ✅                     | ✅        | Nothing - over-built if anything               |
| Programme pages (`/courses/$slug`)     | Sell each programme           | ✅                 | ✅                     | ✅        | Real syllabus PDFs, live seats                 |
| Career Engine quiz                     | Lead capture + soft-qualify   | ✅                 | ✅                     | ⚠️        | ML-based recommendation; today it's rule-based |
| Apply funnel                           | Collect application + payment | ✅                 | ✅                     | ⚠️        | Auto-reconciliation (Razorpay webhook)         |
| Enrol tier pay                         | Alt paid path (tiers)         | ✅                 | ⚠️ Unclear traffic     | ⚠️        | Overlaps with `/apply` - pick one              |
| WhatsApp CTA                           | Human touch                   | ✅                 | ✅                     | ✅        | Response SLA is manual                         |
| Certificate verify                     | Recruiter trust               | ⚠️ Static template | ❌ Nobody verifies yet | ❌        | Real cert issuance, real DB                    |
| Learner dashboard                      | Post-payment product          | ❌ Stub            | ❌                     | ❌        | _Everything_ - the whole learning app          |
| Learn player                           | Course delivery               | ❌ Stub            | ❌                     | ❌        | Video, progress, assignments, submissions      |
| Retention check-in (`/checkin/$token`) | Nudge lapsed students         | ✅ Route exists    | ⚠️                     | ⚠️        | Cadence, triggers, unsubscribe                 |
| Moments (photo journal)                | Founder credibility           | ✅                 | ✅                     | ✅        | Not a product feature - content marketing      |

### Employer / Recruiter

| Feature                                                  | Purpose                     | Status                             |
| -------------------------------------------------------- | --------------------------- | ---------------------------------- |
| `/recruiters` marketing                                  | Pitch the school            | ✅ Content only                    |
| `/r/artifact/$token`                                     | Tokenised work-sample share | ✅ Works, but no account behind it |
| `/recruiters/candidate/$id`                              | Candidate portfolio view    | ✅ Works                           |
| Recruiter dashboard, search, shortlist, comms, contracts | Two-sided hiring            | ❌ None of this exists             |

### College / TPO

| Feature                                                    | Status          |
| ---------------------------------------------------------- | --------------- |
| `/tpos` marketing page + PDF                               | ✅ Content only |
| Batch upload of students, TPO dashboard, placement reports | ❌ Missing      |

### Admin / Internal

30+ admin routes. Real ones (used): Applications, Leads, Cohorts, Roles, Invites, Audit, Certificates, Moments, Thumbnails, Backups. Vanity/experimental (rarely used): Experiments, Funnel-CE, Funnel-test, Metrics-domain-grid, Content-QA-scan, QA/content-rebalance, Landing-changelog. Consolidation opportunity: −40% surface.

### Public / SEO

Sitemap.xml (dynamic, 36 city×role pages + moments), robots.txt, JSON-LD, OG/Twitter meta, 90-something Lighthouse targets. This is genuinely well done.

---

## SECTION 5 - DATABASE (from `<supabase-tables>`, 50 tables)

Real product tables (keep):
`applications`, `application_events`, `cohorts`, `cohort_audit_log`, `certificates`, `career_engine_sessions/answers/leads`, `enrolment_intents`, `coupons`, `coupon_tier_prices`, `payment_recovery_queue`, `webhook_events`, `user_roles`, `admin_invites`, `audit_log`, `email_send_log`, `email_send_state`, `email_unsubscribe_tokens`, `moments`, `moment_images`, `course_thumbnail_overrides`.

Marketing/analytics telemetry (keep but consolidate):
`analytics_events`, `analytics_alerts`, `analytics_alert_config`, `experiment_events`, `seo_alerts`, `seo_alert_config`, `seo_query_snapshots`, `landing_copy_changes`, `changelog_entries`, `recommendation_outcomes`, `retention_checkins`, `readiness_journey`.

Speculative / low-signal (candidates to delete or defer):
`arzonprime60_waitlist`, `assessment_shares`, `demand_tracks`, `demand_partners`, `demand_milestones`, `demand_votes`, `briefing_requests`, `content_qa_reviews`, `counsellor_leads`, `referral_codes`, `referral_attributions`, `status_components`, `trust_ledger`, `verification_audit`, `backup_runs`, `ai_feedback`, `artifact_requests`, `ce_rate_buckets`, `suppressed_emails`.

**Missing tables** for the vision:

- `employers`, `employer_users`, `employer_seats`, `job_posts`, `applications_v2 (student↔job)`, `interviews`, `offers`, `placements`, `feedback_360`
- `learners`, `enrolments`, `lessons`, `modules`, `lesson_progress`, `assignments`, `submissions`, `grades`, `mentors`, `mentor_sessions`
- `skills`, `skill_evidence` (portfolio-graph), `assessments`, `assessment_attempts`, `rubrics`, `rubric_scores`
- `payouts` (mentor/recruiter), `invoices`, `payouts_ledger`
- `notifications`, `notification_prefs`, `device_tokens`

**Merge candidates:**

- `career_engine_leads` + `counsellor_leads` + `briefing_requests` + `arzonprime60_waitlist` → single `leads` table with `source` enum.
- `analytics_alerts` + `seo_alerts` → `alerts` with `kind` enum.
- `demand_*` (4 tables) → `demand_requests` with type + status.
- `application_events` + `audit_log` + `cohort_audit_log` → generic `activity_log` polymorphic.

**Remove:** all four `demand_*` unless demand-collection is truly live; `arzonprime60_waitlist` (superseded by generic leads); `assessment_shares` (feature never shipped end-to-end); `trust_ledger` (marketing artefact).

---

## SECTION 6 - AUTHENTICATION

- **One auth system** (Supabase email/password). No Google, no OTP, no student SSO.
- Staff sign in at `/admin/login`. Public/student "auth" is essentially non-existent - application submission is anonymous by phone/email, no account, no session, no post-payment login.
- RBAC: `app_role` enum (`admin`, `reviewer`, `support`) stored in a dedicated `user_roles` table with `has_role()` security-definer function. This part is correct.
- The `/admin` route gate only allows `role='admin'` - other roles listed in the enum are gated per-page. Inconsistent.

**Missing:**

- Student accounts (there is no post-payment login - how does a paying student return?)
- Employer accounts + org model
- Google OAuth (default recommended)
- Password HIBP check (currently off)
- Magic-link / phone OTP for Indian graduate audience - likely higher conversion than email/password

---

## SECTION 7 - STUDENT JOURNEY (with friction)

```
Landing → CTA "Apply"
       ↘ Career Engine quiz → result → lead capture → nudge to Apply
Apply form → Review → Razorpay hosted link
       → success screen (email + WhatsApp)
       → …then nothing. No login. No dashboard. No content. No cohort onboarding.
```

**Friction points:**

1. Two funnels (`/apply/*` vs `/enrol/$tier/*`) - user has to pick.
2. Payment is a hosted Razorpay link, reconciled _manually_ by staff. Students can pay and not appear in the system for hours.
3. No auto-account creation on payment success → no way to log in and see what they bought.
4. Cohort assignment happens off-platform (spreadsheet + WhatsApp).
5. Learning delivery is off-platform (WhatsApp/Google Meet/Drive, inferred).
6. Certificates are static templates, not issued from the DB.
7. No progress tracking, no assignments, no submissions, no grades.
8. Retention check-in exists as a token route but has no visible cadence.

---

## SECTION 8 - EMPLOYER JOURNEY

```
Landing (/recruiters) → download PDF → email/WhatsApp → offline conversation
                                    → maybe receive /r/artifact/$token link
```

**Missing:** signup, org verification, seat billing, candidate search, shortlist, comms, interview scheduling, offer letter, feedback, contract, invoicing. Everything a real employer product needs. Today Arzon Careers is _not_ a hiring platform; it's a school with a PDF for recruiters.

---

## SECTION 9 - ADMIN PANEL

**Present:** user roles, invites, applications, cohorts, leads, certificates (list), funnel dashboards, retention, demand, experiments, SEO, analytics alerts, content QA, moments CMS, backups, audit log, thumbnails, assets.

**Missing:**

- Learner management (progress, cohort seat map, drop-out risk)
- Mentor management (availability, ratings, payouts)
- Employer/CRM (accounts, deal stages, contracts)
- Placement pipeline (candidate ↔ job ↔ interview ↔ offer)
- Financial dashboard (revenue, refunds, MRR, payouts)
- Content authoring (lessons/modules - currently code-based)
- Notification centre (email/WhatsApp templates, send status, opt-outs)
- Bulk operations (CSV import/export of applications, cohorts, students)
- Impersonation ("view as student X") for support

---

## SECTION 10 - UI SYSTEM

- **Typography:** clean scale (`h-display`, `h-eyebrow`, etc.), enforced by `check-typography-tokens.mjs`.
- **Spacing:** Tailwind v4 native, tokenised.
- **Colours:** semantic tokens (`text-ink`, `text-primary`, `text-eyebrow`, `text-brand-glow`, `text-accent-emerald`, `--gradient-navy-01/02`). 845 raw palette utilities still remaining (baseline down from 1192).
- **Buttons:** shadcn `Button` variants; multiple raw `<button>` inventoried in `docs/sprint1-audit/design-system.md`.
- **Cards:** BentoProgrammes, CourseCard, AdminCard, IconTile, TrackModuleCard - inconsistent radius/shadow.
- **Icons:** lucide-react (consistent).
- **Forms:** react-hook-form + zod; ApplicationForm, EnquiryForm, CounsellorLeadForm, BriefingPackForm - inconsistent field styling.
- **Animations:** framer-motion; reduced-motion respected via `useReducedMotion` and a CI gate.
- **Dark mode:** partial. Dark surfaces exist but not toggleable.
- **Consistency:** 61 landing components, 20+ card variants. Way too much surface; ripe for consolidation into ~15 primitives.

---

## SECTION 11 - CONVERSION AUDIT (page by page)

- **Home** - strong hero, but stacks 20+ sections (Hero, Bento, HowItWorks, Comparison, EdtechLies, Pricing, CredibilityStrip, LogoMarquee, InsideSalesUrgencyStrip, LimitedSeatsCountdown, ParentSection, FAQ, FinalCTA, etc.). Diminishing returns after fold 4. **Cut 40% of sections.**
- **`/courses`** - good grid, but no "Which one is for me?" widget above it. Career Engine should be embedded here.
- **`/courses/$slug`** - long. Sticky Enrol rail helps. Missing: real testimonial video, real placed alumni, sample lesson.
- **`/apply`** - solid, but "Review → Confirm → Razorpay" adds 2 unnecessary clicks. Consolidate to 1 screen + Pay.
- **`/career-engine`** - 8 URLs, feels like a maze. Should be a single-page wizard with URL hash steps.
- **`/proof`, `/credibility`, `/trust-report`, `/methodology`, `/proof-methodology`, `/deployment-model`** - five overlapping pages. A first-time visitor won't read all five. Consolidate into one canonical `/why-arzon`.
- **`/recruiters`, `/tpos`** - PDF downloads with no next step. Add a Calendly-style booking + lead capture.
- **`/dashboard`** - dead end. This is the single worst conversion hole.
- **Weak CTAs found in audit:** "Learn more" appears in multiple places; the CTA-label baseline (`scripts/check-primary-cta.baseline.json`) already flags it.
- **Trust:** heavy on logos and government mentions; **light on named alumni with LinkedIn links** - the _one_ thing that would move the needle.
- **Credibility risk:** the site _tells_ you it's deployment-ready dozens of times but never _shows_ a video of a placed alum in role.

---

## SECTION 12 - BRAND POSITIONING

**What a stranger would think, in order of likelihood:**

1. Premium Indian pharma-domain edtech (most likely).
2. Career-coaching / placement consultancy (secondary).
3. Healthcare-workforce staffing agency (a distant third).

**What the copy _claims_ you are:** "India's healthcare workforce infrastructure."
**What the product actually is:** "A polished 3-track paid training school with strong marketing and a manual back-office."

**Gap:** you're marketing as infrastructure but shipping as a school. Positioning is _not_ clear because the site says one thing and the product does another. That's the core issue - everything else is downstream.

---

## SECTION 13 - PERFORMANCE

- **Bundle:** TanStack Start + React 19 + Vite 7. Route-level code split.
- **Images:** BentoProgrammes now uses srcset/sizes with 400/600 WebP variants (from your previous sprint). Elsewhere, mixed.
- **CSS:** Tailwind v4 with @theme - lean.
- **SEO:** genuinely good - dynamic sitemap, JSON-LD, per-route meta, OG/Twitter cards, hreflang.
- **Lighthouse:** targets 100/100/100 on A11y/Best-Practices/SEO per sprint doc, baseline TBD.
- **Accessibility:** axe-sweep, landmark-singleton, tap-target, reduced-motion CI gates. Solid.
- **Dead code / duplicate code:** 61 landing components, 30+ admin routes, multiple overlapping proof pages. Knip baseline exists (`.knip-baseline.json`) - actively tracked.
- **Biggest perf win available:** delete 40% of home sections + lazy-load below-fold - will halve TTI on 4G.

---

## SECTION 14 - SECURITY

- All 50 tables have RLS enabled.
- Public writes go through SECURITY DEFINER RPCs (`submit_application`, `ce_*`, `accept_admin_invite`).
- `service_role` key used only in `.server.ts` files, never in client bundles.
- Storage buckets `media` and `course-thumbnails` are public-read by design.
- No rate limiting at platform level - `ce_rate_buckets` is a homemade RPC-level throttle only.
- No CAPTCHA on lead forms - bot risk on `/apply` and `/career-engine/lead`.
- Password HIBP check is **off**.
- Tokenised recruiter shares (`/r/artifact/$token`) - verify token entropy + expiry.
- Razorpay is a hosted link - no signature verification because no webhook wired. As soon as you wire the webhook, verify `x-razorpay-signature` inside `/api/public/razorpay-webhook`.

---

## SECTION 15 - SCALABILITY

- **10k users:** fine. Cloudflare Worker + Supabase can absorb this without changes.
- **100k users:** the _marketing site_ is fine; the _manual admissions/reconciliation flow_ collapses. You need webhook payment auto-reconciliation, auto-account creation, and a real learner app.
- **1M users:** everything breaks - no learner delivery layer, no employer product, no search infra (Postgres full-text won't cut it at that scale for a jobs marketplace - you'll want Meilisearch/Typesense/Algolia or pgvector for semantic match), no notification fan-out (need queue + worker), no observability beyond `console.log` + `analytics_events`.

**Where it fails first:** operations/manual reconciliation, followed by the missing learner product, followed by search when employer-side lands.

---

## SECTION 16 - INFORMATION ARCHITECTURE

**Logical?** Partially. Marketing IA optimises for SEO breadth (36 city×role pages, 5 proof pages, 3 methodology pages) at the cost of decision clarity.

**Group correctly?** No. Recommended IA:

```
/ (home - one crisp value prop)
/for-students   (was: courses, internships, career-engine - merged)
/for-employers  (was: recruiters - becomes real product)
/for-colleges   (was: tpos)
/why-arzon      (was: proof + methodology + credibility + trust-report + deployment-model + republic - one canonical page)
/programmes/$slug
/apply
/app            (student dashboard - new)
/hire           (employer dashboard - new)
/admin
/about /contact /legal/*
```

**Delete:** `/dev/cards`, `/__vr.moments-empty`, `/build/*` (unless actively used), `/proof-methodology` (dup of `/methodology`), `/trust-report` (fold into `/why-arzon`), `/republic` (blog post, not a route), duplicate enrol path.

**Split:** `/dashboard` into `/app/*` (student) and `/hire/*` (employer).

---

## SECTION 17 - PRODUCT AUDIT

- **Unfinished:** learner app, certificate issuance, employer product, retention cadence, payment auto-reconciliation, mentor product, assessments product.
- **Unnecessary:** Deployment Republic page, Trust Report page, ArzonPrime60 waitlist (unless it's a real launch), Moments as a top-level nav item, `/build/*` if unused, `/dev/cards`, ACRI page (jargon nobody outside the team understands).
- **Confusing:** two apply funnels; five proof pages; eight career-engine URLs; JD-Mirror vs Curriculum vs Deployment-Model overlap.
- **Should become independent products (or at least first-class):**
  - **JD Mirror** - a real "syllabus from live JDs" tool; potential SaaS for other edtechs/colleges.
  - **Career Engine** - a proper careers-fit assessment product; potential B2C standalone.
  - **Certificate verifier** - a real cryptographic verifier could serve every Indian edtech.
  - **Deployment-ready readiness score** - the ACRI concept could be a standalone assessment IP.

---

## SECTION 18 - ANTI-GRAVITY ANALYSIS (path to "India's healthcare workforce infrastructure")

**Supports the vision:**

- Strong JD-derived curriculum discipline (real IP if turned into a data product).
- Deployment-ready framework (a genuine wedge if productised into a _score_ rather than a slogan).
- Well-structured RLS/backend, admin RBAC, migrations discipline.
- Programmatic SEO on city×role - this is the right muscle for a workforce marketplace.

**Works against it:**

- No employer accounts → cannot be workforce infrastructure without the demand side.
- No learner accounts → cannot show progress/outcomes → cannot underwrite an employer promise.
- Manual payment reconciliation → operations will not scale past 5k enrolments.
- 61 landing components + 111 routes → maintenance overhead crowds out product build.
- Marketing that overpromises ("infrastructure") vs product that under-delivers (school) will erode trust when real employers show up.

**Missing infrastructure:**

1. Verified employer accounts + hiring workflow.
2. Verified student portfolios with skill-evidence graph (real submissions, real rubric scores).
3. Placement outcomes ledger (offer letters + verifiable placements, not a static Trust Report).
4. A JD ingestion pipeline (auto-scrape + parse + skill-tag → keeps curriculum honest).
5. Assessment engine (proctored, rubric-scored, tied to skill graph).
6. Notification/comms backbone (WhatsApp Business API + templated email + in-app inbox).
7. Payments backbone (Razorpay webhook + invoices + payouts + refund workflow).
8. Search & match layer (skill graph → candidate ranker → recruiter view).

**Proprietary assets to build instead of more pages:**

- **The JD Graph** (all Indian pharma/CS JDs, parsed, skill-tagged, freshness-scored).
- **The Skill Evidence Graph** (student → skill → verifiable artefact).
- **The Deployment-Readiness Score** (ACRI, but real, benchmarked, published).
- **The Placement Ledger** (public, cryptographically verifiable placements - the only thing that beats a competitor's marketing).

---

## SECTION 19 - PRIORITY MATRIX

| Prio | Issue                                                       | Impact                        | Difficulty | Recommendation                                                                                                  |
| ---- | ----------------------------------------------------------- | ----------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| P0   | Paid students have no product post-payment                  | Extreme (refund + reputation) | High       | Ship a minimal `/app` - login, cohort, syllabus, next session, submissions inbox                                |
| P0   | Manual payment reconciliation                               | High                          | Low        | Wire Razorpay webhook → `/api/public/razorpay-webhook` → auto-mark enrolled + auto-provision account            |
| P0   | Positioning gap (infra vs school)                           | Extreme                       | Low        | Rewrite home + `/why-arzon` to match what you actually deliver today; keep the infra vision as a public roadmap |
| P0   | Two apply funnels                                           | High                          | Low        | Delete `/enrol/*`; keep `/apply/*`                                                                              |
| P0   | Five overlapping proof pages                                | High                          | Low        | Merge into one `/why-arzon`                                                                                     |
| P1   | No student auth / account                                   | High                          | Med        | Supabase magic-link + Google; auto-create on payment                                                            |
| P1   | No employer product                                         | Extreme (for the vision)      | High       | Build `/hire` MVP: employer signup, job post, candidate shortlist, artefact request                             |
| P1   | Certificate issuance is static                              | High                          | Med        | Issue from DB; sign with a project keypair; verifier reads chain                                                |
| P1   | 61 landing components / IA sprawl                           | Med                           | Med        | Consolidate to ≤ 15 primitives; delete `/build/*`, `/dev/cards`, `/__vr.*`, `/republic`                         |
| P1   | No CAPTCHA on lead forms                                    | Med                           | Low        | Cloudflare Turnstile on `/apply`, `/career-engine/lead`                                                         |
| P1   | HIBP off                                                    | Med                           | Trivial    | Enable via `configure_auth`                                                                                     |
| P2   | 8-URL Career Engine funnel                                  | Med                           | Med        | Collapse into single wizard with step= query param                                                              |
| P2   | Admin sprawl (30+ routes)                                   | Med                           | Med        | Consolidate to 12; delete unused analytics/experiments pages                                                    |
| P2   | 845 raw palette utilities remain                            | Low                           | Med        | Continue codemod passes                                                                                         |
| P2   | Missing notification centre                                 | Med                           | Med        | Templated WhatsApp + email service                                                                              |
| P3   | Speculative tables (demand\_\*, prime60, briefing_requests) | Low                           | Low        | Archive or delete                                                                                               |
| P3   | Moments as top-level nav                                    | Low                           | Trivial    | Move to footer                                                                                                  |
| P3   | Dark-mode partial                                           | Low                           | Med        | Either commit or remove the dark surfaces                                                                       |

---

## SECTION 20 - FINAL VERDICT (as CPO joining today)

**What you have:** the best-marketed pharma upskilling school in India, with an unusually mature engineering discipline (migrations, RLS, CI gates, typography tokens, SEO). This is genuinely impressive.

**What you don't have:** a product. Everything after "Pay Now" is manual. You've built the storefront and the loading dock, but the warehouse is a WhatsApp group.

### Keep

- The design system, typography tokens, colour tokens, CI gates.
- The admin RBAC + RLS + migration hygiene.
- The programmatic SEO engine (city×role, sitemap, JSON-LD).
- BentoProgrammes, CourseCard, the hero, the Pricing block.
- Career Engine _as a concept_ (rebuild the UX).
- JD-Mirror _as a concept_ (rebuild as a real data product).
- Deployment-Ready framework _as a concept_ (rebuild as a real score).
- Supabase schema for applications/cohorts/certificates/leads.

### Delete immediately

- `/dev/cards`, `/__vr.moments-empty`, `/build/*` (if unused).
- `/proof-methodology`, `/trust-report`, `/republic`, `/deployment-model` as separate routes - merge into `/why-arzon`.
- One of the two apply funnels (`/enrol/*` unless it does something `/apply/*` cannot).
- `arzonprime60_waitlist`, `assessment_shares`, unused `demand_*` tables.
- 5–8 admin pages that were never used (`experiments/sticky-cta`, `metrics-domain-grid`, `qa/content-rebalance`, etc.).
- ~40% of homepage sections below fold 4.

### Rebuild

- The **learner app** (`/app`) - this is the single highest-leverage build.
- The **employer product** (`/hire`) - the only way "workforce infrastructure" stops being a slogan.
- The **certificate issuance + verifier** - from DB, signed, provably yours.
- The **payments layer** - Razorpay webhook, auto-provision, invoices, refunds.
- The **Career Engine UX** - one wizard, not 8 URLs.
- The **notification backbone** - WhatsApp Business API + email templates + inbox.

### Postpone

- Dark mode.
- More marketing pages of any kind.
- ArzonPrime60 / any new sub-brand until the core product ships.
- Mobile app.
- International (Abroad strip is fine as a marketing tease, not a build).

### Build first (90-day plan)

1. **Weeks 1–2:** Delete the deletable list above. Merge proof pages. Kill `/enrol/*`. Reposition home to match reality.
2. **Weeks 3–5:** Razorpay webhook + auto-account creation (magic-link) + minimal `/app` shell (cohort, syllabus, next session, join link, submissions inbox).
3. **Weeks 6–8:** Certificate issuance from DB + signed verifier. Real Placement Ledger seeded with your first 20–50 verified alumni + LinkedIn links.
4. **Weeks 9–12:** Employer MVP - signup, verified org, browse portfolios (already have `/r/artifact/$token`), shortlist, artefact request, email/WhatsApp comms.

### The core product (what Arzon should _actually_ become)

Not a school. Not a job board. **A verified skill-evidence graph** for the Indian pharma/clinical workforce, where:

- students earn deployable evidence (not certificates),
- employers query the graph for verified candidates (not resumes),
- colleges pipeline students into the graph (not to a PDF),
- Arzon monetises both sides + the underlying data (JD Graph, Readiness Score).

Everything else - courses, cohorts, mentors, Career Engine, JD Mirror - becomes _feeders into the graph_, not the product itself.

If you build that, "infrastructure" stops being copy and starts being true.

---

_End of report._
