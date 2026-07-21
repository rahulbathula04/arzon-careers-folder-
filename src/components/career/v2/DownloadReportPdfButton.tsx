import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { getPercentileBenchmark, type BenchmarkRow } from "@/lib/percentileBenchmark.functions";

type BenchmarkResponse = { rows: BenchmarkRow[]; hidden: boolean };

// Mirrors src/components/career/v2/EmployabilityTriad.tsx — keep in sync.
type TriadBand = "emerging" | "ready" | "strong" | "elite";
const TRIAD_BANDS: { max: number; key: TriadBand; label: string; next: number | null }[] = [
  { max: 54, key: "emerging", label: "Emerging", next: 55 },
  { max: 69, key: "ready", label: "Ready", next: 70 },
  { max: 84, key: "strong", label: "Strong", next: 85 },
  { max: 100, key: "elite", label: "Elite", next: null },
];
function triadBand(score: number) {
  return TRIAD_BANDS.find((b) => score <= b.max) ?? TRIAD_BANDS[TRIAD_BANDS.length - 1];
}
function industryReadiness(traits: Record<string, number>): number {
  const t = (k: string) => Number(traits?.[k] ?? 0);
  const domain = t("compliance");
  const process = (t("logic") + t("detail")) / 2;
  const tool = (t("data") + t("screen")) / 2;
  const workplace = (t("pressure") + t("language")) / 2;
  const raw = 0.4 * domain + 0.3 * process + 0.2 * tool + 0.1 * workplace;
  const scaled = ((raw + 3) / 6) * 100;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}
function nextBandLabel(currentKey: TriadBand): string {
  const idx = TRIAD_BANDS.findIndex((b) => b.key === currentKey);
  const next = TRIAD_BANDS[idx + 1];
  return next?.label ?? "Elite";
}

