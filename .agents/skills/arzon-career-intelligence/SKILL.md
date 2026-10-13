---
name: arzon-career-intelligence
description: >
  Defines and enforces the official Arzon Global Healthcare Careers Brand Guidelines
  (v1.0 • 2026), Career Intelligence architecture, typographic scale, component
  blueprints, and anti-generic UI/UX design doctrine across the entire application.
  Must be consulted whenever building, designing, or refactoring pages, landing flows,
  registration modules, or intelligence assets in the Arzon platform.
---

# Arzon Global · Healthcare Careers Brand & Design Guidelines (v1.0 • 2026)

This specification codifies the official Brand Guidelines (v1.0 • 2026), product architecture, design tokens, typography scales, component blueprints, and anti-generic UI/UX standards for all development across Arzon Global Healthcare Careers.

---

## 1. Brand Essence & Mission

### Core Purpose
**"Guiding healthcare talent to meaningful careers."**  
A clean, credible, and modern brand identity for healthcare career intelligence, skill development, and industry readiness.

### Target Audience
B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences graduates transitioning into clinical data careers:
- Pharmacovigilance & Drug Safety
- Clinical Data Management (CDM)
- Medical Coding & Clinical Informatics
- Regulatory Affairs
- Clinical SAS & Biostatistics

### What Arzon Global Is vs Is NOT
- **IS**: An authoritative Healthcare Career Intelligence & Role Readiness System. An institutional diagnostic and practical preparation platform providing verified proof of readiness.
- **IS NOT**: A course reseller, discount EdTech bootcamp, or generic marketing funnel.
- **IS NOT**: A generic AI-generated landing page with empty claims or unverified metrics.

---

## 2. Official Colour Palette (v1.0 • 2026)

Our colours reflect **trust, clarity, intelligence, and career growth**.

### Primary Brand Palette
| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Deep Navy** | `#081F38` | Primary headers, navigation, authoritative borders, dark banner background |
| **Arzon Blue** | `#2563EB` | Primary CTAs, active highlights, key links, active pill indicators |
| **Light Blue** | `#60A5FA` | Secondary accents, icons, subtle borders, progress highlights |
| **Mint** | `#E6F7F1` | Success backgrounds, positive state highlights, verified badges |
| **Off White** | `#F8FAFC` | Main canvas background, subtle section contrasts |

### Functional & Neutral Palette
| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Slate Gray** | `#64748B` | High-readability body copy, secondary subtitles, metadata |
| **Border Gray** | `#E2E8F0` | Structural dividers, card borders, module outlines |
| **Success** | `#10B981` | Positive progress bars, verified checkmarks, status tags |
| **Warning** | `#F59E0B` | Review star ratings, urgent notices, attention badges |
| **Error** | `#EF4444` | Form validation errors, critical alerts |
| **Pure White** | `#FFFFFF` | Card surfaces (`tone-light card-light`), modal surfaces |

---

## 3. Typography System & Type Scale

Clean, modern, and highly readable.  
**Primary Font Family**: `Inter` (sans-serif).  
*Display Serif* (`font-serif`) may be used selectively for prestige hero headlines to communicate editorial authority.

### Official Type Scale (v1.0 • 2026)
| Level | Size / Line-Height | Weight | Tailwind Equivalent | Role & Application |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | 56px / 64px | Bold (700) | `text-[2.75rem] sm:text-6xl font-bold leading-[1.08]` | Primary page headlines |
| **H2** | 40px / 48px | Bold (700) | `text-3xl sm:text-[40px] font-bold leading-tight` | Major section titles |
| **H3** | 28px / 36px | Semibold (600) | `text-xl sm:text-[28px] font-semibold leading-snug` | Card titles, module headers |
| **H4** | 20px / 28px | Semibold (600) | `text-base sm:text-xl font-semibold leading-snug` | Subsection titles, group headers |
| **Body**| 16px / 24px | Regular (400) | `text-base leading-relaxed text-[#64748B]` | Primary paragraph copy |
| **Small**| 14px / 20px | Regular (400) | `text-sm leading-normal text-[#64748B]` | Supporting text, card descriptions |
| **Caption**| 12px / 16px | Regular/Mono | `text-xs font-mono font-semibold` | Labels, badges, technical tags |

---

## 4. Button & Interaction Styles

Clear, consistent, and action-oriented. Never present conflicting primary buttons with equal weight.

```
[ PRIMARY BUTTON ]
bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full px-7 py-3.5 text-sm font-bold shadow-sm
Example: Find My Career Path →  |  Start Free Assessment →

[ SECONDARY BUTTON ]
border border-[#E2E8F0] bg-white tone-light card-light hover:bg-[#F8FAFC] text-[#081F38] rounded-full px-6 py-3.5 text-sm font-bold shadow-2xs
Example: Explore Programmes  |  Learn About ACRI →

[ TERTIARY BUTTON / ACTION LINK ]
text-[#2563EB] hover:text-[#081F38] text-xs sm:text-sm font-bold inline-flex items-center gap-1.5
Example: View details →  |  Explore full report →
```

### Button States
- **Default**: `#2563EB` solid fill or `#E2E8F0` border.
- **Hover**: Subtle darkening (`#1D4ED8` or `#F8FAFC`).
- **Pressed**: Active compression state (`scale-[0.99]`).
- **Disabled**: `#E2E8F0` bg with muted `#94A3B8` text, non-interactive.

