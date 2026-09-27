# Arzon Careers V2 - Brand and Information Architecture Contract

Date: 2026-09-27

## Product statement

Arzon Global helps healthcare and life-sciences graduates move from academic qualification to verified job readiness.

The website is one product system. Individual role programmes may have controlled accents, but they are not separate brands.

## Three visual modes

### 1. Core

Use on the homepage, about, contact, pricing, application and other decision pages.

Core palette:
- Deep navy: #071A4A
- Brand blue: #1B3F8B
- Supporting blue: #5B8FC5
- White / soft blue surfaces
- Emerald only for success or verified state

### 2. Career Intelligence

Use on industry, research, blog and tools.

The same Core palette remains dominant. Data tables, charts and monospace labels may add an analytical feel.

### 3. Programme

Use on role programme pages.

The same Core shell, typography, navigation, buttons and cards remain. A programme may use one controlled accent for small labels, icon states and data highlights.

## Primary navigation

Careers | Programmes | Career Intelligence | For Institutions | Why Arzon | About

Right side:
Search | Sign In | Get My Career Plan

## Canonical funnel

Traffic
-> Role or career discovery
-> Career diagnostic
-> Readiness / skill-gap result
-> Relevant programme
-> Evidence / proof
-> Counsellor
-> Application
-> Payment
-> Learner account
-> Training + assessment
-> Portfolio
-> Career outcome

## Page rules

1. Every page must have one clear primary job.
2. Every page must have one dominant next action.
3. "Learn more" is not a primary CTA.
4. A page may support SEO breadth without adding a new top-level navigation category.
5. Programme pages sell role readiness, not generic course access.
6. Proof must distinguish research, learner work, verified assessment and verified outcomes.
7. No page may introduce a new color family without a V2 design-system entry.
8. No new standalone branded sub-system should be created without a product reason.
9. Legacy duplicate surfaces should point to a canonical V2 page.
10. A paying learner must have a visible post-payment product path.

## Legacy consolidation map

| Existing surface | V2 destination |
| --- | --- |
| /proof | /why-arzon |
| /proof-methodology | /why-arzon |
| /credibility | /why-arzon |
| /trust-report | /why-arzon |
| /deployment-model | /why-arzon |
| /republic | /why-arzon or blog |
| /internships/* | /courses/* |
| /enrol/* | /apply |
| /career-engine/* | /career-engine |
| /courses/* | Keep, redesign |
| /industry/* | Keep for SEO, redesign inside Career Intelligence mode |

## Catalogue policy

Healthcare and life-sciences programmes are the primary Arzon catalogue.

General programmes such as finance, HR, generic software and other unrelated tracks must not appear in the primary homepage or navigation hierarchy while the healthcare positioning is active. They remain legacy/secondary until a separate business decision is made.

## Engineering policy

V2 is an incremental restructuring. Preserve working backend, analytics, SEO URLs and payment infrastructure while consolidating UI and user flows.

Do not rewrite the repository wholesale.
Do not introduce new route sprawl.
Prefer shared primitives over page-specific implementations.
