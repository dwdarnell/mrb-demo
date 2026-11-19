<!-- stardust:provenance writtenBy=stardust:extract writtenAt=2026-11-18 stardustVersion=0.41.0 sources=stardust/current/pages/*.json,_computed-styles.json -->
---
colors:
  background: "#f4f4f4"
  surface: "#ffffff"
  text: "#666666"
  heading: "#444444"
  nav: "#838383"
  nav-text: "#f2f2f2"
  nav-active: "#b8323c"
  link-hover: "#ef6480"
typography:
  body: { family: "Source Sans Pro", weight: 200, size: "17pt / 13pt ≤1680 / 12pt ≤1280 / 11pt ≤360", lineHeight: 1.65 }
  headings: { weight: 400, transform: uppercase, letterSpacing: "0.375rem", h2: "1.75em", h3: "1.25em" }
rounded: { card: 4px }
spacing: { wrapper: "64em, max calc(100% - 4em)", section-gap: 4em }
---

# Design — MyRedBike (current state)

Light grey page (#f4f4f4) with white rounded (4px) panels. A flat grey top nav bar (#838383) with the active link in red (#b8323c).
Source Sans Pro ExtraLight (200) body text in #666, uppercase letter-spaced headings (400, 0.375rem) in #444.

## Components
- **Top nav** — floated links, 17px, 14px/16px padding; hover #ddd/black; ≤600px collapses to Home + ☰.
- **Intro** — white panel, full-width photo, h2, lede, big outline button.
- **Items** — 2-column card grid (1 column ≤980px). Card header 15em photo with 25% black overlay + overlay.png texture, white h3; hover scales the photo 1.1.
- **CTA** — centered h2, paragraph, big outline button.
- **Footer** — 6em × 2px rule, FontAwesome social icons, 0.8em copyright.

Source breakpoints: 1680, 1280, 980, 736, 600, 480, 360 (max-width).
