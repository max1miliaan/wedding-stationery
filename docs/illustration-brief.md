# Illustration Brief

All illustrations for the Kash & Max wedding stationery suite. Divided into two categories: code-drawn SVGs (created by Claude in code) and AI-generated illustrations (produced via ElevenLabs image generation).

All illustrations share a consistent style: hand-drawn line art, navy stroke (`#1B2438`), approximately 2px stroke weight at print scale, transparent background, SVG format.

---

## Code-Drawn SVGs

Claude creates these directly as SVG code. They are geometric or simple enough to produce reliably in code. All use `stroke="currentColor"` for CSS color control, `fill="none"`, and a consistent `stroke-width` value.

### 1. champagne-glasses.svg

Two champagne flutes clinking together at an angle. Small splash/radiating lines emanate from the point where the glasses meet. The flutes have a simple bowl, stem, and base. Lines are slightly irregular to suggest a hand-drawn quality.

- **Viewbox:** Approximately 120x100
- **Stroke:** `currentColor`, width ~2
- **Details:** 3-4 short splash lines radiating outward from the clink point. Slight fizz bubbles (small circles) rising from each glass.

### 2. cocktail-glass.svg

A coupe glass (rounded bowl, not V-shaped martini) with a citrus wedge garnish perched on the rim. Two or three small bubbles floating above the liquid surface.

- **Viewbox:** Approximately 80x100
- **Stroke:** `currentColor`, width ~2
- **Details:** The citrus wedge is a half-circle with two radial lines suggesting segments. Bowl has a subtle curve. Thin stem and small circular base.

### 3. corner-flourish-tl.svg

Top-left corner decorative element. A curving line that sweeps in from both the top and left edges, meeting at the corner with a small organic curl. A few small leaf shapes branch off the curve. The overall impression is vine-like and organic, not rigid or geometric.

- **Viewbox:** Approximately 80x80
- **Stroke:** `currentColor`, width ~2
- **Details:** 2-3 small leaves (simple teardrop shapes). The main line has a gentle S-curve. Leaves face outward from the corner.

### 4. corner-flourish-tr.svg

Top-right corner flourish. Horizontal mirror of `corner-flourish-tl.svg`. Identical structure, reflected across the vertical axis.

- **Viewbox:** Approximately 80x80
- **Stroke:** `currentColor`, width ~2

### 5. corner-flourish-bl.svg

Bottom-left corner flourish. Vertical mirror of `corner-flourish-tl.svg`. Identical structure, reflected across the horizontal axis.

- **Viewbox:** Approximately 80x80
- **Stroke:** `currentColor`, width ~2

### 6. corner-flourish-br.svg

Bottom-right corner flourish. Both horizontal and vertical mirror of `corner-flourish-tl.svg`. Identical structure, reflected across both axes.

- **Viewbox:** Approximately 80x80
- **Stroke:** `currentColor`, width ~2

### 7. divider-line.svg

A horizontal decorative divider. The main line is slightly wavy (not perfectly straight), spanning the full width. At the center, two small leaf shapes face outward on either side of the line, creating a subtle botanical accent.

- **Viewbox:** Approximately 200x30
- **Stroke:** `currentColor`, width ~2
- **Details:** The wave amplitude is subtle (2-3px deviation from center). Leaves are small and symmetrical. The line tapers slightly at both ends.

### 8. doodle-stars.svg

A cluster of 3-4 small hand-drawn stars scattered in an organic arrangement. Each star is a slightly irregular five-pointed star (not perfectly symmetrical). Stars vary in size -- one larger, two or three smaller.

- **Viewbox:** Approximately 100x80
- **Stroke:** `currentColor`, width ~1.5 to 2
- **Details:** Stars are spaced apart, not overlapping. The irregular points give a sketched quality. No fill.

### 9. doodle-hearts.svg

A cluster of 2-3 small hand-drawn hearts scattered loosely. Each heart is slightly different in size and angle, suggesting they were quickly sketched. The largest heart is approximately twice the size of the smallest.

