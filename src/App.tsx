import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Hero } from './components/Hero'
import { TrustMarquee } from './components/TrustMarquee'
import { IndiaImpact } from './components/IndiaImpact'
import { NoHardware } from './components/NoHardware'
import { WhyNow } from './components/WhyNow'
import { Benefits } from './components/Benefits'
import { HowItHelps } from './components/HowItHelps'
import { UseCases } from './components/UseCases'
import { Comparison } from './components/Comparison'
import { WhoItsFor } from './components/WhoItsFor'
import { Trust } from './components/Trust'
import { RoadSafety } from './components/RoadSafety'
import { Vision } from './components/Vision'
import { FAQ } from './components/FAQ'
import { DownloadCTA } from './components/DownloadCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <TrustMarquee />
        <IndiaImpact />
        <NoHardware />
        <WhyNow />
        <Benefits />
        <HowItHelps />
        <UseCases />
        <Comparison />
        <WhoItsFor />
        <Trust />
        <RoadSafety />
        <Vision />
        <FAQ />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  )
}
