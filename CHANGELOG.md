# Changelog

## [2026-03-15] (Session 10)

### What changed
- **Supabase config:** Set Supabase URL and anon key constants in editor.js
- **Text outline mode:** Added "Outline only (no fill)" checkbox to text properties panel -- sets fill to transparent while keeping stroke visible, with _savedFill pattern to restore original color
- **Font expansion (~150 to ~375 fonts):**
  - Downloaded 50 Google Fonts as woff2 to assets/fonts/ + CDN link tag
  - Extracted and copied 195 uploaded font families from 7 zip archives in font_uploads/
  - Generated @font-face CSS declarations for all uploaded fonts
  - Added all to FONTS array with correct categories
- **Freehand brush drawing tool:**
  - Added "Draw" tab to sidebar with brush controls (size, color, opacity, type)
  - 4 brush types: Pencil, Spray, Circle, Ink (with shadow effect)
  - Toggle drawing mode on/off, auto-exits when switching tabs
  - Drawn paths become selectable/editable canvas objects
- **25 new SVG illustrations:**
  - 15 sketch-inspired elements: cocktail glass, champagne flutes, wine glass, champagne bottle, flower vase, flower bouquet, ribbon bow, heart balloon, bunting, disco ball, wedding cake, wedding rings, party hat, confetti, hands toast
  - 10 design elements: 3 brush strokes (horizontal, diagonal, curved), 2 splashes, 2 waves, pour stream (flowing liquid like inspo image), swirl flourish, squiggle line
  - All follow project SVG conventions (currentColor, stroke-linecap round, under 30 shapes)
- **New illustration categories:** Added "sketch" and "element" categories to ILLUST_CATEGORIES and ILLUSTRATIONS object

### Why
- User requested brush stroke ability, design elements (lines, splashes, waves, pour), and extraction of individual elements from sketch reference images
- User provided Supabase credentials and additional fonts

### Decisions
- Sketch reference images (EPS/JPG from Freepik) used as visual inspiration for hand-drawn SVG recreations rather than direct file conversion
- Brush drawing uses Fabric.js built-in PencilBrush/SprayBrush/CircleBrush for freehand mode
- "Ink" brush type adds shadow effect to PencilBrush for organic/flowing feel
- Pour stream SVG (element-pour-stream.svg) designed as full composition (hand + bottle + flowing stream + puddle) like the blue inspo image

## [2026-03-15] (Session 9)

### What changed
- Implemented 7-part editor upgrade plan (`js/editor.js` expanded from ~2987 to ~3500+ lines)
- **Part 2 -- Pasteboard overflow fix:**
  - Changed `.canvas-viewport` from `overflow: hidden` to `overflow: auto`
  - Added 100px margin around `.canvas-wrapper` so drag handles remain visible beyond artboard
- **Part 3 -- Toolbar background color:**
  - Added BG color swatch in toolbar for quicker access to canvas background picker
  - Synced with existing properties panel BG picker
- **Part 5 -- Stroke width controls:**
  - Added stroke color + width slider (0.5-10, step 0.5) to object properties panel
  - Added text stroke (outline) controls with color picker + width slider (0-5)
  - Works on shapes, SVG groups, and text objects
- **Part 1 -- Supabase cloud save + sharing:**
  - Added Supabase client integration (CDN script)
  - Cloud save/load with auto-save (3s debounce) when connected
  - Share modal with copyable URL (?id=xxx), fork design, My Designs browser
  - Design name input and cloud status indicator in toolbar
  - Constants left empty for user to fill after Supabase project setup
- **Part 6 -- Font expansion (~90 to ~150 fonts):**
  - Added ~30 Google Fonts (wedding calligraphy, elegant serif, modern sans, display)
  - Downloaded 10 Fontshare fonts (archivo, erode, synonym, telma, jet-brains-mono, plein, bespoke-serif, nippo, tanker, kola) with @font-face declarations
  - Added ~10 open-source fonts (Fira Sans, Source Sans 3, League Spartan, League Gothic, Barlow)
  - All added to FONTS array with correct categories
