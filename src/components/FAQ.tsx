import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Section, SectionHeading } from './ui/Section'
import { cn } from '../lib/cn'
import { FAQ_ALL, type FaqItem } from '../content/faq'

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

export function FAQ({
  items = FAQ_ALL,
  eyebrow = 'Questions',
  title = 'Everything you’re wondering',
  subtitle = 'The short version: it’s just your phone, and it’s built to earn your trust.',
}: {
  items?: FaqItem[]
  eyebrow?: string
  title?: string
  subtitle?: string
}) {
  return (
    <Section id="faq" className="bg-surface/30">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="mx-auto mt-12 max-w-3xl">
        {items.map((f, i) => (
          <Item key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </div>
    </Section>
  )
}
