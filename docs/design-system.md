# Design System Specification

Kash & Max Wedding Stationery -- complete design token reference.

---

## Color Palette

| Token | Hex | RGB | Role |
|---|---|---|---|
| `cream` | `#FFF8F0` | `rgb(255, 248, 240)` | Base background (warm off-white) |
| `cream-deep` | `#F5EDE0` | `rgb(245, 237, 224)` | Secondary background, card backs |
| `coral` | `#E8704A` | `rgb(232, 112, 74)` | Primary accent (sunset coral/orange) |
| `coral-light` | `#F2956E` | `rgb(242, 149, 110)` | Lighter coral for gradients |
| `pink` | `#E89BAE` | `rgb(232, 155, 174)` | Secondary accent (warm pink) |
| `golden` | `#F2C66D` | `rgb(242, 198, 109)` | Tertiary accent (soft golden yellow) |
| `navy` | `#1B2438` | `rgb(27, 36, 56)` | Primary text and line art |
| `navy-light` | `#3A4A68` | `rgb(58, 74, 104)` | Secondary text |

### Sunset Gradient

```css
background: linear-gradient(135deg, #F2956E 0%, #E8704A 50%, #E89BAE 100%);
```

Direction: 135 degrees (top-left to bottom-right). Used for decorative backgrounds only -- never place body text directly over the gradient.

### CSS Custom Properties

```css
:root {
  --cream: #FFF8F0;
  --cream-deep: #F5EDE0;
  --coral: #E8704A;
  --coral-light: #F2956E;
  --pink: #E89BAE;
  --golden: #F2C66D;
  --navy: #1B2438;
  --navy-light: #3A4A68;
}
```

---

## Typography

Three fonts sourced from Fontshare. All stationery files load them via CDN with a local fallback.

### Fontshare CDN Link

```
https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=sentient@400,400i,600&f[]=satoshi@400,500,700&display=swap
```

### Font Families

#### 1. Clash Display

- **Weights:** 600 (Semibold), 700 (Bold)
- **Classification:** Geometric sans-serif display font
- **Usage:** Couple names ("KASH & MAX"), section titles ("THE DETAILS", "RSVP", "MENU"), headlines
- **Case:** Always uppercase for display usage
- **CSS:** `font-family: 'Clash Display', sans-serif;`

#### 2. Sentient

- **Weights:** 400 (Regular), 400 Italic, 600 (Semibold)
- **Classification:** Humanist serif with calligraphic roots
- **Usage:** Invitation body copy, dates written out ("Saturday, the Third of July"), descriptions, paragraph text
- **Case:** Mixed case (sentence case or title case as appropriate)
- **CSS:** `font-family: 'Sentient', serif;`

#### 3. Satoshi

- **Weights:** 400 (Regular), 500 (Medium), 700 (Bold)
- **Classification:** Clean geometric sans-serif
- **Usage:** Addresses, labels, letterspaced subheadings, small functional text
- **Case:** Often uppercase with letterspacing for labels; mixed case for addresses and utility text
- **CSS:** `font-family: 'Satoshi', sans-serif;`

### Font Pairing Rules

- Clash Display for the largest text on any piece (names, section titles)
- Sentient for anything that reads as a sentence or paragraph
- Satoshi for anything functional, navigational, or label-like
- Never use more than two font families on a single piece (Clash Display + one of the others)
- Sentient italic is reserved for emphasis within body text, not for standalone headings

---

## Type Scale (Print, in Points)

All font sizes are specified in `pt` for print accuracy.

| Token | Size | Usage |
|---|---|---|
| `text-xs` | 8pt | Fine print, legal text |
| `text-sm` | 10pt | Secondary information, captions |
| `text-base` | 12pt | Body text (default reading size) |
| `text-lg` | 16pt | Subheadings, emphasized lines |
| `text-xl` | 24pt | Section headers |
| `text-2xl` | 36pt | Date, venue name |
| `text-display` | 48pt | Couple names on invitation |
| `text-hero` | 72pt | Couple names on save the date |

### CSS Custom Properties

