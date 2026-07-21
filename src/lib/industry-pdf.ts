import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ROLES } from "@/data/industry/roles";
import { EMPLOYERS } from "@/data/industry/employers";
import { SOURCES } from "@/data/industry/sources";

const fmt = (r: [number, number]) => `Rs ${r[0]}-${r[1]} LPA`;

export function exportIndustrySummaryPDF() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  let y = margin;

  // Cover
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Industry Intelligence — India 2026", margin, y);
  y += 22;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(110);
  doc.text(
    "Pay bands, top employers, career ladders and abroad markets for healthcare careers.",
    margin,
    y,
  );
  y += 14;
  doc.text(`Generated ${new Date().toLocaleDateString()} • Arzon Careers`, margin, y);
  doc.setTextColor(0);
  y += 24;

  // Per role
  ROLES.forEach((role, idx) => {
    if (idx > 0) doc.addPage();
    let yy = margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`${role.name} (${role.shortName})`, margin, yy);
    yy += 18;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(90);
    const tagLines = doc.splitTextToSize(role.tagline, 515);
    doc.text(tagLines, margin, yy);
    yy += tagLines.length * 12 + 6;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    doc.setFontSize(9);
    const meta = [
      `Demand: ${role.demand}`,
      `AI risk: ${role.aiRisk}`,
      `Work mode: ${role.workMode}`,
      `English: ${role.englishNeeded}`,
      `As of: ${role.asOf}`,
    ].join("  •  ");
    doc.text(meta, margin, yy);
    yy += 14;

    // Pay table
    autoTable(doc, {
      startY: yy,
      head: [["City", "Fresher", "2-3 yrs", "4-6 yrs", "7+ yrs"]],
      body: role.pay.map((p) => [
        p.city,
        fmt(p.fresher),
        fmt(p.midY3),
        fmt(p.seniorY5),
        fmt(p.leadY8),
      ]),
      theme: "striped",
      headStyles: { fillColor: [12, 18, 36], textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 8.5 },
      margin: { left: margin, right: margin },
    });
    yy = (doc as any).lastAutoTable.finalY + 14;

    // Career ladder
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Career ladder", margin, yy);
    yy += 6;
    autoTable(doc, {
      startY: yy,
      head: [["Stage", "Role", "Pay", "Unlocks"]],
      body: role.ladder.map((l) => [l.yrs, l.role, l.payInr, l.unlocks]),
      theme: "grid",
      headStyles: { fillColor: [12, 18, 36], textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 8.5 },
      margin: { left: margin, right: margin },
    });
    yy = (doc as any).lastAutoTable.finalY + 14;

    // Top employers (filtered)
    const employers = EMPLOYERS.filter((e) => e.hiringFor.includes(role.slug));
    if (employers.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Top employers", margin, yy);
      yy += 6;
      autoTable(doc, {
        startY: yy,
        head: [["Employer", "Tier", "Cities", "L1 band"]],
        body: employers.map((e) => [e.name, e.tier, e.cities.join(", "), e.typicalBand ?? "—"]),
        theme: "striped",
        headStyles: { fillColor: [12, 18, 36], textColor: 255, fontSize: 9 },
        bodyStyles: { fontSize: 8.5 },
        margin: { left: margin, right: margin },
      });
      yy = (doc as any).lastAutoTable.finalY + 14;
    }

    // Abroad markets
    if (role.abroad.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Abroad markets", margin, yy);
      yy += 6;
      autoTable(doc, {
        startY: yy,
        head: [["Country", "Pay (INR equiv)", "Eligibility", "Note"]],
        body: role.abroad.map((a) => [a.country, a.payInrEquiv, a.eligibility, a.note]),
        theme: "grid",
        headStyles: { fillColor: [12, 18, 36], textColor: 255, fontSize: 9 },
        bodyStyles: { fontSize: 8 },
        margin: { left: margin, right: margin },
      });
    }
  });

  // Sources
  doc.addPage();
  let sy = margin;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Sources", margin, sy);
  sy += 18;

  const sourceIds = Array.from(new Set(ROLES.flatMap((r) => r.sources)));
  autoTable(doc, {
    startY: sy,
    head: [["Source", "Publisher", "As of", "URL"]],
    body: sourceIds.map((id) => {
      const s = SOURCES[id];
      return s ? [s.label, s.publisher, s.asOf, s.url] : [id, "—", "—", "—"];
    }),
    theme: "striped",
    headStyles: { fillColor: [12, 18, 36], textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    columnStyles: { 3: { cellWidth: 180 } },
    margin: { left: margin, right: margin },
  });

  // Footer page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(140);
    doc.text(
      `Arzon Careers • Industry Intelligence • Page ${i} of ${pageCount}`,
      margin,
      doc.internal.pageSize.getHeight() - 18,
    );
  }

  doc.save(`arzon-industry-intelligence-${new Date().toISOString().slice(0, 10)}.pdf`);
}
