/**
 * Calendar-year 2025 eDAR figures from the 23 July 2026 Lok Sabha reply,
 * reported by Hindustan Times and The Times of India on 24 July 2026.
 * These are provisional: West Bengal records were dated 2 January 2026;
 * other states/UTs used records dated 22 July 2026. See docs/CONTENT_SOURCES.md.
 */
export const ROAD_SAFETY_2025 = {
  year: 2025,
  deaths: 183382,
  crashes: 513563,
  deathIncreasePercent: 3.5,
  crashIncreasePercent: 5.3,
  daysInYear: 365,
  sources: {
    hindustanTimes: 'https://www.hindustantimes.com/india-news/road-crash-deaths-rose-by-3-5-to-183-382-in-2025-government-tells-lok-sabha-101784872030023.html',
    timesOfIndia: 'https://timesofindia.indiatimes.com/india/road-crashes-killed-a-record-1-8-lakh-in-2025-502-people-daily/articleshow/132593911.cms',
  },
} as const

export const ROAD_DEATHS_PER_DAY_2025 = Math.round(ROAD_SAFETY_2025.deaths / ROAD_SAFETY_2025.daysInYear)
export const ROAD_DEATHS_PER_HOUR_2025 = Math.round(ROAD_SAFETY_2025.deaths / (ROAD_SAFETY_2025.daysInYear * 24))
