'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

const NAV = [
  { label: 'How we work',         href: '/#process' },
  { label: 'About',              href: '/#about' },
  { label: 'Start a project',    href: '/start'  },
  { label: 'hello@71px.studio',  href: 'mailto:hello@71px.studio' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function MenuOverlay({ open, onClose }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const linksRef    = useRef<(HTMLLIElement | null)[]>([])
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


  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden flex-col justify-between bg-paper px-10 py-8"
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      {/* Logo */}
      <div className="flex items-start justify-between">
        <Link
          href="/"
          className="font-display font-medium text-ink"
          style={{ fontSize: 18, textDecoration: 'none' }}
        >
          Studio 71<span className="font-mono" style={{ fontSize: '55%', verticalAlign: '0.05em' }}>px</span>
          <span className="font-mono text-pixel-red" style={{ fontSize: '55%', verticalAlign: '0.05em' }}>.</span>
        </Link>
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
              <button
                onClick={() => {
                  onClose()
                  if (item.href.startsWith('/#')) {
                    const section = item.href.replace('/#', '')
                    if (window.location.pathname !== '/') {
                      window.location.href = item.href
                    } else {
                      setTimeout(() => {
                        const el = document.querySelector(`[data-section="${section}"]`)
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }, 500)
                    }
                  } else {
                    window.location.href = item.href
                  }
                }}
                className="group inline-block font-display font-medium text-ink leading-[1.1] tracking-[-0.03em] transition-colors duration-200 hover:text-pixel-red cursor-pointer bg-transparent border-none p-0 text-left"
                style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}
              >
                {item.label}
              </button>
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
          Est. 2026
        </span>
      </div>

    </div>
  )
}
