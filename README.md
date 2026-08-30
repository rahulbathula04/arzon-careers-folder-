<div align="center">

# 🏛️ Arzon Global
### Next-Generation Workforce Intelligence & Healthcare Career Acceleration Platform

[![CI Pipeline](https://img.shields.io/github/actions/workflow/status/rahulbathula04/arzon-careers-folder-/ci.yml?branch=main&label=CI%20Pipeline&logo=github&style=flat-square)](https://github.com/rahulbathula04/arzon-careers-folder-/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start%20Fullstack-FF4154?logo=react&logoColor=white&style=flat-square)](https://tanstack.com/start)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%203.4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?logo=supabase&logoColor=white&style=flat-square)](https://supabase.com/)
[![WCAG AA](https://img.shields.io/badge/A11y-WCAG%20AA%20Compliant-10B981?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License](https://img.shields.io/badge/License-Proprietary-stone?style=flat-square)](#license)

<br />

<p align="center">
  <strong>Enterprise Workforce Readiness Engine · 300+ JD Research Intelligence · Cryptographic Verification · Real-Time Salary Benchmarking</strong>
</p>

[Explore Platform](https://arzonglobal.com) · [Healthcare Workshop](https://arzonglobal.com/healthcare-career-workshop) · [Career Engine](https://arzonglobal.com/career-engine/start) · [Public Verifier](https://arzonglobal.com/verify)

</div>

---

## 📖 Executive Summary

**Arzon Global** is India's leading enterprise tech and life-sciences career acceleration platform. We bridge the structural gap between university curricula and the operational requirements of Tier-1 Global Capability Centers (GCCs), Pharma Multinationals, CROs, and Quant Financial Enterprises.

Rather than generic video lectures, Arzon combines **empirical job description analysis (300+ JDs decoded)**, **enterprise software tool validation (Oracle Argus Safety, MedDRA, Medidata RAVE, SAS, ICD-10-CM)**, and **cryptographic skill verification** to prepare candidates for immediate day-one deployment.

---

## 🏛️ System Architecture

```mermaid
graph TD
    User([Candidate / Graduate]) --> CDN[Edge Routing & SSR: Nitro / TanStack Start]
    
    subgraph Frontend Core [TanStack Start + React 19 + Tailwind]
        LP[Editorial Marketing & Workshop LP]
        CE[Career Fit Engine & Diagnostic Assessment]
        VR[Public Cryptographic Verifier & Audit Ledger]
        DASH[Learner & Recruiter Terminal]
    end
    
    CDN --> Frontend Core
    
    subgraph Data & Security Layer [Supabase + Edge Functions]
        S_AUTH[Supabase Row-Level Security / Auth]
        S_DB[(PostgreSQL Database)]
        S_KV[(Upstash Redis Rate Limiting & Cache)]
    end
    
    Frontend Core --> S_AUTH
    S_AUTH --> S_DB
    Frontend Core --> S_KV
    
    subgraph External Enterprise Integrations
        RZP[Razorpay Webhook & Payment Engine]
        WA[WhatsApp Community & Automated Notifications]
        GSC[Search Console & SEO Telemetry]
    end
    
    Frontend Core --> RZP
    Frontend Core --> WA
    Frontend Core --> GSC
```

---

## ✨ Core Product Modules

| Module | Route | Key Capabilities |
|:---|:---|:---|
| **Workforce Intelligence Workshop** | `/healthcare-career-workshop` | 300+ JD Research Terminal, ATS Resume Diagnostic X-Ray, 5-Year Salary Simulator, 4-step onboarding. |
| **Career Fit Engine (ACRI)** | `/career-engine/start` | 90-second AI diagnostic assessment calculating candidate percentile match across 6 tracks. |
| **Public Verifier Ledger** | `/verify` | SHA-256 cryptographic verification of candidate certificates, ISO accreditation, and skill audit trails. |
| **Pharmacovigilance Track** | `/pv-associate` | In-depth ICSR triage, Oracle Argus Safety workflows, and MedDRA dictionary training specifications. |
| **Institutional Proof Hub** | `/why-arzon` | 14+ Tier-1 hiring GCC case studies, salary distributions, and audited placement track record. |
| **Recruiter Intelligence Portal** | `/recruiters` | Candidate dossier reviews, work sample code audits, and candidate skill rubrics. |

---

## 🛡️ Automated Quality, Security & A11y Suite (25 CI Gates)

Every pull request and commit must pass 25 rigorous automated verification gates before deployment:

```bash
npm run prebuild:dev
```

- ✅ **Reduced Motion Accessibility**: 15/15 rules satisfied (`hook/use-counter`, `hook/use-tilt`, `setInterval` gates, `motion-safe:` tokens).
- ✅ **WCAG AA Contrast Audit**: 30 high-contrast color token pair verifications across light and dark shells.
- ✅ **Row Level Security (RLS)**: Scans 121 database migrations to prevent unauthorized table access.
- ✅ **SEO & Meta Strictness**: Validates canonical URLs, Open Graph assets, and JSON-LD schema blocks across all 53 public routes.
- ✅ **Light Surface & Banned Token Guards**: Eliminates unstyled raw utilities and ensures brand coherence.
- ✅ **Career Engine Fingerprint Test**: Validates 70 unique assessment profiles against archetype classifiers.

---

## 🚀 Quick Start & Development

### Prerequisites
- **Node.js** v20.0+ (or **Bun** v1.1+)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rahulbathula04/arzon-careers-folder-.git
   cd arzon-careers-folder-
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   # or: bun install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   *Fill in your Supabase project credentials in `.env`.*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *Open [http://localhost:8080](http://localhost:8080) in your browser.*

---

## 🛠️ Essential Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Starts Vite dev server with hot module replacement (HMR). |
| `npm run build` | Runs all 25 prebuild verification gates + compiles client, SSR & Nitro production bundles. |
| `npm run preview` | Previews the optimized production bundle locally. |
| `npm run typecheck` | Executes TypeScript type checking (`tsc --noEmit`). |
| `npm run format` | Auto-formats codebase using Prettier. |
| `npm run lint` | Runs ESLint analysis across all components and routes. |
| `npm run test:visual` | Runs Playwright visual regression and layout verification tests. |

---

## 🎨 Design System & Fortune 500 Brand Standards

The UI is crafted with an editorial, high-trust aesthetic inspired by Reforge, Linear, and Stripe:

- **Canvas Background**: Warm Ivory (`#FAF8F5`) & Clean White (`#FFFFFF`)
- **Primary Brand Navy**: Imperial Royal Navy (`#1B3F8B`) & Deep Indigo (`#153270`)
- **Accent Gold**: Arzon Editorial Gold (`#8A6D1F`)
- **Status Green**: Verified Emerald (`#10B981`)
- **Typography**: Editorial Serif (`Instrument Serif`, `Playfair`) headers + Modern Sans (`Inter`, `Outfit`) body + Monospace (`JetBrains Mono`) data tags.
- **Structural Elevation**: Clean stone borders (`border-stone-200`) and elevated subtle shadows (`shadow-xs`, `shadow-md`).

---

## 🤝 Contributing

We welcome contributions from team members and approved collaborators. Please read our [Contributing Guide](CONTRIBUTING.md) and [Security Policy](SECURITY.md) before submitting pull requests.

1. Create a feature branch (`git checkout -b feat/your-feature-name`)
2. Verify all CI checks pass locally (`npm run build`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to branch (`git push origin feat/your-feature-name`)
5. Open a Pull Request adhering to the PR template.

---

## 📄 License

This software and its branding assets are proprietary and confidential to **Arzon Global**. Unauthorized copying, modification, or distribution is strictly prohibited.
