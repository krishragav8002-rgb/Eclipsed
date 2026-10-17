import type { CSSProperties, ReactNode } from 'react'

export type StickerTone = 'butter' | 'blush' | 'sage' | 'lilac' | 'sky'

interface StickerProps {
  children: ReactNode
  tone?: StickerTone
  className?: string
  /** classes for the label text (size / weight / family) */
  textClassName?: string
  /** hand-applied tilt in degrees */
  rotate?: number
  style?: CSSProperties
}

const TONES: Record<StickerTone, string> = {
  butter: 'bg-butter',
  blush: 'bg-blush',
  sage: 'bg-sage',
  lilac: 'bg-lilac',
  sky: 'bg-sky',
}

/** A starburst paper sticker with a tiny printed label. */
export function Sticker({
  children,
  tone = 'butter',
  className = '',
  textClassName = 'text-[0.6rem]',
  rotate = -8,
  style,
}: StickerProps) {
  return (
    <span
      className={`sticker grid place-items-center ${TONES[tone]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <span
        className={`px-[20%] text-center font-extrabold uppercase leading-tight tracking-wider text-cocoa ${textClassName}`}
      >
        {children}
      </span>
    </span>
  )
}
