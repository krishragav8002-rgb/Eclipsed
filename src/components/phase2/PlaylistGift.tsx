import { motion } from 'motion/react'
import {
  PLAYLIST_COPY,
  PLAYLIST_SONGS,
  SPOTIFY_PLAYLIST_URL,
  type SongConfig,
} from '../../content/phase2.config'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Doodle } from '../scrapbook/Doodle'
import { DepthField, type DepthBand } from '../scrapbook/DepthField'
import { SketchScatter, type ScatterItem } from '../scrapbook/SketchScatter'
import { Motif, type MotifName } from '../scrapbook/sketches'
import { TapeStrip } from '../scrapbook/TapeStrip'
import { VisuallyHidden } from '../ui/VisuallyHidden'
import { GiftShell } from './GiftShell'
import { SongCover } from './SongCover'

/** The doodle each entry signs off with — one per song, and never busy. */
const ROW_MARKS: readonly MotifName[] = [
  'star',
  'heart',
  'sparkle',
  'musicNote',
  'record',
  'headphones',
  'asterisk',
  'bow',
  'cloudStar',
]

/**
 * The one small credit line under a song: the film (with its year, when the
 * config carries one) for a soundtrack, or the release date and label for a
 * standalone single. Everything else in the config stays metadata, off the card.
 */
function creditLine(song: SongConfig): string {
  if (song.film) return song.year ? `${song.film} (${song.year})` : song.film
  return [song.released, song.label].filter(Boolean).join(' · ')
}

/**
 * What each cover shows, for anyone who can't see it. The title and artists are
 * printed right beside the artwork, so the alt text names the release instead.
 */
function artworkAlt(song: SongConfig): string {
  if (song.film) return `${song.film}${song.year ? ` (${song.year})` : ''} soundtrack cover`
  return `${song.title} single cover`
}

/**
 * The entry's resting shadow and the glow it answers a press with. Both are kept
 * to the same three-layer shape so the press animates smoothly, and the resting
 * one is mirrored (as an inline style) from `.song-row` so the glow always has a
 * value to settle back to.
 */
const ROW_SHADOW = '0 0 0 2px rgba(228,99,108,0), 0 6px 14px rgba(168,48,67,0.1), inset 0 1px 0 rgba(255,255,255,0.9)'
const ROW_GLOW_SHADOW = '0 0 0 2px rgba(228,99,108,0.34), 0 9px 22px rgba(228,99,108,0.24), inset 0 1px 0 rgba(255,255,255,0.9)'

/**
 * Margin marks for the journal: two breathing sound waves in the side bands,
 * plus records, headphones, hearts and notes, all held to the reds so the screen
 * keeps a visual identity of its own. Hand-authored, decorative only.
 */
const PLAYLIST_SCATTER: readonly ScatterItem[] = [
  { name: 'soundWave', top: '34%', left: '-1%', size: '5.5rem', rotate: -90, opacity: 0.26, className: 'text-cherry', drift: 'wave', duration: 7.5, delay: 0.2 },
  { name: 'soundWave', top: '60%', left: '92%', size: '4.5rem', rotate: 90, opacity: 0.24, className: 'text-pastel-red', drift: 'wave', duration: 8.5, delay: 1.4 },
  { name: 'record', top: '9%', left: '2%', size: '2.4rem', rotate: -8, opacity: 0.32, className: 'text-cherry', drift: 'breathe' },
  { name: 'musicNote', top: '8%', left: '89%', size: '2.1rem', rotate: 8, opacity: 0.36, className: 'text-rose-ink', drift: 'twinkle', delay: 0.5 },
  { name: 'headphones', top: '22%', left: '93%', size: '2.3rem', rotate: 6, opacity: 0.28, className: 'text-blush-red', drift: 'breathe', delay: 1 },
  { name: 'heart', top: '29%', left: '3%', size: '1.7rem', rotate: -8, opacity: 0.38, className: 'text-blush-red', drift: 'twinkle', delay: 0.4 },
  { name: 'star', top: '44%', left: '94%', size: '1.5rem', rotate: 10, opacity: 0.36, className: 'text-pastel-red', drift: 'twinkle', delay: 1.3 },
  { name: 'asterisk', top: '52%', left: '2%', size: '1.6rem', rotate: 0, opacity: 0.3, className: 'text-cherry', drift: 'drift' },
  { name: 'sparkleCluster', top: '66%', left: '91%', size: '2rem', rotate: -6, opacity: 0.34, className: 'text-blush-red', drift: 'breathe', delay: 0.7 },
  { name: 'dotsGrid', top: '70%', left: '3%', size: '3.2rem', rotate: -3, opacity: 0.28, className: 'text-rose-ink' },
  { name: 'bow', top: '83%', left: '88%', size: '2.2rem', rotate: 8, opacity: 0.3, className: 'text-cherry', drift: 'sway', delay: 0.9 },
  { name: 'squiggle', top: '88%', left: '4%', size: '2.8rem', rotate: 0, opacity: 0.3, className: 'text-pastel-red', drift: 'drift' },
  { name: 'heart', top: '94%', left: '3%', size: '1.6rem', rotate: -8, opacity: 0.3, className: 'text-blush-red', drift: 'twinkle', delay: 1.6 },
]

