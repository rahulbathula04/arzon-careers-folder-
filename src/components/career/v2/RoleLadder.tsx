import { useState } from "react";
import { ChevronRight, Sparkles, AlertTriangle, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  rolesInFamily,
  formatRoleSalaryEntry,
  formatRoleSource,
  type CareerRole,
} from "@/data/careerRoles";
import type { CareerFamily } from "@/data/careerFamilies";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import {
  scoreRolesForFamily,
  extractCommitmentCtx,
  type RoleFitVerdict,
} from "@/lib/careerEngine/roleScoring";

export function RoleLadder({
  family,
  result,
  onTrackRole,
}: {
  family: CareerFamily;
  result: CareerEngineResult;
  onTrackRole?: (roleSlug: string) => void;
}) {
  const roles = rolesInFamily(family.id);
  const verdicts = scoreRolesForFamily(result, roles, extractCommitmentCtx(result));
  const [open, setOpen] = useState<string | null>(null);

  const byRole: Record<string, RoleFitVerdict> = Object.fromEntries(
    verdicts.map((v) => [v.slug, v]),
  );
  const activeRole: CareerRole | null = open ? (roles.find((r) => r.slug === open) ?? null) : null;
  const activeVerdict: RoleFitVerdict | null = open ? (byRole[open] ?? null) : null;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-white/60">
        Role ladder · {family.name}
      </p>
      <p className="mt-1 text-sm text-white/65">
        {roles.length} roles inside this family. Click any role to see the day-in-life, skills,
        salary, and top hiring companies.
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {roles.map((role) => {
          const v = byRole[role.slug];
          return (
            <button
              key={role.slug}
              type="button"
              onClick={() => setOpen(role.slug)}
              className={`group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                v?.isBestEntry
                  ? "border-sky-400/40 bg-sky-400/[0.06]"
                  : v?.eligible === false
                    ? "border-white/10 bg-white/[0.02] opacity-60"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-grotesk text-base font-bold text-white">
                    {role.name}
                  </p>
                  {v?.isBestEntry && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-400/15 px-2 py-0.5 font-mono text-micro uppercase tracking-[0.18em] text-sky-200">
                      <Sparkles className="h-3 w-3" /> Best entry
                    </span>
                  )}
                  {v?.eligible === false && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-400/15 px-2 py-0.5 font-mono text-micro uppercase tracking-[0.18em] text-rose-200">
                      <Lock className="h-3 w-3" /> Blocked
                    </span>
                  )}
                  {v && v.caveats.length > 0 && v.eligible && (
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                  )}
                </div>
                <p className="mt-0.5 truncate font-mono text-micro uppercase tracking-[0.18em] text-white/45">
                  {role.seniority === "senior"
                    ? "Senior"
                    : role.seniority === "mid"
                      ? "Mid"
                      : "Entry"}{" "}
                  · ladder #{role.ladderPosition}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-grotesk text-base font-extrabold tabular-nums text-white">
                  {v?.fit ?? "-"}%
                </span>
                <ChevronRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white/70" />
              </div>
            </button>
          );
        })}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl border-white/15 bg-[#0b1117] text-white">
          <DialogTitle className="sr-only">{activeRole?.name ?? "Role"}</DialogTitle>
          {activeRole && activeVerdict && (
            <RoleDrawerBody
              role={activeRole}
              verdict={activeVerdict}
              onTrack={() => {
                onTrackRole?.(activeRole.slug);
                setOpen(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function RoleDrawerBody({
  role,
  verdict,
  onTrack,
}: {
  role: CareerRole;
  verdict: RoleFitVerdict;
  onTrack: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-micro uppercase tracking-[0.22em] text-white/55">
            {role.seniority === "senior"
              ? "Senior role"
              : role.seniority === "mid"
                ? "Mid-level role"
                : "Entry-level role"}{" "}
            · ladder #{role.ladderPosition}
          </p>
          <h3 className="mt-1 font-grotesk text-h3 font-extrabold text-white">{role.name}</h3>
        </div>
        <span className="rounded-full bg-primary/15 px-3 py-1 font-grotesk text-base font-extrabold tabular-nums text-primary-glow ring-1 ring-primary/30">
          {verdict.fit}%
        </span>
      </div>
      <p className="text-sm text-white/75">{role.blurb}</p>

      {!verdict.eligible && (
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/[0.06] p-3">
          <p className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.18em] text-rose-200">
            <Lock className="h-3 w-3" /> Currently blocked
          </p>
          <p className="mt-1 text-sm text-white/75">
            {verdict.eligibilityNote ?? "Your degree doesn't typically qualify for this role."}
          </p>
        </div>
      )}
      {verdict.eligible && verdict.eligibilityNote && (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white/70">
          {verdict.eligibilityNote}
        </p>
      )}
      {verdict.caveats.length > 0 && (
        <ul className="space-y-1 rounded-xl border border-amber-300/25 bg-amber-300/[0.05] p-3 text-sm text-white/80">
          {verdict.caveats.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Entry salary" value={formatRoleSalaryEntry(role)} />
        <Stat label="India demand" value={role.demandIndia} />
        <Stat label="AI risk" value={role.aiRisk} />
      </div>
      {role.aiRiskNote && <p className="text-xs text-white/55">{role.aiRiskNote}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-white/55">Skills</p>
          <ul className="mt-1.5 space-y-1 text-sm text-white/80">
            {role.skills.map((s) => (
              <li key={s} className="flex gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-white/55">
            Certifications
          </p>
          <ul className="mt-1.5 space-y-1 text-sm text-white/80">
            {role.certifications.map((c) => (
              <li key={c} className="flex gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <p className="font-mono text-micro uppercase tracking-[0.18em] text-white/55">
          Top hiring companies
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {role.topCompanies.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/80"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs italic text-white/45">{formatRoleSource(role)}</p>

      {verdict.eligible && (
        <button
          type="button"
          onClick={onTrack}
          className="w-full rounded-full bg-primary px-5 py-3 font-grotesk text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          Track this role → I want to aim for {role.name}
        </button>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
      <p className="font-mono text-micro uppercase tracking-[0.18em] text-white/55">{label}</p>
      <p className="mt-1 font-grotesk text-base font-bold text-white">{value}</p>
    </div>
  );
}
