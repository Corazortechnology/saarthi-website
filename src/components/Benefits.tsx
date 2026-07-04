import { motion, useReducedMotion } from 'framer-motion'
import { BellRing, Coffee, Eye, HeartHandshake, Lock, Route } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { fadeUp, stagger } from '../lib/motion'

const BENEFITS = [
  {
    icon: Coffee,
    title: 'Beats drowsiness',
    desc: 'Feels the first signs of tiredness and nudges you awake before a yawn turns into a close call.',
    accent: 'text-warn dark:text-warn-dark',
  },
  {
    icon: Eye,
    title: 'Keeps eyes on the road',
    desc: 'A gentle prompt the moment attention drifts to a phone, a sign, or a daydream.',
    accent: 'text-brand-blue dark:text-brand-blueLight',
  },
  {
    icon: BellRing,
    title: 'Calm, never alarmist',
    desc: 'Guidance that steadies you with sound, voice and vibration — designed to reassure, not startle.',
    accent: 'text-teal-rest dark:text-teal-restDark',
  },
  {
    icon: Lock,
    title: 'Private by design',
    desc: 'Your camera view stays on your phone during a drive. Saarthi looks out for you, quietly.',
    accent: 'text-insight dark:text-insight-light',
  },
  {
    icon: Route,
    title: 'Runs in the background',
    desc: 'Keep using maps and music — Saarthi keeps watching over the whole trip without getting in the way.',
    accent: 'text-brand-blue dark:text-brand-blueLight',
  },
  {
    icon: HeartHandshake,
    title: 'Peace of mind',
    desc: 'For families and fleets alike: safer arrivals, fewer incidents, and confidence on every journey.',
    accent: 'text-ok dark:text-ok-dark',
  },
]

export function Benefits() {
  const reduce = useReducedMotion()
  return (
    <Section id="benefits">
      <SectionHeading
        eyebrow="What you get"
        title="Real value on every drive"
        subtitle="Saarthi works like an attentive co-pilot — always watching the road with you and speaking up only when it matters."
      />

      <motion.div
        variants={reduce ? undefined : stagger(0.07)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {BENEFITS.map((b) => (
          <motion.div
            key={b.title}
            variants={reduce ? undefined : fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-surface/60 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/5 blur-2xl transition group-hover:bg-accent/10" />
            <div className={`grid h-12 w-12 place-items-center rounded-xl bg-surface2/80 ring-1 ring-border/70 ${b.accent}`}>
              <b.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-fg">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
