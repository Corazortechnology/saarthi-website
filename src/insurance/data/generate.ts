import { DAY, EVENT_KINDS, REGIONS, VEHICLE_TYPES, round } from './model.ts'
import { enrichDataset, prepareProgramme, PROGRAMME } from './extensions.ts'
import type { Dataset, EventKind, Point, Region, Road, Terrain } from './model.ts'

export const DEMO_SEED = 20261105
export const DEMO_FROM = '2025-11-01'
export const DEMO_TO = '2026-10-31'
export function randomGenerator(seed: number) {
  let state = seed >>> 0
  return () => { state += 0x6D2B79F5; let t = state; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296 }
}
export function distance(a: Point, b: Point) {
  const rad = Math.PI / 180, x = Math.sin((b.lat - a.lat) * rad / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin((b.lng - a.lng) * rad / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}
const cities: Record<Region, Point> = { Mumbai: { lat: 19.076, lng: 72.878 }, 'Delhi NCR': { lat: 28.614, lng: 77.209 }, Bengaluru: { lat: 12.972, lng: 77.595 }, Pune: { lat: 18.52, lng: 73.857 }, Jaipur: { lat: 26.912, lng: 75.787 }, Dehradun: { lat: 30.317, lng: 78.032 } }
const roads: Road[] = ['Urban', 'Highway', 'Residential', 'Industrial', 'Rural', 'Highway']
const routeNames = ['City connector', 'Expressway corridor', 'Neighbourhood loop', 'Logistics corridor', 'Outer district road', 'Regional highway']
const firstNames = ['Aarav', 'Meera', 'Rohan', 'Ananya', 'Vikram', 'Kavya', 'Arjun', 'Ishita', 'Kabir', 'Nisha', 'Dev', 'Priya', 'Aditya', 'Sneha', 'Rahul', 'Tara', 'Kunal', 'Diya', 'Siddharth', 'Neha']
const initials = ['S.', 'K.', 'R.', 'M.', 'P.']
const personas = ['Safe driver', 'Commercial patterns', 'Aggressive driver', 'High mileage', 'Distracted driver', 'Family sharing', 'Night driver', 'Highway driver', 'Frequent violations', 'Driver switching', 'Urban commuter', 'Responsible driver']
const models = ['Maruti Baleno', 'Honda City', 'Hyundai Creta', 'Tata Ace', 'TVS Jupiter']
const id = (prefix: string, n: number) => `${prefix}-${String(n + 1).padStart(5, '0')}`

export function generateDataset(seed = DEMO_SEED): Dataset {
  const rand = randomGenerator(seed), pick = <T,>(a: T[]) => a[Math.floor(rand() * a.length)]
  const data: Dataset = { seed, from: DEMO_FROM, to: DEMO_TO, generatedAt: '2026-11-01T00:00:00+05:30', drivers: [], vehicles: [], zones: [], routes: [], assignments: [], trips: [], telemetry: [], events: [], cameras: [], incidents: [], services: [], challans: [], interventions: [], policies: [], claims: [], alerts: [], cameraAnalyses: [] }
  for (let i = 0; i < 100; i++) {
    const region = REGIONS[Math.floor(i / 5) % 6], name = `${firstNames[i % 20]} ${initials[Math.floor(i / 20)]}`
    data.drivers.push({ id: id('DRV', i), name, region, persona: personas[i % personas.length], experienceYears: 2 + Math.floor(rand() * 20), avatar: name[0] + name.split(' ')[1][0] })
  }
  for (let i = 0; i < 110; i++) {
    const owner = data.drivers[i < 105 ? i % 100 : i - 95], index = i === 1 ? 1 : i % 5, regionIndex = REGIONS.indexOf(owner.region), prefix = ['MH 02', 'DL 01', 'KA 03', 'MH 12', 'RJ 14', 'UK 07'][regionIndex]
    data.vehicles.push({ id: id('VEH', i), registration: `${prefix} ${['AX', 'BK', 'CT'][i % 3]} ${String(1200 + i * 37)}`, ownerId: owner.id, model: models[index], type: VEHICLE_TYPES[index], region: owner.region, registrationUse: index === 3 ? 'Commercial' : 'Private', year: 2020 + i % 6, openingOdometer: 12000 + Math.floor(rand() * 65000), serviceIntervalKm: index === 4 ? 5000 : 10000 })
  }
  for (const region of REGIONS) {
    for (let r = 0; r < 6; r++) {
      const centre = cities[region], scale = [0.13, 0.65, 0.05, 0.2, 0.35, 0.85][r]
      const terrain: Terrain = region === 'Dehradun' && r > 3 ? 'Mountainous' : (region === 'Pune' || region === 'Mumbai') && r === 5 ? 'Hilly' : r === 4 ? 'Uneven' : 'Plains'
      const points = Array.from({ length: 7 }, (_, k) => ({ lat: round(centre.lat + scale * k / 6, 5), lng: round(centre.lng + scale * 0.7 * k / 6 + Math.sin(k * 1.5) * scale * 0.08, 5) }))
      const zoneId = id('ZONE', data.zones.length)
      data.zones.push({ id: zoneId, name: `${region} · ${routeNames[r]}`, region, ...points[3], risk: [0.25, 0.55, 0.1, 0.65, 0.75, 0.9][r], reason: ['Junction density', 'High-speed merging', 'Mixed pedestrian traffic', 'Heavy vehicle movement', 'Uneven surface exposure', 'Curves and historical crash scenario'][r], radiusKm: scale * 25 })
      data.routes.push({ id: id('RTE', data.routes.length), name: `${region} ${routeNames[r]}`, region, road: roads[r], terrain, speedLimit: [50, 100, 30, 40, 60, 80][r], zoneId, points, distanceKm: round(points.slice(1).reduce((s, p, k) => s + distance(points[k], p), 0), 2) })
    }
  }
  prepareProgramme(data)
  const coached = new Set(data.interventions.map(i => i.driverId))
  const span = Math.round((Date.parse(DEMO_TO) - Date.parse(DEMO_FROM)) / DAY) + 1
  const odometers = new Map(data.vehicles.map(v => [v.id, v.openingOdometer]))
  const driversAvailable = new Map<string, number>(), vehiclesAvailable = new Map<string, number>()
  for (let day = 0; day < span; day++) {
    const date = new Date(Date.parse(`${DEMO_FROM}T00:00:00Z`) + day * DAY).toISOString().slice(0, 10)
    const midnight = Date.parse(`${date}T00:00:00+05:30`)
    for (let d = 0; d < 100; d++) {
      const driver = data.drivers[d], persona = driver.persona
      if (rand() < (persona === 'High mileage' || persona === 'Commercial patterns' ? 0.06 : 0.2)) continue
      // Five adjacent drivers share a five-vehicle pool, rotating daily. Extra vehicles replace an owner's vehicle on alternate days.
      let vi = d >= 5 && d < 10 ? 5 + (d - 5 + day) % 5 : d
      if (d >= 90 && d < 95) vi = 90 + (d - 90 + Math.floor(day / 3)) % 5
      if (d < 5 && day % 3 === 0 || d >= 10 && d < 15 && day % 3 === 1) vi = 100 + (d < 5 ? d : d - 5)
      const vehicle = data.vehicles[vi]
      const count = persona === 'Commercial patterns' ? 5 : persona === 'High mileage' ? 3 : 2 + (rand() < 0.2 ? 1 : 0)
      let previousEnd = 0
      for (let t = 0; t < count; t++) {
        const routes = data.routes.filter(r => r.region === vehicle.region)
        const ri = persona === 'High mileage' ? 5 : persona === 'Highway driver' ? (t % 2 ? 5 : 1) : persona === 'Commercial patterns' ? (t % 2 ? 3 : 0) : persona === 'Urban commuter' ? (t % 2 ? 2 : 0) : Math.floor(rand() * 6)
        const route = routes[ri], averageSpeed = route.speedLimit * (0.48 + rand() * 0.23)
        const drivingMinutes = Math.ceil(route.distanceKm / averageSpeed * 60), breakMinutes = drivingMinutes > 125 && rand() < 0.6 ? 20 : 0
        const durationMin = drivingMinutes + breakMinutes
        const desiredStart = midnight + ((persona === 'Night driver' ? 18 : 6) * 60 + t * (persona === 'Commercial patterns' ? 115 : 170) + Math.floor(rand() * 35)) * 60000
        const startMs = Math.max(desiredStart, previousEnd + 30 * 60000, driversAvailable.get(driver.id) || 0, vehiclesAvailable.get(vehicle.id) || 0)
        const endMs = startMs + durationMin * 60000
        if (endMs > midnight + DAY - 60000) continue
        const tripId = id('TRP', data.trips.length), assignmentId = id('ASN', data.assignments.length), reverse = t % 2 === 1
        const start = new Date(startMs).toISOString(), end = new Date(endMs).toISOString(), odoStart = odometers.get(vehicle.id)!
        let nightMinutes = 0
        for (let m = 0; m < durationMin; m++) { if (breakMinutes && m >= Math.ceil(drivingMinutes / 2) && m < Math.ceil(drivingMinutes / 2) + breakMinutes) continue; const hour = new Date(startMs + m * 60000 + 19800000).getUTCHours(); if (hour >= 22 || hour < 6) nightMinutes++ }
        data.trips.push({ id: tripId, driverId: driver.id, vehicleId: vehicle.id, assignmentId, routeId: route.id, start, end, date, distanceKm: route.distanceKm, durationMin, nightMinutes, breakMinutes, maxContinuousMin: breakMinutes ? Math.ceil(drivingMinutes / 2) : drivingMinutes, odometerStart: odoStart, odometerEnd: round(odoStart + route.distanceKm, 2), reverse })
        odometers.set(vehicle.id, round(odoStart + route.distanceKm, 2))
        data.assignments.push({ id: assignmentId, driverId: driver.id, vehicleId: vehicle.id, tripId, start, end, relationship: vehicle.ownerId === driver.id ? 'Owner' : d >= 5 && d < 10 ? 'Family' : 'Employee / third party', confidence: round(0.87 + rand() * 0.11, 2), source: 'Simulated authentication' })
        const geometry = reverse ? [...route.points].reverse() : route.points
        geometry.forEach((point, k) => data.telemetry.push({ id: id('GPS', data.telemetry.length), tripId, timestamp: new Date(startMs + (drivingMinutes * k / 6 + (k > 3 ? breakMinutes : 0)) * 60000).toISOString(), ...point, speedKph: k === 0 || k === 6 ? 0 : round(averageSpeed * (0.88 + rand() * 0.2)), cumulativeKm: round(route.distanceKm * k / 6, 2), source: 'Simulated observation' }))
        const aggressive = persona === 'Aggressive driver' || persona === 'Frequent violations', safe = persona === 'Safe driver' || persona === 'Responsible driver', distracted = persona === 'Distracted driver'
        for (const kind of EVENT_KINDS) {
          if (kind === 'Collision signal') continue
          const trained = coached.has(driver.id) && date >= PROGRAMME.effectiveDate
          const improvement = !trained ? 0 : kind === 'Overspeeding' ? PROGRAMME.speedingReduction : kind === 'Harsh braking' ? PROGRAMME.brakingReduction : ['Phone use', 'Distraction'].includes(kind) ? PROGRAMME.distractionReduction : 0
          const chance = (safe ? 0.007 : kind === 'Phone use' || kind === 'Distraction' ? distracted ? 0.48 : 0.035 : aggressive ? 0.38 : 0.05) * (1 - improvement)
          if (rand() > chance) continue
          const pointIndex = 2 + Math.floor(rand() * 3), point = geometry[pointIndex], timestamp = data.telemetry[data.telemetry.length - 7 + pointIndex].timestamp, eventId = id('EVT', data.events.length)
          data.events.push({ id: eventId, tripId, kind, timestamp, ...point, speedKph: round(kind === 'Overspeeding' ? route.speedLimit + 6 + rand() * 35 : averageSpeed * 1.05), speedLimit: route.speedLimit, durationSec: Math.floor(kind === 'Overspeeding' ? 20 + rand() * Math.min(160, durationMin * 20) : 3 + rand() * 12), severity: aggressive || distracted ? pick(['Moderate', 'Severe']) : 'Low', source: 'Simulated observation' })
          if (['Phone use', 'Distraction', 'Red-light crossing', 'Harsh braking'].includes(kind) && !(['Phone use', 'Distraction'].includes(kind) && vehicle.type === 'Two-wheeler')) data.cameras.push({ id: id('CAM', data.cameras.length), tripId, eventId, view: kind === 'Phone use' || kind === 'Distraction' ? 'Cabin' : 'Front', timestamp, observation: `${kind} candidate; synthetic scene, no recording`, confidence: round(0.72 + rand() * 0.24, 2), source: 'Simulated observation' })
          if ((kind === 'Overspeeding' || kind === 'Red-light crossing' || kind === 'Seat-belt / helmet') && rand() < 0.12) data.challans.push({ id: id('CHL', data.challans.length), vehicleId: vehicle.id, driverId: driver.id, eventId, date, violation: kind, amount: kind === 'Overspeeding' ? 2000 : 1000, status: 'Verified challan (simulated)', source: 'Simulated external record' })
        }
        if (persona === 'Commercial patterns' && vehicle.type !== 'Two-wheeler' && rand() < 0.6) data.cameras.push({ id: id('CAM', data.cameras.length), tripId, view: 'Cabin', timestamp: start, observation: 'Repeated passenger turnover candidate', confidence: round(0.7 + rand() * 0.22, 2), source: 'Simulated observation' })
        if (rand() < (safe ? 0 : aggressive ? 0.014 : 0.0015) * (coached.has(driver.id) && date >= PROGRAMME.effectiveDate ? 1 - PROGRAMME.collisionReduction : 1) || d === 2 && day === span - 1 && t === 0) {
          const timestamp = data.telemetry[data.telemetry.length - 3].timestamp, eventId = id('EVT', data.events.length)
          const severity = pick(['Low', 'Moderate', 'Severe'] as const as ['Low', 'Moderate', 'Severe'])
          data.events.push({ id: eventId, tripId, kind: 'Collision signal' as EventKind, timestamp, ...geometry[4], speedKph: round(averageSpeed), speedLimit: route.speedLimit, durationSec: 2, severity, source: 'Simulated observation' })
          const cameraIds: string[] = []
          for (const view of ['Front', 'Rear'] as const) { const cameraId = id('CAM', data.cameras.length); cameraIds.push(cameraId); data.cameras.push({ id: cameraId, tripId, eventId, view, timestamp, observation: `${view} impact reconstruction placeholder`, confidence: 0.88, source: 'Simulated observation' }) }
          const verified = rand() < 0.55
          data.incidents.push({ id: id('INC', data.incidents.length), tripId, eventId, cameraIds, timestamp, severity, status: verified ? 'Verified accident (simulated)' : 'Detected incident', potentialFactors: aggressive ? ['Speed-related exposure', 'Reduced following distance'] : ['Road condition', 'Sudden obstruction'], verificationNote: verified ? 'Fictional adjuster review completed. No real accident or external verification.' : 'Sensor trigger only. Accident occurrence and causation require review.' })
        }
        previousEnd = endMs; driversAvailable.set(driver.id, endMs + 30 * 60000); vehiclesAvailable.set(vehicle.id, endMs + 30 * 60000)
      }
    }
  }
  for (const [i, vehicle] of data.vehicles.entries()) {
    const trips = data.trips.filter(t => t.vehicleId === vehicle.id)
    data.services.push({ id: id('SRV', data.services.length), vehicleId: vehicle.id, date: '2025-10-15', odometerKm: vehicle.openingOdometer - 1000, kind: 'Scheduled OEM service', repairs: ['Oil and filter', 'Brake inspection'], nextDueDate: '2026-04-15', nextDueKm: vehicle.openingOdometer - 1000 + vehicle.serviceIntervalKm, source: 'Simulated external record' })
    for (const day of [75, 150, 225, 300]) {
      if (i % 9 === 2) continue
      const date = new Date(Date.parse(`${DEMO_FROM}T00:00:00Z`) + day * DAY).toISOString().slice(0, 10), before = trips.filter(t => t.date <= date)
      data.services.push({ id: id('SRV', data.services.length), vehicleId: vehicle.id, date, odometerKm: before.at(-1)?.odometerEnd ?? vehicle.openingOdometer, kind: i % 7 === 0 ? 'Maintenance and repair' : 'Scheduled OEM service', repairs: i % 7 === 0 ? ['Recurring brake-pad wear', 'Wheel alignment'] : ['Oil and filter', 'Tyre inspection'], nextDueDate: new Date(Date.parse(date) + 183 * DAY).toISOString().slice(0, 10), nextDueKm: (before.at(-1)?.odometerEnd ?? vehicle.openingOdometer) + vehicle.serviceIntervalKm, source: 'Simulated external record' })
    }
  }
  return enrichDataset(data)
}
