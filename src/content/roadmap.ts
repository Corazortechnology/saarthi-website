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
    theme: 'Saving lives one trip at a time',
    desc: 'On-device alerts for drowsiness, microsleep, and eyes-off-road — a calm co-pilot on every drive, with no extra hardware.',
  },
  {
    status: 'planned',
    title: 'Fleet dashboards & trip insights',
    theme: 'Scale safety across teams',
    desc: 'Roll out to every driver in days. Managers see trip-level safety signals to coach early and cut incidents before they become claims.',
  },
  {
    status: 'vision',
    title: 'Anonymised road intelligence',
    theme: 'Safer roads for everyone',
    desc: 'Aggregated, anonymised signals help surface rough stretches and high-risk corridors — improving journeys for all drivers over time.',
  },
  {
    status: 'vision',
    title: 'Insurance partnerships',
    theme: 'Fewer claims, fairer premiums',
    desc: 'Partner with insurers to reward safer driving with better rates — telematics without dongles, reaching millions of everyday drivers.',
  },
]
