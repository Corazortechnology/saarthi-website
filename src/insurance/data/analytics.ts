import { DAY, EVENT_KINDS, round } from './model.ts'
import type { Dataset, Filters, Metrics, RiskProfile, RiskFactor, UsageInference, Trip, BehaviourEvent, CameraEvent, Incident, Challan, Vehicle, Driver, RewardEntry } from './model.ts'
export const defaultFilters = (data: Dataset): Filters => ({ from: data.from, to: data.to, region: 'All', type: 'All', risk: 'All', vehicleId: 'All', driverId: 'All' })
export function groupBy<T>(records: T[], key: (item: T) => string): Map<string, T[]> {
  const result = new Map<string, T[]>()
  records.forEach(item => { const k = key(item); if (!result.has(k)) result.set(k, []); result.get(k)!.push(item) })
  return result
}
export const sum = <T,>(records: T[], fn: (r: T) => number) => records.reduce((s, r) => s + fn(r), 0)
export const daysBetween = (from: string, to: string) => Math.max(1, Math.round((Date.parse(to) - Date.parse(from)) / DAY) + 1)
export function calculateMetrics(data: Dataset, trips: Trip[], events: BehaviourEvent[], incidents: Incident[], challans: Challan[], from: string, to: string): Metrics {
  const routes = new Map(data.routes.map(r => [r.id, r])), zones = new Map(data.zones.map(z => [z.id, z]))
  const km = sum(trips, t => t.distanceKm), eventCounts = Object.fromEntries(EVENT_KINDS.map(k => [k, 0])) as Metrics['events']
  events.forEach(e => eventCounts[e.kind]++)
  let driverChanges = 0
  for (const vehicleTrips of groupBy(trips, t => t.vehicleId).values()) {
    const ordered = [...vehicleTrips].sort((a, b) => a.start.localeCompare(b.start))
    for (let i = 1; i < ordered.length; i++) if (ordered[i].driverId !== ordered[i - 1].driverId) driverChanges++
  }
  return { trips: trips.length, km: round(km, 2), minutes: sum(trips, t => t.durationMin - t.breakMinutes), nightMinutes: sum(trips, t => t.nightMinutes), maxContinuousMin: trips.reduce((m, t) => Math.max(m, t.maxContinuousMin), 0), uniqueDrivers: new Set(trips.map(t => t.driverId)).size, driverChanges, activeDays: new Set(trips.map(t => t.date)).size, annualizedKm: round(km * 365 / daysBetween(from, to)), events: eventCounts, eventCount: events.length, speedSeconds: sum(events.filter(e => e.kind === 'Overspeeding'), e => e.durationSec), accidents: incidents.filter(i => i.status === 'Verified accident (simulated)').length, incidents: incidents.length, challans: challans.length, geoExposure: km ? sum(trips, t => { const r = routes.get(t.routeId)!; return t.distanceKm * (zones.get(r.zoneId)?.risk || 0) }) / km : 0, roadExposure: km ? sum(trips, t => t.distanceKm * (['Hilly', 'Mountainous', 'Uneven'].includes(routes.get(t.routeId)!.terrain) ? 1 : 0)) / km : 0 }
}
export function usageInference(metrics: Metrics, cameras: CameraEvent[], trips: Trip[]): UsageInference {
  if (trips.length < 5 || metrics.activeDays < 3) return { classification: 'Insufficient data', confidence: 0, evidence: ['At least five trips across three active days are required.'] }
  const turnover = cameras.filter(c => c.observation === 'Repeated passenger turnover candidate').length
  const tripsPerDay = metrics.trips / metrics.activeDays, hoursPerDay = metrics.minutes / 60 / metrics.activeDays
  const repeated = Math.max(...[...groupBy(trips, t => t.routeId).values()].map(a => a.length)) / trips.length
  const signals = [tripsPerDay >= 3.5, turnover / trips.length >= 0.2, hoursPerDay >= 4, repeated >= 0.45 && tripsPerDay >= 3]
  const hits = signals.filter(Boolean).length, commercial = hits >= 2
  return { classification: commercial ? 'Commercial patterns' : 'Personal patterns', confidence: round(Math.min(0.96, 0.55 + (commercial ? hits : 4 - hits) * 0.09), 2), evidence: [`${round(tripsPerDay)} trips per active day`, `${turnover} simulated passenger-turnover observations (${round(turnover / trips.length * 100)}% of trips)`, `${round(hoursPerDay)} operating hours per active day`, `${round(repeated * 100)}% on the most repeated route`] }
}
export function calculateRisk(m: Metrics, usage?: UsageInference): RiskProfile {
  if (!m.trips) return { score: 0, safety: 0, band: 'No data', factors: [], observed: false }
  const rate = (n: number) => n / Math.max(100, m.km) * 1000
  const factor = (key: string, label: string, max: number, fraction: number, evidence: string): RiskFactor => ({ key, label, max, points: round(Math.min(max, Math.max(0, fraction * max)), 2), evidence })
  const factors = [
    factor('speed', 'Overspeeding', 18, rate(m.events.Overspeeding) / 10, `${m.events.Overspeeding} events · ${round(rate(m.events.Overspeeding), 2)} / 1,000 km`),
    factor('braking', 'Harsh braking', 10, rate(m.events['Harsh braking']) / 9, `${m.events['Harsh braking']} braking events`),
    factor('acceleration', 'Aggressive manoeuvres', 8, rate(m.events['Harsh acceleration'] + m.events['Sharp turn']) / 14, `${m.events['Harsh acceleration']} acceleration · ${m.events['Sharp turn']} sharp turns`),
    factor('distraction', 'Driver distraction', 14, rate(m.events['Phone use'] + m.events.Distraction) / 12, `${m.events['Phone use']} phone · ${m.events.Distraction} attention events`),
    factor('night', 'Night-time exposure', 7, m.nightMinutes / Math.max(1, m.minutes) / 0.35, `${round(m.nightMinutes / Math.max(1, m.minutes) * 100)}% of driving time (22:00–06:00 IST)`),
    factor('accidents', 'Accident history', 13, m.accidents / Math.max(1000, m.km) * 10000 / 2, `${m.accidents} simulated verified accidents; unverified triggers excluded`),
    factor('violations', 'Traffic violations', 8, (rate(m.events['Red-light crossing']) + rate(m.events['Seat-belt / helmet']) + rate(m.challans)) / 8, `${m.events['Red-light crossing']} red-light · ${m.events['Seat-belt / helmet']} restraint / helmet detections · ${m.challans} simulated challans`),
    factor('drivers', 'Driver changes', 5, m.driverChanges / Math.max(1, m.trips - 1) / 0.5, `${m.uniqueDrivers} drivers · ${m.driverChanges} sequential changes`),
    factor('mileage', 'Annual mileage exposure', 6, Math.max(0, m.annualizedKm - 10000) / 60000, `${Math.round(m.annualizedKm).toLocaleString('en-IN')} km annualised from selected dates`),
    factor('geography', 'Geographical exposure', 5, m.geoExposure, `${round(m.geoExposure * 100)}% distance-weighted zone risk index`),
    factor('terrain', 'Road and terrain', 3, m.roadExposure, `${round(m.roadExposure * 100)}% of distance on hilly, mountainous or uneven roads`),
    factor('usage', 'Commercial usage signals', 3, usage?.classification === 'Commercial patterns' ? usage.confidence : 0, usage ? `${usage.classification} · ${Math.round(usage.confidence * 100)}% confidence` : 'No usage inference')
  ]
  const score = round(sum(factors, f => f.points), 1)
  return { score, safety: round(100 - score), band: score >= 55 ? 'High' : score >= 28 ? 'Medium' : 'Low', factors, observed: true }
}
export const PENALTIES: Record<string, number> = { Overspeeding: 5, 'Harsh braking': 3, 'Harsh acceleration': 3, 'Sharp turn': 3, 'Phone use': 8, Distraction: 6, 'Red-light crossing': 10, 'Seat-belt / helmet': 6, 'Collision signal': 0 }
export function rewards(trips: Trip[], events: BehaviourEvent[], risk: RiskProfile) {
  const byTrip = groupBy(events, e => e.tripId)
  const ledger: RewardEntry[] = [...trips].sort((a, b) => a.start.localeCompare(b.start)).map(t => ({ tripId: t.id, date: t.date, earned: Math.floor(t.distanceKm / 5) + 5, deducted: sum(byTrip.get(t.id) || [], e => PENALTIES[e.kind]) }))
  const earned = sum(ledger, e => e.earned), deducted = sum(ledger, e => e.deducted), points = Math.max(0, earned - deducted)
  let streak = 0
  for (const entry of [...ledger].reverse()) { if (entry.deducted > 0) break; streak++ }
  return { ledger, earned, deducted, points, streak, eligible: risk.observed && risk.safety >= 75 && trips.length >= 20 && points >= 100, tier: risk.safety >= 90 ? 'Gold' : risk.safety >= 75 ? 'Silver' : 'Building' }
}
export interface EntityAnalytics { metrics: Metrics; risk: RiskProfile; usage: UsageInference; trips: Trip[]; events: BehaviourEvent[]; cameras: CameraEvent[]; incidents: Incident[]; challans: Challan[]; reward: ReturnType<typeof rewards> }
export interface Scope { filters: Filters; vehicles: Vehicle[]; drivers: Driver[]; trips: Trip[]; events: BehaviourEvent[]; cameras: CameraEvent[]; incidents: Incident[]; challans: Challan[]; vehicleAnalytics: Map<string, EntityAnalytics>; driverAnalytics: Map<string, EntityAnalytics>; metrics: Metrics; averageRisk: number; safePercent: number }
export function createScope(data: Dataset, filters: Filters): Scope {
  let vehicles = data.vehicles.filter(v => (filters.region === 'All' || v.region === filters.region) && (filters.type === 'All' || v.type === filters.type) && (filters.vehicleId === 'All' || v.id === filters.vehicleId))
  const vehicleIds = new Set(vehicles.map(v => v.id))
  let trips = data.trips.filter(t => vehicleIds.has(t.vehicleId) && t.date >= filters.from && t.date <= filters.to && (filters.driverId === 'All' || t.driverId === filters.driverId))
  const tripIds = new Set(trips.map(t => t.id)), tripMap = new Map(trips.map(t => [t.id, t]))
  let events = data.events.filter(e => tripIds.has(e.tripId)), cameras = data.cameras.filter(c => tripIds.has(c.tripId)), incidents = data.incidents.filter(i => tripIds.has(i.tripId))
  const eventIds = new Set(events.map(e => e.id)); let challans = data.challans.filter(c => eventIds.has(c.eventId))
  const build = (kind: 'vehicleId' | 'driverId') => {
    const tg = groupBy(trips, t => t[kind]), eg = groupBy(events, e => tripMap.get(e.tripId)![kind]), cg = groupBy(cameras, c => tripMap.get(c.tripId)![kind]), ig = groupBy(incidents, i => tripMap.get(i.tripId)![kind]), chg = groupBy(challans, c => c[kind])
    const result = new Map<string, EntityAnalytics>()
    for (const [key, entityTrips] of tg) {
      const entityEvents = eg.get(key) || [], entityCameras = cg.get(key) || [], entityIncidents = ig.get(key) || [], entityChallans = chg.get(key) || []
      const metrics = calculateMetrics(data, entityTrips, entityEvents, entityIncidents, entityChallans, filters.from, filters.to)
      const usage = usageInference(metrics, entityCameras, entityTrips), risk = calculateRisk(metrics, usage)
      result.set(key, { metrics, usage, risk, trips: entityTrips, events: entityEvents, cameras: entityCameras, incidents: entityIncidents, challans: entityChallans, reward: rewards(entityTrips, entityEvents, risk) })
    }
    return result
  }
  let vehicleAnalytics = build('vehicleId')
  if (filters.risk !== 'All') {
    vehicles = vehicles.filter(v => vehicleAnalytics.get(v.id)?.risk.band === filters.risk)
    const accepted = new Set(vehicles.map(v => v.id)); trips = trips.filter(t => accepted.has(t.vehicleId))
    const acceptedTrips = new Set(trips.map(t => t.id)); events = events.filter(e => acceptedTrips.has(e.tripId)); cameras = cameras.filter(c => acceptedTrips.has(c.tripId)); incidents = incidents.filter(i => acceptedTrips.has(i.tripId)); challans = challans.filter(c => accepted.has(c.vehicleId))
    vehicleAnalytics = new Map([...vehicleAnalytics].filter(([key]) => accepted.has(key)))
  }
  if (filters.driverId !== 'All') vehicles = vehicles.filter(v => vehicleAnalytics.has(v.id))
  const driverAnalytics = build('driverId'), driverIds = new Set(trips.map(t => t.driverId)), drivers = data.drivers.filter(d => driverIds.has(d.id))
  const metrics = calculateMetrics(data, trips, events, incidents, challans, filters.from, filters.to)
  return { filters, vehicles, drivers, trips, events, cameras, incidents, challans, vehicleAnalytics, driverAnalytics, metrics, averageRisk: round(sum([...vehicleAnalytics.values()], a => a.risk.score) / Math.max(1, vehicleAnalytics.size)), safePercent: round([...driverAnalytics.values()].filter(a => a.risk.band === 'Low').length / Math.max(1, drivers.length) * 100) }
}
export function series(trips: Trip[], period: 'month' | 'day' = 'month', measure: 'km' | 'trips' | 'minutes' = 'km') {
  return [...groupBy(trips, t => t.date.slice(0, period === 'month' ? 7 : 10))].sort(([a], [b]) => a.localeCompare(b)).map(([label, records]) => ({ label, value: round(measure === 'trips' ? records.length : sum(records, t => measure === 'minutes' ? t.durationMin : t.distanceKm)) }))
}
export function serviceStatus(data: Dataset, vehicleId: string, asOf: string) {
  const history = data.services.filter(s => s.vehicleId === vehicleId && s.date <= asOf).sort((a, b) => a.date.localeCompare(b.date)), latest = history.at(-1)
  const trip = data.trips.filter(t => t.vehicleId === vehicleId && t.date <= asOf).at(-1), vehicle = data.vehicles.find(v => v.id === vehicleId)!
  const odometer = trip?.odometerEnd ?? vehicle.openingOdometer
  return { history, latest, odometer, overdue: !!latest && (latest.nextDueDate < asOf || latest.nextDueKm < odometer), recurring: history.filter(s => s.repairs.includes('Recurring brake-pad wear')).length >= 2 }
}
export interface Recommendation { vehicleId: string; title: string; priority: 'High' | 'Medium' | 'Opportunity'; evidence: string; action: string }
export function recommendations(data: Dataset, scope: Scope): Recommendation[] {
  const result: Recommendation[] = []
  for (const v of scope.vehicles) {
    const a = scope.vehicleAnalytics.get(v.id); if (!a) continue
    if (a.risk.band === 'High') result.push({ vehicleId: v.id, title: 'Additional underwriting review', priority: 'High', evidence: `Risk ${a.risk.score}/100; ${a.metrics.eventCount} events across ${a.metrics.km} km`, action: 'Review exposure and evidence with an underwriter.' })
    if (v.registrationUse === 'Private' && a.usage.classification === 'Commercial patterns') result.push({ vehicleId: v.id, title: 'Clarify declared vehicle usage', priority: 'High', evidence: `${Math.round(a.usage.confidence * 100)}% confidence; ${a.usage.evidence.join('; ')}`, action: 'Request policyholder clarification; inference is not proof of misuse.' })
    if (a.metrics.annualizedKm > 50000) result.push({ vehicleId: v.id, title: 'High mileage exposure', priority: 'Medium', evidence: `${Math.round(a.metrics.annualizedKm)} km annualised from ${a.metrics.km} observed km`, action: 'Confirm expected annual usage and monitor exposure.' })
    if (a.metrics.accidents >= 2) result.push({ vehicleId: v.id, title: 'Recurring accident review', priority: 'High', evidence: `${a.metrics.accidents} simulated verified accidents in the selected period`, action: 'Inspect incident evidence and route conditions.' })
    const service = serviceStatus(data, v.id, scope.filters.to)
    if (service.overdue || service.recurring) result.push({ vehicleId: v.id, title: service.overdue ? 'Service overdue' : 'Recurring maintenance issue', priority: 'Medium', evidence: `Odometer ${Math.round(service.odometer)} km; next service ${service.latest?.nextDueDate} / ${Math.round(service.latest?.nextDueKm || 0)} km`, action: 'Arrange inspection and request an updated service record.' })
    if (a.metrics.events['Phone use'] + a.metrics.events.Distraction > 10) result.push({ vehicleId: v.id, title: 'Driver attention coaching', priority: 'Medium', evidence: `${a.metrics.events['Phone use']} phone-use and ${a.metrics.events.Distraction} distraction detections`, action: 'Offer targeted driver coaching and review subsequent event rates.' })
    if (a.reward.eligible) result.push({ vehicleId: v.id, title: 'Safe-driving incentive opportunity', priority: 'Opportunity', evidence: `Safety ${a.risk.safety}/100; ${a.reward.points} demo points`, action: 'Consider an opt-in incentive programme; no premium benefit is guaranteed.' })
  }
  const order = { High: 0, Medium: 1, Opportunity: 2 }
  return result.sort((a, b) => order[a.priority] - order[b.priority])
}
export function simulate(a: EntityAnalytics, changes: { speed: number; braking: number; night: number; drivers: number; mileage: number }) {
  const m: Metrics = { ...a.metrics, events: { ...a.metrics.events }, annualizedKm: a.metrics.annualizedKm * changes.mileage / 100, uniqueDrivers: changes.drivers, driverChanges: Math.round(a.metrics.driverChanges * Math.max(0, changes.drivers - 1) / Math.max(1, a.metrics.uniqueDrivers - 1)) }
  // Mileage is a prospective annual exposure change; the observed denominator remains fixed.
  m.events.Overspeeding = Math.round(m.events.Overspeeding * (1 - changes.speed / 100)); m.events['Harsh braking'] = Math.round(m.events['Harsh braking'] * (1 - changes.braking / 100)); m.nightMinutes *= 1 - changes.night / 100
  if (changes.drivers > a.metrics.uniqueDrivers && !a.metrics.driverChanges) m.driverChanges = Math.min(m.trips - 1, Math.round((changes.drivers - 1) / changes.drivers * m.trips))
  const risk = calculateRisk(m, a.usage), recovered = (a.metrics.events.Overspeeding - m.events.Overspeeding) * PENALTIES.Overspeeding + (a.metrics.events['Harsh braking'] - m.events['Harsh braking']) * PENALTIES['Harsh braking']
  return { risk, metrics: m, points: Math.max(0, a.reward.earned - a.reward.deducted + recovered) }
}
export function csv(rows: Record<string, unknown>[]) {
  if (!rows.length) return ''
  const keys = Object.keys(rows[0]), cell = (value: unknown) => { let s = String(value ?? ''); if (/^[=+@\-]/.test(s)) s = `'${s}`; return `"${s.replaceAll('"', '""')}"` }
  return [keys.map(cell).join(','), ...rows.map(r => keys.map(k => cell(r[k])).join(','))].join('\r\n')
}
