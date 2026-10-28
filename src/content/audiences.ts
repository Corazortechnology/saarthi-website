import { Building2, Shield, UserRound } from 'lucide-react'

type AudienceCard = {
  icon: typeof UserRound
  title: string
  desc: string
  href: string
  cta: string
  points: string[]
  featured?: boolean
}

export const AUDIENCE_GATEWAY: AudienceCard[] = [
  {
    icon: UserRound,
    title: 'Everyday drivers',
    desc: 'Long highway runs, late-night returns, and daily commutes.',
    href: '/drivers',
    cta: 'Explore driver features',
    points: ['Support for attentive driving', 'Fatigue and distraction alerts', 'No dedicated monitoring device'],
  },
  {
    icon: Building2,
    title: 'Fleet owners',
    desc: 'Plan a driver-safety pilot that fits your vehicles and team.',
    href: '/fleets',
    cta: 'Plan a fleet pilot',
    points: ['Support for driver coaching', 'Safety insights per trip', 'No dedicated monitoring hardware'],
    featured: true,
  },
  {
    icon: Shield,
    title: 'Insurers',
    desc: 'Explore driver-safety insights from compatible phones.',
    href: '/insurers',
    cta: 'Explore insurance partnerships',
    points: ['Pilots with agreed outcomes', 'Proposed anonymised insights', 'Reach more policyholders'],
  },
]
