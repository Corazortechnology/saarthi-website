# Insurance intelligence demonstration

## Existing architecture inspected

- `Saarthi-website`: React 19, TypeScript, React Router 7 and Vite 8; Inter / IBM Plex Mono fonts, Lucide icons, Saarthi brand artwork. Marketing and invitation routes currently use `SiteLayout`.
- `Saarthi-main`, `Saarthi-fleet`, `Saarthi-family`: Flutter driver and observer applications. The Fleet application handles invitations, location and safety alerts with HTTP snapshots and Azure Web PubSub.
- `Saarthi-backend-main`: FastAPI APIs for authentication, sessions, vehicles, accidents, road data, safety scores and rewards; MongoDB stores operational entities, Azure supports media and realtime delivery. These APIs require production identity and permissions and are unsuitable as a source of fictional insurer records.
- `Saarthi-admin-main`: separate FastAPI model and IRI control plane; not an insurer application.
- `Saarthi-simulator`: Vite, Three.js, local browser demo services and embedded Flutter applications. Its session / reward simulation supports a guided individual journey, not a historical insurance portfolio.

## Proposed implementation

Add a lazy-loaded `/insurance/*` application to the website, outside the marketing layout. Reuse the installed frontend dependencies and brand assets. Existing routes, production APIs, authentication, rewards and simulation experiences remain intact. No new infrastructure is necessary for an entirely fictional demonstration.

1. **Model**: typed normalized records with stable primary and foreign keys.
2. **Generation**: fixed seed and fixed twelve-month window, persona-conditioned journeys, assignments, telemetry and evidence.
3. **Ingestion**: separately replaceable identity, location, behaviour, camera, geospatial, OEM and traffic adapters; an asynchronous repository assembles the demo snapshot.
4. **Processing**: indexed records, common date / region / category / vehicle / driver / risk filters, exposure-based explainable scoring, usage inference, rewards, recommendations and scenario selectors.
5. **Presentation**: reusable charts, geographic plotting, searchable paginated tables, entity and evidence drill-downs, simulations, exports and a sales tour.

The demo is local and deterministic. No production connectors are called. A future service can implement the adapter contracts with authenticated server-side ingestion, durable storage, provenance, deduplication and consent controls. Browser code must never hold integration credentials.

## Entity relationships

`Driver ← Assignment → Vehicle`; `Trip → Driver + Vehicle + Route + Assignment`; `Telemetry → Trip`; `BehaviourEvent → Trip`; `CameraEvent → BehaviourEvent`; `Incident → Trip + BehaviourEvent + CameraEvent[]`; `Challan → BehaviourEvent`; `ServiceRecord → Vehicle`; `Route → GeographicRiskZone`. Derived risk profiles, usage classifications and reward ledgers retain entity IDs and evidence records. Scores and charts are recalculated from a selected snapshot, not stored as UI constants.

## Semantics

- All records are synthetic. A simulated verified record describes a fictional verification workflow, not an official source connection.
- Risk increases from 0 to 100; safety equals 100 minus risk. Scores are heuristic and not actuarially validated.
- Calendar grouping uses Asia/Kolkata. The snapshot contains a full rolling twelve-month record; calendar-year totals show their partial coverage dates. Annualised mileage is separately labelled when projecting a shorter selected period.
- Global filters define the same record cohort for all views. Historical records are explicitly labelled when shown outside the selected period.
- Maps plot generated coordinates and route geometry on an offline schematic. No live map provider or camera recording is implied.
- Simulation changes derived inputs only and does not alter source records or calculate premiums.

## Validation plan

Use Node's test runner for determinism, foreign keys, chronology, non-overlapping assignments, odometer and distance reconciliation, date boundaries, all filter dimensions, monotonic scoring, reward arithmetic, scenario evidence and adapter errors. Build with TypeScript and Vite. Exercise the application in a browser at desktop and mobile widths, including every section, filter, table and drill-down.


## Expanded mock workflows

`extensions.ts` generates policies, claims, completed coaching interventions, alert delivery histories and scripted camera analyses after the linked trip records are assembled. Programme assignment is seeded before trips; explicitly declared scenario parameters change follow-up event/incident probabilities for 50 drivers. `outcomes.ts` aggregates claims from source records, compares exposure-adjusted cohorts and calculates a separate adjustable planning illustration. Sampled outcomes are never forced to show an improvement.

The insurance adapter returns policies, claims and interventions; camera and telematics adapters include their analysis and alert records. The integration lab exercises these exact contracts and demonstrates local failure/retry without credentials or network access. Replay acknowledgements and reviewer choices are in-memory session state and do not rewrite the historical ledger.
