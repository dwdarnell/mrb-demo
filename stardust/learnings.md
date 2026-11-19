# Learnings — myredbike.ca replica run (2026-11-18)

### Deploy token present only as a file variable, not DA_TOKEN
- failure class: env-mismatch (batch driver's default token source absent in a resumed session)
- evidence: E2 re-deploy of /bikes, `deploy-batch.mjs` → `fatal: missing token in env DA_TOKEN` (exit 2); the harness exposes `ADOBE_IMS_TOKEN_FILE`; re-run with `--token-file "$ADOBE_IMS_TOKEN_FILE"` went live in 8 s
- proposed change: `skills/replica/reference/handoff-contract.md` § 4 deploy-batch usage line — fall back to `$ADOBE_IMS_TOKEN_FILE` when `DA_TOKEN` is unset (or name it in the usage line)
- status: pending

### Root-relative link to an out-of-plan page surfaces only at verify
- failure class: scope-boundary (root-relative href to an uncaptured page kept by the converter; localize-links only repoints absolute source-host hrefs)
- evidence: bikes "Learn More" `href="/product-page.html"` shipped live and failed `verify.mjs` in E; repointed by hand to `http://myredbike.ca/product-page.html` in E2
- proposed change: `skills/deploy/scripts/localize-links.mjs` — rewrite root-relative hrefs not in the map to the absolute source URL when `--source-host` is given (report them as the boundary); run before C-deliver PUT
- status: pending