- **Viewbox:** Approximately 80x60
- **Stroke:** `currentColor`, width ~2
- **Details:** Hearts are the classic two-bump-and-point shape, but with slightly uneven curves for a hand-drawn feel.

### 10. cn-tower.svg

A simplified line drawing of the CN Tower. Shows the distinctive silhouette: the tapered shaft, the observation pod/donut, the antenna spire. Slightly stylized -- not architecturally precise, but immediately recognizable.

- **Viewbox:** Approximately 40x120
- **Stroke:** `currentColor`, width ~2
- **Details:** The observation pod is drawn as a wider oval/disc shape partway up the tower. The antenna narrows to a point. The base widens slightly. No interior detail.

### 11. toronto-skyline.svg

A loose, simplified silhouette of the Toronto skyline. The CN Tower is the tallest and most prominent element, positioned slightly left of center. Surrounding buildings are suggested with simple rectangular shapes of varying heights. The Rogers Centre dome is a subtle rounded shape near the CN Tower base.

- **Viewbox:** Approximately 300x80
- **Stroke:** `currentColor`, width ~2
- **Details:** Buildings are simple outlines (rectangles with flat or slightly varied rooflines). The skyline reads as a continuous silhouette. No window details. 8-12 building shapes total.

### 12. hand-drawn-border.svg

A full rectangular border frame for the invitation card. The lines are slightly irregular and sketchy -- not perfectly straight, with subtle wobble to suggest hand-drawing. The four corners have small vine/leaf decorations similar to the corner flourish elements but integrated into the border.

- **Viewbox:** Approximately 500x700 (proportional to 5x7 card)
- **Stroke:** `currentColor`, width ~2
- **Details:** Each side of the rectangle has a slight organic wave. Corner decorations are small curls with 1-2 leaves each, growing outward from the corner. The border has a single continuous path where possible.

---

## ElevenLabs Image Generation Prompts

These illustrations are too organic and complex to produce reliably in code. Generate them via ElevenLabs image generation, then convert the output to SVG (via tracing or manual cleanup) for resolution-independent printing.

### Post-Processing Steps (for all generated illustrations)

1. Generate the image at high resolution
2. Trace to SVG using a tool like Inkscape's "Trace Bitmap" or Adobe Illustrator's "Image Trace"
3. Clean up paths: remove artifacts, simplify unnecessary anchor points
4. Replace all stroke/fill colors with `currentColor`
5. Set `fill="none"` and `stroke="currentColor"` on all path elements
6. Ensure transparent background (remove any white/background rectangle)
7. Optimize with SVGO or similar tool
8. Test at print scale to verify stroke weight consistency

---

### 1. moose-sitting-bowtie

**Filename:** `moose-sitting-bowtie.svg`
**Used on:** Save the Date

**Prompt:**
```
A hand-drawn line art illustration of a English bulldog sitting upright and facing
forward, wearing a small bowtie around its neck. The dog has a happy expression
with its tongue slightly out and its large rose ears standing upright. The style is
pen and ink with a single consistent stroke weight throughout. Dark navy ink on a
plain white background. The drawing is simple and charming with a slightly loose,
sketchy quality -- not photo-realistic, more like a quick confident sketch by an
illustrator. No shading, crosshatching, or fills -- just clean outlines. The dog's
body proportions should be accurate to a English bulldog: stocky, muscular, wrinkly face with a prominent underbite showing lower teeth, floppy rose ears, and wide-set eyes.
```

**Size guidance:** Approximately 1.75in tall at print scale on the Save the Date card.

---

### 2. moose-walking

**Filename:** `moose-walking.svg`
**Used on:** Invitation (small, above text)

