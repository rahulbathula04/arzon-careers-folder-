# Tone Guards

The site renders on a global `.tone-dark` shell. Any solid-white surface
nested inside that shell must opt out of the dark colour cascade, or the
`.tone-dark` overrides in `src/styles.css` invert text/icons and produce
white-on-white content.

## Rule

Every JSX element whose `className` includes `bg-white` (or `bg-[#fff]` /
`bg-[#ffffff]`) **must** also include `tone-light` or `card-light` in the
same `className` expression.

Translucent whites (`bg-white/10`, `bg-white/[0.04]`, etc.) are exempt -
those sit as tints on dark cards and don't trigger the cascade.

## Canonical example

`src/components/common/TaskLogo.tsx` renders the TASK partner mark on a
white pill inside a dark footer chip. The wrapper carries `tone-light`:

```tsx
<span className="tone-light inline-flex items-center justify-center rounded-sm bg-white">
  <img src={taskLogo.url} alt="TASK - Telangana Academy for Skill and Knowledge" />
</span>
```

Without `tone-light`, the surrounding `.tone-dark` selectors would bleach
the pill and hide the multi-colour logo.

## Enforcement

`scripts/check-tone-light-cards.mjs` (wired into `prebuild:dev`) fails the
build if a new `.tsx` under `src/components/` or `src/routes/` introduces
an unguarded `bg-white` surface. The script also runs a self-test on every
invocation, so the detector itself can't silently regress.

Grandfathered legacy files live in the `BASELINE` set inside the script -
drop entries from that set as those files are migrated.

## Fallback pattern

Image-based marks on white pills should also handle image failure - see
`TaskLogo` for the `onError` → text-pill fallback so the credential row
never looks broken.
