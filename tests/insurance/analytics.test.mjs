import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { generateDataset, DEMO_FROM, DEMO_TO } from '../../src/insurance/data/generate.ts'
import { calculateRisk, createScope, defaultFilters, groupBy, rewards, series, serviceStatus, simulate, sum, csv } from '../../src/insurance/data/analytics.ts'
import { scenarios } from '../../src/insurance/data/scenarios.ts'
import { demoAdapters, assembleDataset } from '../../src/insurance/data/repository.ts'
import { claimsAnalytics, incurred, alertStatus, replayStatus, canTransition, calendarMileage, projectClaims, integrationSources } from '../../src/insurance/data/outcomes.ts'
import { PROGRAMME } from '../../src/insurance/data/extensions.ts'
import { dateIST, round } from '../../src/insurance/data/model.ts'
const data = generateDataset(), base = defaultFilters(data), scope = createScope(data, base)
const trips = new Map(data.trips.map(t => [t.id, t])), vehicles = new Map(data.vehicles.map(v => [v.id, v])), drivers = new Map(data.drivers.map(d => [d.id, d])), routes = new Map(data.routes.map(r => [r.id, r])), events = new Map(data.events.map(e => [e.id, e])), cameras = new Map(data.cameras.map(c => [c.id, c])), assignments = new Map(data.assignments.map(a => [a.id, a]))
const close = (a, b, tolerance = 0.011) => assert.ok(Math.abs(a - b) < tolerance, `${a} differs from ${b}`)

