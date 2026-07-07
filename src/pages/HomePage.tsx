import { Hero } from '../components/Hero'
import { IndiaImpact } from '../components/IndiaImpact'
import { NoHardware } from '../components/NoHardware'
import { BatteryFactCallout } from '../components/BatteryFactCallout'
import { AudienceGateway } from '../components/AudienceGateway'
import { HowItHelps } from '../components/HowItHelps'
import { DownloadCTA } from '../components/DownloadCTA'

export function HomePage() {
  return (
    <>
      <Hero />
      <IndiaImpact />
      <NoHardware />
      <BatteryFactCallout />
      <AudienceGateway />
      <HowItHelps />
      <DownloadCTA />
    </>
  )
}
