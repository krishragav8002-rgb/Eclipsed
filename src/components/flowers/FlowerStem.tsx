import type { CSSProperties } from 'react'

interface FlowerStemProps {
  className?: string
  style?: CSSProperties
}

/** A lone stem with two leaves — page-edge decoration. */
export function FlowerStem({ className = '', style }: FlowerStemProps) {
  return (
    <svg
      viewBox="0 0 90 170"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M45 8 C42 52 49 104 45 164"
        fill="none"
        stroke="var(--color-sage-deep)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M45 54 C28 44 12 52 10 72 C30 80 42 70 45 54 Z"
        fill="var(--color-sage)"
        stroke="rgb(91 70 54 / 0.2)"
        strokeWidth="1.2"
      />
      <path
        d="M46 104 C63 94 79 102 81 122 C61 130 49 120 46 104 Z"
        fill="var(--color-sage-deep)"
        stroke="rgb(91 70 54 / 0.2)"
        strokeWidth="1.2"
      />
      <circle cx="45" cy="10" r="5" fill="var(--color-butter-deep)" stroke="rgb(91 70 54 / 0.25)" />
    </svg>
  )
}
