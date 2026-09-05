# Next Court — Cedar Park tournament guide

A responsive, static guide to the six main fall 2026 pickleball tournaments in the supplied research, four additional local leads, and Pickleland’s recurring events.

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
- Preserve distinctions between confirmed DUPR reporting, rating eligibility, and unanswered organizer questions.
- Fees and bracket availability are a September 5, 2026 snapshot. The guide does not automatically discover new events or refresh source data. Passed deadlines and main event dates are labeled using the current date in America/Chicago.
- The Texas Ranchers event appeared in indexed directory results but was absent from the live directory during this build. Its current status and direct link need organizer confirmation.
- Brushy Creek’s year was confirmed on its official 2026 calendar; the supplied division/deadline details still need confirmation for that edition.
- Sort by listed fee uses the regular $75 directory price for APA, the $60 early price for Nuron, and the relevant first-division fee for other events. Checkout prices may differ.

## Files

- `index.html`: page structure and guide context
- `styles.css`: responsive layout, keyboard focus styles, reduced-motion and print rules
- `events.js`: event details and source links
- `app.js`: search, filters, sorting, and card rendering

Google Fonts is optional; system sans-serif fonts render if unavailable. No analytics, accounts, API keys, or backend services are used.