/**
 * Blush confetti, cream paper flecks and a few drifting music notes, arranged
 * in three depths: distant glowing specks that only twinkle, confetti rising
 * through the middle distance, and a near band of larger flecks and sketched
 * notes and records. Everything here stays inside the reds and pinks — no
 * purple, no blue — and the bands wander at their own rates for depth.
 */
const PLAYLIST_DEPTH: readonly DepthBand[] = [
  {
    depth: 'far',
    parallax: 'slow',
    motes: [
      { top: '14%', left: '20%', size: '0.15rem', opacity: 0.6, className: 'bg-blush-red shadow-[0_0_7px_2px_rgba(228,99,108,0.45)]', twinkle: true, duration: 5.4 },
      { top: '10%', left: '56%', size: '0.16rem', opacity: 0.6, className: 'bg-pastel-red shadow-[0_0_7px_2px_rgba(244,169,162,0.45)]', twinkle: true, delay: 1.4, duration: 6.3 },
      { top: '28%', left: '86%', size: '0.14rem', opacity: 0.52, className: 'bg-cherry', twinkle: true, delay: 2.5, duration: 7.1 },
      { top: '42%', left: '8%', size: '0.15rem', opacity: 0.5, className: 'bg-blush-red', twinkle: true, delay: 0.6, duration: 6.7 },
      { top: '60%', left: '90%', size: '0.14rem', opacity: 0.5, className: 'bg-pastel-red shadow-[0_0_6px_2px_rgba(244,169,162,0.4)]', twinkle: true, delay: 3.2, duration: 7.5 },
      { top: '70%', left: '32%', size: '0.16rem', opacity: 0.55, className: 'bg-cherry shadow-[0_0_7px_2px_rgba(228,99,108,0.35)]', twinkle: true, delay: 1.9, duration: 5.8 },
      { top: '84%', left: '64%', size: '0.14rem', opacity: 0.48, className: 'bg-blush-red', twinkle: true, delay: 4.3, duration: 7.9 },
      { top: '50%', left: '50%', size: '0.13rem', opacity: 0.42, className: 'bg-pastel-red', twinkle: true, delay: 5.1, duration: 8.6 },
    ],
  },
  {
    depth: 'mid',
    parallax: 'mid',
    motes: [
      { top: '22%', left: '28%', size: '0.22rem', opacity: 0.5, className: 'bg-blush-red', delay: 0.5, duration: 10.5 },
      { top: '36%', left: '68%', size: '0.2rem', opacity: 0.45, className: 'bg-cherry', delay: 2, duration: 12 },
      { top: '54%', left: '16%', size: '0.24rem', opacity: 0.48, className: 'bg-pastel-red', delay: 3.2, duration: 11 },
      { top: '64%', left: '58%', size: '0.2rem', opacity: 0.42, className: 'bg-blush-red', delay: 1, duration: 12.4 },
      { top: '30%', left: '90%', size: '0.18rem', opacity: 0.4, className: 'bg-rose-ink/50', delay: 4.4, duration: 13 },
      { top: '78%', left: '22%', size: '0.22rem', opacity: 0.44, className: 'bg-cherry', delay: 5.6, duration: 11.4 },
      { top: '12%', left: '44%', size: '0.18rem', opacity: 0.4, className: 'bg-blush-red', delay: 6.3, duration: 12.8 },
      { top: '90%', left: '76%', size: '0.2rem', opacity: 0.42, className: 'bg-pastel-red', delay: 2.7, duration: 13.1 },
    ],
  },
  {
    depth: 'near',
    parallax: 'near',
    motes: [
      { top: '26%', left: '4%', size: '0.34rem', opacity: 0.36, className: 'bg-paper/90', shape: 'fleck', delay: 1.2, duration: 11.5 },
      { top: '56%', left: '94%', size: '0.4rem', opacity: 0.34, className: 'bg-paper/90', shape: 'fleck', delay: 3, duration: 12.5 },
      { top: '86%', left: '40%', size: '0.32rem', opacity: 0.3, className: 'bg-paper/85', shape: 'fleck', delay: 4.8, duration: 13.5 },
      { top: '34%', left: '78%', size: '1.1rem', opacity: 0.3, className: 'text-cherry/55', sketch: 'musicNote', duration: 16 },
      { top: '68%', left: '30%', size: '0.95rem', opacity: 0.26, className: 'text-rose-ink/45', sketch: 'musicNote', delay: 2.9, duration: 18 },
      { top: '46%', left: '10%', size: '0.9rem', opacity: 0.24, className: 'text-blush-red/50', sketch: 'record', delay: 1.4, duration: 17 },
      { top: '20%', left: '60%', size: '0.3rem', opacity: 0.34, className: 'bg-cherry/80 shadow-[0_0_9px_3px_rgba(228,99,108,0.3)]', delay: 0.8, duration: 11.2 },
    ],
  },
]

