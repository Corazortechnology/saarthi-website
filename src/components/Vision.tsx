import { Target } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

export function Vision() {
  return (
    <section className="scroll-mt-24 py-8 sm:py-12">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-brand-blue/[0.08] via-surface to-teal-active/[0.06] px-6 py-14 text-center shadow-card sm:px-12 sm:py-20 dark:from-brand-blue/[0.12] dark:to-insight/[0.1]">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] dark:opacity-[0.15]" />
            <div className="relative mx-auto max-w-3xl">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-accent">
                <Target className="h-3.5 w-3.5" />
                Our mission
              </span>
              <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl lg:text-5xl">
                Toward zero <span className="text-gradient">preventable crashes.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                We believe the most powerful safety device is already in every driver’s pocket. By making a
                watchful co-pilot free of hardware and friction, Saarthi aims to reach millions of drivers —
                and turn countless near-misses into ordinary, safe arrivals.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
