import { PlugZap, Smartphone, Timer, Wifi } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'

const POINTS = [
  { icon: PlugZap, title: 'No dedicated hardware', desc: 'Use a compatible phone and a secure mount, without a separate monitoring device or vehicle wiring.' },
  { icon: Smartphone, title: 'The phone you own', desc: 'Driver monitoring uses the front camera on supported iPhones and Android phones.' },
  { icon: Timer, title: 'Simple setup', desc: 'Create your account, mount your phone and calibrate while parked.' },
  { icon: Wifi, title: 'Local driver alerts', desc: 'Fatigue and distraction monitoring can continue without a signal once setup is complete.' },
]

export function NoHardware() {
  const reduce = useReducedMotion()
  return (
    <section id="value" className="scroll-mt-24 py-8 sm:py-12">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-brand-blue to-[#1e3fae] px-6 py-12 text-white shadow-brand sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <Reveal>
              <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                No extra device. Just your phone.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 max-w-2xl text-pretty text-white/85">
                Saarthi brings driver monitoring to a compatible phone already in your vehicle.
                Set it up in a secure mount and complete calibration before you drive.
              </p>
            </Reveal>

            <motion.div
              variants={reduce ? undefined : stagger(0.08)}
              initial={reduce ? undefined : 'hidden'}
              whileInView={reduce ? undefined : 'show'}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {POINTS.map((p) => (
                <motion.div key={p.title} variants={reduce ? undefined : fadeUp}>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
