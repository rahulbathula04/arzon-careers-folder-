import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export interface WorkshopBrochureOptions {
  institutionName?: string;
  recipientName?: string;
  recipientTitle?: string;
  contactEmail?: string;
}

/**
 * Minimal, content-first Pharmacovigilance Field Guide.
 * Pure knowledge — no marketing. Clean typography. Dense tables.
 * 7 pages: ICSR validity · MedDRA coding · Seriousness ·
 * CRO work anatomy · Interview Q&A · Mentor notes.
 */
export function generateWorkshopBrochurePDF(_options?: WorkshopBrochureOptions) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 37.64;
  const cw = pw - m * 2;

  // Palette — minimal
  const NAVY:   [number,number,number] = [11, 19, 37];
  const TEAL:   [number,number,number] = [13, 148, 136];
  const INK:    [number,number,number] = [30, 41, 59];
  const MUTED:  [number,number,number] = [100, 116, 139];
  const BORDER: [number,number,number] = [220, 228, 238];
  const SOFT:   [number,number,number] = [248, 250, 252];
  const AMBER:  [number,number,number] = [180, 100, 6];
  const RED:    [number,number,number] = [190, 30, 30];
  const BLUE:   [number,number,number] = [27, 63, 139];

  // ── Helpers ──────────────────────────────────────────────────
  const sf = (style: "normal" | "bold", size: number, col: [number,number,number] = INK) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...col);
  };

  const hrule = (y: number, col: [number,number,number] = BORDER, w = 0.5) => {
    doc.setDrawColor(...col); doc.setLineWidth(w);
    doc.line(m, y, pw - m, y);
  };

  const lbl = (text: string, y: number, col: [number,number,number] = TEAL) => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(7.5); doc.setTextColor(...col);
    if (typeof (doc as any).setCharSpace === "function") (doc as any).setCharSpace(1.2);
    doc.text(text.toUpperCase(), m, y);
    if (typeof (doc as any).setCharSpace === "function") (doc as any).setCharSpace(0);
  };

  const btext = (text: string, y: number, w = cw, indent = 0): number => {
    sf("normal", 8.5, INK);
    const lines = doc.splitTextToSize(text, w - indent);
    doc.text(lines, m + indent, y);
    return y + lines.length * 12;
  };

  const callout = (
    y: number, text: string,
    bg: [number,number,number] = SOFT,
    border: [number,number,number] = TEAL,
    h = 44
  ): number => {
    const lines = doc.splitTextToSize(text, cw - 24);
    const realH = Math.max(h, lines.length * 12 + 20);
    doc.setFillColor(...bg); doc.setDrawColor(...border); doc.setLineWidth(0.75);
    doc.roundedRect(m, y, cw, realH, 4, 4, "FD");
    doc.setFillColor(...border); doc.rect(m, y, 3, realH, "F");
    sf("normal", 8.5, INK);
    const ty = y + (realH - lines.length * 12) / 2 + 10;
    doc.text(lines, m + 14, ty);
    return y + realH + 14;
  };

  const phdr = (chapter: string, title: string): number => {
    doc.setFillColor(...NAVY); doc.rect(0, 0, pw, 36, "F");
    sf("bold", 8, [255,255,255]);
    doc.text("ARZON GLOBAL  \u00B7  PHARMACOVIGILANCE FIELD GUIDE  \u00B7  2026", m, 22);
    sf("normal", 7.5, TEAL); doc.text(chapter, pw - m, 22, { align: "right" });
    doc.setFillColor(...TEAL); doc.rect(0, 36, pw, 1.5, "F");
    let y = 60; sf("bold", 19, NAVY); doc.text(title, m, y); y += 8;
    doc.setDrawColor(...TEAL); doc.setLineWidth(0.8); doc.line(m, y, pw - m, y);
    return y + 16;
  };

  const pftr = (pn: number, tp: number) => {
    hrule(ph - 30, BORDER, 0.5); sf("normal", 7, MUTED);
    doc.text(`Page ${pn} of ${tp}`, m, ph - 17);
    doc.text("Arzon Global  \u00B7  arzoncareers.in  \u00B7  institutional@arzoncareers.in", pw - m, ph - 17, { align: "right" });
  };

  // ── PAGE 1: COVER ────────────────────────────────────────────
  doc.setFillColor(...NAVY); doc.rect(0, 0, pw, ph, "F");
  doc.setFillColor(...TEAL); doc.rect(0, ph * 0.38, pw, 2, "F");

  let y = ph * 0.15;
  doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...TEAL);
  if (typeof (doc as any).setCharSpace === "function") (doc as any).setCharSpace(3.5);
  doc.text("ARZON GLOBAL", m, y);
  if (typeof (doc as any).setCharSpace === "function") (doc as any).setCharSpace(0);
  y += 14; sf("normal", 9, [140,160,185]); doc.text("Healthcare Career Intelligence", m, y);

  y = ph * 0.38 - 82;
  sf("bold", 36, [255,255,255]); doc.text("Pharmacovigilance", m, y);
  y += 44; sf("bold", 36, [255,255,255]); doc.text("Field Guide", m, y);
  y += 30; sf("normal", 12, TEAL); doc.text("For Healthcare Graduates Entering Drug Safety", m, y);

  y = ph * 0.38 + 28;
  doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(180,200,220);
  if (typeof (doc as any).setCharSpace === "function") (doc as any).setCharSpace(1.2);
  doc.text("INSIDE THIS GUIDE:", m, y);
  if (typeof (doc as any).setCharSpace === "function") (doc as any).setCharSpace(0);
  y += 20;

  const chs = [
    "01  \u00B7  ICSR Validity Fundamentals \u2014 The 4 Criteria, Day-0 Clock & Reporting Timelines",
    "02  \u00B7  MedDRA Coding Workflow \u2014 Hierarchy, PT Selection & Common Mistakes",
    "03  \u00B7  Seriousness & Case Processing Decisions \u2014 6 Criteria, Expectedness, Causality",
    "04  \u00B7  What PV Work Actually Looks Like Inside a CRO \u2014 Argus Workflow & Tools",
    "05  \u00B7  What Technical Interviews Expect From Freshers \u2014 Q&A With Real Answers",
    "06  \u00B7  Mentor Notes \u2014 Unfiltered Answers From a Drug Safety Operations Manager",
  ];
  chs.forEach((ch) => {
    sf("normal", 9, [215,228,245]); doc.text(ch, m, y); y += 18;
  });

  doc.setFillColor(6,11,22); doc.rect(0, ph - 56, pw, 56, "F");
  sf("normal", 8, [90,110,140]);
  doc.text("For TPOs, Principals & Chairmen \u2014 Prepared by Arzon Global, Hyderabad, Telangana.", m, ph - 34);
  sf("bold", 8, [140,160,185]);
  doc.text("arzoncareers.in  \u00B7  +91 91212 83638  \u00B7  institutional@arzoncareers.in", m, ph - 19);

  // ── PAGE 2: ICSR VALIDITY ─────────────────────────────────────
  doc.addPage(); y = phdr("CHAPTER 01", "ICSR Validity Fundamentals");

  lbl("The 4 Minimum Criteria (ICH-E2D)", y); y += 16;
  y = btext("An Individual Case Safety Report (ICSR) is valid only when ALL four minimum criteria are present simultaneously. If even ONE is missing, the case is held in a pending queue until follow-up information is received. This applies regardless of how serious the event seems.", y) + 8;

  autoTable(doc, {
    startY: y,
    head: [["CRITERION","WHAT IT MEANS","WHAT COUNTS AS VALID","COMMON EDGE CASE"]],
    body: [
      ["1. Identifiable Patient","A real, distinguishable individual must have experienced the event.","Age, sex, initials, DOB, patient ID — any ONE is sufficient.","Anonymous reports are INVALID unless the patient is traceable via the reporter."],
      ["2. Identifiable Reporter","A real person who can be contacted for follow-up information.","HCP, patient, regulatory authority, company employee. Name OR contact detail required.","A mass social media post with no identifiable poster is INVALID."],
      ["3. Suspect Drug","At least one drug suspected of causing the event must be named.","Brand name OR generic name. Batch number is not required for validity.","A list of concomitant-only drugs with no suspect drug stated = INVALID."],
      ["4. Adverse Event","A medical occurrence must be described — even vaguely.","'Patient felt unwell' is valid. Even 'event unknown, follow-up pending' qualifies.","Reporting only lack of efficacy with no clinical symptom described is NOT an adverse event."],
    ],
    theme: "grid",
    headStyles: { fillColor: NAVY, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5.5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 90 }, 1: { cellWidth: 118 }, 2: { cellWidth: 130 }, 3: { cellWidth: 182 } },
    margin: { left: m, right: m },
  });
  y = (doc as any).lastAutoTable.finalY + 18;

  lbl("The Day-0 Clock", y, RED); y += 16;
  y = btext("Day-0 is the date your company first receives awareness of a reportable valid case. It is NOT the date the event happened. It is NOT when you start processing. It is the moment of company awareness. The regulatory reporting deadline counts from Day-0 — including weekends and public holidays.", y) + 8;
  y = callout(y, "If a valid case arrives in your inbox at 11:58 PM on a Friday, that night is Day-0. A 15-day expedited case is due by 11:59 PM on the 15th calendar day. The clock does not pause for weekends, holidays, or system downtime.", SOFT, RED, 40);

  lbl("Reporting Timelines You Must Know", y); y += 15;
  autoTable(doc, {
    startY: y,
    head: [["CASE TYPE","TIMELINE","TO WHOM","CLOCK START"]],
    body: [
      ["Serious Unexpected (Trial) SUSAR: Fatal / Life-Threatening","7 calendar days","Competent authority + IRB/IEC + all investigators","Day-0 = initial receipt by sponsor or CRO acting on behalf"],
      ["Serious Unexpected (Trial) SUSAR: Other Serious","15 calendar days","Competent authority + IRB/IEC","Day-0 = initial receipt by sponsor or CRO"],
      ["Serious Unexpected (Post-Marketing)","15 calendar days","National competent authorities (CDSCO, FDA, EMA, PMDA)","Day-0 = awareness at Marketing Authorisation Holder"],
      ["Serious Expected (Listed in SmPC or IB)","Periodic aggregate — PSUR/DSUR","Regulatory authority at periodic intervals","No expedited reporting unless specifically mandated"],
      ["Non-Serious (any source)","Collected in PSUR/aggregate — no expedited requirement","Authority at next reporting window","Batched periodically"],
    ],
    theme: "striped",
    headStyles: { fillColor: BLUE, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 152 }, 1: { cellWidth: 80 }, 2: { cellWidth: 130 }, 3: { cellWidth: 158 } },
    margin: { left: m, right: m },
  });
  y = (doc as any).lastAutoTable.finalY + 18;

  lbl("Case Source Types & Reporting Obligations", y); y += 15;
  autoTable(doc, {
    startY: y,
    head: [["SOURCE TYPE","DESCRIPTION","REPORTING OBLIGATION"]],
    body: [
      ["Spontaneous","Unsolicited report from HCP or patient to MAH or authority. No protocol involved. Classic pharmacovigilance.","Always reportable if all 4 validity criteria are met."],
      ["Literature","Published case report in a peer-reviewed journal. PV teams scan scientific literature weekly as a GVP obligation.","Must be processed as an ICSR if it has not already been submitted."],
      ["Clinical Trial","Event during a study under an approved protocol. Sponsor is the obligated reporter.","Strict SUSAR timelines apply (7/15 days)."],
      ["Solicited","From market research, patient support programmes, disease registries, named patient programmes.","Treated same as spontaneous for reporting purposes."],
      ["Regulatory Authority","Case forwarded to MAH by CDSCO, FDA, EMA, or PMDA — already filed by a third party.","Acknowledge receipt + evaluate whether re-filing obligation exists in other territories."],
    ],
    theme: "grid",
    headStyles: { fillColor: NAVY, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 90 }, 1: { cellWidth: 258 }, 2: { cellWidth: 172 } },
    margin: { left: m, right: m },
  });

  // ── PAGE 3: MEDDRA CODING ─────────────────────────────────────
  doc.addPage(); y = phdr("CHAPTER 02", "MedDRA Coding Workflow");

  lbl("The 5-Level Hierarchy", y); y += 16;
  y = btext("MedDRA (Medical Dictionary for Regulatory Activities) is the ICH-mandated medical terminology for classifying adverse events across all regulatory submissions worldwide. Every adverse event you process must be mapped to a Preferred Term (PT). You never code above or below the PT level.", y) + 10;

  autoTable(doc, {
    startY: y,
    head: [["LEVEL","ABBR","DESCRIPTION","EXAMPLE"]],
    body: [
      ["System Organ Class","SOC","Highest level. 27 broad body systems or disease etiologies. Fixed by MedDRA — cannot be overridden by the associate.","Cardiac disorders  |  Infections and infestations  |  Hepatobiliary disorders"],
      ["High Level Group Term","HLGT","Groups related HLTs. Primarily used in aggregate safety analysis.","Cardiac arrhythmias (under Cardiac disorders)"],
      ["High Level Term","HLT","Groups related PTs for signal detection and aggregate review.","Supraventricular arrhythmias (under Cardiac arrhythmias)"],
      ["Preferred Term","PT","THE level you code to. Each PT = one distinct medical concept. Approximately 25,000 PTs in MedDRA 27.0.","Atrial fibrillation"],
      ["Lowest Level Term","LLT","Synonyms and near-synonyms that map UP to a PT. Used as your search entry point only — never the coding target.","'AF', 'Auricular fibrillation', 'Atrial flutter' — all map to PT: Atrial fibrillation"],
    ],
    theme: "grid",
    headStyles: { fillColor: NAVY, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5.5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 108 }, 1: { cellWidth: 40, halign: "center" }, 2: { cellWidth: 193 }, 3: { cellWidth: 179 } },
    margin: { left: m, right: m },
  });
  y = (doc as any).lastAutoTable.finalY + 18;

  lbl("Step-by-Step PT Selection — How You Actually Code a Case", y); y += 16;

  const steps = [
    ["STEP 1", "Capture the Verbatim Exactly", "The reporter's own words describing the event. Example: 'patient developed racing heartbeat and dizziness after the dose'. Never change or interpret the verbatim — record it exactly as stated."],
    ["STEP 2", "Search the LLT Browser", "Open the MedDRA browser (in Argus or standalone). Enter the verbatim or closest synonym. 'Racing heartbeat' as an LLT maps to PT: Palpitations. 'Dizziness' maps to PT: Dizziness directly."],
    ["STEP 3", "Confirm PT Definition Matches", "Read the PT definition in the browser. Confirm it matches the clinical picture. If choosing between Palpitations vs. Tachycardia, prefer the PT that most precisely reflects the reporter's language — not your clinical interpretation."],
    ["STEP 4", "Accept the Primary SOC", "Each PT has one Primary SOC assigned by MedDRA. You cannot override it. For 'Palpitations': Primary SOC = Cardiac disorders. Secondary SOCs exist but are not used for expedited reporting line items."],
    ["STEP 5", "Code Each Event Separately", "Three events = three separate PT lines. Each gets its own MedDRA coding entry in the case. They may belong to different SOCs. All three are documented and QC-reviewed independently."],
  ];

  steps.forEach(([n, t, d]) => {
    const dLines = doc.splitTextToSize(d, cw - 102);
    const boxH = Math.max(36, dLines.length * 11 + 18);
    doc.setFillColor(...SOFT); doc.setDrawColor(...BORDER); doc.setLineWidth(0.5);
    doc.roundedRect(m, y, cw, boxH, 3, 3, "FD");
    doc.setFillColor(...TEAL); doc.roundedRect(m, y, 88, boxH, 3, 3, "F");
    sf("bold", 7, [255,255,255]); doc.text(n, m + 8, y + 13);
    const tLines = doc.splitTextToSize(t, 72);
    sf("bold", 8, [255,255,255]); doc.text(tLines, m + 8, y + 23);
    sf("normal", 8, INK); doc.text(dLines, m + 96, y + (boxH - dLines.length * 10.5) / 2 + 10);
    y += boxH + 7;
  });

  y += 6;
  lbl("Common Coding Mistakes in Interviews & Production", y, RED); y += 15;
  autoTable(doc, {
    startY: y,
    head: [["MISTAKE","WHY IT IS WRONG","CORRECT APPROACH"]],
    body: [
      ["Coding to LLT instead of PT","LLTs are search synonyms, not coding targets. Regulatory submissions require PT level only.","Always code to Preferred Term. The LLT is only the path you search through."],
      ["Using 'Death' as standalone primary PT","'Death' should be accompanied by the cause of death if known. 'Sudden cardiac death' or 'Cardiorespiratory arrest' should be the primary event PT.","Code the medical cause of death as primary PT. Add 'Death' as a secondary event if SOC requires."],
      ["Overriding the Primary SOC","Each PT has ONE Primary SOC fixed by MedDRA. You cannot reassign it based on clinical opinion.","Always check the Primary SOC flag in the MedDRA browser. Never assume based on the word alone."],
      ["Adding clinical interpretation to verbatim","Reporter says 'difficulty breathing'. Do not code 'Respiratory distress' or 'Anaphylaxis' unless the reporter explicitly stated that.","Code 'Dyspnoea' \u2014 closest valid PT to the reporter's words. Raise a follow-up query for clinical detail."],
      ["Over-coding vague descriptions","Reporter says 'felt unwell'. Coding this as 'Multi-organ failure' is clinical interpretation, not coding.","Code 'Malaise' or 'Condition aggravated' \u2014 closest valid PT. Generate a query for specific symptoms."],
    ],
    theme: "grid",
    headStyles: { fillColor: [180,30,30], textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 135 }, 1: { cellWidth: 190 }, 2: { cellWidth: 195 } },
    margin: { left: m, right: m },
  });
  y = (doc as any).lastAutoTable.finalY + 14;
  y = callout(y, "MedDRA 27.0 (March 2026): ~25,000 PTs. When a version upgrade is released, all cases coded with deprecated or changed terms must be reviewed and potentially re-coded before submission. MedDRA version management is a real interview and production operations topic.", SOFT, TEAL, 40);

  // ── PAGE 4: SERIOUSNESS & CASE PROCESSING ────────────────────
  doc.addPage(); y = phdr("CHAPTER 03", "Seriousness & Case Processing Decisions");

  lbl("The 6 Seriousness Criteria (FDA / ICH-E2A)", y); y += 16;
  y = btext("Seriousness is a regulatory classification — not a clinical judgment about how bad the reaction is. An adverse event is SERIOUS if it meets ANY ONE of the 6 criteria below. One is sufficient. This is distinct from severity: a severe headache may be non-serious; a mild event causing hospitalisation IS serious.", y) + 10;

  const sc = [
    { l: "1. DEATH", c: RED, t: "Patient died. Even if death is not attributed to the drug — if the patient was on the drug and died — the case must be assessed and all death-related fields completed (cause of death, time to death, autopsy if performed)." },
    { l: "2. LIFE-THREATENING", c: RED, t: "Patient was at imminent risk of death at the time of the event \u2014 not hypothetically. 'This reaction could have been fatal' does not qualify. The reporter must indicate the patient was actually at risk of death during the event itself." },
    { l: "3. HOSPITALISATION", c: AMBER, t: "Admitted to hospital or existing hospitalisation was extended because of the adverse event. Planned admissions (elective surgery unrelated to the AE) do NOT qualify. Emergency room visits without formal admission are a judgment call based on clinical severity." },
    { l: "4. DISABILITY", c: AMBER, t: "Significant, persistent, or permanent disruption to a person's ability to conduct normal life functions. Temporary disruption (headache lasting 2 days) does NOT qualify. Permanent nerve damage affecting limb function DOES qualify." },
    { l: "5. CONGENITAL ANOMALY", c: AMBER, t: "Drug exposure in a pregnant patient resulting in a structural or functional birth defect in the offspring. Includes some cases of paternal exposure. All pregnancy-related cases must be flagged immediately for medical review." },
    { l: "6. MEDICALLY SIGNIFICANT", c: BLUE, t: "A medical or regulatory judgment call. Events that don't meet the above criteria but are considered important: drug dependency, liver enzymes >3x ULN (even without hospitalisation), anaphylaxis, significant overdose. Always escalate to a medical monitor if in doubt." },
  ];

  sc.forEach((s) => {
    const lines = doc.splitTextToSize(s.t, cw - 96);
    const boxH = Math.max(36, lines.length * 11 + 16);
    doc.setFillColor(...SOFT); doc.setDrawColor(...s.c); doc.setLineWidth(1);
    doc.roundedRect(m, y, cw, boxH, 3, 3, "FD");
    doc.setFillColor(...s.c); doc.rect(m, y, 82, boxH, "F");
    sf("bold", 7.5, [255,255,255]);
    const lw = doc.getTextWidth(s.l);
    doc.text(s.l, m + 41 - lw / 2, y + boxH / 2 + 3.5);
    sf("normal", 8, INK); doc.text(lines, m + 92, y + (boxH - lines.length * 10.5) / 2 + 10);
    y += boxH + 8;
  });

  y += 4;
  lbl("Expectedness / Listedness", y); y += 15;
  autoTable(doc, {
    startY: y,
    head: [["STATUS","REFERENCE DOCUMENT","DEFINITION","REPORTING IMPLICATION"]],
    body: [
      ["Expected / Labelled","SmPC (marketed drugs)  |  Investigator's Brochure (clinical trials)","The reaction AND its nature/severity appear in the current approved label.","No expedited reporting. Included in periodic PSUR aggregate."],
      ["Unexpected / Unlisted","Same as above","The reaction is NOT in the current label \u2014 or appears but at greater severity than documented.","Expedited reporting triggered: 15-day (post-marketing) or 7/15-day SUSAR (trial)."],
    ],
    theme: "grid",
    headStyles: { fillColor: NAVY, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 95 }, 1: { cellWidth: 158 }, 2: { cellWidth: 155 }, 3: { cellWidth: 112 } },
    margin: { left: m, right: m },
  });
  y = (doc as any).lastAutoTable.finalY + 16;

  lbl("Causality Assessment \u2014 WHO-UMC Scale", y); y += 15;
  autoTable(doc, {
    startY: y,
    head: [["TERM","PRACTICAL MEANING IN CASE PROCESSING"]],
    body: [
      ["Certain","Plausible temporal relationship. Documented rechallenge positive. No other explanation possible. Very rare in practice \u2014 requires dechallenge/rechallenge evidence."],
      ["Probable / Likely","Reasonable temporal relationship. Dechallenge improved event. Not easily explained by disease or other drugs."],
      ["Possible","Temporal relationship present, but other drugs or diseases could also explain the event. Most spontaneous reports are assessed here."],
      ["Unlikely","Temporal relationship is improbable. Disease or other drug is a more likely explanation than the suspect drug."],
      ["Conditional / Unclassified","Event reported but more data needed for assessment. Used for incomplete cases under follow-up."],
      ["Unassessable / Unclassifiable","Data insufficient or contradictory. Cannot perform any meaningful causality assessment."],
    ],
    theme: "striped",
    headStyles: { fillColor: BLUE, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 130 }, 1: { cellWidth: 390 } },
    margin: { left: m, right: m },
  });
  y = (doc as any).lastAutoTable.finalY + 14;
  y = callout(y, "RULE: In most sponsor SOPs, even 'Possible' causality stated by the reporter is sufficient to trigger processing obligations. Never downgrade the reporter's causality assessment without explicit medical reviewer approval \u2014 doing so without authorisation is a GCP violation.", [255,248,240], AMBER, 40);

  // ── PAGE 5: PV INSIDE A CRO ───────────────────────────────────
  doc.addPage(); y = phdr("CHAPTER 04", "What PV Work Actually Looks Like Inside a CRO");

  lbl("Real Anatomy of a Drug Safety Associate's Day", y); y += 16;
  y = btext("A Drug Safety Associate (DSA) at a CRO like Cognizant, IQVIA, or Accenture Life Sciences does not conduct research. The work is operational, deadline-driven, and governed by SOPs. Understanding this from Day-1 is what separates a productive hire from a confused one.", y) + 10;

  autoTable(doc, {
    startY: y,
    head: [["TIME BLOCK","TASK","WHAT ACTUALLY HAPPENS"]],
    body: [
      ["08:00\u201308:30","Triage Inbox & Workflow Review","Log into Oracle Argus or ARISg. Review overnight case queue. Flag any Day-0 cases received after previous COB. Prioritise 7-day SUSARs above all other work."],
      ["08:30\u201311:30","Case Data Entry & MedDRA Coding","Process assigned cases: patient demographics, drug details (dose, route, dates, batch), event verbatim, PT coding, seriousness assessment, timeline documentation. Average CRO output: 8\u201315 cases per associate per shift for simple spontaneous reports."],
      ["11:30\u201312:00","Medical Narrative Drafting","Write the structured case narrative: 150\u2013250 words covering the patient, drug, event, clinical course, lab data, and outcome. This is read by regulators during inspections. Errors in narratives are GCP findings."],
      ["12:00\u201313:00","Quality Control (QC) Review","Peer review of another associate's cases \u2014 checking all fields, coding logic, seriousness rationale, and narrative consistency against a 40\u201360-item checklist. Formal sign-off required."],
      ["14:00\u201316:00","Follow-Up Queries","Draft queries to reporters for missing data: patient DOB, concomitant medications, lab values, outcome updates. Every follow-up attempt must be timestamped and documented in the case audit trail."],
      ["16:00\u201317:30","Submission Prep & SLA Tracker","Check all cases approaching their deadline. 15-day and 7-day cases are exported as E2B R3 XML and submitted to FAERS, EudraVigilance, or VigiBase. SLA tracker updated. Risk flagged to team lead."],
      ["17:30\u201318:00","Handover Notes","Document all outstanding items for the next shift or territory. In 24/7 global CROs, India teams hand over to US teams at this time. Any SLA risk is communicated in writing AND verbally."],
    ],
    theme: "grid",
    headStyles: { fillColor: NAVY, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 76 }, 1: { fontStyle: "bold", cellWidth: 126 }, 2: { cellWidth: 318 } },
    margin: { left: m, right: m },
  });
  y = (doc as any).lastAutoTable.finalY + 18;

  lbl("Oracle Argus Workflow \u2014 8-Stage Case Lifecycle", y); y += 16;
  const argus: [string,string][] = [
    ["INTAKE","Case received via email, fax, or authority. Unique Case ID assigned. Source type and Day-0 logged immediately. A 'stub case' is created if fewer than 4 criteria are met \u2014 held pending follow-up data."],
    ["DATA ENTRY","Associate enters all demographics, drug details (batch, dose, route, start/stop dates), event verbatim, and reporter details. All fields must conform to E2B R3 data standards for electronic submission."],
    ["CODING","MedDRA PT assigned to each adverse event. Drug names are coded to WHO Drug Dictionary (WHO-DD). Both steps are audit-trailed and version-controlled."],
    ["MEDICAL REVIEW","A medical monitor or pharmacovigilance physician reviews seriousness, causality, and clinical accuracy. Their decision overrides the associate's initial assessment where relevant."],
    ["NARRATIVE","Medical narrative written and reviewed. Format: patient profile \u2192 drug and dosing \u2192 event description \u2192 laboratory data \u2192 clinical course \u2192 current outcome \u2192 reporter's assessment."],
    ["QC","Second-eye review of 40\u201360 checklist line items. Any discrepancy returns the case to the associate for correction before QC sign-off. QC metrics are monitored by team leads."],
    ["SUBMISSION","15-day / 7-day cases exported as E2B R3 XML and filed electronically to regulatory authorities. Submission is acknowledged and tracked. Confirmation receipt is archived."],
    ["FOLLOW-UP","New information post-submission creates a new case version (FU1, FU2, etc.). May trigger re-submission if new data changes seriousness, expectedness, or narrative accuracy."],
  ];

  argus.forEach(([step, desc]) => {
    const lines = doc.splitTextToSize(desc, cw - 100);
    const boxH = Math.max(30, lines.length * 11 + 14);
    doc.setFillColor(...SOFT); doc.setDrawColor(...BORDER); doc.setLineWidth(0.5);
    doc.roundedRect(m, y, cw, boxH, 3, 3, "FD");
    doc.setFillColor(...TEAL); doc.roundedRect(m, y, 85, boxH, 3, 3, "F");
    sf("bold", 7.5, [255,255,255]);
    const sw = doc.getTextWidth(step);
    doc.text(step, m + 42 - sw / 2, y + boxH / 2 + 3.5);
    sf("normal", 8, INK); doc.text(lines, m + 95, y + (boxH - lines.length * 10.5) / 2 + 10);
    y += boxH + 6;
  });

  y += 6;
  y = callout(y, "PV IS NOT CLINICAL MEDICINE: You do not diagnose or treat. You document, code, assess, and report exactly what the reporter states \u2014 applying regulatory rules. Accuracy and on-time delivery under SLA pressure are the primary performance metrics at every CRO.", SOFT, NAVY, 40);

  lbl("Core Industry Tools \u2014 Know These Names Before Any Interview", y); y += 15;
  autoTable(doc, {
    startY: y,
    head: [["TOOL","USED FOR","DEPLOYED AT"]],
    body: [
      ["Oracle Argus Safety","Primary case management, MedDRA coding, narrative drafting, QC, E2B submission","Cognizant, Accenture, TCS, IQVIA, Novartis, Pfizer, Roche"],
      ["ARISg (Relsys)","Alternative safety database with similar workflow to Argus","PPD, Syneos Health, some Labcorp divisions"],
      ["Veeva Vault Safety","Cloud-native case management — increasingly adopted post-2022","Emerging CROs and biotech clients"],
      ["WHO-Drug Dictionary","Coding drug names to standardised WHO entries. Runs alongside MedDRA.","All MAHs and CROs globally"],
      ["EudraVigilance (EV Web)","EU submission portal for all EMA-regulated products","All EU market access holders and their CROs"],
      ["FAERS (FDA)","US adverse event reporting. Submissions via MedWatch E2B.","All FDA-regulated product sponsors"],
      ["VigiBase (WHO)","Global ICSR database across 135+ WHO member countries. Used for signal detection.","WHO Programme for International Drug Monitoring"],
    ],
    theme: "striped",
    headStyles: { fillColor: BLUE, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 128 }, 1: { cellWidth: 200 }, 2: { cellWidth: 192 } },
    margin: { left: m, right: m },
  });

  // ── PAGE 6: TECHNICAL INTERVIEWS ──────────────────────────────
  doc.addPage(); y = phdr("CHAPTER 05", "What Technical Interviews Expect From Freshers");

  lbl("What CRO Hiring Teams Actually Evaluate", y); y += 16;
  y = btext("Most pharmacy graduates assume PV interviews test pharmacology knowledge. CRO interviewers have one priority: can you apply regulatory rules correctly, fast, and under pressure — without constant supervision? Below is a direct mapping of real interview questions with weak answers (rejected) vs. strong answers (shortlisted).", y) + 12;

  autoTable(doc, {
    startY: y,
    head: [["QUESTION","WEAK ANSWER \u2014 REJECTED","STRONG ANSWER \u2014 SHORTLISTED"]],
    body: [
      ["What are the 4 minimum validity criteria for an ICSR?","'Patient details, drug name, the event, and the doctor's signature.'","Identifiable patient, identifiable reporter, suspect drug, adverse event. ALL four must be present simultaneously. If any ONE is missing, the case is invalid and held pending until follow-up data is obtained."],
      ["What is Day-0 in pharmacovigilance?","'Day-0 is when the patient started having the reaction.'","Day-0 is the date the company or CRO first received awareness of a valid ICSR \u2014 not the event date, not the processing start. The regulatory reporting deadline runs from Day-0 including weekends."],
      ["What is seriousness? How is it different from severity?","'Seriousness means the reaction was very bad for the patient.'","Seriousness is a regulatory classification based on 6 ICH-E2A criteria: death, life-threatening, hospitalisation, disability, congenital anomaly, medically significant. Severity describes clinical intensity. A severe headache may be non-serious. A mild event causing hospitalisation IS serious."],
      ["What is a SUSAR?","'It's a serious adverse event in a clinical trial.'","SUSAR = Suspected Unexpected Serious Adverse Reaction. A clinical trial case that is both serious AND unexpected (not in the Investigator's Brochure at that severity). Fatal/life-threatening = 7-day reporting. Other serious SUSARs = 15-day."],
      ["What level do you code to in MedDRA?","'I code to the Lowest Level Term as it's the most specific.'","Always to the Preferred Term (PT). LLTs are search synonyms \u2014 the path to reach a PT. Regulatory submissions require PT. Primary SOC is assigned by MedDRA and cannot be overridden by the associate."],
      ["Reporter says patient had 'stomach problems'. What PT?","'I would code it as gastrointestinal disorder.'","'Abdominal discomfort' or 'Gastrointestinal disorder NOS' \u2014 closest PT that matches without clinical interpretation. I would simultaneously raise a follow-up query to the reporter for the exact symptom."],
      ["What is expectedness and why does it matter?","'Whether the reaction is expected based on common side effects.'","Expectedness = whether the reaction appears in the current approved SmPC or IB at the observed severity. Unexpected + Serious triggers expedited reporting. Expected + Serious = PSUR aggregate. Expectedness directly determines your SLA obligation."],
      ["Have you worked on Oracle Argus?","'No, but I'm willing to learn.'","[If trained]: 'I've completed a simulation in Argus 8.4 \u2014 demographic entry, MedDRA coding, narrative drafting.' [If untrained]: 'Not in production, but I understand the 8-stage workflow \u2014 intake, data entry, coding, medical review, narrative, QC, submission, and follow-up \u2014 and the E2B R3 standards it follows.'"],
    ],
    theme: "grid",
    headStyles: { fillColor: NAVY, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5.5 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 118 },
      1: { cellWidth: 158, textColor: [155,40,40] },
      2: { cellWidth: 244, textColor: [21,100,60] },
    },
    margin: { left: m, right: m },
  });
  y = (doc as any).lastAutoTable.finalY + 18;

  lbl("ATS Keywords That Get Pharmacy Resumes Shortlisted", y); y += 15;
  y = btext("Enterprise ATS systems at Cognizant, TCS, Accenture, IQVIA filter resumes in under 8 seconds. These phrases must appear explicitly in your resume or it will never reach a human recruiter:", y) + 10;

  autoTable(doc, {
    startY: y,
    head: [["CATEGORY","USE THESE EXACT PHRASES IN YOUR RESUME"]],
    body: [
      ["Regulatory","ICH-E2D  |  ICH-E2A  |  E2B R3  |  GCP  |  GVP Module VI  |  21 CFR 314  |  CDSCO PvPI  |  EMA GVP"],
      ["Coding Systems","MedDRA 27.0  |  PT coding  |  LLT mapping  |  Primary SOC  |  SMQ  |  WHO-DD  |  ATC classification"],
      ["Case Processing","ICSR processing  |  Case intake  |  Seriousness assessment  |  Expectedness evaluation  |  Narrative drafting  |  SUSAR  |  Signal detection"],
      ["Software / Tools","Oracle Argus Safety  |  ARISg  |  Veeva Vault Safety  |  EudraVigilance  |  FAERS  |  VigiBase  |  MedDRA Browser"],
      ["Process Terms","Day-0 clock  |  15-day expedited reporting  |  7-day SUSAR  |  SLA adherence  |  QC review  |  Follow-up query  |  PSUR/PBRER"],
      ["Clinical Terms","Adverse drug reaction  |  Serious adverse event  |  Causality assessment  |  WHO-UMC scale  |  Dechallenge  |  Rechallenge"],
    ],
    theme: "striped",
    headStyles: { fillColor: BLUE, textColor: 255, fontSize: 7.5, fontStyle: "bold", cellPadding: 5 },
    bodyStyles: { fontSize: 7.5, textColor: INK, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 110 }, 1: { cellWidth: 410 } },
    margin: { left: m, right: m },
  });

  // ── PAGE 7: MENTOR NOTES ──────────────────────────────────────
  doc.addPage(); y = phdr("CHAPTER 06", "Mentor Notes");
  sf("normal", 9, MUTED);
  doc.text("Mohamed Kumail Abbas  \u00B7  M.Pharm  \u00B7  Manager, Drug Safety  \u00B7  Ex-Cognizant, Quintiles, Indegene, Accenture", m, y);
  y += 8; hrule(y, BORDER); y += 16;

  const notes = [
    {
      q: "What separates a fresher who gets placed from one who doesn't?",
      a: "It is never the CGPA. In 10 years of hiring decisions, I have not once seen a pharmacology score predict PV performance. What I look for: does this person understand that their job is to apply a regulatory rule \u2014 not to interpret clinical outcomes? The fastest learners are those who grasp from Day-1 that PV is procedural, not diagnostic. Your job is to follow the SOP exactly, not to be a physician.",
    },
    {
      q: "What is the most misunderstood concept freshers bring into interviews?",
      a: "Almost everyone confuses seriousness with severity. A candidate who can explain the difference without prompting \u2014 in 30 seconds \u2014 stands out immediately. The second: Day-0. Freshers think it's the event date. It is the company's receipt date of the valid case. Get these two things wrong and you've likely failed the technical round before Question 3.",
    },
    {
      q: "What does a useful PV candidate's resume look like vs. a typical pharmacy graduate's?",
      a: "Typical: 'Studied Pharmacology, Pharmaceutics, Clinical Pharmacy.' That tells me nothing about your operational readiness. Useful: 'Familiar with ICH-E2D validity criteria and ICSR triage logic. Understands MedDRA PT-level coding workflow. Completed simulation of adverse event case entry in Oracle Argus 8.4.' One of those gets a callback \u2014 the other doesn't, regardless of grades.",
    },
    {
      q: "What is the most common mistake in case narratives?",
      a: "Two mistakes. First: copying the verbatim word-for-word into the narrative without structure. The narrative should flow: patient profile \u2192 drug history \u2192 event description \u2192 clinical course \u2192 laboratory data \u2192 outcome \u2192 reporter's assessment. Second: adding medical interpretation the reporter never stated. If the reporter says 'difficulty breathing', your narrative says 'difficulty breathing' \u2014 NOT 'respiratory distress consistent with anaphylaxis'. You are a reporter, not a diagnostician.",
    },
    {
      q: "Is there a faster path into PV than applying to Cognizant directly?",
      a: "Yes. Smaller CROs and medical coding companies hire freshers with less competition: Omega Healthcare, AGS Health, Navitas Life Sciences, DXC Technology (PV division), Indevus. Once you have 12\u201318 months of documented PV case processing experience, lateral moves to Cognizant, TCS, or IQVIA pay significantly more. The majority of senior associates I've worked with came from smaller firms first.",
    },
    {
      q: "What does 3 years of PV experience actually unlock?",
      a: "A competent associate at 3 years transitions to Senior Drug Safety Associate or Associate Team Lead. Compensation typically moves from \u20B93.2\u20135.2L (fresher) to \u20B97\u201310L (senior). At this level you handle complex cases independently, train juniors, and perform narrative QC. Lateral moves into signal detection, PSUR/PBRER aggregate reporting, or clinical trial safety (SUSAR management) are possible \u2014 all with significantly higher strategic and financial value.",
    },
  ];

  notes.forEach((n, i) => {
    hrule(y, BORDER, 0.4); y += 10;
    sf("bold", 9, NAVY);
    const qLines = doc.splitTextToSize(`Q${i + 1}.  ${n.q}`, cw);
    doc.text(qLines, m, y); y += qLines.length * 13 + 4;
    sf("normal", 8.5, INK);
    const aLines = doc.splitTextToSize(n.a, cw - 14);
    doc.text(aLines, m + 14, y); y += aLines.length * 12 + 16;
  });

  hrule(y, TEAL, 1); y += 16;
  sf("bold", 11, NAVY); doc.text("Arzon Global \u2014 Academic Partnerships Directorate", m, y); y += 18;
  const contacts = [
    "WhatsApp / Direct Call:  +91 91212 83638",
    "Institutional Email:  institutional@arzoncareers.in",
    "Live Masterclass:  arzoncareers.in/healthcare-career-workshop",
    "TPO Resource Centre:  arzoncareers.in/tpos",
  ];
  contacts.forEach((c) => { sf("normal", 8.5, INK); doc.text(c, m, y); y += 14; });
  y += 10;
  sf("normal", 7.5, MUTED);
  const disc = "This document is prepared under Arzon Global\u2019s Educational Access Charter and is distributed free of charge to academic institutions. Content reflects industry practice as of September 2026. Regulatory guidelines are subject to revision; always verify against the current ICH E-series guidelines and your organisation\u2019s approved SOPs.";
  doc.text(doc.splitTextToSize(disc, cw), m, y);

  // Apply footers to pages 2\u20137
  const totalPages = doc.getNumberOfPages();
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p); pftr(p, totalPages);
  }

  doc.save("Arzon-PV-Field-Guide-2026.pdf");
}