# Saarthi — Marketing Website

The marketing landing page for **Saarthi**, an on-phone driver-safety co-pilot.
"Your co-pilot for safer drives" — real-time driver safety, right from your phone,
with **no extra hardware**, on **iOS and Android**.

Built to match the Saarthi brand v1.1: calm, trustworthy, "confidence under motion",
blue-first identity, light + dark, WCAG-AA, and purposeful motion that respects
reduced-motion settings.

## Tech stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (class-based dark mode, brand tokens)
- [Framer Motion](https://www.framer.com/motion/) for animations / motion graphics
- [lucide-react](https://lucide.dev/) icons
- Bundled fonts via `@fontsource/inter` + `@fontsource/ibm-plex-mono` (offline-safe)

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  App.tsx                 # section composition
  index.css               # fonts, Tailwind layers, brand CSS variables
  hooks/useTheme.ts        # persisted light/dark theme (system default)
  lib/
    store-links.ts         # App Store / Google Play URLs (placeholders)
    motion.ts              # shared Framer Motion variants
    cn.ts                  # classnames helper
  components/
    Nav, Hero, NoHardware, Benefits, HowItHelps, WhoItsFor,
    RoadSafety, Trust, FAQ, DownloadCTA, Footer
    ui/                    # Container, Section, Reveal, ThemeToggle,
                           # StoreBadges, DeviceMockup, AnimatedCounter, Logo
```

## Configuration

- **Store links:** update `src/lib/store-links.ts` with the real App Store and
  Google Play URLs once the app is published. While both are `#`, the store
  badges show a "Launching soon" note automatically.
- **Brand colors:** defined as CSS variables in `src/index.css` and as Tailwind
  tokens in `tailwind.config.js`.

## Design principles (from the brand foundation)

- User-value framing only — the site never reveals how the product works internally.
- Calm, non-alarmist tone; single-purpose motion; reduced-motion fallbacks everywhere.
- Blue `#2563EB` as the single dominant CTA color; teal for supportive accents;
  purple used sparingly as an "insight accent".

## Deploy

Any static host works. The build outputs to `dist/`.

- **Vercel / Netlify:** framework preset "Vite", build command `npm run build`,
  output directory `dist`.
- **Static:** serve the contents of `dist/` behind any web server / CDN.

---

© Saarthi by Corazor Technology.
