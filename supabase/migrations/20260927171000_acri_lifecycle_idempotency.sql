-- Phase 2 follow-up: ACRI lifecycle integrity and idempotent assessment finalization
begin;

create unique index if not exists acri_results_session_id_uq
  on public.acri_results(session_id);

create unique index if not exists acri_credentials_result_id_uq
  on public.acri_credentials(result_id);

create unique index if not exists acri_competency_scores_result_competency_uq
  on public.acri_competency_scores(result_id, competency_id);

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
  select * into v_candidate
    from public.acri_candidates
   where id=p_acri_candidate_id
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

  select * into v_cohort
    from public.acri_cohorts
   where id=v_candidate.cohort_id
   for update;

  if not found or v_cohort.status<>'active' then
    raise exception 'ACRI cohort is not active';
  end if;

  if v_cohort.claimed_count >= v_cohort.capacity then
    raise exception 'The active ACRI cohort is currently full';
  end if;

  v_code:=upper(trim(coalesce(p_invite_code,'')));
  if v_code='' then
    v_code:='ACRI-PV-'||upper(substr(encode(gen_random_bytes(8),'hex'),1,10));
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
      (select status from public.acri_candidates where id=v_candidate.id);
end;
$$;

create or replace function public.acri_finalize_assessment(
  p_session_id uuid,
  p_candidate_id uuid,
  p_result_id text,
  p_credential_id text default null
)
returns table(status text,credential_verified boolean)
language plpgsql
security definer
set search_path=public
as $$
declare
  v_session public.acri_sessions%rowtype;
  v_candidate public.acri_candidates%rowtype;
  v_result public.acri_results%rowtype;
  v_credential public.acri_credentials%rowtype;
begin
  select * into v_session
    from public.acri_sessions
   where id=p_session_id
   for update;

  if not found then raise exception 'Assessment session not found.'; end if;
  if v_session.candidate_id<>p_candidate_id then raise exception 'Assessment candidate mismatch.'; end if;

  select * into v_candidate
    from public.acri_candidates
   where id=p_candidate_id
   for update;

  if not found then raise exception 'ACRI candidate not found.'; end if;

  if v_session.status='submitted' then
    select * into v_result
      from public.acri_results
     where session_id=v_session.id and candidate_id=v_candidate.id
     order by created_at desc limit 1;

    if p_credential_id is not null then
      select * into v_credential
        from public.acri_credentials
       where credential_id=p_credential_id
         and result_id=v_result.id
         and candidate_id=v_candidate.id;
    end if;

    return query select v_candidate.status,coalesce(v_credential.is_verified,false);
    return;
  end if;

  if v_session.status<>'in_progress' or v_candidate.status<>'STARTED' then
    raise exception 'Assessment lifecycle cannot be finalized from the current state.';
  end if;

  select * into v_result
    from public.acri_results
   where id=p_result_id and session_id=v_session.id and candidate_id=v_candidate.id
   for share;

  if not found then
    raise exception 'Assessment result is not linked to this session.';
  end if;

  if p_credential_id is not null then
    select * into v_credential
      from public.acri_credentials
     where credential_id=p_credential_id
       and result_id=v_result.id
       and candidate_id=v_candidate.id
     for update;

    if not found then
      raise exception 'Credential record is not linked to this result.';
    end if;
  end if;

  update public.acri_sessions
     set status='submitted',completed_at=coalesce(completed_at,now())
   where id=v_session.id;

  update public.acri_candidates
     set status='COMPLETED',updated_at=now()
   where id=v_candidate.id;

  update public.acri_candidates
     set status='SCORED',updated_at=now()
   where id=v_candidate.id;

  if p_credential_id is not null then
    update public.acri_credentials
       set is_verified=true
     where credential_id=p_credential_id
       and result_id=v_result.id
       and candidate_id=v_candidate.id;

    update public.acri_candidates
       set status='CREDENTIAL_ISSUED',updated_at=now()
     where id=v_candidate.id;
  end if;

  update public.acri_invitations
     set status='used',used_at=coalesce(used_at,now())
   where id=v_session.invite_id
     and status='active';

  insert into public.acri_events(event_name,candidate_id,session_id,payload)
  values('assessment_lifecycle_finalized',v_candidate.id,v_session.id,jsonb_build_object(
    'canonical_candidate_id',v_candidate.candidate_id,
    'result_id',v_result.id,
    'credential_id',p_credential_id,
    'final_status',(select status from public.acri_candidates where id=v_candidate.id)
  ));

  return query
    select (select status from public.acri_candidates where id=v_candidate.id),
           (p_credential_id is not null);
end;
$$;

revoke all on function public.acri_approve_candidate(uuid,text) from public,anon,authenticated;
revoke all on function public.acri_finalize_assessment(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.acri_approve_candidate(uuid,text) to service_role;
grant execute on function public.acri_finalize_assessment(uuid,uuid,text,text) to service_role;

commit;
