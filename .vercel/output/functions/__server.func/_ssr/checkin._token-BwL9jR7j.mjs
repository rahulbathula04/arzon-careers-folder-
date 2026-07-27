import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { h as useParams, i as useSearch } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function CheckinPage() {
  const {
    token
  } = useParams({
    from: "/checkin/$token"
  });
  const search = useSearch({
    from: "/checkin/$token"
  });
  const [state, setState] = reactExports.useState("idle");
  const [chosen, setChosen] = reactExports.useState(null);
  async function respond(stillInRole) {
    setState("sending");
    setChosen(stillInRole);
    const {
      error
    } = await supabase.rpc("record_retention_response", {
      p_token: token,
      p_still_in_role: stillInRole,
      p_response: {
        source: "magic_link",
        left_qs: search.left ?? null
      }
    });
    setState(error ? "error" : "done");
  }
  reactExports.useEffect(() => {
    if (search.left === "1" && state === "idle") respond(false);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-md px-6 py-20 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h3 font-semibold mb-3", children: "Arzon Careers · 1-question check-in" }),
    state === "done" && chosen !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
      "Thanks — we recorded that you are ",
      chosen ? "still" : "no longer",
      " in the role. This helps the next cohort."
    ] }),
    state === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive", children: "That link is no longer valid. Please contact hello@arzoncareers.in if you'd like to update us." }),
    (state === "idle" || state === "sending") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-muted-foreground", children: "Are you still in the role you chose?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-5 py-2.5 rounded-md bg-primary text-primary-foreground disabled:opacity-50", disabled: state === "sending", onClick: () => respond(true), children: "Yes, still in role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-5 py-2.5 rounded-md border disabled:opacity-50", disabled: state === "sending", onClick: () => respond(false), children: "No, I left" })
      ] })
    ] })
  ] });
}
export {
  CheckinPage as component
};
