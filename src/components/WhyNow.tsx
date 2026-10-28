import { motion, useReducedMotion } from 'framer-motion'
import { Cpu, LineChart, Rocket, Sparkles } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { fadeUp, stagger } from '../lib/motion'
import { ROAD_SAFETY_2025 } from '../content/road-safety-data'

const REASONS = [
  {
    icon: Cpu,
    title: 'More capability in your phone',
    desc: 'Compatible smartphones can support driver monitoring through the camera already built into the device.',
  },
  {
    icon: Sparkles,
    title: 'Simpler deployment',
    desc: 'A phone-based system can reduce the need for dedicated devices, vehicle wiring and installation appointments.',
  },
  {
    icon: LineChart,
    title: 'The stakes keep rising',
    desc: `Provisional 2025 figures show a ${ROAD_SAFETY_2025.deathIncreasePercent}% rise in India’s road deaths over 2024. The need for sustained road-safety action remains urgent.`,
  },
  {
    icon: Rocket,
    title: 'A path to wider access',
    desc: 'Start with a small group of drivers and expand through compatible phones as your pilot grows.',
  },
]

export function WhyNow() {
  const reduce = useReducedMotion()
  return (
    <Section id="why-now" className="bg-surface/30">
      <SectionHeading
        eyebrow="Why now"
        title="Making driver safety easier to access"
        subtitle="Compatible phones offer another way to bring driver monitoring to everyday journeys and commercial fleets."
      />

      <motion.div
        variants={reduce ? undefined : stagger(0.08)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2"
      >
        {REASONS.map((r) => (
          <motion.div
            key={r.title}
            variants={reduce ? undefined : fadeUp}
            className="flex gap-4 rounded-2xl border border-border/70 bg-surface/60 p-6 shadow-card"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 dark:text-brand-blueLight">
              <r.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-fg">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <p className="mx-auto mt-6 max-w-4xl text-xs leading-relaxed text-muted">
        2025 figures: MoRTH’s July 2026 parliamentary reply, as reported by{' '}
        <a href={ROAD_SAFETY_2025.sources.hindustanTimes} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">Hindustan Times</a>.
        Provisional totals are subject to revision.
      </p>
    </Section>
  )
}
