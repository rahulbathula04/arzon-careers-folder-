import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, ImageOff, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listMomentsAdmin, createMoment, deleteMoment } from "@/lib/moments.functions";
import type { MomentSummary } from "@/lib/moments.types";

export const Route = createFileRoute("/admin/moments")({
  head: () => ({
    meta: [{ title: "Moments · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminMomentsList,
});

function AdminMomentsList() {
  const navigate = useNavigate();
  const list = useServerFn(listMomentsAdmin);
  const create = useServerFn(createMoment);
  const remove = useServerFn(deleteMoment);
  const [moments, setMoments] = useState<MomentSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function reload() {
    try {
      const res = await list();
      setMoments(res.moments);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onCreate() {
    setCreating(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const res = await create({
        data: {
          title: "Untitled moment",
          event_date: today,
          category: "other",
          status: "draft",
        },
      });
      toast.success("Draft created");
      navigate({ to: "/admin/moments/$id", params: { id: res.id } });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setCreating(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this moment and all its photos? This cannot be undone.")) return;
    try {
      await remove({ data: { id } });
      toast.success("Deleted");
      reload();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="h-display text-foreground">Arzon Moments</h1>
          <p className="mt-1 text-sm text-foreground">
            Stories with up to 10 photos each. Published moments appear at /moments.
          </p>
        </div>
        <Button onClick={onCreate} disabled={creating}>
          {creating ? (
            <Loader2 className="mr-2 h-4 w-4 motion-safe:animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          New moment
        </Button>
      </div>

      <div className="mt-8">
        {error ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : moments === null ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : moments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No moments yet. Click "New moment" to start the first story.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moments.map((m) => (
              <li key={m.id} className="overflow-hidden rounded-xl border border-border bg-muted">
                <div className="aspect-[4/3] w-full bg-black/30">
                  {m.cover_url ? (
                    <img src={m.cover_url} alt={m.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground/70">
                      <ImageOff className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-micro font-bold uppercase tracking-wider ${
                        m.status === "published"
                          ? "bg-sky-500/15 text-sky-300"
                          : "bg-accent text-foreground"
                      }`}
                    >
                      {m.status}
                    </span>
                    <span className="text-micro uppercase tracking-wider text-muted-foreground">
                      {m.category}
                    </span>
                  </div>
                  <h2 className="mt-2 font-grotesk text-base font-semibold text-foreground">
                    {m.title}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {m.event_date} · {m.image_count}/10 photos
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/admin/moments/$id" params={{ id: m.id }}>
                        <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                      </Link>
                    </Button>
                    {m.status === "published" ? (
                      <Button asChild size="sm" variant="ghost">
                        <Link to="/moments/$slug" params={{ slug: m.slug }} target="_blank">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> View
                        </Link>
                      </Button>
                    ) : null}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-auto text-red-300 hover:text-red-200"
                      onClick={() => onDelete(m.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
