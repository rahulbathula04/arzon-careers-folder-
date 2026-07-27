import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DWuACypr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { aE as Route$f, B as Button, aF as getMomentAdmin, aG as updateMoment, aH as addMomentImage, aK as updateMomentImage, aJ as setMomentCover, aI as removeMomentImage } from "./router-CvdLERTV.mjs";
import { I as Input } from "./input-BXbB9R4U.mjs";
import { T as Textarea } from "./textarea-CeZdNrC4.mjs";
import { L as Label } from "./label-CCvxiayl.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { d as MOMENT_IMAGE_CAP, a as MOMENT_CATEGORIES, M as MOMENT_STATUSES, c as MOMENTS_PREFIX, b as MOMENTS_BUCKET } from "./moments.types-CDdnLKsa.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { a6 as ArrowLeft, aQ as ExternalLink, a4 as LoaderCircle, bW as Save, bM as Upload, aY as ImageOff, aX as Star, c1 as StarOff, bd as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
function AdminMomentEditor() {
  const {
    id
  } = Route$f.useParams();
  useNavigate();
  const load = useServerFn(getMomentAdmin);
  const save = useServerFn(updateMoment);
  const addImage = useServerFn(addMomentImage);
  const removeImage = useServerFn(removeMomentImage);
  const setCover = useServerFn(setMomentCover);
  const editImage = useServerFn(updateMomentImage);
  const [moment, setMoment] = reactExports.useState(null);
  const [loadError, setLoadError] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    slug: "",
    title: "",
    subtitle: "",
    body: "",
    event_date: "",
    location: "",
    category: "other",
    status: "draft"
  });
  const [saving, setSaving] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  async function reload() {
    try {
      const res = await load({
        data: {
          id
        }
      });
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
        status: m.status
      });
      setLoadError(null);
    } catch (e) {
      setLoadError(e.message);
    }
  }
  reactExports.useEffect(() => {
    reload();
  }, [id]);
  async function onSave() {
    setSaving(true);
    try {
      await save({
        data: {
          id,
          slug: form.slug || void 0,
          title: form.title,
          subtitle: form.subtitle || null,
          body: form.body,
          event_date: form.event_date,
          location: form.location || null,
          category: form.category,
          status: form.status
        }
      });
      toast.success("Saved");
      reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }
  async function onUpload(files) {
    if (!files || !moment) return;
    const remaining2 = MOMENT_IMAGE_CAP - moment.images.length;
    if (remaining2 <= 0) {
      toast.error(`This moment already has ${MOMENT_IMAGE_CAP} photos.`);
      return;
    }
    const list = Array.from(files).slice(0, remaining2);
    if (list.length < files.length) {
      toast.warning(`Only ${list.length} photos uploaded — cap is ${MOMENT_IMAGE_CAP} per moment.`);
    }
    setUploading(true);
    try {
      for (const file of list) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${MOMENTS_PREFIX}/${moment.id}/${crypto.randomUUID()}.${ext}`;
        const {
          error: upErr
        } = await supabase.storage.from(MOMENTS_BUCKET).upload(path, file, {
          contentType: file.type,
          upsert: false
        });
        if (upErr) throw upErr;
        await addImage({
          data: {
            moment_id: moment.id,
            storage_path: path,
            alt: moment.title
          }
        });
      }
      toast.success(`${list.length} photo${list.length === 1 ? "" : "s"} uploaded`);
      reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }
  async function onRemoveImage(imgId) {
    if (!confirm("Remove this photo?")) return;
    try {
      await removeImage({
        data: {
          id: imgId
        }
      });
      reload();
    } catch (e) {
      toast.error(e.message);
    }
  }
  async function onMakeCover(imgId) {
    if (!moment) return;
    try {
      await setCover({
        data: {
          moment_id: moment.id,
          image_id: imgId
        }
      });
      reload();
    } catch (e) {
      toast.error(e.message);
    }
  }
  async function onEditCaption(imgId, alt, caption) {
    try {
      await editImage({
        data: {
          id: imgId,
          alt,
          caption: caption || null
        }
      });
      toast.success("Updated");
      reload();
    } catch (e) {
      toast.error(e.message);
    }
  }
  if (loadError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 sm:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-300", children: loadError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/moments", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        " Back"
      ] }) })
    ] });
  }
  if (!moment) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6 text-sm text-muted-foreground sm:px-8", children: "Loading…" });
  }
  const remaining = MOMENT_IMAGE_CAP - moment.images.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 sm:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/moments", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1.5 h-4 w-4" }),
          " All moments"
        ] }) }),
        moment.status === "published" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/moments/$slug", params: {
          slug: moment.slug
        }, target: "_blank", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-1.5 h-4 w-4" }),
          " View live"
        ] }) }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onSave, disabled: saving, children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 motion-safe:animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
        "Save changes"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-muted p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-lg font-semibold text-foreground", children: "Story" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-1 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subtitle (one-line teaser)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.subtitle, onChange: (e) => setForm({
            ...form,
            subtitle: e.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Event date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.event_date, onChange: (e) => setForm({
              ...form,
              event_date: e.target.value
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.location, onChange: (e) => setForm({
              ...form,
              location: e.target.value
            }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.category, onChange: (e) => setForm({
              ...form,
              category: e.target.value
            }), className: "h-10 w-full rounded-md border border-border bg-muted px-3 text-sm text-foreground", children: MOMENT_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.status, onChange: (e) => setForm({
              ...form,
              status: e.target.value
            }), className: "h-10 w-full rounded-md border border-border bg-muted px-3 text-sm text-foreground", children: MOMENT_STATUSES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug (URL)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.slug, onChange: (e) => setForm({
            ...form,
            slug: e.target.value
          }), placeholder: "auto-generated from title" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 8, value: form.body, onChange: (e) => setForm({
            ...form,
            body: e.target.value
          }), placeholder: "The story behind the photos." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-muted p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-grotesk text-lg font-semibold text-foreground", children: [
              "Photos (",
              moment.images.length,
              "/",
              MOMENT_IMAGE_CAP,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: remaining > 0 ? `You can add ${remaining} more.` : "Photo cap reached. Delete one to add another." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => fileInputRef.current?.click(), disabled: uploading || remaining <= 0, size: "sm", children: [
            uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 motion-safe:animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mr-2 h-4 w-4" }),
            "Upload photos"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, hidden: true, onChange: (e) => onUpload(e.target.files) })
        ] }),
        moment.images.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex h-40 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "mr-2 h-6 w-6" }),
          " No photos yet"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid grid-cols-2 gap-3", children: moment.images.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "overflow-hidden rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img.url, alt: img.alt, className: "aspect-square w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: img.alt, placeholder: "Alt text (accessibility)", className: "h-8 text-xs", onBlur: (e) => {
              if (e.currentTarget.value !== img.alt) {
                onEditCaption(img.id, e.currentTarget.value, img.caption ?? "");
              }
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: img.caption ?? "", placeholder: "Caption (optional)", className: "h-8 text-xs", onBlur: (e) => {
              if ((e.currentTarget.value || null) !== img.caption) {
                onEditCaption(img.id, img.alt, e.currentTarget.value);
              }
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => onMakeCover(img.id), title: "Use as cover", children: moment.cover_image_id === img.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-amber-300" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StarOff, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-red-300 hover:text-red-200", onClick: () => onRemoveImage(img.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] }, img.id)) })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children })
  ] });
}
export {
  AdminMomentEditor as component
};
