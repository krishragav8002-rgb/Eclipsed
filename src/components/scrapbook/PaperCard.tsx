import type { CSSProperties, ReactNode } from 'react'

export type PaperTone = 'paper' | 'blush' | 'butter' | 'sage' | 'sky' | 'lilac'

interface PaperCardProps {
  children: ReactNode
  className?: string
  tone?: PaperTone
  /** hand-placed tilt in degrees */
  rotate?: number
  style?: CSSProperties
}

const TONES: Record<PaperTone, string> = {
  paper: 'bg-paper',
  blush: 'bg-blush/55',
  butter: 'bg-butter/55',
  sage: 'bg-sage/45',
  sky: 'bg-sky/60',
  lilac: 'bg-lilac/60',
}

/** A torn-from-the-pad paper card with grain, tilt and soft shadow. */
export function PaperCard({
  children,
  className = '',
  tone = 'paper',
  rotate = 0,
  style,
}: PaperCardProps) {
  return (
    <div
      className={`paper paper-tex rounded-card ${TONES[tone]} ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
    >
      {children}
    </div>
  )
}
