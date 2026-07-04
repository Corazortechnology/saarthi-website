import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

export function RoadSafety() {
  const reduce = useReducedMotion()
  return (
    <section className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-insight/30 bg-insight/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-insight dark:text-insight-light">
                <Sparkles className="h-3.5 w-3.5" />
                Beyond the driver
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                Safer drivers, <span className="text-gradient">smarter roads.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Every mile driven with Saarthi quietly builds a better picture of the road ahead. In the
                background — and always anonymised — it helps surface rough patches and rough stretches, so
                journeys get smoother and safer for everyone over time.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-sm text-muted">
                Drivers see none of the complexity — just a safer trip. The bigger road-safety picture takes
                care of itself.
              </p>
            </Reveal>
          </div>

          {/* Abstract route visual */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface/50 p-6 shadow-card">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 dark:opacity-20" />
              <svg viewBox="0 0 400 260" className="relative w-full">
                <defs>
                  <linearGradient id="route" x1="0" y1="0" x2="400" y2="260" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" />
                    <stop offset="0.5" stopColor="#14B8A6" />
                    <stop offset="1" stopColor="#6D28D9" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M20 220 C 120 220, 110 120, 200 120 S 300 40, 380 40"
                  fill="none"
                  stroke="url(#route)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={reduce ? undefined : { pathLength: 0 }}
                  whileInView={reduce ? undefined : { pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={reduce ? undefined : { duration: 1.6, ease: 'easeInOut' }}
                />
                {[
                  { cx: 20, cy: 220 },
                  { cx: 200, cy: 120 },
                  { cx: 380, cy: 40 },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.cx} cy={p.cy} r="7" fill="rgb(var(--surface))" stroke="url(#route)" strokeWidth="3" />
                    {!reduce && (
                      <circle cx={p.cx} cy={p.cy} r="7" fill="none" stroke="#14B8A6" strokeWidth="2">
                        <animate attributeName="r" from="7" to="18" dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                ))}
              </svg>
              <div className="relative mt-2 flex items-center justify-between font-mono text-xs text-muted">
                <span>Trip start</span>
                <span className="text-teal-rest dark:text-teal-restDark">Smoother routes</span>
                <span>Destination</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