test('fixed seed reproduces every record and a changed seed changes the dataset', () => {
  const digest = d => createHash('sha256').update(JSON.stringify(d)).digest('hex')
  assert.equal(digest(data), digest(generateDataset()))
  assert.notEqual(digest(data), digest(generateDataset(data.seed + 1)))
})
test('population, twelve-month coverage and unique entity primary keys', () => {
  assert.equal(data.drivers.length, 100); assert.equal(data.vehicles.length, 110)
  assert.equal(data.from, DEMO_FROM); assert.equal(data.to, DEMO_TO)
  assert.equal(new Set(data.trips.map(t => t.date)).size, 365)
  assert.ok(data.trips.length > 30000); assert.ok(data.telemetry.length > 200000)
  for (const [key, records] of Object.entries(data).filter(([, v]) => Array.isArray(v))) assert.equal(new Set(records.map(r => r.id)).size, records.length, `${key} IDs duplicated`)
})
test('trip, assignment and vehicle relationships reconcile', () => {
  for (const t of data.trips) {
    assert.ok(drivers.has(t.driverId)); assert.ok(vehicles.has(t.vehicleId)); assert.ok(routes.has(t.routeId))
    const a = assignments.get(t.assignmentId); assert.ok(a); assert.equal(a.tripId, t.id); assert.equal(a.driverId, t.driverId); assert.equal(a.vehicleId, t.vehicleId); assert.equal(a.start, t.start); assert.equal(a.end, t.end)
    assert.equal(dateIST(t.start), t.date); assert.equal(dateIST(t.end), t.date); assert.ok(t.date >= data.from && t.date <= data.to)
    assert.equal(vehicles.get(t.vehicleId).region, routes.get(t.routeId).region); assert.equal(drivers.get(t.driverId).region, routes.get(t.routeId).region)
    close((Date.parse(t.end) - Date.parse(t.start)) / 60000, t.durationMin)
    assert.ok(t.maxContinuousMin <= t.durationMin - t.breakMinutes); assert.ok(t.nightMinutes <= t.durationMin)
  }
})
test('no driver or vehicle is assigned to overlapping trips', () => {
  for (const key of ['driverId', 'vehicleId']) for (const list of groupBy(data.trips, t => t[key]).values()) { const ordered = [...list].sort((a, b) => a.start.localeCompare(b.start)); for (let i = 1; i < ordered.length; i++) assert.ok(ordered[i].start >= ordered[i - 1].end) }
})
test('GPS mileage, trip distance and odometers reconcile', () => {
  const gps = groupBy(data.telemetry, g => g.tripId)
  for (const t of data.trips) { const samples = gps.get(t.id); assert.equal(samples.length, 7); assert.equal(samples[0].timestamp, t.start); assert.equal(samples.at(-1).timestamp, t.end); assert.equal(samples[0].cumulativeKm, 0); close(samples.at(-1).cumulativeKm, t.distanceKm); close(t.odometerEnd - t.odometerStart, t.distanceKm); close(t.distanceKm, routes.get(t.routeId).distanceKm) }
  for (const [id, list] of groupBy(data.trips, t => t.vehicleId)) { const ordered = [...list].sort((a, b) => a.start.localeCompare(b.start)); close(ordered[0].odometerStart, vehicles.get(id).openingOdometer); for (let i = 1; i < ordered.length; i++) close(ordered[i].odometerStart, ordered[i - 1].odometerEnd); close(ordered.at(-1).odometerEnd - vehicles.get(id).openingOdometer, sum(ordered, t => t.distanceKm)) }
})
test('events, cameras, incidents and challans retain consistent foreign keys and chronology', () => {
  for (const e of data.events) { const t = trips.get(e.tripId); assert.ok(t); assert.ok(e.timestamp >= t.start && e.timestamp <= t.end); assert.ok(e.durationSec <= t.durationMin * 60); if (e.kind === 'Overspeeding') assert.ok(e.speedKph > e.speedLimit) }
  for (const c of data.cameras) { assert.ok(trips.has(c.tripId)); if (c.eventId) assert.equal(events.get(c.eventId).tripId, c.tripId); assert.ok(c.confidence >= 0 && c.confidence <= 1) }
  for (const i of data.incidents) { assert.equal(events.get(i.eventId).tripId, i.tripId); assert.equal(events.get(i.eventId).timestamp, i.timestamp); for (const id of i.cameraIds) assert.equal(cameras.get(id).eventId, i.eventId) }
  for (const c of data.challans) { const e = events.get(c.eventId), t = trips.get(e.tripId); assert.equal(c.vehicleId, t.vehicleId); assert.equal(c.driverId, t.driverId); assert.equal(c.date, t.date); assert.match(c.status, /simulated/); assert.ok(c.amount > 0) }
})
test('portfolio metrics reconcile to raw trips, driver groups and vehicle groups', () => {
  close(scope.metrics.km, sum(data.trips, t => t.distanceKm)); assert.equal(scope.metrics.trips, data.trips.length); assert.equal(scope.metrics.eventCount, data.events.length)
  close(sum([...scope.vehicleAnalytics.values()], a => a.metrics.km), scope.metrics.km)
  close(sum([...scope.driverAnalytics.values()], a => a.metrics.km), scope.metrics.km)
  assert.equal(sum([...scope.vehicleAnalytics.values()], a => a.metrics.trips), scope.metrics.trips)
  assert.equal(sum([...scope.driverAnalytics.values()], a => a.metrics.eventCount), scope.metrics.eventCount)
  assert.equal(scope.metrics.accidents, data.incidents.filter(i => i.status.startsWith('Verified')).length)
  assert.equal(scope.metrics.challans, data.challans.length)
  close(sum(series(data.trips), s => s.value), scope.metrics.km, 0.31)
})
test('IST date filtering includes boundaries and excludes all other trips', () => {
  assert.equal(dateIST('2026-05-01T20:00:00Z'), '2026-05-02')
  for (const date of [data.from, '2026-08-15', data.to]) { const s = createScope(data, { ...base, from: date, to: date }); assert.ok(s.trips.length); assert.ok(s.trips.every(t => t.date === date)); assert.equal(s.trips.length, data.trips.filter(t => t.date === date).length); const ids = new Set(s.trips.map(t => t.id)); assert.ok(s.events.every(e => ids.has(e.tripId))) }
})
test('region, vehicle category, vehicle and driver filters match raw records', () => {
  const queries = [{ region: 'Pune' }, { type: 'SUV' }, { vehicleId: data.vehicles[5].id }, { driverId: data.drivers[5].id }, { from: '2026-07-01', to: '2026-07-31', region: 'Mumbai', type: 'Sedan' }]
  for (const query of queries) { const f = { ...base, ...query }, s = createScope(data, f); const expected = data.trips.filter(t => { const v = vehicles.get(t.vehicleId); return t.date >= f.from && t.date <= f.to && (f.region === 'All' || v.region === f.region) && (f.type === 'All' || v.type === f.type) && (f.vehicleId === 'All' || v.id === f.vehicleId) && (f.driverId === 'All' || t.driverId === f.driverId) }); assert.equal(s.trips.length, expected.length); close(s.metrics.km, sum(expected, t => t.distanceKm)) }
})
test('risk filters select vehicle cohort consistently, including driver metrics', () => {
  for (const risk of ['Low', 'Medium', 'High']) { const s = createScope(data, { ...base, risk }), accepted = new Set([...scope.vehicleAnalytics].filter(([, a]) => a.risk.band === risk).map(([id]) => id)); assert.ok(s.trips.length); assert.ok(s.vehicles.every(v => accepted.has(v.id))); assert.equal(s.trips.length, data.trips.filter(t => accepted.has(t.vehicleId)).length); assert.equal(sum([...s.driverAnalytics.values()], a => a.metrics.trips), s.trips.length); assert.ok([...s.vehicleAnalytics.values()].every(a => a.risk.band === risk)) }
})
test('empty and incompatible filters have no invented scores or values', () => {
  const s = createScope(data, { ...base, vehicleId: data.vehicles[0].id, region: 'Dehradun' }); assert.equal(s.trips.length, 0); assert.equal(s.metrics.km, 0); assert.equal(s.averageRisk, 0); assert.equal(s.driverAnalytics.size, 0); assert.equal(calculateRisk(s.metrics).band, 'No data')
})
test('risk factors sum to the score and higher values mean higher risk', () => {
  for (const a of [...scope.vehicleAnalytics.values(), ...scope.driverAnalytics.values()]) { assert.equal(sum(a.risk.factors, f => f.max), 100); assert.equal(a.risk.score, round(sum(a.risk.factors, f => f.points))); close(a.risk.safety + a.risk.score, 100); assert.ok(a.risk.score >= 0 && a.risk.score <= 100); assert.equal(a.risk.band, a.risk.score >= 55 ? 'High' : a.risk.score >= 28 ? 'Medium' : 'Low') }
})
test('reducing driving events cannot increase the risk score', () => {
  for (const a of scope.vehicleAnalytics.values()) { const changed = simulate(a, { speed: 30, braking: 40, night: 50, drivers: a.metrics.uniqueDrivers, mileage: 100 }); assert.ok(changed.risk.score <= a.risk.score); assert.ok(changed.points >= a.reward.points); assert.equal(a.metrics.events.Overspeeding, a.events.filter(e => e.kind === 'Overspeeding').length) }
})
test('simulation reset restores score, rewards and factor breakdown', () => {
  for (const a of scope.vehicleAnalytics.values()) { const reset = simulate(a, { speed: 0, braking: 0, night: 0, drivers: a.metrics.uniqueDrivers, mileage: 100 }); assert.equal(reset.risk.score, a.risk.score); assert.equal(reset.points, a.reward.points); assert.deepEqual(reset.risk.factors, a.risk.factors) }
})
test('mileage and driver-count changes only affect the designated exposure factors', () => {
  const a = [...scope.vehicleAnalytics.values()][0], result = simulate(a, { speed: 0, braking: 0, night: 0, drivers: a.metrics.uniqueDrivers, mileage: 50 }); assert.ok(result.risk.score <= a.risk.score); for (const f of result.risk.factors.filter(f => f.key !== 'mileage')) assert.equal(f.points, a.risk.factors.find(g => g.key === f.key).points)
})
test('rewards reconcile with every earned and deducted ledger entry', () => {
  for (const a of scope.driverAnalytics.values()) { const r = rewards(a.trips, a.events, a.risk); assert.equal(r.earned, sum(r.ledger, l => l.earned)); assert.equal(r.deducted, sum(r.ledger, l => l.deducted)); assert.equal(r.points, Math.max(0, r.earned - r.deducted)); assert.equal(r.eligible, a.risk.safety >= 75 && a.trips.length >= 20 && r.points >= 100); for (const l of r.ledger) assert.equal(l.earned, Math.floor(trips.get(l.tripId).distanceKm / 5) + 5) }
})
test('multi-driver and multi-vehicle relationships are represented', () => {
  assert.ok([...scope.vehicleAnalytics.values()].some(a => a.metrics.uniqueDrivers === 5)); assert.ok([...scope.driverAnalytics.values()].some(a => new Set(a.trips.map(t => t.vehicleId)).size >= 5)); assert.ok(data.assignments.some(a => a.relationship === 'Family')); assert.ok(data.assignments.some(a => a.relationship === 'Owner'))
})
test('usage inference confidence is bounded and supporting camera observations exist', () => {
  const flagged = scope.vehicles.filter(v => v.registrationUse === 'Private' && scope.vehicleAnalytics.get(v.id)?.usage.classification === 'Commercial patterns'); assert.ok(flagged.length); assert.ok(flagged.some(v => scope.vehicleAnalytics.get(v.id).cameras.some(c => c.observation.includes('turnover')))); for (const a of scope.vehicleAnalytics.values()) { assert.ok(a.usage.confidence >= 0 && a.usage.confidence <= 1); assert.equal(a.usage.evidence.length, 4) }
})
test('OEM history is chronological, references mileage and detects overdue/recurring issues', () => {
  let overdue = 0, recurring = 0
  for (const v of data.vehicles) { const status = serviceStatus(data, v.id, data.to); if (status.overdue) overdue++; if (status.recurring) recurring++; assert.ok(status.history.every(s => s.date <= data.to && s.odometerKm <= status.odometer)); for (const s of status.history) assert.ok(s.nextDueKm > s.odometerKm) }
  assert.ok(overdue > 0); assert.ok(recurring > 0)
})
test('all ten demo scenarios have traceable records and intended evidence', () => {
  const list = scenarios(data, scope); assert.equal(list.length, 10); assert.equal(new Set(list.map(s => s.id)).size, 10)
  for (const s of list) { assert.ok(s.evidence.length >= 3); if (s.vehicleId) assert.ok(vehicles.has(s.vehicleId)); if (s.driverId) assert.ok(drivers.has(s.driverId)); if (s.incidentId) assert.ok(data.incidents.some(i => i.id === s.incidentId)) }
  const multi = list.find(s => s.id === 'multiple-drivers'); assert.equal(scope.vehicleAnalytics.get(multi.vehicleId).metrics.uniqueDrivers, 5)
  const commercial = list.find(s => s.id === 'commercial-misuse'); assert.equal(vehicles.get(commercial.vehicleId).registrationUse, 'Private'); assert.equal(scope.vehicleAnalytics.get(commercial.vehicleId).usage.classification, 'Commercial patterns')
})
test('ingestion adapters assemble exactly the same snapshot and support cancellation/errors', async () => {
  const adapters = demoAdapters(data); assert.ok(Object.values(adapters).every(a => a.mode === 'demo'))
  const result = await assembleDataset(adapters, { seed: data.seed, from: data.from, to: data.to, generatedAt: data.generatedAt }); assert.equal(result.trips, data.trips); assert.equal(result.services, data.services)
  const abort = new AbortController(); abort.abort(); await assert.rejects(() => assembleDataset(adapters, data, abort.signal))
  await assert.rejects(() => assembleDataset({ ...adapters, oem: { source: 'failure', mode: 'demo', read: async () => { throw new Error('Unavailable') } } }, data), /Unavailable/)
})
test('CSV escapes commas, quotes, newlines and spreadsheet formula prefixes', () => {
  const output = csv([{ id: '=HYPERLINK("x")', label: 'line\nwith, comma', amount: 10 }]); assert.ok(output.includes("'=HYPERLINK")); assert.ok(output.includes('"line\nwith, comma"')); assert.ok(output.includes('""x""')); assert.equal(csv([]), '')
})


