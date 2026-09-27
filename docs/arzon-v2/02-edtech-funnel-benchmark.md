# Arzon EdTech Funnel Benchmark - 2026

## Scope and method

This benchmark uses the published 2025 Top1000.com EdTech and Online Learning universe as a broad market frame, plus the 2025 HolonIQ Global EdTech 1000 as a second independent market frame. The Top1000 list describes an initial pool of more than 2,500 companies expanded through public research, directories, media, app stores, search and LinkedIn, then normalized and deduplicated. Its index uses public digital signals rather than private survey data. HolonIQ independently describes its 2025 cohort as 1,000 selected from more than 10,000 nominations/applications/screening inputs. This means the benchmark is broad, but the funnel analysis below is a representative deep sample of high-relevance companies, not a claim that 1,000 sites were manually crawled end-to-end.

## Market signal

HolonIQ's 2025 Global EdTech 1000 shows workforce training and development at more than one-third of the cohort, while post-secondary represents about one-fifth. It also notes a durable shift toward lean, modular, consumer-oriented models, clearer value demonstration, short-cycle learning and stronger employer alignment in workforce learning.

For India, IMARC reports more than 4,500 registered EdTech platforms in 2025, with concentration varying sharply by segment. The implication for Arzon is that a narrow, high-intent career problem must be easier to understand and easier to act on than a generic course marketplace.

## High-relevance benchmark set

### upGrad
Observed structure:
- Career counselling as a lead magnet.
- Program catalogue grouped by career outcomes and institutional partners.
- Programme pages expose duration, projects, mentors, career support, hiring access and scholarship/enquiry actions.
- Career support is treated as a product layer, not an afterthought.
Reusable Arzon pattern:
Discovery -> free counselling/career plan -> programme decision -> application

### Physics Wallah
Observed structure:
- Free tests, scholarship/admission tests and free batches reduce entry friction.
- Paid batches add structured classes, tests, notes, mentorship and support.
- Course pages make the next action highly concrete.
Reusable Arzon pattern:
free diagnostic / sample value -> qualification signal -> paid cohort

### Unacademy
Observed structure:
- Free entry points sit next to paid subscription tiers.
- Paid plans bundle live classes, tests, practice, notes, mentorship and community.
- The product is sold as an ongoing learning system, not a single video course.
Reusable Arzon pattern:
free utility -> structured path -> support layer -> paid programme

### Great Learning
Observed structure:
- Free Academy creates an always-on acquisition layer.
- Free learning is used to introduce users to categories and then route them toward premium programmes.
- Premium programme pages combine projects, mentorship, career support, jobs and application/brochure actions.
Reusable Arzon pattern:
free content library -> trust -> premium programme -> application

### Simplilearn
Observed structure:
- Large free SkillUp library with free certificates.
- Free content is intentionally positioned as a low-risk way to test a subject before committing to a deeper paid programme.
- Premium programmes add depth, projects, mentorship and career support.
Reusable Arzon pattern:
free micro-learning -> proof of value -> paid role pathway

### Scaler
Observed structure:
- Content starts with the question what do I need to become hireable?
- Skills are ordered by role and accompanied by proof expectations.
- Admissions and mentor journeys create explicit fit gates rather than forcing every visitor into a catalogue.
Reusable Arzon pattern:
role problem -> readiness/fit -> evidence -> programme

### Masai
Observed structure:
- Outcome and payment model appear before deep curriculum.
- Admission path is explicit: register -> qualifier -> selection/next step.
- Learn-by-doing and placement support are part of the core offer.
Reusable Arzon pattern:
clear outcome -> qualification gate -> cohort -> work evidence -> career support

### Vedantu
Observed structure:
- Free demo is the conversion object.
- Demo provides personalised experience and roadmap before the paid commitment.
- Counselling is downstream of demonstrated value.
Reusable Arzon pattern:
free experience -> personalised recommendation -> paid plan

### Udemy
Observed structure:
- Search/browse is followed by a course landing page.
- Users can preview selected lectures before purchase.
- Course information, instructor information, curriculum and reviews are all adjacent to the buy decision.
Reusable Arzon pattern:
browse -> preview -> proof -> purchase

### Coursera
Observed structure:
- Course pages reduce risk with previews/trials and clear certificate/learning information.
- Bundles and subscriptions encourage deeper commitment after initial exploration.
Reusable Arzon pattern:
preview/trial -> course value -> subscription or purchase

