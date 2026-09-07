# Next Court — Cedar Park tournament guide

A responsive, static guide to the nine fall 2026 pickleball tournaments, two additional local doubles leads, five MLP/team options, and Pickleland’s recurring events.

**Live:** https://chriswiles.github.io/cedar-park-pickleball-tournaments/

## Run locally

No build or package installation is required:

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. GitHub Pages serves the repository root on `main`; `.nojekyll` disables Jekyll processing.

## Updating the guide

- Edit the structured records in `events.js` and the edition date in `index.html`.
- Keep organizer URLs direct where available. Links to general directories or club sites are explicitly labeled.
- Preserve distinctions between confirmed DUPR reporting (`dupr: true`), explicitly non-recorded events (`dupr: false`), and unknown reporting (`dupr: null`). Rating eligibility alone does not establish reporting.
- Fees and bracket availability are a September 7, 2026 snapshot. The guide does not automatically discover new events or refresh source data. Passed deadlines and main event dates are labeled using the current date in America/Chicago.
- The Texas Ranchers event appeared in indexed directory results but was absent from the live directory during this build. Its current status and direct link need organizer confirmation.
- Brushy Creek’s 2026 calendar links to the tournament page confirming September 12, a September 10 deadline, and men’s, women’s, and mixed divisions. Numerical ratings and reporting still need confirmation.
- Sort by listed fee uses the regular $75 directory price for APA, the $60 early price for Nuron, and the relevant first-division fee for other events. Checkout prices may differ.

## Files

- `index.html`: page structure and guide context
- `styles.css`: responsive layout, keyboard focus styles, reduced-motion and print rules
- `events.js`: event details and source links
- `app.js`: search, filters, sorting, and card rendering

Google Fonts is optional; system sans-serif fonts render if unavailable. No analytics, accounts, API keys, or backend services are used.

## MLP and team events

The dedicated `#mlp` section includes JOMG at Apex, the unresolved Texas Ranchers lead, two official New Braunfels MiLP events explicitly labeled as outside the original drive range, and recurring Pickleland Saturday play. Local/travel/recurring filters are independent of the doubles filters. JOMG dates, roster size, fees, and its 60-day membership rule were checked in the rendered official website and FAQ on September 7, 2026. Official MiLP listings contain date/template conflicts, retained in each card. Neither generic MLP branding nor a DUPR division label is treated as proof of result reporting. An October Cranky Pickle search lead was omitted because its primary listing could not be verified.

## Doubles divisions

Each main card now separates men’s, women’s, and mixed schedules and eligibility. Filters include advertised division categories, not a guarantee of a specific 3.5 bracket. Liveball’s Sunday mixed tab, Apex’s Saturday/Sunday tabs, Tejas, and Nuron brackets were verified on September 7, 2026. APA’s final women’s grouping and Sun City’s women’s skill brackets remain explicitly subject to confirmation. Tejas mixed includes a lower-rated all-age bracket and a distinct 50+ option. Pickleland Tuesday women’s play is included with the recurring offerings.

## September 7 refresh

Added Baseline Senior Rated Classic (October 3, 50+/65+), Blazing Paddles (October 10), and Trey Baring Foundation (November 7). The latter two explicitly do not record DUPR results. Baseline enforces eligibility but does not explicitly promise uploads. Its 3.5+ range extends to 6.00.

Trey Baring division/reporting details come from https://treybaringfoundation.org/pickleball/; fees and deadlines come from its linked Swish registration page. The $60 organizer price conflicts with the $67 first-division registration fee. Blazing Paddles retains a 2025 cancellation panel despite a 2026 refund policy. Apex now displays October 25 in its header while retaining October 24–25 in its description and division tabs. These conflicts remain visible.

The research horizon is January 7, 2027. No qualifying December–January event was verified. Existing local team availability remains unresolved; official travel alternatives and recurring offerings remain labeled separately. Monday automation researches, updates, validates, commits, pushes, and verifies GitHub Pages; the page itself is a static snapshot.
