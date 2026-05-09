'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceRow from './ServiceRow'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    number: '01',
    name: 'Web Design',
    descriptor: "Websites that load fast, convert visitors, and earn the kind of attention you can't buy.",
  },
  {
    number: '02',
    name: 'Ecommerce',
    descriptor: 'Online stores built to sell. Clean product pages, fast checkout, no friction.',
  },
  {
    number: '03',
    name: 'SEO',
    descriptor: 'Rank for the searches that matter. Organic traffic that compounds over time.',
  },
  {
    number: '04',
    name: 'Brand & Identity',
    descriptor: 'Visual systems that tell people who you are before you say a word.',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const rowsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, subtextRef.current],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      const rows = rowsRef.current?.querySelectorAll('[data-row]')
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="services"
      className="relative w-full"
      style={{ minHeight: '100vh', paddingTop: '14vh', paddingBottom: '14vh' }}
    >
      {/* Header — constrained left so it sits beside the orb */}
      <div className="px-14 mb-16" style={{ maxWidth: '48%' }}>
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-paper/30 block mb-8">
          Services
        </span>

        <h2
          ref={headingRef}
          className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(40px, 5.5vw, 88px)', opacity: 0 }}
        >
          What we do.
        </h2>

        <p
          ref={subtextRef}
          className="font-body text-paper/50 text-[15px] leading-[1.75]"
          style={{ opacity: 0, maxWidth: '42ch' }}
        >
          Every service we offer is designed to make you more money or get you more noticed. Usually both.
        </p>
      </div>

      {/* Rows — full width so they fill the center and overlap the orb behind */}
      <div ref={rowsRef} className="px-14 border-t border-paper/10">
        {SERVICES.map((s) => (
          <ServiceRow
            key={s.number}
            number={s.number}
            name={s.name}
            descriptor={s.descriptor}
          />
        ))}
      </div>
    </section>
  )
}
