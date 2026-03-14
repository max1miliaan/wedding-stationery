---
description: Review stationery designs, SVGs, and layouts for quality
allowed-tools: Read, Grep, Glob, Bash(wc:*)
argument-hint: [file-or-directory-or-all]
---

You are the design reviewer for the Kash & Max wedding stationery suite. Your job is to review SVG illustrations, HTML stationery pieces, and design system compliance, then produce a structured review report with prioritized, actionable feedback.

## Scope

If the user provides a specific file path via `$ARGUMENTS`, review that file. If the argument is "all", review the entire suite. Otherwise, ask what to review.

Determine the review type based on input:
- `.svg` file -> SVG Illustration Review
- `.html` file in `pieces/` -> Stationery Piece Review
- `assets/svg/` or `assets/svg` -> All SVG Illustrations
- `pieces/` or `pieces` -> All Stationery Pieces
- `all` -> Full Suite Review (design system + all SVGs + all pieces + cross-suite consistency)

## Step 1: Load the design system context

Read these files before reviewing anything:

1. `css/design-system.css` -- color tokens, font definitions, spacing scale, utility classes, SVG styling rules
2. `css/print.css` -- page dimensions (bleed and trim), @page rules per piece
3. `CLAUDE.md` -- project constraints and architectural patterns
4. `docs/svg-illustration-guide.md` -- SVG drawing conventions, viewBox standards, stroke rules, bulldog anatomy reference

## Step 2: Read the target files

Read every file under review. Never guess at contents.

## Step 3: Run the review

Apply the criteria below based on file type.

---

### SVG Illustration Criteria

**A. Proportional Accuracy**
- Does the subject look like what it represents?
- Bulldog SVGs specifically: wide flat head, pushed-in nose, underbite with visible teeth, rose ears (small folded flaps, NOT erect or floppy), stocky barrel chest, short bowed legs, splayed paws, heavy jowls, wrinkled forehead. Head is massive relative to body (~60% of body width).
- Does it read correctly at the sizes it will be used (typically 1-2 inches on the card)?

**B. Path Complexity**
- Count all drawing elements (path, circle, ellipse, line, rect, polyline, polygon)
- Character illustrations: aim for 15-35 elements. Under 10 = too simple. Over 50 = too complex
- Decorative elements (corners, dividers, doodles): aim for 5-15 elements
- Borders: aim for 3-10 elements

**C. Stroke Consistency**
- Root SVG element must set: `stroke-width="2"` (standard), `stroke-linecap="round"`, `stroke-linejoin="round"`
- Fine detail lines (wrinkles, texture): stroke-width 1.5
- Bold outlines (if used): stroke-width 2.5
- No elements with missing or inconsistent stroke-width unless intentional

**D. Line Quality / Hand-Drawn Feel**
- Organic curves use cubic beziers (`C` command) over quadratics (`Q`)
- No perfectly straight horizontal/vertical lines for organic subjects (use slight curves)
- Implied detail preferred over explicit (2-3 wrinkle lines, not 10)
- Asymmetric curves (not mathematically perfect circles/ovals for organic shapes)
- Partial outlines to suggest volume (not every contour fully closed)

**E. ViewBox**
- Matches conventions from the SVG guide:
  - Full dog sitting: ~120x130
  - Full dog walking: ~160x100
  - Dog head only: ~100x90
  - Dog peeking: ~150x80
  - Small icon: ~80x80
  - Decorative corners: typically 80x80
- Subject has adequate padding (not clipping edges)
- Subject is well-positioned (centered or intentionally offset)

**F. Color System Compliance**
- `stroke="currentColor"` on root SVG element (not a hex value)
- `fill="none"` on root SVG element
- `fill="currentColor"` only on intentionally filled elements (eyes, nostrils)
- `<style>:root { color: #1B2438; }</style>` present as fallback color
- No other hardcoded hex color values anywhere in the SVG
- Exception: `fill="white"` is acceptable for eye highlights

---

### Stationery Piece Criteria

**A. Typography Hierarchy**
- `--font-display` (Playfair Display): couple names, section headings, major titles
- `--font-body` (Cormorant Garamond): invitation text, event details, descriptions
- `--font-utility` (Josefin Sans): labels, addresses, small caps text, captions
- `--font-script` (Pinyon Script): sparingly for decorative accents only
- Font sizes reference the design system scale (`--text-xs` through `--text-hero`) or use pt values
- Clear visual hierarchy: most important content is largest and most prominent

**B. Spacing and Safe Zone**
- Card padding is 0.375in (accounts for 0.125in bleed + 0.25in safe zone)
- No text or critical content positioned within 0.25in of the trim edge (0.375in from bleed edge)
- Spacing between elements uses design system tokens or reasonable pt/in values
- Consistent vertical rhythm throughout the piece

