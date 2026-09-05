import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  STARTER_KIT_QUESTIONS,
  ARGUS_WORKFLOW_STEPS,
  RAVE_WORKFLOW_STEPS,
  ATS_KEYWORDS_DATA,
  CITY_SALARY_BENCHMARKS,
  TWELVE_WEEK_ROADMAP,
} from "../src/data/starterKitData";

function buildPDF() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  const candidateName = "Healthcare & Life Sciences Graduate";
  const degreeName = "B.Pharm / Pharm.D / M.Pharm / Life Sciences / Biotech";

  // Color tokens
  const NAVY = [11, 19, 37]; // #0B1325
  const ROYAL_BLUE = [27, 63, 139]; // #1B3F8B
  const SKY_BLUE = [2, 132, 199];
  const LIGHT_GRAY = [248, 250, 252];
  const BORDER_GRAY = [226, 232, 240];

  // Helper to apply running headers and footers across all content pages
  const applyRunningHeadersAndFooters = () => {
    const totalPages = doc.getNumberOfPages();
    for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);

      // Header background
      doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.rect(0, 0, pageWidth, 28, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text("ARZON GLOBAL · HEALTHCARE CAREER INTELLIGENCE", margin, 18);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(186, 230, 253);
      doc.text("2026 STARTER KIT · MNC PLACEMENT BLUEPRINT", pageWidth - margin, 18, { align: "right" });

      // Header accent strip
      doc.setFillColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
      doc.rect(0, 28, pageWidth, 2, "F");

      // Footer divider line
      doc.setDrawColor(BORDER_GRAY[0], BORDER_GRAY[1], BORDER_GRAY[2]);
      doc.setLineWidth(0.75);
      doc.line(margin, pageHeight - 26, pageWidth - margin, pageHeight - 26);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("ARZONCAREERS.IN · FREE EDUCATIONAL CAREER INTELLIGENCE", margin, pageHeight - 14);

      doc.setFont("helvetica", "normal");
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 14, { align: "right" });
    }
  };

  // ═════════════════════════════════════════════════════════════════════════════
  // PAGE 1: COVER PAGE
  // ═════════════════════════════════════════════════════════════════════════════
  let y = 0;

  // Cover Hero Banner
  doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.rect(0, 0, pageWidth, 250, "F");

  // Subtle accent line
  doc.setFillColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
  doc.rect(0, 248, pageWidth, 5, "F");

  // Pill Eyebrow
  y = 48;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, 220, 20, 10, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
  doc.text("OFFICIAL CANDIDATE RELEASE · 2026 EDITION", margin + 12, y + 13.5);

  // Main Title
  y += 42;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text("2026 Healthcare Career", margin, y);
  y += 30;
  doc.text("Starter Kit", margin, y);

  // Subtitle
  y += 24;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(203, 213, 225);
  doc.text("The Fast-Track Technical & Placement Guide for Fresh Life Sciences Graduates", margin, y);
  y += 16;
  doc.text("Covering Pharmacovigilance (PV), Clinical Data Management (CDM), and Regulatory Affairs", margin, y);

  // Candidate Profile Box
  y = 275;
  doc.setFillColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  doc.setDrawColor(BORDER_GRAY[0], BORDER_GRAY[1], BORDER_GRAY[2]);
  doc.roundedRect(margin, y, contentWidth, 76, 8, 8, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
  doc.text("PREPARED EXCLUSIVELY FOR REGISTERED CANDIDATE", margin + 16, y + 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text(candidateName, margin + 16, y + 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Target Qualification: ${degreeName}   •   Issue: 2026 Executive Release`, margin + 16, y + 60);

  // Mentor Authority Spotlight Box
  y += 92;
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(margin, y, contentWidth, 72, 8, 8, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(SKY_BLUE[0], SKY_BLUE[1], SKY_BLUE[2]);
  doc.text("CURATED BY INDUSTRY LEADERSHIP", margin + 16, y + 18);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Mohamed Kumail Abbas — Manager, Pharmacovigilance", margin + 16, y + 36);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text("20+ Years Clinical Drug Safety Practice   •   Former Safety Lead at Accenture & Cognizant", margin + 16, y + 52);

  // Kit Contents Overview Table
  y += 88;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("What You Will Find in this Starter Kit", margin, y);
  y += 8;

  autoTable(doc, {
    startY: y,
    head: [["Module", "Core Takeaways & Enterprise Deliverables", "Target Value"]],
    body: [
      [
        "Module 1:\nTop 20 Global CRO\nInterview Questions",
        "Exact technical questions asked at Novartis, IQVIA, and Parexel regarding ICH-E2D, SAE criteria, 7/15-day timelines, and MedDRA coding with model answers.",
        "Crucial for\nTech Rounds",
      ],
      [
        "Module 2:\nEnterprise Software\nWorkflow Blueprint",
        "End-to-end case processing lifecycle in Oracle Argus Safety 8.4 vs. query management in Medidata RAVE EDC and regulatory 21 CFR Part 11 audit trails.",
        "System\nFamiliarity",
      ],
      [
        "Module 3:\n35+ ATS-Optimized\nResume Keywords",
        "Domain-specific keywords (ICSR, SAE Reconciliation, eCTD, ALCOA++) and proven resume bullet points engineered to pass Workday & Taleo screening.",
        "Interview\nCallbacks",
      ],
      [
        "Module 4:\n2026 Fresher Salary\nBenchmark Matrix",
        "City-by-city starting CTC and 3-year growth benchmarks across Hyderabad, Bengaluru, Pune, Mumbai, Chennai, and Delhi-NCR.",
        "Salary\nClarity",
      ],
      [
        "Module 5:\n12-Week Corporate\nAction Roadmap",
        "Step-by-step weekly trajectory taking freshers from baseline degree qualification to signing their first MNC corporate offer letter.",
        "Zero-to-Offer\nExecution",
      ],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [NAVY[0], NAVY[1], NAVY[2]],
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 120, fontStyle: "bold" },
      1: { cellWidth: 320 },
      2: { cellWidth: 80, halign: "center", fontStyle: "bold", textColor: [27, 63, 139] },
    },
    margin: { left: margin, right: margin },
  });

  // Footer on cover
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Arzon Global © 2026 · All Rights Reserved · Strictly for personal career advancement", margin, pageHeight - 16);

  // ═════════════════════════════════════════════════════════════════════════════
  // PAGES 2 & 3: MODULE 1 - TOP 20 CRO INTERVIEW QUESTIONS & MODEL ANSWERS
  // ═════════════════════════════════════════════════════════════════════════════
  const renderQuestionsPage = (questions: typeof STARTER_KIT_QUESTIONS, pageNum: number, titleSuffix: string) => {
    doc.addPage();

    let currentY = 46;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
    doc.text(`Module 1: Top 20 Global CRO Interview Questions ${titleSuffix}`, margin, currentY);

    currentY += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("What technical panelists at Novartis, IQVIA, Parexel, and Cognizant evaluate in entry-level rounds.", margin, currentY);
    currentY += 12;

    const rows = questions.map((q) => [
      `Q${q.id}. ${q.question}\n\nCategory: ${q.category}`,
      `MODEL ANSWER:\n${q.answer}\n\nINTERVIEWER TIP: ${q.proTip}`,
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [["Technical Question & Category", "High-Scoring Model Answer & Panelist Pro-Tip"]],
      body: rows,
      theme: "striped",
      headStyles: {
        fillColor: [NAVY[0], NAVY[1], NAVY[2]],
        textColor: [255, 255, 255],
        fontSize: 8.5,
        fontStyle: "bold",
      },
      bodyStyles: {
        fontSize: 7.5,
        textColor: [30, 41, 59],
        cellPadding: 5.5,
      },
      columnStyles: {
        0: { cellWidth: 160, fontStyle: "bold" },
        1: { cellWidth: 360 },
      },
      margin: { top: 38, left: margin, right: margin, bottom: 34 },
    });
  };

  renderQuestionsPage(STARTER_KIT_QUESTIONS.slice(0, 10), 2, "(Part 1: Questions 1 to 10)");
  renderQuestionsPage(STARTER_KIT_QUESTIONS.slice(10, 20), 3, "(Part 2: Questions 11 to 20)");

  // ═════════════════════════════════════════════════════════════════════════════
  // PAGE 4: MODULE 2 - ENTERPRISE SOFTWARE WORKFLOW BLUEPRINT
  // ═════════════════════════════════════════════════════════════════════════════
  doc.addPage();

  let p4Y = 46;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Module 2: Enterprise Software Workflow Blueprint", margin, p4Y);

  p4Y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Understanding how cases flow through real enterprise platforms prevents you from sounding like a textbook-only fresher.", margin, p4Y);
  p4Y += 14;

  // Sub-heading: Oracle Argus Safety
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
  doc.text("1. Oracle Argus Safety 8.4 — End-to-End Case Processing Lifecycle", margin, p4Y);
  p4Y += 6;

  autoTable(doc, {
    startY: p4Y,
    head: [["Step", "Workflow Phase", "Responsible Role", "SLA", "Enterprise Tool & Compliance Rule"]],
    body: ARGUS_WORKFLOW_STEPS.map((s) => [
      `Step ${s.stepNumber}`,
      `${s.title}\n${s.description}`,
      s.role,
      s.sla,
      `${s.enterpriseTool}\nRule: ${s.complianceRule}`,
    ]),
    theme: "grid",
    headStyles: {
      fillColor: [NAVY[0], NAVY[1], NAVY[2]],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.2,
      textColor: [30, 41, 59],
      cellPadding: 4.5,
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: "bold", halign: "center" },
      1: { cellWidth: 200 },
      2: { cellWidth: 88, fontStyle: "bold" },
      3: { cellWidth: 65, halign: "center" },
      4: { cellWidth: 125 },
    },
    margin: { top: 38, left: margin, right: margin, bottom: 34 },
  });

  p4Y = (doc as any).lastAutoTable.finalY + 16;

  // Sub-heading: Medidata RAVE EDC
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
  doc.text("2. Medidata RAVE EDC — Clinical Data Management Lifecycle", margin, p4Y);
  p4Y += 6;

  autoTable(doc, {
    startY: p4Y,
    head: [["Step", "Clinical Phase", "Role", "SLA", "Tool & Data Integrity Standard"]],
    body: RAVE_WORKFLOW_STEPS.map((s) => [
      `Step ${s.stepNumber}`,
      `${s.title}\n${s.description}`,
      s.role,
      s.sla,
      `${s.enterpriseTool}\n${s.complianceRule}`,
    ]),
    theme: "grid",
    headStyles: {
      fillColor: [ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.2,
      textColor: [30, 41, 59],
      cellPadding: 4.5,
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: "bold", halign: "center" },
      1: { cellWidth: 200 },
      2: { cellWidth: 88, fontStyle: "bold" },
      3: { cellWidth: 65, halign: "center" },
      4: { cellWidth: 125 },
    },
    margin: { top: 38, left: margin, right: margin, bottom: 34 },
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // PAGE 5: MODULE 3 - 35+ ATS-OPTIMIZED RESUME KEYWORDS & STRATEGY
  // ═════════════════════════════════════════════════════════════════════════════
  doc.addPage();

  let p5Y = 46;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Module 3: ATS-Optimized Resume Keywords for Healthcare Roles", margin, p5Y);

  p5Y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Over 85% of fresher resumes are rejected automatically by Taleo and Workday because they lack these exact corporate keywords.", margin, p5Y);
  p5Y += 12;

  // The 3 Golden Rules Box
  doc.setFillColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  doc.setDrawColor(BORDER_GRAY[0], BORDER_GRAY[1], BORDER_GRAY[2]);
  doc.roundedRect(margin, p5Y, contentWidth, 54, 6, 6, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
  doc.text("3 GOLDEN RULES TO PASS ATS HR SCREENING FILTERS:", margin + 12, p5Y + 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text("1. Always write the full expansion AND acronym: e.g., 'Individual Case Safety Report (ICSR)' so keyword parsers match both.", margin + 12, p5Y + 28);
  doc.text("2. Never list skills as empty tags. Embed them inside action bullet points: 'Assessed adverse events in Oracle Argus Safety 8.4...'", margin + 12, p5Y + 39);
  doc.text("3. Highlight software versions: 'Oracle Argus 8.4', 'MedDRA 26.0', and 'Medidata RAVE' prove contemporary readiness.", margin + 12, p5Y + 49);

  p5Y += 64;

  const atsRows = ATS_KEYWORDS_DATA.map((k) => [
    k.category,
    k.keyword,
    k.tier,
    k.sampleBullet,
  ]);

  autoTable(doc, {
    startY: p5Y,
    head: [["Category", "Corporate ATS Keyword", "Impact Tier", "Sample Proven Resume Bullet Point"]],
    body: atsRows,
    theme: "striped",
    headStyles: {
      fillColor: [NAVY[0], NAVY[1], NAVY[2]],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [30, 41, 59],
      cellPadding: 4.2,
    },
    columnStyles: {
      0: { cellWidth: 90, fontStyle: "bold" },
      1: { cellWidth: 110, fontStyle: "bold" },
      2: { cellWidth: 60, halign: "center", fontStyle: "bold" },
      3: { cellWidth: 260 },
    },
    didParseCell: (data) => {
      if (data.column.index === 2 && data.cell.raw === "Critical") {
        data.cell.styles.textColor = [190, 18, 60]; // rose
      }
    },
    margin: { top: 38, left: margin, right: margin, bottom: 34 },
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // PAGE 6: MODULE 4 - 2026 HEALTHCARE FRESHER SALARY BENCHMARK & CITIES
  // ═════════════════════════════════════════════════════════════════════════════
  doc.addPage();

  let p6Y = 46;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Module 4: 2026 Healthcare Fresher Salary Benchmark & City Matrix", margin, p6Y);

  p6Y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Live compensation data from verified 2025-2026 MNC placements across Tier-1 delivery centers in India.", margin, p6Y);
  p6Y += 12;

  const salaryRows = CITY_SALARY_BENCHMARKS.map((c) => [
    `${c.city}\n(${c.hubType})`,
    `Rs ${c.fresherLpa[0]} – ${c.fresherLpa[1]} LPA`,
    `Rs ${c.exp3yrLpa[0]} – ${c.exp3yrLpa[1]} LPA`,
    `Rs ${c.senior5yrLpa[0]} – ${c.senior5yrLpa[1]} LPA`,
    `Rs ${c.lead8yrLpa[0]} – ${c.lead8yrLpa[1]} LPA`,
    c.topEmployers.join(", "),
  ]);

  autoTable(doc, {
    startY: p6Y,
    head: [["City & Hub Classification", "Fresher\n(0-1 Year)", "Mid-Level\n(3 Years)", "Senior Associate\n(5 Years)", "Team Lead\n(8+ Years)", "Top Verified Employers"]],
    body: salaryRows,
    theme: "grid",
    headStyles: {
      fillColor: [NAVY[0], NAVY[1], NAVY[2]],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.2,
      textColor: [30, 41, 59],
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 95, fontStyle: "bold" },
      1: { cellWidth: 65, halign: "center", fontStyle: "bold", textColor: [5, 150, 105] },
      2: { cellWidth: 65, halign: "center" },
      3: { cellWidth: 70, halign: "center" },
      4: { cellWidth: 65, halign: "center" },
      5: { cellWidth: 160 },
    },
    margin: { top: 38, left: margin, right: margin, bottom: 34 },
  });

  p6Y = (doc as any).lastAutoTable.finalY + 18;

  // Employer Segment Insights Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Employer Segmentation: Where Freshers Should Target", margin, p6Y);
  p6Y += 8;

  autoTable(doc, {
    startY: p6Y,
    head: [["Employer Category", "Key Companies", "Starting CTC Range", "What They Value Most"]],
    body: [
      [
        "Pharma Captives (GIC)",
        "Novartis (NBS), AstraZeneca, Pfizer, Novo Nordisk, Sanofi",
        "Rs 4.5L – 6.0L LPA",
        "Deep pharmacology grasp, ICH-GCP rigor, strong English presentation, long-term stability.",
      ],
      [
        "Global Clinical CROs",
        "IQVIA, Parexel, Syneos Health, Fortrea, ICON plc",
        "Rs 3.8L – 5.0L LPA",
        "Fast case turnaround, MedDRA coding speed, Argus/Rave simulation, willingness to learn.",
      ],
      [
        "IT Services Healthcare BUs",
        "Cognizant, Accenture, TCS Life Sciences, Wipro, Genpact",
        "Rs 3.5L – 4.5L LPA",
        "High processing volume, shift flexibility, process adherence, SOP compliance discipline.",
      ],
    ],
    theme: "striped",
    headStyles: {
      fillColor: [ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.2,
      textColor: [30, 41, 59],
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 110, fontStyle: "bold" },
      1: { cellWidth: 130 },
      2: { cellWidth: 80, halign: "center", fontStyle: "bold", textColor: [5, 150, 105] },
      3: { cellWidth: 200 },
    },
    margin: { top: 38, left: margin, right: margin, bottom: 34 },
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // PAGE 7: MODULE 5 - 12-WEEK ZERO-TO-OFFER ROADMAP & WORKSHOP INVITATION
  // ═════════════════════════════════════════════════════════════════════════════
  doc.addPage();

  let p7Y = 46;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Module 5: The 12-Week Zero-to-Offer Corporate Action Plan", margin, p7Y);

  p7Y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("The systematic phase-by-phase timeline used by Arzon alumni to transition from college theory to corporate offer letters.", margin, p7Y);
  p7Y += 12;

  const roadmapRows = TWELVE_WEEK_ROADMAP.map((r) => [
    r.weekRange,
    `${r.phaseTitle}\n\n• ${r.milestones.join("\n• ")}`,
    r.deliverables,
  ]);

  autoTable(doc, {
    startY: p7Y,
    head: [["Timeline", "Phase Milestones & Training Focus", "Target Verified Deliverable"]],
    body: roadmapRows,
    theme: "grid",
    headStyles: {
      fillColor: [NAVY[0], NAVY[1], NAVY[2]],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.2,
      textColor: [30, 41, 59],
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 70, fontStyle: "bold", halign: "center" },
      1: { cellWidth: 320 },
      2: { cellWidth: 130, fontStyle: "bold", textColor: [27, 63, 139] },
    },
    margin: { top: 38, left: margin, right: margin, bottom: 34 },
  });

  p7Y = (doc as any).lastAutoTable.finalY + 16;

  // Workshop Call to Action Box
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
  doc.setLineWidth(1.2);
  doc.roundedRect(margin, p7Y, contentWidth, 120, 8, 8, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Next Step: Attend the Live 90-Minute Intelligence Workshop", margin + 16, p7Y + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text("Reading this PDF gives you the knowledge — the live working session with Mohamed Kumail Abbas gives you the execution.", margin + 16, p7Y + 38);
  doc.text("In 90 minutes on Google Meet, Kumail sir opens a live Oracle Argus simulation on screen and processes a real adverse event.", margin + 16, p7Y + 50);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(ROYAL_BLUE[0], ROYAL_BLUE[1], ROYAL_BLUE[2]);
  doc.text("WORKSHOP DETAILS:", margin + 16, p7Y + 70);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text("• When: Upcoming Weekend at 7:00 PM IST   •   Format: Live Interactive Session on Google Meet", margin + 16, p7Y + 84);
  doc.text("• Free Access Link & Passcode: Reserved at https://arzoncareers.in/healthcare-career-workshop", margin + 16, p7Y + 96);
  doc.text("• Candidate Support & WhatsApp Community: +91 91212 83638", margin + 16, p7Y + 108);

  // Apply running headers and footers across all generated content pages
  applyRunningHeadersAndFooters();

  const pdfOutput = doc.output("arraybuffer");
  const buffer = Buffer.from(pdfOutput);

  // Write to public/ and workspace root
  const publicPath = resolve(process.cwd(), "public", "Arzon_2026_Healthcare_Career_Starter_Kit.pdf");
  const rootPath = resolve(process.cwd(), "Arzon_2026_Healthcare_Career_Starter_Kit.pdf");

  writeFileSync(publicPath, buffer);
  writeFileSync(rootPath, buffer);

  console.log(`✓ PDF successfully generated and saved to:\n  -> ${publicPath}\n  -> ${rootPath} (${buffer.length} bytes)`);
}

buildPDF();
