# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /moments renders, no console errors, nav visible
- Location: tests\e2e\public-routes-smoke.spec.ts:86:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.evaluate: Target page, context or browser has been closed
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to main content" [ref=e3] [cursor=pointer]:
    - /url: "#app-scroll-root"
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - link "Arzon Global - go to home" [ref=e7] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]: ARZON
        - link "Apply Now" [ref=e12] [cursor=pointer]:
          - /url: https://forms.gle/kfB8iDEHtcBhBUrC9
          - generic [ref=e13]: Apply Now
          - img [ref=e14]
    - generic [ref=e19]:
      - banner [ref=e20]:
        - generic [ref=e21]:
          - paragraph [ref=e22]:
            - img [ref=e23]
            - text: Arzon Moments
          - heading "Our story, told in photos." [level=1] [ref=e26]
          - paragraph [ref=e27]: Every launch, every guest, every campus visit. We publish the ceremony, not just the logo. Each story can hold up to 10 photos.
      - main [ref=e28]:
        - status [ref=e29]:
          - img [ref=e31]
          - generic [ref=e34]: Thinking through moments…
      - contentinfo [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]:
            - generic [ref=e38]:
              - paragraph [ref=e39]: ONE YEAR FROM NOW…
              - heading "You can still be watching YouTube playlists and applying to black-hole job boards." [level=3] [ref=e40]
              - paragraph [ref=e41]: Or you can be preparing for interviews with recruiters who already know your verified assessment scorecard.
            - generic [ref=e42]:
              - generic [ref=e43]:
                - paragraph [ref=e44]: Still deciding?
                - paragraph [ref=e45]: Book a 15-minute eligibility review. No payment required. Just clarity.
              - link "Book 15-Min Eligibility Review" [ref=e46] [cursor=pointer]:
                - /url: "#apply"
          - generic [ref=e47]:
            - generic [ref=e48]:
              - generic [ref=e49]:
                - img "Arzon Global" [ref=e51]
                - generic [ref=e52]:
                  - paragraph [ref=e53]: ARZON
                  - paragraph [ref=e54]: GLOBAL
              - paragraph [ref=e55]: India's EdTech career platform. Certified recruitment partner across Tier-1 Tech Enterprises & Quant Fintechs.
              - paragraph [ref=e56]: "Hyderabad, India · Social: Instagram @arzon.global"
            - generic [ref=e57]:
              - paragraph [ref=e58]: PROGRAMMES
              - list [ref=e59]:
                - listitem [ref=e60]:
                  - link "Tier-1 Enterprise AI/ML Cohort" [ref=e61] [cursor=pointer]:
                    - /url: /courses
                - listitem [ref=e62]:
                  - link "Quant Financial Engineering Track" [ref=e63] [cursor=pointer]:
                    - /url: /courses
                - listitem [ref=e64]:
                  - link "Clinical Healthcare Tracks" [ref=e65] [cursor=pointer]:
                    - /url: /courses
                - listitem [ref=e66]:
                  - link "Readiness Test" [ref=e67] [cursor=pointer]:
                    - /url: /career-engine/start
            - generic [ref=e68]:
              - paragraph [ref=e69]: PROOF & TRUST
              - list [ref=e70]:
                - listitem [ref=e71]:
                  - link "Certificate Verifier (/verify)" [ref=e72] [cursor=pointer]:
                    - /url: /verify
                - listitem [ref=e73]:
                  - link "Methodology & Receipts" [ref=e74] [cursor=pointer]:
                    - /url: /why-arzon
                - listitem [ref=e75]:
                  - link "Refund & Trust Ledger" [ref=e76] [cursor=pointer]:
                    - /url: /refund
                - listitem [ref=e77]:
                  - link "System Changelog" [ref=e78] [cursor=pointer]:
                    - /url: /changelog
            - generic [ref=e79]:
              - paragraph [ref=e80]: LEGAL & CONTACT
              - list [ref=e81]:
                - listitem [ref=e82]:
                  - link "Contact Us" [ref=e83] [cursor=pointer]:
                    - /url: /contact
                - listitem [ref=e84]:
                  - link "Privacy Policy" [ref=e85] [cursor=pointer]:
                    - /url: /legal/privacy
                - listitem [ref=e86]:
                  - link "Terms of Service" [ref=e87] [cursor=pointer]:
                    - /url: /legal/terms
                - listitem [ref=e88]:
                  - link "WhatsApp Support" [ref=e89] [cursor=pointer]:
                    - /url: https://wa.me/919121283638?text=Hi%20Arzon%20team%2C%20I%20would%20like%20guidance%20on%20my%20healthcare%20career%20options.
          - generic [ref=e90]:
            - paragraph [ref=e91]: "Arzon Global is a certified recruitment partner across Tier-1 Tech Enterprises & Quant Fintechs (VMO ID: ENT2026-GLOBAL-VMO026), effective July 2026. Recruitment partnership status means Arzon Global supports talent acquisition through candidate sourcing, screening, and presentation. All hiring decisions are at the sole discretion of partner employer teams. No placement guarantee is implied by recruitment partner status. Programme fees and refund policy are published in the public trust ledger. ASCI guidelines apply to all marketing communications. ISO 9001:2015 certified. MSME UDYAM registered. MCA incorporated."
            - paragraph [ref=e92]: © 2026 Arzon Global Labs. All rights reserved. Registered under Ministry of Corporate Affairs, Govt of India.
```