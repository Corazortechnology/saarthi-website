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
import { contactMailto } from '../lib/contact'

const INSURER_BENEFITS = [
  {
    icon: TrendingDown,
    title: 'Support safer driving',
    desc: 'Explore how fatigue and distraction alerts can support prevention programmes for personal vehicles and commercial fleets.',
  },
  {
    icon: Users,
    title: 'Reach more policyholders',
    desc: 'Reach drivers through compatible phones they already carry, without arranging dedicated hardware installations.',
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
        subtitle="Partner on pilots to measure how driver-safety support can contribute to better road-safety and claims outcomes."
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
        subtitle="Explore driver-safety insights from phones your policyholders already carry, with clear consent and an agreed pilot scope."
      >
        <a
          href={contactMailto('Saarthi insurance partnership')}
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
        subtitle="Answers about data, privacy, pilot design and integration with your telematics programme."
      />
      <section className="scroll-mt-24 pb-24 pt-8">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold text-fg">Explore an insurance pilot</h2>
          <p className="mt-3 text-muted">Define the participant group, success measures and integration with your existing programmes.</p>
          <a
            href={contactMailto('Saarthi insurance partnership')}
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-fg transition hover:bg-surface2/70"
          >
            Contact our partnerships team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    </>
  )
}
