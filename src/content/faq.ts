export type FaqItem = { q: string; a: string }

export const FAQ_ALL: FaqItem[] = [
  {
    q: 'Do I need to buy any extra hardware?',
    a: 'No. Saarthi runs entirely on a phone you already own — no dash-cams, dongles, sensors or wiring. Just mount your phone and start your drive.',
  },
  {
    q: 'Which phones does it work on?',
    a: 'Saarthi works on modern iPhones and Android phones. If your phone can run everyday apps and has a front camera, it can run Saarthi.',
  },
  {
    q: 'Will it drain my battery or data?',
    a: 'Saarthi runs on-device and is tuned for everyday driving — it is designed not to drain your battery during a typical trip. It keeps helping even with no internet connection, and does not track you when you are not driving.',
  },
  {
    q: 'Is my camera or video private?',
    a: 'Yes. Saarthi is private by design — your camera view stays on your phone during the drive. It looks out for you without sending your video away.',
  },
  {
    q: 'Does it work at night or offline?',
    a: 'Yes. Saarthi is designed to help day or night, and keeps watching out for you on stretches with no signal.',
  },
  {
    q: 'Can I roll this out to a whole fleet?',
    a: 'Absolutely. Because there’s no hardware to install, fleets can get every driver protected in days. Reach out and we’ll help you get started.',
  },
]

export const FAQ_DRIVERS: FaqItem[] = FAQ_ALL.filter((_, i) => i !== 5)

export const FAQ_FLEETS: FaqItem[] = [
  FAQ_ALL[5]!,
  {
    q: 'How long does fleet rollout take?',
    a: 'Most fleets go live in days, not months. Drivers download the app, mount their phone, and start — no per-vehicle installs or wiring.',
  },
  {
    q: 'Do we need dashcams or in-cab hardware?',
    a: 'No. Saarthi is pure software on drivers’ existing phones. That means lower upfront cost and faster scaling as you add vehicles.',
  },
  {
    q: 'What insights do fleet managers get?',
    a: 'Trip-level safety signals help you spot fatigue and distraction patterns early — so you can coach drivers and reduce incidents before they become claims.',
  },
  {
    q: 'Will it drain drivers’ phone batteries?',
    a: 'Saarthi is tuned for everyday driving and designed not to drain battery during a typical trip. Processing stays on-device; there is no background tracking when drivers are off duty.',
  },
]

export const FAQ_INSURERS: FaqItem[] = [
  {
    q: 'How does Saarthi help reduce claims?',
    a: 'By catching fatigue and distraction early — before a near-miss becomes a claim. Software-only deployment means you can reach more policyholders without hardware friction.',
  },
  {
    q: 'Is driver video sent to the cloud?',
    a: 'No. Saarthi is private by design. Camera processing stays on the phone during a drive; only anonymised, aggregated signals support risk insights.',
  },
  {
    q: 'Can this work with existing telematics programs?',
    a: 'Yes. Saarthi complements hardware telematics by covering the long tail of personal vehicles and gig fleets — phones drivers already carry.',
  },
  {
    q: 'What data do insurers receive?',
    a: 'Anonymised trip safety indicators — not raw video — designed to support fairer pricing, proactive outreach, and loss-ratio improvement at scale.',
  },
  {
    q: 'How fast can a pilot start?',
    a: 'Because there is no hardware to ship or install, pilots can begin in days. Contact us to scope a cohort and success metrics.',
  },
]
