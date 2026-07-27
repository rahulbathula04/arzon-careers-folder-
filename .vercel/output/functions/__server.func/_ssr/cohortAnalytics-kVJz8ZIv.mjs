import { t as trackEvent } from "./analytics-Do62eWB1.mjs";
function trackCohort(name, params = {}) {
  try {
    trackEvent(name, params);
  } catch {
  }
}
export {
  trackCohort
};
