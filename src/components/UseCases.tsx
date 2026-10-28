import { motion, useReducedMotion } from 'framer-motion'
import { CarFront, Moon, Package, Smartphone } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { fadeUp, stagger } from '../lib/motion'

const CASES = [
  {
    icon: Moon,
    title: 'The late-night long haul',
    risk: 'Long journeys and driving at times when you would normally sleep can make it harder to stay alert.',
    help: 'Saarthi watches for signs of fatigue and can remind you to stop in a safe place for a break.',
  },
  {
    icon: Smartphone,
    title: 'A glance in the city',
    risk: 'At 50 km/h, a vehicle travels about 28 metres in two seconds. Looking at a phone during that time takes your attention away from the road.',
    help: 'When Saarthi detects sustained distraction, it can prompt you to bring your attention back to driving.',
  },
  {
    icon: Package,
    title: 'The back-to-back shift',
    risk: 'Consecutive trips and long shifts can leave cab and delivery drivers with too little time to rest.',
    help: 'On a compatible phone mounted inside the vehicle, Saarthi provides fatigue and distraction alerts throughout the shift.',
  },
  {
    icon: CarFront,
    title: 'The family expressway trip',
    risk: 'Long, repetitive stretches of road can make it difficult to maintain attention. Regular breaks remain an important part of the journey.',
    help: 'Saarthi can flag signs of fatigue or distraction, helping the driver recognise when it is time to refocus or rest.',
  },
]

export function UseCases() {
  const reduce = useReducedMotion()
  return (
    <Section id="use-cases">
      <SectionHeading
        eyebrow="Where it matters"
        title="Support for everyday driving risks"
        subtitle="Fatigue and distraction can affect many kinds of journeys. Here’s how Saarthi can help."
      />

      <motion.div
        variants={reduce ? undefined : stagger(0.08)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-5 md:grid-cols-2"
      >
        {CASES.map((c) => (
          <motion.div
            key={c.title}
            variants={reduce ? undefined : fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-surface/60 p-7 shadow-card transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface2/80 text-accent ring-1 ring-border/70">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-fg">{c.title}</h3>
            </div>

            <div className="mt-5 rounded-xl border border-warn/20 bg-warn/[0.06] p-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-warn dark:text-warn-dark">
                The risk
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg/80">{c.risk}</p>
            </div>

            <div className="mt-3 rounded-xl border border-teal-rest/20 bg-teal-active/[0.06] p-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-teal-rest dark:text-teal-restDark">
                How Saarthi helps
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg/80">{c.help}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
