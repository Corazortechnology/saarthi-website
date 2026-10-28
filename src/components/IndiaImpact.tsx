import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock, TrendingUp } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { fadeUp, stagger } from '../lib/motion'
import { ROAD_SAFETY_2025, ROAD_DEATHS_PER_DAY_2025, ROAD_DEATHS_PER_HOUR_2025 } from '../content/road-safety-data'

const STATS = [
  {
    value: ROAD_SAFETY_2025.deaths,
    locale: 'en-IN',
    label: 'lives lost on Indian roads in 2025',
    sub: 'Provisional national total',
  },
  {
    value: ROAD_SAFETY_2025.crashes,
    locale: 'en-IN',
    label: 'road crashes reported in 2025',
    sub: 'More than 5.13 lakh crashes nationwide',
  },
  {
    value: ROAD_SAFETY_2025.deathIncreasePercent,
    decimals: 1,
    suffix: '%',
    label: 'increase in road deaths',
    sub: 'Compared with 2024',
  },
  {
    value: ROAD_SAFETY_2025.crashIncreasePercent,
    decimals: 1,
    suffix: '%',
    label: 'increase in reported crashes',
    sub: 'Compared with 2024',
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
                2025 road-safety data · provisional
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
                India lost about {ROAD_DEATHS_PER_DAY_2025} people a day on its roads in 2025.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-pretty text-white/75 sm:text-lg">
                Every road death affects a family, a livelihood and a community. Safer roads need
                sustained action. Saarthi is designed to help drivers recognise signs of fatigue and
                distraction, so they can refocus or stop for a break.
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
                    <AnimatedCounter value={s.value} suffix={s.suffix} locale={s.locale} decimals={s.decimals} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-white/85">{s.label}</div>
                  <div className="mt-1 text-xs text-white/50">{s.sub}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Averages derived from the same 2025 national total */}
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-critical/15 text-critical">
                    <Clock className="h-5 w-5" />
                  </span>
                  <p className="text-sm leading-relaxed text-white/80">
                    An average of about{' '}
                    <span className="font-semibold text-white">{ROAD_DEATHS_PER_HOUR_2025} lives were lost every hour</span>{' '}
                    on Indian roads in 2025.
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warn-dark/15 text-warn-dark">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <p className="text-sm leading-relaxed text-white/80">
                    That is about{' '}
                    <span className="font-semibold text-white">{ROAD_DEATHS_PER_DAY_2025} lives lost each day</span>,{' '}
                    averaged across the year.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Pivot to hope */}
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-2 rounded-2xl border border-teal-activeDark/30 bg-teal-activeDark/[0.07] p-6 sm:flex-row sm:items-center sm:gap-4">
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-teal-activeDark sm:block" />
                <p className="text-pretty text-sm font-medium text-white sm:text-base">
                  Timely reminders can help drivers recognise when they need to refocus or rest.
                  Saarthi supports that decision with alerts for signs of fatigue and distraction.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 font-mono text-[11px] leading-relaxed text-white/65">
                Source: MoRTH figures presented to the Lok Sabha on 23 July 2026, reported by{' '}
                <a href={ROAD_SAFETY_2025.sources.hindustanTimes} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">Hindustan Times</a>{' '}
                and{' '}
                <a href={ROAD_SAFETY_2025.sources.timesOfIndia} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">The Times of India</a>{' '}
                on 24 July 2026. Calendar-year 2025 eDAR totals are provisional and may be revised.
                Daily and hourly averages are rounded.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
