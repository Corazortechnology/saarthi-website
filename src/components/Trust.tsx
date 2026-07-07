import { Accessibility, EyeOff, Gauge, HandHeart } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { AnimatedCounter } from './ui/AnimatedCounter'

const STATS = [
  { value: 2, suffix: ' min', label: 'Typical setup time' },
  { value: 0, label: 'Extra devices to buy' },
  { value: 100, suffix: '%', label: 'On-device by design' },
]

const PRINCIPLES = [
  { icon: HandHeart, title: 'Calm, not alarmist', desc: 'Alerts are designed to steady you, never to panic you.' },
  { icon: EyeOff, title: 'Respects your privacy', desc: 'Your camera view stays on your phone during the drive.' },
  { icon: Accessibility, title: 'Built to be accessible', desc: 'Honors reduced-motion and reads clearly, day or night.' },
  { icon: Gauge, title: 'Runs efficiently', desc: 'On-device processing tuned for everyday driving — no cloud video upload.' },
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
                <AnimatedCounter value={s.value} suffix={s.suffix} />
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
