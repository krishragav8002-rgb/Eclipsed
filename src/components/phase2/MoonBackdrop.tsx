import { DepthField, type DepthBand } from '../scrapbook/DepthField'
import { SketchScatter, type ScatterItem } from '../scrapbook/SketchScatter'
import { SnowFall } from '../winter/SnowFall'
import { BackdropScene } from './BackdropScene'
import { Constellation } from './Constellation'
import { StarField } from './StarField'

/**
 * A light hand-placed sprinkle of sky sketches. The three cards own the middle
 * of the screen — and they are opaque paper, so anything tucked behind them is
 * simply never seen — so every motif here sits in the side bands and the bottom
 * corners, kept low in opacity so the cards stay the clearest thing on screen.
 */
const SKY_SCATTER: readonly ScatterItem[] = [
  { name: 'cloudStar', top: '16%', left: '1%', size: '2.4rem', rotate: -6, opacity: 0.3, className: 'text-dream-lavender', drift: 'breathe' },
  { name: 'crescent', top: '30%', left: '0.5%', size: '2.1rem', rotate: 8, opacity: 0.36, className: 'text-moonwhite', drift: 'twinkle', delay: 0.6 },
  { name: 'snowflake', top: '46%', left: '1%', size: '1.9rem', rotate: 0, opacity: 0.26, className: 'text-lavender-deep', drift: 'breathe', delay: 0.3 },
  { name: 'sparkleCluster', top: '70%', left: '0.5%', size: '1.9rem', rotate: -6, opacity: 0.3, className: 'text-icy-blue', drift: 'twinkle', delay: 1 },
  { name: 'asterisk', top: '34%', left: '95%', size: '1.4rem', rotate: 0, opacity: 0.3, className: 'text-dream-lavender', drift: 'twinkle', delay: 0.4 },
  { name: 'bow', top: '58%', left: '95%', size: '1.9rem', rotate: 8, opacity: 0.24, className: 'text-icy-blue', drift: 'sway', delay: 1.4 },
  { name: 'star', top: '78%', left: '2.5%', size: '1.5rem', rotate: -8, opacity: 0.32, className: 'text-moonwhite', drift: 'twinkle', delay: 1.2 },
  { name: 'cloudStar', top: '88%', left: '4%', size: '2.1rem', rotate: 6, opacity: 0.26, className: 'text-dream-lavender', drift: 'sway', delay: 0.8 },
  { name: 'dotsGrid', top: '88%', left: '88%', size: '3rem', rotate: -4, opacity: 0.24, className: 'text-lavender-deep' },
]

/**
 * The sky's own depth: a far band of softly glowing stars that only twinkle, a
 * middle band of lavender dust rising slowly, and a near band of larger icy
 * flecks and sketched snowflakes drifting just in front of them. Each band also
 * wanders at its own rate, so the night reads as deep rather than flat.
 */
