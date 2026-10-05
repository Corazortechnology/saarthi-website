import { cn } from '../../lib/cn'

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn('inline-flex max-w-full shrink-0 overflow-hidden rounded-lg bg-white', className)}>
      <img
        src={showWordmark ? '/brand/lockup.png' : '/brand/mark.png'}
        alt="Saarthi Telematics"
        width={showWordmark ? 165 : 42}
        height={42}
        className={showWordmark ? 'h-[42px] w-[165px] max-w-full object-contain' : 'h-[42px] w-[42px] object-contain'}
      />
    </span>
  )
}
