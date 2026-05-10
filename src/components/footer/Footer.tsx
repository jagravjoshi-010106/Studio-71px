'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Services', section: 'services' },
  { label: 'Process', section: 'process' },
  { label: 'Work', section: 'work' },
  { label: 'About', section: 'about' },
  { label: 'FAQ', section: 'faq' },
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/71px.studio' },
  { label: 'X / Twitter', href: 'https://x.com/71pxstudio' },
]

export default function Footer() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (contentRef.current) setHeight(contentRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <>
      {/* Transparent spacer — sits after main, lets the fixed footer show through */}
      <div style={{ height }} />

      {/* Fixed footer content */}
      <div
        ref={contentRef}
        className="fixed bottom-0 left-0 w-full"
        style={{ backgroundColor: '#F2F0EC', zIndex: 0 }}
      >
        <div className="px-5 sm:px-8 md:px-10 lg:px-14 pt-12 md:pt-20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-16">
            {/* Wordmark */}
            <div className="shrink-0">
              <span
                className="font-display font-medium block leading-[0.9] tracking-[-0.05em] whitespace-nowrap"
                style={{ fontSize: 'clamp(64px, 10vw, 160px)', color: '#0E0E0E' }}
              >
                Studio 71<span className="font-mono" style={{ fontSize: '55%', verticalAlign: 'baseline' }}>px</span><span style={{ color: '#FF3B1F' }}>.</span>
              </span>
            </div>

            {/* Info columns */}
            <div className="flex flex-wrap gap-10 md:gap-20 pt-3">
              <div>
                <span
                  className="font-mono text-[10px] tracking-[0.14em] uppercase block mb-5"
                  style={{ color: 'rgba(14,14,14,0.4)' }}
                >
                  Navigate
                </span>
                <ul className="flex flex-col gap-3">
                  {NAV_LINKS.map(link => (
                    <li key={link.section}>
                      <button
                        onClick={() => {
                          const el = document.querySelector(`[data-section="${link.section}"]`)
                          if (el) el.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="font-body text-[14px] cursor-pointer"
                        style={{ color: '#0E0E0E', background: 'none', border: 'none', padding: 0 }}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span
                  className="font-mono text-[10px] tracking-[0.14em] uppercase block mb-5"
                  style={{ color: 'rgba(14,14,14,0.4)' }}
                >
                  Contact
                </span>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a
                      href="mailto:hello@71px.studio"
                      className="font-body text-[14px]"
                      style={{ color: '#0E0E0E', textDecoration: 'none' }}
                    >
                      hello@71px.studio
                    </a>
                  </li>
                  <li>
                    <span className="font-body text-[14px]" style={{ color: 'rgba(14,14,14,0.55)' }}>
                      Bengaluru, India
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <span
                  className="font-mono text-[10px] tracking-[0.14em] uppercase block mb-5"
                  style={{ color: 'rgba(14,14,14,0.4)' }}
                >
                  Social
                </span>
                <ul className="flex flex-col gap-3">
                  {SOCIALS.map(s => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-[14px]"
                        style={{ color: '#0E0E0E', textDecoration: 'none' }}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex justify-between items-center mx-5 sm:mx-8 md:mx-10 lg:mx-14 mt-10 md:mt-16 pt-5 pb-6"
          style={{ borderTop: '1px solid rgba(14,14,14,0.12)' }}
        >
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: 'rgba(14,14,14,0.4)' }}>
            © 2026 Studio 71PX
          </span>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: 'rgba(14,14,14,0.4)', textDecoration: 'none' }}>
              Privacy
            </Link>
            <Link href="/terms" className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: 'rgba(14,14,14,0.4)', textDecoration: 'none' }}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
