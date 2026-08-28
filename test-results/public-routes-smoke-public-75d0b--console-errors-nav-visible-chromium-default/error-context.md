# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /about renders, no console errors, nav visible
- Location: tests\e2e\public-routes-smoke.spec.ts:86:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-menu-button')
Expected: visible
Timeout: 5000ms
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
  - paragraph: About us
  - heading "Built for students who'd rather ship than scroll." [level=1]
  - paragraph: Arzon Global is an India-based project-first internship academy. We run 12-week cohorts in healthcare, tech and commerce, taught by mentors who actually work in the industry, on real client briefs and real data.
  - paragraph: TASK Alignment · 30 Jul 2025
  - paragraph: Telangana Academy for Skill & Knowledge (Dept of ITE&C) officials attended our public launch.
  - paragraph: ISO 9001:2015
  - paragraph: Independently audited quality management framework for candidate preparation.
  - paragraph: MCA Corporate ID
  - paragraph: Legally incorporated under the Ministry of Corporate Affairs (MCA).
  - paragraph: MSME UDYAM & Open Ledger
  - paragraph: Government of India MSME registration with an open-ledger independently verifiable system.
  - heading "Leadership & Vision" [level=2]
  - paragraph: Founded by industry practitioners on a mission to build transparent employability infrastructure for India.
  - text: M
  - heading "Manideep" [level=3]
  - paragraph: Co-Founder & CEO
  - paragraph: Leads institutional expansion, corporate partnerships, and overall strategy across Arzon Global's workforce readiness initiatives.
  - text: S
  - heading "Shashank" [level=3]
  - paragraph: Co-Founder & CSO
  - paragraph: Drives strategic recruiter alignment, candidate readiness frameworks, and the proprietary ASSAY assessment engine.
  - heading "The ASSAY Verification Engine" [level=2]
  - paragraph:
    - text: At the heart of Arzon Careers is
    - strong: ASSAY (Arzon Science and Skill Assessment for Industry Readiness)
    - text: ", our proprietary evaluation instrument."
  - paragraph: "Rather than relying on self-reported résumés or basic certificates, ASSAY tests candidates across five core operational dimensions: Operational Reasoning, Communication, Documentation, Workflow Thinking, and Domain Awareness."
  - heading "Why we exist" [level=2]
  - paragraph: Most "internships" sold to Indian students are recorded videos in a trench coat. We watched the same students get burned twice, by big-brand institutes that promise placement and deliver PDFs.
  - paragraph: "We started Arzon Global to build the opposite: small cohorts, mentors who ship for a living, real client data, and a certificate that resolves to a public verifier, not a JPEG that can be Photoshopped."
  - paragraph: "Our offer is simple: do the work, show the work, get hired on evidence rather than pedigree."
  - heading "What we don't do" [level=2]
  - list:
    - listitem: · Promise jobs. Against ASCI. Against our values.
    - listitem: · Inflate numbers. We publish the denominator.
    - listitem: · Sell your data.
    - listitem: · Run fake countdown timers or artificial scarcity copy.
  - link "Start your application":
    - /url: /apply
  - link "See the proof vault":
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