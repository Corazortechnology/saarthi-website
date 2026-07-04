import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Eye, Gauge, Moon } from 'lucide-react'

/**
 * Stylised, animated phone showing Saarthi's calm "all good" monitoring state.
 * Purely illustrative — no real camera feed, no implementation details.
 * Honors reduced-motion by dropping the float + ring pulses.
 */
export function DeviceMockup() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto w-[280px] sm:w-[320px]"
      animate={reduce ? undefined : { y: [0, -12, 0] }}
      transition={reduce ? undefined : { duration: 6, ease: 'easeInOut', repeat: Infinity }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-brand-blue/25 blur-3xl" />

      {/* Phone frame */}
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.75rem] border border-white/10 bg-[#0B1020] p-2.5 shadow-2xl ring-1 ring-black/20">
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-[#101a33] via-[#0d1526] to-[#0b1020]">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/70" />

          {/* Status pill */}
          <div className="absolute left-1/2 top-8 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-ok-dark/60 bg-black/55 px-3.5 py-1.5 backdrop-blur">
            <CheckCircle2 className="h-4 w-4 text-ok-dark" />
            <span className="text-sm font-semibold text-white">All good</span>
            <span className="font-mono text-xs text-white/70">98%</span>
          </div>

          {/* Attention focus area */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative grid h-40 w-40 place-items-center">
              {!reduce && (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ringPulse rounded-full border border-teal-activeDark/70" />
                  <span
                    className="absolute inline-flex h-full w-full animate-ringPulse rounded-full border border-brand-blue/60"
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

          {/* Telemetry strip */}
          <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur">
            <div className="flex items-center justify-between text-white/85">
              <div className="flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-teal-activeDark" />
                <span className="text-[11px] font-medium text-white/60">Focus</span>
              </div>
              <span className="font-mono text-sm font-semibold">100%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-blue to-teal-activeDark"
                initial={{ width: reduce ? '92%' : '30%' }}
                animate={{ width: '92%' }}
                transition={reduce ? undefined : { duration: 1.4, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                { k: 'Alert', v: 'On' },
                { k: 'Eyes', v: 'Road' },
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
