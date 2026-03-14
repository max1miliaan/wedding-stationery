# SVG Illustration Guide

Reference for creating hand-drawn style SVG illustrations in code. These techniques produce charming, organic-feeling line art without needing external image generation.

---

## Core Principles

### 1. Organic lines, not geometric shapes

Bad: `<circle cx="50" cy="50" r="20" />` for a head
Good: `<path d="M 30 50 C 30 30, 45 20, 55 20 C 65 20, 80 30, 80 50 C 80 65, 70 75, 55 78 C 40 75, 30 65, 30 50" />`

Real hand-drawn illustrations use curves that are slightly asymmetric. Heads aren't perfect circles. Bodies aren't perfect ellipses. Every curve should have subtle imperfection.

### 2. Cubic beziers (`C`) over quadratics (`Q`)

Cubic beziers (`C x1 y1, x2 y2, x y`) give two control points per segment, allowing S-curves, inflection points, and more natural-feeling lines. Quadratics (`Q cx cy, x y`) are simpler but tend to produce stiffer, more mechanical curves.

Use `C` for:
- Body contours
- Facial features
- Organic shapes (ears, jowls, paws)

Use `Q` sparingly for:
- Simple arcs
- Quick helper curves

### 3. Stroke characteristics

```
stroke="currentColor"    /* Always -- lets CSS control color */
stroke-width="2"         /* Standard for most illustration lines */
stroke-linecap="round"   /* Rounded line endings feel hand-drawn */
stroke-linejoin="round"  /* Rounded joins at corners */
fill="none"              /* Line art = no fills (except eyes) */
```

Use `stroke-width="1.5"` for finer details (wrinkles, fur texture, small accents).
Use `stroke-width="2.5"` for bold outlines (outer body contour) if differentiation is needed.

### 4. Implied detail over explicit detail

Don't draw every wrinkle, every fur tuft, every toenail. A few well-placed detail lines suggest the rest. The viewer's brain fills in what's missing.

- 2-3 wrinkle lines on a bulldog forehead > 10 parallel lines
- A single curve suggesting a muscle > anatomically precise outline
- Toes implied by 2 short lines on a paw > drawing each individual toe

---

## Drawing Animals (English Bulldog Specifics)

### Proportions

English bulldogs are:
- **Wide and low** -- width-to-height ratio is roughly 1:1 when sitting
- **Head is massive** relative to body -- head width is ~60% of body width
- **Legs are short** -- about 1/3 of total height
- **Chest is broad** -- barrel-shaped, wider than hips
- **Face is flat** -- very short muzzle, pushed-in nose

### Key features to capture

1. **Wrinkly forehead**: 2-3 curved lines across the brow, slightly asymmetric
2. **Rose ears**: Small, folded ears that curl backward -- NOT erect, NOT floppy hound ears. Draw as small folded flaps on top-sides of head
3. **Wide-set eyes**: Positioned low on the face, far apart, round
4. **Flat pushed-in nose**: Wide, large nostrils drawn prominently
5. **Underbite/undershot jaw**: Lower jaw extends past upper. Visible lower teeth poking up
6. **Heavy jowls**: Loose skin hanging at sides of mouth
7. **Thick neck rolls**: Loose skin creates folds at the neck
8. **Stocky legs**: Short, thick, slightly bowed
9. **Big rounded paws**: Splayed, wider than the legs
10. **Short tail**: Curled or straight stub

### Head construction (front view)

```
Step 1: Wide, slightly flat oval for head shape
        Not a circle -- wider than tall, flat on top

Step 2: Horizontal center line slightly below middle (eyes sit low)
        Vertical center line

Step 3: Eyes at wide spacing -- about 40% of head width apart
        Each eye is round, filled black with small highlight

Step 4: Nose between and below eyes -- large, wide, flat
        Draw as a wide shape with two large nostrils

Step 5: Mouth/jaw below nose
        Lower jaw line curves down and out
        Two small teeth poking up from lower jaw
        Jowl lines on either side

Step 6: Ears -- small rose-fold ears at top corners of head
        Each ear is a small curved flap, folded backward

Step 7: Wrinkles -- 2-3 horizontal curved lines on forehead
        One deeper wrinkle between the eyes (nose rope)

Step 8: Neck wrinkles -- loose curved line where head meets body
```

### Head construction (side/profile view)

```
The head in profile is very flat-faced:
- Back of skull is rounded
- Forehead drops almost vertically
- Nose is pushed back, nearly flush with forehead
- Lower jaw juts forward past the nose
- Ear sits on top-back of head, folded
- Jowl hangs prominently below jaw
```

### Body construction (sitting)

