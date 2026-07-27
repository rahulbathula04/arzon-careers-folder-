import { g as getDefaultExportFromCjs } from "./react.mjs";
var throttleit;
var hasRequiredThrottleit;
function requireThrottleit() {
  if (hasRequiredThrottleit) return throttleit;
  hasRequiredThrottleit = 1;
  function throttle(function_, wait) {
    if (typeof function_ !== "function") {
      throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
    }
    let timeoutId;
    let lastCallTime = 0;
    return function throttled(...arguments_) {
      clearTimeout(timeoutId);
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime;
      const delayForNextCall = wait - timeSinceLastCall;
      if (delayForNextCall <= 0) {
        lastCallTime = now;
        function_.apply(this, arguments_);
      } else {
        timeoutId = setTimeout(() => {
          lastCallTime = Date.now();
          function_.apply(this, arguments_);
        }, delayForNextCall);
      }
    };
  }
  throttleit = throttle;
  return throttleit;
}
var throttleitExports = /* @__PURE__ */ requireThrottleit();
const throttleFunction = /* @__PURE__ */ getDefaultExportFromCjs(throttleitExports);
export {
  throttleFunction as t
};
