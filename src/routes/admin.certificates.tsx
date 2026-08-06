import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import { Trash2, Plus, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import { Download } from "lucide-react";
import { exportCsvAudited, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { useServerFn } from "@tanstack/react-start";
import { recordAdminExport } from "@/lib/admin-export.functions";

export const Route = createFileRoute("/admin/certificates")({
  head: () => ({
    meta: [{ title: "Certificates · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminCertificatesPage,
});

type Status = "loading" | "unauth" | "forbidden" | "ready";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  description: string | null;
  image_url: string | null;
  pdf_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
const PDF_ACCEPT = "application/pdf";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_PDF_BYTES = 15 * 1024 * 1024;

function AdminCertificatesPage() {
  const recordExport = useServerFn(recordAdminExport);
  const navigate = useNavigate();
  const { status } = useAdminGate(["admin"]);
  const [items, setItems] = useState<Certificate[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .is("deleted_at", null)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (cancelled) return;
      if (error) {
        toast.error(error.message);
        return;
      }
      setItems((data ?? []) as Certificate[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [status, reloadKey]);

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 p-8 text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (status === "unauth") {
    return (
      <div className="mx-auto max-w-md p-8 text-center text-sm text-foreground">
        You need to sign in.{" "}
        <Link to="/admin/login" className="underline">
          Go to sign in
        </Link>
      </div>
    );
  }
  if (status === "forbidden") {
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

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin
          </p>
          <h1 className="h-display mt-2 text-foreground">Certificates</h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground">
            These show up in the “You graduate with X certificates” section on the landing page. The
            count auto-updates from the number of published rows. Upload a sample image (shown in
            the card) and optionally the source PDF (linked from the card).
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={items.length === 0}
          onClick={() => {
            const columns: CsvColumn<Certificate>[] = [
              { key: "title", header: "Title" },
              { key: "issuer", header: "Issuer" },
              { key: "description", header: "Description" },
              { key: "image_url", header: "Image URL" },
              { key: "pdf_url", header: "PDF URL" },
              { key: "sort_order", header: "Sort" },
              { key: "is_published", header: "Published" },
              { key: "created_at", header: "Created" },
              { key: "id", header: "ID" },
            ];
            exportCsvAudited(
              recordExport,
              "certificates",
              dateStampedFilename("certificates"),
              items,
              columns,
            ).catch((e) => toast.error(e instanceof Error ? e.message : "Export blocked"));
          }}
        >
          <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
        </Button>
      </header>

      <NewCertificateForm
        onCreated={() => setReloadKey((k) => k + 1)}
        nextSort={(items.at(-1)?.sort_order ?? 0) + 10}
      />

      <section>
        <h2 className="mb-3 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          {items.length} certificate{items.length === 1 ? "" : "s"}
        </h2>
        {items.length === 0 ? (
          <p className="rounded-2xl border border-border bg-muted/60 p-6 text-sm text-foreground">
            No certificates yet. Add the first one above.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((c) => (
              <CertificateRow key={c.id} cert={c} onChanged={() => setReloadKey((k) => k + 1)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function NewCertificateForm({ onCreated, nextSort }: { onCreated: () => void; nextSort: number }) {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) {
      toast.error("Title and issuer are required.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.from("certificates").insert({
        title: title.trim(),
        issuer: issuer.trim(),
        description: description.trim() || null,
        sort_order: nextSort,
        is_published: true,
      });
      if (error) throw error;
      toast.success("Certificate added");
      setTitle("");
      setIssuer("");
      setDescription("");
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add");
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
        <Plus className="mr-1 inline h-3 w-3" /> Add certificate
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Internship Completion Certificate"
          required
        />
        <Field
          label="Issuer"
          value={issuer}
          onChange={setIssuer}
          placeholder="Arzon Global"
          required
        />
      </div>
      <Field
        label="Short description (optional)"
        value={description}
        onChange={setDescription}
        placeholder="Branded with ISO 9001 · MSME · MCA seals. Performance-graded."
        textarea
      />
      <div>
        <Button type="submit" disabled={busy}>
          {busy ? "Adding…" : "Add certificate"}
        </Button>
        <span className="ml-3 text-xs text-muted-foreground">
          You can upload the sample image and PDF after creating it.
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const common =
    "w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none";
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-foreground">{label}</span>
      {textarea ? (
        <textarea
          className={`${common} min-h-[72px]`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          className={common}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  );
}

function CertificateRow({ cert, onChanged }: { cert: Certificate; onChanged: () => void }) {
  const imgRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function uploadFile(file: File, kind: "image" | "pdf") {
    const accept = kind === "image" ? IMAGE_ACCEPT.split(",") : [PDF_ACCEPT];
    const max = kind === "image" ? MAX_IMAGE_BYTES : MAX_PDF_BYTES;
    if (!accept.includes(file.type)) {
      toast.error(kind === "image" ? "Use JPEG, PNG, or WebP." : "Must be a PDF.");
      return;
    }
    if (file.size > max) {
      toast.error(`File too large. Max ${kind === "image" ? "5 MB" : "15 MB"}.`);
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || (kind === "pdf" ? "pdf" : "jpg");
      const path = `${cert.id}/${kind}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("certificates")
        .upload(path, file, { contentType: file.type, upsert: true, cacheControl: "3600" });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("certificates").getPublicUrl(path);
      const update = kind === "image" ? { image_url: pub.publicUrl } : { pdf_url: pub.publicUrl };
      const { error: dbErr } = await supabase.from("certificates").update(update).eq("id", cert.id);
      if (dbErr) throw dbErr;
      toast.success(`${kind === "image" ? "Image" : "PDF"} uploaded`);
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (imgRef.current) imgRef.current.value = "";
      if (pdfRef.current) pdfRef.current.value = "";
    }
  }

  async function togglePublished() {
    setBusy(true);
    try {
      const { error } = await supabase
        .from("certificates")
        .update({ is_published: !cert.is_published })
        .eq("id", cert.id);
      if (error) throw error;
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (
      !confirm(
        `Archive "${cert.title}"? It will be hidden from the site but can be restored from the audit log.`,
      )
    )
      return;
    setBusy(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("certificates")
        .update({ deleted_at: new Date().toISOString(), deleted_by: userData.user?.id ?? null })
        .eq("id", cert.id);
      if (error) throw error;
      toast.success("Archived");
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Archive failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/60 p-4 sm:flex-row">
      <div className="relative aspect-[1.41/1] w-full shrink-0 overflow-hidden rounded-lg bg-[#0a0c10]/40 sm:w-56">
        {cert.image_url ? (
          <img src={cert.image_url} alt={cert.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
        {!cert.is_published && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-micro font-semibold uppercase tracking-wider text-black">
            Hidden
          </span>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div>
          <p className="text-base font-semibold text-foreground">{cert.title}</p>
          <p className="text-xs text-foreground">Issued by {cert.issuer}</p>
          {cert.description && <p className="mt-1 text-sm text-foreground">{cert.description}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <input
            ref={imgRef}
            type="file"
            accept={IMAGE_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadFile(f, "image");
            }}
          />
          <Button type="button" size="sm" disabled={busy} onClick={() => imgRef.current?.click()}>
            <ImageIcon className="h-3.5 w-3.5" />{" "}
            {cert.image_url ? "Replace image" : "Upload image"}
          </Button>
          <input
            ref={pdfRef}
            type="file"
            accept={PDF_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadFile(f, "pdf");
            }}
          />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={busy}
            onClick={() => pdfRef.current?.click()}
          >
            <FileText className="h-3.5 w-3.5" /> {cert.pdf_url ? "Replace PDF" : "Upload PDF"}
          </Button>
          {cert.pdf_url && (
            <a
              href={cert.pdf_url}
              target="_blank" rel="noopener noreferrer"
              className="text-xs text-primary-glow underline"
            >
              View PDF
            </a>
          )}
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={busy}
            onClick={togglePublished}
          >
            {cert.is_published ? "Hide" : "Publish"}
          </Button>
          <Button type="button" size="sm" variant="destructive" disabled={busy} onClick={onDelete}>
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
