/* ============================================================================
   PHASE 3 — "In every universe, it's you 💜"
   ----------------------------------------------------------------------------
   This is the ONLY file you need to touch to change what Phase 3 says.

   Every string below is editable. The wording was drafted to fit the ideas you
   gave me — swap any line for your own words and nothing else needs to change.
   Lines marked `✏️ EDIT ME` are the ones I would most expect you to rewrite,
   because only you know how you actually say these things.

   Asset paths are real files already in this project (verified, not guessed):
     · gifs/optimized/more gifs/1–9.webp — one animation for each Part A screen
       (the original GIFs stay alongside them as fallbacks)
     · Multiverse/optimized/1–5.webp — the five Part B illustrations
       (the original Multiverse/1–5.png files stay alongside them as fallbacks)
     · optimized/couple-transparent.webp — the final birthday illustration
       (the original couple-transparent.png stays at the project root as a fallback)
   Edit Part A messages and animations in PHASE3_LIFE_PAGES; edit Part B lines
   and images in PHASE3_UNIVERSE_PAGES. Navigation stays in Phase3.tsx.
   If a file cannot be shown, its card retries the original image and then draws a
   sketch of ink marks in the same paper style instead of a broken-image icon.

   `index` is the number written on the screen (`01 / 09` in Part A). It has to
   match the position in the list it lives in, because that is what the count
   and the little rail at the bottom work from. Keep them in order.
   ============================================================================ */

/* ---------- assets · Part A (one animation for each screen) — ✏️ EDIT ME ---------- */

/** The nine local Part A animations. Their screen-by-screen pairing is below. */
import gif01 from '../../gifs/optimized/more gifs/1.webp'
import gif02 from '../../gifs/optimized/more gifs/2.webp'
import gif03 from '../../gifs/optimized/more gifs/3.webp'
import gif04 from '../../gifs/optimized/more gifs/4.webp'
import gif05 from '../../gifs/optimized/more gifs/5.webp'
import gif06 from '../../gifs/optimized/more gifs/6.webp'
import gif07 from '../../gifs/optimized/more gifs/7.webp'
import gif08 from '../../gifs/optimized/more gifs/8.webp'
import gif09 from '../../gifs/optimized/more gifs/9.webp'
import gif01Fallback from '../../gifs/more gifs/1.gif'
import gif02Fallback from '../../gifs/more gifs/2.gif'
import gif03Fallback from '../../gifs/more gifs/3.gif'
import gif04Fallback from '../../gifs/more gifs/4.gif'
import gif05Fallback from '../../gifs/more gifs/5.gif'
import gif06Fallback from '../../gifs/more gifs/6.gif'
import gif07Fallback from '../../gifs/more gifs/7.gif'
import gif08Fallback from '../../gifs/more gifs/8.gif'
import gif09Fallback from '../../gifs/more gifs/9.gif'

/* ---------- assets · Part B (the five multiverse illustrations) ---------- */

import universeImage1 from '../../Multiverse/optimized/1.webp'
import universeImage2 from '../../Multiverse/optimized/2.webp'
import universeImage3 from '../../Multiverse/optimized/3.webp'
import universeImage4 from '../../Multiverse/optimized/4.webp'
import universeImage5 from '../../Multiverse/optimized/5.webp'
import universeImage1Fallback from '../../Multiverse/1.png'
import universeImage2Fallback from '../../Multiverse/2.png'
import universeImage3Fallback from '../../Multiverse/3.png'
import universeImage4Fallback from '../../Multiverse/4.png'
import universeImage5Fallback from '../../Multiverse/5.png'

/* ---------- assets · Part C (the final wish illustration) ---------- */

import wishCoupleImage from '../../optimized/couple-transparent.webp'
import wishCoupleImageFallback from '../../couple-transparent.png'

/* ---------- the world ---------- */

/** Accent colour for a page. Green is the chapter's base; the rest are accents. */
export type Phase3Accent = 'green' | 'rose' | 'yellow' | 'blue' | 'lilac'

