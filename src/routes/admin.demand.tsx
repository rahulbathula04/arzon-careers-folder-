import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import {
  Loader2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  CircleDot,
} from "lucide-react";

export const Route = createFileRoute("/admin/demand")({
  head: () => ({
    meta: [{ title: "Demand tracks · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminDemandPage,
});

type Gate = "loading" | "unauth" | "forbidden" | "ready";

type Track = {
  id: string;
  slug: string;
  title: string;
  category: string;
  pitch: string | null;
  status: "voting" | "building" | "live";
  votes_count: number;
  vote_threshold: number;
  founding_cap: number;
  founding_filled: number;
  eta_days: number;
  build_started_at: string | null;
  launch_eta: string | null;
  live_course_slug: string | null;
  created_at: string;
};

type Milestone = {
  id: string;
  track_id: string;
  label: string;
  status: "pending" | "in_progress" | "done";
  order_index: number;
  completed_at: string | null;
};

type Partner = {
  id: string;
  track_id: string;
  type: "mentor" | "internship";
  name: string;
  logo_url: string | null;
  confirmed_at: string | null;
};

type Vote = {
  id: string;
  track_id: string;
  name: string;
  phone: string;
  email: string | null;
  experience_level: string | null;
  why: string | null;
  verified_at: string | null;
  reservation_status: "pending" | "paid" | "refunded" | "waived";
  amount_inr: number;
  is_founding: boolean;
  created_at: string;
};

const INPUT =
  "w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none";
const LABEL = "mb-1 block text-xs font-medium text-foreground";

function AdminDemandPage() {
  const navigate = useNavigate();
  const { status: gate } = useAdminGate(["admin"]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [reloadKey, setReloadKey] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("demand_tracks")
        .select("*")
        .order("status", { ascending: true })
        .order("votes_count", { ascending: false });
      if (cancelled) return;
      if (error) {
        toast.error(error.message);
        return;
      }
      setTracks((data ?? []) as Track[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, reloadKey]);

  if (gate === "loading") {
    return (
      <div className="flex items-center gap-2 p-8 text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (gate === "unauth") {
    return (
      <div className="mx-auto max-w-md p-8 text-center text-sm text-foreground">
        You need to sign in.{" "}
        <Link to="/admin/login" className="underline">
          Go to sign in
        </Link>
      </div>
    );
  }
  if (gate === "forbidden") {
    return (
      <div className="mx-auto max-w-md p-8 text-center text-sm text-foreground">
        Admin only.
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
      </div>
    );
  }

  const reload = () => setReloadKey((k) => k + 1);

  return (
    <div className="space-y-8">
      <header>
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
          Admin
        </p>
        <h1 className="h-display mt-2 text-foreground">Demand tracks</h1>
        <p className="mt-2 max-w-2xl text-sm text-foreground">
          Open or close tracks, edit thresholds and ETAs, log build milestones, confirm mentor and
          internship partners, and audit the verified votes behind each track.
        </p>
      </header>

      <NewTrackForm onCreated={reload} />

      <section>
        <h2 className="mb-3 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          {tracks.length} track{tracks.length === 1 ? "" : "s"}
        </h2>
        {tracks.length === 0 ? (
          <p className="rounded-2xl border border-border bg-muted/60 p-6 text-sm text-foreground">
            No tracks yet. Create the first one above.
          </p>
        ) : (
          <div className="space-y-3">
            {tracks.map((t) => (
              <TrackRow
                key={t.id}
                track={t}
                expanded={expanded === t.id}
                onToggle={() => setExpanded((e) => (e === t.id ? null : t.id))}
                onChanged={reload}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function NewTrackForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("tech");
  const [pitch, setPitch] = useState("");
  const [busy, setBusy] = useState(false);

  function slugify(s: string) {
    return s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !pitch.trim()) {
      toast.error("Title and pitch are required.");
      return;
    }
    setBusy(true);
    try {
      const slug = slugify(title) || `track-${Date.now().toString(36)}`;
      const { error } = await supabase.from("demand_tracks").insert({
        slug,
        title: title.trim(),
        category,
        pitch: pitch.trim(),
        status: "voting",
      });
      if (error) throw error;
      toast.success("Track created");
      setTitle("");
      setPitch("");
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 rounded-2xl border border-border bg-muted/60 p-5"
    >
      <h2 className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
        <Plus className="mr-1 inline h-3 w-3" /> New track
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Title</label>
          <input
            className={INPUT}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Clinical Trial Operations"
            required
          />
        </div>
        <div>
          <label className={LABEL}>Category</label>
          <select className={INPUT} value={category} onChange={(e) => setCategory(e.target.value)}>
            {[
              "engineering",
              "healthcare",
              "life-sciences",
              "business",
              "tech",
              "agriculture",
              "design",
              "other",
            ].map((c) => (
              <option key={c} value={c} className="bg-[#0a0c10]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={LABEL}>Pitch</label>
        <textarea
          className={`${INPUT} min-h-[72px]`}
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          placeholder="One short paragraph: who it's for, what they'll build, why now."
          required
        />
      </div>
      <Button type="submit" disabled={busy}>
        {busy ? "Creating…" : "Create track"}
      </Button>
    </form>
  );
}

function TrackRow({
  track,
  expanded,
  onToggle,
  onChanged,
}: {
  track: Track;
  expanded: boolean;
  onToggle: () => void;
  onChanged: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Track>(track);

  useEffect(() => {
    setForm(track);
  }, [track]);

  async function save() {
    setBusy(true);
    try {
      const { error } = await supabase
        .from("demand_tracks")
        .update({
          title: form.title,
          category: form.category,
          pitch: form.pitch,
          status: form.status,
          vote_threshold: form.vote_threshold,
          founding_cap: form.founding_cap,
          eta_days: form.eta_days,
          launch_eta: form.launch_eta,
          live_course_slug: form.live_course_slug || null,
          build_started_at:
            form.status === "building" && !track.build_started_at
              ? new Date().toISOString()
              : form.build_started_at,
        })
        .eq("id", track.id);
      if (error) throw error;
      toast.success("Saved");
      setEdit(false);
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (
      !confirm(
        `Delete "${track.title}"? Milestones and partners are removed; votes are archived (recoverable from the audit log).`,
      )
    )
      return;
    setBusy(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      await supabase.from("demand_milestones").delete().eq("track_id", track.id);
      await supabase.from("demand_partners").delete().eq("track_id", track.id);
      await supabase
        .from("demand_votes")
        .update({ deleted_at: new Date().toISOString(), deleted_by: userData.user?.id ?? null })
        .eq("track_id", track.id)
        .is("deleted_at", null);
      const { error } = await supabase.from("demand_tracks").delete().eq("id", track.id);
      if (error) throw error;
      toast.success("Deleted");
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  const statusColor =
    track.status === "live"
      ? "bg-accent-glow/20 text-eyebrow-strong"
      : track.status === "building"
        ? "bg-amber-500/20 text-amber-200"
        : "bg-accent-glow/20 text-eyebrow-strong";

  return (
    <div className="rounded-2xl border border-border bg-muted/60">
      <div className="flex flex-wrap items-center gap-3 p-4">
        <button
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Toggle"
        >
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="truncate text-base font-semibold text-foreground">{track.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            /{track.slug} · {track.category}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-micro font-semibold uppercase tracking-wider ${statusColor}`}
        >
          {track.status}
        </span>
        <span className="text-xs text-foreground">
          {track.votes_count}/{track.vote_threshold} votes
        </span>
        <span className="text-xs text-foreground">
          {track.founding_filled}/{track.founding_cap} founding
        </span>
        <Button size="sm" variant="secondary" disabled={busy} onClick={() => setEdit((v) => !v)}>
          {edit ? "Cancel" : "Edit"}
        </Button>
        <Button size="sm" variant="destructive" disabled={busy} onClick={remove}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {edit && (
        <div className="border-t border-border p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Title</label>
              <input
                className={INPUT}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className={LABEL}>Category</label>
              <select
                className={INPUT}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {[
                  "engineering",
                  "healthcare",
                  "life-sciences",
                  "business",
                  "tech",
                  "agriculture",
                  "design",
                  "other",
                ].map((c) => (
                  <option key={c} value={c} className="bg-[#0a0c10]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={LABEL}>Pitch</label>
            <textarea
              className={`${INPUT} min-h-[72px]`}
              value={form.pitch ?? ""}
              onChange={(e) => setForm({ ...form, pitch: e.target.value })}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <label className={LABEL}>Status</label>
              <select
                className={INPUT}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Track["status"] })}
              >
                <option value="voting" className="bg-[#0a0c10]">
                  voting
                </option>
                <option value="building" className="bg-[#0a0c10]">
                  building
                </option>
                <option value="live" className="bg-[#0a0c10]">
                  live
                </option>
              </select>
            </div>
            <div>
              <label className={LABEL}>Vote threshold</label>
              <input
                type="number"
                min={1}
                className={INPUT}
                value={form.vote_threshold}
                onChange={(e) =>
                  setForm({ ...form, vote_threshold: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <label className={LABEL}>Founding cap</label>
              <input
                type="number"
                min={0}
                className={INPUT}
                value={form.founding_cap}
                onChange={(e) => setForm({ ...form, founding_cap: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className={LABEL}>ETA (days)</label>
              <input
                type="number"
                min={0}
                className={INPUT}
                value={form.eta_days}
                onChange={(e) => setForm({ ...form, eta_days: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Launch ETA (date)</label>
              <input
                type="date"
                className={INPUT}
                value={form.launch_eta ?? ""}
                onChange={(e) => setForm({ ...form, launch_eta: e.target.value || null })}
              />
            </div>
            <div>
              <label className={LABEL}>Live course slug (when status = live)</label>
              <input
                className={INPUT}
                value={form.live_course_slug ?? ""}
                onChange={(e) => setForm({ ...form, live_course_slug: e.target.value })}
                placeholder="e.g. clinical-trial-ops"
              />
            </div>
          </div>
          <Button size="sm" disabled={busy} onClick={save}>
            {busy ? "Saving…" : "Save changes"}
          </Button>
        </div>
      )}

      {expanded && (
        <div className="border-t border-border p-4 space-y-6">
          <MilestonesPanel trackId={track.id} />
          <PartnersPanel trackId={track.id} />
          <VotesPanel trackId={track.id} />
        </div>
      )}
    </div>
  );
}

function MilestonesPanel({ trackId }: { trackId: string }) {
  const [items, setItems] = useState<Milestone[]>([]);
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("demand_milestones")
        .select("*")
        .eq("track_id", trackId)
        .order("order_index", { ascending: true });
      if (cancelled) return;
      if (error) {
        toast.error(error.message);
        return;
      }
      setItems((data ?? []) as Milestone[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [trackId, bump]);

  const nextIndex = useMemo(() => (items.at(-1)?.order_index ?? 0) + 10, [items]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("demand_milestones").insert({
        track_id: trackId,
        label: label.trim(),
        order_index: nextIndex,
        status: "pending",
      });
      if (error) throw error;
      setLabel("");
      setBump((b) => b + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function cycle(m: Milestone) {
    const next: Milestone["status"] =
      m.status === "pending" ? "in_progress" : m.status === "in_progress" ? "done" : "pending";
    const { error } = await supabase
      .from("demand_milestones")
      .update({
        status: next,
        completed_at: next === "done" ? new Date().toISOString() : null,
      })
      .eq("id", m.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBump((b) => b + 1);
  }

  async function remove(id: string) {
    const { error } = await supabase.from("demand_milestones").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBump((b) => b + 1);
  }

  return (
    <section>
      <h3 className="mb-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
        Milestones
      </h3>
      <div className="space-y-1">
        {items.length === 0 && <p className="text-xs text-muted-foreground">No milestones yet.</p>}
        {items.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-2 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm"
          >
            <button
              onClick={() => cycle(m)}
              className="text-foreground hover:text-foreground"
              aria-label="Toggle status"
            >
              {m.status === "done" ? (
                <CheckCircle2 className="h-4 w-4 text-sky-400" />
              ) : m.status === "in_progress" ? (
                <CircleDot className="h-4 w-4 text-amber-400" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </button>
            <span className="flex-1 text-foreground/90">{m.label}</span>
            <span className="text-micro uppercase tracking-wider text-muted-foreground">
              {m.status}
            </span>
            <button
              onClick={() => remove(m.id)}
              className="text-muted-foreground hover:text-rose-300"
              aria-label="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={add} className="mt-2 flex gap-2">
        <input
          className={INPUT}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Curriculum review with industry panel"
        />
        <Button type="submit" size="sm" disabled={busy}>
          Add
        </Button>
      </form>
    </section>
  );
}

function PartnersPanel({ trackId }: { trackId: string }) {
  const [items, setItems] = useState<Partner[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<Partner["type"]>("mentor");
  const [logoUrl, setLogoUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("demand_partners")
        .select("*")
        .eq("track_id", trackId)
        .order("type", { ascending: true })
        .order("name", { ascending: true });
      if (cancelled) return;
      if (error) {
        toast.error(error.message);
        return;
      }
      setItems((data ?? []) as Partner[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [trackId, bump]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("demand_partners").insert({
        track_id: trackId,
        type,
        name: name.trim(),
        logo_url: logoUrl.trim() || null,
      });
      if (error) throw error;
      setName("");
      setLogoUrl("");
      setBump((b) => b + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function toggleConfirm(p: Partner) {
    const { error } = await supabase
      .from("demand_partners")
      .update({
        confirmed_at: p.confirmed_at ? null : new Date().toISOString(),
      })
      .eq("id", p.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBump((b) => b + 1);
  }

  async function remove(id: string) {
    const { error } = await supabase.from("demand_partners").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBump((b) => b + 1);
  }

  return (
    <section>
      <h3 className="mb-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
        Partners
      </h3>
      <div className="space-y-1">
        {items.length === 0 && <p className="text-xs text-muted-foreground">No partners yet.</p>}
        {items.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-2 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm"
          >
            <span className="rounded-full bg-accent px-2 py-0.5 text-micro uppercase tracking-wider text-foreground">
              {p.type}
            </span>
            {p.logo_url && <img src={p.logo_url} alt="" className="h-5 w-5 rounded object-cover" />}
            <span className="flex-1 text-foreground/90">{p.name}</span>
            <button
              onClick={() => toggleConfirm(p)}
              className={`text-micro uppercase tracking-wider ${p.confirmed_at ? "text-eyebrow" : "text-muted-foreground hover:text-foreground"}`}
            >
              {p.confirmed_at ? "Confirmed" : "Mark confirmed"}
            </button>
            <button
              onClick={() => remove(p.id)}
              className="text-muted-foreground hover:text-rose-300"
              aria-label="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={add} className="mt-2 grid gap-2 sm:grid-cols-[120px_1fr_1fr_auto]">
        <select
          className={INPUT}
          value={type}
          onChange={(e) => setType(e.target.value as Partner["type"])}
        >
          <option value="mentor" className="bg-[#0a0c10]">
            mentor
          </option>
          <option value="internship" className="bg-[#0a0c10]">
            internship
          </option>
        </select>
        <input
          className={INPUT}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Partner name"
        />
        <input
          className={INPUT}
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="Logo URL (optional)"
        />
        <Button type="submit" size="sm" disabled={busy}>
          Add
        </Button>
      </form>
    </section>
  );
}

function VotesPanel({ trackId }: { trackId: string }) {
  const [items, setItems] = useState<Vote[]>([]);
  const [bump, setBump] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("demand_votes")
        .select("*")
        .eq("track_id", trackId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(200);
      if (cancelled) return;
      if (error) {
        toast.error(error.message);
        return;
      }
      setItems((data ?? []) as Vote[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [trackId, bump]);

  async function setReservation(v: Vote, status: Vote["reservation_status"]) {
    setBusy(v.id);
    try {
      const { error } = await supabase
        .from("demand_votes")
        .update({ reservation_status: status })
        .eq("id", v.id);
      if (error) throw error;
      setBump((b) => b + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(null);
    }
  }

  async function toggleFounding(v: Vote) {
    setBusy(v.id);
    try {
      const { error } = await supabase
        .from("demand_votes")
        .update({ is_founding: !v.is_founding })
        .eq("id", v.id);
      if (error) throw error;
      setBump((b) => b + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(null);
    }
  }

  async function remove(v: Vote) {
    if (!confirm(`Archive vote from ${v.name}? It can be restored from the audit log.`)) return;
    setBusy(v.id);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("demand_votes")
        .update({ deleted_at: new Date().toISOString(), deleted_by: userData.user?.id ?? null })
        .eq("id", v.id);
      if (error) throw error;
      setBump((b) => b + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section>
      <h3 className="mb-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
        Votes ({items.length})
      </h3>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">No votes yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Exp</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Founding</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v.id} className="border-t border-border text-foreground">
                  <td className="px-3 py-2 font-medium text-foreground">{v.name}</td>
                  <td className="px-3 py-2">{v.phone}</td>
                  <td className="px-3 py-2">{v.email ?? "-"}</td>
                  <td className="px-3 py-2">{v.experience_level ?? "-"}</td>
                  <td className="px-3 py-2">
                    <select
                      className="rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-xs"
                      value={v.reservation_status}
                      disabled={busy === v.id}
                      onChange={(e) =>
                        setReservation(v, e.target.value as Vote["reservation_status"])
                      }
                    >
                      {["pending", "paid", "refunded", "waived"].map((s) => (
                        <option key={s} value={s} className="bg-[#0a0c10]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      disabled={busy === v.id}
                      onClick={() => toggleFounding(v)}
                      className={`rounded-full px-2 py-0.5 text-micro uppercase tracking-wider ${v.is_founding ? "bg-accent-glow/25 text-eyebrow-strong" : "bg-accent text-muted-foreground"}`}
                    >
                      {v.is_founding ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {new Date(v.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => remove(v)}
                      className="text-muted-foreground hover:text-rose-300"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
