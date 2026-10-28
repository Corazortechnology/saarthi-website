# Website content update — 28 October 2026

## Calendar-year 2025 road-safety figures

The site uses the 2025 eDAR totals presented by the Ministry of Road Transport
and Highways in a Lok Sabha written reply on 23 July 2026, as reported in:

- [Hindustan Times, 24 July 2026](https://www.hindustantimes.com/india-news/road-crash-deaths-rose-by-3-5-to-183-382-in-2025-government-tells-lok-sabha-101784872030023.html)
- [The Times of India, 24 July 2026](https://timesofindia.indiatimes.com/india/road-crashes-killed-a-record-1-8-lakh-in-2025-502-people-daily/articleshow/132593911.cms)

Both articles were read on 28 October 2026. These are reports of a government
reply; the original parliamentary answer was not independently retrieved.

| Figure | Value | Basis |
| --- | --- | --- |
| Road deaths in 2025 | 183,382 | Hindustan Times reports the exact national total |
| Road crashes in 2025 | 513,563 | Hindustan Times reports the exact national total |
| Change in deaths versus 2024 | +3.5% | Both articles |
| Change in crashes versus 2024 | +5.3% | Both articles |
| Average deaths per day | About 502 | 183,382 / 365, rounded |
| Average deaths per hour | About 21 | 183,382 / (365 × 24), rounded |

**Status: provisional, subject to revision.** The Times of India reports that
West Bengal used eDAR records as of 2 January 2026, while the other states and
union territories used records as of 22 July 2026. It notes that the national
death total could increase when West Bengal's data is updated. These figures
must not be described as a final annual report or as figures published in 2025.

The figures and source URLs are maintained in `src/content/road-safety-data.ts`.
The homepage and roadmap display the provisional label and linked citations.
The driver and fleet pages' year-on-year statements link to their source as well.

## Removed or clarified claims

- Replaced the older 2023 totals and removed the old speeding, age-group,
  highway-share, mobile-phone-death, global-share and GDP-cost statistics.
  The reviewed 2025 sources do not provide replacements for those breakdowns.
- Kept the city-driving illustration as a calculation: 50 km/h × 2 seconds
  is approximately 27.8 metres. It is not a reported crash statistic.
- Clarified unsupported guarantees about instant alerts, universal phone
  compatibility, two-minute setup, rollout timing, battery use and claims
  reduction. No new performance measurements are asserted.
- Corrected awkward wording, incomplete phrases and inconsistent terminology
  across the home, driver, fleet, insurer, roadmap and support copy.

## Contact

The user-specified address is **contact@saarthiiin.com** (three consecutive
letters `i` after `saarth`). It is maintained in `src/lib/contact.ts` and used
for general enquiries, fleet pilots, partnerships, waitlist requests and privacy
contacts. Mailbox provisioning and deliverability were not checked.

The existing privacy policy's effective date is retained; the contact update
date is displayed separately. No mail has been sent by this update.
