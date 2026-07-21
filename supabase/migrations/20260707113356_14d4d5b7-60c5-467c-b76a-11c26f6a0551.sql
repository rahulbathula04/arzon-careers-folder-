
DROP VIEW IF EXISTS public.v_active_promotions;
CREATE VIEW public.v_active_promotions
  WITH (security_invoker = on) AS
SELECT
  c.code, c.discount_pct, c.window_minutes, c.max_uses_per_email, c.is_active,
  camp.id AS campaign_id, camp.slug AS campaign_slug, camp.name AS campaign_name,
  camp.type_code, camp.status AS campaign_status,
  camp.starts_at, camp.ends_at, camp.priority
FROM public.coupons c
LEFT JOIN public.promotion_campaigns camp ON camp.id = c.campaign_id
WHERE c.is_active = true;
GRANT SELECT ON public.v_active_promotions TO authenticated, anon;

REVOKE EXECUTE ON FUNCTION public.log_promotion_event(text,text,uuid,text,integer,integer,text,jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.log_promotion_event(text,text,uuid,text,integer,integer,text,jsonb) TO authenticated, service_role;
