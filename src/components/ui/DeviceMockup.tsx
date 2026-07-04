import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Coffee, Eye, Gauge, Moon } from 'lucide-react'

type Tone = 'ok' | 'watch'

type DemoState = {
  key: string
  tone: Tone
  label: string
  confidence: number
  focus: number
  eyes: string
  alert?: { icon: typeof Eye; title: string; sub: string }
}

/** Scripted, looping "moment" the driver experiences: calm → gentle nudge → calm. */
const STATES: DemoState[] = [
  { key: 'calm', tone: 'ok', label: 'All good', confidence: 98, focus: 100, eyes: 'Road' },
  {
    key: 'nudge',
    tone: 'watch',
    label: 'Stay with me',
    confidence: 74,
    focus: 58,
    eyes: 'Away',
    alert: { icon: Coffee, title: 'Feeling drowsy?', sub: 'Take a breath — eyes on the road' },
  },
  { key: 'recover', tone: 'ok', label: 'Back on track', confidence: 99, focus: 100, eyes: 'Road' },
]

const TONE = {
  ok: {
    border: 'border-ok-dark/60',
    dot: 'text-ok-dark',
    ring1: 'border-teal-activeDark/70',
    ring2: 'border-brand-blue/60',
    bar: 'from-brand-blue to-teal-activeDark',
  },
  watch: {
    border: 'border-warn-dark/70',
    dot: 'text-warn-dark',
    ring1: 'border-warn-dark/70',
    ring2: 'border-warn-dark/40',
    bar: 'from-warn-dark to-brand-blue',
  },
} as const

export function DeviceMockup() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const s = reduce ? STATES[0] : STATES[i]
  const tone = TONE[s.tone]

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((p) => (p + 1) % STATES.length), 2800)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <motion.div
      className="relative mx-auto w-[280px] sm:w-[320px]"
      animate={reduce ? undefined : { y: [0, -12, 0] }}
      transition={reduce ? undefined : { duration: 6, ease: 'easeInOut', repeat: Infinity }}
    >
      {/* Ambient glow (shifts with state) */}
      <motion.div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] blur-3xl"
        animate={{ backgroundColor: s.tone === 'ok' ? 'rgba(37,99,235,0.25)' : 'rgba(245,158,11,0.22)' }}
        transition={{ duration: 0.8 }}
      />

      {/* Phone frame */}
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.75rem] border border-white/10 bg-[#0B1020] p-2.5 shadow-2xl ring-1 ring-black/20">
        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-[#101a33] via-[#0d1526] to-[#0b1020]">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/70" />

          {/* Status pill */}
          <div
            className={`absolute left-1/2 top-8 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-black/55 px-3.5 py-1.5 backdrop-blur transition-colors duration-500 ${tone.border}`}
          >
            {s.tone === 'ok' ? (
              <CheckCircle2 className={`h-4 w-4 ${tone.dot}`} />
            ) : (
              <Eye className={`h-4 w-4 ${tone.dot}`} />
            )}
            <AnimatePresence mode="wait">
              <motion.span
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-sm font-semibold text-white"
              >
                {s.label}
              </motion.span>
            </AnimatePresence>
            <span className="font-mono text-xs text-white/70">{s.confidence}%</span>
          </div>

          {/* Attention focus area */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative grid h-40 w-40 place-items-center">
              {!reduce && (
                <>
                  <span className={`absolute inline-flex h-full w-full animate-ringPulse rounded-full border ${tone.ring1}`} />
                  <span
                    className={`absolute inline-flex h-full w-full animate-ringPulse rounded-full border ${tone.ring2}`}
                    style={{ animationDelay: '1.1s' }}
                  />
                </>
              )}
              <span className="absolute inline-flex h-full w-full rounded-full border border-white/10" />
              <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-blue/30 to-teal-activeDark/20 ring-1 ring-white/15">
                <Eye className="h-9 w-9 text-white/85" />
              </div>
            </div>
          </div>

          {/* Gentle nudge card */}
          <AnimatePresence>
            {s.alert && !reduce && (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-4 top-1/2 z-30 flex -translate-y-[calc(50%+96px)] items-center gap-3 rounded-2xl border border-warn-dark/50 bg-[#1b1608]/90 px-3.5 py-3 backdrop-blur"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-warn-dark/20 text-warn-dark">
                  <s.alert.icon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">{s.alert.title}</div>
                  <div className="text-[11px] text-white/65">{s.alert.sub}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Telemetry strip */}
          <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur">
            <div className="flex items-center justify-between text-white/85">
              <div className="flex items-center gap-1.5">
                <Gauge className={`h-4 w-4 transition-colors duration-500 ${tone.dot}`} />
                <span className="text-[11px] font-medium text-white/60">Focus</span>
              </div>
              <span className="font-mono text-sm font-semibold">{s.focus}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${tone.bar}`}
                animate={{ width: `${s.focus}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                { k: 'Alert', v: 'On' },
                { k: 'Eyes', v: s.eyes },
                { k: 'Trip', v: '32m' },
              ].map((c) => (
                <div key={c.k} className="rounded-lg bg-white/5 py-1.5">
                  <div className="font-mono text-xs font-semibold text-white">{c.v}</div>
                  <div className="text-[9px] uppercase tracking-wide text-white/45">{c.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating "night-safe" chip */}
      <motion.div
        className="absolute -left-6 top-24 hidden items-center gap-2 rounded-2xl border border-border/70 bg-surface/90 px-3 py-2 shadow-card backdrop-blur sm:flex"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-insight/15 text-insight dark:text-insight-light">
          <Moon className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <div className="text-xs font-semibold text-fg">Works day &amp; night</div>
          <div className="text-[11px] text-muted">Even offline</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