## Common funnel architecture across these models

The repeated pattern is not homepage -> course -> payment.

It is closer to:

Discovery -> Free value -> Diagnosis / fit -> Recommended path -> Proof -> Human help when useful -> Application / payment -> Learning -> Outcome evidence

The strongest career-oriented models make the learner answer one of these questions before purchase:
1. What role is right for me?
2. What do employers actually ask for?
3. Can I experience the learning or work before paying?
4. What will I have to show at the end?
5. What happens after I complete it?

## Arzon gap analysis

### What Arzon already has
- Role-first positioning.
- Healthcare role directories and industry pages.
- Career Engine / readiness assessment.
- Programme catalogue.
- Enrolment and payment flow.
- Career support and institution-facing surfaces.
- Strong event tracking and admin funnel infrastructure.

### What is structurally weak
- The free-value layer is scattered instead of being a single deliberate acquisition system.
- The programme catalogue still behaves partly like a course list rather than a guided decision system.
- Programme pages contain too many legacy visual systems and mixed claims.
- The enrolment page is visually and commercially disconnected from the new company shell.
- Some public pages still carry older Nav/Footer components instead of the shared shell.
- The Career Engine has two competing entry concepts, which increases cognitive load.
- The site does not consistently carry the user's chosen role from discovery through programme selection into enrolment.

## Recommended Arzon funnel

### Layer 1 - Discover
SEO and paid traffic land on:
- role pages
- qualification pages
- healthcare jobs
- salary pages
- research / JD intelligence
- practical career content

Primary CTA: Check My Career Fit
Secondary CTA: Explore This Role

### Layer 2 - Free value
Every major acquisition page should offer one immediate, low-risk action:
- Free Career Assessment
- Role requirement snapshot
- Job-description skill map
- Sample work / case exercise
- Programme preview

The goal is not to collect a form before value is visible.

### Layer 3 - Diagnose
Career Engine should produce:
- target role(s)
- fit / readiness profile
- missing skills
- why the role was selected
- recommended next 3 actions
- recommended Arzon programme when a gap exists

### Layer 4 - Monetise
Programme page should answer:
- What role is this for?
- What work will I practise?
- What skills/tools will I use?
- What evidence will I produce?
- Who is it for?
- How long?
- What support is included?
- What does it cost?
- What are the terms?
- What is the next step?

The primary CTA should remain the same from page to page: Get My Career Plan or Start My Application, depending on intent.

### Layer 5 - Activate and prove
After payment:
Learner account -> onboarding -> learning -> assignments -> projects -> readiness -> portfolio -> career support

That outcome data should eventually feed back into proof on the public site, with verified numbers only.

## Arzon page hierarchy to implement

### Global
Home
Careers
Programmes
Career Intelligence
For Institutions
Why Arzon
About

### Acquisition / discovery
/industry/...
/roles/...
/healthcare-jobs-for-freshers
/industry/salaries
/research
/blog

### Decision
/career-engine
/courses
/courses/:slug

### Conversion
/enrol
/enrol/:tier
/enrol/:tier/pay
/enrol/success

### Product
/app/* or learner workspace equivalents

## Product rules derived from the benchmark

1. One dominant user question per page.
2. One primary CTA per page state.
3. Free value before high-friction lead capture when possible.
4. Role and outcome are more important than course title.
5. Show evidence near the decision, not buried at the bottom.
6. Make comparison explicit where multiple programmes compete.
7. Keep programme context in the URL and UI all the way through enrolment.
8. Separate marketing shell, assessment shell, learner workspace and employer console.
9. Eliminate duplicate nav/footer systems from public pages.
10. Do not use unverified percentages, placement counts, partner counts, salary claims or scarcity claims.

## Build priorities

### P0
- Unify all public pages under the Arzon shell.
- Refactor the programme detail template.
- Refactor enrolment to preserve programme context.
- Simplify Career Engine entry.
- Create a reusable free-value / decision CTA system.

### P1
- Add role requirement snapshots.
- Add sample work / programme preview.
- Add qualification-to-role routing.
- Add programme compare with recommendation.
- Connect results to a personalised programme recommendation.

### P2
- Build the public proof loop from verified learner/work evidence.
- Add experimentation framework around CTA wording and order.
- Build institution and employer acquisition funnels separately from the learner funnel.