export function DownloadReportPdfButton({
  result,
  leadId,
}: {
  result: CareerEngineResult;
  leadId: string | null;
}) {
  const [busy, setBusy] = useState(false);
  const queryClient = useQueryClient();
  const fetchBenchmark = useServerFn(getPercentileBenchmark);
  const stream = (result.profile?.stream ?? "").trim() || null;

  async function handleDownload() {
    setBusy(true);
    try {
      // Reuse cached benchmark from PercentileBenchmark when available.
      const key = ["percentile-benchmark", stream, result.archetypeId];
      let bench = queryClient.getQueryData<BenchmarkResponse>(key);
      if (!bench) {
        bench = await queryClient.fetchQuery({
          queryKey: key,
          queryFn: () =>
            fetchBenchmark({
              data: {
                stream,
                traitScores: result.traitScores as Record<string, number>,
              },
            }),
        });
      }

      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const MARGIN = 40;
      const CONTENT_W = pageW - MARGIN * 2;
      let y = 48;
      const ensureSpace = (needed: number) => {
        if (y + needed > pageH - 60) {
          doc.addPage();
          y = 48;
        }
      };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Arzon Careers — Career Fit Report", MARGIN, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(90);
      doc.text(
        `${result.archetype?.name ?? "Your fit"} · Overall fit ${Math.round(result.fitScore ?? 0)}%`,
        MARGIN,
        y,
      );
      y += 16;
      if (leadId) {
        doc.text(`Report ID: ${leadId.slice(0, 8)}`, MARGIN, y);
        y += 14;
      }
      doc.text(new Date().toLocaleDateString("en-IN"), MARGIN, y);
      y += 20;

      // -------- Employability Triad --------
      const careerFit = Math.round(result.fitScore ?? 0);
      const readiness = industryReadiness(result.traitScores as Record<string, number>);
      const benchRowsForMarket = bench?.rows ?? [];
      const hasMarket = !bench?.hidden && benchRowsForMarket.length > 0;
      const marketScore = hasMarket
        ? Math.round(
            benchRowsForMarket.reduce((s, r) => s + (100 - r.topPct), 0) /
              benchRowsForMarket.length,
          )
        : null;

      const roleName = result.archetype?.name ?? "your top role";
      const triadRows: {
        label: string;
        score: number | null;
        explain: string;
        target: string;
      }[] = [
        {
          label: "Career fit",
          score: careerFit,
          explain: `How closely your traits match ${roleName} work day-to-day.`,
          target: (() => {
            const b = triadBand(careerFit);
            return b.next
              ? `+${b.next - careerFit} pts to reach ${nextBandLabel(b.key)}. Answer the deeper role questions to lock in your top match.`
              : "Elite — hold this by publishing artefacts recruiters can verify.";
          })(),
        },
        {
          label: "Industry readiness",
          score: readiness,
          explain:
            "40/30/20/10 blend: 40% domain (compliance), 30% process (logic + detail), 20% tool exposure (data + screens), 10% workplace habits (pressure + language).",
          target: (() => {
            const b = triadBand(readiness);
            return b.next
              ? `+${b.next - readiness} pts to reach ${nextBandLabel(b.key)}. A JD-mapped module lifts this fastest — target your weakest pillar first.`
              : "Elite — you are recruiter-ready on the 40/30/20/10 model.";
          })(),
        },
        {
          label: "Market competitiveness",
          score: marketScore,
          explain:
            "Where you rank against students who took the same assessment in the last 90 days.",
          target: hasMarket
            ? (() => {
                const b = triadBand(marketScore!);
                return b.next
                  ? `+${b.next - marketScore!} pts to reach ${nextBandLabel(b.key)}. Move any dimension into the top quartile to jump a band.`
                  : "Elite — you are in the top slice of your cohort.";
              })()
            : "Hidden — cohort still building. Shown once N ≥ 20 comparable students.",
        },
      ];

      ensureSpace(80);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(20);
      doc.text("Employability triad", MARGIN, y);
      y += 6;
      autoTable(doc, {
        startY: y + 4,
        head: [["Dimension", "Score", "Band", "What it means", "Improvement target"]],
        body: triadRows.map((r) => [
          r.label,
          r.score == null ? "—" : String(r.score),
          r.score == null ? "—" : triadBand(r.score).label,
          r.explain,
          r.target,
        ]),
        styles: { fontSize: 9, cellPadding: 6, valign: "top" },
        headStyles: { fillColor: [15, 23, 42] },
        columnStyles: {
          0: { cellWidth: 90, fontStyle: "bold" },
          1: { cellWidth: 40, halign: "center" },
          2: { cellWidth: 60, halign: "center" },
          3: { cellWidth: 140 },
          4: { cellWidth: "auto" },
        },
        margin: { left: MARGIN, right: MARGIN },
      });
      // @ts-expect-error autoTable augments doc
      y = doc.lastAutoTable.finalY + 6;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(
        doc.splitTextToSize(
          "Bands: <55 Emerging · 55–69 Ready · 70–84 Strong · 85+ Elite.",
          CONTENT_W,
        ),
        MARGIN,
        y + 10,
      );
      y += 26;

      // Top paths
      const topPaths = (result.evidence?.scoring?.topPathFits ?? []).slice(0, 3);
      if (topPaths.length) {
        ensureSpace(80);
        doc.setTextColor(20);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Top career fits", MARGIN, y);
        y += 8;
        autoTable(doc, {
          startY: y + 4,
          head: [["Rank", "Path", "Fit %"]],
          body: topPaths.map((p, i) => [
            String(i + 1),
            p.title ?? p.slug,
            `${Math.round(p.fit ?? 0)}%`,
          ]),
          styles: { fontSize: 10 },
          headStyles: { fillColor: [15, 23, 42] },
          margin: { left: MARGIN, right: MARGIN },
        });
        // @ts-expect-error autoTable augments doc
        y = doc.lastAutoTable.finalY + 24;
      }

      // Percentile benchmarking
      const rows = bench?.rows ?? [];
      ensureSpace(60);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(20);
      doc.text("Benchmark comparisons", MARGIN, y);
      y += 6;

      if (!rows.length) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(120);
        doc.text(
          "Sample size too small to publish percentiles for your cohort yet.",
          MARGIN,
          y + 14,
        );
        y += 30;
      } else {
        const refreshed = rows[0].refreshedAt
          ? new Date(rows[0].refreshedAt).toLocaleDateString("en-IN")
          : "—";
        const cohort =
          rows[0].streamUsed === "all" ? "all students" : `${rows[0].streamUsed} students`;
        autoTable(doc, {
          startY: y + 4,
          head: [["Dimension", "You", "Band", "Sample", "Cohort"]],
          body: rows.map((r) => [
            r.label,
            `Top ${r.topPct}%`,
            bandLabel(r.band),
            r.sampleSize.toLocaleString("en-IN"),
            r.streamUsed === "all" ? "all students" : `${r.streamUsed} students`,
          ]),
          styles: { fontSize: 10 },
          headStyles: { fillColor: [15, 23, 42] },
          margin: { left: MARGIN, right: MARGIN },
        });
        // @ts-expect-error autoTable augments doc
        y = doc.lastAutoTable.finalY + 12;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(120);
        const caveat = `Cohort: ${cohort} · Window: last 90 days · Snapshot updated ${refreshed}. Small streams (<100) pool across all streams for stability.`;
        doc.text(doc.splitTextToSize(caveat, CONTENT_W), MARGIN, y);
        y += 32;
      }

      // Footer on every page
      const pageCount = doc.getNumberOfPages();
      for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(140);
        doc.text("arzoncareers.in", MARGIN, pageH - 24);
        doc.text(`Page ${p} / ${pageCount}`, pageW - MARGIN, pageH - 24, { align: "right" });
      }

      doc.save(`arzon-career-report-${(leadId ?? "draft").slice(0, 8)}.pdf`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      id="report-download-pdf"
      onClick={handleDownload}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.12] disabled:opacity-60"
    >
      <Download className={`h-4 w-4 ${busy ? "motion-safe:animate-pulse" : ""}`} aria-hidden />
      {busy ? "Preparing PDF…" : "Download report as PDF"}
    </button>
  );
}

function bandLabel(band: BenchmarkRow["band"]): string {
  switch (band) {
    case "top10":
      return "Top 10%";
    case "top25":
      return "Top quartile";
    case "top50":
      return "Above median";
    default:
      return "Room to grow";
  }
}