- **Part 4 -- Border configuration:**
  - Created 20 new SVG files: 10 horizontal dividers, 5 vertical dividers, 5 corners
  - Added divider/corner categories to illustration browser
  - Quick-apply border placement: Top, Bottom, Top+Bottom, 4 Corners buttons
  - Auto-positions and scales illustrations to fit artboard edges
- **Part 7 -- Free illustration integration:**
  - Added "Browse Online" section in Art panel with links to Storyset, unDraw, Open Peeps, Flaticon
  - Enhanced drag-drop zone with larger overlay and file type sub-label
- Fixed undeclared `nudgeTimeout` variable bug

### Why
- Pasteboard fix lets users drag objects partially off the artboard without losing control handles
- Cloud save enables Kash and Max to share and collaborate on designs via shareable links
- Font expansion provides more typographic variety matching the hand-drawn inspo aesthetic
- Dividers/corners provide granular border control (top-only, bottom-only) vs full-frame-only borders
- Stroke controls allow adjusting line weight on all elements for design flexibility

### Decisions
- Supabase chosen for cloud save (free tier, PostgreSQL, anon access with RLS policies)
- Auto-save only triggers when a design already has a cloud ID (no surprise uploads)
- My Designs tracked via localStorage array of IDs (no auth required)
- Fontshare fonts self-hosted as .woff2 in `assets/fonts/` for offline reliability
- Divider SVGs use viewBox 400x60 (horizontal), 60x400 (vertical); corners use 120x120
- Quick-apply border placement scales SVGs to artboard width/height and positions at edges
- Browse Online links open in new tabs -- editorial curation rather than API integration

## [2026-03-15] (Session 8)

### What changed
- Implemented 21 new features in the visual editor (`js/editor.js` expanded from 1782 to 2987 lines)
- **Batch 1 -- Core Interaction:**
  - Smart guides: magenta snap lines when objects align with other objects' edges/centers
  - Lock elements: prevent accidental moves, toggle via properties panel or Cmd+L
  - Group/Ungroup: combine multiple objects, keyboard shortcuts Cmd+G / Cmd+Shift+G
  - Arrow key nudge: 1px normal, 10px with Shift, debounced history save
  - Aspect ratio lock toggle: button between W/H inputs in size section
- **Batch 2 -- Design Tools:**
  - Canvas background picker: solid color swatches + gradient presets when nothing selected
  - Flip H/V: horizontal and vertical flip buttons for all object types
  - Copy/Paste style: extract and apply font/color/opacity properties (Cmd+Alt+C/V)
- **Batch 3 -- Image Import + BG Removal:**
  - Drag-and-drop from desktop: drop images or SVGs onto canvas area
  - URL import: inline form in Shapes panel to load images/SVGs from URL
  - SVG code paste: modal with textarea for pasting raw SVG markup
  - Background removal: @imgly/background-removal 1.7.0 via dynamic import (WebAssembly, 84MB model)
- **Batch 4 -- Multi-Page + Export:**
  - Multiple pages: page tabs bar at bottom, add/delete/rename/duplicate pages, state serialization
  - PDF export with bleed marks: jsPDF 2.5.2, 300 DPI, crop marks at 0.125in
  - SVG export: Fabric.js native toSVG() with overlay cleanup
- **Batch 5 -- UI Polish:**
  - Design history panel: canvas thumbnails every 5th save, click to restore
  - Right-click context menu: actions based on selection (duplicate, lock, layer order, group, style)
  - Layers panel: list all objects with type icon, name, visibility and lock toggles
  - Zoom to selection: double-click object to zoom-fit, double-click empty to reset
  - Ruler bars: top and left rulers with 0.25in ticks, 1in labels, cursor tracking
- Updated editor.html with all new UI elements (sidebar tabs, page tabs, rulers, modals, overlays)
- Added jsPDF 2.5.2 CDN script tag

### Why
- Bringing the editor to Canva/Figma level with professional interaction, multi-page workflow, and export options
- Background removal enables quick photo cleanup without leaving the editor
- Multi-page support allows designing full stationery suites in one session

