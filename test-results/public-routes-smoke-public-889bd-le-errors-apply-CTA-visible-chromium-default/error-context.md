# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - desktop (1440×900) >> GET /jd-mirror renders, no console errors, apply CTA visible
- Location: tests\e2e\public-routes-smoke.spec.ts:110:5

# Error details

```
Test timeout of 30000ms exceeded.
```

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
  - text: ⚡ Instant AI JD Matcher Employers & Recruiters
  - heading "Paste your raw Job Description" [level=2]
  - paragraph: Our AI parses your requirements, maps them to ACRI evaluation dimensions, and matches pre-verified candidates from the Arzon talent pool.
  - textbox "Paste job description requirements here (e.g. Looking for a Medical Coder proficient in ICD-10-CM, CPT, and EHR audit procedures)..."
  - button "Analyze & Match Candidates →" [disabled]
  - text: THE JD MIRROR · LIVE CREDIBILITY
  - heading "\" The exact lines from real Indian JDs and the module we built to train for each one. \"" [level=2]
  - paragraph: Recruiters write JDs in a very specific language. We read thousands of them, extract what actually repeats, and turn each recurring requirement into a graded week of training with a real deliverable. Nothing in our syllabus is academic filler.
  - article:
    - text: TRACK 84% match
    - heading "Drug Safety Associate" [level=3]
    - text: 💊 1,247 JDs • Hyderabad · Bengaluru
    - list:
      - listitem:
        - paragraph: "\"End-to-end ICSR case processing\""
        - text: 91%
      - listitem:
        - paragraph: "\"MedDRA + WHO-DD coding proficiency\""
        - text: 84%
      - listitem:
        - paragraph: "\"Hands-on Argus Safety / ArisG\""
        - text: 78%
    - strong: "Updated May 2026:"
    - text: Added a MedDRA v27 drill - most current PV JDs now expect it.
    - link "Explore track":
      - /url: /courses/pharmacovigilance
  - article:
    - text: TRACK 84% match
    - heading "Medical Coder (Fresher)" [level=3]
    - text: 🩺 1,893 JDs • Chennai · Hyderabad
    - list:
      - listitem:
        - paragraph: "\"ICD-10-CM proficiency to AAPC standard\""
        - text: 94%
      - listitem:
        - paragraph: "\"CPT, HCPCS and E/M leveling\""
        - text: 88%
      - listitem:
        - paragraph: "\"HIPAA, NCCI and payer-side awareness\""
        - text: 71%
    - strong: "Updated May 2026:"
    - text: Doubled E/M leveling practice - current Optum and Omega JDs lead with it.
    - link "Explore track":
      - /url: /courses/medical-coding
  - article:
    - text: TRACK 80% match
    - heading "Clinical Data Associate" [level=3]
    - text: 📊 684 JDs • Bengaluru · Hyderabad
    - list:
      - listitem:
        - paragraph: "\"Hands-on EDC (Medidata Rave / Veeva)\""
        - text: 86%
      - listitem:
        - paragraph: "\"CDASH-aligned CRF design\""
        - text: 73%
      - listitem:
        - paragraph: "\"Query management & data cleaning\""
        - text: 82%
    - strong: "Updated May 2026:"
    - text: Added Veeva CDMS coverage alongside Rave - Veeva is showing up more in CDM JDs.
    - link "Explore track":
      - /url: /courses/clinical-data-management
  - article:
    - text: TRACK 84% match
    - heading "Clinical SAS Programmer" [level=3]
    - text: 💻 512 JDs • Bengaluru · Hyderabad
    - list:
      - listitem:
        - paragraph: "\"Strong Base SAS programming\""
        - text: 97%
      - listitem:
        - paragraph: "\"SDTM mapping per CDISC IG\""
        - text: 81%
      - listitem:
        - paragraph: "\"ADaM creation with traceability\""
        - text: 74%
    - strong: "Updated May 2026:"
    - text: Added a full Pinnacle 21 pass in the capstone - sponsors now expect it.
    - link "Explore track":
      - /url: /courses/sas-clinical
  - article:
    - text: TRACK 74% match
    - heading "Regulatory Affairs Associate" [level=3]
    - text: 📋 437 JDs • Hyderabad · Mumbai
    - list:
      - listitem:
        - paragraph: "\"Working knowledge of eCTD structure\""
        - text: 88%
      - listitem:
        - paragraph: "\"ANDA / NDA / MAA familiarity\""
        - text: 71%
      - listitem:
        - paragraph: "\"Labeling & artwork QC\""
        - text: 63%
    - strong: "Updated May 2026:"
    - text: Added a Veeva Vault RIM walkthrough - it is the publishing platform most current RA JDs mention.
    - link "Explore track":
      - /url: /courses/regulatory-affairs
  - article:
    - text: TRACK 76% match
    - heading "Medical Writer (Associate)" [level=3]
    - text: ✍️ 421 JDs • Bengaluru · Hyderabad
    - list:
      - listitem:
        - paragraph: "\"Clinical Study Reports (CSR) per ICH E3\""
        - text: 83%
      - listitem:
        - paragraph: "\"Protocols, IBs and patient narratives\""
        - text: 78%
      - listitem:
        - paragraph: "\"Regulatory writing for eCTD modules\""
        - text: 66%
    - strong: "Updated May 2026:"
    - text: Added AI-assist guardrails - JDs now ask for prompt-edit-verify workflows.
    - link "Explore track":
      - /url: /courses/medical-writing
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