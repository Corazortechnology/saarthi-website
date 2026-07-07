import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Container } from './ui/Container'
import { fadeUp, stagger } from '../lib/motion'

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  icon: Icon,
}: {
  eyebrow: string
  title: ReactNode
  subtitle: string
  children?: ReactNode
  icon?: LucideIcon
}) {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-blue/15 blur-[120px] dark:bg-brand-blue/20" />
        <div className="absolute inset-0 bg-grid opacity-[0.25] mask-fade-b dark:opacity-[0.12]" />
      </div>

      <Container className="pb-16 sm:pb-20">
        <motion.div
          variants={reduce ? undefined : stagger(0.08)}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : 'show'}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={reduce ? undefined : fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            {Icon && <Icon className="h-3.5 w-3.5 text-accent" />}
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-fg sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted"
          >
            {subtitle}
          </motion.p>
          {children && (
            <motion.div variants={reduce ? undefined : fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
