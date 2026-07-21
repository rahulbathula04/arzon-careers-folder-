/**
 * exportReportPdf — capture the results DOM to a print-quality A4 PDF
 * that preserves the premium card styling. Browser-only; dynamic imports
 * keep it out of SSR/prerender.
 *
 * v6: also appends a citations / assumptions / confidence appendix built
 * from the sources catalogue.
 */
import { SOURCES, computeReportFreshness } from "@/data/industry/sources";
import type { QuizProfile } from "@/components/career/report/ReportStateContext";
import { summarizeProfile } from "@/lib/report/personalize";

export async function exportReportPdf(opts: {
  root: HTMLElement;
  filename?: string;
  onProgress?: (msg: string) => void;
  quizProfile?: QuizProfile | null;
}) {
  const { root, filename, onProgress, quizProfile = null } = opts;
  if (typeof window === "undefined") return;

  onProgress?.("Preparing layout…");
  const html = document.documentElement;
  html.setAttribute("data-pdf-export", "true");

  // Inject a hidden-in-app appendix that becomes visible in PDF mode via CSS.
  const appendix = buildAppendixNode(quizProfile);
  root.appendChild(appendix);

  // Give the browser a beat to apply print CSS + expand transitions.
  await new Promise((r) => setTimeout(r, 200));

  try {
    onProgress?.("Rendering canvas…");
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas-pro"),
      import("jspdf"),
    ]);

    const canvas = await html2canvas(root, {
      backgroundColor: "#070B16",
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      useCORS: true,
      logging: false,
      windowWidth: root.scrollWidth,
    });

    onProgress?.("Assembling PDF…");
    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 24;
    const usableW = pageW - margin * 2;
    const ratio = usableW / canvas.width;
    const scaledH = canvas.height * ratio;

    let renderedH = 0;
    let pageIndex = 0;
    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d")!;
    const sliceHpx = Math.floor((pageH - margin * 2) / ratio);

    const freshness = computeReportFreshness();

    while (renderedH < canvas.height) {
      const remaining = canvas.height - renderedH;
      const h = Math.min(sliceHpx, remaining);
      pageCanvas.width = canvas.width;
      pageCanvas.height = h;
      pageCtx.fillStyle = "#070B16";
      pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      pageCtx.drawImage(canvas, 0, renderedH, canvas.width, h, 0, 0, canvas.width, h);
      const dataUrl = pageCanvas.toDataURL("image/jpeg", 0.92);
      if (pageIndex > 0) pdf.addPage();
      pdf.addImage(dataUrl, "JPEG", margin, margin, usableW, h * ratio);
      // Header (page 1 only) + footer.
      if (pageIndex === 0) {
        pdf.setFontSize(8);
        pdf.setTextColor(120);
        pdf.text(
          `Data verified ${freshness.label} · ${freshness.count} sources · includes citations & assumptions`,
          pageW / 2,
          margin - 8,
          { align: "center" },
        );
      }
      pdf.setFontSize(8);
      pdf.setTextColor(150);
      pdf.text(`arzoncareers.in · page ${pageIndex + 1}`, pageW / 2, pageH - 10, {
        align: "center",
      });
      renderedH += h;
      pageIndex += 1;
      void scaledH;
    }

    const ts = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    pdf.save(filename ?? `arzon-career-fit-report-${ts}.pdf`);
    onProgress?.("Done");
  } finally {
    html.removeAttribute("data-pdf-export");
    if (appendix.parentNode) appendix.parentNode.removeChild(appendix);
  }
}

