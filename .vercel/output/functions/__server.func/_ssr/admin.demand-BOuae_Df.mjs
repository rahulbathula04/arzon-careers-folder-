import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAdminGate, B as Button } from "./router-CvdLERTV.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/upstash__redis.mjs";
import { a4 as LoaderCircle, av as Plus, b0 as ChevronDown, aO as ChevronRight, bd as Trash2, I as CircleCheck, bS as CircleDot, bb as Circle } from "../_libs/lucide-react.mjs";
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
const INPUT = "w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none";
const LABEL = "mb-1 block text-xs font-medium text-foreground";
function AdminDemandPage() {
  const navigate = useNavigate();
  const {
    status: gate
  } = useAdminGate(["admin"]);
  const [tracks, setTracks] = reactExports.useState([]);
  const [reloadKey, setReloadKey] = reactExports.useState(0);
  const [expanded, setExpanded] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      const {
        data,
        error
      } = await supabase.from("demand_tracks").select("*").order("status", {
        ascending: true
      }).order("votes_count", {
        ascending: false
      });
      if (cancelled) return;
      if (error) {
        toast.error(error.message);
        return;
      }
      setTracks(data ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, reloadKey]);
  if (gate === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-8 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 motion-safe:animate-spin" }),
      " Loading…"
    ] });
  }
  if (gate === "unauth") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md p-8 text-center text-sm text-foreground", children: [
      "You need to sign in.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", className: "underline", children: "Go to sign in" })
    ] });
  }
  if (gate === "forbidden") {
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
  const reload = () => setReloadKey((k) => k + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow", children: "Admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display mt-2 text-foreground", children: "Demand tracks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm text-foreground", children: "Open or close tracks, edit thresholds and ETAs, log build milestones, confirm mentor and internship partners, and audit the verified votes behind each track." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewTrackForm, { onCreated: reload }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: [
        tracks.length,
        " track",
        tracks.length === 1 ? "" : "s"
      ] }),
      tracks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-border bg-muted/60 p-6 text-sm text-foreground", children: "No tracks yet. Create the first one above." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: tracks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrackRow, { track: t, expanded: expanded === t.id, onToggle: () => setExpanded((e) => e === t.id ? null : t.id), onChanged: reload }, t.id)) })
    ] })
  ] });
}
function NewTrackForm({
  onCreated
}) {
  const [title, setTitle] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("tech");
  const [pitch, setPitch] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  function slugify(s) {
    return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !pitch.trim()) {
      toast.error("Title and pitch are required.");
      return;
    }
    setBusy(true);
    try {
      const slug = slugify(title) || `track-${Date.now().toString(36)}`;
      const {
        error
      } = await supabase.from("demand_tracks").insert({
        slug,
        title: title.trim(),
        category,
        pitch: pitch.trim(),
        status: "voting"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-3 rounded-2xl border border-border bg-muted/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 inline h-3 w-3" }),
      " New track"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: INPUT, value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Clinical Trial Operations", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: INPUT, value: category, onChange: (e) => setCategory(e.target.value), children: ["engineering", "healthcare", "life-sciences", "business", "tech", "agriculture", "design", "other"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, className: "bg-[#0a0c10]", children: c }, c)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Pitch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: `${INPUT} min-h-[72px]`, value: pitch, onChange: (e) => setPitch(e.target.value), placeholder: "One short paragraph: who it's for, what they'll build, why now.", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, children: busy ? "Creating…" : "Create track" })
  ] });
}
function TrackRow({
  track,
  expanded,
  onToggle,
  onChanged
}) {
  const [busy, setBusy] = reactExports.useState(false);
  const [edit, setEdit] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(track);
  reactExports.useEffect(() => {
    setForm(track);
  }, [track]);
  async function save() {
    setBusy(true);
    try {
      const {
        error
      } = await supabase.from("demand_tracks").update({
        title: form.title,
        category: form.category,
        pitch: form.pitch,
        status: form.status,
        vote_threshold: form.vote_threshold,
        founding_cap: form.founding_cap,
        eta_days: form.eta_days,
        launch_eta: form.launch_eta,
        live_course_slug: form.live_course_slug || null,
        build_started_at: form.status === "building" && !track.build_started_at ? (/* @__PURE__ */ new Date()).toISOString() : form.build_started_at
      }).eq("id", track.id);
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
    if (!confirm(`Delete "${track.title}"? Milestones and partners are removed; votes are archived (recoverable from the audit log).`)) return;
    setBusy(true);
    try {
      const {
        data: userData
      } = await supabase.auth.getUser();
      await supabase.from("demand_milestones").delete().eq("track_id", track.id);
      await supabase.from("demand_partners").delete().eq("track_id", track.id);
      await supabase.from("demand_votes").update({
        deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
        deleted_by: userData.user?.id ?? null
      }).eq("track_id", track.id).is("deleted_at", null);
      const {
        error
      } = await supabase.from("demand_tracks").delete().eq("id", track.id);
      if (error) throw error;
      toast.success("Deleted");
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }
  const statusColor = track.status === "live" ? "bg-accent-glow/20 text-eyebrow-strong" : track.status === "building" ? "bg-amber-500/20 text-amber-200" : "bg-accent-glow/20 text-eyebrow-strong";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggle, className: "text-muted-foreground hover:text-foreground", "aria-label": "Toggle", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-base font-semibold text-foreground", children: track.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
          "/",
          track.slug,
          " · ",
          track.category
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-micro font-semibold uppercase tracking-wider ${statusColor}`, children: track.status }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground", children: [
        track.votes_count,
        "/",
        track.vote_threshold,
        " votes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground", children: [
        track.founding_filled,
        "/",
        track.founding_cap,
        " founding"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "secondary", disabled: busy, onClick: () => setEdit((v) => !v), children: edit ? "Cancel" : "Edit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive", disabled: busy, onClick: remove, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
    ] }),
    edit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: INPUT, value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: INPUT, value: form.category, onChange: (e) => setForm({
            ...form,
            category: e.target.value
          }), children: ["engineering", "healthcare", "life-sciences", "business", "tech", "agriculture", "design", "other"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, className: "bg-[#0a0c10]", children: c }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Pitch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: `${INPUT} min-h-[72px]`, value: form.pitch ?? "", onChange: (e) => setForm({
          ...form,
          pitch: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: INPUT, value: form.status, onChange: (e) => setForm({
            ...form,
            status: e.target.value
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "voting", className: "bg-[#0a0c10]", children: "voting" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "building", className: "bg-[#0a0c10]", children: "building" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "live", className: "bg-[#0a0c10]", children: "live" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Vote threshold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, className: INPUT, value: form.vote_threshold, onChange: (e) => setForm({
            ...form,
            vote_threshold: parseInt(e.target.value) || 0
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Founding cap" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, className: INPUT, value: form.founding_cap, onChange: (e) => setForm({
            ...form,
            founding_cap: parseInt(e.target.value) || 0
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "ETA (days)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, className: INPUT, value: form.eta_days, onChange: (e) => setForm({
            ...form,
            eta_days: parseInt(e.target.value) || 0
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Launch ETA (date)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: INPUT, value: form.launch_eta ?? "", onChange: (e) => setForm({
            ...form,
            launch_eta: e.target.value || null
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: LABEL, children: "Live course slug (when status = live)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: INPUT, value: form.live_course_slug ?? "", onChange: (e) => setForm({
            ...form,
            live_course_slug: e.target.value
          }), placeholder: "e.g. clinical-trial-ops" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", disabled: busy, onClick: save, children: busy ? "Saving…" : "Save changes" })
    ] }),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-4 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MilestonesPanel, { trackId: track.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PartnersPanel, { trackId: track.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(VotesPanel, { trackId: track.id })
    ] })
  ] });
}
function MilestonesPanel({
  trackId
}) {
  const [items, setItems] = reactExports.useState([]);
  const [label, setLabel] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [bump, setBump] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data,
        error
      } = await supabase.from("demand_milestones").select("*").eq("track_id", trackId).order("order_index", {
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
  }, [trackId, bump]);
  const nextIndex = reactExports.useMemo(() => (items.at(-1)?.order_index ?? 0) + 10, [items]);
  async function add(e) {
    e.preventDefault();
    if (!label.trim()) return;
    setBusy(true);
    try {
      const {
        error
      } = await supabase.from("demand_milestones").insert({
        track_id: trackId,
        label: label.trim(),
        order_index: nextIndex,
        status: "pending"
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
  async function cycle(m) {
    const next = m.status === "pending" ? "in_progress" : m.status === "in_progress" ? "done" : "pending";
    const {
      error
    } = await supabase.from("demand_milestones").update({
      status: next,
      completed_at: next === "done" ? (/* @__PURE__ */ new Date()).toISOString() : null
    }).eq("id", m.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBump((b) => b + 1);
  }
  async function remove(id) {
    const {
      error
    } = await supabase.from("demand_milestones").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBump((b) => b + 1);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Milestones" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No milestones yet." }),
      items.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => cycle(m), className: "text-foreground hover:text-foreground", "aria-label": "Toggle status", children: m.status === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-sky-400" }) : m.status === "in_progress" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { className: "h-4 w-4 text-amber-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-foreground/90", children: m.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-micro uppercase tracking-wider text-muted-foreground", children: m.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(m.id), className: "text-muted-foreground hover:text-rose-300", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] }, m.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: add, className: "mt-2 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: INPUT, value: label, onChange: (e) => setLabel(e.target.value), placeholder: "e.g. Curriculum review with industry panel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "sm", disabled: busy, children: "Add" })
    ] })
  ] });
}
function PartnersPanel({
  trackId
}) {
  const [items, setItems] = reactExports.useState([]);
  const [name, setName] = reactExports.useState("");
  const [type, setType] = reactExports.useState("mentor");
  const [logoUrl, setLogoUrl] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [bump, setBump] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data,
        error
      } = await supabase.from("demand_partners").select("*").eq("track_id", trackId).order("type", {
        ascending: true
      }).order("name", {
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
  }, [trackId, bump]);
  async function add(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      const {
        error
      } = await supabase.from("demand_partners").insert({
        track_id: trackId,
        type,
        name: name.trim(),
        logo_url: logoUrl.trim() || null
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
  async function toggleConfirm(p) {
    const {
      error
    } = await supabase.from("demand_partners").update({
      confirmed_at: p.confirmed_at ? null : (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", p.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBump((b) => b + 1);
  }
  async function remove(id) {
    const {
      error
    } = await supabase.from("demand_partners").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBump((b) => b + 1);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: "Partners" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No partners yet." }),
      items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent px-2 py-0.5 text-micro uppercase tracking-wider text-foreground", children: p.type }),
        p.logo_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.logo_url, alt: "", className: "h-5 w-5 rounded object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-foreground/90", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleConfirm(p), className: `text-micro uppercase tracking-wider ${p.confirmed_at ? "text-eyebrow" : "text-muted-foreground hover:text-foreground"}`, children: p.confirmed_at ? "Confirmed" : "Mark confirmed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(p.id), className: "text-muted-foreground hover:text-rose-300", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] }, p.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: add, className: "mt-2 grid gap-2 sm:grid-cols-[120px_1fr_1fr_auto]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: INPUT, value: type, onChange: (e) => setType(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mentor", className: "bg-[#0a0c10]", children: "mentor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "internship", className: "bg-[#0a0c10]", children: "internship" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: INPUT, value: name, onChange: (e) => setName(e.target.value), placeholder: "Partner name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: INPUT, value: logoUrl, onChange: (e) => setLogoUrl(e.target.value), placeholder: "Logo URL (optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "sm", disabled: busy, children: "Add" })
    ] })
  ] });
}
function VotesPanel({
  trackId
}) {
  const [items, setItems] = reactExports.useState([]);
  const [bump, setBump] = reactExports.useState(0);
  const [busy, setBusy] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data,
        error
      } = await supabase.from("demand_votes").select("*").eq("track_id", trackId).is("deleted_at", null).order("created_at", {
        ascending: false
      }).limit(200);
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
  }, [trackId, bump]);
  async function setReservation(v, status) {
    setBusy(v.id);
    try {
      const {
        error
      } = await supabase.from("demand_votes").update({
        reservation_status: status
      }).eq("id", v.id);
      if (error) throw error;
      setBump((b) => b + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(null);
    }
  }
  async function toggleFounding(v) {
    setBusy(v.id);
    try {
      const {
        error
      } = await supabase.from("demand_votes").update({
        is_founding: !v.is_founding
      }).eq("id", v.id);
      if (error) throw error;
      setBump((b) => b + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(null);
    }
  }
  async function remove(v) {
    if (!confirm(`Archive vote from ${v.name}? It can be restored from the audit log.`)) return;
    setBusy(v.id);
    try {
      const {
        data: userData
      } = await supabase.auth.getUser();
      const {
        error
      } = await supabase.from("demand_votes").update({
        deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
        deleted_by: userData.user?.id ?? null
      }).eq("id", v.id);
      if (error) throw error;
      setBump((b) => b + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground", children: [
      "Votes (",
      items.length,
      ")"
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No votes yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full text-left text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Exp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Founding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium text-foreground", children: v.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: v.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: v.email ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: v.experience_level ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-xs", value: v.reservation_status, disabled: busy === v.id, onChange: (e) => setReservation(v, e.target.value), children: ["pending", "paid", "refunded", "waived"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, className: "bg-[#0a0c10]", children: s }, s)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy === v.id, onClick: () => toggleFounding(v), className: `rounded-full px-2 py-0.5 text-micro uppercase tracking-wider ${v.is_founding ? "bg-accent-glow/25 text-eyebrow-strong" : "bg-accent text-muted-foreground"}`, children: v.is_founding ? "Yes" : "No" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: new Date(v.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(v), className: "text-muted-foreground hover:text-rose-300", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) })
      ] }, v.id)) })
    ] }) })
  ] });
}
export {
  AdminDemandPage as component
};
