import { SketchArrow } from './doodles'

/**
 * The small pieces every Phase 3 page wears: the editorial label in the corner
 * of the paper, the progress rail in the footer, and the handwritten "you can
 * tap" cue. They are deliberately tiny — the chapter is meant to read as pages
 * of a sketchbook, not as a slideshow with a control panel.
 */

interface PageLabelProps {
  /** the number written in the corner */
  index: string
  /** the short label beside it */
  tag: string
  className?: string
}

/** `01 — ordinary days`, with a hairline trailing off after it. */
export function PageLabel({ index, tag, className = '' }: PageLabelProps) {
  return (
    <p className={`p3-label ${className}`}>
      <span className="p3-index">{index}</span>
      <span>{tag}</span>
    </p>
  )
}

interface ProgressRailProps {
  /** zero-based index of the page on screen */
  page: number
  total: number
}

/**
 * Where we are in the chapter: one small ink dash per page, the current one a
 * little longer and fully inked. Decorative for assistive tech, which gets the
 * same information as plain text instead.
 */
export function ProgressRail({ page, total }: ProgressRailProps) {
  return (
    <span className="flex items-center gap-2">
      <span className="p3-rail" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`p3-rail-dash ${
              i === page ? 'p3-rail-dash--on' : i < page ? 'p3-rail-dash--past' : ''
            }`}
          />
        ))}
      </span>
      <span className="sr-only">
        Page {page + 1} of {total}
      </span>
    </span>
  )
}

/**
 * The tap-to-continue cue, drawn rather than spelled out: the word "tap" in
 * handwriting with a sketch arrow pointing at the page it advances. Decorative
 * only (the whole plate is the real target), so it is kept out of the
 * accessibility tree.
 */
export function TapHint({ label }: { label: string }) {
  return (
    <span aria-hidden="true" className="p3-cue p3-float">
      <span>{label}</span>
      <SketchArrow className="w-5" />
    </span>
  )
}
