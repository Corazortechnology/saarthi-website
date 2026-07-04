import icon from '../../assets/saarthi-icon.png'
import { cn } from '../../lib/cn'

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src={icon}
        alt="Saarthi"
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl shadow-sm ring-1 ring-black/5"
      />
      {showWordmark && (
        <span className="text-lg font-bold tracking-tight text-fg">Saarthi</span>
      )}
    </span>
  )
}
