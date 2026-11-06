import { useId } from 'react'
import { ArrowUpRight, ChevronRight, Crosshair, FileStack, Radio, Route } from 'lucide-react'
import { useInsurance } from '../context'
import { number } from './components'

/** Product illustration. The surrounding readings come from the selected mock vehicle. */
function VehicleSignalGraphic() {
  const { scope, data, go } = useInsurance()
  const prefix = useId().replaceAll(':', '')
  const vehicle = [...scope.vehicles].sort((a, b) => (scope.vehicleAnalytics.get(b.id)?.risk.score || 0) - (scope.vehicleAnalytics.get(a.id)?.risk.score || 0))[0]
  const record = vehicle && scope.vehicleAnalytics.get(vehicle.id)
  const trip = record?.trips.at(-1)
  const route = data.routes.find(r => r.id === trip?.routeId)
  return <div className="ins-signal-graphic">
    <div className="ins-signal-caption"><span><Crosshair size={13} /> VEHICLE EVIDENCE</span><span>ILLUSTRATED SIGNAL FLOW</span></div>
    <svg viewBox="0 0 620 350" role="img" aria-label={`Vehicle intelligence illustration${vehicle ? ` for ${vehicle.registration}, ${record?.metrics.uniqueDrivers} assigned drivers and ${record?.risk.score} illustrative risk` : ''}`}>
      <defs>
        <pattern id={`${prefix}-grid`} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#ffffff" strokeOpacity=".035" /></pattern>
        <radialGradient id={`${prefix}-field`}><stop stopColor="#d5f580" stopOpacity=".13" /><stop offset="1" stopColor="#d5f580" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${prefix}-body`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f1f2e9" /><stop offset=".46" stopColor="#a6b2ae" /><stop offset="1" stopColor="#687772" /></linearGradient>
        <linearGradient id={`${prefix}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#101b19" /><stop offset=".5" stopColor="#30443c" /><stop offset="1" stopColor="#15231f" /></linearGradient>
        <filter id={`${prefix}-shadow`} x="-60%" y="-40%" width="220%" height="180%"><feDropShadow dx="5" dy="15" stdDeviation="12" floodColor="#000" floodOpacity=".55" /></filter>
      </defs>
      <rect width="620" height="350" fill={`url(#${prefix}-grid)`} />
      <ellipse cx="315" cy="170" rx="205" ry="155" fill={`url(#${prefix}-field)`} />
      <g fill="none" stroke="#91a08a" strokeOpacity=".16"><ellipse cx="315" cy="174" rx="112" ry="94" /><ellipse cx="315" cy="174" rx="164" ry="126" /><ellipse cx="315" cy="174" rx="218" ry="160" strokeDasharray="2 7" /></g>
      <g className="ins-signal-orbit" fill="none" stroke="#dcf9a2" strokeWidth="1.3" opacity=".6"><ellipse cx="315" cy="174" rx="164" ry="126" strokeDasharray="35 850" /><ellipse cx="315" cy="174" rx="218" ry="160" strokeDasharray="18 1100" /></g>
      <path d="M305 128L238 61H103M343 209L423 275H510M342 132L421 66H523M272 213L220 271H95" fill="none" stroke="#9dae96" strokeOpacity=".5" strokeWidth="1" />
      <path className="ins-signal-path" d="M305 128L238 61H103M343 209L423 275H510M342 132L421 66H523M272 213L220 271H95" fill="none" stroke="#d5f580" strokeWidth="2" strokeDasharray="12 170" />
      <g transform="rotate(28 310 173)" filter={`url(#${prefix}-shadow)`}>
        <ellipse cx="310" cy="181" rx="58" ry="116" fill="#050b08" opacity=".5" />
        <g fill="#101714" stroke="#4a5750"><rect x="258" y="105" width="15" height="38" rx="5" /><rect x="347" y="105" width="15" height="38" rx="5" /><rect x="258" y="211" width="15" height="37" rx="5" /><rect x="347" y="211" width="15" height="37" rx="5" /></g>
        <path d="M278 70Q310 54 342 70L354 111V233Q354 265 339 279Q310 288 281 279Q266 265 266 233V111Z" fill={`url(#${prefix}-body)`} stroke="#dae1d2" strokeWidth="1.1" />
        <path d="M280 82Q310 69 340 82L341 107H279Z" fill="#c5cfc1" opacity=".65" />
        <path d="M278 119Q310 106 342 119L337 154H283Z" fill={`url(#${prefix}-glass)`} stroke="#52655a" />
        <path d="M282 158H338V211H282Z" fill="#b7c5b6" stroke="#dfebd4" strokeWidth=".7" />
        <path d="M286 164H334V204H286Z" fill="#98ac99" opacity=".65" />
        <path d="M282 216H338L342 243Q310 257 278 243Z" fill={`url(#${prefix}-glass)`} stroke="#52655a" />
        <path d="M276 128L275 204M345 128L345 204" stroke="#24392c" strokeWidth="3" /><path d="M278 250Q310 265 342 250" fill="none" stroke="#eff7de" opacity=".6" />
        <path d="M275 91L287 87M333 87L345 91" stroke="#edffd0" strokeWidth="5" strokeLinecap="round" /><path d="M277 269L289 273M331 273L343 269" stroke="#ff927c" strokeWidth="3" strokeLinecap="round" />
        <path d="M264 150L251 153M356 150L369 153" stroke="#aabbab" strokeWidth="6" strokeLinecap="round" />
        <circle cx="310" cy="178" r="5" fill="#d5f580" /><circle className="ins-sensor-pulse" cx="310" cy="178" r="11" fill="none" stroke="#d5f580" />
      </g>
      <g fontFamily="IBM Plex Mono, monospace"><text x="76" y="35" fontSize="9" fill="#94a297">ASSIGNED DRIVERS</text><text x="76" y="55" fontSize="20" fill="#f3f4ec">{record?.metrics.uniqueDrivers ?? '—'}</text><text x="435" y="39" fontSize="9" fill="#94a297">ILLUSTRATIVE RISK</text><text x="435" y="60" fontSize="20" fill="#d5f580">{record?.risk.score ?? '—'}<tspan fontSize="10" fill="#a3afa5"> /100</tspan></text><text x="60" y="291" fontSize="9" fill="#94a297">DRIVING EVENTS</text><text x="60" y="314" fontSize="20" fill="#f3f4ec">{number(record?.events.length || 0)}</text><text x="433" y="301" fontSize="9" fill="#94a297">RECORDED DISTANCE</text><text x="433" y="324" fontSize="17" fill="#f3f4ec">{number(record?.metrics.km || 0)}<tspan fontSize="9" fill="#a3afa5"> KM</tspan></text></g>
    </svg>
    <button className="ins-featured-vehicle" disabled={!vehicle} onClick={() => vehicle && go(`vehicles/${vehicle.id}`)}><span className="ins-signal-indicator" /><span><b>{vehicle?.registration || 'No vehicle in this cohort'}</b><small>{vehicle ? `${vehicle.model} · ${vehicle.region}` : 'Adjust the portfolio filters'}</small></span><span className="ins-featured-route">{route?.road || '—'}<small>{route?.terrain || ''}</small></span><ArrowUpRight size={19} /></button>
  </div>
}

