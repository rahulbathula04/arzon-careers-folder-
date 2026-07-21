# Git hygiene

GitHub refuses to accept any repository containing a blob > 100 MB — even
if the blob was deleted in a later commit. Once a large binary lands in
history, sync stays broken until history is rewritten. Guards live at
three layers.

## Enable local hooks (once per clone)

```bash
bun run hooks:install
```

Points `core.hooksPath` at `.githooks/`. The `pre-commit` hook blocks:

- files > 100 MB (GitHub's hard blob limit)
- banned filenames (`intro.mp4`, `task-inauguration.mp4`, …)
- video files > 10 MB (upload to CDN with `lovable-assets` instead)

`pre-push` re-scans the whole tree so a hook-less clone can't sneak a
large file in. Bypass with `git commit --no-verify` (avoid).

## Public asset audit

```bash
bun run scan:public-assets           # summary + writes manifest
bun run scan:public-assets:strict    # non-zero exit if anything unused
```

The manifest at `src/data/public-assets-manifest.json` powers
`/admin/assets`, which lists every file under `public/`, its size, and
whether it's referenced anywhere in the codebase.

## CI

`.github/workflows/large-blob-guard.yml` runs on every PR and push and
fails when the diff introduces a file > 100 MB or a banned filename.

## Purging a file already in history

If GitHub sync is blocked, run the purge helper **on your own machine**
(the Lovable sandbox can't rewrite git history):

```bash
./scripts/purge-history-blob.sh public/videos/task-inauguration.mp4
```

Requires `git-filter-repo` and a clean working tree. It rewrites every
branch and tag, then force-pushes to `origin`. Collaborators must re-clone.
