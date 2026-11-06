import { createContext, useContext } from 'react'
import type { Dataset, Filters } from './data/model'
import type { Scope } from './data/analytics'
export interface EvidenceSelection { kind: 'trip' | 'event' | 'incident' | 'camera'; id: string }
export interface InsuranceContext { data: Dataset; scope: Scope; filters: Filters; setFilters: (changes: Partial<Filters>) => void; resetFilters: () => void; go: (path: string) => void; evidence: (selection: EvidenceSelection) => void; notify: (message: string) => void }
export const InsuranceCtx = createContext<InsuranceContext | null>(null)
export const useInsurance = () => { const ctx = useContext(InsuranceCtx); if (!ctx) throw new Error('Insurance data context unavailable'); return ctx }
