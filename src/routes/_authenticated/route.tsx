import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      // Redirect to the user-facing login page, NOT the admin login.
      // Admin login is at /admin/login and is a separate flow.
      throw redirect({ to: "/admin/login" });
    }
    return { user: data.user };
  },
  component: () => <Outlet />,
});
