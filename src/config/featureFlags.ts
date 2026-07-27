/**
 * Application feature flags.
 * Controlled via environment variables (e.g. VITE_ENABLE_ASSESSMENT in .env).
 */
export const FEATURE_FLAGS = {
  /**
   * Toggles the Assessment / Career Engine / ACRI diagnostic test and related CTAs.
   * Defaults to false (hidden/disabled). Set VITE_ENABLE_ASSESSMENT=true to re-enable.
   */
  ENABLE_ASSESSMENT: import.meta.env.VITE_ENABLE_ASSESSMENT === "true",
};
