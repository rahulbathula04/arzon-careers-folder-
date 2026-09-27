export type ShellContext =
  | "marketing"
  | "assessment"
  | "workspace"
  | "employer"
  | "admin"
  | "minimal";

/**
 * Determines the layout shell context for a given route pathname.
 * Navigation is global application infrastructure, not an ad-hoc page component.
 */
export function resolveShellContext(pathname: string): ShellContext {
  if (!pathname) return "marketing";

  // 1. Admin Platform
  if (pathname.startsWith("/admin")) {
    return "admin";
  }

  // 2. Focused Assessment Simulation Terminal
  if (
    pathname === "/career-engine/test" ||
    pathname.startsWith("/assessment") ||
    pathname.startsWith("/acri/test") ||
    pathname.startsWith("/acri/assessment")
  ) {
    return "assessment";
  }

  // 3. Authenticated Student Learning Workspace
  if (
    pathname.startsWith("/learn") ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/workspace")
  ) {
    return "workspace";
  }

  // 4. Employer Talent Console
  if (
    pathname.startsWith("/employer/") ||
    pathname.startsWith("/employers/console")
  ) {
    return "employer";
  }

  // 5. Public V2 marketing shell.
  // All public discovery, programme and application surfaces share one
  // Arzon header/footer. Focused assessment, authenticated workspaces,
  // employer console and admin retain their dedicated shells above.
  return "marketing";
}
