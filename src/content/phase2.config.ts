/* ============================================================
   Phase 2 — "Under the Moon".
   Every editable word, link and list for the gift gallery and
   its three gift screens lives here. Replace the placeholders
   and the components pick them up — no other file needs editing.
   ============================================================ */

import type { GiftId } from '../state/experienceReducer'

/* ---------- the gallery ---------- */

export interface GiftCardConfig {
  id: GiftId
  /** shown on the card once its gift has been visited, and read out to a screen reader */
  title: string
}

/** The three gifts, in the order they stack up in the gallery. */
export const GIFT_CARDS: readonly GiftCardConfig[] = [
  { id: 'letter', title: 'Letter 💌' },
  { id: 'playlist', title: 'Playlist 🎧' },
  { id: 'video', title: 'Video 🎬' },
]

export const GALLERY_COPY = {
  eyebrow: 'Under the moon',
  title: 'Three little gifts for you 💜',
  hint: 'Tap a card to open it',
  lockedHint: 'Open all three gifts to keep going 💜',
  continueLabel: 'Continue to Phase 3 ♡',
}

/**
 * How the three little sheets sit in the gallery. The cards are deliberately
 * small and evenly sized (a phone shows them as a 2 + 1 cluster, a wide screen
 * as one loose row), so `insetClass` is only a small hand-placed nudge that
 * keeps the composition irregular instead of gridded.
 */
export interface GiftCardLayout {
  insetClass: string
  /** hand-applied tilt, in degrees */
  rotate: number
  floatDuration: number
  floatDelay: number
}

export const GIFT_LAYOUT: Record<GiftId, GiftCardLayout> = {
  letter: { insetClass: '-translate-y-1.5 sm:-translate-y-4', rotate: -3.5, floatDuration: 6.2, floatDelay: 0 },
  playlist: { insetClass: 'translate-y-2 sm:translate-y-5', rotate: 2.6, floatDuration: 7.1, floatDelay: 0.9 },
  video: {
    insetClass: 'translate-x-5 translate-y-0.5 sm:translate-x-0 sm:-translate-y-1',
    rotate: -1.6,
    floatDuration: 6.6,
    floatDelay: 1.7,
  },
}

/* ---------- gift one · the letter ---------- */

export const LETTER_COPY = {
  eyebrow: 'Gift one',
  title: 'A letter for you 💌',
  closedHint: 'Tap the seal to open it 💜',
  /** accessible label for the closed envelope */
  sealLabel: 'Break the wax seal and open the letter',
  /** handwritten marks on the open sheet */
  pageLabel: 'Page',
  turnLabel: 'Turn the page ♡',
  /** the same control, one page back */
  prevLabel: 'Turn back ♡',
  backLabel: 'Back to the gifts ♡',
}

/**
 * The letter, a page at a time. `\n` starts a new line, and each page is shown
 * on its own sheet — never as one long scroll. Add or remove entries to change
 * how many pages there are; the dots and the "Page n / m" line follow along.
 */
export const LETTER_PAGES: readonly { heading?: string; body: string }[] = [
  {
    body: 'Happy Birthday, my Moonpie! 💜 You have no idea how lucky I feel to have you in my life. You’re not just my girlfriend, you’re my happiness, my peace, and my favorite person in this whole world. 🌙 Having you in my life is one of the most beautiful things that has ever happened to me, and I’ll always be grateful for you. ✨ I hope your birthday is as beautiful and special as your heart. 🎂',
  },
  {
    body: 'In these 2 and a half years… We’ve been through so much… There were good moments 🥰, bad moments 💔, and moments that could have torn us apart… BUT we are still here… still together… and still choosing each other. 💗 I will always be proud of how far we have come and I promise you… Nothing on this Earth can break us anymore… I’d like to see it try… I love you till the universe and back… 🌌 my Ms. Fortune. ♾️',
  },
  {
    body: 'On your special day, I wish you all the happiness, love and beautiful things your heart desires. 🎁 I wish I could take away all your sadness and replace every tear with a smile. 💜 I want to be there for you on your best days and your worst days, to support you, comfort you, and remind you how precious you are. 🌸 Sweetheart, never doubt your worth, because you’re more amazing than you realize. ✨ You deserve all the love and happiness in this world. 💜',
  },
  {
    body: 'If I could make one wish for myself, it would be to celebrate many more birthdays with you 🎂 and create countless beautiful memories together. ✨ I know I’m not perfect, but my feelings for you are real, and I’ll always try my best to love you the way you deserve. 💜 If I had to choose all over again, I’d still choose you, a thousand times over. 💜 Thank you for being you and for making my life more beautiful. I love you so much, my baby girl. Today, tomorrow, and through all the days to come. 💜😘',
  },
]

