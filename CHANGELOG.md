# Changelog

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
