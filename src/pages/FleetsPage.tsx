import { ArrowRight, Building2, Check } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Comparison } from '../components/Comparison'
import { FAQ } from '../components/FAQ'
import { PageHero } from '../components/PageHero'
import { WhyNow } from '../components/WhyNow'
import { FAQ_FLEETS } from '../content/faq'
import { fadeUp, stagger } from '../lib/motion'
import { Section, SectionHeading } from '../components/ui/Section'

const PILOT_STEPS = [
  {
    step: '01',
    title: 'Scope your fleet',
    desc: 'Tell us vehicle count, driver profiles, and safety goals. We align on pilot metrics — incidents, near-misses, adoption.',
  },
  {
    step: '02',
    title: 'Drivers download & mount',
    desc: 'No dashcams or wiring. Each driver installs Saarthi, mounts their phone, and starts — onboarding in minutes.',
  },
  {
    step: '03',
    title: 'Review trip insights',
    desc: 'See fatigue and distraction patterns per trip. Coach early, reduce claims, and scale to more vehicles over the air.',
  },
]

function FleetPilotSteps() {
  const reduce = useReducedMotion()

  return (
    <Section className="bg-surface/30">
      <SectionHeading
        eyebrow="Fleet rollout"
        title="Live in days, not months"
        subtitle="Traditional driver-monitoring means boxes and cables per vehicle. Saarthi is pure software on phones drivers already carry."
      />
      <motion.div
        variants={reduce ? undefined : stagger(0.08)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {PILOT_STEPS.map((s) => (
          <motion.div
            key={s.step}
            variants={reduce ? undefined : fadeUp}
            className="rounded-2xl border border-border/70 bg-surface/60 p-7 shadow-card"
          >
            <span className="font-mono text-sm font-semibold text-accent">{s.step}</span>
            <h3 className="mt-3 text-lg font-semibold text-fg">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function FleetBenefits() {
  const reduce = useReducedMotion()
  const points = [
    'Fewer incidents and insurance claims',
    'Safety insights per trip — no hardware to maintain',
    'Instant scale as you add drivers',
    'Works offline on long haul routes',
  ]

  return (
    <Section id="benefits">
      <SectionHeading
        eyebrow="Fleet value"
        title="Safety that scales with your team"
        subtitle="Protect every driver without per-vehicle installs, downtime, or wiring bills."
      />
      <motion.ul
        variants={reduce ? undefined : stagger(0.06)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2"
      >
        {points.map((p) => (
          <motion.li
            key={p}
            variants={reduce ? undefined : fadeUp}
            className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/60 p-4 text-sm text-fg/90"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-rest dark:text-teal-restDark" />
            {p}
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

export function FleetsPage() {
  return (
    <>
      <PageHero
        icon={Building2}
        eyebrow="For fleet owners"
        title={
          <>
            Protect every driver <span className="text-gradient">without new hardware.</span>
          </>
        }
        subtitle="Roll out driver safety across your whole team in days — no dashcams, dongles, or per-vehicle installs."
      >
        <a
          href="mailto:hello@corazor.tech?subject=Saarthi%20fleet%20pilot"
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition hover:brightness-110"
        >
          Book a fleet pilot
          <ArrowRight className="h-4 w-4" />
        </a>
      </PageHero>
      <WhyNow />
      <FleetBenefits />
      <Comparison />
      <FleetPilotSteps />
      <FAQ
        items={FAQ_FLEETS}
        eyebrow="Fleet FAQ"
        title="Questions from fleet operators"
        subtitle="Rollout, hardware, insights, and driver phones — answered for ops and safety teams."
      />
      <section className="scroll-mt-24 pb-24 pt-8">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold text-fg">Ready to pilot with your fleet?</h2>
          <p className="mt-3 text-muted">We’ll help you scope metrics and get drivers protected in days.</p>
          <a
            href="mailto:hello@corazor.tech?subject=Saarthi%20fleet%20pilot"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-fg transition hover:bg-surface2/70"
          >
            Contact fleet team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    </>
  )
}
