import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Container } from './Container'
import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'center' | 'left'
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-border/70 bg-surface2/60 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-accent">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-20 sm:py-28', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
