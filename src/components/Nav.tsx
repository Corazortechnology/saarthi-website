import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from './ui/Container'
import { Logo } from './ui/Logo'
import { ThemeToggle } from './ui/ThemeToggle'
import { cn } from '../lib/cn'

const LINKS = [
  { label: 'The problem', href: '#impact' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Where it helps', href: '#use-cases' },
  { label: 'Who it’s for', href: '#fleets' },
  { label: 'FAQ', href: '#faq' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border/70 bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="shrink-0" aria-label="Saarthi home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface2/70 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#download"
            className="hidden rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-brand transition hover:brightness-110 sm:inline-flex"
          >
            Get the app
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-muted md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-border/70 bg-bg/95 backdrop-blur-xl transition-all duration-300 md:hidden',
          open ? 'max-h-96 border-b' : 'max-h-0',
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface2/70 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-brand-blue px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            Get the app
          </a>
        </Container>
      </div>
    </header>
  )
}
