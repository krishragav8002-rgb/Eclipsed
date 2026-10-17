/** A quiet, full-bleed garden illustration behind the final birthday page. */
export function BirthdayGarden() {
  return (
    <svg
      aria-hidden="true"
      className="wish-garden pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="wish-botanical-tile" width="144" height="156" patternUnits="userSpaceOnUse">
          <path d="M23 143c18-24 22-50 10-78m1 37c-15-2-23-11-24-24 14 1 23 9 24 24Zm-1-17c-1-14 5-24 18-31 3 14-3 25-18 31Zm91 67c12-21 13-43 4-65m2 31c-13-2-20-9-21-21 13 1 20 8 21 21Zm-1-14c0-12 6-21 17-26 2 12-3 21-17 26Z" fill="none" stroke="#174c27" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="74" cy="33" r="2" fill="#f4efe3" />
          <circle cx="130" cy="112" r="1.5" fill="#eccf82" />
          <path d="m70 75 2 5 5 2-5 2-2 5-2-5-5-2 5-2Zm48-57 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" fill="none" stroke="#f4efe3" strokeWidth="1.2" />
        </pattern>
        <linearGradient id="wish-hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#327013" stopOpacity=".28" />
          <stop offset="1" stopColor="#24560b" stopOpacity=".52" />
        </linearGradient>
        <linearGradient id="wish-hill-front" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#7ec850" stopOpacity=".62" />
          <stop offset="1" stopColor="#327013" stopOpacity=".6" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#wish-botanical-tile)" opacity=".22" />
      <g fill="none" stroke="#f4efe3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".42">
        <path d="M-25 294c65-56 83-117 55-185 59 35 76 91 47 158 55-50 110-52 163-7" />
        <path d="M-4 246c32-5 54-25 64-59m-50 95c34-1 59-18 75-50m96 33c-26-17-37-41-33-73" />
        <path d="M1464 313c-65-56-83-117-55-185-59 35-76 91-47 158-55-50-110-52-163-7" />
        <path d="M1444 265c-32-5-54-25-64-59m50 95c-34-1-59-18-75-50m-96 33c26-17 37-41 33-73" />
        <path d="M125 900c40-74 48-143 24-208m-11 122c-36-7-58-28-65-63 38 4 60 25 65 63Zm0-43c0-39 20-66 59-80 5 39-14 67-59 80Z" />
        <path d="M1320 900c-40-74-48-143-24-208m11 122c36-7 58-28 65-63-38 4-60 25-65 63Zm0-43c0-39-20-66-59-80-5 39 14 67 59 80Z" />
      </g>
      <g fill="#f4efe3" fillOpacity=".82" stroke="#1b1a15" strokeOpacity=".24" strokeWidth="2">
        <path d="M83 160c-22-17-12-47 13-47 3-28 41-31 48-5 27-1 34 34 11 47-11 21-57 23-72 5Z" />
        <path d="M1280 202c-19-15-10-39 11-39 3-23 34-26 40-4 23-1 29 28 9 39-9 18-47 19-60 4Z" />
      </g>
      <g fill="#ecb8ae" stroke="#1b1a15" strokeOpacity=".4" strokeWidth="1.4">
        <path d="M95 136c-9-8-5-19 4-20 2-10 14-10 17-1 11-1 15 12 6 18-6 9-21 10-27 3Z" />
        <path d="M1292 178c-7-6-4-16 4-16 1-8 12-8 14 0 9-1 12 10 5 15-5 8-17 8-23 1Z" />
      </g>
      <path d="M0 738c138-89 251-86 384-26 129 58 229 51 357-14 132-67 237-71 365-8 124 61 217 73 334 17v193H0Z" fill="url(#wish-hill-back)" />
      <path d="M0 802c150-73 268-51 394-2 126 50 230 41 362-17 132-58 226-42 352 11 126 53 218 47 332-18v124H0Z" fill="url(#wish-hill-front)" />
      <path d="M0 820c132-41 232-24 345 19m760-13c107-46 215-45 335-6" fill="none" stroke="#fbf8f1" strokeWidth="3" strokeLinecap="round" opacity=".55" />
      <g fill="#eccf82" stroke="#1b1a15" strokeWidth="1.5" strokeOpacity=".46">
        <path d="M174 794c-8-7-3-17 5-17 1-9 13-10 15-1 10-1 13 11 5 16-5 8-19 9-25 2Z" />
        <path d="M1213 766c-8-7-3-17 5-17 1-9 13-10 15-1 10-1 13 11 5 16-5 8-19 9-25 2Z" />
        <path d="M1336 833c-6-5-2-13 4-13 1-7 10-7 12-1 7-1 10 8 4 12-4 6-15 7-20 2Z" />
      </g>
    </svg>
  )
}
