import { useState } from 'react'
import { ArrowRight, BookOpen, Download, Play, Search } from 'lucide-react'
import { useInsurance } from '../context'
import { guideFaqs, guideMarkdown, guideSections, navigationTips, requirementGuide } from '../guide'
import { Badge, Card, Empty, PageHeading } from '../ui/components'

export function GuidePage({ startTour }: { startTour: () => void }) {
  const { go } = useInsurance()
  const [query, setQuery] = useState('')
  const matches = guideSections.filter(s => `${s.title} ${s.purpose} ${s.steps.join(' ')} ${s.tip}`.toLowerCase().includes(query.trim().toLowerCase()))
  const download = () => {
    const url = URL.createObjectURL(new Blob([guideMarkdown()], { type: 'text/markdown;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'saarthi-insurance-user-guide.md'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return <div className="ins-guide">
    <PageHeading eyebrow="GUIDE & HELP" title="Workspace guide" description="A practical guide to every section, the insurer’s questions and your first demonstration." action={<button className="ins-btn" onClick={download}><Download size={15} />Download guide</button>} />
    <div className="ins-guide-start">
      <div><Badge tone="green">START HERE</Badge><h2>Your first insurance walkthrough</h2><p>Follow 14 steps from portfolio overview to driver evidence, alerts, claims and proposed actions. The tour opens the full demo dataset.</p><button className="ins-btn primary" onClick={startTour}><Play size={15} />Start the 14-step tour</button></div>
      <div className="ins-guide-shortcuts"><b>Prefer to explore?</b><button onClick={() => go('overview')}><BookOpen size={17} /><span>Start at the overview<small>Understand the portfolio, then select a vehicle.</small></span><ArrowRight size={16} /></button><button onClick={() => go('scenarios')}><Play size={17} /><span>Pick a prepared story<small>Ten scenarios with linked evidence.</small></span><ArrowRight size={16} /></button></div>
    </div>
    <nav className="ins-guide-jumps" aria-label="Guide contents"><a href="#guide-navigation">Navigation basics</a><a href="#guide-sections">Section guide</a><a href="#guide-requirements">Requirements A–P</a><a href="#guide-questions">Common questions</a></nav>

    <section id="guide-navigation"><Card title="Navigation basics" subtitle="The controls you will use throughout the dashboard"><div className="ins-guide-basics">{navigationTips.map((tip, i) => <div key={tip.title}><span>{i + 1}</span><div><h3>{tip.title}</h3><p>{tip.text}</p></div></div>)}</div></Card></section>

    <section id="guide-sections"><Card title="What is in each section?" subtitle="Search by topic, then expand a section for exact steps."><div className="ins-guide-search"><label><Search size={17} /><input aria-label="Search guide sections" placeholder="Try mileage, camera, claims or service…" value={query} onChange={e => setQuery(e.target.value)} /></label><span role="status">{matches.length} of {guideSections.length} sections</span></div><div className="ins-guide-directory">{matches.map(section => <details key={section.id} className="ins-guide-detail"><summary><span><small>{section.group}</small><strong>{section.title}</strong><p>{section.purpose}</p></span></summary><div className="ins-guide-detail-body"><ol>{section.steps.map(step => <li key={step}>{step}</li>)}</ol><p className="ins-guide-tip">{section.tip}</p><button className="ins-btn" onClick={() => go(section.id)}>Open {section.title}<ArrowRight size={14} /></button></div></details>)}{!matches.length && <Empty title="No matching section" text="Try a broader topic or clear the search to see all sections." action={<button className="ins-btn" onClick={() => setQuery('')}>Clear guide search</button>} />}</div></Card></section>

    <section id="guide-requirements"><Card title="Where are the insurer’s requirements?" subtitle="A–P: select a requirement to open the starting section, then follow the path shown."><div className="ins-guide-requirements">{requirementGuide.map(r => <button key={r.code} onClick={() => go(r.path)}><b>{r.code}</b><span><strong>{r.need}</strong><small>{r.where}</small></span><ArrowRight size={15} /></button>)}</div><div className="ins-guide-claims"><div><b>The insurer’s objective: reduce claims</b><p>Use the claims ledger, coaching comparison and adjustable planner to explain the proposed approach. All outcomes remain simulated.</p></div><button className="ins-btn" onClick={() => go('claims')}>Open Claims outcomes<ArrowRight size={14} /></button></div></Card></section>

    <section id="guide-questions"><Card title="Common questions" subtitle="Recover a view, interpret a result or restart your presentation."><div className="ins-guide-directory">{guideFaqs.map(f => <details className="ins-guide-detail" key={f.question}><summary><strong>{f.question}</strong></summary><div className="ins-guide-detail-body"><p>{f.answer}</p></div></details>)}</div></Card></section>
  </div>
}
