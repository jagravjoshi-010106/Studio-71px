'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TRACK_1 = [
  'D2C brands',
  'SaaS products',
  'Fashion labels',
  'Hospitality',
  'Fintech',
  'Consumer apps',
]

const TRACK_2 = [
  'Websites that convert',
  'Brands that stick',
  'Design that sells',
  'Work that wins',
  'Built to last',
]

function Dot() {
  return (
    <span className="font-mono text-pixel-red mx-4 select-none" aria-hidden>·</span>
  )
}

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="marquee"
      className="relative z-10 bg-paper overflow-hidden py-12 select-none"
      style={{ opacity: 0 }}
    >
      {/* Track 1 — scrolls left */}
      <div className="overflow-hidden mb-4">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-left 32s linear infinite' }}
        >
          {[...TRACK_1, ...TRACK_1].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center font-display font-medium text-ink leading-none tracking-[-0.03em]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}
            >
              {item}<Dot />
            </span>
          ))}
        </div>
      </div>

      {/* Track 2 — scrolls right */}
      <div className="overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-right 26s linear infinite' }}
        >
          {[...TRACK_2, ...TRACK_2].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center font-display font-medium text-ink/60 leading-none tracking-[-0.02em]"
              style={{ fontSize: 'clamp(18px, 2.2vw, 34px)' }}
            >
              {item}<Dot />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