/**
 * Gift two — a red-only pastel music journal. No purple or blue here on purpose:
 * this screen keeps a visual identity of its own, right down to the snow.
 *
 * Every song is one curated music-journal entry (number, framed cover, title,
 * artists and a single credit line). The list scrolls inside itself, so the
 * Spotify sticker and "Back to the gifts ♡" are never trapped below a clipped
 * region. Nothing here pretends to play anything — the rows only answer a tap
 * with a soft blush glow.
 */
export function PlaylistGift({ onBack }: { onBack: () => void }) {
  const reduced = useReducedMotion()
  const songs = PLAYLIST_SONGS

  return (
    <GiftShell
      tone="red"
      eyebrow={PLAYLIST_COPY.eyebrow}
      title={PLAYLIST_COPY.title}
      backLabel={PLAYLIST_COPY.backLabel}
      onBack={onBack}
      headerVariant="label"
      decor={
        <>
          <DepthField bands={PLAYLIST_DEPTH} className="z-0" />
          <SketchScatter items={PLAYLIST_SCATTER} className="z-0" />
        </>
      }
      headerExtra={
        <div className="mt-1 flex items-center justify-center gap-2 text-cherry/70">
          <Doodle name="heart" className="w-3.5" />
          <span className="hand text-[1.05rem] leading-none text-rose-ink/85">
            {PLAYLIST_COPY.journalNote}
          </span>
          <Motif name="musicNote" className="w-3.5" />
        </div>
      }
      controls={
        <div className="mb-1.5 flex justify-center">
          <a
            href={SPOTIFY_PLAYLIST_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="sticker-btn"
          >
            <Motif name="musicNote" className="w-4" />
            {PLAYLIST_COPY.linkLabel}
          </a>
        </div>
      }
    >
      {/* The note, the song count and the songs share one scroll area, so the
          message drifts up out of the way as she reads down the list. The
          negative inline margin cancels the padding, which keeps the rows
          full-width while still giving the card's tape and its hanging music
          note room inside the scroller instead of being clipped by it. */}
      <div className="no-scrollbar -mx-3 min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 pb-1 pt-4">
        <div className="paper-tex relative rounded-[20px] border border-cherry/25 bg-paper/95 px-4 py-3 shadow-soft">
          <TapeStrip tone="blush" className="-top-2.5 left-7 -rotate-3" />
          <Motif name="musicNote" className="absolute -right-2 -top-3 w-6 rotate-12 text-cherry/45" />
          <div className="flex items-start gap-2.5">
            <Doodle name="heart" className="mt-1.5 w-4 shrink-0 text-cherry/70" />
            {/* the note is set in the display serif, a touch larger than body copy */}
            <p
              className="text-[1.05rem] leading-relaxed text-rose-ink"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {PLAYLIST_COPY.intro}
            </p>
          </div>
          <div aria-hidden="true" className="mt-1.5 flex items-center justify-end gap-1.5 text-cherry/45">
            <Motif name="star" className="w-3" />
            <Motif name="sparkleCluster" className="w-4" />
            <Motif name="heart" className="w-3" />
          </div>
        </div>

        <ul aria-label={PLAYLIST_COPY.title} className="mt-2">
          {songs.map((song, index) => {
            const credit = creditLine(song)
            /** the song's own video, or null while its link is still pending */
            const link = song.youtubeUrl

            return (
              <li key={`${song.title}-${index}`} className="mb-2.5">
                {/* The whole row is the link — artwork, title and artists all tap
                    through — and it opens in a new tab, so `rel` carries the
                    noopener/noreferrer pair. A song with no confirmed video yet
                    (`youtubeUrl: null`) keeps the same paper with no `href` at
                    all: nothing to tap, nothing to mislead. */}
                <motion.a
                  href={link ?? undefined}
                  target={link ? '_blank' : undefined}
                  rel={link ? 'noreferrer noopener' : undefined}
                  aria-disabled={link ? undefined : true}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={reduced ? undefined : { scale: 0.985, boxShadow: ROW_GLOW_SHADOW }}
                  transition={{
                    duration: reduced ? 0.01 : 0.35,
                    delay: reduced ? 0 : Math.min(index * 0.045, 0.27),
                    ease: [0.22, 0.9, 0.32, 1],
                  }}
                  style={{ boxShadow: ROW_SHADOW }}
                  className="song-row relative flex items-center gap-3 px-3 py-2.5"
                >
                  <span
                    aria-hidden="true"
                    className="song-number grid size-7 shrink-0 place-items-center text-[1.05rem]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <SongCover src={song.cover} alt={artworkAlt(song)} index={index} />

                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.95rem] font-extrabold leading-snug break-words text-rose-ink">
                      {song.title}
                    </span>
                    <span className="mt-0.5 block text-[0.78rem] font-semibold leading-snug break-words text-rose-ink/75">
                      {song.artists.join(', ')}
                    </span>
                    {credit ? (
                      <span className="mt-1 block text-[0.64rem] font-semibold uppercase leading-none tracking-[0.12em] text-rose-ink/55">
                        {credit}
                      </span>
                    ) : null}
                    {link ? (
                      <VisuallyHidden>
                        Opens the song’s official video on YouTube in a new tab
                      </VisuallyHidden>
                    ) : null}
                  </span>

                  {/* The entry's mark, and beneath it the small tell that the
                      row leaves for YouTube — an arrow, never a play button, so
                      the row never pretends to play the song here. */}
                  <span className="flex shrink-0 flex-col items-center gap-1">
                    <Motif
                      name={ROW_MARKS[index % ROW_MARKS.length]}
                      className="w-4 text-cherry/45"
                    />
                    {link ? (
                      <motion.span
                        aria-hidden="true"
                        whileTap={reduced ? undefined : { x: 1, y: -1 }}
                        className="text-[0.8rem] font-bold leading-none text-cherry/60"
                      >
                        ↗
                      </motion.span>
                    ) : null}
                  </span>

                  {/* a little red paper accent on every third entry */}
                  {index % 3 === 0 ? (
                    <TapeStrip
                      tone="blush"
                      className="-top-1.5 right-7 -rotate-3"
                      style={{ height: '0.6rem', width: '2rem' }}
                    />
                  ) : null}
                </motion.a>
              </li>
            )
          })}
        </ul>
      </div>
    </GiftShell>
  )
}
