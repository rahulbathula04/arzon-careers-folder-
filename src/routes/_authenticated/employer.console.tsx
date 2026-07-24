import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  listMyEmployers,
  listJobs,
  upsertJob,
  deleteJob,
  listShortlists,
  addShortlistCandidate,
  updateShortlistStatus,
  deleteShortlist,
  submitPlacementEvidence,
  PROGRAM_SLUGS,
  EMPLOYMENT_TYPES,
  JOB_STATUSES,
  SHORTLIST_STATUSES,
  EVIDENCE_SOURCES,
} from "@/lib/employer.functions";

export const Route = createFileRoute("/_authenticated/employer/console")({
  head: () => ({
    meta: [
      { title: "Employer console · Arzon Careers" },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content:
          "Verified employer console for posting roles, managing shortlists, and submitting signed placement evidence.",
      },
    ],
  }),
  component: EmployerConsolePage,
  pendingComponent: () => (
    <div className="tone-dark bg-[#0a0c10] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-teal-400" style={{ animationDelay: '0ms' }} />
          <span className="h-2 w-2 animate-bounce rounded-full bg-teal-400" style={{ animationDelay: '150ms' }} />
          <span className="h-2 w-2 animate-bounce rounded-full bg-teal-400" style={{ animationDelay: '300ms' }} />
        </span>
        <div className="text-white/60 font-mono text-sm tracking-widest uppercase">Loading Console</div>
      </div>
    </div>
  ),
});

function EmployerConsolePage() {
  const navigate = useNavigate();
  const listEmployers = useServerFn(listMyEmployers);
  const employersQ = useSuspenseQuery({
    queryKey: ["employer", "my"],
    queryFn: () => listEmployers({ data: undefined }),
  });

  async function onSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/employer/login" });
  }

  const employers = employersQ.data?.employers ?? [];
  if (employers.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="h-display text-foreground">Employer console</h1>
        <div className="mt-6 rounded-md border border-border bg-muted/40 p-5 text-sm text-foreground">
          Your account is not linked to a verified employer yet. An Arzon admin reviews new employer
          profiles before the console unlocks. You'll get an email once your organisation is
          verified.
        </div>
        <Button variant="outline" onClick={onSignOut} className="mt-6">
          Sign out
        </Button>
      </div>
    );
  }

  return <ConsoleShell employers={employers} onSignOut={onSignOut} />;
}

type Employer = { employer_id: string; slug: string; name: string; logo_url: string | null };

