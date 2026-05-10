'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AboutFounderCard from './AboutFounderCard'

gsap.registerPlugin(ScrollTrigger)

const FOUNDERS = [
  {
    number: '01',
    name: 'Vrushank K.',
    role: 'Design & Development',
    bio: 'Handles the full craft stack — from brand identity and visual systems to production-ready code and the technical SEO foundation that makes sure the right people actually find what we build.',
    image: '/vrushank.jpg',
  },
  {
    number: '02',
    name: 'Jagrav J.',
    role: 'Design & Strategy',
    bio: 'Bridges the gap between what a business needs and what its website communicates. Brings commercial thinking to design decisions that most studios treat as purely aesthetic.',
    image: '/jagrav.jpg',
  },
]

export default function About() {
  const sectionRef    = useRef<HTMLElement>(null)
  const labelRef      = useRef<HTMLSpanElement>(null)
  const line1Ref      = useRef<HTMLHeadingElement>(null)
  const line2Ref      = useRef<HTMLHeadingElement>(null)
  const bodyRef       = useRef<HTMLParagraphElement>(null)
  const dividerRef    = useRef<HTMLDivElement>(null)
  const founderRefs   = useRef<(HTMLDivElement | null)[]>([])

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
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        0.15
      )
      .fromTo(line2Ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        0.30
      )
      .fromTo(bodyRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: 'power2.out' },
        0.55
      )
      .fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.85, ease: 'power2.out' },
        0.72
      )
      .fromTo(founderRefs.current[0],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.88
      )
      .fromTo(founderRefs.current[1],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        1.02
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="about"
      className="relative w-full min-h-screen"
    >
      <div
        className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-14 pt-20 pb-16 md:pt-[140px] md:pb-[120px] max-w-full md:max-w-[66vw]"
      >
        <span
          ref={labelRef}
          className="font-mono text-[11px] tracking-[0.14em] uppercase block mb-5"
          style={{ color: 'rgba(242,240,236,0.4)' }}
        >
          About
        </span>

        <h2
          ref={line1Ref}
          className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}
        >
          We believe great websites
        </h2>
        <h2
          ref={line2Ref}
          className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: 'clamp(32px, 4vw, 64px)', marginBottom: 36 }}
        >
          are built, not assembled.
        </h2>

        <p
          ref={bodyRef}
          className="font-body text-[14px] leading-[1.8]"
          style={{ color: 'rgba(242,240,236,0.72)', maxWidth: '46ch', marginBottom: 64 }}
        >
          Most agencies separate design from performance. We treat them as the same problem — every decision, visual or technical, has one test: does it work harder for your business.
        </p>

        <div
          ref={dividerRef}
          style={{ height: 1, backgroundColor: 'rgba(242,240,236,0.18)', marginBottom: 56 }}
        />

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0">
          {FOUNDERS.map((founder, i) => (
            <AboutFounderCard
              key={founder.number}
              ref={(el) => { founderRefs.current[i] = el }}
              {...founder}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
