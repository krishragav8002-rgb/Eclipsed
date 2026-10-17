import type { CSSProperties } from 'react'
import { Doodle, type DoodleName } from './Doodle'

/**
 * Phase 2's hand-drawn motif library: envelopes, music, film and sky bits for
 * the gift gallery and the three sketchbook worlds. Everything is inline SVG
 * with `currentColor` strokes — no images, no network requests — so a motif can
 * be tinted with a plain text colour and reused at any size.
 */
export type SketchName =
  | 'envelope'
  | 'paperclip'
  | 'stamp'
  | 'musicNote'
  | 'record'
  | 'headphones'
  | 'soundWave'
  | 'filmStrip'
  | 'clapperboard'
  | 'crescent'
  | 'cloudStar'
  | 'sparkleCluster'
  | 'spark'
  | 'asterisk'
  | 'leaf'
  | 'bow'
  | 'snowflake'
  | 'dotsGrid'
  | 'squiggle'

/** Both libraries share one namespace, so decoration tables can mix freely. */
export type MotifName = DoodleName | SketchName

const VIEWBOXES: Record<SketchName, string> = {
  envelope: '0 0 24 24',
  paperclip: '0 0 24 24',
  stamp: '0 0 24 24',
  musicNote: '0 0 24 24',
  record: '0 0 24 24',
  headphones: '0 0 24 24',
  soundWave: '0 0 120 24',
  filmStrip: '0 0 120 24',
  clapperboard: '0 0 24 24',
  crescent: '0 0 24 24',
  cloudStar: '0 0 24 24',
  sparkleCluster: '0 0 24 24',
  spark: '0 0 24 24',
  asterisk: '0 0 24 24',
  leaf: '0 0 24 24',
  bow: '0 0 24 24',
  snowflake: '0 0 24 24',
  dotsGrid: '0 0 60 20',
  squiggle: '0 0 60 16',
}

/** Wide motifs keep their own stroke weight so they don't turn into slabs. */
const WIDE: ReadonlySet<SketchName> = new Set<SketchName>(['soundWave', 'filmStrip', 'dotsGrid', 'squiggle'])

function sketchPaths(name: SketchName) {
  switch (name) {
    case 'envelope':
      return (
        <>
          <path d="M3.6 6.5C9.1 6 15.2 6 20.4 6.5c.4 3.8.4 7.5 0 11.3-5.2.5-11.3.5-16.8 0-.4-3.8-.4-7.5 0-11.3Z" />
          <path d="M4 7.1 12 13.2 20 7.1" />
        </>
      )
    case 'paperclip':
      return (
        <path d="M16.6 7.4v8.1a4.6 4.6 0 0 1-9.2 0V6.6a2.9 2.9 0 0 1 5.8 0v8.6a1.4 1.4 0 0 1-2.8 0V7.5" />
      )
    case 'stamp':
      return (
        <>
          <path d="M4 5.4h16v13.2H4z" strokeDasharray="2.2 2.6" />
          <path d="M12 8.5l1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.2-2 1.2.4-2.3-1.7-1.6 2.3-.3Z" />
        </>
      )
    case 'musicNote':
      return (
        <>
          <path d="M9.8 17.2V6.4l7.8-1.6v10.6" />
          <ellipse cx="7.5" cy="17.4" rx="2.6" ry="1.9" />
          <ellipse cx="15.3" cy="15.6" rx="2.6" ry="1.9" />
        </>
      )
    case 'record':
      return (
        <>
          <circle cx="12" cy="12" r="8.3" />
          <circle cx="12" cy="12" r="3.1" />
          <circle cx="12" cy="12" r="1" />
          <path d="M6.4 7.6A7.4 7.4 0 0 1 12.6 4.9" />
        </>
      )
    case 'headphones':
      return (
        <>
          <path d="M4.8 14.2v-2A7.2 7.2 0 0 1 19.2 12v2.2" />
          <path d="M4.8 12.4h2.1a1.3 1.3 0 0 1 1.3 1.3v3.4a1.3 1.3 0 0 1-1.3 1.3H5.8a1 1 0 0 1-1-1z" />
          <path d="M19.2 12.4h-2.1a1.3 1.3 0 0 0-1.3 1.3v3.4a1.3 1.3 0 0 0 1.3 1.3h1.1a1 1 0 0 0 1-1z" />
        </>
      )
    case 'soundWave':
      return (
        <path d="M6 10.5v3M13 7.5v9M20 9.5v5M27 5v14M34 8.5v7M41 10v4M48 6v12M55 9v6M62 7v10M69 10.5v3M76 5.5v13M83 8.5v7M90 10v4M97 7v10M104 9.5v5M111 6.5v11" />
      )
    case 'filmStrip':
      return (
        <>
          <path d="M2.5 4.5h115M2.5 19.5h115" />
          <path
            d="M9 4.5v15M24 4.5v15M39 4.5v15M54 4.5v15M69 4.5v15M84 4.5v15M99 4.5v15M114 4.5v15"
            strokeDasharray="1 4"
          />
        </>
      )
    case 'clapperboard':
      return (
        <>
          <path d="M4 10.4h16.2v8.4H4z" />
          <path d="M3.5 9.7 20.2 6.5l1 3.7-16.7 3.2z" />
          <path d="M10.6 12.6l4 2-4 2z" />
        </>
      )
    case 'crescent':
      return <path d="M14.9 3.6a8.9 8.9 0 1 0 5.6 14.6A9.3 9.3 0 0 1 14.9 3.6Z" />
    case 'cloudStar':
      return (
        <>
          <path d="M6.4 17.2h10.4a3.4 3.4 0 1 0-1.2-6.6 5 5 0 0 0-9.5 1.1 3.2 3.2 0 0 0 .3 5.5Z" />
          <path d="M17.4 3.2l.7 1.7 1.8.3-1.3 1.3.3 1.8-1.5-.9-1.6.9.3-1.8-1.3-1.3 1.8-.3Z" />
        </>
      )
    case 'sparkleCluster':
      return (
        <>
          <path d="M10.6 3c.7 4.6 1.4 5.3 6 6-4.6.7-5.3 1.4-6 6-.7-4.6-1.4-5.3-6-6 4.6-.7 5.3-1.4 6-6Z" />
          <path d="M18.6 14.6l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
          <path d="M6.4 15.4l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5Z" />
        </>
      )
    case 'spark':
      return (
        <path d="M12 3.4c.8 5.2 1.6 6 6.8 6.8-5.2.8-6 1.6-6.8 6.8-.8-5.2-1.6-6-6.8-6.8 5.2-.8 6-1.6 6.8-6.8Z" />
      )
    case 'asterisk':
      return <path d="M12 5.2v13.6M6.1 8.6l11.8 6.8M17.9 8.6 6.1 15.4" />
    case 'leaf':
      return (
        <>
          <path d="M5.6 18.4C5.6 11.8 10.2 6.9 18.4 6.4c0 7.6-4.8 12-12.8 12Z" />
          <path d="M8.4 15.8c1.9-2.7 4.4-4.8 7.6-6.2" />
        </>
      )
    case 'bow':
      return (
        <>
          <path d="M12 12.4c-1.7-2.9-3.5-4.3-5.2-4.1-1.8.2-2.7 1.6-2.3 3.3.4 1.8 1.9 2.8 4.1 2.5 1.4-.2 2.6-.9 3.4-1.7Z" />
          <path d="M12 12.4c1.7-2.9 3.5-4.3 5.2-4.1 1.8.2 2.7 1.6 2.3 3.3-.4 1.8-1.9 2.8-4.1 2.5-1.4-.2-2.6-.9-3.4-1.7Z" />
          <circle cx="12" cy="12.4" r="1.6" />
        </>
      )
    case 'snowflake':
      return (
        <>
          <path d="M12 3.4v17.2M4.6 7.8l14.8 8.4M19.4 7.8 4.6 16.2" />
          <path d="M9.6 5.2 12 3.4l2.4 1.8M9.6 18.8 12 20.6l2.4-1.8" />
        </>
      )
    case 'dotsGrid':
      return (
        <>
          <circle cx="8" cy="6" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="24" cy="6" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="40" cy="6" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="8" cy="14" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="24" cy="14" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="40" cy="14" r="1.4" fill="currentColor" stroke="none" />
        </>
      )
    case 'squiggle':
      return <path d="M3 9c4-4.6 7.4-4.6 11 0s7 4.6 11 0 7-4.6 11 0 7 4.6 11 0" />
  }
}

