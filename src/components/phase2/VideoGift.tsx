import { useEffect, useRef, useState, type CSSProperties } from 'react'
import videoSrc from '../../../Video.mp4'
import { VIDEO_COPY, VIDEO_FALLBACK_ASPECT } from '../../content/phase2.config'
import { useBackgroundMusic } from '../BackgroundMusic'
import { SketchScatter, type ScatterItem } from '../scrapbook/SketchScatter'
import { Sketch } from '../scrapbook/sketches'
import { TapeStrip } from '../scrapbook/TapeStrip'
import { Constellation } from './Constellation'
import { GiftShell } from './GiftShell'

/** Read the configured "16 / 9" shape; anything unreadable falls back to 16:9. */
function parseAspect(value: string): number {
  const [w = 16, h = 9] = value.split('/').map((part) => Number(part.trim()))
  return w > 0 && h > 0 ? w / h : 16 / 9
}

const FALLBACK_RATIO = parseAspect(VIDEO_FALLBACK_ASPECT)

/**
 * The midnight cinema's margins: constellations' little relatives — crescent
 * moons, film strips, clapperboards, icy specks — scattered around the screen
 * and always behind the player, so film and controls are never covered.
 *
 * This screen draws them completely still (see `still` below), so the drifts
 * named here are ignored while the film is on screen.
 */
const VIDEO_SCATTER: readonly ScatterItem[] = [
  { name: 'crescent', top: '12%', left: '4%', size: '2.4rem', rotate: -8, opacity: 0.42, className: 'text-dream-lavender', drift: 'breathe' },
  { name: 'cloudStar', top: '9%', left: '88%', size: '2.2rem', rotate: 8, opacity: 0.36, className: 'text-icy-blue', drift: 'sway', delay: 0.5 },
  { name: 'sparkleCluster', top: '20%', left: '19%', size: '1.8rem', rotate: -6, opacity: 0.4, className: 'text-moonwhite', drift: 'twinkle', delay: 0.9 },
  { name: 'clapperboard', top: '22%', left: '90%', size: '2.2rem', rotate: 6, opacity: 0.34, className: 'text-lavender', drift: 'breathe', delay: 1.2 },
  { name: 'filmStrip', top: '31%', left: '0%', size: '3.6rem', rotate: -8, opacity: 0.3, className: 'text-icy-blue', drift: 'drift' },
  { name: 'asterisk', top: '36%', left: '93%', size: '1.5rem', rotate: 0, opacity: 0.34, className: 'text-dream-lavender', drift: 'twinkle', delay: 0.3 },
  { name: 'star', top: '45%', left: '3%', size: '1.4rem', rotate: 0, opacity: 0.36, className: 'text-moonwhite', drift: 'twinkle', delay: 1.5 },
  { name: 'dotsGrid', top: '58%', left: '92%', size: '3rem', rotate: -4, opacity: 0.26, className: 'text-lavender' },
  { name: 'snowflake', top: '64%', left: '6%', size: '1.7rem', rotate: 0, opacity: 0.3, className: 'text-frost', drift: 'breathe', delay: 0.6 },
  { name: 'filmStrip', top: '70%', left: '88%', size: '3.4rem', rotate: 7, opacity: 0.28, className: 'text-lavender', drift: 'drift', delay: 1 },
  { name: 'crescent', top: '76%', left: '8%', size: '1.9rem', rotate: 6, opacity: 0.34, className: 'text-icy-blue', drift: 'breathe', delay: 1.3 },
  { name: 'clapperboard', top: '80%', left: '90%', size: '2rem', rotate: -8, opacity: 0.3, className: 'text-dream-lavender', drift: 'sway', delay: 0.4 },
  { name: 'sparkleCluster', top: '86%', left: '24%', size: '1.6rem', rotate: 5, opacity: 0.36, className: 'text-moonwhite', drift: 'twinkle', delay: 1.1 },
  { name: 'bow', top: '88%', left: '69%', size: '2rem', rotate: 6, opacity: 0.28, className: 'text-dream-lavender', drift: 'sway', delay: 0.8 },
]

