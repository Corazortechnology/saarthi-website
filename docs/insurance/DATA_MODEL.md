# Model and calculation reference

## Relationships

| Entity | Key | References / semantics |
| --- | --- | --- |
| Driver | `id` | Fictional display alias, region, persona and experience |
| Vehicle | `id` | `ownerId → Driver`; type, declared use and opening odometer |
| Assignment | `id` | `tripId`, `driverId`, `vehicleId`; exact trip interval, relationship, synthetic authentication confidence |
| Trip | `id` | `driverId`, `vehicleId`, `assignmentId`, `routeId`; IST day, start/end, distance, break/continuous/night duration and odometers |
| GPS sample | `id` | `tripId`; timestamp, coordinate, speed and cumulative kilometres |
| Behaviour event | `id` | `tripId`; event type, timestamp, coordinate, speed/limit, duration and severity |
| Camera observation | `id` | `tripId`, optional `eventId`; front/rear/cabin, synthetic observation and confidence |
| Incident | `id` | `tripId`, `eventId`, `cameraIds[]`; status, severity, review note and possible factors |
| Service record | `id` | `vehicleId`; date, actual demo odometer, repairs and next due date/km |
| Challan | `id` | `vehicleId`, `driverId`, `eventId`; fictional verified record, type, amount and date |
| Route | `id` | `zoneId`; region, road, terrain, speed limit, geometry and distance |
| Zone | `id` | region, coordinate, scenario-defined risk index and reason |
| Derived profile | entity ID | selected records, exposure metrics, usage inference, score factors and reward ledger |

Assignments cannot overlap for the same driver or vehicle. GPS endpoint distance equals trip distance; each vehicle's odometer advances by its linked trip distances. Incident and challan references must belong to the same driver/vehicle/trip. OEM odometers use the trips observed before the service date.

## Risk formula

Each contribution is clamped between zero and its weight. Sum contributions and round to one decimal. Let `rate(n) = 1000 × n / max(100, observed km)`.

| Factor | Weight | Fraction of weight |
| --- | ---: | --- |
| Overspeeding | 18 | `rate(speed events) / 10` |
| Harsh braking | 10 | `rate(braking events) / 9` |
| Aggressive manoeuvres | 8 | `rate(acceleration + sharp turns) / 14` |
| Distraction | 14 | `rate(phone + distraction) / 12` |
| Night | 7 | `(night driving minutes / driving minutes) / 0.35` |
| Accident history | 13 | `verified simulated accidents × 10000 / max(1000, km) / 2` |
| Traffic violations | 8 | `(rate(red-light) + rate(restraint/helmet) + rate(simulated challans)) / 8` |
| Driver changes | 5 | `(sequential changes / max(1, trips − 1)) / 0.5` |
| Annual mileage | 6 | `max(0, annualised km − 10000) / 60000` |
| Geographical exposure | 5 | distance-weighted zone risk index |
| Terrain | 3 | fraction of km on hilly, mountainous or uneven roads |
| Usage | 3 | usage confidence if commercial patterns, otherwise zero |

Unverified collision detections do not contribute to the accident factor. Detected traffic events and simulated external challans remain separate records; the traffic factor intentionally gives corroborating simulated challans an additional contribution. Thresholds are illustrative, not actuarially calibrated. No real premium is computed.

## Usage inference

Requires at least five trips across three active days. Signals:

1. At least 3.5 trips per active day.
2. Passenger-turnover observations on at least 20% of trips.
3. At least four driving hours per active day.
4. At least 45% of trips on the most repeated route and at least three trips per active day.

Two or more signals infer commercial patterns. Confidence is `min(0.96, 0.55 + 0.09 × supporting signal count)` (complementary signals for personal patterns). Supporting counts appear beside the classification. Private registration plus commercial patterns creates a clarification recommendation, not a confirmed misuse finding.

## Rewards

Each trip earns `5 + floor(distance km / 5)` points. Deductions: speeding 5; braking, acceleration and turns 3 each; phone 8; distraction 6; red-light 10; seat-belt/helmet 6. Collision signals alone deduct zero. Available balance is `max(0, total earned − total deducted)`. The trip ledger retains uncapped net contributions so it reconciles. Monthly charts show each month's net floored at zero; these are explicitly labelled and need not sum to the all-period balance.

Eligibility requires safety ≥75, at least 20 trips and at least 100 points. Gold means safety ≥90, Silver ≥75. A safe streak counts consecutive latest trips without reward deductions, not calendar days.

## Simulation

Reductions round observed event counts to integers. Night reduction changes night minutes. Mileage changes prospective annual exposure while leaving the historical event-rate denominator unchanged. Driver count proportionally adjusts observed switching, with a modelled switching fraction where the baseline has one driver. Rewards recover the changed speeding and braking penalties only. Resetting to baseline returns identical scores, factors and points.
