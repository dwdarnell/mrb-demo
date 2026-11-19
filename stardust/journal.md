# Journal — myredbike.ca replica run

## Extract prep — 4 planned pages captured live (2026-11-18)
- crawl.mjs --pages over the 4 site-plan URLs: 4/4 OK (technique chrome, no bot wall, no consent overlay). Slugs: index, bikes-html, gear-html, gifts-html.
- style-census at 1440 + 360; source CSS (main.css, font-awesome), Source Sans Pro 200/400 woff2, FontAwesome woff2 and 7 media files harvested.
- One TEMPLATED theme across all pages. Types: index → landing (archetype), bikes/gear/gifts → listing (archetype bikes-html).
- cap-probe: shell #wrapper caps at 1451px (64em @ 17pt), probeWidth 2560.
- Header contract recorded at #myTopnav (4 links, no menus).
- Martech present: Adobe Launch, at.js (Target global mbox appends a cookie banner), AppMeasurement; home has an alloy "Send a Random Event" link.

## Extract — Phase 1 of replica done (2026-11-18)
Provenance 4/4 live. Flow: replica — the design is kept.

## detect — dynamics on archetypes: 4 martech findings (2026-11-18)
dynamics-detect on / and /bikes.html: Adobe Target, Launch, Analytics/ECID, everesttech pixel. No forms, search, APIs.

## triage — martech carried over, all parts off (2026-11-18)
spec-martech.mjs → stardust/martech (Launch 2 rules, 2 data elements, no CMP). dynamics-plan --martech → martech-contract.json + martech-handoff.md. Curated into stardust/dynamic-features.md (5 rows, all interim/owner batch).

## Preserve direction — verbatim promotion, empty register (2026-11-18)
current/PRODUCT.md, DESIGN.md, DESIGN.json promoted verbatim to the root; direction.md in preserve mode; inconsistency register empty (pure replica). Dynamics triage done (martech only). Publish decision recorded in eds-conversion-log.md.

