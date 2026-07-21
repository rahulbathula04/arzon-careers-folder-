# Sprint 1 · CRO audit

- Distinct primary CTA labels detected: **56** (target: canonical set of 5–7)
- Files emitting primary CTAs: **40**

## Top 25 CTA labels

| Label                                               | Occurrences |
| --------------------------------------------------- | ----------: |
| { const columns: CsvColumn                          |           4 |
| } className="mt-4" >                                |           2 |
| Start your application                              |           2 |
| {loading ? (                                        |           2 |
| Add                                                 |           2 |
| Cancel                                              |           1 |
| {busy ? "Processing…" : "Use this crop"}            |           1 |
| Reserve my seat                                     |           1 |
| Talk to a counsellor                                |           1 |
| Take the 3-min fit test                             |           1 |
| Continue                                            |           1 |
| {state.kind === "saving" ? "Saving…" :              |           1 |
| } trailingIcon={                                    |           1 |
| Preview a sample                                    |           1 |
| } className="shrink-0" >                            |           1 |
| See the full Deployment-Ready model                 |           1 |
| ← Previous                                          |           1 |
| Next →                                              |           1 |
| Resume enrolment →                                  |           1 |
| Go home                                             |           1 |
| {busy ? "Setting up…" : "Accept invite & continue"} |           1 |
| setBump((b) => b + 1)}> Refresh                     |           1 |
| onRestore(r)}>                                      |           1 |
| {busy ? "Adding…" : "Add certificate"}              |           1 |
| imgRef.current?.click()}>                           |           1 |

## Files with >1 distinct primary-CTA label (drift candidates)

| File                                           | Labels                                                                                                                                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/admin.certificates.tsx`            | { const columns: CsvColumn×1; {busy ? "Adding…" : "Add certificate"}×1; imgRef.current?.click()}>×1; pdfRef.current?.click()}>×1; {cert.is_published ? "Hide" : "Publish"}×1 |
| `src/routes/admin.roles.tsx`                   | { const columns: CsvColumn×1; {busy ? "Working…" : "Grant admin"}×1; onRevoke(a)} > Revoke×1; {wsBusy ? "Working…" : "Grant role"}×1; onRevokeWs(a)}> Revoke×1               |
| `src/routes/admin.demand.tsx`                  | {busy ? "Creating…" : "Create track"}×1; setEdit((v) => !v)}>{edit ? "Cancel" : "Edit"}×1; {busy ? "Saving…" : "Save changes"}×1; Add×2                                      |
| `src/components/admin/ThumbnailCropDialog.tsx` | Cancel×1; {busy ? "Processing…" : "Use this crop"}×1                                                                                                                         |
| `src/components/landing/ApplicationForm.tsx`   | Continue×1; {state.kind === "saving" ? "Saving…" :×1                                                                                                                         |
| `src/components/learn/PlayerLayout.tsx`        | ← Previous×1; Next →×1                                                                                                                                                       |
| `src/routes/admin.audit.tsx`                   | setBump((b) => b + 1)}> Refresh×1; onRestore(r)}>×1                                                                                                                          |
| `src/routes/admin.invites.tsx`                 | { const columns: CsvColumn×1; {creating ? "Creating…" : "Create invite"}×1                                                                                                   |
| `src/routes/admin.landing-changelog.tsx`       | {rollingBack ? (×1; {loading ? (×1                                                                                                                                           |
| `src/routes/admin.moments.$id.tsx`             | {saving ?×1; onRemoveImage(img.id)} >×1                                                                                                                                      |
| `src/routes/admin.moments.tsx`                 | {creating ?×1; onDelete(m.id)} >×1                                                                                                                                           |
| `src/routes/admin.results.tsx`                 | setConfirmExport(false)}>Cancel×1; Export {visible.length} rows×1                                                                                                            |
| `src/routes/apply.confirm.tsx`                 | Restart application×1; {paying ? (×1                                                                                                                                         |
