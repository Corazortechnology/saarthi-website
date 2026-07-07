import { ArrowRight, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Benefits } from '../components/Benefits'
import { DownloadCTA } from '../components/DownloadCTA'
import { FAQ } from '../components/FAQ'
import { HowItHelps } from '../components/HowItHelps'
import { PageHero } from '../components/PageHero'
import { Trust } from '../components/Trust'
import { UseCases } from '../components/UseCases'
import { WhyNow } from '../components/WhyNow'
import { FAQ_DRIVERS } from '../content/faq'
import { StoreBadges } from '../components/ui/StoreBadges'

export function DriversPage() {
  return (
    <>
      <PageHero
        icon={UserRound}
        eyebrow="For everyday drivers"
        title={
          <>
            Your calm co-pilot for <span className="text-gradient">every commute.</span>
          </>
        }
        subtitle="Long highway runs, late-night returns, family trips — Saarthi watches for fatigue and distraction on the phone you already carry."
      >
        <StoreBadges className="items-center" />
        <Link
          to="/#download"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm font-semibold text-fg transition hover:bg-surface2/70"
        >
          Get the app
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>
      <WhyNow />
      <UseCases />
      <Benefits />
      <HowItHelps />
      <Trust />
      <FAQ
        items={FAQ_DRIVERS}
        eyebrow="Driver FAQ"
        title="Questions from everyday drivers"
        subtitle="Battery, privacy, offline use — the details that matter when it's your phone and your family in the car."
      />
      <DownloadCTA />
    </>
  )
}
