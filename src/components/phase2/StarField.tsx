/** Deterministic star layout — a scatter that never re-shuffles between renders. */
const STARS = [
  { top: '5%', left: '7%', size: 3, delay: 0 },
  { top: '11%', left: '17%', size: 2, delay: 0.5 },
  { top: '18%', left: '5%', size: 2, delay: 1.1 },
  { top: '8%', left: '37%', size: 2, delay: 0.3 },
  { top: '14%', left: '52%', size: 3, delay: 0.9 },
  { top: '6%', left: '63%', size: 2, delay: 1.4 },
  { top: '23%', left: '29%', size: 2, delay: 0.7 },
  { top: '27%', left: '44%', size: 2, delay: 1.8 },
  { top: '33%', left: '9%', size: 2, delay: 0.2 },
  { top: '39%', left: '87%', size: 3, delay: 1.2 },
  { top: '46%', left: '4%', size: 2, delay: 0.6 },
  { top: '53%', left: '93%', size: 2, delay: 1.6 },
  { top: '62%', left: '8%', size: 2, delay: 1.0 },
  { top: '70%', left: '91%', size: 2, delay: 0.45 },
  { top: '78%', left: '13%', size: 2, delay: 1.3 },
  { top: '85%', left: '80%', size: 3, delay: 0.75 },
  { top: '91%', left: '27%', size: 2, delay: 1.5 },
  { top: '95%', left: '58%', size: 2, delay: 0.35 },
]

interface StarFieldProps {
  className?: string
}

/**
 * A delicate field of twinkling stars. Decorative and pointer-transparent, so it
 * can sit behind content on any of the night-sky screens.
 */
export function StarField({ className = '' }: StarFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="star-twinkle absolute block rounded-full bg-moonwhite"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  )
}
