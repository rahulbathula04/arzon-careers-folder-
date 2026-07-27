import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-CvdLERTV.mjs";
const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl"
};
function Container({ size = "lg", className, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizes[size], className), ...rest });
}
const padY = {
  sm: "py-7 sm:py-12",
  md: "py-9 sm:py-16",
  lg: "py-11 sm:py-20"
};
const toneBg = {
  default: "",
  muted: "bg-white/[0.02]",
  light: "bg-white text-ink"
};
function Section({
  size = "md",
  tone = "default",
  containerSize = "lg",
  bare = false,
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: cn("relative", padY[size], toneBg[tone], className), ...rest, children: bare ? children : /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { size: containerSize, children }) });
}
export {
  Section as S
};
