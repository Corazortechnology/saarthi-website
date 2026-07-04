import { motion, useReducedMotion } from 'framer-motion'
import { Cpu, LineChart, Rocket, Sparkles } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { fadeUp, stagger } from '../lib/motion'

const REASONS = [
  {
    icon: Cpu,
    title: 'Phones finally caught up',
    desc: 'The phone in every cab is now powerful enough to watch the road in real time — so safety no longer needs a box on the dashboard.',
  },
  {
    icon: Sparkles,
    title: 'Safety shouldn’t need hardware',
    desc: 'Dashcams and dongles are costly, slow to fit and impossible to scale. Software-defined safety updates and spreads instantly.',
  },
  {
    icon: LineChart,
    title: 'The stakes keep rising',
    desc: 'India’s road deaths are climbing year on year. Waiting for hardware budgets and installs costs lives that a phone could help save today.',
  },
  {
    icon: Rocket,
    title: 'Ready for millions of drivers',
    desc: 'From one car to a national fleet, Saarthi reaches every driver through the device they already carry — no supply chain, no wiring.',
  },
]

export function WhyNow() {
  const reduce = useReducedMotion()
  return (
    <Section id="why-now" className="bg-surface/30">
      <SectionHeading
        eyebrow="Why now"
        title="A safety category whose time has come"
        subtitle="For decades, driver safety meant buying and bolting in hardware. That era is ending — and Saarthi is built for what comes next."
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
    </Section>
  )
}