export function PortfolioHero() {
  const { scope, filters, go } = useInsurance()
  const regions = new Set(scope.vehicles.map(v => v.region)).size
  const high = [...scope.vehicleAnalytics.values()].filter(a => a.risk.band === 'High').length
  const formatMonth = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  return <section className="ins-portfolio-hero">
    <div className="ins-hero-copy"><div className="ins-hero-overline"><span className="ins-signal-indicator" /> MOTOR INSURANCE / PORTFOLIO INTELLIGENCE</div><h2>Underwriting.<br /><span>With evidence.</span></h2><p>Driver behaviour, vehicle exposure and claims history—connected at the record level.</p><div className="ins-hero-actions"><button className="ins-btn primary" onClick={() => go('risk')}>Assess portfolio risk<ArrowUpRight size={17} /></button><button onClick={() => go('claims')}>Claims outcomes<ChevronRight size={16} /></button></div><div className="ins-hero-readings"><div><Radio size={14} /><b>{regions}</b><span>regions</span></div><div><Route size={14} /><b>{number(scope.metrics.trips)}</b><span>trips</span></div><div><FileStack size={14} /><b>{high}</b><span>high-risk vehicles</span></div></div><div className="ins-hero-period">{formatMonth(filters.from)} — {formatMonth(filters.to)}<span>DEMO DATA · SELECTED COHORT</span></div></div>
    <VehicleSignalGraphic />
  </section>
}