/** Everything the chrome of Phase 3 says. */
export const PHASE3_CHROME = {
  /** the control on the first page, which steps back out of the chapter */
  exitLabel: 'our gifts ♡',
  /** the control on every other page */
  backLabel: 'back',
  /** the handwritten "you can tap" annotation in the corner */
  cueLabel: 'tap',
  /**
   * The accessible twin of "tap anywhere". It is invisible until it receives
   * keyboard focus (the site's existing `.reveal-on-focus` control).
   */
  nextLabel: 'Next page',
  /** the visible tap target on Part A screens 01–08 */
  continueLabel: 'Continue',
  /** the control that appears on the last Part A screen */
  partBLabel: 'Continue',
  /** the control that appears on the last Part B screen */
  partCLabel: 'Continue to the final birthday wish ♡',
} as const

/* ---------- Part A · the life I want with you ---------- */

export interface Phase3LifePage {
  kind: 'life'
  /** the number shown on the screen, counted as `01 / 09` */
  index: string
  /**
   * The message for this screen — your words, exactly as you wrote them, with
   * the punctuation and the emoji left alone. ✏️ EDIT ME is here only in case
   * you ever want to.
   */
  message: string
  accent: Phase3Accent
  /**
   * The animation taped underneath the message. ✏️ To put a different picture on
   * this screen, change `src` to another of the imports at the top of this file.
   */
  media: {
    /** an imported asset (an animated WebP, or a still image) */
    src: string
    /** the original GIF, used only if the WebP cannot load */
    fallbackSrc: string
    /**
     * ✏️ optional — a description for screen readers. Left empty on purpose:
     * I cannot see the GIFs, so only you can say what each one shows. Fill one
     * in and the card will use it straight away.
     */
    alt?: string
  }
}

/**
 * The nine screens of Part A, in your order: the running joke the two of you
 * share (01–05), and then the turn, ending on the one that means the most (09).
 *
 * Every screen is the same shape — the count, the message, the picture card
 * under it — so the only things that change as the story moves are the words,
 * the picture and one small shift of accent colour.
 */
export const PHASE3_LIFE_PAGES: readonly Phase3LifePage[] = [
  {
    kind: 'life',
    index: '01',
    message: 'Well... All I want in this life is to have a beautiful life with you...😉',
    accent: 'green',
    media: {
      src: gif01,
      fallbackSrc: gif01Fallback,
      alt: 'Two cartoon cats spending time together',
    },
  },
  {
    kind: 'life',
    index: '02',
    message: 'and also annoy you for absolutely no reason and get slaps from you😏',
    accent: 'yellow',
    media: {
      src: gif02,
      fallbackSrc: gif02Fallback,
      alt: 'Two cartoon cats in a playful scene',
    },
  },
  {
    kind: 'life',
    index: '03',
    message: 'then come and beg you to forgive me😅',
    accent: 'blue',
    media: {
      src: gif03,
      fallbackSrc: gif03Fallback,
      alt: 'A pair of cartoon cats close together',
    },
  },
  {
    kind: 'life',
    index: '04',
    message: 'Just for us to annoy each other again shamelessly😂',
    accent: 'rose',
    media: {
      src: gif04,
      fallbackSrc: gif04Fallback,
      alt: 'Two cartoon cats sitting side by side',
    },
  },
  {
    kind: 'life',
    index: '05',
    message: 'and get together again...🤗',
    accent: 'green',
    media: {
      src: gif05,
      fallbackSrc: gif05Fallback,
      alt: 'A blushing cartoon cat surrounded by hearts',
    },
  },
  {
    kind: 'life',
    index: '06',
    message: 'Because we cherish each other above everything else💗',
    accent: 'rose',
    media: {
      src: gif06,
      fallbackSrc: gif06Fallback,
      alt: 'Two cartoon cats sharing a tender moment',
    },
  },
  {
    kind: 'life',
    index: '07',
    message: 'and care for each other too much...💗',
    accent: 'lilac',
    media: {
      src: gif07,
      fallbackSrc: gif07Fallback,
      alt: 'Two cartoon cats together on a green background',
    },
  },
  {
    kind: 'life',
    index: '08',
    message: 'and wanna do whatever the hell this is🤣',
    accent: 'yellow',
    media: {
      src: gif08,
      fallbackSrc: gif08Fallback,
      alt: 'Two cartoon cats in a warm hug beneath a heart',
    },
  },
  {
    kind: 'life',
    index: '09',
    message: 'and really love each other more than anyone else.💜',
    accent: 'lilac',
    media: {
      src: gif09,
      fallbackSrc: gif09Fallback,
      alt: 'Two cartoon cats holding hands with a heart nearby',
    },
  },
]

