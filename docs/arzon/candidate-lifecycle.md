# Candidate Lifecycle

## Canonical identity

`public.candidates` is the system-wide candidate identity.

ACRI records reference it through `acri_candidates.candidate_id`.

## Lifecycle

Discovery → Candidate → Career Fit → ACRI → Programme → Payment → Learning → Evidence → Application → Interview → Placement → Retention.

Phase 2 establishes the ACRI portion:

Candidate
→ ACRI candidate record
→ pending review
→ approved
→ invitation
→ active session
→ completed/scored
→ credential issued

## Security rules

Client state is never trusted for candidate approval, assessment authorization, result ownership or credential validity.

Email is used as an initial matching attribute for candidate resolution. The durable relationship is the UUID foreign key.

