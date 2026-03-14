# Print Specifications

Complete print production reference for the Kash & Max wedding stationery suite.

---

## Piece Dimensions

All measurements in inches. Bleed extends 0.125in beyond trim on all four sides. Safe zone is 0.25in inset from trim on all four sides -- no text or critical elements outside the safe zone.

| Piece | Trim Size | Bleed Size | Safe Zone | Paper Stock | Envelope |
|---|---|---|---|---|---|
| Save the Date | 5 x 7 | 5.25 x 7.25 | 4.5 x 6.5 | 110lb cover stock | A7 |
| Invitation | 5 x 7 | 5.25 x 7.25 | 4.5 x 6.5 | 130lb cover stock | A7 |
| Details Card | 4.375 x 5.75 | 4.625 x 6 | 3.875 x 5.25 | 100lb cover stock | Tucked in A7 |
| RSVP Card | 3.5 x 5 | 3.75 x 5.25 | 3 x 4.5 | 80lb cover stock | Tucked in A7 |
| Envelope Liner | Trimmed to A7 flap | N/A (trimmed to shape) | N/A | 70lb text stock | A7 (interior) |
| Table Name Tag | 3.5 x 2 (tent fold = 3.5 x 4 flat) | 3.75 x 2.25 (per face) | 3 x 1.5 (per face) | 80lb cover stock | N/A |
| Food Menu | 4 x 9.25 | 4.25 x 9.5 | 3.5 x 8.75 | 100lb cover stock | N/A |
| Program | 4.25 x 5.5 | 4.5 x 5.75 | 3.75 x 5 | 80lb cover stock | N/A |

### A7 Envelope Dimensions

- **A7 envelope size:** 5.25 x 7.25 inches
- Fits the 5x7 Save the Date and Invitation with slight clearance
- The Details Card and RSVP Card are tucked inside the A7 envelope alongside the Invitation

### Table Name Tag Folding

- Flat printed sheet: 3.5 x 4 inches
- Fold in half horizontally to create a tent: 3.5 x 2 inches standing
- The guest name is printed on the top half (front face when folded)
- The bottom half (back face) is blank cream
- Score the fold line for a clean crease

---

## Print and Export Workflow

### Chrome PDF Export (Primary Method)

This is the recommended workflow for producing print-ready PDFs from the HTML stationery files.

**Step 1: Open the HTML file**
- Open the specific piece's HTML file in Google Chrome (e.g., `pieces/save-the-date.html`)
- Verify the page renders correctly: fonts loaded, illustrations visible, colors accurate

**Step 2: Open Print dialog**
- Press `Cmd + P` (macOS) or `Ctrl + P` (Windows/Linux)

**Step 3: Configure print settings**
- **Destination:** Save as PDF
- **Pages:** All
- **Layout:** Portrait (for all pieces except envelope liner)
- **Paper size:** Custom
  - Set width and height to the **bleed dimensions** for the specific piece (see table above)
  - Example for Save the Date: 5.25in x 7.25in
- **Margins:** None
- **Scale:** 100% (do not scale to fit)
- **Options:** Check "Background graphics" (this is critical -- without it, background colors and gradients will not print)

**Step 4: Save the PDF**
- Click "Save" and name the file following the convention: `{piece-name}-{date}.pdf`
- Example: `save-the-date-2026-03-14.pdf`

**Step 5: Verify the output**
- Open the PDF and check:
  - Background colors extend to the edges (bleed area)
  - All text is within the safe zone
  - Fonts render correctly (not substituted)
  - Illustrations are crisp (SVG should be resolution-independent)
  - Colors appear as expected

### Custom Paper Size Setup (macOS)

If Chrome does not offer custom paper sizes:

1. Open **System Settings** (or System Preferences on older macOS)
2. Go to **Printers & Scanners**
3. Select any printer, then click **Options & Supplies** or open the print dialog
4. In the **Paper Size** dropdown, select **Manage Custom Sizes**
5. Click **+** to add a new size
6. Enter the bleed dimensions (e.g., 5.25 x 7.25 for the invitation)
7. Set all margins to 0
8. Name it clearly (e.g., "5x7 Bleed" or "Invitation Bleed")
9. Save and return to Chrome's print dialog -- the custom size will now appear

### Export Checklist

- [ ] Background graphics enabled
- [ ] Paper size matches bleed dimensions
- [ ] Margins set to None
- [ ] Scale at 100%
- [ ] Fonts rendering correctly (not Times New Roman fallback)
- [ ] Background colors reach all edges
- [ ] No text outside safe zone
- [ ] SVG illustrations rendering at full quality

---

## Paper Recommendations

### Stock Selection

| Property | Recommendation |
|---|---|
| Color | Cream / natural white (not bright white) |
| Finish | Uncoated or soft-touch matte |
| Texture | Smooth or very lightly textured |

### Why Cream Stock

The entire design system is built on a cream (`#FFF8F0`) background. Using bright white paper would create a visible mismatch between the digital cream background and the white paper border (if any). Cream or natural white stock ensures the background blends seamlessly with the paper.

