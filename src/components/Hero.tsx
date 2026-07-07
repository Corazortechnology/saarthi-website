import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, ShieldCheck, Smartphone, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
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
      {/* Animated aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-[-12%] h-[560px] w-[880px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[130px] dark:bg-brand-blue/25"
          animate={reduce ? undefined : { x: [-40, 40, -40], opacity: [0.7, 1, 0.7] }}
          transition={reduce ? undefined : { duration: 14, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[-6%] top-[18%] h-[380px] w-[380px] rounded-full bg-teal-active/15 blur-[110px] dark:bg-teal-activeDark/15"
          animate={reduce ? undefined : { y: [0, 30, 0] }}
          transition={reduce ? undefined : { duration: 11, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute left-[-4%] top-[40%] h-[300px] w-[300px] rounded-full bg-insight/10 blur-[110px] dark:bg-insight-light/10"
          animate={reduce ? undefined : { y: [0, -26, 0] }}
          transition={reduce ? undefined : { duration: 13, ease: 'easeInOut', repeat: Infinity }}
        />
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
            Software-defined driver safety
          </motion.span>

          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            Everyone home safe, <span className="text-gradient">every drive.</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            Saarthi turns the phone already in your vehicle into a calm, always-watching safety co-pilot —
            a gentle nudge the moment focus slips or fatigue sets in. No dongles, no dashcams, no installs.
          </motion.p>

          <motion.div variants={reduce ? undefined : fadeUp} className="mt-8">
            <StoreBadges />
          </motion.div>

          <motion.div variants={reduce ? undefined : fadeUp} className="mt-5">
            <Link
              to="/fleets"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
            >
              Running a fleet? Book a pilot
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
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

      {/* Scroll cue */}
      {!reduce && (
        <motion.a
          href="#impact"
          aria-label="Scroll to content"
          className="mx-auto mb-6 hidden w-fit flex-col items-center gap-1 text-muted lg:flex"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      )}
    </section>
  )
}
