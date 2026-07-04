import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, Smartphone, Sparkles } from 'lucide-react'
import { Container } from './ui/Container'
import { DeviceMockup } from './ui/DeviceMockup'
import { StoreBadges } from './ui/StoreBadges'
import { fadeUp, stagger } from '../lib/motion'

const TRUST = [
  { icon: Smartphone, label: 'iOS & Android' },
  { icon: ShieldCheck, label: 'No extra hardware' },
  { icon: Sparkles, label: 'Private by design' },
]

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* Background flourishes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[120px] dark:bg-brand-blue/25" />
        <div className="absolute right-[-5%] top-[20%] h-[360px] w-[360px] rounded-full bg-teal-active/15 blur-[100px] dark:bg-teal-activeDark/15" />
        <div className="absolute inset-0 bg-grid opacity-[0.35] mask-fade-b dark:opacity-[0.18]" />
      </div>

      <Container className="grid items-center gap-12 pb-16 lg:grid-cols-2 lg:gap-8 lg:pb-24">
        <motion.div
          variants={reduce ? undefined : stagger(0.1)}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : 'show'}
        >
          <motion.span
            variants={reduce ? undefined : fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-active/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-active" />
            </span>
            Driver safety, reimagined for every phone
          </motion.span>

          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            Your co-pilot for <span className="text-gradient">safer drives.</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            Saarthi turns your phone into a calm, always-watching safety partner — gentle nudges the
            moment attention slips, so drivers stay focused and everyone gets home safe. No dongles, no
            installations, no extra devices.
          </motion.p>

          <motion.div variants={reduce ? undefined : fadeUp} className="mt-8">
            <StoreBadges />
          </motion.div>

          <motion.ul
            variants={reduce ? undefined : fadeUp}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
          >
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm font-medium text-fg/80">
                <t.icon className="h-[18px] w-[18px] text-accent" />
                {t.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative">
          <DeviceMockup />
        </div>
      </Container>
    </section>
  )
}
