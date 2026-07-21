import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { listAdmins, grantAdmin, revokeAdmin, type AdminRow } from "@/lib/admin-roles.functions";
import {
  listRoleAssignments,
  grantWorkspaceRole,
  revokeWorkspaceRole,
  type RoleAssignment,
  type WorkspaceRole,
} from "@/lib/admin-roles-extended.functions";
import { useAdminGate } from "@/hooks/useAdminGate";
import { exportCsvAudited, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { useServerFn } from "@tanstack/react-start";
import { recordAdminExport } from "@/lib/admin-export.functions";
import { Download } from "lucide-react";

const ROLE_DESCRIPTIONS: Record<WorkspaceRole, string> = {
  admin: "Full access — settings, roles, all data, audit log.",
  reviewer: "Reviews applications. Sees leads & applications.",
  support: "Can contact leads. Sees leads & applications.",
  viewer: "Read /admin/results with PII masked. No export.",
  analyst: "Read /admin/results with full PII. No export.",
  exporter: "Analyst + can download CSV exports.",
};

export const Route = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [{ title: "Admin roles · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminRolesPage,
});

function AdminRolesPage() {
  const recordExport = useServerFn(recordAdminExport);
  const navigate = useNavigate();
  const { status, userId: currentUserId } = useAdminGate(["admin"]);
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  // Workspace-role state
  const listWs = useServerFn(listRoleAssignments);
  const grantWs = useServerFn(grantWorkspaceRole);
  const revokeWs = useServerFn(revokeWorkspaceRole);
  const [wsRows, setWsRows] = useState<RoleAssignment[]>([]);
  const [wsEmail, setWsEmail] = useState("");
  const [wsRole, setWsRole] = useState<WorkspaceRole>("viewer");
  const [wsBusy, setWsBusy] = useState(false);

  async function refreshWs() {
    try {
      setWsRows(await listWs());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load roles");
    }
  }
  async function onGrantWs(e: React.FormEvent) {
    e.preventDefault();
    if (!wsEmail.trim()) return;
    setWsBusy(true);
    try {
      await grantWs({ data: { email: wsEmail.trim(), role: wsRole } });
      toast.success(`Granted ${wsRole} to ${wsEmail.trim()}`);
      setWsEmail("");
      await refreshWs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Grant failed");
    } finally {
      setWsBusy(false);
    }
  }
  async function onRevokeWs(row: RoleAssignment) {
    if (!confirm(`Revoke ${row.role} from ${row.email ?? row.userId}?`)) return;
    setWsBusy(true);
    try {
      await revokeWs({ data: { userId: row.userId, role: row.role } });
      toast.success("Role revoked");
      await refreshWs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Revoke failed");
    } finally {
      setWsBusy(false);
    }
  }

  async function refresh() {
    try {
      const rows = await listAdmins();
      setAdmins(rows);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load admins");
    }
  }

  useEffect(() => {
    if (status === "ready") {
      refresh();
      refreshWs();
    }
  }, [status]);

  async function onGrant(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    try {
      await grantAdmin({ data: { email: email.trim() } });
      toast.success(`Granted admin to ${email.trim()}`);
      setEmail("");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Grant failed");
    } finally {
      setBusy(false);
    }
  }

  async function onRevoke(row: AdminRow) {
    if (!confirm(`Revoke admin role from ${row.email ?? row.userId}?`)) return;
    setBusy(true);
    try {
      await revokeAdmin({ data: { userId: row.userId } });
      toast.success("Admin role revoked");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Revoke failed");
    } finally {
      setBusy(false);
    }
  }

  if (status === "loading") return <Centered>Checking access…</Centered>;
  if (status === "unauth")
    return (
      <Centered>
        You need to sign in.{" "}
        <Link to="/admin/login" className="underline">
          Go to sign in
        </Link>
      </Centered>
    );
  if (status === "forbidden")
    return (
      <Centered>
        Your account isn't an admin.
        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/admin/login" });
            }}
          >
            Sign out
          </Button>
        </div>
      </Centered>
    );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Workspace
          </p>
          <h1 className="h-display mt-2 text-foreground">Staff roles</h1>
          <p className="mt-1 text-sm text-foreground">
            Grant or revoke admin access. The user must already have an account.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={admins.length === 0}
          onClick={() => {
            const columns: CsvColumn<AdminRow>[] = [
              { key: "email", header: "Email" },
              { key: "userId", header: "User ID" },
            ];
            exportCsvAudited(
              recordExport,
              "admin_roles",
              dateStampedFilename("admin-roles"),
              admins,
              columns,
            ).catch((e) => toast.error(e instanceof Error ? e.message : "Export blocked"));
          }}
        >
          <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
        </Button>
      </header>

      <form
        onSubmit={onGrant}
        className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/60 p-5 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1 block text-xs uppercase tracking-wider text-foreground">
            Grant admin to email
          </label>
          <Input
            type="email"
            required
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
          />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Working…" : "Grant admin"}
        </Button>
      </form>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Current admins ({admins.length})
        </h2>
        <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-muted/60">
          {admins.length === 0 && <li className="p-4 text-sm text-foreground">No admins yet.</li>}
          {admins.map((a) => (
            <li key={a.userId} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {a.email ?? "(no email)"}
                  {a.userId === currentUserId && (
                    <span className="ml-2 rounded-full bg-accent-glow/20 px-2 py-0.5 text-micro uppercase tracking-wider text-eyebrow">
                      You
                    </span>
                  )}
                </p>
                <p className="font-mono text-micro text-muted-foreground">{a.userId}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                disabled={busy || a.userId === currentUserId}
                onClick={() => onRevoke(a)}
              >
                Revoke
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Workspace roles ({wsRows.length})
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Fine-grained access for /admin/results and other staff pages.
          </p>
        </div>

        <form
          onSubmit={onGrantWs}
          className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/60 p-5 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label className="mb-1 block text-xs uppercase tracking-wider text-foreground">
              User email
            </label>
            <Input
              type="email"
              required
              placeholder="user@example.com"
              value={wsEmail}
              onChange={(e) => setWsEmail(e.target.value)}
              disabled={wsBusy}
            />
          </div>
          <div className="sm:w-48">
            <label className="mb-1 block text-xs uppercase tracking-wider text-foreground">
              Role
            </label>
            <select
              value={wsRole}
              onChange={(e) => setWsRole(e.target.value as WorkspaceRole)}
              className="h-10 w-full rounded-md border border-border bg-muted px-3 text-sm text-foreground"
              disabled={wsBusy}
            >
              {(Object.keys(ROLE_DESCRIPTIONS) as WorkspaceRole[]).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={wsBusy}>
            {wsBusy ? "Working…" : "Grant role"}
          </Button>
        </form>

        <p className="text-micro text-muted-foreground">
          <strong className="text-foreground">{wsRole}</strong>: {ROLE_DESCRIPTIONS[wsRole]}
        </p>

        <ul className="divide-y divide-border rounded-xl border border-border bg-muted/60">
          {wsRows.length === 0 && (
            <li className="p-4 text-sm text-foreground">No workspace roles assigned yet.</li>
          )}
          {wsRows.map((a) => (
            <li
              key={`${a.userId}-${a.role}`}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {a.email ?? "(no email)"}
                  <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-micro uppercase tracking-wider text-primary-glow">
                    {a.role}
                  </span>
                </p>
                <p className="font-mono text-micro text-muted-foreground">{a.userId}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                disabled={wsBusy}
                onClick={() => onRevokeWs(a)}
              >
                Revoke
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-5 text-center text-sm text-foreground">
      <div>{children}</div>
    </div>
  );
}
