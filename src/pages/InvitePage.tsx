import { useSearchParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'

export function InvitePage({ kind }: { kind: 'family' | 'fleet' }) {
  const [params] = useSearchParams()
  const code = (params.get('code') ?? '').trim().toUpperCase()
  const appName = kind === 'family' ? 'Saarthi Family' : 'Saarthi Driver'

  return (
    <main className="pt-28 pb-20">
      <Container className="max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-fg">Open your invitation</h1>
        <p className="mt-4 text-muted">
          Open this link on a phone with {appName} installed. If the app does not
          open automatically, copy the secure one-time code below.
        </p>
        <div className="mt-8 rounded-2xl border border-border/70 bg-surface/60 p-7">
          <p className="font-mono text-2xl font-bold tracking-widest text-fg">
            {code || 'Invitation code missing'}
          </p>
        </div>
        <button
          type="button"
          disabled={!code}
          onClick={() => navigator.clipboard.writeText(code)}
          className="mt-6 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          Copy invitation code
        </button>
        <p className="mt-6 text-sm text-muted">
          Only accept invitations from a driver or fleet administrator you know.
        </p>
      </Container>
    </main>
  )
}
