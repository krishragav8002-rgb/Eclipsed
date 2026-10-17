import type { CSSProperties } from 'react'

interface PetalProps {
  size?: number
  /** any CSS colour (defaults to blush) */
  color?: string
  className?: string
  style?: CSSProperties
}

/** A single loose petal — used for falling-petal decoration. */
export function Petal({
  size = 14,
  color = 'var(--color-blush)',
  className = '',
  style,
}: PetalProps) {
  return (
    <svg
      viewBox="0 0 40 60"
      width={size}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 2 C31 15 33 40 20 58 C7 40 9 15 20 2 Z"
        fill={color}
        stroke="rgb(91 70 54 / 0.16)"
        strokeWidth="1.4"
      />
    </svg>
  )
}
