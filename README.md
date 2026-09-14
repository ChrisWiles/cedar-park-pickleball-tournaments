# Next Court — Cedar Park tournament guide

A responsive, static guide to the nine fall 2026 pickleball tournaments, five MLP/team options, and Pickleland’s recurring events.

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
- Fees and bracket availability are a September 14, 2026 snapshot. The guide does not automatically discover new events or refresh source data. Passed deadlines and main event dates are labeled using the current date in America/Chicago.
- September 12–13 leads (Saturday Showdown, Brushy Creek, Texas Ranchers) were removed from upcoming listings after their advertised dates passed. This is not a claim that they occurred or were canceled.
- Brushy Creek’s 2026 calendar links to the tournament page confirming September 12, a September 10 deadline, and men’s, women’s, and mixed divisions. Numerical ratings and reporting still need confirmation.
- Sort by listed fee uses the regular $75 directory price for APA, the current $70 price for Nuron, and the relevant first-division fee for other events. Checkout prices may differ.

## Files

- `index.html`: page structure and guide context
- `styles.css`: responsive layout, keyboard focus styles, reduced-motion and print rules
- `events.js`: event details and source links
- `app.js`: search, filters, sorting, and card rendering

Google Fonts is optional; system sans-serif fonts render if unavailable. No analytics, accounts, API keys, or backend services are used.

## MLP and team events

The dedicated `#mlp` section includes JOMG at Apex, three official New Braunfels MiLP events explicitly labeled as outside the original drive range, and recurring Pickleland Saturday play. Local/travel/recurring filters are independent of the doubles filters. JOMG dates, roster size, fees, and its 60-day membership rule were checked in the rendered official website and FAQ on September 14, 2026. Official MiLP listings contain date/template conflicts, retained in each card. Neither generic MLP branding nor a DUPR division label is treated as proof of result reporting. The October Cranky Pickle primary listing became accessible September 14 and is now included.

## Doubles divisions

Each main card now separates men’s, women’s, and mixed schedules and eligibility. Filters include advertised division categories, not a guarantee of a specific 3.5 bracket. Liveball’s Sunday mixed tab, Apex’s Saturday/Sunday tabs, Tejas, and Nuron brackets were verified on September 7, 2026. APA’s final women’s grouping and Sun City’s women’s skill brackets remain explicitly subject to confirmation. Tejas mixed includes a lower-rated all-age bracket and a distinct 50+ option. Pickleland Tuesday women’s play is included with the recurring offerings.

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
