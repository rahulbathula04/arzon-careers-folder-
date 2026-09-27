import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/apply/")({
  beforeLoad: ({ location }) => {
    const search = (location.search ?? {}) as Record<string, unknown>;
    const programme =
      typeof search.programme === "string" ? search.programme : undefined;
    const source =
      typeof search.source === "string" ? search.source : "apply";
    throw redirect({
      to: "/enrol",
      statusCode: 301,
      search: { programme, source },
    });
  },
  head: () => ({
    meta: [
      { title: "Start your Arzon Global application" },
      {
        name: "description",
        content:
          "Choose your healthcare role programme and support tier, review the price, then continue to payment.",
      },
    ],
  }),
  component: RedirectingApplyPage,
});

function RedirectingApplyPage() {
  return null;
}
