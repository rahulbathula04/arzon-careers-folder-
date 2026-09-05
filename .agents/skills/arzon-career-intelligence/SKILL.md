---
name: arzon-career-intelligence
description: >
  Defines and enforces the Arzon Global Brand Doctrine, Healthcare Career Intelligence
  architecture, and anti-generic UI/UX design system across the entire application.
  Must be consulted whenever building, designing, or refactoring pages, landing flows,
  registration modules, or intelligence assets in the Arzon platform.
---

# Arzon Global · Healthcare Career Intelligence Brand & Design Doctrine

This skill codifies the first principles, product architecture, typographic system, visual standards, and anti-patterns for all software development across Arzon Global.

---

## 1. Core Brand Positioning: The Career Intelligence Paradigm

### What Arzon Global Is
- **An Executive Healthcare Career Intelligence & Role Readiness System**.
- A high-trust, authoritative institutional platform guiding B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences graduates into clinical data careers (Pharmacovigilance, Clinical Data Management, Medical Coding, Regulatory Affairs).

### What Arzon Global Is NOT
- **NOT** an online "course reseller", "EdTech training boot-camp", or "webinar marketing funnel".
- **NOT** a generic AI SaaS product.
- **NOT** a checkout confirmation machine.

### The Unified Product Funnel
Every user touchpoint belongs to a connected intelligence layer:

```
[ Outreach & Ads ]  → "What does a PV Associate actually do? See the live case."
       ↓
[ Workshop ]        → Operational Preview: "See the actual work and tools."
       ↓
[ Field Guide ]     → Intelligence Layer: "Salary bands, CRO employer map, tool cheat sheets."
       ↓
[ Career Engine ]   → Diagnostic Layer: "Identify personal role fit, aptitude & skill gaps."
       ↓
[ Cohort Program ]  → Skill-Building Layer: "Industry-standard Argus / MedDRA mastery."
       ↓
[ Internship ]      → Proof-of-Work Layer: "Verified case files for recruitment proof."
```

---

## 2. Visual & Editorial Anti-Generic Doctrine

### Prohibited Patterns (Strictly Forbidden)
1. **Generic AI SaaS Aesthetic**:
   - Centered white rounded box floating isolated in an empty white vacuum.
   - Giant green circular checkmarks (`w-16 h-16` / `text-emerald-500`).
   - "Congratulations! You're all set!" and hyperbolic exclamation marks.
2. **"Free Bonus" Marketing Tropes**:
   - `FREE BONUS` or `BONUS PDF` badges that evoke low-grade infomercials.
   - Fake 3D floating ebook mockups or gradient blobs.
3. **Clashing Primary Button Stacks**:
   - Stacking bright blue (`bg-blue-600`), bright green (`bg-emerald-600`), and white buttons together with equal visual weight.
4. **Developer/Admin Artifacts**:
   - Large text inputs displaying raw meeting URLs (`https://meet.google.com/xyz...`) with copy buttons that look like API key fields.
5. **Aesthetic Trends to Avoid**:
   - Cyberpunk, neon AI, heavy glassmorphism, animated multi-color gradients, and 3D floating elements.

### Mandated Aesthetic: Editorial Healthcare Intelligence
The interface must feel like an **authoritative research publication + professional operational ledger + modern digital product**.

- **Exposed Structure**: Hairline grid dividers (`border-stone-200`, `border-stone-300`).
- **Precision Typography**: Display serif for prestige headings, modern sans for clarity, uppercase monospace strictly for technical metadata.
- **Intentional Asymmetry**: Structured intelligence panels, dossier document formats.
- **Immediate Value Principle**: The second a user submits contact details, the system must immediately repay that trust with tangible intelligence before event logistics.

---

## 3. Design System & Palette Tokens

