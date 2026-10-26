# Next Court — Austin and Texas tournament guide

A responsive, static guide to seven upcoming fall and winter 2026 doubles tournaments, three dated team events, and Pickleland’s recurring programs. The default view stays within 40 miles of Cedar Park; a second range reaches roughly two hours, and the statewide view adds Houston and Dallas.

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
- Fees and bracket availability are an October 26, 2026 snapshot. The guide does not automatically discover new events or refresh source data. Passed deadlines and main event dates are labeled using the current date in America/Chicago.
- Completed listings are removed from the upcoming data after their advertised dates pass. This is not a claim that an event occurred or was canceled.
- Distances and drive times are planning estimates from central Cedar Park, not live navigation. The 40-mile filter uses approximate distance; the two-hour filter uses a normal-traffic estimate.
- Sort by listed fee uses each event’s current base or first-division price. Additional event and service fees can apply, so checkout prices may differ.

## Files

- `index.html`: page structure and guide context
- `styles.css`: responsive layout, keyboard focus styles, reduced-motion and print rules
- `events.js`: event details and source links
- `app.js`: search, filters, sorting, and card rendering

Google Fonts is optional; system sans-serif fonts render if unavailable. No analytics, accounts, API keys, or backend services are used.

## MLP and team events

The dedicated `#mlp` section includes the local Texas Ranchers MiLP at Apex, two amateur team events in Wimberley, and Pickleland’s recurring program. Local, travel, and recurring filters are independent of the doubles filters. Eligibility enforcement and result reporting are documented separately for every team listing.

## Doubles divisions

Each main card separates men’s, women’s, and mixed schedules and eligibility. The division filters now distinguish women’s 3.0, mixed 3.0, and the existing 3.5 categories. A 3.0 filter can include either an exact 3.0 bracket or a clearly published combined-team band that fits 3.0 players; cards call out the difference. Travel range and division filters combine.

## October 26 refresh

Added the requested travel controls: within 40 miles by default, within about two hours, and all listed Texas events. The statewide view adds a San Antonio option at Texas Pickle Hall, The Grove Finals in Dallas, and the ERA Texas Open in The Woodlands. Women’s 3.0 and mixed 3.0 are now first-class filters alongside the existing 3.5 coverage.

- Austin area: Trey Baring and Fall Flannel Fest appear in the default 40-mile view.
- Two-hour view: adds JOMG San Antonio, Horseshoe Bay Resort Fall Open, and Turkey Bowl in Buda.
- Statewide view: adds The Grove Finals in Dallas and ERA Pickleball Texas Open near Houston.
- Completed listings: Apex and the WPT Austin Open were removed after their October 24–25 dates passed.
- Team events: Texas Ranchers MiLP, Hallowteam, and Turkey Trio availability and rating caps were refreshed.

Primary organizer and registration pages were checked on October 26. Distances are deliberately approximate, while bracket names, fees, deadlines, and DUPR statements stay tied to the published event pages.

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

## September 28 refresh

Coverage now extends through January 28, 2027. Eight upcoming doubles events and three team options remain. Nuron, the Tejas September Classic, and the September Cranky Pickle v3 MiLP were removed after their listed September 26–27 dates passed.

- Fall Flannel Fest: added November 14–15 at Austin Pickle Ranch. Gender doubles are Saturday and mixed doubles Sunday, with combined-DUPR bands around 3.5; all matches are reported. Early entry is $50 through October 12, registration closes November 9, and full refunds run through November 8.
- Texas Ranchers MiLP: added the November 14–15 local DreamTicket event at Apex. Four-player mixed teams cost $95 per player and require DUPR+. The page publishes standard division caps but currently shows zero players and does not expose which divisions play each day.
- WPT Austin Open: added the October 24–25 longer-drive Bastrop option. It advertises 3.5 skill and age brackets, six guaranteed matches, and automatic DUPR syncing. The page retains conflicting June template dates and $65/$70 fee text, so both conflicts are visible.
- Live availability: Liveball lists 37 players, Baseline two, Blazing Paddles 48, Apex 50 of 80, Fall Flannel Fest 13, and the WPT Austin Open 21. Directory totals can lag the direct event pages.

No qualifying local December 2026 or January 2027 dated tournament was verified. The October Cranky Pickle page timed out again, so its previously verified listing remains and the timeout is not treated as cancellation evidence.

## October 12 refresh

Coverage now extends through February 12, 2027. Five main listings and five team options remain. Liveball at PickleTex, Sun City Fall Brawl, Baseline Senior Rated Classic, and Blazing Paddles were removed after their listed dates passed; this does not establish whether they occurred or were canceled.

- Liveball Austin Winter Classic: added as an advance December 11–13 listing. Registration opens October 14. The organizer says the venue is still to be determined, while the page currently maps to Austin-Bergstrom International Airport. Divisions, rating caps, format, deadline, and DUPR reporting remain unpublished.
- Apex: still lists 50 players, but the capacity display increased from 80 to 138. The $65 panel and $70 description remain in conflict.
- Fall Flannel Fest: now lists 35 players. The $50 early price ends October 12, registration closes November 9, and all matches remain explicitly DUPR-recorded.
- Texas Ranchers MiLP: now lists 22 players. Registration closes November 12; division-day assignments remain unpublished.
- Cranky Pickle MiLP: now lists 64 players and registration closes October 15, correcting the previously retained October 9 deadline.
- Pickle Y'all: added Hallowteam (October 30–31) and the Turkey Trio (November 21–22) as longer-drive team alternatives. Hallowteam enforces ratings but does not record results; Turkey Trio both enforces and records DUPR.
- Pickleland: corrected the recurring copy. Weekly brackets are explicitly not DUPR-recorded, and the public weekly schedule no longer claims a standing Saturday team event.

No qualifying January–February 12, 2027 dated event was verified. An absent directory result is not treated as a cancellation or proof that no event will be added later.

## October 19 refresh

Coverage now extends through February 19, 2027. Six main listings and four team options remain. The October 16–18 Cranky Pickle MiLP was removed after its listed dates passed; this does not establish whether it occurred or was canceled.

- Turkey Bowl: added the November 20–21 Violet Crown tournament at RacFit in Buda as a longer-drive option. Mixed plays Friday and gender doubles Saturday, with 3.0–3.5 and 3.5–4.0 brackets. DUPR gates eligibility, but the organizer explicitly says results are not recorded. The live panel and description disagree on the refund cutoff.
- WPT Austin Open: the current page now places the event at The Picklr Oak Hill in southwest Austin, not Lost Pines in Bastrop. It lists 32 players and consistent October 24–25 dates, though one schedule sentence still carries a stale June 23 posting date.
- Liveball Austin Winter Classic: registration is now open and one attendee is shown, but the organizer still has not published a real venue, divisions, fee, format, rating limits, or DUPR policy. The direct page lists December 13 as the registration deadline.
- Availability: Apex remains at 50 players while capacity increased to 189. Fall Flannel Fest now shows 50 of 51 players, Texas Ranchers MiLP shows 32, and Hallowteam shows 11. Current pages still show no Turkey Trio registrants.
- Prices: Fall Flannel Fest is now $60 after its early period ended. Apex still conflicts between the $65 live panel and $70 description. Turkey Bowl is $50 through November 1, then $65.

No qualifying January–February 19, 2027 local dated event was verified. An absent directory result is not treated as a cancellation or proof that no event will be added later.
