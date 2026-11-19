# Chrome measured on true roots

The live site has no header element; the top nav is `div#myTopnav`, the footer `#footer` inside `#wrapper`.
`chrome-parity.mjs <live> <proto> --width <w> --no-defaults --region nav=#myTopnav --region foot=#footer` is the chrome check of record.

- index @1440: parity · @360: parity (2026-11-18, after iter1 footer fix)
- bikes-html @1440: parity · @360: parity
