# Saarthi Insurance Intelligence

A complete, local insurance demonstration built into the existing Saarthi React website at **`/insurance`**. Production services and existing marketing, invitation and simulator routes are preserved.

## User guide and navigation

Open **`/insurance/guide`**, choose **Guide & help** from the sidebar or toolbar, or select the question-mark button. The in-app guide includes a searchable directory of all 16 functional sections, exact click paths, the A–P requirement map, navigation basics and common questions. **Start guided demo** runs a 14-step walkthrough including alerts, cameras, claims and integrations. **Download guide** saves a portable Markdown copy.

The same guide is available here: [USER_GUIDE.md](USER_GUIDE.md).

## Run

From `Saarthi-website/`:

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5186
```

Open **http://127.0.0.1:5186/insurance**. The website's `/insurers` page also links to the demo. Dependencies were already installed in this workspace; no new runtime packages were added.

For a production bundle:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 5186
```

The host must serve `index.html` for nested client routes. Existing `public/_redirects` covers hosts that support that format. This implementation has not been published to a production host.

Tests require a Node version with native TypeScript stripping (Node 22.6+; validated here on Node 26):

```sh
npm run test:insurance
```

## What is included

- Executive overview and portfolio analytics, with six shared filters: date range, region, vehicle category, vehicle, driver and vehicle risk band.
- Vehicle and driver profiles, many-to-many assignments, non-owner driving, mileage, exposure, driving hours, continuous driving, trips, events and risk profiles.
- Trip evidence with generated GPS, route plotting, timestamps, assignment identity and related events.
- Incident investigation with front/rear illustrations, speed, coordinates, severity, status and potential factors.
- Simulated OEM service history, overdue maintenance, recurring repairs and separate simulated challans.
- Explainable risk with twelve factors, same-category vehicle comparison and indicative underwriting profiles.
- Rewards ledger, penalties, driver ranking, safe-trip streaks and illustrative incentive eligibility.
- Ten scenario pages, a fourteen-step guided sales demonstration and human-review recommendations.
- What-if controls for speeding, braking, night driving, drivers and annual mileage; before/after risk and rewards.
- A customer experience with a demo driver selector and personal trips, behaviour, incidents and rewards.
- Source registry, provenance, integration adapter contracts, loading/error/empty states, URL-preserved filters, responsive navigation, table search/sorting/pagination and CSV exports.

## Newly completed mock workflows

- **Live alerts · demo:** replay speeding, distraction, phone-use and red-light events; mock delivery, acknowledgement and safe-response controls; historical delivery ledger and export. No notification leaves the browser.
- **Camera analysis:** bounding-box annotations, scripted findings, confidence, source evidence and reviewer state.
- **Claims outcomes:** linked policies and claims, paid/reserve/incurred reconciliation, exposure-based frequency and cost, a before/after coaching comparison, and an adjustable claims-reduction planner.
- **Mock integration lab:** exercise identity, device, camera, geography, OEM, traffic and insurer adapter responses, including a scripted timeout and retry.

See [MOCK_WORKFLOWS.md](MOCK_WORKFLOWS.md) for assumptions and a presentation sequence.

## Visual system and motion

The insurance workspace uses charcoal navigation, warm white surfaces, a lime accent, Inter typography and IBM Plex Mono figures. A custom vehicle illustration connects the overview to the selected vehicle's real mock-record counts; its signal animation is decorative, not live ingestion.

- Cards reveal on entry, chart lines draw in, bars fill to their actual values, and evidence drawers slide into view.
- Front, rear and cabin scene illustrations retain the normalized annotation coordinates from the mock camera records.
- **Pause animations** in the top bar disables decorative motion and entry transitions. OS reduced-motion preferences are respected. Alert replay remains a separately controlled demo workflow.
- **Filters** expands the shared selectors on every screen size. Dates and presets remain visible; phones use two rows to avoid overlapping controls.
- Claims programme assumptions are available in an expandable panel. The guide includes motion controls and current navigation instructions.

Implementation: `src/insurance/presentation.css`, `src/insurance/ui/Motion.tsx`, `src/insurance/ui/PortfolioHero.tsx`, and `src/insurance/ui/CameraScene.tsx`.

## Reproducible snapshot

Seed **20261105**, dates **1 November 2025–31 October 2026** (365 days), India Standard Time.

| Entity | Records |
| --- | ---: |
| Drivers | 100 |
| Vehicles | 110 |
| Trips / assignments | 76,628 each |
| GPS samples | 536,396 |
| Driving events | 49,921 |
| Camera observations / placeholders | 28,938 |
| Incidents, including fictional verified accidents | 199 |
| Fictional verified accidents | 114 |
| OEM service records | 502 |
| Simulated challans | 2,427 |
| Routes / geographical zones | 36 each |
| Alert delivery records | 20,711 |
| Scripted camera analyses | 28,938 |
| Policies / claims | 110 / 95 |
| Completed mock coaching interventions | 50 |