```
Step 1: Broad chest -- widest point just below the head
        Draw as a wide, barrel-shaped form

Step 2: Front legs -- short, thick, slightly bowed outward
        Straight-ish lines but with muscle curves
        End in big, splayed paws

Step 3: Body narrows slightly toward the rear
        Round belly visible between legs

Step 4: Rear haunches -- thick, tucked under when sitting
        Partially hidden behind front legs in sitting pose

Step 5: Paws -- draw 3-4 short lines on each paw for toes
        Paws are wider than the legs
```

### Body construction (walking/profile)

```
Step 1: Back line -- slightly curved, bulldog has a low back
        Rises slightly at shoulders, dips in middle, rises at hips

Step 2: Chest -- deep, almost touching the ground
        The chest hangs low between front legs

Step 3: Legs in walking pose -- opposite pairs forward
        Front left + back right forward, or vice versa
        Legs are thick cylinders, not stick lines

Step 4: Tail -- short stub, either curled up or straight back
```

---

## Drawing Techniques

### Suggest volume with partial outlines

Don't outline the entire body as a continuous path. Break the outline and let the viewer's eye complete the shape.

```svg
<!-- Instead of a fully closed body outline, use open paths: -->
<path d="M 30 50 C 25 55, 22 65, 22 80" />  <!-- left side -->
<path d="M 70 50 C 75 55, 78 65, 78 80" />  <!-- right side -->
<!-- The bottom is implied, not drawn -->
```

### Create depth with overlapping

Draw closer elements on top of (after in SVG source) farther elements. A front paw drawn after the body creates depth.

### Hand-drawn wobble

For lines that should feel sketched, use control points that are slightly off the mathematically "perfect" position:

```svg
<!-- Perfectly straight line (too mechanical): -->
<line x1="10" y1="50" x2="90" y2="50" />

<!-- Hand-drawn feel with slight curve: -->
<path d="M 10 50 C 30 48, 60 52, 90 50" />
```

### Adding character/expression

- **Happy**: Mouth curves up slightly, tongue out (simple oval peeking out), bright round eyes
- **Curious**: Head tilted 5-10 degrees, one ear slightly higher, wide eyes
- **Playful**: Body in play-bow position, tail up, open mouth
- **Regal**: Head held high, dignified closed mouth, straight posture

---

## SVG Path Command Reference

| Command | Meaning | Parameters |
|---------|---------|-----------|
| `M` | Move to | `x y` |
| `L` | Line to | `x y` |
| `C` | Cubic bezier | `cx1 cy1, cx2 cy2, x y` |
| `S` | Smooth cubic | `cx2 cy2, x y` (mirrors previous control point) |
| `Q` | Quadratic bezier | `cx cy, x y` |
| `A` | Arc | `rx ry rotation large-arc sweep x y` |
| `Z` | Close path | -- |

Lowercase versions (`m`, `l`, `c`, etc.) use relative coordinates.

### Useful `S` command

The `S` (smooth cubic) command continues a curve by automatically mirroring the previous control point. This creates smooth, continuous curves without manually calculating the reflection:

```svg
<!-- Two connected S-curves for a flowing body contour: -->
<path d="M 20 50 C 20 30, 40 20, 60 25 S 100 40, 100 60" />
```

---

## Viewbox Conventions

| Subject | Suggested viewBox | Notes |
|---------|------------------|-------|
| Full dog sitting | `0 0 120 130` | Slightly taller than wide |
| Full dog walking | `0 0 160 100` | Wider for walking stride |
| Dog head only | `0 0 100 90` | Wide for bulldog face |
| Dog peeking | `0 0 150 80` | Wide, short -- head + paws over edge |
| Small icon dog | `0 0 80 80` | Square, simplified |

---

## Iteration Workflow

1. Write the SVG in `assets/svg/`
2. Open `preview/illustrations.html` to see it at multiple scales
3. Adjust control points, add/remove detail
4. Live-server auto-reloads on save
5. When satisfied, embed in the stationery piece

### Common adjustments

- **Too stiff**: Add slight offsets to control points (1-3px from "ideal" position)
- **Too complex**: Remove detail lines, simplify curves, reduce anchor points
- **Proportions wrong**: Sketch the bounding box first, place key landmarks (eyes, nose, paws) relative to the box
- **Not charming enough**: Add expression -- tilt the head, add a tongue, make eyes bigger

---

## File Naming

All illustration SVGs live in `assets/svg/` with descriptive kebab-case names:

```
moose-sitting-bowtie.svg
moose-walking.svg
moose-party-hat.svg
moose-peeking.svg
moose-sitting-simple.svg
champagne-glasses.svg
cocktail-glass.svg
corner-flourish-tl.svg
...
```
