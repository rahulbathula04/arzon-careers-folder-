# Arzon Global · Pharmacovigilance Industry Connect
## Growth & Acquisition Campaign Architecture (Meta / Instagram)

This document specifies the 3 core Meta/Instagram Ad concepts designed to drive high-intent pharmacy and life-science graduates directly into the **Pharmacovigilance Industry Connect** funnel.

---

### Psychological Strategy & Message Match

Each ad addresses a distinct psychological angle (Curiosity, Mentor Authority, Real Clinical Case). Every creative is precisely message-matched to the landing page so that the moment a prospect taps the ad, the landing page hero instantly validates and expands on the hook they saw.

```
[Ad 01: Curiosity]       → Hero Headline: "You studied Pharmacology. Now see how PV actually works."
[Ad 02: Mentor Authority] → Mentor Dossier: "20+ Years Experience · Leadership at Accenture & Cognizant"
[Ad 03: Real Case]        → Interactive Case: "A patient reports severe dizziness... What happens next?"
```

---

## Campaign 01: The Curiosity Hook (Theory vs. Reality)

* **Objective**: Leads / Registrations
* **Target Audience**:
  * Education: Bachelor of Pharmacy (B.Pharm), Master of Pharmacy (M.Pharm), Doctor of Pharmacy (Pharm.D), Biotechnology, Biochemistry, Microbiology.
  * Age: 20 – 26
  * Geography: India (Tier 1 & Tier 2 Pharma Hubs: Hyderabad, Bengaluru, Pune, Mumbai, Ahmedabad, Chennai, Delhi NCR).
  * Interests: Clinical Research, Pharmacovigilance, Pharmacology, Pharmacy, Pharmaceutical Industry.

### Ad Copy
* **Primary Text**:
  > You spent 4 years studying drug receptors, chemical structures, and pharmacology textbooks.
  > 
  > But what actually happens when a physician in California reports an adverse event after a patient takes a medicine?
  > 
  > How is the report verified?
  > How is the medical term coded in MedDRA?
  > How does a safety narrative get drafted before the 15-day FDA regulatory deadline?
  > 
  > Join **Pharmacovigilance Industry Connect** — an open, live interaction with an industry leader with **20+ years of Pharmacovigilance experience**, including operational leadership at **Accenture** and **Cognizant**.
  > 
  > No sales pitch. No course presentation. Just an unfiltered look into how global PV operations actually run.
* **Headline**: You studied Pharmacology. Now see how Pharmacovigilance actually works.
* **Description**: Live Online · This Sunday, 11:00 AM IST · 100% Free Industry Pass
* **Call to Action**: Sign Up / Learn More (`https://arzoncareers.in/healthcare-career-workshop?utm_source=meta&utm_medium=paid_social&utm_campaign=pv_industry_connect&utm_content=curiosity_01`)

### Creative Direction
* **Visual**: Clean, split-screen or high-contrast editorial creative.
  * Left: A textbook formula / academic slide ("College Pharmacology").
  * Right: A realistic enterprise clinical safety workflow diagram from intake to FDA submission ("Global PV Operations").
  * Micro-badge: `ARZON GLOBAL · INDUSTRY INTERACTION`.

---

## Campaign 02: The Mentor Authority Hook (20+ Years Stature)

* **Objective**: High-Credibility Registrations
* **Target Audience**: Same as Campaign 01, plus job seekers on LinkedIn & Instagram actively searching for "Drug Safety Associate" or "Pharmacovigilance Fresher".

### Ad Copy
* **Primary Text**:
  > Before you spend money on any Pharmacovigilance program, talk to someone who has spent 20+ years doing the work.
  > 
  > Learn from a seasoned industry leader whose tenure spans:
  > • Ground-floor ICSR processing at **Quintiles**
  > • Literature adverse event surveillance at **Indegene**
  > • Operational management at **Norwich Clinical Services**
  > • Team leadership governing safety teams at **Accenture**
  > • Team leadership managing 30+ associates and medics at **Cognizant**
  > • PV management, audits, and SOP governance at **Novaspire Biosciences**
  > 
  > In this live interactive session, understand what PV teams actually do, what skills hiring managers look for, and how to navigate entry-level career decisions.
  > 
  > Free to attend. Limited live registrations.
* **Headline**: 20+ Years Inside Pharmacovigilance. Leadership at Accenture & Cognizant.
* **Description**: Direct Mentor Interaction · Real Case Breakdown · Free Pass
* **Call to Action**: Book Now / Sign Up (`https://arzoncareers.in/healthcare-career-workshop?utm_source=meta&utm_medium=paid_social&utm_campaign=pv_industry_connect&utm_content=mentor_authority_02`)

### Creative Direction
* **Visual**: Authoritative, executive typography and verified career timeline badges:
  * Prominent organization logos/marks: *Quintiles · Indegene · Norwich · Accenture · Cognizant · Novaspire*.
  * Executive stature line: `20+ YEARS PHARMACOVIGILANCE LEADERSHIP`.
  * Clean, Swiss-inspired enterprise card design.

---

## Campaign 03: The Real Clinical Case Hook (Forensic Problem-Solving)

* **Objective**: Engagement & High-Intent Conversion
* **Target Audience**: Final-year students & fresh graduates wanting to test their clinical thinking.

### Ad Copy
* **Primary Text**:
  > A 54-year-old patient starts a new prescription medicine.
  > 
  > 48 hours later, the patient experiences severe postural dizziness, faints at home, and is admitted to the emergency room for observation.
  > 
  > The report reaches your desk. What do you do next?
  > 
  > 1. Is this a valid ICSR?
  > 2. Does it meet ICH-E2A seriousness criteria?
  > 3. What crucial clinical details are missing?
  > 4. How should the symptom be coded in MedDRA?
  > 5. What goes into the safety narrative?
  > 
  > Walk through this exact case live with a 20-year Pharmacovigilance veteran who has audited thousands of real adverse events.
  > 
  > **Pharmacovigilance Industry Connect**
  > Live Online · This Sunday, 11:00 AM IST.
* **Headline**: A patient faints after taking a medicine. What happens next?
* **Description**: Explore real ICSR processing with a 20-year industry leader.
* **Call to Action**: Learn More / Sign Up (`https://arzoncareers.in/healthcare-career-workshop?utm_source=meta&utm_medium=paid_social&utm_campaign=pv_industry_connect&utm_content=clinical_case_03`)

### Creative Direction
* **Visual**: Clean, dark obsidian or crisp medical report UI card showing an intake case snippet:
  * `CASE REF: IN-PV-8821 | SUSPECT DRUG: Oral Formulation | EVENT: Syncope / Dizziness`.
  * Bold callout: `WHAT WOULD YOU DO ON DAY 1?`.
  * Footer: `Walk through the live workflow with a 20+ year PV leader · Arzon Global`.

---

## Downstream Lead Journey & Telemetry

1. **Ad Impression → Tap**: URL carries UTM tags (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`).
2. **Landing Page**: Real-time pass generator dynamically previews the user's name and details as they type.
3. **Form Submission**: Lead is captured in Supabase with qualification, graduation year, optional question, and UTM telemetry.
4. **Instant Pass State**: Confirmed Pass with calendar integration (.ics & Google Calendar) and direct WhatsApp Channel access.
5. **WhatsApp Protocol**: Automated welcome message delivering session details and reminder link (T-24h, T-2h, T-15m).
