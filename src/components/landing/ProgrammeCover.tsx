import { forwardRef, memo } from "react";

/**
 * Shared cover container for programme cards. Guarantees a single, uniform
 * aspect ratio slot per viewport with strict overflow / object-fit rules so
 * mixed source aspect ratios (16:9, 500x500, 800x800) all crop identically
 * and never push adjacent cards out of alignment when the browser resizes,
 * zooms to 80 %, or picks a different srcSet variant.
 *
 * The wrapper reserves layout space via `aspect-*` so there is zero CLS
 * before the <img> resolves. The <img> itself carries width/height for the
 * intrinsic ratio and `max-w-full max-h-full` to defend against any parent
 * that accidentally lets content overflow (e.g. flex containers on Safari).
 */
export type ProgrammeCoverProps = {
  src: string;
  srcSet?: string;
  alt: string;
  /** Tailwind aspect utility, e.g. "aspect-[16/9]" (mobile) or "aspect-[16/7]" (desktop). */
  aspect: string;
  /** Responsive sizes hint used by the browser to pick the srcSet variant. */
  sizes: string;
  /** Overlay children rendered above the image (icon chip, salary pill, gradient). */
  children?: React.ReactNode;
  className?: string;
  imgClassName?: string;
};

export const ProgrammeCover = memo(
  forwardRef<HTMLDivElement, ProgrammeCoverProps>(function ProgrammeCover(
    { src, srcSet, alt, aspect, sizes, children, className = "", imgClassName = "" },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-programme-cover
        className={`relative ${aspect} w-full max-w-full overflow-hidden bg-muted ${className}`}
      >
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width={800}
          height={450}
          className={`absolute inset-0 block h-full w-full max-h-full max-w-full object-cover object-center ${imgClassName}`}
        />
        {children}
      </div>
    );
  }),
);
