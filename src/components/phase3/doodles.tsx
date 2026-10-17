import type { CSSProperties, ReactNode } from 'react'

/**
 * Phase 3's hand-drawn marks.
 *
 * These are the same shapes as the doodle collection in the portfolio repo
 * (`src/components/doodles/Doodles.tsx`), re-drawn here as inline SVG so the
 * final chapter speaks the portfolio's exact visual language: hand-inked
 * squiggles under words, sparks, plus marks, stars, a moon, circled words and
 * a sketch arrow pointing at things from the margin.
 *
 * Every mark is stroke-only (`currentColor`), `aria-hidden` and free of any
 * layout opinion, so one can be dropped anywhere as pure decoration. Size and
 * colour always come from the wrapper class — e.g. `w-6 p3-tint-ink` (see the
 * `p3-tint-*` helpers in `global.css`).
 */
export interface MarkProps {
  /** size + tint, e.g. `w-6 p3-tint-ink` */
  className?: string
  /** stroke weight; the portfolio's marks sit at 1.6 */
  strokeWidth?: number
  style?: CSSProperties
}

function Shell({
  viewBox = '0 0 24 24',
  className = '',
  strokeWidth = 1.6,
  style,
  children,
}: MarkProps & { viewBox?: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/** A wavering underline to scrawl beneath a word. */
export function Scribble(props: MarkProps) {
  return (
    <Shell viewBox="0 0 120 16" {...props}>
      <path d="M2 10 C 16 3,28 14,42 8 S 70 4,84 9 S 110 13,118 6" />
    </Shell>
  )
}

/** Two passes of the pen under a line — the portfolio's emphasis mark. */
export function DoubleUnderline(props: MarkProps) {
  return (
    <Shell viewBox="0 0 120 16" {...props}>
      <path d="M2 6 C 22 10,44 3,66 7 S 100 9,118 4" />
      <path d="M8 13 C 28 16,52 9,80 13 S 106 14,116 10" />
    </Shell>
  )
}

/** The margin arrow: points from a handwritten note at whatever it explains. */
export function SketchArrow(props: MarkProps) {
  return (
    <Shell viewBox="0 0 48 24" {...props}>
      <path d="M3 18 C 18 15,32 9,44 6" />
      <path d="M34 2 L 45 6 L 39 15" />
    </Shell>
  )
}

/** A four-point spark. */
export function Spark(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M12 2 L14.6 9.4 L22 12 L14.6 14.6 L12 22 L9.4 14.6 L2 12 L9.4 9.4 Z" />
    </Shell>
  )
}

/** A small cross, scattered like tally marks in a notebook. */
export function PlusMark(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M12 4 L12 20 M4 12 L20 12" />
    </Shell>
  )
}

/** A five-point star, drawn in one pass. */
export function StarDoodle(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M12 3.5 L14.1 8.9 L20 9.5 L15.6 13.5 L17.2 19.3 L12 15.9 L6.8 19.3 L8.4 13.5 L4 9.5 L9.9 8.9 Z" />
    </Shell>
  )
}

/** A crescent moon — the birthday ending's own little mark. */
export function MoonDoodle(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M20 13.2 C 19.2 16.8 15.9 19.2 11.9 18.8 C 7.9 18.4 4.8 15.2 4.8 11.2 C 4.8 8.4 6.5 5.9 9 4.7 C 7.8 6.3 7.3 8.4 8 10.4 C 8.9 12.7 11.3 13.7 13.8 13.1 C 15.4 12.7 16.8 11.8 17.8 10.5 C 17.2 12.1 16.2 13.4 15 14.1" />
    </Shell>
  )
}

/** A loose circle, scratched round and round a word. */
export function CircleDoodle(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M12 21 C 5 21 3 12 12 12 C 21 12 19 3 12 3 C 5 3 5.5 21 12 21" />
    </Shell>
  )
}

/** Half a ring, for arcs in the margin. */
export function HalfRing(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M12 3 A 9 9 0 0 1 21 12" />
    </Shell>
  )
}

/** An eight-point asterisk. */
export function Asterisk(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M12 3 V21 M3 12 H21 M5.6 5.6 L18.4 18.4 M18.4 5.6 L5.6 18.4" />
    </Shell>
  )
}

/** A stubby pencil — the apology page's own prop. */
export function Pencil(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M3 21 L10.5 13.5" />
      <path d="M20.5 3.5 C 19.3 2.3 17 2.7 16 4 L7 13 L11 17 L20 8 C 21.3 7 21.7 4.7 20.5 3.5 Z" />
      <path d="M7 13 L11 17 M16 4 L20 8" />
    </Shell>
  )
}

/** A small cloud, filled with paper so it reads as a cut-out. */
export function CloudDoodle({ className = '', strokeWidth = 1.8, style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 40"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14 34 C 6 34 4 26 10 22 C 10 16 20 12 26 16 C 30 10 42 12 44 18 C 52 18 56 26 50 30 C 52 36 44 38 38 34 Z"
        fill="var(--p3-paper-2)"
      />
      <path d="M18 27 C 24 24 32 24 38 27" strokeWidth={1.4} opacity="0.6" />
      <path d="M22 32 C 27 30 33 30 37 32" strokeWidth={1.2} opacity="0.5" />
    </svg>
  )
}

/** A pen spiral, the doodle you draw while thinking. */
export function Scratch(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M12 21 C 6 21 4 15 7 11 C 10 7 16 7 17 12 C 18 16 14 18 12 16 C 10 14 10 11 12 10" />
    </Shell>
  )
}

/** A small sun with a paper-soft disc — the summer page's own mark. */
export function SunDoodle(props: MarkProps) {
  return (
    <Shell viewBox="0 0 48 48" {...props}>
      <circle cx="24" cy="24" r="9" fill="var(--p3-yellow-soft)" strokeWidth={1.8} />
      <path
        d="M24 7 V3 M24 45 V41 M7 24 H3 M45 24 H41 M12 12 L9.2 9.2 M38.8 9.2 L36 12 M12 36 L9.2 38.8 M36 36 L38.8 38.8"
        strokeWidth={2}
        opacity="0.8"
      />
      <path d="M28 22 A 4.2 4.2 0 0 1 22 27.5" strokeWidth={1.4} opacity="0.7" />
    </Shell>
  )
}

/** A hand-drawn outline heart, drawn in one pass — Part A's own little mark. */
export function HeartDoodle(props: MarkProps) {
  return (
    <Shell {...props}>
      <path d="M12 20.4 C 6.4 16.4 3 13.1 3 9.6 C 3 6.7 5.3 4.6 7.9 4.6 C 9.8 4.6 11.3 5.7 12 7 C 12.7 5.7 14.2 4.6 16.1 4.6 C 18.7 4.6 21 6.7 21 9.6 C 21 13.1 17.6 16.4 12 20.4 Z" />
    </Shell>
  )
}
