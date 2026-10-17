import { GALLERY_COPY, GIFT_CARDS, GIFT_LAYOUT } from '../../content/phase2.config'
import { useAutofocus } from '../../hooks/useAutofocus'
import type { GiftId } from '../../state/experienceReducer'
import { FlowerButton } from '../ui/FlowerButton'
import { GiftCard } from './GiftCard'
import { MoonBackdrop } from './MoonBackdrop'

interface GiftGalleryProps {
  /** gifts opened during this visit */
  opened: ReadonlySet<GiftId>
  /** the gift the visitor has just come back from, if any */
  justReturned: GiftId | null
  onOpen: (gift: GiftId) => void
  onContinue: () => void
  /**
   * True while a gift fills the screen: the gallery can't be tapped behind it
   * and — since it is completely covered — every loop inside it is paused, so
   * the visitor's phone is left free for the gift itself.
   */
  inert: boolean
}

/**
 * "Under the Moon" — all three cards are on screen the moment the phase opens,
 * with no welcome screen or intro sequence to sit through.
 *
 * The composition spreads across the whole viewport around three deliberately
 * small sheets: a 2 + 1 scrapbook cluster on a phone, and one loose row on a
 * wide screen where the extra width pushes the cards apart instead of widening
 * a panel. Tilts and insets come from `GIFT_LAYOUT` and every card is tinted
 * for the gift it holds, so the gallery reads as hand-made rather than gridded.
 *
 * Each card reveals its title and illustration itself, once its gift has been
 * visited and the visitor is back — `justReturned` names the one that has just
 * been closed.
 */
export function GiftGallery({ opened, justReturned, onOpen, onContinue, inert }: GiftGalleryProps) {
  const allOpened = opened.size === GIFT_CARDS.length
  // Announce the gallery on arrival, and again whenever a gift closes and the
  // gallery becomes tappable once more.
  const headerRef = useAutofocus([inert])

  return (
    <div
      inert={inert}
      className={`relative flex h-full min-h-0 flex-1 flex-col overflow-hidden ${inert ? 'gallery-frozen' : ''}`}
    >
      <MoonBackdrop />

      <header ref={headerRef} className="safe-top safe-x relative z-10 shrink-0 pb-1 text-center">
        <p className="mt-6 text-[0.58rem] font-extrabold uppercase tracking-[0.3em] text-dream-lavender/85">
          {GALLERY_COPY.eyebrow}
        </p>
        <h1
          data-autofocus
          tabIndex={-1}
          className="mt-1 text-[clamp(1.25rem,5.6vw,2.1rem)] leading-tight text-moonwhite"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            textShadow: '0 0 26px rgba(199,177,242,0.6)',
          }}
        >
          {GALLERY_COPY.title}
        </h1>
        <p className="mt-1 text-[0.72rem] font-semibold text-moonblush/85">{GALLERY_COPY.hint}</p>
      </header>

      <div className="safe-x relative z-10 flex min-h-0 flex-1 flex-wrap content-center items-center justify-center gap-x-5 gap-y-6 py-2 sm:flex-nowrap sm:justify-evenly sm:gap-x-8 sm:py-4">
        {GIFT_CARDS.map((card) => (
          <GiftCard
            key={card.id}
            id={card.id}
            title={card.title}
            layout={GIFT_LAYOUT[card.id]}
            opened={opened.has(card.id)}
            justReturned={justReturned === card.id}
            onOpen={() => onOpen(card.id)}
          />
        ))}
      </div>

      <footer className="safe-bottom safe-x relative z-10 shrink-0">
        <div className="flex flex-col items-center gap-1.5">
          <FlowerButton
            variant={allOpened ? 'primary' : 'secondary'}
            disabled={!allOpened}
            onClick={onContinue}
          >
            {GALLERY_COPY.continueLabel}
          </FlowerButton>
          <p className="text-center text-[0.68rem] font-semibold text-moonblush/85">
            {allOpened
              ? `${opened.size} of ${GIFT_CARDS.length} gifts opened 💜`
              : `${GALLERY_COPY.lockedHint} · ${opened.size}/${GIFT_CARDS.length}`}
          </p>
        </div>
      </footer>
    </div>
  )
}
