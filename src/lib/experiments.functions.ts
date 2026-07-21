import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const Schema = z.object({
  uid: z.string().min(8).max(64),
  experiment: z.string().min(1).max(64),
  variant: z.enum(["control", "variant"]),
  event: z.enum([
    "exposure",
    "cta_click",
    "form_open",
    "form_submit",
    "whatsapp_click",
    "razorpay_open",
    "razorpay_success",
    "enrolment_paid",
  ]),
  courseSlug: z.string().min(1).max(80).optional(),
  props: z.record(z.string(), z.unknown()).optional(),
});

export const logExperimentEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Schema.parse(data))
  .handler(async ({ data }) => {
    const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await sb.from("experiment_events").insert({
      uid: data.uid,
      experiment: data.experiment,
      variant: data.variant,
      event: data.event,
      course_slug: data.courseSlug ?? null,
      props: data.props ?? {},
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  });
