export type Region = 'Mumbai' | 'Delhi NCR' | 'Bengaluru' | 'Pune' | 'Jaipur' | 'Dehradun'
export type VehicleType = 'Hatchback' | 'Sedan' | 'SUV' | 'Commercial' | 'Two-wheeler'
export type Road = 'Highway' | 'Urban' | 'Rural' | 'Residential' | 'Industrial'
export type Terrain = 'Plains' | 'Hilly' | 'Mountainous' | 'Uneven'
export type EventKind = 'Overspeeding' | 'Harsh braking' | 'Harsh acceleration' | 'Sharp turn' | 'Phone use' | 'Distraction' | 'Red-light crossing' | 'Seat-belt / helmet' | 'Collision signal'
export type Severity = 'Low' | 'Moderate' | 'Severe'
export type Provenance = 'Simulated observation' | 'Simulated external record'
export interface Point { lat: number; lng: number }
export interface Driver { id: string; name: string; region: Region; persona: string; experienceYears: number; avatar: string }
export interface Vehicle { id: string; registration: string; ownerId: string; model: string; type: VehicleType; region: Region; registrationUse: 'Private' | 'Commercial'; year: number; openingOdometer: number; serviceIntervalKm: number }
export interface Zone extends Point { id: string; name: string; region: Region; risk: number; reason: string; radiusKm: number }
export interface Route { id: string; name: string; region: Region; road: Road; terrain: Terrain; speedLimit: number; zoneId: string; points: Point[]; distanceKm: number }
export interface Assignment { id: string; driverId: string; vehicleId: string; tripId: string; start: string; end: string; relationship: 'Owner' | 'Family' | 'Employee / third party'; confidence: number; source: 'Simulated authentication' }
export interface Trip { id: string; driverId: string; vehicleId: string; assignmentId: string; routeId: string; start: string; end: string; date: string; distanceKm: number; durationMin: number; nightMinutes: number; maxContinuousMin: number; breakMinutes: number; odometerStart: number; odometerEnd: number; reverse: boolean }
export interface Telemetry extends Point { id: string; tripId: string; timestamp: string; speedKph: number; cumulativeKm: number; source: Provenance }
export interface BehaviourEvent extends Point { id: string; tripId: string; kind: EventKind; timestamp: string; speedKph: number; speedLimit: number; durationSec: number; severity: Severity; source: Provenance }
export interface CameraEvent { id: string; tripId: string; eventId?: string; view: 'Front' | 'Rear' | 'Cabin'; timestamp: string; observation: string; confidence: number; source: Provenance }
export interface Incident { id: string; tripId: string; eventId: string; cameraIds: string[]; timestamp: string; severity: Severity; status: 'Detected incident' | 'Verified accident (simulated)'; potentialFactors: string[]; verificationNote: string }
export interface ServiceRecord { id: string; vehicleId: string; date: string; odometerKm: number; kind: string; repairs: string[]; nextDueDate: string; nextDueKm: number; source: Provenance }
export interface Challan { id: string; vehicleId: string; driverId: string; eventId: string; date: string; violation: string; amount: number; status: 'Verified challan (simulated)'; source: Provenance }
export interface Dataset { seed: number; from: string; to: string; generatedAt: string; drivers: Driver[]; vehicles: Vehicle[]; zones: Zone[]; routes: Route[]; assignments: Assignment[]; trips: Trip[]; telemetry: Telemetry[]; events: BehaviourEvent[]; cameras: CameraEvent[]; incidents: Incident[]; services: ServiceRecord[]; challans: Challan[]; interventions: DemoIntervention[]; policies: DemoPolicy[]; claims: DemoClaim[]; alerts: DemoAlert[]; cameraAnalyses: DemoCameraAnalysis[] }
export interface Filters { from: string; to: string; region: string; type: string; risk: string; driverId: string; vehicleId: string }
export interface RiskFactor { key: string; label: string; points: number; max: number; evidence: string }
export interface RiskProfile { score: number; safety: number; band: 'Low' | 'Medium' | 'High' | 'No data'; factors: RiskFactor[]; observed: boolean }
export interface UsageInference { classification: 'Commercial patterns' | 'Personal patterns' | 'Insufficient data'; confidence: number; evidence: string[] }
export interface RewardEntry { tripId: string; date: string; earned: number; deducted: number }
export interface Metrics { trips: number; km: number; minutes: number; nightMinutes: number; maxContinuousMin: number; uniqueDrivers: number; driverChanges: number; activeDays: number; annualizedKm: number; events: Record<EventKind, number>; eventCount: number; speedSeconds: number; accidents: number; incidents: number; challans: number; geoExposure: number; roadExposure: number }
export const EVENT_KINDS: EventKind[] = ['Overspeeding', 'Harsh braking', 'Harsh acceleration', 'Sharp turn', 'Phone use', 'Distraction', 'Red-light crossing', 'Seat-belt / helmet', 'Collision signal']
export const REGIONS: Region[] = ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Pune', 'Jaipur', 'Dehradun']
export const VEHICLE_TYPES: VehicleType[] = ['Hatchback', 'Sedan', 'SUV', 'Commercial', 'Two-wheeler']
export const DAY = 86_400_000
export const dateIST = (timestamp: string) => new Date(Date.parse(timestamp) + 19_800_000).toISOString().slice(0, 10)
export const round = (n: number, digits = 1) => Number(n.toFixed(digits))

export interface DemoIntervention {
  id: string; driverId: string; programme: string; completedDate: string; effectiveDate: string;
  evidenceEventIds: string[]; status: 'Completed (simulated)'; source: Provenance
}
export interface DemoPolicy {
  id: string; vehicleId: string; startDate: string; endDate: string; annualPremium: number;
  currency: 'INR'; source: Provenance
}
export interface DemoClaim {
  id: string; policyId: string; incidentId: string; tripId: string; vehicleId: string; driverId: string;
  lossDate: string; reportedAt: string; settlementDate?: string; status: 'Settled (simulated)' | 'Under review (simulated)';
  estimatedAmount: number; paidAmount: number; outstandingReserve: number; source: Provenance
}
export interface DemoAlert {
  id: string; eventId: string; tripId: string; driverId: string; vehicleId: string; createdAt: string;
  deliveredAt: string; acknowledgedAt?: string; resolvedAt?: string;
  channel: 'Demo driver app + fleet console'; message: string; resolution: string; source: Provenance
}
export interface CameraFinding {
  label: string; confidence: number; evidenceIds: string[]; box?: [number, number, number, number]
}
export interface DemoCameraAnalysis {
  id: string; cameraId: string; tripId: string; eventId?: string; timestamp: string;
  task: 'Incident context' | 'Driver attention' | 'Usage classification'; findings: CameraFinding[];
  conclusion: string; confidence: number; model: 'Scripted scene analysis v1'; source: 'Simulated inference'
}
