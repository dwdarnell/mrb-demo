<!-- stardust provenance: skill=stardust:replica (dynamics Phase 3 curation) · 2026-11-18 · from stardust/dynamics/dynamic-features.generated-plan.md + stardust/martech-contract.json -->
# Dynamic features — myredbike.ca

Source: `dynamics-detect` on `/` and `/bikes.html` (reach 4/4 crawled pages). No forms, search, listings, modals,
players or first-party APIs. The whole dynamic surface is the Adobe martech stack, carried over by the martech
contract with every part **disabled** (owner switch).

## Listings contract
None — the card grid is fixed authored content on every page.

## Features

| # | id | class | feature | pages | disposition | target | reproducibility | status | decision |
|---|---|---|---|---|---|---|---|---|---|
| 1 | a-experimentation-adobe-target | A | Adobe Target (at.js global mbox; appends a cookie banner via an offer) | 4/4 | embed-passthrough (martech contract `target`, off) | runtime | needs-business-decision | interim: scaffolded off | which experiments move to the new host |
| 2 | t-tag-manager-adobe-launch | T | Adobe Launch property ENfc4a98… | 4/4 | embed-passthrough (martech route `adobe-launch`, off) | runtime | needs-business-decision | interim: scaffolded off | enable the route; property id |
| 3 | t-analytics-adobe-analytics-experience-cloud-id | T | Adobe Analytics / ECID (loaded by Launch) | 4/4 | embed-passthrough (via Launch) | runtime | needs-business-decision | interim: scaffolded off | report suite on the new host |
| 4 | t-marketing-ad-retargeting-pixel | T | everesttech pixel (loaded by Launch) | 4/4 | embed-passthrough (via Launch) | runtime | needs-business-decision | interim: scaffolded off | keep or drop in Launch |
| 5 | home-send-random-event | T | "Send a Random Event" link calls `alloy("sendEvent")` | 1/4 (home) | static link kept verbatim; event push is a data-layer item in the hand-off | content | needs-business-decision | interim: link ships, no event | tagging plan |

## Decision batch (one, owner)
1. Turn on `routes[adobe-launch].enabled` (and `target.enabled` if Target activities move) in `stardust/martech-contract.json`, re-run `martech-scaffold.mjs`.
2. Confirm the Analytics report suite / collector on the new host.
3. Provide the tagging plan for the home "Send a Random Event" push.

## Register
Hands-off: every row ships its interim tier (scaffolded off); none is decided-out.

## Verification (rollout B2, 2026-11-18)
Fresh `dynamics-detect.mjs` on `/` and `/bikes.html` + `dynamics-plan.mjs --target-origin
https://main--f794402e--aemcoder.aem.page --migrated stardust/migrated`: the same 4 martech rows
(Target, Launch, Analytics/ECID, retargeting pixel); 0 first-party APIs, 0 forms, 0 client-rendered,
host-bound 0/0. Rows 1–5 above stand unchanged.