test('driving hours exclude recorded breaks and night exposure excludes stops', () => {
  assert.equal(scope.metrics.minutes, sum(data.trips, t => t.durationMin - t.breakMinutes))
  assert.ok(data.trips.some(t => t.breakMinutes > 0))
  for (const t of data.trips) assert.ok(t.nightMinutes <= t.durationMin - t.breakMinutes)
})
test('employee assignments exist and two-wheelers have no cabin camera evidence', () => {
  assert.ok(data.assignments.some(a => a.relationship === 'Employee / third party'))
  for (const c of data.cameras.filter(c => c.view === 'Cabin')) assert.notEqual(vehicles.get(trips.get(c.tripId).vehicleId).type, 'Two-wheeler')
})


test('mock claims reconcile to policies, verified incidents, payments and reserves', () => {
  const policies = new Map(data.policies.map(p => [p.id, p])), incidents = new Map(data.incidents.map(i => [i.id, i]))
  assert.equal(data.policies.length, data.vehicles.length); assert.ok(data.claims.length > 0)
  for (const c of data.claims) {
    const p = policies.get(c.policyId), incident = incidents.get(c.incidentId), trip = trips.get(c.tripId)
    assert.equal(p.vehicleId, c.vehicleId); assert.equal(incident.tripId, c.tripId); assert.equal(trip.driverId, c.driverId)
    assert.equal(incident.status, 'Verified accident (simulated)'); assert.equal(c.lossDate, trip.date)
    assert.ok(c.reportedAt >= incident.timestamp); assert.equal(incurred(c), c.estimatedAmount)
    assert.ok(c.paidAmount >= 0 && c.outstandingReserve >= 0)
    if (c.settlementDate) { assert.ok(c.settlementDate >= c.lossDate && c.settlementDate <= data.to); assert.equal(c.outstandingReserve, 0) }
  }
})
test('claims metrics, exposure and cohort comparisons reconcile without assuming a reduction', () => {
  const c = claimsAnalytics(data, scope)
  assert.equal(c.claims.length, data.claims.length); assert.equal(c.incurred, sum(data.claims, incurred)); assert.equal(c.paid + c.reserve, c.incurred)
  close(c.frequency, data.claims.length / scope.metrics.km * 100000)
  close(c.earnedPremium, sum(data.policies, p => p.annualPremium))
  close(c.lossRatio, c.incurred / c.earnedPremium * 100)
  assert.equal(sum(c.cohorts, r => r.before.claims + r.after.claims), c.claims.length)
  close(sum(c.cohorts, r => r.before.km + r.after.km), scope.metrics.km)
  for (const r of c.cohorts) close(r.change, (r.after.frequency - r.before.frequency) / r.before.frequency * 100)
  assert.equal(sum(c.months, m => m.claims), c.claims.length)
  assert.equal(sum(c.months, m => m.incurred), c.incurred)
})
test('claims follow global filters and missing comparison periods return no percentage', () => {
  for (const changes of [{ region: 'Pune' }, { driverId: data.drivers[2].id }, { from: '2026-10-01', to: data.to }]) {
    const s = createScope(data, { ...base, ...changes }), c = claimsAnalytics(data, s), ids = new Set(s.trips.map(t => t.id))
    assert.equal(c.claims.length, data.claims.filter(claim => ids.has(claim.tripId)).length)
    if (changes.from) assert.ok(c.cohorts.every(r => r.before.frequency === null && r.change === null))
  }
})
test('all coaching records have preceding evidence and declared scenario assumptions', () => {
  assert.equal(data.interventions.length, 50); assert.equal(new Set(data.interventions.map(i => i.driverId)).size, 50)
  assert.equal(PROGRAMME.collisionReduction, 0.2)
  for (const i of data.interventions) {
    assert.ok(drivers.has(i.driverId)); assert.ok(i.completedDate < i.effectiveDate)
    for (const id of i.evidenceEventIds) { const e = events.get(id); assert.equal(trips.get(e.tripId).driverId, i.driverId); assert.ok(dateIST(e.timestamp) < i.effectiveDate) }
  }
})
test('claims planner exposes its assumption and preserves actual claim records', () => {
  const c = claimsAnalytics(data, scope), before = c.cohorts[0].before, km = c.cohorts[0].after.km
  const baseline = projectClaims(before, km, 0, 0), improved = projectClaims(before, km, 30, 25000)
  assert.equal(baseline.costWithout, baseline.costWith); assert.equal(baseline.netDifference, 0)
  close(improved.withProgramme, improved.withoutProgramme * 0.7); close(improved.netDifference, improved.grossDifference - 25000)
  assert.equal(projectClaims(before, 0, 20, 1000), null)
  assert.equal(data.claims.length, c.claims.length)
})
test('every mock alert has an eligible event and chronological lifecycle', () => {
  assert.ok(data.alerts.length > 10000)
  for (const a of data.alerts) {
    const e = events.get(a.eventId), t = trips.get(a.tripId)
    assert.equal(e.tripId, a.tripId); assert.equal(a.driverId, t.driverId); assert.equal(a.vehicleId, t.vehicleId)
    assert.equal(a.createdAt, e.timestamp); assert.ok(a.deliveredAt > a.createdAt)
    assert.ok(['Overspeeding', 'Phone use', 'Distraction', 'Red-light crossing'].includes(e.kind))
    if (a.acknowledgedAt) assert.ok(a.acknowledgedAt > a.deliveredAt)
    if (a.resolvedAt) { assert.ok(a.acknowledgedAt); assert.ok(a.resolvedAt > a.acknowledgedAt); assert.equal(alertStatus(a), 'Resolved') }
  }
})
test('replay transitions prevent acknowledgement before delivery and resolution before acknowledgement', () => {
  assert.equal(replayStatus(1, 4), null); assert.equal(replayStatus(1, 5), 'Queued'); assert.equal(replayStatus(1, 6), 'Delivered')
  assert.equal(canTransition('Queued', 'Acknowledged'), false); assert.equal(canTransition('Delivered', 'Resolved'), false)
  assert.equal(canTransition('Delivered', 'Acknowledged'), true); assert.equal(canTransition('Acknowledged', 'Resolved'), true)
  assert.equal(canTransition('Resolved', 'Resolved'), false); assert.equal(replayStatus(1, 8, 'Resolved'), 'Resolved')
})
test('camera analyses reference existing evidence and valid synthetic annotations', () => {
  const allIds = new Set([data.trips, data.events, data.cameras, data.routes, data.zones].flat().map(r => r.id))
  assert.equal(data.cameraAnalyses.length, data.cameras.length)
  for (const a of data.cameraAnalyses) {
    assert.equal(cameras.get(a.cameraId).tripId, a.tripId); assert.ok(a.findings.length)
    assert.ok(a.confidence >= 0 && a.confidence <= 1); assert.equal(a.source, 'Simulated inference')
    for (const f of a.findings) { assert.ok(f.evidenceIds.every(id => allIds.has(id))); if (f.box) { assert.ok(f.box.every(n => n >= 0 && n <= 1)); assert.ok(f.box[0] + f.box[2] <= 1); assert.ok(f.box[1] + f.box[3] <= 1) } }
  }
})
test('event coordinates and speeds reconcile with their timestamped GPS sample', () => {
  const gps = new Map(data.telemetry.map(g => [`${g.tripId}|${g.timestamp}`, g]))
  for (const e of data.events) { const sample = gps.get(`${e.tripId}|${e.timestamp}`); assert.ok(sample); assert.equal(sample.lat, e.lat); assert.equal(sample.lng, e.lng); assert.equal(sample.speedKph, e.speedKph) }
})
test('calendar-year totals reconcile and disclose partial years within the complete twelve-month snapshot', () => {
  const years = calendarMileage(data.trips, data.from, data.to)
  close(sum(years, y => y.km), scope.metrics.km); assert.equal(years.length, 2)
  assert.equal(years[0].from, '2025-11-01'); assert.equal(years[1].to, '2026-10-31')
  assert.ok(years.every(y => !y.completeCalendarYear))
})
test('mock source registry counts reconcile with adapter payloads', async () => {
  const adapters = demoAdapters(data)
  for (const source of integrationSources(data)) {
    const payload = await adapters[source.id].read()
    assert.equal(sum(Object.values(payload), records => records.length), source.records)
    assert.deepEqual(Object.keys(payload).sort(), [...source.keys].sort())
  }
})
