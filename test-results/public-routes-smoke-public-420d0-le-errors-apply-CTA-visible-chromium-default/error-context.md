# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - desktop (1440×900) >> GET /refer renders, no console errors, apply CTA visible
- Location: tests\e2e\public-routes-smoke.spec.ts:110:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-apply-cta')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('nav-apply-cta')

```

```yaml
- link "Skip to main content":
  - /url: "#app-scroll-root"
- banner:
  - link "Arzon Global - go to home":
    - /url: /
    - paragraph: ARZON
  - navigation "Main navigation":
    - link "Programmes":
      - /url: /courses
    - link "Proof & Credibility":
      - /url: /why-arzon
    - link "Public Verifier":
      - /url: /verify
    - link "About Us":
      - /url: /about
  - link "Apply Now":
    - /url: https://forms.gle/kfB8iDEHtcBhBUrC9
- main:
  - paragraph: Alumni & friends
  - heading "Refer a healthcare graduate." [level=1]
  - paragraph: You know who's stuck job-hunting after B.Pharm or B.Sc. Send them the ACRI Preview. If they enrol, you earn ₹2,000 and they get ₹2,000 off.
  - text: Give ₹2,000 • Get ₹2,000 Referral Program
  - heading "Share Success. Earn Cash Rewards." [level=2]
  - paragraph: Give your peers ₹2,000 off their enrolment fee. Get ₹2,000 cash credited via UPI for every friend who joins.
  - paragraph: Total Cashback Earned
  - paragraph: ₹4,000
  - text: Share via WhatsApp in 1-Tap
  - paragraph: Send a pre-filled invitation message with your referral tracking link directly to your college & WhatsApp groups.
  - button "Share on WhatsApp Now"
  - textbox: https://arzoncareers.in/career-engine/start?ref=ARZON-GIVE2K-ANANYA
  - button
  - text: Your Referred Candidates 3 Referred
  - paragraph: Rahul Deshmukh
  - paragraph: 22 Mar 2026
  - text: Enrolled
  - paragraph: +₹2000 Paid
  - paragraph: Kavita Rao
  - paragraph: 18 Mar 2026
  - text: Enrolled
  - paragraph: +₹2000 Paid
  - paragraph: Amit Kumar
  - paragraph: 15 Mar 2026
  - text: Assessment Completed
  - paragraph: They save
  - paragraph: ₹1,000
  - paragraph: off any tier at checkout
  - paragraph: You earn
  - paragraph: ₹3,000
  - paragraph: credited after they pay
  - paragraph: No cap
  - paragraph: Unlimited
  - paragraph: refer as many as you like
  - heading "How it works" [level=2]
  - list:
    - listitem: WhatsApp our counsellor your friend's name and number.
    - listitem:
      - text: We send them the
      - link "ACRI Readiness Preview":
        - /url: /career-engine
      - text: with your referral tag.
    - listitem: If they enrol in any tier, you receive ₹3,000 within 7 days.
  - link "Refer over WhatsApp":
    - /url: https://wa.me/919121283638?text=Hi%20Arzon%2C%20I%20want%20to%20refer%20a%20friend.%20Their%20name%20is%20___%20and%20their%20phone%20is%20___.
  - link "Or share the ACRI Preview link →":
    - /url: /career-engine
  - paragraph: Payouts are made via UPI to the referrer's verified number after the referred candidate's enrolment is confirmed and the cohort starts.
  - contentinfo:
    - paragraph: ONE YEAR FROM NOW…
    - heading "You can still be watching YouTube playlists and applying to black-hole job boards." [level=3]
    - paragraph: Or you can be preparing for interviews with recruiters who already know your verified assessment scorecard.
    - paragraph: Still deciding?
    - paragraph: Book a 15-minute eligibility review. No payment required. Just clarity.
    - link "Book 15-Min Eligibility Review":
      - /url: "#apply"
    - img "Arzon Global"
    - paragraph: ARZON
    - paragraph: GLOBAL
    - paragraph: India's EdTech career platform. Certified recruitment partner across Tier-1 Tech Enterprises & Quant Fintechs.
    - paragraph: "Hyderabad, India · Social: Instagram @arzon.global"
    - paragraph: PROGRAMMES
    - list:
      - listitem:
        - link "Tier-1 Enterprise AI/ML Cohort":
          - /url: /courses
      - listitem:
        - link "Quant Financial Engineering Track":
          - /url: /courses
      - listitem:
        - link "Clinical Healthcare Tracks":
          - /url: /courses
      - listitem:
        - link "Readiness Test":
          - /url: /career-engine/start
    - paragraph: PROOF & TRUST
    - list:
      - listitem:
        - link "Certificate Verifier (/verify)":
          - /url: /verify
      - listitem:
        - link "Methodology & Receipts":
          - /url: /why-arzon
      - listitem:
        - link "Refund & Trust Ledger":
          - /url: /refund
      - listitem:
        - link "System Changelog":
          - /url: /changelog
    - paragraph: LEGAL & CONTACT
    - list:
      - listitem:
        - link "Contact Us":
          - /url: /contact
      - listitem:
        - link "Privacy Policy":
          - /url: /legal/privacy
      - listitem:
        - link "Terms of Service":
          - /url: /legal/terms
      - listitem:
        - link "WhatsApp Support":
          - /url: https://wa.me/919121283638?text=Hi%20Arzon%20team%2C%20I%20would%20like%20guidance%20on%20my%20healthcare%20career%20options.
    - paragraph: "Arzon Global is a certified recruitment partner across Tier-1 Tech Enterprises & Quant Fintechs (VMO ID: ENT2026-GLOBAL-VMO026), effective July 2026. Recruitment partnership status means Arzon Global supports talent acquisition through candidate sourcing, screening, and presentation. All hiring decisions are at the sole discretion of partner employer teams. No placement guarantee is implied by recruitment partner status. Programme fees and refund policy are published in the public trust ledger. ASCI guidelines apply to all marketing communications. ISO 9001:2015 certified. MSME UDYAM registered. MCA incorporated."
    - paragraph: © 2026 Arzon Global Labs. All rights reserved. Registered under Ministry of Corporate Affairs, Govt of India.
```