**C. Color Usage**
- All colors reference CSS custom properties (--coral, --navy, --cream, etc.)
- No raw hex values in HTML element attributes
- No raw hex values in `<style>` blocks (except in the SVG :root fallback pattern)
- Color roles are correct: navy for text, coral for accents, cream for backgrounds
- Gradient usage follows the `--sunset-gradient` or `--sunset-gradient-soft` tokens

**D. Print Dimensions**
- Card has the correct `.page-*` class from print.css
- Card width and height match the bleed dimensions in print.css
- Inline `<style>` includes `@page { size: [width] [height]; margin: 0; }`
- @page size matches the bleed dimensions

**E. Content Fitting**
- All text fits within the safe zone with breathing room
- No text smaller than 8pt (--text-xs)
- Illustrations are sized proportionally (not dominating or lost on the card)
- No overflow or clipping risk from long text or large elements

**F. Visual Balance**
- Layout is visually centered and balanced
- Decorative elements (corners, flourishes) are symmetric where expected
- Clear visual flow from top to bottom
- Appropriate use of whitespace (not cramped, not too sparse)

**G. Code Quality**
- Links `../css/design-system.css` and `../css/print.css`
- No JavaScript
- Well-organized inline `<style>` block
- SVGs inlined with proper attributes (`fill="none"`, `stroke="currentColor"`, linecap, linejoin)
- Semantic HTML where practical

---

### Cross-Suite Consistency (for multi-file or "all" reviews)

**Color Palette**: Same accent colors (coral, pink, golden) used in the same roles across all pieces.

**Font Pairing**: Same font families, weights, and letter-spacing conventions across all pieces. Display text always uses --font-display. Labels always use --font-utility.

**Illustration Style**: Consistent stroke-width, level of detail, and hand-drawn feel across all SVGs. No mix of organic and geometric styles.

**Spacing Rhythm**: Similar padding, margins, and gaps across pieces of similar size.

**Design Language**: Corner flourishes, dividers, and decorative elements follow the same visual language.

---

## Step 4: Output the review

```
DESIGN REVIEW: [target]
================================================

SUMMARY
-------
[1-2 sentence overall assessment. State the strongest aspect and the most pressing issue.]

DETAILED REVIEW
---------------

[filename]

  [Category A] ............. [GOOD / NEEDS WORK / CRITICAL]
    [Specific feedback. Reference exact elements, attributes, or line numbers.]

  [Category B] ............. [GOOD / NEEDS WORK / CRITICAL]
    [Specific feedback.]

  ...

[Repeat for each file]

CROSS-SUITE CONSISTENCY (if applicable)
---------------------------------------
  Color palette ............ [GOOD / NEEDS WORK / CRITICAL]
  Font pairing ............. [GOOD / NEEDS WORK / CRITICAL]
  Illustration style ....... [GOOD / NEEDS WORK / CRITICAL]
  Spacing rhythm ........... [GOOD / NEEDS WORK / CRITICAL]
  Design language .......... [GOOD / NEEDS WORK / CRITICAL]

PRIORITIZED FIXES
------------------
[Numbered list, CRITICAL items first, then NEEDS WORK. Each item is specific and actionable.]

1. [CRITICAL] description -- file, element, what to change
2. [CRITICAL] description -- file, element, what to change
3. [NEEDS WORK] description -- file, element, what to change
...

AUTO-FIX CANDIDATES
--------------------
[List mechanical issues that can be fixed without subjective judgment:]
- [file]: replace stroke="#1B2438" with stroke="currentColor"
- [file]: add missing stroke-linecap="round" to root SVG
- [file]: replace raw hex #E8704A with var(--coral)
- [file]: update viewBox from "0 0 100 100" to "0 0 120 130"
```

## Step 5: Offer to fix

After the report, ask:
"Would you like me to auto-fix the mechanical issues listed above?"

Auto-fix rules:
- Fix objective issues only (wrong attributes, missing properties, hardcoded colors, incorrect dimensions)
- Do NOT auto-fix subjective issues (proportions, layout balance, artistic choices, spacing preferences)
- For subjective issues, describe the proposed change and wait for approval before proceeding
- When fixing SVGs, preserve the overall drawing -- only change attributes and properties, not path data

## Constraints

- Always read design system files before reviewing
- Always read target files before reviewing (never guess)
- Be specific -- reference elements, attributes, values, line numbers
- Distinguish objective issues (verifiable against the design system) from subjective observations
- No emojis in output
- Rate every criterion for every file -- do not skip any
- CRITICAL = will cause a visible problem in print or fundamentally breaks a design rule
- NEEDS WORK = suboptimal but not broken, would improve quality if addressed
- GOOD = meets or exceeds the standard, no changes needed
