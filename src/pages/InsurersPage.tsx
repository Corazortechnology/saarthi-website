import { ArrowRight, Shield } from 'lucide-react'
import { Comparison } from '../components/Comparison'
import { FAQ } from '../components/FAQ'
import { PageHero } from '../components/PageHero'
import { RoadSafety } from '../components/RoadSafety'
import { FAQ_INSURERS } from '../content/faq'
import { Section, SectionHeading } from '../components/ui/Section'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'
import { TrendingDown, Users, WifiOff } from 'lucide-react'

const INSURER_BENEFITS = [
  {
    icon: TrendingDown,
    title: 'Lower loss ratios',
    desc: 'Catch fatigue and distraction before a near-miss becomes a claim — especially on long-haul and gig fleets.',
  },
  {
    icon: Users,
    title: 'Reach more policyholders',
    desc: 'Software on phones drivers already carry — no dongle friction, no install appointments, no hardware capex.',
  },
  {
    icon: WifiOff,
    title: 'Anonymised by design',
    desc: 'Trip safety signals without raw video in the cloud. Privacy-first insights built for fairer pricing.',
  },
]

function InsurerBenefits() {
  const reduce = useReducedMotion()

  return (
    <Section>
      <SectionHeading
        eyebrow="For insurers"
        title="Telematics without the hardware tax"
        subtitle="Partner on pilots that improve road safety and claims outcomes — at the scale of everyday drivers."
      />
      <motion.div
        variants={reduce ? undefined : stagger(0.08)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {INSURER_BENEFITS.map((b) => (
          <motion.div
            key={b.title}
            variants={reduce ? undefined : fadeUp}
            className="rounded-2xl border border-border/70 bg-surface/60 p-7 shadow-card"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface2/80 text-accent ring-1 ring-border/70">
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

export function InsurersPage() {
  return (
    <>
      <PageHero
        icon={Shield}
        eyebrow="For insurers"
        title={
          <>
            Safer drivers, <span className="text-gradient">smarter risk.</span>
          </>
        }
        subtitle="Claims reduction and telematics insights without hardware friction — anonymised signals from phones policyholders already carry."
      >
        <a
          href="mailto:hello@corazor.tech?subject=Saarthi%20insurance%20partnership"
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition hover:brightness-110"
        >
          Partner with us
          <ArrowRight className="h-4 w-4" />
        </a>
      </PageHero>
      <InsurerBenefits />
      <Comparison />
      <RoadSafety />
      <FAQ
        items={FAQ_INSURERS}
        eyebrow="Insurer FAQ"
        title="Questions from risk &amp; product teams"
        subtitle="Data, privacy, pilots, and telematics fit — what insurers ask before partnering."
      />
      <section className="scroll-mt-24 pb-24 pt-8">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold text-fg">Explore an insurance pilot</h2>
          <p className="mt-3 text-muted">Scope cohort size, metrics, and integration with your existing programs.</p>
          <a
            href="mailto:hello@corazor.tech?subject=Saarthi%20insurance%20partnership"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-fg transition hover:bg-surface2/70"
          >
            Contact partnerships
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    </>
  )
}
