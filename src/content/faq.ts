export type FaqItem = { q: string; a: string }

export const FAQ_ALL: FaqItem[] = [
  {
    q: 'Do I need to buy any extra hardware?',
    a: 'Driver monitoring uses a compatible phone and a secure mount. You do not need a dedicated dashcam, dongle or wired monitoring unit. Complete account setup and calibration before driving.',
  },
  {
    q: 'Which phones does it work on?',
    a: 'Saarthi is built for supported iPhones and Android phones. Feature availability depends on the device, operating system and camera capabilities. Contact our team to check suitability for a pilot.',
  },
  {
    q: 'How much battery and data does it use?',
    a: 'Battery use depends on your phone, trip length and enabled features. Keep your phone charged on longer journeys. Local fatigue and distraction alerts can work offline after setup; trip synchronisation and other online services use data.',
  },
  {
    q: 'How is my camera data handled?',
    a: 'Routine driver monitoring processes camera frames on your phone. Optional research or model-tuning capture requires separate consent. See our privacy policy for information about collected data and your choices.',
  },
  {
    q: 'Does it work at night or offline?',
    a: 'Local fatigue and distraction monitoring can continue without internet access once setup is complete. The camera needs a clear, adequately lit view of your face; performance depends on the phone and lighting conditions.',
  },
  {
    q: 'Can I roll this out to a whole fleet?',
    a: 'Contact us to plan a fleet pilot. We’ll help you choose suitable phones, define the driver group and agree on setup, training and success measures.',
  },
]

export const FAQ_DRIVERS: FaqItem[] = FAQ_ALL.filter((_, i) => i !== 5)

export const FAQ_FLEETS: FaqItem[] = [
  FAQ_ALL[5]!,
  {
    q: 'How long does fleet rollout take?',
    a: 'Timing depends on fleet size, phone compatibility and onboarding needs. We’ll agree on a schedule with you before the pilot begins.',
  },
  {
    q: 'Do we need dashcams or in-cab hardware?',
    a: 'Driver monitoring uses compatible phones and secure mounts, without a dedicated monitoring unit or vehicle wiring.',
  },
  {
    q: 'What insights do fleet managers get?',
    a: 'Authorised fleet teams can review trip-level safety events to understand fatigue and distraction patterns and support driver coaching.',
  },
  {
    q: 'Will it drain drivers’ phone batteries?',
    a: 'Camera-based monitoring uses battery power. Consumption varies by phone, trip length and enabled features, so we recommend planning charging arrangements for longer shifts.',
  },
]

export const FAQ_INSURERS: FaqItem[] = [
  {
    q: 'How could Saarthi support claims prevention?',
    a: 'Fatigue and distraction alerts can support safer driving decisions. An agreed pilot can measure safety outcomes and explore their relationship to claims; claims reduction has not yet been established.',
  },
  {
    q: 'Is driver video sent to the cloud?',
    a: 'Routine driver monitoring processes camera frames on the phone. Insurance pilots would use an agreed data-sharing scope with appropriate consent; raw driver video is not part of the proposed insurer insights.',
  },
  {
    q: 'Can this work with existing telematics programmes?',
    a: 'Saarthi can complement a telematics programme with driver-safety signals from compatible phones. Integration requirements and available data should be agreed during pilot planning.',
  },
  {
    q: 'What data do insurers receive?',
    a: 'The proposed insights focus on aggregated or anonymised trip-safety indicators. The exact data, access permissions and permitted uses must be agreed for each partnership.',
  },
  {
    q: 'How fast can a pilot start?',
    a: 'Contact us to agree on the participant group, phone compatibility, consent process, integrations and success measures. These determine the pilot schedule.',
  },
]
