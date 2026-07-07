import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Container } from './ui/Container'
import { Logo } from './ui/Logo'
import { ThemeToggle } from './ui/ThemeToggle'
import { cn } from '../lib/cn'

const LINKS = [
  { label: 'Drivers', to: '/drivers' },
  { label: 'Fleets', to: '/fleets' },
  { label: 'Insurers', to: '/insurers' },
  { label: 'Roadmap', to: '/roadmap' },
  { label: 'Support', to: '/support' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border/70 bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="shrink-0" aria-label="Saarthi home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-medium transition hover:bg-surface2/70 hover:text-fg',
                pathname === l.to ? 'text-fg' : 'text-muted',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/#download"
            className="hidden rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-brand transition hover:brightness-110 sm:inline-flex"
          >
            Get the app
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-muted lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          'overflow-hidden border-border/70 bg-bg/95 backdrop-blur-xl transition-all duration-300 lg:hidden',
          open ? 'max-h-[28rem] border-b' : 'max-h-0',
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                'rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-surface2/70 hover:text-fg',
                pathname === l.to ? 'text-fg' : 'text-muted',
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/#download"
            className="mt-1 rounded-xl bg-brand-blue px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            Get the app
          </Link>
        </Container>
      </div>
    </header>
  )
}