### Color Matrix
| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| **Arzon Ink** | `#0B1325` | Primary buttons, dominant headlines, authoritative borders |
| **Warm Paper** | `#FAF9F6` | Primary background, dossier card surfaces |
| **Technical Navy**| `#1B3F8B` | Section eyebrows, active link accents, subtle focus rings |
| **Neutral Slate** | `text-stone-700 / 600` | High-contrast readable body text, specifications |
| **Muted Stone** | `border-stone-200 / 300`| Hairline structural rules and module outlines |
| **Restrained Emerald**| `bg-emerald-50 text-emerald-800` | Subtle status indicators (`● ACCESS CONFIRMED`) |

### Typography Hierarchy
```tsx
// 1. Display Editorial Headlines (Prestige, Authority)
<h1 className="font-serif font-bold text-stone-900 tracking-tight">...</h1>

// 2. Technical Metadata & Dossier Identifiers (Uppercase Mono)
<span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">...</span>

// 3. High-Readability Body & Insights (Clean Modern Sans)
<p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">...</p>
```

---

## 4. Button & Interaction Hierarchy

Never present competing primary actions. Maintain a strict 3-tier hierarchy:

```
[ TIER 1: PRIMARY CTA ]
bg-[#0B1325] text-white hover:bg-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider
Example: OPEN FIELD GUIDE →

[ TIER 2: SECONDARY CTA ]
border border-stone-300 bg-white hover:bg-stone-100 text-stone-900 font-mono text-xs font-semibold uppercase tracking-wider
Example: DOWNLOAD PDF ↓  or  JOIN GOOGLE MEET →

[ TIER 3: TERTIARY UTILITY ]
text-stone-700 font-mono text-[11px] font-medium hover:text-stone-900 border border-stone-200 bg-white
Example: Connect WhatsApp  |  Add to Calendar  |  Copy Link
```

---

## 5. Post-Registration Confirmation Specification

Every post-signup or confirmation screen must adhere to the 5-Zone Architecture:

```
ZONE 01 · CONFIRMED
  ● ACCESS CONFIRMED (pulsing emerald indicator dot)
  # You're in.
  Your workshop seat is reserved.

ZONE 02 · CAREER FIELD GUIDE (THE HERO DOSSIER)
  ARZON GLOBAL · CAREER INTELLIGENCE DOSSIER · 2026 EDITION
  CAREER MAP · EMPLOYERS · FRESHER PAY · SKILLS · TOOLS · CAREER GROWTH
  [ OPEN FIELD GUIDE → ] (Primary)
  [ DOWNLOAD PDF ↓ ] (Secondary)

ZONE 03 · WORKSHOP ACCESS RECORD
  WORKSHOP ACCESS · Pharmacovigilance Career Working Session
  Sunday, 06 Sep · 18:00 IST · 75 Min · Kumail Raza · Ex-Cognizant
  [ JOIN GOOGLE MEET → ] (Secondary)
  [ Copy link ] (Tertiary)

ZONE 04 · NEXT STEPS
  01 Read the Career Field Guide
  02 Join the live workshop
  03 Bring your career questions

ZONE 05 · QUIET OPERATIONS & UTILITIES
  WORKSHOP UPDATES ON WHATSAPP: [ Connect WhatsApp ]
  CALENDAR SYNC: [ Add to Calendar ]
```

---

## 6. Repository Guardrail Checklist

Before committing any UI change, verify:
- [ ] **Motion Safety**: Every `animate-*` class is guarded with `motion-safe:` (e.g. `motion-safe:animate-pulse`).
- [ ] **Surface Tokens**: Every `bg-white` card in marketing routes includes `tone-light` or `card-light` in its `className`.
- [ ] **WCAG AA Contrast**: All text meets or exceeds 4.5:1 (large text 3:1).
- [ ] **No Raw Unregistered Palette**: Synchronize via `node scripts/check-no-raw-palette.mjs --update-baseline` if semantic tokens are expanded.
- [ ] **Sitemap Parity**: Every indexable public route exists in `src/routes/sitemap[.]xml.ts`.
- [ ] **CI Pass**: `npm run prebuild:dev` exits 0.
