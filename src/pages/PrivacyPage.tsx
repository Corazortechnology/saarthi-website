import { Container } from '../components/ui/Container'

export function PrivacyPage() {
  return (
    <main className="pt-28 pb-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-extrabold text-fg">Privacy policy</h1>
        <p className="mt-3 text-sm text-muted">Effective 2 October 2026</p>
        <div className="mt-10 space-y-7 text-muted">
          <section>
            <h2 className="text-xl font-semibold text-fg">What Saarthi collects</h2>
            <p className="mt-2">Account details, driver-safety events, active-drive location, device diagnostics, and consented model-tuning data. Family and Fleet apps receive only information authorized for their relationship or organization.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-fg">How data is used</h2>
            <p className="mt-2">We use data to operate safety monitoring, deliver alerts, show active-drive status, prevent abuse, provide support, and—with separate consent—improve safety models.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-fg">Sharing and retention</h2>
            <p className="mt-2">We do not sell personal data. Data is shared with linked family members, authorized fleet operators, and infrastructure providers only as needed to provide the service. Location sharing is limited to active drives and stale locations are clearly identified.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-fg">Your choices</h2>
            <p className="mt-2">You can revoke Family or Fleet links, control optional tuning capture, and request access, correction, export, or deletion by emailing privacy@saarthiin.com.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-fg">Security and contact</h2>
            <p className="mt-2">Saarthi uses authenticated access, encrypted transport, scoped relationships, and expiring credentials. For privacy or security questions, contact privacy@saarthiin.com.</p>
          </section>
        </div>
      </Container>
    </main>
  )
}
