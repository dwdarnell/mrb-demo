# EDS conversion log — myredbike.ca

## Publish decision (2026-11-18)
Decision: **publish** (made by the run's owner before the run). Every delivered page, the redirects sheet and the
chrome documents (nav, footer and locale variants) go live on the aem.live origin (deploy-batch.mjs without
--no-publish, or POST admin.hlx.page/live/…).

## Martech decision (2026-11-18)
Owner asked to keep analytics, tags and consent: carried over via stardust/martech-contract.json with every part disabled; enabling stays with the owner.

## C0 foundation — decode tiers and lint (2026-11-18)

- header: template-slotted chrome. `/nav` = one list of links; `decorate()` moves the authored
  list into `nav#myTopnav.topnav` (EW1), sets `aria-current="page"` on the link matching the
  current path (`.html`, trailing slash and `/index` normalised), appends a presentational ☰ link
  (`@ew-exempt`, inert — the source handler is undefined on live). No dropdown, no behaviour.
- footer: template-slotted chrome. `/footer` = social link list + copyright paragraph; the list is
  wrapped in `.footer-social`, each link in a generated `span.footer-icon.fa-<name>` (EW2: classes on
  wrappers; the link text stays as the accessible name and is visually replaced by the FA glyph).
- Buttons: source `.button` = every `a.button`; source `.button.big` = `a.button.accent`
  (bold + italic link) or a block-set `.big`. `runtime-contract.json` records the probe.
- Fonts: Source Sans Pro 200/400 + FontAwesome 4.6.3 woff2 (both SIL OFL 1.1) self-hosted in `/fonts`.
- Martech: `martech-scaffold.mjs` → `scripts/martech.js`, no CMP, 0 routes enabled.
- Lint: `npm run lint:fix` + `npm run lint` clean. `.eslintignore` gained `stardust/` (tooling, not
  runtime; it is also in `.hlxignore`); the scaffolded `scripts/consent-check.js` comment was
  re-wrapped to ≤ 100 chars.

## C-deliver archetype-landing — index (2026-11-18)

- intro: template-slotted (event / media / heading / body / actions slots, nodes moved by role). The
  plain "Send a Random Event" link (href #) gets a generated, empty, aria-hidden `i.intro-event-icon`
  whose `::before` is U+F019 in the body face (no FA font), then a space — the source's `<i class="fas
  fa-download">`; the alloy onclick (martech, off) is not wired. `block.id = "intro"` for symmetric gates.
- items: reconstructive (cards segmented by content: a heading or image once the card has one starts a
  new card; leftovers go to the card body). Card header = authored linked image (`<a href><img>`, the
  pipeline keeps it as `<a><picture>`), cover-fitted in place of the source background-image; the
  `overlay.png` texture is decorative CSS (`blocks/items/overlay.png`).
- cta: template-slotted (heading / body / actions); authored `<br>` kept, hidden ≤ 480 like the source.
  `block.id = "cta"`.
- Buttons: "More" = bold link (`.button`), "See our bikes" / "Get Started" = bold-italic (`.button.accent`
  = source `.button.big`).
- Heading level: the source home has no `<h1>` (delivery-lint P0 / qa-gate require one); the intro
  heading is authored as `<h1>` and styled exactly as the source h2 (`.intro .intro-heading :is(h1, h2)`).
  Same text, same look; content-diff role is heading on both sides.
- Local harness: qa-gate 16 ok / 2 fail, both harness/tool artefacts — header h=0 (the static harness
  serves no /nav), and the units check maps every prototype section named "main" to the first block
  (intro) instead of items (items renders 4 `article.item`). block-roundtrip --ew: 19/19 editable,
  0 dead / 0 duplicated; 🟡 IMG COUNT on items is the intentional background-image → editorial img.
- Lints: delivery-lint clean, davids-model-lint 0 🔴 (2 🟡 D1: intro/cta are fixed bespoke panels, not
  default content — they carry the source panel/band chrome), media-reconcile 5 hosted, localize-links
  --check clean, sanitise no-op, `npm run lint` clean.

## C-deliver archetype-listing — bikes (2026-11-18)

- No block change: /bikes reuses intro (template-slotted; no event paragraph → no event slot), items, cta.
  Heading level as home (intro h1, styled as the source h2).
- delivery-lint P1 `html-extension` on "Learn More" → `/product-page.html`: kept verbatim by instruction
  (page outside this run's scope); the Phase E2 link audit repoints it to the source site.
- block-roundtrip needs `--map intro=#intro --map cta=#cta` against the prototype (its sections carry ids,
  not block classes); 🟡 IMG COUNT on items is the same intentional background-image → editorial img.

## C-deliver cluster-listing — gear, gifts (2026-11-18)

- Siblings of bikes-html; no block change, no variant class: intro/items/cta reused (template-slotted).
- sibling-variance @1440 exit 2, content-only deltas (#intro image aspect, empty `ul.actions`);
  JSON at stardust/migrate/variance-listing.json.
- Hero has NO button on either page: both captures (`stardust/current/pages/{gear,gifts}-html.html`)
  carry an empty `ul.actions`; the gifts "Learn More" in the brief is not in the capture, so it is
  not authored (capture is the content reference). No `.html` hrefs left on these two documents.
- h1 "Gear" / "gifts" (verbatim case; CSS uppercases), styled as source h2 per archetype convention.
- /gear placeholder (noindex) overwritten by the real document; served /gear has no robots meta.
