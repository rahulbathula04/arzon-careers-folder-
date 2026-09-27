-- Phase 1: payment authority hardening
-- Canonical tier pricing is server-owned. Client RPCs cannot set prices or mark payments paid.
-- The same SQL has been applied to the active Supabase project pcikfmhjskbffcnvxmoe.

create table if not exists public.payment_tier_prices (
  tier text primary key check (tier in ('essential','career','elite')),
  list_price_inr integer not null check (list_price_inr > 0),
  offer_price_inr integer not null check (offer_price_inr > 0 and offer_price_inr <= list_price_inr),
  currency text not null default 'INR' check (currency = 'INR'),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.payment_tier_prices (tier,list_price_inr,offer_price_inr,currency,active)
values ('essential',14999,4999,'INR',true),('career',24999,7999,'INR',true),('elite',39999,9999,'INR',true)
on conflict (tier) do update set list_price_inr=excluded.list_price_inr, offer_price_inr=excluded.offer_price_inr, currency=excluded.currency, active=excluded.active, updated_at=now();

alter table public.payment_tier_prices enable row level security;
revoke all on public.payment_tier_prices from anon, authenticated, public;
grant select on public.payment_tier_prices to service_role;

alter table public.enrolment_intents
  add column if not exists razorpay_order_amount_paise bigint,
  add column if not exists razorpay_order_currency text,
  add column if not exists payment_amount_paise bigint,
  add column if not exists payment_currency text;

alter table public.enrolment_intents drop constraint if exists enrolment_intents_razorpay_order_amount_paise_check;
alter table public.enrolment_intents add constraint enrolment_intents_razorpay_order_amount_paise_check check (razorpay_order_amount_paise is null or razorpay_order_amount_paise > 0);
alter table public.enrolment_intents drop constraint if exists enrolment_intents_payment_amount_paise_check;
alter table public.enrolment_intents add constraint enrolment_intents_payment_amount_paise_check check (payment_amount_paise is null or payment_amount_paise > 0);

drop function if exists public.create_enrolment_intent(text,text,text,text,text,text,integer,uuid,text,text);
create or replace function public.create_enrolment_intent(p_tier text,p_name text,p_email text,p_phone text,p_city text,p_background text,p_lead_id uuid default null,p_utm_source text default null,p_user_agent text default null)
returns table(id uuid,intent_token text) language plpgsql security definer set search_path=public as $$
declare v_id uuid; v_token text; v_name text:=trim(coalesce(p_name,'')); v_email text:=lower(trim(coalesce(p_email,''))); v_phone text:=regexp_replace(coalesce(p_phone,''),'\D','','g'); v_tier text:=lower(trim(coalesce(p_tier,''))); v_price public.payment_tier_prices%rowtype;
begin
 if v_tier not in ('essential','career','elite') then raise exception 'invalid tier'; end if;
 if length(v_name)<2 or length(v_name)>80 then raise exception 'invalid name'; end if;
 if length(v_phone)<10 or length(v_phone)>15 then raise exception 'invalid phone'; end if;
 if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email)>120 then raise exception 'invalid email'; end if;
 select * into v_price from public.payment_tier_prices where tier=v_tier and active=true for share;
 if not found then raise exception 'pricing unavailable'; end if;
 insert into public.enrolment_intents(tier,name,email,phone,city,background,base_price_inr,final_price_inr,lead_id,utm_source,user_agent)
 values(v_tier,v_name,v_email,v_phone,nullif(left(coalesce(p_city,''),80),''),nullif(left(coalesce(p_background,''),120),''),v_price.list_price_inr,v_price.list_price_inr,p_lead_id,nullif(left(coalesce(p_utm_source,''),64),''),nullif(left(coalesce(p_user_agent,''),256),''))
 returning enrolment_intents.id,enrolment_intents.intent_token into v_id,v_token;
 return query select v_id,v_token;
end; $$;

revoke all on function public.create_enrolment_intent(text,text,text,text,text,text,uuid,text,text) from public,anon,authenticated;
grant execute on function public.create_enrolment_intent(text,text,text,text,text,text,uuid,text,text) to service_role;

