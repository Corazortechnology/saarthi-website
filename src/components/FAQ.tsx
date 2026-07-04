import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { cn } from '../lib/cn'

const FAQS = [
  {
    q: 'Do I need to buy any extra hardware?',
    a: 'No. Saarthi runs entirely on a phone you already own — no dash-cams, dongles, sensors or wiring. Just mount your phone and start your drive.',
  },
  {
    q: 'Which phones does it work on?',
    a: 'Saarthi works on modern iPhones and Android phones. If your phone can run everyday apps and has a front camera, it can run Saarthi.',
  },
  {
    q: 'Will it drain my battery or data?',
    a: 'It’s tuned to be light. Saarthi is built to keep watch through a full drive while being gentle on battery, and it keeps helping even with no internet connection.',
  },
  {
    q: 'Is my camera or video private?',
    a: 'Yes. Saarthi is private by design — your camera view stays on your phone during the drive. It looks out for you without sending your video away.',
  },
  {
    q: 'Does it work at night or offline?',
    a: 'Yes. Saarthi is designed to help day or night, and keeps watching out for you on stretches with no signal.',
  },
  {
    q: 'Can I roll this out to a whole fleet?',
    a: 'Absolutely. Because there’s no hardware to install, fleets can get every driver protected in days. Reach out and we’ll help you get started.',
  },
]

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  return (
    <div className="border-b border-border/70">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="flex items-start gap-3 text-base font-semibold text-fg sm:text-lg">
          <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>
          {q}
        </span>
        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border/70 text-muted transition-transform duration-300',
            open && 'rotate-45 border-accent/50 text-accent',
          )}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-5 pl-8 pr-10 text-sm leading-relaxed text-muted sm:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <Section id="faq" className="bg-surface/30">
      <SectionHeading
        eyebrow="Questions"
        title="Everything you’re wondering"
        subtitle="The short version: it’s just your phone, and it’s built to earn your trust."
      />
      <div className="mx-auto mt-12 max-w-3xl">
        {FAQS.map((f, i) => (
          <Item key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </div>
    </Section>
  )
}
