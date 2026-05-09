'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroHeadline from './HeroHeadline'
import { useLoaderContext } from '@/lib/context/loader-context'
import Link from 'next/link'

export default function Hero() {
  const { loaderComplete } = useLoaderContext()
  const ctaRef      = useRef<HTMLAnchorElement>(null)
  const scrollRef   = useRef<HTMLSpanElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaderComplete) return

    gsap.fromTo(
      [ctaRef.current, scrollRef.current],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1, delay: 0.55 }
    )
    gsap.fromTo(
      rightColRef.current,
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 }
    )
  }, [loaderComplete])

  return (
    // No bg-ink here — body already is ink. No explicit z-index so section
    // paints at z-auto (below orb at z-8). Text at z-10 stays above orb.
    <section
      data-section="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Text layer — above the orb */}
      <div className="relative z-10 flex h-full items-center justify-between px-14">

        {/* Left: headline + CTA */}
        <div className="flex flex-col">
          <HeroHeadline animate={loaderComplete} />
          <div className="mt-10">
            <Link
              ref={ctaRef}
              href="/start"
              className="group inline-flex items-center gap-3 font-mono font-medium text-paper text-[13px] tracking-[0.06em] uppercase border border-paper/30 px-6 py-3 transition-colors duration-300 hover:bg-pixel-red hover:border-pixel-red"
              style={{ opacity: 0 }}
            >
              Work with us
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Right: studio detail */}
        <div
          ref={rightColRef}
          className="flex flex-col items-end gap-6 text-right"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col items-end gap-3">
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-paper/40">
              What we build
            </span>
            <ul className="flex flex-col gap-1">
              {['Brand identity', 'Marketing sites', 'Web applications'].map((s) => (
                <li key={s} className="font-display font-medium text-paper/70 text-[15px] tracking-[-0.02em]">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-px h-12 bg-paper/20 self-end" />

          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-paper/40">Studio</span>
            <span className="font-display font-medium text-paper/70 text-[15px] tracking-[-0.02em]">
              Bengaluru · Est. 2024
            </span>
          </div>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-14 z-10 flex items-center gap-3">
        <span
          ref={scrollRef}
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-paper/50"
          style={{ opacity: 0 }}
        >
          Scroll
        </span>
        <span className="font-mono text-[11px] text-paper/50">↓</span>
      </div>
    </section>
  )
}
