import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, ShieldCheck, XCircle } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminGate } from "@/hooks/useAdminGate";
import {
  listEmployers,
  createEmployer,
  listPlacementsAdmin,
  createPlacement,
  retractPlacement,
} from "@/lib/placements.functions";

export const Route = createFileRoute("/admin/placements")({
  head: () => ({
    meta: [{ title: "Placements ledger · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminPlacements,
});

type Employer = {
  id: string;
  slug: string;
  name: string;
  website: string | null;
  logo_url: string | null;
  contact_email: string | null;
  verified_at: string | null;
  created_at: string;
};

type PlacementRow = {
  id: string;
  employer_id: string;
  candidate_ref: string;
  role_title: string;
  city: string;
  month_start: string;
  salary_band_inr: string | null;
  evidence_source: string;
  evidence_ref: string;
  evidence_notes: string | null;
  verified_at: string;
  verified_by: string | null;
  published: boolean;
  retracted_at: string | null;
  retracted_reason: string | null;
  employers: { name: string; slug: string }[] | { name: string; slug: string } | null;
};

const EVIDENCE_OPTIONS = [
  { value: "signed_offer_letter", label: "Signed offer letter" },
  { value: "employer_hr_email", label: "Employer HR email" },
  { value: "payslip", label: "Payslip" },
  { value: "joining_letter", label: "Joining letter" },
  { value: "linkedin_confirmation", label: "LinkedIn confirmation" },
] as const;

function AdminPlacements() {
  const { status: gate } = useAdminGate(["admin"]);
  const loadEmployers = useServerFn(listEmployers);
  const loadPlacements = useServerFn(listPlacementsAdmin);
  const addEmployer = useServerFn(createEmployer);
  const addPlacement = useServerFn(createPlacement);
  const doRetract = useServerFn(retractPlacement);

  const [employers, setEmployers] = useState<Employer[]>([]);
  const [rows, setRows] = useState<PlacementRow[]>([]);
  const [busy, setBusy] = useState(false);

  // New-employer form
  const [empSlug, setEmpSlug] = useState("");
  const [empName, setEmpName] = useState("");
  const [empWebsite, setEmpWebsite] = useState("");
  const [empLogo, setEmpLogo] = useState("");
  const [empEmail, setEmpEmail] = useState("");

  // New-placement form
  const [pEmployerId, setPEmployerId] = useState("");
  const [pCandidateRef, setPCandidateRef] = useState("");
  const [pRole, setPRole] = useState("");
  const [pCity, setPCity] = useState("");
  const [pMonth, setPMonth] = useState(""); // YYYY-MM (converted to YYYY-MM-01)
  const [pSalary, setPSalary] = useState("");
  const [pEvidence, setPEvidence] = useState<string>("signed_offer_letter");
  const [pEvidenceRef, setPEvidenceRef] = useState("");
  const [pEvidenceNotes, setPEvidenceNotes] = useState("");

  async function refresh() {
    try {
      const [e, p] = await Promise.all([loadEmployers(), loadPlacements()]);
      setEmployers(e.employers as Employer[]);
      setRows(p.placements as PlacementRow[]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Load failed");
    }
  }

  useEffect(() => {
    if (gate === "ready") void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gate]);

  const employerOptions = useMemo(
    () =>
      employers.map((e) => ({
        value: e.id,
        label: `${e.name} · ${e.slug}`,
      })),
    [employers],
  );

  async function submitEmployer() {
    if (busy) return;
    setBusy(true);
    try {
      await addEmployer({
        data: {
          slug: empSlug.trim().toLowerCase(),
          name: empName.trim(),
          website: empWebsite.trim() || null,
          logoUrl: empLogo.trim() || null,
          contactEmail: empEmail.trim() || null,
        },
      });
      toast.success("Employer added");
      setEmpSlug("");
      setEmpName("");
      setEmpWebsite("");
      setEmpLogo("");
      setEmpEmail("");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add employer");
    } finally {
      setBusy(false);
    }
  }

  async function submitPlacement() {
    if (busy) return;
    if (!pEmployerId) {
      toast.error("Choose an employer");
      return;
    }
    if (!/^\d{4}-\d{2}$/.test(pMonth)) {
      toast.error("Joining month must be YYYY-MM");
      return;
    }
    setBusy(true);
    try {
      await addPlacement({
        data: {
          employerId: pEmployerId,
          candidateRef: pCandidateRef.trim(),
          roleTitle: pRole.trim(),
          city: pCity.trim(),
          monthStart: `${pMonth}-01`,
          salaryBandInr: pSalary.trim() || null,
          evidenceSource: pEvidence as (typeof EVIDENCE_OPTIONS)[number]["value"],
          evidenceRef: pEvidenceRef.trim(),
          evidenceNotes: pEvidenceNotes.trim() || null,
          published: true,
        },
      });
      toast.success("Placement recorded");
      setPCandidateRef("");
      setPRole("");
      setPCity("");
      setPMonth("");
      setPSalary("");
      setPEvidenceRef("");
      setPEvidenceNotes("");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to record placement");
    } finally {
      setBusy(false);
    }
  }

  async function retract(id: string) {
    const reason = window.prompt("Reason for retraction (2–240 chars)?");
    if (!reason || reason.trim().length < 2) return;
    try {
      await doRetract({ data: { id, reason: reason.trim() } });
      toast.success("Placement retracted");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Retract failed");
    }
  }

  if (gate === "loading") {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 motion-safe:animate-spin text-muted-foreground" />
        </div>
      </AdminShell>
    );
  }
  if (gate !== "ready") {
    return (
      <AdminShell>
        <div className="p-8 text-center text-muted-foreground">Admin access required.</div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Placements ledger"
        description="Record employer-verified hires. Every entry appears on the public /placements page and is permanent unless retracted."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Add employer */}
        <AdminCard
          title="1. Add employer"
          description="One row per company that has hired an Arzon candidate."
        >
          <div className="space-y-3">
            <Field label="Company name">
              <Input
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
                placeholder="IQVIA India"
              />
            </Field>
            <Field label="Slug (URL-safe, lowercase)">
              <Input
                value={empSlug}
                onChange={(e) => setEmpSlug(e.target.value)}
                placeholder="iqvia-india"
              />
            </Field>
            <Field label="Website (optional)">
              <Input
                value={empWebsite}
                onChange={(e) => setEmpWebsite(e.target.value)}
                placeholder="https://www.iqvia.com"
              />
            </Field>
            <Field label="Logo URL (optional)">
              <Input
                value={empLogo}
                onChange={(e) => setEmpLogo(e.target.value)}
                placeholder="https://…/logo.png"
              />
            </Field>
            <Field label="HR contact email (private)">
              <Input
                value={empEmail}
                onChange={(e) => setEmpEmail(e.target.value)}
                placeholder="talent.acquisition@…"
              />
            </Field>
            <Button onClick={submitEmployer} disabled={busy || !empName || !empSlug}>
              Add employer
            </Button>
          </div>
        </AdminCard>

        {/* Add placement */}
        <AdminCard
          title="2. Verify a placement"
          description="Requires employer-signed evidence. Never record a placement without a document you could show a journalist."
        >
          <div className="space-y-3">
            <Field label="Employer">
              <Select value={pEmployerId} onValueChange={setPEmployerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose employer" />
                </SelectTrigger>
                <SelectContent>
                  {employerOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Candidate reference (anonymised, e.g. A.K. · Hyderabad)">
              <Input
                value={pCandidateRef}
                onChange={(e) => setPCandidateRef(e.target.value)}
                placeholder="A.K. · Hyderabad"
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Role title">
                <Input
                  value={pRole}
                  onChange={(e) => setPRole(e.target.value)}
                  placeholder="Pharmacovigilance Associate"
                />
              </Field>
              <Field label="City">
                <Input
                  value={pCity}
                  onChange={(e) => setPCity(e.target.value)}
                  placeholder="Hyderabad"
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Joining month (YYYY-MM)">
                <Input
                  value={pMonth}
                  onChange={(e) => setPMonth(e.target.value)}
                  placeholder="2026-07"
                />
              </Field>
              <Field label="Salary band (optional)">
                <Input
                  value={pSalary}
                  onChange={(e) => setPSalary(e.target.value)}
                  placeholder="₹3.5–4.5L"
                />
              </Field>
            </div>
            <Field label="Evidence source">
              <Select value={pEvidence} onValueChange={setPEvidence}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVIDENCE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Evidence reference (internal — storage path / HR contact / LinkedIn URL)">
              <Input
                value={pEvidenceRef}
                onChange={(e) => setPEvidenceRef(e.target.value)}
                placeholder="storage://placements/2026-07/ak-iqvia.pdf"
              />
            </Field>
            <Field label="Notes (optional)">
              <Textarea
                value={pEvidenceNotes}
                onChange={(e) => setPEvidenceNotes(e.target.value)}
                rows={2}
              />
            </Field>
            <Button
              onClick={submitPlacement}
              disabled={
                busy ||
                !pEmployerId ||
                !pCandidateRef ||
                !pRole ||
                !pCity ||
                !pMonth ||
                !pEvidenceRef
              }
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Record verified placement
            </Button>
          </div>
        </AdminCard>
      </div>

      <div className="mt-8">
        <AdminCard
          title={`Ledger (${rows.length})`}
          description="Append-only. Retraction preserves the row and hides it from the public ledger with a reason."
        >
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No placements recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Month</th>
                    <th className="px-3 py-2">Employer</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Candidate</th>
                    <th className="px-3 py-2">City</th>
                    <th className="px-3 py-2">Evidence</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-border/60">
                      <td className="px-3 py-2 font-mono tabular-nums">{r.month_start}</td>
                      <td className="px-3 py-2">{employerLabel(r)}</td>
                      <td className="px-3 py-2">{r.role_title}</td>
                      <td className="px-3 py-2">{r.candidate_ref}</td>
                      <td className="px-3 py-2">{r.city}</td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {EVIDENCE_OPTIONS.find((o) => o.value === r.evidence_source)?.label ??
                          r.evidence_source}
                      </td>
                      <td className="px-3 py-2">
                        {r.retracted_at ? (
                          <span className="text-destructive">Retracted</span>
                        ) : r.published ? (
                          <span className="text-sky-600 dark:text-sky-400">Public</span>
                        ) : (
                          <span className="text-muted-foreground">Hidden</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {!r.retracted_at && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => retract(r.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Retract
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </div>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function employerLabel(r: PlacementRow): string {
  const e = r.employers;
  if (!e) return r.employer_id;
  if (Array.isArray(e)) return e[0]?.name ?? r.employer_id;
  return e.name;
}
