import { ArrowRight, BatteryCharging } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

export function BatteryFactCallout() {
  return (
    <section className="scroll-mt-24 py-8 sm:py-12">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-teal-rest/30 bg-gradient-to-br from-teal-active/[0.08] via-surface to-brand-blue/[0.06] px-6 py-8 shadow-card sm:px-10 sm:py-10 dark:from-teal-activeDark/[0.12] dark:to-brand-blue/[0.1]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-active/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-teal-active/15 text-teal-rest ring-1 ring-teal-rest/30 dark:text-teal-restDark">
                <BatteryCharging className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-rest dark:text-teal-restDark">
                  Factual
                </p>
                <h2 className="mt-2 text-balance text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  Built to stay light on your phone
                </h2>
                <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
                  Saarthi runs on-device and is tuned for everyday driving — it is designed{' '}
                  <strong className="font-semibold text-fg">not to drain your battery</strong> during a
                  typical trip. No background tracking when you&apos;re not driving.
                </p>
                <Link
                  to="/drivers#faq"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition hover:gap-3 dark:text-brand-blueLight"
                >
                  Learn more about battery &amp; privacy
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
