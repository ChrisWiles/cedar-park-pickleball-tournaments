# Next Court — Cedar Park tournament guide

A responsive, static guide to eight upcoming fall 2026 pickleball tournaments, two dated MiLP events, and Pickleland’s recurring events.

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
- Fees and bracket availability are a September 21, 2026 snapshot. The guide does not automatically discover new events or refresh source data. Passed deadlines and main event dates are labeled using the current date in America/Chicago.
- September 12–13 leads (Saturday Showdown, Brushy Creek, Texas Ranchers) were removed from upcoming listings after their advertised dates passed. This is not a claim that they occurred or were canceled.
- Brushy Creek’s 2026 calendar links to the tournament page confirming September 12, a September 10 deadline, and men’s, women’s, and mixed divisions. Numerical ratings and reporting still need confirmation.
- Sort by listed fee uses each event’s current first-division price or the lower live-panel price where sources conflict. Checkout prices may differ.

## Files

- `index.html`: page structure and guide context
- `styles.css`: responsive layout, keyboard focus styles, reduced-motion and print rules
- `events.js`: event details and source links
- `app.js`: search, filters, sorting, and card rendering

Google Fonts is optional; system sans-serif fonts render if unavailable. No analytics, accounts, API keys, or backend services are used.

## MLP and team events

The dedicated `#mlp` section includes two official New Braunfels MiLP events explicitly labeled as outside the original drive range, plus recurring Pickleland Saturday play. Travel and recurring filters are independent of the doubles filters. Official MiLP listings contain date and template conflicts, retained in each card. Neither generic MLP branding nor a DUPR division label is treated as proof of result reporting. No upcoming dated local team event was verified on September 21.

## Doubles divisions

Each main card separates men’s, women’s, and mixed schedules and eligibility. Filters include advertised division categories, not a guarantee of a specific 3.5 bracket. Liveball, Apex, Tejas, Nuron, and Sun City details were refreshed from current organizer pages on September 21, 2026. Sun City’s women’s skill brackets remain subject to confirmation. Tejas women’s and all-age mixed brackets now use a combined 6.0 cap and 3.4 individual maximum; its 50+ mixed option is separate. Pickleland Tuesday women’s play is included with the recurring offerings.

## September 7 refresh

Added Baseline Senior Rated Classic (October 3, 50+/65+), Blazing Paddles (October 10), and Trey Baring Foundation (November 7). The latter two explicitly do not record DUPR results. At that refresh, Baseline enforced eligibility but did not explicitly promise uploads; its September 14 listing now explicitly rules out reporting. Its 3.5+ range extends to 6.00.

Trey Baring division/reporting details come from https://treybaringfoundation.org/pickleball/; fees and deadlines come from its linked Swish registration page. The $60 organizer price conflicts with the $67 first-division registration fee. Blazing Paddles retains a 2025 cancellation panel despite a 2026 refund policy. Apex now displays October 25 in its header while retaining October 24–25 in its description and division tabs. These conflicts remain visible.

The September 7 research horizon was January 7, 2027. No qualifying December–January event was verified. Existing local team availability remains unresolved; official travel alternatives and recurring offerings remain labeled separately. Monday automation researches, updates, validates, commits, pushes, and verifies GitHub Pages; the page itself is a static snapshot.

## September 14 refresh

Coverage now extends through January 14, 2027. Nine doubles events and five team options remain: one local club event, three travel alternatives, and one recurring program. No qualifying local December or early-January event was verified. RacFit in Buda appeared in search, but its primary page timed out and direct browser access was blocked; it remains outside this verified lineup.

- Liveball: live page moved the event to October 10–11 and registration to October 8. Some bracket headings say October 12, while description says Saturday doubles/Sunday mixed. The September search snapshot is stale. Confirm exact division day; prices advertise an increase after September 14.
- Nuron: non-Open DUPR reporting is now explicit; regular entry is $70. Early-bird and registration prose still conflict with the panel. Cancellation cutoff is September 15.
- Baseline: now explicitly not DUPR-reported. Sun City: header says submitted but rules explicitly say not recorded; removed from confirmed filter pending clarification.
- APA: added direct registration link and retained the September 15/16 deadline conflict found September 7. Organizer page refreshed successfully; the registration page blocked browser access and later timed out. Confirm availability directly.
- October Cranky Pickle: October 16–18; $70/player plus DUPR+; registration October 9, refund deadline September 16 ($25 fee); DUPR-14 published cap 14.300/4.100. Weather template remains unresolved.

Source review used rendered Fluid pages and JOMG FAQ, organizer APA/Pickleland pages, and accessible primary Swish/MiLP page text. Liveball, Nuron, and Apex bracket panels were expanded and their 3.5 caps rechecked. Liveball now lists $40 men’s/women’s and $52 mixed. Live availability is not guaranteed. All card links were checked by browser or web retrieval; 403 responses and timeouts are access limitations, not evidence of canceled events.

## September 21 refresh

Coverage now extends through January 21, 2027. Eight upcoming doubles events and three team options remain. APA Austin Open, JOMG Club Championship, and the September John Newcombe MiLP were removed after their listed September 19–20 dates passed. No qualifying local December or January event, or upcoming dated local team event, was verified.

- Pickle Ranch: the Tejas September Classic remains scheduled for September 27. Its current description changed women’s eligibility to a combined 6.0 cap and 3.4 individual maximum; men’s remains 7.0 and 3.8.
- Liveball: the current page now consistently assigns mixed doubles to October 10 and gender doubles to October 11. Registration closes October 8; prices rise after September 26.
- Sun City: the current rules explicitly say results will not be uploaded to DUPR. First-division cost is $25 plus a $5 technology fee.
- Blazing Paddles: the current event fee is $10, down from the prior $40 listing. Its cancellation panel still contains stale 2025 dates.
- Apex: gender doubles are October 24 and mixed doubles October 25. The live panel says $65 while descriptive text says $70, so the fee conflict remains visible.

Current primary pages were reviewed for Nuron, Tejas, Sun City, Baseline, Liveball, Blazing Paddles, Apex, Trey Baring, October Cranky Pickle, and Pickleland. The September Cranky v3 page timed out during this refresh, so its previously verified data is retained and the timeout is not treated as cancellation evidence.
