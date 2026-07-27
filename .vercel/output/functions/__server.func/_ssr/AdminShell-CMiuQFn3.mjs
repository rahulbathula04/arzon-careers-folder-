import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useLocation, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { c as cn } from "./router-CvdLERTV.mjs";
import { D as Dialog, a as DialogContent } from "./dialog-DQUu35ki.mjs";
import { d as Sparkles, X, aG as LayoutDashboard, aH as HeartHandshake, ac as FileText, U as Users, O as BadgeCheck, k as ChartColumn, az as Zap, aI as FlaskConical, a9 as Search, aJ as Image, H as Award, aK as SpellCheck, aL as History, z as Camera, aM as HardDrive, a2 as Mail, m as ShieldCheck, aN as LogOut, t as Menu, aO as ChevronRight, aP as Bell, A as Activity, aQ as ExternalLink } from "../_libs/lucide-react.mjs";
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandDialog = ({ children, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children }) }) });
};
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
const ROUTES = [
  {
    to: "/admin",
    label: "Dashboard",
    group: "Navigate",
    icon: LayoutDashboard,
    keywords: "home overview"
  },
  { to: "/admin/applications", label: "Applications", group: "Navigate", icon: FileText },
  { to: "/admin/leads", label: "Leads", group: "Navigate", icon: Users, keywords: "career engine" },
  { to: "/admin/funnel", label: "Funnel", group: "Navigate", icon: ChartColumn },
  {
    to: "/admin/arzonprime60",
    label: "ARZONPRIME60",
    group: "Navigate",
    icon: Zap,
    keywords: "prime waitlist tiers"
  },
  { to: "/admin/funnel-test", label: "Funnel QA", group: "Navigate", icon: FlaskConical },
  { to: "/admin/seo", label: "SEO performance", group: "Navigate", icon: Search },
  { to: "/admin/analytics-alerts", label: "Analytics alerts", group: "Navigate", icon: Activity },
  { to: "/admin/demand", label: "Demand tracks", group: "Navigate", icon: ChartColumn },
  { to: "/admin/thumbnails", label: "Thumbnails", group: "Navigate", icon: Image },
  { to: "/admin/certificates", label: "Certificates", group: "Navigate", icon: Award },
  { to: "/admin/invites", label: "Staff invites", group: "Workspace", icon: Mail },
  { to: "/admin/roles", label: "Staff roles", group: "Workspace", icon: ShieldCheck }
];
const ACTIONS = [
  { label: "View live site", group: "Actions", icon: ExternalLink, action: "open-site" },
  { label: "Career-engine landing", group: "Actions", icon: Sparkles, action: "open-ce" },
  { label: "Sign out", group: "Actions", icon: LogOut, action: "sign-out" }
];
function AdminCommandPalette({
  open,
  onOpenChange
}) {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  function go(to) {
    onOpenChange(false);
    navigate({ to });
  }
  async function doAction(a) {
    onOpenChange(false);
    if (a === "sign-out") {
      await supabase.auth.signOut();
      navigate({ to: "/admin/login" });
    } else if (a === "open-site") {
      window.open("/", "_blank");
    } else if (a === "open-ce") {
      window.open("/career-engine", "_blank");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandDialog, { open, onOpenChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { placeholder: "Search routes, run an action…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "No matches." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Navigate", children: ROUTES.filter((r) => r.group === "Navigate").map((r) => {
        const Icon = r.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CommandItem,
          {
            value: `${r.label} ${r.keywords ?? ""}`,
            onSelect: () => go(r.to),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-micro text-muted-foreground", children: r.to })
            ]
          },
          r.to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Workspace", children: ROUTES.filter((r) => r.group === "Workspace").map((r) => {
        const Icon = r.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { value: r.label, onSelect: () => go(r.to), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.label })
        ] }, r.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Actions", children: ACTIONS.map((a) => {
        const Icon = a.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { value: a.label, onSelect: () => doAction(a.action), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.label })
        ] }, a.action);
      }) })
    ] })
  ] });
}
const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { to: "/admin/retention", label: "Retention", icon: HeartHandshake, group: "Overview" },
  { to: "/admin/applications", label: "Applications", icon: FileText, group: "Pipeline" },
  { to: "/admin/leads", label: "Leads", icon: Users, group: "Pipeline" },
  { to: "/admin/placements", label: "Placements ledger", icon: BadgeCheck, group: "Pipeline" },
  { to: "/admin/funnel", label: "Funnel", icon: ChartColumn, group: "Growth" },
  { to: "/admin/readiness-journeys", label: "Readiness funnel", icon: ChartColumn, group: "Growth" },
  { to: "/admin/arzonprime60", label: "ARZONPRIME60", icon: Zap, group: "Growth" },
  { to: "/admin/funnel-test", label: "Funnel QA", icon: FlaskConical, group: "Growth" },
  { to: "/admin/seo", label: "SEO performance", icon: Search, group: "Growth" },
  { to: "/admin/demand", label: "Demand tracks", icon: ChartColumn, group: "Content" },
  { to: "/admin/thumbnails", label: "Thumbnails", icon: Image, group: "Content" },
  { to: "/admin/certificates", label: "Certificates", icon: Award, group: "Content" },
  { to: "/admin/content-qa-scan", label: "Content QA scan", icon: SpellCheck, group: "Content" },
  { to: "/admin/landing-changelog", label: "Copy changelog", icon: History, group: "Content" },
  { to: "/admin/moments", label: "Arzon Moments", icon: Camera, group: "Content" },
  { to: "/admin/assets", label: "Static assets", icon: HardDrive, group: "Content" },
  { to: "/admin/invites", label: "Staff invites", icon: Mail, group: "Workspace" },
  { to: "/admin/roles", label: "Staff roles", icon: ShieldCheck, group: "Workspace" }
];
const GROUPS = ["Overview", "Pipeline", "Growth", "Content", "Workspace"];
function crumbsFor(pathname) {
  const item = NAV.find(
    (n) => n.to === "/admin" ? pathname === "/admin" : pathname.startsWith(n.to)
  );
  return ["Admin", item?.label ?? ""].filter(Boolean);
}
function AdminShell({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const [paletteOpen, setPaletteOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);
  reactExports.useEffect(() => {
    setOpen(false);
  }, [pathname]);
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }
  const crumbs = crumbsFor(pathname);
  const initials = (email || "A").slice(0, 2).toUpperCase();
  const isProd = typeof window !== "undefined" && window.location.hostname.endsWith("arzoncareers.in");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-dvh bg-background text-foreground", children: [
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        "aria-label": "Close menu",
        className: "fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden",
        onClick: () => setOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: [
          "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-border",
          "bg-card",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        ].join(" "),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-14 items-center justify-between border-b border-border px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-body-sm leading-none text-foreground", children: "Arzon" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border px-1.5 py-0.5 font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground", children: "Admin" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden",
                onClick: () => setOpen(false),
                "aria-label": "Close menu",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto px-2 py-3", children: GROUPS.map((g) => {
            const items = NAV.filter((n) => n.group === g);
            if (!items.length) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-1.5 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: g }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5", children: items.map((item) => {
                const active = item.to === "/admin" ? pathname === "/admin" : pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: item.to,
                    className: [
                      "group relative flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition",
                      active ? "bg-accent text-accent-foreground before:absolute before:inset-y-1.5 before:left-0 before:w-1 before:rounded-r before:bg-primary" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    ].join(" "),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Icon,
                        {
                          className: [
                            "h-4 w-4 shrink-0",
                            active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          ].join(" ")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label })
                    ]
                  }
                ) }, item.to);
              }) })
            ] }, g);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 rounded-lg bg-muted p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-micro font-semibold", children: initials }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-meta text-foreground", children: email || "Signed in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-wider text-muted-foreground", children: "Staff" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: signOut,
                className: "grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                "aria-label": "Sign out",
                title: "Sign out",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" })
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 lg:pl-[260px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur-xl lg:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden",
            onClick: () => setOpen(true),
            "aria-label": "Open menu",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "nav",
          {
            "aria-label": "Breadcrumb",
            className: "hidden items-center gap-1.5 text-meta text-muted-foreground md:flex",
            children: crumbs.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: i === crumbs.length - 1 ? "text-foreground font-medium" : "", children: c })
            ] }, c + i))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: [
                "hidden items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-micro uppercase tracking-[0.18em] md:inline-flex",
                isProd ? "border-sky-300 bg-sky-50 text-sky-900" : "border-amber-300 bg-amber-50 text-amber-900"
              ].join(" "),
              title: isProd ? "Production environment" : "Preview environment",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: [
                      "h-1.5 w-1.5 rounded-full",
                      isProd ? "bg-sky-500" : "bg-amber-500"
                    ].join(" ")
                  }
                ),
                isProd ? "Live" : "Preview"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setPaletteOpen(true),
              className: "group relative hidden h-9 w-[260px] items-center gap-2 rounded-lg border border-border bg-muted px-2.5 text-caption text-muted-foreground transition hover:border-foreground/20 hover:bg-accent hover:text-foreground md:flex",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-left", children: "Search or jump to…" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "rounded border border-border bg-background px-1.5 py-0.5 font-mono text-micro text-muted-foreground", children: "⌘K" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setPaletteOpen(true),
              className: "grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden",
              "aria-label": "Open command palette",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              "aria-label": "Notifications",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 lg:px-8 lg:pt-10", children })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminCommandPalette, { open: paletteOpen, onOpenChange: setPaletteOpen })
  ] });
}
export {
  AdminShell as A
};