const SKY_DEPTH: readonly DepthBand[] = [
  {
    depth: 'far',
    parallax: 'slow',
    motes: [
      { top: '12%', left: '8%', size: '0.16rem', opacity: 0.75, className: 'bg-moonwhite shadow-[0_0_7px_2px_rgba(247,243,255,0.55)]', twinkle: true, duration: 5.2 },
      { top: '22%', left: '34%', size: '0.14rem', opacity: 0.6, className: 'bg-moonwhite shadow-[0_0_6px_2px_rgba(247,243,255,0.45)]', twinkle: true, delay: 1.1, duration: 6.4 },
      { top: '8%', left: '62%', size: '0.18rem', opacity: 0.7, className: 'bg-dream-lavender shadow-[0_0_8px_2px_rgba(199,177,242,0.5)]', twinkle: true, delay: 2.3, duration: 5.8 },
      { top: '30%', left: '88%', size: '0.15rem', opacity: 0.62, className: 'bg-moonwhite shadow-[0_0_6px_2px_rgba(247,243,255,0.4)]', twinkle: true, delay: 0.4, duration: 6.8 },
      { top: '58%', left: '12%', size: '0.14rem', opacity: 0.55, className: 'bg-icy-blue shadow-[0_0_6px_2px_rgba(185,200,255,0.45)]', twinkle: true, delay: 3.1, duration: 7.4 },
      { top: '66%', left: '44%', size: '0.16rem', opacity: 0.6, className: 'bg-moonwhite shadow-[0_0_6px_2px_rgba(247,243,255,0.4)]', twinkle: true, delay: 1.8, duration: 6.1 },
      { top: '74%', left: '78%', size: '0.18rem', opacity: 0.66, className: 'bg-dream-lavender shadow-[0_0_7px_2px_rgba(199,177,242,0.45)]', twinkle: true, delay: 2.6, duration: 5.5 },
      { top: '46%', left: '66%', size: '0.13rem', opacity: 0.5, className: 'bg-moonwhite', twinkle: true, delay: 4.4, duration: 8.2 },
      { top: '88%', left: '30%', size: '0.15rem', opacity: 0.58, className: 'bg-icy-blue', twinkle: true, delay: 3.8, duration: 7 },
    ],
  },
  {
    depth: 'mid',
    parallax: 'mid',
    motes: [
      { top: '16%', left: '22%', size: '0.24rem', opacity: 0.5, className: 'bg-dream-lavender/80', delay: 0.6, duration: 11 },
      { top: '34%', left: '74%', size: '0.2rem', opacity: 0.45, className: 'bg-lavender-deep/70', delay: 2.2, duration: 12.5 },
      { top: '50%', left: '16%', size: '0.22rem', opacity: 0.42, className: 'bg-icy-blue/70', delay: 3.4, duration: 10.5 },
      { top: '62%', left: '60%', size: '0.26rem', opacity: 0.48, className: 'bg-dream-lavender/75', delay: 1.2, duration: 13 },
      { top: '26%', left: '52%', size: '0.18rem', opacity: 0.4, className: 'bg-moonwhite/70', delay: 4.6, duration: 11.5 },
      { top: '72%', left: '36%', size: '0.2rem', opacity: 0.38, className: 'bg-lavender-deep/60', delay: 5.4, duration: 12 },
      { top: '42%', left: '90%', size: '0.22rem', opacity: 0.44, className: 'bg-dream-lavender/70', delay: 0.8, duration: 10.8 },
      { top: '82%', left: '66%', size: '0.18rem', opacity: 0.4, className: 'bg-icy-blue/60', delay: 6.2, duration: 13.5 },
    ],
  },
  {
    depth: 'near',
    parallax: 'near',
    motes: [
      { top: '20%', left: '6%', size: '0.34rem', opacity: 0.4, className: 'bg-frost/75', shape: 'fleck', delay: 1.4, duration: 12 },
      { top: '56%', left: '94%', size: '0.4rem', opacity: 0.35, className: 'bg-paper/70', shape: 'fleck', delay: 3.2, duration: 13 },
      { top: '84%', left: '20%', size: '0.36rem', opacity: 0.32, className: 'bg-frost/70', shape: 'fleck', delay: 5.1, duration: 14 },
      { top: '38%', left: '42%', size: '1.1rem', opacity: 0.32, className: 'text-moonwhite/45', sketch: 'snowflake', duration: 15 },
      { top: '68%', left: '82%', size: '0.9rem', opacity: 0.28, className: 'text-dream-lavender/40', sketch: 'snowflake', delay: 2.4, duration: 17 },
      { top: '12%', left: '88%', size: '0.3rem', opacity: 0.4, className: 'bg-moonwhite/70 shadow-[0_0_9px_3px_rgba(247,243,255,0.4)]', delay: 4.2, duration: 11 },
      { top: '90%', left: '52%', size: '0.28rem', opacity: 0.36, className: 'bg-dream-lavender/70', delay: 0.9, duration: 12 },
    ],
  },
]

/**
 * The gallery's illustrated night: an SVG sky with the moon, cloud wisps and
 * constellations already painted into it, a separate mountain range along the
 * bottom edge, then three depths of drifting particles, hand-drawn sky sketches,
 * faint constellations and gentle snow — edge to edge, so the whole viewport is
 * one uninterrupted winter night. Decorative only: every layer ignores pointer
 * events, and everything here sits behind the cards and the heading.
 */
export function MoonBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="moon-gallery-bg absolute inset-0" />

      {/* the ambient blooms, vignette and depth are shared with the gift screens */}
      <BackdropScene tone="gallery" />

      <StarField />

      <DepthField bands={SKY_DEPTH} className="z-0" />

      <Constellation className="absolute left-5 top-[22%] w-24 text-dream-lavender/70" />
      <Constellation flip className="absolute bottom-[20%] right-6 w-20 text-icy-blue/60" />
      <Constellation flip className="absolute bottom-[8%] left-[12%] w-16 text-dream-lavender/45" />

      <SketchScatter items={SKY_SCATTER} />

      <SnowFall className="opacity-70" />
    </div>
  )
}
