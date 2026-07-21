import { useState } from "react";
import { BadgeCheck, ScanLine } from "lucide-react";
import type { Course } from "@/data/courses";

export function SamplePreview({ course }: { course: Course }) {
  const [name, setName] = useState("");
  const display = name.trim() || "Your Name Here";
  const id = `ARZ-${course.slug.slice(0, 3).toUpperCase()}-2026-${String(
    (display.length * 137) % 99999,
  ).padStart(5, "0")}`;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
      <div>
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary">
          Try it
        </p>
        <h3 className="mt-2 font-display text-h3 font-bold text-foreground">
          See your name on the certificate
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Type your name and watch the certificate update live. The QR code links to{" "}
          <span className="font-semibold text-foreground">/verify</span> so any recruiter can
          confirm it's real.
        </p>
        <label className="mt-5 block">
          <span className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Your full name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            placeholder="e.g. Aditi Sharma"
            className="mt-2 h-11 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none ring-primary/30 focus:ring-2"
          />
        </label>
        <p className="mt-3 text-micro text-muted-foreground">
          Certificate ID: <span className="font-mono text-foreground">{id}</span>
        </p>
      </div>

      <div
        className="relative aspect-[1.45/1] w-full overflow-hidden rounded-2xl border-4 border-double border-primary/30 bg-[var(--color-mint)] p-5 sm:p-7"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.3em] text-primary">
              Arzon Global · Internship Certificate
            </p>
            <p className="mt-0.5 text-micro text-muted-foreground">
              ISO 9001 · MSME · MCA registered
            </p>
          </div>
          <BadgeCheck className="h-7 w-7 text-primary" />
        </div>

        <div className="mt-3">
          <p className="text-micro uppercase tracking-wider text-muted-foreground">
            This is to certify that
          </p>
          <p className="mt-1 truncate font-display text-h3 font-bold text-foreground sm:text-h2">
            {display}
          </p>
          <p className="mt-2 text-micro leading-relaxed text-foreground sm:text-xs">
            has successfully completed the structured 12-week internship in
            <br />
            <span className="font-semibold">{course.title}</span>
          </p>
        </div>

        <div className="absolute inset-x-5 bottom-4 flex items-end justify-between sm:inset-x-7 sm:bottom-5">
          <div>
            <p className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
              Certificate ID
            </p>
            <p className="font-mono text-micro font-semibold text-foreground">{id}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-background">
            <ScanLine className="h-7 w-7 text-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
