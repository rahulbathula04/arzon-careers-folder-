import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Briefcase, Check, Copy, Download, FileText, Link2, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { createShareCard } from "@/lib/shareCard.functions";
import { absUrl } from "@/components/landing/constants";

interface Gap {
  id: string;
  label: string;
  score: number;
}

interface Props {
  archetype: string;
  archetypeName: string;
  trackSlug: string;
  trackTitle: string;
  acriOverall: number;
  bandLabel: string;
  gaps: Gap[];
  skills: string[];
  roles: string[];
  /** Optional: candidate's preferred display name, if known. */
  candidateName?: string;
}

/**
 * Mentor / recruiter brief — one-pager:
 *  1. Mints a stable /r/<slug>/brief share URL (gaps + focus stack embedded
 *     in the share-card JSONB payload so the public page can render them).
 *  2. Builds a clean A4 PDF client-side via jsPDF, no server round-trip.
 *
 * Lives directly under the GapMapCard + FocusStackCard so the export reflects
 * exactly what the candidate sees.
 */
export function MentorBrief({
  archetype,
  archetypeName,
  trackSlug,
  trackTitle,
  acriOverall,
  bandLabel,
  gaps,
  skills,
  roles,
  candidateName,
}: Props) {
  const create = useServerFn(createShareCard);
  const minted = useRef(false);
  const [slug, setSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mint once — cache by (archetype, score, track) so refreshing the page
  // doesn't burn slugs.
  useEffect(() => {
    if (minted.current || typeof window === "undefined") return;
    minted.current = true;
    const cacheKey = `arz_brief_${archetype}_${acriOverall}_${trackSlug}`;
    const cached = window.localStorage.getItem(cacheKey);
    if (cached) {
      setSlug(cached);
      return;
    }
    create({
      data: {
        archetype,
        archetypeName,
        topTrackSlug: trackSlug,
        topTrackTitle: trackTitle,
        acriOverall,
        bandLabel,
        payload: {
          kind: "mentor_brief",
          gaps: gaps.map((g) => ({ id: g.id, label: g.label, score: g.score })),
          skills,
          roles,
          candidateName: candidateName ?? null,
        },
      },
    })
      .then((res) => {
        if (res?.slug) {
          window.localStorage.setItem(cacheKey, res.slug);
          setSlug(res.slug);
        }
      })
      .catch(() => setError("Could not mint a share link. PDF download still works."));
  }, [
    archetype,
    archetypeName,
    trackSlug,
    trackTitle,
    acriOverall,
    bandLabel,
    gaps,
    skills,
    roles,
    candidateName,
    create,
  ]);

  const briefUrl = slug ? absUrl(`/r/${slug}/brief`) : "";

  const onCopy = () => {
    if (!briefUrl || typeof navigator === "undefined") return;
    navigator.clipboard
      .writeText(briefUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => undefined);
  };

  const onDownloadPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let y = margin;

    // Header band
    doc.setFillColor(15, 27, 61);
    doc.rect(0, 0, pageWidth, 70, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Arzon Careers · Mentor Brief", margin, 32);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${trackTitle} track · ${bandLabel}`, margin, 50);
    y = 90;

    // Summary line
    doc.setTextColor(15, 27, 61);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    const who = candidateName ? `${candidateName}` : "Candidate";
    doc.text(`${who} · ACRI ${acriOverall} / 100`, margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Archetype: ${archetypeName}`, margin, y);
    y += 22;

    // Gap map table
    doc.setTextColor(15, 27, 61);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Skill gap map (current → 12-week target)", margin, y);
    y += 8;
    autoTable(doc, {
      startY: y,
      head: [["#", "Skill", "Current", "Target", "Δ"]],
      body: gaps.map((g, i) => [
        String(i + 1),
        g.label,
        String(Math.max(0, Math.min(100, g.score))),
        "80",
        String(Math.max(0, 80 - g.score)),
      ]),
      styles: { font: "helvetica", fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [59, 111, 160], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { left: margin, right: margin },
      columnStyles: {
        0: { cellWidth: 28, halign: "center" },
        2: { halign: "right", cellWidth: 60 },
        3: { halign: "right", cellWidth: 60 },
        4: { halign: "right", cellWidth: 40 },
      },
    });
    // @ts-expect-error – jspdf-autotable attaches lastAutoTable
    y = (doc.lastAutoTable?.finalY ?? y) + 24;

    // Focus stack — skills
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Focus stack · skills & tools to build", margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const skillsLine = skills.length ? skills.join("  ·  ") : "—";
    const skillLines = doc.splitTextToSize(skillsLine, pageWidth - margin * 2);
    doc.text(skillLines, margin, y);
    y += skillLines.length * 14 + 16;

    // Focus stack — roles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 27, 61);
    doc.text("Roles to target after the cohort", margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    roles.forEach((r) => {
      doc.text(`•  ${r}`, margin + 4, y);
      y += 14;
    });

    // Footer link
    y = doc.internal.pageSize.getHeight() - 40;
    doc.setDrawColor(220);
    doc.line(margin, y - 12, pageWidth - margin, y - 12);
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("Generated by Arzon Careers · arzoncareers.in", margin, y);
    if (briefUrl) {
      doc.textWithLink(briefUrl, pageWidth - margin, y, {
        url: briefUrl,
        align: "right",
      });
    }

    const stamp = new Date().toISOString().slice(0, 10);
    doc.save(`arzon-mentor-brief-${trackSlug}-${stamp}.pdf`);
  };

  return (
    <section
      aria-labelledby="mentor-brief-heading"
      className="tone-light mt-6 overflow-hidden rounded-3xl bg-white text-slate-900 ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.4)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/5 via-white to-primary/5 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
            <Briefcase className="h-3.5 w-3.5" /> Send to a mentor or recruiter
          </p>
          <h3
            id="mentor-brief-heading"
            className="mt-1.5 font-grotesk text-body font-extrabold leading-snug text-slate-900 sm:text-body-lg"
          >
            Share your gap map &amp; focus stack
          </h3>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <p className="text-caption leading-relaxed text-slate-600">
          A clean one-pager with the same skill gap map and focus stack shown above — formatted for
          someone reviewing your fit in 30 seconds.
        </p>

        {/* Shareable link */}
        <div className="mt-4">
          <p className="text-micro font-bold uppercase tracking-wide text-slate-500">
            Shareable link
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
            <Link2 className="h-3.5 w-3.5 shrink-0 text-slate-500" />
            <span className="min-w-0 flex-1 truncate font-mono text-meta text-slate-700">
              {slug ? briefUrl : "Generating your link…"}
            </span>
            <button
              type="button"
              onClick={onCopy}
              disabled={!slug}
              className="ml-auto inline-flex h-11 items-center gap-1 rounded-full bg-white px-3 text-meta font-bold text-slate-900 ring-1 ring-slate-300 transition hover:ring-primary disabled:opacity-50 motion-reduce:transition-none"
            >
              {!slug ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" /> Minting
                </>
              ) : copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-accent-sky-deep" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy link
                </>
              )}
            </button>
          </div>
          {error ? <p className="mt-2 text-micro text-amber-700">{error}</p> : null}
        </div>

        {/* Download PDF */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-caption font-bold text-white shadow-sm transition hover:brightness-110 motion-reduce:transition-none"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <span className="inline-flex items-center gap-1.5 text-micro text-slate-500">
            <FileText className="h-3.5 w-3.5" /> A4 · 1 page · prints clean
          </span>
        </div>
      </div>
    </section>
  );
}
