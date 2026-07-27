import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cn } from "./router-CvdLERTV.mjs";
const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  gold: "btn-gold",
  ghost: "btn-ghost"
};
const sizeClass = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl"
};
const CTAButton = reactExports.forwardRef(function CTAButton2({
  variant = "primary",
  size,
  block,
  fullBlock,
  asChild,
  glow,
  loading,
  leadingIcon,
  trailingIcon,
  className,
  children,
  disabled,
  ...rest
}, ref) {
  const Comp = asChild ? Slot : "button";
  const hasIcons = Boolean(leadingIcon || trailingIcon);
  const content = hasIcons ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    leadingIcon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-icon-leading": true, "aria-hidden": true, children: leadingIcon }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children }),
    trailingIcon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-arrow": true, "aria-hidden": true, children: trailingIcon }) : null
  ] }) : children;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      className: cn(
        "btn",
        variantClass[variant],
        size && sizeClass[size],
        block && "btn-block btn-block-sm-auto",
        fullBlock && "btn-block",
        glow && "btn-glow-pulse",
        className
      ),
      "data-loading": loading ? "true" : void 0,
      "aria-busy": loading || void 0,
      "aria-disabled": disabled || loading || void 0,
      disabled: !asChild && (disabled || loading),
      ...rest,
      children: asChild ? children : content
    }
  );
});
export {
  CTAButton as C
};
