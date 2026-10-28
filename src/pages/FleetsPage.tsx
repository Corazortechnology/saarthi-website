import { ArrowRight, Building2, Check } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Comparison } from '../components/Comparison'
import { FAQ } from '../components/FAQ'
import { PageHero } from '../components/PageHero'
import { WhyNow } from '../components/WhyNow'
import { FAQ_FLEETS } from '../content/faq'
import { fadeUp, stagger } from '../lib/motion'
import { Section, SectionHeading } from '../components/ui/Section'
import { contactMailto } from '../lib/contact'

const PILOT_STEPS = [
  {
    step: '01',
    title: 'Scope your fleet',
    desc: 'Tell us about your vehicles, drivers and safety goals. Together, we’ll agree on pilot measures such as adoption, safety events and driver feedback.',
  },
  {
    step: '02',
    title: 'Set up each driver’s phone',
    desc: 'Each driver installs Saarthi, completes setup and mounts their phone securely before starting a drive.',
  },
  {
    step: '03',
    title: 'Review trip insights',
    desc: 'Review fatigue and distraction patterns across trips. Use the findings to guide coaching and plan a wider rollout.',
  },
]

function FleetPilotSteps() {
  const reduce = useReducedMotion()

  return (
    <Section className="bg-surface/30">
      <SectionHeading
        eyebrow="Fleet rollout"
        title="A simpler path to your fleet pilot"
        subtitle="Start with compatible phones your drivers already carry, then agree on setup, training and rollout with our team."
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
    'Insights to support safer driving',
    'Safety insights per trip — no hardware to maintain',
    'Add drivers as your pilot grows',
    'Local driver alerts on routes with poor signal',
  ]

  return (
    <Section id="benefits">
      <SectionHeading
        eyebrow="Fleet value"
        title="Safety that scales with your team"
        subtitle="Bring driver monitoring to your team without installing a dedicated system in every vehicle."
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
        subtitle="Bring driver safety to your team through compatible phones, with a pilot tailored to your fleet."
      >
        <a
          href={contactMailto('Saarthi fleet pilot')}
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
        subtitle="Answers about rollout, hardware, trip insights and phone compatibility for operations and safety teams."
      />
      <section className="scroll-mt-24 pb-24 pt-8">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold text-fg">Ready to pilot with your fleet?</h2>
          <p className="mt-3 text-muted">We’ll help you define your goals, choose a driver group and plan the rollout.</p>
          <a
            href={contactMailto('Saarthi fleet pilot')}
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-fg transition hover:bg-surface2/70"
          >
            Contact our fleet team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    </>
  )
}
