# Kash & Max Wedding Stationery

HTML/CSS/SVG wedding stationery suite designed for print export.

## Stack
- Static HTML files (one per stationery piece)
- Vanilla CSS with custom properties (design system tokens)
- SVG illustrations (hand-drawn line art style)
- Fontshare web fonts: Clash Display, Sentient, Satoshi
- PDF export via Chrome print-to-PDF

## Architecture
- `css/design-system.css` -- colors, fonts, spacing, shared styles
- `css/print.css` -- @page rules, bleed specs, print-specific overrides
- `assets/svg/` -- all illustration SVGs (hand-drawn line art, navy stroke)
- `pieces/` -- one HTML file per stationery piece
- `preview/index.html` -- gallery of all pieces at scale
- `assets/fonts/` -- downloaded Fontshare fonts (offline fallback)
- `docs/` -- design specs, briefs, illustration prompts, print requirements

## Key Patterns
- All pieces use the shared design system CSS (never inline colors/fonts)
- SVG illustrations use `stroke="currentColor"` so CSS controls their color via `color` property
- Print dimensions include 0.125in bleed on all sides
- Safe zone is 0.25in inset from trim edge (no text or critical elements outside this)
- Fonts load from Fontshare CDN with local fallback in `assets/fonts/`
- No JavaScript in any stationery file (pure HTML/CSS for print reliability)
- Screen preview shows a grey background with the card centered and shadow, plus trim line guides
- Print export hides all screen-only elements

## Design Tokens
- Primary accent: #E8704A (coral)
- Secondary accent: #E89BAE (pink)
- Tertiary accent: #F2C66D (golden)
- Gradient light: #F2956E (coral-light)
- Background: #FFF8F0 (warm cream)
- Background deep: #F5EDE0 (cream-deep)
- Text/line art: #1B2438 (navy)
- Secondary text: #3A4A68 (navy-light)
- Display font: Clash Display (couple names, headlines) -- 600, 700
- Body font: Sentient (invitation text, descriptions) -- 400, 400i, 600
- Utility font: Satoshi (labels, addresses, small text) -- 400, 500, 700

## Print Export
1. Open piece HTML in Chrome
2. Cmd+P > Save as PDF
3. Paper size: Custom (use bleed dimensions from print.css)
4. Margins: None
5. Background graphics: ON
6. Scale: 100%

## Constraints
- No JavaScript in stationery HTML files
- No emojis anywhere (code, docs, UI, comments, commit messages)
- All illustrations must be SVG (resolution-independent for print)
- Never put text outside the safe zone (0.25in inset from trim)
- Maintain consistent stroke weight across all SVG illustrations
- Background colors/gradients must extend to bleed edge
- Font sizes in pt (not px) for print accuracy
- Every color must reference a CSS custom property, never raw hex in HTML
