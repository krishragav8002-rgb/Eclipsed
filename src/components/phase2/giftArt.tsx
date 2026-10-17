/**
 * Hand-drawn line illustrations for the three gallery cards. They are shown
 * instead of a title until the visitor taps the card.
 */

interface ArtProps {
  className?: string
}

const ART_ATTRS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Gift one — an envelope with a little heart tucked inside. */
export function LetterArt({ className = '' }: ArtProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...ART_ATTRS}
    >
      <rect x="7" y="17" width="50" height="33" rx="5" />
      <path d="M8.5 21.5 32 38.5l23.5-17" />
      <path
        d="M32 50.5c-2.9-2.4-5.4-4.4-5.4-6.8a2.8 2.8 0 0 1 5.4-1.1 2.8 2.8 0 0 1 5.4 1.1c0 2.4-2.5 4.4-5.4 6.8Z"
        fill="currentColor"
        stroke="none"
        opacity="0.9"
      />
    </svg>
  )
}

/** Gift two — a pair of headphones. */
export function PlaylistArt({ className = '' }: ArtProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...ART_ATTRS}
    >
      <path d="M15 41v-6a17 17 0 0 1 34 0v6" />
      <rect x="8" y="38" width="11" height="17" rx="4.5" />
      <rect x="45" y="38" width="11" height="17" rx="4.5" />
      <path d="M50.5 55c0 3.4-3.6 4.6-11 4.6" opacity="0.6" />
    </svg>
  )
}

/** Gift three — a clapperboard with a play triangle. */
export function VideoArt({ className = '' }: ArtProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...ART_ATTRS}
    >
      <rect x="7" y="23" width="50" height="30" rx="5" />
      <path d="M7 23 13.5 11h41L48 23" />
      <path d="M27 12.5 23 22M43 12.5 39 22" opacity="0.7" />
      <path d="M29 33.5 40 39.5l-11 6Z" fill="currentColor" stroke="none" opacity="0.9" />
    </svg>
  )
}
