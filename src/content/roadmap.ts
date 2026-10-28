export type RoadmapPhase = {
  status: 'live' | 'planned' | 'vision'
  title: string
  theme: string
  desc: string
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    status: 'live',
    title: 'Driver fatigue & distraction alerts',
    theme: 'Supporting safer journeys',
    desc: 'Local alerts for signs of fatigue, prolonged eye closure and sustained distraction, using a compatible phone.',
  },
  {
    status: 'planned',
    title: 'Fleet dashboards & trip insights',
    theme: 'Scale safety across teams',
    desc: 'Help authorised fleet managers review trip-level safety events, understand patterns and guide driver coaching.',
  },
  {
    status: 'vision',
    title: 'Anonymised road intelligence',
    theme: 'Safer roads for everyone',
    desc: 'Use aggregated, anonymised road observations to help identify rough stretches and areas that need attention.',
  },
  {
    status: 'vision',
    title: 'Insurance partnerships',
    theme: 'Fewer claims, fairer premiums',
    desc: 'Explore insurance partnerships that use agreed safety indicators to support prevention programmes and assess opportunities to reward safer driving.',
  },
]
