import { DAY, round } from './model.ts'
import type { Dataset, DemoAlert, DemoClaim, Trip } from './model.ts'
import type { Scope } from './analytics.ts'
import { groupBy, sum } from './analytics.ts'
import { PROGRAMME } from './extensions.ts'

export const alertStatus = (alert: DemoAlert) => alert.resolvedAt ? 'Resolved' : alert.acknowledgedAt ? 'Acknowledged' : 'Delivered'
export type ReplayStatus = 'Queued' | 'Delivered' | 'Acknowledged' | 'Resolved'
export function replayStatus(index: number, elapsed: number, action?: 'Acknowledged' | 'Resolved'): ReplayStatus | null {
  const arrival = index * 5
  if (elapsed < arrival) return null
  if (elapsed < arrival + 1) return 'Queued'
  return action || 'Delivered'
}
export function canTransition(from: ReplayStatus | null, to: 'Acknowledged' | 'Resolved') {
  return to === 'Acknowledged' ? from === 'Delivered' : from === 'Acknowledged'
}
export const incurred = (claim: DemoClaim) => claim.paidAmount + claim.outstandingReserve
export function outcomeSummary(trips: Trip[], claims: DemoClaim[]) {
  const km = sum(trips, t => t.distanceKm), cost = sum(claims, incurred)
  return { trips: trips.length, km: round(km, 2), claims: claims.length,
    paid: sum(claims, c => c.paidAmount), reserve: sum(claims, c => c.outstandingReserve), incurred: cost,
    frequency: km > 0 ? claims.length / km * 100000 : null,
    costPerThousandKm: km > 0 ? cost / km * 1000 : null,
    averageSeverity: claims.length ? cost / claims.length : null }
}
export function claimsAnalytics(data: Dataset, scope: Scope) {
  const tripIds = new Set(scope.trips.map(t => t.id)), claims = data.claims.filter(c => tripIds.has(c.tripId)), coached = new Set(data.interventions.map(i => i.driverId))
  const rows = (['Coached cohort', 'Comparison cohort'] as const).map(label => {
    const cohortTrips = scope.trips.filter(t => coached.has(t.driverId) === (label === 'Coached cohort'))
    const cohortClaims = claims.filter(c => coached.has(c.driverId) === (label === 'Coached cohort'))
    const before = outcomeSummary(cohortTrips.filter(t => t.date < PROGRAMME.effectiveDate), cohortClaims.filter(c => c.lossDate < PROGRAMME.effectiveDate))
    const after = outcomeSummary(cohortTrips.filter(t => t.date >= PROGRAMME.effectiveDate), cohortClaims.filter(c => c.lossDate >= PROGRAMME.effectiveDate))
    const change = before.frequency && after.frequency !== null ? (after.frequency - before.frequency) / before.frequency * 100 : null
    return { label, driverCount: new Set(cohortTrips.map(t => t.driverId)).size, before, after, change }
  })
  const selectedKm = groupBy(scope.trips, t => t.vehicleId)
  const allPeriodKm = groupBy(data.trips.filter(t => t.date >= scope.filters.from && t.date <= scope.filters.to), t => t.vehicleId)
  const earnedPremium = sum(data.policies.filter(p => scope.vehicles.some(v => v.id === p.vehicleId)), p => {
    const from = [p.startDate, scope.filters.from].sort().at(-1)!, to = [p.endDate, scope.filters.to].sort()[0]
    const days = Math.max(0, (Date.parse(to) - Date.parse(from)) / DAY + 1)
    const share = scope.filters.driverId === 'All' ? 1 : sum(selectedKm.get(p.vehicleId) || [], t => t.distanceKm) / Math.max(1, sum(allPeriodKm.get(p.vehicleId) || [], t => t.distanceKm))
    return p.annualPremium * days / 365 * share
  })
  const summary = outcomeSummary(scope.trips, claims)
  const months = [...groupBy(scope.trips, t => t.date.slice(0, 7))].sort(([a], [b]) => a.localeCompare(b)).map(([label, trips]) => ({ label, ...outcomeSummary(trips, claims.filter(c => c.lossDate.startsWith(label))) }))
  const difference = rows.every(r => r.before.frequency !== null && r.after.frequency !== null) ? (rows[0].after.frequency! - rows[0].before.frequency!) - (rows[1].after.frequency! - rows[1].before.frequency!) : null
  return { ...summary, claims, cohorts: rows, months, earnedPremium: round(earnedPremium, 2), lossRatio: earnedPremium ? summary.incurred / earnedPremium * 100 : null, difference }
}
export function calendarMileage(trips: Trip[], from: string, to: string) {
  return [...groupBy(trips, t => t.date.slice(0, 4))].sort(([a], [b]) => a.localeCompare(b)).map(([year, records]) => ({ year,
    from: [from, `${year}-01-01`].sort().at(-1)!, to: [to, `${year}-12-31`].sort()[0], km: round(sum(records, t => t.distanceKm), 2), trips: records.length,
    completeCalendarYear: from <= `${year}-01-01` && to >= `${year}-12-31` }))
}
export function integrationSources(data: Dataset) {
  return [
    { id: 'identity', title: 'Driver authentication', source: 'Mock identity adapter', keys: ['drivers', 'vehicles', 'assignments'] as const },
    { id: 'telematics', title: 'GPS, behaviour & alerts', source: 'Mock device adapter', keys: ['trips', 'telemetry', 'events', 'alerts'] as const },
    { id: 'camera', title: 'Camera analysis', source: 'Mock scene-analysis adapter', keys: ['cameras', 'cameraAnalyses', 'incidents'] as const },
    { id: 'geography', title: 'Road & terrain', source: 'Mock mapping adapter', keys: ['routes', 'zones'] as const },
    { id: 'oem', title: 'OEM service history', source: 'Mock OEM adapter', keys: ['services'] as const },
    { id: 'traffic', title: 'Official-record workflow', source: 'Mock traffic adapter', keys: ['challans'] as const },
    { id: 'insurance', title: 'Policies, claims & coaching', source: 'Mock insurer adapter', keys: ['policies', 'claims', 'interventions'] as const },
  ].map(s => ({ ...s, records: sum([...s.keys], key => data[key].length) }))
}

export function projectClaims(before: ReturnType<typeof outcomeSummary>, exposureKm: number, reductionPercent: number, programmeCost: number) {
  if (before.frequency === null || before.averageSeverity === null || exposureKm <= 0) return null
  const reduction = Math.min(100, Math.max(0, reductionPercent)) / 100
  const withoutProgramme = before.frequency * exposureKm / 100000
  const withProgramme = withoutProgramme * (1 - reduction)
  const costWithout = withoutProgramme * before.averageSeverity, costWith = withProgramme * before.averageSeverity
  return { withoutProgramme, withProgramme, costWithout, costWith, grossDifference: costWithout - costWith, programmeCost, netDifference: costWithout - costWith - programmeCost }
}