function ConsoleShell({ employers, onSignOut }: { employers: Employer[]; onSignOut: () => void }) {
  const [employerId, setEmployerId] = useState(employers[0].employer_id);
  const current = employers.find((e) => e.employer_id === employerId) ?? employers[0];

  return (
    <div className="tone-dark bg-[#0a0c10] min-h-screen text-white font-grotesk">
      <div className="mx-auto max-w-6xl px-5 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Employer console</h1>
          <p className="mt-1 text-sm text-white/60 font-mono tracking-wide">
            Signed in as <strong className="text-white">{current.name}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {employers.length > 1 && (
            <Select value={employerId} onValueChange={setEmployerId}>
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {employers.map((e) => (
                  <SelectItem key={e.employer_id} value={e.employer_id}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button variant="outline" onClick={onSignOut}>
            Sign out
          </Button>
        </div>
      </header>

      <Tabs defaultValue="jobs" className="mt-8">
        <TabsList>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="shortlists">Shortlists</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="mt-6">
          <JobsPanel employerId={employerId} />
        </TabsContent>
        <TabsContent value="shortlists" className="mt-6">
          <ShortlistsPanel employerId={employerId} employerName={current.name} />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Jobs
// ────────────────────────────────────────────────────────────────────

type JobRow = {
  id: string;
  program_slug: string;
  title: string;
  location: string;
  employment_type: string;
  experience_min_yrs: number;
  experience_max_yrs: number | null;
  salary_min_inr: number | null;
  salary_max_inr: number | null;
  description: string;
  skills: string[];
  status: string;
  opens_at: string | null;
  closes_at: string | null;
};

type JobForm = {
  programSlug: (typeof PROGRAM_SLUGS)[number];
  title: string;
  location: string;
  employmentType: (typeof EMPLOYMENT_TYPES)[number];
  experienceMinYrs: number;
  experienceMaxYrs: number | null;
  salaryMinInr: number | null;
  salaryMaxInr: number | null;
  description: string;
  skillsCsv: string;
  status: (typeof JOB_STATUSES)[number];
};

const EMPTY_JOB: JobForm = {
  programSlug: "pharmacovigilance",
  title: "",
  location: "",
  employmentType: "full_time",
  experienceMinYrs: 0,
  experienceMaxYrs: null,
  salaryMinInr: null,
  salaryMaxInr: null,
  description: "",
  skillsCsv: "",
  status: "draft",
};

function JobsPanel({ employerId }: { employerId: string }) {
  const qc = useQueryClient();
  const list = useServerFn(listJobs);
  const upsert = useServerFn(upsertJob);
  const del = useServerFn(deleteJob);
  const [editing, setEditing] = useState<JobRow | null>(null);
  const [form, setForm] = useState(EMPTY_JOB);
  const [open, setOpen] = useState(false);

  const jobsQ = useSuspenseQuery({
    queryKey: ["employer", "jobs", employerId],
    queryFn: () => list({ data: { employerId } }),
  });

  const save = useMutation({
    mutationFn: async () =>
      upsert({
        data: {
          employerId,
          jobId: editing?.id,
          programSlug: form.programSlug,
          title: form.title.trim(),
          location: form.location.trim(),
          employmentType: form.employmentType,
          experienceMinYrs: Number(form.experienceMinYrs) || 0,
          experienceMaxYrs: form.experienceMaxYrs == null ? null : Number(form.experienceMaxYrs),
          salaryMinInr: form.salaryMinInr,
          salaryMaxInr: form.salaryMaxInr,
          description: form.description.trim(),
          skills: form.skillsCsv
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 30),
          status: form.status,
        },
      }),
    onSuccess: () => {
      toast.success(editing ? "Job updated" : "Job created");
      qc.invalidateQueries({ queryKey: ["employer", "jobs", employerId] });
      setOpen(false);
      setEditing(null);
      setForm(EMPTY_JOB);
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });

  const remove = useMutation({
    mutationFn: async (jobId: string) => del({ data: { jobId } }),
    onSuccess: () => {
      toast.success("Draft deleted");
      qc.invalidateQueries({ queryKey: ["employer", "jobs", employerId] });
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  function beginEdit(job: JobRow) {
    setEditing(job);
    setForm({
      programSlug: job.program_slug as (typeof PROGRAM_SLUGS)[number],
      title: job.title,
      location: job.location,
      employmentType: job.employment_type as (typeof EMPLOYMENT_TYPES)[number],
      experienceMinYrs: job.experience_min_yrs,
      experienceMaxYrs: job.experience_max_yrs,
      salaryMinInr: job.salary_min_inr,
      salaryMaxInr: job.salary_max_inr,
      description: job.description,
      skillsCsv: (job.skills ?? []).join(", "),
      status: job.status as (typeof JOB_STATUSES)[number],
    });
    setOpen(true);
  }

  const jobs = (jobsQ.data?.jobs ?? []) as JobRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-foreground">Open roles</h2>
        <Button
          onClick={() => {
            setEditing(null);
            setForm(EMPTY_JOB);
            setOpen(true);
          }}
        >
          New role
        </Button>
      </div>

      {jobsQ.isLoading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : jobs.length === 0 ? (
        <div className="rounded-md border border-border bg-muted/40 p-5 text-sm text-foreground">
          No roles yet. Create your first role — it will start as a draft.
        </div>
      ) : (
        <div className="divide-y divide-border rounded-md border border-border">
          {jobs.map((j) => (
            <div key={j.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <div className="font-medium text-foreground">
                  {j.title}{" "}
                  <span className="ml-2 rounded bg-muted px-2 py-0.5 text-xs uppercase text-muted-foreground">
                    {j.status}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {j.program_slug} · {j.location} · {j.employment_type.replace("_", " ")}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => beginEdit(j)}>
                  Edit
                </Button>
                {j.status === "draft" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove.mutate(j.id)}
                    disabled={remove.isPending}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="space-y-4 rounded-md border border-border bg-card p-5"
        >
          <h3 className="text-base font-medium text-foreground">
            {editing ? "Edit role" : "New role"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Program</Label>
              <Select
                value={form.programSlug}
                onValueChange={(v) =>
                  setForm({ ...form, programSlug: v as (typeof PROGRAM_SLUGS)[number] })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROGRAM_SLUGS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Employment type</Label>
              <Select
                value={form.employmentType}
                onValueChange={(v) =>
                  setForm({ ...form, employmentType: v as (typeof EMPLOYMENT_TYPES)[number] })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>Title</Label>
              <Input
                className="mt-1"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                minLength={3}
                maxLength={160}
                required
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                className="mt-1"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                minLength={2}
                maxLength={120}
                required
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm({ ...form, status: v as (typeof JOB_STATUSES)[number] })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Experience min (yrs)</Label>
              <Input
                className="mt-1"
                type="number"
                step="0.5"
                min={0}
                max={40}
                value={form.experienceMinYrs}
                onChange={(e) => setForm({ ...form, experienceMinYrs: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Experience max (yrs, optional)</Label>
              <Input
                className="mt-1"
                type="number"
                step="0.5"
                min={0}
                max={40}
                value={form.experienceMaxYrs ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experienceMaxYrs: e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Salary min INR (optional)</Label>
              <Input
                className="mt-1"
                type="number"
                min={0}
                value={form.salaryMinInr ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    salaryMinInr: e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Salary max INR (optional)</Label>
              <Input
                className="mt-1"
                type="number"
                min={0}
                value={form.salaryMaxInr ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    salaryMaxInr: e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Skills (comma separated, up to 30)</Label>
              <Input
                className="mt-1"
                value={form.skillsCsv}
                onChange={(e) => setForm({ ...form, skillsCsv: e.target.value })}
                placeholder="ICH-GCP, MedDRA, Argus Safety"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                className="mt-1"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                minLength={20}
                maxLength={8000}
                rows={6}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                20–8000 chars. Include responsibilities, must-have skills, and location
                expectations.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Saving…" : editing ? "Save changes" : "Create role"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setOpen(false);
                setEditing(null);
                setForm(EMPTY_JOB);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Shortlists
// ────────────────────────────────────────────────────────────────────

type ShortlistRow = {
  id: string;
  job_id: string;
  candidate_name: string;
  candidate_email: string | null;
  candidate_phone: string | null;
  candidate_ref: string | null;
  candidate_notes: string | null;
  status: string;
  status_changed_at: string;
  hired_at: string | null;
  placement_id: string | null;
  created_at: string;
};

function ShortlistsPanel({
  employerId,
  employerName,
}: {
  employerId: string;
  employerName: string;
}) {
  const qc = useQueryClient();
  const listJ = useServerFn(listJobs);
  const listS = useServerFn(listShortlists);
  const add = useServerFn(addShortlistCandidate);
  const updateStatus = useServerFn(updateShortlistStatus);
  const del = useServerFn(deleteShortlist);
  const submitEv = useServerFn(submitPlacementEvidence);

  const jobsQ = useSuspenseQuery({
    queryKey: ["employer", "jobs", employerId],
    queryFn: () => listJ({ data: { employerId } }),
  });
  const [jobFilter, setJobFilter] = useState<string>("all");
  const shortlistsQ = useSuspenseQuery({
    queryKey: ["employer", "shortlists", employerId, jobFilter],
    queryFn: () =>
      listS({
        data: { employerId, ...(jobFilter !== "all" ? { jobId: jobFilter } : {}) },
      }),
  });

  const jobs = (jobsQ.data?.jobs ?? []) as JobRow[];
  const rows = (shortlistsQ.data?.shortlists ?? []) as ShortlistRow[];
  const jobLabel = useMemo(() => {
    const m = new Map<string, string>();
    jobs.forEach((j) => m.set(j.id, `${j.title} (${j.program_slug})`));
    return m;
  }, [jobs]);

  // Add candidate form
  const [addJobId, setAddJobId] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const addMut = useMutation({
    mutationFn: async () => {
      if (!addJobId) throw new Error("Pick a role first");
      return add({
        data: {
          jobId: addJobId,
          employerId,
          candidateName: name.trim(),
          candidateEmail: email.trim() || null,
          candidatePhone: phone.trim() || null,
          candidateNotes: notes.trim() || null,
        },
      });
    },
    onSuccess: () => {
      toast.success("Candidate added");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      qc.invalidateQueries({ queryKey: ["employer", "shortlists", employerId] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Add failed"),
  });

  const statusMut = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) =>
      updateStatus({
        data: { shortlistId: id, status: status as (typeof SHORTLIST_STATUSES)[number] },
      }),
    onMutate: async ({ id, status }) => {
      const queryKey = ["employer", "shortlists", employerId, jobFilter];
      await qc.cancelQueries({ queryKey });
      const previousData = qc.getQueryData(queryKey) as { shortlists: ShortlistRow[] } | undefined;
      
      if (previousData?.shortlists) {
        qc.setQueryData(queryKey, {
          ...previousData,
          shortlists: previousData.shortlists.map((row) =>
            row.id === id ? { ...row, status, status_changed_at: new Date().toISOString() } : row
          ),
        });
      }
      return { previousData, queryKey };
    },
    onError: (err, variables, context) => {
      toast.error(err instanceof Error ? err.message : "Update failed");
      if (context?.previousData) {
        qc.setQueryData(context.queryKey, context.previousData);
      }
    },
    onSettled: (data, err, variables, context) => {
      if (context?.queryKey) {
        qc.invalidateQueries({ queryKey: context.queryKey });
      } else {
        qc.invalidateQueries({ queryKey: ["employer", "shortlists", employerId] });
      }
    },
  });

  const delMut = useMutation({
    mutationFn: async (id: string) => del({ data: { shortlistId: id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employer", "shortlists", employerId] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  function exportCsv() {
    const header = [
      "candidate_name",
      "candidate_email",
      "candidate_phone",
      "candidate_ref",
      "status",
      "status_changed_at",
      "hired_at",
      "placement_id",
      "job_title",
      "program_slug",
      "notes",
    ];
    const jobMeta = new Map(jobs.map((j) => [j.id, j] as const));
    const csvSafe = (v: string | null | undefined) => {
      const s = (v ?? "").replace(/"/g, '""').replace(/[\r\n]+/g, " ");
      return `"${s}"`;
    };
    const body = rows.map((r) => {
      const j = jobMeta.get(r.job_id);
      return [
        csvSafe(r.candidate_name),
        csvSafe(r.candidate_email),
        csvSafe(r.candidate_phone),
        csvSafe(r.candidate_ref),
        csvSafe(r.status),
        csvSafe(r.status_changed_at),
        csvSafe(r.hired_at),
        csvSafe(r.placement_id),
        csvSafe(j?.title ?? ""),
        csvSafe(j?.program_slug ?? ""),
        csvSafe(r.candidate_notes),
      ].join(",");
    });
    const csv = [header.join(","), ...body].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shortlist-${employerName.replace(/\s+/g, "-").toLowerCase()}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      {/* Add candidate */}
      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-lg font-medium text-foreground">Add candidate to shortlist</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Role</Label>
            <Select value={addJobId} onValueChange={setAddJobId}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pick a role" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((j) => (
                  <SelectItem key={j.id} value={j.id}>
                    {j.title} · {j.program_slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Candidate name</Label>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              className="mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label>Notes</Label>
            <Textarea
              className="mt-1"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={2000}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={() => addMut.mutate()}
            disabled={addMut.isPending || !name.trim() || !addJobId}
          >
            {addMut.isPending ? "Adding…" : "Add candidate"}
          </Button>
        </div>
      </section>

      {/* Shortlist table */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium text-foreground">Shortlist</h2>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                {jobs.map((j) => (
                  <SelectItem key={j.id} value={j.id}>
                    {j.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={exportCsv} disabled={rows.length === 0}>
            Export CSV
          </Button>
        </div>

        {shortlistsQ.isLoading ? (
          <div className="mt-4 text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="mt-4 rounded-md border border-border bg-muted/40 p-5 text-sm text-foreground">
            No candidates yet.
          </div>
        ) : (
          <div className="mt-6 flex gap-4 overflow-x-auto pb-6 snap-x">
            {SHORTLIST_STATUSES.map(status => {
              const colRows = rows.filter(r => r.status === status);
              return (
                <div key={status} className="flex-shrink-0 w-[320px] rounded-2xl bg-white/[0.02] border border-white/5 p-4 flex flex-col gap-4 snap-center">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/70">{status.replace("_", " ")}</h3>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70 font-mono">{colRows.length}</span>
                  </div>
                  <div className="flex flex-col gap-3 min-h-[100px]">
                    {colRows.map(r => (
                      <div key={r.id} className="glass-panel-deep rounded-xl p-4 shadow-xl border border-white/10 flex flex-col gap-3 transition-transform hover:scale-[1.02]">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <div className="font-bold font-grotesk text-white text-base truncate">{r.candidate_name}</div>
                            <div className="text-xs text-white/50 truncate">{jobLabel.get(r.job_id) ?? "—"}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Remove ${r.candidate_name} from shortlist`}
                            className="h-6 w-6 shrink-0 text-white/40 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                            onClick={() => delMut.mutate(r.id)}
                            disabled={delMut.isPending}
                          >
                            ×
                          </Button>
                        </div>
                        <div className="text-xs text-white/60 space-y-1 bg-black/20 rounded-lg p-2">
                          {r.candidate_email && <div className="truncate">{r.candidate_email}</div>}
                          {r.candidate_phone && <div>{r.candidate_phone}</div>}
                          {!r.candidate_email && !r.candidate_phone && <div className="italic">No contact info</div>}
                        </div>
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                          <Select
                            value={r.status}
                            onValueChange={(v) => statusMut.mutate({ id: r.id, status: v })}
                          >
                            <SelectTrigger 
                              aria-label={`Change status for ${r.candidate_name}`}
                              className="h-8 w-full bg-white/5 border-white/10 text-xs text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {SHORTLIST_STATUSES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s.replace("_", " ")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {r.status === "hired" && !r.placement_id && (
                          <div className="mt-1">
                            <EvidenceForm
                              shortlistId={r.id}
                              candidateName={r.candidate_name}
                              onSubmit={async (payload) => {
                                await submitEv({ data: { shortlistId: r.id, ...payload } });
                                toast.success("Evidence submitted — pending admin verification");
                                qc.invalidateQueries({
                                  queryKey: ["employer", "shortlists", employerId],
                                });
                              }}
                            />
                          </div>
                        )}
                        {r.placement_id && (
                          <div className="mt-1 text-[11px] text-emerald-400 font-mono text-center bg-emerald-500/10 rounded-full py-1">
                            Evidence verified
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          When you mark a candidate <strong>hired</strong>, submit signed evidence here. It appends
          to the Verified Placement Ledger once an Arzon admin approves it.
        </p>
      </section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Evidence submission (inline)
// ────────────────────────────────────────────────────────────────────

function EvidenceForm({
  shortlistId,
  candidateName,
  onSubmit,
}: {
  shortlistId: string;
  candidateName: string;
  onSubmit: (payload: {
    evidenceSource: (typeof EVIDENCE_SOURCES)[number];
    evidenceRef: string;
    evidenceNotes?: string | null;
    roleTitle: string;
    city: string;
    monthStart: string;
    salaryBandInr?: string | null;
    candidateRef?: string | null;
  }) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<(typeof EVIDENCE_SOURCES)[number]>("signed_offer_letter");
  const [ref, setRef] = useState("");
  const [notes, setNotes] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
  });
  const [band, setBand] = useState("");
  const initials = candidateName
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 3);
  const [candRef, setCandRef] = useState(initials);
  const [busy, setBusy] = useState(false);

  if (!open) {
    return (
      <Button size="sm" onClick={() => setOpen(true)}>
        Submit evidence
      </Button>
    );
  }

  async function submit() {
    setBusy(true);
    try {
      await onSubmit({
        evidenceSource: source,
        evidenceRef: ref.trim(),
        evidenceNotes: notes.trim() || null,
        roleTitle: role.trim(),
        city: city.trim(),
        monthStart: month,
        salaryBandInr: band.trim() || null,
        candidateRef: candRef.trim() || null,
      });
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="mt-2 space-y-3 rounded-md border border-border bg-muted/30 p-3 text-left"
      data-shortlist-id={shortlistId}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label>Evidence type</Label>
          <Select
            value={source}
            onValueChange={(v) => setSource(v as (typeof EVIDENCE_SOURCES)[number])}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EVIDENCE_SOURCES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Month of joining</Label>
          <Input
            className="mt-1"
            type="date"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div>
          <Label>Role title</Label>
          <Input className="mt-1" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div>
          <Label>City</Label>
          <Input className="mt-1" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <Label>Salary band (optional)</Label>
          <Input
            className="mt-1"
            value={band}
            onChange={(e) => setBand(e.target.value)}
            placeholder="4–6 LPA"
          />
        </div>
        <div>
          <Label>Candidate reference (initials + city)</Label>
          <Input className="mt-1" value={candRef} onChange={(e) => setCandRef(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label>Evidence reference (storage path, HR email, LinkedIn URL, etc.)</Label>
          <Input className="mt-1" value={ref} onChange={(e) => setRef(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label>Notes (optional)</Label>
          <Textarea
            className="mt-1"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={1000}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={submit}
          disabled={busy || !ref.trim() || !role.trim() || !city.trim()}
        >
          {busy ? "Submitting…" : "Submit to ledger"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
