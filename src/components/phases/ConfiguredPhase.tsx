import { PencilLine, RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'
import { site, type ContentBlock, type PhaseContent } from '../../content/site.config'
import { useAutofocus } from '../../hooks/useAutofocus'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { Sunflower } from '../flowers/Sunflower'
import { Doodle } from '../scrapbook/Doodle'
import { PaperCard } from '../scrapbook/PaperCard'
import { Sticker } from '../scrapbook/Sticker'
import { TapeStrip } from '../scrapbook/TapeStrip'
import { FlowerButton } from '../ui/FlowerButton'

interface ConfiguredPhaseProps {
  content: PhaseContent
}

function renderBlock(block: ContentBlock, index: number): ReactNode {
  switch (block.kind) {
    case 'text':
      return (
        <PaperCard key={index} tone="paper" className="p-4">
          <p className="text-[0.95rem] leading-relaxed">{block.body}</p>
        </PaperCard>
      )

    case 'quote':
      return (
        <PaperCard key={index} tone="sky" className="relative p-4 pl-6">
          <TapeStrip tone="lilac" className="-top-3 right-6 rotate-3" />
          <Doodle name="heart" className="mb-1 w-5 text-sage-deep" />
          <blockquote
            className="italic"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem' }}
          >
            {block.body}
          </blockquote>
          {block.attribution && (
            <cite className="hand mt-1 block text-[1.1rem] not-italic text-cocoa-soft">
              {block.attribution}
            </cite>
          )}
        </PaperCard>
      )

    case 'list':
      return (
        <PaperCard key={index} tone="sage" className="p-4">
          <ul className="grid gap-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Sunflower size={18} className="mt-1 shrink-0" />
                <span className="text-[0.95rem] font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </PaperCard>
      )

    case 'placeholder':
      return (
        <div
          key={index}
          className="paper paper-tex grid place-items-center rounded-card border-2 border-dashed border-cocoa/25 bg-paper-dim/60 px-3 py-4 text-center"
        >
          <div>
            <PencilLine size={20} className="mx-auto text-cocoa-soft" aria-hidden="true" />
            <p className="hand mt-1 text-[1.05rem] text-cocoa-soft">{block.label}</p>
            <p className="mt-0.5 text-[0.55rem] font-extrabold uppercase tracking-[0.18em] text-cocoa-soft/80">
              reserved
            </p>
          </div>
        </div>
      )
  }
}

/**
 * Renders a content-driven phase from site.config — content stays in config,
 * this component only cares about structure.
 *
 * Fits the locked viewport: the column is centred and never scrolls, so the
 * block grid is intentionally compact (placeholder slots sit side by side).
 */
export function ConfiguredPhase({ content }: ConfiguredPhaseProps) {
  const go = usePhaseTransition()
  const containerRef = useAutofocus([])
  const isPlaceholder = content.status === 'placeholder'

  return (
    <section
      ref={containerRef}
      aria-labelledby="phase-title"
      className="safe-bottom relative flex h-full flex-1 flex-col overflow-hidden"
    >
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 sm:gap-4">
        <div className="relative">
          <p className="eyebrow">{content.eyebrow}</p>
          {isPlaceholder && (
            <Sticker
              tone="lilac"
              rotate={12}
              className="absolute -top-7 right-0 size-20"
              textClassName="text-[0.5rem]"
            >
              reserved
            </Sticker>
          )}
        </div>

        <h1
          id="phase-title"
          data-autofocus
          tabIndex={-1}
          className="max-w-[88%] text-[clamp(1.55rem,7vw,2.1rem)] leading-[1.14] text-frost"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textShadow: '0 0 20px rgba(188, 220, 240, 0.6)' }}
        >
          {content.title}
        </h1>

        {content.intro && (
          <p className="max-w-prose text-[0.95rem] leading-relaxed text-frost/90">{content.intro}</p>
        )}

        <div className={`grid gap-3 sm:gap-4 ${isPlaceholder ? 'grid-cols-2' : ''}`}>
          {content.blocks.map((block, index) => {
            if (block.kind === 'placeholder') {
              return (
                <div
                  key={index}
                  className="paper paper-tex grid place-items-center rounded-card border-2 border-dashed border-frost/40 bg-frost/10 px-3 py-4 text-center"
                >
                  <div>
                    <PencilLine size={20} className="mx-auto text-frost/80" aria-hidden="true" />
                    <p className="hand mt-1 text-[1.05rem] text-frost/90">{block.label}</p>
                    <p className="mt-0.5 text-[0.55rem] font-extrabold uppercase tracking-[0.18em] text-frost/80">
                      reserved
                    </p>
                  </div>
                </div>
              )
            }
            if (block.kind === 'list') {
              return (
                <PaperCard key={index} tone="lilac" className="p-4">
                  <ul className="grid gap-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-1 shrink-0">❄️</span>
                        <span className="text-[0.95rem] font-semibold text-cocoa">{item}</span>
                      </li>
                    ))}
                  </ul>
                </PaperCard>
              )
            }
            if (block.kind === 'quote') {
              return (
                <PaperCard key={index} tone="sky" className="relative p-4 pl-6">
                  <TapeStrip tone="lilac" className="-top-3 right-6 rotate-3" />
                  <blockquote
                    className="italic"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem' }}
                  >
                    {block.body}
                  </blockquote>
                  {block.attribution && (
                    <cite className="hand mt-1 block text-[1.1rem] not-italic text-cocoa-soft">
                      {block.attribution}
                    </cite>
                  )}
                </PaperCard>
              )
            }
            return (
              <PaperCard key={index} tone="paper" className="p-4">
                <p className="text-[0.95rem] leading-relaxed text-cocoa">{block.body}</p>
              </PaperCard>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <FlowerButton variant="secondary" icon={RotateCcw} onClick={() => go('greeting')}>
            Back to the first page
          </FlowerButton>
        </div>

        <p className="hand text-[1.15rem] text-frost/90">{site.closingNote}</p>
      </div>
    </section>
  )
}