/**
 * Gift three — the film, screened in a midnight scrapbook.
 *
 * The source is `Video.mp4` in the project root, imported as an asset so Vite
 * serves it in development and hashes it into the build. Nothing here autoplays:
 * the visitor presses play, and when the film ends its message stays on screen
 * beneath the frame, with the player's own controls there for a second watch.
 *
 * The player sits in a frame that fits itself to the film's real shape: the
 * aspect ratio starts at a sane default and is corrected the moment the browser
 * reports the dimensions. Portrait clips are held to the height of the space,
 * landscape ones to its width, so the frame stays snug either way. Everything
 * decorative either lives behind the player or sits completely outside its
 * edges — the film and its native controls are never covered.
 *
 * This is the one screen that runs completely still: the snow, the drifting
 * blooms, the motes, the star field and every sketched drift are all switched
 * off here, so a phone has nothing to composite but the film itself.
 */
export function VideoGift({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { setVideoPlaying } = useBackgroundMusic()
  const [ended, setEnded] = useState(false)
  const [ratio, setRatio] = useState(FALLBACK_RATIO)

  useEffect(() => () => setVideoPlaying(false), [setVideoPlaying])

  const measure = () => {
    const video = videoRef.current
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      setRatio(video.videoWidth / video.videoHeight)
    }
  }

  const frameStyle: CSSProperties =
    ratio < 1
      ? { aspectRatio: ratio, height: '100%', width: 'auto', maxWidth: '100%' }
      : { aspectRatio: ratio, width: '100%', maxHeight: '100%' }

  return (
    <GiftShell
      tone="moon"
      eyebrow={VIDEO_COPY.eyebrow}
      title={VIDEO_COPY.title}
      backLabel={VIDEO_COPY.backLabel}
      onBack={onBack}
      contentWidth="max-w-3xl"
      headerVariant="marquee"
      still
      decor={
        <>
          <span aria-hidden="true" className="film-glow pointer-events-none absolute inset-0 z-0" />
          <Constellation className="pointer-events-none absolute right-2 top-24 w-20 text-icy-blue/45" />
          <Constellation flip className="pointer-events-none absolute bottom-24 left-2 w-16 text-dream-lavender/40" />
          <SketchScatter items={VIDEO_SCATTER} className="z-0" still />
        </>
      }
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="relative z-10 flex min-h-[10rem] flex-1 items-center justify-center pt-3">
          {/* a whisper of film perforations, kept well clear of the controls */}
          <div
            aria-hidden="true"
            className="film-perfs pointer-events-none absolute inset-x-4 top-0 h-1.5 rounded-[3px] opacity-50"
          />

          {/* The frame itself is the flex item, so `width/height: 100%` still
              resolves against the screen; only the film's corners are clipped,
              which leaves the frame free to carry its scrapbook decoration. */}
          <div className="film-frame relative" style={frameStyle}>
            <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[17px]">
              <video
                ref={videoRef}
                src={videoSrc}
                controls
                playsInline
                preload="metadata"
                onLoadedMetadata={measure}
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
                onEnded={() => {
                  setVideoPlaying(false)
                  setEnded(true)
                }}
                className="absolute inset-0 h-full w-full bg-black object-contain"
              />
            </span>

            {/* imperfect sketchbook outlines layered around the frame */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2.5 rotate-[0.7deg] rounded-[24px] border border-dashed border-dream-lavender/30"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 -rotate-[0.5deg] rounded-[20px] border border-icy-blue/20"
            />

            {/* tape holding the frame into the album — entirely above the film */}
            <TapeStrip
              tone="lilac"
              className="-left-1 -top-3 -rotate-6"
              style={{ height: '0.8rem', width: '4.5rem' }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 rotate-6 text-icy-blue/40"
            >
              <Sketch name="filmStrip" className="w-20" />
            </span>
          </div>
        </div>

        {ended && (
          <div className="relative z-10 mt-2.5 flex max-h-[42%] shrink-0 flex-col overflow-hidden rounded-2xl border border-dream-lavender/30 bg-midnight/70 px-4 py-3 text-center backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="film-perfs mb-2 block h-1.5 w-24 shrink-0 self-center rounded-[3px] opacity-50"
            />

            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-1">
              <p className="hand whitespace-pre-line text-[1.15rem] leading-snug text-moonwhite">
                {VIDEO_COPY.endingMessage}
              </p>
            </div>
          </div>
        )}
      </div>
    </GiftShell>
  )
}
