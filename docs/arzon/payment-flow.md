# Arzon Payment Flow
## Phase 1 implementation

### Old behavior
- Client/server function accepted a base price parameter.
- `create_enrolment_intent` persisted the caller-supplied price.
- Razorpay order amount was calculated in application code.
- Payment confirmation accepted order/payment identifiers without independently checking captured amount and currency.
- `payment.authorized` was treated as a successful payment event.

### New behavior
- Tier list/offer prices are stored in `public.payment_tier_prices`.
- Public roles cannot execute `create_enrolment_intent`, `submit_course_enquiry`, `attach_razorpay_order`, or `mark_enrolment_paid_with_payment`.
- Enrolment intent creation derives list price server-side.
- Razorpay order creation persists expected amount and currency on the intent.
- Browser verification fetches the Razorpay payment server-side and requires matching payment id, order id, INR currency, expected amount and `captured` status.
- Webhook processing accepts only `payment.captured` and performs the same amount/currency/order checks.
- Payment finalization records the captured amount/currency and remains idempotent for the same payment.
- Enrolment provisioning remains downstream of paid state.

### Files changed
- `src/lib/enrolment.functions.ts`
- `src/lib/enquiries.functions.ts`
- `src/lib/razorpay.functions.ts`
- `src/routes/api/public/razorpay.verify.ts`
- `src/routes/api/public/razorpay.webhook.ts`
- `tests/e2e/enrolment-rpc-validation.spec.ts`
- `supabase/migrations/20260927130000_payment_authority_hardening.sql`

### Database changes
- Added `payment_tier_prices`.
- Added expected order amount/currency and captured payment amount/currency fields to `enrolment_intents`.
- Replaced price-accepting enrolment RPC signatures with server-priced signatures.
- Restricted privileged payment RPC execution to `service_role`.
- Added amount/currency checks to order attachment and payment finalization.

### Risks
- Existing callers using the old public RPC signatures will fail by design.
- Business pricing remains unchanged at the values already present in `TIER_META`: ₹14,999/₹24,999/₹39,999 list and ₹4,999/₹7,999/₹9,999 offer values.
- Coupon logic remains unchanged and operates against the stored intent price.
- The production database was updated directly first; the migration file is the durable repository representation and must be included in the normal deployment migration process.

### Tests
- Public RPC boundary tests added for price-setting and payment-finalization RPCs.
- CI/typecheck/build must pass before this phase is considered complete.
