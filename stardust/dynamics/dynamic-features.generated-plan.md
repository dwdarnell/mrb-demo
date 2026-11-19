<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-11-18T16:34:32.977Z · input stardust/current/_dynamics.json (2 pages, 4 findings) · target probe https://main--f794402e--aemcoder.aem.page · reconciled against stardust/migrated -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · target = the delivery form (widget where no authored rows remain) · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | target | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-experimentation-adobe-target | A | experimentation: Adobe Target | 2/2 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which experiments move to the new host |  |
| 2 | t-tag-manager-adobe-launch | T | tag manager: Adobe Launch | 2/2 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 3 | t-analytics-adobe-analytics-experience-cloud-id | T | analytics: Adobe Analytics / Experience Cloud ID | 2/2 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 4 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 2/2 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 0 row(s) — none.
- **One owner decision batch:** 4 row(s) — which experiments move to the new host · which tags run on the new host; property ids.
- **Already delivered by the capture pipeline:** 0 row(s) — no work.
- **Host-bound on the target:** 0 of 0 probed API paths — the off-origin data work.

## Phases

- **tags** — 4
