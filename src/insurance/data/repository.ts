import { generateDataset } from './generate.ts'
import type { Dataset } from './model.ts'
export interface SourceAdapter<K extends keyof Dataset> { source: string; mode: 'demo' | 'live'; read(signal?: AbortSignal): Promise<Pick<Dataset, K>> }
export type IdentityAdapter = SourceAdapter<'drivers' | 'vehicles' | 'assignments'>
export type TelematicsAdapter = SourceAdapter<'trips' | 'telemetry' | 'events' | 'alerts'>
export type CameraAdapter = SourceAdapter<'cameras' | 'incidents' | 'cameraAnalyses'>
export type GeographyAdapter = SourceAdapter<'zones' | 'routes'>
export type OEMAdapter = SourceAdapter<'services'>
export type TrafficAdapter = SourceAdapter<'challans'>
export type InsuranceAdapter = SourceAdapter<'policies' | 'claims' | 'interventions'>
export interface Adapters { insurance: InsuranceAdapter; identity: IdentityAdapter; telematics: TelematicsAdapter; camera: CameraAdapter; geography: GeographyAdapter; oem: OEMAdapter; traffic: TrafficAdapter }
export function demoAdapters(data: Dataset): Adapters {
  const adapter = <K extends keyof Dataset>(source: string, keys: K[]): SourceAdapter<K> => ({ source, mode: 'demo', async read(signal) { signal?.throwIfAborted(); return Object.fromEntries(keys.map(k => [k, data[k]])) as Pick<Dataset, K> } })
  return { insurance: adapter('Demo insurer claims / coaching', ['policies', 'claims', 'interventions']), identity: adapter('Demo driver authentication', ['drivers', 'vehicles', 'assignments']), telematics: adapter('Demo GPS / accelerometer', ['trips', 'telemetry', 'events', 'alerts']), camera: adapter('Demo camera evidence', ['cameras', 'incidents', 'cameraAnalyses']), geography: adapter('Demo geospatial context', ['zones', 'routes']), oem: adapter('Demo OEM records', ['services']), traffic: adapter('Demo authorised traffic records', ['challans']) }
}
export async function assembleDataset(adapters: Adapters, metadata: Pick<Dataset, 'seed' | 'from' | 'to' | 'generatedAt'>, signal?: AbortSignal): Promise<Dataset> {
  const parts = await Promise.all(Object.values(adapters).map(a => a.read(signal))); signal?.throwIfAborted()
  return Object.assign({}, metadata, ...parts) as Dataset
}
let cached: Promise<Dataset> | undefined
export function loadDemo(): Promise<Dataset> {
  if (!cached) cached = new Promise<Dataset>((resolve, reject) => setTimeout(() => {
    try { const data = generateDataset(); resolve(assembleDataset(demoAdapters(data), data)) } catch (e) { cached = undefined; reject(e) }
  }, 30)).catch(error => { cached = undefined; throw error })
  return cached
}
