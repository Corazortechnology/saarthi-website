/**
 * App store download links.
 *
 * Placeholders for now — swap in the real URLs once the app is published.
 * Everything on the site that links to a store reads from here.
 */
export const STORE_LINKS = {
  appStore: '#', // e.g. https://apps.apple.com/app/idXXXXXXXXX
  playStore: '#', // e.g. https://play.google.com/store/apps/details?id=com.honeyjain.saarthi
} as const

/** When true, badges render as "Coming soon" (links still work if provided). */
export const STORE_COMING_SOON =
  STORE_LINKS.appStore === '#' && STORE_LINKS.playStore === '#'
