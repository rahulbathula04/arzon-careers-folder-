# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /build renders, no console errors, nav visible
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
    - main [ref=e19]:
      - generic [ref=e21]:
        - generic [ref=e22]:
          - paragraph [ref=e24]: The Arzon build pipeline
          - heading "We build workforce infrastructure where verified demand exists." [level=2] [ref=e26]
          - paragraph [ref=e27]:
            - text: "Every track here passed through the same three stages:"
            - strong [ref=e28]: demand forming → under build → live
            - text: . Public timelines, named mentors, dated milestones. No vapourware.
        - generic [ref=e29]:
          - tablist "Pipeline stage" [ref=e30]:
            - tab "Demand forming 0" [ref=e31]:
              - img [ref=e32]
              - text: Demand forming
              - generic [ref=e37]: "0"
            - tab "Under build 0" [selected] [ref=e38]:
              - img [ref=e39]
              - text: Under build
              - generic [ref=e43]: "0"
            - tab "Live tracks 0" [ref=e44]:
              - img [ref=e45]
              - text: Live tracks
              - generic [ref=e48]: "0"
          - paragraph [ref=e49]: Curriculum, mentors, assessments and internships shipping in public.
        - generic [ref=e54]:
          - paragraph [ref=e55]: Don’t see your role?
          - heading "Request a track. If 25 verified peers want the same thing, we build it." [level=3] [ref=e56]
          - link "Request a track" [ref=e57] [cursor=pointer]:
            - /url: /build/request
            - text: Request a track
            - img [ref=e58]
```