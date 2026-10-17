const DOTS = [
  [8, 62],
  [34, 30],
  [62, 46],
  [88, 12],
  [112, 34],
]

interface ConstellationProps {
  className?: string
  /** mirror the cluster, so repeated constellations don't look stamped */
  flip?: boolean
}

/** A hand-drawn constellation: a few stars joined by a faint, wavering line. */
export function Constellation({ className = '', flip = false }: ConstellationProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 62 34 30 62 46 88 12 112 34" opacity="0.5" />
      {DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="currentColor" stroke="none" />
      ))}
    </svg>
  )
}
