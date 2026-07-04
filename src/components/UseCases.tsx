import { motion, useReducedMotion } from 'framer-motion'
import { CarFront, Moon, Package, Smartphone } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { fadeUp, stagger } from '../lib/motion'

const CASES = [
  {
    icon: Moon,
    title: 'The late-night long haul',
    risk: 'Highways are barely 5% of India’s roads, yet see about 59% of crash deaths — and fatigue peaks on empty roads after midnight.',
    help: 'Saarthi feels drowsiness setting in and nudges the driver awake before a micro-sleep becomes a tragedy.',
  },
  {
    icon: Smartphone,
    title: 'A glance in the city',
    risk: 'At 50 km/h, a 2-second glance at a phone means ~28 metres driven completely blind. Phone use alone killed 2,884 people in 2023.',
    help: 'The moment eyes leave the road, Saarthi gives a calm prompt to look back up — before the gap closes.',
  },
  {
    icon: Package,
    title: 'The back-to-back shift',
    risk: 'Working-age Indians (18–60) account for over 83% of road deaths. Delivery and gig drivers push through long, tiring shifts.',
    help: 'Saarthi rides along on a personal phone, keeping tired riders alert trip after trip — light on battery and data.',
  },
  {
    icon: CarFront,
    title: 'The family expressway trip',
    risk: 'Over-speeding is behind 68% of road deaths, and long, straight stretches quietly lull attention on holiday drives.',
    help: 'Saarthi keeps a gentle, watchful eye on monotonous roads and checks in the instant focus drifts.',
  },
]

export function UseCases() {
  const reduce = useReducedMotion()
  return (
    <Section id="use-cases">
      <SectionHeading
        eyebrow="Where it matters"
        title="Built for the moments that go wrong"
        subtitle="The same lost second causes crashes across very different drives. Here’s where Saarthi quietly steps in."
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
