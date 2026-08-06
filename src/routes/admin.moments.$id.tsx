import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  Upload,
  Trash2,
  Star,
  StarOff,
  ArrowLeft,
  ImageOff,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import {
  getMomentAdmin,
  updateMoment,
  addMomentImage,
  removeMomentImage,
  setMomentCover,
  updateMomentImage,
} from "@/lib/moments.functions";
import {
  MOMENT_CATEGORIES,
  MOMENT_IMAGE_CAP,
  MOMENT_STATUSES,
  MOMENTS_BUCKET,
  MOMENTS_PREFIX,
  type MomentDetail,
} from "@/lib/moments.types";

export const Route = createFileRoute("/admin/moments/$id")({
  head: () => ({
    meta: [{ title: "Edit moment · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminMomentEditor,
});

function AdminMomentEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const load = useServerFn(getMomentAdmin);
  const save = useServerFn(updateMoment);
  const addImage = useServerFn(addMomentImage);
  const removeImage = useServerFn(removeMomentImage);
  const setCover = useServerFn(setMomentCover);
  const editImage = useServerFn(updateMomentImage);

  const [moment, setMoment] = useState<MomentDetail | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    subtitle: "",
    body: "",
    event_date: "",
    location: "",
    category: "other",
    status: "draft",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function reload() {
    try {
      const res = await load({ data: { id } });
      const m = res.moment;
      setMoment(m);
      setForm({
        slug: m.slug,
        title: m.title,
        subtitle: m.subtitle ?? "",
        body: m.body,
        event_date: m.event_date,
        location: m.location ?? "",
        category: m.category,
        status: m.status,
      });
      setLoadError(null);
    } catch (e) {
      setLoadError((e as Error).message);
    }
  }

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function onSave() {
    setSaving(true);
    try {
      await save({
        data: {
          id,
          slug: form.slug || undefined,
          title: form.title,
          subtitle: form.subtitle || null,
          body: form.body,
          event_date: form.event_date,
          location: form.location || null,
          category: form.category as (typeof MOMENT_CATEGORIES)[number],
          status: form.status as (typeof MOMENT_STATUSES)[number],
        },
      });
      toast.success("Saved");
      reload();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function onUpload(files: FileList | null) {
    if (!files || !moment) return;
    const remaining = MOMENT_IMAGE_CAP - moment.images.length;
    if (remaining <= 0) {
      toast.error(`This moment already has ${MOMENT_IMAGE_CAP} photos.`);
      return;
    }
    const list = Array.from(files).slice(0, remaining);
    if (list.length < files.length) {
      toast.warning(`Only ${list.length} photos uploaded - cap is ${MOMENT_IMAGE_CAP} per moment.`);
    }
    setUploading(true);
    try {
      for (const file of list) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${MOMENTS_PREFIX}/${moment.id}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(MOMENTS_BUCKET)
          .upload(path, file, { contentType: file.type, upsert: false });
        if (upErr) throw upErr;
        await addImage({
          data: {
            moment_id: moment.id,
            storage_path: path,
            alt: moment.title,
          },
        });
      }
      toast.success(`${list.length} photo${list.length === 1 ? "" : "s"} uploaded`);
      reload();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function onRemoveImage(imgId: string) {
    if (!confirm("Remove this photo?")) return;
    try {
      await removeImage({ data: { id: imgId } });
      reload();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  async function onMakeCover(imgId: string) {
    if (!moment) return;
    try {
      await setCover({ data: { moment_id: moment.id, image_id: imgId } });
      reload();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  async function onEditCaption(imgId: string, alt: string, caption: string) {
    try {
      await editImage({ data: { id: imgId, alt, caption: caption || null } });
      toast.success("Updated");
      reload();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (loadError) {
    return (
      <div className="px-4 py-6 sm:px-8">
        <p className="text-sm text-red-300">{loadError}</p>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/admin/moments">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>
      </div>
    );
  }
  if (!moment) {
    return <div className="px-4 py-6 text-sm text-muted-foreground sm:px-8">Loading…</div>;
  }

  const remaining = MOMENT_IMAGE_CAP - moment.images.length;

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/moments">
              <ArrowLeft className="mr-1.5 h-4 w-4" /> All moments
            </Link>
          </Button>
          {moment.status === "published" ? (
            <Button asChild variant="ghost" size="sm">
              <Link to="/moments/$slug" params={{ slug: moment.slug }} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" /> View live
              </Link>
            </Button>
          ) : null}
        </div>
        <Button onClick={onSave} disabled={saving}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 motion-safe:animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save changes
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-muted p-5">
          <h2 className="font-grotesk text-lg font-semibold text-foreground">Story</h2>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <Field label="Title">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Field>
            <Field label="Subtitle (one-line teaser)">
              <Input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Event date">
                <Input
                  type="date"
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                />
              </Field>
              <Field label="Location">
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-10 w-full rounded-md border border-border bg-muted px-3 text-sm text-foreground"
                >
                  {MOMENT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="h-10 w-full rounded-md border border-border bg-muted px-3 text-sm text-foreground"
                >
                  {MOMENT_STATUSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Slug (URL)">
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated from title"
              />
            </Field>
            <Field label="Body">
              <Textarea
                rows={8}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="The story behind the photos."
              />
            </Field>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-muted p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-grotesk text-lg font-semibold text-foreground">
                Photos ({moment.images.length}/{MOMENT_IMAGE_CAP})
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {remaining > 0
                  ? `You can add ${remaining} more.`
                  : "Photo cap reached. Delete one to add another."}
              </p>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || remaining <= 0}
              size="sm"
            >
              {uploading ? (
                <Loader2 className="mr-2 h-4 w-4 motion-safe:animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload photos
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => onUpload(e.target.files)}
            />
          </div>

          {moment.images.length === 0 ? (
            <div className="mt-6 flex h-40 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
              <ImageOff className="mr-2 h-6 w-6" /> No photos yet
            </div>
          ) : (
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {moment.images.map((img) => (
                <li
                  key={img.id}
                  className="overflow-hidden rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm"
                >
                  <img src={img.url} alt={img.alt} className="aspect-square w-full object-cover" />
                  <div className="space-y-2 p-3">
                    <Input
                      defaultValue={img.alt}
                      placeholder="Alt text (accessibility)"
                      className="h-8 text-xs"
                      onBlur={(e) => {
                        if (e.currentTarget.value !== img.alt) {
                          onEditCaption(img.id, e.currentTarget.value, img.caption ?? "");
                        }
                      }}
                    />
                    <Input
                      defaultValue={img.caption ?? ""}
                      placeholder="Caption (optional)"
                      className="h-8 text-xs"
                      onBlur={(e) => {
                        if ((e.currentTarget.value || null) !== img.caption) {
                          onEditCaption(img.id, img.alt, e.currentTarget.value);
                        }
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onMakeCover(img.id)}
                        title="Use as cover"
                      >
                        {moment.cover_image_id === img.id ? (
                          <Star className="h-4 w-4 text-amber-300" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-300 hover:text-red-200"
                        onClick={() => onRemoveImage(img.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs text-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
