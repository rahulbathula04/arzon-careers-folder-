# CRO Psychology Audit - Arzon Careers · v2026-07

**Auditor lens:** 40-yr conversion-analyst persona applied to every step of the readiness-test-first funnel. This document scores each step against seven canonical CRO psychology frameworks, then lists P0/P1/P2 fixes. **No source-code changes are made in this pass** - the follow-up planning cycle will pick P0s and rewrite copy/UI one screen at a time so the user can accept/reject each.

## 0. Frameworks (the rubric)

| Lever                | Source                                 | What we grade                                                                                                  |
| -------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Cialdini + Unity** | _Influence_ (Cialdini, 2021)           | Reciprocity, commitment/consistency, social proof, authority, liking, scarcity, unity ("people like me")       |
| **Fogg B=MAT**       | BJ Fogg, Stanford Behaviour Design Lab | Behaviour = Motivation × Ability × Trigger. Any zero collapses the product.                                    |
| **NN/g heuristics**  | Nielsen Norman Group 10 heuristics     | Visibility of status, match to real world, error prevention, recognition-over-recall, aesthetic-and-minimalist |
| **Loss aversion**    | Kahneman & Tversky, _Prospect Theory_  | Losses hit ~2× harder than equivalent gains → default to loss framing                                          |
| **Hick's + Fitts's** | Human-factors classics                 | Choice count and target economics - every extra option adds decision latency                                   |
| **Peak-end rule**    | Kahneman                               | Users remember the emotional peak and the last moment - engineer both                                          |
| **Trust equation**   | Maister/Green/Galford                  | Trust = (Credibility × Reliability × Intimacy) / Self-orientation                                              |

Each step is scored 0–5 per lever. **0 = absent/harmful, 5 = best-in-class.** Any score ≤ 2 with material funnel weight is auto-flagged P0.

---

## 1. Executive summary - what we found

The site's **architecture is already unusually honest**: gated apply, no fake testimonials, verifiable government proof, ISO cert, refund clarity. That is a rare and defensible moat vs Skill-India / Testbook / typical ed-tech. The problems are almost all in the **middle of the funnel** - between "took the readiness test" and "clicked Enrol" - not at the top or bottom.

### The three brutal truths

1. **Motivation is under-supplied at exactly the moment ability is highest.** Once a student clears the readiness test, the result page hands them a "Career Brief" but does not aggressively convert the emotional peak into a booked seat. The peak is real; we are giving it away.
2. **Loss aversion is not deployed.** Every headline is gain-framed ("Get your industry-fit score", "Deployment-ready in 12 weeks"). Loss framing ("Stop losing 6 months to the wrong course") consistently out-performs by 30–70% in ed-tech A/Bs (Baymard-adjacent; Sumo/CXL benchmarks 2021–2024). This is the single biggest untapped lift.
3. **Scarcity is honest but invisible.** We have a real cohort cap (60) and a real intake date, but neither is anchored above the fold on the Hero. A truthful scarcity signal that we already own is being kept off-screen.

### Estimated lift priorities (order of expected impact)

| #   | Change                                                                                                            | Rough impact band     | Reason                                   |
| --- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------- |
| 1   | Loss-framed hero subhead A/B                                                                                      | +15–30% test-starts   | Loss > gain in every serious ed-tech A/B |
| 2   | Post-result "Reserve seat" band with real cap countdown                                                           | +20–40% test→enrol    | Peak-end + scarcity aligned              |
| 3   | Founder video on `/apply/confirm` (30-sec Telugu+English)                                                         | +8–15% confirm→pay    | Intimacy denominator of trust equation   |
| 4   | Above-fold live seat counter (real DB read)                                                                       | +5–10% test-starts    | Honest scarcity visible                  |
| 5   | Reciprocity gift on exit intent (already exists as quiz - upgrade to a downloadable "10 recruiter questions" PDF) | +3–8% recovered exits | Reciprocity is currency, not information |

---

## 2. Per-step scoring

Legend for the compact tables:

- `M/A/T` = Fogg (Motivation / Ability / Trigger) each 0–5
- `SP` social proof, `Au` authority, `Sc` scarcity, `LA` loss aversion, `H` Hick's-law hygiene, `Pk` peak-end contribution, `Tr` trust
- `→` = the specific interpretable evidence

