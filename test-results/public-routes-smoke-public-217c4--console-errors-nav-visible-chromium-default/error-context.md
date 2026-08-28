# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /tpos renders, no console errors, nav visible
- Location: tests\e2e\public-routes-smoke.spec.ts:86:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-menu-button')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('nav-menu-button')

```

```yaml
- link "Skip to main content":
  - /url: "#app-scroll-root"
- banner:
  - link "Arzon Global - go to home":
    - /url: /
    - paragraph: ARZON
  - link "Apply Now":
    - /url: https://forms.gle/kfB8iDEHtcBhBUrC9
- main:
  - paragraph: For training & placement officers
  - heading "What your batch gets, in writing. Updated live." [level=1]
  - paragraph: "A placement officer sending 60 students has asymmetric risk: one bad cohort and it's the principal's office. This page is built to remove that risk - registrations, complaints log, assessment methodology, and the partnerships counsellor's three contact lanes, all on one screen."
  - paragraph: Live · founding cohort
  - heading "What we publish, not what we claim" [level=2]
  - paragraph: We are at the start of our public dataset. The numbers below are written to the public ledger as they happen - no curation, no deleted rows. As cohorts run, this strip becomes per-college on request.
  - paragraph: "0"
  - paragraph: Ledger entries
  - paragraph: all-time
  - paragraph: "0"
  - paragraph: Placements logged
  - paragraph: with employer reference
  - paragraph: 0 / 0
  - paragraph: Complaints resolved
  - paragraph: open + closed
  - paragraph: "0"
  - paragraph: Open incidents
  - paragraph: audit-grade
  - strong: "Honest note for placement officers:"
  - text: we deliberately do not quote a placement percentage until the dataset is large enough to be stable across batches. The live ledger above is what we have today. When you partner with us, your batch outcomes are added to it - visible to your principal and to recruiters, same URL.
  - link "Open the public ledger":
    - /url: /trust-report
  - link "Cancellation policy":
    - /url: /refund
  - paragraph: The one-pager
  - heading "Get the briefing pack in your inbox" [level=2]
  - paragraph: "A 1-page PDF: ACRI methodology, batch outcome reporting cadence, and your counsellor next steps. We send the link to your work email."
  - paragraph: Request the partner briefing pack
  - heading "We email it to your work address" [level=3]
  - text: Your name
  - textbox "Your name"
  - text: College / institution
  - textbox "College / institution"
  - text: Work email
  - textbox "Work email"
  - text: Your role (optional)
  - textbox "Your role (optional)"
  - text: Graduating batch year
  - textbox "Graduating batch year"
  - text: Primary domain (e.g. CR, PV)
  - textbox "Primary domain (e.g. CR, PV)"
  - checkbox "I agree to be contacted by an Arzon counsellor about this request. We won't add you to any marketing list."
  - text: I agree to be contacted by an Arzon counsellor about this request. We won't add you to any marketing list.
  - button "Send me the pack"
  - paragraph: We use your email only to send the pack and have a counsellor follow up. No marketing list.
  - paragraph: Assessment methodology
  - heading "ACRI - published, not proprietary" [level=2]
  - paragraph: The Career Engine score uses a public 5-dimension rubric. Recruiters and TPOs can audit the same matrix the result page uses.
  - heading "ACRI in 1 minute" [level=3]
  - paragraph: 5 dimensions, 13 traits, 40 questions. The trait → dimension matrix is the actual code, not a marketing diagram.
  - heading "What each band means" [level=3]
  - paragraph: Industry-ready (≥70), Developing (45–69), Foundation (<45). Bands map to cohort-entry guidance, not pass/fail.
  - heading "What we DON'T claim" [level=3]
  - paragraph: Not yet ASSAY-validated. Reliability (Cronbach α) will be published once N ≥ 500 completions. We say so on the page.
  - link "Read the full ACRI methodology page":
    - /url: /acri
  - paragraph: TASK · Govt of Telangana · 30 July 2025
  - paragraph: TASK officials joined as chief guests at our public launch.
  - list:
    - listitem:
      - link "ISO 9001":
        - /url: /proof#iso
    - listitem:
      - link "MCA":
        - /url: /proof#mca
    - listitem:
      - link "MSME":
        - /url: /proof#msme
  - link "Apply now":
    - /url: /apply
  - paragraph: Partnerships
  - heading "Three lanes to the same person" [level=2]
  - paragraph: "Call, WhatsApp or email - same partnerships counsellor answers all three. Average response: under 4 working hours."
  - paragraph: Three lanes to the partnerships team
  - heading "Same person, three ways to reach" [level=3]
  - link "Call partnerships +91 91212 83638":
    - /url: tel:+919121283638
    - paragraph: Call partnerships
    - paragraph: +91 91212 83638
  - link "WhatsApp partnerships Pre-filled TPO context, no script needed":
    - /url: https://wa.me/919121283638?text=Hi%2C%20I'm%20a%20TPO%20%2F%20placement%20officer%20enquiring%20about%20an%20Arzon%20Careers%20partner%20briefing%20for%20my%20college.
    - paragraph: WhatsApp partnerships
    - paragraph: Pre-filled TPO context, no script needed
  - link "Email partnerships info@arzonglobal.com":
    - /url: mailto:info@arzonglobal.com?subject=TPO%20partnership%20enquiry
    - paragraph: Email partnerships
    - paragraph: info@arzonglobal.com
  - paragraph: "Same counsellor answers all three. Average response: under 4 working hours."
  - paragraph:
    - text: Need the partner briefing pack? Ask on any lane - we send a same-day deck tailored to your batch size + course mix.
    - link "See why other colleges trust us first →":
      - /url: /credibility
  - paragraph: Or have us call you back
  - heading "Within 24 hours, partnerships lead" [level=3]
  - form:
    - text: Your name
    - textbox "Your name"
    - text: Phone or email
    - textbox "Phone or email"
    - button "Request callback"
    - paragraph: By submitting, you agree to be contacted by an Arzon counsellor. No spam.
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