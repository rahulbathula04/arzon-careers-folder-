# Visual Audit

## Fixed in this pass

- Hero: `industry ready` italic was rendering as translucent gradient (via-white/70) on dark navy → invisible "ready". Replaced with `.italic-accent` opaque white→sky→teal gradient.
- BentoProgrammes: "Not generic courses." accent + subtitle strongs forced to white; tone-dark cascade now also covers `<p>`, `<li>`, `<strong>`.
- JDMirror: tone-dark body text bumped from 75% → 88% opacity for AA contrast on `#0a1430`.
- career-engine result/index: same translucent gradient → `.italic-accent`.
- Global: added `.italic-accent` token (works on both dark and light surfaces) so future headings never repeat the muted-italic bug.

## Verified visually

- `/` Hero, Programmes header, JD Mirror header subtitle, HowItWorks subtitle.
