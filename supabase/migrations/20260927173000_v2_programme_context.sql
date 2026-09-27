-- Arzon Careers V2: preserve programme context through the canonical paid enrolment flow.
-- Additive change only. Existing 9-argument RPC remains available for compatibility.

alter table public.enrolment_intents
  add column if not exists course_slug text;

create index if not exists idx_enrolment_intents_course_slug
  on public.enrolment_intents (course_slug);

create or replace function public.create_enrolment_intent(
  p_tier text,
  p_name text,
  p_email text,
  p_phone text,
  p_city text,
  p_background text,
  p_lead_id uuid default null,
  p_utm_source text default null,
  p_user_agent text default null,
  p_course_slug text default null
)
returns table(id uuid, intent_token text)
language plpgsql
security definer
set search_path=public
as $$
declare
  v_id uuid;
  v_token text;
  v_name text := trim(coalesce(p_name,''));
  v_email text := lower(trim(coalesce(p_email,'')));
  v_phone text := regexp_replace(coalesce(p_phone,''), '\D', '', 'g');
  v_tier text := lower(trim(coalesce(p_tier,'')));
  v_course_slug text := lower(trim(coalesce(p_course_slug,'')));
  v_price public.payment_tier_prices%rowtype;
begin
  if v_tier not in ('essential','career','elite') then
    raise exception 'invalid tier';
  end if;

  if length(v_name) < 2 or length(v_name) > 80 then
    raise exception 'invalid name';
  end if;

  if length(v_phone) < 10 or length(v_phone) > 15 then
    raise exception 'invalid phone';
  end if;

  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email) > 120 then
    raise exception 'invalid email';
  end if;

  if length(v_course_slug) > 80 then
    raise exception 'invalid course';
  end if;

  select * into v_price
    from public.payment_tier_prices
   where tier = v_tier and active = true
   for share;

  if not found then
    raise exception 'pricing unavailable';
  end if;

  insert into public.enrolment_intents (
    tier, name, email, phone, city, background,
    base_price_inr, final_price_inr, lead_id, utm_source, user_agent, course_slug
  )
  values (
    v_tier,
    v_name,
    v_email,
    v_phone,
    nullif(left(coalesce(p_city,''),80),''),
    nullif(left(coalesce(p_background,''),120),''),
    v_price.list_price_inr,
    v_price.list_price_inr,
    p_lead_id,
    nullif(left(coalesce(p_utm_source,''),64),''),
    nullif(left(coalesce(p_user_agent,''),256),''),
    nullif(left(v_course_slug,80),'')
  )
  returning enrolment_intents.id, enrolment_intents.intent_token into v_id, v_token;

  return query select v_id, v_token;
end;
$$;

revoke all on function public.create_enrolment_intent(text,text,text,text,text,text,uuid,text,text,text)
  from public, anon, authenticated;

grant execute on function public.create_enrolment_intent(text,text,text,text,text,text,uuid,text,text,text)
  to service_role;
