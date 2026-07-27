import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  variant = "fade-up",
  style
}) {
  const ref = reactExports.useRef(null);
  const [inView, setInView] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    if (rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return reactExports.createElement(
    Tag,
    {
      ref,
      "data-animate": variant,
      "data-inview": inView ? "true" : "false",
      className,
      style: { animationDelay: delay ? `${delay}ms` : void 0, ...style }
    },
    children
  );
}
function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
  tone
}) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  const toneClass = tone === "dark" ? "tone-dark" : "tone-light";
  const titleIsHeading = reactExports.isValidElement(title) && typeof title.type === "string" && /^h[1-6]$/.test(title.type);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-3xl ${a} ${toneClass}`.trim(), children: [
    eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { as: "div", className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: eyebrow }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "block h-px w-10 bg-[#8A6A14]/50" })
    ] }),
    titleIsHeading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "div", className: "h-section mt-4 sm:mt-5", delay: 80, children: title }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "h2", className: "h-section mt-4 sm:mt-5", delay: 80, children: title }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "p", className: "body-lg mt-4 sm:mt-5 mx-auto max-w-[54ch]", delay: 160, children: sub })
  ] });
}
export {
  SectionHeader as S
};