**Prompt:**
```
A hand-drawn line art illustration of a English bulldog walking in profile, viewed
from the side. The dog is mid-stride with one front paw and the opposite back paw
forward. Its tail is up and its large rose ears are perked. The expression is
cheerful and alert. Pen and ink style with a single consistent stroke weight
throughout. Dark navy ink on a plain white background. Simple, loose sketch style
with confident lines -- not photo-realistic. No shading, crosshatching, or solid
fills, just clean outlines. The proportions should be true to a English bulldog:
stocky muscular body, short legs, broad chest, wrinkly face with underbite, floppy rose ears.
```

**Size guidance:** Approximately 1in wide at print scale on the invitation.

---

### 3. moose-party-hat

**Filename:** `moose-party-hat.svg`
**Used on:** RSVP Card

**Prompt:**
```
A hand-drawn line art illustration of a English bulldog wearing a small conical
party hat with a pom-pom on top. The dog is sitting in a slightly playful,
relaxed pose -- perhaps with its head tilted slightly to one side. Its large bat
ears stick out on either side of the party hat. The expression is happy and
endearing. Pen and ink style, single consistent stroke weight, dark navy ink on
plain white background. The hat has a simple stripe or polka dot pattern drawn
with thin lines. Whimsical and fun in tone. No shading or fills, just outlines.
English bulldog proportions: stocky and muscular, wrinkly face, prominent underbite with lower teeth showing, rose ears, wide-set eyes.
```

**Size guidance:** Approximately 1.25in tall at print scale on the RSVP card.

---

### 4. moose-peeking

**Filename:** `moose-peeking.svg`
**Used on:** Details Card (bottom edge)

**Prompt:**
```
A hand-drawn line art illustration showing just the top portion of a French
bulldog's head and its two front paws, as if the dog is peeking over a ledge,
table edge, or the bottom border of a card. Only the top of the head, the two
large rose ears, the eyes, the top of the nose, and the two front paws gripping
the edge are visible. Everything below the ledge line is hidden. The expression
is curious and adorable -- wide eyes looking upward. Pen and ink style, single
consistent stroke weight, dark navy ink on plain white background. No shading or
fills, just clean outlines. The edge/ledge the dog peeks over should be a simple
straight horizontal line.
```

**Size guidance:** Approximately 1.5in wide at print scale. Positioned at the bottom edge of the Details Card so the dog appears to peek up from the card's bottom.

---

### 5. couple-dancing

**Filename:** `couple-dancing.svg`
**Used on:** Optional decorative element (menu, website, or additional pieces)

**Prompt:**
```
A hand-drawn line art illustration of a couple dancing together joyfully,
inspired by a candid moment of a spin on a clifftop at sunset. The man is tall
and athletic with a shaved head and short beard, the woman has beautiful curly
natural hair. They are mid-spin with arms raised, her hand in his, bodies
turned toward each other with casual, celebratory energy. She wears a flowing
outfit, he is in a casual shirt and trousers. The lines are loose and gestural,
emphasizing movement and connection rather than precise anatomical detail. Their
faces can be simple or suggested -- the focus is on the gesture and the joy.
Pen and ink style, single consistent stroke weight throughout, dark navy ink
on plain white background. Not stiff or formal -- the energy should feel like
a candid moment between two people who are genuinely in love. No shading,
crosshatching, or fills.
```

**Size guidance:** Approximately 2in tall at print scale. This is an optional decorative illustration and may be used on supplementary pieces.

---

## Illustration Inventory by Piece

| Piece | Illustrations Used |
|---|---|
| Save the Date | corner-flourish-tl/tr/bl/br, champagne-glasses, moose-sitting-bowtie |
| Invitation | hand-drawn-border, moose-walking, cocktail-glass, doodle-stars, doodle-hearts |
| Details Card | moose-peeking, section icon SVGs (small inline icons) |
| RSVP Card | moose-party-hat |
| Envelope Liner | champagne-glasses, doodle-stars, doodle-hearts, cn-tower (all as small repeated pattern elements in cream on gradient) |
| Table Name Tag | corner-flourish (one corner) or small moose doodle |
| Food Menu | divider-line, small food doodle SVGs between sections |
| Program | corner-flourish (top corners), divider-line, small moose doodle |
