import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Circle, Sparkles } from 'lucide-react'
import { ROADMAP_PHASES } from '../content/roadmap'
import { fadeUp, stagger } from '../lib/motion'
import { Section, SectionHeading } from './ui/Section'
import { cn } from '../lib/cn'

const STATUS_LABEL = {
  live: 'Now',
  planned: 'Next',
  vision: 'Future',
} as const

const STATUS_STYLE = {
  live: 'border-ok/40 bg-ok/10 text-ok dark:text-ok-dark',
  planned: 'border-brand-blue/40 bg-brand-blue/10 text-brand-blue dark:text-brand-blueLight',
  vision: 'border-insight/40 bg-insight/10 text-insight dark:text-insight-light',
} as const

export function RoadmapTimeline() {
  const reduce = useReducedMotion()

  return (
    <Section>
      <SectionHeading
        eyebrow="Product roadmap"
        title="Saving lives, step by step"
        subtitle="Every phase builds toward one goal: fewer preventable crashes on every road Saarthi reaches."
      />

      <motion.ol
        variants={reduce ? undefined : stagger(0.1)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto mt-14 max-w-3xl"
      >
        <div className="absolute bottom-4 left-[1.125rem] top-4 w-px bg-border/80 sm:left-6" aria-hidden />

        {ROADMAP_PHASES.map((phase, i) => (
          <motion.li
            key={phase.title}
            variants={reduce ? undefined : fadeUp}
            className="relative flex gap-6 pb-12 last:pb-0"
          >
            <div className="relative z-10 mt-1 shrink-0">
              {phase.status === 'live' ? (
                <CheckCircle2 className="h-9 w-9 text-ok dark:text-ok-dark" />
              ) : phase.status === 'planned' ? (
                <Circle className="h-9 w-9 fill-brand-blue/15 text-brand-blue dark:text-brand-blueLight" />
              ) : (
                <Sparkles className="h-9 w-9 text-insight dark:text-insight-light" />
              )}
            </div>

            <div className="flex-1 rounded-2xl border border-border/70 bg-surface/60 p-6 shadow-card">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide',
                    STATUS_STYLE[phase.status],
                  )}
                >
                  {STATUS_LABEL[phase.status]}
                </span>
                <span className="font-mono text-xs text-muted">Phase {i + 1}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-fg">{phase.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{phase.theme}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{phase.desc}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  )
}