### Why Uncoated / Matte

- Avoids glare under event lighting
- Feels more premium and tactile in hand
- Better ink absorption for rich, saturated colors
- Complements the hand-drawn illustration style (coated stock feels too commercial)
- Easier to write on (relevant for fill-in RSVP cards)

### Printing Methods

| Method | Suitability | Notes |
|---|---|---|
| Digital printing | Excellent | Best for small runs (under 200). Most accessible. Accurate color reproduction from PDF. |
| Letterpress | Good (with modifications) | Beautiful tactile quality. Requires converting designs to plates. Works best for text-heavy pieces. Illustrations may need simplification. Cost increases significantly. |
| Offset lithography | Good | Best for large runs (500+). Requires CMYK conversion and plate creation. Overkill for typical wedding quantities. |

For this suite, **digital printing** is the recommended method given the quantity range (75-120 sets) and the multi-color design with gradients.

---

## Color Notes

### Screen vs. Print

All colors in the design system are specified in RGB hex values, optimized for screen rendering and digital printing workflows. The stationery is designed and exported as PDF from screen, so RGB is the native color space.

### Critical Color Values

| Token | Hex | Notes |
|---|---|---|
| `cream` | `#FFF8F0` | Must read as warm off-white, NOT pure white. If printed on white stock, the printer must reproduce this tone. If printed on cream stock, may need to adjust or remove the background. |
| `coral` | `#E8704A` | The signature accent color. Must be vibrant and warm, not muddy or brownish when printed. Request a proof to verify. |
| `navy` | `#1B2438` | Very dark blue-black. Must read as rich navy, not flat black. Slight blue undertone is essential. |
| `sunset gradient` | `#F2956E` to `#E8704A` to `#E89BAE` | Smooth gradient is critical on envelope liners. Digital printing handles this well. Verify no banding in the proof. |

### For Professional / Offset Printing

If using a professional print shop that requires CMYK values:

1. Provide the printer with the hex values from the design system
2. Request they perform the RGB-to-CMYK conversion using their ICC profile for the specific paper stock
3. Do NOT convert to CMYK yourself -- the printer's profile will produce more accurate results on their equipment
4. Request a printed proof (not just a digital proof) before the full run
5. Pay special attention to the coral and the sunset gradient -- warm oranges and pinks can shift in CMYK

### Background Color on Cream Stock

If printing on cream/natural white stock, the cream background (`#FFF8F0`) may be unnecessary since the paper itself provides the warmth. Options:

1. **Print the cream background:** Ensures exact color match but uses more ink
2. **Remove the cream background and let the paper show through:** Saves ink, but paper tone must be verified as a close match to `#FFF8F0`
3. **Recommended:** Print a test sheet both ways and compare. The paper's natural color may be warmer or cooler than the digital cream.

---

## Quantity Estimates

Based on a guest count of 50-100 people, with typical household grouping (couples and families receive one invitation per household).

| Piece | Quantity | Rationale |
|---|---|---|
| Save the Date | 75-120 | One per household. Order extra for keepsakes, errors, and last-minute additions. |
| Invitation | 75-120 | One per household, matching Save the Date count. |
| Details Card | 75-120 | One per invitation set. |
| RSVP Card | 75-120 | One per invitation set. |
| A7 Outer Envelope | 75-120 | One per invitation set. |
| A7 RSVP Return Envelope (if using fill-in RSVP) | 75-120 | Pre-addressed and stamped, one per RSVP card. Not needed if using QR code RSVP. |
| Envelope Liner | 75-120 | One per outer envelope. |
| Table Name Tag | 50-100 | One per guest (not per household). |
| Food Menu | 15-25 | One per food station table or standing cocktail area, not per guest. |
| Program | 50-100 | One per guest. Order extra for keepsakes. |

### Ordering Tips

- Order 10-15% more than your guest count to account for printing errors, addressing mistakes, and late additions
- Table name tags should be ordered closer to the event once the final guest list and seating chart are confirmed
- Food menus depend on the final menu and station count -- hold these until catering is finalized
- If using a print shop, ask about overage pricing (the cost per additional unit drops significantly on larger runs)

---

## Assembly Order

When assembling the invitation suite for mailing:

1. Place the **envelope liner** inside the A7 outer envelope (glue or self-adhesive)
2. Stack the pieces face-up in this order (top to bottom):
   - RSVP Card (smallest, on top)
   - Details Card (medium)
   - Invitation (largest, on bottom)
3. Insert the stack into the envelope with the invitation facing the back of the envelope (so the guest sees the invitation first when pulling the contents out)
4. If using fill-in RSVP: include a small pre-addressed, stamped return envelope behind the RSVP card
5. Seal the envelope

### Addressing

- Outer envelope: guest name(s) and mailing address
- RSVP return envelope (if applicable): couple's return address
- Recommended: use Satoshi font for printed addresses to match the stationery suite typography
