import { useReducedMotion } from 'framer-motion'
import {
  BatteryCharging,
  Bell,
  Globe,
  Lock,
  Smartphone,
  Sparkles,
  Truck,
  WifiOff,
} from 'lucide-react'

const ITEMS = [
  { icon: Smartphone, label: 'No extra hardware' },
  { icon: Lock, label: 'Private by design' },
  { icon: WifiOff, label: 'Works offline' },
  { icon: Bell, label: 'Calm, non-alarmist alerts' },
  { icon: BatteryCharging, label: 'Light on battery' },
  { icon: Truck, label: 'Fleet-ready in days' },
  { icon: Globe, label: 'Built for Indian roads' },
  { icon: Sparkles, label: 'Accessible by design' },
]

export function TrustMarquee() {
  const reduce = useReducedMotion()

  const Chip = ({ icon: Icon, label }: { icon: typeof Lock; label: string }) => (
    <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted">
      <Icon className="h-4 w-4 text-accent" />
      {label}
      <span className="ml-6 h-1 w-1 rounded-full bg-border" />
    </span>
  )

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-surface/40 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      {reduce ? (
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-3 px-6">
          {ITEMS.map((it) => (
            <Chip key={it.label} {...it} />
          ))}
        </div>
      ) : (
        <div className="flex w-max animate-marquee gap-8 pl-8">
          {[...ITEMS, ...ITEMS].map((it, idx) => (
            <Chip key={`${it.label}-${idx}`} {...it} />
          ))}
        </div>
      )}
    </div>
  )
}
