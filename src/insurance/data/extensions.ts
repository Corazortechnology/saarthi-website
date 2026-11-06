import { DAY, dateIST, round } from './model.ts'
import type { Dataset, CameraFinding } from './model.ts'

// Explicit scenario inputs, not fitted estimates or observed effectiveness.
export const PROGRAMME = {
  effectiveDate: '2026-05-01', completedDate: '2026-04-30',
  speedingReduction: 0.25, brakingReduction: 0.15, distractionReduction: 0.35,
  collisionReduction: 0.20, participantCount: 50,
} as const
export function fraction(key: string, seed: number) {
  let n = seed >>> 0
  for (let i = 0; i < key.length; i++) n = Math.imul(n ^ key.charCodeAt(i), 16777619) >>> 0
  n ^= n >>> 16; n = Math.imul(n, 0x45d9f3b); n ^= n >>> 16
  return (n >>> 0) / 4294967296
}
export function prepareProgramme(data: Dataset) {
  data.interventions = [...data.drivers].sort((a, b) => fraction(a.id, data.seed) - fraction(b.id, data.seed)).slice(0, PROGRAMME.participantCount).map((driver, i) => ({
    id: `INT-${String(i + 1).padStart(5, '0')}`, driverId: driver.id,
    programme: 'Attention, speed and following-distance coaching', completedDate: PROGRAMME.completedDate,
    effectiveDate: PROGRAMME.effectiveDate, evidenceEventIds: [], status: 'Completed (simulated)', source: 'Simulated external record',
  }))
}
export function enrichDataset(data: Dataset) {
  // Events at the same sampled position share the recorded speed. Sparse GPS
  // samples are reconciled with the generated sensor peaks, including overspeeding.
  const peaks = new Map<string, number>()
  for (const e of data.events) { const key = `${e.tripId}|${e.timestamp}`; peaks.set(key, Math.max(peaks.get(key) || 0, e.speedKph)) }
  for (const e of data.events) e.speedKph = peaks.get(`${e.tripId}|${e.timestamp}`)!
  for (const g of data.telemetry) { const peak = peaks.get(`${g.tripId}|${g.timestamp}`); if (peak !== undefined) g.speedKph = peak }
  const tripMap = new Map(data.trips.map(t => [t.id, t])), eventMap = new Map(data.events.map(e => [e.id, e]))
  const byTrip = new Map<string, typeof data.events>()
  for (const e of data.events) { const list = byTrip.get(e.tripId) || []; list.push(e); byTrip.set(e.tripId, list) }
  const routeMap = new Map(data.routes.map(r => [r.id, r])), zoneMap = new Map(data.zones.map(z => [z.id, z]))
  for (const intervention of data.interventions) intervention.evidenceEventIds = data.events.filter(e => tripMap.get(e.tripId)!.driverId === intervention.driverId && dateIST(e.timestamp) < intervention.effectiveDate).slice(-8).map(e => e.id)
  data.policies = data.vehicles.map((v, i) => ({ id: `POL-${String(i + 1).padStart(5, '0')}`, vehicleId: v.id, startDate: data.from, endDate: data.to,
    annualPremium: Math.round(({ Hatchback: 12000, Sedan: 16000, SUV: 24000, Commercial: 30000, 'Two-wheeler': 2500 }[v.type]) * (0.9 + fraction(v.id, data.seed + 1) * 0.2)), currency: 'INR', source: 'Simulated external record' }))
  const policies = new Map(data.policies.map(p => [p.vehicleId, p]))
  data.claims = data.incidents.filter(i => i.status === 'Verified accident (simulated)' && fraction(i.id, data.seed + 2) > 0.12).map((incident, i) => {
    const trip = tripMap.get(incident.tripId)!, lossDate = dateIST(incident.timestamp), age = Math.floor((Date.parse(data.to) - Date.parse(lossDate)) / DAY)
    const vehicle = data.vehicles.find(v => v.id === trip.vehicleId)!, amount = Math.round(({ Low: 10000, Moderate: 45000, Severe: 180000 }[incident.severity]) * (vehicle.type === 'Two-wheeler' ? 0.25 : vehicle.type === 'Commercial' ? 1.4 : 1) * (0.75 + fraction(incident.id, data.seed + 3) * 0.5))
    const settled = age >= 28, paid = settled ? amount : age >= 10 ? Math.round(amount * 0.2) : 0
    return { id: `CLM-${String(i + 1).padStart(5, '0')}`, policyId: policies.get(trip.vehicleId)!.id, incidentId: incident.id, tripId: trip.id, vehicleId: trip.vehicleId, driverId: trip.driverId,
      lossDate, reportedAt: new Date(Date.parse(incident.timestamp) + 30 * 60000).toISOString(), settlementDate: settled ? new Date(Date.parse(lossDate) + 28 * DAY).toISOString().slice(0, 10) : undefined,
      status: settled ? 'Settled (simulated)' as const : 'Under review (simulated)' as const, estimatedAmount: amount, paidAmount: paid, outstandingReserve: amount - paid, source: 'Simulated external record' as const }
  })
  data.alerts = data.events.filter(e => e.kind === 'Overspeeding' && e.speedKph > e.speedLimit && e.durationSec >= 10 || ['Phone use', 'Distraction'].includes(e.kind) && e.durationSec >= 5 || e.kind === 'Red-light crossing').map((e, i) => {
    const trip = tripMap.get(e.tripId)!, delivery = Date.parse(e.timestamp) + 2000, acknowledged = i % 4 !== 0, resolved = i % 4 === 1 || i % 4 === 2
    return { id: `ALT-${String(i + 1).padStart(5, '0')}`, eventId: e.id, tripId: e.tripId, driverId: trip.driverId, vehicleId: trip.vehicleId,
      createdAt: e.timestamp, deliveredAt: new Date(delivery).toISOString(), acknowledgedAt: acknowledged ? new Date(delivery + 8000).toISOString() : undefined,
      resolvedAt: resolved ? new Date(delivery + 20000).toISOString() : undefined, channel: 'Demo driver app + fleet console' as const,
      message: e.kind === 'Overspeeding' ? `${e.speedKph} km/h exceeds the ${e.speedLimit} km/h limit. Reduce speed safely.` : e.kind === 'Red-light crossing' ? 'Potential red-light crossing detected. Review junction evidence.' : 'Attention warning. Focus on the road; stop safely before using your phone.',
      resolution: e.kind === 'Overspeeding' ? 'Driver slowed below the limit (scripted response)' : e.kind === 'Red-light crossing' ? 'Fleet review completed (scripted response)' : 'Driver stopped safely / attention restored (scripted response)', source: 'Simulated observation' as const }
  })
  data.cameraAnalyses = data.cameras.map((camera, i) => {
    const trip = tripMap.get(camera.tripId)!, event = camera.eventId ? eventMap.get(camera.eventId) : undefined, route = routeMap.get(trip.routeId)!, zone = zoneMap.get(route.zoneId)!
    const findings: CameraFinding[] = []
    const task = camera.view === 'Cabin' ? camera.observation.includes('turnover') ? 'Usage classification' : 'Driver attention' : 'Incident context'
    if (task === 'Usage classification') findings.push({ label: 'Passenger change between stops', confidence: camera.confidence, evidenceIds: [camera.id, trip.id], box: [0.61, 0.19, 0.24, 0.61] })
    else if (task === 'Driver attention') findings.push({ label: event?.kind === 'Phone use' ? 'Phone near driver hand' : 'Gaze away from road', confidence: camera.confidence, evidenceIds: [camera.id, ...(camera.eventId ? [camera.eventId] : [])], box: event?.kind === 'Phone use' ? [0.42, 0.45, 0.10, 0.30] : [0.28, 0.22, 0.17, 0.36] })
    else {
      findings.push({ label: camera.view === 'Rear' ? 'Rear proximity candidate' : event?.kind === 'Red-light crossing' ? 'Signal crossing candidate' : 'Vehicle / obstruction candidate', confidence: camera.confidence, evidenceIds: [camera.id, ...(camera.eventId ? [camera.eventId] : [])], box: [0.52, 0.55, 0.20, 0.32] })
      const related = (byTrip.get(trip.id) || []).filter(e => e.timestamp <= camera.timestamp && ['Overspeeding', 'Harsh braking', 'Phone use', 'Distraction'].includes(e.kind))
      for (const e of related) findings.push({ label: `${e.kind} in the preceding trip record`, confidence: 0.9, evidenceIds: [e.id] })
      if (zone.risk >= 0.7) findings.push({ label: `${route.terrain} / ${zone.reason}`, confidence: 0.75, evidenceIds: [route.id, zone.id] })
    }
    return { id: `ANA-${String(i + 1).padStart(5, '0')}`, cameraId: camera.id, tripId: trip.id, eventId: camera.eventId, timestamp: camera.timestamp, task,
      findings, conclusion: task === 'Usage classification' ? 'Passenger turnover may support commercial-use review when combined with repeated trip patterns.' : task === 'Driver attention' ? 'Attention loss candidate; alert and coaching review suggested.' : 'Potential incident context identified. Causation and liability require review.',
      confidence: round(Math.min(...findings.map(f => f.confidence)), 2), model: 'Scripted scene analysis v1' as const, source: 'Simulated inference' as const }
  })
  const analyses = new Map(data.cameraAnalyses.map(a => [a.cameraId, a]))
  for (const incident of data.incidents) incident.potentialFactors = [...new Set(incident.cameraIds.flatMap(id => analyses.get(id)?.findings.map(f => f.label) || []))]
  return data
}
