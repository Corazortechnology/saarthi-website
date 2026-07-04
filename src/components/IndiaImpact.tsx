import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock, Globe2, TrendingUp } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { fadeUp, stagger } from '../lib/motion'

const STATS = [
  {
    value: 172890,
    locale: 'en-IN',
    label: 'lives lost on Indian roads in 2023',
    sub: '≈ 20 every hour — up 2.6% year on year',
  },
  {
    value: 480583,
    locale: 'en-IN',
    label: 'road crashes in a single year',
    sub: 'Over 4.6 lakh people left injured',
  },
  {
    value: 68,
    suffix: '%',
    label: 'of road deaths involve overspeeding',
    sub: 'Human error is the dominant cause',
  },
  {
    value: 66,
    suffix: '%',
    label: 'of victims are aged 18–45',
    sub: 'People in the prime of their lives',
  },
]

export function IndiaImpact() {
  const reduce = useReducedMotion()

  return (
    <section id="impact" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B1020] via-[#111a30] to-[#160f1a] px-6 py-14 text-white shadow-brand sm:px-12 sm:py-16">
          {/* Somber ambient accents (restrained, not alarmist) */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
          <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-critical/20 blur-[110px]" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-warn-dark/10 blur-[110px]" />

          <div className="relative">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-white/80">
                <Clock className="h-3.5 w-3.5 text-critical" />
                The reality on Indian roads
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Every 3 minutes, India loses someone to a road crash.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-pretty text-white/75 sm:text-lg">
                Most of these are not accidents of fate. Again and again the cause is the same — a moment of
                lost focus behind the wheel: over-speeding, drowsiness, a glance away. That single moment is
                exactly what Saarthi is built to catch.
              </p>
            </Reveal>

            {/* Stat grid */}
            <motion.div
              variants={reduce ? undefined : stagger(0.08)}
              initial={reduce ? undefined : 'hidden'}
              whileInView={reduce ? undefined : 'show'}
              viewport={{ once: true, amount: 0.2 }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={reduce ? undefined : fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                >
                  <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix} locale={s.locale} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-white/85">{s.label}</div>
                  <div className="mt-1 text-xs text-white/50">{s.sub}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Global context callout */}
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-critical/15 text-critical">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <p className="text-sm leading-relaxed text-white/80">
                    India has about <span className="font-semibold text-white">1% of the world's vehicles</span>{' '}
                    — yet accounts for roughly{' '}
                    <span className="font-semibold text-white">11% of all road-crash deaths</span> on Earth.
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warn-dark/15 text-warn-dark">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <p className="text-sm leading-relaxed text-white/80">
                    Crashes cost the country an estimated{' '}
                    <span className="font-semibold text-white">~3% of GDP</span> every year.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Pivot to hope */}
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-2 rounded-2xl border border-teal-activeDark/30 bg-teal-activeDark/[0.07] p-6 sm:flex-row sm:items-center sm:gap-4">
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-teal-activeDark sm:block" />
                <p className="text-pretty text-sm font-medium text-white sm:text-base">
                  The good news: when the cause is a lost moment of attention, it can be prevented. Saarthi
                  gives every driver a calm, watchful second pair of eyes — so more of these journeys end at
                  home, safely.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 font-mono text-[11px] leading-relaxed text-white/40">
                Sources: Ministry of Road Transport &amp; Highways, “Road Accidents in India 2023”; World Bank
                road-safety estimates. Figures are national totals and rounded where noted.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
