import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { r as recordAdminExport, e as exportCsvAudited, d as dateStampedFilename } from "./admin-export.functions-BoaqXv52.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, ak as Download, av as Plus, aJ as Image, ac as FileText, bd as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./createSsrRpc-BV3sOdh8.mjs";
import "./auth-middleware-CGVBerDj.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./moments.types-CDdnLKsa.mjs";
import "./enrolment.functions-Cs_77DUe.mjs";
import "../_libs/zod.mjs";
import "./enrolmentTiers-CKOrj6Lb.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/workflow__serde.mjs";
import "../_libs/ai-sdk__openai.mjs";
import "../_libs/lovable.dev__webhooks-js.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./client.server-DUn3rRvm.mjs";
import "./redis.server-jD5sLB4g.mjs";
import "../_libs/react-email__render.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__text.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__button.mjs";
import "../_libs/react-email__hr.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
const PDF_ACCEPT = "application/pdf";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_PDF_BYTES = 15 * 1024 * 1024;
function AdminCertificatesPage() {
  const recordExport = useServerFn(recordAdminExport);
  const navigate = useNavigate();
  const {
    status
  } = useAdminGate(["admin"]);
  const [items, setItems] = reactExports.useState([]);
  const [reloadKey, setReloadKey] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      const {
        data,
        error
      } = await supabase.from("certificates").select("*").is("deleted_at", null).order("sort_order", {
        ascending: true
      }).order("created_at", {
        ascending: true
      });
      if (cancelled) return;
      if (error) {
        toast.error(error.message);
        return;
      }
      setItems(data ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [status, reloadKey]);
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-8 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Loading…"
    ] });
  }
  if (status === "unauth") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-8 text-center text-sm text-foreground", children: [
      "You need to sign in.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", className: "underline", children: "Go to sign in" })
    ] });
  }
  if (status === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-8 text-center text-sm text-foreground", children: [
      "Admin only.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", onClick: async () => {
        await supabase.auth.signOut();
        navigate({
          to: "/admin/login"
        });
      }, children: "Sign out" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2 text-foreground", children: "Certificates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm text-foreground", children: "These show up in the “You graduate with X certificates” section on the landing page. The count auto-updates from the number of published rows. Upload a sample image (shown in the card) and optionally the source PDF (linked from the card)." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "secondary", size: "sm", disabled: items.length === 0, onClick: () => {
        const columns = [{
          key: "title",
          header: "Title"
        }, {
          key: "issuer",
          header: "Issuer"
        }, {
          key: "description",
          header: "Description"
        }, {
          key: "image_url",
          header: "Image URL"
        }, {
          key: "pdf_url",
          header: "PDF URL"
        }, {
          key: "sort_order",
          header: "Sort"
        }, {
          key: "is_published",
          header: "Published"
        }, {
          key: "created_at",
          header: "Created"
        }, {
          key: "id",
          header: "ID"
        }];
        exportCsvAudited(recordExport, "certificates", dateStampedFilename("certificates"), items, columns).catch((e) => toast.error(e instanceof Error ? e.message : "Export blocked"));
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1.5 h-3.5 w-3.5" }),
        " Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewCertificateForm, { onCreated: () => setReloadKey((k) => k + 1), nextSort: (items.at(-1)?.sort_order ?? 0) + 10 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: [
        items.length,
        " certificate",
        items.length === 1 ? "" : "s"
      ] }),
      items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-border bg-muted/60 p-6 text-sm text-foreground", children: "No certificates yet. Add the first one above." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CertificateRow, { cert: c, onChanged: () => setReloadKey((k) => k + 1) }, c.id)) })
    ] })
  ] });
}
function NewCertificateForm({
  onCreated,
  nextSort
}) {
  const [title, setTitle] = reactExports.useState("");
  const [issuer, setIssuer] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) {
      toast.error("Title and issuer are required.");
      return;
    }
    setBusy(true);
    try {
      const {
        error
      } = await supabase.from("certificates").insert({
        title: title.trim(),
        issuer: issuer.trim(),
        description: description.trim() || null,
        sort_order: nextSort,
        is_published: true
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-3 rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 inline h-3 w-3" }),
      " Add certificate"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", value: title, onChange: setTitle, placeholder: "Internship Completion Certificate", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Issuer", value: issuer, onChange: setIssuer, placeholder: "Arzon Global", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Short description (optional)", value: description, onChange: setDescription, placeholder: "Branded with ISO 9001 · MSME · MCA seals. Performance-graded.", textarea: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, children: busy ? "Adding…" : "Add certificate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-xs text-muted-foreground", children: "You can upload the sample image and PDF after creating it." })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  textarea
}) {
  const common = "w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-foreground", children: label }),
    textarea ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: `${common} min-h-[72px]`, value, onChange: (e) => onChange(e.target.value), placeholder, required }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: common, value, onChange: (e) => onChange(e.target.value), placeholder, required })
  ] });
}
function CertificateRow({
  cert,
  onChanged
}) {
  const imgRef = reactExports.useRef(null);
  const pdfRef = reactExports.useRef(null);
  const [busy, setBusy] = reactExports.useState(false);
  async function uploadFile(file, kind) {
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
      const {
        error: upErr
      } = await supabase.storage.from("certificates").upload(path, file, {
        contentType: file.type,
        upsert: true,
        cacheControl: "3600"
      });
      if (upErr) throw upErr;
      const {
        data: pub
      } = supabase.storage.from("certificates").getPublicUrl(path);
      const update = kind === "image" ? {
        image_url: pub.publicUrl
      } : {
        pdf_url: pub.publicUrl
      };
      const {
        error: dbErr
      } = await supabase.from("certificates").update(update).eq("id", cert.id);
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
      const {
        error
      } = await supabase.from("certificates").update({
        is_published: !cert.is_published
      }).eq("id", cert.id);
      if (error) throw error;
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }
  async function onDelete() {
    if (!confirm(`Archive "${cert.title}"? It will be hidden from the site but can be restored from the audit log.`)) return;
    setBusy(true);
    try {
      const {
        data: userData
      } = await supabase.auth.getUser();
      const {
        error
      } = await supabase.from("certificates").update({
        deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
        deleted_by: userData.user?.id ?? null
      }).eq("id", cert.id);
      if (error) throw error;
      toast.success("Archived");
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Archive failed");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 rounded-2xl border border-border bg-muted/60 p-4 sm:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[1.41/1] w-full shrink-0 overflow-hidden rounded-lg bg-[#0a0c10]/40 sm:w-56", children: [
      cert.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cert.image_url, alt: cert.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-xs text-muted-foreground", children: "No image" }),
      !cert.is_published && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-micro font-semibold uppercase tracking-wider text-black", children: "Hidden" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: cert.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground", children: [
          "Issued by ",
          cert.issuer
        ] }),
        cert.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground", children: cert.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: imgRef, type: "file", accept: IMAGE_ACCEPT, className: "hidden", onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f, "image");
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", disabled: busy, onClick: () => imgRef.current?.click(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3.5 w-3.5" }),
          " ",
          cert.image_url ? "Replace image" : "Upload image"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: pdfRef, type: "file", accept: PDF_ACCEPT, className: "hidden", onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f, "pdf");
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", variant: "secondary", disabled: busy, onClick: () => pdfRef.current?.click(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
          " ",
          cert.pdf_url ? "Replace PDF" : "Upload PDF"
        ] }),
        cert.pdf_url && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: cert.pdf_url, target: "_blank", rel: "noopener noreferrer", className: "text-xs text-primary-glow underline", children: "View PDF" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "secondary", disabled: busy, onClick: togglePublished, children: cert.is_published ? "Hide" : "Publish" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", variant: "destructive", disabled: busy, onClick: onDelete, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " Delete"
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminCertificatesPage as component
};
