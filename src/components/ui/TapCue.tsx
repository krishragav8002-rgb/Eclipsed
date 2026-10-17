interface TapCueProps {
  className?: string
}

/**
 * A subtle, non-textual hint that the page advances on a tap: three gently
 * pulsing dots. Decorative only (aria-hidden) — it never reads as an
 * instruction and is stilled under reduced motion.
 */
export function TapCue({ className = '' }: TapCueProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-1.5 ${className}`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="tap-cue-dot size-1.5 rounded-full bg-cocoa-soft/70"
          style={{ animationDelay: `${i * 0.22}s` }}
        />
      ))}
    </div>
  )
}
