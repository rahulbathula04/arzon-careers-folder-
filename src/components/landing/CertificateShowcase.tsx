import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, ArrowRight, Award, Briefcase, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import internshipCert from "@/assets/proof/cert-internship.webp";
import projectCert from "@/assets/proof/cert-project.webp";
import hsbcCert from "@/assets/proof/hsbc-cert.jpg";
import jpmorganCert from "@/assets/proof/jpmorgan-cert.jpg";

type CertRow = {
  id: string;
  title: string;
  issuer: string;
  description: string | null;
  image_url: string | null;
  pdf_url: string | null;
};

// Fallback when DB has no rows yet, keeps the section meaningful on first deploy.
const FALLBACK: CertRow[] = [
  {
    id: "fallback-hsbc",
    title: "HSBC Holdings Partnership Certificate",
    issuer: "HSBC Holdings · Certified July 2026",
    description:
      "Official Recruitment Partnership Certificate for HSBC AI/ML Engineer intake.",
    image_url: hsbcCert,
    pdf_url: null,
  },
  {
    id: "fallback-jpmorgan",
    title: "JPMorgan Chase Partnership Certificate",
    issuer: "JPMorgan Chase & Co. · Certified July 2026",
    description:
      "Official Recruitment Partnership Certificate for JPMorgan Software Engineering intake.",
    image_url: jpmorganCert,
    pdf_url: null,
  },
  {
    id: "fallback-1",
    title: "Internship Completion Certificate",
    issuer: "Arzon Global",
    description:
      "Branded with ISO 9001 · MSME · MCA seals. Performance-graded against the job description.",
    image_url: internshipCert,
    pdf_url: null,
  },
  {
    id: "fallback-2",
    title: "Course Completion Certificate",
    issuer: "Arzon Global Labs",
    description:
      "Issued on successful course completion with ISO, MSME and Govt. seals, verifiable by QR.",
    image_url: projectCert,
    pdf_url: null,
  },
];

const COUNT_WORDS: Record<number, string> = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
};

function countWord(n: number) {
  return COUNT_WORDS[n] ?? String(n);
}

function pickIcon(issuer: string) {
  return /arzon/i.test(issuer) ? Award : Briefcase;
}

export function CertificateShowcase() {
  const [certs, setCerts] = useState<CertRow[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("id,title,issuer,description,image_url,pdf_url,sort_order")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (cancelled || error) return;
      if (data && data.length > 0) {
        setCerts(data as CertRow[]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const count = certs.length;
  const word = countWord(count);
  const isGrid3 = count >= 3;

  return (
    <Section id="certificate" size="lg">
      <SectionHeader
        align="center"
        eyebrow="Verifiable credentials"
        title={
          <>
            You graduate with <em className="italic-accent not-italic">{word}</em> certificate
            {count === 1 ? "" : "s"}, not one.
          </>
        }
        sub="Each issued by a real organisation, verifiable by a public URL or QR. LinkedIn-ready."
      />

      <div
        className={`mt-10 grid gap-6 sm:gap-7 ${isGrid3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {certs.map((c) => {
          const Icon = pickIcon(c.issuer);
          const fallbackImg = c.title.toLowerCase().includes("project")
            ? projectCert
            : internshipCert;
          return (
            <article
              key={c.id}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm ring-1 transition"
              style={{
                borderColor: "var(--border)",
                color: "var(--ink)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <figure className="relative aspect-[1.414/1] overflow-hidden bg-white p-2 sm:p-3">
                <img
                  src={c.image_url ?? fallbackImg}
                  alt={`Sample ${c.title} issued by ${c.issuer}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </figure>
              <div className="p-5 sm:p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-wider text-gold">
                  <Icon className="h-3 w-3" /> Issued by {c.issuer}
                </span>
                <h3 className="mt-3 text-base font-semibold text-ink">{c.title}</h3>
                {c.description && (
                  <p className="mt-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>
                    {c.description}
                  </p>
                )}
                {c.pdf_url && (
                  <a
                    href={c.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-glow hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" /> View sample PDF
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-3" style={{ color: "var(--ink-soft)" }}>
        <li className="flex items-start gap-2">
          <BadgeCheck className="mt-0.5 h-4 w-4 text-mint" /> Performance-based, not attendance.
        </li>
        <li className="flex items-start gap-2">
          <BadgeCheck className="mt-0.5 h-4 w-4 text-mint" /> Public verification URL + QR.
        </li>
        <li className="flex items-start gap-2">
          <BadgeCheck className="mt-0.5 h-4 w-4 text-mint" /> LOR for top performers.
        </li>
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link to="/certificates/sample/$slug" params={{ slug: "medical-coding" }}>
          <Button variant="premium" size="lg" className="text-slate-50">
            Preview a sample <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link
          to="/verify"
          className="inline-flex h-11 items-center gap-2 rounded-full border bg-card px-5 text-sm font-semibold text-ink shadow-sm hover:bg-muted"
        >
          Verify a certificate
        </Link>
      </div>
    </Section>
  );
}
