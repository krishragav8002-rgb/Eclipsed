import type { CSSProperties } from 'react'

export type TapeTone = 'blush' | 'butter' | 'sage' | 'sky' | 'lilac'

interface TapeStripProps {
  tone?: TapeTone
  className?: string
  style?: CSSProperties
}

const TONES: Record<TapeTone, string> = {
  blush: 'bg-blush/85',
  butter: 'bg-butter/85',
  sage: 'bg-sage/80',
  sky: 'bg-sky/85',
  lilac: 'bg-lilac/85',
}

/** A little strip of washi tape, as if holding the paper down. */
export function TapeStrip({ tone = 'blush', className = '', style }: TapeStripProps) {
  return (
    <span
      aria-hidden="true"
      className={`tape-stripe pointer-events-none absolute block h-6 w-24 rounded-[2px] opacity-90 shadow-tape ${TONES[tone]} ${className}`}
      style={style}
    />
  )
}
