import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  createAdminInvite,
  listAdminInvites,
  revokeAdminInvite,
} from "@/lib/admin-invites.functions";
import { useAdminGate } from "@/hooks/useAdminGate";
import { exportCsvAudited, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { recordAdminExport } from "@/lib/admin-export.functions";
import { Download } from "lucide-react";

export const Route = createFileRoute("/admin/invites")({
  head: () => ({
    meta: [{ title: "Invites · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminInvitesPage,
});

type Invite = {
  id: string;
  email: string;
  role: string;
  token: string;
  expires_at: string;
  created_at: string;
  used_at: string | null;
};

function AdminInvitesPage() {
  const { status } = useAdminGate(["admin"]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "reviewer" | "support">("reviewer");
  const [creating, setCreating] = useState(false);

  const create = useServerFn(createAdminInvite);
  const list = useServerFn(listAdminInvites);
  const revoke = useServerFn(revokeAdminInvite);
  const recordExport = useServerFn(recordAdminExport);

  useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await list();
        if (!cancelled) setInvites(res.invites as Invite[]);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load invites");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, list]);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await create({ data: { email, role } });
      setInvites((prev) => [res.invite as Invite, ...prev]);
      setEmail("");
      toast.success(`Invite created for ${res.invite.email}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not create invite");
    } finally {
      setCreating(false);
    }
  }

  async function onRevoke(id: string) {
    if (!confirm("Revoke this invite?")) return;
    try {
      await revoke({ data: { id } });
      setInvites((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not revoke");
    }
  }

  function inviteUrl(token: string) {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/admin/accept-invite?token=${token}`;
  }

  if (status !== "ready") return null;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Workspace
          </p>
          <h1 className="h-display mt-2">Staff invites</h1>
          <p className="mt-1 text-sm text-foreground">
            Create one-time signup links. Expires in 14 days.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={invites.length === 0}
          onClick={() => {
            const columns: CsvColumn<Invite>[] = [
              { key: "email", header: "Email" },
              { key: "role", header: "Role" },
              { key: "created_at", header: "Created" },
              { key: "expires_at", header: "Expires" },
              { key: "used_at", header: "Used" },
              { key: "id", header: "ID" },
            ];
            exportCsvAudited(
              recordExport,
              "admin_invites",
              dateStampedFilename("admin-invites"),
              invites,
              columns,
            ).catch((e) => toast.error(e instanceof Error ? e.message : "Export blocked"));
          }}
        >
          <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
        </Button>
      </header>

      <form
        onSubmit={onCreate}
        className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-muted/60 p-4"
      >
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs uppercase text-foreground">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground"
            placeholder="teammate@arzonglobal.com"
          />
        </div>
        <div>
          <label className="block text-xs uppercase text-foreground">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as typeof role)}
            className="mt-1 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground"
          >
            <option value="reviewer">Reviewer</option>
            <option value="support">Support</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Button type="submit" disabled={creating}>
          {creating ? "Creating…" : "Create invite"}
        </Button>
      </form>

      <div className="space-y-3">
        {invites.map((inv) => {
          const used = !!inv.used_at;
          const url = inviteUrl(inv.token);
          return (
            <div key={inv.id} className="rounded-2xl border border-border bg-muted/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{inv.email}</p>
                  <p className="text-xs text-foreground">
                    {inv.role} ·{" "}
                    {used
                      ? `used ${new Date(inv.used_at!).toLocaleString()}`
                      : `expires ${new Date(inv.expires_at).toLocaleDateString()}`}
                  </p>
                </div>
                {!used && (
                  <button
                    onClick={() => onRevoke(inv.id)}
                    className="text-xs text-rose-300 hover:text-rose-200 underline"
                  >
                    Revoke
                  </button>
                )}
              </div>
              {!used && (
                <div className="mt-3 flex items-center gap-2">
                  <input
                    readOnly
                    value={url}
                    className="flex-1 rounded-md border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2 py-1.5 text-xs text-foreground"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(url);
                      toast.success("Link copied");
                    }}
                  >
                    Copy
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        {invites.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground">
            No invites yet. Create one above.
          </div>
        )}
      </div>
    </div>
  );
}
