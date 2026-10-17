import type { CSSProperties } from 'react'

interface SunflowerProps {
  /** width in px (height follows the viewBox ratio) */
  size?: number
  className?: string
  style?: CSSProperties
  /** gentle CSS sway for decorative placements */
  sway?: boolean
  /** include the stem + leaves below the head */
  withStem?: boolean
  /** accessible label; omit for decorative flowers (aria-hidden) */
  label?: string
}

const OUTER_PETALS = Array.from({ length: 12 }, (_, i) => i * 30)
const INNER_PETALS = Array.from({ length: 12 }, (_, i) => i * 30 + 15)
const SEED_DOTS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 45 * Math.PI) / 180
  return { cx: 60 + Math.cos(angle) * 8, cy: 60 + Math.sin(angle) * 8 }
})

const OUTLINE = 'rgb(91 70 54 / 0.22)'

/**
 * Hand-crafted sunflower: two petal layers, dotted seed head,
 * optional stem. Pure SVG — scales to any size.
 */
export function Sunflower({
  size = 96,
  className = '',
  style,
  sway = false,
  withStem = false,
  label,
}: SunflowerProps) {
  const width = size
  const a11y = label
    ? ({ role: 'img', 'aria-label': label } as const)
    : ({ 'aria-hidden': true } as const)

  return (
    <svg
      {...a11y}
      viewBox={withStem ? '0 0 120 190' : '0 0 120 120'}
      width={width}
      className={`${sway ? 'anim-sway ' : ''}${className}`}
      style={style}
      focusable="false"
    >
      {withStem && (
        <g>
          <path
            d="M60 84 C57 112 63 142 60 182"
            fill="none"
            stroke="var(--color-sage-deep)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M60 124 C42 114 28 122 26 140 C44 147 57 140 60 124 Z"
            fill="var(--color-sage)"
            stroke={OUTLINE}
            strokeWidth="1"
          />
          <path
            d="M61 152 C77 143 91 151 93 166 C77 173 65 166 61 152 Z"
            fill="var(--color-sage-deep)"
            stroke={OUTLINE}
            strokeWidth="1"
          />
        </g>
      )}

      {/* outer petal layer (deeper butter) */}
      <g>
        {OUTER_PETALS.map((deg) => (
          <path
            key={`o-${deg}`}
            d="M60 6 C70 20 72 40 60 54 C48 40 50 20 60 6 Z"
            fill="var(--color-butter-deep)"
            stroke={OUTLINE}
            strokeWidth="1"
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
      </g>

      {/* inner petal layer (light butter, offset) */}
      <g>
        {INNER_PETALS.map((deg) => (
          <path
            key={`i-${deg}`}
            d="M60 14 C68 25 69.5 41 60 52 C50.5 41 52 25 60 14 Z"
            fill="var(--color-butter)"
            stroke={OUTLINE}
            strokeWidth="0.9"
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
      </g>

      {/* seed head */}
      <circle
        cx="60"
        cy="60"
        r="21"
        fill="#6B4F3A"
        stroke="rgb(91 70 54 / 0.4)"
        strokeWidth="1.2"
      />
      <circle
        cx="60"
        cy="60"
        r="14"
        fill="none"
        stroke="#4E3A2B"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {SEED_DOTS.map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r="1.7" fill="#4E3A2B" />
      ))}
      <circle cx="60" cy="60" r="3.4" fill="#4E3A2B" />
    </svg>
  )
}
