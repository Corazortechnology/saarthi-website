import { motion, useReducedMotion } from 'framer-motion'
import { CarFront, Play, ShieldCheck } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { fadeUp, stagger } from '../lib/motion'

const STEPS = [
  {
    icon: CarFront,
    step: '01',
    title: 'Mount your phone',
    desc: 'Secure your phone in a suitable mount with a clear view of your face and without obstructing the road.',
  },
  {
    icon: Play,
    step: '02',
    title: 'Start your drive',
    desc: 'Complete the setup and calibration while parked, then start monitoring before you drive.',
  },
  {
    icon: ShieldCheck,
    step: '03',
    title: 'Saarthi watches out for you',
    desc: 'Stay attentive to the road. Saarthi can alert you when it detects signs of fatigue or distraction.',
  },
]

export function HowItHelps() {
  const reduce = useReducedMotion()
  return (
    <Section id="how" className="bg-surface/30">
      <SectionHeading
        eyebrow="How it works"
        title="Get started in three simple steps"
        subtitle="Set up your account, position your phone and complete calibration before starting your journey."
      />

      <motion.div
        variants={reduce ? undefined : stagger(0.12)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="relative mt-14 grid gap-6 md:grid-cols-3"
      >
        {/* Connecting line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-[46px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

        {STEPS.map((s) => (
          <motion.div
            key={s.step}
            variants={reduce ? undefined : fadeUp}
            className="relative rounded-2xl border border-border/70 bg-surface/70 p-7 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 dark:text-brand-blueLight">
                <s.icon className="h-6 w-6" />
              </div>
              <span className="font-mono text-3xl font-bold text-border">{s.step}</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-fg">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
