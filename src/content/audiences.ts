import { Building2, Shield, UserRound } from 'lucide-react'

type AudienceCard = {
  icon: typeof UserRound
  title: string
  desc: string
  href: string
  points: string[]
  featured?: boolean
}

export const AUDIENCE_GATEWAY: AudienceCard[] = [
  {
    icon: UserRound,
    title: 'Everyday drivers',
    desc: 'Long highway runs, late-night returns, and daily commutes.',
    href: '/drivers',
    points: ['A watchful passenger, always', 'Gentle fatigue check-ins', 'Nothing new to buy'],
  },
  {
    icon: Building2,
    title: 'Fleet owners',
    desc: 'Roll out driver safety across the whole team in days, not months.',
    href: '/fleets',
    points: ['Fewer incidents & claims', 'Safety insights per trip', 'No per-vehicle hardware'],
    featured: true,
  },
  {
    icon: Shield,
    title: 'Insurers',
    desc: 'Telematics and risk insights without hardware friction.',
    href: '/insurers',
    points: ['Lower loss ratios', 'Anonymised trip signals', 'Reach more policyholders'],
  },
]