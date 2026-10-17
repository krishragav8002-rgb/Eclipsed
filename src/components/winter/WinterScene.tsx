import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PetalToSnowBurst } from './PetalToSnowBurst'
import { SnowFall } from './SnowFall'

const SOFT_EASE: [number, number, number, number] = [0.22, 0.9, 0.32, 1]

interface WinterSceneProps {
  /** true while the winter celebration owns the screen */
  active: boolean
  /** true while moonNote or phase2 owns the screen (winter night theme) */
  nightActive?: boolean
  /** true only on moonNote, so its storybook landscape does not affect phase 2 */
  storybookNightActive?: boolean
}

/** Deterministic constellations — small star clusters twinkling gently */
const CONSTELLATIONS = [
  { top: '8%', left: '12%', size: 3, delay: 0 },
  { top: '14%', left: '18%', size: 2, delay: 0.4 },
  { top: '10%', left: '24%', size: 2, delay: 0.8 },
  { top: '16%', left: '68%', size: 3, delay: 0.2 },
  { top: '12%', left: '74%', size: 2, delay: 0.6 },
  { top: '20%', left: '80%', size: 2, delay: 1.0 },
  { top: '24%', left: '16%', size: 2, delay: 0.3 },
  { top: '28%', left: '22%', size: 2, delay: 0.7 },
  { top: '26%', left: '72%', size: 2, delay: 0.5 },
  { top: '30%', left: '78%', size: 2, delay: 0.9 },
]

/**
 * The winter transformation, laid over the whole site.
 * Icy veil + snow stay active across winter and moonNote.
 * Winter-night theme (purple-dominant) active for phase2.
 */