### Decisions
- @imgly/background-removal loaded via dynamic import (not bundled) to avoid 84MB upfront download
- PDF crop marks drawn at 0.125in bleed offset matching the print spec
- Smart guides use magenta (#FF00FF) to distinguish from existing blue safe zone guides
- Pages use JSON serialization for state -- undo/redo is per-page-view (resets on page switch)
- Aspect ratio locked by default for images/SVGs, uses simple ratio preservation
- Layers panel renders in reverse z-order (top layer first, matching Figma convention)
- Context menu is canvas-aware: shows object actions when selection exists, canvas actions when empty
- History thumbnails captured at 15% resolution for minimal memory footprint

## [2026-03-15] (Session 7)

### What changed
- Built visual stationery editor (`preview/editor.html` + `js/editor.js`) using Fabric.js 5.3.1
  - Three-panel layout: illustration browser, canvas workspace, properties panel
  - Per-element text control: 52 font families (40 Google + 12 Fontshare), size, weight, color, alignment, letter-spacing, line-height
  - Drag-and-drop SVG illustrations from all 250 in the library, organized by category
  - Shape tools: rectangle, circle, line, horizontal rule
  - Image upload support
  - 7 preset templates: invitation, save-the-date, RSVP, details, menu, program, name-tag
  - Grid overlay (0.25in step) and guides (trim line, safe zone, center lines)
  - Undo/redo (40-state snapshot history), keyboard shortcuts (Cmd+Z, Delete, Cmd+D, Cmd+A)
  - Export: PNG at 2x resolution, JSON save/load with localStorage persistence
  - Snap-to-center for precise element placement
- Rewrote 30 SVG illustrations with organic bezier curve paths (replacing basic-shape-only versions)
  - 10 moose: sitting, bowtie, flower-crown, sunglasses, walking, peeking, howling, wreath, banner, belly-up, crown, hero-cape
  - 8 couple: dancing, holding-hands-back, with-dog, champagne-pop, hands-monogram, slow-dance, sunset-walk, frame-pose
  - 12 decor: champagne-glasses, cocktail-glass, wedding-cake, heart-large, ribbon-bow, dove, feather, mason-jar, laurel-wreath, flower-simple, envelope, monogram-frame
- Relaxed SVG constraint: `<path>` with cubic bezier (C commands) now allowed and encouraged for organic shapes
- Updated CLAUDE.md with editor architecture section, SVG illustration rules, visual editor docs
- Fixed "French bulldog" to "English bulldog" in docs/design-system.md

### Why
- Basic-shape-only SVGs (rect, circle, polygon) looked too geometric and stick-figure-like for wedding stationery
- A visual editor enables Canva/Figma-style layout design with drag-and-drop and per-element font control
- The 30 priority illustrations (moose, couple, decor) had the most visual impact from the bezier upgrade

### Decisions
- Fabric.js 5.3.1 chosen over Polotno SDK (commercial) and raw Canvas API (no SVG import)
- Editor is a standalone tool (`preview/editor.html`) -- no stationery piece HTML depends on it
- SVG rewrites use cubic bezier C commands with slightly irregular control points for organic/sketchy feel
- Moose SVGs reference proven inline bulldogs from `pieces/save-the-date.html` and `pieces/invitation.html`
- Kept existing `preview/studio.html` as simpler preset-based preview alongside the full editor

## [2026-03-14] (Session 6)

### What changed
- Expanded SVG illustration library from 125 to 250 (25 new per category, numbered 26-50)
- Added 'display' font filter category to studio for Clash Display and Panchang
- Updated studio.html ILLUSTRATIONS data with all 125 new entries
- **Moose 26-50**: howling, ball, bow, sniffing, curious, waving, sign-holder, wreath, banner, love-letter, flowers-mouth, butterfly, treat, belly-up, stretching, digging, shaking, stack-hearts, window, leash, photo, pillow, crown, wings, hero-cape
- **Couple 26-50**: cooking, star-gazing, bike, selfie, picnic, balloons, snowflakes, tree-carving, bridge, boat, lanterns, bookshop, ice-cream, champagne-pop, doorway, kite, coffee, window-seat, hands-monogram, jumping, slow-dance, guitar, sunset-walk, rose-exchange, frame-pose
- **Toronto 26-50**: ferry, bike-path, graffiti-alley, st-lawrence-market, high-park, ROM, casa-loma, flatiron, harbourfront, dundas-square, chinatown-gate, cherry-blossoms, nathan-phillips, lake-ontario, rooftop-bar, patio-umbrella, brunch-scene, sunset-skyline, bridge-night, little-italy, music-venue, art-gallery, waterfront-trail, maple-leaf, wedding-venue
- **Decor 26-50**: gift-box, envelope, wax-seal, bell, dove, candle, lantern, banner-flag, bunting, garland, ribbon-bow, mason-jar, camera, music-notes, feather, ampersand, infinity, compass, hourglass, diamond-gem, arrow, key, lock-heart, horseshoe, monogram-frame
- **Border 26-50**: arrow-corners, scalloped, laurel, film-strip, piano-keys, confetti-scatter, lace-edge, chain-links, vine, feather, geometric, pennant, music, polaroid, envelope, watercolor-edge, mosaic, celtic, bunting-top, curtain, arch-top, string-lights, marquee, filigree, love-letters
- All 250 SVGs verified: zero path elements, all use currentColor stroke, all have :root color style

### Why
- Doubling the illustration library to 50 per category gives much more variety for stationery design
- Coverage now spans landmarks, neighbourhoods, scenes, ceremony, reception, romance, and personalization themes

### Decisions
- All 125 new SVGs use basic shapes only (no paths/beziers) -- consistent with existing library
- Moose SVGs maintain stroke-width="2.5", decor/couple/toronto use stroke-width="2", borders use stroke-width="1.5"
- Borders use viewBox="0 0 500 700" (5:7 ratio matching stationery cards)
- Monogram frame (decor-50) includes K & M initials specific to the couple
- Wedding venue (toronto-50) designed as ceremony arch with string lights -- usable as hero illustration
- Maple leaf (toronto-49) built as polygon with vein lines for Canadian identity

## [2026-03-14] (Session 5)

### What changed
- Rewrote all 5 Moose bulldog SVGs from scratch with fundamentally different head proportions
- Replaced round ellipse heads with custom wide/flat-topped paths (width > height) to eliminate pig-like appearance
- Added prominent drooping jowls as separate paths on both sides of face
- Added visible underbite with lower jaw curves and small tooth lines
- Added forehead wrinkle lines for bulldog character
- Added filled nostril circles inside the wide flat nose shape
- Added paw toe lines on all visible paws
- Increased stroke-width from 2 to 2.5 for thicker freehand feel
- Updated moose-walking.svg viewBox from 120x80 to 140x85 for better side-profile proportions
- Updated moose-peeking.svg viewBox from 120x60 to 130x60 for wider head
- All paths use cubic bezier (C commands) with slightly irregular control points for organic/sketchy feel

### Why
- Previous versions used ellipses for the head which made the dog look like a pig
- English bulldogs have distinctive square/rectangular heads, not round ones
- The jowls, underbite, and flat face are the most recognizable bulldog features and were underrepresented

### Decisions
- Head path uses approximately 70px wide x 45px tall proportions (wider than tall) vs the old ~52x44 ellipse
- Jowls rendered as separate overlapping paths rather than part of the head outline, so they read as drooping flesh
- Underbite shown with both a lower jaw curve AND small vertical tooth lines for clarity at small sizes
- Nostrils are filled circles inside the nose path for the pushed-in brachycephalic look
- Forehead wrinkles add character without adding too much visual complexity (1-2 lines per SVG)
- Toe lines on paws add detail that helps communicate stocky bulldog build

## [2026-03-14] (Session 4)

### What changed
- Created 14 new hand-drawn SVG decorative elements in assets/svg/
- 5 border variants (500x700 viewBox, matching 5x7 stationery): vine, geometric, minimal, ornate, playful
- 2 divider variants: flourish (scroll/swirl ornament) and botanical (branch with leaves)
- 7 doodle/accent elements: confetti, wedding rings, champagne tower, food platter, 3-tier cake, leaves spray, ornate corner flourish
- All SVGs follow established conventions: stroke="currentColor", fill="none", stroke-width="2" (1.5 for borders), round caps/joins, :root color style

### Why
- Stationery pieces needed more variety in decorative borders and accent illustrations
- Different border styles suit different piece types (ornate for invitation, playful for details card, minimal for RSVP)
- Food platter and cake doodles support the menu and details cards
- Champagne tower and confetti match the cocktail party wedding vibe

### Decisions
- Borders use stroke-width="1.5" (thinner than main illustrations) to avoid visual heaviness at full page scale
- Playful border uses scattered discrete doodles (hearts, stars, champagne glasses, leaves) rather than a continuous line
- Corner-ornate-tl.svg oriented top-left; other orientations achieved via CSS transform (matching existing corner-flourish pattern)
- Food platter includes recognizable cheese, crackers, grapes, olives -- common cocktail reception items
- Champagne tower uses coupe glasses (not flutes) for the classic pyramid aesthetic

## [2026-03-14] (Session 3)

### What changed
- Rewrote all 5 Moose bulldog SVGs with dramatically simplified "rubber stamp" approach
- Reduced element count from 30+ paths per file down to 9-15 elements each
- Corrected viewBox dimensions to spec: sitting-bowtie (100x120), walking (120x80), party-hat (100x130), peeking (120x60), sitting-simple (80x100)
- Used simple ellipses for heads, single-path legs with rounded paw caps, minimal facial features
- All SVGs use stroke="currentColor", fill="none", stroke-width="2", stroke-linecap/linejoin="round"
- Each includes `<style>:root { color: #1B2438; }</style>` for standalone rendering

### Why
- Previous SVGs had too many bezier curves that did not visually resolve into a recognizable bulldog
- Simpler paths render cleanly at all sizes and match the hand-drawn wedding stationery aesthetic

### Decisions
- "Charming rubber stamp / children's book doodle" style rather than anatomical illustration
- Eyes are simple filled circles (fill="currentColor") -- no highlight circles
- Legs drawn as single continuous paths with curved paw bottoms instead of separate leg lines + paw paths + toe lines
- Party hat variant uses happy squint arcs for eyes instead of filled dots (differentiating expression)
- Peeking variant uses a half-circle arc for the head above the edge line rather than a full ellipse

## [2026-03-14] (Session 2)

### What changed
- Built all 8 stationery pieces: invitation, details card, RSVP card, program, table name tag, food menu, envelope liner
- Added wedding program to the suite (order of events + wedding party + thank you)
- Created toronto-skyline.svg and hand-drawn-border.svg (completing SVG illustration set)
- Updated preview gallery -- all pieces now render as live iframes
- Created private GitHub repo (max1miliaan/wedding-stationery)
- Updated global MEMORY.md and PROJECTS.md registry

### Why
- User requested program added to stationery suite
- Completing all pieces enables full suite review and iteration

### Decisions
- Program format: 4.25 x 5.5 inches, timeline layout with coral time markers on the left
- Moose confirmed as English bulldog (not French) -- all illustration briefs and SVGs corrected
- Placeholder menu items and event times used -- to be finalized closer to date
- Envelope liner: sunset gradient background with scattered cream doodle pattern (champagne, stars, hearts, CN Tower, Moose silhouette)

## [2026-03-14]

### What changed
- Project initialized with full folder structure
- Design direction established: hand-drawn line art, sunset warm palette, playful tone
- Color palette defined: cream base, coral/pink/golden accents, navy line art
- Typography selected: Clash Display + Sentient + Satoshi (Fontshare)
- Stationery suite scoped: 7 pieces (save the date, invitation, details, RSVP, envelope, name tags, menu)
- Print specifications defined for all pieces
- Illustration approach: code-drawn SVGs for simple elements, ElevenLabs for complex (Moose, couple)
- Design system CSS and first stationery pieces built

### Why
- Kash & Max wedding: July 3, 2027 at The Drake Hotel rooftop, Toronto
- Cocktail reception style, casual fun vibes, bulldog Moose attending
- Need full stationery suite designed and ready for print production

### Decisions
- HTML/CSS as primary design tool (not Figma/Canva) -- Claude can directly execute, full git version control
- Clash Display for display (bold modern sans) over Zodiak (too editorial) or Boska (serif overlap with Sentient)
- Navy (#1B2438) for line art instead of pure black -- softer, warmer, matches relaxed tone
- Two-tier illustration approach: code-drawn SVGs first, ElevenLabs for organic/character illustrations
- Save the Date produced in both digital (WhatsApp/email) and physical (print) formats
- Coral envelopes purchased physically (better color saturation than printed)