/* ---------- gift two · the playlist ---------- */

/** The one outbound link in the journal — the playlist the sticker opens.
 *  Paste a new share link here and the button follows it, wherever it is. */
export const SPOTIFY_PLAYLIST_URL =
  'https://open.spotify.com/playlist/2arHbVGTfOMtR1UYwqe6Jj?si=FDpAB50TT-ivJlTmuPmU4Q'

export const PLAYLIST_COPY = {
  eyebrow: 'Gift two',
  title: 'Our playlist 🎧',
  /** a personal note from you, shown above the songs */
  intro:
    'Just a few songs that remind me of us… though, honestly, every love song I’ve ever heard somehow finds its way back to you. Maybe that’s what happens when my heart has already chosen its favourite person. 💜🎧',
  /** a small handwritten line in the journal's heading */
  journalNote: 'our little mixtape ♡',
  linkLabel: 'Open playlist on Spotify ↗',
  backLabel: 'Back to the gifts ♡',
}

/**
 * One track in the journal. Only the title, the artists and a single credit line
 * ever reach the card — the credit comes from `film`/`year` for a soundtrack, or
 * `released`/`label` for a standalone single. The one other thing that leaves
 * the config is `youtubeUrl`: the row opens it in a new tab, so it is the only
 * field here that behaves as a link. Everything else is kept as metadata, ready
 * to be edited later.
 *
 * Leave `cover` out and the entry uses its own designed scrapbook tile; nothing
 * here points at a remote image, so there is nothing that can break or turn out
 * to be an unrelated photograph.
 */
export interface SongConfig {
  /** the track's title, exactly as it should read on the card */
  title: string
  /** everyone credited on the track, in billing order */
  artists: readonly string[]
  /** the film the track belongs to, when it belongs to one */
  film?: string
  /** that film's year, printed in brackets beside its name */
  year?: string
  /** for a standalone single: the release as the label prints it */
  released?: string
  /** the record label, for a standalone single */
  label?: string
  /** an extra performance credit, e.g. additional vocals — metadata only */
  vocals?: string
  /** who composed the music — metadata only */
  composer?: string
  /** who wrote the words — metadata only */
  lyrics?: string
  /** an official song or album page — metadata only, never rendered as a link */
  reference?: string
  /**
   * The song's own official music video. The whole row opens this in a new tab,
   * so it is the one field here that leaves the card as a link. Use `null` for a
   * song whose upload has not been confirmed yet: the row then renders as the
   * same paper with nothing to tap.
   */
  youtubeUrl: string | null
  /** optional artwork URL — leave it out to use the designed cover tile */
  cover?: string
}

/**
 * The journal's track list, in the order it should be heard.
 *
 * Each cover is that song's own released artwork, downloaded once into
 * `public/images/playlist/` so nothing is fetched from a third party while the
 * page is running. The sources, in order: the *Oh My Kadavule*, *Dragon*,
 * *Amaran* (shared by "Uyirey" and "Hey Minnale"), *Mudhal Nee Mudivum Nee* and
 * *With Love* soundtrack covers, then the "Pesamale", "Katchi Sera",
 * "Pavazha Malli" and "Aasa Kooda" singles as released through Think Music /
 * Think Indie.
 * Leave `cover` off an entry and it falls back to its own designed tile.
 *
 * Every `youtubeUrl` below is that song's own official upload — posted by the
 * label or the artists themselves, and checked against YouTube's own video
 * metadata rather than guessed — so no two entries point at the same video and
 * none of them point at somebody else's cover.
 */
