/* ============================================================
   All copy & phase content lives here.
   Edit this file to personalise the whole experience —
   no component changes needed.
   ============================================================ */

export type ContentBlock =
  | { kind: 'text'; body: string }
  | { kind: 'quote'; body: string; attribution?: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'placeholder'; label: string }

export interface PhaseContent {
  eyebrow: string
  title: string
  intro?: string
  /** 'placeholder' renders reserved-page styling until real content arrives */
  status: 'placeholder' | 'ready'
  blocks: ContentBlock[]
}

export const site = {
  /** Exact hero heading — emoji renders via system fallback next to Fraunces */
  heroHeading: 'Happy 18th Birthday, Baby Girl 💜',

  /** First tap-through note */
  revealLeft: 'Oh wait! Am I supposed to say birthday woman now? Since you are like 18?',

  /** Second tap-through note */
  revealDown: 'Whatever, you will always be my baby girl forever....',

  /** Transition line between the notes and the question */
  transitionLine: 'Btw... Quick question.',

  /** The big question */
  loveQuestion: 'Do you love me?',

  /** YES / NO labels for flower buttons */
  yesLabel: 'YES',
  noLabel: 'NO',

  /** Eight escalating NO messages — each one unique, exact order required */
  noMessages: [
    'Oops! Maybe your fingers slipped? 👀',
    'Butter fingers, my darling?',
    'KRUSHI!!! Yenadi Panre?',
    'The button is moving, not your feelings. Right? 🥺',
    'BABE. I am watching you. 💀',
    'Why did I put this No button here?',
    'Pretty Pwease...?',
    'We get it sis... Now press Yes...',
  ] as const,

  /** Optional closing note for the last page */
  closingNote: 'This is only the first page of eighteen more.',

  /* ---------- the winter celebration, played right after YES ---------- */

  /** `winterMessages[n]` answers a run that ended with exactly n presses of
   *  the NO flower (0–8). Keyed to the real NO-button counter, never to the
   *  number of messages on screen or the number of renders. */
  winterMessages: [
    'Awww, straight to YES? You really do love me! 💜',
    "One little NO? I'll forgive you. 💜",
    'Two attempts of denial? Interesting... 💜',
    'Three NOs later, and we finally made it! 💜',
    'Halfway through the NO button saga... but you made it! 💜',
    'Five attempts? You really made me work for that YES! 💜',
    "Six NOs, but I knew you'd say YES eventually! 💜",
    'Seven attempts! Baby girl, you really tested my patience. 💜',
    'FINALLY, A YES! 💜',
  ] as const,

  /** Revealed underneath the celebration line, in the glowing display face. */
  winterNote: 'Ragav will always love you the most, my sweet Moonpie💜',

  /** Only shown when the run had more than one NO press. */
  winterAside: 'I would have spammed yes immediately after seeing the question btw',
} as const

/**
 * The celebration line for a run that ended with `noAttempts` presses of the
 * NO flower. The count is clamped to the authored range, so the two edge cases
 * (0 = straight to YES, 8 = every NO used up) and any unexpected value always
 * resolve to a real message.
 */
export function winterMessageFor(noAttempts: number): string {
  const count = Number.isFinite(noAttempts) ? Math.trunc(noAttempts) : 0
  const index = Math.min(Math.max(count, 0), site.winterMessages.length - 1)
  return site.winterMessages[index]
}

/** ✏️ Phase 2 — configure the content whenever you are ready. */
export const phaseTwo: PhaseContent = {
  eyebrow: 'Page two',
  title: 'The chapter we haven\'t written yet',
  intro: 'This page is reserved for whatever you want it to be — a timeline of us, favourite photos, or a story worth pressing between pages.',
  status: 'placeholder',
  blocks: [
    { kind: 'placeholder', label: 'Your timeline or photo gallery goes here' },
    { kind: 'placeholder', label: 'A favourite memory goes here' },
  ],
}
