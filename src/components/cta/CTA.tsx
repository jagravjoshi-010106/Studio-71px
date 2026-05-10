'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const line1Ref    = useRef<HTMLHeadingElement>(null)
  const line2Ref    = useRef<HTMLHeadingElement>(null)
  const bodyRef     = useRef<HTMLParagraphElement>(null)
  const btnRef      = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true,
        },
      })

      tl.fromTo(labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
      .fromTo(line1Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.12
      )
      .fromTo(line2Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.24
      )
      .fromTo(bodyRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: 'power2.out' },
        0.5
      )
      .fromTo(btnRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.65
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Magnetic button effect
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const strength = 0.3

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      gsap.to(btn, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)

    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="cta"
      className="relative w-full px-5 sm:px-8 md:px-10 lg:px-14 py-16 md:py-[120px]"
      style={{ backgroundColor: '#FF3B1F' }}
    >
      <div style={{ maxWidth: 900 }}>
        <span
          ref={labelRef}
          className="font-mono text-[11px] tracking-[0.14em] uppercase block mb-8"
          style={{ color: 'rgba(242,240,236,0.5)' }}
        >
          Ready.
        </span>

        <h2
          ref={line1Ref}
          className="font-display font-medium text-paper tracking-[-0.04em] leading-[1.05]"
          style={{ fontSize: 'clamp(48px, 7vw, 120px)' }}
        >
          Tell us about
        </h2>
        <h2
          ref={line2Ref}
          className="font-display font-medium text-paper tracking-[-0.04em] leading-[1.05]"
          style={{ fontSize: 'clamp(48px, 7vw, 120px)', marginBottom: 32 }}
        >
          the work.
        </h2>

        <p
          ref={bodyRef}
          className="font-body text-[15px] leading-[1.7]"
          style={{ color: 'rgba(242,240,236,0.6)', marginBottom: 48 }}
        >
          We reply within 24 hours. Probably faster.
        </p>

        <Link
          ref={btnRef}
          href="/start"
          className="inline-flex items-center gap-3 font-display font-medium text-paper"
          style={{
            backgroundColor: '#0E0E0E',
            padding: '18px 36px',
            fontSize: 16,
            letterSpacing: '-0.01em',
            willChange: 'transform',
          }}
        >
          Start a project
          <span style={{ fontSize: 18 }}>→</span>
        </Link>
      </div>
    </section>
  )
}
