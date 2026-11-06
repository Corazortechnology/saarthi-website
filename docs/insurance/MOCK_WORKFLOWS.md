# Completing the insurance story with mock data

All A–P requirements can be demonstrated locally. The additional workflows below replace the previous demo gaps with explicit simulations. They require no live credentials, camera hardware or external data access.

## A–P coverage

| Requirement | Where to demonstrate it | Mock evidence |
| --- | --- | --- |
| A. Who is driving? | Vehicle → Drivers; trip evidence | Linked driver assignment and identification confidence |
| B. Driver changes | Vehicle → Drivers; Driver Switching scenario | Chronological assignments and change count |
| C. Owner versus other driver | Vehicle profile and Drivers | Registered owner compared with assigned driver |
| D. Unique drivers in a period | Vehicle → Drivers; Multiple Drivers scenario | Distinct drivers calculated from filtered trips |
| E. Daily, monthly, annual distance | Vehicle / Driver → Activity | Trip-derived totals, twelve-month history and calendar coverage dates |
| F. Driving at a stretch | Vehicle / Driver activity and trip evidence | Continuous-driving duration and recorded breaks |
| G. Roads, terrain, geography | Portfolio, vehicle activity and maps | Linked route type, terrain, region and risk-zone records |
| H. Accident history | Accident intelligence; Vehicle → Incidents | Date-filtered incidents with separate simulated verification status |
| I. Potential accident reasons | Incident investigation; Camera analysis | Front/rear illustrations, annotations and linked contributing observations |
| J. OEM service history | Vehicle → Service; Mock integration lab | Service dates, odometers, repair records and overdue status |
| K. Challan history | Vehicle → Challans; Traffic Violations scenario | Fictional challan records separated from detected events |
| L. Personal/commercial purpose | Usage classification; Camera analysis | Trip patterns, passenger-turnover illustrations and confidence |
| M. Rewards | Rewards & incentives; Customer experience | Calculated earnings, penalties, eligibility and leaderboard |
| N. Distraction | Driver behaviour; Camera analysis; Live alerts | Phone-use and attention events with duration and cabin evidence |
| O. Red-light jumping | Behaviour, incidents and Live alerts | Crossing candidates, camera evidence and separate challan workflow |
| P. Speed-limit alerts | Live alerts · demo | Measured mock speed versus route limit, acknowledgement and response |

The insurer's claims objective is supported by **Claims outcomes**, the coaching comparison and the separate claims-reduction planner. These demonstrate the analysis and proposed intervention workflow; mock data cannot establish actual claims reduction.

## Presentation sequence

1. **Overview → Full 12 months:** 76,628 trips and recorded mileage across 365 days. Switch to Recent 6 months to show date scoping. Vehicle profiles include recorded calendar-year totals with exact coverage dates; annualised mileage remains a separate projection.
2. **Live alerts · demo:** speeding is selected by default. Choose Next alert or Play replay. A driver card shows speed and limit; Acknowledge warning enables Simulate safe response. Inspect the linked event and GPS. Other replay types include phone use, distraction and red-light crossing. The ledger separately shows scripted historical delivery, acknowledgement and resolution timestamps.
3. **Camera analysis:** choose Incident context, Driver attention or Usage classification. Inspect the synthetic frame's annotations, source IDs and confidence. Follow linked records or change the session's review status. Incident drawers also include the annotated front/rear frames and record-backed possible factors.
4. **Claims outcomes:** inspect frequency per 100,000 km, incurred cost, paid/reserve reconciliation and illustrative loss ratio. Compare the coached and comparison cohorts before/after the programme. Open a claim, inspect its policy and investigate the underlying incident.
5. **Claims-reduction planner:** vary the assumed frequency reduction and programme cost. Expected claims and costs are calculated from baseline cohort records and follow-up kilometres. These planning values do not alter sampled claims or their observed comparison.
6. **Mock integration lab:** select an adapter and run a successful mock response. Select Simulated timeout, run it, then switch to success and Retry mock sync. Returned entity counts reconcile with the same dataset used by the dashboard.

