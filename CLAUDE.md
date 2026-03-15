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
- `preview/editor.html` -- Fabric.js visual stationery editor (drag-and-drop, per-element font control, export)
- `preview/studio.html` -- preset-based preview tool (simpler than editor)
- `js/editor.js` -- editor logic (canvas, illustration browser, text tool, properties panel, presets, undo/redo, export)
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

## SVG Illustration Rules
- All SVGs use `stroke="currentColor"` and `fill="none"` (with selective fills for eyes, nostrils, etc.)
- All SVGs include `<style>:root { color: #1B2438; }</style>` for standalone rendering
- `stroke-linecap="round"` and `stroke-linejoin="round"` on root element
- `<path>` elements with cubic bezier (C commands) are allowed and encouraged for organic shapes
- Keep under 30 shapes per SVG for clarity at small print sizes
- Stroke-width conventions: moose 2.5, couple/decor/toronto 2, borders 1.5
- Moose (English bulldog): wide curved head (width > height), forehead wrinkles, rose ears, underbite jaw, drooping jowls, stocky body, splayed paws with toe lines

## Visual Editor (preview/editor.html)
- Built with Fabric.js 5.3.1 (CDN), jsPDF 2.5.2 (CDN), Supabase JS v2 (CDN)
- Three-panel layout: left sidebar (8 tabs), center canvas with pasteboard, right properties
- Supports 295 SVG illustrations organized by category (moose, couple, toronto, decor, border, divider, corner, sketch, element)
- Per-element text control: font family (~375 fonts), size, weight, color, alignment, spacing, outline-only mode
- 7 preset templates: invitation, save-the-date, rsvp, details, menu, program, name-tag
- Smart guides (magenta snap lines), grid overlay, safe zone guides, ruler bars
- Lock, group/ungroup, flip H/V, copy/paste style
- Drag-and-drop image/SVG import, URL import, SVG code paste
- Background removal via @imgly/background-removal (dynamic import, WebAssembly)
- Multi-page support with page tabs, add/delete/rename/duplicate
- Export: PNG (2x), PDF (300 DPI with crop marks), SVG, JSON (localStorage + download)
- Right-click context menu, layers panel, design history panel
- Zoom to selection (double-click), arrow key nudge (1px / 10px with Shift)
- Undo/redo via state snapshots (max 40 states)
- Stroke width + color controls for shapes, SVGs, and text (outline effect)
- Toolbar BG color swatch synced with properties panel background picker
- Supabase cloud save: auto-save, share via URL, fork designs, My Designs browser
- Quick-apply border placement: Top, Bottom, Top+Bottom, 4 Corners presets
- Browse Online panel with links to free illustration sources (Storyset, unDraw, Open Peeps, Flaticon)
- Pasteboard: scrollable overflow area so drag handles stay visible beyond artboard edges
- Freehand brush drawing: 4 brush types (Pencil, Spray, Circle, Ink), size/color/opacity controls, drawn paths become editable objects
- Text outline-only mode: transparent fill with visible stroke, _savedFill pattern for toggling
- No stationery piece HTML depends on editor.js -- editor is a standalone design tool

## Constraints
- No JavaScript in stationery HTML files (pieces/ directory)
- No emojis anywhere (code, docs, UI, comments, commit messages)
- All illustrations must be SVG (resolution-independent for print)
- Never put text outside the safe zone (0.25in inset from trim)
- Maintain consistent stroke weight across all SVG illustrations
- Background colors/gradients must extend to bleed edge
- Font sizes in pt (not px) for print accuracy
- Every color must reference a CSS custom property, never raw hex in HTML