---

## 5. Standard UI Component Library (Blueprints)

### Component 01: Programme Card Blueprint
Each role-focused track card follows a strict, reusable template:
- **Thumbnail**: 16:10 aspect ratio image of authentic healthcare/informatics environments.
- **Duration Badge**: Floating bottom-right chip (e.g. `12 Weeks` or `16 Weeks`).
- **Title**: Role-focused name (e.g. *Pharmacovigilance & Drug Safety*).
- **Summary**: Exactly 1-line practical outcome description.
- **Tool Chips**: 3 standardized tags (e.g. `Argus`, `MedDRA`, `WHO-UMC`).
- **Action**: Text link `View details →` + circular icon button with arrow.

### Component 02: Feature / Metric Card Blueprint
- Distinct icon in soft blue rounded square (`bg-[#EEF6FF] border border-[#D0E1FD] text-[#2563EB]`).
- Bold metric value (`2,000+` or `60+`).
- Concise label (`Job Descriptions Analysed`).
- Brief context sentence attributing source data.

### Component 03: Testimonial Card Blueprint
- Multi-source selector tabs: `All Sources`, `Google (4.5/5)`, `Justdial (4.4/5)`, `LinkedIn`, `Arzon Feedback`.
- Header: Platform label + authentic star rating or `Verified` pill.
- Body: Direct quote in quotation marks (italic).
- Author: Full name, qualification (e.g. *B.Pharm, 2024*), and avatar thumbnail.
- Trust requirement: Every testimonial must be traceable. Never synthesize fake reviews.

### Component 04: Data Visualisation Blueprints
- **Readiness Score Dial**: Radial SVG meter (e.g. `78% Good Fit for Pharmacovigilance` with `Recommended` pill) accompanied by 5 structured exploration links.
- **Skill Progress Bars**: Calibrated percentage bars with label and level (e.g., *Drug Safety Regulations 85%*, *Case Processing 70%*, *Signal Detection 60%*, *Medical Terminology 90%*).

---

## 6. Imagery & Iconography Guidelines

### Imagery Style
**"Real people. Real careers. Real outcomes."**
- Use real, credible healthcare, clinical trial, and laboratory environments.
- Show diversity and genuine clinical focus.
- Keep visuals clean, professional, and well-lit.
- **NEVER** use generic, floating 3D AI blobs, cartoonish avatars, or distorted stock figures.
- Give the subject space: Never obscure clinician faces or upper bodies with overlapping UI cards.

### Iconography Style
- Simple, consistent, and meaningful line icons from `lucide-react`.
- Enclosed in soft rounded containers (`rounded-2xl` or `rounded-full`) with `#EEF6FF` background and `#2563EB` foreground.

---

## 7. Tone of Voice

- **Professional**: Backed by real market data and verified industry knowledge.
- **Supportive**: We guide learners constructively at every stage of their career transition.
- **Clear**: Simple, accessible, precise terminology without marketing jargon or hype.
- **Confident**: Focused on verifiable career outcomes, clinical proof, and tangible deliverables.

---

## 8. Brand Do's and Don'ts

### DO:
1. **Maintain consistent colours and typography**: Adhere strictly to the Deep Navy (`#081F38`), Arzon Blue (`#2563EB`), and Inter scale.
2. **Use real and relevant healthcare imagery**: Authentic clinical workstations, real students, and professional environments.
3. **Keep messaging clear and benefit-focused**: Every section must answer "How does this help my career transition?".
4. **Show accurate data with sources**: Label sample data clearly and provide sample sizes for JD research (e.g. *120+ JDs analysed*).
5. **Use inclusive and diverse representations**: Reflect the authentic community of life sciences and pharmacy graduates.
6. **Maintain clean, uncluttered layouts**: Give content room to breathe with generous whitespace and clear visual hierarchies.

### DON'T:
1. **Don't use generic or low-quality images**: No fake stock doctors with glowing stethoscope cliparts.
2. **Don't overcrowd sections with text**: Break complex curriculums into clear, bite-sized comparative cards.
3. **Don't use multiple conflicting fonts**: Never mix random Google fonts on the same page.
4. **Don't make unverified claims**: Never claim 100% placement guarantees or exaggerated salaries.
5. **Don't use inconsistent colours or button styles**: Do not stack competing primary buttons with random colors.
6. **Don't imply partnerships where none exist**: Always include research attribution disclaimers when showing employer hiring signals.

---

## 9. Repository Guardrail Checklist

Before committing or approving any page or component:
- [ ] **Surface Token Guard**: Every `bg-white` container in marketing surfaces includes `tone-light card-light`.
- [ ] **Motion Safety**: Every `animate-*` class is guarded with `motion-safe:` (e.g. `motion-safe:animate-pulse`).
- [ ] **WCAG AA Contrast**: All body text on light backgrounds maintains at least 4.5:1 contrast; large titles at least 3.0:1.
- [ ] **Token Alignment**: Primary colors adhere to `#081F38` (Deep Navy) and `#2563EB` (Arzon Blue).
- [ ] **Sitemap Parity**: Every indexable public route exists in `src/routes/sitemap[.]xml.ts`.
- [ ] **CI Pass**: `npm run prebuild:dev` exits 0 with all 26 checks passing.
