import { Apple } from 'lucide-react'
import { STORE_COMING_SOON, STORE_LINKS } from '../../lib/store-links'
import { cn } from '../../lib/cn'

function GooglePlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path fill="#00D2FF" d="M47 24 285 262 47 500a24 24 0 0 1-11-20V44a24 24 0 0 1 11-20z" />
      <path fill="#00E676" d="M47 24a24 24 0 0 1 24 1l283 163-69 74z" />
      <path fill="#FFC107" d="M285 262l69-74 89 51c22 13 22 33 0 46l-89 51z" />
      <path fill="#FF3D57" d="M47 500a24 24 0 0 0 24-1l283-163-69-74z" />
    </svg>
  )
}

function Badge({
  href,
  glyph,
  topLine,
  bottomLine,
}: {
  href: string
  glyph: React.ReactNode
  topLine: string
  bottomLine: string
}) {
  const disabled = href === '#'
  return (
    <a
      href={href}
      {...(disabled
        ? { 'aria-disabled': true, tabIndex: -1, onClick: (e: React.MouseEvent) => e.preventDefault() }
        : { target: '_blank', rel: 'noreferrer' })}
      className={cn(
        'group relative inline-flex min-w-[168px] items-center gap-3 rounded-xl border border-white/10 bg-[#0B1020] px-4 py-2.5 text-white shadow-card transition',
        disabled ? 'cursor-default opacity-95' : 'hover:-translate-y-0.5 hover:border-white/25 hover:shadow-glow',
      )}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center">{glyph}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-wide text-white/70">{topLine}</span>
        <span className="-mt-0.5 text-[15px] font-semibold">{bottomLine}</span>
      </span>
    </a>
  )
}

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-start gap-3', className)}>
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          href={STORE_LINKS.appStore}
          glyph={<Apple className="h-6 w-6" fill="currentColor" />}
          topLine="Download on the"
          bottomLine="App Store"
        />
        <Badge
          href={STORE_LINKS.playStore}
          glyph={<GooglePlayGlyph className="h-6 w-6" />}
          topLine="Get it on"
          bottomLine="Google Play"
        />
      </div>
      {STORE_COMING_SOON && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-active/10 px-2.5 py-1 font-mono text-[11px] font-medium text-teal-rest dark:text-teal-restDark">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-active dark:bg-teal-activeDark" />
          Launching soon on iOS &amp; Android
        </span>
      )}
    </div>
  )
}
