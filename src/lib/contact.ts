/** Shared contact address for enquiries, partnerships, support and privacy. */
export const CONTACT_EMAIL = 'contact@saarthiiin.com'

export function contactMailto(subject?: string, body?: string) {
  const query = [
    subject ? `subject=${encodeURIComponent(subject)}` : '',
    body ? `body=${encodeURIComponent(body)}` : '',
  ].filter(Boolean).join('&')

  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ''}`
}