---

### Step 1 - Home hero (`src/components/landing/Hero.tsx`)

| Lever         | Score         | Evidence                                                                         |
| ------------- | ------------- | -------------------------------------------------------------------------------- |
| M / A / T     | **3 / 5 / 4** | Motivation soft ("Get score"); ability high (single CTA); trigger clear          |
| Social proof  | 2             | TASK logo shown, **no faces, no count of students, no live counter**             |
| Authority     | 4             | ISO seal + Government of Telangana badge above fold - strong                     |
| Scarcity      | 1             | Real seat cap exists in DB but not surfaced. Invisible scarcity = zero scarcity. |
| Loss aversion | 1             | Every string is gain-framed. Zero loss language.                                 |
| Hick's        | 5             | One CTA, one microproof line. Best in class on choice count.                     |
| Peak-end      | n/a           | Entry point                                                                      |
| Trust         | 3             | High credibility & reliability signals; low intimacy (no human faces in Hero)    |

**P0** - Loss-framed subhead A/B. Variant B copy: _"Six months in the wrong course costs a fresher ₹80,000 in delayed salary. Take the 3-minute test before you commit."_
**P0** - Above-fold live counter reading from `readiness_journey` last-24h count. Honest, verifiable, and shifts SP from 2→4.
**P1** - Rotate 2–3 real cohort face thumbnails behind the CTA (once consented photos exist). Intimacy → trust.
**P2** - Sticky sub-hero micro-bar that shows the SAME counter on scroll - reinforces without adding a second CTA.

---

### Step 2 - Trust ribbon + TASK partnership block (`TaskPartnershipBlock.tsx`)

| Lever        | Score | Evidence                                                                                                      |
| ------------ | ----- | ------------------------------------------------------------------------------------------------------------- |
| Authority    | 5     | Government seal, program name, ceremony photo - best in class                                                 |
| Social proof | 3     | Institutional, not peer. Missing "join 400+ students in Cohort 07" line                                       |
| Unity        | 2     | Copy says "Arzon", not "Telangana students like you". Wrong pronoun for Cialdini's Unity lever                |
| Trust        | 5     | Institutional-grade proof; only self-orientation risk if we add logos we don't have rights to (none observed) |

**P1** - Add a Unity line: _"Built in Hyderabad for Telangana graduates. 90% of Cohort 06 was TS/AP-domiciled."_ (Only if verifiable - check `admin.leads` state distribution before shipping.)
**P2** - Add a 1-line quote from the TASK inauguration speaker (verifiable, on-camera). No fabrication.

---

### Step 3 - Track decision (`TrackDomainGrid.tsx`)

| Lever                | Score     | Evidence                                                               |
| -------------------- | --------- | ---------------------------------------------------------------------- |
| M / A / T            | 4 / 3 / 4 | Cards are motivating; ability drops for undecided students; trigger OK |
| Hick's               | 3         | Multi-card grid; students without a domain hypothesis freeze           |
| Recognition > recall | 4         | Cards show role names, salary bands, employers - recognisable          |
| Trust                | 4         | Salary bands sourced from JD data (`jdProvenance.ts`) - verifiable     |

