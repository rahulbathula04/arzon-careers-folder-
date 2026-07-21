# Analytics Events

Every funnel step is instrumented via `track(name, props)` from
`src/lib/track.ts`, which writes to `analytics_events` (Supabase) and
mirrors to GA4 when `VITE_GA4_MEASUREMENT_ID` is configured.

## Funnel dictionary

| Step             | Event                      | Fired from                                  | Key params                                      |
| ---------------- | -------------------------- | ------------------------------------------- | ----------------------------------------------- |
| Awareness        | `page_view`                | `__root.tsx` router subscriber              | `path`, `referrer`, `utm_*` (attribution)       |
| Programme intent | `apply_programme_selected` | `TrackDomainGrid`, `BentoProgrammes`, apply | `program_slug`, `props.source`                  |
| Apply start      | `apply_started`            | `ApplyShell` first mount                    | `program_slug`, `props.source`                  |
| Apply step       | `apply_step_viewed`        | `ApplyShell` step transitions               | `program_slug`, `props.step`                    |
| Apply submit     | `apply_submitted`          | `ApplyShell` submit handler                 | `program_slug`, `application_id`                |
| Apply success    | `apply_success_viewed`     | Post-submit thank-you route                 | `application_id`                                |
| WhatsApp handoff | `whatsapp_click`           | `WhatsAppLink` + delegated `__root` catcher | `program_slug`, `props.source`                  |
| Checkout open    | `checkout_started`         | `enrol.$tier.pay.tsx` pay handler           | `tier`, `amount_inr`, `lead_id`                 |
| Razorpay open    | `razorpay_modal_opened`    | `enrol.$tier.pay.tsx` after `.open()`       | `tier`, `lead_id`                               |
| Payment success  | `payment_success`          | Razorpay verify callback                    | `tier`, `amount_inr`, `program_slug`, `lead_id` |
| Payment failure  | `payment_failure`          | Razorpay error / verify failure             | `tier`, `reason`, `lead_id`                     |

## GA4 funnel exploration (paste into Explore → Funnel)

1. `page_view` where `path = /`
2. `apply_programme_selected`
3. `apply_started`
4. `apply_submitted`
5. `checkout_started`
6. `payment_success`

Drop-off between steps 2→3 → programme cards are being clicked but the
apply route is failing to mount. Step 4→5 gap → the pay redirect is
broken. Step 5→6 gap → Razorpay UX / signature verification is failing;
cross-reference `payment_failure.reason`.

## Sentry alert routing

`setSentryRoute(pathname)` tags every event with the current route path.
Configure Sentry issue alerts on:

- **Critical** — any new issue with `route:/apply` or `route:/enrol/*`
- **Critical** — any new issue with `route:/courses/*`
- **High** — >5 issues/hour with `route:/`

Activation:

```bash
bun add @sentry/react
# then set VITE_SENTRY_DSN in the deployment env
```

`src/lib/sentry.ts` is a full no-op until both are in place.
