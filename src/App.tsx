import { Routes, Route } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { HomePage } from './pages/HomePage'
import { DriversPage } from './pages/DriversPage'
import { FleetsPage } from './pages/FleetsPage'
import { InsurersPage } from './pages/InsurersPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { SupportPage } from './pages/SupportPage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="drivers" element={<DriversPage />} />
        <Route path="fleets" element={<FleetsPage />} />
        <Route path="insurers" element={<InsurersPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="support" element={<SupportPage />} />
      </Route>
    </Routes>
  )
}
