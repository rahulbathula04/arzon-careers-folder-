# Bootstrap the first admin (one-time)

The career-engine leads dashboard (`/admin/leads`) is protected by RLS:
only users with an `admin`, `reviewer`, or `support` role in
`public.user_roles` can read it. You're the project owner, so you need
one row in `user_roles` tied to your auth user. After that, every
other admin can be invited from `/admin/invites`.

## Steps

1. **Create your account.** Sign up at `/auth` with the email you want
   to use as the owner account. Make sure to verify it.

2. **Tell me your owner email.** Reply in chat with the email you used.
   I'll create a migration that promotes that exact email to `admin`
   in a single statement. The migration body looks like:

   ```sql
   INSERT INTO public.user_roles (user_id, role)
   SELECT id, 'admin'::public.app_role
     FROM auth.users
    WHERE lower(email) = lower('OWNER_EMAIL_HERE')
   ON CONFLICT (user_id, role) DO NOTHING;
   ```

3. **Sign in and open `/admin/leads`.** You'll see every Career Engine
   lead with name, email, phone, archetype, fit score, cohort interest,
   plus a "Details" button that opens a drawer with top-paths, ACRI
   payload, UTM source, and the full session trace.

4. **Invite the rest of your team** at `/admin/invites` with the right
   role (`admin` / `reviewer` / `support`). Reviewers and support can
   read leads but can't mutate roles or invites.

## Why we don't hard-code the email here

Migrations are committed to the repo and run in CI. Putting a personal
email in source would leak it. The migration is generated on demand
when you confirm the address.
