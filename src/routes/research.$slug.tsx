import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/research/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/resources/$slug", params: { slug: params.slug }, statusCode: 301 });
  },
});
