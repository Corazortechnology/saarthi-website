import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Bike, Building2, Check, UserRound } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { fadeUp, stagger } from '../lib/motion'

const AUDIENCES = [
  {
    icon: UserRound,
    title: 'Everyday drivers',
    desc: 'For long highway runs, late-night returns and daily commutes.',
    points: ['A watchful passenger, always', 'Gentle fatigue check-ins', 'Nothing new to buy'],
  },
  {
    icon: Building2,
    title: 'Fleets & logistics',
    desc: 'Roll out driver safety across the whole team in days, not months.',
    points: ['Fewer incidents & claims', 'Safety insights per trip', 'No per-vehicle hardware'],
    featured: true,
  },
  {
    icon: Bike,
    title: 'Ride & delivery',
    desc: 'Keep gig and last-mile drivers safe across every shift.',
    points: ['Works on personal phones', 'Light on battery & data', 'Onboarding in minutes'],
  },
]

export function WhoItsFor() {
  const reduce = useReducedMotion()
  return (
    <Section id="fleets">
      <SectionHeading
        eyebrow="Who it’s for"
        title="One safety co-pilot, every kind of driver"
        subtitle="From a single family car to a nationwide fleet — Saarthi scales without a single new gadget."
      />

      <motion.div
        variants={reduce ? undefined : stagger(0.09)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {AUDIENCES.map((a) => (
          <motion.div
            key={a.title}
            variants={reduce ? undefined : fadeUp}
            className={[
              'relative flex flex-col rounded-2xl border p-7 shadow-card transition',
              a.featured
                ? 'border-brand-blue/40 bg-brand-blue/[0.06] ring-1 ring-brand-blue/20'
                : 'border-border/70 bg-surface/60',
            ].join(' ')}
          >
            {a.featured && (
              <span className="absolute right-5 top-5 rounded-full bg-brand-blue px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                Most popular
              </span>
            )}
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface2/80 text-accent ring-1 ring-border/70">
              <a.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-fg">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
            <ul className="mt-5 space-y-2.5">
              {a.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-fg/85">
                  <Check className="h-4 w-4 shrink-0 text-teal-rest dark:text-teal-restDark" />
                  {p}
                </li>
              ))}
            </ul>
            {a.featured && (
              <a
                href="#download"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition hover:gap-3 dark:text-brand-blueLight"
              >
                Book a fleet pilot
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
