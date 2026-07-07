import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IndiaImpact } from '../components/IndiaImpact'
import { RoadmapTimeline } from '../components/RoadmapTimeline'
import { Vision } from '../components/Vision'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'

export function RoadmapPage() {
  return (
    <>
      <Vision className="pt-28 sm:pt-32" />
      <RoadmapTimeline />
      <IndiaImpact />
      <section className="scroll-mt-24 pb-24 pt-8">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-border/70 bg-surface/60 px-8 py-12 text-center shadow-card">
              <h2 className="text-2xl font-bold text-fg sm:text-3xl">Help us get there faster</h2>
              <p className="mt-4 text-muted">
                Every driver Saarthi reaches is a life we might save. Join our community of supporters and help
                bring this co-pilot to more roads.
              </p>
              <Link
                to="/support"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:brightness-110"
              >
                Support Saarthi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
