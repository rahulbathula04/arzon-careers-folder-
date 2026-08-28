# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - desktop (1440×900) >> GET /refund renders, no console errors, apply CTA visible
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
  - link "Back to home":
    - /url: /
  - paragraph: Policy · plain English
  - heading "Cancellation & enrolment policy" [level=1]
  - paragraph: We don't promise jobs - anyone who does is breaking ASCI guidelines. Here's how cancellation, seat fees, and cohort changes actually work, in plain English.
  - heading "The pre-registration seat fee (₹1,000)" [level=2]
  - paragraph: The pre-registration seat fee holds your spot in your selected cohort and allocates dedicated mentor capacity. Pre-registration deposits are non-refundable, but 100% of the ₹1,000 is credited directly against your total programme fee upon enrolment.
  - heading "The programme fee" [level=2]
  - paragraph: The full programme fee is due 3 days before your cohort starts via direct Razorpay payment. We do not offer consumer EMI financing; there are zero hidden loan traps or hidden add-ons.
  - paragraph: Once your cohort begins, any cancellation is settled per the terms in your signed enrolment agreement, based on weeks completed.
  - heading "If we cancel or move your cohort" [level=2]
  - paragraph: You can roll over to the next cohort at no extra cost, or request settlement of any amount you've paid. We confirm in writing within 5 working days.
  - heading "Placement support (Career & Elite plans)" [level=2]
  - paragraph: If you complete the programme with grade B+ and don't get a single verified interview within 90 days of your capstone, we extend placement support free for 6 more months.
  - paragraph: We don't promise jobs. We commit to live mentoring, graded real-data work, a verifiable certificate, and structured introductions to our 38+ hiring partners.
  - paragraph: All in writing
  - paragraph: Every statement on this page is reflected in your signed enrolment agreement. No verbal promises, no fine print surprises.
  - link "Start your application":
    - /url: /apply
  - link "See our public proof":
    - /url: /proof
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