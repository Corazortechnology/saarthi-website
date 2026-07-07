import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AUDIENCE_GATEWAY } from '../content/audiences'
import { fadeUp, stagger } from '../lib/motion'
import { Section, SectionHeading } from './ui/Section'

export function AudienceGateway() {
  const reduce = useReducedMotion()

  return (
    <Section id="audiences">
      <SectionHeading
        eyebrow="Who it’s for"
        title="One safety co-pilot, every kind of driver"
        subtitle="Pick the path that fits you — details live on dedicated pages so the homepage stays focused."
      />

      <motion.div
        variants={reduce ? undefined : stagger(0.09)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {AUDIENCE_GATEWAY.map((a) => (
          <motion.div
            key={a.href}
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
            <Link
              to={a.href}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition hover:gap-3 dark:text-brand-blueLight"
            >
              Explore {a.title.toLowerCase()}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
