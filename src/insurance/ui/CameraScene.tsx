import { useId } from 'react'
import type { CameraEvent, DemoCameraAnalysis } from '../data/model'

/** An authored scene illustration; annotations retain their source-record coordinates. */
export function CameraScene({ camera, analysis }: { camera: CameraEvent; analysis?: DemoCameraAnalysis }) {
  const id = useId().replaceAll(':', '')
  const cabin = camera.view === 'Cabin'
  return <svg viewBox="0 0 320 135" aria-label={`${camera.view} simulated evidence illustration`} role="img">
    <defs>
      <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="#122820" /><stop offset="1" stopColor="#526c59" /></linearGradient>
      <linearGradient id={`${id}-road`} x2="0" y2="1"><stop stopColor="#536057" /><stop offset="1" stopColor="#18251f" /></linearGradient>
      <linearGradient id={`${id}-metal`} x2="1" y2="1"><stop stopColor="#b8c4b1" /><stop offset=".5" stopColor="#657963" /><stop offset="1" stopColor="#314737" /></linearGradient>
      <radialGradient id={`${id}-light`}><stop stopColor="#d7ecb4" stopOpacity=".16" /><stop offset="1" stopColor="#d7ecb4" stopOpacity="0" /></radialGradient>
      <pattern id={`${id}-scan`} width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 3H3" stroke="#d8efcb" strokeOpacity=".045" strokeWidth=".5" /></pattern>
    </defs>
    <rect width="320" height="135" fill={`url(#${id}-sky)`} />
    {cabin ? <>
      <path d="M0 0H320V135H0Z M22 105V47Q28 17 78 13H248Q289 17 298 47V105Z" fill="#0d1a14" fillRule="evenodd" />
      <path d="M24 46L41 26H82L73 82H28ZM244 24H274L296 48V83H255Z" fill="#62826a" opacity=".4" />
      <path d="M54 107V51Q54 37 72 36H139Q158 37 158 53V108M190 109V50Q190 38 205 37H258Q273 38 275 53V109" stroke="#64725f" strokeWidth="2" fill="#23372a" />
      <rect x="79" y="27" width="66" height="32" rx="11" fill="#304734" stroke="#6b7b61" strokeWidth=".7" />
      <rect x="202" y="29" width="61" height="30" rx="10" fill="#304734" stroke="#61775b" strokeWidth=".7" />
      <path d="M73 112Q72 78 96 71L129 70Q155 79 161 112" fill={`url(#${id}-metal)`} />
      <path d="M98 71L108 84L120 83L130 71" fill="#87967b" />
      <path d="M96 51Q93 29 112 28Q136 27 135 49L132 63Q120 75 108 68L99 60Z" fill="#9ba78c" />
      <path d="M95 49Q91 27 112 26Q135 24 137 45L129 38L119 42L101 37Z" fill="#25342a" />
      <path d="M105 51L111 50M123 50L129 51M116 52L113 59L119 59M113 65H123" stroke="#4d6150" strokeWidth="1.3" fill="none" />
      <path d="M83 74L140 112" stroke="#172a22" strokeWidth="5" /><path d="M82 74L139 112" stroke="#8b9b7d" strokeWidth=".7" />
      {camera.observation.includes('turnover') ? <>
        <path d="M209 111Q207 78 228 73H246Q267 83 267 111" fill="#617658" />
        <path d="M220 50Q217 33 235 32Q253 34 252 50L249 62Q234 78 223 61Z" fill="#a1ad91" />
        <path d="M219 48Q217 31 235 30Q255 30 253 50L246 43L229 39Z" fill="#293f2c" />
      </> : <><path d="M131 104L145 79L151 83L145 111" fill="#a0ac8e" /><rect x="138" y="64" width="15" height="27" rx="2.5" fill="#101f18" stroke="#b5c7a0" strokeWidth=".8" /><rect x="141" y="67" width="9" height="19" rx="1" fill="#668e63" /><circle cx="146" cy="89" r=".8" fill="#d9efbf" /></>}
      <circle cx="195" cy="99" r="22" stroke="#12241b" strokeWidth="8" fill="none" /><circle cx="195" cy="99" r="22" stroke="#748369" strokeWidth="1" fill="none" /><path d="M174 99H216M195 100V120" stroke="#526447" strokeWidth="4" /><circle cx="195" cy="100" r="7" fill="#1a2e20" />
      <path d="M0 116Q160 96 320 117V135H0Z" fill="#0f1d16" />
    </> : <>
      <path d="M0 52L26 41L42 46L70 32L85 40L116 36L142 44L172 36L199 42L224 30L255 40L285 28L320 37V80H0Z" fill="#304d3b" />
      <path d="M8 61V36H23V61M31 63V30H49V65M53 62V40H71V64M266 63V32H282V63M287 63V22H308V65" fill="#263f32" stroke="#52715a" strokeWidth=".6" />
      <path d="M13 41H19M13 46H19M36 35H42M36 41H42M271 38H277M294 29H301M294 35H301" stroke="#adc194" strokeWidth="1.5" opacity=".35" />
      <path d="M143 52L22 135H298L178 52Z" fill={`url(#${id}-road)`} />
      <path d="M146 54L55 133M176 54L271 133" stroke="#c6ccb0" strokeOpacity=".7" strokeWidth="1.2" />
      <path d="M161 61V66M160 70V81M159 91L156 111" stroke="#d4d7be" strokeWidth="2" />
      <path d="M134 63L0 96M185 63L320 96" stroke="#869578" strokeWidth="2" /><path d="M113 70V86M76 82V104M210 71V87M250 82V104" stroke="#788c6f" strokeWidth="1.4" />
      <path d="M142 61L112 116H245L177 61Z" fill="#c8ec8c" fillOpacity=".035" stroke="#c8ec8c" strokeOpacity=".2" strokeWidth=".6" strokeDasharray="3 3" />
      <ellipse cx="195" cy="111" rx="27" ry="5" fill="#0b1811" opacity=".7" />
      <rect x="173" y="81" width="43" height="29" rx="5" fill={`url(#${id}-metal)`} stroke="#a9b89b" strokeWidth=".6" />
      <path d="M178 83L182 73H207L212 83" fill="#95a587" stroke="#a9b89b" strokeWidth=".6" /><path d="M181 82L184 76H205L208 82Z" fill="#1c3429" />
      <path d="M176 91H184M205 91H213" stroke={camera.view === 'Rear' ? '#eff3cd' : '#e88d74'} strokeWidth="2.5" /><path d="M177 103H213" stroke="#2d4434" strokeWidth="2" /><rect x="189" y="96" width="11" height="4" rx=".7" fill="#bcc8aa" />
      <rect x="172" y="102" width="4" height="10" rx="1" fill="#0e1d14" /><rect x="213" y="102" width="4" height="10" rx="1" fill="#0e1d14" />
    </>}
    <ellipse cx="165" cy="70" rx="135" ry="85" fill={`url(#${id}-light)`} />
    <rect width="320" height="135" fill={`url(#${id}-scan)`} />
    <path d="M10 24V10H28M292 10H310V24M10 104V116H28M292 116H310V104" fill="none" stroke="#cedeb4" strokeOpacity=".6" strokeWidth=".7" />
    {analysis?.findings.filter(f => f.box).map((f, i) => {
      const [x, y, w, h] = f.box!
      return <g key={i}><rect x={x * 320} y={y * 135} width={w * 320} height={h * 135} fill="#d8f58a" fillOpacity=".035" stroke="#d8f58a" strokeWidth=".8" /><rect className="ins-camera-scanner" x={x * 320} y={y * 135} width={w * 320} height={h * 135} fill="#d8f58a" fillOpacity=".08" /><rect x={x * 320} y={Math.max(3, y * 135 - 13)} width={Math.min(155, 320 - x * 320)} height="12" rx="2" fill="#182b1f" /><text x={x * 320 + 3} y={Math.max(12, y * 135 - 4)} fill="#e0f3bb" fontFamily="IBM Plex Mono, monospace" fontSize="6.2">{f.label.length > 20 ? `${f.label.slice(0, 18)}…` : f.label} · {Math.round(f.confidence * 100)}%</text></g>
    })}
    <rect y="122" width="320" height="13" fill="#0d1c14" fillOpacity=".85" /><text x="12" y="131" fill="#b3c6a2" fontFamily="IBM Plex Mono, monospace" fontSize="5.5">ILLUSTRATED SCENE · DEMO ANNOTATIONS</text><text x="308" y="131" textAnchor="end" fill="#d8f58a" fontFamily="IBM Plex Mono, monospace" fontSize="5.5">{camera.view.toUpperCase()} / {analysis?.findings.filter(f => f.box).length || 0} REGIONS</text>
  </svg>
}