/* ---------- Part B · in every universe ---------- */

export interface Phase3UniversePage {
  kind: 'universe'
  index: string
  message: string
  accent: Phase3Accent
  image: {
    src: string
    fallbackSrc: string
    width: number
    height: number
    alt: string
  }
}

/** The five images and their lines, in the story's numbered image order. */
export const PHASE3_UNIVERSE_PAGES: readonly Phase3UniversePage[] = [
  {
    kind: 'universe',
    index: '10',
    message: 'And I think…',
    accent: 'green',
    image: {
      src: universeImage1,
      fallbackSrc: universeImage1Fallback,
      width: 1254,
      height: 1254,
      alt: 'Two rabbits in scarves watching a sunrise over a snowy landscape',
    },
  },
  {
    kind: 'universe',
    index: '11',
    message: 'that in every universe…',
    accent: 'blue',
    image: {
      src: universeImage2,
      fallbackSrc: universeImage2Fallback,
      width: 1254,
      height: 1254,
      alt: 'Two cats sitting together beneath the moon above a village',
    },
  },
  {
    kind: 'universe',
    index: '12',
    message: 'our hands will ALWAYS…',
    accent: 'yellow',
    image: {
      src: universeImage3,
      fallbackSrc: universeImage3Fallback,
      width: 1254,
      height: 1254,
      alt: 'Two birds perched together on a branch among cherry blossoms',
    },
  },
  {
    kind: 'universe',
    index: '13',
    message: 'find their way to each other…',
    accent: 'lilac',
    image: {
      src: universeImage4,
      fallbackSrc: universeImage4Fallback,
      width: 1254,
      height: 1254,
      alt: 'Two sunflowers standing together against a glowing sunset',
    },
  },
  {
    kind: 'universe',
    index: '14',
    message: 'just like they did in this one…',
    accent: 'rose',
    image: {
      src: universeImage5,
      fallbackSrc: universeImage5Fallback,
      width: 1312,
      height: 1199,
      alt: 'A couple sitting close together and holding hands beneath the moon',
    },
  },
]

/* ---------- Part C · the birthday wish ---------- */

export interface Phase3WishPage {
  kind: 'wish'
  index: string
  tag: string
  /** ✏️ the heading — the purple heart is intentional ✏️ */
  heading: string
  /** ✏️ the closing message ✏️ */
  message: string
  /**
   * ✏️ EDIT ME — this is your own note, the one thing here that should sound
   * exactly like you and nobody else. It is set in handwriting, on its own line,
   * underneath the closing message.
   */
  personalNote: string
  /** ✏️ how you sign off ✏️ */
  signature: string
  /** the transparent couple illustration above the letter */
  image: {
    src: string
    fallbackSrc: string
    width: number
    height: number
    alt: string
  }
  accent: Phase3Accent
}

export const PHASE3_WISH: Phase3WishPage = {
  kind: 'wish',
  index: '15',
  tag: 'happy birthday',
  heading: 'Happy birthday my dearest Krushi 💜',
  message:
    "No matter where life takes us, in every version of tomorrow, I'll keep choosing you. I will always love you.",
  personalNote: "Happy birthday, my love. I hope this year gives you all your heart's desires",
  signature: '-Your love forever, Ragav...',
  image: {
    src: wishCoupleImage,
    fallbackSrc: wishCoupleImageFallback,
    width: 1774,
    height: 887,
    alt: 'A couple leaning together with their foreheads touching',
  },
  accent: 'rose',
}

/* ---------- the whole chapter, in order ---------- */

export type Phase3Page = Phase3LifePage | Phase3UniversePage | Phase3WishPage

/**
 * Every page of Phase 3, in the order it is shown. The engine walks this list
 * and knows nothing about what is on each page — reordering or removing pages
 * here is safe, and the progress rail counts whatever is in the list.
 */
export const PHASE3_PAGES: readonly Phase3Page[] = [
  ...PHASE3_LIFE_PAGES,
  ...PHASE3_UNIVERSE_PAGES,
  PHASE3_WISH,
]
