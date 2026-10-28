import { Link } from 'react-router-dom'
import { Container } from './ui/Container'
import { Logo } from './ui/Logo'
import { CONTACT_EMAIL, contactMailto } from '../lib/contact'

type FooterLink = { label: string; to: string } | { label: string; href: string }

const COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Drivers', to: '/drivers' },
      { label: 'Fleets', to: '/fleets' },
      { label: 'Insurers', to: '/insurers' },
      { label: 'Roadmap', to: '/roadmap' },
      { label: 'Support', to: '/support' },
      { label: 'FAQ', to: '/drivers#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: contactMailto() },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', href: '#' },
      { label: 'Safety', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link to="/" aria-label="Saarthi home">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Saarthi is your safety co-pilot for the road, with timely alerts to help you stay attentive
              behind the wheel.
            </p>
            <a href={contactMailto()} className="mt-4 inline-block break-all text-sm text-accent hover:underline">{CONTACT_EMAIL}</a>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {'to' in l ? (
                      <Link to={l.to} className="text-sm text-fg/80 transition hover:text-accent">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="text-sm text-fg/80 transition hover:text-accent">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Saarthi by Corazor Technology. All rights reserved.</p>
          <p className="text-pretty text-center sm:text-right">
            Drive attentively. Saarthi assists, but never replaces, a focused driver.
          </p>
        </div>
      </Container>
    </footer>
  )
}