drop function if exists public.submit_course_enquiry(text,text,text,text,text,text,text,text,text,text,integer,text,text);
create or replace function public.submit_course_enquiry(p_course_slug text,p_name text,p_email text,p_phone text,p_city text,p_preferred_slot text,p_variant_layout text,p_variant_cta text,p_exp_uid text,p_placement text,p_utm_source text default null,p_user_agent text default null)
returns table(id uuid,intent_token text) language plpgsql security definer set search_path=public as $$
declare v_id uuid; v_token text; v_name text:=trim(coalesce(p_name,'')); v_email text:=lower(trim(coalesce(p_email,''))); v_phone text:=regexp_replace(coalesce(p_phone,''),'\D','','g'); v_slug text:=lower(trim(coalesce(p_course_slug,''))); v_price public.payment_tier_prices%rowtype;
begin
 if length(v_slug)<1 or length(v_slug)>80 then raise exception 'invalid course'; end if;
 if length(v_name)<2 or length(v_name)>80 then raise exception 'invalid name'; end if;
 if length(v_phone)<10 or length(v_phone)>15 then raise exception 'invalid phone'; end if;
 if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email)>120 then raise exception 'invalid email'; end if;
 select * into v_price from public.payment_tier_prices where tier='career' and active=true for share;
 if not found then raise exception 'pricing unavailable'; end if;
 insert into public.enrolment_intents(tier,name,email,phone,city,base_price_inr,final_price_inr,utm_source,user_agent,course_slug,source,variant_layout,variant_cta,exp_uid,background)
 values('career',v_name,v_email,v_phone,nullif(left(coalesce(p_city,''),80),''),v_price.list_price_inr,v_price.list_price_inr,nullif(left(coalesce(p_utm_source,''),64),''),nullif(left(coalesce(p_user_agent,''),256),''),v_slug,nullif(left(coalesce('curriculum_'||coalesce(p_placement,'drawer'),''),64),''),nullif(left(coalesce(p_variant_layout,''),32),''),nullif(left(coalesce(p_variant_cta,''),32),''),nullif(left(coalesce(p_exp_uid,''),64),''),nullif(left(coalesce(p_preferred_slot,''),120),''))
 returning enrolment_intents.id,enrolment_intents.intent_token into v_id,v_token;
 return query select v_id,v_token;
end; $$;

revoke all on function public.submit_course_enquiry(text,text,text,text,text,text,text,text,text,text,text,text) from public,anon,authenticated;
grant execute on function public.submit_course_enquiry(text,text,text,text,text,text,text,text,text,text,text,text) to service_role;

create or replace function public.attach_razorpay_order(p_intent_id uuid,p_order_id text,p_amount_paise bigint,p_currency text)
returns void language plpgsql security definer set search_path=public as $$
declare v_intent public.enrolment_intents%rowtype; v_expected bigint;
begin
 if p_intent_id is null or p_order_id is null or length(p_order_id)=0 or length(p_order_id)>64 then raise exception 'invalid arguments'; end if;
 if p_amount_paise is null or p_amount_paise<=0 then raise exception 'invalid amount'; end if;
 if upper(coalesce(p_currency,''))<>'INR' then raise exception 'invalid currency'; end if;
 select * into v_intent from public.enrolment_intents where id=p_intent_id for update;
 if not found then raise exception 'intent not found'; end if;
 v_expected:=round(coalesce(v_intent.final_price_inr,v_intent.base_price_inr)::numeric*100);
 if p_amount_paise<>v_expected then raise exception 'order amount mismatch'; end if;
 if v_intent.razorpay_order_id is not null and v_intent.razorpay_order_id is distinct from p_order_id then raise exception 'order already attached'; end if;
 update public.enrolment_intents set razorpay_order_id=p_order_id,razorpay_order_amount_paise=p_amount_paise,razorpay_order_currency='INR',updated_at=now() where id=p_intent_id;
end; $$;

drop function if exists public.attach_razorpay_order(uuid,text);
revoke all on function public.attach_razorpay_order(uuid,text,bigint,text) from public,anon,authenticated;
grant execute on function public.attach_razorpay_order(uuid,text,bigint,text) to service_role;

drop function if exists public.mark_enrolment_paid_with_payment(uuid,text,text);
create or replace function public.mark_enrolment_paid_with_payment(p_intent_id uuid,p_payment_id text,p_order_id text,p_amount_paise bigint,p_currency text)
returns void language plpgsql security definer set search_path=public as $$
declare v_existing record; v_expected bigint;
begin
 if p_intent_id is null or p_payment_id is null or length(p_payment_id)=0 or length(p_payment_id)>64 then raise exception 'invalid arguments'; end if;
 if p_order_id is null or length(p_order_id)=0 or length(p_order_id)>64 then raise exception 'invalid arguments'; end if;
 if p_amount_paise is null or p_amount_paise<=0 then raise exception 'invalid amount'; end if;
 if upper(coalesce(p_currency,''))<>'INR' then raise exception 'invalid currency'; end if;
 select id,status,razorpay_order_id,razorpay_payment_id,razorpay_order_amount_paise,final_price_inr,base_price_inr into v_existing from public.enrolment_intents where id=p_intent_id for update;
 if not found then raise exception 'intent not found'; end if;
 if v_existing.razorpay_order_id is distinct from p_order_id then raise exception 'order/intent mismatch'; end if;
 v_expected:=coalesce(v_existing.razorpay_order_amount_paise,round(coalesce(v_existing.final_price_inr,v_existing.base_price_inr)::numeric*100));
 if p_amount_paise<>v_expected then raise exception 'payment amount mismatch'; end if;
 if v_existing.status='paid' and v_existing.razorpay_payment_id is not null then
   if v_existing.razorpay_payment_id is distinct from p_payment_id then raise exception 'payment already recorded for intent'; end if;
   return;
 end if;
 update public.enrolment_intents set status='paid',payment_status='paid',paid_at=coalesce(paid_at,now()),razorpay_payment_id=p_payment_id,payment_amount_paise=p_amount_paise,payment_currency='INR',failure_reason=null,updated_at=now() where id=p_intent_id;
end; $$;

revoke all on function public.mark_enrolment_paid_with_payment(uuid,text,text,bigint,text) from public,anon,authenticated;
grant execute on function public.mark_enrolment_paid_with_payment(uuid,text,text,bigint,text) to service_role;