interface SketchProps {
  name: SketchName
  className?: string
  style?: CSSProperties
  strokeWidth?: number
}

/** One hand-drawn motif from the phase 2 sketchbook. */
export function Sketch({ name, className = '', style, strokeWidth }: SketchProps) {
  return (
    <svg
      viewBox={VIEWBOXES[name]}
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? (WIDE.has(name) ? 1.3 : 1.7)}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {sketchPaths(name)}
    </svg>
  )
}

const DOODLE_NAMES: ReadonlySet<string> = new Set<string>([
  'heart',
  'sparkle',
  'star',
  'arrow',
  'underline',
  'swirl',
  'flower',
])

interface MotifProps {
  name: MotifName
  className?: string
  style?: CSSProperties
  strokeWidth?: number
}

/** Either library, by name — so decoration tables can mix old doodles and new sketches. */
export function Motif({ name, className, style, strokeWidth }: MotifProps) {
  if (DOODLE_NAMES.has(name)) {
    return (
      <Doodle
        name={name as DoodleName}
        className={className}
        style={style}
        strokeWidth={strokeWidth}
      />
    )
  }
  return (
    <Sketch name={name as SketchName} className={className} style={style} strokeWidth={strokeWidth} />
  )
}

interface MysteryMarkProps {
  className?: string
  style?: CSSProperties
}

/**
 * The hand-drawn question mark an unopened gift shows instead of its
 * illustration. Two offset strokes give it the sketched, gone-over-twice look
 * of a pencil mark rather than a font glyph.
 */
export function MysteryMark({ className = '', style }: MysteryMarkProps) {
  return (
    <svg
      viewBox="0 0 100 130"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M30 38.5c2.4-15.6 18.4-25.6 30.8-18.4 11.6 6.8 12.2 21.4 2.8 30-6.4 5.9-11.4 9-13.4 18.6" />
      <path d="M33.6 36.6c3-13.8 17.6-22 28.4-16.4" opacity="0.5" strokeWidth="4.4" />
      <path d="M45.4 88.6c.6 2.2.6 4 .2 5.8" opacity="0.65" strokeWidth="5" />
      <circle cx="46.6" cy="107" r="5.6" />
      <path d="M41.6 109.6a5.6 5.6 0 0 0 10 0" opacity="0.45" strokeWidth="3.4" />
    </svg>
  )
}