## Recreate — index (home) archetype gated (2026-11-18)
Clean prototype stardust/prototypes/index-proposed.html + canon.css (values lifted from main.css). iter1 --full: 0.01% / 0.04% pixel, Δh 0; one 🔴 (U+F019 glyph in the intro "Send a Random Event" link) and footer box +62px (p margin contained by padding) fixed. chrome-parity default header root lands on a card <header> (live has none) → measured on true roots (#myTopnav/#footer): parity; default-root deltas accepted in stardust/replica/accepted.json. iter2 --full: PASS at 1440 and 360; cap-probe PASS at 2560. Motion: 5 parity, hamburger dead on live.

## source-fidelity-gate — index passed at 1440 and 360 (2026-11-18)
See Recreate — index above; numbers in stardust/replica/progress.json types.index.

## Recreate — bikes-html (category) archetype gated; recreate phase done (2026-11-18)
bikes-html-proposed.html imports canon.css + listing.css (empty — the template is shared). iter1 --full PASS at 1440 and 360 (0.00%, Δh 0, 0 red, clip 0); chrome parity on true roots; cap-probe PASS at 2560; motion 5 parity. Gate needed --marker (slug "bikes-html" not in page text). Prototype tables: gates/prototypes-1440 and -360, 2/2 PASS each.

## A-inventory — 4 pages inventoried, 2 templates, archetypes-only mode (2026-11-18)

- `migrate.mjs render index bikes-html` placed the two gated archetypes in `stardust/migrated/`
  (modules recorded: intro, items, cta) so the rollout inventory has a tree to read.
- `inventory.mjs --site-url http://myredbike.ca/ --state stardust/state.json`: 4 pages,
  templates `index` (1) and `bikes-html` (3: bikes-html + gear-html, gifts-html content-pending).
  Siblings gear/gifts were grouped under `bikes-html` via a `representative` field on their
  state rows (no pages added).
- Delivered paths: `/` (index), `/bikes`, `/gear`, `/gifts`; the source `.html` URLs redirect via
  the redirects sheet in phase D.
- `rollout.json` site: da org `aemcoder`, site `f794402e`, ref `main`, liveHost
  `main--f794402e--aemcoder.aem.live`.

## B-block — 3 distinct blocks (intro, items, cta), representative-first plan (2026-11-18)

- `blocks.mjs`: 3 module blocks, 12 instances → 3 conversions; chrome (header/footer) is
  foundation, not a module.
- `plan.mjs`: bikes-html converts intro/items/cta; index, gear-html, gifts-html reuse them
  (index's intro carries the "Send a Random Event" link as a content variant).

## B2-dynamic — fresh detect confirms martech-only surface (2026-11-18)

- `dynamics-detect.mjs` (/, /bikes.html): 4 findings, all martech (Target, Launch, Analytics/ECID,
  pixel); no APIs, forms, search or client-rendered content.
- `dynamics-plan.mjs --target-origin https://main--f794402e--aemcoder.aem.page`: host-bound 0/0.
- `stardust/dynamic-features.md` verified unchanged (verification note appended); martech ships
  scaffolded with every part disabled.

## C-deliver archetype-landing — index delivered and published, gate green at both widths (2026-11-18)

- Blocks intro (template-slotted), items (reconstructive cards; linked editorial image header), cta
  (template-slotted). DA document `content/index.html` authored verbatim from the capture; 5 editorial
  images uploaded to `media/myredbike/`; intro heading authored as h1 (styled as the source h2) because
  the source home has none.
- Deployed `/` with deploy-batch (publish): .plain.html 1 h1, 0 about:error, 5 img + alt; ai-readability
  code 100%.
- Published-origin gate (gate.sh --full, frozen live reference): 1440 0.11% Δh 0, content 0 🔴 / 0 🟡,
  clip 0, overflow ok (3 rounds: two fixed a content-diff MISSING ICON / ICON DIFF on the event-link glyph);
  360 0.50% Δh 0, same probes clean (1 round). Chrome parity on true roots: 0 deltas at both widths;
  crop-compare header 0.00% / 0.12%, footer 0.00% / 0.25%. gate-all --only index: PASS at 1440 and 360.
- No foundation request filed; foundation-freeze check unchanged.

## C-deliver archetype-listing — bikes-html delivered and published as /bikes, gate green at both widths (2026-11-18)

- Content-only unit: `content/bikes.html` authored verbatim from the capture on the home blocks (intro, items,
  cta) with no block change. Intro holds no event link (the block's event slot stays out), hero pic02.jpg
  (reused from `media/myredbike/`, no upload needed), heading authored as h1 (home convention), big button
  "Learn More" → `/product-page.html` kept verbatim (out of scope; Phase E2 link audit repoints it).
- Lints: delivery-lint 0 P0 / 1 P1 (`html-extension` on that verbatim href — accepted until E2),
  media-reconcile 4 hosted, davids-model-lint 0 🔴 (same 2 🟡 D1 as home), localize-links --check pass,
  sanitise no-op, block-roundtrip --ew 18/18 editable (0 dead / 0 duplicated), `npm run lint` clean.
- Deployed `/bikes` with deploy-batch (publish): .plain.html on page and live 1 h1, 0 about:error, 5 img + alt;
  ai-readability code 100%.
- Published-origin gate (pub1, 1 round each): 1440 0.05% Δh 0, 360 0.62% Δh 0; content 0 🔴 / 0 🟡,
  clip 0, overflow ok. Chrome parity on true roots 0 deltas at both widths; crop-compare header
  0.00% / 0.12%, footer 0.00% / 0.00%. gate-all --only bikes-html: PASS at 1440 and 360.
- No foundation request; foundation-freeze check unchanged (16 files).

## C-deliver cluster-listing — gear + gifts live, both gates pass first round (2026-11-18)

- Migrate render unit `listing` (stardust/migrate/progress.json): variance probe exit 2 with content-only
  deltas (hero image aspect, empty actions list) → no variant; `rendered 2, unchanged 0, refused 0,
  passthrough 0`; content-diff vs capture 🔴 0 / 🟡 0 on both.
- content/gear.html + content/gifts.html forked from content/bikes.html; no block or foundation change.
  Neither capture has a hero button (gifts "Learn More" in the brief is absent from the capture) → none authored.
- Chain clean (delivery-lint 0/0/0, media 4 hosted, davids 0 🔴, localize --check pass, block-roundtrip --ew
  12/12); deploy-batch published both; /gear placeholder overwritten, no noindex served.
- gate-all --only: 1440 0.04% / 0.04%, 360 0.70% / 0.70%, Δh 0, clip 0, MISSING/HIDDEN 0; 0 fix rounds.
  chrome-parity /gifts 0 deltas at both widths. foundation-freeze check exit 0.
- Open: pixel-gate-<w> sidecar gates stay OPEN until the C-final roster gate-all writes the summary rows.

## C-deliver gate-all — 4/4 pages PASS all four criteria at 1440 and 360 (2026-11-18)

- `gate-all.mjs --skip-existing --eds-host main--f794402e--aemcoder.aem.page` at 1440 and 360 (run-bg, one browser of each kind): 4 PASS / 0 FAIL / 0 error per width; pixel-only and full verdicts agree.
- 1440: index 0.11 %, bikes-html 0.05 %, gear-html 0.04 %, gifts-html 0.04 %; 360: index 0.50 %, bikes-html 0.62 %, gear-html 0.70 %, gifts-html 0.70 %. Δh 0, clipped 0, MISSING/HIDDEN 0 on every row.
- Before the run, bikes-html's ledger row read `pending` (an inventory re-run after archetype-listing reset it), so gate-all would have left it out; it was recorded `deployed` through `update-coverage.mjs bikes-html --status deployed --url …/bikes` (the page serves 200 on .page and .live).
- `update-coverage.mjs --gate` for both tables: 4/4 matched, 0 flips. `gate-evidence.mjs --widths 1440,360`: 4 sidecars updated with pixel-gate-1440/360.
- Open: gate-evidence's delivery-lint lints `stardust/migrated/<page>.html` (1 P0 "no h1", 1 P2 metadata) while the delivered `content/<page>.html` lints 0·0·0. Stale delivery-lint flagged on gear-html/gifts-html. This is for C-final/done-check to settle.

## C-deliver — 6/6 units done, 4/4 pages live and migrated, gate-all PASS 1440/360 (2026-11-18)

- Unit `final` (kind final): `foundation-freeze.mjs check` unchanged (16 files); `stardust/rollout/foundation-requests.md` absent/empty, nothing applied; `npm run lint` clean.
- `units.gate-all.kind` left as `final`: the contract card (§ 3 row C) names gate-all as kind `final`, so it was not a mistake.
- Delivery-lint split settled: gate-evidence lints `stardust/migrated/` in-process (`--content` only governs media-reconcile), so the migrated files are the source of record. Re-rendered all 4 with `migrate.mjs render --force --source <slug>=stardust/prototypes/<slug>-h1source.html` (the prototype with the intro heading as h1, as delivered); logged a `heading-level` contentDeviation per page. Lint now 0 P0 · 0 P1 (1 P2 metadata, non-blocking) on 4/4; the re-render also resolved the archetypes' stale broken links to /gear and /gifts.
- Archetypes: media-reconcile run on content/index.html (5 hosted) and content/bikes.html (4 hosted) through run-bg; content-fidelity declared. `gate-evidence.mjs` wrote 4 sidecars; `--check` exit 0, no stale gates.
- `state.mjs advance … --to migrated --skill migrate` for index, bikes-html, gear-html, gifts-html → 4 migrated.

## D-site — redirects sheet live, / 200, sitemap served 4 = assembled 4 (2026-11-18)

- Source root `http://myredbike.ca/` answers 200 (serves a page) → root delivered from DA `index`; no `/` row. `/index.html` serves 200 on the source and 404s on EDS, so it gets a row → `/` (not a `/` row; does not shadow the root).
- `stardust/redirects.tsv`: `/index.html → /`, `/bikes.html → /bikes`, `/gear.html → /gear`, `/gifts.html → /gifts`. `seed-redirects.mjs` needs a spec knowledge folder (absent) and only writes the TSV, so the TSV was authored by hand and pushed as the DA sheet `/redirects.json` (Source / Destination) with a probe (`stardust/.work/rollout/probes/put-redirects-sheet.mjs`): PUT 201, preview 200, publish 200.
- Verified on .aem.page and .aem.live: `curl -sIL /` → 200; each `.html` source → 301 to its page → 200.
- `/nav` and `/footer` already carry `Robots | noindex`; served `<meta name="robots" content="noindex">` on page + live, both published (200).
- `assemble.mjs` → `stardust/rollout/site/{sitemap.xml,robots.txt,manifest.json}` (4 urls, 0 fragments). `--verify-origin` on .aem.live and .aem.page: served 4 = assembled 4, extra 0, missing 0, exit 0 (live run last, so `manifest.json.servedSitemap` is the live one).

## D2-dynamic — parity.json written, dynamics-check 5/5 PASS on .aem.live (2026-11-18)

- `stardust/dynamics/parity.json`: 2 features from `stardust/dynamic-features.md`. `martech-stack-off` (rows 1–4: Launch, Target, Analytics/ECID, everesttech pixel; `scaffolded-awaiting-owner`) — `martech` gate on `/` and `/bikes` over 8 host suffixes (adobedtm.com, tt.omtrdc.net, omtrdc.net, demdex.net, 2o7.net, adobedc.net, everesttech.net) + `no-page-errors` on 4/4 pages; `home-send-random-event` (row 5, `interim`) — `dom-count` of the kept link on `/`.
- `dynamics-check.mjs --origin https://main--f794402e--aemcoder.aem.live` (through run-bg, 30 s): 5/5 PASS, exit 0 — including the contract-derived `martech` gate (assets.adobedtm.com). 0 tag hosts requested; 0 page errors. Report `stardust/qa/dynamics-report.md` (+ `.json`).
- No query index: no listings, search or sheet-backed content on this site. No page built here, so no coverage row added.
- Open (owner, not blocking): the decision batch in `stardust/dynamic-features.md` — enable `adobe-launch`/Target in the martech contract, confirm the report suite, tagging plan for the home event push.

## E-full-site — 3/4 verified on .aem.live, bikes held on one out-of-scope link (2026-11-18)

- `update-coverage.mjs --gate` all-1440 and all-360: 4/4 rows matched, all PASS, 0 flips.
- `verify.mjs --base https://main--f794402e--aemcoder.aem.live --all`: index, gear, gifts verified; bikes failed on `/product-page.html` ("Learn More") — a page outside the fixed site plan. Handed to E2 (scope extension → repoint to source), then re-verify.
- No `restoreAtDelivery` entries (no video/carousel), so the render check has nothing to assert beyond reachability.

## E2-link-audit — 1 out-of-scope link repointed, every href resolves, 4/4 verified (2026-11-18)

- `/product-page.html` on bikes is outside the fixed site plan → scope extension → repointed to `http://myredbike.ca/product-page.html`; decision recorded in `stardust/direction.md`.
- `localize-links.mjs --check`: PASS, 0 localizable left. Bikes re-driven via `deploy-batch.mjs` (ledger `stardust/deploy/ledger-e2-link-audit.json`, token from the IMS token file): live.
- Every href across /, /bikes, /gear, /gifts, /nav, /footer on .aem.live: internal 4/4 200; source repoint 200; templated.co 200; unsplash.com 401 to curl (external credit, browser-reachable, kept as on source).
- `verify.mjs --all` re-run: 4 verified, 0 failed.

## F-optimize — gate PASS, 0 P1 / 0 P2 / 1 P3 open on .aem.live (2026-11-18)

- `optimize.mjs --base https://main--f794402e--aemcoder.aem.live --all`: exit 0, no open P1.
- Open: P3 cross-page/duplicate-description (bikes, gear, gifts) — the description is carried verbatim from the capture; replica does not rewrite content, left for the owner.
- Source parity (informational, 5): shared `<title>` "MyRedBike DEMO2" on 4 pages, no JSON-LD on 4 pages — both as on the source.

## G-aem — 0 autofix candidates, no edits, no re-deploy (2026-11-18)

- `autofix-aem.mjs --project . --dry-run`: candidates 0 (the one open P3 is content, not platform-fixable). Nothing applied; verify/optimize results from E/F stand.

## H-report — 4/4 verified, health 98, nothing left to deliver (2026-11-18)

- `stardust/rollout/report.md`: pages 4/4 verified, blocks 3/3, pixel tables prototypes 2/2 + deployed 4/4 PASS at 1440 and 360, open P1 0 / P2 0 / P3 1, dynamic parity table from D2.
- `stardust/learnings.md`: 2 pending entries (deploy token source; root-relative out-of-plan link caught only at verify).

## I-dashboard — dashboard written, rollout complete (2026-11-18)

- `dashboard.mjs`: `stardust/rollout/dashboard/{index.html,data.json}` — 4 identified, 4 prototyped, 4 deployed (optimised 0 = no finding needed a fix).

## Handoff — complete: 4/4 pages live on .aem.live, every gate PASS, done-check complete (2026-11-18)

- Rollout A–I ended (D3 skipped: single locale). done-check `{"complete":true,"gaps":[]}`.
- Published: 4 pages, redirects sheet, nav, footer. Martech carried over with every contract part disabled (`stardust/martech-contract.json`, `stardust/martech-handoff.md`, `scripts/martech.js`); enabling stays with the owner.
