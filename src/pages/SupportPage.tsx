import { type FormEvent, useState } from 'react'
import { ArrowRight, Heart, Share2, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROADMAP_PHASES } from '../content/roadmap'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Section, SectionHeading } from '../components/ui/Section'
import { CONTACT_EMAIL, contactMailto } from '../lib/contact'

export function SupportPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [wantsSupport, setWantsSupport] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    window.location.href = contactMailto(
      'Saarthi support waitlist',
      `Name: ${name}\nEmail: ${email}\nInterested in supporting: ${wantsSupport ? 'Yes' : 'Not yet'}\n`,
    )
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-blue/[0.08] to-transparent" />
        <Container className="pb-12 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted">
              <Heart className="h-3.5 w-3.5 text-accent" />
              Community support
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
              Help us put a <span className="text-gradient">safety co-pilot</span> in more vehicles.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted">
              We&apos;re building Saarthi to support safer journeys, one drive at a time.
              Join a community working towards safer roads, starting with the phone you already own.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Why support matters"
          title="Every contribution accelerates the roadmap"
          subtitle="Funding helps us reach more drivers, ship fleet tools faster, and partner with insurers — all toward fewer preventable crashes."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {ROADMAP_PHASES.slice(0, 2).map((phase) => (
            <div key={phase.title} className="rounded-2xl border border-border/70 bg-surface/60 p-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <Target className="h-3.5 w-3.5" />
                {phase.theme}
              </div>
              <h3 className="mt-2 font-semibold text-fg">{phase.title}</h3>
              <p className="mt-2 text-sm text-muted">{phase.desc}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
          <Link to="/roadmap" className="font-semibold text-brand-blue hover:underline dark:text-brand-blueLight">
            See the full roadmap →
          </Link>
        </p>
      </Section>

      <Section className="bg-surface/30">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Join the waitlist"
              title="Stay close to the mission"
              subtitle="Send us your details by email for updates on launches, pilots and ways to support Saarthi. Joining the waitlist is free."
            />
            {submitted ? (
              <p className="mt-8 rounded-xl border border-ok/30 bg-ok/10 p-4 text-sm text-fg">
                Your email app should open with a draft message. Send it to request a place on the waitlist.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label htmlFor="support-name" className="block text-sm font-medium text-fg">
                    Name
                  </label>
                  <input
                    id="support-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border/70 bg-bg px-4 py-2.5 text-sm text-fg outline-none ring-accent/30 transition focus:ring-2"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="support-email" className="block text-sm font-medium text-fg">
                    Email
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border/70 bg-bg px-4 py-2.5 text-sm text-fg outline-none ring-accent/30 transition focus:ring-2"
                    autoComplete="email"
                  />
                </div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={wantsSupport}
                    onChange={(e) => setWantsSupport(e.target.checked)}
                    className="mt-1 rounded border-border"
                  />
                  I&apos;d like to support Saarthi when community funding opens
                </label>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:brightness-110 sm:w-auto"
                >
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
            <p className="mt-5 text-sm text-muted">
              You can also email us at{' '}
              <a href={contactMailto()} className="break-all font-medium text-accent underline underline-offset-2">{CONTACT_EMAIL}</a>.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-surface/60 p-8">
            <Share2 className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-xl font-semibold text-fg">Share with a driver you care about</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Not ready to support financially? Tell a friend, family member, or fleet operator about Saarthi.
              Help more drivers discover tools that support safer journeys.
            </p>
            <Link
              to="/drivers"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue dark:text-brand-blueLight"
            >
              Learn about Saarthi for drivers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
