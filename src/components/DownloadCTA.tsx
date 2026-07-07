import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { StoreBadges } from './ui/StoreBadges'

export function DownloadCTA() {
  return (
    <section id="download" className="scroll-mt-24 pb-24 pt-8 sm:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-[#0B1020] to-[#152449] px-6 py-14 text-white shadow-brand sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
          <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-blue/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-teal-activeDark/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-white/80">
                <ShieldCheck className="h-3.5 w-3.5" />
                No hardware required
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Bring a co-pilot on your next drive.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-white/80">
                Download Saarthi and turn the phone in your pocket into a calm, always-there safety partner —
                free to try, ready in minutes.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex justify-center">
                <StoreBadges className="items-center" />
              </div>
            </Reveal>
          </div>

          {/* Fleet split */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto mt-10 max-w-2xl border-t border-white/10 pt-8 text-center">
              <p className="text-sm text-white/70">
                Running a fleet, cab service or delivery team?
              </p>
              <Link
                to="/fleets"
                className="group mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Book a fleet pilot
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
