import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (rounded, warm, hand-crafted feel) — latin subset only
import '@fontsource/fraunces/latin-400.css'
import '@fontsource/fraunces/latin-600.css'
import '@fontsource/fraunces/latin-700.css'
import '@fontsource/nunito/latin-400.css'
import '@fontsource/nunito/latin-600.css'
import '@fontsource/nunito/latin-700.css'
import '@fontsource/nunito/latin-800.css'
import '@fontsource/caveat/latin-600.css'
import '@fontsource/caveat/latin-700.css'

// Phase 3's own pair, borrowed from the portfolio: Space Grotesk for the display
// type, Inter for the body. Only fetched if a page actually renders them, so
// phases 1 and 2 are untouched by their presence.
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
