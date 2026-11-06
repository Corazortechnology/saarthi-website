import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { SiteLayout } from './layouts/SiteLayout'
import { HomePage } from './pages/HomePage'
import { DriversPage } from './pages/DriversPage'
import { FleetsPage } from './pages/FleetsPage'
import { InsurersPage } from './pages/InsurersPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { SupportPage } from './pages/SupportPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { InvitePage } from './pages/InvitePage'

const InsuranceApp = lazy(() => import('./insurance/InsuranceApp'))

export default function App() {
  return (
    <Routes>
      <Route path="insurance/*" element={<Suspense fallback={<div role="status" style={{ padding: 48 }}>Loading insurance intelligence…</div>}><InsuranceApp /></Suspense>} />
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="drivers" element={<DriversPage />} />
        <Route path="fleets" element={<FleetsPage />} />
        <Route path="insurers" element={<InsurersPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="family/invite" element={<InvitePage kind="family" />} />
        <Route path="fleet/invite" element={<InvitePage kind="fleet" />} />
      </Route>
    </Routes>
  )
}
