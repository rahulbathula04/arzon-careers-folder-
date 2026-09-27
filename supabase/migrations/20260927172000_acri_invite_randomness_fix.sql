-- Phase 2 follow-up: use supported UUID randomness for invite codes
begin;

create or replace function public.acri_approve_candidate(
  p_acri_candidate_id uuid,
  p_invite_code text default null
)
returns table(acri_candidate_id uuid,candidate_id uuid,invite_code text,status text)
language plpgsql
security definer
set search_path=public
as $$
declare
  v_candidate public.acri_candidates%rowtype;
  v_cohort public.acri_cohorts%rowtype;
  v_code text;
begin
  select ac.* into v_candidate
    from public.acri_candidates ac
   where ac.id=p_acri_candidate_id
   for update;
  if not found then raise exception 'ACRI candidate not found'; end if;

  if v_candidate.status='CREDENTIAL_ISSUED' then
    raise exception 'ACRI candidate has already completed certification';
  end if;

  if v_candidate.status='INVITED' and v_candidate.invite_code is not null then
    return query select v_candidate.id,v_candidate.candidate_id,v_candidate.invite_code,v_candidate.status;
    return;
  end if;

  if v_candidate.status<>'PENDING_REVIEW' then
    raise exception 'candidate must be in PENDING_REVIEW before approval';
  end if;

  select ac.* into v_cohort
    from public.acri_cohorts ac
   where ac.id=v_candidate.cohort_id
   for update;

  if not found or v_cohort.status<>'active' then
    raise exception 'ACRI cohort is not active';
  end if;

  if v_cohort.claimed_count >= v_cohort.capacity then
    raise exception 'The active ACRI cohort is currently full';
  end if;

  v_code:=upper(trim(coalesce(p_invite_code,'')));
  if v_code='' then
    v_code:='ACRI-PV-'||upper(substr(md5(gen_random_uuid()::text),1,10));
  end if;

  insert into public.acri_invitations(code,candidate_id,cohort_id,track,status,single_use)
  values(v_code,v_candidate.id,v_candidate.cohort_id,'pharmacovigilance','active',true);

  update public.acri_cohorts
     set claimed_count=claimed_count+1,updated_at=now()
   where id=v_cohort.id;

  update public.acri_candidates
     set status='APPROVED',updated_at=now()
   where id=v_candidate.id;

  update public.acri_candidates
     set status='INVITED',invite_code=v_code,updated_at=now()
   where id=v_candidate.id;

  insert into public.acri_events(event_name,candidate_id,invite_code,payload)
  values('candidate_approved_by_admin',v_candidate.id,v_code,jsonb_build_object(
    'canonical_candidate_id',v_candidate.candidate_id,
    'cohort_id',v_candidate.cohort_id,
    'approved_at',now()
  ));

  return query
    select v_candidate.id,v_candidate.candidate_id,v_code,
      (select ac2.status from public.acri_candidates ac2 where ac2.id=v_candidate.id);
end;
$$;

revoke all on function public.acri_approve_candidate(uuid,text) from public,anon,authenticated;
grant execute on function public.acri_approve_candidate(uuid,text) to service_role;

commit;
