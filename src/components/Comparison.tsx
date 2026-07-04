import { motion, useReducedMotion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { fadeUp, stagger } from '../lib/motion'

const ROWS: { label: string; saarthi: string; legacy: string; legacyOk?: boolean }[] = [
  { label: 'Upfront hardware cost', saarthi: 'None', legacy: 'Cameras + dongles per vehicle', legacyOk: false },
  { label: 'Time to go live', saarthi: 'Minutes', legacy: 'Days of installs per vehicle', legacyOk: false },
  { label: 'Runs on the phone you own', saarthi: 'Yes', legacy: 'Needs dedicated devices', legacyOk: false },
  { label: 'Scales to more drivers', saarthi: 'Instantly, over the air', legacy: 'New hardware every time', legacyOk: false },
  { label: 'Maintenance & wiring', saarthi: 'Nothing to service', legacy: 'Repairs, cabling, downtime', legacyOk: false },
  { label: 'Works offline', saarthi: 'Yes', legacy: 'Often cloud-dependent', legacyOk: false },
  { label: 'Improves over time', saarthi: 'Updates like any app', legacy: 'Fixed once installed', legacyOk: false },
]

export function Comparison() {
  const reduce = useReducedMotion()
  return (
    <Section id="compare">
      <SectionHeading
        eyebrow="A better way"
        title="Saarthi vs. the old hardware playbook"
        subtitle="Traditional driver-monitoring means boxes, cables and per-vehicle bills. Saarthi delivers the same watchful safety as pure software."
      />

      <motion.div
        variants={reduce ? undefined : stagger(0.05)}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border/70 bg-surface/50 shadow-card"
      >
        {/* Header */}
        <div className="grid grid-cols-[1.3fr_1fr_1fr] items-center gap-2 border-b border-border/70 bg-surface2/50 px-4 py-4 sm:px-6">
          <span className="text-xs font-medium uppercase tracking-wider text-muted sm:text-sm">
            What matters
          </span>
          <span className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue/10 px-2 py-1.5 text-center text-sm font-bold text-brand-blue dark:text-brand-blueLight">
            Saarthi
          </span>
          <span className="text-center text-sm font-semibold text-muted">Legacy DMS hardware</span>
        </div>

        {/* Rows */}
        {ROWS.map((r) => (
          <motion.div
            key={r.label}
            variants={reduce ? undefined : fadeUp}
            className="grid grid-cols-[1.3fr_1fr_1fr] items-center gap-2 border-b border-border/60 px-4 py-4 last:border-b-0 sm:px-6"
          >
            <span className="text-sm font-medium text-fg">{r.label}</span>
            <span className="flex items-center justify-center gap-1.5 text-center text-xs font-medium text-fg sm:text-sm">
              <Check className="h-4 w-4 shrink-0 text-ok dark:text-ok-dark" />
              <span>{r.saarthi}</span>
            </span>
            <span className="flex items-center justify-center gap-1.5 text-center text-xs text-muted sm:text-sm">
              <X className="h-4 w-4 shrink-0 text-critical/70" />
              <span>{r.legacy}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