export const PLAYLIST_SONGS: readonly SongConfig[] = [
  {
    title: 'Kadhaippoma',
    artists: ['Sid Sriram', 'Leon James', 'Ko Sesha'],
    film: 'Oh My Kadavule',
    year: '2020',
    composer: 'Leon James',
    lyrics: 'Ko Sesha',
    reference: 'https://open.spotify.com/album/0XEhNGVpjOxDoi8ByFyPFR',
    youtubeUrl: 'https://www.youtube.com/watch?v=DScFlfN9vDk',
    cover: '/images/playlist/kadhaippoma-oh-my-kadavule.jpg',
  },
  {
    title: 'Vazhithunaiye',
    artists: ['Sid Sriram', 'Sanjana Kalmanje'],
    film: 'Dragon',
    year: '2025',
    composer: 'Leon James',
    lyrics: 'Vignesh Shivan, Ko Sesha',
    youtubeUrl: 'https://www.youtube.com/watch?v=U1JLtpJTe84',
    cover: '/images/playlist/vazhithunaiye-dragon.jpg',
  },
  {
    title: 'Uyirey',
    artists: ['Nakul Abhyankar', 'Ramya Bhat Abhyankar'],
    film: 'Amaran',
    year: '2024',
    composer: 'G. V. Prakash Kumar',
    lyrics: 'Vivek',
    youtubeUrl: 'https://www.youtube.com/watch?v=OIRWdkPMrh0',
    cover: '/images/playlist/amaran-soundtrack.jpg',
  },
  {
    title: 'Hey Minnale',
    artists: ['Haricharan', 'Shweta Mohan'],
    film: 'Amaran',
    year: '2024',
    composer: 'G. V. Prakash Kumar',
    lyrics: 'Karthik Netha',
    youtubeUrl: 'https://www.youtube.com/watch?v=AY3Yea6hBbI',
    /** the same album as "Uyirey", so the two share one file */
    cover: '/images/playlist/amaran-soundtrack.jpg',
  },
  {
    title: 'Mudhal Nee Mudivum Nee (Title Track)',
    artists: ['Sid Sriram', 'Darbuka Siva'],
    film: 'Mudhal Nee Mudivum Nee',
    year: '2022',
    composer: 'Darbuka Siva',
    lyrics: 'Thamarai',
    youtubeUrl: 'https://www.youtube.com/watch?v=ATElufr0OiE',
    cover: '/images/playlist/mudhal-nee-mudivum-nee-title-track.jpg',
  },
  {
    title: 'Marandhu Poche',
    artists: ['Adithya RK'],
    film: 'With Love',
    composer: 'Sean Roldan',
    lyrics: 'Madhan Karky',
    youtubeUrl: 'https://www.youtube.com/watch?v=H0UDxfrKZY4',
    cover: '/images/playlist/marandhu-poche-with-love.jpg',
  },
  {
    title: 'Pesamale',
    artists: ['Siri Xander', 'Arra Aria Khayal'],
    released: '2026 single',
    youtubeUrl: 'https://www.youtube.com/watch?v=ptwUYrguUI8',
    cover: '/images/playlist/pesamale-single.jpg',
  },
  {
    title: 'Katchi Sera',
    artists: ['Sai Abhyankkar'],
    vocals: 'Sai Smriti',
    composer: 'Sai Abhyankkar',
    lyrics: 'Adesh Krishna',
    released: '22 January 2024',
    label: 'Think Music',
    reference: 'https://www.youtube.com/watch?v=VU23OPQ1Pmc',
    youtubeUrl: 'https://www.youtube.com/watch?v=VU23OPQ1Pmc',
    cover: '/images/playlist/katchi-sera-think-indie.jpg',
  },
  {
    title: 'Pavazha Malli',
    artists: ['Sai Abhyankkar', 'Shruti Haasan'],
    composer: 'Sai Abhyankkar',
    lyrics: 'Vivek',
    released: '5 March 2026',
    label: 'Think Music',
    reference: 'https://www.youtube.com/watch?v=b68HETiNO98',
    youtubeUrl: 'https://www.youtube.com/watch?v=b68HETiNO98',
    cover: '/images/playlist/pavazha-malli-think-indie.jpg',
  },
  {
    title: 'Aasa Kooda',
    artists: ['Sai Abhyankkar', 'Sai Smriti'],
    composer: 'Sai Abhyankkar',
    lyrics: 'Sathyan Ilanko',
    released: '13 June 2024',
    label: 'Think Music',
    reference: 'https://www.youtube.com/watch?v=a3Ue-LN5B9U',
    youtubeUrl: 'https://www.youtube.com/watch?v=a3Ue-LN5B9U',
    cover: '/images/playlist/aasa-kooda-think-indie.jpg',
  },
]

/* ---------- gift three · the film ---------- */

export const VIDEO_COPY = {
  eyebrow: 'Gift three',
  title: 'A little appearance 🎬',
  /** shown underneath the player once the film ends */
  endingMessage: `Well, now I get to meet you… Okay, scratch that. 😂
Well, now I get to wish you a happy birthday in person! But virtually, of course.`,
  backLabel: 'Back to the gifts ♡',
}

/**
 * Only used until the browser reports the film's real dimensions — the frame
 * then fits itself to whatever comes back, so portrait or landscape both sit
 * snugly. Safe to leave alone.
 */
export const VIDEO_FALLBACK_ASPECT = '16 / 9'

/* ---------- the way out ----------
   Phase 2's three gifts are done; the chapter they lead into now lives in
   `phase3.config.ts` and is rendered by `components/phases/Phase3.tsx`. */

