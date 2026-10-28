import { Accessibility, EyeOff, Gauge, HandHeart } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { AnimatedCounter } from './ui/AnimatedCounter'

const STATS = [
  { value: 1, label: 'Compatible phone for driver monitoring' },
  { value: 0, label: 'Dedicated monitoring devices required' },
  { value: 2, label: 'Mobile platforms: iOS and Android' },
]

const PRINCIPLES = [
  { icon: HandHeart, title: 'Clear guidance', desc: 'Timely alerts help you recognise when to refocus or take a break.' },
  { icon: EyeOff, title: 'Respects your privacy', desc: 'Your camera view stays on your phone during the drive.' },
  { icon: Accessibility, title: 'Built to be accessible', desc: 'The website respects reduced-motion preferences and offers light and dark themes.' },
  { icon: Gauge, title: 'Local driver monitoring', desc: 'Routine camera processing stays on your phone during the drive.' },
]

export function Trust() {
  return (
    <section className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        {/* Stats */}
        <div className="grid gap-6 rounded-3xl border border-border/70 bg-surface/50 px-6 py-10 shadow-card sm:grid-cols-3 sm:px-10">
          {STATS.map((s) => (
            <Reveal key={s.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>

        {/* Principles */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-surface2/80 text-accent ring-1 ring-border/70">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-fg">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
