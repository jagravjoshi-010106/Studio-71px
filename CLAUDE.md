# Studio 71PX — Landing Page

Premium web design studio. An experience, not a page.
Full brand spec: `Docs/71px-brand-guidelines.md` — read before touching copy, color, or type.

## Stack

- **Framework:** Next.js 15 App Router · TypeScript (strict)
- **Styling:** Tailwind CSS v4 with brand design tokens
- **Animation:** GSAP + ScrollTrigger · Motion (Framer Motion) · Lenis (smooth scroll)
- **3D:** React Three Fiber — on standby for WebGL signature moments
- **Package manager:** npm · **Hosting:** Vercel

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run lint     # lint
```

## Design Tokens

Colors: `Ink #0E0E0E` · `Paper #F2F0EC` · `Pixel Red #FF3B1F` · `Cobalt #1B28FF` · `Acid #D4FF38`
Fonts: Space Grotesk (display, 500) · Inter (body, 400/500) · Instrument Serif Italic (accent) · JetBrains Mono (labels)

## Site Structure

```
/ (one long scroll)
Loader → Hero → Marquee → Services → Process → Work → Case Study → Why 71PX → Testimonials → About → FAQ → CTA → Footer

/start — project intake form (separate page)
```

## Motion Rules

- One signature moment per page. Not five. One.
- Cursor: 18px default · T-beam on text · Pixel Red on links.
- Page transitions: curtain wipe · 480ms · ease-out cubic.
- No scroll-jacking. No "every section fades in."

## Brand Voice (quick ref)

- Short sentences. Confident. Dry. No exclamation marks. Sentence case.
- Banned words: synergy, unlock, holistic, world-class, leverage, cutting-edge, journey, ecosystem.
- Name: **71PX** (default) · **Studio 71PX** (first mention / legal). Never `71Px`, `71 PX`, or `Studio71PX`.
- Background always `Ink #0E0E0E`. Text always `Paper #F2F0EC`. Never pure white backgrounds.

## Code Conventions

- Components: `src/components/` · one file per component.
- Animation logic: `src/lib/animations/` · all GSAP timelines live here.
- Fonts loaded via `next/font/google`.
- No inline styles — Tailwind utilities or CSS custom properties only.
- Phase builds: complete one section fully before starting the next.