export function WinterScene({ active, nightActive, storybookNightActive }: WinterSceneProps) {
  const reduced = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduced ? 0.01 : 1.4, ease: SOFT_EASE }}
        className="winter-veil absolute inset-0"
      >
        <svg
          aria-hidden="true"
          className="winter-story-art absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="winter-crystal-tile" width="116" height="104" patternUnits="userSpaceOnUse">
              <path d="M29 4 42 17 29 30 16 17Z M87 56 100 69 87 82 74 69Z" fill="none" stroke="#fff" strokeWidth="1.2" />
              <path d="M58 14v22m-9-16 18 11m0-11L49 31M0 69h19m-14-8 10 16m0-16L5 77" fill="none" stroke="#a99bcf" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="58" cy="14" r="1.8" fill="#fff" />
              <circle cx="5" cy="61" r="1.5" fill="#f2cbdc" />
            </pattern>
            <linearGradient id="winter-hill-back" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#c6d9f2" stopOpacity=".58" />
              <stop offset="1" stopColor="#b5b6dc" stopOpacity=".7" />
            </linearGradient>
            <linearGradient id="winter-hill-front" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#f4d5e3" stopOpacity=".78" />
              <stop offset="1" stopColor="#d7cbe9" stopOpacity=".88" />
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#winter-crystal-tile)" opacity=".12" />
          <g fill="none" stroke="#fff" strokeLinecap="round" opacity=".32">
            <path d="M70 154c25-28 47-27 65 0 17-20 36-20 53 0m1127 36c20-23 38-22 53 0 16-18 31-18 46 0" strokeWidth="2" />
            <path d="M83 236v36m-15-25 30 16m0-16-30 16m1248-68v34m-14-23 28 13m0-13-28 13" strokeWidth="1.7" />
            <path d="m222 116 4 10 10 4-10 4-4 10-4-10-10-4 10-4Zm1091 153 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
          </g>
          <path d="m0 731 126-104 76 58 119-135 102 107 135-161 121 153 95-85 123 103 132-145 126 113 123-82 162 111v236H0Z" fill="url(#winter-hill-back)" />
          <path d="M0 778c142-78 239-49 355-9 115 41 203 31 314-22 119-57 220-54 333-12 149 55 269 71 438-17v182H0Z" fill="#edf4ff" fillOpacity=".82" />
          <path d="M0 828c157-62 285-11 408 15 122 27 216 7 337-31 117-38 217-29 343 15 126 44 230 45 352-8v81H0Z" fill="url(#winter-hill-front)" />
          <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".55">
            <path d="M88 814c25-13 54-14 80-5m981-24c35-14 70-12 100 2m64 21c25-11 48-9 70-1" />
            <path d="M297 838c34-10 63-8 89 2m685-17c33-12 60-11 86 0" />
          </g>
          <g fill="#7d83ad" fillOpacity=".7" stroke="#73769f" strokeWidth="2" strokeLinejoin="round">
            <path d="m97 780 30-75 30 75h-17l20 33H94l20-33Zm1168-15 25-63 25 63h-14l18 29h-57l18-29Zm-1114 36 20-49 20 49h-12l15 23h-46l15-23Zm1054-5 20-49 20 49h-12l15 23h-46l15-23Z" />
          </g>
          <g stroke="#9d7e9f" strokeWidth="2" strokeLinejoin="round">
            <path d="m244 777 52-41 53 41v49H244Z" fill="#f0dce9" fillOpacity=".8" />
            <path d="m234 778 62-50 63 50" fill="none" stroke="#8c789d" strokeWidth="4" />
            <path d="M264 799h12v17h-12zm31-2h12v12h-12z" fill="#ffd98b" stroke="#f7d38e" className="winter-story-twinkle" />
            <path d="m1114 806 42-33 42 33v39h-84Z" fill="#f1dce9" fillOpacity=".78" />
            <path d="m1106 807 50-41 50 41" fill="none" stroke="#8c789d" strokeWidth="4" />
            <path d="M1134 824h11v15h-11zm25-18h11v11h-11z" fill="#ffdc91" stroke="#f7d38e" className="winter-story-twinkle" />
          </g>
        </svg>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: nightActive ? 1 : 0 }}
        transition={{ duration: reduced ? 0.01 : 1.4, ease: SOFT_EASE }}
        className="winter-night absolute inset-0"
      >
        {storybookNightActive && (
          <svg
            aria-hidden="true"
            className="winter-story-art absolute inset-0 h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="night-celestial-tile" width="144" height="128" patternUnits="userSpaceOnUse">
                <path d="M33 12a19 19 0 1 0 19 28A16 16 0 0 1 33 12Z" fill="none" stroke="#d5c4f3" strokeWidth="1.2" />
                <path d="m100 21 3 8 8 3-8 3-3 8-3-8-8-3 8-3Zm-54 65 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="none" stroke="#e9e0ff" strokeWidth="1" />
                <circle cx="123" cy="89" r="1.8" fill="#f4d99d" />
                <circle cx="94" cy="102" r="1.4" fill="#c9c5ed" />
                <path d="M96 102 109 94l14-5" fill="none" stroke="#b9b1df" strokeWidth=".8" strokeDasharray="2 4" />
              </pattern>
              <linearGradient id="night-hill-far" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#75689e" stopOpacity=".62" />
                <stop offset="1" stopColor="#50436f" stopOpacity=".9" />
              </linearGradient>
              <linearGradient id="night-hill-near" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#52476f" stopOpacity=".86" />
                <stop offset="1" stopColor="#302743" stopOpacity=".98" />
              </linearGradient>
            </defs>
            <rect width="1440" height="900" fill="url(#night-celestial-tile)" opacity=".17" />
            <g fill="none" stroke="#e2d7ff" strokeLinecap="round" opacity=".3">
              <path d="m115 193 75-48 73 33 76-58m844 132 65-43 81 24 70-50" strokeWidth="1.4" strokeDasharray="2 8" />
              <circle cx="115" cy="193" r="3" fill="#fff2d0" /><circle cx="190" cy="145" r="2.5" fill="#fff" />
              <circle cx="263" cy="178" r="3" fill="#fff2d0" /><circle cx="339" cy="120" r="2.4" fill="#fff" />
              <circle cx="1082" cy="252" r="2.5" fill="#fff" /><circle cx="1147" cy="209" r="3" fill="#fff2d0" />
              <circle cx="1228" cy="233" r="2.5" fill="#fff" /><circle cx="1298" cy="183" r="3" fill="#fff2d0" />
              <path d="M61 303c19-17 36-17 53 0 16-14 32-14 47 0m1070 54c19-17 36-17 53 0 16-14 32-14 47 0" strokeWidth="2" />
            </g>
            <path d="M0 698c114-92 208-71 319-15 101 51 204 57 327 4 116-49 235-83 357-34 147 59 270 55 437-36v283H0Z" fill="url(#night-hill-far)" />
            <path d="M0 770c156-75 252-50 379-6 129 45 233 20 345-30 119-53 227-47 353 10 133 61 227 54 363-18v174H0Z" fill="url(#night-hill-near)" />
            <path d="M0 783c171-29 256-2 365 32 105 34 191 27 289-3 56-17 113-31 177-19-61 25-105 55-130 107H0Zm1440-91c-116 40-211 46-321 17-61-16-118-24-181-10 56 23 97 59 118 110h384Z" fill="#9a9ac8" fillOpacity=".38" />
            <path d="M708 900c37-64 101-87 135-141 29-46 34-87 12-123 56 40 65 91 38 143-27 51-86 78-102 121Z" fill="#a9c7e2" fillOpacity=".55" stroke="#cad8ef" strokeOpacity=".42" strokeWidth="3" />
            <path d="M746 900c34-59 87-84 115-130 18-29 24-54 19-79" fill="none" stroke="#e4e5ff" strokeOpacity=".7" strokeWidth="2" />
            <g fill="#211a36" fillOpacity=".82">
              <path d="m129 773 29-75 29 75h-16l20 34h-66l20-34Zm96 10 22-57 22 57h-13l16 27h-50l16-27Zm1010-24 30-78 30 78h-17l21 36h-68l21-36Zm98 20 23-59 23 59h-13l16 28h-52l16-28Z" />
              <path d="m1031 804 25-65 25 65h-14l17 29h-56l17-29Zm-842 2 23-59 23 59h-13l16 28h-52l16-28Z" />
            </g>
            <g fill="#ffd88c" className="winter-story-twinkle">
              <circle cx="357" cy="762" r="3" /><circle cx="395" cy="779" r="2.5" /><circle cx="1050" cy="758" r="3" /><circle cx="1090" cy="773" r="2.5" />
              <circle cx="1223" cy="728" r="2" /><circle cx="252" cy="746" r="2" />
            </g>
            <g fill="none" stroke="#d9c8e6" strokeWidth="2" strokeLinecap="round" opacity=".38">
              <path d="M39 600c23-21 43-20 62 0 18-18 36-18 54 0m1158-42c23-21 43-20 62 0 18-18 36-18 54 0" />
            </g>
          </svg>
        )}
        {!reduced && (
          <div className="absolute inset-0">
            {/* Luminous moon */}
            <div className="absolute -top-12 -right-16 h-48 w-48 rounded-full bg-white/90 shadow-[0_0_120px_40px_rgba(255,255,255,0.4)]" />
            <div className="absolute -top-10 -right-14 h-40 w-40 rounded-full bg-white/70" />
            <div className="absolute -top-8 -right-12 h-32 w-32 rounded-full bg-white/90" />
            {/* Constellations */}
            {CONSTELLATIONS.map((c, i) => (
              <span
                key={i}
                className="star-twinkle absolute block rounded-full bg-white"
                style={{
                  top: c.top,
                  left: c.left,
                  width: c.size,
                  height: c.size,
                  animationDelay: `${c.delay}s`,
                  opacity: 0.9,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {(active || nightActive) && !reduced && <PetalToSnowBurst />}
      {(active || nightActive) && <SnowFall />}
    </div>
  )
}
