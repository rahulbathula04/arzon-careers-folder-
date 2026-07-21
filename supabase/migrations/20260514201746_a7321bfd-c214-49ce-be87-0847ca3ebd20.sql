INSERT INTO public.coupons (code, discount_pct, window_minutes, max_uses_per_email, is_active)
VALUES ('APPLYPRIME', 1, 120, 1, true)
ON CONFLICT (code) DO UPDATE SET is_active = true, window_minutes = 120;

INSERT INTO public.coupon_tier_prices (code, tier, override_price_inr) VALUES
  ('APPLYPRIME','essential',7999),
  ('APPLYPRIME','career',8999),
  ('APPLYPRIME','elite',9999)
ON CONFLICT (code, tier) DO UPDATE SET override_price_inr = EXCLUDED.override_price_inr;