```css
:root {
  --text-xs: 8pt;
  --text-sm: 10pt;
  --text-base: 12pt;
  --text-lg: 16pt;
  --text-xl: 24pt;
  --text-2xl: 36pt;
  --text-display: 48pt;
  --text-hero: 72pt;
}
```

### Letterspacing Guidelines

- Clash Display at display/hero sizes: `letter-spacing: 0.05em` to `0.1em`
- Satoshi uppercase labels: `letter-spacing: 0.15em` to `0.2em`
- Sentient body text: `letter-spacing: normal` (do not add extra tracking)

### Line Height Guidelines

- Display/hero text: `line-height: 1.1`
- Body text (Sentient): `line-height: 1.5` to `1.6`
- Labels (Satoshi uppercase): `line-height: 1.3`

---

## Spacing Scale (Inches, for Print)

| Token | Size | Usage |
|---|---|---|
| `xs` | 0.125in | Tightest spacing, between closely related elements |
| `sm` | 0.25in | Safe zone inset from trim, small gaps |
| `md` | 0.5in | Standard section spacing |
| `lg` | 0.75in | Major section breaks |
| `xl` | 1in | Generous breathing room, top/bottom margins |

### CSS Custom Properties

```css
:root {
  --space-xs: 0.125in;
  --space-sm: 0.25in;
  --space-md: 0.5in;
  --space-lg: 0.75in;
  --space-xl: 1in;
}
```

---

## Illustration Style

All illustrations follow a consistent hand-drawn line art style.

### Characteristics

- **Stroke color:** Navy (`#1B2438`)
- **Stroke weight:** Approximately 2px at print scale (consistent across all illustrations)
- **Line quality:** Sketchy and loose, not geometrically precise -- conveys warmth and personality
- **Fill:** None (outlines only, no shading or solid fills)
- **Background:** Transparent
- **Format:** SVG
- **Color control:** All SVGs use `stroke="currentColor"` so the color can be set via CSS `color` property

### SVG Implementation

```html
<!-- Example: embedding an illustration -->
<img src="../assets/svg/champagne-glasses.svg" alt="Champagne glasses" class="illustration">
```

```css
/* Color control via CSS */
.illustration {
  color: var(--navy);
  width: 1.5in;
  height: auto;
}
```

---

## Approved Color Combinations

These are the tested and approved pairings. Do not introduce new combinations without checking contrast and aesthetic fit.

| Foreground | Background | Usage |
|---|---|---|
| Navy text | Cream background | Primary combination for all body text |
| Navy-light text | Cream background | Secondary/supporting text |
| Coral text/accent | Cream background | Ampersand (&) between names, section titles, accent lines |
| Cream text | Coral background | Envelope interior, card backs |
| Cream/white doodles | Sunset gradient | Envelope liner pattern |
| Navy line art | Cream background | All illustrations on cards |
| Golden accent | Navy background | Sparingly, for small decorative elements only |

### Specific Rules

- The ampersand (&) between "Kash" and "Max" is always rendered in coral (`#E8704A`)
- Body text is always navy on cream -- never reversed, never on gradient
- The sunset gradient is strictly decorative (envelope liners, background panels) and never has body text placed on top
- Coral section titles (e.g., "COCKTAILS & CELEBRATION") use Clash Display at `text-xl` or smaller
- Card backs and envelope flaps may use `cream-deep` (`#F5EDE0`) for subtle contrast

---

## Design Principles

1. **Warmth over formality.** The hand-drawn illustrations and warm color palette create an approachable, personal feel. Nothing should look corporate or sterile.
2. **Consistency across pieces.** Every piece in the suite should be immediately recognizable as part of the same set through shared colors, typography, and illustration style.
3. **Print-first design.** All sizing, spacing, and color decisions are made for physical print. Screen preview is a development convenience, not the final medium.
4. **Breathing room.** Generous whitespace (creamspace) is a feature. Do not crowd text or illustrations to fill space.
5. **The Moose thread.** The French bulldog "Moose" appears on every major piece in a different pose, creating a playful thread that ties the suite together.
