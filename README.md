# Kash & Max Wedding Stationery

Wedding stationery suite for Kash & Max -- July 3, 2027 at The Drake Hotel, Toronto.

## Overview

Hand-drawn illustrated line art stationery with a warm sunset color palette (coral, pink, golden on cream). Playful, fun tone matching a cocktail reception on The Drake's rooftop Sky Yard. Moose the bulldog is a recurring character throughout.

## Pieces

| Piece              | File                          | Size (trim)     |
|--------------------|-------------------------------|-----------------|
| Save the Date      | `pieces/save-the-date.html`   | 5" x 7"         |
| Save the Date (digital) | `pieces/save-the-date-digital.html` | screen  |
| Invitation         | `pieces/invitation.html`      | 5" x 7"         |
| Details Card       | `pieces/details-card.html`    | 4.375" x 5.75"  |
| RSVP Card          | `pieces/rsvp-card.html`       | 3.5" x 5"       |
| Envelope Liner     | `pieces/envelope-liner.html`  | A7               |
| Table Name Tag     | `pieces/table-name-tag.html`  | 3.5" x 2" (tent)|
| Food Menu          | `pieces/food-menu.html`       | 4" x 9.25"      |

## Stack

- HTML/CSS (one file per stationery piece)
- Fontshare fonts: Clash Display, Sentient, Satoshi
- SVG illustrations (code-drawn + ElevenLabs-generated)
- CSS custom properties for design tokens
- PDF export via Chrome print

## Quick Start

1. Open any `pieces/*.html` in Chrome
2. Preview the design at actual print size
3. To export: Cmd+P > Save as PDF > Paper: Custom (bleed dims) > Margins: None > Background graphics: ON

## Color Palette

- Cream `#FFF8F0` -- base background
- Coral `#E8704A` -- primary accent
- Pink `#E89BAE` -- secondary accent
- Golden `#F2C66D` -- tertiary accent
- Navy `#1B2438` -- text and line art

## Fonts

- **Clash Display** (600, 700) -- couple names, headlines
- **Sentient** (400, 400i, 600) -- body text, descriptions
- **Satoshi** (400, 500, 700) -- labels, utility text
