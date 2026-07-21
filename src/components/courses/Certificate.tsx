import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { BadgeCheck, Landmark, ShieldCheck } from "lucide-react";
import type { Course } from "@/data/courses";

export interface CertificateProps {
  course: Course;
  holderName: string;
  certificateId: string;
  issueDate?: string; // human readable
}

/**
 * The visual certificate. Used in /certificates/sample/$slug,
 * the verify result card, and the inline preview on /courses/$slug.
 */
export function Certificate({ course, holderName, certificateId, issueDate }: CertificateProps) {
  const [qrUrl, setQrUrl] = useState<string>("");
  const qrFor =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify?id=${certificateId}`
      : `https://arzonglobal.com/verify?id=${certificateId}`;

  useEffect(() => {
    QRCode.toDataURL(qrFor, { width: 220, margin: 1 })
      .then(setQrUrl)
      .catch(() => setQrUrl(""));
  }, [qrFor]);

  const date =
    issueDate ??
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div
      id="cert-card"
      className="tone-light relative flex w-full flex-col overflow-hidden rounded-2xl border-[6px] border-double border-primary/40 bg-white p-5 sm:aspect-[1.45/1] sm:p-10"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="select-none font-display text-display font-bold text-primary/[0.04] sm:text-display">
          ARZON
        </span>
      </div>

      <div className="relative flex items-start justify-between">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.28em] text-primary">
            Arzon Global · Internship Certificate
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-micro text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-primary" /> ISO 9001 · MSME · MCA registered
            </span>
          </p>
        </div>
        <BadgeCheck className="h-9 w-9 text-primary" />
      </div>

      <div className="relative mt-5 sm:mt-6">
        <p className="text-micro uppercase tracking-wider text-muted-foreground">
          This is to certify that
        </p>
        <p className="mt-2 break-words font-display text-h1 font-bold text-foreground">
          {holderName || "Your Name Here"}
        </p>
        <p className="mt-3 max-w-[36ch] text-xs leading-relaxed text-foreground sm:max-w-xl sm:text-sm">
          has successfully completed the structured 12-week internship in{" "}
          <span className="font-semibold">{course.title}</span>, including all six modules,
          assessments and the capstone project, meeting Arzon's performance standards.
        </p>
      </div>

      <div className="relative mt-6 flex flex-wrap items-end justify-between gap-4 sm:absolute sm:inset-x-10 sm:bottom-7 sm:mt-auto sm:flex-nowrap">
        <div>
          <p className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
            Issued
          </p>
          <p className="text-micro font-semibold text-foreground sm:text-xs">{date}</p>
          <p className="mt-2 font-mono text-micro uppercase tracking-wider text-muted-foreground">
            Certificate ID
          </p>
          <p className="font-mono text-micro font-semibold text-foreground sm:text-xs">
            {certificateId}
          </p>
        </div>
        <div className="text-center">
          <div className="h-10 w-32 border-b border-foreground/40 sm:w-40" />
          <p className="mt-1 text-micro text-muted-foreground sm:text-micro">
            Director, Arzon Global
          </p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border border-border bg-white sm:h-20 sm:w-20">
          {qrUrl ? (
            <img src={qrUrl} alt="Verify on /verify" className="h-full w-full" />
          ) : (
            <div className="text-micro text-muted-foreground">QR loading…</div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Make a deterministic-looking certificate ID from a slug + name.
 */
export function makeCertId(slug: string, name: string) {
  const code = slug.slice(0, 3).toUpperCase();
  const seed = (name || "sample").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return `ARZ-${code}-2026-${String((seed * 137) % 99999).padStart(5, "0")}`;
}
