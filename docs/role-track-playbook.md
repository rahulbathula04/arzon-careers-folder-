# Role Track Playbook - how we add a new course

Every Arzon Careers course is reverse-engineered from real Indian fresher
JDs. The naming, syllabus, tools, salary band, employer list and capstone
all derive from the same source: a sample of live job descriptions.

This playbook is the recipe. Follow it end-to-end and you can ship a new
role track in days, not months.

---

## Core principle

> We don't teach subjects. We train people into specific Indian fresher
> job roles, using the exact tools, formats and JD language those roles
> list - refreshed quarterly from live postings.

If a step in this playbook would force us to violate that principle, the
step is wrong, not the principle.

---

## Step 1 - Pick the exact role title

Use the title a recruiter actually types into Naukri search. Not "PV
specialist", not "coder". Use:

- "Drug Safety Associate"
- "Medical Coder"
- "Clinical Data Associate"
- "AR Caller"
- "Regulatory Affairs Associate"

If the role has variants ("AR Caller" vs "Denial Analyst"), pick the
highest-volume one and treat the other as a specialisation later.

## Step 2 - Pull a JD sample

Target: 200+ live JDs in the last 90 days. Sources, in order:

1. Naukri.com (search by exact role title, India location, Fresher / 0–2 yrs)
2. LinkedIn India (same search)
3. Foundit (formerly Monster India)
4. Company careers pages (Cognizant, Optum, IQVIA, Sun Pharma, etc.)

Save URLs + dates. We will footnote the count on the page.

## Step 3 - Extract the recurring requirements

Read all 200 JDs. For each, write down:

- The skills/tools listed in the "Requirements" / "Must have" section
- The deliverable named ("process 50 ICSR cases", "code 100 charts")
- The certifications named (CPC, GCP, ICH-GVP)
- The hiring company
- The salary band (or Glassdoor / AmbitionBox for that role)

Then count frequency. Anything that appears in ≥ 40% of JDs is a module.
Anything ≥ 70% leads the syllabus.

## Step 4 - Map to the course schema

Use `src/data/courses/_template.ts` as the starting point. Fill in:

| Field                 | Source                                                        |
| --------------------- | ------------------------------------------------------------- |
| `title`               | `Fresher {Role Title} Track - {Tool 1} + {Tool 2} + {Tool 3}` |
| `roleTitle`           | Exact JD role title                                           |
| `tools`               | Top 6–8 tools from the JDs                                    |
| `jd.topSkills`        | Top 5–6 recurring skill phrases                               |
| `jd.hiringRoles`      | Variant role titles seen in the sample                        |
| `jd.salary`           | Glassdoor India / AmbitionBox fresher band for this role      |
| `jd.sampleEmployers`  | Top 6 hiring companies by JD count                            |
| `syllabus[i].jdSkill` | The exact JD phrase this module satisfies                     |
| `projects.major`      | The deliverable named most often in the JDs                   |

## Step 5 - Add JD provenance

Add a `JdProvenance` entry to `src/data/jdProvenance.ts` with the JD
count, refresh date, source list, top metros, and the top 4–5 JD phrases
(verbatim) mapped to their syllabus modules. This is what powers the
credibility pill, the module chips and the JD Mirror page.

## Step 6 - Wire it up

No code changes required beyond data:

- The `/courses/$slug` page reads from `courses.ts` and renders the
  JDProvenancePill automatically if a provenance entry exists.
- The sitemap picks up new courses from `COURSES_BY_SLUG`.
- The JD Mirror page (`/jd-mirror`) iterates over `JD_PROVENANCE`.

## Step 7 - SEO

- Add an entry to `src/data/seoBoost.ts` with a role-first title and the
  20-keyword set we target for fresher search intent.
- Confirm the `<head>` title leads with the role name.

## Step 8 - Refresh quarterly

Every quarter, repeat steps 2–3 on a fresh JD sample. Update `jdCount`
and `refreshedOn`. If a new tool or skill has crossed 30% adoption that
wasn't there last quarter, add it to the syllabus and log a `lastChange`
entry. This is the credibility flywheel.

---

## Pipeline candidates (next role tracks)

Each maps to a real, high-volume Indian fresher JD. Phase 2 work:

- Fresher AR / Denial Analyst Track (Healthcare RCM specialisation)
- Fresher Clinical Research Coordinator Track
- Fresher QC Analyst Track (Pharma QC - Sun, Lupin, Aurobindo)
- Fresher Formulation R&D Associate Track
- Fresher Aggregate Report Writer Track (PV specialisation)
- Fresher Medical Scribe Track (US healthcare)
- Fresher Bioinformatics Analyst Track (already drafted)
