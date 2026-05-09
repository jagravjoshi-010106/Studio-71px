'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

const NAV = [
  { label: 'Work',               href: '/#work'  },
  { label: 'About',              href: '/#about' },
  { label: 'Start a project',    href: '/start'  },
  { label: 'hello@71px.studio',  href: 'mailto:hello@71px.studio' },
]

interface Props {
  open: boolean
}

export default function MenuOverlay({ open }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const linksRef    = useRef<(HTMLLIElement | null)[]>([])
  const miniOrbRef  = useRef<HTMLDivElement>(null)

  /* Open / close animation */
  useEffect(() => {
    const overlay = overlayRef.current
    const links   = linksRef.current.filter(Boolean)
    if (!overlay) return

    if (open) {
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(
        overlay,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.52, ease: 'power4.inOut' }
      )
      gsap.fromTo(
        links,
        { x: -48, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, delay: 0.3 }
      )
    } else {
      gsap.to(links, { x: -24, opacity: 0, duration: 0.25, ease: 'power2.in', stagger: 0.04 })
      gsap.to(overlay, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.45,
        ease: 'power4.inOut',
        delay: 0.15,
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
    }
  }, [open])

  /* Mini orb follows cursor inside menu */
  useEffect(() => {
    const orb = miniOrbRef.current
    if (!orb) return

    const xTo = gsap.quickTo(orb, 'x', { duration: 0.6, ease: 'power3' })
    const yTo = gsap.quickTo(orb, 'y', { duration: 0.6, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 40)
      yTo(e.clientY - 40)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden flex-col justify-between bg-paper px-10 py-8"
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      {/* Logo */}
      <div className="flex items-start justify-between">
        <span className="font-display font-medium text-ink" style={{ fontSize: 18 }}>
          Studio 71<span className="font-mono" style={{ fontSize: '55%', verticalAlign: '0.05em' }}>px</span>
          <span className="font-mono text-pixel-red" style={{ fontSize: '55%', verticalAlign: '0.05em' }}>.</span>
        </span>
      </div>

      {/* Nav links */}
      <nav>
        <ul className="flex flex-col gap-2">
          {NAV.map((item, i) => (
            <li
              key={item.href}
              ref={(el) => { linksRef.current[i] = el }}
              style={{ opacity: 0 }}
            >
              <Link
                href={item.href}
                className="group inline-block font-display font-medium text-ink leading-[1.1] tracking-[-0.03em] transition-colors duration-200 hover:text-pixel-red"
                style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer metadata */}
      <div className="flex items-end justify-between">
        <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-ink/50">
          Bengaluru · IST · GMT+5:30
        </span>
        <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-ink/50">
          Est. 2024
        </span>
      </div>

      {/* Mini orb — follows cursor */}
      <div
        ref={miniOrbRef}
        className="fixed pointer-events-none rounded-full"
        style={{
          width: 80,
          height: 80,
          background: 'radial-gradient(circle at 35% 30%, #ff9944, #FF3B1F 50%, #1a0202)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 210,
          top: 0,
          left: 0,
        }}
      />
    </div>
  )
}