function buildAppendixNode(quizProfile: QuizProfile | null): HTMLElement {
  const el = document.createElement("section");
  el.setAttribute("data-pdf-appendix", "true");
  el.className = "report-pdf-appendix";
  const f = computeReportFreshness();
  const personalizationHtml = buildPersonalizationHtml(quizProfile);
  const rows = Object.values(SOURCES)
    .sort((a, b) => (a.publisher > b.publisher ? 1 : -1))
    .map(
      (s) => `
      <li>
        <strong>${escape(s.publisher)}</strong> — ${escape(s.label)}
        <div style="font-size:10px;color:#94a3b8;">
          ${escape(s.url)} · as of ${escape(s.asOf)}${s.verifiedAt ? ` · verified ${escape(s.verifiedAt)}` : ""}
        </div>
        ${s.rationale ? `<div style="font-size:11px;color:#cbd5e1;margin-top:2px;">${escape(s.rationale)}</div>` : ""}
      </li>
    `,
    )
    .join("");

  el.innerHTML = `
    <div style="padding:24px 8px 8px;">
      <h2 style="font-family:serif;color:#f8fafc;font-size:22px;margin:0 0 4px;">Citations, assumptions & confidence</h2>
      <div style="font-size:11px;color:#94a3b8;margin-bottom:12px;">
        Data catalogue verified ${f.label} across ${f.count} sources.
      </div>

      ${personalizationHtml}

      <h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Confidence tiers</h3>
      <ul style="font-size:11px;color:#e2e8f0;padding-left:16px;line-height:1.55;">
        <li><strong>High</strong> — ≥3 sources or ≥50 JDs corroborate within 90 days.</li>
        <li><strong>Medium</strong> — 1–2 sources or 10–49 JDs.</li>
        <li><strong>Directional</strong> — single reference / trend signal only.</li>
      </ul>

      <h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Salary assumptions</h3>
      <ul style="font-size:11px;color:#e2e8f0;padding-left:16px;line-height:1.55;">
        <li>Y0 base = median across AmbitionBox + Glassdoor + Naukri for the exact L1 title.</li>
        <li>Y1–Y5 CAGR 12–18%; Y6–Y10 CAGR 8–10% (band saturation).</li>
        <li>Low / Median / High = 25th / 50th / 75th percentile from the pooled distribution.</li>
        <li>City multipliers via MoSPI CPI: Bengaluru 1.00, Hyderabad 0.94, Chennai 0.92, Mumbai 1.12, Delhi 1.06.</li>
      </ul>

      <h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Source catalogue</h3>
      <ol style="font-size:11px;color:#e2e8f0;padding-left:16px;line-height:1.55;">${rows}</ol>
    </div>
  `;
  return el;
}

function buildPersonalizationHtml(profile: QuizProfile | null): string {
  if (!profile) {
    return `
      <h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Your personalization</h3>
      <div style="font-size:11px;color:#94a3b8;line-height:1.55;">
        Role-fit quiz not completed — tool priorities and the 30/60/90 plan show the default order for this role.
        Take the quiz in the report to tag familiar tools and flex the plan around your graduation year and domain.
      </div>
    `;
  }
  const skills = profile.skills.length
    ? profile.skills
        .map(
          (s) =>
            `<span style="display:inline-block;border:1px solid #334155;border-radius:9999px;padding:2px 8px;margin:2px 4px 2px 0;font-size:10px;color:#e2e8f0;">${escape(s)}</span>`,
        )
        .join("")
    : `<span style="font-size:11px;color:#94a3b8;">None marked</span>`;
  const saved = profile.savedAt
    ? new Date(profile.savedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
  return `
    <h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Your personalization</h3>
    <div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">
      Snapshot · ${escape(summarizeProfile(profile))} · saved ${escape(saved)}
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:11px;color:#e2e8f0;margin-bottom:8px;">
      <tbody>
        <tr>
          <td style="width:130px;padding:4px 8px 4px 0;color:#94a3b8;vertical-align:top;">Domain preference</td>
          <td style="padding:4px 0;vertical-align:top;">${escape(profile.domain ?? "Not specified")}</td>
        </tr>
        <tr>
          <td style="padding:4px 8px 4px 0;color:#94a3b8;vertical-align:top;">Graduation year</td>
          <td style="padding:4px 0;vertical-align:top;">${profile.gradYear ?? "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding:4px 8px 4px 0;color:#94a3b8;vertical-align:top;">Existing skills</td>
          <td style="padding:4px 0;vertical-align:top;">${skills}</td>
        </tr>
      </tbody>
    </table>
    <div style="font-size:11px;color:#cbd5e1;line-height:1.55;">
      <strong style="color:#f8fafc;">How this changed your report:</strong>
      <ul style="padding-left:16px;margin:4px 0 0;">
        <li><strong>Priority tools</strong> — daily/weekly-use tools you have <em>not</em> marked as known, surfaced first in "Tools you'll use" so you learn them in weeks 1–4.</li>
        <li><strong>Familiar tools</strong> — tools you already own are pushed to the end of the list and flagged as interview leverage rather than study items.</li>
        <li><strong>30/60/90 substitutions</strong> — any week that would drill a tool you already know is swapped for a stretch-goal nudge (portfolio piece, case study, or public artefact) instead of another repetition.</li>
        <li><strong>Timing nudges</strong> — pre-graduation profiles frame weeks 1–4 as an internship simulation; domain preference biases week-4 deliverables toward that vertical.</li>
      </ul>
    </div>
  `;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
