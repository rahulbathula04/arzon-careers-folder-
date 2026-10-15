# Arzon Global public marketing claims audit

**Audit date:** 15 October 2026
**Scope:** Public homepage, primary navigation, Career Assessment, role directory, programme marketing, public trust pages and ACRI-facing claims discovered in the live website and repository.
**Status:** Initial evidence audit. This document separates claims present in the product from claims substantiated by evidence reviewed in this audit. It is not a finding that an unverified claim is false.

## Decision

ACRI is paused as a public product. Remove its public promotion and route visitors from legacy ACRI URLs to Careers. Preserve internal assessment code and historical records for now; this change does not delete assessment data or disable administrative tools.

## Evidence standard

A public claim is ready to publish only when it has:
1. a precise definition;
2. a primary source or inspectable evidence artifact;
3. scope, geography and collection/update date where applicable;
4. a named internal owner responsible for refreshes;
5. language that does not imply a stronger conclusion than the evidence supports.

A live webpage or source-code constant proves that a claim is displayed, not that the claim is independently true.

## Claim register

| Claim or representation | Observed in public materials | Audit status | Required action before re-publication |
|---|---|---|---|
| “India’s most trusted platform” / “#1 healthcare career intelligence” | Homepage hero eyebrow | Unsupported superlative in reviewed evidence | Remove. Restore only with a defined, independent ranking and source. |
| “60+ healthcare career paths” / 61 role profiles | Homepage, Careers and Roles pages show different counts | Definition/count mismatch | Use the current role directory as the source of truth. Confirm unique role records and define “career path” versus “role profile” before publishing a count. |
| “2,000+ job descriptions analysed” and “2,000+ monitored/live” | Homepage stats, research ticker and methodology copy | Not substantiated by a dataset or auditable methodology in the reviewed material | Suppress the aggregate and “live/monitored” language until the source dataset, collection period, deduplication rules, source mix and refresh history are available. |
| “1,00,000+ students guided” | Homepage stats | No definition or denominator presented | Remove until a deduplicated count and definition of “guided” are documented. Webinar reach, attendees and individual guidance must not be conflated. |
| “78% Good Fit” and “94% TOP FIT” | Hero and assessment comparison previews | Illustrative scores presented like individual results | Replace with a clearly labelled product walkthrough or real, consented and anonymised result. Explain score meaning and limits; do not imply employment prediction. |
| “91 / Top 5% / Tier-1 Workplace Certified” | ACRI card and readiness UI | ACRI paused; percentile and certification evidence not established in this audit | Remove from public marketing. Do not restore without a defined comparison cohort, validated percentile calculation, published standard and evidence for any external recognition. |
| “40 calibrated clinical scenarios” / “calibrated” / “psychometrically calibrated” | ACRI pages and methodology language | Not established by the material reviewed | Remove from public marketing while ACRI is paused. Any future use requires item-development, validation, scoring and reliability documentation. |
| “CRO visibility”, “hiring fast-track”, recruiter credential | ACRI promotional language | No employer adoption evidence reviewed | Remove. Future use requires specific employer agreements and a clear description of the hiring workflow. |
| “Practical work samples are the #1 selection factor” | Homepage employer benchmark section | No cited study, sample or method displayed | Remove. If reintroduced, publish the research question, sample, source set, period and method. |
| Specific percentages about technical-round tests, coding accuracy, 3x selection uplift | Employer benchmark cards | Not substantiated in reviewed material | Suppress until each figure has a traceable source, sample size, date and method. |
| Salary bands and “median entry-level CTC” | Homepage ticker, role cards and course pages | No consistent source-level citation shown alongside each figure; page ranges vary | Present only with source, date, geography, seniority and sample. Distinguish advertised CTC from actual offers and outcomes. Remove unsupported “median” language. |
| “Government alignment”, TASK relationship and event/telecast claims | Homepage and trust pages | The website describes events and relationships; underlying primary records were not independently validated in this audit | Link official records or original media and state the exact relationship. Do not imply government endorsement of training, certification or hiring outcomes without explicit evidence. |
| “ISO 9001 certified”, “ISO-aligned certification” and external recognition language | Why Arzon and programme pages | Scope and certificate evidence not reviewed; wording varies | Verify certificate, issuer, validity and scope. Distinguish an organisation’s quality-management certification from accreditation or recognition of learner certificates. |
| Google / Justdial ratings and review counts | Homepage and Reviews page | Ratings are stated on the site; current source snapshots were not independently verified here | Store source URL, business profile, retrieval date, rating and count. Separate star reviews from social posts and first-party feedback. |
| Candidate leaderboard: named candidates, universities and scores | Homepage leaderboard | Page itself notes sample diagnostic records for illustration while the heading says “Top verified candidates” | Remove from public homepage. Never present illustrative or seeded records as real candidate results. Reintroduce only with valid records, consent, clear methodology and privacy review. |
| “Join thousands” and “gets you hired” | Closing CTA and other marketing copy | Outcome and reach claims not established in reviewed evidence | Replace with bounded language about career guidance, preparation and learning. Publish verified outcomes only with cohort, denominator and period. |
| Recruiter certificate check accepts an ID by regex and labels the format “valid” | Recruiter page code | Confirmed implementation behavior; format validation is not credential verification | Removed the local format-only result and linked to the credential verifier. A credential is valid only when its record is checked against the verification service. |\n| Programme duration, internship inclusion, partner certificates and placement support | Course/programme pages | Programme-specific details are stated but not audited against signed agreements, current delivery plans or cohort records | Verify each programme’s current syllabus, live-session format, projects, internship terms, partner authorisation, certificate issuer and support inclusions before making a claim. |

## Public-facing changes in this branch

- Removed ACRI from the primary navigation and global search.
- Changed the homepage assessment section to promote Career Assessment only.
- Replaced homepage headline metrics with clear links to real product surfaces: role directory, Career Assessment and programmes.
- Replaced the synthetic 78% homepage scorecard with an explicitly labelled role-profile example.\n- Removed static Career Assessment sample percentages and unsupported salary bands; the report preview now shows example sections and role options without pretending to be a real candidate result.\n- Removed the Careers page salary-band SEO claim, aggregate role counts and per-role JD counts pending evidence validation.
- Removed homepage research tickers, employer benchmark cards, institutional trust block and candidate leaderboard pending evidence review.
- Removed ACRI from the homepage journey and closing CTA; softened employment-outcome language.
- Redirected the legacy /acri entry point to /careers and disabled the public ACRI scroll lead magnet.\n- Replaced the recruiter page’s format-only “valid” result with a link to the actual credential verifier.
- Preserved assessment internals and historical data; no database changes are included.

## Follow-up audit required

This initial pass does not certify every public claim on every route. Before a full visual redesign, review the live source evidence and remaining marketing routes, especially /courses, /roles and their detail pages, /reviews, /verify, other programme detail pages, internship pages and legal/privacy notices. Salary and JD counts on role detail pages still require source-level review. The /why-arzon page has been replaced with a transparent explanation of the products and their limits. Check direct links, child routes, SEO metadata, structured data, footer CTAs and downloadable PDFs. Legal notices should accurately describe current and historical data processing rather than being deleted mechanically.

## Release acceptance criteria

- No public navigation, search result or marketing CTA promotes ACRI while it is paused.
- Legacy public ACRI URLs do not render the certification product.
- Homepage has no unsupported aggregate scale metrics, fictional candidate scorecards, candidate leaderboard or unsupported hiring superlatives.
- Remaining claims have a source, definition, scope/date and owner in a maintained evidence register.
- Build, route tests, link checks, mobile review and SEO/canonical checks pass before merge/deployment.