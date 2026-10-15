import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * ACRI is paused as a public product.
 * Keep the route as a redirect so old links and bookmarks do not land on
 * an inactive certification page. Assessment internals are retained for now.
 */
export const Route = createFileRoute("/acri")({
  beforeLoad: () => {
    throw redirect({ to: "/careers" });
  },
  component: () => null,
});
