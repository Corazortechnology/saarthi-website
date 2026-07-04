import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { NoHardware } from './components/NoHardware'
import { IndiaImpact } from './components/IndiaImpact'
import { Benefits } from './components/Benefits'
import { HowItHelps } from './components/HowItHelps'
import { UseCases } from './components/UseCases'
import { WhoItsFor } from './components/WhoItsFor'
import { RoadSafety } from './components/RoadSafety'
import { Trust } from './components/Trust'
import { FAQ } from './components/FAQ'
import { DownloadCTA } from './components/DownloadCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Nav />
      <main>
        <Hero />
        <NoHardware />
        <IndiaImpact />
        <Benefits />
        <HowItHelps />
        <UseCases />
        <WhoItsFor />
        <RoadSafety />
        <Trust />
        <FAQ />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  )
}
