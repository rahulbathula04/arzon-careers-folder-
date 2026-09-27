-- Production payment hardening: align enrolment intents with the current cohort
-- and make paid seat claims idempotent under webhook retries/concurrency.

begin;

alter table public.enrolment_intents
  add column if not exists cohort_id text references public.cohorts(id);

insert into public.cohorts(
  id,display_label,starts_at,lock_at,seats_cap,seats_taken,is_locked,lock_reason
)
values(
  'nov-2026',
  '11 November 2026',
  '2026-11-11T00:00:00+05:30',
  '2026-11-04T23:59:00+05:30',
  60,
  0,
  false,
  null
)
on conflict(id) do update set
  display_label=excluded.display_label,
  starts_at=excluded.starts_at,
  lock_at=excluded.lock_at;

create or replace function public.assign_enrolment_cohort()
returns trigger
language plpgsql
security definer
set search_path=public
as $function$
begin
  if new.cohort_id is null then
    select c.id into new.cohort_id
      from public.cohorts c
     where c.is_locked=false
       and c.seats_taken < c.seats_cap
       and c.lock_at > now()
       and c.starts_at > now()
     order by c.starts_at asc
     limit 1;
  end if;
  return new;
end;
$function$;

drop trigger if exists enrolment_intents_assign_cohort on public.enrolment_intents;
create trigger enrolment_intents_assign_cohort
before insert on public.enrolment_intents
for each row execute function public.assign_enrolment_cohort();

create table if not exists public.cohort_seat_claims (
  id uuid primary key default gen_random_uuid(),
  cohort_id text not null references public.cohorts(id) on delete cascade,
  payment_id text not null unique,
  intent_id uuid not null references public.enrolment_intents(id) on delete cascade,
  seats_taken_after integer,
  created_at timestamptz not null default now()
);

alter table public.cohort_seat_claims enable row level security;
revoke all on public.cohort_seat_claims from anon,authenticated,public;
grant all on public.cohort_seat_claims to service_role;

create index if not exists idx_cohort_seat_claims_cohort
  on public.cohort_seat_claims(cohort_id,created_at desc);

create or replace function public.cohort_claim_seat(
  p_cohort_id text,
  p_payment_id text,
  p_intent_id uuid
)
returns integer
language plpgsql
security definer
set search_path=public
as $function$
declare
  v_new_taken integer;
  v_existing integer;
begin
  if nullif(trim(coalesce(p_cohort_id,'')),'') is null
     or nullif(trim(coalesce(p_payment_id,'')),'') is null
     or p_intent_id is null then
    raise exception 'invalid seat claim';
  end if;

  insert into public.cohort_seat_claims(cohort_id,payment_id,intent_id)
  values(p_cohort_id,p_payment_id,p_intent_id)
  on conflict(payment_id) do nothing;

  if not found then
    select seats_taken_after into v_existing
      from public.cohort_seat_claims
     where payment_id=p_payment_id;
    if v_existing is not null then
      return v_existing;
    end if;
  end if;

  update public.cohorts
     set seats_taken=seats_taken+1,updated_at=now()
   where id=p_cohort_id
     and is_locked=false
     and seats_taken < seats_cap
     and now() < lock_at
     and starts_at > now()
   returning seats_taken into v_new_taken;

  if v_new_taken is null then
    raise exception 'cohort_locked';
  end if;

  update public.cohort_seat_claims
     set seats_taken_after=v_new_taken
   where payment_id=p_payment_id;

  insert into public.cohort_audit_log(cohort_id,actor_id,action,after)
  values(
    p_cohort_id,
    auth.uid(),
    'seat_claim',
    jsonb_build_object(
      'seats_taken',v_new_taken,
      'payment_id',p_payment_id,
      'intent_id',p_intent_id
    )
  );

  return v_new_taken;
end;
$function$;

revoke all on function public.cohort_claim_seat(text,text,uuid) from public,anon,authenticated;
grant execute on function public.cohort_claim_seat(text,text,uuid) to service_role;

commit;