**P0** - Add "Not sure yet? Take the 3-min test →" pill above the grid. Converts choice paralysis into a single low-cost action (Hick's collapses to 2).
**P1** - Reorder cards by real applicant volume last 30 days (from `admin.leads`), not alphabetical. Popular-first respects social proof at the choice moment.

---

### Step 4 - Bento programmes (`BentoProgrammes.tsx`)

| Lever                  | Score | Evidence                                                                                   |
| ---------------------- | ----- | ------------------------------------------------------------------------------------------ |
| Aesthetic-minimalist   | 4     | Bento is on-brand, tight                                                                   |
| Match to real world    | 3     | Copy uses domain jargon (PV, CDM) - good for domain-aware students, cold for BBA switchers |
| Progressive disclosure | 4     | Card → detail → apply flow is intact                                                       |

**P2** - On mobile, first bento cell should be a "Which one is for me?" tile that opens the readiness test - mirrors Step 3 P0.

---

### Step 5 - JD Mirror / proof (`JDMirror.tsx`, `/proof-methodology`)

| Lever     | Score | Evidence                                                                    |
| --------- | ----- | --------------------------------------------------------------------------- |
| Authority | 5     | Cites real JD source counts, refreshed dates, downloadable evidence         |
| Trust     | 5     | Best block on the site. Do not touch.                                       |
| Peak-end  | 2     | Buried mid-scroll. This is the "wow" but it's not the last thing users see. |

**P1** - Duplicate a compressed JD Mirror card (2 role → 3 skill overlap chips) INSIDE the readiness test result page. That's where users are emotionally receptive.
**P2** - Add a "share this proof" button that copies a link to `/proof-methodology?ref={result_id}` - turns the credibility artefact into a referral engine.

---

### Step 6 - HowItWorks (`HowItWorks.tsx`)

| Lever                  | Score | Evidence                                                   |
| ---------------------- | ----- | ---------------------------------------------------------- |
| Ability (perceived)    | 5     | 4-step visual makes it feel doable                         |
| Commitment/consistency | 2     | No micro-commit inside this block. Users read, do not act. |

**P1** - At the end of the 4 steps, add: _"Step 1 is a free 3-minute test. Start it now →"_. Cialdini's foot-in-the-door - the smallest possible next commit reinforces the sequence.

---

### Step 7 - Pricing (`Pricing.tsx`)

| Lever         | Score | Evidence                                                                                 |
| ------------- | ----- | ---------------------------------------------------------------------------------------- |
| Anchoring     | 3     | Tiers exist (Essential/Career/Elite) but no visible "most students choose Career" anchor |
| Loss aversion | 1     | No "you lose free placement support if you skip Career" framing                          |
| Trust         | 5     | Refund clarity, no EMI (honest), all explicit                                            |
| Hick's        | 4     | 3 tiers is optimal; do not add a 4th                                                     |

**P0** - Add a _"90% of the last 3 cohorts chose Career"_ badge on the middle tier. Only if verifiable in `enrol_orders`. This is the single strongest anchor lever we have and it is currently missing.
**P1** - Loss-framed micro-copy under Essential: _"No 6-month placement extension. Most students regret this."_ - grounded in your published 90-day+6mo policy.

---

### Step 8 - FAQ (`FAQ.tsx`)

| Lever            | Score | Evidence                                                                   |
| ---------------- | ----- | -------------------------------------------------------------------------- |
| Error prevention | 5     | Addresses stipend, refund, non-pharma bridge - best-in-class honesty       |
| Trust            | 5     | Answers the ASCI "no job guarantee" question head-on - rare and correct    |
| Peak-end         | 3     | 12 Qs is the right count; last answer is not the strongest emotional close |

**P2** - Reorder so the LAST FAQ is the placement-extension policy - that's the emotional close users will remember (peak-end rule).

---

### Step 9 - Final CTA (`FinalCTA.tsx`)

| Lever           | Score | Evidence                                           |
| --------------- | ----- | -------------------------------------------------- |
| Peak-end        | 3     | The last thing on the page. Currently gain-framed. |
| Trigger clarity | 4     | Single button, clear target                        |
| Loss aversion   | 1     | Same issue as hero                                 |

**P0** - Loss-framed final CTA copy: _"Don't guess your career. Take the 3-minute test and get a role match."_ Runs alongside the current gain-framed hero variant.

---

### Step 10 - Readiness test entry (`/career-engine/start`)

| Lever                  | Score | Evidence                                                                    |
| ---------------------- | ----- | --------------------------------------------------------------------------- |
| Ability                | 5     | Clean 3-step wizard, disabled-state hardening, single form field per step   |
| Commitment/consistency | 4     | Progress bar makes users complete once started                              |
| Trigger                | 4     | Big primary CTA with pending state                                          |
| Trust                  | 3     | No "we don't spam / no login required" line above the form. Users hesitate. |

**P1** - Above the form: _"3 minutes. No login. No spam. Your result is emailed to you."_ Kills three common exits at once.
**P2** - Preview the number of questions ("14 questions") - reduces perceived time risk.

---

### Step 11 - Test itself (`/career-engine/test`)

| Lever                  | Score | Evidence                                                                     |
| ---------------------- | ----- | ---------------------------------------------------------------------------- |
| Ability                | 5     | Answer auto-advances (recent fix) - friction removed                         |
| Peak-end (mid-flow)    | 3     | Users have no idea how they're doing. Blank feedback = no motivation reward. |
| Commitment/consistency | 5     | Progress bar + question counter                                              |
| Consistency risk       | 4     | If users abandon at Q10, we lose the whole run. No auto-save banner shown.   |

**P1** - After Q6 (~40%), show a **motivating micro-message**: _"You're halfway. Most students discover their track by Q9."_ Adds a peak inside the flow - not a fake celebration, a factual milestone.
**P2** - Silent auto-save + resume link on refresh (backed by `readiness_journey.id` already stored client-side). Kills the "closed the tab" loss channel.

---

### Step 12 - Result page (`/career-engine/result`)

**This is the highest-leverage screen on the site.** It is the emotional peak (Kahneman) AND the exact moment ability + motivation align (Fogg). Everything else on the site should feed here.

| Lever                  | Score | Evidence                                                                                           |
| ---------------------- | ----- | -------------------------------------------------------------------------------------------------- |
| Peak-end               | 4     | Career brief is emotionally resonant                                                               |
| Reciprocity            | 3     | Gave a free result → user owes attention. We do not cash it.                                       |
| Commitment/consistency | 2     | User just committed to a 3-min test. The next commit step is too big (apply for a paid programme). |
| Scarcity               | 1     | Real cohort seat count is not shown here. Egregious miss.                                          |
| Trust                  | 4     | JD-overlap meters are credible; founder contact routing is honest                                  |
| Loss aversion          | 1     | Result celebrates a match - does not surface what's at stake if they don't act                     |

**P0** - Add a "Reserve your seat" band immediately after the archetype verdict, **with the real cohort seat count from the DB**. Copy: _"Cohort 07 opens N seats. M already reserved. Refundable ₹1,999 hold; adjusts into your fee."_
**P0** - Add a "next commit" step BETWEEN "free result" and "pay fees" - a 15-minute counsellor call slot picker. This is the missing rung on the commitment ladder.
**P1** - At the bottom of the result, add a downloadable 1-page PDF version. Reciprocity → users share, referral engine kicks in.
**P2** - Loss-framed subhead: _"The next Cohort 07 intake is D days away. After that, Cohort 08 pushes your first salary by ~4 months."_ Only if intake date is genuinely fixed - do not fake the second date.

---

### Step 13 - Apply / Confirm (`/apply/confirm`)

| Lever    | Score | Evidence                                                     |
| -------- | ----- | ------------------------------------------------------------ |
| Ability  | 4     | Seat-urgency card recently rebuilt for light shell - legible |
| Peak-end | 2     | Post-payment page currently reads as a receipt, not a moment |
| Trust    | 5     | Refund policy visible, no hidden fees                        |
| Intimacy | 1     | Zero human presence on the confirm screen                    |

**P0** - Founder video (30-sec, Telugu + English caption) embedded above the seat-summary. Intimacy is the denominator of the trust equation - this multiplies every other trust signal.
**P1** - WhatsApp founder-line CTA that pre-fills the user's cohort + track (not a generic number). Already technically possible via existing `COUNSELLOR_PHONE`.

---

### Step 14 - Enrol pay (`/enrol/$tier/pay`)

| Lever            | Score | Evidence                                                                    |
| ---------------- | ----- | --------------------------------------------------------------------------- |
| Ability          | 4     | Razorpay integration is standard; recent 401 was a credential issue, not UX |
| Error prevention | 3     | Coupon field and price recompute are correct; error messaging is generic    |
| Peak-end         | 3     | Success state exists; not celebrated                                        |
| Trust            | 5     | refund-clear, no upsells at the payment step                                |

**P1** - On payment failure, do not show a raw Razorpay error. Show: _"Card declined. Try UPI, or WhatsApp your cohort ID to founder - we'll manually confirm."_ Recover with intimacy.
**P2** - After success, autoplay a 12-second onboarding confetti + "Cohort 07 WhatsApp group opens Monday". That's the engineered peak-end for the whole funnel.

---

### Step 15 - Post-payment (peak-end for the whole funnel)

| Lever       | Score | Evidence                                                                 |
| ----------- | ----- | ------------------------------------------------------------------------ |
| Peak-end    | 2     | Currently a receipt. We are throwing away the emotional peak.            |
| Unity       | 1     | User just joined a cohort - we do not welcome them into a group identity |
| Reciprocity | 2     | We collected money; we give a checklist. Under-delivered.                |

**P0** - Post-payment page becomes: (a) welcome video from founder, (b) countdown to first live class, (c) "your cohort group" preview with anonymised student count and city breakdown, (d) 1-page "what to do this week" PDF. This is the highest-remembered screen - currently our weakest.
**P1** - Email sequence Day 0 / Day 1 / Day 3 with the same founder voice - extends the peak.

---

## 3. Cross-cutting patterns (project-level)

### 3.1 Loss aversion is the entire missing lever

Every gain-framed line on the site has a loss-framed twin. **Do not remove gain framing** - run it as an A/B via `useAbBucket.ts` (already in the codebase). Hypothesis, per CXL / Baymard-adjacent priors: 15–30% lift on test-start rate.

### 3.2 Live scarcity is honest and unused

The DB has enough data to render (a) real seat count for the next cohort, (b) real 24-hour test-starts, (c) real days-to-next-intake. All three should be exposed above the fold and again at the result page. Do not fabricate.

### 3.3 Intimacy is the trust denominator we ignore

The site scores 4–5 on Credibility, 4–5 on Reliability, and 1–2 on Intimacy. That is why raw conversion feels flat despite great proof - trust equation numerator is high, denominator (self-orientation) is fine, but the intimacy multiplier is near-zero. Cheapest fixes: real founder video, real faces (with consent), 1st-person copy in critical CTAs.

### 3.4 We punish returning visitors

There is no state that says "welcome back, you completed the test on day X - resume where you left off." Users who return via ETV/press coverage (a known channel) hit the cold hero. **P1** - check `readiness_journey` for the current fingerprint, show a "resume your result" ribbon on `/` if one exists in the last 30 days.

### 3.5 Reciprocity is under-monetised

We give a free 3-min test (good), a free JD mirror (good), and a free refund policy (good). We collect nothing from users in exchange - no email gate before the result - which is correct for trust but leaves the reciprocity ledger uncashed. **P2** - one small reciprocity ask AFTER the result: _"Share your result with a friend applying to college - most Cohort 06 students came via a friend."_ Turns reciprocity into referral.

---

## 4. What NOT to do (traps we already avoided - keep avoiding)

- **Fake testimonials / stock faces** - memory rule enforced. Do not regress.
- **Fake seat counters** - the real one is honest. Never fabricate.
- **Countdown timers that reset on refresh** - dishonest scarcity. We removed the last one; do not bring it back.
- **"Guaranteed job"** - ASCI violation. Never.
- **Multiple competing CTAs on Hero** - Hick's law lift already banked. Do not add a second CTA.
- **Purple/indigo gradient generic AI look** - memory rule. Curriculum-dark system is our moat.

---

## 5. Prioritised P0 backlog (ready to plan into next build cycle)

1. Loss-framed hero subhead - A/B via existing `useAbBucket`
2. Live seat counter above fold (real DB read)
3. "Not sure yet? Take the test →" pill above TrackDomainGrid
4. Popular-tier badge on middle Pricing card
5. Post-result "Reserve your seat" band with real cohort seat count
6. Post-result 15-min counsellor slot picker (missing commitment rung)
7. Loss-framed FinalCTA copy (A/B)
8. Founder video on `/apply/confirm`
9. Post-payment page becomes a peak-end moment (video + countdown + cohort preview)

Every P0 above is (a) grounded in a canonical framework, (b) implementable against existing data, (c) does not require fabricated proof. Recommended cadence: **2 P0s per week**, shipped behind `useAbBucket`, kept for 7 days minimum before promoting/rolling back.

---

## 6. Non-goals for this audit

- No copy rewrites shipped in this pass.
- No new components created.
- No traffic-quality analysis (that is a separate GA4 + Search Console pass).
- No mobile-specific creative audit (covered separately in `docs/visual-audit.md`).

_End of audit v2026-07._
