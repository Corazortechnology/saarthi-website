# Validation — 5 November 2026

## Presentation redesign — 6 November 2026

- Applied the new visual system across the insurance workspace; added authored vehicle and camera illustrations, chart/card entry motion, page/drawer transitions and an animation pause control.
- The 35 existing automated checks passed; the TypeScript/Vite production build passed.
- Reviewed overview at 1440, 907, 760 and 389 CSS pixels. Measured no document-level horizontal overflow in those views. Phone date controls initially overlapped; changed them to an explicit two-row layout and reviewed expanded selectors again.
- Exercised Filters → Mumbai: the hero and filter summary reconciled to 25 vehicles, 15,579 trips, one region and three high-risk vehicles. Reset restored 110 vehicles and 76,628 trips.
- Pause animations set all three vehicle signal animations to paused. Resume restored motion. Reduced-motion behavior is implemented in the shared React context and scoped CSS; OS preference was not changed during this review.
- Opened Claims outcomes from the overview. Camera task selection displayed the cabin illustration with its source annotations; linked evidence opened the updated drawer with matching source IDs, coordinates and GPS samples.
- Alert controls advanced an overspeed event, acknowledged it and recorded the scripted safe response. Phone menu navigation and Guide & help worked; the guide's new Control motion instructions were present.
- Rewards presentation was visually reviewed. Browser diagnostics returned no errors or warnings during the review. Temporary viewport overrides were reset after the responsive review.
- Screenshots: [Overview](evidence/redesign-overview.png), [Camera](evidence/redesign-camera.png).

## User guide update — 6 November 2026

- Added `/insurance/guide` with 16 searchable section instructions, navigation basics, all A–P requirement links, eight common questions and a Markdown download.
- Verified search results, an empty search and clearing it, expanding instructions, a vehicle-section link, the speed-alert requirement link and returning through the help button.
- Exercised all 14 guided-tour steps through Finish. Starting the tour from a six-month filter restored the complete twelve-month scope.
- Downloaded guide contained all 16 section routes and all 16 requirement rows.
- Phone-width DOM layout measured 389 × 843 CSS pixels without document-level horizontal overflow; searching and expanding the camera instructions worked. The viewport override was reset. Desktop layout was visually reviewed.
- Existing 35 automated data checks and the production build passed. No new browser errors or warnings were captured during the guide review.
- Screenshot: [User guide](evidence/user-guide.png). Written guide: [USER_GUIDE.md](USER_GUIDE.md).

## Current twelve-month expansion

The expanded implementation passes **35 automated checks** and the TypeScript/Vite production build. Additional checks cover claims-policy-incident relationships, financial reconciliation, cohort exposure, missing baselines, planner assumptions, intervention evidence, alert chronology/transitions, camera annotation provenance, event/GPS speed and coordinate consistency, annual mileage and adapter payload totals.

Current snapshot: 76,628 trips; 536,396 GPS samples; 49,921 events; 20,711 alerts; 28,938 camera analyses; 95 claims linked to 110 policies; 50 mock coaching interventions. The window is 1 November 2025–31 October 2026.

Browser coverage for this expansion and its evidence files is recorded in [MOCK_WORKFLOWS.md](MOCK_WORKFLOWS.md).

---

# Initial six-month release validation

The following is retained as historical evidence for the earlier 38,494-trip snapshot. Its counts are not the current expanded dataset.

## Automated validation

`npm run test:insurance`: **24 checks passed** on Node 26.

Coverage:

- Full-record reproducibility for the fixed seed and a different result for a changed seed.
- Population size, 184-day coverage and unique primary keys.
- Trip, assignment, vehicle, driver and route relationships.
- No overlapping driver or vehicle assignments.
- GPS endpoint distance, trip kilometres and sequential odometer reconciliation.
- Event/camera/incident/challan foreign keys and timestamps.
- Portfolio totals reconciled with raw trips and vehicle/driver aggregates.
- IST date boundaries and inclusive date ranges.
- Region, category, vehicle, driver, combined and risk-band filters.
- Empty and incompatible cohorts, with no invented score.
- Risk weights, bounded contributions, score sums and safety complement.
- Monotonic behaviour improvements, baseline simulation reset and mileage isolation.
- Reward earnings, penalties, balances and eligibility arithmetic.
- Family, employee, multi-driver and multi-vehicle assignments.
- Usage confidence and supporting cabin signals.
- OEM chronology, odometers, overdue service and recurring maintenance.
- All ten scenario selectors and their linked evidence.
- Adapter assembly, cancellation and error propagation.
- CSV quoting and spreadsheet formula-prefix protection.
- Driving hours excluding recorded breaks; night exposure excluding stops.
- No cabin-camera observations for two-wheelers.

`npm run build`: TypeScript and Vite production build passed. The insurance application is a separate lazy chunk; the website's existing main routes are retained.

## Browser review

Reviewed through the Codex in-app browser against the local development server.

- All twelve sidebar sections rendered their intended page headings without console errors.
- Vehicle overview, trips, drivers/assignments, behaviour, incidents, challans, service and risk tabs opened.
- Trip search, pagination and evidence drawer worked; GPS samples and event links were visible.
- Incident status/severity filtering and investigation drawer showed two front/rear placeholders, coordinates, speed and provenance. Escape closed the drawer.
- Scenario source navigation cleared prior filters. All ten dedicated scenario pages displayed their traceable evidence.
- All ten guided demonstration steps navigated successfully; Finish closed the guide.
- Simulation reset restored observed risk. Reducing overspeeding by 100% changed the selected example from 60.4 to 45.3 and moved its risk band from High to Medium.
- Map region selection, route selection, zoom/reset and trip drill-down worked.
- Daily activity exposed 184 points; mileage/trip measure selection and monthly point selection worked.
- Global filters matched independently calculated values:

| Filter | Trips |
| --- | ---: |
| Full snapshot | 38,494 |
| Mumbai | 7,915 |
| Mumbai + Sedan | 2,381 |
| High-risk vehicles | 2,185 |
| VEH-00006 | 312 |
| DRV-00006 | 318 |
| October 2026 | 6,503 |

- Incompatible region/vehicle filters showed zero trips and the empty state. Reset restored the complete snapshot.
- The high-risk overview shortcut carried `risk=High` into the vehicle list and showed seven vehicles.
- Export report downloaded a CSV; parsing confirmed 110 vehicle rows, scope dates, source IDs and `demo=true` on every row.
- Phone-width checks used an effective CSS viewport of 389 × 843 (the browser's existing zoom required a proportional viewport override). Overview filters, menu navigation, vehicle list, risk, simulation and customer experience stayed within the viewport without document-level horizontal overflow. Customer selection and rewards worked. The temporary viewport override was reset.
- The existing `/insurers` marketing page still rendered and its new insurance-demo link returned to the dashboard.

## Corrections made during review

- Date inputs now process input events consistently.
- Filter query updates remain available to same-action navigation and rapid consecutive filter changes.
- Map region selection recovers when the global cohort no longer contains that region.
- Breaks are excluded from driving and night-driving hours.
- Two-wheelers do not receive cabin observations.
- Secondary evidence text contrast was strengthened.

## Saved evidence

- `evidence/overview.jpg`: working portfolio dashboard.
- `evidence/incident.jpg`: incident investigation with synthetic camera illustrations.

## Limits of validation

Browser checks used the installed in-app browser and representative shared component flows. Physical phone testing, cross-browser certification, production authentication, load testing, live ingestion and actuarial validation were not performed. All map geometry, identities, sensor records, camera placeholders and external-record workflows remain synthetic.