## Claims scenario assumptions

- A seeded, reproducible selection of 50 drivers receives a completed mock programme on 30 April 2026, effective 1 May 2026.
- Generator inputs reduce post-programme collision-trigger probability by 20%, speeding probability by 25%, braking by 15% and distraction by 35% for those drivers. These are programmed assumptions, not estimates from data.
- Claims are generated for a seeded subset of simulated verified accidents. Vehicle type and severity condition the fictional claim estimate. Claims at least 28 days old are settled; newer claims retain reserves, with a partial payment after ten days.
- Incurred amount equals paid amount plus outstanding reserve. Financial values are assessed at the fixed 31 October 2026 snapshot, while filters select the loss-date cohort.
- Sampled outcomes may increase or decrease despite lower probability inputs. The application displays them as generated, with no forced positive result. This deliberately illustrates why assumed improvements and outcome evidence must be distinguished.
- Earned premium is a fictional policy-ledger amount prorated by coverage days. Driver filters allocate it by selected driver mileage share. It is not a quoted or recommended premium.
- The separate planner uses `baseline claims / baseline km × follow-up km × (1 − assumed reduction)` and baseline average incurred cost. Net difference subtracts the entered programme budget. Missing baseline claims or follow-up exposure produce an empty state.
- No actual effectiveness, causation, premium discount or claim reduction is established by mock records.

## Evidence and replay semantics

- Camera findings come from scripted scenes and linked preceding events; bounding boxes illustrate the mock detection. Confidence values are heuristic, not calibrated ML outputs. Incident hypotheses retain their underlying event/camera/route/zone IDs.
- Generated events and their timestamped GPS sample share coordinates and speed, including overspeed peaks. Sparse GPS timing places the recorded break between route samples.
- Alert triggers use speeding above the limit for at least ten seconds, attention events lasting at least five seconds, or a red-light crossing candidate. Delivery is scripted at +2 seconds; acknowledgement at +8 seconds after delivery; response at +20 seconds after delivery where applicable.
- Interactive replay uses an independent virtual clock and new session acknowledgements. It does not imply a new real incident, rewrite history, or contact any recipient. Reset, filter changes or leaving the page clear interactive replay state.
- Camera reviewer state also lasts only within the current page session. “Reviewed in demo” never becomes an officially verified accident or identity.

## Browser review

Reviewed the expanded application in the in-app browser:

- Mock speeding warning showed 73 km/h against a 50 km/h limit; acknowledgement and resolution transitions worked and source evidence opened.
- Cabin usage analysis showed a passenger-change annotation and linked source IDs; review state changed to More evidence needed.
- Claims counts, costs and cohort figures matched calculation outputs. Zero assumed reduction and zero programme cost yielded zero projected difference. Claims opened linked accident investigation.
- Mock integration timeout displayed its error state; retry returned the telematics batch with matching record counts.

- Full-year and recent-six-month presets showed 76,628 and 38,779 trips respectively. An October-only claims filter showed the missing-baseline state, and reset restored the planner.
- Timed replay at 5× reached 60 virtual seconds and completed with 12 arrivals. Pause held at 32 seconds across subsequent observations; reset restarted the replay.
- All four new pages stayed within an effective 389 × 843 CSS viewport, with document width equal to viewport width. Mobile navigation, replay controls, camera task selection and OEM sync were exercised. The OEM response contained 502 service records. The temporary viewport override was reset.
- Claims CSV export contained 95 rows, each labelled `demo=true` and valued at `2026-10-31`. Exported incurred amounts totalled ₹5,349,699 and equalled paid amounts plus reserves.
- No new browser console errors or warnings appeared during final review.
- Final `npm run test:insurance`: 35 checks passed. Final `npm run build`: passed.

Saved screenshots:

- [Claims outcomes](evidence/mock-claims.png)
- [Speed-limit alert replay](evidence/mock-alerts.png)
- [Annotated cabin analysis](evidence/mock-camera.png)
