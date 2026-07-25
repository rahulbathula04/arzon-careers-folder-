import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import type { Course } from "@/data/courses";
import { NEXT_COHORT, PRICE_CAREER } from "@/components/landing/constants";

/**
 * Client-side PDF brochure generator. Salesperson can email/WhatsApp it.
 */
export function BrochureButton({ course }: { course: Course }) {
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    setBusy(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();
      const M = 48;
      let y = M;

      const heading = (text: string, size = 11, bold = true) => {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.text(text, M, y);
        y += size + 6;
      };
      const para = (text: string, size = 9.5) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(size);
        const lines = doc.splitTextToSize(text, W - M * 2);
        doc.text(lines, M, y);
        y += lines.length * (size + 2) + 4;
      };
      const checkPage = (needed = 80) => {
        if (y > H - needed) {
          doc.addPage();
          y = M;
        }
      };
      const rule = () => {
        doc.setDrawColor(220);
        doc.line(M, y, W - M, y);
        y += 12;
      };

      // Header bar
      doc.setFillColor(15, 23, 42); // #0f172a
      doc.rect(0, 0, W, 70, "F");
      doc.setTextColor(255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("ARZON GLOBAL", M, 32);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("ISO 9001 certified · MSME (Govt of India) · MCA-registered Pvt. Ltd.", M, 50);
      doc.text("Public launch event · 30 July 2025 · Hyderabad", M, 62);
      y = 100;
      doc.setTextColor(20);

      heading(course.title, 18);
      doc.setTextColor(60);
      para(course.heroTagline);
      doc.setTextColor(20);
      rule();

      heading("Programme snapshot", 12);
      para(`Category:    ${course.category}`);
      para(`Duration:    12 weeks · live + recorded`);
      para(`Demand:      ${course.jd.demand}`);
      para(`Salary band: ${course.jd.salary}`);
      para(`Next cohort: ${NEXT_COHORT.label} · starts ${NEXT_COHORT.startsLabel}`);
      para(`Applications close: ${new Date(NEXT_COHORT.applicationsCloseISO).toDateString()}`);
      para(`Programme fee: ${PRICE_CAREER} (₹999 seat fee to lock your spot)`);
      rule();

      checkPage();
      heading("What hiring managers ask for", 12);
      para("Top JD skills: " + course.jd.topSkills.join(", "));
      para("Hiring roles:  " + course.jd.hiringRoles.join(", "));
      para("Sample employers: " + course.jd.sampleEmployers.join(", "));
      para("Tools mastered: " + course.tools.join(", "));
      rule();

      checkPage();
      heading("12-week syllabus", 12);
      course.syllabus.forEach((m, i) => {
        checkPage(120);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.text(`Module ${i + 1} · ${m.weeks}, ${m.title}`, M, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const topics = doc.splitTextToSize("Topics: " + m.topics.join(" · "), W - M * 2);
        doc.text(topics, M, y);
        y += topics.length * 11 + 2;
        const deliv = doc.splitTextToSize("Deliverable: " + m.deliverable, W - M * 2);
        doc.text(deliv, M, y);
        y += deliv.length * 11 + 2;
        doc.setTextColor(30, 64, 175);
        const jd = doc.splitTextToSize("Satisfies JD skill: " + m.jdSkill, W - M * 2);
        doc.text(jd, M, y);
        y += jd.length * 11 + 10;
        doc.setTextColor(20);
      });

      rule();
      checkPage();
      heading("Real projects", 12);
      para("Minor 1: " + course.projects.minor[0]);
      para("Minor 2: " + course.projects.minor[1]);
      para("Major:   " + course.projects.major);
      rule();

      checkPage();
      heading("On completion", 12);
      para(course.certification);
      para(
        "Every certificate carries a unique ID and QR code, verifiable at arzonglobal.com/verify.",
      );

      // Footer
      const total = doc.getNumberOfPages();
      for (let p = 1; p <= total; p += 1) {
        doc.setPage(p);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120);
        doc.text(`Arzon Global · ${course.title} · page ${p} of ${total}`, M, H - 24);
        doc.text("arzonglobal.com", W - M, H - 24, { align: "right" });
      }

      doc.save(`Arzon-${course.slug}-brochure.pdf`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={generate}
      disabled={busy}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground hover:bg-muted disabled:opacity-60"
    >
      {busy ? (
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Download brochure
    </button>
  );
}
