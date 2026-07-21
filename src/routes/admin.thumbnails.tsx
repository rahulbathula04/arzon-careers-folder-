import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { COURSES } from "@/data/courses";
import { thumbFor } from "@/data/courseThumbs";
import {
  ThumbnailCropDialog,
  type ThumbnailCropResult,
} from "@/components/admin/ThumbnailCropDialog";
import { useAdminGate } from "@/hooks/useAdminGate";

export const Route = createFileRoute("/admin/thumbnails")({
  head: () => ({
    meta: [{ title: "Course thumbnails · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminThumbnailsPage,
});

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 5 * 1024 * 1024;

function AdminThumbnailsPage() {
  const navigate = useNavigate();
  const { status } = useAdminGate(["admin"]);
  const [overrides, setOverrides] = useState<Record<string, { url: string; updatedAt: string }>>(
    {},
  );
  const [bumpKey, setBumpKey] = useState(0); // cache-bust previews after upload

  // Load current overrides whenever the page becomes ready.
  useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    async function load() {
      const { data, error } = await supabase
        .from("course_thumbnail_overrides")
        .select("slug,image_url,updated_at")
        .is("deleted_at", null);
      if (cancelled) return;
      if (error) {
        toast.error(error.message);
        return;
      }
      const map: Record<string, { url: string; updatedAt: string }> = {};
      for (const row of data ?? []) {
        map[row.slug] = { url: row.image_url, updatedAt: row.updated_at };
      }
      setOverrides(map);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [status, bumpKey]);

  if (status === "loading") {
    return <CenteredMessage>Checking access…</CenteredMessage>;
  }
  if (status === "unauth") {
    return (
      <CenteredMessage>
        You need to sign in.{" "}
        <Link to="/admin/login" className="underline">
          Go to sign in
        </Link>
      </CenteredMessage>
    );
  }
  if (status === "forbidden") {
    return (
      <CenteredMessage>
        Your account isn't an admin yet. Ask the project owner to grant you the admin role, then
        refresh this page.
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
      </CenteredMessage>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Content
          </p>
          <h1 className="h-display mt-2 text-foreground">Course thumbnails</h1>
          <p className="mt-1 text-sm text-foreground">
            Upload a new image to replace the cover for any course. Changes go live across the site
            immediately. Max 5 MB · JPEG, PNG, or WebP.
          </p>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course) => (
          <ThumbnailRow
            key={course.slug}
            slug={course.slug}
            title={course.title}
            currentSrc={
              overrides[course.slug]
                ? `${overrides[course.slug].url}?v=${bumpKey}`
                : thumbFor(course.slug, course.category)
            }
            hasOverride={Boolean(overrides[course.slug])}
            onChanged={() => setBumpKey((k) => k + 1)}
          />
        ))}
      </div>
    </div>
  );
}

function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-5 text-center text-sm text-foreground">
      <div>{children}</div>
    </div>
  );
}

function ThumbnailRow({
  slug,
  title,
  currentSrc,
  hasOverride,
  onChanged,
}: {
  slug: string;
  title: string;
  currentSrc: string;
  hasOverride: boolean;
  onChanged: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  function onPick(file: File) {
    if (!ACCEPT.split(",").includes(file.type)) {
      toast.error("Only JPEG, PNG, or WebP files are allowed.");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("File too large. Max 5 MB.");
      return;
    }
    // Open the crop dialog instead of uploading immediately.
    setPendingFile(file);
  }

  async function onCropConfirm(result: ThumbnailCropResult) {
    setPendingFile(null);
    setBusy(true);
    try {
      const path = `${slug}.${result.ext}`;

      const { error: upErr } = await supabase.storage
        .from("course-thumbnails")
        .upload(path, result.blob, {
          upsert: true,
          contentType: result.contentType,
          cacheControl: "3600",
        });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("course-thumbnails").getPublicUrl(path);
      const publicUrl = pub.publicUrl;

      const { error: dbErr } = await supabase
        .from("course_thumbnail_overrides")
        .upsert({ slug, image_url: publicUrl }, { onConflict: "slug" });
      if (dbErr) throw dbErr;

      toast.success(`${title} thumbnail updated`);
      onChanged();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onCropCancel() {
    setPendingFile(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onReset() {
    if (!hasOverride) return;
    if (!confirm(`Reset "${title}" to the default thumbnail?`)) return;
    setBusy(true);
    try {
      const { data: list } = await supabase.storage
        .from("course-thumbnails")
        .list("", { search: slug });
      const matches = (list ?? []).filter((o) => o.name.startsWith(`${slug}.`));
      if (matches.length) {
        await supabase.storage.from("course-thumbnails").remove(matches.map((m) => m.name));
      }
      const { data: userData } = await supabase.auth.getUser();
      const { error: delErr } = await supabase
        .from("course_thumbnail_overrides")
        .update({ deleted_at: new Date().toISOString(), deleted_by: userData.user?.id ?? null })
        .eq("slug", slug);
      if (delErr) throw delErr;
      toast.success(`${title} reset to default`);
      onChanged();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Reset failed";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/60">
      <div className="relative aspect-[16/9] w-full bg-black/40">
        <img src={currentSrc} alt="" className="h-full w-full object-cover" />
        {hasOverride && (
          <span className="absolute left-2 top-2 rounded-full bg-accent-glow/90 px-2 py-0.5 text-micro font-semibold uppercase tracking-wider text-foreground">
            Custom
          </span>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
            {slug}
          </p>
          <p className="text-sm font-semibold text-foreground">{title}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onPick(f);
            }}
          />
          <Button type="button" size="sm" disabled={busy} onClick={() => fileRef.current?.click()}>
            {busy ? "Working…" : hasOverride ? "Replace" : "Upload"}
          </Button>
          {hasOverride && (
            <Button type="button" size="sm" variant="secondary" disabled={busy} onClick={onReset}>
              Reset
            </Button>
          )}
        </div>
      </div>
      <ThumbnailCropDialog
        open={pendingFile !== null}
        file={pendingFile}
        title={title}
        onCancel={onCropCancel}
        onConfirm={onCropConfirm}
      />
    </div>
  );
}
