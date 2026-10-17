import { motion } from 'motion/react'
import { useState, type CSSProperties } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Motif, type MotifName } from '../scrapbook/sketches'
import { TapeStrip } from '../scrapbook/TapeStrip'

/**
 * The designed cover art — used by any entry the config gives no artwork, and as
 * the fallback if an image ever fails to load. All within the reds, so the cream
 * sketch on top of the tile always keeps its contrast.
 */
const COVER_GRADIENTS = [
  'linear-gradient(140deg, var(--color-blush-red) 0%, var(--color-cherry) 100%)',
  'linear-gradient(140deg, var(--color-blush-red) 0%, var(--color-pastel-red) 52%, var(--color-rose-ink) 100%)',
  'linear-gradient(140deg, var(--color-pastel-red) 0%, var(--color-rose-ink) 100%)',
  'linear-gradient(140deg, var(--color-cherry) 0%, var(--color-rose-ink) 100%)',
  'linear-gradient(140deg, var(--color-blush-red) 0%, var(--color-cherry) 55%, var(--color-rose-ink) 100%)',
  'linear-gradient(140deg, var(--color-pastel-red) 0%, var(--color-cherry) 100%)',
  'linear-gradient(160deg, var(--color-blush-red) 0%, var(--color-cherry) 42%, var(--color-rose-ink) 100%)',
  'linear-gradient(125deg, var(--color-cherry) 0%, var(--color-rose-ink) 55%, var(--color-cherry) 100%)',
  'linear-gradient(175deg, var(--color-pastel-red) 0%, var(--color-cherry) 45%, var(--color-rose-ink) 100%)',
]

/** The sketch printed on each designed cover, so no two tiles read the same. */
const COVER_MARKS: readonly MotifName[] = [
  'musicNote',
  'record',
  'headphones',
  'heart',
  'bow',
  'sparkleCluster',
  'cloudStar',
  'star',
  'asterisk',
]

/** Each frame is pinned up at its own slight angle, so the column reads handmade. */
const FRAME_TILTS = ['0.9deg', '-1.3deg', '0.5deg', '-0.8deg', '1.2deg', '-0.5deg', '1deg', '-1.1deg', '0.7deg']

const COVER_SHADOW = '0 4px 10px rgba(168,48,67,0.22)'

interface SongCoverProps {
  /** this song's artwork, served from `public/images/playlist/` */
  src?: string
  /** what the artwork shows, for anyone who can't see it */
  alt: string
  /** the entry's place in the list, which gives it its colour, sketch and angle */
  index: number
}

/**
 * One entry's cover: the song's own released artwork inside a hand-drawn frame,
 * or — when the entry has none, or the file will not load — the designed
 * scrapbook tile. The frame eases in just after its row, squeezes gently under a
 * press, and is pinned down with a scrap of washi tape.
 */
export function SongCover({ src, alt, index }: SongCoverProps) {
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const tilt = index % 2 === 0 ? -1.1 : 1.1
  const showArtwork = Boolean(src) && !failed

  return (
    <motion.span
      initial={
        reduced
          ? { opacity: 1, scale: 1, rotate: tilt }
          : { opacity: 0, scale: 0.82, rotate: tilt - 7 }
      }
      animate={{ opacity: 1, scale: 1, rotate: tilt }}
      transition={{
        duration: reduced ? 0.01 : 0.42,
        delay: reduced ? 0 : Math.min(index * 0.045, 0.27) + 0.05,
        ease: [0.22, 0.9, 0.32, 1],
      }}
      className="song-frame relative shrink-0"
      style={{ '--frame-tilt': FRAME_TILTS[index % FRAME_TILTS.length] } as CSSProperties}
    >
      {/* The artwork squeezes inside its frame with its own quick transition, so a
          press still answers at once on the rows low down the list. */}
      <motion.span
        whileTap={reduced ? undefined : { scale: 0.94 }}
        transition={{ duration: reduced ? 0.01 : 0.16, ease: 'easeOut' }}
        className="block"
      >
        {showArtwork ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailed(true)}
            className="size-13 block rounded-xl border border-cherry/20 object-cover"
            style={{ boxShadow: COVER_SHADOW }}
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-13 place-items-center rounded-xl text-paper/95"
            style={{
              background: COVER_GRADIENTS[index % COVER_GRADIENTS.length],
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), ${COVER_SHADOW}`,
            }}
          >
            <Motif
              name={COVER_MARKS[index % COVER_MARKS.length]}
              className="w-6"
              style={{ filter: 'drop-shadow(0 1px 1px rgba(122,31,46,0.35))' }}
            />
          </span>
        )}
      </motion.span>

      {/* a scrap of tape holding the cover into the journal */}
      <TapeStrip
        tone="blush"
        className="-left-3 -top-2 -rotate-6"
        style={{ height: '0.5rem', width: '1.9rem' }}
      />
    </motion.span>
  )
}
