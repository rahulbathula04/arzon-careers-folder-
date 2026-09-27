# ACRI State Machine

## Server-authoritative states

REGISTERED → PENDING_REVIEW → APPROVED → INVITED → STARTED → COMPLETED → SCORED → CREDENTIAL_ISSUED

The database trigger `acri_candidate_state_guard` rejects invalid transitions.

## Authority boundaries

- Registration: `acri_register_candidate`
- Approval/invite issuance: `acri_approve_candidate`
- Assessment session: `acri_start_session`
- Finalization: `acri_finalize_assessment`
- Credential verification: `verifyAcriCredentialFn`

These functions are privileged server operations. Public and authenticated Data API roles cannot execute the lifecycle mutation RPCs directly.

## Session authorization

The invitation code resolves to an ACRI candidate on the server. A session token is then generated server-side and bound to the session. Autosave and submission require the session ID and matching token.

The result dossier requires that same issued session token. A result ID alone is not an authorization credential.

## Canonical identity

`acri_candidates.candidate_id` is a required foreign key to `public.candidates.id`. ACRI retains its own assessment-specific candidate record for historical lifecycle data, but it is no longer an independent person identity.

## Cohort allocation

Invite issuance locks the ACRI cohort row, checks capacity and increments `claimed_count` in the same transaction as the invitation issuance. A failed invitation insert rolls back the allocation.

## Assessment finalization

The assessment result is persisted before the candidate/session state becomes terminal. Result IDs are deterministic per session and unique session/result constraints make retries idempotent.

Credential IDs are deterministic from the result and unique per result.