Profiles cover six Indian regions, five vehicle categories, safe/aggressive/distracted/night/high-mileage personas, family sharing and employee driver changes. Two-wheelers have no cabin-camera records. There are seven sparse GPS samples per trip; the demo does not claim continuously sampled device telemetry.

The dataset is generated locally on first load. It has no external requests, database dependency, login or stored PII. Reopening the app reproduces the same records. UI filters live in the URL. Source records are immutable; what-if controls do not edit them. Simulated history is fixed to the twelve-month window, regardless of today's date.

## Suggested demonstration

1. Open **Overview** and select **Start guided demo**.
2. Review portfolio totals and risk distribution; use a region or month to change the cohort.
3. Open a high-risk vehicle, then **Drivers**, **Trips** and **Behaviour**.
4. Select a trip to inspect the GPS and linked evidence.
5. Open **Accident intelligence** and inspect an incident's front/rear placeholders.
6. Review **Service**, **Challans** and **Risk profile** on the vehicle.
7. Compare vehicles under **Risk & underwriting**.
8. Change driving inputs under **What-if simulation**.
9. Inspect the **Rewards & incentives** leaderboard and **Customer experience**.
10. Finish with **Decision support** and its supporting evidence.

For shorter presentations, use **Demo scenarios**. Scenario pages intentionally use the full snapshot and clear global filters when opening a source profile. Other pages and drill-downs retain filters; a profile outside the current cohort offers **Clear filters**.

## Definitions and limits

- **Risk:** 0–100, higher is worse; Low <28, Medium 28–54.9, High ≥55. **Safety:** 100 minus risk. No observations produce a “No data” state.
- **Driving hours:** trip duration minus recorded break time. Night exposure excludes stops and uses 22:00–06:00 IST. Average trip duration includes its breaks.
- **Recorded annual history:** a full rolling twelve-month mock record (November 2025–October 2026). Calendar-year totals carry coverage dates because both calendar years are partial. Use the **Full 12 months** or **Recent 6 months** presets.
- **Annualised mileage:** observed kilometres × 365 / selected inclusive calendar days. Always a projection, never measured full-year history.
- **Vehicle risk filter:** calculate each vehicle's risk in the date/region/category/driver cohort, then select matching vehicles. Driver analytics are recomputed from the surviving trips.
- **Observed records:** all generated. “Verified accident (simulated)” and “Verified challan (simulated)” describe fictional workflows, not external verification.
- **Usage confidence:** a transparent heuristic based on trip frequency, hours, repeated routes and synthetic passenger-turnover signals. It is not calibrated or proof of commercial misuse.
- **Map:** generated coordinates plotted on an offline route schematic, not a live basemap or navigation product.
- **Camera evidence:** annotated illustrations and scripted analysis of front, rear and cabin scenes. Findings link to camera, event, trip, road and zone IDs; review status is a session-only mock workflow. No real video or image recognition model is connected.
- **Rewards:** demo points without cash value. No premium, guaranteed insurance benefit or claim reduction is calculated.
- **Decision support:** suggestions for human review; no automatic rejection, policy binding or claims adjudication.
- **Production:** authenticated server-side ingestion, authorisation, consent, retention, data validation and actuarial calibration remain future integration work.

## Code map

| File | Responsibility |
| --- | --- |
| `src/insurance/data/model.ts` | Entity types, foreign keys and shared semantics |
| `src/insurance/data/generate.ts` | Persona-conditioned deterministic generator |
| `src/insurance/data/repository.ts` | Separate identity, telematics, camera, geography, OEM and traffic adapters |
| `src/insurance/data/analytics.ts` | Scoping, metrics, risk, classification, rewards, simulation and recommendations |
| `src/insurance/data/extensions.ts` | Mock policies, claims, interventions, alerts and camera-analysis generation |
| `src/insurance/data/outcomes.ts` | Claims aggregation, cohort comparisons, reduction planning, calendar mileage and replay transitions |
| `src/insurance/pages/Operations.tsx` | Alert replay, camera review, claims and integration lab |
| `src/insurance/data/scenarios.ts` | Record-backed scenario selectors |
| `src/insurance/InsuranceApp.tsx` | Lazy app entry, navigation, URL filters, loading and tour |
| `src/insurance/pages/` | Portfolio, entity profiles and insurance workflows |
| `src/insurance/ui/` | Charts, tables, maps and evidence drawer |
| `tests/insurance/analytics.test.mjs` | Determinism, integrity, calculations and adapter checks |

See [ARCHITECTURE.md](ARCHITECTURE.md), [DATA_MODEL.md](DATA_MODEL.md) and [VALIDATION.md](VALIDATION.md).
