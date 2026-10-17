import type { CSSProperties } from 'react'

export type DoodleName = 'heart' | 'sparkle' | 'star' | 'arrow' | 'underline' | 'swirl' | 'flower'

interface DoodleProps {
  name: DoodleName
  className?: string
  style?: CSSProperties
  strokeWidth?: number
}

const VIEWBOXES: Record<DoodleName, string> = {
  heart: '0 0 24 24',
  sparkle: '0 0 24 24',
  star: '0 0 24 24',
  arrow: '0 0 24 24',
  swirl: '0 0 24 24',
  flower: '0 0 24 24',
  underline: '0 0 140 14',
}

function doodlePath(name: DoodleName) {
  switch (name) {
    case 'heart':
      return (
        <path d="M12 20.4c-1-.8-8.2-5.2-9.9-9.6C.6 7.2 2.9 4 6.2 4c2.2 0 4.3 1.3 5.8 3.4C13.5 5.3 15.6 4 17.8 4c3.3 0 5.6 3.2 4.1 6.8-1.7 4.4-8.9 8.8-9.9 9.6Z" />
      )
    case 'sparkle':
      return (
        <>
          <path d="M11 3c.7 4.6 1.4 5.3 6 6-4.6.7-5.3 1.4-6 6-.7-4.6-1.4-5.3-6-6 4.6-.7 5.3-1.4 6-6Z" />
          <path d="M19 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
        </>
      )
    case 'star':
      return (
        <path d="M12 3.6l2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8Z" />
      )
    case 'arrow':
      return (
        <>
          <path d="M3 18.5C5.5 10.5 10.5 5.6 18.2 5" />
          <path d="M18.3 9.2 18.2 5l-4.2 2.4" />
        </>
      )
    case 'swirl':
      return <path d="M18.5 11.5a6.5 6.5 0 1 0-6.5 6.5c3.2 0 4.4-2.2 3.2-4.2-1.1-1.9-4.2-1.9-5.2.6" />
    case 'flower':
      return (
        <>
          <circle cx="12" cy="6.6" r="2.7" />
          <circle cx="16" cy="9.5" r="2.7" />
          <circle cx="14.5" cy="14.2" r="2.7" />
          <circle cx="9.5" cy="14.2" r="2.7" />
          <circle cx="8" cy="9.5" r="2.7" />
          <circle cx="12" cy="11" r="1.6" />
        </>
      )
    case 'underline':
      return <path d="M4 9.5C24 3.5 44 11.5 64 7.5s40-8 72-1.5" />
  }
}

/** Hand-drawn line doodles — hearts, sparkles, arrows, underlines. */
export function Doodle({ name, className = '', style, strokeWidth }: DoodleProps) {
  return (
    <svg
      viewBox={VIEWBOXES[name]}
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? (name === 'underline' ? 4 : 1.8)}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {doodlePath(name)}
    </svg>
  )
}
